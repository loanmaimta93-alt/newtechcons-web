// Worker cho trang quản trị riêng của Newtechcons (/quan-tri).
// Thay thế hoàn toàn Decap CMS + Netlify Identity (đã gỡ do lỗi đăng nhập
// không sửa được). Không qua bên thứ 3 nào — chỉ Cloudflare + GitHub API.
//
// Cách hoạt động:
//  - Đăng nhập bằng 1 mật khẩu (biến môi trường ADMIN_PASSWORD).
//  - Sau khi đăng nhập, các thao tác đọc/ghi bài viết đều gọi thẳng GitHub
//    Contents API (biến môi trường GITHUB_TOKEN) để tạo/sửa/xoá file .md
//    trong src/content/, hoặc tải ảnh vào public/images/uploads/.
//  - Mỗi lần ghi vào GitHub là 1 commit lên nhánh main -> Cloudflare Pages
//    tự phát hiện và build lại y như khi Claude Code push code.
//  - Mọi request không phải /api/* thì trả thẳng static assets (trang web
//    thật + trang quản trị tĩnh trong public/quan-tri/).

const COOKIE_NAME = 'ntc_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 giờ

const GITHUB_OWNER = 'loanmaimta93-alt';
const GITHUB_REPO = 'newtechcons-web';
const GITHUB_BRANCH = 'main';

const COLLECTIONS = ['tin-tuc', 'du-an', 'dich-vu'];

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...extraHeaders },
  });
}

function utf8ToBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToUtf8(b64) {
  const binary = atob(b64.replace(/\n/g, ''));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

// Chuyển bytes -> base64 theo từng lô nhỏ (thay vì nối chuỗi từng byte một).
// Ảnh vài MB mà nối chuỗi từng byte sẽ vượt giới hạn CPU time của Worker
// và bị dừng giữa chừng -> đây là nguyên nhân lỗi "tải ảnh không được".
function bytesToBase64(bytes) {
  const CHUNK = 0x8000; // 32KB mỗi lô, đủ nhỏ để tránh lỗi "call stack"
  let binary = '';
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

async function hmac(secret, message) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function makeSessionToken(secret) {
  const exp = Date.now() + SESSION_TTL_MS;
  const sig = await hmac(secret, String(exp));
  return `${exp}.${sig}`;
}

async function verifySessionToken(token, secret) {
  if (!token) return false;
  const [expStr, sig] = token.split('.');
  if (!expStr || !sig) return false;
  if (Number(expStr) < Date.now()) return false;
  const expected = await hmac(secret, expStr);
  return expected === sig;
}

function getCookie(request, name) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setSessionCookieHeader(token, maxAgeSeconds) {
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAgeSeconds}`;
}

async function githubRequest(env, path, options = {}) {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/${path}`;
  return fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'newtechcons-admin-worker',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {}),
    },
  });
}

async function getFile(env, filePath) {
  const res = await githubRequest(env, `contents/${filePath}?ref=${GITHUB_BRANCH}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Không đọc được ${filePath} (${res.status})`);
  const data = await res.json();
  return { content: base64ToUtf8(data.content), sha: data.sha };
}

async function putFile(env, filePath, content, message, sha) {
  const body = { message, content: utf8ToBase64(content), branch: GITHUB_BRANCH };
  if (sha) body.sha = sha;
  const res = await githubRequest(env, `contents/${filePath}`, { method: 'PUT', body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`Không ghi được ${filePath} (${res.status}): ${await res.text()}`);
  return res.json();
}

async function deleteFile(env, filePath, message, sha) {
  const res = await githubRequest(env, `contents/${filePath}`, {
    method: 'DELETE',
    body: JSON.stringify({ message, sha, branch: GITHUB_BRANCH }),
  });
  if (!res.ok) throw new Error(`Không xoá được ${filePath} (${res.status})`);
  return res.json();
}

async function listDir(env, dirPath) {
  const res = await githubRequest(env, `contents/${dirPath}?ref=${GITHUB_BRANCH}`);
  if (!res.ok) throw new Error(`Không đọc được thư mục ${dirPath} (${res.status})`);
  return res.json();
}

function isSafeFileName(name) {
  return /^[a-z0-9][a-z0-9-]*\.md$/.test(name);
}

async function handleApi(request, env, url) {
  const path = url.pathname;

  if (path === '/api/login' && request.method === 'POST') {
    if (!env.ADMIN_PASSWORD) return json({ error: 'Server chưa cấu hình ADMIN_PASSWORD' }, 500);
    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Yêu cầu không hợp lệ' }, 400);
    }
    if (body.password !== env.ADMIN_PASSWORD) return json({ error: 'Sai mật khẩu' }, 401);
    const secret = env.SESSION_SECRET || env.ADMIN_PASSWORD;
    const token = await makeSessionToken(secret);
    return json({ ok: true }, 200, { 'Set-Cookie': setSessionCookieHeader(token, SESSION_TTL_MS / 1000) });
  }

  if (path === '/api/logout' && request.method === 'POST') {
    return json({ ok: true }, 200, { 'Set-Cookie': setSessionCookieHeader('', 0) });
  }

  // Mọi route /api/* khác đều cần đăng nhập.
  const secret = env.SESSION_SECRET || env.ADMIN_PASSWORD;
  const token = getCookie(request, COOKIE_NAME);
  const valid = await verifySessionToken(token, secret);
  if (!valid) return json({ error: 'Chưa đăng nhập hoặc phiên đã hết hạn' }, 401);

  if (!env.GITHUB_TOKEN) return json({ error: 'Server chưa cấu hình GITHUB_TOKEN' }, 500);

  try {
    if (path === '/api/list' && request.method === 'GET') {
      const collection = url.searchParams.get('collection');
      if (!COLLECTIONS.includes(collection)) return json({ error: 'Sai collection' }, 400);
      const items = await listDir(env, `src/content/${collection}`);
      return json({
        items: items
          .filter((i) => i.type === 'file' && i.name.endsWith('.md'))
          .map((i) => ({ name: i.name, sha: i.sha })),
      });
    }

    if (path === '/api/file' && request.method === 'GET') {
      const collection = url.searchParams.get('collection');
      const name = url.searchParams.get('name');
      if (!COLLECTIONS.includes(collection) || !isSafeFileName(name)) return json({ error: 'Tham số sai' }, 400);
      const file = await getFile(env, `src/content/${collection}/${name}`);
      if (!file) return json({ error: 'Không tìm thấy bài' }, 404);
      return json(file);
    }

    if (path === '/api/file' && request.method === 'POST') {
      const { collection, name, content, sha, message } = await request.json();
      if (!COLLECTIONS.includes(collection) || !isSafeFileName(name)) return json({ error: 'Tham số sai' }, 400);
      if (typeof content !== 'string' || !content.startsWith('---\n')) {
        return json({ error: 'Nội dung phải có phần frontmatter YAML' }, 400);
      }
      const result = await putFile(
        env,
        `src/content/${collection}/${name}`,
        content,
        message || `Cập nhật ${collection}/${name} qua trang quản trị`,
        sha || undefined,
      );
      return json({ ok: true, sha: result.content.sha });
    }

    if (path === '/api/file' && request.method === 'DELETE') {
      const { collection, name, sha } = await request.json();
      if (!COLLECTIONS.includes(collection) || !isSafeFileName(name)) return json({ error: 'Tham số sai' }, 400);
      await deleteFile(env, `src/content/${collection}/${name}`, `Xoá ${collection}/${name} qua trang quản trị`, sha);
      return json({ ok: true });
    }

    if (path === '/api/upload' && request.method === 'POST') {
      const form = await request.formData();
      const file = form.get('file');
      const folder = (form.get('folder') || 'uploads').toString().replace(/[^a-z0-9-]/gi, '');
      if (!file || typeof file === 'string') return json({ error: 'Thiếu file ảnh' }, 400);
      if (file.size > 8 * 1024 * 1024) return json({ error: 'Ảnh quá lớn (tối đa 8MB)' }, 400);
      const buf = new Uint8Array(await file.arrayBuffer());
      const b64 = bytesToBase64(buf);
      const safeName = file.name
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-zA-Z0-9.\-]/g, '-')
        .toLowerCase();
      const filePath = `public/images/${folder}/${Date.now()}-${safeName}`;
      const res = await githubRequest(env, `contents/${filePath}`, {
        method: 'PUT',
        body: JSON.stringify({ message: `Tải ảnh ${safeName} qua trang quản trị`, content: b64, branch: GITHUB_BRANCH }),
      });
      if (!res.ok) return json({ error: `Tải ảnh thất bại: ${await res.text()}` }, 500);
      return json({ ok: true, path: '/' + filePath.replace(/^public\//, '') });
    }

    return json({ error: 'Không tìm thấy API' }, 404);
  } catch (err) {
    return json({ error: String((err && err.message) || err) }, 500);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      return handleApi(request, env, url);
    }
    return env.ASSETS.fetch(request);
  },
};

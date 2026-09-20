// Trang quan tri noi dung tu xay cho Newtechcons - thay Decap CMS.
// Goi thang cac API /api/* (xu ly boi worker/index.js) de doc/ghi file
// markdown trong src/content/ va tai anh vao public/images/uploads/ qua
// GitHub API. Khong phu thuoc thu vien ngoai - JS thuan.

const SCHEMAS = {
  'tin-tuc': {
    label: 'Tin tức',
    folder: 'src/content/tin-tuc',
    fields: [
      { name: 'tieuDe', label: 'Tiêu đề bài viết', type: 'string', required: true },
      { name: 'moTa', label: 'Mô tả ngắn (hiện ở danh sách & SEO)', type: 'text', required: true },
      { name: 'ngayDang', label: 'Ngày đăng', type: 'date', required: true },
      { name: 'tacGia', label: 'Tác giả', type: 'string', default: 'Ban biên tập Newtechcons' },
      { name: 'danhMuc', label: 'Danh mục', type: 'select', options: ['Tin công ty', 'Kiến thức ngành', 'Dự án tiêu biểu'], required: true },
      { name: 'anhBia', label: 'Ảnh bìa', type: 'image', required: true },
      { name: 'anhBiaAlt', label: 'Mô tả ảnh bìa (SEO)', type: 'string', required: true },
      { name: 'noiBat', label: 'Bài nổi bật (hiện ở trang chủ)', type: 'boolean' },
    ],
  },
  'du-an': {
    label: 'Dự án',
    folder: 'src/content/du-an',
    fields: [
      { name: 'tieuDe', label: 'Tiêu đề dự án', type: 'string', required: true },
      { name: 'tomTat', label: 'Tóm tắt ngắn', type: 'text', required: true },
      { name: 'linhVuc', label: 'Lĩnh vực', type: 'select', options: ['Xử lý nước thải', 'Xử lý nước cấp', 'Cấp thoát nước hạ tầng', 'Hệ thống kỹ thuật cơ điện (M&E)'], required: true },
      { name: 'diaDiem', label: 'Địa điểm', type: 'string', required: true },
      { name: 'chuDauTu', label: 'Chủ đầu tư', type: 'string', required: true },
      { name: 'congSuat', label: 'Công suất', type: 'string', required: true, hint: 'Ví dụ: 200 m³/ngày đêm' },
      { name: 'namHoanThanh', label: 'Năm hoàn thành', type: 'number', required: true },
      { name: 'thoiGianThiCong', label: 'Thời gian thi công', type: 'string' },
      { name: 'congNghe', label: 'Công nghệ áp dụng', type: 'stringlist' },
      { name: 'anhBia', label: 'Ảnh bìa', type: 'image', required: true },
      { name: 'anhBiaAlt', label: 'Mô tả ảnh bìa (SEO)', type: 'string', required: true },
      { name: 'thuVienAnh', label: 'Thư viện ảnh', type: 'objectlist', fields: [
        { name: 'duong_dan', label: 'Ảnh', type: 'image' },
        { name: 'alt', label: 'Mô tả ảnh', type: 'string' },
      ] },
      { name: 'noiBat', label: 'Dự án nổi bật (hiện ở trang chủ)', type: 'boolean' },
      { name: 'thuTu', label: 'Thứ tự hiển thị', type: 'number', default: 0 },
    ],
  },
  'dich-vu': {
    label: 'Dịch vụ',
    folder: 'src/content/dich-vu',
    fields: [
      { name: 'tieuDe', label: 'Tên dịch vụ', type: 'string', required: true },
      { name: 'moTaNgan', label: 'Mô tả ngắn (hiện ở danh sách)', type: 'text', required: true },
      { name: 'icon', label: 'Biểu tượng', type: 'select', options: ['giot-nuoc', 'bo-loc', 'duong-ong', 'dong-ho', 'nha-may', 'bao-tri', 'ho-so', 'bom-hoa-chat'], required: true },
      { name: 'anhBia', label: 'Ảnh bìa', type: 'image', required: true },
      { name: 'anhBiaAlt', label: 'Mô tả ảnh bìa (SEO)', type: 'string', required: true },
      { name: 'thuTu', label: 'Thứ tự hiển thị', type: 'number', default: 0 },
      { name: 'loiIch', label: 'Lợi ích', type: 'stringlist', hideFor: ['cung-cap-bom-hoa-chat.md'] },
      { name: 'quyTrinh', label: 'Quy trình thực hiện', type: 'objectlist', hideFor: ['cung-cap-bom-hoa-chat.md'], fields: [
        { name: 'buoc', label: 'Tên bước', type: 'string' },
        { name: 'moTa', label: 'Mô tả bước', type: 'text' },
      ] },
      { name: 'sanPham', label: 'Sản phẩm liên quan (nếu có)', type: 'objectlist', groupBy: 'nhom', fields: [
        { name: 'nhom', label: 'Nhóm hạng mục', type: 'string', hint: 'Ví dụ: "Bơm định lượng & bơm hoá chất". Các sản phẩm gõ đúng cùng tên nhóm sẽ xếp chung một khối trên trang dịch vụ.' },
        { name: 'ten', label: 'Tên sản phẩm', type: 'string' },
        { name: 'moTa', label: 'Mô tả ngắn sản phẩm', type: 'string' },
        { name: 'hinhAnh', label: 'Hình ảnh chính', type: 'image' },
        { name: 'hinhAnhAlt', label: 'Mô tả ảnh chính', type: 'string' },
        { name: 'anhKhac', label: 'Ảnh bổ sung', type: 'imagelist', hint: 'Thêm 2-4 ảnh nữa (tổng cộng 3-5 ảnh/sản phẩm) để khách xem nhiều góc/loại hơn.' },
      ] },
    ],
  },
};

let state = { collection: 'tin-tuc', items: [], editing: null };

async function api(path, opts) {
  opts = opts || {};
  opts.credentials = 'same-origin';
  const res = await fetch(path, opts);
  let data = null;
  try { data = await res.json(); } catch (e) { /* no body */ }
  if (!res.ok) throw new Error((data && data.error) || ('Lỗi ' + res.status));
  return data;
}

async function uploadImage(file, folder) {
  const form = new FormData();
  form.append('file', file);
  form.append('folder', folder);
  const res = await fetch('/api/upload', { method: 'POST', body: form, credentials: 'same-origin' });
  let data = null;
  try { data = await res.json(); } catch (e) { /* server trả về không phải JSON (ví dụ crash) */ }
  if (!res.ok) throw new Error((data && data.error) || ('Tải ảnh thất bại (lỗi ' + res.status + ')'));
  return data.path;
}

function quote(str) {
  return '"' + String(str).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

function unquote(str) {
  str = str.trim();
  if (str.charAt(0) === '"' && str.charAt(str.length - 1) === '"') {
    return str.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }
  return str;
}

function parseInlineArray(str) {
  const out = [];
  const re = /"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = re.exec(str))) out.push(m[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\'));
  return out;
}

function parseFrontmatter(raw) {
  const lines = raw.split('\n');
  if (lines[0].trim() !== '---') return { data: {}, body: raw };
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') { end = i; break; }
  }
  if (end === -1) return { data: {}, body: raw };
  const fmLines = lines.slice(1, end);
  const body = lines.slice(end + 1).join('\n').replace(/^\n+/, '');

  const data = {};
  let i = 0;
  while (i < fmLines.length) {
    const line = fmLines[i];
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) { i++; continue; }
    const key = m[1];
    const rest = m[2];
    if (rest !== '') {
      if (rest.charAt(0) === '[') {
        data[key] = parseInlineArray(rest);
      } else {
        data[key] = unquote(rest);
      }
      i++;
      continue;
    }
    const block = [];
    let j = i + 1;
    while (j < fmLines.length && /^\s+\S/.test(fmLines[j])) { block.push(fmLines[j]); j++; }
    if (block.length === 0) { data[key] = []; i = j; continue; }
    if (/^\s*-\s*\w[\w_]*:\s*/.test(block[0])) {
      const items = [];
      let cur = null;
      for (let k = 0; k < block.length; k++) {
        const bl = block[k];
        const mm = bl.match(/^\s*-\s*(\w+):\s*(.*)$/);
        const cm = bl.match(/^\s{4,}(\w+):\s*(.*)$/);
        if (mm) {
          cur = {};
          items.push(cur);
          cur[mm[1]] = unquote(mm[2]);
        } else if (cm && cur) {
          cur[cm[1]] = unquote(cm[2]);
        }
      }
      data[key] = items;
    } else {
      data[key] = block.map(function (bl) { return unquote(bl.replace(/^\s*-\s*/, '')); });
    }
    i = j;
  }
  return { data: data, body: body };
}

function serializeScalar(type, value) {
  if (type === 'number') return String(Number(value) || 0);
  if (type === 'boolean') return value ? 'true' : 'false';
  if (type === 'date') return value || new Date().toISOString().slice(0, 10);
  return quote(value || '');
}

function serializeFrontmatter(collection, data) {
  const schema = SCHEMAS[collection];
  const out = ['---'];
  schema.fields.forEach(function (f) {
    const val = data[f.name];
    if (f.type === 'stringlist') {
      const items = Array.isArray(val) ? val.filter(function (v) { return v && v.trim(); }) : [];
      if (items.length === 0) { out.push(f.name + ': []'); return; }
      out.push(f.name + ':');
      items.forEach(function (it) { out.push('  - ' + quote(it)); });
    } else if (f.type === 'objectlist') {
      const items = Array.isArray(val) ? val : [];
      if (items.length === 0) { out.push(f.name + ': []'); return; }
      out.push(f.name + ':');
      items.forEach(function (obj) {
        f.fields.forEach(function (sf, idx) {
          const prefix = idx === 0 ? '  - ' : '    ';
          out.push(prefix + sf.name + ': ' + quote(obj[sf.name] || ''));
        });
      });
    } else if (f.type === 'boolean') {
      out.push(f.name + ': ' + serializeScalar('boolean', val));
    } else if (f.type === 'number') {
      out.push(f.name + ': ' + serializeScalar('number', val));
    } else if (f.type === 'date') {
      out.push(f.name + ': ' + serializeScalar('date', val));
    } else {
      out.push(f.name + ': ' + serializeScalar('string', val || ''));
    }
  });
  out.push('---');
  return out.join('\n') + '\n';
}

const loginScreen = document.getElementById('login-screen');
const appScreen = document.getElementById('app');
const msgEl = document.getElementById('msg');
const loginMsgEl = document.getElementById('login-msg');

function showMsg(text, isErr) {
  msgEl.textContent = text;
  msgEl.className = isErr ? 'err' : 'ok';
  if (text) setTimeout(function () { if (msgEl.textContent === text) msgEl.textContent = ''; }, 4000);
}

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const password = document.getElementById('password').value;
  loginMsgEl.textContent = '';
  api('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: password }) })
    .then(function () {
      loginScreen.style.display = 'none';
      appScreen.style.display = 'block';
      loadList(state.collection);
    })
    .catch(function (err) {
      loginMsgEl.textContent = err.message;
      loginMsgEl.className = 'err';
    });
});

document.getElementById('logout-btn').addEventListener('click', function () {
  fetch('/api/logout', { method: 'POST', credentials: 'same-origin' }).then(function () {
    appScreen.style.display = 'none';
    loginScreen.style.display = 'flex';
  });
});

function checkSession() {
  api('/api/list?collection=tin-tuc')
    .then(function () {
      loginScreen.style.display = 'none';
      appScreen.style.display = 'block';
      loadList(state.collection);
    })
    .catch(function () {
      loginScreen.style.display = 'flex';
      appScreen.style.display = 'none';
    });
}

document.querySelectorAll('.tabs button').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.tabs button').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    state.collection = btn.dataset.collection;
    closeEditor();
    loadList(state.collection);
  });
});

document.getElementById('new-btn').addEventListener('click', function () { openEditor(null); });

const LIVE_URL_PREFIX = { 'tin-tuc': '/tin-tuc/', 'du-an': '/du-an/', 'dich-vu': '/dich-vu/' };
function livePathFor(collection, name) {
  const slug = (name || '').replace(/\.md$/, '');
  const prefix = LIVE_URL_PREFIX[collection];
  return prefix ? prefix + slug + '/' : '/';
}

function loadList(collection) {
  document.getElementById('list-title').textContent = SCHEMAS[collection].label;
  const container = document.getElementById('list-container');
  container.innerHTML = '<div class="empty">Đang tải…</div>';
  api('/api/list?collection=' + collection)
    .then(function (res) {
      const items = res.items;
      state.items = items;
      if (items.length === 0) {
        container.innerHTML = '<div class="empty">Chưa có bài nào.</div>';
        return;
      }
      container.innerHTML = '';
      items.slice().sort(function (a, b) { return a.name.localeCompare(b.name); }).forEach(function (item) {
        const row = document.createElement('div');
        row.className = 'list-item';
        row.innerHTML = '<span class="name">' + item.name + '</span>' +
          '<span class="actions">' +
          '<a class="ghost small" href="' + livePathFor(collection, item.name) + '" target="_blank" rel="noopener">Xem trang</a>' +
          '<button class="ghost small" data-act="edit">Sửa</button>' +
          '<button class="ghost small danger" data-act="del">Xoá</button>' +
          '</span>';
        row.querySelector('[data-act="edit"]').addEventListener('click', function () { openEditor(item.name); });
        row.querySelector('[data-act="del"]').addEventListener('click', function () { deleteEntry(item.name, item.sha); });
        container.appendChild(row);
      });
    })
    .catch(function (err) {
      container.innerHTML = '<div class="empty">Lỗi tải danh sách: ' + err.message + '</div>';
    });
}

function deleteEntry(name, sha) {
  if (!confirm('Xoá "' + name + '"? Không thể hoàn tác.')) return;
  api('/api/file', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ collection: state.collection, name: name, sha: sha }) })
    .then(function () {
      showMsg('Đã xoá. Web thật sẽ cập nhật sau 1-3 phút.', false);
      loadList(state.collection);
    })
    .catch(function (err) {
      showMsg('Lỗi xoá: ' + err.message, true);
    });
}

function slugify(str) {
  return (str || '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'bai-viet';
}

function closeEditor() {
  document.getElementById('editor').style.display = 'none';
  document.getElementById('list-view').style.display = 'block';
  state.editing = null;
}

function openEditor(name) {
  const rawSchema = SCHEMAS[state.collection];
  const schema = {
    label: rawSchema.label,
    folder: rawSchema.folder,
    fields: rawSchema.fields.filter(function (f) {
      return !(f.hideFor && f.hideFor.indexOf(name) !== -1);
    }),
  };

  function build(data, body, sha) {
    state.editing = { name: name, sha: sha };
    document.getElementById('list-view').style.display = 'none';
    const editor = document.getElementById('editor');
    editor.style.display = 'block';
    editor.innerHTML = '';

    const titleRow = document.createElement('div');
    titleRow.style.display = 'flex';
    titleRow.style.justifyContent = 'space-between';
    titleRow.style.alignItems = 'center';
    titleRow.style.gap = '12px';

    const title = document.createElement('h2');
    title.style.margin = '0';
    title.textContent = name ? ('Sửa: ' + name) : ('Thêm ' + schema.label.toLowerCase() + ' mới');
    titleRow.appendChild(title);

    if (name) {
      const viewLink = document.createElement('a');
      viewLink.className = 'ghost small';
      viewLink.textContent = 'Xem trang thật ↗';
      viewLink.href = livePathFor(state.collection, name);
      viewLink.target = '_blank';
      viewLink.rel = 'noopener';
      titleRow.appendChild(viewLink);
    }
    editor.appendChild(titleRow);

    const form = document.createElement('form');
    form.id = 'entry-form';

    schema.fields.forEach(function (f) {
      form.appendChild(renderField(f, data[f.name]));
    });

    const bodyField = document.createElement('div');
    bodyField.className = 'field';
    bodyField.innerHTML =
      '<label>Nội dung chi tiết (Markdown)</label>' +
      '<textarea name="__body" rows="14"></textarea>' +
      '<div class="hint">Dùng cú pháp Markdown: <code>## Tiêu đề</code>, <code>**In đậm**</code>, <code>- Gạch đầu dòng</code>, chèn ảnh bằng <code>![mô tả](/images/...)</code>.</div>' +
      '<div style="margin-top:8px;">' +
      '<input type="file" accept="image/*" id="body-img-input" style="display:none" />' +
      '<button type="button" class="ghost small" id="body-img-btn">+ Tải ảnh &amp; chèn vào nội dung</button>' +
      '</div>';
    bodyField.querySelector('textarea').value = body;
    form.appendChild(bodyField);

    bodyField.querySelector('#body-img-btn').addEventListener('click', function () {
      bodyField.querySelector('#body-img-input').click();
    });
    bodyField.querySelector('#body-img-input').addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (!file) return;
      const btn = bodyField.querySelector('#body-img-btn');
      btn.disabled = true; btn.textContent = 'Đang tải…';
      uploadImage(file, 'uploads')
        .then(function (path) {
          const ta = bodyField.querySelector('textarea');
          ta.value += '\n\n![Mô tả ảnh](' + path + ')\n';
        })
        .catch(function (err) { showMsg('Lỗi tải ảnh: ' + err.message, true); })
        .finally(function () {
          btn.disabled = false; btn.textContent = '+ Tải ảnh & chèn vào nội dung';
          e.target.value = '';
        });
    });

    let slugInput = null;
    if (!name) {
      const slugField = document.createElement('div');
      slugField.className = 'field';
      slugField.innerHTML = '<label>Đường dẫn URL (tự tạo từ tiêu đề, có thể sửa)</label><input type="text" name="__slug" />';
      form.insertBefore(slugField, form.firstChild);
      slugInput = slugField.querySelector('input');
      const titleField = form.querySelector('[name="tieuDe"]');
      if (titleField) {
        titleField.addEventListener('input', function () {
          if (!slugInput.dataset.touched) slugInput.value = slugify(titleField.value);
        });
        slugInput.addEventListener('input', function () { slugInput.dataset.touched = '1'; });
      }
    }

    const actions = document.createElement('div');
    actions.className = 'form-actions';
    actions.innerHTML =
      '<button type="submit" class="primary" id="save-btn">Lưu &amp; xuất bản</button>' +
      '<button type="button" class="ghost" id="cancel-btn">Huỷ</button>';
    form.appendChild(actions);

    editor.appendChild(form);

    form.querySelector('#cancel-btn').addEventListener('click', closeEditor);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      saveEntry(form, schema, name, sha, slugInput);
    });
  }

  if (name) {
    api('/api/file?collection=' + state.collection + '&name=' + encodeURIComponent(name))
      .then(function (file) {
        const parsed = parseFrontmatter(file.content);
        build(parsed.data, parsed.body, file.sha);
      })
      .catch(function (err) { showMsg('Lỗi tải bài viết: ' + err.message, true); });
  } else {
    const data = {};
    schema.fields.forEach(function (f) { if (f.default !== undefined) data[f.name] = f.default; });
    build(data, '', null);
  }
}

function renderField(f, value) {
  const wrap = document.createElement('div');
  wrap.className = 'field';

  if (f.type === 'boolean') {
    wrap.innerHTML =
      '<div class="checkbox-row">' +
      '<input type="checkbox" name="' + f.name + '" id="fld-' + f.name + '" ' + (value ? 'checked' : '') + ' />' +
      '<label for="fld-' + f.name + '" style="margin:0;">' + f.label + '</label>' +
      '</div>';
    return wrap;
  }

  const label = document.createElement('label');
  label.textContent = f.label + (f.required ? ' *' : '');
  wrap.appendChild(label);

  if (f.type === 'select') {
    const sel = document.createElement('select');
    sel.name = f.name;
    f.options.forEach(function (opt) {
      const o = document.createElement('option');
      o.value = opt; o.textContent = opt;
      if (opt === value) o.selected = true;
      sel.appendChild(o);
    });
    wrap.appendChild(sel);
  } else if (f.type === 'text') {
    const ta = document.createElement('textarea');
    ta.name = f.name; ta.rows = 3; ta.value = value || '';
    wrap.appendChild(ta);
  } else if (f.type === 'number') {
    const inp = document.createElement('input');
    inp.type = 'number'; inp.name = f.name; inp.value = value === undefined || value === null ? '' : value;
    wrap.appendChild(inp);
  } else if (f.type === 'date') {
    const inp = document.createElement('input');
    inp.type = 'date'; inp.name = f.name;
    inp.value = value || new Date().toISOString().slice(0, 10);
    wrap.appendChild(inp);
  } else if (f.type === 'image') {
    wrap.appendChild(renderImageInput(f.name, value));
  } else if (f.type === 'stringlist') {
    wrap.appendChild(renderStringList(f.name, Array.isArray(value) ? value : []));
  } else if (f.type === 'objectlist') {
    wrap.appendChild(renderObjectList(f.name, f.fields, Array.isArray(value) ? value : [], f.groupBy));
  } else {
    const inp = document.createElement('input');
    inp.type = 'text'; inp.name = f.name; inp.value = value || '';
    wrap.appendChild(inp);
  }

  if (f.hint) {
    const hint = document.createElement('div');
    hint.className = 'hint';
    hint.textContent = f.hint;
    wrap.appendChild(hint);
  }
  return wrap;
}

function renderImageInput(name, value) {
  const box = document.createElement('div');
  box.setAttribute('data-image-field', name);
  box.innerHTML =
    '<input type="text" data-role="path" value="' + (value ? String(value).replace(/"/g, '&quot;') : '') + '" placeholder="/images/..." />' +
    '<input type="file" accept="image/*" data-role="file" style="margin-top:6px;" />' +
    '<img data-role="preview" class="img-preview" src="' + (value || '') + '" style="' + (value ? '' : 'display:none;') + '" />';
  const pathInput = box.querySelector('[data-role="path"]');
  const fileInput = box.querySelector('[data-role="file"]');
  const preview = box.querySelector('[data-role="preview"]');
  pathInput.addEventListener('input', function () {
    preview.src = pathInput.value;
    preview.style.display = pathInput.value ? '' : 'none';
  });
  fileInput.addEventListener('change', function () {
    const file = fileInput.files[0];
    if (!file) return;
    fileInput.disabled = true;
    uploadImage(file, 'uploads')
      .then(function (path) {
        pathInput.value = path;
        preview.src = path;
        preview.style.display = '';
      })
      .catch(function (err) { showMsg('Lỗi tải ảnh: ' + err.message, true); })
      .finally(function () { fileInput.disabled = false; });
  });
  return box;
}

function renderImageListInline(name, value) {
  const box = document.createElement('div');
  box.setAttribute('data-imagelist-field', name);
  const rowsWrap = document.createElement('div');
  box.appendChild(rowsWrap);

  function addRow(path) {
    const row = document.createElement('div');
    row.style.display = 'inline-block';
    row.style.verticalAlign = 'top';
    row.style.marginRight = '8px';
    row.style.marginBottom = '8px';
    row.appendChild(renderImageInput(name + '-item', path || ''));
    const rmBtn = document.createElement('button');
    rmBtn.type = 'button'; rmBtn.className = 'ghost small'; rmBtn.textContent = 'Xoá ảnh này';
    rmBtn.style.display = 'block'; rmBtn.style.marginTop = '4px';
    rmBtn.addEventListener('click', function () { row.remove(); });
    row.appendChild(rmBtn);
    rowsWrap.appendChild(row);
  }
  (value || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean).forEach(addRow);

  const addBtn = document.createElement('button');
  addBtn.type = 'button'; addBtn.className = 'ghost small'; addBtn.textContent = '+ Thêm ảnh';
  addBtn.addEventListener('click', function () { addRow(''); });
  box.appendChild(addBtn);
  return box;
}

function collectImageListValue(box) {
  return Array.prototype.map.call(box.querySelectorAll('[data-role="path"]'), function (inp) {
    return inp.value.trim();
  }).filter(Boolean).join(',');
}

function renderStringList(name, items) {
  const box = document.createElement('div');
  box.className = 'repeat-group';
  box.setAttribute('data-list-field', name);
  const rowsWrap = document.createElement('div');
  box.appendChild(rowsWrap);

  function addRow(val) {
    const row = document.createElement('div');
    row.className = 'repeat-row';
    row.innerHTML = '<div><input type="text" value="' + (val || '').replace(/"/g, '&quot;') + '" /></div>';
    const rmBtn = document.createElement('button');
    rmBtn.type = 'button'; rmBtn.className = 'ghost small'; rmBtn.textContent = 'Xoá';
    rmBtn.addEventListener('click', function () { row.remove(); });
    row.appendChild(rmBtn);
    rowsWrap.appendChild(row);
  }
  (items.length ? items : ['']).forEach(addRow);

  const addBtn = document.createElement('button');
  addBtn.type = 'button'; addBtn.className = 'ghost small'; addBtn.textContent = '+ Thêm dòng';
  addBtn.addEventListener('click', function () { addRow(''); });
  box.appendChild(addBtn);
  return box;
}

function renderObjectList(name, subFields, items, groupByField) {
  const box = document.createElement('div');
  box.className = 'repeat-group';
  box.setAttribute('data-obj-list-field', name);
  const rowsWrap = document.createElement('div');
  box.appendChild(rowsWrap);

  let currentGrid = null;

  function addGroupHeader(label) {
    const header = document.createElement('div');
    header.style.background = 'var(--navy-deep)';
    header.style.color = '#fff';
    header.style.fontFamily = 'var(--font-display)';
    header.style.fontWeight = '700';
    header.style.fontSize = '12px';
    header.style.textTransform = 'uppercase';
    header.style.letterSpacing = '0.02em';
    header.style.padding = '8px 12px';
    header.style.margin = '14px 0 8px';
    header.textContent = label;
    rowsWrap.appendChild(header);

    currentGrid = document.createElement('div');
    currentGrid.style.display = 'grid';
    currentGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
    currentGrid.style.gap = '10px';
    currentGrid.style.marginBottom = '4px';
    rowsWrap.appendChild(currentGrid);
  }

  function addGroup(obj) {
    obj = obj || {};
    const group = document.createElement('div');
    group.style.border = '1px solid var(--border)';
    group.style.borderRadius = '2px';
    group.style.padding = '10px';
    group.style.background = '#fff';
    group.setAttribute('data-group', '1');
    subFields.forEach(function (sf) {
      const row = document.createElement('div');
      row.style.marginBottom = '6px';
      const lab = document.createElement('div');
      lab.style.fontSize = '12px'; lab.style.color = '#667085'; lab.style.marginBottom = '3px';
      lab.textContent = sf.label;
      row.appendChild(lab);
      if (sf.type === 'image') {
        row.appendChild(renderImageInput(sf.name, obj[sf.name]));
      } else if (sf.type === 'imagelist') {
        row.appendChild(renderImageListInline(sf.name, obj[sf.name]));
      } else {
        const inp = document.createElement('input');
        inp.type = 'text'; inp.setAttribute('data-sub', sf.name);
        inp.value = obj[sf.name] || '';
        row.appendChild(inp);
      }
      if (sf.hint) {
        const hint = document.createElement('div');
        hint.className = 'hint';
        hint.textContent = sf.hint;
        row.appendChild(hint);
      }
      group.appendChild(row);
    });
    const rmBtn = document.createElement('button');
    rmBtn.type = 'button'; rmBtn.className = 'ghost small'; rmBtn.textContent = 'Xoá mục này';
    rmBtn.addEventListener('click', function () { group.remove(); });
    group.appendChild(rmBtn);
    (groupByField && currentGrid ? currentGrid : rowsWrap).appendChild(group);
  }
  let lastGroupVal;
  (items.length ? items : [{}]).forEach(function (obj) {
    if (groupByField) {
      const val = obj[groupByField] || '';
      if (val && val !== lastGroupVal) addGroupHeader(val);
      lastGroupVal = val;
    }
    addGroup(obj);
  });

  const addBtn = document.createElement('button');
  addBtn.type = 'button'; addBtn.className = 'ghost small'; addBtn.textContent = '+ Thêm mục';
  addBtn.addEventListener('click', function () { addGroup({}); });
  box.appendChild(addBtn);
  return box;
}

function collectFormData(form, schema) {
  const data = {};
  schema.fields.forEach(function (f) {
    if (f.type === 'boolean') {
      data[f.name] = form.querySelector('[name="' + f.name + '"]').checked;
    } else if (f.type === 'image') {
      const box = form.querySelector('[data-image-field="' + f.name + '"]');
      data[f.name] = box.querySelector('[data-role="path"]').value.trim();
    } else if (f.type === 'stringlist') {
      const box = form.querySelector('[data-list-field="' + f.name + '"]');
      data[f.name] = Array.prototype.map.call(box.querySelectorAll('.repeat-row input'), function (i) { return i.value.trim(); }).filter(Boolean);
    } else if (f.type === 'objectlist') {
      const box = form.querySelector('[data-obj-list-field="' + f.name + '"]');
      const groups = Array.prototype.slice.call(box.querySelectorAll(':scope div[data-group]'));
      data[f.name] = groups.map(function (g) {
        const obj = {};
        f.fields.forEach(function (sf) {
          if (sf.type === 'image') {
            const imgBox = g.querySelector('[data-image-field="' + sf.name + '"]');
            obj[sf.name] = imgBox ? imgBox.querySelector('[data-role="path"]').value.trim() : '';
          } else if (sf.type === 'imagelist') {
            const listBox = g.querySelector('[data-imagelist-field="' + sf.name + '"]');
            obj[sf.name] = listBox ? collectImageListValue(listBox) : '';
          } else {
            const inp = g.querySelector('[data-sub="' + sf.name + '"]');
            obj[sf.name] = inp ? inp.value.trim() : '';
          }
        });
        return obj;
      }).filter(function (obj) {
        return Object.keys(obj).some(function (k) { return obj[k]; });
      });
    } else {
      const el = form.querySelector('[name="' + f.name + '"]');
      data[f.name] = el ? el.value.trim() : '';
    }
  });
  return data;
}

function saveEntry(form, schema, existingName, sha, slugInput) {
  const data = collectFormData(form, schema);
  const missing = schema.fields.filter(function (f) { return f.required && !data[f.name]; });
  if (missing.length) {
    showMsg('Thiếu thông tin bắt buộc: ' + missing.map(function (f) { return f.label; }).join(', '), true);
    return;
  }
  const body = form.querySelector('[name="__body"]').value;
  const content = serializeFrontmatter(state.collection, data) + '\n' + body.trim() + '\n';

  let name = existingName;
  if (!name) {
    const slug = (slugInput && slugInput.value.trim()) || slugify(data.tieuDe || 'bai-viet');
    name = slug + '.md';
  }

  const saveBtn = form.querySelector('#save-btn');
  saveBtn.disabled = true;
  saveBtn.innerHTML = '<span class="spinner"></span> Đang lưu…';
  api('/api/file', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ collection: state.collection, name: name, content: content, sha: state.editing.sha }),
  })
    .then(function () {
      showMsg('Đã lưu. Web thật sẽ tự cập nhật sau khoảng 1-3 phút.', false);
      closeEditor();
      loadList(state.collection);
    })
    .catch(function (err) { showMsg('Lỗi lưu bài: ' + err.message, true); })
    .finally(function () {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Lưu & xuất bản';
    });
}

checkSession();

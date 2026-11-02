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

// Nội dung các trang cố định: mỗi tab ứng với 1 file src/data/noi-dung/<key>.json.
// type: 'heading' chỉ để chia nhóm ô nhập trong form, không lưu thành dữ liệu.
const SEO_HINT = 'Hiện trên Google và khi chia sẻ link, không hiện trong nội dung trang.';
const PAGE_SCHEMAS = {
  'trang-chu': {
    label: 'Trang chủ',
    xem: '/',
    fields: [
      { type: 'heading', label: 'Banner đầu trang' },
      { name: 'heroAnh', label: 'Ảnh nền banner', type: 'image', required: true },
      { name: 'heroTieuDe', label: 'Tiêu đề lớn', type: 'string', required: true },
      { name: 'heroMoTa', label: 'Đoạn mô tả', type: 'text' },
      { name: 'heroNut1', label: 'Chữ trên nút đỏ', type: 'string' },
      { name: 'heroNut2', label: 'Chữ trên nút thứ hai', type: 'string' },
      { type: 'heading', label: 'Khối giới thiệu' },
      { name: 'gioiThieuAnh', label: 'Ảnh', type: 'image', required: true },
      { name: 'gioiThieuAnhAlt', label: 'Mô tả ảnh (SEO)', type: 'string' },
      { name: 'gioiThieuNhan', label: 'Nhãn nhỏ phía trên tiêu đề', type: 'string' },
      { name: 'gioiThieuTieuDe', label: 'Tiêu đề', type: 'string' },
      { name: 'gioiThieuNoiDung', label: 'Nội dung', type: 'text', hint: 'Đặt chữ giữa hai cặp dấu sao để in đậm, ví dụ: **chữ in đậm**. Đổi phương châm công ty thì nhớ sửa cả ở đây.' },
      { name: 'baChuVang', label: 'Ba chữ vàng', type: 'objectlist', fields: [
        { name: 'chu', label: 'Chữ', type: 'string' },
        { name: 'mota', label: 'Mô tả', type: 'text' },
      ] },
      { name: 'gioiThieuNut', label: 'Chữ trên nút', type: 'string' },
      { type: 'heading', label: 'Khối dịch vụ' },
      { name: 'dichVuNhan', label: 'Nhãn nhỏ phía trên tiêu đề', type: 'string' },
      { name: 'dichVuTieuDe', label: 'Tiêu đề', type: 'string' },
      { name: 'dichVuMoTa', label: 'Mô tả', type: 'text' },
      { name: 'dichVuChon', label: 'Dịch vụ hiện ở trang chủ', type: 'checklist', collection: 'dich-vu', hint: 'Thứ tự hiển thị lấy theo ô "Thứ tự hiển thị" của từng dịch vụ.' },
      { name: 'dichVuNut', label: 'Chữ trên nút', type: 'string' },
      { type: 'heading', label: 'Khối dự án tiêu biểu' },
      { name: 'duAnNhan', label: 'Nhãn nhỏ phía trên tiêu đề', type: 'string' },
      { name: 'duAnTieuDe', label: 'Tiêu đề', type: 'string' },
      { name: 'duAnMoTa', label: 'Mô tả', type: 'text', hint: 'Dự án hiện ở đây được chọn bằng ô "Dự án nổi bật" trong tab Dự án.' },
      { name: 'duAnNut', label: 'Chữ trên nút', type: 'string' },
      { type: 'heading', label: 'Thông tin trên Google' },
      { name: 'seoTieuDe', label: 'Tiêu đề trang', type: 'string', hint: SEO_HINT },
      { name: 'seoMoTa', label: 'Mô tả trang', type: 'text', hint: SEO_HINT },
    ],
  },
  'gioi-thieu': {
    label: 'Giới thiệu',
    xem: '/gioi-thieu/',
    fields: [
      { type: 'heading', label: 'Phần đầu trang' },
      { name: 'heroNhan', label: 'Nhãn nhỏ phía trên tiêu đề', type: 'string' },
      { name: 'heroTieuDe', label: 'Tiêu đề', type: 'string', required: true },
      { name: 'heroMoTa', label: 'Mô tả', type: 'text' },
      { name: 'linhVucHoatDong', label: 'Các nhóm dịch vụ', type: 'stringlist' },
      { type: 'heading', label: 'Ảnh, tầm nhìn, sứ mệnh' },
      { name: 'anh', label: 'Ảnh ngang', type: 'image', required: true },
      { name: 'anhAlt', label: 'Mô tả ảnh (SEO)', type: 'string' },
      { name: 'tamNhinTieuDe', label: 'Tiêu đề Tầm nhìn', type: 'string' },
      { name: 'tamNhin', label: 'Nội dung Tầm nhìn', type: 'text' },
      { name: 'suMenhTieuDe', label: 'Tiêu đề Sứ mệnh', type: 'string' },
      { name: 'suMenh', label: 'Nội dung Sứ mệnh', type: 'text' },
      { type: 'heading', label: 'Giá trị cốt lõi' },
      { name: 'giaTriNhan', label: 'Nhãn nhỏ phía trên tiêu đề', type: 'string' },
      { name: 'giaTriTieuDe', label: 'Tiêu đề', type: 'string' },
      { name: 'giaTriCotLoi', label: 'Các giá trị', type: 'objectlist', fields: [
        { name: 'ten', label: 'Tên', type: 'string' },
        { name: 'mota', label: 'Mô tả', type: 'text' },
      ] },
      { type: 'heading', label: 'Quy trình làm việc' },
      { name: 'quyTrinhNhan', label: 'Nhãn nhỏ phía trên tiêu đề', type: 'string' },
      { name: 'quyTrinhTieuDe', label: 'Tiêu đề', type: 'string' },
      { name: 'quyTrinh', label: 'Các bước', type: 'objectlist', fields: [
        { name: 'buoc', label: 'Tên bước', type: 'string' },
        { name: 'mota', label: 'Mô tả', type: 'text' },
      ] },
      { type: 'heading', label: 'Thông tin trên Google' },
      { name: 'seoTieuDe', label: 'Tiêu đề trang', type: 'string', hint: SEO_HINT },
      { name: 'seoMoTa', label: 'Mô tả trang', type: 'text', hint: SEO_HINT },
    ],
  },
  'lien-he': {
    label: 'Liên hệ',
    xem: '/lien-he/',
    fields: [
      { type: 'heading', label: 'Trang Liên hệ' },
      { name: 'heroNhan', label: 'Nhãn nhỏ phía trên tiêu đề', type: 'string' },
      { name: 'heroTieuDe', label: 'Tiêu đề', type: 'string', required: true },
      { name: 'heroMoTa', label: 'Mô tả', type: 'text', hint: 'Địa chỉ, hotline, email, bản đồ sửa ở tab Thông tin công ty.' },
      { name: 'thongTinTieuDe', label: 'Tiêu đề khối thông tin', type: 'string' },
      { type: 'heading', label: 'Trang cảm ơn (sau khi khách gửi form)' },
      { name: 'camOnTieuDe', label: 'Tiêu đề', type: 'string' },
      { name: 'camOnMoTa', label: 'Nội dung', type: 'text' },
      { type: 'heading', label: 'Thông tin trên Google' },
      { name: 'seoTieuDe', label: 'Tiêu đề trang Liên hệ', type: 'string', hint: SEO_HINT },
      { name: 'seoMoTa', label: 'Mô tả trang Liên hệ', type: 'text', hint: 'Hotline tự thêm vào cuối. ' + SEO_HINT },
      { name: 'camOnSeoTieuDe', label: 'Tiêu đề trang cảm ơn', type: 'string', hint: SEO_HINT },
      { name: 'camOnSeoMoTa', label: 'Mô tả trang cảm ơn', type: 'text', hint: SEO_HINT },
    ],
  },
  'cong-ty': {
    label: 'Thông tin công ty',
    xem: '/lien-he/',
    fields: [
      { type: 'heading', label: 'Tên công ty' },
      { name: 'tenDayDu', label: 'Tên đầy đủ', type: 'string', required: true },
      { name: 'tenNgan', label: 'Tên ngắn', type: 'string', required: true },
      { name: 'phuongCham', label: 'Phương châm', type: 'string' },
      { type: 'heading', label: 'Liên hệ' },
      { name: 'diaChi', label: 'Địa chỉ', type: 'text', hint: 'Mỗi địa chỉ một dòng.' },
      { name: 'hotline', label: 'Hotline', type: 'string', required: true, hint: 'Các số cách nhau bằng dấu " - " (có khoảng trắng hai bên). Nút Gọi ngay dùng số đầu tiên.' },
      { name: 'email', label: 'Email', type: 'string' },
      { name: 'zaloUrl', label: 'Link Zalo', type: 'string', hint: 'Ví dụ: https://zalo.me/0988863321' },
      { name: 'website', label: 'Địa chỉ website', type: 'string', required: true, url: true, hint: 'Phải bắt đầu bằng https://' },
      { name: 'facebook', label: 'Link Facebook', type: 'string', hint: 'Để trống thì không hiện. Có link thì hiện ở cuối trang.' },
      { name: 'youtube', label: 'Link YouTube', type: 'string', hint: 'Để trống thì không hiện. Có link thì hiện ở cuối trang.' },
      { type: 'heading', label: 'Bản đồ trang Liên hệ' },
      { name: 'viDo', label: 'Vĩ độ', type: 'number', required: true, hint: 'Lấy trên Google Maps: bấm chuột phải vào vị trí, bấm vào dòng số đầu tiên để sao chép (số trước dấu phẩy là vĩ độ, số sau là kinh độ).' },
      { name: 'kinhDo', label: 'Kinh độ', type: 'number', required: true },
      { type: 'heading', label: 'Hình ảnh' },
      { name: 'logo', label: 'Logo ở đầu và cuối trang', type: 'image', required: true },
      { name: 'anhChiaSe', label: 'Ảnh mặc định khi chia sẻ link', type: 'image', required: true },
      { type: 'heading', label: 'Thông tin trên Google' },
      { name: 'moTaSeo', label: 'Mô tả ngắn về công ty', type: 'text', hint: SEO_HINT },
    ],
  },
  'doi-tac': {
    label: 'Đối tác',
    xem: '/',
    fields: [
      { name: 'tieuDe', label: 'Tiêu đề dải logo', type: 'string', required: true, hint: 'Dải logo hiện ở Trang chủ và trang Giới thiệu.' },
      { name: 'doiTac', label: 'Danh sách đối tác', type: 'objectlist', fields: [
        { name: 'ten', label: 'Tên đối tác', type: 'string' },
        { name: 'logo', label: 'Logo', type: 'image' },
      ] },
    ],
  },
  'trang-khac': {
    label: 'Trang khác',
    xem: '/dich-vu/',
    fields: [
      { type: 'heading', label: 'Đầu trang và băng rôn cuối trang' },
      { name: 'headerNut', label: 'Chữ trên nút đỏ ở đầu trang', type: 'string' },
      { name: 'ctaTieuDe', label: 'Tiêu đề băng rôn cuối trang', type: 'string' },
      { name: 'ctaMoTa', label: 'Mô tả băng rôn', type: 'text' },
      { name: 'ctaNut', label: 'Chữ trên nút băng rôn', type: 'string' },
      { type: 'heading', label: 'Trang danh sách Dịch vụ' },
      { name: 'dichVuNhan', label: 'Nhãn nhỏ phía trên tiêu đề', type: 'string' },
      { name: 'dichVuTieuDe', label: 'Tiêu đề', type: 'string' },
      { name: 'dichVuMoTa', label: 'Mô tả', type: 'text' },
      { name: 'dichVuSeoMoTa', label: 'Mô tả trên Google', type: 'text', hint: SEO_HINT },
      { type: 'heading', label: 'Trang danh sách Dự án' },
      { name: 'duAnNhan', label: 'Nhãn nhỏ phía trên tiêu đề', type: 'string' },
      { name: 'duAnTieuDe', label: 'Tiêu đề', type: 'string' },
      { name: 'duAnMoTa', label: 'Mô tả', type: 'text' },
      { name: 'duAnRong', label: 'Thông báo khi lĩnh vực chưa có dự án', type: 'text' },
      { name: 'duAnSeoMoTa', label: 'Mô tả trên Google', type: 'text', hint: SEO_HINT },
      { type: 'heading', label: 'Trang danh sách Tin tức' },
      { name: 'tinTucNhan', label: 'Nhãn nhỏ phía trên tiêu đề', type: 'string' },
      { name: 'tinTucTieuDe', label: 'Tiêu đề', type: 'string' },
      { name: 'tinTucSeoMoTa', label: 'Mô tả trên Google', type: 'text', hint: SEO_HINT },
      { type: 'heading', label: 'Trang báo lỗi 404' },
      { name: 'loiTieuDe', label: 'Tiêu đề', type: 'string' },
      { name: 'loiMoTa', label: 'Nội dung', type: 'text' },
    ],
  },
};

// ---- Xử lý ảnh trong nội dung bài (hàm thuần, không đụng tới giao diện) ----

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function unescapeHtml(str) {
  return String(str).replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

// Tìm mọi ảnh trong bài: cả cú pháp ![mô tả](đường dẫn) lẫn thẻ <img> trong <figure>.
function scanBodyImages(text) {
  const out = [];
  const re = /!\[([^\]]*)\]\(([^)\s]+)\)|<img\b[^>]*>/g;
  let m;
  while ((m = re.exec(text))) {
    const raw = m[0];
    let src, alt;
    if (raw.charAt(0) === '!') {
      alt = m[1]; src = m[2];
    } else {
      const s = /\bsrc="([^"]*)"/.exec(raw);
      const a = /\balt="([^"]*)"/.exec(raw);
      src = s ? unescapeHtml(s[1]) : '';
      alt = a ? unescapeHtml(a[1]) : '';
    }
    const figStart = text.lastIndexOf('<figure', m.index);
    const inFigure = figStart !== -1 && figStart > text.lastIndexOf('</figure>', m.index);
    let caption = '';
    let firstInFigure = !inFigure;
    if (inFigure) {
      const figEnd = text.indexOf('</figure>', m.index);
      const fig = text.slice(figStart, figEnd);
      const cap = /<figcaption[^>]*>([\s\S]*?)<\/figcaption>/.exec(fig);
      caption = cap ? unescapeHtml(cap[1].trim()) : '';
      firstInFigure = !/<img\b/.test(text.slice(figStart, m.index));
    }
    out.push({ index: m.index, raw: raw, src: src, alt: alt, inFigure: inFigure, figStart: inFigure ? figStart : -1, caption: caption, firstInFigure: firstInFigure });
  }
  return out;
}

// Các tiêu đề "## ..." trong bài, dùng làm vị trí chèn ảnh.
function bodyHeadings(text) {
  const out = [];
  const re = /^#{2,3}\s+(.+)$/gm;
  let m;
  while ((m = re.exec(text))) out.push({ index: m.index, title: m[1].trim() });
  return out;
}

function figureImgTag(path, alt, extraClass) {
  return '<img ' + (extraClass ? 'class="' + extraClass + '" ' : '') + 'src="' + escapeHtml(path) + '" alt="' + escapeHtml(alt) + '" loading="lazy" />';
}

// 1 ảnh: rộng hết cột. Nhiều ảnh: 2 cột; số ảnh lẻ thì ảnh đầu rộng hết cột.
function buildFigure(paths, caption, alt) {
  const lines = ['<figure>'];
  if (paths.length === 1) {
    lines.push('  ' + figureImgTag(paths[0], alt));
  } else {
    lines.push('  <div class="grid gap-3 sm:grid-cols-2">');
    paths.forEach(function (p, i) {
      const cls = 'aspect-[8/5] object-cover' + (paths.length % 2 === 1 && i === 0 ? ' sm:col-span-2' : '');
      lines.push('    ' + figureImgTag(p, alt, cls));
    });
    lines.push('  </div>');
  }
  if (caption) lines.push('  ' + figcaptionTag(caption));
  lines.push('</figure>');
  return lines.join('\n');
}

function figcaptionTag(caption) {
  return '<figcaption class="mt-2 text-center text-sm text-ink/60">' + escapeHtml(caption) + '</figcaption>';
}

function insertBlockAt(text, block, position) {
  const pos = position === 'end' ? text.length : position === 'start' ? 0 : Number(position);
  const before = text.slice(0, pos).replace(/\s+$/, '');
  const after = text.slice(pos).replace(/^\s+/, '');
  return (before ? before + '\n\n' : '') + block + (after ? '\n\n' + after : '\n');
}

function replaceBodyImage(text, img, newSrc) {
  const tag = img.raw.split(img.raw.charAt(0) === '!' ? img.src : escapeHtml(img.src)).join(img.raw.charAt(0) === '!' ? newSrc : escapeHtml(newSrc));
  return text.slice(0, img.index) + tag + text.slice(img.index + img.raw.length);
}

function removeBodyImage(text, img) {
  const out = text.slice(0, img.index) + text.slice(img.index + img.raw.length);
  return out
    .replace(/<figure\b[^>]*>[\s\S]*?<\/figure>\n*/g, function (fig) {
      const count = (fig.match(/<img\b/g) || []).length;
      if (count === 0) return '';
      // Còn 1 ảnh thì bỏ bố cục 2 cột để ảnh rộng hết cột.
      if (count === 1) return fig.replace(' sm:grid-cols-2', '').replace(/\s*sm:col-span-2/, '');
      return fig;
    })
    .replace(/\n{3,}/g, '\n\n');
}

function setImageCaption(text, img, caption) {
  caption = caption.trim();
  if (!img.inFigure) {
    if (!caption) return text;
    const fig = buildFigure([img.src], caption, img.alt);
    return text.slice(0, img.index) + fig + text.slice(img.index + img.raw.length);
  }
  const figEnd = text.indexOf('</figure>', img.index);
  const fig = text.slice(img.figStart, figEnd);
  let next;
  if (/<figcaption/.test(fig)) {
    next = caption
      ? fig.replace(/<figcaption[^>]*>[\s\S]*?<\/figcaption>/, function () { return figcaptionTag(caption); })
      : fig.replace(/\s*<figcaption[^>]*>[\s\S]*?<\/figcaption>/, '');
  } else {
    next = caption ? fig.replace(/\s*$/, '') + '\n  ' + figcaptionTag(caption) + '\n' : fig;
  }
  return text.slice(0, img.figStart) + next + text.slice(figEnd);
}

// Thêm 2 nút lên/xuống cho một mục trong danh sách.
function moveButtons(el, isSameKind) {
  const wrap = document.createElement('span');
  wrap.style.whiteSpace = 'nowrap';
  [['↑', 'Chuyển lên'], ['↓', 'Chuyển xuống']].forEach(function (cfg, i) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'ghost small'; b.textContent = cfg[0]; b.title = cfg[1];
    b.setAttribute('aria-label', cfg[1]);
    b.style.marginRight = '4px';
    b.addEventListener('click', function () {
      const other = i === 0 ? el.previousElementSibling : el.nextElementSibling;
      if (!other || !isSameKind(other)) return;
      if (i === 0) el.parentNode.insertBefore(el, other);
      else el.parentNode.insertBefore(other, el);
    });
    wrap.appendChild(b);
  });
  return wrap;
}

let state = { collection: 'tin-tuc', items: [], editing: null, page: null, pageSha: null };

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
    closeEditor();
    if (btn.dataset.page) {
      openPage(btn.dataset.page);
      return;
    }
    state.page = null;
    state.collection = btn.dataset.collection;
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
      '<div class="hint">Dùng cú pháp Markdown: <code>## Tiêu đề</code>, <code>**In đậm**</code>, <code>- Gạch đầu dòng</code>. Ảnh thêm, thay, xoá ở khối bên dưới.</div>';
    const bodyTextarea = bodyField.querySelector('textarea');
    bodyTextarea.value = body;
    bodyField.appendChild(renderBodyImageTools(bodyTextarea, function () {
      const t = form.querySelector('[name="tieuDe"]');
      return t ? t.value.trim() : '';
    }));
    form.appendChild(bodyField);

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

  if (f.type === 'heading') {
    wrap.className = 'field-heading';
    wrap.textContent = f.label;
    return wrap;
  }

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
    inp.type = 'number'; inp.step = 'any'; inp.name = f.name; inp.value = value === undefined || value === null ? '' : value;
    wrap.appendChild(inp);
  } else if (f.type === 'date') {
    const inp = document.createElement('input');
    inp.type = 'date'; inp.name = f.name;
    inp.value = value || new Date().toISOString().slice(0, 10);
    wrap.appendChild(inp);
  } else if (f.type === 'image') {
    wrap.appendChild(renderImageInput(f.name, value));
  } else if (f.type === 'checklist') {
    wrap.appendChild(renderChecklist(f, value));
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
    row.appendChild(moveButtons(row, function (other) { return other.classList.contains('repeat-row'); }));
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
    const section = document.createElement('div');
    section.setAttribute('data-nhom-section', '1');
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
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.gap = '8px';
    const headerText = document.createElement('span');
    headerText.textContent = label;
    header.appendChild(headerText);
    header.appendChild(moveButtons(section, function (other) { return other.hasAttribute('data-nhom-section'); }));
    section.appendChild(header);

    currentGrid = document.createElement('div');
    currentGrid.style.display = 'grid';
    currentGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
    currentGrid.style.gap = '10px';
    currentGrid.style.marginBottom = '4px';
    section.appendChild(currentGrid);
    rowsWrap.appendChild(section);
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
        const inp = document.createElement(sf.type === 'text' ? 'textarea' : 'input');
        if (sf.type === 'text') inp.rows = 3;
        else inp.type = 'text';
        inp.setAttribute('data-sub', sf.name);
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
    group.appendChild(moveButtons(group, function (other) { return other.hasAttribute('data-group'); }));
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
    if (f.type === 'heading') return;
    if (f.type === 'checklist') {
      const box = form.querySelector('[data-checklist-field="' + f.name + '"]');
      data[f.name] = box.getAttribute('data-ready')
        ? Array.prototype.map.call(box.querySelectorAll('input:checked'), function (c) { return c.value; })
        : box.chosenFallback;
    } else if (f.type === 'boolean') {
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

// Mở form sửa một trang cố định (tab Trang chủ, Giới thiệu, ...).
function openPage(key) {
  state.page = key;
  state.pageSha = null;
  const schema = PAGE_SCHEMAS[key];
  document.getElementById('list-view').style.display = 'none';
  const editor = document.getElementById('editor');
  editor.style.display = 'block';
  editor.innerHTML = '<div class="empty">Đang tải…</div>';
  api('/api/data?name=' + key)
    .then(function (file) {
      if (state.page !== key) return; // người dùng đã chuyển sang tab khác
      state.pageSha = file.sha;
      buildPageForm(key, schema, JSON.parse(file.content));
    })
    .catch(function (err) {
      if (state.page === key) editor.innerHTML = '<div class="empty">Lỗi tải dữ liệu: ' + escapeHtml(err.message) + '</div>';
    });
}

function buildPageForm(key, schema, loaded) {
  const editor = document.getElementById('editor');
  editor.innerHTML = '';

  const titleRow = document.createElement('div');
  titleRow.style.display = 'flex';
  titleRow.style.justifyContent = 'space-between';
  titleRow.style.alignItems = 'center';
  titleRow.style.gap = '12px';
  const title = document.createElement('h2');
  title.style.margin = '0';
  title.textContent = schema.label;
  titleRow.appendChild(title);
  const viewLink = document.createElement('a');
  viewLink.className = 'ghost small';
  viewLink.textContent = 'Xem trang thật ↗';
  viewLink.href = schema.xem;
  viewLink.target = '_blank';
  viewLink.rel = 'noopener';
  titleRow.appendChild(viewLink);
  editor.appendChild(titleRow);

  const form = document.createElement('form');
  form.id = 'entry-form';
  schema.fields.forEach(function (f) { form.appendChild(renderField(f, loaded[f.name])); });

  const actions = document.createElement('div');
  actions.className = 'form-actions';
  actions.innerHTML = '<button type="submit" class="primary" id="save-btn">Lưu &amp; xuất bản</button>';
  form.appendChild(actions);
  editor.appendChild(form);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = collectFormData(form, schema);
    const missing = schema.fields.filter(function (f) { return f.required && (data[f.name] === '' || data[f.name] === undefined); });
    if (missing.length) {
      showMsg('Thiếu thông tin bắt buộc: ' + missing.map(function (f) { return f.label; }).join(', '), true);
      return;
    }
    const badUrl = schema.fields.find(function (f) { return f.url && !/^https?:\/\/[^\s/]+\.[^\s]+$/.test(data[f.name]); });
    if (badUrl) {
      showMsg(badUrl.label + ' phải bắt đầu bằng https://, ví dụ https://newtechcons.net', true);
      return;
    }
    schema.fields.forEach(function (f) { if (f.type === 'number') data[f.name] = Number(data[f.name]); });

    const saveBtn = form.querySelector('#save-btn');
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<span class="spinner"></span> Đang lưu…';
    api('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Giữ lại những trường không có ô nhập trong form.
      body: JSON.stringify({ name: key, content: JSON.stringify(Object.assign({}, loaded, data)), sha: state.pageSha }),
    })
      .then(function (res) {
        state.pageSha = res.sha;
        showMsg('Đã lưu. Web thật sẽ tự cập nhật sau khoảng 1-3 phút.', false);
      })
      .catch(function (err) { showMsg('Lỗi lưu: ' + err.message, true); })
      .finally(function () {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Lưu & xuất bản';
      });
  });
}

// Ô chọn nhiều mục lấy từ một collection (ví dụ các dịch vụ hiện ở trang chủ).
function renderChecklist(f, value) {
  const box = document.createElement('div');
  box.className = 'repeat-group';
  box.setAttribute('data-checklist-field', f.name);
  box.textContent = 'Đang tải…';
  const chosen = Array.isArray(value) ? value : [];
  api('/api/list?collection=' + f.collection)
    .then(function (res) {
      return Promise.all(res.items.map(function (item) {
        return api('/api/file?collection=' + f.collection + '&name=' + encodeURIComponent(item.name)).then(function (file) {
          return { id: item.name.replace(/\.md$/, ''), title: parseFrontmatter(file.content).data.tieuDe || item.name };
        });
      }));
    })
    .then(function (items) {
      box.textContent = '';
      items.forEach(function (it) {
        const row = document.createElement('label');
        row.style.display = 'flex'; row.style.gap = '8px'; row.style.alignItems = 'center'; row.style.marginBottom = '6px';
        const cb = document.createElement('input');
        cb.type = 'checkbox'; cb.value = it.id; cb.checked = chosen.indexOf(it.id) !== -1;
        cb.style.width = 'auto';
        row.appendChild(cb);
        row.appendChild(document.createTextNode(it.title));
        box.appendChild(row);
      });
      box.setAttribute('data-ready', '1');
    })
    .catch(function (err) { box.textContent = 'Lỗi tải danh sách: ' + err.message; });
  // Giữ nguyên lựa chọn cũ nếu bấm Lưu khi danh sách chưa tải xong.
  box.chosenFallback = chosen;
  return box;
}

// Khối "Ảnh trong bài": thêm ảnh có chú thích, đổi ảnh, xoá ảnh, sửa chú thích.
function renderBodyImageTools(textarea, getTitle) {
  const box = document.createElement('div');
  box.className = 'body-img-tools';
  box.innerHTML =
    '<div class="body-img-add">' +
    '<strong>Thêm ảnh vào bài</strong>' +
    '<label>Chú thích dưới ảnh (không bắt buộc)</label><input type="text" data-role="cap" />' +
    '<label>Vị trí</label><select data-role="pos"></select>' +
    '<input type="file" accept="image/*" multiple data-role="files" style="display:none" />' +
    '<button type="button" class="ghost small" data-role="add" style="margin-top:8px;">+ Chọn ảnh từ máy &amp; chèn</button>' +
    '<div class="hint">Chọn 1 ảnh: ảnh rộng hết cột. Chọn nhiều ảnh cùng lúc: tự xếp thành 2 cột.</div>' +
    '</div>' +
    '<div data-role="list"></div>';
  const capInput = box.querySelector('[data-role="cap"]');
  const posSelect = box.querySelector('[data-role="pos"]');
  const fileInput = box.querySelector('[data-role="files"]');
  const addBtn = box.querySelector('[data-role="add"]');
  const list = box.querySelector('[data-role="list"]');

  function refreshPositions() {
    const old = posSelect.value;
    const headings = bodyHeadings(textarea.value);
    posSelect.innerHTML = '';
    function add(value, label) {
      const o = document.createElement('option');
      o.value = value; o.textContent = label;
      posSelect.appendChild(o);
    }
    headings.forEach(function (h) { add(String(h.index), 'Trước mục: ' + h.title); });
    add('end', 'Cuối bài');
    add('start', 'Đầu bài');
    if (old && Array.prototype.some.call(posSelect.options, function (o) { return o.value === old; })) posSelect.value = old;
  }

  function renderList() {
    refreshPositions();
    list.innerHTML = '';
    const images = scanBodyImages(textarea.value);
    if (images.length === 0) return;
    const heading = document.createElement('strong');
    heading.textContent = 'Ảnh đang có trong bài (' + images.length + ')';
    heading.style.display = 'block';
    heading.style.margin = '12px 0 6px';
    list.appendChild(heading);
    images.forEach(function (img, i) {
      const row = document.createElement('div');
      row.className = 'body-img-row';
      const thumb = document.createElement('img');
      thumb.src = img.src; thumb.alt = '';
      row.appendChild(thumb);
      const side = document.createElement('div');
      side.style.flex = '1';
      side.style.minWidth = '0';
      if (img.firstInFigure) {
        const lab = document.createElement('div');
        lab.className = 'hint'; lab.style.marginTop = '0';
        lab.textContent = 'Chú thích dưới ảnh';
        side.appendChild(lab);
        const cap = document.createElement('input');
        cap.type = 'text'; cap.value = img.caption;
        cap.addEventListener('change', function () {
          textarea.value = setImageCaption(textarea.value, scanBodyImages(textarea.value)[i], cap.value);
          renderList();
        });
        side.appendChild(cap);
      }
      const btns = document.createElement('div');
      btns.style.marginTop = '6px';
      const file = document.createElement('input');
      file.type = 'file'; file.accept = 'image/*'; file.style.display = 'none';
      const swap = document.createElement('button');
      swap.type = 'button'; swap.className = 'ghost small'; swap.textContent = 'Thay ảnh';
      swap.style.marginRight = '6px';
      swap.addEventListener('click', function () { file.click(); });
      file.addEventListener('change', function () {
        if (!file.files[0]) return;
        swap.disabled = true; swap.textContent = 'Đang tải…';
        uploadImage(file.files[0], 'uploads')
          .then(function (path) {
            textarea.value = replaceBodyImage(textarea.value, scanBodyImages(textarea.value)[i], path);
            renderList();
          })
          .catch(function (err) {
            showMsg('Lỗi tải ảnh: ' + err.message, true);
            swap.disabled = false; swap.textContent = 'Thay ảnh';
          });
      });
      const del = document.createElement('button');
      del.type = 'button'; del.className = 'ghost small danger'; del.textContent = 'Xoá ảnh';
      del.addEventListener('click', function () {
        textarea.value = removeBodyImage(textarea.value, scanBodyImages(textarea.value)[i]);
        renderList();
      });
      btns.appendChild(file); btns.appendChild(swap); btns.appendChild(del);
      side.appendChild(btns);
      row.appendChild(side);
      list.appendChild(row);
    });
  }

  addBtn.addEventListener('click', function () { fileInput.click(); });
  fileInput.addEventListener('change', async function () {
    const files = Array.prototype.slice.call(fileInput.files);
    if (files.length === 0) return;
    addBtn.disabled = true;
    try {
      const paths = [];
      for (let i = 0; i < files.length; i++) {
        addBtn.textContent = 'Đang tải ảnh ' + (i + 1) + '/' + files.length + '…';
        paths.push(await uploadImage(files[i], 'uploads'));
      }
      const caption = capInput.value.trim();
      textarea.value = insertBlockAt(textarea.value, buildFigure(paths, caption, caption || getTitle()), posSelect.value);
      capInput.value = '';
      renderList();
    } catch (err) {
      showMsg('Lỗi tải ảnh: ' + err.message, true);
    } finally {
      addBtn.disabled = false;
      addBtn.textContent = '+ Chọn ảnh từ máy & chèn';
      fileInput.value = '';
    }
  });
  textarea.addEventListener('change', renderList);
  renderList();
  return box;
}

checkSession();

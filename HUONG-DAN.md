# Hướng dẫn sử dụng Website Newtechcons

Tài liệu này viết cho người **không biết lập trình** — giải thích cách chạy thử web, đăng bài,
thêm dự án, thay ảnh và đưa web lên internet (deploy). Cứ làm theo từng bước, không cần hiểu code.

> 💡 Có 2 cách chỉnh sửa nội dung web:
> - **Cách dễ (khuyến khích):** vào trang quản trị `/quan-tri` trên trình duyệt — đăng nhập bằng
>   mật khẩu, có form điền sẵn từng ô, không cần biết code.
> - **Cách thủ công:** mở file Markdown bằng bất kỳ trình soạn thảo text nào (Notepad cũng được).
>
> Mục 3–5 hướng dẫn cả hai cách. Trang `/quan-tri` do chính website này tự xây (không qua Netlify/
> GitHub OAuth như bản cũ) — xem cách bật đăng nhập ở **Mục 8**.

---

## 1. Chuẩn bị máy tính (chỉ làm 1 lần)

1. Cài **Node.js** (bản 22 trở lên) từ [nodejs.org](https://nodejs.org) — cứ bấm Next liên tục lúc cài.
2. Cài **Git** từ [git-scm.com](https://git-scm.com) — cũng bấm Next liên tục.
3. Mở terminal (trên Windows: gõ "PowerShell" vào Start Menu), di chuyển vào thư mục dự án:
   ```
   cd duong-dan-toi-thu-muc/newtechcons-web
   ```
4. Cài các thư viện cần thiết (chỉ cần làm 1 lần, hoặc mỗi khi có thay đổi lớn):
   ```
   npm install
   ```

## 2. Chạy thử website ở máy tính (xem trước khi đưa lên internet)

```
npm run dev
```

Mở trình duyệt vào địa chỉ **http://localhost:4321** — đây là bản xem trước, chỉ máy bạn thấy
được. Sửa gì cũng sẽ tự cập nhật ngay trên trình duyệt. Nhấn `Ctrl + C` trong terminal để tắt.

Muốn xem đúng như bản sẽ đưa lên internet (đã tối ưu tốc độ):

```
npm run build
npm run preview
```

---

## 3. Đăng bài tin tức mới

### Cách dễ — qua trang quản trị `/quan-tri`

> ⚠️ Cần bật đăng nhập trước — xem **Mục 8**. Sau khi bật xong thì các lần sau chỉ cần đăng nhập.

1. Vào **https://newtechcons.net/quan-tri**.
2. Nhập mật khẩu quản trị → **Đăng nhập**.
3. Chọn tab **Tin tức** → bấm **+ Thêm mới**.
4. Điền các ô: Tiêu đề, Mô tả ngắn, Ngày đăng, Tác giả, Danh mục (Tin công ty / Kiến thức ngành /
   Dự án tiêu biểu), Ảnh bìa (bấm chọn file ảnh từ máy để tải lên), Nội dung bài viết (Markdown).
5. Bấm **Lưu & xuất bản**.
6. Sau khoảng 1–3 phút, bài viết tự xuất hiện trên web thật (Cloudflare tự build lại — xem Mục 10).

### Cách thủ công — tạo file Markdown

1. Vào thư mục `src/content/tin-tuc/`.
2. Copy 1 file `.md` có sẵn, đổi tên file mới (không dấu, không khoảng trắng, ví dụ
   `khai-truong-van-phong-moi.md`).
3. Mở file bằng Notepad, sửa phần giữa hai dòng `---` (đây là các trường thông tin) và phần nội
   dung bên dưới (viết bằng cú pháp Markdown: `## Tiêu đề`, `**In đậm**`, `- Gạch đầu dòng`...).
4. Lưu file. Nếu đang chạy `npm run dev`, bài mới hiện ngay trên `localhost:4321/tin-tuc`.

---

## 4. Thêm dự án mới

Tương tự Mục 3, nhưng chọn tab **Dự án** trong `/quan-tri` (hoặc thư mục `src/content/du-an/`).

Các trường cần điền: Tiêu đề dự án, Tóm tắt ngắn, Lĩnh vực (chọn 1 trong 4 loại để hiện đúng bộ
lọc ở trang Dự án), Địa điểm, Chủ đầu tư, Công suất (ví dụ: `500 m³/ngày đêm`), Năm hoàn thành,
Công nghệ áp dụng, Ảnh bìa, Thư viện ảnh (có thể thêm nhiều ảnh), và tick **Dự án nổi bật** nếu
muốn dự án này hiện ở trang chủ (trang chủ chỉ hiện tối đa 3 dự án nổi bật mới nhất theo "Thứ tự
hiển thị").

---

## 5. Thay ảnh

### Ảnh trong một bài viết / dự án cụ thể
Vào `/quan-tri`, mở bài viết/dự án đó, ở ô ảnh (Ảnh bìa hoặc Thư viện ảnh) bấm **Chọn file** để tải
ảnh mới từ máy lên → **Lưu & xuất bản**.

### Ảnh dùng chung toàn site (logo, ảnh trang chủ, ảnh dịch vụ...)
Các ảnh này nằm trong thư mục `public/images/` và không quản lý qua CMS. Muốn thay:

1. Chuẩn bị ảnh mới, đặt **đúng tên file** với ảnh cũ (ví dụ ảnh trang chủ tên
   `nha-may-xu-ly-tren-cao.jpg` thì ảnh mới cũng đặt tên y hệt).
2. Copy đè vào đúng thư mục con trong `public/images/` (ví dụ `public/images/dich-vu/`,
   `public/images/thuong-hieu/`...).
3. Chạy lại `npm run build` để kiểm tra, rồi đẩy code lên GitHub (xem Mục 9) để web thật cập nhật.

> 📐 Nên dùng ảnh đúng tỉ lệ với ảnh cũ (ví dụ ảnh dự án là tỉ lệ 4:3, ảnh banner tin tức là 16:9)
> để không bị vỡ bố cục. Nên nén ảnh trước khi tải lên (dùng [squoosh.app](https://squoosh.app))
> để web tải nhanh.

### Danh sách ảnh cần thay bằng ảnh thật (đánh dấu sẵn trong code)
Tìm từ khoá `THAY` trong các file ở `src/content/` — đây là những chỗ tôi để nội dung mẫu/tạm và
ghi chú rõ cần bạn xác nhận hoặc thay bằng thông tin/ảnh thật (ví dụ: năm hoàn thành một số dự án
đang để tạm, ảnh sản phẩm bơm/hoá chất ở trang dịch vụ "Cung cấp bơm & hoá chất" đang là ảnh minh
hoạ chung, chưa gắn thương hiệu cụ thể).

---

## 6. Sửa thông tin công ty (địa chỉ, hotline, email, số liệu...)

Thông tin này nằm ở **một chỗ duy nhất**: file `src/data/congTy.ts`. Sửa ở đây sẽ tự cập nhật
đồng loạt ở header, footer, trang liên hệ và dữ liệu SEO. Mở file bằng Notepad, tìm dòng cần sửa
(mỗi dòng đều có tên tiếng Việt dễ hiểu, ví dụ `hotline: '0988 863 321'`), sửa giá trị trong dấu
nháy đơn `' '`, lưu file lại.

⚠️ Không xoá dấu phẩy, dấu ngoặc — chỉ sửa phần chữ/số bên trong dấu nháy.

---

## 7. Cấu hình form liên hệ (Web3Forms)

Form ở trang Liên hệ dùng dịch vụ miễn phí [Web3Forms](https://web3forms.com) để gửi email, không
cần server riêng.

1. Vào **web3forms.com** → nhập email của bạn → nhận **Access Key** ngay (miễn phí).
2. Ở máy tính: copy file `.env.example` thành file mới tên `.env` (cùng thư mục gốc dự án).
3. Mở file `.env`, dán key vào:
   ```
   PUBLIC_WEB3FORMS_KEY=key-ban-vua-nhan-duoc
   ```
4. Khi deploy lên Cloudflare Pages (Mục 9), khai báo **thêm một lần nữa** biến này trong phần cài
   đặt của Cloudflare (vì file `.env` không được đưa lên internet, đây là quy định bảo mật).

---

## 8. Bật đăng nhập cho trang quản trị `/quan-tri`

Trang `/quan-tri` do chính website này tự xây (xem `worker/index.js`), không qua Netlify hay
GitHub OAuth — không còn lỗi đăng nhập kiểu cũ. Cần khai báo 3 biến bí mật trên Cloudflare:

### Bước 1 — Tạo GitHub Token (để trang quản trị được phép ghi bài lên GitHub)

1. Đăng nhập [github.com](https://github.com) → vào **Settings → Developer settings →
   Personal access tokens → Fine-grained tokens** → **Generate new token**.
2. Đặt tên bất kỳ (ví dụ `newtechcons-quan-tri`).
3. Mục **Repository access** → chọn **Only select repositories** → chọn đúng repo
   `newtechcons-web`. (Tuyệt đối không chọn "All repositories".)
4. Mục **Permissions → Repository permissions** → tìm dòng **Contents** → chọn **Read and write**.
   Không cần cấp thêm quyền nào khác.
5. Bấm **Generate token** → **copy** chuỗi token hiện ra (chỉ hiện đúng 1 lần, dạng
   `github_pat_...`) — dán tạm vào Notepad để dùng ở bước 2.

### Bước 2 — Khai báo biến môi trường trên Cloudflare

1. Vào [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → chọn dự án
   `newtechcons-web` → tab **Settings** → **Variables and Secrets**.
2. Thêm 3 biến, mỗi biến chọn kiểu **Secret** (không phải Text) rồi bấm **Save**:
   - `ADMIN_PASSWORD` — mật khẩu bạn muốn dùng để đăng nhập `/quan-tri` (tự đặt, nên đủ mạnh,
     ví dụ trên 12 ký tự có chữ hoa/thường/số).
   - `GITHUB_TOKEN` — dán token đã tạo ở Bước 1.
   - `SESSION_SECRET` — một chuỗi bất kỳ, càng dài càng khó đoán (ví dụ gõ lung tung 30–40 ký tự).
     Dùng để ký phiên đăng nhập, không cần nhớ.
3. Deploy lại (đẩy code lên GitHub một lần, xem Mục 9) để Cloudflare áp dụng biến mới — hoặc bấm
   **Retry deployment** ở bản deploy gần nhất nếu không có gì để đẩy lên.
4. Vào `https://newtechcons.net/quan-tri`, nhập đúng `ADMIN_PASSWORD` vừa đặt để đăng nhập.

> ⚠️ Không chia sẻ `GITHUB_TOKEN` hay `ADMIN_PASSWORD` cho người lạ — ai có mật khẩu đăng nhập được
> đều có thể sửa/xoá nội dung trên web thật. Nếu nghi lộ mật khẩu, đổi ngay `ADMIN_PASSWORD` trên
> Cloudflare; nếu nghi lộ token, vào GitHub xoá token cũ và tạo token mới (Bước 1) rồi cập nhật lại.

---

## 9. Deploy website lên Cloudflare Pages

### Bước 1 — Đưa code lên GitHub (chỉ làm 1 lần)

1. Tạo tài khoản tại [github.com](https://github.com) nếu chưa có.
2. Tạo một **repository** mới (ví dụ tên `newtechcons-web`), để **Private** hoặc **Public** tuỳ ý.
3. Trong terminal, tại thư mục dự án:
   ```
   git init
   git add .
   git commit -m "Website Newtechcons"
   git branch -M main
   git remote add origin https://github.com/ten-tai-khoan-cua-ban/newtechcons-web.git
   git push -u origin main
   ```

### Bước 2 — Kết nối Cloudflare Pages

1. Vào [dash.cloudflare.com](https://dash.cloudflare.com) → đăng nhập/tạo tài khoản.
2. Menu bên trái: **Workers & Pages** → **Create application** → tab **Pages** → **Connect to Git**.
3. Chọn repo `newtechcons-web` vừa tạo.
4. Ở phần cấu hình build:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Mục **Environment variables** → thêm biến `PUBLIC_WEB3FORMS_KEY` với giá trị access key ở Mục 7.
6. Bấm **Save and Deploy** — chờ vài phút, Cloudflare sẽ cấp cho bạn một link dạng
   `ten-du-an.pages.dev` để xem thử.

### Bước 3 — Trỏ domain `newtechcons.net` về Cloudflare Pages

1. Trong dự án Pages vừa tạo → tab **Custom domains** → **Set up a custom domain** → nhập
   `newtechcons.net`.
2. Nếu domain `newtechcons.net` cũng đang quản lý DNS tại Cloudflare (khuyến khích) thì hệ thống
   tự thêm bản ghi DNS giúp bạn. Nếu domain mua ở nơi khác, Cloudflare sẽ chỉ bạn cách trỏ bản ghi
   `CNAME`/`NS` tương ứng.
3. Chờ vài phút đến vài giờ để DNS cập nhật, sau đó `https://newtechcons.net` sẽ chạy đúng website.

---

## 10. Sau khi deploy — quy trình cập nhật hằng ngày

- **Đăng bài / thêm dự án qua `/quan-tri`:** bấm Lưu & xuất bản là trang quản trị tự commit thay
  đổi lên GitHub → Cloudflare tự phát hiện và build lại → sau 1–3 phút web thật tự cập nhật. Bạn
  không cần làm gì thêm.
- **Sửa code thủ công ở máy** (ví dụ sửa `src/data/congTy.ts`): sau khi sửa, chạy:
  ```
  git add .
  git commit -m "Mô tả ngắn về thay đổi"
  git push
  ```
  Cloudflare cũng tự build lại tương tự.

---

## 11. Câu hỏi thường gặp

**Build bị lỗi trên Cloudflare, báo thiếu trường dữ liệu ở một bài viết/dự án?**
→ Website có "kiểm tra dữ liệu" tự động (Content Collections) — nếu một bài viết thiếu trường bắt
buộc (ví dụ quên chọn Lĩnh vực dự án), web sẽ **từ chối build** để tránh lỗi hiển thị, thay vì lên
web thật với dữ liệu sai. Vào `/quan-tri` kiểm tra lại bài viết/dự án vừa sửa, điền đủ các trường
có dấu `*`, lưu lại.

**Form liên hệ gửi không được?**
→ Kiểm tra đã khai báo `PUBLIC_WEB3FORMS_KEY` đúng ở cả file `.env` (chạy ở máy) lẫn phần
Environment variables trên Cloudflare Pages (chạy web thật) chưa — đây là hai nơi khai báo riêng
biệt.

**Muốn xoá một bài viết/dự án?**
→ Vào `/quan-tri`, mở tab tương ứng, bấm nút **Xoá** trên dòng bài đó. Hoặc xoá thủ công file `.md`
tương ứng trong `src/content/`.

**Đăng nhập `/quan-tri` báo sai mật khẩu dù gõ đúng, hoặc báo lỗi khi lưu bài?**
→ Kiểm tra lại 3 biến `ADMIN_PASSWORD`, `GITHUB_TOKEN`, `SESSION_SECRET` đã khai báo đúng trên
Cloudflare (Mục 8) chưa — gõ sai hoặc thiếu 1 trong 3 biến đều khiến đăng nhập/lưu bài thất bại.
Nếu báo lỗi liên quan GitHub khi lưu bài, kiểm tra `GITHUB_TOKEN` còn hạn dùng và vẫn có quyền
**Contents: Read and write** trên đúng repo không (fine-grained token có thể tự hết hạn theo thời
gian bạn đặt lúc tạo).

**Lỡ tay publish nhầm, muốn quay lại bản cũ?**
→ Vì mọi thay đổi đều lưu trên GitHub, vào repo trên GitHub → tab **Commits** → xem lại lịch sử,
có thể khôi phục bất kỳ phiên bản nào trước đó (nên nhờ người biết Git hỗ trợ thao tác này).

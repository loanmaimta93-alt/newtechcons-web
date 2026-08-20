# Newtechcons — Website công ty

Website giới thiệu công ty cho Newtechcons (xử lý nước & hệ thống kỹ thuật công nghiệp).
Xây bằng **Astro** + **TypeScript** + **Tailwind CSS v4**, nội dung quản lý qua **Astro Content
Collections** (Markdown) và chỉnh sửa không cần code qua **Decap CMS** tại `/admin`.

> 📘 Nếu bạn không rành lập trình, đọc file [`HUONG-DAN.md`](./HUONG-DAN.md) thay vì file này —
> nó giải thích bằng tiếng Việt đơn giản cách chạy web, đăng bài, thêm dự án và deploy.

## Cấu trúc dự án

```text
/
├── public/
│   ├── admin/            # Decap CMS (index.html + config.yml)
│   ├── images/            # Ảnh tĩnh (dự án, dịch vụ, thương hiệu, đối tác)
│   └── _headers           # Cache-Control cho Cloudflare Pages
├── src/
│   ├── components/         # Component dùng chung (Header, Footer, các Card...)
│   ├── content/             # Nội dung Markdown: du-an/, tin-tuc/, dich-vu/
│   ├── content.config.ts    # Schema (zod) validate nội dung Markdown
│   ├── data/congTy.ts       # Thông tin công ty dùng chung toàn site
│   ├── layouts/BaseLayout.astro
│   ├── pages/                # Từng route của site
│   └── styles/global.css     # Design tokens (màu, font) + Tailwind
├── astro.config.mjs
└── wrangler.toml            # Cấu hình deploy Cloudflare Pages (tuỳ chọn, dùng khi deploy bằng CLI)
```

## Lệnh thường dùng

| Lệnh | Chức năng |
| --- | --- |
| `npm install` | Cài dependencies |
| `npm run dev` | Chạy dev server tại `localhost:4321` |
| `npm run build` | Kiểm tra kiểu dữ liệu (`astro check`) rồi build ra `./dist/` |
| `npm run preview` | Xem thử bản build production ở local |
| `npm run check` | Chỉ chạy `astro check` |

## Stack

- **Astro 7** (static output — `output: 'static'`)
- **TypeScript** (strict)
- **Tailwind CSS v4** (cấu hình qua `@theme` trong `src/styles/global.css`, không dùng file `tailwind.config`)
- **Astro Content Collections** với loader `glob` — nội dung Markdown trong `src/content/`
- **Decap CMS** tại `/admin` — xem `public/admin/config.yml`
- **Web3Forms** cho form liên hệ — xem `src/components/ContactForm.astro` và `.env.example`
- **@astrojs/sitemap** — tự sinh `sitemap-index.xml`

## Deploy

Deploy đích là **Cloudflare Pages**, build tĩnh (không cần adapter SSR):

- Build command: `npm run build`
- Output directory: `dist`
- Biến môi trường cần khai báo trên Cloudflare Pages: `PUBLIC_WEB3FORMS_KEY`

Chi tiết từng bước (kể cả cho người không biết code) xem `HUONG-DAN.md`.

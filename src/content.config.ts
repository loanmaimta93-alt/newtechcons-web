import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Các lĩnh vực dự án — dùng chung cho bộ lọc ở trang /du-an
export const LINH_VUC_DU_AN = [
  'Xử lý nước thải',
  'Xử lý nước cấp',
  'Cấp thoát nước hạ tầng',
  'Hệ thống kỹ thuật cơ điện (M&E)',
] as const;

// Các danh mục tin tức — dùng chung cho bộ lọc ở trang /tin-tuc
export const DANH_MUC_TIN_TUC = [
  'Tin công ty',
  'Kiến thức ngành',
  'Dự án tiêu biểu',
] as const;

const duAn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/du-an' }),
  schema: z.object({
    tieuDe: z.string(),
    tomTat: z.string(),
    linhVuc: z.enum(LINH_VUC_DU_AN),
    diaDiem: z.string(),
    chuDauTu: z.string(),
    congSuat: z.string(),
    namHoanThanh: z.number().int(),
    thoiGianThiCong: z.string().optional(),
    congNghe: z.array(z.string()).default([]),
    anhBia: z.string(),
    anhBiaAlt: z.string(),
    thuVienAnh: z
      .array(
        z.object({
          duong_dan: z.string(),
          alt: z.string(),
        }),
      )
      .default([]),
    noiBat: z.boolean().default(false),
    thuTu: z.number().default(0),
  }),
});

const tinTuc = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tin-tuc' }),
  schema: z.object({
    tieuDe: z.string(),
    moTa: z.string(),
    ngayDang: z.coerce.date(),
    tacGia: z.string().default('Ban biên tập Newtechcons'),
    danhMuc: z.enum(DANH_MUC_TIN_TUC),
    anhBia: z.string(),
    anhBiaAlt: z.string(),
    noiBat: z.boolean().default(false),
  }),
});

const dichVu = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/dich-vu' }),
  schema: z.object({
    tieuDe: z.string(),
    moTaNgan: z.string(),
    icon: z.enum(['giot-nuoc', 'bo-loc', 'duong-ong', 'dong-ho', 'nha-may', 'bao-tri', 'ho-so', 'bom-hoa-chat']),
    anhBia: z.string(),
    anhBiaAlt: z.string(),
    thuTu: z.number().default(0),
    loiIch: z.array(z.string()).default([]),
    quyTrinh: z
      .array(
        z.object({
          buoc: z.string(),
          moTa: z.string(),
        }),
      )
      .default([]),
    sanPham: z
      .array(
        z.object({
          ten: z.string(),
          moTa: z.string().optional(),
          hinhAnh: z.string(),
          hinhAnhAlt: z.string(),
        }),
      )
      .default([]),
  }),
});

export const collections = {
  'du-an': duAn,
  'tin-tuc': tinTuc,
  'dich-vu': dichVu,
};

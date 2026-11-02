// Nội dung dùng chung của website — đọc từ các file JSON trong src/data/noi-dung/.
// Các file JSON này do trang quản trị /quan-tri ghi (tab Trang chủ, Giới thiệu, Liên hệ,
// Thông tin công ty, Đối tác, Trang khác). Sửa ở đó sẽ cập nhật đồng loạt toàn site.
//
// Mọi file đều được kiểm tra bằng schema bên dưới lúc build: dữ liệu sai sẽ dừng build
// (web thật giữ nguyên bản đang chạy) thay vì đưa nội dung lỗi lên internet.
import { z } from 'astro/zod';
import congTyJson from './noi-dung/cong-ty.json';
import trangChuJson from './noi-dung/trang-chu.json';
import gioiThieuJson from './noi-dung/gioi-thieu.json';
import lienHeJson from './noi-dung/lien-he.json';
import doiTacJson from './noi-dung/doi-tac.json';
import trangKhacJson from './noi-dung/trang-khac.json';

const chu = z.string();

const congTyGoc = z
  .object({
    tenDayDu: chu.min(1),
    tenNgan: chu.min(1),
    phuongCham: chu,
    diaChi: chu,
    hotline: chu.min(1),
    email: chu,
    zaloUrl: chu,
    website: chu.url(),
    facebook: chu,
    youtube: chu,
    viDo: z.number(),
    kinhDo: z.number(),
    logo: chu.min(1),
    anhChiaSe: chu.min(1),
    moTaSeo: chu,
  })
  .parse(congTyJson);

// Mỗi dòng hiển thị 2 số hotline, số nào dư xuống dòng tiếp theo.
const soHotline = congTyGoc.hotline.split(/\s+-\s+/).filter(Boolean);
const hotlineDong: string[] = [];
for (let i = 0; i < soHotline.length; i += 2) {
  hotlineDong.push(soHotline.slice(i, i + 2).join(' - '));
}

export const congTy = {
  ...congTyGoc,
  hotlineDong,
  // Số đầu tiên trong danh sách — dùng cho nút "Gọi ngay" bấm-để-gọi.
  hotlineHref: `tel:${(soHotline[0] ?? '').replace(/[^0-9+]/g, '')}`,
  toaDoBanDo: { lat: congTyGoc.viDo, lng: congTyGoc.kinhDo },

  // Số liệu cho DatasheetCard — thành phần này hiện chưa được trang nào sử dụng.
  thongKe: [
    { so: '14+', nhan: 'dự án đã triển khai' },
    { so: '9', nhan: 'tỉnh, thành có công trình' },
    { so: '11+', nhan: 'đối tác & chủ đầu tư' },
    { so: '4', nhan: 'công nghệ xử lý làm chủ' },
  ],
};

export const trangChu = z
  .object({
    seoTieuDe: chu,
    seoMoTa: chu,
    heroAnh: chu,
    heroTieuDe: chu,
    heroMoTa: chu,
    heroNut1: chu,
    heroNut2: chu,
    gioiThieuAnh: chu,
    gioiThieuAnhAlt: chu,
    gioiThieuNhan: chu,
    gioiThieuTieuDe: chu,
    gioiThieuNoiDung: chu,
    baChuVang: z.array(z.object({ chu, mota: chu })),
    gioiThieuNut: chu,
    dichVuNhan: chu,
    dichVuTieuDe: chu,
    dichVuMoTa: chu,
    dichVuChon: z.array(chu),
    dichVuNut: chu,
    duAnNhan: chu,
    duAnTieuDe: chu,
    duAnMoTa: chu,
    duAnNut: chu,
  })
  .parse(trangChuJson);

export const gioiThieu = z
  .object({
    seoTieuDe: chu,
    seoMoTa: chu,
    heroNhan: chu,
    heroTieuDe: chu,
    heroMoTa: chu,
    linhVucHoatDong: z.array(chu),
    anh: chu,
    anhAlt: chu,
    tamNhinTieuDe: chu,
    tamNhin: chu,
    suMenhTieuDe: chu,
    suMenh: chu,
    giaTriNhan: chu,
    giaTriTieuDe: chu,
    giaTriCotLoi: z.array(z.object({ ten: chu, mota: chu })),
    quyTrinhNhan: chu,
    quyTrinhTieuDe: chu,
    quyTrinh: z.array(z.object({ buoc: chu, mota: chu })),
  })
  .parse(gioiThieuJson);

export const lienHe = z
  .object({
    seoTieuDe: chu,
    seoMoTa: chu,
    heroNhan: chu,
    heroTieuDe: chu,
    heroMoTa: chu,
    thongTinTieuDe: chu,
    camOnSeoTieuDe: chu,
    camOnSeoMoTa: chu,
    camOnTieuDe: chu,
    camOnMoTa: chu,
  })
  .parse(lienHeJson);

const doiTac = z
  .object({
    tieuDe: chu,
    doiTac: z.array(z.object({ ten: chu, logo: chu })),
  })
  .parse(doiTacJson);

export const tieuDeDoiTac = doiTac.tieuDe;
// Đối tác chưa có logo thì tạm ẩn thay vì hiện ảnh hỏng.
export const khachHang = doiTac.doiTac.filter((dt) => dt.logo);

export const trangKhac = z
  .object({
    headerNut: chu,
    ctaTieuDe: chu,
    ctaMoTa: chu,
    ctaNut: chu,
    dichVuSeoMoTa: chu,
    dichVuNhan: chu,
    dichVuTieuDe: chu,
    dichVuMoTa: chu,
    duAnSeoMoTa: chu,
    duAnNhan: chu,
    duAnTieuDe: chu,
    duAnMoTa: chu,
    duAnRong: chu,
    tinTucSeoMoTa: chu,
    tinTucNhan: chu,
    tinTucTieuDe: chu,
    loiTieuDe: chu,
    loiMoTa: chu,
  })
  .parse(trangKhacJson);

// Đổi **chữ** thành chữ in đậm; phần còn lại được escape để không chèn được HTML.
export function inDam(vanBan: string) {
  return vanBan
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-navy-deep">$1</strong>');
}

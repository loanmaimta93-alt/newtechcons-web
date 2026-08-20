// Thông tin công ty dùng chung toàn site — lấy từ Hồ sơ năng lực NEWTECHCONS 2026.
// Sửa ở đây sẽ cập nhật đồng loạt header, footer, trang liên hệ và schema.org.

export const congTy = {
  tenDayDu: 'Công ty Cổ phần Xây dựng và Công nghệ Newtechcons',
  tenNgan: 'Newtechcons',
  masoThue: '', // THAY: bổ sung mã số thuế nếu muốn hiển thị công khai
  diaChi: 'Thôn Phú Hạng, xã Hưng Đạo, TP. Hà Nội',
  hotline: '0988 863 321',
  hotlineHref: 'tel:0988863321',
  zaloUrl: 'https://zalo.me/0988863321',
  email: 'Newtechcons.jsc@gmail.com',
  website: 'https://newtechcons.net',
  phuongCham: 'Giá trị bền vững cho tương lai',
  toaDoBanDo: { lat: 21.0181, lng: 105.9522 }, // THAY: cập nhật đúng tọa độ trụ sở nếu chưa chính xác

  mangXaHoi: {
    // THAY: điền link thật hoặc xoá dòng nếu chưa có kênh tương ứng
    facebook: '',
    youtube: '',
  },

  baChuVang: [
    {
      chu: 'TÍN',
      mota: 'Newtechcons luôn cố gắng chuẩn bị đầy đủ năng lực thực thi, nỗ lực hết mình để đảm bảo đúng và cao hơn các cam kết với khách hàng, đối tác — đặc biệt là cam kết về chất lượng sản phẩm, dịch vụ và tiến độ thực hiện.',
    },
    {
      chu: 'TÂM',
      mota: 'Đặt lợi ích và mong muốn của khách hàng lên hàng đầu, nỗ lực mang đến những sản phẩm, dịch vụ hoàn hảo nhất, mang lại giá trị bền vững cho môi trường.',
    },
    {
      chu: 'TỐC',
      mota: 'Cam kết hoàn thành nhanh nhất các sản phẩm nhằm tối ưu hóa chi phí đầu tư cho khách hàng.',
    },
  ],

  tamNhin:
    'Vươn lên vị trí dẫn đầu trong ngành cung cấp dịch vụ môi trường, trở thành công ty có tiềm lực vững mạnh, là đối tác đáng tin cậy của mọi chủ đầu tư và tổng thầu.',
  suMenh:
    'Mang đến những giải pháp tối ưu, hiệu quả giúp tiết kiệm thời gian và chi phí cho khách hàng. Dùng uy tín và chất lượng làm nền móng phát triển, góp phần nâng cao đời sống và một môi trường sạch đẹp.',

  giaTriCotLoi: [
    {
      ten: 'Trách nhiệm',
      mota: 'Trách nhiệm với khách hàng, công ty và xã hội — đảm bảo tiến độ và chất lượng dịch vụ.',
    },
    {
      ten: 'Tôn trọng',
      mota: 'Tôn trọng khách hàng, đối tác, nhân viên và tạo môi trường làm việc công bằng.',
    },
    {
      ten: 'Chính trực',
      mota: 'Liêm chính, trung thực là nền tảng cho mọi hoạt động, tuân thủ pháp luật và các chuẩn mực đạo đức.',
    },
    {
      ten: 'Tối ưu & Sáng tạo',
      mota: 'Chủ động đưa ra giải pháp tối ưu giúp tiết kiệm thời gian, chi phí cho khách hàng; ứng dụng công nghệ tiên tiến nâng cao giá trị công trình.',
    },
  ],

  quyTrinh: [
    {
      buoc: 'Khảo sát & tư vấn',
      mota: 'Khảo sát hiện trạng, thông số nước đầu vào/đầu ra, tư vấn công nghệ và pháp lý môi trường phù hợp.',
    },
    {
      buoc: 'Thiết kế kỹ thuật',
      mota: 'Lập bản vẽ thiết kế, tính toán công suất, lựa chọn công nghệ (SBR, Anoxic-Oxic, USBF, Mương oxy hoá...).',
    },
    {
      buoc: 'Thi công & lắp đặt',
      mota: 'Thi công phần xây dựng, lắp đặt thiết bị cơ điện, đường ống theo đúng bản vẽ được duyệt.',
    },
    {
      buoc: 'Vận hành thử & nghiệm thu',
      mota: 'Chạy thử, hiệu chỉnh thông số vi sinh, quan trắc chất lượng nước đầu ra, nghiệm thu bàn giao.',
    },
    {
      buoc: 'Bảo trì & vận hành',
      mota: 'Bảo trì, bảo dưỡng định kỳ bơm quạt, thiết bị; hỗ trợ vận hành lâu dài sau bàn giao.',
    },
  ],

  // Số liệu thống kê — đếm được trực tiếp từ hồ sơ năng lực, không suy diễn.
  thongKe: [
    { so: '14+', nhan: 'dự án đã triển khai' },
    { so: '9', nhan: 'tỉnh, thành có công trình' },
    { so: '11+', nhan: 'đối tác & chủ đầu tư' },
    { so: '4', nhan: 'công nghệ xử lý làm chủ' },
  ],

  linhVucHoatDong: [
    'Thiết kế, thi công hệ thống xử lý nước thải công nghiệp & sinh hoạt',
    'Thiết kế, thi công hệ thống xử lý nước cấp (nước sạch)',
    'Thiết kế, thi công hệ thống xử lý khí thải',
    'Bảo trì, bảo dưỡng, vệ sinh bơm quạt các hệ thống xử lý nước & khí thải',
    'Tư vấn pháp lý môi trường: lập ĐTM, giấy phép môi trường, đăng ký môi trường',
  ],
} as const;

export const khachHang = [
  { ten: 'Kinden Vietnam', logo: '/images/doi-tac/kinden-vietnam.png' },
  { ten: 'CSCEC', logo: '/images/doi-tac/cscec.png' },
  { ten: 'Takasago', logo: '/images/doi-tac/takasago.png' },
  { ten: 'Visicons', logo: '/images/doi-tac/visicons.png' },
  { ten: 'Hopluc', logo: '/images/doi-tac/hopluc.png' },
  { ten: 'Benzen', logo: '/images/doi-tac/benzen.png' },
  { ten: 'Kinh Bắc City', logo: '/images/doi-tac/kinhbac-city.png' },
  { ten: 'Vingroup', logo: '/images/doi-tac/vingroup.png' },
  { ten: 'CM Japan', logo: '/images/doi-tac/cm-japan.png' },
  { ten: 'Kurihara Vietnam', logo: '/images/doi-tac/kurihara-vietnam.png' },
  { ten: 'Hana Engineering & Construction', logo: '/images/doi-tac/hana-engineering.png' },
];

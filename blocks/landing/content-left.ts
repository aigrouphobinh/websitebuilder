export const registerContentLeftBlock = (bm: any) => {
  bm.add("landing-content-left", {
    label: "Content (Img Left)",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="12" y1="3" x2="12" y2="21"></line></svg>`,
    content: `
      <section class="landing-content" style="padding: 60px 20px; background: #fff;">
        <div class="content-wrapper" style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: center; gap: 40px;">
          
          <div class="content-image" style="flex: 1; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
            <div style="width: 100%; padding-top: 75%; background: #e5e7eb; position: relative;">
              <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #9ca3af;">
                Kéo thả hình ảnh
              </div>
            </div>
          </div>
          
          <div class="content-text" style="flex: 1;">
            <h2 style="font-size: 32px; font-weight: 700; color: #111827; margin-bottom: 20px; line-height: 1.3;">Tối ưu hóa quy trình tổ chức sự kiện</h2>
            <p style="font-size: 16px; color: #4b5563; margin-bottom: 24px; line-height: 1.7;">Chúng tôi cung cấp giải pháp toàn diện giúp bạn dễ dàng quản lý từ khâu bán vé, check-in đến phân tích sau sự kiện. Mọi thứ đều được tự động hóa để tiết kiệm thời gian.</p>
            <ul style="list-style: none; padding: 0; margin: 0 0 32px 0;">
              <li style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; color: #374151;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #dbeafe; color: #2563eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">✓</div>
                Đăng ký và thanh toán online nhanh chóng
              </li>
              <li style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; color: #374151;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #dbeafe; color: #2563eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">✓</div>
                Check-in bằng mã QR code tiện lợi
              </li>
              <li style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; color: #374151;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #dbeafe; color: #2563eb; display: flex; align-items: center; justify-content: center; font-size: 12px;">✓</div>
                Báo cáo thống kê trực quan, chi tiết
              </li>
            </ul>
            <a href="#" style="display: inline-block; padding: 12px 24px; background: #2563eb; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600;">Khám phá ngay</a>
          </div>

        </div>
        <style>
          @media (max-width: 600px) {
            .landing-content .content-wrapper { grid-template-columns: minmax(0, 1fr) !important; gap: 24px !important; }
            .landing-content .content-text { order: -1; }
            .landing-content { padding: 40px 16px !important; }
          }
        </style>
      </section>
    `,
  });
};

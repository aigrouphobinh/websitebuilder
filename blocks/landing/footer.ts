export const registerFooterBlock = (bm: any) => {
  bm.add("landing-footer", {
    label: "Footer",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
    content: `
      <footer class="landing-footer" style="background: #111827; color: #f3f4f6; padding: 60px 20px 30px;">
        <div class="container" style="max-width: 1200px; margin: 0 auto;">
          <div class="footer-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; margin-bottom: 60px;">
            <div class="footer-brand">
              <div class="logo" style="font-size: 24px; font-weight: 700; color: white; margin-bottom: 20px;">Brand</div>
              <p style="color: #9ca3af; line-height: 1.6;">Nền tảng tổ chức sự kiện hàng đầu Việt Nam.</p>
            </div>
            <div class="footer-links">
              <h4 style="font-size: 16px; font-weight: 600; color: white; margin-bottom: 20px;">Sản phẩm</h4>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <a href="#" style="color: #9ca3af; text-decoration: none; transition: color 0.2s;">Tính năng</a>
                <a href="#" style="color: #9ca3af; text-decoration: none; transition: color 0.2s;">Bảng giá</a>
                <a href="#" style="color: #9ca3af; text-decoration: none; transition: color 0.2s;">Showcase</a>
              </div>
            </div>
            <div class="footer-links">
              <h4 style="font-size: 16px; font-weight: 600; color: white; margin-bottom: 20px;">Công ty</h4>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <a href="#" style="color: #9ca3af; text-decoration: none; transition: color 0.2s;">Về chúng tôi</a>
                <a href="#" style="color: #9ca3af; text-decoration: none; transition: color 0.2s;">Tuyển dụng</a>
                <a href="#" style="color: #9ca3af; text-decoration: none; transition: color 0.2s;">Liên hệ</a>
              </div>
            </div>
            <div class="footer-social">
              <h4 style="font-size: 16px; font-weight: 600; color: white; margin-bottom: 20px;">Theo dõi</h4>
              <div style="display: flex; gap: 16px;">
                <a href="#" style="color: #9ca3af; transition: color 0.2s;">Facebook</a>
                <a href="#" style="color: #9ca3af; transition: color 0.2s;">Twitter</a>
                <a href="#" style="color: #9ca3af; transition: color 0.2s;">LinkedIn</a>
              </div>
            </div>
          </div>
          <div class="footer-bottom" style="border-top: 1px solid #374151; padding-top: 30px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
            <p style="color: #9ca3af; font-size: 14px;">© 2024 Company Name. All rights reserved.</p>
            <div style="display: flex; gap: 24px;">
              <a href="#" style="color: #9ca3af; text-decoration: none; font-size: 14px;">Chính sách bảo mật</a>
              <a href="#" style="color: #9ca3af; text-decoration: none; font-size: 14px;">Điều khoản sử dụng</a>
            </div>
          </div>
        </div>
      </footer>
      <style>
        .landing-footer a:hover { color: #fff !important; }
      </style>
    `,
  });
};

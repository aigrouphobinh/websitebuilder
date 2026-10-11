export const registerHeaderBlock = (bm: any) => {
  bm.add("landing-header", {
    label: "Header (Sticky)",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line></svg>`,
    content: `
      <header class="landing-header" data-gjs-type="header" style="position: sticky; top: 0; width: 100%; background: #fff; padding: 16px 24px; z-index: 999; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: space-between;">
        <div class="logo" style="font-weight: 700; font-size: 24px; color: #111827;">Brand</div>
        <nav class="landing-nav" style="display: flex; gap: 24px; align-items: center;">
          <a href="#home" style="text-decoration: none; color: #4b5563; font-weight: 500; transition: color 0.2s;">Trang chủ</a>
          <a href="#features" style="text-decoration: none; color: #4b5563; font-weight: 500; transition: color 0.2s;">Tính năng</a>
          <a href="#contact" style="text-decoration: none; color: #4b5563; font-weight: 500; transition: color 0.2s;">Liên hệ</a>
          <a href="#" class="cta-btn" style="padding: 8px 20px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">Đăng ký</a>
        </nav>
      </header>
      <style>
        .landing-header .landing-nav a:hover { color: #2563eb !important; }
        @media (max-width: 768px) {
          .landing-header { padding: 12px 16px !important; }
          .landing-header .landing-nav { display: none !important; }
        }
      </style>
    `,
  });
};

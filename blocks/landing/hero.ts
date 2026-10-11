export const registerHeroBlock = (bm: any) => {
  bm.add("landing-hero", {
    label: "Hero Banner",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>`,
    content: `
      <section class="landing-hero" style="position: relative; min-height: 600px; display: flex; align-items: center; justify-content: center; background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80'); background-size: cover; background-position: center; color: #fff; text-align: center; padding: 60px 20px;">
        <div class="hero-overlay" style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4));"></div>
        <div class="hero-content" style="position: relative; z-index: 1; max-width: 800px; width: 100%;">
          <span class="hero-badge" style="display: inline-block; padding: 6px 16px; background: rgba(255,255,255,0.1); backdrop-filter: blur(4px); border-radius: 999px; font-size: 14px; font-weight: 500; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.2);">✨ Giải pháp sự kiện toàn diện</span>
          <h1 class="hero-title" style="font-size: 48px; font-weight: 800; margin-bottom: 24px; line-height: 1.2; letter-spacing: -0.02em;">Tổ chức sự kiện chuyên nghiệp <br/>với chi phí tối ưu</h1>
          <p class="hero-desc" style="font-size: 20px; margin-bottom: 40px; color: rgba(255,255,255,0.9); line-height: 1.6;">Nền tảng Checkin giúp bạn quản lý vé, check-in và báo cáo chi tiết chỉ trong vài cú click chuột.</p>
          <div class="hero-actions" style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
            <a href="#" class="btn-primary" style="display: inline-block; padding: 14px 32px; background: #2563eb; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; border: 1px solid #2563eb; transition: all 0.2s;">Bắt đầu ngay</a>
            <a href="#" class="btn-outline" style="display: inline-block; padding: 14px 32px; background: transparent; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; border: 1px solid rgba(255,255,255,0.3); transition: all 0.2s;">Xem Demo</a>
          </div>
        </div>
      </section>
      <style>
        .landing-hero .btn-primary:hover { background: #1d4ed8 !important; border-color: #1d4ed8 !important; transform: translateY(-1px); }
        .landing-hero .btn-outline:hover { background: rgba(255,255,255,0.1) !important; transform: translateY(-1px); }
        @media (max-width: 768px) {
          .landing-hero .hero-title { font-size: 32px !important; }
          .landing-hero .hero-desc { font-size: 16px !important; }
        }
      </style>
    `,
  });
};

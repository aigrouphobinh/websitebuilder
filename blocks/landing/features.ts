export const registerFeaturesBlock = (bm: any) => {
  bm.add("landing-features", {
    label: "Features Grid",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>`,
    content: `
      <section id="features" class="landing-features" style="padding: 80px 20px; background: #f8fafc;">
        <div class="container" style="max-width: 1200px; margin: 0 auto;">
          <div class="section-header" style="text-align: center; max-width: 700px; margin: 0 auto 60px;">
            <h2 style="font-size: 36px; font-weight: 700; color: #0f172a; margin-bottom: 16px; letter-spacing: -0.02em;">Tính năng nổi bật</h2>
            <p style="font-size: 18px; color: #64748b; line-height: 1.6;">Khám phá bộ công cụ mạnh mẽ giúp sự kiện của bạn thành công rực rỡ.</p>
          </div>
          <div class="features-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px;">
            <!-- Feature 1 -->
            <div class="feature-card" style="background: #fff; padding: 40px 32px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); transition: transform 0.2s; border: 1px solid #e2e8f0;">
              <div class="icon-box" style="width: 56px; height: 56px; background: #eff6ff; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: #2563eb;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
              </div>
              <h3 style="font-size: 20px; font-weight: 600; color: #0f172a; margin-bottom: 12px;">Hiệu suất cao</h3>
              <p style="color: #64748b; line-height: 1.6;">Hệ thống xử lý hàng nghìn lượt truy cập cùng lúc mà vẫn đảm bảo độ mượt mà.</p>
            </div>
            <!-- Feature 2 -->
            <div class="feature-card" style="background: #fff; padding: 40px 32px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); transition: transform 0.2s; border: 1px solid #e2e8f0;">
              <div class="icon-box" style="width: 56px; height: 56px; background: #f0fdf4; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: #16a34a;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 style="font-size: 20px; font-weight: 600; color: #0f172a; margin-bottom: 12px;">Bảo mật tuyệt đối</h3>
              <p style="color: #64748b; line-height: 1.6;">Dữ liệu khách hàng được mã hóa và bảo vệ theo tiêu chuẩn quốc tế.</p>
            </div>
            <!-- Feature 3 -->
            <div class="feature-card" style="background: #fff; padding: 40px 32px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); transition: transform 0.2s; border: 1px solid #e2e8f0;">
              <div class="icon-box" style="width: 56px; height: 56px; background: #fdf4ff; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: #c026d3;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
              </div>
              <h3 style="font-size: 20px; font-weight: 600; color: #0f172a; margin-bottom: 12px;">Tương thích Mobile</h3>
              <p style="color: #64748b; line-height: 1.6;">Giao diện tối ưu hoàn hảo trên mọi thiết bị di động và máy tính bảng.</p>
            </div>
          </div>
        </div>
      </section>
      <style>
        .landing-features .feature-card:hover { transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
      </style>
    `,
  });
};

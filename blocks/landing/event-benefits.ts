export const registerEventBenefitsBlock = (bm: any) => {
  bm.add("landing-event-benefits", {
    label: "Event Benefits",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="4"></circle><path d="M17 11l2 2 4-4"></path><path d="M3 21v-1a6 6 0 0 1 6-6h0"></path></svg>`,
    content: `
      <section id="benefits" class="event-benefits" style="padding: 72px 20px; background: #0b1120; color: #e5e7eb;">
        <div style="max-width: 1100px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 40px;">
            <p style="font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #38bdf8; margin-bottom: 8px;">Lợi ích</p>
            <h2 style="font-size: 30px; font-weight: 800; color: #f9fafb; margin-bottom: 10px;">Anh/chị sẽ nhận được gì khi tham dự?</h2>
            <p style="font-size: 15px; color: #9ca3af; max-width: 640px; margin: 0 auto;">Một vài gợi ý giá trị cụ thể để khách tham dự thấy rõ lý do nên đăng ký tham gia sự kiện.</p>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:22px;">
            <div style="background:#020617; border-radius:18px; padding:18px 16px; border:1px solid #1e293b;">
              <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
                <div style="width:30px; height:30px; border-radius:999px; background:#22c55e1a; display:flex; align-items:center; justify-content:center; font-size:16px;">🤝</div>
                <div style="font-size:15px; font-weight:600; color:#f9fafb;">Kết nối chất lượng</div>
              </div>
              <p style="font-size:14px; color:#9ca3af; margin:0;">Gặp gỡ những người cùng ngành, mở rộng network và cơ hội hợp tác mới.</p>
            </div>
            <div style="background:#020617; border-radius:18px; padding:18px 16px; border:1px solid #1e293b;">
              <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
                <div style="width:30px; height:30px; border-radius:999px; background:#6366f11a; display:flex; align-items:center; justify-content:center; font-size:16px;">📚</div>
                <div style="font-size:15px; font-weight:600; color:#f9fafb;">Kiến thức thực chiến</div>
              </div>
              <p style="font-size:14px; color:#9ca3af; margin:0;">Học hỏi kinh nghiệm từ diễn giả và case study thực tế, dễ áp dụng.</p>
            </div>
            <div style="background:#020617; border-radius:18px; padding:18px 16px; border:1px solid #1e293b;">
              <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
                <div style="width:30px; height:30px; border-radius:999px; background:#f973161a; display:flex; align-items:center; justify-content:center; font-size:16px;">🚀</div>
                <div style="font-size:15px; font-weight:600; color:#f9fafb;">Ý tưởng mới</div>
              </div>
              <p style="font-size:14px; color:#9ca3af; margin:0;">Nhận thêm góc nhìn mới để tối ưu hoạt động kinh doanh hoặc dự án hiện tại.</p>
            </div>
            <div style="background:#020617; border-radius:18px; padding:18px 16px; border:1px dashed #1e293b;">
              <div style="font-size:14px; font-weight:600; color:#e5e7eb; margin-bottom:6px;">Lợi ích khác</div>
              <p style="font-size:13px; color:#9ca3af; margin:0 0 6px;">Anh/chị có thể thêm các quyền lợi riêng của sự kiện như quà tặng, ưu đãi sử dụng dịch vụ...</p>
              <p style="font-size:12px; color:#64748b; margin:0;">Gợi ý: dùng block này để nhấn mạnh điểm khác biệt so với sự kiện khác.</p>
            </div>
          </div>
        </div>
      </section>
    `,
  });
};

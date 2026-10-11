export const registerEventSponsorsBlock = (bm: any) => {
  bm.add("landing-event-sponsors", {
    label: "Event Sponsors",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M7 9h10"></path><path d="M7 13h6"></path></svg>`,
    content: `
      <section id="sponsors" class="event-sponsors" style="padding: 64px 20px; background: #0b1120; color: #e5e7eb;">
        <div style="max-width: 1100px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 36px;">
            <p style="font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #38bdf8; margin-bottom: 8px;">Đối tác & Tài trợ</p>
            <h2 style="font-size: 28px; font-weight: 800; color: #f9fafb; margin-bottom: 10px;">Những đơn vị đồng hành cùng sự kiện</h2>
            <p style="font-size: 15px; color: #9ca3af; max-width: 620px; margin: 0 auto;">Danh sách logo mẫu, anh/chị thay bằng đối tác thực tế để tăng độ tin cậy cho khách tham dự.</p>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(120px,1fr)); gap:20px; align-items:center; justify-items:center;">
            <div style="width:120px; height:56px; border-radius:999px; background:#020617; border:1px solid #1e293b; display:flex; align-items:center; justify-content:center; font-size:13px; color:#64748b;">Logo A</div>
            <div style="width:120px; height:56px; border-radius:999px; background:#020617; border:1px solid #1e293b; display:flex; align-items:center; justify-content:center; font-size:13px; color:#64748b;">Logo B</div>
            <div style="width:120px; height:56px; border-radius:999px; background:#020617; border:1px solid #1e293b; display:flex; align-items:center; justify-content:center; font-size:13px; color:#64748b;">Logo C</div>
            <div style="width:120px; height:56px; border-radius:999px; background:#020617; border:1px solid #1e293b; display:flex; align-items:center; justify-content:center; font-size:13px; color:#64748b;">Logo D</div>
            <div style="width:120px; height:56px; border-radius:999px; background:#020617; border:1px solid #1e293b; display:flex; align-items:center; justify-content:center; font-size:13px; color:#64748b;">Logo E</div>
          </div>
        </div>
      </section>
    `,
  });
};

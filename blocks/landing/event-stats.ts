export const registerEventStatsBlock = (bm: any) => {
  bm.add("landing-event-stats", {
    label: "Event Stats",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"></path><rect x="7" y="10" width="3" height="7"></rect><rect x="12" y="6" width="3" height="11"></rect><rect x="17" y="12" width="3" height="5"></rect></svg>`,
    content: `
      <section id="numbers" class="event-stats" style="padding: 64px 20px; background: #020617; color: #e5e7eb;">
        <div style="max-width: 950px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 32px;">
            <p style="font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #38bdf8; margin-bottom: 8px;">Con số ấn tượng</p>
            <h2 style="font-size: 28px; font-weight: 800; color: #f9fafb; margin-bottom: 8px;">Một vài số liệu để tăng độ tin cậy</h2>
            <p style="font-size: 14px; color: #9ca3af; max-width: 520px; margin: 0 auto;">Anh/chị có thể chỉnh sửa các con số bên dưới cho phù hợp với thực tế sự kiện hoặc cộng đồng của mình.</p>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:20px; text-align:center;">
            <div style="border-radius:18px; border:1px solid #1e293b; padding:18px 14px; background:#020617;">
              <div style="font-size:30px; font-weight:800; color:#facc15; margin-bottom:4px;">500+</div>
              <div style="font-size:13px; color:#cbd5f5;">Khách tham dự các mùa trước</div>
            </div>
            <div style="border-radius:18px; border:1px solid #1e293b; padding:18px 14px; background:#020617;">
              <div style="font-size:30px; font-weight:800; color:#4ade80; margin-bottom:4px;">10+</div>
              <div style="font-size:13px; color:#cbd5f5;">Diễn giả và khách mời chuyên môn</div>
            </div>
            <div style="border-radius:18px; border:1px solid #1e293b; padding:18px 14px; background:#020617;">
              <div style="font-size:30px; font-weight:800; color:#38bdf8; margin-bottom:4px;">90%</div>
              <div style="font-size:13px; color:#cbd5f5;">Tỷ lệ hài lòng sau sự kiện</div>
            </div>
            <div style="border-radius:18px; border:1px dashed #1e293b; padding:18px 14px; background:#020617;">
              <div style="font-size:14px; font-weight:600; color:#e5e7eb; margin-bottom:4px;">Con số khác</div>
              <div style="font-size:13px; color:#9ca3af;">Anh/chị có thể thêm số liệu về cộng đồng, doanh thu, số năm tổ chức...</div>
            </div>
          </div>
        </div>
      </section>
    `,
  });
};

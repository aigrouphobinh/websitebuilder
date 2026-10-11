export const registerEventSpeakersBlock = (bm: any) => {
  bm.add("landing-event-speakers", {
    label: "Event Speakers",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="3"></circle><circle cx="16" cy="8" r="3"></circle><path d="M4 21v-2a4 4 0 0 1 4-4h0"></path><path d="M20 21v-2a4 4 0 0 0-4-4h0"></path></svg>`,
    content: `
      <section id="speakers" class="event-speakers" style="padding: 80px 20px; background: #f9fafb;">
        <div style="max-width: 1100px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 48px;">
            <p style="font-size: 14px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6366f1; margin-bottom: 10px;">Diễn giả</p>
            <h2 style="font-size: 32px; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Những người dẫn dắt chương trình</h2>
            <p style="font-size: 16px; color: #6b7280; max-width: 640px; margin: 0 auto;">Danh sách diễn giả mẫu, anh/chị có thể thay đổi tên, chức danh và avatar cho phù hợp với sự kiện thực tế.</p>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 28px;">
            <div style="background: #ffffff; border-radius: 18px; padding: 20px 18px; box-shadow: 0 10px 25px -12px rgba(15,23,42,0.5); border:1px solid #e5e7eb;">
              <div style="display:flex; align-items:center; gap:14px; margin-bottom:10px;">
                <div style="width:56px; height:56px; border-radius:999px; background: linear-gradient(135deg,#6366f1,#a855f7); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700;">A</div>
                <div>
                  <div style="font-weight:600; color:#0f172a;">Nguyễn Văn A</div>
                  <div style="font-size:13px; color:#6b7280;">CEO Công ty X</div>
                </div>
              </div>
              <p style="font-size:14px; color:#4b5563; margin:0 0 8px;">Chia sẻ về câu chuyện xây dựng doanh nghiệp và vận hành sự kiện hiệu quả trong thời đại số.</p>
              <p style="font-size:12px; color:#9ca3af; margin:0;">Chủ đề gợi ý: “Chiến lược phát triển cộng đồng qua sự kiện offline”.</p>
            </div>
            <div style="background: #ffffff; border-radius: 18px; padding: 20px 18px; box-shadow: 0 10px 25px -12px rgba(15,23,42,0.5); border:1px solid #e5e7eb;">
              <div style="display:flex; align-items:center; gap:14px; margin-bottom:10px;">
                <div style="width:56px; height:56px; border-radius:999px; background: linear-gradient(135deg,#22c55e,#14b8a6); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700;">B</div>
                <div>
                  <div style="font-weight:600; color:#0f172a;">Trần Thị B</div>
                  <div style="font-size:13px; color:#6b7280;">Head of Marketing, Y</div>
                </div>
              </div>
              <p style="font-size:14px; color:#4b5563; margin:0 0 8px;">Mang đến góc nhìn thực tế về việc sử dụng sự kiện để tăng trưởng doanh số và giữ chân khách hàng.</p>
              <p style="font-size:12px; color:#9ca3af; margin:0;">Chủ đề gợi ý: “Tối đa hóa trải nghiệm khách tham dự từ online tới onsite”.</p>
            </div>
            <div style="background: #ffffff; border-radius: 18px; padding: 20px 18px; box-shadow: 0 10px 25px -12px rgba(15,23,42,0.5); border:1px solid #e5e7eb;">
              <div style="display:flex; align-items:center; gap:14px; margin-bottom:10px;">
                <div style="width:56px; height:56px; border-radius:999px; background: linear-gradient(135deg,#f97316,#e11d48); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700;">C</div>
                <div>
                  <div style="font-weight:600; color:#0f172a;">Lê Văn C</div>
                  <div style="font-size:13px; color:#6b7280;">Founder Cộng đồng Z</div>
                </div>
              </div>
              <p style="font-size:14px; color:#4b5563; margin:0 0 8px;">Kinh nghiệm xây dựng cộng đồng và tổ chức meetup đều đặn với ngân sách tối ưu.</p>
              <p style="font-size:12px; color:#9ca3af; margin:0;">Chủ đề gợi ý: “Xây cộng đồng bền vững thông qua chuỗi sự kiện nhỏ”.</p>
            </div>
          </div>
        </div>
      </section>
    `,
  });
};

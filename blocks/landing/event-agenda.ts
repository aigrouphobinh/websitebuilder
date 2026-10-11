export const registerEventAgendaBlock = (bm: any) => {
  bm.add("landing-event-agenda", {
    label: "Event Agenda",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"></rect><line x1="8" y1="7" x2="16" y2="7"></line><line x1="8" y1="11" x2="16" y2="11"></line><line x1="8" y1="15" x2="13" y2="15"></line></svg>`,
    content: `
      <section id="agenda" class="event-agenda" style="padding: 80px 20px; background: #ffffff;">
        <div style="max-width: 960px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 40px;">
            <p style="font-size: 14px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6366f1; margin-bottom: 10px;">Lịch trình</p>
            <h2 style="font-size: 32px; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Một ngày trọn vẹn cùng sự kiện</h2>
            <p style="font-size: 16px; color: #6b7280; max-width: 620px; margin: 0 auto;">Đây là khung lịch trình mẫu, anh/chị có thể điều chỉnh thời lượng và nội dung từng phiên.</p>
          </div>
          <div class="event-agenda-table" style="border-radius: 18px; border: 1px solid #e5e7eb; overflow: hidden;">
            <div style="background:#f9fafb; padding: 14px 20px; display:flex; justify-content:space-between; font-size:13px; color:#6b7280; font-weight:500;">
              <span>Thời gian</span>
              <span>Chương trình</span>
            </div>
            <div style="border-top:1px solid #e5e7eb;">
              <div class="event-agenda-row" style="display:flex; gap:20px; padding:14px 20px; border-bottom:1px solid #f3f4f6; align-items:flex-start;">
                <div class="event-agenda-time" style="width:110px; font-size:13px; color:#6b7280;">08:00 – 08:30</div>
                <div class="event-agenda-content" style="flex:1;">
                  <div style="font-size:15px; font-weight:600; color:#111827; margin-bottom:4px;">Đón khách & Check-in</div>
                  <div style="font-size:13px; color:#6b7280;">Hỗ trợ khách tham dự quét mã QR, nhận tài liệu và ổn định chỗ ngồi.</div>
                </div>
              </div>
              <div class="event-agenda-row" style="display:flex; gap:20px; padding:14px 20px; border-bottom:1px solid #f3f4f6; align-items:flex-start;">
                <div class="event-agenda-time" style="width:110px; font-size:13px; color:#6b7280;">08:30 – 09:00</div>
                <div class="event-agenda-content" style="flex:1;">
                  <div style="font-size:15px; font-weight:600; color:#111827; margin-bottom:4px;">Khai mạc & Giới thiệu</div>
                  <div style="font-size:13px; color:#6b7280;">Giới thiệu mục tiêu chương trình, khách mời và lộ trình sự kiện.</div>
                </div>
              </div>
              <div class="event-agenda-row" style="display:flex; gap:20px; padding:14px 20px; border-bottom:1px solid #f3f4f6; align-items:flex-start;">
                <div class="event-agenda-time" style="width:110px; font-size:13px; color:#6b7280;">09:00 – 10:00</div>
                <div class="event-agenda-content" style="flex:1;">
                  <div style="font-size:15px; font-weight:600; color:#111827; margin-bottom:4px;">Phiên chia sẻ 1</div>
                  <div style="font-size:13px; color:#6b7280;">Chủ đề gợi ý: Xu hướng mới trong lĩnh vực của anh/chị.</div>
                </div>
              </div>
              <div class="event-agenda-row" style="display:flex; gap:20px; padding:14px 20px; border-bottom:1px solid #f3f4f6; align-items:flex-start;">
                <div class="event-agenda-time" style="width:110px; font-size:13px; color:#6b7280;">10:00 – 10:15</div>
                <div class="event-agenda-content" style="flex:1;">
                  <div style="font-size:15px; font-weight:600; color:#111827; margin-bottom:4px;">Tea-break & Networking</div>
                  <div style="font-size:13px; color:#6b7280;">Thời gian nghỉ giải lao và kết nối giữa khách tham dự.</div>
                </div>
              </div>
              <div class="event-agenda-row" style="display:flex; gap:20px; padding:14px 20px; border-bottom:1px solid #f3f4f6; align-items:flex-start;">
                <div class="event-agenda-time" style="width:110px; font-size:13px; color:#6b7280;">10:15 – 11:30</div>
                <div class="event-agenda-content" style="flex:1;">
                  <div style="font-size:15px; font-weight:600; color:#111827; margin-bottom:4px;">Phiên chia sẻ 2 / Panel</div>
                  <div style="font-size:13px; color:#6b7280;">Thảo luận nhóm, hỏi đáp trực tiếp cùng diễn giả.</div>
                </div>
              </div>
              <div class="event-agenda-row" style="display:flex; gap:20px; padding:14px 20px; align-items:flex-start;">
                <div class="event-agenda-time" style="width:110px; font-size:13px; color:#6b7280;">13:30 – 16:30</div>
                <div class="event-agenda-content" style="flex:1;">
                  <div style="font-size:15px; font-weight:600; color:#111827; margin-bottom:4px;">Workshop / Hoạt động chiều</div>
                  <div style="font-size:13px; color:#6b7280;">Thực hành, case study hoặc hoạt động trải nghiệm tuỳ theo chủ đề sự kiện.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>
        @media (max-width: 640px) {
          .event-agenda-table { font-size: 13px !important; }
          .event-agenda-row { flex-direction: column; gap: 4px !important; }
          .event-agenda-time { width: auto !important; }
        }
      </style>
    `,
  });
};

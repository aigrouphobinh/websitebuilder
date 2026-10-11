export const registerEventHeroBlock = (bm: any) => {
  bm.add("landing-event-hero", {
    label: "Event Hero",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M3 10h18"></path><path d="M8 21h8"></path></svg>`,
    content: `
      <section id="home" class="event-hero" style="position: relative; min-height: 520px; display: flex; align-items: center; justify-content: center; padding: 72px 20px; background: radial-gradient(circle at top left, #1d4ed8, #020617); color: #e5e7eb; overflow: hidden;">
        <div class="event-hero-bg" style="position: absolute; inset: 0; opacity: 0.28; background-image: radial-gradient(circle at 0 0, rgba(96,165,250,0.6), transparent 55%), radial-gradient(circle at 100% 0, rgba(56,189,248,0.5), transparent 55%), radial-gradient(circle at 100% 100%, rgba(251,191,36,0.4), transparent 55%);"></div>
        <div class="event-hero-content" style="position: relative; z-index: 1; max-width: 960px; width: 100%; display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); gap: 40px; align-items: center;">
          <div class="event-hero-text">
            <span style="display:inline-flex; align-items:center; gap:8px; padding:6px 14px; border-radius:999px; background: rgba(15,23,42,0.7); border:1px solid rgba(148,163,184,0.4); font-size:13px; color:#e5e7eb; margin-bottom:20px;">
              <span style="width:8px;height:8px;border-radius:999px;background:#22c55e;"></span>
              Sự kiện trực tiếp • [ev_name]
            </span>
            <h1 style="font-size:40px; line-height:1.15; font-weight:800; letter-spacing:-0.03em; margin-bottom:20px; color:#f9fafb;">
              [ev_name]
            </h1>
            <p style="font-size:17px; line-height:1.7; color:#e5e7eb; max-width:520px; margin-bottom:24px;">
              Giới thiệu ngắn gọn về sự kiện, đối tượng tham dự và giá trị nổi bật mà khách mời sẽ nhận được khi tham gia.
            </p>
            <div style="display:flex; flex-wrap:wrap; gap:16px; margin-bottom:24px;">
              <a href="#tickets" style="display:inline-flex; align-items:center; justify-content:center; padding:12px 26px; border-radius:999px; background:#f97316; color:#111827; font-weight:600; font-size:15px; text-decoration:none; box-shadow:0 10px 15px -3px rgba(0,0,0,0.4);">
                Đăng ký tham dự
              </a>
              <a href="#agenda" style="display:inline-flex; align-items:center; justify-content:center; padding:12px 22px; border-radius:999px; background:transparent; border:1px solid rgba(148,163,184,0.6); color:#e5e7eb; font-weight:500; font-size:15px; text-decoration:none;">
                Xem chương trình chi tiết
              </a>
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:20px; font-size:14px; color:#cbd5f5;">
              <div style="display:flex; flex-direction:column; gap:2px;">
                <span style="font-weight:600; color:#facc15;">[ev_start_date]</span>
                <span>[ev_start_time]</span>
              </div>
              <div style="display:flex; flex-direction:column; gap:2px;">
                <span style="font-weight:600; color:#facc15;">[ev_location]</span>
                <span>Trung tâm hội nghị (thay đổi theo thực tế)</span>
              </div>
              <div style="display:flex; flex-direction:column; gap:2px;">
                <span style="font-weight:600; color:#bbf7d0;">500+</span>
                <span>người tham dự dự kiến</span>
              </div>
            </div>
          </div>
          <div class="event-hero-card" style="background:rgba(15,23,42,0.9); border-radius:24px; padding:22px 22px 18px; border:1px solid rgba(148,163,184,0.6); box-shadow:0 20px 45px -18px rgba(15,23,42,0.9); backdrop-filter: blur(18px);">
            <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:12px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:14px; color:#9ca3af;">Sự kiện</span>
                <span style="font-size:12px; padding:4px 10px; border-radius:999px; background:rgba(22,163,74,0.16); color:#4ade80;">Còn vé</span>
              </div>
              <div style="font-size:16px; font-weight:600; color:#e5e7eb;">Tên sự kiện của bạn</div>
            </div>
            <div style="display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; font-size:13px; color:#9ca3af; margin-bottom:12px;">
              <div>
                <div style="color:#6b7280;">Thời gian</div>
                <div>12/10/2025</div>
                <div>08:00 – 17:00</div>
              </div>
              <div>
                <div style="color:#6b7280;">Địa điểm</div>
                <div>Hồ Chí Minh</div>
                <div>Chi tiết cập nhật sau</div>
              </div>
            </div>
            <div style="border-radius:14px; background:rgba(15,23,42,0.9); border:1px dashed rgba(148,163,184,0.7); padding:12px 12px 10px; margin-bottom:14px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-size:13px; color:#9ca3af;">Vé Early Bird</span>
                <span style="font-size:13px; color:#4ade80;">Tiết kiệm 20%</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                <div>
                  <div style="font-size:22px; font-weight:700; color:#fbbf24;">490.000đ</div>
                  <div style="font-size:12px; color:#6b7280; text-decoration:line-through;">620.000đ</div>
                </div>
                <a href="#tickets" style="display:inline-flex; align-items:center; justify-content:center; padding:9px 18px; border-radius:999px; background:#f97316; color:#111827; font-size:13px; font-weight:600; text-decoration:none;">
                  Đặt vé ngay
                </a>
              </div>
            </div>
            <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:6px; font-size:12px; color:#9ca3af;">
              <li style="display:flex; align-items:center; gap:8px;"><span style="width:6px;height:6px;border-radius:999px;background:#22c55e;"></span>Vào cửa toàn bộ chương trình</li>
              <li style="display:flex; align-items:center; gap:8px;"><span style="width:6px;height:6px;border-radius:999px;background:#22c55e;"></span>Tea-break & networking</li>
              <li style="display:flex; align-items:center; gap:8px;"><span style="width:6px;height:6px;border-radius:999px;background:#22c55e;"></span>Nhận tài liệu sau sự kiện</li>
            </ul>
          </div>
        </div>
      </section>
      <style>
        @media (max-width: 900px) {
          .event-hero-content { grid-template-columns: 1fr !important; }
          .event-hero-card { margin-top: 32px; width: 100%; max-width: 400px; justify-self: center; }
        }
        @media (max-width: 640px) {
          .event-hero { padding: 40px 16px !important; min-height: auto !important; }
          .event-hero h1 { font-size: 28px !important; }
          .event-hero p { font-size: 14px !important; }
        }
      </style>
    `,
  });
};

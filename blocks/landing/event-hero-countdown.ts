export const registerEventHeroCountdownBlock = (bm: any) => {
  bm.add("landing-event-hero-countdown", {
    label: "Event Hero + Countdown",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M3 10h18"></path><circle cx="16" cy="16" r="3"></circle></svg>`,
    content: `
      <section id="home" class="event-hero event-hero--countdown" style="position: relative; min-height: 520px; display: flex; align-items: center; justify-content: center; padding: 72px 20px; background: radial-gradient(circle at top left, #1d4ed8, #020617); color: #e5e7eb; overflow: hidden;">
        <div class="event-hero-bg" style="position: absolute; inset: 0; opacity: 0.32; background-image: radial-gradient(circle at 0 0, rgba(96,165,250,0.7), transparent 55%), radial-gradient(circle at 100% 0, rgba(56,189,248,0.6), transparent 55%), radial-gradient(circle at 100% 100%, rgba(251,191,36,0.5), transparent 55%);"></div>
        <div class="event-hero-content" style="position: relative; z-index: 1; max-width: 960px; width: 100%; display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); gap: 40px; align-items: center;">
          <div class="event-hero-text">
            <span style="display:inline-flex; align-items:center; gap:8px; padding:6px 14px; border-radius:999px; background: rgba(15,23,42,0.7); border:1px solid rgba(148,163,184,0.4); font-size:13px; color:#e5e7eb; margin-bottom:20px;">
              <span style="width:8px;height:8px;border-radius:999px;background:#22c55e;"></span>
              Sự kiện trực tiếp • [ev_name]
            </span>
            <h1 style="font-size:40px; line-height:1.15; font-weight:800; letter-spacing:-0.03em; margin-bottom:20px; color:#f9fafb;">
              Đếm ngược đến ngày diễn ra [ev_name]
            </h1>
            <p style="font-size:17px; line-height:1.7; color:#e5e7eb; max-width:520px; margin-bottom:24px;">
              Đặt kỳ vọng rõ ràng cho khách tham dự về thời gian, địa điểm và trải nghiệm sự kiện. Phần đếm ngược giúp tăng tỷ lệ đăng ký.
            </p>
            <div style="display:flex; flex-wrap:wrap; gap:16px; margin-bottom:24px;">
              <a href="#tickets" style="display:inline-flex; align-items:center; justify-content:center; padding:12px 26px; border-radius:999px; background:#f97316; color:#111827; font-weight:600; font-size:15px; text-decoration:none; box-shadow:0 10px 15px -3px rgba(0,0,0,0.4);">
                Đăng ký ngay
              </a>
              <a href="#agenda" style="display:inline-flex; align-items:center; justify-content:center; padding:12px 22px; border-radius:999px; background:transparent; border:1px solid rgba(148,163,184,0.6); color:#e5e7eb; font-weight:500; font-size:15px; text-decoration:none;">
                Xem lịch trình chi tiết
              </a>
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:20px; font-size:14px; color:#cbd5f5;">
              <div style="display:flex; flex-direction:column; gap:2px;">
                <span style="font-weight:600; color:#facc15;">Ngày diễn ra</span>
                <span>[ev_start_datetime]</span>
              </div>
              <div style="display:flex; flex-direction:column; gap:2px;">
                <span style="font-weight:600; color:#facc15;">Địa điểm</span>
                <span>[ev_location]</span>
              </div>
            </div>
          </div>
          <div class="event-hero-countdown" style="background:rgba(15,23,42,0.9); border-radius:24px; padding:22px 20px 18px; border:1px solid rgba(148,163,184,0.6); box-shadow:0 20px 45px -18px rgba(15,23,42,0.9);">
            <div
              class="countdown-timer"
              style="text-align:center"
            >
              <h3 style="margin:0 0 12px;font-size:16px;font-weight:600;color:#e5e7eb;">Đếm ngược đến sự kiện</h3>
              <p style="margin:0 0 14px;font-size:13px;color:#9ca3af;">Chỉnh thời gian trong phần cài đặt hoặc cập nhật mã sự kiện.</p>
              <div class="countdown-values" style="display:flex;gap:10px;justify-content:center;margin:10px 0;flex-wrap:wrap;">
                <div class="countdown-item" style="flex:1 1 70px; padding:10px 8px;background:#020617;border-radius:12px;border:1px solid rgba(148,163,184,0.6);min-width:70px;">
                  <div class="countdown-number countdown-days" style="font-size:20px;font-weight:700;color:#facc15;">00</div>
                  <div class="countdown-label" style="font-size:11px;color:#9ca3af;">Ngày</div>
                </div>
                <div class="countdown-item" style="flex:1 1 70px; padding:10px 8px;background:#020617;border-radius:12px;border:1px solid rgba(148,163,184,0.6);min-width:70px;">
                  <div class="countdown-number countdown-hours" style="font-size:20px;font-weight:700;color:#facc15;">00</div>
                  <div class="countdown-label" style="font-size:11px;color:#9ca3af;">Giờ</div>
                </div>
                <div class="countdown-item" style="flex:1 1 70px; padding:10px 8px;background:#020617;border-radius:12px;border:1px solid rgba(148,163,184,0.6);min-width:70px;">
                  <div class="countdown-number countdown-minutes" style="font-size:20px;font-weight:700;color:#facc15;">00</div>
                  <div class="countdown-label" style="font-size:11px;color:#9ca3af;">Phút</div>
                </div>
                <div class="countdown-item" style="flex:1 1 70px; padding:10px 8px;background:#020617;border-radius:12px;border:1px solid rgba(148,163,184,0.6);min-width:70px;">
                  <div class="countdown-number countdown-seconds" style="font-size:20px;font-weight:700;color:#facc15;">00</div>
                  <div class="countdown-label" style="font-size:11px;color:#9ca3af;">Giây</div>
                </div>
              </div>
            </div>
            <p style="margin-top:12px;font-size:11px;color:#6b7280;">
              Gợi ý: Cập nhật thời gian bắt đầu sự kiện trong cấu hình để bộ đếm tự chạy chính xác.
            </p>
          </div>
        </div>
      </section>
      <style>
        @media (max-width: 900px) {
          .event-hero--countdown .event-hero-content { grid-template-columns: 1fr !important; }
          .event-hero--countdown .event-hero-countdown { margin-top: 32px; width: 100%; max-width: 400px; justify-self: center; }
        }
        @media (max-width: 640px) {
          .event-hero--countdown { padding: 40px 16px !important; min-height: auto !important; }
          .event-hero--countdown h1 { font-size: 28px !important; }
          .event-hero--countdown p { font-size: 14px !important; }
        }
      </style>
    `,
  });
};

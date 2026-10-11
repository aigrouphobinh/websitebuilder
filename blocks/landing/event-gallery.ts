export const registerEventGalleryBlock = (bm: any) => {
  bm.add("landing-event-gallery", {
    label: "Event Gallery",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"></rect><circle cx="9" cy="10" r="2"></circle><path d="m21 15-3.5-3.5a2 2 0 0 0-2.8 0L9 18"></path></svg>`,
    content: `
      <section id="gallery" class="event-gallery" style="padding: 72px 20px; background: #0f172a; color: #e5e7eb;">
        <div style="max-width: 1100px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 32px;">
            <p style="font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #38bdf8; margin-bottom: 8px;">Khoảnh khắc sự kiện</p>
            <h2 style="font-size: 28px; font-weight: 800; color: #f9fafb; margin-bottom: 8px;">Hình ảnh từ các lần tổ chức trước</h2>
            <p style="font-size: 14px; color: #9ca3af; max-width: 620px; margin: 0 auto;">Anh/chị có thể thay các khung trống bằng hình ảnh thực tế để tăng độ tin cậy và cảm xúc.</p>
          </div>
          <div style="display:grid; grid-template-columns:2fr 3fr; gap:16px; margin-bottom:14px;">
            <div style="border-radius:18px; overflow:hidden; background:#020617; border:1px dashed #1f2937; min-height:180px; display:flex; align-items:center; justify-content:center; font-size:13px; color:#64748b;">
              Kéo thả hình ảnh 1
            </div>
            <div style="border-radius:18px; overflow:hidden; background:#020617; border:1px dashed #1f2937; min-height:180px; display:flex; align-items:center; justify-content:center; font-size:13px; color:#64748b;">
              Kéo thả hình ảnh 2
            </div>
          </div>
          <div style="display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:16px;">
            <div style="border-radius:16px; overflow:hidden; background:#020617; border:1px dashed #1f2937; min-height:120px; display:flex; align-items:center; justify-content:center; font-size:12px; color:#64748b;">
              Hình ảnh 3
            </div>
            <div style="border-radius:16px; overflow:hidden; background:#020617; border:1px dashed #1f2937; min-height:120px; display:flex; align-items:center; justify-content:center; font-size:12px; color:#64748b;">
              Hình ảnh 4
            </div>
            <div style="border-radius:16px; overflow:hidden; background:#020617; border:1px dashed #1f2937; min-height:120px; display:flex; align-items:center; justify-content:center; font-size:12px; color:#64748b;">
              Hình ảnh 5
            </div>
          </div>
        </div>
        <style>
          @media (max-width: 800px) {
            .event-gallery > div > div:nth-child(2) { grid-template-columns: minmax(0,1fr); }
          }
          @media (max-width: 640px) {
            .event-gallery { padding: 56px 16px !important; }
          }
        </style>
      </section>
    `,
  });
};

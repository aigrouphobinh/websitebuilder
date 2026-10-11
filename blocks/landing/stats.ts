export const registerStatsBlock = (bm: any) => {
  bm.add("landing-stats", {
    label: "Stats Generic",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
    content: `
      <section class="landing-stats" style="padding: 60px 20px; background: #2563eb; color: #fff;">
        <div class="stats-grid" style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px; max-width: 1000px; margin: 0 auto; text-align: center;">
          
          <div>
            <div style="font-size: 40px; font-weight: 800; margin-bottom: 8px;">10K+</div>
            <div style="font-size: 14px; font-weight: 500; opacity: 0.8; text-transform: uppercase; letter-spacing: 0.05em;">Người tham dự</div>
          </div>
          
          <div>
            <div style="font-size: 40px; font-weight: 800; margin-bottom: 8px;">50+</div>
            <div style="font-size: 14px; font-weight: 500; opacity: 0.8; text-transform: uppercase; letter-spacing: 0.05em;">Diễn giả</div>
          </div>
          
          <div>
            <div style="font-size: 40px; font-weight: 800; margin-bottom: 8px;">100+</div>
            <div style="font-size: 14px; font-weight: 500; opacity: 0.8; text-transform: uppercase; letter-spacing: 0.05em;">Doanh nghiệp</div>
          </div>
          
          <div>
            <div style="font-size: 40px; font-weight: 800; margin-bottom: 8px;">98%</div>
            <div style="font-size: 14px; font-weight: 500; opacity: 0.8; text-transform: uppercase; letter-spacing: 0.05em;">Đánh giá tích cực</div>
          </div>
          
        </div>
        <style>
          @media (max-width: 768px) {
            .landing-stats .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 40px !important; }
          }
          @media (max-width: 480px) {
            .landing-stats .stats-grid { grid-template-columns: minmax(0, 1fr) !important; }
          }
        </style>
      </section>
    `,
  });
};

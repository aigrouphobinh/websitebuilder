export const registerTeamBlock = (bm: any) => {
  bm.add("landing-team", {
    label: "Team",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    content: `
      <section class="landing-team" style="padding: 60px 20px; background: #fff; text-align: center;">
        <h2 style="font-size: 32px; font-weight: 700; color: #111827; margin-bottom: 16px;">Đội ngũ của chúng tôi</h2>
        <p style="color: #6b7280; margin-bottom: 40px; max-width: 600px; margin-inline: auto;">Những chuyên gia hàng đầu đứng sau sự thành công của chúng tôi.</p>
        
        <div class="team-grid" style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px; max-width: 1200px; margin: 0 auto;">
          
          <div>
            <div style="width: 100%; aspect-ratio: 1/1; border-radius: 50%; background: #e5e7eb; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
              <span style="color: #9ca3af; font-size: 14px;">Avatar 1</span>
            </div>
            <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin: 0 0 4px 0;">Lê Minh T</h3>
            <p style="margin: 0 0 12px 0; color: #2563eb; font-size: 14px;">CEO & Founder</p>
          </div>
          
          <div>
            <div style="width: 100%; aspect-ratio: 1/1; border-radius: 50%; background: #e5e7eb; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
              <span style="color: #9ca3af; font-size: 14px;">Avatar 2</span>
            </div>
            <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin: 0 0 4px 0;">Phạm Yến N</h3>
            <p style="margin: 0 0 12px 0; color: #2563eb; font-size: 14px;">CTO</p>
          </div>
          
          <div>
            <div style="width: 100%; aspect-ratio: 1/1; border-radius: 50%; background: #e5e7eb; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
              <span style="color: #9ca3af; font-size: 14px;">Avatar 3</span>
            </div>
            <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin: 0 0 4px 0;">Hoàng Bảo K</h3>
            <p style="margin: 0 0 12px 0; color: #2563eb; font-size: 14px;">Event Manager</p>
          </div>
          
          <div>
            <div style="width: 100%; aspect-ratio: 1/1; border-radius: 50%; background: #e5e7eb; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
              <span style="color: #9ca3af; font-size: 14px;">Avatar 4</span>
            </div>
            <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin: 0 0 4px 0;">Ngô Hà Đ</h3>
            <p style="margin: 0 0 12px 0; color: #2563eb; font-size: 14px;">Marketing Director</p>
          </div>
          
        </div>
        <style>
          @media (max-width: 900px) {
            .landing-team .team-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          }
          @media (max-width: 480px) {
            .landing-team .team-grid { grid-template-columns: minmax(0, 1fr) !important; }
          }
        </style>
      </section>
    `,
  });
};

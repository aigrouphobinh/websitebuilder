export const registerAudienceBlock = (bm: any) => {
  bm.add("landing-audience", {
    label: "Audience Generic",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    content: `
      <section class="landing-audience" style="padding: 60px 20px; background: #111827; color: #fff;">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; gap: 40px; align-items: center; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 300px;">
            <h2 style="font-size: 32px; font-weight: 700; margin-bottom: 20px; color: #f9fafb;">Ai nên tham gia?</h2>
            <p style="font-size: 16px; color: #9ca3af; margin-bottom: 32px; line-height: 1.6;">Chương trình được thiết kế dành riêng cho những ai muốn nâng tầm kỹ năng và cập nhật xu hướng mới nhất.</p>
            
            <ul style="list-style: none; padding: 0; margin: 0; display: grid; gap: 16px;">
              <li style="display: flex; gap: 12px; align-items: center;">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: #3b82f6;"></div>
                <span style="font-size: 16px; font-weight: 500;">Chủ doanh nghiệp / Founders</span>
              </li>
              <li style="display: flex; gap: 12px; align-items: center;">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: #3b82f6;"></div>
                <span style="font-size: 16px; font-weight: 500;">Quản lý cấp trung / Managers</span>
              </li>
              <li style="display: flex; gap: 12px; align-items: center;">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: #3b82f6;"></div>
                <span style="font-size: 16px; font-weight: 500;">Chuyên viên Marketing & Sales</span>
              </li>
              <li style="display: flex; gap: 12px; align-items: center;">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: #3b82f6;"></div>
                <span style="font-size: 16px; font-weight: 500;">Sinh viên, người đi làm muốn chuyển ngành</span>
              </li>
            </ul>
          </div>
          
          <div style="flex: 1; min-width: 300px; border-radius: 16px; overflow: hidden; position: relative;">
            <div style="width: 100%; padding-top: 70%; background: #1f2937;"></div>
            <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #4b5563;">Hình ảnh minh họa</div>
          </div>
        </div>
      </section>
    `,
  });
};

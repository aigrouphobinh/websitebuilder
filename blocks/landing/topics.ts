export const registerTopicsBlock = (bm: any) => {
  bm.add("landing-topics", {
    label: "Topics Generic",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`,
    content: `
      <section class="landing-topics" style="padding: 60px 20px; background: #f9fafb; text-align: center;">
        <h2 style="font-size: 32px; font-weight: 700; color: #111827; margin-bottom: 16px;">Nội dung chính</h2>
        <p style="color: #6b7280; margin-bottom: 40px;">Bao quát mọi khía cạnh từ cơ bản đến nâng cao</p>
        
        <div class="topics-grid" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; max-width: 1000px; margin: 0 auto; text-align: left;">
          
          <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb;">
            <div style="color: #2563eb; font-weight: 700; font-size: 24px; margin-bottom: 12px;">01</div>
            <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin: 0 0 12px 0;">Tư duy chiến lược</h3>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.5; margin: 0;">Nắm bắt xu hướng thị trường và xây dựng mô hình kinh doanh bền vững.</p>
          </div>
          
          <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb;">
            <div style="color: #2563eb; font-weight: 700; font-size: 24px; margin-bottom: 12px;">02</div>
            <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin: 0 0 12px 0;">Kỹ năng thực thi</h3>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.5; margin: 0;">Chuyển hóa ý tưởng thành hành động thông qua các công cụ và framework.</p>
          </div>
          
          <div style="background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb;">
            <div style="color: #2563eb; font-weight: 700; font-size: 24px; margin-bottom: 12px;">03</div>
            <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin: 0 0 12px 0;">Tối ưu & Tăng tốc</h3>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.5; margin: 0;">Sử dụng dữ liệu để đo lường, tối ưu hiệu suất và nhân bản quy trình.</p>
          </div>
          
        </div>
        <style>
          @media (max-width: 768px) {
            .landing-topics .topics-grid { grid-template-columns: minmax(0, 1fr) !important; }
          }
        </style>
      </section>
    `,
  });
};

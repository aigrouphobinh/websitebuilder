export const registerSpeakersBlock = (bm: any) => {
  bm.add("landing-speakers", {
    label: "Speakers Generic",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
    content: `
      <section class="landing-speakers" style="padding: 60px 20px; background: #fff; text-align: center;">
        <h2 style="font-size: 32px; font-weight: 700; color: #111827; margin-bottom: 16px;">Diễn giả của chương trình</h2>
        <p style="color: #6b7280; margin-bottom: 40px; max-width: 600px; margin-inline: auto;">Gặp gỡ những chuyên gia đầu ngành chia sẻ kiến thức và kinh nghiệm thực chiến.</p>
        
        <div class="speakers-grid" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; max-width: 1200px; margin: 0 auto;">
          
          <div style="text-align: left;">
            <div style="width: 100%; aspect-ratio: 4/5; background: #e5e7eb; border-radius: 12px; margin-bottom: 16px; display: flex; align-items: center; justify-content: center;">
              <span style="color: #9ca3af;">Ảnh diễn giả</span>
            </div>
            <h3 style="font-size: 20px; font-weight: 600; color: #111827; margin: 0 0 4px 0;">TS. Nguyễn Văn A</h3>
            <p style="margin: 0 0 12px 0; color: #2563eb; font-size: 14px;">Chuyên gia AI & Data Science</p>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.5; margin: 0;">Hơn 15 năm kinh nghiệm triển khai các giải pháp công nghệ lớn tại thung lũng Silicon.</p>
          </div>
          
          <div style="text-align: left;">
            <div style="width: 100%; aspect-ratio: 4/5; background: #e5e7eb; border-radius: 12px; margin-bottom: 16px; display: flex; align-items: center; justify-content: center;">
              <span style="color: #9ca3af;">Ảnh diễn giả</span>
            </div>
            <h3 style="font-size: 20px; font-weight: 600; color: #111827; margin: 0 0 4px 0;">Trần Thị B</h3>
            <p style="margin: 0 0 12px 0; color: #2563eb; font-size: 14px;">CEO TechAsia</p>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.5; margin: 0;">Khởi nghiệp thành công với định giá hơn 50 triệu USD, chuyên gia trong lĩnh vực Fintech.</p>
          </div>
          
          <div style="text-align: left;">
            <div style="width: 100%; aspect-ratio: 4/5; background: #e5e7eb; border-radius: 12px; margin-bottom: 16px; display: flex; align-items: center; justify-content: center;">
              <span style="color: #9ca3af;">Ảnh diễn giả</span>
            </div>
            <h3 style="font-size: 20px; font-weight: 600; color: #111827; margin: 0 0 4px 0;">Lê Minh C</h3>
            <p style="margin: 0 0 12px 0; color: #2563eb; font-size: 14px;">Head of Marketing</p>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.5; margin: 0;">Chuyên gia truyền thông, người đứng sau hàng loạt chiến dịch viral nổi tiếng.</p>
          </div>
          
        </div>
        <style>
          @media (max-width: 768px) {
            .landing-speakers .speakers-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          }
          @media (max-width: 480px) {
            .landing-speakers .speakers-grid { grid-template-columns: minmax(0, 1fr) !important; }
          }
        </style>
      </section>
    `,
  });
};

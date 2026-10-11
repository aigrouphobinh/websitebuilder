export const registerBenefitsBlock = (bm: any) => {
  bm.add("landing-benefits", {
    label: "Benefits Generic",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    content: `
      <section class="landing-benefits" style="padding: 60px 20px; background: #fff;">
        <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
          <h2 style="font-size: 32px; font-weight: 700; color: #111827; margin-bottom: 16px;">Bạn nhận được gì?</h2>
          <p style="color: #6b7280; margin-bottom: 48px; max-width: 600px; margin-inline: auto;">Những giá trị cốt lõi bạn sẽ nhận được khi tham gia cùng chúng tôi.</p>
          
          <div class="benefits-grid" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; text-align: left;">
            <div style="display: flex; gap: 16px; align-items: flex-start;">
              <div style="width: 48px; height: 48px; border-radius: 12px; background: #fef3c7; color: #d97706; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0;">💡</div>
              <div>
                <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin: 0 0 8px 0;">Kiến thức thực chiến</h3>
                <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0;">Học hỏi từ case-study thực tế, có thể áp dụng ngay vào công việc.</p>
              </div>
            </div>
            
            <div style="display: flex; gap: 16px; align-items: flex-start;">
              <div style="width: 48px; height: 48px; border-radius: 12px; background: #dbeafe; color: #2563eb; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0;">🤝</div>
              <div>
                <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin: 0 0 8px 0;">Mở rộng quan hệ</h3>
                <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0;">Giao lưu trực tiếp với các chuyên gia và hàng trăm đồng nghiệp trong ngành.</p>
              </div>
            </div>
            
            <div style="display: flex; gap: 16px; align-items: flex-start;">
              <div style="width: 48px; height: 48px; border-radius: 12px; background: #dcfce7; color: #16a34a; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0;">🎁</div>
              <div>
                <h3 style="font-size: 18px; font-weight: 600; color: #111827; margin: 0 0 8px 0;">Quà tặng giá trị</h3>
                <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0;">Tài liệu độc quyền, chứng nhận tham dự và nhiều phần quà từ nhà tài trợ.</p>
              </div>
            </div>
          </div>
        </div>
        <style>
          @media (max-width: 900px) {
            .landing-benefits .benefits-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          }
          @media (max-width: 600px) {
            .landing-benefits .benefits-grid { grid-template-columns: minmax(0, 1fr) !important; }
          }
        </style>
      </section>
    `,
  });
};

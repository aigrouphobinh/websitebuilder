export const registerTestimonialsBlock = (bm: any) => {
  bm.add("landing-testimonials", {
    label: "Testimonials",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
    content: `
      <section class="landing-testimonials" style="padding: 60px 20px; background: #f9fafb; text-align: center;">
        <h2 style="font-size: 32px; font-weight: 700; color: #111827; margin-bottom: 40px;">Khách hàng nói gì về chúng tôi</h2>
        <div class="testimonials-grid" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; max-width: 1200px; margin: 0 auto; text-align: left;">
          
          <div style="background: #fff; padding: 24px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #f3f4f6;">
            <div style="display: flex; gap: 4px; color: #fbbf24; margin-bottom: 16px;">★★★★★</div>
            <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">"Sự kiện được tổ chức cực kỳ chuyên nghiệp. Giao diện đăng ký vé rất dễ sử dụng và nhanh chóng."</p>
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #9ca3af;">A</div>
              <div>
                <div style="font-weight: 600; color: #111827; font-size: 14px;">Nguyễn Văn A</div>
                <div style="color: #6b7280; font-size: 12px;">CEO, Công ty ABC</div>
              </div>
            </div>
          </div>
          
          <div style="background: #fff; padding: 24px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #f3f4f6;">
            <div style="display: flex; gap: 4px; color: #fbbf24; margin-bottom: 16px;">★★★★★</div>
            <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">"Nội dung chương trình rất sát với thực tế, tôi đã học hỏi được rất nhiều. Sẽ tiếp tục tham gia các sự kiện tới."</p>
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #9ca3af;">B</div>
              <div>
                <div style="font-weight: 600; color: #111827; font-size: 14px;">Trần Thị B</div>
                <div style="color: #6b7280; font-size: 12px;">Marketing Manager</div>
              </div>
            </div>
          </div>
          
          <div style="background: #fff; padding: 24px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #f3f4f6;">
            <div style="display: flex; gap: 4px; color: #fbbf24; margin-bottom: 16px;">★★★★★</div>
            <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">"Tuyệt vời! Không khí sôi động, diễn giả nhiệt tình. Hệ thống check-in nhanh gọn không cần chờ đợi."</p>
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #9ca3af;">C</div>
              <div>
                <div style="font-weight: 600; color: #111827; font-size: 14px;">Lê Văn C</div>
                <div style="color: #6b7280; font-size: 12px;">Founder, Startup XYZ</div>
              </div>
            </div>
          </div>
          
        </div>
        <style>
          @media (max-width: 900px) {
            .landing-testimonials .testimonials-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          }
          @media (max-width: 600px) {
            .landing-testimonials .testimonials-grid { grid-template-columns: minmax(0, 1fr) !important; }
            .landing-testimonials { padding: 40px 16px !important; }
          }
        </style>
      </section>
    `,
  });
};

export const registerFaqBlock = (bm: any) => {
  bm.add("landing-faq", {
    label: "FAQ Generic",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    content: `
      <section class="landing-faq" style="padding: 60px 20px; background: #fff; text-align: center;">
        <h2 style="font-size: 32px; font-weight: 700; color: #111827; margin-bottom: 16px;">Câu hỏi thường gặp</h2>
        <p style="color: #6b7280; margin-bottom: 40px;">Những thắc mắc phổ biến nhất từ người tham gia</p>
        
        <div style="max-width: 800px; margin: 0 auto; text-align: left; display: flex; flex-direction: column; gap: 16px;">
          
          <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px;">
            <h3 style="font-size: 16px; font-weight: 600; color: #111827; margin: 0 0 12px 0;">Làm sao để đăng ký vé tham dự?</h3>
            <p style="margin: 0; color: #4b5563; font-size: 15px; line-height: 1.6;">Bạn có thể nhấn vào nút "Đăng ký" trên trang này, điền đầy đủ thông tin vào form và tiến hành thanh toán. Vé điện tử sẽ được gửi về email của bạn ngay sau đó.</p>
          </div>
          
          <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px;">
            <h3 style="font-size: 16px; font-weight: 600; color: #111827; margin: 0 0 12px 0;">Hình thức thanh toán nào được chấp nhận?</h3>
            <p style="margin: 0; color: #4b5563; font-size: 15px; line-height: 1.6;">Chúng tôi hỗ trợ nhiều hình thức thanh toán bao gồm: chuyển khoản ngân hàng (VietQR), thẻ tín dụng/ghi nợ, và các ví điện tử phổ biến như MoMo, ZaloPay.</p>
          </div>
          
          <div style="border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px;">
            <h3 style="font-size: 16px; font-weight: 600; color: #111827; margin: 0 0 12px 0;">Tôi có thể hoàn hủy vé sau khi mua không?</h3>
            <p style="margin: 0; color: #4b5563; font-size: 15px; line-height: 1.6;">Chính sách hoàn hủy áp dụng tùy thuộc vào từng sự kiện cụ thể. Vui lòng tham khảo chi tiết tại phần Chính sách mua vé hoặc liên hệ với ban tổ chức qua số hotline.</p>
          </div>
          
        </div>
      </section>
    `,
  });
};

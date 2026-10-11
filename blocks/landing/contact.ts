export const registerContactBlock = (bm: any) => {
  bm.add("landing-contact", {
    label: "Contact Generic",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    content: `
      <section class="landing-contact" style="padding: 60px 20px; background: #f9fafb;">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; gap: 40px; flex-wrap: wrap;">
          
          <div style="flex: 1; min-width: 300px;">
            <h2 style="font-size: 32px; font-weight: 700; color: #111827; margin-bottom: 16px;">Liên hệ với chúng tôi</h2>
            <p style="color: #4b5563; margin-bottom: 32px; line-height: 1.6;">Nếu bạn có bất kỳ câu hỏi nào về sự kiện hoặc dịch vụ, đừng ngần ngại gửi tin nhắn cho chúng tôi. Đội ngũ hỗ trợ sẽ phản hồi sớm nhất.</p>
            
            <div style="display: flex; flex-direction: column; gap: 20px;">
              <div style="display: flex; gap: 16px;">
                <div style="width: 48px; height: 48px; border-radius: 50%; background: #dbeafe; color: #2563eb; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">📍</div>
                <div>
                  <h4 style="margin: 0 0 4px 0; font-size: 16px; color: #111827;">Địa chỉ</h4>
                  <p style="margin: 0; color: #4b5563; font-size: 14px;">123 Đường Nguyễn Trãi, Quận 1, TP. HCM</p>
                </div>
              </div>
              
              <div style="display: flex; gap: 16px;">
                <div style="width: 48px; height: 48px; border-radius: 50%; background: #dbeafe; color: #2563eb; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">📞</div>
                <div>
                  <h4 style="margin: 0 0 4px 0; font-size: 16px; color: #111827;">Điện thoại</h4>
                  <p style="margin: 0; color: #4b5563; font-size: 14px;">1900 1234 56</p>
                </div>
              </div>
              
              <div style="display: flex; gap: 16px;">
                <div style="width: 48px; height: 48px; border-radius: 50%; background: #dbeafe; color: #2563eb; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">✉️</div>
                <div>
                  <h4 style="margin: 0 0 4px 0; font-size: 16px; color: #111827;">Email</h4>
                  <p style="margin: 0; color: #4b5563; font-size: 14px;">support@checkin.vn</p>
                </div>
              </div>
            </div>
          </div>
          
          <div style="flex: 1; min-width: 300px; background: #fff; padding: 32px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
            <form>
              <div style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: #374151;">Họ và tên</label>
                <input type="text" placeholder="Nguyễn Văn A" style="width: 100%; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;" />
              </div>
              <div style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: #374151;">Email</label>
                <input type="email" placeholder="email@example.com" style="width: 100%; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;" />
              </div>
              <div style="margin-bottom: 24px;">
                <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: #374151;">Nội dung tin nhắn</label>
                <textarea rows="4" placeholder="Nhập tin nhắn của bạn..." style="width: 100%; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box; resize: vertical;"></textarea>
              </div>
              <button type="button" style="width: 100%; padding: 12px; background: #2563eb; color: #fff; border: none; border-radius: 6px; font-weight: 600; font-size: 15px; cursor: pointer;">Gửi tin nhắn</button>
            </form>
          </div>
          
        </div>
      </section>
    `,
  });
};

export const registerEventFaqBlock = (bm: any) => {
  bm.add("landing-event-faq", {
    label: "Event FAQ",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    content: `
      <section id="faq" class="event-faq" style="padding: 80px 20px; background: #ffffff;">
        <div style="max-width: 900px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 40px;">
            <p style="font-size: 14px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6366f1; margin-bottom: 10px;">Hỏi đáp</p>
            <h2 style="font-size: 30px; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Câu hỏi thường gặp</h2>
            <p style="font-size: 16px; color: #6b7280; max-width: 600px; margin: 0 auto;">Một vài câu hỏi gợi ý, anh/chị có thể chỉnh sửa để phù hợp với chính sách sự kiện.</p>
          </div>
          <div style="display:flex; flex-direction:column; gap:14px;">
            <details style="border-radius:14px; border:1px solid #e5e7eb; padding:12px 16px; background:#f9fafb;">
              <summary style="cursor:pointer; font-size:14px; font-weight:600; color:#111827; list-style:none; outline:none;">Tôi cần mang gì theo khi tham dự?</summary>
              <div style="margin-top:8px; font-size:14px; color:#4b5563;">Anh/chị vui lòng mang theo CMND/CCCD hoặc mã QR vé (trên điện thoại) để check-in nhanh chóng. Nên chuẩn bị thêm namecard nếu muốn networking.</div>
            </details>
            <details style="border-radius:14px; border:1px solid #e5e7eb; padding:12px 16px; background:#f9fafb;">
              <summary style="cursor:pointer; font-size:14px; font-weight:600; color:#111827; list-style:none; outline:none;">Có được hoàn/đổi vé không?</summary>
              <div style="margin-top:8px; font-size:14px; color:#4b5563;">Chính sách gợi ý: hoàn 100% trước ngày diễn ra 7 ngày, sau đó không hoàn nhưng có thể chuyển nhượng cho người khác. Thông tin chi tiết anh/chị điều chỉnh theo quy định thực tế.</div>
            </details>
            <details style="border-radius:14px; border:1px solid #e5e7eb; padding:12px 16px; background:#f9fafb;">
              <summary style="cursor:pointer; font-size:14px; font-weight:600; color:#111827; list-style:none; outline:none;">Sự kiện có hỗ trợ xuất hoá đơn không?</summary>
              <div style="margin-top:8px; font-size:14px; color:#4b5563;">Có thể thêm hướng dẫn: khách hàng nhập thông tin hoá đơn ở bước thanh toán hoặc liên hệ BTC sau khi mua vé.</div>
            </details>
            <details style="border-radius:14px; border:1px solid #e5e7eb; padding:12px 16px; background:#f9fafb;">
              <summary style="cursor:pointer; font-size:14px; font-weight:600; color:#111827; list-style:none; outline:none;">Dress code của sự kiện là gì?</summary>
              <div style="margin-top:8px; font-size:14px; color:#4b5563;">Gợi ý: Business casual / thoải mái nhưng lịch sự. Anh/chị có thể ghi rõ hơn tuỳ theo phong cách sự kiện.</div>
            </details>
          </div>
        </div>
      </section>
    `,
  });
};

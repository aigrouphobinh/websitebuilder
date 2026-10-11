export const registerEventPricingBlock = (bm: any) => {
  bm.add("landing-event-pricing", {
    label: "Event Pricing",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M8 10h8"></path><path d="M8 14h5"></path></svg>`,
    content: `
      <section id="tickets" class="event-pricing" style="padding: 80px 20px; background: #f8fafc;">
        <div style="max-width: 1100px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 40px;">
            <p style="font-size: 14px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6366f1; margin-bottom: 10px;">Giá vé</p>
            <h2 style="font-size: 32px; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Lựa chọn gói vé phù hợp</h2>
            <p style="font-size: 16px; color: #6b7280; max-width: 620px; margin: 0 auto;">Mẫu bảng giá để anh/chị chỉnh sửa mức giá, số lượng và quyền lợi từng loại vé.</p>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:24px; align-items:stretch;">
            <div style="background:#ffffff; border-radius:18px; padding:22px 20px; border:1px solid #e5e7eb;">
              <div style="font-size:14px; font-weight:600; color:#6b7280; margin-bottom:6px;">Vé Thường</div>
              <div style="font-size:26px; font-weight:800; color:#0f172a; margin-bottom:4px;">490.000đ</div>
              <div style="font-size:12px; color:#9ca3af; margin-bottom:14px;">Dành cho khách tham dự thông thường</div>
              <ul style="list-style:none; padding:0; margin:0 0 18px; display:flex; flex-direction:column; gap:8px; font-size:13px; color:#4b5563;">
                <li>• Vào cửa toàn bộ chương trình</li>
                <li>• Tea-break sáng</li>
                <li>• Tài liệu sau sự kiện</li>
              </ul>
              <a href="#" style="display:inline-flex; align-items:center; justify-content:center; width:100%; padding:10px 16px; border-radius:999px; border:1px solid #d1d5db; font-size:14px; font-weight:600; color:#111827; text-decoration:none; background:#f9fafb;">Chọn vé này</a>
            </div>
            <div style="background:#111827; border-radius:22px; padding:26px 22px; border:1px solid #4f46e5; box-shadow:0 25px 50px -20px rgba(15,23,42,0.8); transform:translateY(-4px);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <div style="font-size:14px; font-weight:600; color:#e5e7eb;">Vé VIP</div>
                <span style="font-size:11px; padding:4px 10px; border-radius:999px; background:#f97316; color:#111827; font-weight:600;">Được chọn nhiều</span>
              </div>
              <div style="font-size:28px; font-weight:800; color:#facc15; margin-bottom:4px;">990.000đ</div>
              <div style="font-size:12px; color:#9ca3af; margin-bottom:16px;">Ưu tiên chỗ ngồi và đặc quyền networking</div>
              <ul style="list-style:none; padding:0; margin:0 0 20px; display:flex; flex-direction:column; gap:8px; font-size:13px; color:#e5e7eb;">
                <li>• Tất cả quyền lợi của Vé Thường</li>
                <li>• Chỗ ngồi khu vực ưu tiên</li>
                <li>• Ăn trưa networking cùng diễn giả</li>
                <li>• Lối check-in riêng, không cần xếp hàng</li>
              </ul>
              <a href="#" style="display:inline-flex; align-items:center; justify-content:center; width:100%; padding:11px 18px; border-radius:999px; background:#f97316; color:#111827; font-size:14px; font-weight:700; text-decoration:none;">Đặt vé VIP</a>
            </div>
            <div style="background:#ffffff; border-radius:18px; padding:22px 20px; border:1px dashed #d1d5db;">
              <div style="font-size:14px; font-weight:600; color:#6b7280; margin-bottom:6px;">Vé Nhóm</div>
              <div style="font-size:26px; font-weight:800; color:#0f172a; margin-bottom:4px;">Liên hệ</div>
              <div style="font-size:12px; color:#9ca3af; margin-bottom:14px;">Ưu đãi cho nhóm từ 5 khách trở lên</div>
              <ul style="list-style:none; padding:0; margin:0 0 18px; display:flex; flex-direction:column; gap:8px; font-size:13px; color:#4b5563;">
                <li>• Giảm giá theo số lượng</li>
                <li>• Hỗ trợ hoá đơn công ty</li>
                <li>• Sắp xếp chỗ ngồi cùng khu vực</li>
              </ul>
              <a href="#contact" style="display:inline-flex; align-items:center; justify-content:center; width:100%; padding:10px 16px; border-radius:999px; border:1px solid #d1d5db; font-size:14px; font-weight:600; color:#111827; text-decoration:none; background:#f9fafb;">Liên hệ tư vấn</a>
            </div>
          </div>
        </div>
      </section>
    `,
  });
};

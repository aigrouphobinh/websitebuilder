export const registerEventAudienceBlock = (bm: any) => {
  bm.add("landing-event-audience", {
    label: "Event Audience",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="3"></circle><circle cx="16" cy="8" r="3"></circle><path d="M4 21v-2a4 4 0 0 1 4-4h0"></path><path d="M20 21v-2a4 4 0 0 0-4-4h0"></path><path d="M12 21v-2a4 4 0 0 0-3-3.87"></path></svg>`,
    content: `
      <section id="audience" class="event-audience" style="padding: 72px 20px; background: #ffffff;">
        <div style="max-width: 1000px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 40px;">
            <p style="font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6366f1; margin-bottom: 8px;">Ai nên tham dự?</p>
            <h2 style="font-size: 30px; font-weight: 800; color: #0f172a; margin-bottom: 10px;">Sự kiện này phù hợp với</h2>
            <p style="font-size: 15px; color: #6b7280; max-width: 620px; margin: 0 auto;">Mô tả rõ những nhóm đối tượng chính giúp khách dễ dàng tự nhận diện và quyết định đăng ký.</p>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:22px;">
            <div style="border-radius:18px; border:1px solid #e5e7eb; padding:18px 16px; background:#f9fafb;">
              <div style="font-size:14px; font-weight:600; color:#111827; margin-bottom:6px;">Founder / Chủ doanh nghiệp</div>
              <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:6px; font-size:13px; color:#4b5563;">
                <li>• Đang tìm cách mở rộng hoạt động qua kênh sự kiện.</li>
                <li>• Muốn tối ưu chi phí tổ chức nhưng vẫn đảm bảo trải nghiệm.</li>
                <li>• Cần network với đối tác, nhà cung cấp và khách hàng tiềm năng.</li>
              </ul>
            </div>
            <div style="border-radius:18px; border:1px solid #e5e7eb; padding:18px 16px; background:#f9fafb;">
              <div style="font-size:14px; font-weight:600; color:#111827; margin-bottom:6px;">Marketing / Event Executive</div>
              <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:6px; font-size:13px; color:#4b5563;">
                <li>• Chịu trách nhiệm chạy chiến dịch sự kiện cho doanh nghiệp.</li>
                <li>• Muốn học thêm cách tối đa hóa đăng ký và tỷ lệ tham dự.</li>
                <li>• Tìm kiếm công cụ hỗ trợ quản lý khách và check-in.</li>
              </ul>
            </div>
            <div style="border-radius:18px; border:1px solid #e5e7eb; padding:18px 16px; background:#f9fafb;">
              <div style="font-size:14px; font-weight:600; color:#111827; margin-bottom:6px;">Người quan tâm lĩnh vực</div>
              <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:6px; font-size:13px; color:#4b5563;">
                <li>• Muốn cập nhật xu hướng, kiến thức mới.</li>
                <li>• Đang chuẩn bị chuyển ngành hoặc phát triển sự nghiệp.</li>
                <li>• Tìm cơ hội kết nối với cộng đồng cùng sở thích.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    `,
  });
};

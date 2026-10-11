export const registerEventTopicsBlock = (bm: any) => {
  bm.add("landing-event-topics", {
    label: "Event Key Topics",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M7 8h10"></path><path d="M7 12h7"></path><path d="M7 16h5"></path></svg>`,
    content: `
      <section id="topics" class="event-topics" style="padding: 72px 20px; background: #f9fafb;">
        <div style="max-width: 1100px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 40px;">
            <p style="font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6366f1; margin-bottom: 8px;">Nội dung chính</p>
            <h2 style="font-size: 30px; font-weight: 800; color: #0f172a; margin-bottom: 10px;">Các chủ đề anh/chị có thể nhấn mạnh</h2>
            <p style="font-size: 15px; color: #6b7280; max-width: 640px; margin: 0 auto;">Tóm tắt ngắn gọn những chủ đề trọng tâm nhất của chương trình để khách tham dự hiểu nhanh.</p>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:22px;">
            <div style="background:#ffffff; border-radius:18px; padding:18px 16px; border:1px solid #e5e7eb;">
              <div style="font-size:14px; font-weight:600; color:#111827; margin-bottom:6px;">Xu hướng mới trong lĩnh vực</div>
              <p style="font-size:13px; color:#4b5563; margin:0 0 6px;">Tổng quan bức tranh thị trường, những thay đổi lớn và cơ hội mới.</p>
              <p style="font-size:12px; color:#9ca3af; margin:0;">Gợi ý: chia sẻ từ chuyên gia đầu ngành, kèm số liệu minh họa.</p>
            </div>
            <div style="background:#ffffff; border-radius:18px; padding:18px 16px; border:1px solid #e5e7eb;">
              <div style="font-size:14px; font-weight:600; color:#111827; margin-bottom:6px;">Case study thực tế</div>
              <p style="font-size:13px; color:#4b5563; margin:0 0 6px;">Câu chuyện triển khai thành công, từ ý tưởng đến kết quả cụ thể.</p>
              <p style="font-size:12px; color:#9ca3af; margin:0;">Gợi ý: chọn 1–2 ví dụ tiêu biểu, dễ liên hệ với người tham dự.</p>
            </div>
            <div style="background:#ffffff; border-radius:18px; padding:18px 16px; border:1px solid #e5e7eb;">
              <div style="font-size:14px; font-weight:600; color:#111827; margin-bottom:6px;">Workshop / Thực hành</div>
              <p style="font-size:13px; color:#4b5563; margin:0 0 6px;">Hoạt động tương tác để người tham dự tự áp dụng kiến thức ngay tại chỗ.</p>
              <p style="font-size:12px; color:#9ca3af; margin:0;">Gợi ý: liệt kê kết quả cụ thể người tham dự sẽ làm được sau phần này.</p>
            </div>
            <div style="background:#ffffff; border-radius:18px; padding:18px 16px; border:1px dashed #e5e7eb;">
              <div style="font-size:14px; font-weight:600; color:#111827; margin-bottom:6px;">Chủ đề khác</div>
              <p style="font-size:13px; color:#4b5563; margin:0 0 6px;">Anh/chị có thể thêm những phần đặc biệt như panel, Q&A, mini game...</p>
              <p style="font-size:12px; color:#9ca3af; margin:0;">Gợi ý: dùng để highlight điểm khác biệt, độc đáo của chương trình.</p>
            </div>
          </div>
        </div>
      </section>
    `,
  });
};

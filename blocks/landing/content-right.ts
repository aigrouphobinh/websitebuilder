export const registerContentRightBlock = (bm: any) => {
  bm.add("landing-content-right", {
    label: "Content (Img Right)",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="12" y="8" width="6" height="8"></rect><line x1="6" y1="8" x2="9" y2="8"></line><line x1="6" y1="12" x2="9" y2="12"></line></svg>`,
    content: `
      <section class="landing-content" style="padding: 80px 20px; background: #fff;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 60px; flex-wrap: wrap;">
          <div class="content-text" style="flex: 1; min-width: 300px;">
            <h2 style="font-size: 32px; font-weight: 700; color: #0f172a; margin-bottom: 24px; line-height: 1.2;">Nội dung hấp dẫn người xem</h2>
            <p style="font-size: 18px; color: #64748b; margin-bottom: 32px; line-height: 1.6;">
              Mô tả chi tiết về sản phẩm hoặc dịch vụ của bạn tại đây. Sử dụng hình ảnh minh họa bên phải để làm nổi bật nội dung.
            </p>
            <ul class="feature-list" style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 16px;">
              <li style="display: flex; align-items: center; gap: 12px; color: #4b5563; font-size: 16px;">
                <span style="color: #2563eb; font-weight: bold;">✓</span> Điểm nổi bật thứ nhất
              </li>
              <li style="display: flex; align-items: center; gap: 12px; color: #4b5563; font-size: 16px;">
                <span style="color: #2563eb; font-weight: bold;">✓</span> Điểm nổi bật thứ hai
              </li>
              <li style="display: flex; align-items: center; gap: 12px; color: #4b5563; font-size: 16px;">
                <span style="color: #2563eb; font-weight: bold;">✓</span> Điểm nổi bật thứ ba
              </li>
            </ul>
          </div>
          <div class="content-media" style="flex: 1; min-width: 300px;">
            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Content" style="width: 100%; border-radius: 16px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
          </div>
        </div>
      </section>
    `,
  });
};

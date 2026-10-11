export const registerGalleryBlock = (bm: any) => {
  bm.add("landing-gallery", {
    label: "Gallery Generic",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,
    content: `
      <section class="landing-gallery" style="padding: 60px 20px; background: #fff; text-align: center;">
        <h2 style="font-size: 32px; font-weight: 700; color: #111827; margin-bottom: 16px;">Thư viện hình ảnh</h2>
        <p style="color: #6b7280; margin-bottom: 40px;">Những khoảnh khắc đáng nhớ</p>
        
        <div class="gallery-grid" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; max-width: 1200px; margin: 0 auto;">
          <div style="aspect-ratio: 1/1; background: #e5e7eb; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #9ca3af;">Ảnh 1</div>
          <div style="aspect-ratio: 1/1; background: #e5e7eb; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #9ca3af;">Ảnh 2</div>
          <div style="aspect-ratio: 1/1; background: #e5e7eb; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #9ca3af;">Ảnh 3</div>
          <div style="aspect-ratio: 1/1; background: #e5e7eb; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #9ca3af;">Ảnh 4</div>
          <div style="aspect-ratio: 1/1; background: #e5e7eb; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #9ca3af;">Ảnh 5</div>
          <div style="aspect-ratio: 1/1; background: #e5e7eb; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #9ca3af;">Ảnh 6</div>
        </div>
        <style>
          @media (max-width: 768px) {
            .landing-gallery .gallery-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          }
          @media (max-width: 480px) {
            .landing-gallery .gallery-grid { grid-template-columns: minmax(0, 1fr) !important; }
          }
        </style>
      </section>
    `,
  });
};

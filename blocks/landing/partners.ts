export const registerPartnersBlock = (bm: any) => {
  bm.add("landing-partners", {
    label: "Partners",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"></path><path d="M8 12l3 3 5-5"></path></svg>`,
    content: `
      <section class="landing-partners" style="padding: 40px 20px; background: #fff; text-align: center; border-bottom: 1px solid #f3f4f6; border-top: 1px solid #f3f4f6;">
        <p style="color: #6b7280; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 24px;">Đồng hành cùng các thương hiệu lớn</p>
        <div class="partners-grid" style="display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; align-items: center; max-width: 1200px; margin: 0 auto; opacity: 0.6;">
          <div style="font-size: 20px; font-weight: 700; color: #9ca3af;">LOGO 1</div>
          <div style="font-size: 20px; font-weight: 700; color: #9ca3af;">LOGO 2</div>
          <div style="font-size: 20px; font-weight: 700; color: #9ca3af;">LOGO 3</div>
          <div style="font-size: 20px; font-weight: 700; color: #9ca3af;">LOGO 4</div>
          <div style="font-size: 20px; font-weight: 700; color: #9ca3af;">LOGO 5</div>
        </div>
      </section>
    `,
  });
};

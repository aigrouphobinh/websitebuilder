export const registerSponsorsBlock = (bm: any) => {
  bm.add("landing-sponsors", {
    label: "Sponsors Generic",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg>`,
    content: `
      <section class="landing-sponsors" style="padding: 60px 20px; background: #f9fafb; text-align: center;">
        <h2 style="font-size: 32px; font-weight: 700; color: #111827; margin-bottom: 40px;">Nhà tài trợ chương trình</h2>
        
        <div style="max-width: 1000px; margin: 0 auto; margin-bottom: 40px;">
          <h3 style="font-size: 18px; color: #4b5563; margin-bottom: 24px; font-weight: 600;">Nhà tài trợ Kim Cương</h3>
          <div style="display: flex; justify-content: center; gap: 32px; flex-wrap: wrap;">
            <div style="width: 240px; height: 100px; background: #fff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; color: #9ca3af; font-weight: bold; font-size: 20px;">DIAMOND 1</div>
            <div style="width: 240px; height: 100px; background: #fff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; color: #9ca3af; font-weight: bold; font-size: 20px;">DIAMOND 2</div>
          </div>
        </div>
        
        <div style="max-width: 1000px; margin: 0 auto;">
          <h3 style="font-size: 16px; color: #6b7280; margin-bottom: 20px; font-weight: 600;">Nhà tài trợ Vàng</h3>
          <div style="display: flex; justify-content: center; gap: 24px; flex-wrap: wrap;">
            <div style="width: 160px; height: 80px; background: #fff; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); display: flex; align-items: center; justify-content: center; color: #9ca3af; font-weight: bold;">GOLD 1</div>
            <div style="width: 160px; height: 80px; background: #fff; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); display: flex; align-items: center; justify-content: center; color: #9ca3af; font-weight: bold;">GOLD 2</div>
            <div style="width: 160px; height: 80px; background: #fff; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); display: flex; align-items: center; justify-content: center; color: #9ca3af; font-weight: bold;">GOLD 3</div>
            <div style="width: 160px; height: 80px; background: #fff; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); display: flex; align-items: center; justify-content: center; color: #9ca3af; font-weight: bold;">GOLD 4</div>
          </div>
        </div>
      </section>
    `,
  });
};

export const registerEventContactBlock = (bm: any) => {
  bm.add("landing-event-contact", {
    label: "Event Contact",
    category: "Landing Page",
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09"></path><path d="M17 2l4 4-4 4"></path><path d="M21 6H8"></path></svg>`,
    content: `
      <section id="contact" class="event-contact" style="padding: 72px 20px; background: #020617; color: #e5e7eb;">
        <div style="max-width: 1000px; margin: 0 auto; display:grid; grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); gap:40px; align-items:flex-start;">
          <div>
            <p style="font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #38bdf8; margin-bottom: 8px;">Liên hệ Ban tổ chức</p>
            <h2 style="font-size: 28px; font-weight: 800; color: #f9fafb; margin-bottom: 12px;">Cần hỗ trợ thêm thông tin?</h2>
            <p style="font-size: 15px; color: #9ca3af; margin-bottom: 20px;">Khách tham dự có thể liên hệ trực tiếp với anh/chị qua các kênh dưới đây để được tư vấn về vé, hoá đơn hoặc chi tiết chương trình.</p>
            <div style="display:flex; flex-direction:column; gap:12px; font-size:14px;">
              <div style="display:flex; gap:10px; align-items:center;">
                <span style="width:26px; height:26px; border-radius:999px; background:#0f172a; display:flex; align-items:center; justify-content:center; font-size:13px;">📞</span>
                <div>
                  <div style="color:#e5e7eb; font-weight:500;">Hotline</div>
                  <div style="color:#9ca3af;">Điền số điện thoại hỗ trợ</div>
                </div>
              </div>
              <div style="display:flex; gap:10px; align-items:center;">
                <span style="width:26px; height:26px; border-radius:999px; background:#0f172a; display:flex; align-items:center; justify-content:center; font-size:13px;">✉️</span>
                <div>
                  <div style="color:#e5e7eb; font-weight:500;">Email</div>
                  <div style="color:#9ca3af;">Điền email liên hệ chính thức</div>
                </div>
              </div>
              <div style="display:flex; gap:10px; align-items:center;">
                <span style="width:26px; height:26px; border-radius:999px; background:#0f172a; display:flex; align-items:center; justify-content:center; font-size:13px;">📍</span>
                <div>
                  <div style="color:#e5e7eb; font-weight:500;">Địa điểm</div>
                  <div style="color:#9ca3af;">Địa chỉ chi tiết nơi tổ chức</div>
                </div>
              </div>
            </div>
          </div>
          <div style="background:#020617; border-radius:18px; border:1px solid #1e293b; padding:18px 16px;">
            <h3 style="font-size:16px; font-weight:600; margin-bottom:8px; color:#f9fafb;">Gửi yêu cầu / Liên hệ</h3>
            <p style="font-size:13px; color:#9ca3af; margin-bottom:12px;">Khách tham dự có thể gửi yêu cầu tư vấn hoặc đặt câu hỏi về vé tại đây. Thông tin sẽ gửi tới email ban tổ chức.</p>
            <form class="hp-contact-form" data-event-id="[id_event]" onsubmit="(async function(e){e.preventDefault(); const f=e.target; const name=f.querySelector('[name=contact_name]').value; const phone=f.querySelector('[name=contact_phone]').value; const email=f.querySelector('[name=contact_email]').value; const message=f.querySelector('[name=contact_message]').value; const eventId=f.getAttribute('data-event-id')||'[id_event]'; try{ const res=await fetch('/api/events/'+encodeURIComponent(eventId)+'/contact-inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,phone,email,message})}); const j=await res.json(); if(res.ok){ alert(j.message||'Đã gửi yêu cầu. Chúng tôi sẽ liên hệ lại'); } else { alert(j.message||'Gửi thất bại'); } }catch(err){ alert('Lỗi gửi yêu cầu'); } })(event)">
              <div style="display:flex;flex-direction:column;gap:8px;">
                <input class="hp-input" name="contact_name" placeholder="Họ và tên" required />
                <input class="hp-input" name="contact_phone" placeholder="Số điện thoại" />
                <input class="hp-input" name="contact_email" placeholder="Email" required />
                <textarea class="hp-textarea" name="contact_message" placeholder="Nội dung" rows="4" required></textarea>
                <div class="hp-contact-actions"><button type="submit" style="display:inline-block;padding:10px 16px;background:#2563eb;color:#fff;border-radius:8px;border:none;cursor:pointer">Gửi yêu cầu</button></div>
              </div>
            </form>
          </div>
        </div>
        <style>
          @media (max-width: 800px) {
            .event-contact > div { grid-template-columns: minmax(0, 1fr); }
          }
        </style>
      </section>
    `,
  });
};

# WebsiteBuilder — Implementation Status & Roadmap

Cập nhật: 2026-10-12

> **Ghi chú quan trọng:** Bản kế hoạch cũ ngày 2026-09-19 đã lỗi thời ở phần mô tả 13 landing blocks là chưa được triển khai. Đã đối chiếu lại `landing-page-blocks.ts`, `blocks/landing/index.ts` và `__tests__/plugin.test.ts`: hiện có 31 block được đăng ký (18 block event + 13 block landing). Không dùng danh sách thiếu cũ làm căn cứ xóa hoặc tạo lại block.

## 1. Trạng thái đã xác minh trong mã nguồn

### Đăng ký block
- [x] 5 block core được import và gọi hàm đăng ký.
- [x] 13 block event-specific được import và gọi hàm đăng ký.
- [x] 13 block landing bổ sung được import và gọi hàm đăng ký.
- [x] Test hiện có kiểm tra tổng số 31 block, ID, label, content và markup HTML cơ bản.
- [ ] Chưa có kết quả xác nhận test/build thực tế trong môi trường chạy tại thời điểm cập nhật này.
- [ ] Chưa xác minh bằng trình duyệt thao tác kéo-thả, preview và export cho toàn bộ 31 block.

### Danh sách block hiện được đăng ký

**Core (5):**
`landing-header`, `landing-hero`, `landing-features`, `landing-content-right`, `landing-footer`.

**Landing additions (13):**
`landing-testimonials`, `landing-content-left`, `landing-faq`, `landing-team`, `landing-contact`, `landing-partners`, `landing-speakers`, `landing-sponsors`, `landing-benefits`, `landing-audience`, `landing-topics`, `landing-stats`, `landing-gallery`.

**Event-specific (13):**
`landing-event-hero`, `landing-event-speakers`, `landing-event-agenda`, `landing-event-pricing`, `landing-event-hero-countdown`, `landing-event-sponsors`, `landing-event-contact`, `landing-event-faq`, `landing-event-benefits`, `landing-event-audience`, `landing-event-topics`, `landing-event-stats`, `landing-event-gallery`.

> Tổng số chính xác theo test và lời gọi đăng ký là 31: 5 core + 13 landing additions + 13 event-specific. ID trong code là nguồn sự thật.

## 2. Đồng bộ v-model HTML

Đã cập nhật `WebsiteBuilder.vue`:
- Khi parent truyền chuỗi rỗng `""`, canvas được xóa rõ ràng thay vì giữ starter template.
- Không gọi `setComponents()` lại nếu HTML nhận vào đã trùng HTML hiện tại hoặc là giá trị component vừa emit.
- Khi lưu, cập nhật `lastEmittedHtml` cùng payload trước khi emit `update:modelValue` và `save`.

File: [WebsiteBuilder.vue](https://github.com/aigrouphobinh/websitebuilder/blob/main/WebsiteBuilder.vue)

**Cần xác minh tiếp:** kiểm thử luồng nhập HTML → chỉnh sửa canvas → emit v-model → save → nạp lại; kiểm tra HTML rỗng, HTML thay từ parent, và nội dung có CSS. Chưa tuyên bố build/test đã chạy thành công.

## 3. Ưu tiên tiếp theo

### P1 — Xác minh và bổ sung regression tests
- [x] Tách chuẩn hóa từ khóa tìm kiếm thành `utils/element-search.ts` để có thể kiểm thử độc lập.
- [x] Tách quyết định đồng bộ HTML đầu vào thành `utils/model-html-sync.ts` và nối vào watcher `v-model`.
- [x] Tách khâu ghép HTML/CSS của `getHtmlWithCss()` thành `utils/html-with-css.ts`; HTML truyền vào được giữ nguyên, không xử lý lại placeholder trong helper.
- [x] Escape giá trị thuộc tính HTML khi xuất `lang`, URL stylesheet và thuộc tính `src`/`type` của script.
- [x] Bổ sung `__tests__/element-search.test.ts` cho bỏ dấu tiếng Việt, chuẩn hóa chữ hoa/khoảng trắng, tìm chuỗi con và truy vấn rỗng.
- [ ] Chạy test hiện có cho đăng ký 31 block và test tìm kiếm mới.
- [x] Thêm unit tests cho quyết định `v-model`: HTML rỗng, HTML trùng canvas, echo từ parent và HTML mới từ parent.
- [x] Thêm `utils/restore-template-content.ts`: ưu tiên `projectData`, fallback sang HTML/CSS đã lưu nếu snapshot không tương thích hoặc không tải được; khi fallback, CSS rỗng được áp dụng để tránh giữ style của template trước.
- [ ] Kiểm thử tích hợp luồng save/reload thực tế trong môi trường Vue + GrapesJS; helper fallback mới có unit tests nhưng chưa được chạy.
- [x] Bổ sung `__tests__/event-placeholders.test.ts` cho thay token, giữ placeholder chưa biết, dữ liệu lồng nhau, chuỗi có ký tự JSON đặc biệt và ngăn thay thế dây chuyền.
- [x] Bổ sung `__tests__/html-with-css.test.ts` để kiểm tra khâu ghép CSS, giữ `class`, `id`, `data-*` và placeholder động.
- [ ] Xác minh nội dung HTML/CSS được giữ nguyên qua save/reload thực tế trong Vue + GrapesJS; test helper chưa thay thế kiểm thử tích hợp.
- [ ] Chạy TypeScript/build nếu repository có scripts và môi trường phụ thuộc tương ứng.

### P2 — Kiểm tra tương thích key và event context
- [ ] Xác định nguồn types/config thực tế đang được sử dụng trước khi tạo alias mới.
- [ ] Đối chiếu key `event:*` với ID `landing-event-*` ở nơi tiêu thụ config; chỉ thêm alias nếu có caller thực sự yêu cầu.
- [x] Bổ sung test cho placeholder event: token đã biết được thay thế, token chưa biết được giữ nguyên và giá trị được thay vào không bị quét lần thứ hai.
- [ ] Xác minh end-to-end placeholder như `[ev_name]`, `[ev_location]`, `[ev_description]`, `[ev_order_url]`, `[company_name]` được giữ nguyên khi lưu và được thay thế đúng ở bước render phù hợp.

### P3 — Kiểm thử trải nghiệm builder
- [ ] Kéo-thả, chọn, di chuyển, duplicate và xóa block.
- [x] Bổ sung `utils/escape-html-attribute.ts` và test cho escaping dấu nháy, dấu `&`, `<`, `>` trong thuộc tính.
- [x] Sửa `getExportHtml()` để `includeScripts: false` không còn xuất các script tương tác nội bộ ở body; thêm test bao phủ chế độ tắt script.
- [x] Chuẩn hóa sinh thẻ script qua `utils/export-script-tag.ts`, escape `src`/`type` và giữ lại thuộc tính `async`/`defer` nhất quán giữa HTML lưu và HTML export.
- [ ] Kiểm tra preview và export HTML/CSS trong trình duyệt; các test helper hiện chưa được chạy. Cần xác nhận thứ tự thực thi script thực tế trên trình duyệt sau khi giữ nguyên `async`/`defer`. `includeRuntime` vẫn là tùy chọn độc lập với `includeScripts`.
- [ ] Kiểm tra desktop/tablet/mobile và các block có form/accordion/carousel.
- [ ] Kiểm tra console, thao tác bàn phím và trạng thái chưa lưu.
- [x] Khi nhận template mới từ cửa sổ cha, dọn tài nguyên template trước đó, đồng bộ danh sách script đã lưu và áp dụng CSS rỗng để tránh giữ style/script cũ.
- [x] Khi template gửi vào không có `projectData` và HTML rỗng, vẫn áp dụng HTML rỗng để canvas không giữ nguyên trang trước.
- [ ] Kiểm thử hồi quy template rỗng và chuyển template liên tiếp trong trình duyệt.
- [ ] Kiểm tra tích hợp việc chuyển liên tiếp giữa template có/không có `headCss`, `headLinks`, runtime và scripts; xác nhận preview không còn tài nguyên bị sót.

## 4. Quy tắc an toàn khi sửa
- Không xóa thư mục/file chỉ dựa trên nhận định “dead code” trong kế hoạch cũ; xác minh import/reference trước.
- Không tạo dữ liệu giả cho event context; không thay placeholder động nếu chưa có context thật.
- Mỗi lần cập nhật cần có commit riêng, ghi rõ thay đổi và nêu trung thực test nào đã chạy.


## UI/UX nâng cấp (đợt tiếp theo)
- [x] Thêm phản hồi trực tiếp khi tìm thành phần: hiển thị số kết quả hoặc hướng dẫn khi không tìm thấy; dùng live region để hỗ trợ trình đọc màn hình.
- [x] Bổ sung nhãn truy cập và trạng thái ARIA cho nút mở thanh thành phần, trình đơn, kích thước xem trước và bảng thuộc tính.
- [x] Tạo trạng thái focus rõ ràng và vùng tương tác thân thiện với thiết bị cảm ứng trong giao diện builder.
- [ ] Kiểm tra thao tác bàn phím, độ tương phản, bố cục trên màn hình nhỏ và kiểm thử người dùng thực tế; chưa chạy build/test trong môi trường dự án.

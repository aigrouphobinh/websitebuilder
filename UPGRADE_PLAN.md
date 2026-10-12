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

### P3 — Cải tiến UI/UX cột thuộc tính bên phải
- [x] Làm rõ thứ bậc thị giác của tiêu đề, trạng thái phần tử được chọn, ô tìm kiếm và ba tab.
- [x] Giảm cảm giác rối bằng nhóm cài đặt dạng card nhẹ, khoảng cách đồng nhất, trường nhập dễ đọc và trạng thái focus dễ nhận biết.
- [x] Làm rõ vùng thao tác định dạng văn bản và giữ bố cục phù hợp màn hình hẹp.
- [x] Tinh gọn chiều cao header, ô tìm kiếm, tab, nhóm và trường nhập; giữ nguyên tất cả trường/handler để ưu tiên thông tin chính mà không mất chức năng.
- [ ] Kiểm tra trực tiếp desktop/tablet/mobile, xác minh không có CSS khác ghi đè và mọi trường vẫn thao tác được.
- [ ] Dựa trên phản hồi sử dụng thực tế để quyết định có ẩn/bỏ các trường nâng cao ít dùng; chưa xóa chức năng nghiệp vụ chỉ dựa trên giả định.

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
- [x] Khi áp dụng template đã nhận trước lúc editor khởi tạo, xóa tài nguyên của template cũ, đồng bộ danh sách scripts và áp dụng cả HTML/CSS rỗng để tránh sót nội dung.
- [x] Khi tải template công ty, đồng bộ lại danh sách script head/body theo template hiện tại để tránh export nhầm script của template trước.
- [x] Khi dọn tài nguyên canvas lúc đổi template, xóa cả script import theo chuỗi và script inline import để hạn chế tài nguyên cũ còn hoạt động.
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
- [x] Bổ sung `aria-label` và `aria-busy` cho nút lưu/xuất bản để trạng thái đang lưu được công nghệ hỗ trợ nhận diện; thêm nhãn rõ ràng cho thao tác khôi phục trang chủ và lưu mẫu hệ thống.
- [x] Đặt bảng thuộc tính bên phải ở chế độ dễ đọc mặc định thay vì thu gọn các trường điều khiển; hiển thị tên thành phần đang chọn ngay trên đầu bảng để người dùng biết mình đang chỉnh sửa phần nào.
- [x] Làm rõ phản hồi khi xác minh dữ liệu sau lưu không khớp: hiển thị cảnh báo cụ thể và không hiện thêm thông báo thành công gây hiểu nhầm.
- [x] Phân biệt trường hợp API đọc lại sau lưu bị lỗi: cảnh báo chưa xác minh được dữ liệu thay vì âm thầm hiển thị thông báo lưu thành công.
- [x] Làm gọn phần đầu cột thuộc tính: tiêu đề và hướng dẫn theo ngữ cảnh, ô tìm kiếm toàn chiều rộng, nút xóa tìm kiếm và trạng thái focus dễ nhận biết.
- [x] Cải thiện bảng thuộc tính bên phải: nhóm tab rõ ràng hơn, biểu tượng và trạng thái tab được chọn cho trình đọc màn hình, trường nhập dễ đọc và vùng chạm thoải mái hơn.
- [x] Tìm cài đặt trong cột phải không phân biệt dấu tiếng Việt (ví dụ `khoang cach` tìm được `Khoảng cách`); giữ nguyên cơ chế lọc thuộc tính hiện có.
- [ ] Xác minh thủ công tìm kiếm có dấu/không dấu trên từng tab và kiểm tra không có nhóm cài đặt bị ẩn ngoài ý muốn.
- [ ] Kiểm tra thao tác bàn phím, độ tương phản, bố cục trên màn hình nhỏ và kiểm thử người dùng thực tế; chưa chạy build/test trong môi trường dự án.


## 5. Roadmap tổng thể — thực hiện tuần tự từ đầu đến cuối

> Quy tắc làm việc: mỗi P có tiêu chí hoàn thành, commit riêng và kiểm tra trước khi chuyển P tiếp theo. Giữ nguyên API, v-model, placeholder động, cấu trúc HTML/CSS và logic nghiệp vụ; không xóa tính năng khi chưa chứng minh là trùng hoặc không còn caller. Trạng thái [x] là đã có thay đổi trong mã/kế hoạch, không đồng nghĩa đã test thành công.

### P0 — Chốt hiện trạng và tiêu chí nghiệm thu
- [x] Đối chiếu kế hoạch cũ với registry: 31 block (5 core + 13 landing + 13 event-specific).
- [x] Ghi nhận nhánh UI hiện tại ux/right-inspector-redesign; PR #2 là nơi tổng hợp thay đổi tìm kiếm và sidebar.
- [x] So sánh nhánh với main: nhánh đi trước 8 commit, không đi sau; PR #2 vẫn là draft và chưa merge.
- [x] Kiểm tra cây repository đệ quy: có source, utils và tests nhưng không có package.json, lockfile, cấu hình Vitest hoặc workflow CI trong repository này.
- [ ] Xác định môi trường host đang tích hợp component để chạy test/build đúng dependency; không tự tạo manifest giả định cho một repository source-only.
- **Nghiệm thu:** có danh sách file/điểm vào/lệnh kiểm tra xác minh từ repository, không suy đoán cấu hình.

### P1 — Chạy baseline và ổn định kiểm thử
- [x] Có unit test cho chuẩn hóa tìm kiếm, quyết định đồng bộ HTML, placeholder, ghép HTML/CSS, escaping thuộc tính và một số hành vi export/restore.
- [ ] Chạy toàn bộ test hiện có và ghi kết quả thực tế; hiện chưa thể chạy trực tiếp từ repository do thiếu package manifest và cấu hình test.
- [ ] Chạy type-check/build/lint trong host project tích hợp component.
- [x] Sửa lỗi chuẩn hóa tìm kiếm tiếng Việt: chữ đ/Đ không tự phân rã qua Unicode NFD nên đã bổ sung chuẩn hóa về d/D và test hồi quy.
- [x] Chuẩn hóa nhiều khoảng trắng liên tiếp thành một khoảng trắng để truy vấn tìm kiếm không phụ thuộc cách người dùng gõ; bổ sung test hồi quy.
- [ ] Sửa các lỗi baseline còn lại trước khi thêm thay đổi chức năng mới.
- **Nghiệm thu:** ghi rõ lệnh nào chạy, số test pass/fail và lỗi còn lại; không đánh dấu pass nếu chưa chạy.

### P2 — Đồng bộ dữ liệu editor và v-model
- [x] Có helper quyết định đồng bộ HTML đầu vào; xử lý HTML rỗng, echo từ parent, HTML trùng và HTML mới.
- [ ] Kiểm thử tích hợp parent → canvas → update:modelValue → save → reload.
- [ ] Kiểm tra nội dung HTML rỗng, thay đổi liên tiếp từ parent và nội dung có CSS.
- **Nghiệm thu:** không mất nội dung, không reset canvas không cần thiết, không lặp watcher/emit.

### P3 — Registry block và tương thích cấu hình
- [x] Registry hiện có 31 block và test kiểm tra số lượng/ID/label/content/markup cơ bản.
- [ ] Xác minh các block xuất hiện đúng trong UI, kéo-thả và chèn bằng click.
- [ ] Đối chiếu key event:* với ID landing-event-* tại nơi tiêu thụ; chỉ thêm alias nếu có caller thực tế.
- [ ] Kiểm tra không trùng ID, block thiếu metadata hoặc block đăng ký nhưng không dùng được.
- **Nghiệm thu:** đủ 31 block, ID ổn định, không phá cấu hình template đã lưu.

### P4 — Placeholder và event context
- [x] Có test helper cho token đã biết/chưa biết, dữ liệu lồng nhau, ký tự JSON đặc biệt và ngăn thay thế dây chuyền.
- [ ] Kiểm tra end-to-end [ev_name], [ev_location], [ev_description], [ev_order_url], [company_name].
- [ ] Xác minh token được giữ nguyên khi lưu và chỉ thay ở bước render có event context thật.
- **Nghiệm thu:** không tạo dữ liệu giả, không thay token chưa biết, không làm hỏng giá trị có ký tự đặc biệt.

### P5 — Save/load, HTML/CSS và export
- [x] Có helper ghép HTML/CSS và test giữ class, id, data-* cùng placeholder.
- [x] Có xử lý restore ưu tiên projectData, fallback HTML/CSS và đồng bộ tài nguyên khi đổi template.
- [x] Có xử lý escape thuộc tính HTML và helper tạo script tag; includeScripts: false được thiết kế để bỏ script tương tác nội bộ khỏi body.
- [ ] Chạy unit tests của các helper.
- [ ] Kiểm tra tích hợp save/load/preview/export, headCss, headLinks, runtime, scripts, async/defer và CSS rỗng.
- **Nghiệm thu:** HTML export hợp lệ, không rò tài nguyên template trước, không mất script cần thiết hoặc chạy script ngoài ý muốn.

### P6 — UX canvas và thư viện thành phần
- [x] Có phản hồi tìm kiếm thành phần, số kết quả và trạng thái không tìm thấy.
- [ ] Kiểm thử kéo-thả, chọn, di chuyển, duplicate, xóa và chèn block bằng click.
- [ ] Làm rõ trạng thái chọn/hover/drag, empty state và hướng dẫn thao tác đầu tiên.
- [ ] Đảm bảo tìm kiếm không dấu và có dấu hoạt động ổn định.
- **Nghiệm thu:** người mới có thể tìm/chèn/chỉnh sửa block mà không cần đoán thao tác.

### P7 — Sidebar phải: gọn, có thứ bậc, theo ngữ cảnh
- [x] Đã thêm thiết kế tiêu đề, ô tìm kiếm, ba tab và trường nhập nhất quán trên nhánh UI.
- [x] Đã tinh gọn khoảng cách và giảm độ nặng của card bằng CSS.
- [x] Sửa điều kiện render của nhóm thuộc tính phần tử: tab Cài đặt hiển thị các nhóm hình ảnh/video/nút/liên kết/HTML và thuộc tính nâng cao thay vì bị gắn nhầm vào tab Kiểu dáng.
- [x] Thêm nội dung tab Tương tác với điều khiển sự kiện và hành động JavaScript, dùng lại state/handler hiện có `eventType`, `eventAction`, `applyEvents`; không thêm API mới.
- [x] Loại bỏ nhóm sự kiện bị lặp khỏi tab Kiểu dáng sau khi chuyển sang tab Tương tác; bỏ state chỉ phục vụ nhóm lặp.
- [x] Chỉ hiển thị lối tắt “Mở cài đặt liên kết” khi phần tử được chọn thực sự là nút/liên kết, giúp người dùng chuyển thẳng đến thuộc tính URL đang có.
- [x] Mở rộng tìm kiếm có dấu/không dấu cho các nhóm thuộc tính Cài đặt: nâng cao, ảnh, video, nút/liên kết, HTML, navbar, hero, ảnh nền, slider, gallery, accordion và form; bổ sung từ đồng nghĩa dựa trên nhãn trường có thật.
- [x] Lọc các nhóm Kiểu dáng theo từ khóa, tự mở phần trùng khớp khi đang tìm, ẩn thẻ nhóm trống và hiển thị hướng dẫn khi không có kết quả.
- [x] Bổ sung trạng thái không có kết quả cho Cài đặt/Tương tác; dùng lại `normalizeElementSearch` đã kiểm thử để thống nhất xử lý dấu tiếng Việt và nhiều khoảng trắng.
- [x] Tách `matchesElementSearch` thành helper thuần và thêm unit tests cho bỏ dấu, nhiều khoảng trắng, trường hợp không khớp và truy vấn rỗng; component dùng chung helper này cho bộ lọc trong sidebar.
- [ ] Chạy unit tests mới trong host project có Vitest; test đã viết nhưng chưa được thực thi từ repository source-only này.
- [ ] Kiểm tra tìm kiếm thực tế trên từng tab và xác minh không có nhóm thuộc tính bị lọc mất ngoài ý muốn.
- [ ] Kiểm tra mọi nhóm thuộc tính trong ba tab và xác minh không bị CSS cắt/che.
- [x] Ưu tiên thao tác thường dùng; gom nhóm nâng cao dưới nhóm có tên rõ ràng. Nhóm ID/CSS/breakpoint chỉ hiện với super admin và được đặt sau các nhóm theo loại phần tử.
- [x] Chỉ ẩn nhóm không liên quan theo loại phần tử đang chọn: mỗi nhóm Cài đặt đã có `v-if` kết hợp kiểm tra loại phần tử (`isImageComponent`, `isVideoComponent`, `isButtonComponent`/`hasLinkInSelection`, `isHtmlComponent`, `isNavbarComponent`, `isHeroComponent`, `isBackgroundImageComponent`, `isSliderComponent`, `isGalleryComponent`, `isAccordionComponent`, `isFormComponent`, `isSuperAdminPerm`) + `matchesSearch`. Không bỏ handler/API.
- [x] Chỉ xóa điều khiển trùng sau khi truy vết: đã loại bỏ nhóm Sự kiện trùng khỏi tab Kiểu dáng; không còn state chỉ phục vụ nhóm lặp. Các trường còn lại vẫn có caller.
- **Nghiệm thu:** người dùng nhìn thấy đúng nhóm phù hợp, tìm được cài đặt, các giá trị cũ vẫn hoạt động.

### P8 — Responsive, accessibility và thao tác bàn phím
- [x] Đã bổ sung focus-visible, ARIA label/state và quy tắc responsive.
- [x] Ba tab có ID, `aria-controls`/labelled tabpanel và `tabindex` để chỉ tab đang chọn nằm trong thứ tự Tab thông thường.
- [x] Hỗ trợ bàn phím trong tablist: Left/Right đổi tab và chuyển focus, Home về tab đầu, End đến tab cuối.
- [x] Gắn nhãn landmark cho bảng thuộc tính và liên kết nút bật/tắt panel với vùng điều khiển bằng `aria-controls`/ `aria-expanded`.
- [x] Thay thẻ `label` bao quanh ô tìm kiếm và nút xóa bằng `div` có semantics phù hợp; input giữ `aria-label` độc lập để tránh lồng nhiều điều khiển trong label.
- [x] Khi xóa từ khóa tìm kiếm, đưa focus trở lại ô nhập sau khi nút xóa biến mất để bàn phím có thể tiếp tục nhập ngay.
- [x] Trong ô tìm kiếm, `Escape` xóa truy vấn trước; khi truy vấn đã rỗng, `Escape` mới đóng panel và trả focus về toggle.
- [x] Đánh dấu trạng thái không có kết quả bằng `role="status"`/`aria-live="polite"` để thay đổi do tìm kiếm được trình đọc màn hình thông báo.
- [x] Tăng vùng nhấn của nút xóa tìm kiếm từ 24px lên 32px, thuận tiện hơn khi thao tác cảm ứng mà vẫn vừa ô tìm kiếm.
- [x] Mở rộng từ khóa tìm kiếm thuộc tính nút/liên kết cho các trường mục tiêu `target`, `noopener`, `noreferrer`, `nofollow`, download, nhãn ARIA và ID sự kiện để tìm được cả nhóm chứa các điều khiển nâng cao.
- [x] Cho phép tìm theo giá trị/tùy chọn có sẵn của các trường kiểu dáng như `fixed`, `sticky`, `row-reverse`, `nowrap`, `cover`, `contain` và `scale-down`, không chỉ theo tiêu đề nhóm.
- [x] Hiển thị nút bật/tắt bảng thuộc tính trên cả desktop lẫn màn hình nhỏ, tránh trường hợp đóng panel trên desktop nhưng không có nút để mở lại.
- [x] Khi mở panel bằng nút toolbar, đưa focus vào ô tìm kiếm; khi đóng bằng nút X hoặc Escape trong panel, đưa focus về nút bật/tắt.
- [x] Khi panel tự thu gọn do viewport chuyển sang mobile, kiểm tra focus có nằm trong panel hay không; chỉ trả focus về toolbar toggle khi resize thực sự loại bỏ phần tử đang có focus, tránh cướp focus khỏi canvas/toolbar ở lần bố cục mobile đầu tiên.
- [x] Trên màn hình rất hẹp (≤360px), ẩn icon trang trí trong tab để dành chỗ cho nhãn tiếng Việt.
- [ ] Kiểm tra desktop, tablet và mobile; sidebar không che mất nút quan trọng hoặc cắt nội dung.
- [ ] Chạy thử keyboard navigation, focus khi mở/đóng panel, screen reader và tương phản trong trình duyệt tích hợp.
- [ ] Kiểm tra reduced-motion và kích thước vùng chạm.
- **Nghiệm thu:** các thao tác chính dùng được bằng chuột, bàn phím và màn hình nhỏ.

### P9 — Kiểm thử tích hợp toàn bộ builder
- [ ] Chạy test registry 31 block và toàn bộ unit tests.
- [ ] Kiểm thử nhóm block có form, accordion, slider/carousel, gallery và tương tác.
- [ ] Kiểm thử chuyển template liên tiếp, template rỗng, save/reload và preview/export.
- [ ] Kiểm tra console/browser errors và các trạng thái loading/error/unsaved.
- **Nghiệm thu:** không có lỗi hồi quy đã biết; lỗi còn lại được ghi rõ và phân mức độ.

### P10 — Rà soát chất lượng, bảo mật và hiệu năng
- [ ] Rà soát xử lý HTML/script/URL, tránh đưa nội dung không tin cậy vào ngữ cảnh thực thi.
- [ ] Kiểm tra tài nguyên/listener được dọn khi đổi template và khi component unmount.
- [x] Tắt mặc định lớp chẩn đoán canvas/CSS chạy liên tục; chỉ bật khi thêm `?wb_debug=1`. Khi debug tắt, bỏ qua snapshot iframe và gắn observer vòng đời để tránh log/chi phí xử lý không cần thiết.
- [x] Chặn riêng `wbDebugWarn`/`wbDebugError` khi chế độ debug tắt để không phát sinh log mang tiền tố `[WB-DEBUG]` ngoài ý muốn.
- [ ] Kiểm tra hiệu năng với trang lớn và nhiều block; tránh watcher/render không cần thiết.
- [ ] Chỉ tối ưu sau khi có bằng chứng đo hoặc lỗi tái hiện.
- **Nghiệm thu:** không có rủi ro nghiêm trọng chưa xử lý; không đánh đổi tương thích để lấy tối ưu nhỏ.

### P11 — Hoàn thiện tài liệu và phát hành
- [ ] Cập nhật hướng dẫn sử dụng builder, placeholder, save/load/export và các giới hạn đã biết.
- [ ] Chạy lại bộ kiểm tra sau commit cuối.
- [ ] Rà soát diff, commit, PR description, checklist và kết quả CI.
- [ ] Chỉ merge khi kiểm tra đạt và PR không chứa thay đổi ngoài phạm vi.
- **Nghiệm thu cuối:** roadmap phản ánh đúng trạng thái, kiểm tra có bằng chứng, không còn blocker nghiêm trọng.


### Nhật ký thực hiện tuần tự
- 2026-10-12 — P10: rà soát tĩnh phát hiện lớp chẩn đoán canvas/CSS luôn bật, có thể ghi log liên tục và chạy snapshot iframe lặp lại trong trải nghiệm thông thường. Đã chuyển sang opt-in qua `?wb_debug=1` và bỏ qua snapshot/observer khi debug tắt. Chưa chạy build/test hoặc đo hiệu năng trong host project.
- 2026-10-12 — P10: kiểm tra tiếp phát hiện hai wrapper cảnh báo/lỗi debug vẫn gọi `console.warn`/`console.error` khi debug tắt. Đã thêm guard cho cả hai wrapper để instrumentation debug không phát log riêng khi chưa bật `?wb_debug=1`. Đây là rà soát tĩnh; chưa chạy build/test.
- 2026-10-12 — P0: đã đối chiếu cây repository, PR #2 và trạng thái so sánh với main. Phát hiện repo không chứa package.json/lockfile/test runner/CI workflow; cần chạy kiểm tra trong host project đang sử dụng component.
- 2026-10-12 — P1: rà soát tĩnh test/helper, phát hiện tìm kiếm component không chuẩn hóa ký tự đ/Đ. Đã sửa utils/element-search.ts và thêm test cho “Đăng ký”/“địa điểm”.
- 2026-10-12 — P1: tiếp tục cải thiện tìm kiếm dễ dùng hơn: chuẩn hóa khoảng trắng liên tiếp và thêm test hồi quy cho truy vấn có nhiều khoảng trắng/xuống dòng. Chưa chạy test/build: repository không có package.json, lockfile, test runner config hoặc GitHub Actions workflow; cần môi trường host tích hợp component để xác minh.
- 2026-10-12 — P7: chuyển nhóm Nâng cao (ID Element, CSS Classes, Breakpoint) xuống cuối tab Cài đặt, sau các nhóm theo loại phần tử (ảnh, video, nút, HTML, navbar, hero, slider, gallery, accordion, form). Không đổi handler `applyAdvancedId` / `applyAdvancedClass` / `applyResponsive` và không xóa trường. Chưa chạy browser test.
- 2026-10-12 — P7: xác nhận tĩnh điều kiện `v-if` của mọi nhóm Cài đặt theo loại phần tử + matchesSearch; đánh dấu hoàn thành mục ẩn nhóm theo ngữ cảnh và mục xóa điều khiển trùng (Sự kiện đã chuyển sang tab Tương tác). Chưa chạy browser test.

- 2026-10-12 — Sửa khung popup Cài đặt & SEO trực tiếp trên main: chuyển dialog ra `body` bằng Vue `Teleport` để tránh bị cắt bởi vùng chứa/stacking context; bổ sung CSS scoped ngay trong `PageSeoDialog.vue` vì style ở component cha không định dạng đầy đủ các phần tử nội bộ của dialog con. Khung popup có chiều rộng tối đa 920px, cuộn nội dung độc lập và bố cục responsive.
- 2026-10-12 — Mở rộng sidebar thuộc tính trên main: 400px desktop, 360px màn hình nhỏ, mobile overlay tối đa 360px theo viewport; không đổi API hay logic chỉnh sửa. Chưa chạy build/test/browser vì repository chưa có package.json/test runner độc lập.


## P tiếp theo — Làm rõ trải nghiệm “Các key động cho sự kiện” (2026-10-12)
- [x] Đưa hộp thoại key động ra khỏi stacking/overflow context bằng Vue Teleport.
- [x] Tổ chức lại nội dung theo nhóm, có bộ lọc nhanh và tìm kiếm.
- [x] Mỗi key hiển thị phạm vi sử dụng, mô tả, ví dụ và nút sao chép riêng.
- [x] Bổ sung trạng thái không có kết quả, số lượng key và bố cục responsive cho màn hình nhỏ.
- [ ] Kiểm thử tương tác trực tiếp trong ứng dụng host; repository này chưa được xác nhận có thể chạy độc lập.

- [x] Đưa nút **Key sự kiện** lên topbar chính, có icon key và nhãn rõ ràng; mở đúng hộp thoại key động khi nhấn.

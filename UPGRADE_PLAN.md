# WebsiteBuilder Block Upgrade Plan

## Ngày: 2026-09-19

---

## 1. MA TRẬN PHÂN TÍCH: Keys vs HTML Coverage

### Nguồn dữ liệu
- **types/blocks.ts** — Định nghĩa tất cả keys (Base/Landing/Event)
- **landing-page-blocks.ts** — Plugin GrapesJS thực tế (18 blocks có HTML)
- **blocks/landing/*.block.ts** — Dead code (9 blocks, không ai import)
- **blocks-spec.json** — Chỉ có 10 base blocks (spec metadata, không có HTML)

### Blocks ĐANG CÓ HTML (trong `landing-page-blocks.ts` — production)

| # | Block ID (bm.add)              | Label                  | Có HTML | Trạng thái  |
|---|-------------------------------|------------------------|---------|-------------|
| 1 | `landing-header`              | Header (Sticky)        | ✅      | OK          |
| 2 | `landing-hero`                | Hero Banner            | ✅      | OK          |
| 3 | `landing-features`            | Features Grid          | ✅      | OK          |
| 4 | `landing-content-right`       | Content (Img Right)    | ✅      | OK          |
| 5 | `landing-footer`              | Footer                 | ✅      | OK          |
| 6 | `landing-event-hero`          | Event Hero             | ✅      | OK          |
| 7 | `landing-event-speakers`      | Event Speakers         | ✅      | OK          |
| 8 | `landing-event-agenda`        | Event Agenda           | ✅      | OK          |
| 9 | `landing-event-pricing`       | Event Pricing          | ✅      | OK          |
|10 | `landing-event-hero-countdown`| Event Hero + Countdown | ✅      | OK          |
|11 | `landing-event-sponsors`      | Event Sponsors         | ✅      | OK          |
|12 | `landing-event-contact`       | Event Contact          | ✅      | OK          |
|13 | `landing-event-faq`           | Event FAQ              | ✅      | OK          |
|14 | `landing-event-benefits`      | Event Benefits         | ✅      | OK          |
|15 | `landing-event-audience`      | Event Audience         | ✅      | OK          |
|16 | `landing-event-topics`        | Event Key Topics       | ✅      | OK          |
|17 | `landing-event-stats`         | Event Stats            | ✅      | OK          |
|18 | `landing-event-gallery`       | Event Gallery          | ✅      | OK          |

### Keys THIẾU HTML (định nghĩa trong types nhưng KHÔNG có block thực tế)

| # | Key (types/blocks.ts)  | Category | Có HTML | Cần build |
|---|------------------------|----------|---------|-----------|
| 1 | `landing:testimonials` | Landing  | ❌      | ✅ BUILD  |
| 2 | `landing:content-left` | Landing  | ❌      | ✅ BUILD  |
| 3 | `landing:speakers`     | Landing  | ❌      | ✅ BUILD  |
| 4 | `landing:sponsors`     | Landing  | ❌      | ✅ BUILD  |
| 5 | `landing:contact`      | Landing  | ❌      | ✅ BUILD  |
| 6 | `landing:faq`          | Landing  | ❌      | ✅ BUILD  |
| 7 | `landing:benefits`     | Landing  | ❌      | ✅ BUILD  |
| 8 | `landing:audience`     | Landing  | ❌      | ✅ BUILD  |
| 9 | `landing:topics`       | Landing  | ❌      | ✅ BUILD  |
|10 | `landing:stats`        | Landing  | ❌      | ✅ BUILD  |
|11 | `landing:gallery`      | Landing  | ❌      | ✅ BUILD  |
|12 | `landing:team`         | Landing  | ❌      | ✅ BUILD  |
|13 | `landing:partners`     | Landing  | ❌      | ✅ BUILD  |
|14 | `event:hero`           | Event    | ❌*     | ⚠️ MAP    |
|15 | `event:speakers`       | Event    | ❌*     | ⚠️ MAP    |
|16 | `event:agenda`         | Event    | ❌*     | ⚠️ MAP    |
|17 | `event:pricing`        | Event    | ❌*     | ⚠️ MAP    |
|18 | `event:countdown`      | Event    | ❌*     | ⚠️ MAP    |
|19 | `event:faq`            | Event    | ❌*     | ⚠️ MAP    |
|20 | `event:contact`        | Event    | ❌*     | ⚠️ MAP    |
|21 | `event:gallery`        | Event    | ❌*     | ⚠️ MAP    |

> *Event blocks có HTML nhưng đăng ký dưới tên `landing-event-*`, không map đúng key `event:*`

### Base Blocks (trong blocks-spec.json — chỉ có metadata, không có HTML content)

| # | Key                | Có spec | Có HTML | Note                              |
|---|--------------------|---------|---------|------------------------------------|
| 1 | `base:container`   | ✅      | ❌      | GrapesJS built-in, không cần HTML  |
| 2 | `base:heading`     | ✅      | ❌      | GrapesJS built-in                  |
| 3 | `base:paragraph`   | ✅      | ❌      | GrapesJS built-in                  |
| 4 | `base:image`       | ✅      | ❌      | GrapesJS built-in                  |
| 5 | `base:video`       | ✅      | ❌      | GrapesJS built-in                  |
| 6 | `base:grid`        | ✅      | ❌      | GrapesJS built-in                  |
| 7 | `base:button`      | ✅      | ❌      | GrapesJS built-in                  |
| 8 | `base:divider`     | ✅      | ❌      | GrapesJS built-in                  |
| 9 | `base:spacer`      | ✅      | ❌      | GrapesJS built-in                  |
|10 | `base:html`        | ✅      | ❌      | GrapesJS built-in                  |

> Base blocks dùng GrapesJS built-in (`grapesjs-blocks-basic`), không cần custom HTML.

---

## 2. DEAD CODE CẦN XÓA

| File/Folder                                     | Lý do xóa                              |
|--------------------------------------------------|-----------------------------------------|
| `blocks/landing/*.block.ts` (9 files)            | Dead code — không ai import vào production |
| `blocks/landing/index.ts`                        | Dead code — chỉ BlockSidebar dùng (dead) |
| `blocks/index.ts`                                | Dead code                                |
| `components/BlockSidebar.vue`                    | Dead code — không import ở đâu          |
| `components/BlockPropertyPanel.vue`              | Dead code — không import ở đâu          |
| `components/index.ts`                            | Dead code                                |
| `components/canvas/` (empty)                     | Empty folder                             |
| `components/properties/` (empty)                 | Empty folder                             |
| `components/sidebar/` (empty)                    | Empty folder                             |
| `components/toolbar/` (empty)                    | Empty folder                             |
| `stores/websiteStore.ts`                         | Dead code — không import ở đâu          |
| `types/blocks.ts`                                | Dead code — chỉ blocks/landing dùng     |
| `WebsiteBuilder.vue.orig`                        | Backup file — không cần                 |
| `modules/` (if empty)                            | Check & xóa nếu empty                   |

---

## 3. KẾ HOẠCH BUILD 3 BƯỚC

### Bước 1: PLAN — Thiết kế blocks mới (13 Landing + 8 Event mapping)

**Mục tiêu:** Thiết kế HTML template cho 13 landing blocks thiếu + map 8 event keys.

**Landing blocks cần build:**
1. `landing-testimonials` — Đánh giá khách hàng (carousel/grid cards)
2. `landing-content-left` — Content với ảnh bên trái (mirror của content-right)
3. `landing-speakers` — Landing speakers (generic, không phải event-specific)
4. `landing-sponsors` — Landing sponsors/partners logos grid
5. `landing-contact` — Contact form section
6. `landing-faq` — FAQ accordion
7. `landing-benefits` — Lợi ích (icon + text grid)
8. `landing-team` — Team members grid
9. `landing-partners` — Partners/đối tác logo grid  
10. `landing-audience` — Đối tượng tham dự
11. `landing-topics` — Chủ đề/nội dung chính
12. `landing-stats` — Số liệu thống kê
13. `landing-gallery` — Gallery ảnh/video

**Event keys mapping (đã có HTML, cần alias):**
- `event:hero` → alias `landing-event-hero`
- `event:speakers` → alias `landing-event-speakers`
- `event:agenda` → alias `landing-event-agenda`  
- `event:pricing` → alias `landing-event-pricing`
- `event:countdown` → alias `landing-event-hero-countdown`
- `event:faq` → alias `landing-event-faq`
- `event:contact` → alias `landing-event-contact`
- `event:gallery` → alias `landing-event-gallery`

**Quy tắc thiết kế HTML:**
- Responsive (mobile-first)
- Inline styles (cho GrapesJS compatibility)
- Dark & light theme support
- Placeholder keys: `[ev_name]`, `[ev_location]`, `[ev_description]`, `[ev_order_url]`, `[company_name]`
- Scoped `<style>` cho hover/responsive

### Bước 2: BUILD — Implement vào `landing-page-blocks.ts`

**Mục tiêu:** Thêm 13 block mới vào `landing-page-blocks.ts` bằng `bm.add()`.

**Thứ tự build (ưu tiên theo tần suất sử dụng):**

| Batch | Blocks                                                    | Lý do ưu tiên           |
|-------|-----------------------------------------------------------|--------------------------|
| A     | testimonials, content-left, faq                           | Phổ biến nhất            |
| B     | team, contact, partners                                   | Thường có trong landing  |
| C     | speakers, sponsors, benefits                              | Mở rộng nội dung         |
| D     | audience, topics, stats, gallery                          | Bổ sung thêm             |

**Mỗi block cần:**
1. `bm.add("landing-{name}", { label, category, media (SVG icon), content (HTML) })`
2. HTML template với inline styles
3. `<style>` block cho hover/responsive
4. Test drag-drop vào canvas

### Bước 3: TEST — Kiểm thử từng block

**Checklist cho mỗi block:**
- [ ] Block xuất hiện trong sidebar BlockManager  
- [ ] Drag-drop vào canvas thành công
- [ ] Render đúng trên canvas (WYSIWYG)
- [ ] Preview iframe render đúng
- [ ] Export HTML hoàn chỉnh (inline CSS)
- [ ] Responsive: mobile/tablet/desktop
- [ ] Placeholder keys được thay thế đúng khi có event context
- [ ] Không conflict với blocks hiện tại

**Cách test:**
```bash
cd client && npm run dev
# Mở WebsiteBuilder, kiểm tra sidebar
# Kéo từng block vào canvas  
# Bấm Preview, kiểm tra render
# Bấm Export, kiểm tra HTML output
```

**Sau khi test xong:**
- [ ] `npm run build` — build thành công
- [ ] Không có TypeScript errors
- [ ] Không có console errors

---

## 4. TIMELINE

| Phase    | Task                          | Estimate  |
|----------|-------------------------------|-----------|
| Phase 1  | Xóa dead code                 | 10 phút   |
| Phase 2  | Plan 13 block HTML templates  | 30 phút   |
| Phase 3  | Build Batch A (3 blocks)      | 20 phút   |
| Phase 4  | Test Batch A                  | 10 phút   |
| Phase 5  | Build Batch B (3 blocks)      | 20 phút   |
| Phase 6  | Test Batch B                  | 10 phút   |
| Phase 7  | Build Batch C (3 blocks)      | 20 phút   |
| Phase 8  | Test Batch C                  | 10 phút   |
| Phase 9  | Build Batch D (4 blocks)      | 25 phút   |
| Phase 10 | Test Batch D + Event mapping  | 15 phút   |
| Phase 11 | Final integration test        | 15 phút   |


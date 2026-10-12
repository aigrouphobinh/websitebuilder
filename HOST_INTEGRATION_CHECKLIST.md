# WebsiteBuilder — Host integration acceptance checklist

> Repository note: this repository currently contains source files and unit-test source, but no `package.json`, lockfile, test-runner configuration, or CI workflow. Run these checks in the host application that imports `WebsiteBuilder.vue`; do not infer a successful build from static inspection.

## 1. Record the real host environment

- [ ] Record host repository, branch, commit SHA, Node.js version, package manager, and framework version.
- [ ] Confirm the host imports this exact `WebsiteBuilder.vue` revision and the matching `utils/` files.
- [ ] Use the host's existing scripts; do not add a guessed package manifest to this source-only repository.
- [ ] Capture exact commands and results below.

## 2. Automated checks

- [ ] Run the host's unit-test command, including `element-search`, `model-html-sync`, `html-with-css`, `event-placeholders`, `escape-html-attribute`, and registry tests.
- [ ] Run the host's type-check command, if configured.
- [ ] Run the host's production build.
- [ ] Run lint/static analysis, if configured.
- [ ] Record failures without marking the phase complete until fixed or explicitly triaged.

## 3. Inspector search and tab behavior

- [ ] Search with Vietnamese diacritics and without them: `khoảng cách` / `khoang cach`, `địa điểm` / `dia diem`, `đăng ký` / `dang ky`.
- [ ] Search repeated spaces and pasted multi-line terms; clear the query and confirm all applicable settings return.
- [ ] Repeat searches in **Kiểu dáng**, **Cài đặt**, and **Tương tác**; verify empty states and that unrelated groups remain hidden only by design.
- [ ] Confirm advanced ID/class/breakpoint controls remain available to the intended super-admin role.
- [ ] Select text, image, video, button/link, HTML, navbar, hero, slider, gallery, accordion, and form elements; verify the correct groups and actions appear.

## 4. Keyboard and accessibility

- [ ] Navigate tabs with Left/Right, Home, and End; verify focus and selected tab remain synchronized.
- [ ] Use Tab/Shift+Tab through search, clear-search, settings, and close/toggle controls.
- [ ] Verify Escape clears a non-empty search first; with an empty search it closes the inspector and restores focus appropriately.
- [ ] Verify visible focus indicators, accessible names, tab/tabpanel relationships, and polite announcements for no-results states.
- [ ] Test browser zoom at 200%, keyboard-only use, and a screen reader available in the host environment.
- [ ] Enable reduced motion and confirm animations/transitions are reduced.

## 5. Responsive and visual checks

- [ ] Test viewport widths 1440px, 1024px, 768px, 390px, and 320px.
- [ ] Confirm inspector can be opened again after closing, and does not cover essential canvas/toolbar controls.
- [ ] Confirm tab labels, field labels, dropdowns, clear-search, close buttons, and group content are not clipped or horizontally overflowing.
- [ ] Confirm touch targets remain usable on mobile and no resize unexpectedly steals focus.
- [ ] Inspect computed styles for host CSS overrides and check the browser console for errors/warnings.

## 6. Builder regression / data integrity

- [ ] Drag, insert by click, select, move, duplicate, and delete blocks from the 31-block registry.
- [ ] Edit text, styles, image/video URLs, links, forms, and interaction settings; confirm changes are reflected in the canvas.
- [ ] Save and reload; verify `projectData`, HTML, CSS, head CSS/links, scripts, class/id/data-* attributes, and empty-template behavior.
- [ ] Verify `[ev_name]`, `[ev_location]`, `[ev_description]`, `[ev_order_url]`, and `[company_name]` survive save and are replaced only when real event context is supplied.
- [ ] Preview/export with scripts enabled and disabled; verify required scripts remain and scripts are not unexpectedly executed during editing.
- [ ] Switch templates repeatedly and inspect stale CSS/assets, duplicate listeners, and console errors.

## Results log

| Check | Environment / command | Result | Evidence / issue |
|---|---|---|---|
| Unit tests | | Not run | |
| Type-check | | Not run | |
| Production build | | Not run | |
| Lint | | Not run | |
| Browser / responsive | | Not run | |
| Save-load-preview-export | | Not run | |

## Exit criteria

Do not mark P1, P8, or P9 as fully accepted until the relevant host commands and browser checks have actually run. Keep the pull request in draft while any blocking check is unavailable or failing.
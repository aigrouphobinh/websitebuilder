<template>
  <div
    ref="rootEl"
    class="website-builder"
    :class="{ 'in-layout': isSuperAdminPerm && !isEmbed }"
  >
    <div class="topbar topbar--figma">
      <div class="tb-left">
        <button
          class="tb-link mobile-only"
          type="button"
          :aria-label="sidebarOpen ? 'Đóng thanh thành phần' : 'Mở thanh thành phần'"
          :aria-expanded="sidebarOpen"
          @click="sidebarOpen = !sidebarOpen"
        >
          <IconMenu2 size="20" />
        </button>

        <div style="position: relative; z-index: 1000">
          <button
            class="tb-link"
            type="button"
            title="Trình đơn"
            aria-haspopup="true"
            :aria-expanded="showMenu"
            @click="showMenu = !showMenu"
          >
            <IconMenu2 size="18" />
            <span class="hide-sm">Trình đơn</span>
          </button>

          <div
            v-if="showMenu"
            style="
              position: absolute;
              top: 100%;
              left: 0;
              margin-top: 8px;
              background: white;
              border: 1px solid #e5e7eb;
              border-radius: 6px;
              box-shadow:
                0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -1px rgba(0, 0, 0, 0.06);
              min-width: 220px;
              padding: 4px 0;
              display: flex;
              flex-direction: column;
              overflow: hidden;
            "
          >
            <div
              class="menu-item"
              style="
                padding: 10px 16px;
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                transition: background 0.15s;
              "
              onmouseover="this.style.background='#f3f4f6'"
              onmouseout="this.style.background='transparent'"
              @click="
                goHome();
                showMenu = false;
              "
            >
              <IconHome size="16" color="#4b5563" />
              <span style="font-size: 14px; color: #374151">Trang chủ</span>
            </div>

            <div
              class="menu-item"
              style="
                padding: 10px 16px;
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                transition: background 0.15s;
              "
              onmouseover="this.style.background='#f3f4f6'"
              onmouseout="this.style.background='transparent'"
              @click="
                openSuperTemplatePicker();
                showMenu = false;
              "
            >
              <IconLayout2 size="16" color="#4b5563" />
              <span style="font-size: 14px; color: #374151">Chọn template</span>
            </div>

            <div
              class="menu-item"
              style="
                padding: 10px 16px;
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                transition: background 0.15s;
              "
              onmouseover="this.style.background='#f3f4f6'"
              onmouseout="this.style.background='transparent'"
              @click="
                showPageDialog = true;
                showMenu = false;
              "
            >
              <IconDatabase size="16" color="#4b5563" />
              <span style="font-size: 14px; color: #374151">Cài đặt & SEO</span>
            </div>

            <div
              v-if="isSuperAdminPerm"
              class="menu-item"
              style="
                padding: 10px 16px;
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                transition: background 0.15s;
              "
              onmouseover="this.style.background='#f3f4f6'"
              onmouseout="this.style.background='transparent'"
              @click="
                showImportDialog = true;
                showMenu = false;
              "
            >
              <IconUpload size="16" color="#4b5563" />
              <span style="font-size: 14px; color: #374151"
                >Nhập Website</span
              >
            </div>

            <div
              class="menu-item"
              style="
                padding: 10px 16px;
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                transition: background 0.15s;
              "
              onmouseover="this.style.background='#f3f4f6'"
              onmouseout="this.style.background='transparent'"
              @click="
                showHelpDialog = true;
                showMenu = false;
              "
            >
              <IconAlertCircle size="16" color="#4b5563" />
              <span style="font-size: 14px; color: #374151">Hướng dẫn</span>
            </div>

            <div
              v-if="isSuperAdmin"
              class="menu-item"
              style="
                padding: 10px 16px;
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                transition: background 0.15s;
              "
              onmouseover="this.style.background='#f3f4f6'"
              onmouseout="this.style.background='transparent'"
              @click="
                openSaveSuperDialog();
                showMenu = false;
              "
            >
              <IconTemplate size="16" color="#4b5563" />
              <span style="font-size: 14px; color: #374151">Lưu Mẫu</span>
            </div>

            <div
              v-if="isSuperAdminPerm"
              class="menu-item"
              style="
                padding: 10px 16px;
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                transition: background 0.15s;
              "
              onmouseover="this.style.background='#f3f4f6'"
              onmouseout="this.style.background='transparent'"
              @click="
                toggleCompanyExportMode();
                showMenu = false;
              "
            >
              <IconCode size="16" color="#4b5563" />
              <span style="font-size: 14px; color: #374151">
                CSS:
                {{ companyExportMode === "linked" ? "Liên kết" : "Nội tuyến" }}
              </span>
            </div>
          </div>
        </div>

        <!-- Backdrop for menu -->
        <div
          v-if="showMenu"
          style="position: fixed; inset: 0; z-index: 999"
          @click="showMenu = false"
        ></div>

        <div
          class="divider-vertical hide-sm"
          style="width: 1px; height: 16px; background: #e2e8f0; margin: 0 4px"
        ></div>
        <button
          class="tb-link hide-sm"
          type="button"
          title="Hoàn tác"
          aria-label="Hoàn tác"
          @click="_undo"
        >
          <IconArrowBackUp size="16" />
        </button>
        <button
          class="tb-link hide-sm"
          type="button"
          title="Làm lại"
          aria-label="Làm lại"
          @click="_redo"
        >
          <IconArrowForwardUp size="16" />
        </button>
      </div>
      <div class="tb-center">
        <div class="device-group">
          <button
            type="button"
            class="device-btn"
            :class="{ active: currentDevice === 'desktop' }"
            title="Máy tính bàn"
            aria-label="Xem ở kích thước máy tính"
            :aria-pressed="currentDevice === 'desktop'"
            @click="setDevice('desktop')"
          >
            <IconDeviceDesktop size="18" />
          </button>
          <button
            type="button"
            class="device-btn"
            :class="{ active: currentDevice === 'tablet' }"
            title="Máy tính bảng"
            aria-label="Xem ở kích thước máy tính bảng"
            :aria-pressed="currentDevice === 'tablet'"
            @click="setDevice('tablet')"
          >
            <IconDeviceTablet size="18" />
          </button>
          <button
            type="button"
            class="device-btn"
            :class="{ active: currentDevice === 'mobile' }"
            title="Điện thoại"
            aria-label="Xem ở kích thước điện thoại"
            :aria-pressed="currentDevice === 'mobile'"
            @click="setDevice('mobile')"
          >
            <IconDeviceMobile size="18" />
          </button>
        </div>
        <span class="device-width hide-sm">{{ deviceWidthLabel }}</span>
      </div>
      <div class="tb-right">
        <button
          v-if="isSmallScreen"
          class="tb-link"
          type="button"
          :class="{ active: showProperties }"
          :aria-label="showProperties ? 'Ẩn bảng thuộc tính' : 'Hiện bảng thuộc tính'"
          :aria-expanded="showProperties"
          @click="showProperties = !showProperties"
        >
          <IconSettings size="20" />
        </button>

        <button
          class="tb-link"
          type="button"
          :title="showPreview ? 'Chỉnh sửa' : 'Xem trước'"
          @click="togglePreview"
        >
          <IconEyeOff v-if="showPreview" size="18" />
          <IconEye v-else size="18" />
          <span class="hide-sm">{{
            showPreview ? "Chỉnh sửa" : "Xem trước"
          }}</span>
        </button>

        <button
          v-if="isSuperAdmin && !isEmbed && isHomepageMode"
          class="tb-link"
          type="button"
          :disabled="isSaving"
          title="Khôi phục bản gốc"
          aria-label="Khôi phục bản gốc trang chủ"
          @click="resetHomepageTemplate"
        >
          <IconHistory size="16" />
          <span class="hide-sm">Khôi phục gốc</span>
        </button>

        <button
          v-if="isSuperAdmin && !isEmbed && isHomepageMode"
          class="tb-link primary-action"
          type="button"
          :title="isSaving ? 'Đang lưu...' : 'Lưu & Xuất bản Homepage'"
          :aria-label="isSaving ? 'Đang lưu trang chủ' : 'Lưu và xuất bản trang chủ'"
          :aria-busy="isSaving"
          :disabled="isSaving"
          @click="saveHomepageTemplate"
        >
          <IconLoader2 v-if="isSaving" class="animate-spin" size="16" />
          <IconDeviceFloppy v-else size="16" />
          <span class="hide-sm">{{
            isSaving ? "Đang lưu..." : "Lưu & Xuất bản"
          }}</span>
        </button>

        <button
          v-if="isSuperAdmin && !isEmbed && !isHomepageMode"
          class="tb-link primary-action"
          type="button"
          title="Lưu làm Mẫu Hệ thống"
          aria-label="Lưu mẫu hệ thống"
          @click="openSaveSuperDialog"
        >
          <IconTemplate size="16" />
          <span class="hide-sm">Lưu Mẫu</span>
        </button>

        <button
          v-if="!isSuperAdmin || isEmbed"
          class="tb-link primary-action"
          type="button"
          :title="isSaving ? 'Đang lưu...' : 'Lưu & Xuất bản'"
          :aria-label="isSaving ? 'Đang lưu website' : 'Lưu và xuất bản website'"
          :aria-busy="isSaving"
          :disabled="isSaving"
          @click="saveCompanyTemplate"
        >
          <IconLoader2 v-if="isSaving" class="animate-spin" size="16" />
          <IconDeviceFloppy v-else size="16" />
          <span class="hide-sm">{{
            isSaving ? "Đang lưu..." : "Lưu & Xuất bản"
          }}</span>
        </button>
      </div>
    </div>
    <div class="layout" :style="layoutStyle" :class="{ 'is-mobile': isMobile }">
      <aside class="sidebar" :class="{ collapsed: !sidebarOpen }">
        <div class="sb-header">
          <div class="sb-title">Thêm mới</div>
          <button
            class="sb-help"
            type="button"
            aria-label="Trợ giúp"
            @click="showPlaceholderHelpDialog = true"
          >
            <IconHelpCircle size="16" />
          </button>
          <button
            class="sb-toggle"
            type="button"
            :aria-expanded="sidebarOpen"
            @click="sidebarOpen = !sidebarOpen"
          >
            <IconMinus size="16" />
          </button>
        </div>
        <div class="sb-tabs">
          <button
            class="sb-tab"
            :class="{ 'sb-tab--active': sbActiveTab === 'elements' }"
            type="button"
            @click="sbActiveTab = 'elements'"
          >
            Thành phần
          </button>
          <button
            class="sb-tab"
            :class="{ 'sb-tab--active': sbActiveTab === 'layouts' }"
            type="button"
            @click="sbActiveTab = 'layouts'"
          >
            Bố cục
          </button>
        </div>
        <div v-show="sbActiveTab === 'elements'" class="sb-search">
          <input
            v-model="elementQuery"
            class="sb-search-input"
            type="text"
            placeholder="Tìm kiếm thành phần..."
            aria-label="Tìm kiếm thành phần"
            @keydown.esc="elementQuery = ''"
          />

          <button
            v-if="elementQuery"
            class="sb-search-clear"
            type="button"
            aria-label="Xóa tìm kiếm thành phần"
            title="Xóa tìm kiếm"
            @click="elementQuery = ''"
          >×</button>
          <IconSearch v-else size="16" class="sb-search-icon" />
        </div>
        <div
          v-if="elementQuery.trim()"
          class="sb-search-feedback"
          role="status"
          aria-live="polite"
        >
          <template v-if="matchingElementCount">
            Có {{ matchingElementCount }} thành phần phù hợp
          </template>
          <template v-else>
            Không tìm thấy thành phần. Thử từ khóa khác hoặc xóa tìm kiếm.
          </template>
        </div>

        <div v-show="sbActiveTab === 'elements'">
          <section class="sb-group">
            <header class="sb-group-header">
              <div class="sb-group-title">Landing Page</div>
              <button
                class="sb-collapse"
                type="button"
                :aria-expanded="!collapseLandingPage"
                @click="collapseLandingPage = !collapseLandingPage"
              >
                <IconChevronDown v-if="!collapseLandingPage" size="16" />
                <IconChevronRight v-else size="16" />
              </button>
            </header>
            <transition name="sb-slide">
              <div v-show="!collapseLandingPage" class="sb-grid">
                <button
                  class="sb-item"
                  type="button"
                  style="cursor: pointer; position: relative; z-index: 10"
                  @click.stop.prevent="openBannerTemplateDialog"
                  @mousedown.stop
                >
                  <IconPresentation size="24" /><span>Phần đầu trang</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-event-hero')"
                  @click="addFromBlockManager('landing-event-hero')"
                >
                  <IconPresentation size="24" /><span>Sự kiện - Phần đầu</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-event-hero-countdown')"
                  @click="addFromBlockManager('landing-event-hero-countdown')"
                >
                  <IconPresentation size="24" /><span>Phần đầu + Đếm ngược</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-features')"
                  @click="addFromBlockManager('landing-features')"
                >
                  <IconLayoutColumns size="24" /><span>Lưới tính năng</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-content-right')"
                  @click="addFromBlockManager('landing-content-right')"
                >
                  <IconColumns size="24" /><span>Nội dung (Phải)</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-event-speakers')"
                  @click="addFromBlockManager('landing-event-speakers')"
                >
                  <IconCards size="24" /><span>Diễn giả sự kiện</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-event-benefits')"
                  @click="addFromBlockManager('landing-event-benefits')"
                >
                  <IconCheck size="24" /><span>Lợi ích sự kiện</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-event-audience')"
                  @click="addFromBlockManager('landing-event-audience')"
                >
                  <IconLayout2 size="24" /><span>Đối tượng sự kiện</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-event-agenda')"
                  @click="addFromBlockManager('landing-event-agenda')"
                >
                  <IconCalendarEvent size="24" /><span>Chương trình sự kiện</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-event-topics')"
                  @click="addFromBlockManager('landing-event-topics')"
                >
                  <IconListDetails size="24" /><span>Chủ đề chính sự kiện</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-event-pricing')"
                  @click="addFromBlockManager('landing-event-pricing')"
                >
                  <IconTicket size="24" /><span>Giá vé sự kiện</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-event-sponsors')"
                  @click="addFromBlockManager('landing-event-sponsors')"
                >
                  <IconWindow size="24" /><span>Nhà tài trợ</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-event-stats')"
                  @click="addFromBlockManager('landing-event-stats')"
                >
                  <IconTable size="24" /><span>Thống kê sự kiện</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-footer')"
                  @click="addFromBlockManager('landing-footer')"
                >
                  <IconLayoutNavbar size="24" /><span>Chân trang</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-event-gallery')"
                  @click="addFromBlockManager('landing-event-gallery')"
                >
                  <IconPhoto size="24" /><span>Thư viện sự kiện</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-event-faq')"
                  @click="addFromBlockManager('landing-event-faq')"
                >
                  <IconHelpCircle size="24" /><span>Câu hỏi thường gặp</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-event-contact')"
                  @click="addFromBlockManager('landing-event-contact')"
                >
                  <IconDeviceMobile size="24" /><span>Liên hệ</span>
                </button>

                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-testimonials')"
                  @click="addFromBlockManager('landing-testimonials')"
                >
                  <IconMessageCircle size="24" /><span>Đánh giá</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-content-left')"
                  @click="addFromBlockManager('landing-content-left')"
                >
                  <IconColumns size="24" /><span>Nội dung (Trái)</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-faq')"
                  @click="addFromBlockManager('landing-faq')"
                >
                  <IconHelpCircle size="24" /><span>Câu hỏi thường gặp</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-team')"
                  @click="addFromBlockManager('landing-team')"
                >
                  <IconUsers size="24" /><span>Đội ngũ</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-contact')"
                  @click="addFromBlockManager('landing-contact')"
                >
                  <IconMail size="24" /><span>Liên hệ chung</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-partners')"
                  @click="addFromBlockManager('landing-partners')"
                >
                  <IconHeartHandshake size="24" /><span>Đối tác</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-speakers')"
                  @click="addFromBlockManager('landing-speakers')"
                >
                  <IconUsers size="24" /><span>Diễn giả</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-sponsors')"
                  @click="addFromBlockManager('landing-sponsors')"
                >
                  <IconWindow size="24" /><span>Nhà tài trợ</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-benefits')"
                  @click="addFromBlockManager('landing-benefits')"
                >
                  <IconGift size="24" /><span>Lợi ích</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-audience')"
                  @click="addFromBlockManager('landing-audience')"
                >
                  <IconUsers size="24" /><span>Đối tượng</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-topics')"
                  @click="addFromBlockManager('landing-topics')"
                >
                  <IconListDetails size="24" /><span>Chủ đề</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-stats')"
                  @click="addFromBlockManager('landing-stats')"
                >
                  <IconTable size="24" /><span>Thống kê</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-gallery')"
                  @click="addFromBlockManager('landing-gallery')"
                >
                  <IconPhoto size="24" /><span>Thư viện ảnh</span>
                </button>
              </div>
            </transition>
          </section>

          <section class="sb-group">
            <header class="sb-group-header">
              <div class="sb-group-title">Văn bản & Nút</div>
              <button
                class="sb-collapse"
                type="button"
                :aria-expanded="!collapseTypography"
                @click="collapseTypography = !collapseTypography"
              >
                <IconChevronDown v-if="!collapseTypography" size="16" />
                <IconChevronRight v-else size="16" />
              </button>
            </header>
            <transition name="sb-slide">
              <div v-show="!collapseTypography" class="sb-grid">
                <button
                  v-show="matchElement('Tiêu đề')"
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('heading')"
                  @click="addSpecBlock('heading')"
                >
                  <IconH1 size="24" /><span>Tiêu đề</span>
                </button>
                <button
                  v-show="matchElement('Đoạn văn')"
                  class="sb-item"
                  type="button"
                  @click="addSpecBlock('paragraph')"
                >
                  <IconTextSize size="24" /><span>Đoạn văn</span>
                </button>
                <button
                  v-show="matchElement('Văn bản phong phú')"
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('richtext')"
                  @click="addRichTextBlock"
                >
                  <IconTypography size="24" /><span>Văn bản phong phú</span>
                </button>
                <button
                  v-show="matchElement('Danh sách')"
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('list')"
                  @click="addListBlock"
                >
                  <IconListCheck size="24" /><span>Danh sách</span>
                </button>
                <button
                  v-show="matchElement('Liên kết')"
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('link')"
                  @click="addLinkBlock"
                >
                  <IconLink size="24" /><span>Liên kết</span>
                </button>
                <button
                  v-show="matchElement('Nút bấm')"
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('button')"
                  @click="addButtonBlock"
                >
                  <IconRectangle size="24" /><span>Nút bấm</span>
                </button>
                <button
                  v-show="matchElement('Nút Mua Vé')"
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('ticketing_button')"
                  @click="addTicketingButtonBlock"
                >
                  <IconTicket size="24" /><span>Nút Mua Vé</span>
                </button>

                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-testimonials')"
                  @click="addFromBlockManager('landing-testimonials')"
                >
                  <IconMessageCircle size="24" /><span>Đánh giá</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-content-left')"
                  @click="addFromBlockManager('landing-content-left')"
                >
                  <IconColumns size="24" /><span>Nội dung (Trái)</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-faq')"
                  @click="addFromBlockManager('landing-faq')"
                >
                  <IconHelpCircle size="24" /><span>Câu hỏi thường gặp</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-team')"
                  @click="addFromBlockManager('landing-team')"
                >
                  <IconUsers size="24" /><span>Đội ngũ</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-contact')"
                  @click="addFromBlockManager('landing-contact')"
                >
                  <IconMail size="24" /><span>Liên hệ chung</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-partners')"
                  @click="addFromBlockManager('landing-partners')"
                >
                  <IconHeartHandshake size="24" /><span>Đối tác</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-speakers')"
                  @click="addFromBlockManager('landing-speakers')"
                >
                  <IconUsers size="24" /><span>Diễn giả</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-sponsors')"
                  @click="addFromBlockManager('landing-sponsors')"
                >
                  <IconWindow size="24" /><span>Nhà tài trợ</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-benefits')"
                  @click="addFromBlockManager('landing-benefits')"
                >
                  <IconGift size="24" /><span>Lợi ích</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-audience')"
                  @click="addFromBlockManager('landing-audience')"
                >
                  <IconUsers size="24" /><span>Đối tượng</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-topics')"
                  @click="addFromBlockManager('landing-topics')"
                >
                  <IconListDetails size="24" /><span>Chủ đề</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-stats')"
                  @click="addFromBlockManager('landing-stats')"
                >
                  <IconTable size="24" /><span>Thống kê</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-gallery')"
                  @click="addFromBlockManager('landing-gallery')"
                >
                  <IconPhoto size="24" /><span>Thư viện ảnh</span>
                </button>
              </div>
            </transition>
          </section>

          <section class="sb-group">
            <header class="sb-group-header">
              <div class="sb-group-title">Đa phương tiện</div>
              <button
                class="sb-collapse"
                type="button"
                :aria-expanded="!collapseMedia"
                @click="collapseMedia = !collapseMedia"
              >
                <IconChevronDown v-if="!collapseMedia" size="16" />
                <IconChevronRight v-else size="16" />
              </button>
            </header>
            <transition name="sb-slide">
              <div v-show="!collapseMedia" class="sb-grid">
                <button
                  v-show="matchElement('Hình ảnh')"
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('image')"
                  @click="addImageBlock"
                >
                  <IconPhoto size="24" /><span>Hình ảnh</span>
                </button>
                <button
                  v-show="matchElement('Ảnh nền')"
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('bgimage')"
                  @click="addBackgroundImageBlock"
                >
                  <IconWallpaper size="24" /><span>Ảnh nền</span>
                </button>
                <button
                  v-show="matchElement('Thư viện ảnh')"
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('gallery')"
                  @click="addGalleryBlock"
                >
                  <IconCards size="24" /><span>Thư viện ảnh</span>
                </button>
                <button
                  v-show="matchElement('Video')"
                  class="sb-item"
                  type="button"
                  @click="addSpecBlock('video')"
                >
                  <IconPlayerPlay size="24" /><span>Video</span>
                </button>
                <button
                  v-show="matchElement('Mã HTML')"
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('html')"
                  @click="addSpecBlock('html')"
                >
                  <IconCode size="24" /><span>Mã HTML</span>
                </button>
              </div>
            </transition>
          </section>
          <section class="sb-group">
            <header class="sb-group-header">
              <div class="sb-group-title">Bố cục & Form</div>
              <button
                class="sb-collapse"
                type="button"
                :aria-expanded="!collapseHtmlBlocks"
                @click="collapseHtmlBlocks = !collapseHtmlBlocks"
              >
                <IconChevronDown v-if="!collapseHtmlBlocks" size="16" />
                <IconChevronRight v-else size="16" />
              </button>
            </header>
            <transition name="sb-slide">
              <div v-show="!collapseHtmlBlocks" class="sb-grid">
                <button
                  v-show="matchElement('Khối chứa Container')"
                  class="sb-item"
                  type="button"
                  @click="addSpecBlock('container')"
                >
                  <IconBox size="24" /><span>Khối chứa</span>
                </button>
                <button
                  v-show="matchElement('Lưới 2 cột Grid')"
                  class="sb-item"
                  type="button"
                  @click="addSpecBlock('grid')"
                >
                  <IconLayoutColumns size="24" /><span>Lưới (2 cột)</span>
                </button>
                <button
                  v-show="matchElement('Lưới 3 cột Grid')"
                  class="sb-item"
                  type="button"
                  @click="addGrid3Block"
                >
                  <IconLayoutColumns size="24" /><span>Lưới (3 cột)</span>
                </button>
                <button
                  v-show="matchElement('Phần đầu trang Hero')"
                  class="sb-item"
                  type="button"
                  style="cursor: pointer"
                  @click.stop.prevent="openBannerTemplateDialog"
                >
                  <IconPresentation size="24" /><span
                    >Phần đầu trang (Hero)</span
                  >
                </button>
                <button
                  v-show="matchElement('Bảng Table')"
                  class="sb-item"
                  type="button"
                  @click="addSpecBlock('table')"
                >
                  <IconTable size="24" /><span>Bảng</span>
                </button>
              
                <button
                  v-show="matchElement('Phần Section')"
                  class="sb-item"
                  type="button"
                  @click="addSectionBlock"
                >
                  <IconSection size="24" /><span>Phần (Section)</span>
                </button>
                <button
                  v-show="matchElement('Accordion')"
                  class="sb-item"
                  type="button"
                  @click="addAccordionBlock"
                >
                  <IconListDetails size="24" /><span>Accordion</span>
                </button>
               
                <button
                  v-show="matchElement('Khoảng đệm Spacer')"
                  class="sb-item"
                  type="button"
                  @click="addSpecBlock('spacing')"
                >
                  <IconSeparator size="24" /><span>Khoảng đệm</span>
                </button>

                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-testimonials')"
                  @click="addFromBlockManager('landing-testimonials')"
                >
                  <IconMessageCircle size="24" /><span>Đánh giá</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-content-left')"
                  @click="addFromBlockManager('landing-content-left')"
                >
                  <IconColumns size="24" /><span>Nội dung (Trái)</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-faq')"
                  @click="addFromBlockManager('landing-faq')"
                >
                  <IconHelpCircle size="24" /><span>Câu hỏi thường gặp</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-team')"
                  @click="addFromBlockManager('landing-team')"
                >
                  <IconUsers size="24" /><span>Đội ngũ</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-contact')"
                  @click="addFromBlockManager('landing-contact')"
                >
                  <IconMail size="24" /><span>Liên hệ chung</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-partners')"
                  @click="addFromBlockManager('landing-partners')"
                >
                  <IconHeartHandshake size="24" /><span>Đối tác</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-speakers')"
                  @click="addFromBlockManager('landing-speakers')"
                >
                  <IconUsers size="24" /><span>Diễn giả</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-sponsors')"
                  @click="addFromBlockManager('landing-sponsors')"
                >
                  <IconWindow size="24" /><span>Nhà tài trợ</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-benefits')"
                  @click="addFromBlockManager('landing-benefits')"
                >
                  <IconGift size="24" /><span>Lợi ích</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-audience')"
                  @click="addFromBlockManager('landing-audience')"
                >
                  <IconUsers size="24" /><span>Đối tượng</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-topics')"
                  @click="addFromBlockManager('landing-topics')"
                >
                  <IconListDetails size="24" /><span>Chủ đề</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-stats')"
                  @click="addFromBlockManager('landing-stats')"
                >
                  <IconTable size="24" /><span>Thống kê</span>
                </button>
                <button
                  class="sb-item"
                  type="button"
                  draggable="true"
                  @dragstart="onBlockDragStart('landing-gallery')"
                  @click="addFromBlockManager('landing-gallery')"
                >
                  <IconPhoto size="24" /><span>Thư viện ảnh</span>
                </button>
              </div>
            </transition>
          </section>

          <section class="sb-group">
            <header class="sb-group-header">
              <div class="sb-group-title">Doanh nghiệp</div>
              <button
                class="sb-collapse"
                type="button"
                :aria-expanded="!collapseCompany"
                @click="collapseCompany = !collapseCompany"
              >
                <IconChevronDown v-if="!collapseCompany" size="16" />
                <IconChevronRight v-else size="16" />
              </button>
            </header>
            <transition name="sb-slide">
              <div v-show="!collapseCompany" class="sb-grid">
                <button
                  class="sb-item"
                  type="button"
                  @click="addCompanyEventBlock"
                >
                  <IconCalendarEvent size="24" /><span>Sự kiện</span>
                </button>
                
                <button
                  class="sb-item"
                  type="button"
                  @click="addCountdownBlock"
                >
                  <IconCalendarEvent size="24" /><span>Đếm ngược</span>
                </button>
              </div>
            </transition>
          </section>
        </div>

        <div v-show="sbActiveTab === 'layouts'">
          <section class="sb-group">
            <header class="sb-group-header">
              <div class="sb-group-title">Cài đặt Header</div>
            </header>
            <div class="sb-grid">
              <button
                class="sb-item"
                type="button"
                @click="applyHeaderPreset('logo-left-menu-right')"
              >
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    width: 100%;
                  "
                >
                  <div
                    style="
                      display: flex;
                      width: 100%;
                      height: 24px;
                      background: #f3f4f6;
                      border: 1px solid #e5e7eb;
                      border-radius: 4px;
                      align-items: center;
                      padding: 0 4px;
                    "
                  >
                    <div
                      style="
                        width: 16px;
                        height: 8px;
                        background: #9ca3af;
                        border-radius: 2px;
                      "
                    ></div>
                    <div style="flex: 1"></div>
                    <div
                      style="
                        width: 32px;
                        height: 4px;
                        background: #d1d5db;
                        border-radius: 2px;
                      "
                    ></div>
                  </div>
                  <span>Logo Trái</span>
                </div>
              </button>
              <button
                class="sb-item"
                type="button"
                @click="applyHeaderPreset('logo-center-menu-left-right')"
              >
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    width: 100%;
                  "
                >
                  <div
                    style="
                      display: flex;
                      width: 100%;
                      height: 24px;
                      background: #f3f4f6;
                      border: 1px solid #e5e7eb;
                      border-radius: 4px;
                      align-items: center;
                      padding: 0 4px;
                    "
                  >
                    <div
                      style="
                        width: 24px;
                        height: 4px;
                        background: #d1d5db;
                        border-radius: 2px;
                      "
                    ></div>
                    <div
                      style="flex: 1; display: flex; justify-content: center"
                    >
                      <div
                        style="
                          width: 16px;
                          height: 8px;
                          background: #9ca3af;
                          border-radius: 2px;
                        "
                      ></div>
                    </div>
                    <div
                      style="
                        width: 24px;
                        height: 4px;
                        background: #d1d5db;
                        border-radius: 2px;
                      "
                    ></div>
                  </div>
                  <span>Logo Giữa</span>
                </div>
              </button>
              <button
                class="sb-item"
                type="button"
                @click="applyHeaderPreset('logo-left-menu-center')"
              >
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    width: 100%;
                  "
                >
                  <div
                    style="
                      display: flex;
                      width: 100%;
                      height: 24px;
                      background: #f3f4f6;
                      border: 1px solid #e5e7eb;
                      border-radius: 4px;
                      align-items: center;
                      padding: 0 4px;
                    "
                  >
                    <div
                      style="
                        width: 16px;
                        height: 8px;
                        background: #9ca3af;
                        border-radius: 2px;
                      "
                    ></div>
                    <div
                      style="flex: 1; display: flex; justify-content: center"
                    >
                      <div
                        style="
                          width: 32px;
                          height: 4px;
                          background: #d1d5db;
                          border-radius: 2px;
                        "
                      ></div>
                    </div>
                    <div style="width: 16px"></div>
                  </div>
                  <span>Menu Giữa</span>
                </div>
              </button>
            </div>
          </section>
        </div>
      </aside>
      <main class="canvas">
        <div class="editor-main">
          <div v-show="!showPreview" class="canvas-shell">
            <EditorCanvas
              ref="editorCanvasRef"
              :base-width="1440"
              :use-grapes-zoom="true"
              @ready="onCanvasReady"
              @zoom="onCanvasZoom"
              @dragover.prevent
              @drop.prevent="onCanvasDrop"
            />
          </div>
          <div v-show="showPreview" class="canvas-shell">
            <div class="canvas-frame">
              <div
                class="preview-iframe"
                style="
                  display: flex;
                  justify-content: center;
                  background: #f1f5f9;
                  padding-top: 20px;
                "
              >
                <div :style="previewStyle">
                  <iframe
                    class="preview-frame"
                    :srcdoc="previewHtml"
                    style="width: 100%; height: 100%; border: 0"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <aside
        v-if="showProperties"
        :class="['inspector', 'properties', { compact: inspectorCompact }]"
      >
        <header class="inspector__header">
          <div class="inspector__topline">
            <div class="inspector__heading">
              <h2 class="inspector__title">{{ propertiesTitle }}</h2>
              <p class="inspector__hint">
                {{ isTextSelection ? "Đang chỉnh sửa văn bản" : selectedComponentLabel ? "Đang chọn: " + selectedComponentLabel : "Chọn một khối trên trang để chỉnh sửa" }}
              </p>
            </div>
            <button
              class="icon-button"
              type="button"
              aria-label="Đóng bảng thuộc tính"
              title="Đóng bảng thuộc tính"
              @click="showProperties = false"
            >
              <IconX size="18" />
            </button>
          </div>
          <label class="inspector__search">
            <IconSearch size="16" aria-hidden="true" />
            <input
              v-model="sidebarSearch"
              type="search"
              placeholder="Tìm nhanh cài đặt..."
              aria-label="Tìm nhanh cài đặt trong bảng thuộc tính"
              class="input-focus"
            />
            <button
              v-if="sidebarSearch"
              class="inspector__search-clear"
              type="button"
              aria-label="Xóa nội dung tìm kiếm"
              title="Xóa tìm kiếm"
              @click="sidebarSearch = ''"
            >
              <IconX size="14" />
            </button>
          </label>
        </header>

        <nav class="inspector-tabs" role="tablist" aria-label="Nhóm thuộc tính phần tử">
          <button
            id="inspector-tab-style"
            ref="inspectorStyleTab"
            class="inspector-tab"
            :class="{ 'is-active': rightTab === 'style' }"
            :aria-selected="rightTab === 'style'"
            :aria-controls="'inspector-panel-style'"
            :tabindex="rightTab === 'style' ? 0 : -1"
            role="tab"
            type="button"
            title="Chỉnh màu sắc, kiểu chữ, kích thước và khoảng cách"
            @click="rightTab = 'style'"
            @keydown.left.prevent="moveInspectorTab(-1)"
            @keydown.right.prevent="moveInspectorTab(1)"
            @keydown.home.prevent="focusInspectorTab('style')"
            @keydown.end.prevent="focusInspectorTab('interactions')"
          >
            <IconLayout size="14" aria-hidden="true" />
            <span>Kiểu dáng</span>
          </button>
          <button
            id="inspector-tab-settings"
            ref="inspectorSettingsTab"
            class="inspector-tab"
            :class="{ 'is-active': rightTab === 'settings' }"
            :aria-selected="rightTab === 'settings'"
            :aria-controls="'inspector-panel-settings'"
            :tabindex="rightTab === 'settings' ? 0 : -1"
            role="tab"
            type="button"
            title="Cài đặt nội dung và thuộc tính phần tử"
            @click="rightTab = 'settings'"
            @keydown.left.prevent="moveInspectorTab(-1)"
            @keydown.right.prevent="moveInspectorTab(1)"
            @keydown.home.prevent="focusInspectorTab('style')"
            @keydown.end.prevent="focusInspectorTab('interactions')"
          >
            <IconSettings size="14" aria-hidden="true" />
            <span>Cài đặt</span>
          </button>
          <button
            id="inspector-tab-interactions"
            ref="inspectorInteractionsTab"
            class="inspector-tab"
            :class="{ 'is-active': rightTab === 'interactions' }"
            :aria-selected="rightTab === 'interactions'"
            :aria-controls="'inspector-panel-interactions'"
            :tabindex="rightTab === 'interactions' ? 0 : -1"
            role="tab"
            type="button"
            title="Thiết lập liên kết và hành vi tương tác"
            @click="rightTab = 'interactions'"
            @keydown.left.prevent="moveInspectorTab(-1)"
            @keydown.right.prevent="moveInspectorTab(1)"
            @keydown.home.prevent="focusInspectorTab('style')"
            @keydown.end.prevent="focusInspectorTab('interactions')"
          >
            <IconLink size="14" aria-hidden="true" />
            <span>Tương tác</span>
          </button>
        </nav>

        <div class="floating-panel-content">
          <div v-if="isTextSelection" class="selected-text-info">
            <div class="selected-text-row">
              <span class="label">Văn bản</span>
              <span class="value" :title="selectedTextName">{{
                multiSelectedCount > 1
                  ? "Khối văn bản (" + multiSelectedCount + ")"
                  : selectedTextName
              }}</span>
              <span
                v-if="
                  selectedTextName && selectedTextName !== lastSelectedTextName
                "
                class="badge"
                >Đã chỉnh sửa</span
              >
            </div>
            <div class="text-actions">
              <button
                class="action"
                type="button"
                @click="promptEditSelectedText"
              >
                <IconListCheck size="16" /> <span>Sửa</span>
              </button>
              <button class="action" type="button" @click="toggleBold">
                <IconBold size="16" /> <span>Đậm</span>
              </button>
              <button class="action" type="button" @click="toggleItalic">
                <IconItalic size="16" /> <span>Nghiêng</span>
              </button>
              <button class="action" type="button" @click="toggleUnderline">
                <IconUnderline size="16" /> <span>Gạch chân</span>
              </button>
              <button class="action" type="button" @click="alignText('left')">
                <IconAlignLeft size="16" /> <span>Trái</span>
              </button>
              <button class="action" type="button" @click="alignText('center')">
                <IconAlignCenter size="16" /> <span>Giữa</span>
              </button>
              <button class="action" type="button" @click="alignText('right')">
                <IconAlignRight size="16" /> <span>Phải</span>
              </button>
              <button
                class="action danger"
                type="button"
                @click="removeSelectedText"
              >
                <span>Xóa</span>
              </button>
            </div>
          </div>
          <div
            v-if="rightTab === 'style'"
            id="inspector-panel-style"
            role="tabpanel"
            aria-labelledby="inspector-tab-style"
            tabindex="0"
            class="settings-section"
          >
            <p
              v-if="sidebarSearch && !hasStyleSearchMatches()"
              class="inspector__hint"
            >
              Không tìm thấy cài đặt phù hợp trong tab Kiểu dáng. Thử từ khóa khác hoặc xóa tìm kiếm.
            </p>
            <div
              v-if="isTextSelection && matchesSearch('Kiểu chữ', 'Typography', 'Nội dung', 'Cỡ chữ', 'Font', 'Khoảng dòng', 'Line Height', 'Độ đậm', 'Weight', 'Khoảng chữ', 'Letter Spacing', 'Màu chữ', 'Text Color')"
              class="setting-group"
            >
              <div
                class="group-header"
                @click="typographyOpen = !typographyOpen"
              >
                <span>Kiểu chữ</span>
                <component
                  :is="typographyOpen ? IconChevronDown : IconChevronRight"
                  class="chev"
                />
              </div>
              <div v-show="typographyOpen || !!sidebarSearch" class="group-body">
                <div class="field mb-3">
                  <div class="field-label">Nội dung</div>
                  <input
                    v-model="selectedTextContent"
                    class="chip-input"
                    type="text"
                    placeholder="Nội dung hiển thị"
                    @change="applyTextContent"
                  />
                </div>
                <div class="grid-2">
                  <div class="field">
                    <div class="field-label">Cỡ chữ (px)</div>
                    <div class="input-with-icon-left">
                      <input
                        v-model.number="textFontSize"
                        class="chip-input pl-8"
                        type="number"
                        min="8"
                        @change="applyTypographySettings"
                      />
                    </div>
                  </div>
                  <div class="field">
                    <div class="field-label">Khoảng dòng</div>
                    <div class="input-with-icon-left">
                      <input
                        v-model.number="textLineHeight"
                        class="chip-input pl-8"
                        type="number"
                        step="0.1"
                        @change="applyTypographySettings"
                      />
                    </div>
                  </div>
                </div>

                <div class="grid-2 mt-3">
                  <div class="field">
                    <div class="field-label">Độ đậm</div>
                    <select
                      v-model="textFontWeight"
                      class="chip-select"
                      @change="applyTypographySettings"
                    >
                      <option value="normal">Thường</option>
                      <option value="500">Vừa</option>
                      <option value="600">Bán đậm</option>
                      <option value="700">Đậm</option>
                      <option value="800">Rất đậm</option>
                    </select>
                  </div>
                  <div class="field">
                    <div class="field-label">Khoảng chữ (px)</div>
                    <div class="input-with-icon-left">
                      <input
                        v-model.number="textLetterSpacing"
                        class="chip-input pl-8"
                        type="number"
                        step="0.5"
                        @change="applyTypographySettings"
                      />
                    </div>
                  </div>
                </div>

                

                <div class="field mt-3">
                  <div class="field-label">Màu chữ</div>
                  <div class="input-with-icon-left relative">
                    <div class="color-input-group">
                     
                      <input
                        v-model="textColor"
                        class="chip-input pl-9"
                        type="text"
                        @change="applyTypographySettings"
                      />
                      <div class="color-picker-container">
                        <input type="color" v-model="textColor" class="color-picker"  @change="applyTypographySettings" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="hasStyleSearchMatches()" class="setting-group">
              <div
                v-if="matchesSearch('Bố cục', 'Layout', 'Hiển thị', 'Display', 'Block', 'Flex', 'Inline', 'Ẩn', 'Hướng', 'Direction', 'Justify', 'Align', 'Wrap', 'Gap', 'Khoảng cách')"
                class="group-header"
                @click="displayLayoutOpen = !displayLayoutOpen"
              >
                <span>Bố cục (Layout)</span>
                <component
                  :is="displayLayoutOpen ? IconChevronDown : IconChevronRight"
                  class="chev"
                />
              </div>
              <div v-if="matchesSearch('Bố cục', 'Layout', 'Hiển thị', 'Display', 'Block', 'Flex', 'Inline', 'Ẩn', 'Hướng', 'Direction', 'Justify', 'Align', 'Wrap', 'Gap', 'Khoảng cách')" v-show="displayLayoutOpen || !!sidebarSearch" class="group-body">
                <div class="field">
                  <div class="field-label">Hiển thị (Display)</div>
                  <div class="grid-2">
                    <button
                      class="chip w-full justify-center"
                      :class="{
                        'bg-indigo-50 border-indigo-500 text-indigo-700':
                          styleDisplay === 'block',
                      }"
                      @click="
                        styleDisplay = 'block';
                        applyDisplay();
                      "
                    >
                      Khối (Block)
                    </button>
                    <button
                      class="chip w-full justify-center"
                      :class="{
                        'bg-indigo-50 border-indigo-500 text-indigo-700':
                          styleDisplay === 'flex',
                      }"
                      @click="
                        styleDisplay = 'flex';
                        applyDisplay();
                      "
                    >
                      Động (Flex)
                    </button>
                    <button
                      class="chip w-full justify-center"
                      :class="{
                        'bg-indigo-50 border-indigo-500 text-indigo-700':
                          styleDisplay === 'inline-block',
                      }"
                      @click="
                        styleDisplay = 'inline-block';
                        applyDisplay();
                      "
                    >
                      Nội tuyến (Inline)
                    </button>
                    <button
                      class="chip w-full justify-center"
                      :class="{
                        'bg-indigo-50 border-indigo-500 text-indigo-700':
                          styleDisplay === 'none',
                      }"
                      @click="
                        styleDisplay = 'none';
                        applyDisplay();
                      "
                    >
                      Ẩn (None)
                    </button>
                  </div>
                </div>

                <div v-if="styleDisplay === 'flex'" class="field mt-3">
                  <div class="field-label">Hướng (Direction)</div>
                  <div class="segmented segmented--small w-full">
                    <button
                      v-for="d in [
                        'row',
                        'column',
                        'row-reverse',
                        'column-reverse',
                      ]"
                      :key="d"
                      class="segment flex-1"
                      :class="{ 'is-active': styleFlexDirection === d }"
                      type="button"
                      @click="
                        styleFlexDirection = d;
                        applyDisplay();
                      "
                    >
                      <component :is="getFlexIcon(d)" size="14" />
                    </button>
                  </div>
                </div>

                <div v-if="styleDisplay === 'flex'" class="grid-2 mt-3">
                  <div class="field">
                    <div class="field-label">Ngang (Justify)</div>
                    <select
                      v-model="styleJustifyContent"
                      class="chip-select"
                      @change="applyDisplay"
                    >
                      <option value="flex-start">Trái</option>
                      <option value="center">Giữa</option>
                      <option value="flex-end">Phải</option>
                      <option value="space-between">Cách đều</option>
                      <option value="space-around">Cách quanh</option>
                      <option value="space-evenly">Cách đều toàn bộ</option>
                    </select>
                  </div>
                  <div class="field">
                    <div class="field-label">Dọc (Align)</div>
                    <select
                      v-model="styleAlignItems"
                      class="chip-select"
                      @change="applyDisplay"
                    >
                      <option value="stretch">Kéo dãn</option>
                      <option value="flex-start">Trái</option>
                      <option value="center">Giữa</option>
                      <option value="flex-end">Phải</option>
                      <option value="baseline">Đường cơ sở</option>
                    </select>
                  </div>
                </div>

                <div v-if="styleDisplay === 'flex'" class="grid-2 mt-3">
                  <div class="field">
                    <div class="field-label">Wrap</div>
                    <div class="segmented segmented--small w-full">
                      <button
                        class="segment flex-1"
                        :class="{ 'is-active': styleFlexWrap === 'nowrap' }"
                        type="button"
                        @click="
                          styleFlexWrap = 'nowrap';
                          applyDisplay();
                        "
                      >
                        No
                      </button>
                      <button
                        class="segment flex-1"
                        :class="{ 'is-active': styleFlexWrap === 'wrap' }"
                        type="button"
                        @click="
                          styleFlexWrap = 'wrap';
                          applyDisplay();
                        "
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                  <div class="field">
                    <div class="field-label">Gap (px)</div>
                    <input
                      v-model.number="styleGap"
                      class="chip-input"
                      type="number"
                      min="0"
                      @change="applyDisplay"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="setting-group">
              <div v-if="matchesSearch('Khoảng cách', 'Spacing', 'Margin', 'Lề ngoài', 'Padding', 'Lề trong')" class="group-header" @click="spacingOpen = !spacingOpen">
                <span>Khoảng cách</span>
                <component
                  :is="spacingOpen ? IconChevronDown : IconChevronRight"
                  class="chev"
                />
              </div>
              <div v-if="matchesSearch('Khoảng cách', 'Spacing', 'Margin', 'Lề ngoài', 'Padding', 'Lề trong')" v-show="spacingOpen || !!sidebarSearch" class="group-body">
                <div class="field">
                  <div class="field-label">Margin (Lề ngoài)</div>
                  <div class="grid-4">
                    <div class="input-labeled">
                      <span class="label-mini">T</span>
                      <input
                        v-model.number="styleMarginTop"
                        class="chip-input"
                        type="number"
                        placeholder="-"
                        @change="applySpacing"
                      />
                    </div>
                    <div class="input-labeled">
                      <span class="label-mini">R</span>
                      <input
                        v-model.number="styleMarginRight"
                        class="chip-input"
                        type="number"
                        placeholder="-"
                        @change="applySpacing"
                      />
                    </div>
                    <div class="input-labeled">
                      <span class="label-mini">B</span>
                      <input
                        v-model.number="styleMarginBottom"
                        class="chip-input"
                        type="number"
                        placeholder="-"
                        @change="applySpacing"
                      />
                    </div>
                    <div class="input-labeled">
                      <span class="label-mini">L</span>
                      <input
                        v-model.number="styleMarginLeft"
                        class="chip-input"
                        type="number"
                        placeholder="-"
                        @change="applySpacing"
                      />
                    </div>
                  </div>
                </div>
                <div class="field mt-1">
                  <div class="field-label">Padding (Lề trong)</div>
                  <div class="grid-4">
                    <div class="input-labeled">
                      <span class="label-mini">T</span>
                      <input
                        v-model.number="stylePaddingTop"
                        class="chip-input"
                        type="number"
                        placeholder="-"
                        @change="applySpacing"
                      />
                    </div>
                    <div class="input-labeled">
                      <span class="label-mini">R</span>
                      <input
                        v-model.number="stylePaddingRight"
                        class="chip-input"
                        type="number"
                        placeholder="-"
                        @change="applySpacing"
                      />
                    </div>
                    <div class="input-labeled">
                      <span class="label-mini">B</span>
                      <input
                        v-model.number="stylePaddingBottom"
                        class="chip-input"
                        type="number"
                        placeholder="-"
                        @change="applySpacing"
                      />
                    </div>
                    <div class="input-labeled">
                      <span class="label-mini">L</span>
                      <input
                        v-model.number="stylePaddingLeft"
                        class="chip-input"
                        type="number"
                        placeholder="-"
                        @change="applySpacing"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="matchesSearch('Kích thước', 'Sizing', 'Width', 'Height', 'Rộng', 'Cao', 'Min W', 'Min H', 'Max W', 'Max H', 'Tỷ lệ', 'Đơn vị', 'Aspect', 'Auto', 'Khóa')" class="group-header" @click="sizingOpen = !sizingOpen">
                <span>Kích thước</span>
                <component
                  :is="sizingOpen ? IconChevronDown : IconChevronRight"
                  class="chev"
                />
              </div>
              <div v-if="matchesSearch('Kích thước', 'Sizing', 'Width', 'Height', 'Rộng', 'Cao', 'Min W', 'Min H', 'Max W', 'Max H', 'Tỷ lệ', 'Đơn vị', 'Aspect', 'Auto', 'Khóa')" v-show="sizingOpen || !!sidebarSearch" class="group-body">
                <div class="field">
                  <div class="field-header-row">
                    <div class="field-label">Đơn vị & Tỷ lệ</div>
                    <button
                      class="mini-toggle"
                      :class="{ active: lockAspect }"
                      type="button"
                      @click="toggleAspectLock"
                    >
                      <component
                        :is="lockAspect ? IconLink : IconUnlink"
                        size="10"
                        style="margin-right: 2px"
                      />
                      Khóa
                    </button>
                  </div>
                  <div class="segmented segmented--small">
                    <button
                      v-for="u in sizeUnits"
                      :key="u"
                      class="segment"
                      :class="{ 'is-active': sizeUnit === u }"
                      type="button"
                      @click="sizeUnit = u"
                    >
                      {{ u }}
                    </button>
                  </div>
                </div>

                <div class="grid-2 mt-2">
                  <div class="field">
                    <div class="field-header-row">
                      <div class="field-label">Rộng</div>
                      <button
                        class="mini-toggle"
                        :class="{ active: widthAuto }"
                        @click="
                          widthAuto = !widthAuto;
                          applyWidthAuto();
                        "
                      >
                        Auto
                      </button>
                    </div>
                    <input
                      v-model.number="width"
                      class="chip-input"
                      type="number"
                      :disabled="widthAuto"
                      @change="updateWidth"
                    />
                  </div>
                  <div class="field">
                    <div class="field-header-row">
                      <div class="field-label">Cao</div>
                      <button
                        class="mini-toggle"
                        :class="{ active: heightAuto }"
                        @click="
                          heightAuto = !heightAuto;
                          applyHeightAuto();
                        "
                      >
                        Auto
                      </button>
                    </div>
                    <input
                      v-model.number="height"
                      class="chip-input"
                      type="number"
                      :disabled="heightAuto"
                      @change="updateHeight"
                    />
                  </div>
                </div>

                <div class="grid-2 mt-2">
                  <div class="field">
                    <div class="field-label">Min W</div>
                    <input
                      v-model.number="minWidth"
                      class="chip-input"
                      type="number"
                      @change="updateMinWidth"
                    />
                  </div>
                  <div class="field">
                    <div class="field-label">Min H</div>
                    <input
                      v-model.number="minHeight"
                      class="chip-input"
                      type="number"
                      @change="updateMinHeight"
                    />
                  </div>
                </div>

                <div class="grid-2 mt-2">
                  <div class="field">
                    <div class="field-header-row">
                      <div class="field-label">Max W</div>
                      <button
                        class="mini-toggle"
                        :class="{ active: maxWidthNone }"
                        @click="
                          maxWidthNone = !maxWidthNone;
                          applyMaxWidthNone();
                        "
                      >
                        Không (None)
                      </button>
                    </div>
                    <input
                      v-model.number="maxWidth"
                      class="chip-input"
                      type="number"
                      :disabled="maxWidthNone"
                      @change="updateMaxWidth"
                    />
                  </div>
                  <div class="field">
                    <div class="field-header-row">
                      <div class="field-label">Max H</div>
                      <button
                        class="mini-toggle"
                        :class="{ active: maxHeightNone }"
                        @click="
                          maxHeightNone = !maxHeightNone;
                          applyMaxHeightNone();
                        "
                      >
                        Không (None)
                      </button>
                    </div>
                    <input
                      v-model.number="maxHeight"
                      class="chip-input"
                      type="number"
                      :disabled="maxHeightNone"
                      @change="updateMaxHeight"
                    />
                  </div>
                </div>
              </div>
              <div
                v-if="isGenericGridComponent(selectedComponent) && matchesSearch('Lưới', 'Grid', 'Cột', 'Columns', 'Khoảng cách', 'Gap')"
                class="group-header"
                @click="gridOpen = !gridOpen"
              >
                <span>Lưới (Grid)</span>
                <component
                  :is="gridOpen ? IconChevronDown : IconChevronRight"
                  class="chev"
                />
              </div>
              <div
                v-if="isGenericGridComponent(selectedComponent)"
                v-show="gridOpen || !!sidebarSearch"
                class="group-body"
              >
                <div class="field">
                  <div class="field-label">Số cột (Columns)</div>
                  <input
                    v-model.number="gridColumns"
                    class="chip-input"
                    type="number"
                    min="1"
                    max="12"
                    @change="applyGridSettings"
                  />
                </div>
                <div class="field">
                  <div class="field-label">Khoảng cách (Gap px)</div>
                  <input
                    v-model.number="gridGap"
                    class="chip-input"
                    type="number"
                    min="0"
                    @change="applyGridSettings"
                  />
                </div>
              </div>
              <div
                v-if="matchesSearch('Nền', 'Background', 'Màu nền', 'Ảnh nền', 'Lặp lại', 'Vị trí', 'Kích thước', 'Attachment', 'Cố định')"
                class="group-header"
                @click="backgroundOpen = !backgroundOpen"
              >
                <span>Nền (Background)</span>
                <component
                  :is="backgroundOpen ? IconChevronDown : IconChevronRight"
                  class="chev"
                />
              </div>
              <div v-if="matchesSearch('Nền', 'Background', 'Màu nền', 'Ảnh nền', 'Lặp lại', 'Vị trí', 'Kích thước', 'Attachment', 'Cố định')" v-show="backgroundOpen || !!sidebarSearch" class="group-body">
                <div class="field">
                  <div class="field-label">Màu nền</div>
                  <div class="input-with-prefix">
                    <div class="color-input-group">
                   
                    <input
                      v-model="styleBgColor"
                      class="chip-input pl-9"
                      type="text"
                      placeholder="Hex/RGB"
                      @change="applyBackground"
                    />
                    <div class="color-picker-container">
                      <input type="color" v-model="styleBgColor" :style="{ backgroundColor: styleBgColor }" class="color-picker"/>
                    </div>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <div class="field-label">Ảnh nền (URL)</div>
                  <div class="input-with-icon-right">
                    <input
                      v-model="styleBgImage"
                      class="chip-input"
                      type="text"
                      placeholder="https://..."
                      @change="applyBackground"
                    />
                    <button
                      class="icon-btn-right"
                      type="button"
                      title="Tải ảnh lên"
                      @click="
                        openAssetManager((url) => {
                          styleBgImage = url;
                          applyBackground();
                        })
                      "
                    >
                      <IconUpload size="14" />
                    </button>
                  </div>
                </div>
                <div class="field">
                  <div class="field-label">Lặp lại</div>
                  <select
                    v-model="styleBgRepeat"
                    class="chip-select"
                    @change="applyBackground"
                  >
                    <option value="repeat">Lặp lại (Repeat)</option>
                    <option value="repeat-x">Lặp ngang (Repeat X)</option>
                    <option value="repeat-y">Lặp dọc (Repeat Y)</option>
                    <option value="no-repeat">Không lặp (No Repeat)</option>
                  </select>
                </div>
                <div class="field">
                  <div class="field-label">Vị trí</div>
                  <select
                    v-model="styleBgPosition"
                    class="chip-select"
                    @change="applyBackground"
                  >
                    <option
                      v-for="opt in imagePositionOptions"
                      :key="opt"
                      :value="opt"
                    >
                      {{ opt }}
                    </option>
                  </select>
                </div>
                <div class="field">
                  <div class="field-label">Kích thước</div>
                  <select
                    v-model="styleBgSize"
                    class="chip-select"
                    @change="applyBackground"
                  >
                    <option value="auto">Tự động (Auto)</option>
                    <option value="cover">Phủ kín (Cover)</option>
                    <option value="contain">Vừa khít (Contain)</option>
                    <option value="100% 100%">Kéo giãn (100%)</option>
                  </select>
                </div>
                <div class="field">
                  <div class="field-label">Cố định (Attachment)</div>
                  <select
                    v-model="styleBgAttachment"
                    class="chip-select"
                    @change="applyBackground"
                  >
                    <option value="scroll">Cuộn (Scroll)</option>
                    <option value="fixed">Cố định (Fixed)</option>
                    <option value="local">Tại chỗ (Local)</option>
                  </select>
                </div>
              </div>
              <div v-if="matchesSearch('Viền', 'Border', 'Kiểu viền', 'Độ dày', 'Màu viền', 'Bo góc', 'Radius')" class="group-header" @click="borderOpen = !borderOpen">
                <span>Viền (Border)</span>
                <component
                  :is="borderOpen ? IconChevronDown : IconChevronRight"
                  class="chev"
                />
              </div>
              <div v-if="matchesSearch('Viền', 'Border', 'Kiểu viền', 'Độ dày', 'Màu viền', 'Bo góc', 'Radius')" v-show="borderOpen || !!sidebarSearch" class="group-body">
                <div class="field">
                  <div class="field-label">Kiểu viền</div>
                  <select
                    v-model="styleBorderStyle"
                    class="chip-select"
                    @change="applyBorder"
                  >
                    <option value="none">Không (None)</option>
                    <option value="solid">Nét liền (Solid)</option>
                    <option value="dashed">Nét đứt (Dashed)</option>
                    <option value="dotted">Chấm tròn (Dotted)</option>
                    <option value="double">Nét đôi (Double)</option>
                  </select>
                </div>
                <div v-if="styleBorderStyle !== 'none'" class="field">
                  <div class="field-label">Độ dày (px)</div>
                  <input
                    v-model.number="styleBorderWidth"
                    class="chip-input"
                    type="number"
                    min="0"
                    @change="applyBorder"
                  />
                </div>
                <div v-if="styleBorderStyle !== 'none'" class="field">
                  <div class="field-label">Màu viền</div>
                  <div class="input-with-prefix">
                    <div class="color-input-group">
                    <div
                      class="color-preview-small"
                      :style="{ backgroundColor: styleBorderColor }"
                    ></div>
                    <input
                      v-model="styleBorderColor"
                      class="chip-input pl-9"
                      type="text"
                      placeholder="Hex/RGB"
                      @change="applyBorder"
                    />
                    <div class="color-picker-container">
                      <input type="color" v-model="styleBorderColor" class="color-picker" @change="applyBorder" />
                    </div>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <div class="field-label">Bo góc (Radius - px)</div>
                  <input
                    v-model.number="styleBorderRadius"
                    class="chip-input"
                    type="number"
                    min="0"
                    @change="applyBorder"
                  />
                </div>
              </div>

              <div
                v-if="matchesSearch('Định vị', 'Positioning', 'Position', 'Kiểu', 'Trên', 'Dưới', 'Trái', 'Phải', 'Z-Index', 'Opacity')"
                class="group-header"
                @click="positioningOpen = !positioningOpen"
              >
                <span>Định vị (Positioning)</span>
                <component
                  :is="positioningOpen ? IconChevronDown : IconChevronRight"
                  class="chev"
                />
              </div>
              <div v-if="matchesSearch('Định vị', 'Positioning', 'Position', 'Kiểu', 'Trên', 'Dưới', 'Trái', 'Phải', 'Z-Index', 'Opacity')" v-show="positioningOpen || !!sidebarSearch" class="group-body">
                <div class="field">
                  <div class="field-label">Kiểu</div>
                  <select
                    v-model="stylePosition"
                    class="chip-select"
                    @change="applyPosition"
                  >
                    <option value="static">Tĩnh (Static)</option>
                    <option value="relative">Tương đối (Relative)</option>
                    <option value="absolute">Tuyệt đối (Absolute)</option>
                    <option value="fixed">Cố định (Fixed)</option>
                    <option value="sticky">Dính (Sticky)</option>
                  </select>
                </div>

                <div
                  v-if="stylePosition !== 'static'"
                  class="box-model-editor mt-2"
                >
                  <div
                    class="relative w-full h-32 bg-gray-50 border rounded flex items-center justify-center"
                  >
                    <div
                      class="absolute top-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1"
                    >
                      <span class="text-[9px] text-gray-400 font-bold uppercase"
                        >Trên</span
                      >
                      <input
                        v-model="styleTop"
                        class="chip-input w-12 text-center h-6 text-xs p-0"
                        placeholder="-"
                        @change="applyPosition"
                      />
                    </div>
                    <div
                      class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1"
                    >
                      <input
                        v-model="styleBottom"
                        class="chip-input w-12 text-center h-6 text-xs p-0"
                        placeholder="-"
                        @change="applyPosition"
                      />
                      <span class="text-[9px] text-gray-400 font-bold uppercase"
                        >Dưới</span
                      >
                    </div>
                    <div
                      class="absolute left-2 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-1"
                    >
                      <span class="text-[9px] text-gray-400 font-bold uppercase"
                        >Trái</span
                      >
                      <input
                        v-model="styleLeft"
                        class="chip-input w-12 text-center h-6 text-xs p-0"
                        placeholder="-"
                        @change="applyPosition"
                      />
                    </div>
                    <div
                      class="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-1"
                    >
                      <span class="text-[9px] text-gray-400 font-bold uppercase"
                        >Phải</span
                      >
                      <input
                        v-model="styleRight"
                        class="chip-input w-12 text-center h-6 text-xs p-0"
                        placeholder="-"
                        @change="applyPosition"
                      />
                    </div>
                    <div
                      class="w-16 h-12 border border-dashed border-gray-300 rounded bg-white"
                    ></div>
                  </div>
                </div>

                <div class="grid-2 mt-3">
                  <div class="field">
                    <div class="field-label">Z-Index</div>
                    <input
                      v-model.number="styleZIndex"
                      class="chip-input"
                      type="number"
                      @change="applyPosition"
                    />
                  </div>
                  <div class="field">
                    <div class="field-label">Opacity</div>
                    <input
                      v-model.number="styleOpacity"
                      class="chip-input"
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      @change="applyPosition"
                    />
                  </div>
                </div>
              </div>
              <div v-if="matchesSearch('Hiệu ứng', 'Effects', 'Đổ bóng', 'Shadow', 'Hover', 'Chuyển đổi', 'Transition', 'Biến đổi', 'Transform', 'Xoay', 'Rotate', 'Scale', 'Skew', 'Bộ lọc', 'Filter', 'Làm mờ', 'Blur', 'Độ sáng', 'Brightness', 'Nền mờ', 'Backdrop', 'Thời gian', 'Easing')" class="group-header" @click="effectsOpen = !effectsOpen">
                <span>Hiệu ứng</span>
                <component
                  :is="effectsOpen ? IconChevronDown : IconChevronRight"
                  class="chev"
                />
              </div>
              <div v-show="effectsOpen || !!sidebarSearch" class="group-body">
                <!-- Shadows -->
                <div
                  v-if="matchesSearch('Đổ bóng', 'Shadows', 'Shadow', 'Hover', 'Bật đổ bóng')"
                  class="sub-group border-b border-gray-100 pb-2 mb-2"
                >
                  <div
                    class="flex items-center justify-between cursor-pointer py-1 sub-group-header"
                    @click="effectShadowOpen = !effectShadowOpen"
                  >
                    <span class="text-xs font-medium text-gray-600"
                      >Đổ bóng (Shadows)</span
                    >
                    <component
                      :is="
                        effectShadowOpen ? IconChevronDown : IconChevronRight
                      "
                      size="14"
                    />
                  </div>
                  <div
                    v-show="effectShadowOpen || !!sidebarSearch"
                    class="mt-2 pl-2 border-l-2 border-gray-100 sub-group-body"
                  >
                    <div class="field-checkbox">
                      <input
                        id="hoverShadow"
                        v-model="hoverShadow"
                        type="checkbox"
                        @change="applyInteractions"
                      />
                      <label for="hoverShadow">Bật đổ bóng khi hover</label>
                    </div>
                  </div>
                </div>

                <!-- Transitions -->
                <div
                  v-if="matchesSearch('Chuyển đổi', 'Transition', 'Easing', 'Thời gian', 'Kiểu')"
                  class="sub-group border-b border-gray-100 pb-2 mb-2"
                >
                  <div
                    class="flex items-center justify-between cursor-pointer py-1 sub-group-header"
                    @click="effectTransitionOpen = !effectTransitionOpen"
                  >
                    <span class="text-xs font-medium text-gray-600"
                      >Chuyển đổi (Transition)</span
                    >
                    <component
                      :is="
                        effectTransitionOpen
                          ? IconChevronDown
                          : IconChevronRight
                      "
                      size="14"
                    />
                  </div>
                  <div
                    v-show="effectTransitionOpen || !!sidebarSearch"
                    class="mt-2 pl-2 border-l-2 border-gray-100 sub-group-body"
                  >
                    <div class="grid-2">
                      <div class="field">
                        <div class="field-label">Kiểu</div>
                        <select
                          v-model="animEasing"
                          class="chip-select"
                          @change="applyInteractions"
                        >
                          <option
                            v-for="opt in easingOptions"
                            :key="opt"
                            :value="opt"
                          >
                            {{ opt }}
                          </option>
                        </select>
                      </div>
                      <div class="field">
                        <div class="field-label">Thời gian (ms)</div>
                        <input
                          v-model.number="animDuration"
                          class="chip-input"
                          type="number"
                          min="0"
                          @change="applyInteractions"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Transform -->
                <div
                  v-if="matchesSearch('Biến đổi', 'Transform', 'Xoay', 'Rotate', 'Scale', 'Skew')"
                  class="sub-group border-b border-gray-100 pb-2 mb-2"
                >
                  <div
                    class="flex items-center justify-between cursor-pointer py-1 sub-group-header"
                    @click="effectTransformOpen = !effectTransformOpen"
                  >
                    <span class="text-xs font-medium text-gray-600"
                      >Biến đổi (Transform)</span
                    >
                    <component
                      :is="
                        effectTransformOpen ? IconChevronDown : IconChevronRight
                      "
                      size="14"
                    />
                  </div>
                  <div
                    v-show="effectTransformOpen || !!sidebarSearch"
                    class="mt-2 pl-2 border-l-2 border-gray-100 sub-group-body"
                  >
                    <div class="grid-2">
                      <div class="field">
                        <div class="field-label">Xoay (deg)</div>
                        <input
                          v-model.number="transformRotate"
                          class="chip-input"
                          type="number"
                          @change="applyTransforms"
                        />
                      </div>
                      <div class="field">
                        <div class="field-label">Scale</div>
                        <input
                          v-model.number="transformScale"
                          class="chip-input"
                          type="number"
                          step="0.1"
                          @change="applyTransforms"
                        />
                      </div>
                      <div class="field">
                        <div class="field-label">Skew X</div>
                        <input
                          v-model.number="transformSkewX"
                          class="chip-input"
                          type="number"
                          @change="applyTransforms"
                        />
                      </div>
                      <div class="field">
                        <div class="field-label">Skew Y</div>
                        <input
                          v-model.number="transformSkewY"
                          class="chip-input"
                          type="number"
                          @change="applyTransforms"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Filter -->
                <div
                  v-if="matchesSearch('Bộ lọc', 'Filter', 'Làm mờ', 'Blur', 'Độ sáng', 'Brightness')"
                  class="sub-group border-b border-gray-100 pb-2 mb-2"
                >
                  <div
                    class="flex items-center justify-between cursor-pointer py-1 sub-group-header"
                    @click="effectFilterOpen = !effectFilterOpen"
                  >
                    <span class="text-xs font-medium text-gray-600"
                      >Bộ lọc (Filter)</span
                    >
                    <component
                      :is="
                        effectFilterOpen ? IconChevronDown : IconChevronRight
                      "
                      size="14"
                    />
                  </div>
                  <div
                    v-show="effectFilterOpen || !!sidebarSearch"
                    class="mt-2 pl-2 border-l-2 border-gray-100 sub-group-body"
                  >
                    <div class="grid-2">
                      <div class="field">
                        <div class="field-label">Làm mờ (px)</div>
                        <input
                          v-model.number="filterBlur"
                          class="chip-input"
                          type="number"
                          min="0"
                          @change="applyFilters"
                        />
                      </div>
                      <div class="field">
                        <div class="field-label">Độ sáng (%)</div>
                        <input
                          v-model.number="filterBrightness"
                          class="chip-input"
                          type="number"
                          min="0"
                          @change="applyFilters"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Backdrop -->
                <div
                  v-if="matchesSearch('Nền mờ', 'Backdrop', 'Blur', 'Làm mờ')"
                  class="sub-group border-b border-gray-100 pb-2 mb-2"
                >
                  <div
                    class="flex items-center justify-between cursor-pointer py-1 sub-group-header"
                    @click="effectBackdropOpen = !effectBackdropOpen"
                  >
                    <span class="text-xs font-medium text-gray-600"
                      >Nền mờ (Backdrop)</span
                    >
                    <component
                      :is="
                        effectBackdropOpen ? IconChevronDown : IconChevronRight
                      "
                      size="14"
                    />
                  </div>
                  <div
                    v-show="effectBackdropOpen || !!sidebarSearch"
                    class="mt-2 pl-2 border-l-2 border-gray-100 sub-group-body"
                  >
                    <div class="field">
                      <div class="field-label">Blur (px)</div>
                      <input
                        v-model.number="backdropBlur"
                        class="chip-input"
                        type="number"
                        min="0"
                        @change="applyBackdropFilters"
                      />
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
          <div
            v-if="rightTab === 'settings'"
            id="inspector-panel-settings"
            role="tabpanel"
            aria-labelledby="inspector-tab-settings"
            tabindex="0"
            class="settings-section"
          >
            <p
              v-if="sidebarSearch && !hasSettingsSearchMatches()"
              class="inspector__hint"
            >
              Không tìm thấy cài đặt phù hợp cho phần tử này. Thử từ khóa khác hoặc kiểm tra loại phần tử đang chọn.
            </p>
            <div
              v-if="isSuperAdminPerm && matchesSearch('Advanced', 'Nâng cao', 'ID Element', 'CSS Classes', 'Breakpoint', 'Điểm ngắt')"
              class="setting-group"
            >
              <div class="group-header">
                <span>Nâng cao (Advanced)</span>
              </div>
              <div class="group-body">
                <div class="field">
                  <div class="field-label">ID Element</div>
                  <input
                    v-model="advancedId"
                    class="chip-input"
                    type="text"
                    @change="applyAdvancedId"
                  />
                </div>
                <div class="field">
                  <div class="field-label">CSS Classes</div>
                  <input
                    v-model="advancedClass"
                    class="chip-input"
                    type="text"
                    @change="applyAdvancedClass"
                  />
                </div>
                <div class="field">
                  <div class="field-label">Điểm ngắt (Breakpoint)</div>
                  <div class="input-with-button">
                    <select v-model="responsiveDevice" class="chip-select">
                      <option
                        v-for="dev in responsiveDevices"
                        :key="dev"
                        :value="dev"
                      >
                        {{ dev }}
                      </option>
                    </select>
                    <button class="chip" type="button" @click="applyResponsive">
                      Áp dụng
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- Page/Site settings moved to header dialog -->

            <div
              v-if="
                isImageComponent(selectedComponent) &&
                matchesSearch('Image', 'Hình ảnh', 'Src', 'URL ảnh', 'Alt Text', 'Fit', 'Vừa khung', 'Position', 'Vị trí')
              "
              class="setting-group"
            >
              <div class="group-header">
                <span>Hình ảnh</span>
              </div>
              <div class="group-body">
                <div class="field">
                  <div class="field-label">Src</div>
                  <div class="input-with-icon-right">
                    <input
                      v-model="imageSrc"
                      class="chip-input"
                      type="text"
                      placeholder="URL ảnh (http/https)"
                      @change="applyImageAttributes"
                    />
                    <button
                      class="icon-btn-right"
                      type="button"
                      title="Tải ảnh lên"
                      @click="
                        openAssetManager((url) => {
                          imageSrc = url;
                          applyImageAttributes();
                        })
                      "
                    >
                      <IconUpload size="14" />
                    </button>
                  </div>
                </div>
                <div class="field">
                  <div class="field-label">Alt Text</div>
                  <input
                    v-model="imageAlt"
                    class="chip-input"
                    type="text"
                    placeholder="Văn bản thay thế"
                    @change="applyImageAttributes"
                  />
                </div>
                <div class="field">
                  <div class="field-label">Vừa khung (Fit)</div>
                  <select
                    v-model="imageFit"
                    class="chip-select"
                    @change="applyImageAttributes"
                  >
                    <option value="cover">Phủ kín (Cover)</option>
                    <option value="contain">Vừa khít (Contain)</option>
                    <option value="fill">Lấp đầy (Fill)</option>
                    <option value="none">Không (None)</option>
                    <option value="scale-down">Thu nhỏ (Scale Down)</option>
                  </select>
                </div>
                <div class="field">
                  <div class="field-label">Vị trí (Position)</div>
                  <select
                    v-model="imagePosition"
                    class="chip-select"
                    @change="applyImageAttributes"
                  >
                    <option
                      v-for="opt in imagePositionOptions"
                      :key="opt"
                      :value="opt"
                    >
                      {{ opt }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div
              v-if="
                isVideoComponent(selectedComponent) &&
                matchesSearch('Video', 'Src', 'URL video', 'Controls', 'Điều khiển', 'Autoplay', 'Tự động phát', 'Loop', 'Lặp lại', 'Muted', 'Tắt tiếng', 'Poster', 'Ảnh bìa', 'Preload', 'Tải trước')
              "
              class="setting-group"
            >
              <div class="group-header">
                <span>Video</span>
              </div>
              <div class="group-body">
                <div class="field">
                  <div class="field-label">Src</div>
                  <div class="input-with-icon-right">
                    <input
                      v-model="videoSrc"
                      class="chip-input"
                      type="text"
                      placeholder="URL video (mp4/webm)"
                      @change="applyVideoAttributes"
                    />
                    <button
                      class="icon-btn-right"
                      type="button"
                      title="Tải video lên"
                      @click="
                        openAssetManager((url) => {
                          videoSrc = url;
                          applyVideoAttributes();
                        })
                      "
                    >
                      <IconUpload size="14" />
                    </button>
                  </div>
                </div>
                <div class="field-checkbox">
                  <input
                    id="vidControls"
                    v-model="videoControls"
                    type="checkbox"
                    @change="applyVideoAttributes"
                  />
                  <label for="vidControls">Hiển thị điều khiển</label>
                </div>
                <div class="field-checkbox">
                  <input
                    id="vidAutoplay"
                    v-model="videoAutoplay"
                    type="checkbox"
                    @change="applyVideoAttributes"
                  />
                  <label for="vidAutoplay">Tự động phát</label>
                </div>
                <div class="field-checkbox">
                  <input
                    id="vidLoop"
                    v-model="videoLoop"
                    type="checkbox"
                    @change="applyVideoAttributes"
                  />
                  <label for="vidLoop">Lặp lại</label>
                </div>
                <div class="field-checkbox">
                  <input
                    id="vidMuted"
                    v-model="videoMuted"
                    type="checkbox"
                    @change="applyVideoAttributes"
                  />
                  <label for="vidMuted">Tắt tiếng</label>
                </div>
                <div class="field">
                  <div class="field-label">Ảnh bìa (Poster)</div>
                  <div class="input-with-icon-right">
                    <input
                      v-model="videoPoster"
                      class="chip-input"
                      type="text"
                      placeholder="URL ảnh bìa"
                      @change="applyVideoAttributes"
                    />
                    <button
                      class="icon-btn-right"
                      type="button"
                      title="Tải ảnh lên"
                      @click="
                        openAssetManager((url) => {
                          videoPoster = url;
                          applyVideoAttributes();
                        })
                      "
                    >
                      <IconUpload size="14" />
                    </button>
                  </div>
                </div>
                <div class="field">
                  <div class="field-label">Tải trước (Preload)</div>
                  <select
                    v-model="videoPreload"
                    class="chip-select"
                    @change="applyVideoAttributes"
                  >
                    <option value="none">Không (None)</option>
                    <option value="metadata">Siêu dữ liệu</option>
                    <option value="auto">Tự động (Auto)</option>
                  </select>
                </div>
              </div>
            </div>
            <div
              v-if="
                (isButtonComponent(selectedComponent) ||
                  hasLinkInSelection(selectedComponent)) &&
                matchesSearch('Button', 'Link', 'Nút', 'Liên kết', 'Href', 'URL', 'Rel', 'Tiêu đề', 'Nhãn Aria', 'Tải xuống', 'Popup Mua Vé', 'Biến thể', 'Kích thước', 'Nội dung')
              "
              class="setting-group"
            >
              <div class="group-header">
                <span>Nút/Liên kết</span>
              </div>
              <div class="group-body">
                <div class="field">
                  <div class="field-label">Nội dung</div>
                  <input
                    v-model="buttonText"
                    class="chip-input"
                    type="text"
                    placeholder="Nội dung hiển thị"
                    @change="applyButtonAttributes"
                  />
                </div>
                <div class="field">
                  <div class="field-label">Liên kết (Href)</div>
                  <input
                    v-model="buttonHref"
                    class="chip-input"
                    type="text"
                    placeholder="http/https hoặc #id"
                    @change="applyButtonAttributes"
                  />
                </div>
                <div class="field">
                  <div class="field-label">Mục tiêu</div>
                  <select
                    v-model="buttonTarget"
                    class="chip-select"
                    @change="applyButtonAttributes"
                  >
                    <option value="_self">_self</option>
                    <option value="_blank">_blank</option>
                  </select>
                </div>
                <div class="field-checkbox" style="margin-top: 8px">
                  <input
                    id="btnOpenPopup"
                    v-model="buttonOpenPopup"
                    type="checkbox"
                    @change="applyButtonAttributes"
                  />
                  <label for="btnOpenPopup">Mở Popup Mua Vé</label>
                </div>
                <div v-if="buttonOpenPopup" class="field">
                  <div class="field-label">ID Sự Kiện</div>
                  <input
                    v-model="buttonEventId"
                    class="chip-input"
                    type="text"
                    placeholder="Nhập ID sự kiện"
                    @change="applyButtonAttributes"
                  />
                </div>
                <div class="field">
                  <div class="field-label">Rel</div>
                  <input
                    v-model="buttonRel"
                    class="chip-input"
                    type="text"
                    @change="applyButtonAttributes"
                  />
                </div>
                <div class="field">
                  <div class="field-label">Tiêu đề</div>
                  <input
                    v-model="linkTitle"
                    class="chip-input"
                    type="text"
                    placeholder="Tooltip/tiêu đề"
                    @change="applyButtonAttributes"
                  />
                </div>
                <div class="field">
                  <div class="field-label">Nhãn Aria</div>
                  <input
                    v-model="linkAriaLabel"
                    class="chip-input"
                    type="text"
                    placeholder="Mô tả truy cập"
                    @change="applyButtonAttributes"
                  />
                </div>
                <div class="field-checkbox">
                  <input
                    id="linkDownload"
                    v-model="linkDownload"
                    type="checkbox"
                    @change="applyButtonAttributes"
                  />
                  <label for="linkDownload">Tải xuống</label>
                </div>
                <div class="field-checkbox">
                  <input
                    id="relNoFollow"
                    v-model="relNoFollow"
                    type="checkbox"
                    @change="applyButtonAttributes"
                  />
                  <label for="relNoFollow">Rel: nofollow</label>
                </div>
                <div class="field-checkbox">
                  <input
                    id="relNoOpener"
                    v-model="relNoOpener"
                    type="checkbox"
                    @change="applyButtonAttributes"
                  />
                  <label for="relNoOpener">Rel: noopener</label>
                </div>
                <div class="field-checkbox">
                  <input
                    id="relNoReferrer"
                    v-model="relNoReferrer"
                    type="checkbox"
                    @change="applyButtonAttributes"
                  />
                  <label for="relNoReferrer">Rel: noreferrer</label>
                </div>
                <div class="field">
                  <div class="field-label">Biến thể</div>
                  <select
                    v-model="buttonVariant"
                    class="chip-select"
                    @change="applyButtonAttributes"
                  >
                    <option value="primary">Chính (Primary)</option>
                    <option value="secondary">Phụ (Secondary)</option>
                    <option value="outline">Viền (Outline)</option>
                  </select>
                </div>
                <div class="field">
                  <div class="field-label">Kích thước</div>
                  <select
                    v-model="buttonSize"
                    class="chip-select"
                    @change="applyButtonAttributes"
                  >
                    <option value="sm">Nhỏ (sm)</option>
                    <option value="md">Vừa (md)</option>
                    <option value="lg">Lớn (lg)</option>
                  </select>
                </div>
              </div>
            </div>
            <div
              v-if="
                (isHtmlComponent(selectedComponent) ||
                  isIframeComponent(selectedComponent)) &&
                matchesSearch('HTML', 'Code', 'Nội dung HTML')
              "
              class="setting-group"
            >
              <div class="group-header">
                <span>Mã HTML</span>
              </div>
              <div class="group-body">
                <div class="field">
                  <div class="field-label">Nội dung HTML</div>
                  <textarea
                    v-model="htmlContent"
                    class="chip-input"
                    rows="6"
                    @change="applyHtmlContent"
                  ></textarea>
                </div>
              </div>
            </div>
            <div
              v-if="isNavbarComponent(selectedComponent) &&
                matchesSearch('Navbar', 'Thanh điều hướng', 'Căn chỉnh', 'Justify', 'Dính', 'Sticky', 'Khoảng cách', 'Đệm', 'Bán kính', 'Nền', 'Màu nền')"
              class="setting-group"
            >
              <div class="group-header">
                <span>Thanh điều hướng (Navbar)</span>
              </div>
              <div class="group-body">
                <div class="field">
                  <div class="field-label">Căn chỉnh (Justify)</div>
                  <select
                    v-model="navJustify"
                    class="chip-select"
                    @change="applyNavbarSettings"
                  >
                    <option value="flex-start">Trái (Start)</option>
                    <option value="center">Giữa (Center)</option>
                    <option value="space-between">
                      Giãn cách (Space Between)
                    </option>
                    <option value="flex-end">Phải (End)</option>
                  </select>
                </div>
                <div class="field-checkbox">
                  <input
                    id="navSticky"
                    v-model="navSticky"
                    type="checkbox"
                    @change="applyNavbarSettings"
                  />
                  <label for="navSticky">Dính (Sticky)</label>
                </div>
                <div class="field">
                  <div class="field-label">Khoảng cách (px)</div>
                  <input
                    v-model.number="navGap"
                    class="chip-input"
                    type="number"
                    min="0"
                    @change="applyNavbarSettings"
                  />
                </div>
                <div class="field">
                  <div class="field-label">Đệm (px)</div>
                  <input
                    v-model.number="navPadding"
                    class="chip-input"
                    type="number"
                    min="0"
                    @change="applyNavbarSettings"
                  />
                </div>
                <div class="field">
                  <div class="field-label">Bán kính (px)</div>
                  <input
                    v-model.number="navRadius"
                    class="chip-input"
                    type="number"
                    min="0"
                    @change="applyNavbarSettings"
                  />
                </div>
                <div class="field">
                  <div class="field-label">Nền</div>
                  <div class="input-with-icon-left">
                    <div class="color-input-group">
                    <div
                      class="color-preview-small"
                      :style="{ backgroundColor: navBgColor }"
                    ></div>
                    <input
                      v-model="navBgColor"
                      class="chip-input pl-9"
                      type="text"
                      @change="applyNavbarSettings"
                    />
                    <div class="color-picker-container">
                      <input type="color" v-model="navBgColor" class="color-picker" @change="applyNavbarSettings" />
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div
              v-if="isHeroComponent(selectedComponent) &&
                matchesSearch('Hero', 'Phần đầu trang', 'Tiêu đề', 'Phụ đề', 'URL ảnh nền', 'Màu chữ', 'Màu lớp phủ', 'Độ mờ lớp phủ')"
              class="setting-group"
            >
              <div class="group-header">
                <span>Phần đầu trang (Hero)</span>
              </div>
              <div class="group-body">
                <div class="field">
                  <div class="field-label">Tiêu đề</div>
                  <input
                    v-model="heroTitle"
                    class="chip-input"
                    type="text"
                    @change="applyHeroSettings"
                  />
                </div>
                <div class="field">
                  <div class="field-label">Phụ đề</div>
                  <input
                    v-model="heroSubtitle"
                    class="chip-input"
                    type="text"
                    @change="applyHeroSettings"
                  />
                </div>
                <div class="field">
                  <div class="field-label">URL ảnh nền</div>
                  <div class="input-with-icon-right">
                    <input
                      v-model="heroBgUrl"
                      class="chip-input"
                      type="text"
                      @change="applyHeroSettings"
                    />
                    <button
                      class="icon-btn-right"
                      type="button"
                      title="Tải ảnh lên"
                      @click="
                        openAssetManager((url) => {
                          heroBgUrl = url;
                          applyHeroSettings();
                        })
                      "
                    >
                      <IconUpload size="14" />
                    </button>
                  </div>
                </div>
                <div class="field">
                  <div class="field-label">Màu chữ</div>
                  <div class="input-with-icon-left">
                    <div class="color-input-group">
                    <div
                      class="color-preview-small"
                      :style="{ backgroundColor: heroTextColor }"
                    ></div>
                    <input
                      v-model="heroTextColor"
                      class="chip-input pl-9"
                      type="text"
                      @change="applyHeroSettings"
                    />
                    <div class="color-picker-container">
                      <input type="color" v-model="heroTextColor" class="color-picker" @change="applyHeroSettings" />
                    </div>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <div class="field-label">Màu lớp phủ</div>
                  <div class="input-with-icon-left">
                    <div class="color-input-group">
                    <div
                      class="color-preview-small"
                      :style="{ backgroundColor: heroOverlayColor }"
                    ></div>
                    <input
                      v-model="heroOverlayColor"
                      class="chip-input pl-9"
                      type="text"
                      placeholder="vd: #000"
                      @change="applyHeroSettings"
                    />
                    <div class="color-picker-container">
                      <input type="color" v-model="heroOverlayColor" class="color-picker" @change="applyHeroSettings" />
                    </div>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <div class="field-label">Độ mờ lớp phủ</div>
                  <input
                    v-model.number="heroOverlayOpacity"
                    class="chip-input"
                    type="number"
                    min="0"
                    max="1"
                    step="0.05"
                    @change="applyHeroSettings"
                  />
                </div>
              </div>
            </div>
            <div
              v-if="isBackgroundImageComponent(selectedComponent) &&
                matchesSearch('Ảnh nền', 'Background', 'URL ảnh', 'Kích thước', 'Vị trí', 'Màu lớp phủ', 'Độ mờ lớp phủ', 'Zoom video')"
              class="setting-group"
            >
              <div class="group-header">
                <span>Ảnh nền</span>
              </div>
              <div class="group-body">
                <div class="field">
                  <div class="field-label">URL ảnh</div>
                  <div class="input-with-icon-right">
                    <input
                      v-model="bgImageUrl"
                      class="chip-input"
                      type="text"
                      placeholder="Đường dẫn ảnh"
                      @change="applyBgImageAttributes"
                    />
                    <button
                      class="icon-btn-right"
                      type="button"
                      title="Tải ảnh lên"
                      @click="
                        openAssetManager((url) => {
                          bgImageUrl = url;
                          applyBgImageAttributes();
                        })
                      "
                    >
                      <IconUpload size="14" />
                    </button>
                  </div>
                </div>
                <div class="field">
                  <div class="field-label">Kích thước</div>
                  <select
                    v-model="bgSize"
                    class="chip-select"
                    @change="applyBgImageAttributes"
                  >
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                <div class="field">
                  <div class="field-label">Vị trí</div>
                  <select
                    v-model="bgPosition"
                    class="chip-select"
                    @change="applyBgImageAttributes"
                  >
                    <option
                      v-for="opt in imagePositionOptions"
                      :key="opt"
                      :value="opt"
                    >
                      {{ opt }}
                    </option>
                  </select>
                </div>
                <div class="field">
                  <div class="field-label">Màu lớp phủ</div>
                  <div class="input-with-icon-left">
                    <div class="color-input-group">
                    <div
                      class="color-preview-small"
                      :style="{ backgroundColor: bgOverlayColor }"
                    ></div>
                    <input
                      v-model="bgOverlayColor"
                      class="chip-input pl-9"
                      type="text"
                      placeholder="vd: #000"
                      @change="applyBgImageAttributes"
                    />
                    <div class="color-picker-container">
                      <input type="color" v-model="bgOverlayColor" class="color-picker" @change="applyBgImageAttributes" />
                    </div>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <div class="field-label">Độ mờ lớp phủ</div>
                  <input
                    v-model.number="bgOverlayOpacity"
                    class="chip-input"
                    type="number"
                    min="0"
                    max="1"
                    step="0.05"
                    @change="applyBgImageAttributes"
                  />
                </div>
                <div class="field">
                  <div class="field-label">Zoom video (%)</div>
                  <input
                    v-model.number="bgVideoScale"
                    class="chip-input"
                    type="number"
                    min="0.5"
                    max="3"
                    step="0.1"
                    @change="applyBgImageAttributes"
                  />
                </div>
              </div>
            </div>
            <div
              v-if="isSliderComponent(selectedComponent) &&
                matchesSearch('Slider', 'Thanh trượt', 'Role', 'Mũi tên', 'Dấu chấm', 'Tự động phát', 'Khoảng thời gian', 'Dừng khi di chuột', 'Chuyển cảnh', 'Số slide', 'Easing', 'Tốc độ')"
              class="setting-group"
            >
              <div class="group-header">
                <span>Thanh trượt (Slider)</span>
              </div>
              <div class="group-body">
                <div class="field">
                  <div class="field-label">Chế độ Role</div>
                  <select
                    v-model="sliderRoleMode"
                    class="chip-select"
                    @change="applySliderSettings"
                  >
                    <option value="listbox">listbox</option>
                    <option value="tabs">tabs</option>
                  </select>
                </div>
                <div class="field">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      v-model="sliderShowArrows"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      @change="applySliderSettings"
                    />
                    <span class="text-sm text-gray-700">Hiện mũi tên</span>
                  </label>
                </div>
                <div class="field">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      v-model="sliderShowDots"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      @change="applySliderSettings"
                    />
                    <span class="text-sm text-gray-700">Hiện dấu chấm</span>
                  </label>
                </div>
                <div class="field">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      v-model="sliderAutoplay"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      @change="applySliderSettings"
                    />
                    <span class="text-sm text-gray-700">Tự động phát</span>
                  </label>
                </div>
                <div class="field">
                  <div class="field-label">Khoảng thời gian (ms)</div>
                  <input
                    v-model.number="sliderAutoplayInterval"
                    class="chip-input"
                    type="number"
                    min="500"
                    step="100"
                    @change="applySliderSettings"
                  />
                </div>
                <div class="field">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      v-model="sliderPauseOnHover"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      @change="applySliderSettings"
                    />
                    <span class="text-sm text-gray-700">Dừng khi di chuột</span>
                  </label>
                </div>
                <div class="field">
                  <div class="field-label">Chuyển cảnh</div>
                  <select
                    v-model="sliderTransition"
                    class="chip-select"
                    @change="applySliderSettings"
                  >
                    <option value="smooth">Smooth</option>
                    <option value="instant">Instant</option>
                  </select>
                </div>
                <div class="field">
                  <div class="field-label">Số slide hiển thị</div>
                  <select
                    v-model.number="sliderVisibleCount"
                    class="chip-select"
                    @change="applySliderSettings"
                  >
                    <option :value="1">1</option>
                    <option :value="2">2</option>
                    <option :value="3">3</option>
                    <option :value="4">4</option>
                  </select>
                </div>
                <div class="field">
                  <div class="field-label">Kiểu chuyển động (Easing)</div>
                  <select
                    v-model="sliderEasing"
                    class="chip-select"
                    @change="applySliderSettings"
                  >
                    <option value="ease">Ease</option>
                    <option value="ease-in">Ease In</option>
                    <option value="ease-out">Ease Out</option>
                    <option value="ease-in-out">Ease In Out</option>
                    <option value="linear">Linear</option>
                  </select>
                </div>
                <div class="field">
                  <div class="field-label">Tốc độ (ms)</div>
                  <input
                    v-model.number="sliderSpeed"
                    class="chip-input"
                    type="number"
                    min="100"
                    step="20"
                    @change="applySliderSettings"
                  />
                </div>
              </div>
            </div>
            <div
              v-if="isGalleryComponent(selectedComponent) &&
                matchesSearch('Gallery', 'Thư viện ảnh', 'Cột', 'Khoảng cách')"
              class="setting-group"
            >
              <div class="group-header">
                <span>Thư viện ảnh (Gallery)</span>
              </div>
              <div class="group-body">
                <div class="field">
                  <div class="field-label">Cột</div>
                  <select
                    v-model.number="galleryColumns"
                    class="chip-select"
                    @change="applyGallerySettings"
                  >
                    <option :value="1">1</option>
                    <option :value="2">2</option>
                    <option :value="3">3</option>
                    <option :value="4">4</option>
                  </select>
                </div>
                <div class="field">
                  <div class="field-label">Khoảng cách (px)</div>
                  <input
                    v-model.number="galleryGap"
                    class="chip-input"
                    type="number"
                    min="0"
                    @change="applyGallerySettings"
                  />
                </div>
              </div>
            </div>
            <div
              v-if="isAccordionComponent(selectedComponent) &&
                matchesSearch('Accordion', 'Cho phép mở nhiều', 'Hiệu ứng động', 'Thời gian')"
              class="setting-group"
            >
              <div class="group-header">
                <span>Accordion</span>
              </div>
              <div class="group-body">
                <div class="field">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      v-model="accordionMultiple"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      @change="applyAccordionSettings"
                    />
                    <span class="text-sm text-gray-700">Cho phép mở nhiều</span>
                  </label>
                </div>
                <div class="field">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      v-model="accordionAnimate"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      @change="applyAccordionSettings"
                    />
                    <span class="text-sm text-gray-700">Hiệu ứng động</span>
                  </label>
                </div>
                <div class="field">
                  <div class="field-label">Thời gian (ms)</div>
                  <input
                    v-model.number="accordionDuration"
                    class="chip-input"
                    type="number"
                    min="0"
                    step="40"
                    @change="applyAccordionSettings"
                  />
                </div>
              </div>
            </div>
            <div
              v-if="isFormComponent(selectedComponent) &&
                matchesSearch('Form', 'Trường nhập liệu', 'Văn bản', 'Số', 'Lựa chọn', 'Chấp nhận', 'Radio', 'Xác thực')"
              class="setting-group ui-form"
            >
              <div class="group-header">
                <span>Trường nhập liệu</span>
              </div>
              <div class="group-body">
                <form ref="uiFormRef" @submit.prevent="validateUiForm">
                  <div class="field">
                    <div class="field-label">Văn bản</div>
                    <input v-model="uiText" class="chip-input" type="text" />
                  </div>
                  <div class="field">
                    <div class="field-label">Số</div>
                    <input
                      v-model.number="uiNumber"
                      class="chip-input"
                      type="number"
                    />
                  </div>
                  <div class="field">
                    <div class="field-label">Lựa chọn</div>
                    <select v-model="uiSelect" class="chip-select">
                      <option
                        v-for="item in uiSelectItems"
                        :key="item"
                        :value="item"
                      >
                        {{ item }}
                      </option>
                    </select>
                  </div>
                  <div class="field">
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input
                        v-model="uiCheck"
                        type="checkbox"
                        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span class="text-sm text-gray-700">Chấp nhận</span>
                    </label>
                  </div>
                  <div class="field">
                    <div class="field-label">Radio</div>
                    <div class="flex flex-col gap-2">
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input
                          v-model="uiRadio"
                          type="radio"
                          value="A"
                          class="border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span class="text-sm text-gray-700">A</span>
                      </label>
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input
                          v-model="uiRadio"
                          type="radio"
                          value="B"
                          class="border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span class="text-sm text-gray-700">B</span>
                      </label>
                    </div>
                  </div>
                  <div class="mt-3">
                    <button
                      type="submit"
                      class="w-full rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Xác thực
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div
            v-if="rightTab === 'interactions'"
            id="inspector-panel-interactions"
            role="tabpanel"
            aria-labelledby="inspector-tab-interactions"
            tabindex="0"
            class="settings-section"
          >
            <p
              v-if="sidebarSearch && !hasInteractionSearchMatches()"
              class="inspector__hint"
            >
              Không tìm thấy tương tác phù hợp. Thử tìm “sự kiện”, “JavaScript” hoặc chọn một nút/liên kết.
            </p>
            <div
              v-if="matchesSearch('Sự kiện', 'Events', 'Hành động', 'JavaScript')"
              class="setting-group"
            >
              <div class="group-header">
                <span>Sự kiện tương tác</span>
              </div>
              <div class="group-body">
                <p class="inspector__hint">
                  Thiết lập hành vi khi người dùng tương tác với phần tử đang chọn.
                </p>
                <div class="field">
                  <div class="field-label">Sự kiện kích hoạt</div>
                  <select
                    v-model="eventType"
                    class="chip-select"
                    @change="applyEvents"
                  >
                    <option value="none">Không</option>
                    <option value="click">Nhấp chuột</option>
                    <option value="mouseenter">Di chuột vào</option>
                    <option value="mouseleave">Di chuột ra</option>
                  </select>
                </div>
                <div class="field">
                  <div class="field-label">Hành động JavaScript</div>
                  <input
                    v-model="eventAction"
                    class="chip-input"
                    type="text"
                    placeholder="alert('Hello')"
                    @change="applyEvents"
                  />
                  <p class="inspector__hint">
                    Chỉ nhập mã cho phần tử tin cậy; hãy kiểm tra hành vi trước khi xuất bản.
                  </p>
                </div>
              </div>
            </div>
            <div
              v-if="
                (isButtonComponent(selectedComponent) ||
                  hasLinkInSelection(selectedComponent)) &&
                matchesSearch('Liên kết', 'Link', 'Nút', 'Button', 'URL')
              "
              class="setting-group"
            >
              <div class="group-header">
                <span>Liên kết và nút</span>
              </div>
              <div class="group-body">
                <p class="inspector__hint">
                  URL, mục tiêu và thuộc tính liên kết được quản lý trong tab Cài đặt.
                </p>
                <button
                  class="chip"
                  type="button"
                  @click="rightTab = 'settings'"
                >
                  Mở cài đặt liên kết
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
  <div
    v-if="showHeaderModal"
    style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    "
    @click.self="closeHeaderModal"
  >
    <div
      style="
        background: white;
        border-radius: 8px;
        overflow: hidden;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        width: 600px;
        height: 500px;
      "
    >
      <div
        style="
          padding: 16px 24px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f9fafb;
        "
      >
        <div
          style="
            font-size: 16px;
            font-weight: 600;
            color: #111827;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          "
        >
          Xem trước Header
        </div>
        <button type="button" style="color: #9ca3af" @click="closeHeaderModal">
          <IconMenu2 size="20" style="transform: rotate(45deg)" />
        </button>
      </div>

      <div
        style="
          padding: 0;
          flex: 1;
          overflow: hidden;
          background: #f3f4f6;
          position: relative;
        "
      >
        <div
          class="preview-frame"
          style="width: 100%; height: 100%; overflow: hidden"
        >
          <iframe
            class="preview-html"
            :srcdoc="selectedHeaderTpl?.html || ''"
            style="width: 100%; height: 100%; border: 0"
            sandbox="allow-scripts allow-same-origin"
          ></iframe>
          <div ref="headerModalStyleHost"></div>
        </div>
      </div>

      <div
        style="
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
        "
      >
        <div style="flex: 1; display: flex; gap: 12px; align-items: center">
          <select
            v-model="headerPreset"
            class="chip-select"
            style="width: 140px"
          >
            <option value="None">Không</option>
            <option value="Brand">Thương hiệu</option>
            <option value="Dark">Tối</option>
            <option value="Light">Sáng</option>
          </select>

          <label
            style="
              display: flex;
              align-items: center;
              gap: 8px;
              font-size: 14px;
              user-select: none;
              cursor: pointer;
            "
          >
            <input
              v-model="isHeaderApplyChecked"
              type="checkbox"
              style="width: 16px; height: 16px"
            />
            Áp dụng mẫu này
          </label>
        </div>

        <button class="chip" type="button" @click="closeHeaderModal">
          Hủy
        </button>
        <button
          class="chip"
          type="button"
          style="background: #2563eb; color: white; border-color: #2563eb"
          :disabled="!isHeaderApplyChecked || !selectedHeaderTpl"
          @click="applySelectedHeader"
        >
          Áp dụng
        </button>
      </div>
    </div>
  </div>
  <PageSeoDialog
    v-model="showPageDialog"
    v-model:site-title="siteTitle"
    v-model:site-subtitle="siteSubtitle"
    v-model:site-logo-url="siteLogoUrl"
    v-model:seo-meta="seoMeta"
    v-model:page-canonical="pageCanonical"
    v-model:page-favicon-url="pageFaviconUrl"
    v-model:page-lang="pageLang"
    @open-asset-picker="openAssetPicker"
    @apply-global-site-settings="applyGlobalSiteSettings"
    @apply-page-meta="applyPageMeta"
  />
  <!-- Import Dialog -->
  <div
    v-if="showImportDialog"
    style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    "
    @click.self="showImportDialog = false"
  >
    <div
      style="
        background: white;
        border-radius: 8px;
        overflow: hidden;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        width: 640px;
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      "
    >
      <!-- Header -->
      <div
        style="
          padding: 16px 24px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f9fafb;
        "
      >
        <div
          style="
            font-size: 16px;
            font-weight: 600;
            color: #111827;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          "
        >
          Nhập Website
        </div>
        <button
          type="button"
          style="
            color: #9ca3af;
            cursor: pointer;
            border: none;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 4px;
          "
          class="hover:bg-gray-100"
          @click="showImportDialog = false"
        >
          <IconMenu2 size="20" style="transform: rotate(45deg)" />
        </button>
      </div>

      <!-- Tabs -->
      <div
        style="
          padding: 0 24px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          gap: 24px;
        "
      >
        <button
          type="button"
          style="
            padding: 16px 0;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            background: none;
            border: none;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            transition: all 0.2s;
          "
          :style="{
            color: importTab === 'url' ? '#2563eb' : '#374151',
            borderBottomColor: importTab === 'url' ? '#2563eb' : 'transparent',
          }"
          @click="importTab = 'url'"
        >
          Từ URL
        </button>
        <button
          type="button"
          style="
            padding: 16px 0;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            background: none;
            border: none;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            transition: all 0.2s;
          "
          :style="{
            color: importTab === 'file' ? '#2563eb' : '#374151',
            borderBottomColor: importTab === 'file' ? '#2563eb' : 'transparent',
          }"
          @click="importTab = 'file'"
        >
          Tải file lên (ZIP/HTML)
        </button>
      </div>

      <!-- Content -->
      <div style="padding: 24px; overflow-y: auto">
        <!-- URL Tab -->
        <div v-if="importTab === 'url'">
          <div style="margin-bottom: 16px">
            <label
              style="
                display: block;
                font-size: 13px;
                font-weight: 500;
                color: #374151;
                margin-bottom: 6px;
              "
            >
              URL Website
            </label>
            <input
              v-model="importUrl"
              type="text"
              placeholder="https://example.com"
              style="
                width: 100%;
                height: 38px;
                padding: 0 12px;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                font-size: 14px;
                color: #111827;
                outline: none;
                transition:
                  border-color 0.15s,
                  box-shadow 0.15s;
              "
              class="input-focus"
              @keyup.enter="runImportFromUrl"
            />
          </div>
        </div>

        <!-- File Tab -->
        <div v-if="importTab === 'file'">
          <div style="margin-bottom: 16px">
            <label
              style="
                display: block;
                font-size: 13px;
                font-weight: 500;
                color: #374151;
                margin-bottom: 6px;
              "
            >
              Chọn file (ZIP hoặc HTML)
            </label>
            <label
              style="
                border: 1px dashed #d1d5db;
                border-radius: 6px;
                padding: 24px;
                text-align: center;
                background: #f9fafb;
                cursor: pointer;
                transition:
                  border-color 0.2s,
                  background-color 0.2s;
                display: block;
              "
              class="hover:bg-gray-50 hover:border-blue-500"
              for="wb-import-file-input"
            >
              <input
                id="wb-import-file-input"
                type="file"
                accept=".zip,.html,.htm"
                style="display: none"
                @change="
                  (e: any) => {
                    importFile = Array.from(e.target.files);
                  }
                "
              />
              <div style="margin-bottom: 8px; color: #6b7280">
                <IconUpload size="24" />
              </div>
              <div
                style="
                  font-size: 14px;
                  font-weight: 500;
                  color: #374151;
                  margin-bottom: 4px;
                "
              >
                <span v-if="importFile && importFile.length > 0">{{
                  importFile[0].name
                }}</span>
                <span v-else>Click để chọn file</span>
              </div>
              <div style="font-size: 12px; color: #9ca3af">
                Hỗ trợ .zip, .html, .htm
              </div>
            </label>
            <div
              style="
                margin-top: 12px;
                font-size: 13px;
                color: #6b7280;
                line-height: 1.5;
              "
            >
              Upload file ZIP chứa toàn bộ mã nguồn (HTML, CSS, JS, Images) để
              import đầy đủ cấu trúc. Hoặc upload file HTML đơn lẻ.
            </div>
          </div>
        </div>

        <div
          v-if="importError"
          style="
            margin-top: 12px;
            font-size: 13px;
            color: #ef4444;
            background: #fee2e2;
            padding: 8px 12px;
            border-radius: 6px;
          "
        >
          {{ importError }}
        </div>
      </div>

      <!-- Footer -->
      <div
        style="
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          background: #f9fafb;
          gap: 12px;
        "
      >
        <button
          type="button"
          style="
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            background: white;
            border: 1px solid #d1d5db;
            cursor: pointer;
            transition: all 0.2s;
          "
          class="hover:bg-gray-50 hover:border-gray-400"
          @click="showImportDialog = false"
        >
          Đóng
        </button>
        <button
          type="button"
          style="
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            color: white;
            background: #2563eb;
            border: 1px solid transparent;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
          "
          class="hover:bg-blue-600"
          :disabled="importing"
          @click="
            importTab === 'url' ? runImportFromUrl() : runImportFromFile()
          "
        >
          <span v-if="importing" class="spinner-sm"></span>
          <span>{{ importing ? "Đang nhập..." : "Nhập" }}</span>
        </button>
      </div>
    </div>
  </div>
  <!-- Help Dialog -->
  <HelpDialog v-model="showHelpDialog" />
  <!-- Placeholder Keys Help Dialog -->
  <div
    v-if="showPlaceholderHelpDialog"
    style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    "
    @click.self="showPlaceholderHelpDialog = false"
  >
    <div
      style="
        background: white;
        border-radius: 12px;
        overflow: hidden;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 900px;
        box-shadow:
          0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
      "
    >
      <div
        style="
          padding: 16px 24px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        "
      >
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #2563eb, #3b82f6); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
            <IconKey size="18" style="color: white;" />
          </div>
          <div>
            <div style="font-size: 16px; font-weight: 700; color: #111827;">Các Key Động Cho Sự Kiện</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">{{ filteredKeys.length }} key khả dụng • Click để copy</div>
          </div>
        </div>
        <button
          type="button"
          style="
            color: #6b7280;
            cursor: pointer;
            border: none;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 8px;
            transition: all 0.2s;
          "
          class="hover:bg-gray-200 hover:text-374151"
          @click="showPlaceholderHelpDialog = false"
          title="Đóng"
        >
          <IconX size="20" />
        </button>
      </div>
      <div style="padding: 20px 24px; overflow-y: auto; flex: 1;">
        <div style="display: flex; gap: 16px; margin-bottom: 20px; flex-wrap: wrap;">
          <!-- Search Box -->
          <div style="flex: 1; min-width: 200px; position: relative;">
            <IconSearch style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #9ca3af; width: 18px; height: 18px;" />
            <input
              v-model="searchKey"
              placeholder="Tìm kiếm tên key, mô tả..."
              style="width: 100%; padding: 10px 12px 10px 40px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; background: #fafafa;"
            />
          </div>
          <!-- Category Filter -->
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <button
              v-for="cat in categories"
              :key="cat.name"
              :class="['px-3 py-1.5 rounded-full text-xs font-medium transition-all', categoryFilter === cat.name ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200']"
              @click="categoryFilter = categoryFilter === cat.name ? '' : cat.name"
              style="border: none; cursor: pointer;"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>

        <p
          style="
            font-size: 12px;
            color: #6b7280;
            margin: 0 0 16px;
            line-height: 1.5;
            padding: 10px 12px;
            background: #fef3c7;
            border-radius: 6px;
            border: 1px solid #fcd34d;
          "
        >
          <IconInfoCircle size="14" style="vertical-align: middle; margin-right: 6px;" />
          <strong>Lưu ý:</strong> Các key <code style="background: #fde68a; padding: 1px 4px; border-radius: 3px;">[ev_*]</code> dùng cho website sự kiện, key <code style="background: #fde68a; padding: 1px 4px; border-radius: 3px;">[ticket_*]</code> chỉ dùng trong email/quét vé. Key <code style="background: #fde68a; padding: 1px 4px; border-radius: 3px;">[company_*]</code> lấy từ cài đặt công ty.
        </p>

        <!-- Key Categories -->
        <template v-if="categories && categories.length > 0">
        <template v-for="category in (categories as { name: string, label: string }[])">
          <div :key="category.name" class="key-category" v-if="getKeysByCategory(category?.name).length > 0">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb;">
            <span style="font-size: 15px; font-weight: 600; color: #111827;">{{ category.label }}</span>
            <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">{{ getKeysByCategory(category.name).length }}</span>
          </div>
          <div
            v-for="key in getKeysByCategory(category?.name)"
            :key="key?.name"
            style="display: grid; grid-template-columns: 1fr 2fr 2fr; gap: 12px; padding: 10px 8px; border-bottom: 1px solid #f3f4f6; align-items: center; transition: background 0.15s;"
            class="hover:bg-gray-50 rounded-lg"
            @mouseenter="hoveredKey = key.name"
            @mouseleave="hoveredKey = null"
          >
            <div style="display: flex; align-items: center; gap: 8px;">
              <code
                class="key-code"
                :style="[
                  'font-family: \'JetBrains Mono\', \'Fira Code\', \'Monaco\', \'Courier New\', monospace; background: ' + (hoveredKey === key.name ? '#dbeafe' : '#f3f4f6') + '; padding: 6px 10px; border-radius: 6px; font-size: 13px; color: #1e40af; cursor: pointer; border: 1px solid ' + (hoveredKey === key.name ? '#bfdbfe' : '#e5e7eb') + '; transition: all 0.15s; min-width: 140px; text-align: center; font-weight: 500;'
                ]"
                @click="copyToClipboard(key.name)"
                :title="hoveredKey === key.name ? 'Đã copy!' : 'Click để copy'"
              >
              {{ key.name }}
            </code>
              <IconCopy v-if="hoveredKey === key.name" size="14" style="color: #10b981; animation: popIn 0.2s ease;" />
              <IconCheck v-else-if="copiedKeys.has(key.name)" size="14" style="color: #10b981;" />
            </div>
            <span style="font-size: 13px; color: #4b5563; line-height: 1.5;">{{ key.description }}</span>
            <span style="font-size: 12px; color: #9ca3af; font-style: italic; font-family: 'JetBrains Mono', monospace;">{{ key.example }}</span>
          </div>
        </div>
        </template>
        </template>
      </div>
      <div
        style="
          padding: 14px 24px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          background: #f9fafb;
        "
      >
        <button
          type="button"
          style="
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            background: white;
            border: 1px solid #d1d5db;
            cursor: pointer;
            transition: all 0.2s;
          "
          class="hover:bg-gray-50 hover:border-gray-400"
          @click="showPlaceholderHelpDialog = false"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
  


  <!-- SEO Dialog merged into Page Settings -->

  <!-- Event Picker Dialog -->
  <div
    v-if="showEventPickerDialog"
    style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    "
    @click.self="showEventPickerDialog = false"
  >
    <div
      style="
        background: white;
        border-radius: 8px;
        overflow: hidden;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        width: 600px;
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      "
    >
      <!-- Header -->
      <div
        style="
          padding: 16px 24px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f9fafb;
        "
      >
        <div
          style="
            font-size: 16px;
            font-weight: 600;
            color: #111827;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          "
        >
          Chọn sự kiện
        </div>
        <button
          type="button"
          style="
            color: #9ca3af;
            cursor: pointer;
            border: none;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 4px;
          "
          class="hover:bg-gray-100"
          @click="showEventPickerDialog = false"
        >
          <IconMenu2 size="20" style="transform: rotate(45deg)" />
        </button>
      </div>

      <!-- Content -->
      <div
        style="
          padding: 0;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
        "
      >
        <div
          style="flex: 1; overflow-y: auto; border-bottom: 1px solid #e5e7eb"
        >
          <div v-if="companyEvents.length > 0">
            <div
              v-for="evt in companyEvents"
              :key="evt.id"
              style="
                padding: 16px 24px;
                border-bottom: 1px solid #f3f4f6;
                cursor: pointer;
                transition: background-color 0.15s;
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
              :class="{
                'bg-blue-50':
                  selectedEventForInsert &&
                  selectedEventForInsert.id === evt.id,
                'hover:bg-gray-50':
                  !selectedEventForInsert ||
                  selectedEventForInsert.id !== evt.id,
              }"
              @click="selectEventToInsert(evt)"
            >
              <div style="flex: 1">
                <div
                  style="
                    font-size: 15px;
                    font-weight: 500;
                    color: #111827;
                    margin-bottom: 4px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                  "
                >
                  <IconCheck
                    v-if="
                      selectedEventForInsert &&
                      selectedEventForInsert.id === evt.id
                    "
                    size="18"
                    class="text-blue-600"
                  />
                  {{ evt.name }}
                </div>
                <div
                  :style="{
                    fontSize: '13px',
                    color: '#6b7280',
                    marginLeft:
                      selectedEventForInsert &&
                      selectedEventForInsert.id === evt.id
                        ? '26px'
                        : '0',
                  }"
                >
                  {{ new Date(evt.startDate).toLocaleDateString("vi-VN") }}
                </div>
              </div>
              <div>
                <span
                  style="
                    font-size: 12px;
                    font-weight: 500;
                    background: #eff6ff;
                    color: #2563eb;
                    padding: 4px 10px;
                    border-radius: 999px;
                  "
                >
                  {{ evt.tickets?.length || 0 }} loại vé
                </span>
              </div>
            </div>
          </div>
          <div
            v-else
            style="
              padding: 32px;
              text-align: center;
              color: #6b7280;
              font-size: 14px;
            "
          >
            Không có sự kiện nào.
          </div>
        </div>

        <!-- Style Selection -->
        <div
          v-if="selectedEventForInsert"
          style="
            padding: 24px;
            background: #f9fafb;
            border-bottom: 1px solid #e5e7eb;
          "
        >
          <div
            style="
              font-size: 14px;
              font-weight: 600;
              color: #374151;
              margin-bottom: 12px;
            "
          >
            Chọn kiểu hiển thị
          </div>
          <div
            style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px"
          >
            <!-- Horizontal Style -->
            <div
              style="
                cursor: pointer;
                border: 2px solid;
                border-radius: 8px;
                overflow: hidden;
                transition: all 0.2s;
              "
              :style="{
                borderColor:
                  selectedEventStyle === 'horizontal' ? '#2563eb' : '#e5e7eb',
              }"
              @click="selectedEventStyle = 'horizontal'"
            >
              <div
                style="
                  height: 80px;
                  background: #fff;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 10px;
                "
              >
                <div
                  style="
                    width: 100%;
                    height: 100%;
                    display: flex;
                    gap: 8px;
                    align-items: center;
                  "
                >
                  <div
                    style="
                      width: 40%;
                      height: 100%;
                      background: #e2e8f0;
                      border-radius: 4px;
                    "
                  ></div>
                  <div
                    style="
                      flex: 1;
                      display: flex;
                      flex-direction: column;
                      gap: 4px;
                    "
                  >
                    <div
                      style="
                        height: 6px;
                        width: 80%;
                        background: #cbd5e1;
                        border-radius: 2px;
                      "
                    ></div>
                    <div
                      style="
                        height: 6px;
                        width: 60%;
                        background: #e2e8f0;
                        border-radius: 2px;
                      "
                    ></div>
                  </div>
                </div>
              </div>
              <div
                style="
                  padding: 8px;
                  font-size: 12px;
                  font-weight: 500;
                  text-align: center;
                  background: #fff;
                  border-top: 1px solid #f3f4f6;
                "
                :style="{
                  color:
                    selectedEventStyle === 'horizontal' ? '#2563eb' : '#64748b',
                }"
              >
                Ngang
              </div>
            </div>

            <!-- Vertical Style -->
            <div
              style="
                cursor: pointer;
                border: 2px solid;
                border-radius: 8px;
                overflow: hidden;
                transition: all 0.2s;
              "
              :style="{
                borderColor:
                  selectedEventStyle === 'vertical' ? '#2563eb' : '#e5e7eb',
              }"
              @click="selectedEventStyle = 'vertical'"
            >
              <div
                style="
                  height: 80px;
                  background: #fff;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 10px;
                "
              >
                <div
                  style="
                    width: 60px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                  "
                >
                  <div
                    style="
                      width: 100%;
                      height: 40px;
                      background: #e2e8f0;
                      border-radius: 4px;
                    "
                  ></div>
                  <div
                    style="
                      height: 6px;
                      width: 100%;
                      background: #cbd5e1;
                      border-radius: 2px;
                    "
                  ></div>
                  <div
                    style="
                      height: 6px;
                      width: 70%;
                      background: #e2e8f0;
                      border-radius: 2px;
                      margin: 0 auto;
                    "
                  ></div>
                </div>
              </div>
              <div
                style="
                  padding: 8px;
                  font-size: 12px;
                  font-weight: 500;
                  text-align: center;
                  background: #fff;
                  border-top: 1px solid #f3f4f6;
                "
                :style="{
                  color:
                    selectedEventStyle === 'vertical' ? '#2563eb' : '#64748b',
                }"
              >
                Dọc
              </div>
            </div>

            <!-- Card Style -->
            <div
              style="
                cursor: pointer;
                border: 2px solid;
                border-radius: 8px;
                overflow: hidden;
                transition: all 0.2s;
              "
              :style="{
                borderColor:
                  selectedEventStyle === 'card' ? '#2563eb' : '#e5e7eb',
              }"
              @click="selectedEventStyle = 'card'"
            >
              <div
                style="
                  height: 80px;
                  background: #fff;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 10px;
                "
              >
                <div
                  style="
                    width: 50px;
                    height: 100%;
                    border: 1px solid #e2e8f0;
                    border-radius: 4px;
                    display: flex;
                    flex-direction: column;
                  "
                >
                  <div style="height: 30px; background: #e2e8f0"></div>
                  <div
                    style="
                      padding: 4px;
                      display: flex;
                      flex-direction: column;
                      gap: 3px;
                    "
                  >
                    <div
                      style="height: 4px; width: 80%; background: #cbd5e1"
                    ></div>
                    <div
                      style="height: 4px; width: 60%; background: #e2e8f0"
                    ></div>
                  </div>
                </div>
              </div>
              <div
                style="
                  padding: 8px;
                  font-size: 12px;
                  font-weight: 500;
                  text-align: center;
                  background: #fff;
                  border-top: 1px solid #f3f4f6;
                "
                :style="{
                  color: selectedEventStyle === 'card' ? '#2563eb' : '#64748b',
                }"
              >
                Thẻ (Card)
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div
        style="
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 12px;
          background: #fff;
        "
      >
        <button
          type="button"
          style="
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            background: white;
            border: 1px solid #d1d5db;
            cursor: pointer;
            transition: all 0.2s;
          "
          class="hover:bg-gray-50 hover:border-gray-400"
          @click="showEventPickerDialog = false"
        >
          Hủy
        </button>
        <button
          type="button"
          :disabled="!selectedEventForInsert"
          style="
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            color: white;
            background: #2563eb;
            border: 1px solid #2563eb;
            cursor: pointer;
            transition: all 0.2s;
          "
          :style="{
            opacity: !selectedEventForInsert ? 0.5 : 1,
            cursor: !selectedEventForInsert ? 'not-allowed' : 'pointer',
          }"
          class="hover:bg-blue-700"
          @click="confirmInsertEvent"
        >
          Chèn sự kiện
        </button>
      </div>
    </div>
  </div>

  <!-- Header Picker Dialog -->
  <div
    v-if="showHeaderPickerDialog"
    style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    "
    @click.self="showHeaderPickerDialog = false"
  >
    <div
      style="
        background: white;
        border-radius: 8px;
        overflow: hidden;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        width: 640px;
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      "
    >
      <!-- Header -->
      <div
        style="
          padding: 16px 24px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f9fafb;
        "
      >
        <div
          style="
            font-size: 16px;
            font-weight: 600;
            color: #111827;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          "
        >
          Chọn mẫu Đầu trang (Header)
        </div>
        <button
          type="button"
          style="
            color: #9ca3af;
            cursor: pointer;
            border: none;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 4px;
          "
          class="hover:bg-gray-100"
          @click="showHeaderPickerDialog = false"
        >
          <IconMenu2 size="20" style="transform: rotate(45deg)" />
        </button>
      </div>

      <!-- Content -->
      <div style="padding: 24px; overflow-y: auto">
        <div
          v-if="showHeaderControls"
          class="popup-search"
          style="margin-bottom: 16px"
        >
          <input
            v-model="headerSearchQuery"
            type="text"
            placeholder="Tìm kiếm mẫu"
            style="
              width: 100%;
              height: 38px;
              padding: 0 12px;
              border: 1px solid #d1d5db;
              border-radius: 6px;
              font-size: 14px;
              color: #111827;
              outline: none;
              transition:
                border-color 0.15s,
                box-shadow 0.15s;
            "
            class="input-focus"
          />
        </div>
        <div
          class="popup-categories"
          style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px"
        >
          <button
            v-for="c in headerCategories"
            :key="c"
            class="category-btn"
            :class="{ active: currentHeaderCategory === c }"
            style="
              padding: 6px 12px;
              border-radius: 999px;
              font-size: 13px;
              font-weight: 500;
              border: 1px solid #e5e7eb;
              background: white;
              color: #374151;
              cursor: pointer;
              transition: all 0.2s;
            "
            :style="
              currentHeaderCategory === c
                ? 'background: #eff6ff; color: #2563eb; border-color: #bfdbfe;'
                : ''
            "
            @click="currentHeaderCategory = c"
          >
            {{ c }}
          </button>
        </div>
        <div
          class="template-grid"
          style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
          "
        >
          <div
            v-for="tpl in paginatedHeaderTemplates"
            :key="tpl.id"
            class="template-card"
            role="button"
            tabindex="0"
            style="
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              overflow: hidden;
              cursor: pointer;
              transition: all 0.2s;
              background: white;
            "
            @click="
              selectHeaderTemplate(tpl);
              showHeaderPickerDialog = false;
            "
            @keydown.enter="
              selectHeaderTemplate(tpl);
              showHeaderPickerDialog = false;
            "
          >
            <div
              class="template-thumbnail"
              style="
                width: 100%;
                aspect-ratio: 16/9;
                background: #f3f4f6;
                overflow: hidden;
                position: relative;
              "
            >
              <div
                v-if="headerThumbLoading[tpl.id]"
                class="thumb-skeleton"
                style="
                  width: 100%;
                  height: 100%;
                  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                  background: #e5e7eb;
                "
              ></div>
              <img
                v-else
                :src="tpl.thumbnail"
                alt="preview"
                style="width: 100%; height: 100%; object-fit: cover"
                loading="lazy"
                @load="onHeaderThumbLoad(tpl.id)"
              />
            </div>
            <div
              class="template-name"
              style="
                padding: 12px;
                font-size: 13px;
                font-weight: 500;
                color: #374151;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              {{ tpl.name }}
            </div>
          </div>
        </div>
        <div
          v-if="showHeaderControls"
          class="popup-pagination"
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 16px;
          "
        >
          <button
            type="button"
            :disabled="headerCurrentPage <= 1"
            style="
              padding: 6px 12px;
              border-radius: 6px;
              font-size: 13px;
              font-weight: 500;
              border: 1px solid #d1d5db;
              background: white;
              color: #374151;
              cursor: pointer;
            "
            :style="
              headerCurrentPage <= 1 ? 'opacity: 0.5; cursor: not-allowed;' : ''
            "
            @click="headerCurrentPage = Math.max(1, headerCurrentPage - 1)"
          >
            Trước
          </button>
          <span class="page-label" style="font-size: 13px; color: #6b7280">
            {{ headerCurrentPage }} / {{ headerTotalPages }}
          </span>
          <button
            type="button"
            :disabled="headerCurrentPage >= headerTotalPages"
            style="
              padding: 6px 12px;
              border-radius: 6px;
              font-size: 13px;
              font-weight: 500;
              border: 1px solid #d1d5db;
              background: white;
              color: #374151;
              cursor: pointer;
            "
            :style="
              headerCurrentPage >= headerTotalPages
                ? 'opacity: 0.5; cursor: not-allowed;'
                : ''
            "
            @click="
              headerCurrentPage = Math.min(
                headerTotalPages,
                headerCurrentPage + 1,
              )
            "
          >
            Sau
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div
        style="
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          background: #f9fafb;
        "
      >
        <button
          type="button"
          style="
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            background: white;
            border: 1px solid #d1d5db;
            cursor: pointer;
            transition: all 0.2s;
          "
          class="hover:bg-gray-50 hover:border-gray-400"
          @click="showHeaderPickerDialog = false"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
  <div
    v-if="showExportCodeDialog"
    style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    "
    @click.self="closeExportCodeDialog"
  >
    <div
      style="
        background: white;
        border-radius: 8px;
        overflow: hidden;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        width: 800px;
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      "
    >
      <div
        style="
          padding: 16px 24px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f9fafb;
        "
      >
        <div
          style="
            font-size: 16px;
            font-weight: 600;
            color: #111827;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          "
        >
          Xem mã xuất
        </div>
        <button
          type="button"
          style="
            color: #9ca3af;
            cursor: pointer;
            border: none;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 4px;
          "
          class="hover:bg-gray-100"
          @click="closeExportCodeDialog"
        >
          <IconMenu2 size="20" style="transform: rotate(45deg)" />
        </button>
      </div>

      <div style="padding: 24px; overflow-y: auto; flex: 1">
        <div class="field">
          <div class="field-label">Nguồn xuất</div>
          <select
            v-model="exportMode"
            class="chip-select"
            @change="buildExportCode"
          >
            <option value="grapes">GrapesJS</option>
            <option value="canvas">Canvas</option>
          </select>
        </div>
        <div class="field">
          <div class="field-label">HTML</div>
          <textarea
            v-model="exportHtml"
            class="chip-input"
            rows="10"
            readonly
            style="font-family: monospace; font-size: 12px"
          ></textarea>
        </div>
        <div class="field">
          <div class="field-label">CSS</div>
          <textarea
            v-model="exportCss"
            class="chip-input"
            rows="10"
            readonly
            style="font-family: monospace; font-size: 12px"
          ></textarea>
        </div>
        <div class="field">
          <div class="field-label">JS</div>
          <textarea
            v-model="exportJs"
            class="chip-input"
            rows="10"
            readonly
            style="font-family: monospace; font-size: 12px"
          ></textarea>
        </div>
      </div>

      <div
        style="
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          justify-content: flex-end;
          background: #f9fafb;
        "
      >
        <button class="chip" type="button" @click="closeExportCodeDialog">
          Đóng
        </button>
      </div>
    </div>
  </div>
  <div
    v-if="showSuperTemplatesDialog"
    style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    "
    @click.self="showSuperTemplatesDialog = false"
  >
    <div
      style="
        background: white;
        border-radius: 8px;
        overflow: hidden;
        max-height: 85vh;
        display: flex;
        flex-direction: column;
        width: 1000px;
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      "
    >
      <div
        style="
          padding: 16px 24px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f9fafb;
        "
      >
        <div
          style="
            font-size: 16px;
            font-weight: 600;
            color: #111827;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          "
        >
          Chọn mẫu Super
        </div>
        <button
          type="button"
          style="
            color: #9ca3af;
            cursor: pointer;
            border: none;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 4px;
          "
          class="hover:bg-gray-100"
          @click="showSuperTemplatesDialog = false"
        >
          <IconMenu2 size="20" style="transform: rotate(45deg)" />
        </button>
      </div>

      <div
        style="padding: 24px; overflow-y: auto; background: #f9fafb; flex: 1"
      >
        <div style="margin-bottom: 24px; display: flex; align-items: center">
          <div style="position: relative; width: 100%">
            <IconSearch
              size="16"
              style="
                position: absolute;
                left: 12px;
                top: 50%;
                transform: translateY(-50%);
                color: #9ca3af;
              "
            />
            <input
              v-model="superTplQuery"
              type="text"
              placeholder="Tìm kiếm mẫu..."
              style="
                width: 100%;
                height: 40px;
                padding: 0 12px 0 36px;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                font-size: 14px;
                color: #111827;
                outline: none;
                transition:
                  border-color 0.15s,
                  box-shadow 0.15s;
                background: white;
              "
              class="input-focus"
            />
          </div>
        </div>

        <div
          v-if="superTplLoading"
          style="display: flex; justify-content: center; padding: 40px"
        >
          <span
            class="spinner-sm"
            style="width: 32px; height: 32px; border-width: 3px"
          ></span>
        </div>
        <div
          v-else
          class="super-grid"
          style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 24px;
          "
        >
          <div
            v-for="t in filteredSuperTemplates"
            :key="t.id"
            class="super-card"
            style="
              background: white;
              border-radius: 8px;
              overflow: hidden;
              box-shadow:
                0 1px 3px 0 rgba(0, 0, 0, 0.1),
                0 1px 2px 0 rgba(0, 0, 0, 0.06);
              transition:
                transform 0.2s,
                box-shadow 0.2s;
              display: flex;
              flex-direction: column;
            "
          >
            <div
              class="super-thumb"
              style="
                position: relative;
                width: 100%;
                aspect-ratio: 16/9;
                background: #f3f4f6;
                overflow: hidden;
              "
            >
              <img
                v-if="t.thumbnail"
                :src="getThumbnailUrl(t.thumbnail)"
                loading="lazy"
                style="width: 100%; height: 100%; object-fit: cover"
              />
              <div
                v-else
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                  height: 100%;
                  color: #9ca3af;
                "
              >
                <IconTemplate size="48" />
              </div>

              <!-- Overlay actions -->
              <div
                class="super-overlay"
                style="
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: rgba(0, 0, 0, 0.6);
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  gap: 8px;
                  opacity: 0;
                  transition: opacity 0.2s;
                "
                onmouseover="this.style.opacity='1'"
                onmouseout="this.style.opacity='0'"
              >
                <button
                  type="button"
                  style="
                    padding: 6px 12px;
                    border-radius: 4px;
                    font-size: 13px;
                    font-weight: 500;
                    color: #111827;
                    background: white;
                    border: none;
                    cursor: pointer;
                    width: 120px;
                  "
                  :disabled="isApplyingTemplate"
                  @click.stop="applySuperTemplate(t.id)"
                >
                  Áp dụng
                </button>
                <button
                  type="button"
                  style="
                    padding: 6px 12px;
                    border-radius: 4px;
                    font-size: 13px;
                    font-weight: 500;
                    color: white;
                    background: #2563eb;
                    border: none;
                    cursor: pointer;
                    width: 120px;
                  "
                  :disabled="isApplyingTemplate"
                  @click.stop="applyAndSaveCompany(t.id)"
                >
                  Áp dụng & Lưu
                </button>
              </div>

              <!-- Admin actions -->
              <div
                v-if="isSuperAdmin"
                class="admin-actions"
                style="
                  position: absolute;
                  top: 8px;
                  right: 8px;
                  display: flex;
                  gap: 4px;
                "
              >
                <button
                  type="button"
                  style="
                    width: 24px;
                    height: 24px;
                    border-radius: 4px;
                    background: white;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: #4b5563;
                  "
                  @click.stop="openEditSuperTemplate(t)"
                >
                  <IconEdit size="14" />
                </button>
                <button
                  type="button"
                  style="
                    width: 24px;
                    height: 24px;
                    border-radius: 4px;
                    background: #ef4444;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: white;
                  "
                  @click.stop="deleteSuperTemplate(t.id)"
                >
                  <IconTrash size="14" />
                </button>
              </div>
            </div>
            <div class="super-info" style="padding: 12px">
              <div
                class="super-name"
                style="
                  font-size: 14px;
                  font-weight: 600;
                  color: #111827;
                  margin-bottom: 4px;
                "
              >
                {{ t.name }}
              </div>
              <div
                v-if="t.description"
                class="super-desc"
                style="
                  font-size: 13px;
                  color: #6b7280;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  line-clamp: 2;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                "
              >
                {{ t.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="showSaveSuperDialog"
    style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    "
    @click.self="showSaveSuperDialog = false"
  >
    <div
      style="
        background: white;
        border-radius: 8px;
        overflow: hidden;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        width: 520px;
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      "
    >
      <div
        style="
          padding: 16px 24px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f9fafb;
        "
      >
        <div
          style="
            font-size: 16px;
            font-weight: 600;
            color: #111827;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          "
        >
          Lưu mẫu SuperAdmin
        </div>
        <button
          type="button"
          style="
            color: #9ca3af;
            cursor: pointer;
            border: none;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 4px;
          "
          class="hover:bg-gray-100"
          @click="showSaveSuperDialog = false"
        >
          <IconMenu2 size="20" style="transform: rotate(45deg)" />
        </button>
      </div>
      <div style="padding: 24px; overflow-y: auto">
        <div style="margin-bottom: 16px">
          <label
            style="
              display: block;
              font-size: 13px;
              font-weight: 500;
              color: #374151;
              margin-bottom: 6px;
            "
          >
            Tên mẫu <span style="color: #ef4444">*</span>
          </label>
          <input
            v-model="superTplName"
            type="text"
            style="
              width: 100%;
              height: 38px;
              padding: 0 12px;
              border: 1px solid #d1d5db;
              border-radius: 6px;
              font-size: 14px;
              color: #111827;
              outline: none;
              transition:
                border-color 0.15s,
                box-shadow 0.15s;
            "
            class="input-focus"
          />
        </div>
        <div style="margin-bottom: 16px">
          <label
            style="
              display: block;
              font-size: 13px;
              font-weight: 500;
              color: #374151;
              margin-bottom: 6px;
            "
          >
            Mô tả
          </label>
          <textarea
            v-model="superTplDesc"
            style="
              width: 100%;
              height: 80px;
              padding: 8px 12px;
              border: 1px solid #d1d5db;
              border-radius: 6px;
              font-size: 14px;
              color: #111827;
              outline: none;
              transition:
                border-color 0.15s,
                box-shadow 0.15s;
              resize: vertical;
            "
            class="input-focus"
          ></textarea>
        </div>
      </div>
      <div
        style="
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          background: #f9fafb;
          gap: 12px;
        "
      >
        <button
          type="button"
          style="
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            background: white;
            border: 1px solid #d1d5db;
            cursor: pointer;
            transition: all 0.2s;
          "
          class="hover:bg-gray-50 hover:border-gray-400"
          @click="showSaveSuperDialog = false"
        >
          Đóng
        </button>
        <button
          type="button"
          style="
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            color: white;
            background: #2563eb;
            border: 1px solid transparent;
            cursor: pointer;
            transition: all 0.2s;
          "
          class="hover:bg-blue-600"
          @click="confirmSaveSuperTemplate"
        >
          Lưu
        </button>
      </div>
    </div>
  </div>
  <div
    v-if="showEditSuperDialog"
    style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    "
    @click.self="showEditSuperDialog = false"
  >
    <div
      style="
        background: white;
        border-radius: 8px;
        overflow: hidden;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        width: 520px;
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      "
    >
      <div
        style="
          padding: 16px 24px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f9fafb;
        "
      >
        <div
          style="
            font-size: 16px;
            font-weight: 600;
            color: #111827;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          "
        >
          Sửa mẫu SuperAdmin
        </div>
        <button
          type="button"
          style="
            color: #9ca3af;
            cursor: pointer;
            border: none;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 4px;
          "
          class="hover:bg-gray-100"
          @click="showEditSuperDialog = false"
        >
          <IconMenu2 size="20" style="transform: rotate(45deg)" />
        </button>
      </div>
      <div style="padding: 24px; overflow-y: auto">
        <div style="margin-bottom: 16px">
          <label
            style="
              display: block;
              font-size: 13px;
              font-weight: 500;
              color: #374151;
              margin-bottom: 6px;
            "
          >
            Tên mẫu <span style="color: #ef4444">*</span>
          </label>
          <input
            v-model="editTplName"
            type="text"
            style="
              width: 100%;
              height: 38px;
              padding: 0 12px;
              border: 1px solid #d1d5db;
              border-radius: 6px;
              font-size: 14px;
              color: #111827;
              outline: none;
              transition:
                border-color 0.15s,
                box-shadow 0.15s;
            "
            class="input-focus"
          />
        </div>
        <div style="margin-bottom: 16px">
          <label
            style="
              display: block;
              font-size: 13px;
              font-weight: 500;
              color: #374151;
              margin-bottom: 6px;
            "
          >
            Mô tả
          </label>
          <textarea
            v-model="editTplDesc"
            style="
              width: 100%;
              height: 80px;
              padding: 8px 12px;
              border: 1px solid #d1d5db;
              border-radius: 6px;
              font-size: 14px;
              color: #111827;
              outline: none;
              transition:
                border-color 0.15s,
                box-shadow 0.15s;
              resize: vertical;
            "
            class="input-focus"
          ></textarea>
        </div>
      </div>
      <div
        style="
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          background: #f9fafb;
          gap: 12px;
        "
      >
        <button
          type="button"
          style="
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            background: white;
            border: 1px solid #d1d5db;
            cursor: pointer;
            transition: all 0.2s;
          "
          class="hover:bg-gray-50 hover:border-gray-400"
          @click="showEditSuperDialog = false"
        >
          Đóng
        </button>
        <button
          type="button"
          style="
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            color: white;
            background: #2563eb;
            border: 1px solid transparent;
            cursor: pointer;
            transition: all 0.2s;
          "
          class="hover:bg-blue-600"
          @click="confirmEditSuperTemplate"
        >
          Lưu
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HelpDialog from "./dialogs/HelpDialog.vue";
import {
  matchesElementSearch,
  normalizeElementSearch,
} from "./utils/element-search";
import { getIncomingHtmlAction } from "./utils/model-html-sync";
import { composeHtmlWithCss } from "./utils/html-with-css";
import { escapeHtmlAttribute } from "./utils/escape-html-attribute";
import { composeExportBodyScripts } from "./utils/export-body-scripts";
import { composeExportScriptTag } from "./utils/export-script-tag";
import { restoreTemplateContent } from "./utils/restore-template-content";
import PageSeoDialog from "./dialogs/PageSeoDialog.vue";
import { useEventPlaceholders } from "./composables/useEventPlaceholders";
const { buildEventPlaceholderReplacements, replaceEventPlaceholders, replaceEventIdPlaceholder } = useEventPlaceholders();
import { merge } from "lodash-es";
import {
  onMounted,
  onBeforeUnmount,
  ref,
  watch,
  computed,
  reactive,
  nextTick,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import grapesjs from "grapesjs";
import JSZip from "jszip";
import type { Editor, Component } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";


// ============================================================================
// WB FULL DEBUG MODE
// ============================================================================
// This diagnostic layer is intentionally verbose. It logs to BOTH the browser
// console (console.log/warn/error, so it is not hidden by a "Verbose" filter)
// and a small in-app panel. It is focused on the exact failure mode:
// "Canvas looks correct for ~1s, then CSS disappears".
//
// Disable later with: window.__WB_DEBUG_DISABLE__ = true
// Clear panel with:   window.__WB_DEBUG_CLEAR__?.()
// Export logs with:   window.__WB_DEBUG_EXPORT__?.()
// ============================================================================
const WB_DEBUG_ENABLED = true;
let wbDebugSeq = 0;
let wbDebugPanel: HTMLDivElement | null = null;
let wbDebugBody: HTMLDivElement | null = null;
let wbDebugPaused = false;
let wbDebugEntries: string[] = [];
let wbDebugPanelCreated = false;

function wbDebugNow() {
  try {
    const d = new Date();
    return d.toISOString().slice(11, 23);
  } catch {
    return "--:--:--.---";
  }
}

function wbDebugJson(value: any, max = 1800): string {
  try {
    const seen = new WeakSet<object>();
    const out = JSON.stringify(value, (_k, v) => {
      if (typeof v === "object" && v !== null) {
        if (seen.has(v)) return "[Circular]";
        seen.add(v);
      }
      if (typeof v === "function") return `[Function ${v.name || "anonymous"}]`;
      if (typeof v === "string" && v.length > 1200) return `${v.slice(0, 1200)}…`;
      return v;
    });
    return String(out || "").slice(0, max);
  } catch {
    try { return String(value); } catch { return "[unserializable]"; }
  }
}

function wbEnsureDebugPanel() {
  if (typeof document === "undefined" || wbDebugPanelCreated) return;
  wbDebugPanelCreated = true;
  const panel = document.createElement("div");
  panel.id = "wb-full-debug-panel";
  panel.style.cssText = [
    "position:fixed",
    "right:12px",
    "bottom:12px",
    "width:520px",
    "max-width:calc(100vw - 24px)",
    "height:300px",
    "z-index:2147483647",
    "background:#0b1020",
    "color:#dbeafe",
    "border:1px solid #334155",
    "border-radius:8px",
    "box-shadow:0 10px 35px rgba(0,0,0,.35)",
    "font:11px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace",
    "display:flex",
    "flex-direction:column",
    "overflow:hidden",
  ].join(";");

  const header = document.createElement("div");
  header.style.cssText = "display:flex;align-items:center;gap:6px;padding:6px 8px;background:#111827;border-bottom:1px solid #334155;flex:none";
  const title = document.createElement("strong");
  title.textContent = "WB DEBUG — Canvas/CSS lifecycle";
  title.style.color = "#67e8f9";
  header.appendChild(title);

  const spacer = document.createElement("span");
  spacer.style.flex = "1";
  header.appendChild(spacer);

  const mkBtn = (label: string, fn: () => void) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = label;
    b.style.cssText = "border:1px solid #475569;background:#1e293b;color:#e2e8f0;border-radius:4px;padding:2px 6px;cursor:pointer;font:10px ui-monospace";
    b.onclick = fn;
    return b;
  };
  header.appendChild(mkBtn("Clear", () => {
    wbDebugEntries = [];
    if (wbDebugBody) wbDebugBody.innerHTML = "";
  }));
  header.appendChild(mkBtn("Pause", () => {
    wbDebugPaused = !wbDebugPaused;
  }));
  header.appendChild(mkBtn("Copy", () => {
    try { navigator.clipboard?.writeText(wbDebugEntries.join("\n")); } catch {}
  }));
  header.appendChild(mkBtn("Hide", () => {
    panel.style.display = "none";
  }));

  const body = document.createElement("div");
  body.style.cssText = "flex:1;overflow:auto;padding:6px 8px;white-space:pre-wrap;word-break:break-word";
  panel.appendChild(header);
  panel.appendChild(body);
  document.body.appendChild(panel);
  wbDebugPanel = panel;
  wbDebugBody = body;
}

function wbDebugShowPanel() {
  // wbEnsureDebugPanel();
  if (wbDebugPanel) wbDebugPanel.style.display = "flex";
}

function wbDebug(...args: any[]) {
  if (!WB_DEBUG_ENABLED) return;
  try {
    if ((window as any).__WB_DEBUG_DISABLE__) return;
  } catch {}
  const id = ++wbDebugSeq;
  const prefix = `[WB-DEBUG #${id} ${wbDebugNow()}]`;
  const text = `${prefix} ${args.map((x) => typeof x === "string" ? x : wbDebugJson(x)).join(" ")}`;
  wbDebugEntries.push(text);
  if (wbDebugEntries.length > 1200) wbDebugEntries.splice(0, wbDebugEntries.length - 1200);
  try { console.log(prefix, ...args); } catch {}
  try {
    if (!wbDebugPaused) {
      // wbEnsureDebugPanel();
      if (wbDebugBody) {
        const line = document.createElement("div");
        line.textContent = text;
        line.style.padding = "1px 0";
        if (/ERROR|FAILED|error|failed|exception/i.test(text)) line.style.color = "#fca5a5";
        else if (/WARN|warning/i.test(text)) line.style.color = "#fde68a";
        wbDebugBody.appendChild(line);
        while (wbDebugBody.childElementCount > 500) wbDebugBody.firstElementChild?.remove();
        wbDebugBody.scrollTop = wbDebugBody.scrollHeight;
      }
    }
  } catch {}
}

function wbDebugWarn(...args: any[]) {
  wbDebug("WARN", ...args);
  try { console.warn("[WB-DEBUG]", ...args); } catch {}
}
function wbDebugError(...args: any[]) {
  wbDebug("ERROR", ...args);
  try { console.error("[WB-DEBUG]", ...args); } catch {}
}

function wbCanvasSnapshot(stage: string) {
  try {
    if (!editor) return wbDebug(stage, "editor=null");
    const d = editor?.Canvas.getDocument();
    const w = d?.defaultView;
    const body = d?.body;
    const head = d?.head;
    if (!d || !head) return wbDebug(stage, "canvas document/head unavailable");
    const styles = Array.from(head.querySelectorAll("style"));
    const links = Array.from(head.querySelectorAll("link"));
    const scripts = Array.from(head.querySelectorAll("script"));
    const tw = styles.filter((x) => /tailwindcss|--tw-|@property\s+--tw-/i.test(String(x.textContent || "")));
    const imported = styles.filter((x) => x.hasAttribute("data-import-url") || x.hasAttribute("data-imported-stylesheet"));
    const runtime = styles.filter((x) => x.hasAttribute("data-wb-tailwind-runtime"));
    const first = body?.querySelector("[class],h1,h2,h3,section,header,main") as HTMLElement | null;
    let computed: any = null;
    if (first && w?.getComputedStyle) {
      const cs = w.getComputedStyle(first);
      computed = {
        tag: first.tagName,
        id: first.id,
        className: first.className,
        display: cs.display,
        position: cs.position,
        width: cs.width,
        height: cs.height,
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
      };
    }
    const cssComposer = (() => { try { return editor.getCss?.() || ""; } catch { return ""; } })();
    wbDebug(stage, {
      readyState: d.readyState,
      bodyChars: body?.innerHTML?.length || 0,
      headChars: head.innerHTML.length,
      styleCount: styles.length,
      linkCount: links.length,
      scriptCount: scripts.length,
      tailwindStyleCount: tw.length,
      importedStyleCount: imported.length,
      runtimeTailwindCount: runtime.length,
      cssComposerChars: cssComposer.length,
      persistentCssChars: importedEditorCssPersistent.length,
      persistentLinks: importedHeadLinksPersistent.length,
      cachedTailwindChars: tailwindRuntimeCssCache.length,
      computed,
      headStyleAttrs: styles.map((x) => ({ attrs: Array.from(x.attributes).map(a => [a.name, a.value]), chars: String(x.textContent || "").length })).slice(0, 30),
      headLinks: links.map((x: any) => ({ rel: x.rel, href: x.href, saved: x.hasAttribute("data-saved-link") })).slice(0, 30),
    });
  } catch (e) {
    wbDebugError(stage, "snapshot failed", e);
  }
}

function wbDebugAttachFrameLifecycle() {
  try {
    if (!editor) return;
    wbDebug("ATTACH frame lifecycle listeners");
    editor.on("canvas:frame:load", () => {
      wbDebug("EVENT canvas:frame:load");
      wbCanvasSnapshot("frame-load:immediate");
      [0, 50, 150, 300, 600, 1000, 1500, 2500, 5000].forEach((ms) => {
        setTimeout(() => wbCanvasSnapshot(`frame-load:+${ms}ms`), ms);
      });
      try {
        const d = editor?.Canvas.getDocument();
        const w = d?.defaultView;
        const head = d?.head;
        const body = d?.body;
        if (w) {
          (w as any).__wbDebugLastFrame = Date.now();
          const oldErr = (w as any).__wbDebugOnErrorInstalled;
          if (!oldErr) {
            w.addEventListener("error", (ev: any) => wbDebugError("IFRAME window.error", ev?.message, ev?.filename, ev?.lineno, ev?.colno, ev?.error));
            w.addEventListener("unhandledrejection", (ev: any) => wbDebugError("IFRAME unhandledrejection", ev?.reason));
            (w as any).__wbDebugOnErrorInstalled = true;
            const c = w.console;
            if (c && !(w as any).__wbDebugConsoleWrapped) {
              const ow = c.warn?.bind(c);
              const oe = c.error?.bind(c);
              if (ow) c.warn = (...a: any[]) => { wbDebugWarn("IFRAME console.warn", ...a); ow(...a); };
              if (oe) c.error = (...a: any[]) => { wbDebugError("IFRAME console.error", ...a); oe(...a); };
              (w as any).__wbDebugConsoleWrapped = true;
            }
          }
        }
        if (head && !(head as any).__wbDebugMutationObserver) {
          let timer: any = null;
          const mo = new MutationObserver((mutations) => {
            const summary = mutations.slice(0, 20).map((m: any) => ({ type: m.type, target: m.target?.nodeName, added: m.addedNodes?.length || 0, removed: m.removedNodes?.length || 0, attr: m.attributeName || "" }));
            wbDebug("MUTATION head", summary);
            clearTimeout(timer);
            timer = setTimeout(() => wbCanvasSnapshot("head-mutation:debounced"), 40);
          });
          mo.observe(head, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["href", "rel", "class", "style", "media", "disabled"] });
          (head as any).__wbDebugMutationObserver = mo;
        }
        if (body && !(body as any).__wbDebugMutationObserver) {
          let timer: any = null;
          const mo = new MutationObserver((mutations) => {
            const summary = mutations.slice(0, 20).map((m: any) => ({ type: m.type, target: m.target?.nodeName, added: m.addedNodes?.length || 0, removed: m.removedNodes?.length || 0, attr: m.attributeName || "" }));
            wbDebug("MUTATION body", summary);
            clearTimeout(timer);
            timer = setTimeout(() => wbCanvasSnapshot("body-mutation:debounced"), 40);
          });
          mo.observe(body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["class", "style", "hidden", "data-aos"] });
          (body as any).__wbDebugMutationObserver = mo;
        }
      } catch (e) { wbDebugError("frame debug attach failed", e); }
    });
  } catch (e) { wbDebugError("canvas lifecycle attach failed", e); }
}

function wbInstallGlobalDebugHooks() {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (w.__wbFullDebugInstalled) return;
  w.__wbFullDebugInstalled = true;
  w.__WB_DEBUG__ = wbDebug;
  w.__WB_DEBUG_CLEAR__ = () => { wbDebugEntries = []; if (wbDebugBody) wbDebugBody.innerHTML = ""; };
  w.__WB_DEBUG_EXPORT__ = () => wbDebugEntries.join("\n");
  window.addEventListener("error", (ev: any) => wbDebugError("PARENT window.error", ev?.message, ev?.filename, ev?.lineno, ev?.colno, ev?.error));
  window.addEventListener("unhandledrejection", (ev: any) => wbDebugError("PARENT unhandledrejection", ev?.reason));
  wbDebug("FULL DEBUG INSTALLED", { href: location.href, userAgent: navigator.userAgent, time: new Date().toISOString() });
}
import presetWebpage from "grapesjs-preset-webpage";
import basicBlocks from "grapesjs-blocks-basic";
import {
  IconPhoto,
  IconMinus,
  IconEye,
  IconLayout2,
  IconLayoutNavbar,
  IconTypography,
  IconCards,
  IconH1,
  IconTextSize,
  IconRectangle,
  IconTemplate,
  IconColumns,
} from "@/components/icons";
import {
  IconLayout,
  IconSeparator,
  IconDeviceMobile,
  IconDeviceTablet,
  IconDeviceDesktop,
  IconSearch,
  IconHome,
  IconHelpCircle,
  IconChevronDown,
  IconChevronRight,
  IconLink,
  IconUnlink,
  IconListCheck,
  IconDatabase,
  IconBox,
  IconPlayerPlay,
  IconBold,
  IconItalic,
  IconUnderline,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconDeviceFloppy,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconEyeOff,
  IconInputSearch,
  IconLayoutColumns,
  IconListDetails,
  IconPresentation,
  IconTable,
  IconWindow,
  IconUpload,
  IconCode,
  IconAlertCircle,
  IconCalendarEvent,
  IconTicket,
  IconMenu2,
  IconSettings,
  IconArrowRight,
  IconArrowDown,
  IconArrowLeft,
  IconArrowUp,
  IconX,
  IconEdit,
  IconTrash,
  IconLineHeight,
  IconLetterSpacing,
  IconLayoutAlignLeft,
  IconLayoutAlignCenter,
  IconLayoutAlignRight,
  IconLayoutAlignTop,
  IconLayoutAlignMiddle,
  IconLayoutAlignBottom,
  IconLayoutDistributeHorizontal,
  IconLayoutDistributeVertical,
  IconCheck,
  IconLoader2,
  IconHistory,
  IconKey,
  IconCopy,
  IconUsers,
  IconMail,
  IconHeartHandshake,
  IconGift,
  IconInfoCircle,
} from "@tabler/icons-vue";
import { scrapeToGrapes, toGrapesJson } from "@/utils/grapesScraper";
import {
  IconArrowsVertical,
  IconWallpaper,
  IconSection,
} from "@tabler/icons-vue";
import EditorCanvas from "./EditorCanvas.vue";
import { useAuthStore } from "@/stores/auth";
import { usePermission } from "@/composables/usePermission";
import { apiClient } from "@/api/apiConfig";
import { eventService } from "@/services/eventService";
import { debounce, throttle } from "lodash-es";
import spec from "./blocks-spec.json";
import { websiteTemplateService } from "@/services/websiteTemplateService";
import { mediaService } from "@/services/mediaService";
import { useToast } from "@/composables/useToast";
import type { SuperTemplateMeta } from "@/services/websiteTemplateService";
import domtoimage from "dom-to-image";
import html2canvas from "html2canvas";
import { landingPagePlugin } from "./landing-page-blocks";
type BlockDef = {
  id: string;
  defaults?: { style?: Record<string, string | undefined> };
};
type BlocksSpec = { blocks: BlockDef[] };
const blocksSpec: BlocksSpec = spec as BlocksSpec;
interface SliderElement extends HTMLElement {
  sliderSetRoleMode?: (mode: "listbox" | "tabs") => void;
  sliderSetAutoplay?: (opts: {
    enabled: boolean;
    interval?: number;
    pauseOnHover?: boolean;
  }) => void;
  sliderSetTransition?: (opts: {
    effect?: "smooth" | "instant";
    duration?: number;
    easing?: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";
  }) => void;
  sliderSetVisible?: (n: number) => void;
  sliderGoTo?: (i: number) => void;
}
interface AccordionElement extends HTMLElement {
  accordionSetOptions?: (opts: {
    multiple?: boolean;
    animate?: boolean;
    duration?: number;
  }) => void;
}

const componentProps = withDefaults(
  defineProps<{ modelValue?: string; config?: any }>(),
  {
    modelValue: "",
    config: () => ({}),
  },
);
const HOMEPAGE_TEMPLATE_ID = "homepage";
const isHomepageMode = computed(
  () => componentProps?.config?.mode === "homepage",
);
const emit = defineEmits<{
  "update:modelValue": [value: string];
  save: [payload: any];
}>();

const auth = useAuthStore();
const { isCompanyAdmin, isSuperAdmin: isSuperAdminPerm } = usePermission();
const companyEvents = ref<any[]>([]);
const eventContext = ref<any | null>(null);

const isEmbed = ref(false);
if (typeof window !== "undefined") {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("embed") === "1") {
      isEmbed.value = true;
    } else if (window.self !== window.top) {
      isEmbed.value = true;
    }
  } catch {}
}

const route = useRoute();
const eventIdParam = ref<string | null>(null);
if (typeof window !== "undefined") {
  try {
    const params = new URLSearchParams(window.location.search);
    eventIdParam.value = params.get("event_id");
  } catch {}
}

if (!eventIdParam.value && route?.params?.id) {
  eventIdParam.value = String(route.params.id);
}




const isSaving = ref(false);

const pendingTemplate = ref<{
  html?: string;
  projectData?: any;
  headCss?: string;
  headLinks?: any[];
  headScripts?: any[];
  bodyScripts?: any[];
  runtimeCode?: string;
  css?: string;
} | null>(null);

const updateEditorFromMessage = (tpl: any) => {
  let html = tpl.html || "";
  let projectData = tpl.projectData || null;
  const headCss = tpl.headCss || "";
  const headLinks = Array.isArray(tpl.headLinks) ? tpl.headLinks : [];
  const headScripts = Array.isArray(tpl.headScripts) ? tpl.headScripts : [];
  const bodyScripts = Array.isArray(tpl.bodyScripts) ? tpl.bodyScripts : [];
  const runtimeCode = tpl.runtimeCode || "";
  const css = tpl.css || "";

  // Replace [id_event] with actual event ID if available
  if (eventIdParam.value) {
    if (projectData) {
      projectData = replaceEventIdPlaceholder(projectData, eventIdParam.value);
    } else if (html) {
      html = replaceEventIdPlaceholder(html, eventIdParam.value);
    }
  }

  // Replace [ev_*] placeholders with real event data when editing in event context as CompanyAdmin
  if (isCompanyAdmin.value && eventContext.value) {
    if (projectData) {
      projectData = replaceEventPlaceholders(projectData, eventContext.value);
    } else if (html) {
      html = replaceEventPlaceholders(html, eventContext.value);
    }
  }

  try {
    // Replacing a template must also replace its supporting assets. Otherwise
    // stylesheets and scripts from the previously opened template can leak
    // into the new canvas when the incoming template omits those fields.
    clearImportedHeadAssets();
    installedHeadScripts.value = headScripts;
    installedBodyScripts.value = bodyScripts;

    if (projectData) {
      loadProjectData(projectData);
    } else {
      // An intentionally blank template is valid too. Always apply the HTML
      // fallback so the previous page cannot remain visible when html is "".
      setEditorHtml(html);
    }
    // Apply empty values too: an empty field means "no saved asset", not
    // "keep the previous template's asset".
    setCanvasImportCss(css);
    if (headCss) injectSavedHeadCss(headCss);
    if (headLinks.length > 0) injectSavedHeadLinks(headLinks);
    if (runtimeCode) injectSavedRuntime(runtimeCode);
    if (headScripts.length > 0) installSavedScripts(headScripts, "head");
    if (bodyScripts.length > 0) installSavedScripts(bodyScripts, "body");
  } catch (error) {
    try {
      console.error("[WebsiteBuilder] Không thể nạp template từ cửa sổ cha:", error);
      showFeedback("Không thể nạp đầy đủ template. Vui lòng thử tải lại.", "error");
    } catch {}
  }
};

const updateEditorFromMessageDebounced = debounce(updateEditorFromMessage, 300);

const handleParentMessage = (event: MessageEvent) => {
  const data = event.data || {};
  if (data.source !== "event-edit") return;
  const tpl = data.template || {};

  if (!editor) {
    const html = tpl.html || "";
    const projectData = tpl.projectData || null;
    const headCss = tpl.headCss || "";
    const headLinks = Array.isArray(tpl.headLinks) ? tpl.headLinks : [];
    const headScripts = Array.isArray(tpl.headScripts) ? tpl.headScripts : [];
    const bodyScripts = Array.isArray(tpl.bodyScripts) ? tpl.bodyScripts : [];
    const runtimeCode = tpl.runtimeCode || "";
    const css = tpl.css || "";

    pendingTemplate.value = {
      html,
      projectData,
      headCss,
      headLinks,
      headScripts,
      bodyScripts,
      runtimeCode,
      css,
    };
    return;
  }

  updateEditorFromMessageDebounced(tpl);
};

async function fetchCompanyEvents() {
  if (!isCompanyAdmin.value && !isSuperAdminPerm.value) return;
  try {
    const res = await apiClient.get("/events", {
      params: { limit: 10, status: "published" },
    });
    const data = res.data?.data || [];
    if (Array.isArray(data)) {
      companyEvents.value = data;
    }
  } catch (e) {
    console.error("Error fetching company events:", e);
  }
}

async function fetchEventContext() {
  if (!eventIdParam.value || !isCompanyAdmin.value) return;
  try {
    const data = await eventService.getEvent(eventIdParam.value);
    eventContext.value = data?.event?.event || data?.event || data;
  } catch (e) {
    console.error("Error fetching event context for placeholders:", e);
  }
}

onMounted(() => {
  if (isCompanyAdmin.value || isSuperAdminPerm.value) {
    fetchCompanyEvents();
  }
  if (isEmbed.value && eventIdParam.value && isCompanyAdmin.value) {
    fetchEventContext();
  }
  if (isEmbed.value) {
    window.addEventListener("message", handleParentMessage);
  }
});

onBeforeUnmount(() => {
  if (isEmbed.value) {
    window.removeEventListener("message", handleParentMessage);
  }
});

const showEventPickerDialog = ref<boolean>(false);
const selectedEventForInsert = ref<any>(null);
const selectedEventStyle = ref<"horizontal" | "vertical" | "card">(
  "horizontal",
);

let editor: Editor | null = null;
let restartEditor: ((config?: any) => Promise<void>) | null = null;
const snackbarOpen = ref(false);
const snackbarText = ref("");
const snackbarColor = ref<"success" | "error" | "info">("success");
function showFeedback(
  msg: string,
  color: "success" | "error" | "info" = "success",
) {
  snackbarText.value = msg;
  snackbarColor.value = color;
  snackbarOpen.value = true;
}

function addCompanyEventBlock() {
  if (!editor) return;

  // Handle Super Admin with no events (Mock Mode)
  if (companyEvents.value.length === 0 && isSuperAdminPerm.value) {
    const mockEvt = {
      id: "mock-event-id",
      name: "Sự kiện Mẫu (Demo)",
      location: "Trung tâm Hội nghị Quốc gia",
      startDate: new Date().toISOString(),
      bannerUrl: "https://placehold.co/800x400?text=Event+Banner",
      tickets: [
        {
          id: "mock-ticket-1",
          name: "Vé VIP",
          price: 500000,
          currency: "VND",
        },
        {
          id: "mock-ticket-2",
          name: "Vé Thường",
          price: 200000,
          currency: "VND",
        },
      ],
    };
    // Add mock event to list so user can select it in the dialog
    companyEvents.value = [mockEvt];
  }

  if (companyEvents.value.length > 0) {
    selectedEventForInsert.value = null;
    selectedEventStyle.value = "horizontal";
    showEventPickerDialog.value = true;
    return;
  }

  showFeedback("Không có sự kiện nào đang hoạt động", "info");
}

function selectEventToInsert(evt: any) {
  selectedEventForInsert.value = evt;
}

function confirmInsertEvent() {
  if (selectedEventForInsert.value) {
    insertEventBlock(selectedEventForInsert.value, selectedEventStyle.value);
    showEventPickerDialog.value = false;
  }
}

function insertEventBlock(
  evt: any,
  style: "horizontal" | "vertical" | "card" = "horizontal",
) {
  if (!editor) return;
  const blockHtml = createCompanyEventBlockHtml(evt, style);
  editor.addComponents(blockHtml);
  recordInsert();
}

function createCompanyEventBlockHtml(
  evt: any,
  style: "horizontal" | "vertical" | "card",
): string {
  const tickets = evt.tickets || [];
  const evtJson = JSON.stringify(evt)
    .replace(/'/g, "&apos;")
    .replace(/"/g, "&quot;");

  const isTemplateMode = isSuperAdminPerm.value && !isCompanyAdmin.value;

  const formatEventDateTime = () =>
    new Date(evt.startDate).toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const eventNameText = isTemplateMode ? "[ev_name]" : evt.name;
  const eventLocationText = isTemplateMode
    ? "[ev_location]"
    : evt.location || "Trực tuyến";
  const eventDateText = isTemplateMode
    ? "[ev_start_datetime]"
    : formatEventDateTime();

  // For SuperAdmin template building, we use a placeholder [id_event]
  // This allows the template to be applied to any event later.
  // If the user is Company Admin but editing a template that has [id_event],
  // we should ideally use their real ID if available, but for now we stick to the logic:
  // - SuperAdmin: [id_event]
  // - CompanyAdmin: real ID
  let targetEventId = isSuperAdminPerm.value ? "[id_event]" : evt.id;

  // If we have an explicit eventIdParam (from URL), use it even if it's SuperAdmin
  // (This covers the case where SuperAdmin is debugging/editing a specific event context)
  // BUT: The requirement is specifically for templates.
  // Actually, if we are in "Mock Mode" (SuperAdmin with no events), we use [id_event]
  // If CompanyAdmin, we use evt.id.

  // Update: If we are effectively a "Template Builder" session, we might want [id_event].
  // However, the current logic is correct for creating NEW blocks.

  // Ensure we don't end up with undefined or null
  if (!targetEventId) targetEventId = "[id_event]";

  // Common Ticket Button Logic
  // We use a simple "Buy Ticket" button that triggers the popup via class delegation
  const buyButton = `
    <a href="/order_wizard?event_id=${targetEventId}" 
       data-event-id="${targetEventId}"
       class="event-buy-btn js-buy-ticket-btn"
       style="
         display: inline-block;
         background: #2563eb; 
         color: white; 
         padding: 10px 24px; 
         text-decoration: none; 
         border-radius: 6px; 
         font-size: 14px; 
         font-weight: 600; 
         transition: background 0.2s;
         text-align: center;
         cursor: pointer;
       "
       onmouseover="this.style.background='#1d4ed8'"
       onmouseout="this.style.background='#2563eb'"
    >
      Mua Vé Ngay
    </a>
  `;

  // Image handling
  const imgUrl =
    evt.bannerUrl ||
    evt.thumbnailUrl ||
    "https://placehold.co/600x400?text=Event";

  const backgroundImageValue = isTemplateMode ? "[ev_logo]" : imgUrl;

  // STYLES
  const buttonStyles = `
    <style>
      .event-buy-btn {
        display: inline-block !important;
        background: #2563eb !important; 
        color: white !important; 
        padding: 10px 24px; 
        text-decoration: none !important; 
        border-radius: 6px !important; 
        font-size: 14px !important; 
        font-weight: 600 !important; 
        transition: background 0.2s !important; 
        text-align: center !important; 
        cursor: pointer !important;
        border: none !important;
      }
      .event-buy-btn:hover {
        background: #1d4ed8 !important;
      }
      .style-card .event-buy-btn {
        padding: 8px 16px !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
    
/* Compact inspector pass: prioritize hierarchy and reduce vertical noise. */
.website-builder .inspector__header {
  gap: 9px;
  padding: 12px 12px 10px;
}
.website-builder .inspector__topline {
  align-items: flex-start;
  gap: 8px;
}
.website-builder .inspector__title {
  font-size: 14px;
  line-height: 1.35;
  font-weight: 700;
}
.website-builder .inspector__hint {
  margin-top: 3px;
  font-size: 11px;
  line-height: 1.4;
}
.website-builder .inspector__search {
  min-height: 36px;
  padding: 0 9px;
  gap: 7px;
}
.website-builder .inspector-tabs {
  margin: 8px 10px 6px;
  padding: 3px;
  gap: 3px;
}
.website-builder .inspector-tab {
  min-height: 33px;
  padding: 5px 3px;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
}
.website-builder .floating-panel-content {
  padding: 2px 9px 16px;
}
.website-builder .floating-panel-content .settings-section {
  padding: 2px 0 8px;
}
.website-builder .floating-panel-content .setting-group {
  margin-bottom: 6px;
  border-radius: 9px;
}
.website-builder .floating-panel-content .group-header {
  min-height: 38px;
  padding: 9px 11px;
  font-size: 12px;
  line-height: 1.35;
}
.website-builder .floating-panel-content .group-body {
  padding: 10px;
  gap: 8px;
}
.website-builder .floating-panel-content .field {
  margin-bottom: 7px;
}
.website-builder .floating-panel-content .field-label {
  margin-bottom: 4px;
  font-size: 11px;
  line-height: 1.35;
}
.website-builder .floating-panel-content .chip-input,
.website-builder .floating-panel-content .chip-select {
  min-height: 34px;
  height: 34px;
  padding-left: 9px;
  padding-right: 9px;
  font-size: 12px;
}
.website-builder .floating-panel-content .selected-text-info {
  margin-bottom: 8px;
  padding: 10px;
}
.website-builder .floating-panel-content .text-actions {
  gap: 5px;
}
.website-builder .floating-panel-content .text-actions .action {
  min-height: 30px;
  padding: 5px 8px;
  font-size: 11px;
}
@media (max-width: 768px) {
  .website-builder .inspector__header {
    padding: 10px 10px 8px;
  }
  .website-builder .inspector-tab {
    min-height: 36px;
    font-size: 10px;
  }
  .website-builder .floating-panel-content {
    padding-right: 7px;
    padding-left: 7px;
  }
}


/* Final hierarchy polish: avoid a stack of heavy cards and keep controls unclipped. */
.website-builder .floating-panel-content .setting-group {
  overflow: visible;
  border-color: #edf1f6;
  box-shadow: 0 1px 1px rgba(15, 23, 42, .015);
}
.website-builder .floating-panel-content .group-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}
.website-builder .floating-panel-content .group-header:hover {
  background: #f8fafc;
}
.website-builder .floating-panel-content .group-header .chev {
  flex: 0 0 auto;
  color: #94a3b8;
}
.website-builder .floating-panel-content .group-body {
  background: #fff;
}
.website-builder .floating-panel-content .field-label {
  display: block;
}
.website-builder .floating-panel-content .grid-2,
.website-builder .floating-panel-content .grid-3 {
  min-width: 0;
  gap: 8px;
}
.website-builder .floating-panel-content .chip-input,
.website-builder .floating-panel-content .chip-select {
  max-width: 100%;
}

</style>
  `;

  // 1. HORIZONTAL (Image Left, Content Right)
  if (style === "horizontal") {
    return `
      ${buttonStyles}
      <section class="company-event-block style-horizontal" open_popup="true" contenteditable="false" data-gjs-editable="false" data-gjs-droppable="false" data-gjs-name="Event Block (Horizontal)" style="padding: 40px 0; background: #fff;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
          <div style="
            display: flex; 
            flex-direction: row; 
            gap: 32px; 
            background: #fff; 
            border: 1px solid #e2e8f0; 
            border-radius: 12px; 
            overflow: hidden; 
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            align-items: stretch;
          ">
            <div style="flex: 1; min-height: 300px; background-image: url('${backgroundImageValue}'); background-size: cover; background-position: center;"></div>
            <div style="flex: 1; padding: 32px; display: flex; flex-direction: column; justify-content: center;">
              <div style="color: #2563eb; font-weight: 600; font-size: 14px; margin-bottom: 8px; text-transform: uppercase;">${evt.category || "Sự kiện"}</div>
              <h2 style="margin: 0 0 16px 0; font-size: 28px; color: #0f172a; line-height: 1.3;">${eventNameText}</h2>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; color: #64748b;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span>📅</span> <span>${eventDateText}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span>📍</span> <span>${eventLocationText}</span>
                </div>
              </div>
              <div>
                ${buyButton}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // 2. VERTICAL (Image Top, Content Bottom - Centered)
  if (style === "vertical") {
    return `
      ${buttonStyles}
      <section class="company-event-block style-vertical" open_popup="true" contenteditable="false" data-gjs-editable="false" data-gjs-droppable="false" data-gjs-name="Event Block (Vertical)" style="padding: 40px 0; background: #fff;">
        <div style="max-width: 800px; margin: 0 auto; padding: 0 20px;">
          <div style="
            background: #fff; 
            border: 1px solid #e2e8f0; 
            border-radius: 12px; 
            overflow: hidden; 
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            align-items: stretch;
          ">
            <div style="width: 100%; height: 400px; background-image: url('${backgroundImageValue}'); background-size: cover; background-position: center;"></div>
            <div style="padding: 32px; text-align: center;">
              <div style="color: #2563eb; font-weight: 600; font-size: 14px; margin-bottom: 8px; text-transform: uppercase;">${evt.category || "Sự kiện"}</div>
              <h2 style="margin: 0 0 16px 0; font-size: 32px; color: #0f172a; line-height: 1.3;">${eventNameText}</h2>
              <div style="display: flex; justify-content: center; gap: 24px; margin-bottom: 24px; color: #64748b; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span>📅</span> <span>${eventDateText}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span>📍</span> <span>${eventLocationText}</span>
                </div>
              </div>
              <p style="color: #475569; margin-bottom: 24px; line-height: 1.6;">
                ${evt.shortDescription || evt.description || "Tham gia cùng chúng tôi trong sự kiện đặc biệt này."}
              </p>
              <div>
                ${buyButton}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // 3. CARD (Compact, can be used in grids)
  if (style === "card") {
    return `
      ${buttonStyles}
      <section class="company-event-block style-card" open_popup="true" contenteditable="false" data-gjs-editable="false" data-gjs-droppable="false" data-gjs-name="Event Block (Card)" style="padding: 40px 0; background: #fff;">
        <div style="max-width: 400px; margin: 0 auto; padding: 0 20px;">
          <div style="
            background: #fff; 
            border: 1px solid #e2e8f0; 
            border-radius: 8px; 
            overflow: hidden; 
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
          ">
            <div style="width: 100%; height: 200px; background-image: url('${backgroundImageValue}'); background-size: cover; background-position: center;"></div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column;">
              <div style="color: #2563eb; font-size: 12px; font-weight: 600; margin-bottom: 4px; text-transform: uppercase;">${evt.category || "Sự kiện"}</div>
              <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #0f172a; line-height: 1.4;">${eventNameText}</h3>
              <div style="margin-bottom: 16px; color: #64748b; font-size: 14px;">
                <div style="margin-bottom: 4px;">📅 ${
                  isTemplateMode
                    ? "[ev_start_date]"
                    : new Date(evt.startDate).toLocaleDateString("vi-VN")
                }</div>
                <div>📍 ${eventLocationText}</div>
              </div>
              <div style="margin-top: auto;">
                 ${buyButton.replace("padding: 10px 24px;", "padding: 8px 16px; width: 100%; box-sizing: border-box;")}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  return "";
}

interface TicketTemplate {
  id: string;
  name: string;
  description: string;
  html: string;
  svg?: string;
  eventId?: string;
  render?: (evt: any) => string;
  eventKey?: string;
  runtimeCode?: string;
}

const showTicketTemplateDialog = ref(false);
const hoveredTemplateId = ref<string | null>(null);

function getMockEvent() {
  return {
    id: "mock-event-1",
    name: "Sự Kiện Demo",
    location: "Online / Tại chỗ",
    startDate: new Date().toISOString(),
    tickets: [
      {
        id: "t1",
        name: "Vé Tiêu Chuẩn",
        price: 200000,
        currency: "VND",
        description: "Vé vào cửa cơ bản",
      },
      {
        id: "t2",
        name: "Vé VIP",
        price: 500000,
        currency: "VND",
        description: "Bao gồm tiệc trà và chỗ ngồi tốt nhất",
      },
      {
        id: "t3",
        name: "Vé Nhóm (5 người)",
        price: 900000,
        currency: "VND",
        description: "Tiết kiệm 10% khi mua theo nhóm",
      },
    ],
  };
}

const ticketTemplates: TicketTemplate[] = [
  {
    id: "ticket-list-default",
    name: "Danh sách vé (Mặc định)",
    description: "Hiển thị toàn bộ danh sách vé của sự kiện",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" stroke-width="1" stroke="#64748b" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l11 0" /><path d="M9 12l11 0" /><path d="M9 18l11 0" /><path d="M5 6l0 .01" /><path d="M5 12l0 .01" /><path d="M5 18l0 .01" /></svg>`,
    html: `<div style="padding: 20px; text-align: center; color: #666;">Danh sách vé (Dynamic)</div>`,
    render: (evt: any) => {
      const uniqueId =
        "ticket-renderer-" + Math.random().toString(36).substr(2, 9);
      return `
        <div id="${uniqueId}" data-ticket-renderer="true" data-event-id="${evt.id}" data-template-id="ticket-list-default" style="min-height: 200px;">
           <div style="padding: 20px; text-align: center; color: #666;">Đang tải vé...</div>
        </div>
      `;
    },
  },
  {
    id: "basic-card",
    name: "Thẻ Vé Cơ Bản",
    description: "Thiết kế đơn giản, tập trung vào thông tin chính",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" stroke-width="1" stroke="#64748b" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 5l0 2" /><path d="M15 11l0 2" /><path d="M15 17l0 2" /><path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" /></svg>`,
    eventId: "event-1",
    html: `<div style="padding: 20px; text-align: center; color: #666;">Thẻ Vé Cơ Bản (Dynamic)</div>`,
    render: (evt: any) => {
      const uniqueId =
        "ticket-renderer-" + Math.random().toString(36).substr(2, 9);
      return `
        <div id="${uniqueId}" data-ticket-renderer="true" data-event-id="${evt.id}" data-template-id="basic-card" style="min-height: 200px;">
           <div style="padding: 20px; text-align: center; color: #666;">Đang tải vé...</div>
        </div>
      `;
    },
  },
  {
    id: "featured-card",
    name: "Thẻ Vé Nổi Bật",
    description: "Có viền màu và nhãn nổi bật để thu hút sự chú ý",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" stroke-width="1" stroke="#64748b" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3.604 7.197l7.138 -3.109a0.96 .96 0 0 1 1.27 .527l4.924 11.902a1.004 1.004 0 0 1 -.514 1.304l-7.137 3.109a0.96 .96 0 0 1 -1.271 -.527l-4.924 -11.903a1.005 1.005 0 0 1 .514 -1.304z" /><path d="M15 4h1a1 1 0 0 1 1 1v3.5" /><path d="M20 6c.264 .112 .52 .217 .768 .315a1 1 0 0 1 .53 1.311l-2.298 5.374" /></svg>`,
    eventId: "event-1",
    html: `<div style="padding: 20px; text-align: center; color: #666;">Thẻ Vé Nổi Bật (Dynamic)</div>`,
    render: (evt: any) => {
      const uniqueId =
        "ticket-renderer-" + Math.random().toString(36).substr(2, 9);
      return `
        <div id="${uniqueId}" data-ticket-renderer="true" data-event-id="${evt.id}" data-template-id="featured-card" style="min-height: 200px;">
           <div style="padding: 20px; text-align: center; color: #666;">Đang tải vé...</div>
        </div>
      `;
    },
  },
  {
    id: "horizontal-card",
    name: "Thẻ Ngang",
    description: "Bố cục ngang phù hợp cho danh sách vé",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" stroke-width="1" stroke="#64748b" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 5h8" /><path d="M13 9h5" /><path d="M13 15h8" /><path d="M13 19h5" /><path d="M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /></svg>`,
    eventId: "event-1",
    html: `<div style="padding: 20px; text-align: center; color: #666;">Thẻ Ngang (Dynamic)</div>`,
    render: (evt: any) => {
      const uniqueId =
        "ticket-renderer-" + Math.random().toString(36).substr(2, 9);
      return `
        <div id="${uniqueId}" data-ticket-renderer="true" data-event-id="${evt.id}" data-template-id="horizontal-card" style="min-height: 200px;">
           <div style="padding: 20px; text-align: center; color: #666;">Đang tải vé...</div>
        </div>
      `;
    },
  },
  {
    id: "minimal-card",
    name: "Thẻ Tối Giản",
    description: "Thiết kế tinh tế, ít chi tiết thừa",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" stroke-width="1" stroke="#64748b" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M4 13m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M14 4m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" /></svg>`,
    eventId: "event-1",
    html: `<div style="padding: 20px; text-align: center; color: #666;">Thẻ Tối Giản (Dynamic)</div>`,
    render: (evt: any) => {
      const uniqueId =
        "ticket-renderer-" + Math.random().toString(36).substr(2, 9);
      return `
        <div id="${uniqueId}" data-ticket-renderer="true" data-event-id="${evt.id}" data-template-id="minimal-card" style="min-height: 200px;">
           <div style="padding: 20px; text-align: center; color: #666;">Đang tải vé...</div>
        </div>
      `;
    },
  },
  {
    id: "countdown-timer",
    name: "Đếm ngược sự kiện",
    description: "Đếm ngược thời gian đến ngày bắt đầu sự kiện",
    svg: "<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' stroke-width='1' stroke='#64748b' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M12 8v4l3 3' /><path d='M12 21a9 9 0 1 1 0 -18a9 9 0 0 1 0 18z' /></svg>",
    html: "<div class='countdown-timer' style='padding:24px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;text-align:center'><h3>Đếm ngược</h3><div class='countdown-values' style='display:flex;gap:16px;justify-content:center;margin:16px 0'><div class='countdown-item' style='padding:12px;background:#f8fafc;border-radius:8px'><div class='countdown-number countdown-days' style='font-size:24px;font-weight:700'>00</div><div class='countdown-label' style='font-size:12px;color:#64748b'>Ngày</div></div><div class='countdown-item' style='padding:12px;background:#f8fafc;border-radius:8px'><div class='countdown-number countdown-hours' style='font-size:24px;font-weight:700'>00</div><div class='countdown-label' style='font-size:12px;color:#64748b'>Giờ</div></div><div class='countdown-item' style='padding:12px;background:#f8fafc;border-radius:8px'><div class='countdown-number countdown-minutes' style='font-size:24px;font-weight:700'>00</div><div class='countdown-label' style='font-size:12px;color:#64748b'>Phút</div></div><div class='countdown-item' style='padding:12px;background:#f8fafc;border-radius:8px'><div class='countdown-number countdown-seconds' style='font-size:24px;font-weight:700'>00</div><div class='countdown-label' style='font-size:12px;color:#64748b'>Giây</div></div></div></div>",
    runtimeCode: `(function(){function setup(el){try{var raw=el.getAttribute('data-event-json')||'';var evt=null;try{evt=raw?JSON.parse(raw):null;}catch(_){evt=null;}var s=el.getAttribute('data-start-date')||'';var start=s?new Date(s):(evt&&evt.startDate?new Date(evt.startDate):new Date());if(!el.__cdStart){ el.__cdStart = start; }function pad(n){return String(n).padStart(2,'0');}function upd(){try{var now=new Date();var base=el.__cdStart||start;var diff=Math.max(0,base-now);var days=Math.floor(diff/(1000*60*60*24));var hours=Math.floor((diff%(1000*60*60*24))/(1000*60*60));var minutes=Math.floor((diff%(1000*60*60))/(1000*60));var seconds=Math.floor((diff%(1000*60))/1000);var d=el.querySelector('.countdown-days');var h=el.querySelector('.countdown-hours');var m=el.querySelector('.countdown-minutes');var sEl=el.querySelector('.countdown-seconds');if(d)d.textContent=pad(days);if(h)h.textContent=pad(hours);if(m)m.textContent=pad(minutes);if(sEl)sEl.textContent=pad(seconds);}catch(_){}}upd();}catch(_){}}function bindAll(root){(root||document).querySelectorAll('.countdown-timer').forEach(setup);}bindAll(document);try{var mo=new MutationObserver(function(muts){for(var i=0;i<muts.length;i++){var rec=muts[i];rec.addedNodes&&rec.addedNodes.forEach(function(n){if(n&&n.nodeType===1){if(n.classList&&n.classList.contains('countdown-timer'))setup(n);var inner=n.querySelectorAll?n.querySelectorAll('.countdown-timer'):[];inner.forEach(setup);}});}});mo.observe(document.body||document.documentElement,{childList:true,subtree:true});setInterval(function(){try{bindAll(document);}catch(_){}},1000);}catch(_){}})();`,
    render: (evt: any) => {
      const startDate = evt.startDate ? new Date(evt.startDate) : new Date();
      return `
        <div
          class='countdown-timer'
          data-ticket-template-id="countdown-timer"
          data-event-json='${JSON.stringify(evt).replace(/'/g, "&apos;").replace(/"/g, "&quot;")}'
          data-start-date='${startDate.toISOString()}'
          style='padding:24px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;text-align:center'
        >
          <h3 style='margin:0 0 16px;font-size:18px;font-weight:600'>Đếm ngược đến sự kiện</h3>
          <div class='countdown-values' style='display:flex;gap:16px;justify-content:center;margin:16px 0'>
            <div class='countdown-item' style='padding:12px;background:#f8fafc;border-radius:8px'>
              <div class='countdown-number countdown-days' style='font-size:24px;font-weight:700'>00</div>
              <div class='countdown-label' style='font-size:12px;color:#64748b'>Ngày</div>
            </div>
            <div class='countdown-item' style='padding:12px;background:#f8fafc;border-radius:8px'>
              <div class='countdown-number countdown-hours' style='font-size:24px;font-weight:700'>00</div>
              <div class='countdown-label' style='font-size:12px;color:#64748b'>Giờ</div>
            </div>
            <div class='countdown-item' style='padding:12px;background:#f8fafc;border-radius:8px'>
              <div class='countdown-number countdown-minutes' style='font-size:24px;font-weight:700'>00</div>
              <div class='countdown-label' style='font-size:12px;color:#64748b'>Phút</div>
            </div>
            <div class='countdown-item' style='padding:12px;background:#f8fafc;border-radius:8px'>
              <div class='countdown-number countdown-seconds' style='font-size:24px;font-weight:700'>00</div>
              <div class='countdown-label' style='font-size:12px;color:#64748b'>Giây</div>
            </div>
          </div>
        </div>
      `;
    },
  },
];

function addCountdownBlock() {
  if (!editor) return;
  try {
    countdownTargetTimer = null;
    const evtData =
      (companyEvents.value && companyEvents.value[0]) || getMockEvent();
    const base = evtData.startDate ? new Date(evtData.startDate) : new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const toLocalInput = (d: Date) => {
      const y = d.getFullYear();
      const m = pad(d.getMonth() + 1);
      const da = pad(d.getDate());
      const h = pad(d.getHours());
      const mi = pad(d.getMinutes());
      return `${y}-${m}-${da}T${h}:${mi}`;
    };
    pendingCountdownEvent.value = evtData;
    countdownDateInput.value = toLocalInput(base);
    showCountdownDialog.value = true;
  } catch {
    showFeedback("Không thể mở cài đặt đếm ngược", "error");
  }
}

function openTicketTemplateDialog() {
  showTicketTemplateDialog.value = true;
}

const showBannerTemplateDialog = ref(false);
const bannerTemplates = [
  {
    id: "center",
    name: "Giữa (Center)",
    description: "Nội dung căn giữa, hình nền hoặc màu nền",
    preview: `<div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; text-align:center; background:#f3f4f6; padding:10px;">
                <div style="width:60%; height:10px; background:#d1d5db; margin-bottom:5px;"></div>
                <div style="width:40%; height:10px; background:#d1d5db; margin-bottom:10px;"></div>
                <div style="width:20px; height:8px; background:#3b82f6;"></div>
              </div>`,
    html: `
      <section class="banner-block" style="padding: 100px 20px; text-align: center; background-color: #f3f4f6; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px;">
        <h1 style="font-size: 3rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">Tiêu đề Banner</h1>
        <p style="font-size: 1.25rem; color: #4b5563; max-width: 600px; margin-bottom: 2rem;">Mô tả ngắn gọn về sự kiện hoặc nội dung chính của bạn.</p>
        <a href="#" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">Xem chi tiết</a>
      </section>
    `,
  },
  {
    id: "left",
    name: "Trái (Left)",
    description: "Nội dung bên trái, hình ảnh bên phải",
    preview: `<div style="display:flex; height:100%; background:#f3f4f6;">
                <div style="flex:1; padding:10px; display:flex; flex-direction:column; justify-content:center;">
                   <div style="width:80%; height:8px; background:#d1d5db; margin-bottom:4px;"></div>
                   <div style="width:60%; height:8px; background:#d1d5db; margin-bottom:8px;"></div>
                   <div style="width:20px; height:6px; background:#3b82f6;"></div>
                </div>
                <div style="flex:1; background:#e5e7eb; display:flex; align-items:center; justify-content:center; color:#9ca3af; font-size:10px;">IMG</div>
              </div>`,
    html: `
      <section class="banner-block" style="display: flex; flex-wrap: wrap; align-items: center; min-height: 400px; background-color: #ffffff;">
        <div style="flex: 1; padding: 60px 40px; min-width: 300px;">
          <h1 style="font-size: 3rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">Tiêu đề Banner</h1>
          <p style="font-size: 1.25rem; color: #4b5563; margin-bottom: 2rem;">Mô tả ngắn gọn về sự kiện hoặc nội dung chính của bạn.</p>
          <a href="#" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">Xem chi tiết</a>
        </div>
        <div style="flex: 1; min-width: 300px; height: 400px; background-color: #e5e7eb; display: flex; align-items: center; justify-content: center; color: #9ca3af;">
          <img src="https://placehold.co/600x400" alt="Banner Image" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
      </section>
    `,
  },
  {
    id: "right",
    name: "Phải (Right)",
    description: "Nội dung bên phải, hình ảnh bên trái",
    preview: `<div style="display:flex; height:100%; background:#f3f4f6;">
                <div style="flex:1; background:#e5e7eb; display:flex; align-items:center; justify-content:center; color:#9ca3af; font-size:10px;">IMG</div>
                <div style="flex:1; padding:10px; display:flex; flex-direction:column; justify-content:center;">
                   <div style="width:80%; height:8px; background:#d1d5db; margin-bottom:4px;"></div>
                   <div style="width:60%; height:8px; background:#d1d5db; margin-bottom:8px;"></div>
                   <div style="width:20px; height:6px; background:#3b82f6;"></div>
                </div>
              </div>`,
    html: `
      <section class="banner-block" style="display: flex; flex-wrap: wrap; align-items: center; min-height: 400px; background-color: #ffffff;">
        <div style="flex: 1; min-width: 300px; height: 400px; background-color: #e5e7eb; display: flex; align-items: center; justify-content: center; color: #9ca3af;">
          <img src="https://placehold.co/600x400" alt="Banner Image" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <div style="flex: 1; padding: 60px 40px; min-width: 300px;">
          <h1 style="font-size: 3rem; font-weight: 700; margin-bottom: 1rem; color: #111827;">Tiêu đề Banner</h1>
          <p style="font-size: 1.25rem; color: #4b5563; margin-bottom: 2rem;">Mô tả ngắn gọn về sự kiện hoặc nội dung chính của bạn.</p>
          <a href="#" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">Xem chi tiết</a>
        </div>
      </section>
    `,
  },
];
const showCountdownDialog = ref(false);
const countdownDateInput = ref<string>("");
const pendingCountdownEvent = ref<any>(null);
let countdownTargetTimer: HTMLElement | null = null;
function applyCountdownSettings() {
  if (!editor) return;
  try {
    const evtData = pendingCountdownEvent.value || getMockEvent();
    const input = countdownDateInput.value || "";
    const target = input
      ? new Date(input)
      : evtData.startDate
        ? new Date(evtData.startDate)
        : new Date();
    const dateStr = input || target.toISOString();
    const tpl = ticketTemplates.find((t) => t.id === "countdown-timer");
    if (countdownTargetTimer) {
      try {
        if (tpl && (tpl as any).runtimeCode) {
          try {
            injectSavedRuntime((tpl as any).runtimeCode as string);
          } catch {}
        }
        countdownTargetTimer.setAttribute(
          "data-ticket-template-id",
          "countdown-timer",
        );
        countdownTargetTimer.setAttribute("data-event-key", "primary");
        countdownTargetTimer.setAttribute(
          "data-event-json",
          JSON.stringify(evtData),
        );
        countdownTargetTimer.setAttribute("data-start-date", dateStr);
        (countdownTargetTimer as any).__cdStart = target;
        try {
          const root = (editor as Editor | undefined)?.getWrapper();
          if (root) {
            const comps = (root.find(".countdown-timer") || []) as Component[];
            const comp =
              comps.find(
                (c) => c && c.getEl && c.getEl() === countdownTargetTimer,
              ) || null;
            if (comp) {
              const attrs = (comp.getAttributes?.() || {}) as Record<
                string,
                string
              >;
              comp.setAttributes?.({
                ...attrs,
                "data-ticket-template-id": "countdown-timer",
                "data-event-key": "primary",
                "data-event-json": JSON.stringify(evtData),
                "data-start-date": dateStr,
              });
            }
          }
        } catch {}
        const pad = (n: number) => String(n).padStart(2, "0");
        const now = new Date();
        let diff = target.getTime() - now.getTime();
        if (!isFinite(diff)) diff = 0;
        if (diff < 0) diff = 0;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        const d = countdownTargetTimer.querySelector(".countdown-days");
        const h = countdownTargetTimer.querySelector(".countdown-hours");
        const m = countdownTargetTimer.querySelector(".countdown-minutes");
        const sEl = countdownTargetTimer.querySelector(".countdown-seconds");
        if (d) (d as HTMLElement).textContent = pad(days);
        if (h) (h as HTMLElement).textContent = pad(hours);
        if (m) (m as HTMLElement).textContent = pad(minutes);
        if (sEl) (sEl as HTMLElement).textContent = pad(seconds);
        showFeedback("Đã cập nhật đếm ngược", "success");
      } catch {
        showFeedback("Không thể cập nhật đếm ngược", "error");
      } finally {
        try {
          syncHtmlDebounced();
        } catch {}
        showCountdownDialog.value = false;
        countdownTargetTimer = null;
      }
      return;
    }
    if (tpl && (tpl as any).runtimeCode) {
      try {
        injectSavedRuntime((tpl as any).runtimeCode as string);
      } catch {}
    }
    let finalHtml = "";
    if (tpl && tpl.render) {
      try {
        const html = tpl.render(evtData);
        finalHtml = html.replace(
          /data-start-date='[^']*'/,
          `data-start-date='${dateStr}'`,
        );
      } catch {
        finalHtml = tpl.html;
      }
    }
    if (!finalHtml) {
      finalHtml = `
        <div
          class='countdown-timer'
          data-ticket-template-id="countdown-timer"
          data-event-key="primary"
          data-event-json='${JSON.stringify(evtData).replace(/'/g, "&apos;").replace(/"/g, "&quot;")}'
          data-start-date='${dateStr}'
          style='padding:24px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;text-align:center'
        >
          <h3 style='margin:0 0 16px;font-size:18px;font-weight:600'>Đếm ngược đến sự kiện</h3>
          <div class='countdown-values' style='display:flex;gap:16px;justify-content:center;margin:16px 0'>
            <div class='countdown-item' style='padding:12px;background:#f8fafc;border-radius:8px'>
              <div class='countdown-number countdown-days' style='font-size:24px;font-weight:700'>00</div>
              <div class='countdown-label' style='font-size:12px;color:#64748b'>Ngày</div>
            </div>
            <div class='countdown-item' style='padding:12px;background:#f8fafc;border-radius:8px'>
              <div class='countdown-number countdown-hours' style='font-size:24px;font-weight:700'>00</div>
              <div class='countdown-label' style='font-size:12px;color:#64748b'>Giờ</div>
            </div>
            <div class='countdown-item' style='padding:12px;background:#f8fafc;border-radius:8px'>
              <div class='countdown-number countdown-minutes' style='font-size:24px;font-weight:700'>00</div>
              <div class='countdown-label' style='font-size:12px;color:#64748b'>Phút</div>
            </div>
            <div class='countdown-item' style='padding:12px;background:#f8fafc;border-radius:8px'>
              <div class='countdown-number countdown-seconds' style='font-size:24px;font-weight:700'>00</div>
              <div class='countdown-label' style='font-size:12px;color:#64748b'>Giây</div>
            </div>
          </div>
        </div>
      `;
    }
    const blockHtml = `
      <section
        class="wb-section countdown-block"
        data-countdown-block="true"
        data-event-key="primary"
        data-gjs-name="Khối Đếm Ngược"
        data-event-json='${JSON.stringify(evtData)
          .replace(/'/g, "&apos;")
          .replace(/"/g, "&quot;")}'
        style="padding: 20px;"
      >
        ${finalHtml}
      </section>
    `;
    const currentSelected = editor.getSelected();
    if (currentSelected) {
      editor.selectRemove(currentSelected);
    }
    const component = editor.addComponents(blockHtml);
    const inserted = Array.isArray(component) ? component[0] : component;
    if (inserted) {
      try {
        inserted.addClass("countdown-block");
        inserted.setAttributes({
          "data-countdown-block": "true",
          "data-gjs-name": "Khối Đếm Ngược",
        });
        (inserted as any).set &&
          (inserted as any).set({ name: "Khối Đếm Ngược" });
      } catch {}
      editor.select(inserted as any);
      try {
        const el = inserted.getEl();
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } catch {}
      try {
        const el = inserted.getEl() as HTMLElement | null;
        const timer = el?.querySelector(
          ".countdown-timer",
        ) as HTMLElement | null;
        if (timer) {
          const raw = timer.getAttribute("data-event-json") || "";
          let evt: any = null;
          try {
            evt = raw ? JSON.parse(raw) : null;
          } catch {
            evt = null;
          }
          const s =
            timer.getAttribute("data-start-date") ||
            (evt && evt.startDate) ||
            "";
          const start = s
            ? new Date(s)
            : evt && evt.startDate
              ? new Date(evt.startDate)
              : new Date();
          const pad = (n: number) => String(n).padStart(2, "0");
          const upd = () => {
            try {
              const now = new Date();
              let diff = start.getTime() - now.getTime();
              if (!isFinite(diff)) diff = 0;
              if (diff < 0) diff = 0;
              const days = Math.floor(diff / (1000 * 60 * 60 * 24));
              const hours = Math.floor(
                (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
              );
              const minutes = Math.floor(
                (diff % (1000 * 60 * 60)) / (1000 * 60),
              );
              const seconds = Math.floor((diff % (1000 * 60)) / 1000);
              const d = timer.querySelector(".countdown-days");
              const h = timer.querySelector(".countdown-hours");
              const m = timer.querySelector(".countdown-minutes");
              const sEl = timer.querySelector(".countdown-seconds");
              if (d) (d as HTMLElement).textContent = pad(days);
              if (h) (h as HTMLElement).textContent = pad(hours);
              if (m) (m as HTMLElement).textContent = pad(minutes);
              if (sEl) (sEl as HTMLElement).textContent = pad(seconds);
            } catch {}
          };
          upd();
        }
      } catch {}
    }
    recordInsert();
    showCountdownDialog.value = false;
    showFeedback("Đã thêm khối đếm ngược", "success");
  } catch {
    showFeedback("Không thể thêm khối đếm ngược", "error");
  }
}

function openBannerTemplateDialog() {
  try {
    console.log("Opening banner template dialog");
    // Debug alert to confirm click
    // alert("Opening Banner Dialog");
    showBannerTemplateDialog.value = true;
    // Force UI update just in case
    nextTick(() => {
      const dialog = document.getElementById("banner-template-dialog");
      console.log("Banner dialog element:", dialog);
      if (dialog) dialog.focus();
    });
  } catch (e) {
    console.error("Error opening banner dialog:", e);
    alert("Error opening banner dialog: " + (e as any).message);
  }
}

function selectBannerTemplate(tpl: any) {
  if (!editor) return;

  const blockHtml = tpl.html;

  // Check if we are replacing an existing banner
  const currentSelected = editor.getSelected();
  let inserted;
  let bannerToReplace = null;

  // Find banner root if selected or parent
  if (currentSelected) {
    let current = currentSelected;
    let depth = 0;
    while (current && depth < 5) {
      const attrs = current.getAttributes ? current.getAttributes() : {};
      if (attrs["data-banner-block"] === "true") {
        bannerToReplace = current;
        break;
      }
      current = (current.parent ? current.parent() : null) as any;
      depth++;
    }
  }

  if (bannerToReplace) {
    // Replace existing banner
    // Use replaceWith if available, otherwise append and remove
    try {
      const newComps = bannerToReplace.replaceWith(blockHtml);
      inserted = Array.isArray(newComps) ? newComps[0] : newComps;
    } catch (e) {
      // Fallback if replaceWith fails
      const parent = bannerToReplace.parent();
      const index = bannerToReplace.index();
      if (parent) {
        const comps = parent.get("components");
        if (comps) {
          comps.add(blockHtml, { at: index });
          inserted = comps.at(index);
          bannerToReplace.remove();
        }
      }
    }
  } else {
    // Add new banner
    if (currentSelected) {
      editor.selectRemove(currentSelected);
    }
    const component = editor.addComponents(blockHtml);
    inserted = Array.isArray(component) ? component[0] : component;
  }

  if (inserted) {
    try {
      inserted.addClass("banner-block");
      inserted.setAttributes({
        "data-banner-block": "true",
        "data-banner-id": tpl.id,
        "data-gjs-name": `Banner (${tpl.name})`,
      });
      (inserted as any).set &&
        (inserted as any).set({ name: `Banner (${tpl.name})` });
    } catch {}
    // Select the new component
    editor.select(inserted as any);

    // Scroll into view
    try {
      const el = inserted.getEl();
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } catch {}
  }

  showBannerTemplateDialog.value = false;
  recordInsert();
  showFeedback(`Đã cập nhật Banner mẫu: ${tpl.name}`, "success");
}

function selectTicketTemplate(tpl: TicketTemplate) {
  if (!editor) return;
  ensureTicketingPopup();

  // Check for duplicate blocks
  const wrapper = editor.getWrapper();
  const existing = wrapper?.find(`[data-ticket-template-id="${tpl.id}"]`);

  if (existing && existing.length > 0) {
    showFeedback("⚠️ Mẫu vé này đã có trên trang (đã thêm bản sao)", "info");
  }

  // Check canvas fullness (heuristic)
  const rootComponents = wrapper?.components();
  if (rootComponents && rootComponents.length > 15) {
    showFeedback(
      "⚠️ Trang đã có nhiều thành phần, hãy kiểm tra bố cục",
      "info",
    );
  }

  let finalHtml = tpl.html;
  let evtData: any = null;

  // Use dynamic rendering if available
  if (tpl.render) {
    if (companyEvents.value.length > 0) {
      evtData = companyEvents.value[0];
    } else {
      evtData = getMockEvent();
    }
    try {
      finalHtml = tpl.render(evtData);
    } catch (e) {
      console.error("Error rendering ticket template:", e);
    }
  }

  // Create a wrapper section for consistency with other blocks
  const blockHtml = `
    <section
      class="wb-section ticket-block"
      data-ticket-block="true"
      data-ticket-block-id="${tpl.id}"
      data-event-key="${tpl.eventKey || "primary"}"
      data-gjs-name="Khối Mua Vé (${tpl.name})"
      ${
        evtData
          ? `data-event-json='${JSON.stringify(evtData)
              .replace(/'/g, "&apos;")
              .replace(/"/g, "&quot;")}'`
          : ""
      }
      style="padding: 20px;"
    >
      ${finalHtml}
    </section>
  `;

  // Deselect current component to ensure the new block is added to the root (wrapper)
  // This prevents accidental nesting inside small components and ensures a clean layout flow
  const currentSelected = editor.getSelected();
  if (currentSelected) {
    editor.selectRemove(currentSelected);
  }

  const component = editor.addComponents(blockHtml);
  const inserted = Array.isArray(component) ? component[0] : component;

  if (inserted) {
    try {
      inserted.addClass("ticket-block");
      inserted.setAttributes({
        "data-ticket-block": "true",
        "data-ticket-block-id": tpl.id,
        "data-gjs-name": `Khối Mua Vé (${tpl.name})`,
      });
      (inserted as any).set &&
        (inserted as any).set({ name: `Khối Mua Vé (${tpl.name})` });
    } catch {}
    // Select the new component
    editor.select(inserted as any);

    // Scroll into view
    try {
      const el = inserted.getEl();
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        // Add a temporary highlight effect
        const originalTransition = el.style.transition;
        const originalTransform = el.style.transform;

        el.style.transition = "all 0.5s ease";
        el.style.transform = "scale(1.05)";

        setTimeout(() => {
          el.style.transform = originalTransform || "";
          setTimeout(() => {
            el.style.transition = originalTransition || "";
          }, 500);
        }, 300);
      }
    } catch (e) {
      console.error("Error scrolling to component:", e);
    }
  }

  recordInsert();
  showTicketTemplateDialog.value = false;
  showFeedback("Đã thêm thẻ vé thành công", "success");
}

function rebindTicketBlocksAfterSuperApply() {
  if (!editor) return;
  if (!companyEvents.value.length) return;
  const evt = companyEvents.value[0];
  const wrapper = editor.getWrapper();
  if (!wrapper) return;
  const evtJson = JSON.stringify(evt)
    .replace(/'/g, "&apos;")
    .replace(/"/g, "&quot;");
  const models = wrapper.find(
    '[data-ticket-block="true"], [data-ticket-template-id]',
  );
  models.forEach((m: any) => {
    try {
      const attrs = m.getAttributes?.() || {};
      const el = m.getEl?.() as HTMLElement | null;
      const keyAttr =
        attrs["data-event-key"] || el?.getAttribute("data-event-key");
      if (!keyAttr || keyAttr !== "primary") return;
      const tplIdAttr =
        attrs["data-ticket-block-id"] ||
        el?.getAttribute("data-ticket-block-id") ||
        el?.getAttribute("data-ticket-template-id");
      if (!tplIdAttr) return;
      const tpl = ticketTemplates.find((t) => t.id === tplIdAttr);
      if (!tpl) return;
      let finalHtml = tpl.html;
      if (tpl.render) {
        try {
          finalHtml = tpl.render(evt);
        } catch {
          finalHtml = tpl.html;
        }
      }
      m.addAttributes?.({
        "data-event-json": evtJson,
        "data-event-key": tpl.eventKey || "primary",
      });
      m.components(finalHtml);
    } catch {}
  });
}

const companyId = ref<string | null>(auth.user?.companyId || null);
const isSuperAdmin = computed(() => auth.user?.role?.level === 1);
const canImportSuper = computed(
  () => isCompanyAdmin.value || isSuperAdminPerm.value,
);
const toast = useToast();
const showSuperTemplatesDialog = ref(false);
const superTplLoading = ref(false);
const isApplyingTemplate = ref(false);
const superTemplatesMeta = ref<SuperTemplateMeta[]>([]);
const superTplQuery = ref("");
const showSaveSuperDialog = ref(false);
const superTplName = ref("");
const superTplDesc = ref("");
const filteredSuperTemplates = computed(() => {
  const q = (superTplQuery.value || "").trim().toLowerCase();
  if (!q) return superTemplatesMeta.value;
  return superTemplatesMeta.value.filter((t) =>
    (t.name || "").toLowerCase().includes(q),
  );
});

const editorCanvasRef = ref<any>(null);
const canvasRef = ref<HTMLElement | null>(null);
const pendingBlockId = ref<string | null>(null);
const isAddingBlock = ref(false);
const lastImportedSnapshot = ref<any | null>(null);
const lastSavePayload = ref<any | null>(null);

function ensureTicketingPopup() {
  const w = window as any;
  try {
    w.__wbEditor = true;
  } catch {}
  if (!w.__tkOpen) {
    w.__tkOpen = function (opts: {
      eventId: string;
      ticketId?: string;
      baseUrl?: string;
    }) {
      if ((window as any).__wbEditor) {
        return;
      }
      const base = (window as any).__ticketingBaseUrl || window.location.origin;
      const B = (opts.baseUrl || base).replace(/\/$/, "");
      function P() {
        if ((window as any).openTicketingPopup) {
          (window as any).openTicketingPopup({
            eventId: opts.eventId,
            ticketId: opts.ticketId,
            baseUrl: B,
          });
        } else {
          setTimeout(P, 50);
        }
      }
      if (!(window as any).openTicketingPopup) {
        const existed = document.querySelector(
          'script[data-tk-popup="1"]',
        ) as HTMLScriptElement | null;
        if (!existed) {
          const s = document.createElement("script");
          s.src = `${B}/ticketing/popup.js`;
          s.async = true;
          s.dataset.tkPopup = "1";
          document.head.appendChild(s);
        }
        setTimeout(P, 0);
      } else {
        (window as any).openTicketingPopup({
          eventId: opts.eventId,
          ticketId: opts.ticketId,
          baseUrl: B,
        });
      }
    };
  }
  if (!w.openTicketingPopup) {
    const existed = document.querySelector(
      'script[data-tk-popup="1"]',
    ) as HTMLScriptElement | null;
    if (!existed) {
      let baseUrl = "";
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        if (apiUrl && apiUrl.startsWith("http")) {
          baseUrl = new URL(apiUrl).origin;
        } else {
          baseUrl = window.location.origin;
        }
      } catch (e) {
        baseUrl = window.location.origin;
      }

      const s = document.createElement("script");
      s.src = `${baseUrl}/ticketing/popup.js`;
      s.async = true;
      s.dataset.tkPopup = "1";
      document.head.appendChild(s);

      // Also inject render-tickets.js
      const s2 = document.createElement("script");
      s2.src = `${baseUrl}/ticketing/render-tickets.js`;
      s2.async = true;
      document.head.appendChild(s2);
    }
  }

  // Ensure scripts are in installedHeadScripts for export
  let baseUrl = "";
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (apiUrl && apiUrl.startsWith("http")) {
      baseUrl = new URL(apiUrl).origin;
    } else {
      baseUrl = window.location.origin;
    }
  } catch (e) {
    baseUrl = window.location.origin;
  }

  const popupSrc = `${baseUrl}/ticketing/popup.js`;
  const renderSrc = `${baseUrl}/ticketing/render-tickets.js`;

  // We rely on getExportHtml to inject these with cache busting
  // so we don't add them to installedHeadScripts here to avoid duplicates
  // if (!installedHeadScripts.value.some((s) => s.src && s.src.includes("/ticketing/popup.js"))) {
  //   installedHeadScripts.value.push({ src: popupSrc, async: true });
  // }
  // if (!installedHeadScripts.value.some((s) => s.src && s.src.includes("/ticketing/render-tickets.js"))) {
  //   installedHeadScripts.value.push({ src: renderSrc, async: true });
  // }
}

onMounted(() => {
  ensureTicketingPopup();
});

onMounted(() => {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      showMenu.value = false;
      showHelpDialog.value = false;
      showImportDialog.value = false;
      showHeaderPickerDialog.value = false;
      showExportCodeDialog.value = false;
      showPageDialog.value = false;
    }
  };
  window.addEventListener("keydown", onKeyDown);
  (window as any).__wbOnKeyDown = onKeyDown;
});
onBeforeUnmount(() => {
  const fn = (window as any).__wbOnKeyDown as
    | ((e: KeyboardEvent) => void)
    | undefined;
  if (fn) {
    window.removeEventListener("keydown", fn);
    (window as any).__wbOnKeyDown = undefined;
  }
});
const metricsOpen = ref(false);
const uxMetrics = reactive({
  inserts: 0,
  insertSamples: 0,
  lastInsertMs: 0,
  avgInsertMs: 0,
  quickMenuOpens: 0,
  quickMenuKeyboardOps: 0,
  sidebarInserts: 0,
  sliderKeyOps: 0,
  sliderScrollCount: 0,
  sliderFPSAvg: 0,
  lastAction: "",
  memUsedMB: 0,
  heapTotalMB: 0,
  heapLimitMB: 0,
  domNodes: 0,
  grapesComponents: 0,
  dupRoots: 0,
  dupEstNodes: 0,
  dupLastMs: 0,
});
let insertStartAt = 0;
function recordInsert() {
  if (insertStartAt > 0) {
    const dt = performance.now() - insertStartAt;
    uxMetrics.lastInsertMs = Math.round(dt);
    uxMetrics.avgInsertMs = Math.round(
      (uxMetrics.avgInsertMs * uxMetrics.insertSamples + dt) /
        (uxMetrics.insertSamples + 1),
    );
    uxMetrics.insertSamples += 1;
    insertStartAt = 0;
  }
  uxMetrics.inserts += 1;
  uxMetrics.lastAction = "insert";
  saveMetrics();
}
function saveMetrics() {
  try {
    localStorage.setItem("wbUxMetrics", JSON.stringify(uxMetrics));
  } catch {}
}
function loadMetrics() {
  try {
    const raw = localStorage.getItem("wbUxMetrics");
    if (raw) {
      const o = JSON.parse(raw);
      Object.assign(uxMetrics, o);
    }
  } catch {}
}
function resetMetrics() {
  Object.assign(uxMetrics, {
    inserts: 0,
    insertSamples: 0,
    lastInsertMs: 0,
    avgInsertMs: 0,
    quickMenuOpens: 0,
    quickMenuKeyboardOps: 0,
    sidebarInserts: 0,
    sliderKeyOps: 0,
    sliderScrollCount: 0,
    sliderFPSAvg: 0,
    lastAction: "",
    memUsedMB: 0,
    heapTotalMB: 0,
    heapLimitMB: 0,
    domNodes: 0,
    grapesComponents: 0,
    dupRoots: 0,
    dupEstNodes: 0,
    dupLastMs: 0,
  });
  saveMetrics();
}

function ensureBootstrap(doc: Document) {
  try {
    const hasCss = doc.querySelector("#bootstrap-css");
    const hasJs = doc.querySelector("#bootstrap-js");

    if (!hasCss) {
      const link = doc.createElement("link");
      link.id = "bootstrap-css";
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";

      doc.head.appendChild(link);
    }

    if (!hasJs) {
      const script = doc.createElement("script");
      script.id = "bootstrap-js";
      script.src =
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";

      doc.body.appendChild(script);
    }
  } catch (e) {
    console.error(e);
  }
}
const showPreview = ref(false);
const showMenu = ref(false);
const previewHtml = ref("");
const previewStyle = computed(() => {
  const w =
    {
      mobile: "375px",
      tablet: "768px",
      desktop: "1024px",
      large: "1440px",
    }[currentDevice.value] || "100%";

  return {
    width: w,
    height: "100%",
    margin: "0 auto",
    border: "1px solid #e5e7eb",
    background: "#fff",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: "width 0.3s ease",
  };
});
const selectedComponent = ref<Component | null>(null);
const showTemplateList = ref(false);
const templateQuery = ref("");
const elementQuery = ref("");
const searchableElementNames = [
  "Tiêu đề",
  "Đoạn văn",
  "Văn bản phong phú",
  "Danh sách",
  "Liên kết",
  "Nút bấm",
  "Nút Mua Vé",
  "Hình ảnh",
  "Ảnh nền",
  "Thư viện ảnh",
  "Video",
  "Mã HTML",
  "Khối chứa Container",
  "Lưới 2 cột Grid",
  "Lưới 3 cột Grid",
  "Phần đầu trang Hero",
  "Bảng Table",
  "Phần Section",
  "Accordion",
  "Khoảng đệm Spacer",
] as const;
function matchElement(name: string | null | undefined) {
  const query = normalizeElementSearch(elementQuery.value);
  if (!query) return true;
  if (!name) return false;
  return normalizeElementSearch(String(name)).includes(query);
}
const matchingElementCount = computed(() =>
  searchableElementNames.filter((name) => matchElement(name)).length,
);

const showGlobalStyle = ref(false);
const showResponsive = ref(false);
const showSeo = ref(false);
const showProperties = ref(true);
const selectedSidebarId = ref<string | null>(null);
const activePanelType = ref<"header" | "block">("header");
const propertiesTitle = computed(() =>
  activePanelType.value === "header" ? "Đầu trang" : "Khối",
);
const selectedComponentLabel = computed(() => {
  const component = selectedComponent.value;
  if (!component) return "";
  try {
    const name = typeof component.getName === "function" ? component.getName() : "";
    const tag = typeof component.get === "function" ? component.get("tagName") : "";
    return String(name || tag || "Thành phần đã chọn");
  } catch {
    return "Thành phần đã chọn";
  }
});
const selectedTextName = ref("");
const lastSelectedTextName = ref("");
const multiSelectedCount = ref(0);
const isTextSelection = computed(
  () => !!selectedTextName.value || multiSelectedCount.value > 1,
);
const collapseHtmlBlocks = ref(false);
const collapseCompany = ref(false);
const deviceWidthLabel = computed(() => {
  const map: Record<string, string> = {
    mobile: "375px",
    tablet: "768px",
    desktop: "1440px",
    large: "1982px",
  };
  return map[currentDevice.value] || "";
});
const companyExportMode = ref<"inline" | "linked">("linked");
function toggleCompanyExportMode() {
  companyExportMode.value =
    companyExportMode.value === "linked" ? "inline" : "linked";
  try {
    localStorage.setItem("wbCompanyExportMode", companyExportMode.value);
  } catch {}
}
try {
  const savedMode = localStorage.getItem("wbCompanyExportMode");
  if (savedMode === "inline" || savedMode === "linked") {
    companyExportMode.value = savedMode as "inline" | "linked";
  }
} catch {}

const selectedTheme = ref("Mặc định");
const selectedPage = ref("Trang chủ");
const router = useRouter();
function goHome() {
  try {
    router.push("/");
  } catch {}
}
const sbActiveTab = ref<"elements" | "layouts">("elements");

const applyHeaderPreset = (type: string) => {
  if (!editor) return;

  const containerStyle =
    "max-width: 1200px; margin: 0 auto; padding: 12px 20px; display: flex; align-items: center; height: 100%;";
  const headerStyle =
    "min-height: 70px; background: #ffffff; border-bottom: 1px solid #e5e7eb; position: sticky; top: 0; z-index: 1000; width: 100%; box-shadow: 0 1px 2px rgba(0,0,0,0.05);";
  const logoStyle = "text-decoration: none; display: inline-block;";
  const logoImgStyle =
    "display:block; height:40px; width:auto; object-fit:contain;";
  const logoSrc = "https://placehold.co/120x40?text=Logo";
  const navStyle =
    "display: flex; gap: 32px; list-style: none; margin: 0; padding: 0;";
  const linkStyle =
    "color: #4b5563; text-decoration: none; font-size: 15px; font-weight: 500; transition: color 0.2s;";
  const btnStyle =
    "padding: 8px 20px; background: #2563eb; color: white; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500; transition: background 0.2s;";

  const logoHtml = `<a href="#" style="${logoStyle}"><img src="${logoSrc}" alt="Brand" style="${logoImgStyle}"/></a>`;
  const menuHtml = `
    <ul style="${navStyle}">
      <li><a href="#" style="${linkStyle}">Trang chủ</a></li>
      <li><a href="#" style="${linkStyle}">Giới thiệu</a></li>
      <li><a href="#" style="${linkStyle}">Dịch vụ</a></li>
      <li><a href="#" style="${linkStyle}">Liên hệ</a></li>
    </ul>
  `;
  const actionsHtml = ``;

  let innerHtml = "";

  if (type === "logo-left-menu-right") {
    innerHtml = `
      <div class="wb-header-container" style="${containerStyle} justify-content: space-between;">
        <div style="flex-shrink: 0;">${logoHtml}</div>
        <div style="display: flex; gap: 40px; align-items: center;">
          <nav>${menuHtml}</nav>
          ${actionsHtml}
        </div>
      </div>
    `;
  } else if (type === "logo-center-menu-left-right") {
    innerHtml = `
      <div class="wb-header-container wb-header-grid" style="${containerStyle} display: grid; grid-template-columns: 1fr auto 1fr; gap: 20px;">
        <nav style="display: flex; justify-content: flex-start;">
           <ul style="${navStyle}">
              <li><a href="#" style="${linkStyle}">Trang chủ</a></li>
              <li><a href="#" style="${linkStyle}">Giới thiệu</a></li>
           </ul>
        </nav>
        <div style="text-align: center;">${logoHtml}</div>
        <div style="display: flex; justify-content: flex-end; gap: 24px; align-items: center;">
           <ul style="${navStyle}">
              <li><a href="#" style="${linkStyle}">Dịch vụ</a></li>
              <li><a href="#" style="${linkStyle}">Liên hệ</a></li>
           </ul>
           ${actionsHtml}
        </div>
      </div>
    `;
  } else if (type === "logo-left-menu-center") {
    innerHtml = `
      <div class="wb-header-container" style="${containerStyle} justify-content: space-between;">
        <div style="flex-shrink: 0; min-width: 120px;">${logoHtml}</div>
        <nav style="flex: 1; display: flex; justify-content: center;">
          ${menuHtml}
        </nav>
        <div style="flex-shrink: 0; min-width: 120px; display: flex; justify-content: flex-end;">
          ${actionsHtml}
        </div>
      </div>
    `;
  }

  const componentContent =
    `
    <header style="${headerStyle}" data-gjs-name="Phần đầu" data-gjs-type="header">
      <style>
        .wb-mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }
        .wb-mobile-toggle span {
          display: block;
          width: 24px;
          height: 2px;
          background-color: #111827;
          margin: 5px 0;
          transition: 0.3s;
        }
        @media (max-width: 768px) {
          header[data-gjs-type="header"] {
             height: auto !important;
             min-height: 60px !important;
             padding: 0 !important;
          }
          .wb-header-container {
             display: flex !important;
             flex-direction: row !important;
             flex-wrap: wrap !important;
             align-items: center !important;
             justify-content: space-between !important;
             height: auto !important;
             padding: 12px 20px !important;
             gap: 0 !important;
          }
          /* Reset grid for mobile */
          .wb-header-grid {
             display: flex !important;
             grid-template-columns: none !important;
          }
          
          /* Show hamburger */
          .wb-mobile-toggle {
             display: block;
             order: 2; /* Always on right */
          }
          
          /* Logo always on left */
          .wb-header-container > div:first-child,
          .wb-header-grid > div:nth-child(2) {
             order: 1 !important;
             width: auto !important;
             text-align: left !important;
             min-width: auto !important;
             flex-shrink: 0 !important;
          }
          
          /* Hide menu & actions by default */
          .wb-header-container:not(.wb-header-grid) > div:nth-child(2),
          .wb-header-container > nav,
          .wb-header-container > div:nth-child(3) {
             display: none !important;
             width: 100% !important;
             order: 3 !important;
             flex-direction: column !important;
             align-items: flex-start !important;
             gap: 16px !important;
             margin-top: 16px;
          }
          
          /* Show when open */
          .wb-header-container.is-open:not(.wb-header-grid) > div:nth-child(2),
          .wb-header-container.is-open > nav,
          .wb-header-container.is-open > div:nth-child(3) {
             display: flex !important;
          }

          /* Menu items full width */
          .wb-header-container ul,
          .wb-header-grid ul {
             flex-direction: column !important;
             width: 100% !important;
             gap: 16px !important;
          }
          .wb-header-container ul li,
          .wb-header-grid ul li {
             width: 100%;
          }
          .wb-header-container ul li a,
          .wb-header-grid ul li a {
             display: block;
             padding: 8px 0;
             border-bottom: 1px solid #f3f4f6;
          }
          
          /* Action buttons container */
          .wb-header-container > div:last-child > div,
          .wb-header-grid > div:last-child > div {
             width: 100%;
             justify-content: flex-start !important;
          }
        }
      </style>
      ${innerHtml.replace(
        /<\/div>\s*$/,
        `<button class="wb-mobile-toggle" onclick="this.closest('.wb-header-container').classList.toggle('is-open')">
        <span></span>
        <span></span>
        <span></span>
      </button></div>`,
      )}
      <scr` +
    `ipt>
        // Ensure toggle works inside iframe/canvas
        // This script runs when the component is rendered
      </scr` +
    `ipt>
    </header>
  `;

  // Remove existing header
  const wrapper = editor.getWrapper();
  if (!wrapper) return;

  const headers = wrapper.find("header");
  if (headers && headers.length > 0) {
    headers.forEach((h: any) => h.remove());
  }

  // Also remove any block with id/class related to header if not a <header> tag
  // But safest is to prepend the new header
  wrapper.append(componentContent, { at: 0 });
};
const sidebarOpen = ref(true);

const rootEl = ref<HTMLElement | null>(null);
const isSmallScreen = ref(false);
const isMobile = ref(false);
let rootResizeObserver: ResizeObserver | null = null;

onMounted(() => {
  if (rootEl.value) {
    rootResizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        isSmallScreen.value = w < 1280;
        isMobile.value = w <= 768;

        if (isEmbed.value && editor) {
          if (w <= 480 && currentDevice.value !== "mobile") {
            setDevice("mobile");
          } else if (w > 480 && w <= 900 && currentDevice.value !== "tablet") {
            setDevice("tablet");
          } else if (w > 900 && currentDevice.value !== "desktop") {
            setDevice("desktop");
          }
        }

        // Auto collapse on mobile to ensure canvas is visible
        if (isMobile.value) {
          if (sidebarOpen.value) sidebarOpen.value = false;
          if (showProperties.value) showProperties.value = false;
        } else if (w < 1024 && sidebarOpen.value && showProperties.value) {
          // On tablet, maybe close one?
          // Don't auto-close properties if user manually opened it or if we want to allow it
          // But to prevent overlap or too small canvas, maybe we can keep it
          // Since we added the toggle button for isSmallScreen (<1280), user can reopen it.
          // But to be safe for "user doesn't see it", let's ONLY close it if it was default open?
          // Actually, let's just NOT auto-close it aggressively if it's not mobile.
          // Or only close it once on load?
          // For now, let's disable this auto-close for tablet to avoid "I don't see sidebar" confusion
          // provided the layout handles it (it shrinks width in layoutStyle)
        }
      }
    });
    rootResizeObserver.observe(rootEl.value);
  }
});

onBeforeUnmount(() => {
  if (rootResizeObserver) {
    rootResizeObserver.disconnect();
    rootResizeObserver = null;
  }
});

const layoutStyle = computed(() => {
  let left = sidebarOpen.value ? "280px" : "72px";
  let right = showProperties.value ? "280px" : "0px";

  if (isMobile.value) {
    // On mobile, panels take more space or overlay?
    // For this layout structure (grid), we just reduce width to fit content
    if (sidebarOpen.value) left = "280px";
    if (showProperties.value) right = "280px";
  } else if (isSmallScreen.value) {
    if (sidebarOpen.value) left = "220px";
    if (showProperties.value) right = "280px";
  }

  return {
    "--left-width": left,
    "--right-width": right,
  };
});
const collapseStructure = ref(false);
const collapseLandingPage = ref(false);
const collapseTypography = ref(false);
const collapseMedia = ref(false);

type SectionItem = { id: string; name: string; compId?: string };
const sections = ref<{
  header: SectionItem[];
  template: SectionItem[];
  footer: SectionItem[];
}>({
  header: [{ id: cryptoRandomId(), name: "Phần đầu" }],
  template: [
    { id: cryptoRandomId(), name: "Phần chính" },
    { id: cryptoRandomId(), name: "Nội dung" },
  ],
  footer: [{ id: cryptoRandomId(), name: "Phần cuối" }],
});

type TemplateDef = {
  id: string;
  name: string;
  category?: string;
  preview: string;
  build: () => Record<string, unknown>;
};
const templates: TemplateDef[] = [
  {
    id: "hero",
    name: "Phần chính",
    category: "Phần chính",
    preview:
      "<div style='padding:24px;background:#111827;color:#fff;border-radius:12px'><h1 style='margin:0 0 8px'>Hero</h1><p>Mô tả ngắn</p></div>",
    build: () => ({
      type: "text",
      tagName: "div",
      attributes: {
        style:
          "padding: 48px 24px; background: #111827; color: #fff; text-align: center; border-radius: 12px;",
      },
      components: [
        {
          type: "text",
          tagName: "h1",
          content: "Tiêu đề nổi bật",
          attributes: {
            style: "font-size: 36px; font-weight: 700; margin: 0 0 12px",
          },
        },
        {
          type: "text",
          tagName: "p",
          content: "Mô tả ngắn về trang",
          attributes: { style: "font-size: 16px; opacity: .9; margin: 0" },
        },
      ],
    }),
  },
  {
    id: "two-columns",
    name: "Hai cột",
    category: "Two-columns",
    preview:
      "<div style='border:1px solid #e5e7eb;border-radius:8px;padding:12px'><div style='display:grid;grid-template-columns:1fr 1fr;gap:16px'><div>Trái</div><div>Phải</div></div></div>",
    build: () => ({
      type: "text",
      tagName: "div",
      attributes: { style: "margin: 16px 0" },
      components: [
        {
          type: "text",
          tagName: "div",
          attributes: {
            style: "display: grid; grid-template-columns: 1fr 1fr; gap: 16px;",
          },
          components: [
            {
              type: "text",
              tagName: "div",
              content: "Trái",
              attributes: {
                style:
                  "padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px",
              },
            },
            {
              type: "text",
              tagName: "div",
              content: "Phải",
              attributes: {
                style:
                  "padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px",
              },
            },
          ],
        },
      ],
    }),
  },
  {
    id: "card",
    name: "Thẻ",
    category: "Thẻ",
    preview:
      "<div style='border:1px solid #e5e7eb;border-radius:12px;background:#fff;overflow:hidden'><div style='padding:12px;border-bottom:1px solid #e5e7eb;font-weight:600'>Tiêu đề</div><div style='padding:12px;color:#374151'>Nội dung thẻ</div></div>",
    build: () => ({
      type: "text",
      tagName: "div",
      attributes: {
        style:
          "border:1px solid #e5e7eb;border-radius:12px;background:#fff;overflow:hidden",
      },
      components: [
        {
          type: "text",
          tagName: "div",
          content: "Tiêu đề",
          attributes: {
            style:
              "padding:16px;border-bottom:1px solid #e5e7eb;font-weight:600",
          },
        },
        {
          type: "text",
          tagName: "div",
          content: "Nội dung",
          attributes: { style: "padding:16px;color:#374151" },
        },
      ],
    }),
  },
];
const filteredTemplates = computed<TemplateDef[]>(() => {
  const q = (templateQuery.value || "").trim().toLowerCase();
  if (!q) return templates;
  return templates.filter((t) => (t.name || "").toLowerCase().includes(q));
});
const backgroundColor = ref("#ffffff");
const padding = ref(16);
const margin = ref(0);

const globalFont = ref("Arial, sans-serif");
const globalTextColor = ref("#111827");
const globalBgColor = ref("#ffffff");
const globalBaseSpacing = ref(16);

const currentDevice = ref("desktop");

const seoMeta = ref({ title: "", description: "", ogTitle: "", ogImage: "" });

const siteLogoUrl = ref<string>("");
const siteTitle = ref<string>("");
const siteSubtitle = ref<string>("");
const pageCanonical = ref<string>("");
const pageFaviconUrl = ref<string>("");
const pageLang = ref<string>("");

const headerProps = ref({
  logoPosition: "Middle Left",
  menu: "Trình đơn chính",
  menuType: "dropdown" as "dropdown" | "mega" | "drawer",
  menuIcon: "Hamburger",
  menuPosition: "Middle",
  menuLoad: "Lazy",
  showSeparator: true,
});

type InspectorVisibleTab = "style" | "settings" | "interactions";
const visibleInspectorTabs: InspectorVisibleTab[] = [
  "style",
  "settings",
  "interactions",
];
const inspectorStyleTab = ref<HTMLButtonElement | null>(null);
const inspectorSettingsTab = ref<HTMLButtonElement | null>(null);
const inspectorInteractionsTab = ref<HTMLButtonElement | null>(null);

const rightTab = ref<"style" | "interactions" | "layouts" | "settings">(
  "style",
);

function focusInspectorTab(tab: InspectorVisibleTab) {
  rightTab.value = tab;
  nextTick(() => {
    const tabRefs = {
      style: inspectorStyleTab,
      settings: inspectorSettingsTab,
      interactions: inspectorInteractionsTab,
    };
    tabRefs[tab].value?.focus();
  });
}

function moveInspectorTab(direction: -1 | 1) {
  const currentIndex = visibleInspectorTabs.indexOf(
    rightTab.value as InspectorVisibleTab,
  );
  const safeIndex = currentIndex < 0 ? 0 : currentIndex;
  const nextIndex =
    (safeIndex + direction + visibleInspectorTabs.length) %
    visibleInspectorTabs.length;
  focusInspectorTab(visibleInspectorTabs[nextIndex]);
}
const spacingUnits = ["px", "rem"];
const sizeUnits = ["px", "%", "rem"];
const spacingUnit = ref("px");
const sizeUnit = ref("px");
const lockAspect = ref(false);
const aspectRatio = ref<number | null>(null);
const width = ref<number | null>(null);
const height = ref<number | null>(null);
const minWidth = ref<number | null>(null);
const minHeight = ref<number | null>(null);
const maxWidth = ref<number | null>(null);
const maxHeight = ref<number | null>(null);
const widthAuto = ref(true);
const heightAuto = ref(true);
const maxWidthNone = ref(false);
const maxHeightNone = ref(false);
const styleDisplay = ref("block");
const styleFlexDirection = ref("row");
const styleJustifyContent = ref("flex-start");
const styleAlignItems = ref("stretch");
const styleFlexWrap = ref("nowrap");
const styleGap = ref<number>(0);
const displayLayoutOpen = ref(true);
const stylePosition = ref("static");
const styleTop = ref<string>("");
const styleBottom = ref<string>("");
const styleLeft = ref<string>("");
const styleRight = ref<string>("");
const styleZIndex = ref<number>(0);
const styleOpacity = ref<number>(1);
const advancedId = ref("");
const advancedClass = ref("");
const responsiveDevices = ["mobile", "tablet", "desktop", "large"];
const responsiveDevice = ref("desktop");
const hoverShadow = ref(false);
const imageSrc = ref("");
const imageAlt = ref("");
const imageFit = ref<string>("cover");
const imagePosition = ref<string>("center center");
const imagePositionOptions = [
  "center center",
  "top left",
  "top center",
  "top right",
  "center left",
  "center right",
  "bottom left",
  "bottom center",
  "bottom right",
];
const videoSrc = ref("");
const videoControls = ref(true);
const videoMuted = ref(false);
const videoPoster = ref("");
const videoPreload = ref<string>("metadata");
const videoAutoplay = ref(false);
const videoLoop = ref(false);
const buttonText = ref("");
const buttonOpenPopup = ref(false);
const buttonEventId = ref("");
const buttonHref = ref("");
const buttonVariant = ref<string>("primary");
const buttonSize = ref<string>("md");
const buttonTarget = ref("_self");
const buttonRel = ref("");
const selectedTextContent = ref("");
const linkTitle = ref("");
const linkAriaLabel = ref("");
const linkDownload = ref(false);
const relNoFollow = ref(false);
const relNoOpener = ref(false);
const relNoReferrer = ref(false);
const htmlContent = ref("");
const bgImageUrl = ref("");
const bgSize = ref<string>("cover");
const bgPosition = ref<string>("center center");
const bgOverlayColor = ref<string>("#0f172a");
const bgOverlayOpacity = ref<number>(0.35);
const bgVideoScale = ref<number>(1);
const styleBgColor = ref("");
const styleBgImage = ref("");
const styleBgRepeat = ref("repeat");
const styleBgPosition = ref("top left");
const styleBgSize = ref("auto");
const styleBgAttachment = ref("scroll");

// Border
const styleBorderColor = ref("");
const styleBorderStyle = ref("none");
const styleBorderWidth = ref<number>(0);
const styleBorderRadius = ref<number>(0);

// Spacing
const styleMarginTop = ref<number>(0);
const styleMarginRight = ref<number>(0);
const styleMarginBottom = ref<number>(0);
const styleMarginLeft = ref<number>(0);
const stylePaddingTop = ref<number>(0);
const stylePaddingRight = ref<number>(0);
const stylePaddingBottom = ref<number>(0);
const stylePaddingLeft = ref<number>(0);
const sliderRoleMode = ref<"listbox" | "tabs">("listbox");
const sliderShowArrows = ref(true);
const sliderShowDots = ref(true);
const sliderAutoplay = ref<boolean>(false);
const sliderAutoplayInterval = ref<number>(3000);
const sliderPauseOnHover = ref<boolean>(true);
const sliderTransition = ref<"smooth" | "instant">("smooth");
const sliderSpeed = ref<number>(260);
const sliderVisibleCount = ref<number>(1);
const sliderEasing = ref<
  "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear"
>("ease");
const galleryColumns = ref<number>(3);
const galleryGap = ref<number>(8);

const gridColumns = ref<number>(2);
const gridGap = ref<number>(12);
const gridOpen = ref(true);
const navGap = ref<number>(12);
const navPadding = ref<number>(12);
const navRadius = ref<number>(12);
const navBgColor = ref<string>("#f8fafc");
const navJustify = ref<string>("flex-start");
const navSticky = ref<boolean>(false);
const modalTitle = ref<string>("Modal title");
const modalContent = ref<string>("Modal content");
const modalWidth = ref<number>(480);
const modalPadding = ref<number>(16);
const modalRadius = ref<number>(12);
const overlayOpacity = ref<number>(0.45);
const modalShowClose = ref<boolean>(true);
const modalOverlayClose = ref<boolean>(true);
const heroTitle = ref<string>("Tiêu đề của bạn");
const heroSubtitle = ref<string>("Mô tả ngắn về sản phẩm của bạn");
const heroBgUrl = ref<string>("");
const heroTextColor = ref<string>("#ffffff");
const heroOverlayColor = ref<string>("#0f172a");
const heroOverlayOpacity = ref<number>(0.35);
const accordionMultiple = ref<boolean>(false);
const accordionAnimate = ref<boolean>(true);
const accordionDuration = ref<number>(240);
const showHeaderModal = ref<boolean>(false);
const showPageDialog = ref<boolean>(false);
const isHeaderApplyChecked = ref<boolean>(false);
const showHeaderPickerDialog = ref<boolean>(false);
const showExportCodeDialog = ref<boolean>(false);
const showImportDialog = ref<boolean>(false);
const showHelpDialog = ref<boolean>(false);
const searchKey = ref<string>("")
const categoryFilter = ref<string>("")
const hoveredKey = ref<string | null>(null)
const copiedKeys = ref<Set<string>>(new Set())

const allKeys = [
  { category: "event", name: "[ev_name]", description: "Tên sự kiện", example: "Tech Conference 2024", forWeb: true },
  { category: "event", name: "[ev_location]", description: "Địa điểm", example: "Hà Nội, Việt Nam", forWeb: true },
  { category: "event", name: "[ev_start_date]", description: "Ngày bắt đầu (dd/mm/yyyy)", example: "15/12/2024", forWeb: true },
  { category: "event", name: "[ev_start_time]", description: "Giờ bắt đầu (HH:mm)", example: "09:00", forWeb: true },
  { category: "event", name: "[ev_start_datetime]", description: "Ngày giờ bắt đầu (ISO)", example: "2024-12-15T09:00:00", forWeb: true },
  { category: "event", name: "[ev_end_date]", description: "Ngày kết thúc", example: "17/12/2024", forWeb: true },
  { category: "event", name: "[ev_end_time]", description: "Giờ kết thúc", example: "17:00", forWeb: true },
  { category: "event", name: "[ev_description]", description: "Mô tả sự kiện", example: "Sự kiện công nghệ hàng năm...", forWeb: true },
  { category: "event", name: "[ev_logo]", description: "Logo sự kiện (URL)", example: "https://domain.com/logo.png", forWeb: true },
  { category: "event", name: "[ev_domain]", description: "Domain website sự kiện", example: "event.domain.com", forWeb: true },
  { category: "event", name: "[ev_order_url]", description: "Link đặt vé/đăng ký", example: "https://event.domain.com/register", forWeb: true },
  { category: "event", name: "[ev_url]", description: "Link website sự kiện", example: "https://event.domain.com", forWeb: true },
  { category: "event", name: "[ev_ticket_count]", description: "Số loại vé", example: "3", forWeb: true },
  { category: "event", name: "[ev_min_ticket_price]", description: "Giá vé thấp nhất", example: "500.000đ", forWeb: true },
  { category: "event", name: "[ev_max_ticket_price]", description: "Giá vé cao nhất", example: "2.000.000đ", forWeb: true },
  { category: "company", name: "[company_name]", description: "Tên công ty", example: "Công ty TNHH ABC", forWeb: true },
  { category: "company", name: "[company_email]", description: "Email công ty", example: "info@abc.com", forWeb: true },
  { category: "company", name: "[company_phone]", description: "SĐT công ty", example: "024.1234.5678", forWeb: true },
  { category: "company", name: "[company_address]", description: "Địa chỉ công ty", example: "123 Đường XYZ, Hà Nội", forWeb: true },
  { category: "event", name: "[ev_end_datetime]", description: "Ngày giờ kết thúc (ISO)", example: "2024-12-17T17:00:00", forWeb: false },
  { category: "event", name: "[ev_timezone]", description: "Múi giờ sự kiện", example: "Asia/Ho_Chi_Minh", forWeb: false },
  { category: "event", name: "[ev_status]", description: "Trạng thái sự kiện", example: "published", forWeb: false },
  { category: "event", name: "[id_event]", description: "ID sự kiện (numeric)", example: "12345", forWeb: false },
  { category: "system", name: "[app_name]", description: "Tên ứng dụng", example: "Checkin.vn", forWeb: false },
  { category: "system", name: "[support_email]", description: "Email hỗ trợ", example: "support@checkin.vn", forWeb: false },
  { category: "system", name: "[support_phone]", description: "SĐT hỗ trợ", example: "1900.xxxx", forWeb: false },
  { category: "system", name: "[privacy_url]", description: "Link chính sách bảo mật", example: "https://checkin.vn/privacy", forWeb: false },
  { category: "system", name: "[support_url]", description: "Link trang hỗ trợ", example: "https://checkin.vn/support", forWeb: false },
  { category: "system", name: "[asset_url]", description: "URL asset/CDN", example: "https://cdn.checkin.vn", forWeb: false },
  { category: "ticket", name: "[ticket_name]", description: "Tên loại vé (email/check-in)", example: "VIP", forWeb: false },
  { category: "ticket", name: "[ticket_price]", description: "Giá vé (email/check-in)", example: "1.500.000đ", forWeb: false },
  { category: "ticket", name: "[order_code]", description: "Mã đơn hàng (email/check-in)", example: "ORD-2024-001234", forWeb: false },
  { category: "ticket", name: "[qr_code]", description: "Mã QR vé (email/check-in)", example: "data:image/png;base64,...", forWeb: false },
]

interface DynamicKeyCategory {
  name: string;
  label: string;
}

const categories: DynamicKeyCategory[] = [
  { name: "event", label: "🎫 Sự kiện (Website)" },
  { name: "company", label: "🏢 Công ty" },
  { name: "system", label: "⚙️ Hệ thống (Email)" },
  { name: "ticket", label: "🎟️ Vé/Đơn hàng (Email/Check-in)" },
]

const filteredKeys = computed(() => {
  let keys = allKeys
  if (categoryFilter.value) {
    keys = keys.filter(k => k.category === categoryFilter.value)
  }
  if (searchKey.value.trim()) {
    const q = searchKey.value.toLowerCase()
    keys = keys.filter(k => k.name.toLowerCase().includes(q) || k.description.toLowerCase().includes(q))
  }
  return keys
})

function getKeysByCategory(cat: string) {
  if (!cat || !filteredKeys.value) return []
  return filteredKeys.value.filter(k => k.category === cat)
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    copiedKeys.value.add(text)
    setTimeout(() => copiedKeys.value.delete(text), 2000)
  })
}

const showPlaceholderHelpDialog = ref<boolean>(false);

// Dynamic keys for placeholder help dialog


// Dynamic keys for placeholder help dialog
const selectedEventToInsert = ref<any>(null);
const importTab = ref<string>("url");
const importFile = ref<any>([]);
const importUrl = ref<string>("");
const importing = ref<boolean>(false);
const importError = ref<string | null>(null);
const exportHtml = ref<string>("");
const exportCss = ref<string>("");
const exportJs = ref<string>("");
const exportMode = ref<"grapes" | "canvas">("grapes");
const lastImportBaseUrl = ref<string>("");
const installedHeadScripts = ref<
  {
    code?: string;
    src?: string;
    type?: string;
    async?: boolean;
    defer?: boolean;
  }[]
>([]);
const installedBodyScripts = ref<
  {
    code?: string;
    src?: string;
    type?: string;
    async?: boolean;
    defer?: boolean;
  }[]
>([]);

// Tailwind Play CDN generates CSS dynamically inside the GrapesJS iframe.
// GrapesJS can rebuild the iframe <head> after the initial render, which
// removes that runtime-generated <style> and causes the editor to look
// correct briefly and then fall back to unstyled HTML. Keep a copy of the
// generated CSS in the GrapesJS CSS Composer so it survives canvas refreshes.
let tailwindRuntimeCssCache = "";
let tailwindRuntimeObserver: MutationObserver | null = null;
let tailwindRuntimeSyncTimer: ReturnType<typeof setTimeout> | null = null;
let tailwindRuntimeFreezeTimer: ReturnType<typeof setTimeout> | null = null;
let tailwindRuntimeFrozen = false;
// Persistent import state. The iframe document/head can be recreated by
// GrapesJS, so imported CSS must never live only in the current iframe DOM.
let importedEditorCssPersistent = "";
let importedHeadLinksPersistent: { href: string }[] = [];
let importedBaseUrlPersistent = "";
const TAILWIND_RUNTIME_MARKER = "/* __WB_TAILWIND_RUNTIME_CSS__ */";

// Fixed15 diagnostic guard: keep Tailwind Play CDN alive, but temporarily
// prevent other imported JavaScript from changing the GrapesJS canvas while
// we verify whether an imported script is the source of the post-load layout
// break. Set to false once the offending script has been identified.
const WB_DIAGNOSTIC_DISABLE_IMPORTED_SCRIPTS = true;
let wbImportedScriptMutationObserver: MutationObserver | null = null;
let wbImportedScriptMutationCount = 0;

function isTailwindRuntimeStyle(style: Element): boolean {
  const text = String(style.textContent || "");
  if (!text) return false;
  return /tailwindcss|--tw-[\w-]*|@property\s+--tw-/i.test(text);
}

function stopTailwindRuntimeCssSync() {
  if (tailwindRuntimeObserver) {
    try { tailwindRuntimeObserver.disconnect(); } catch {}
  }
  tailwindRuntimeObserver = null;
  if (tailwindRuntimeSyncTimer) {
    clearTimeout(tailwindRuntimeSyncTimer);
    tailwindRuntimeSyncTimer = null;
  }
  if (tailwindRuntimeFreezeTimer) {
    clearTimeout(tailwindRuntimeFreezeTimer);
    tailwindRuntimeFreezeTimer = null;
  }
}

function readTailwindRuntimeCss(): string {
  if (!editor) return "";
  const d = editor?.Canvas.getDocument();
  if (!d?.head) return "";
  const chunks: string[] = [];
  d.head.querySelectorAll("style").forEach((style) => {
    // Never read the stylesheet that WebsiteBuilder itself injected back into
    // the Canvas. Reading our own copy was causing a feedback loop with the
    // Tailwind Play CDN runtime.
    if (style.hasAttribute("data-wb-tailwind-runtime")) return;
    if (style.hasAttribute("data-import-url") ||
        style.hasAttribute("data-imported-stylesheet") ||
        style.hasAttribute("data-aos-override") ||
        style.hasAttribute("data-saved-head-css") ||
        style.hasAttribute("data-global-color") ||
        style.hasAttribute("data-homepage-overlay-fix")) return;
    if (isTailwindRuntimeStyle(style)) {
      const css = String(style.textContent || "").trim();
      if (css) chunks.push(css);
    }
  });
  // Tailwind can expose more than one runtime style while compiling. Keep the
  // largest stylesheet; combining a generated stylesheet with its own output
  // makes the Play CDN repeatedly rescan and grow the CSS indefinitely.
  chunks.sort((a, b) => b.length - a.length);
  return chunks[0] || "";
}

function injectFrozenTailwindCss() {
  // Intentionally disabled. Tailwind Play CDN must own its generated <style>.
  // Copying/replacing that stylesheet from the builder can race Tailwind
  // recompilation and is what caused the original CSS feedback loop.
}

function freezeTailwindRuntimeCss() {
  // Intentionally disabled. Keep the Tailwind Play CDN runtime alive so
  // dynamically-added Tailwind classes continue to receive CSS.
  tailwindRuntimeFrozen = false;
}

function syncTailwindRuntimeCssNow() {
  // Observe only for diagnostics; never copy, replace, or freeze Tailwind CSS.
  if (!editor) return;
  const css = readTailwindRuntimeCss();
  if (css && css !== tailwindRuntimeCssCache) {
    tailwindRuntimeCssCache = css;
    wbDebug("TAILWIND RUNTIME CSS OBSERVED (passive)", { chars: css.length });
  }
}

function scheduleTailwindRuntimeCssSync() {
  // No DOM mutation here. Tailwind's own runtime remains the sole owner of
  // its generated stylesheet.
  if (tailwindRuntimeSyncTimer) clearTimeout(tailwindRuntimeSyncTimer);
  tailwindRuntimeSyncTimer = setTimeout(() => {
    tailwindRuntimeSyncTimer = null;
    syncTailwindRuntimeCssNow();
  }, 120);
}

function attachTailwindRuntimeObserver() {
  // Do not observe Tailwind's head. The builder must not react to Tailwind's
  // generated stylesheet mutations at all. This completely removes the
  // feedback path while preserving the CDN's normal JIT behavior.
  if (tailwindRuntimeObserver) {
    try { tailwindRuntimeObserver.disconnect(); } catch {}
    tailwindRuntimeObserver = null;
  }
}

function startTailwindRuntimeCssSync() {
  wbDebug("startTailwindRuntimeCssSync:PASSIVE");
  if (!editor) return;
  stopTailwindRuntimeCssSync();
  tailwindRuntimeFrozen = false;
  // Let Tailwind run natively. Only sample its generated CSS for diagnostics;
  // never inject it back and never remove the CDN script.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      wbDebug("tailwind passive sync tick 0");
      syncTailwindRuntimeCssNow();
    });
  });
}

function resetInstalledScripts(baseUrl: string) {
  lastImportBaseUrl.value = baseUrl || "";
  installedHeadScripts.value = [];
  installedBodyScripts.value = [];
}
let uiUpdateScheduled = false;
let mutationBurstCount = 0;
let bulkModeUntil = 0;
let needSettingsRefresh = false;
let pendingSyncAfterBurst = false;
let pendingBurstSince = 0;
const sliderReinitQueue = new Set<Component>();
const duplicateWorkQueue = new Set<Component>();
const duplicateWorkQueueIds = new Set<string>();
const duplicateRootQueueArr: Component[] = [];
const dupRootSet = new Set<string>();
let dupBatchStart = 0;
let dupBatchEst = 0;
let dupBatchRoots = 0;
let dupTooLongMode = false;
let dupProcessing = false;
let dupIdCounts: Record<string, number> | null = null;
let dupGeneration = 0;
const dupPending = new Set<Promise<void>>();
let pendingSelectedComponent: Component | null = null;
let selectionIdleScheduled = false;
let selectGeneration = 0;
let lastAddAt = 0;
const autoSelectOnAdd = false;
const ADD_SELECT_BLOCK_MS = 600;
function bumpBulkMode() {
  const now = Date.now();
  mutationBurstCount = Math.min(1_000_000, mutationBurstCount + 1);
  const extra =
    100 + Math.min(2500, Math.floor(Math.log2(mutationBurstCount)) * 150);
  bulkModeUntil = Math.max(bulkModeUntil, now + extra);
}
function scheduleUIUpdate() {
  const run = () => {
    try {
      uiUpdateScheduled = false;
      try {
        if (metricsOpen.value && !pendingSyncAfterBurst)
          updateMemStatsThrottled();
      } catch {}
      const now = Date.now();
      if (now < bulkModeUntil) {
        const wait = Math.max(150, bulkModeUntil - now);
        uiUpdateScheduled = true;
        pendingSyncAfterBurst = true;
        if (!pendingBurstSince) pendingBurstSince = now;
        const anyWin = typeof window !== "undefined" ? window : null;
        if (anyWin && typeof anyWin.requestIdleCallback === "function") {
          anyWin.requestIdleCallback(run, { timeout: wait });
        } else if (
          anyWin &&
          typeof anyWin.requestAnimationFrame === "function"
        ) {
          setTimeout(() => anyWin.requestAnimationFrame(run), wait);
        } else {
          setTimeout(run, wait);
        }
        return;
      }
      mutationBurstCount = 0;
      bulkModeUntil = 0;
      pendingBurstSince = 0;
      try {
        refreshSelectedTextMeta();
      } catch {}
      if (needSettingsRefresh) {
        needSettingsRefresh = false;
        refreshSelectedSettings();
      }
      if (!pendingSyncAfterBurst) updateAddOverlayThrottled();
      if (pendingSyncAfterBurst) {
        const tooLong = !!(
          pendingBurstSince && Date.now() - pendingBurstSince > 1200
        );
        pendingSyncAfterBurst = false;
        const process = () => {
          const items = Array.from(duplicateWorkQueue);
          const _uniqueRoots = (arr: Component[]) => {
            try {
              const set = new Set<string>();
              for (const m of arr) {
                const id = m.getId?.();
                if (id) set.add(id);
              }
              const roots: Component[] = [];
              for (const m of arr) {
                let p = (
                  m as unknown as { parent?: () => Component | null }
                ).parent?.();
                let nested = false;
                while (p) {
                  const pid = p.getId?.();
                  if (pid && set.has(pid)) {
                    nested = true;
                    break;
                  }
                  p = (
                    p as unknown as { parent?: () => Component | null }
                  ).parent?.();
                }
                if (!nested) roots.push(m);
              }
              return roots;
            } catch {
              return arr;
            }
          };
          const roots = _uniqueRoots(items);
          duplicateWorkQueue.clear();
          duplicateWorkQueueIds.clear();
          const addRoots = () => {
            for (const mdl of roots) {
              try {
                const id = mdl.getId?.();
                if (id && !dupRootSet.has(id)) {
                  dupRootSet.add(id);
                  duplicateRootQueueArr.push(mdl);
                  const n = _estimateNodeCount(mdl);
                  dupBatchEst += n;
                  dupBatchRoots++;
                }
              } catch {}
            }
            if (!dupBatchStart) dupBatchStart = performance.now();
            if (!dupIdCounts) dupIdCounts = buildIdCountMap();
            if (duplicateRootQueueArr.length > 200) {
              const keep = duplicateRootQueueArr.slice(
                Math.max(0, duplicateRootQueueArr.length - 200),
              );
              duplicateRootQueueArr.length = 0;
              for (const it of keep) duplicateRootQueueArr.push(it);
            }
          };
          dupTooLongMode = tooLong;
          addRoots();
          const kick = () => {
            if (dupProcessing) return;
            dupProcessing = true;
            const myGen = ++dupGeneration;
            const runCycle = () => {
              try {
                if (myGen !== dupGeneration) {
                  dupProcessing = false;
                  return;
                }
                const anyWin = typeof window !== "undefined" ? window : null;
                let slots = computeSlots(dupTooLongMode);
                while (slots > 0 && duplicateRootQueueArr.length) {
                  const mdl = duplicateRootQueueArr.shift() as Component;
                  const est = _estimateNodeCount(mdl);
                  const chunk = computeChunkSize(est, dupTooLongMode);
                  slots--;
                  const p = uniquifyIdsAsync(mdl, chunk, myGen);
                  dupPending.add(p);
                  p.finally(() => {
                    dupPending.delete(p);
                  });
                }
                if (duplicateRootQueueArr.length) {
                  const w = anyWin as Window & {
                    requestIdleCallback?: (
                      cb: () => void,
                      opts?: { timeout?: number },
                    ) => void;
                  };
                  const delay = computeNextDelay(
                    duplicateRootQueueArr.length,
                    dupTooLongMode,
                  );
                  if (w && typeof w.requestIdleCallback === "function")
                    setTimeout(
                      () => w.requestIdleCallback(runCycle, { timeout: delay }),
                      delay,
                    );
                  else if (typeof requestAnimationFrame === "function")
                    setTimeout(() => requestAnimationFrame(runCycle), delay);
                  else setTimeout(runCycle, delay);
                } else {
                  if (dupPending.size) {
                    const anyWin2 =
                      typeof window !== "undefined" ? window : null;
                    const w2 = anyWin2 as Window & {
                      requestIdleCallback?: (
                        cb: () => void,
                        opts?: { timeout?: number },
                      ) => void;
                    };
                    const delay2 = computeNextDelay(
                      dupPending.size,
                      dupTooLongMode,
                    );
                    if (w2 && typeof w2.requestIdleCallback === "function")
                      setTimeout(
                        () =>
                          w2.requestIdleCallback(runCycle, { timeout: delay2 }),
                        delay2,
                      );
                    else if (typeof requestAnimationFrame === "function")
                      setTimeout(() => requestAnimationFrame(runCycle), delay2);
                    else setTimeout(runCycle, delay2);
                  } else {
                    dupProcessing = false;
                    dupRootSet.clear();
                    dupIdCounts = null;
                    const dt = Math.round(performance.now() - dupBatchStart);
                    uxMetrics.dupRoots = dupBatchRoots;
                    uxMetrics.dupEstNodes = dupBatchEst;
                    uxMetrics.dupLastMs = dt;
                    uxMetrics.lastAction = "duplicate_ids_fix";
                    saveMetrics();
                    dupBatchStart = 0;
                    dupBatchEst = 0;
                    dupBatchRoots = 0;
                    scheduleSliderReinit();
                    syncHtmlDebounced();
                  }
                }
              } catch {
                dupProcessing = false;
              }
            };
            runCycle();
          };
          kick();
        };
        process();
      }
    } catch {}
  };
  const anyWin = typeof window !== "undefined" ? window : null;
  if (uiUpdateScheduled) return;
  uiUpdateScheduled = true;
  if (anyWin && typeof anyWin.requestIdleCallback === "function") {
    anyWin.requestIdleCallback(run, { timeout: 400 });
  } else if (anyWin && typeof anyWin.requestAnimationFrame === "function") {
    anyWin.requestAnimationFrame(run);
  } else {
    setTimeout(run, 50);
  }
}
function shouldDeferForInput() {
  try {
    const anyWin = typeof window !== "undefined" ? window : null;
    const nav = (anyWin as unknown as { navigator?: unknown }).navigator as
      | { scheduling?: { isInputPending?: () => boolean } }
      | undefined;
    const sch = nav?.scheduling;
    if (sch && typeof sch.isInputPending === "function") {
      if (sch.isInputPending()) return true;
    }
  } catch {}
  return false;
}
function scheduleSelectionRefresh() {
  const run = () => {
    selectionIdleScheduled = false;
    const now = Date.now();
    if (
      dupProcessing ||
      pendingSyncAfterBurst ||
      now < bulkModeUntil ||
      shouldDeferForInput()
    ) {
      const anyWin = typeof window !== "undefined" ? window : null;
      if (anyWin && typeof anyWin.requestIdleCallback === "function")
        anyWin.requestIdleCallback(run, { timeout: 200 });
      else if (anyWin && typeof anyWin.requestAnimationFrame === "function")
        anyWin.requestAnimationFrame(run);
      else setTimeout(run, 100);
      return;
    }
    const m = pendingSelectedComponent;
    if (!m) return;
    selectedComponent.value = m;
    needSettingsRefresh = true;
    try {
      enableResizable(m as any);
    } catch {}
    rightTab.value = "style";
    lastSelectedTextName.value = selectedTextName.value;
    multiSelectedCount.value = editor?.getSelectedAll?.()?.length || 1;
    scheduleUIUpdate();
  };
  if (selectionIdleScheduled) return;
  selectionIdleScheduled = true;
  const anyWin = typeof window !== "undefined" ? window : null;
  if (anyWin && typeof anyWin.requestIdleCallback === "function")
    anyWin.requestIdleCallback(run, { timeout: 200 });
  else if (anyWin && typeof anyWin.requestAnimationFrame === "function")
    anyWin.requestAnimationFrame(run);
  else setTimeout(run, 50);
}
type HeaderTpl = {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  html: string;
  css: string;
};
const headerTemplates = ref<HeaderTpl[]>([
  {
    id: "basic-1",
    name: "Logo cơ bản + Điều hướng",
    category: "Cơ bản",
    thumbnail: "https://placehold.co/100x50?text=B1",
    html: '<header data-role="header" style="display:flex;align-items:center;justify-content:space-between;padding:12px 20px"><div style="font-weight:700">Thương hiệu</div><nav style="display:flex;gap:16px"><a href="#">Trang chủ</a><a href="#">Giới thiệu</a><a href="#">Liên hệ</a></nav></header>',
    css: '@media (max-width:320px){header[data-role="header"]{flex-direction:column;gap:8px}}@media (min-width:768px){header[data-role="header"]{padding:16px 24px}}@media (min-width:1440px){header[data-role="header"]{padding:18px 28px}}@media (min-width:1440px){header[data-role="header"]{padding:20px 32px}}',
  },
  {
    id: "basic-2",
    name: "Điều hướng căn giữa",
    category: "Cơ bản",
    thumbnail: "https://placehold.co/100x50?text=B2",
    html: '<header data-role="header" style="display:flex;align-items:center;justify-content:center;padding:12px 20px"><nav style="display:flex;gap:16px"><a href="#">Trang chủ</a><a href="#">Dịch vụ</a><a href="#">Blog</a></nav></header>',
    css: "",
  },
  {
    id: "advanced-1",
    name: "Ghim + Đổ bóng",
    category: "Nâng cao",
    thumbnail: "https://placehold.co/100x50?text=A1",
    html: '<header data-role="header" style="position:sticky;top:0;background:#fff;box-shadow:0 2px 10px rgba(0,0,0,0.08);display:flex;align-items:center;justify-content:space-between;padding:12px 20px"><div>Logo</div><div style="display:flex;gap:12px"><button>Đăng nhập</button><button>Đăng ký</button></div></header>',
    css: "",
  },
  {
    id: "advanced-2",
    name: "Tìm kiếm + Hành động",
    category: "Nâng cao",
    thumbnail: "https://placehold.co/100x50?text=A2",
    html: '<header data-role="header" style="display:grid;grid-template-columns:1fr auto auto;align-items:center;padding:12px 20px"><div>Logo</div><input placeholder="Tìm kiếm" style="border:1px solid #e5e7eb;border-radius:8px;padding:6px 10px"/><div style="display:flex;gap:8px"><button>Tài liệu</button><button>Liên hệ</button></div></header>',
    css: "",
  },
  {
    id: "custom-1",
    name: "Header chính",
    category: "Tùy chỉnh",
    thumbnail: "https://placehold.co/100x50?text=C1",
    html: '<header data-role="header" style="display:flex;align-items:center;justify-content:space-between;padding:20px;background-image:url(https://picsum.photos/1200/240);background-size:cover;background-position:center;color:#fff"><div style="font-weight:700">Thương hiệu</div><nav style="display:flex;gap:16px"><a href="#">Trang chủ</a><a href="#">Dự án</a><a href="#">Đội ngũ</a></nav></header>',
    css: '@media (max-width:768px){header[data-role="header"]{flex-direction:column}}',
  },
  {
    id: "custom-2",
    name: "Thanh bên trái",
    category: "Tùy chỉnh",
    thumbnail: "https://placehold.co/100x50?text=C2",
    html: '<header data-role="header" style="display:flex;gap:20px;padding:16px"><aside style="width:200px;border-right:1px solid #e5e7eb">Trình đơn</aside><div style="flex:1">Nội dung</div></header>',
    css: "",
  },
]);
const headerCategories = ref<string[]>(["Cơ bản", "Nâng cao", "Tùy chỉnh"]);
const currentHeaderCategory = ref<string>(headerCategories.value[0]);
const selectedHeaderTpl = ref<HeaderTpl | null>(null);
const logoHtechUrl = new URL(
  "../../assets/images/logos/logo-h-tech.png",
  import.meta.url,
).href;
const headerSearchQuery = ref<string>("");
const headerPageSize = ref<number>(9);
const headerCurrentPage = ref<number>(1);
const showHeaderControls = computed(() => headerTemplates.value.length > 20);
const filteredHeaderTemplates = computed(() => {
  const byCat = headerTemplates.value.filter(
    (t) => t.category === currentHeaderCategory.value,
  );
  const q = (headerSearchQuery.value || "").trim().toLowerCase();
  return q
    ? byCat.filter(
        (t) =>
          (t.name || "").toLowerCase().includes(q) ||
          (t.id || "").toLowerCase().includes(q),
      )
    : byCat;
});
const headerTotalPages = computed(() =>
  Math.max(
    1,
    Math.ceil(filteredHeaderTemplates.value.length / headerPageSize.value),
  ),
);
const paginatedHeaderTemplates = computed(() => {
  const start = (headerCurrentPage.value - 1) * headerPageSize.value;
  return filteredHeaderTemplates.value.slice(
    start,
    start + headerPageSize.value,
  );
});
watch([currentHeaderCategory, headerSearchQuery], () => {
  headerCurrentPage.value = 1;
});
const headerThumbLoading = ref<Record<string, boolean>>({});
watch(
  [paginatedHeaderTemplates],
  () => {
    const states: Record<string, boolean> = {};
    for (const t of paginatedHeaderTemplates.value) states[t.id] = true;
    headerThumbLoading.value = states;
  },
  { immediate: true },
);
function onHeaderThumbLoad(id: string) {
  headerThumbLoading.value[id] = false;
}
const headerPreset = ref<string>("None");
function getHeaderPresetCss(preset: string) {
  const sel = 'header[data-role="header"]';
  if (preset === "Brand")
    return `${sel}{background:#f0f7ff;color:#0f172a} ${sel} a{color:#2563eb}`;
  if (preset === "Dark")
    return `${sel}{background:#0f172a;color:#ffffff} ${sel} a{color:#93c5fd}`;
  if (preset === "Light")
    return `${sel}{background:#ffffff;color:#0f172a} ${sel} a{color:#2563eb}`;
  return "";
}
const computedHeaderCss = computed(() => {
  const base = selectedHeaderTpl.value?.css || "";
  const theme = getHeaderPresetCss(headerPreset.value);
  return `${base}${theme ? `\n${theme}` : ""}`;
});
const headerPreviewStyleHost = ref<HTMLElement | null>(null);
const headerModalStyleHost = ref<HTMLElement | null>(null);
function setStyleHostCss(host: HTMLElement | null, css: string) {
  try {
    if (!host) return;
    while (host.firstChild) host.removeChild(host.firstChild);
    const s = String(css || "").trim();
    if (!s) return;
    const styleEl = document.createElement("style");
    styleEl.textContent = s;
    host.appendChild(styleEl);
  } catch {}
}
watch(
  [selectedHeaderTpl, computedHeaderCss, showHeaderModal],
  () => {
    setStyleHostCss(headerPreviewStyleHost.value, computedHeaderCss.value);
    if (showHeaderModal.value)
      setStyleHostCss(headerModalStyleHost.value, computedHeaderCss.value);
  },
  { immediate: true },
);
const hoverScale = ref(false);
const animEasing = ref("ease");
const easingOptions = ["ease", "ease-in", "ease-out", "ease-in-out", "linear"];
const animDuration = ref(200);
const overflowMode = ref<"visible" | "hidden" | "clip">("visible");
const layoutOpen = ref(true);
const typographyOpen = ref(false);
const spacingOpen = ref(false);
const detailedSpacingOpen = ref(false);
const borderOpen = ref(false);
const sizingOpen = ref(false);
const positioningOpen = ref(false);
const backgroundOpen = ref(false);
const effectsOpen = ref(false);

const textFontSize = ref<number | null>(null);
const textFontWeight = ref("normal");
const textTextAlign = ref("left");
const textColor = ref("#000000");
const textLineHeight = ref<number | null>(null);
const textLetterSpacing = ref<number | null>(null);

type VuetifyForm = { validate: () => void };
const uiFormRef = ref<VuetifyForm | null>(null);
const uiText = ref("");
const uiNumber = ref<number | null>(null);
const uiSelect = ref<string | null>(null);
const uiSelectItems = ["Tùy chọn 1", "Tùy chọn 2", "Tùy chọn 3"];
const uiCheck = ref(false);
const uiRadio = ref<string | null>(null);
const uiTextRules = [
  (v: string) => !!v || "Bắt buộc",
  (v: string) => (v?.length ?? 0) >= 2 || "Tối thiểu 2 ký tự",
];
const uiNumberRules = [
  (v: number | null) => v != null || "Bắt buộc",
  (v: number | null) => (v ?? 0) >= 0 || ">= 0",
];
const uiSelectRules = [(v: string | null) => !!v || "Bắt buộc"];
const uiCheckRules = [(v: boolean) => v || "Phải chấp nhận"];
const uiRadioRules = [(v: string | null) => !!v || "Bắt buộc"];

function validateUiForm() {
  const f = uiFormRef.value;
  if (!f) return;
  try {
    f.validate();
  } catch {}
}

const transformRotate = ref(0);
const transformScale = ref(1);
const transformSkewX = ref(0);
const transformSkewY = ref(0);
const filterBlur = ref(0);
const filterBrightness = ref(100);
const backdropBlur = ref(0);
const eventType = ref<"none" | "click" | "mouseenter" | "mouseleave">("none");
const eventAction = ref("");
const effectShadowOpen = ref(false);
const effectTransitionOpen = ref(false);
const effectTransformOpen = ref(false);
const effectFilterOpen = ref(false);
const effectBackdropOpen = ref(false);
const sidebarSearch = ref("");
const inspectorCompact = ref(false);

function matchesSearch(...terms: string[]) {
  return matchesElementSearch(sidebarSearch.value, ...terms);
}

function hasStyleSearchMatches() {
  return (
    (isTextSelection.value &&
      matchesSearch('Kiểu chữ', 'Typography', 'Nội dung', 'Cỡ chữ', 'Font', 'Khoảng dòng', 'Line Height', 'Độ đậm', 'Weight', 'Khoảng chữ', 'Letter Spacing', 'Màu chữ', 'Text Color')) ||
    matchesSearch('Bố cục', 'Layout', 'Hiển thị', 'Display', 'Block', 'Flex', 'Inline', 'Ẩn', 'Hướng', 'Direction', 'Justify', 'Align', 'Wrap', 'Gap', 'Khoảng cách') ||
    matchesSearch('Khoảng cách', 'Spacing', 'Margin', 'Lề ngoài', 'Padding', 'Lề trong') ||
    matchesSearch('Kích thước', 'Sizing', 'Width', 'Height', 'Rộng', 'Cao', 'Min W', 'Min H', 'Max W', 'Max H', 'Tỷ lệ', 'Đơn vị', 'Aspect', 'Auto', 'Khóa') ||
    (isGenericGridComponent(selectedComponent.value) &&
      matchesSearch('Lưới', 'Grid', 'Cột', 'Columns', 'Khoảng cách', 'Gap')) ||
    matchesSearch('Nền', 'Background', 'Màu nền', 'Ảnh nền', 'Lặp lại', 'Vị trí', 'Kích thước', 'Attachment', 'Cố định') ||
    matchesSearch('Viền', 'Border', 'Kiểu viền', 'Độ dày', 'Màu viền', 'Bo góc', 'Radius') ||
    matchesSearch('Định vị', 'Positioning', 'Position', 'Kiểu', 'Trên', 'Dưới', 'Trái', 'Phải', 'Z-Index', 'Opacity') ||
    matchesSearch('Hiệu ứng', 'Effects', 'Đổ bóng', 'Shadow', 'Hover', 'Chuyển đổi', 'Transition', 'Biến đổi', 'Transform', 'Xoay', 'Rotate', 'Scale', 'Skew', 'Bộ lọc', 'Filter', 'Làm mờ', 'Blur', 'Độ sáng', 'Brightness', 'Nền mờ', 'Backdrop', 'Thời gian', 'Easing')
  );
}

function hasSettingsSearchMatches() {
  const component = selectedComponent.value;
  return (
    (isSuperAdminPerm.value &&
      matchesSearch('Advanced', 'Nâng cao', 'ID Element', 'CSS Classes', 'Breakpoint', 'Điểm ngắt')) ||
    (isImageComponent(component) &&
      matchesSearch('Image', 'Hình ảnh', 'Src', 'URL ảnh', 'Alt Text', 'Fit', 'Vừa khung', 'Position', 'Vị trí')) ||
    (isVideoComponent(component) &&
      matchesSearch('Video', 'Src', 'URL video', 'Controls', 'Điều khiển', 'Autoplay', 'Tự động phát', 'Loop', 'Lặp lại', 'Muted', 'Tắt tiếng', 'Poster', 'Ảnh bìa', 'Preload', 'Tải trước')) ||
    ((isButtonComponent(component) || hasLinkInSelection(component)) &&
      matchesSearch('Button', 'Link', 'Nút', 'Liên kết', 'Href', 'URL', 'Rel', 'Tiêu đề', 'Nhãn Aria', 'Tải xuống', 'Popup Mua Vé', 'Biến thể', 'Kích thước', 'Nội dung')) ||
    ((isHtmlComponent(component) || isIframeComponent(component)) &&
      matchesSearch('HTML', 'Code', 'Nội dung HTML')) ||
    (isNavbarComponent(component) &&
      matchesSearch('Navbar', 'Thanh điều hướng', 'Căn chỉnh', 'Justify', 'Dính', 'Sticky', 'Khoảng cách', 'Đệm', 'Bán kính', 'Nền', 'Màu nền')) ||
    (isHeroComponent(component) &&
      matchesSearch('Hero', 'Phần đầu trang', 'Tiêu đề', 'Phụ đề', 'URL ảnh nền', 'Màu chữ', 'Màu lớp phủ', 'Độ mờ lớp phủ')) ||
    (isBackgroundImageComponent(component) &&
      matchesSearch('Ảnh nền', 'Background', 'URL ảnh', 'Kích thước', 'Vị trí', 'Màu lớp phủ', 'Độ mờ lớp phủ', 'Zoom video')) ||
    (isSliderComponent(component) &&
      matchesSearch('Slider', 'Thanh trượt', 'Role', 'Mũi tên', 'Dấu chấm', 'Tự động phát', 'Khoảng thời gian', 'Dừng khi di chuột', 'Chuyển cảnh', 'Số slide', 'Easing', 'Tốc độ')) ||
    (isGalleryComponent(component) &&
      matchesSearch('Gallery', 'Thư viện ảnh', 'Cột', 'Khoảng cách')) ||
    (isAccordionComponent(component) &&
      matchesSearch('Accordion', 'Cho phép mở nhiều', 'Hiệu ứng động', 'Thời gian')) ||
    (isFormComponent(component) &&
      matchesSearch('Form', 'Trường nhập liệu', 'Văn bản', 'Số', 'Lựa chọn', 'Chấp nhận', 'Radio', 'Xác thực'))
  );
}

function hasInteractionSearchMatches() {
  const component = selectedComponent.value;
  return (
    matchesSearch('Sự kiện', 'Events', 'Hành động', 'JavaScript') ||
    ((isButtonComponent(component) || hasLinkInSelection(component)) &&
      matchesSearch('Liên kết', 'Link', 'Nút', 'Button', 'URL'))
  );
}

const _gridSteps = [4, 8, 10, 12, 16];
const snapGridStep = ref(8);

function _openTemplatePanel() {
  const sel = editor?.getSelected();
  selectedComponent.value = sel || null;
  showTemplateList.value = true;
  showGlobalStyle.value = false;
  showResponsive.value = false;
  showSeo.value = false;
}
function _closeAllPanels() {
  selectedComponent.value = null;
  showTemplateList.value = false;
  showGlobalStyle.value = false;
  showResponsive.value = false;
  showSeo.value = false;
}
function withRipple(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement | null;
  if (!target) return;
  const rect = target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  target.appendChild(ripple);
  setTimeout(() => ripple.remove(), 320);
}
function insertTemplate(id: string) {
  if (!editor) return;
  const tpl = templates.find((t) => t.id === id);
  if (!tpl) return;
  const root = editor.getWrapper() as Component;
  const compCreated = root.append(tpl.build());
  const comp = (
    Array.isArray(compCreated)
      ? (compCreated[0] as Component)
      : (compCreated as Component)
  ) as Component;
  try {
    (editor as Editor).select(comp);
  } catch {}
  selectedComponent.value = comp;
  showTemplateList.value = false;
  syncHtmlDebounced();
}

function addSectionBlock() {
  if (!editor) return;
  const target = getInsertTarget() as Component;
  const sec = target.append({
    type: "section",
    tagName: "section",
    attributes: {
      class: "wb-section",
      style: `padding: ${globalBaseSpacing.value}px; margin: ${globalBaseSpacing.value / 2}px 0; background: ${globalBgColor.value}; min-height: 100px;`,
    },
  });
  try {
    editor.select(sec);
  } catch {}
  recordInsert();
  showFeedback("Đã chèn Phần (Section)");
}

function addFlexContainerBlock() {
  if (!editor) return;
  const target = getInsertTarget() as Component;
  const c = target.append({
    type: "text",
    tagName: "div",
    attributes: {
      style: "display:flex;gap:16px;padding:16px;border:1px dashed #ccc",
    },
    components: [
      {
        type: "text",
        tagName: "div",
        attributes: {
          style:
            "flex:1;padding:12px;border:1px solid #e5e7eb;border-radius:8px",
        },
        content: "Phần tử Flex 1",
      },
      {
        type: "text",
        tagName: "div",
        attributes: {
          style:
            "flex:1;padding:12px;border:1px solid #e5e7eb;border-radius:8px",
        },
        content: "Phần tử Flex 2",
      },
    ],
  });
  try {
    editor.select(c);
  } catch {}
  recordInsert();
  showFeedback("Đã chèn Khối Flex");
}

function addRowColumnBlock() {
  if (!editor) return;
  const target = getInsertTarget() as Component;
  const row = target.append({
    type: "text",
    tagName: "div",
    attributes: { style: "display:flex;flex-wrap:wrap;margin:-8px" },
    components: [
      {
        tagName: "div",
        attributes: { style: "flex:1 1 300px;padding:8px" },
        components: [
          {
            tagName: "div",
            attributes: {
              style:
                "padding:16px;border:1px solid #e5e7eb;background:#fff;border-radius:8px",
            },
            content: "Column 1",
          },
        ],
      },
      {
        tagName: "div",
        attributes: { style: "flex:1 1 300px;padding:8px" },
        components: [
          {
            tagName: "div",
            attributes: {
              style:
                "padding:16px;border:1px solid #e5e7eb;background:#fff;border-radius:8px",
            },
            content: "Column 2",
          },
        ],
      },
    ],
  });
  try {
    editor.select(row);
  } catch {}
  recordInsert();
  showFeedback("Đã chèn Hàng/Cột");
}

function addDividerBlock() {
  if (!editor) return;
  const target = getInsertTarget() as Component;
  const div = target.append({
    type: "text",
    tagName: "hr",
    attributes: {
      style: "border:none;border-top:1px solid #e5e7eb;margin:24px 0",
    },
  });
  try {
    editor.select(div);
  } catch {}
  recordInsert();
  showFeedback("Đã chèn Đường kẻ");
}

function onBlockDragStart(id: string) {
  pendingBlockId.value = id;
}
function onCanvasDrop() {
  const id = pendingBlockId.value;
  if (!id) return;
  pendingBlockId.value = null;
  switch (id) {
    case "section":
      addSectionBlock();
      break;
    case "rowcol":
      addRowColumnBlock();
      break;
    case "flex":
      addFlexContainerBlock();
      break;
    case "spacing":
      addSpecBlock("spacing");
      break;
    case "divider":
      addDividerBlock();
      break;
    case "navbar":
      addNavbarBlock();
      break;
    case "menu":
      addMenuBlock();
      break;
    case "form":
      addSpecBlock("form");
      break;
    case "landing-header":
    case "landing-hero":
    case "landing-features":
    case "landing-content-right":
    case "landing-footer":
    case "landing-event-hero":
    case "landing-event-hero-countdown":
    case "landing-event-speakers":
    case "landing-event-benefits":
    case "landing-event-audience":
    case "landing-event-agenda":
    case "landing-event-pricing":
    case "landing-event-sponsors":
    case "landing-event-topics":
    case "landing-event-stats":
    case "landing-event-faq":
    case "landing-event-contact":
    case "landing-event-gallery":
      addFromBlockManager(id);
      break;
    case "form-field":
      addFormFieldBlock();
      break;
    case "modal":
      addModalBlock();
      break;
    case "slider":
      addSliderBlock();
      break;
    case "heading":
      addSpecBlock("heading");
      break;
    case "paragraph":
      addSpecBlock("paragraph");
      break;
    case "richtext":
      addRichTextBlock();
      break;
    case "list":
      addListBlock();
      break;
    case "link":
      addLinkBlock();
      break;
    case "button":
      addButtonBlock();
      break;
    case "image":
      addImageBlock();
      break;
    case "bgimage":
      addBackgroundImageBlock();
      break;
    case "gallery":
      addGalleryBlock();
      break;
    case "video":
      addSpecBlock("video");
      break;
    case "countdown":
      addCountdownBlock();
      break;
    case "html":
      addSpecBlock("html");
      break;
  }
}
function getInsertTarget(): ModelLike | null {
  if (!editor) return null;
  const root = editor.getWrapper() as unknown as ModelLike;
  return root;
}

let addOverlayEl: HTMLButtonElement | null = null;
let addQuickMenuEl: HTMLDivElement | null = null;
let addQuickMenuDocHandler: ((e: MouseEvent) => void) | null = null;
let addQuickMenuKeyHandler: ((e: KeyboardEvent) => void) | null = null;
let addQuickMenuActiveIndex = 0;
let currentAssetTarget: "siteLogo" | "ogImage" | "favicon" | null = null;
let assetSelectHandler:
  | ((asset: {
      get?: (k: string) => unknown;
      src?: string;
      attributes?: { src?: string };
    }) => void)
  | null = null;
function canContainBlocks(m: ModelLike | null) {
  if (!m) return false;
  if (isImageComponent(m) || isVideoComponent(m) || isHtmlComponent(m))
    return false;
  const tag = String(
    (m as any).getTagName?.() || (m as any).tagName || "",
  ).toLowerCase();
  const containerTags = ["div", "section", "nav", "ul", "form"];
  return containerTags.includes(tag);
}
function isEmptyContainer(m: ModelLike | null) {
  try {
    if (!m) return false;
    const coll = m.components?.();
    const children = Array.isArray(coll)
      ? (coll as any[])
      : Array.isArray((coll as any)?.models)
        ? ((coll as any).models as any[])
        : [];
    const hasChildren = children.length > 0;
    const t = getBlockText(m);
    const hasText = !!t;
    return !hasChildren && !hasText;
  } catch {
    return false;
  }
}

const showEditSuperDialog = ref(false);
const editTplId = ref<string | null>(null);
const editTplName = ref("");
const editTplDesc = ref("");

function openEditSuperTemplate(t: SuperTemplateMeta) {
  editTplId.value = t.id;
  editTplName.value = t.name || "";
  editTplDesc.value = t.description || "";
  showEditSuperDialog.value = true;
}

async function confirmEditSuperTemplate() {
  if (!editTplId.value) return;
  try {
    await websiteTemplateService.updateSuperTemplate(editTplId.value, {
      name: editTplName.value,
      description: editTplDesc.value,
    });
    showEditSuperDialog.value = false;
    superTemplatesMeta.value =
      await websiteTemplateService.listSuperTemplatesMeta();
    try {
      toast.success("Đã cập nhật mẫu");
    } catch {}
  } catch {
    try {
      toast.error("Không cập nhật được mẫu");
    } catch {}
  }
}

async function applyAndSaveCompany(id: string) {
  isApplyingTemplate.value = true;
  try {
    await applySuperTemplate(id, false);
    await saveCompanyTemplate();
  } finally {
    isApplyingTemplate.value = false;
  }
}
function ensurePlaceholderAttrs(m: ModelLike | null) {
  if (!m) return;
  const el = m.getEl?.();
  if (!el) return;
  if (!el.getAttribute("data-placeholder"))
    el.setAttribute("data-placeholder", "Thêm nội dung");
  const empty = isEmptyContainer(m);
  const curClass = String(m.getAttributes?.().class || "");
  const hasEmptyClass = curClass.split(/\s+/).includes("wb-empty");
  if (empty && !hasEmptyClass)
    m.addAttributes?.({ class: `${curClass ? curClass + " " : ""}wb-empty` });
  if (!empty && hasEmptyClass)
    m.addAttributes?.({
      class: curClass.replace(/(^|\s)wb-empty(\s|$)/, " ").trim(),
    });
}
function removeAddOverlay() {
  const doc = editor?.Canvas.getDocument();
  if (addOverlayEl && doc) {
    try {
      addOverlayEl.remove();
    } catch {}
  }
  addOverlayEl = null;
  hideAddQuickMenu();
}
function ensureCanvasOverlayStyles() {
  const doc = editor?.Canvas.getDocument();
  const head = doc?.head;
  if (!doc || !head) return;
  const id = "wb-overlay-style";
  if (head.querySelector(`#${id}`)) return;
  const style = doc.createElement("style");
  style.id = id;
  style.innerHTML = `.wb-empty:empty::before{content:attr(data-placeholder);display:block;color:#64748b;font-size:13px;padding:12px}`;
  head.appendChild(style);
}
function ensureCanvasThemeVars() {
  const doc = editor?.Canvas.getDocument();
  const head = doc?.head;
  if (!doc || !head) return;
  const id = "wb-theme-vars";
  if (head.querySelector(`#${id}`)) return;
  const style = doc.createElement("style");
  style.id = id;
  style.innerHTML = `:root{--color-primary:#6e41e2;--color-primary-ring:rgba(110,65,226,0.25);--color-secondary:#0ea5e9;--text-primary:#0f172a;--text-secondary:#475569;--bg-muted:#f1f5f9;--bg-elevated:#ffffff;--space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:20px;--space-6:24px;--radius-8:8px;--radius-12:12px}`;
  head.appendChild(style);
}
function ensureCanvasA11yStyles() {
  const doc = editor?.Canvas.getDocument();
  const head = doc?.head;
  if (!doc || !head) return;
  const id = "wb-a11y-styles";
  if (head.querySelector(`#${id}`)) return;
  const style = doc.createElement("style");
  style.id = id;
  style.innerHTML = `.wb-slider-dots button:focus-visible{outline:2px solid var(--color-primary);outline-offset:2px;box-shadow:0 0 0 4px var(--color-primary-ring)}.wb-slider-nav:focus-visible{outline:2px solid var(--color-primary);outline-offset:2px;box-shadow:0 0 0 4px var(--color-primary-ring)}`;
  head.appendChild(style);
}
function ensureCanvasBlocksStyles() {
  const doc = editor?.Canvas.getDocument();
  const head = doc?.head;
  if (!doc || !head) return;
  const id = "wb-blocks-style";
  if (head.querySelector(`#${id}`)) return;
  const style = doc.createElement("style");
  style.id = id;
  style.innerHTML = `:root{--wb-color-primary:#6e41e2;--wb-color-secondary:#0ea5e9;--wb-text-primary:#0f172a;--wb-text-secondary:#475569;--wb-bg-muted:#f1f5f9;--wb-bg-elevated:#ffffff;--wb-space-1:4px;--wb-space-2:8px;--wb-space-3:12px;--wb-space-4:16px;--wb-space-5:20px;--wb-space-6:24px;--wb-radius-8:8px;--wb-radius-12:12px;--wb-border-color:#e5e7eb}
.wb-dark,:root.wb-dark{--wb-bg-elevated:#ffffff;--wb-bg-muted:#0f172a;--wb-text-primary:#e5e7eb;--wb-text-secondary:#cbd5e1;--wb-border-color:#1f2937}
@media(prefers-color-scheme: dark){:root{--wb-bg-elevated:#ffffff;--wb-bg-muted:#0f172a;--wb-text-primary:#e5e7eb;--wb-text-secondary:#cbd5e1;--wb-border-color:#1f2937}}
.wb-section{display:block;padding:var(--wb-space-4);margin:var(--wb-space-3) 0;border:1px solid var(--wb-border-color);border-radius:var(--wb-radius-12);background:var(--wb-bg-elevated)}
.wb-grid{display:grid;gap:var(--wb-space-3);margin:var(--wb-space-3) 0}
.wb-grid--cols-2{grid-template-columns:1fr 1fr}
.wb-grid--cols-3{grid-template-columns:1fr 1fr 1fr}
@media(max-width:768px){.wb-grid--cols-2,.wb-grid--cols-3{grid-template-columns:1fr}}
.wb-menu{padding:0;margin:var(--wb-space-3) 0;list-style:disc inside}
.wb-box{min-height:80px;padding:var(--wb-space-3);border:1px solid var(--wb-border-color);border-radius:var(--wb-radius-8);background:#fff}
.wb-flex{display:flex;gap:var(--wb-space-3);align-items:center;margin:var(--wb-space-3) 0;flex-wrap:wrap}
.wb-divider{border:0;border-top:1px dashed var(--wb-border-color);margin:var(--wb-space-3) 0}
.wb-navbar{display:flex;gap:var(--wb-space-3);align-items:center;min-height:70px;padding:var(--wb-space-3);margin:var(--wb-space-3) 0;border:1px solid var(--wb-border-color);border-radius:var(--wb-radius-12);background:var(--wb-bg-muted);box-sizing:border-box}
.wb-navbar a,.wb-navbar .wb-link{display:inline-flex;align-items:center}
.wb-navbar--sticky{position:sticky;top:0}
.wb-link{color:#111827}
.wb-heading{margin:0 0 var(--wb-space-2);color:var(--wb-text-primary)}
.wb-paragraph{margin:0 0 var(--wb-space-2);color:var(--wb-text-secondary)}
.wb-button{display:inline-block;text-decoration:none;font-weight:700;border-radius:var(--wb-radius-8);border:1px solid transparent}
.wb-button--primary{background:var(--wb-color-primary);color:#fff;border:none}
.wb-button--secondary{background:#e5e7eb;color:#111827;border:none}
.wb-button--outline{background:transparent;color:var(--wb-color-primary);border:1px solid var(--wb-color-primary)}
.wb-button--sm{padding:8px 12px}
.wb-button--md{padding:12px 20px}
.wb-button--lg{padding:14px 24px}
.wb-image{width:100%;height:auto;border-radius:var(--wb-radius-12);object-fit:var(--wb-image-fit, cover);object-position:var(--wb-image-position, center)}
.wb-video{width:100%;height:auto;border-radius:var(--wb-radius-12);background:#000}
.wb-iframe{width:100%;min-height:160px;border:1px solid var(--wb-border-color);border-radius:var(--wb-radius-12)}
.wb-list{padding-left:18px;margin:var(--wb-space-2) 0;color:var(--wb-text-primary)}
.wb-list__item{margin-bottom:4px}
.wb-richtext{padding:var(--wb-space-3);border:1px solid var(--wb-border-color);border-radius:var(--wb-radius-8);background:var(--wb-bg-elevated);color:var(--wb-text-primary)}
.wb-bgimage{min-height:160px;border-radius:var(--wb-radius-12);background-size:cover;background-position:center;margin:var(--wb-space-2) 0}
.wb-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--wb-space-2)}
@media(max-width:768px){.wb-gallery{grid-template-columns:repeat(2,1fr)}}
.wb-gallery__item{width:100%;height:auto;border-radius:var(--wb-radius-8)}
.wb-hero{position:relative;min-height:240px;padding:var(--wb-space-4);border-radius:var(--wb-radius-12);background-size:cover;background-position:center;margin:var(--wb-space-3) 0;color:#ffffff}
.wb-hero__video{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden;border-radius:inherit}
.wb-hero__overlay{position:absolute;inset:0;z-index:1;border-radius:inherit}
.wb-hero__title{margin:0 0 var(--wb-space-2);font-size:28px;font-weight:800}
.wb-hero__subtitle{margin:0 0 var(--wb-space-3);font-size:14px}
.wb-modal__overlay{position:fixed;inset:0;background:rgba(2,8,23,.45)}
.wb-modal{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);padding:var(--wb-space-4);border:1px solid var(--wb-border-color);border-radius:var(--wb-radius-12);background:var(--wb-bg-elevated);box-shadow:0 8px 24px rgba(0,0,0,0.12)}
.wb-modal__close{position:absolute;right:var(--wb-space-3);top:var(--wb-space-3);border:none;background:transparent;color:#475569;font-size:16px;cursor:pointer}
.wb-modal__title{margin:0 0 var(--wb-space-2)}
.wb-slider{position:relative}
.wb-slider__viewport{display:flex;gap:var(--wb-space-2);overflow:hidden}
.wb-slider__nav{position:absolute;top:50%;transform:translateY(-50%);padding:var(--wb-space-2) var(--wb-space-3);border:none;border-radius:var(--wb-radius-8);background:var(--wb-color-primary);color:#fff}
.wb-slider__nav--prev{left:var(--wb-space-2)}
.wb-slider__nav--next{right:var(--wb-space-2)}
.wb-slider__indicator{position:absolute;right:var(--wb-space-2);top:var(--wb-space-2);padding:2px 6px;border-radius:999px;background:var(--wb-bg-elevated);box-shadow:0 1px 2px rgba(0,0,0,.08);font-size:12px;color:var(--wb-text-secondary)}
.wb-slider__dots{position:absolute;left:50%;bottom:var(--wb-space-2);transform:translateX(-50%);display:flex;gap:6px}
.wb-slider__dots button{width:8px;height:8px;border-radius:999px;border:none;background:#cbd5e1}
.wb-slider__dots button[aria-current="true"]{background:var(--wb-color-primary)}`;
  head.appendChild(style);
}
function _setCanvasTheme(mode: "dark" | "light") {
  const doc = editor?.Canvas.getDocument();
  const root = doc?.documentElement;
  if (!root) return;
  root.classList.remove("wb-dark");
  if (mode === "dark") root.classList.add("wb-dark");
}
function showAddQuickMenu(rect: DOMRect) {
  const doc = editor?.Canvas.getDocument();
  const sel = selectedComponent.value;
  const now = Date.now();
  if (
    !doc ||
    !sel ||
    dupProcessing ||
    pendingSyncAfterBurst ||
    now < bulkModeUntil ||
    (!autoSelectOnAdd && lastAddAt && now - lastAddAt < ADD_SELECT_BLOCK_MS)
  )
    return;
  if (!addQuickMenuEl) {
    addQuickMenuEl = doc.createElement("div");
    addQuickMenuEl.style.position = "absolute";
    addQuickMenuEl.style.background = "#ffffff";
    addQuickMenuEl.style.border = "1px solid #e5e7eb";
    addQuickMenuEl.style.borderRadius = "10px";
    addQuickMenuEl.style.boxShadow = "0 8px 24px rgba(16,24,40,0.12)";
    addQuickMenuEl.style.padding = "8px";
    addQuickMenuEl.style.zIndex = "2403";
    addQuickMenuEl.setAttribute("role", "menu");
    const mk = (label: string, on: () => void) => {
      const b = doc.createElement("button");
      b.type = "button";
      b.textContent = label;
      b.style.display = "block";
      b.style.width = "160px";
      b.style.textAlign = "left";
      b.style.padding = "8px 10px";
      b.style.border = "none";
      b.style.background = "transparent";
      b.style.borderRadius = "8px";
      b.style.color = "#374151";
      b.style.fontSize = "12px";
      b.style.fontWeight = "600";
      b.setAttribute("role", "menuitem");
      b.setAttribute("tabindex", "0");
      b.addEventListener("mouseenter", () => {
        b.style.background = "#eef2ff";
        b.style.color = "#6366f1";
      });
      b.addEventListener("mouseleave", () => {
        b.style.background = "transparent";
        b.style.color = "#374151";
      });
      b.addEventListener("click", () => {
        on();
        hideAddQuickMenu();
        ensurePlaceholderAttrs(sel);
        updateAddOverlayThrottled();
      });
      return b;
    };
    addQuickMenuEl.appendChild(mk("Tiêu đề", () => addSpecBlock("heading")));
    addQuickMenuEl.appendChild(mk("Đoạn văn", () => addSpecBlock("paragraph")));
    addQuickMenuEl.appendChild(mk("Hình ảnh", () => addSpecBlock("image")));
    addQuickMenuEl.appendChild(mk("Nút bấm", () => addButtonBlock()));
    addQuickMenuEl.appendChild(mk("Danh sách", () => addListBlock()));
    addQuickMenuEl.appendChild(mk("Hàng/Cột", () => addRowColumnBlock()));
    addQuickMenuEl.appendChild(mk("Ảnh nền", () => addBackgroundImageBlock()));
    addQuickMenuEl.appendChild(mk("Thẻ (Card)", () => addModalBlock()));
    addQuickMenuEl.appendChild(mk("Phần chính", () => openBannerTemplateDialog()));
    addQuickMenuEl.appendChild(mk("Lưới 3 cột", () => addGrid3Block()));
    addQuickMenuEl.appendChild(mk("Thanh trượt", () => addSliderBlock()));
    addQuickMenuEl.appendChild(mk("Thanh điều hướng", () => addNavbarBlock()));
    addQuickMenuEl.appendChild(
      mk("Trường nhập liệu", () => addFormFieldBlock()),
    );
    addQuickMenuEl.appendChild(mk("Đường kẻ", () => addDividerBlock()));
    const items = Array.from(addQuickMenuEl.querySelectorAll("button"));
    addQuickMenuActiveIndex = 0;
    try {
      (items[0] as HTMLButtonElement | undefined)?.focus();
    } catch {}
    addQuickMenuKeyHandler = (e: KeyboardEvent) => {
      const max = items.length - 1;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        addQuickMenuActiveIndex = Math.min(max, addQuickMenuActiveIndex + 1);
        (
          items[addQuickMenuActiveIndex] as HTMLButtonElement | undefined
        )?.focus();
        uxMetrics.quickMenuKeyboardOps += 1;
        uxMetrics.lastAction = "quickmenu_key_down";
        saveMetrics();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        addQuickMenuActiveIndex = Math.max(0, addQuickMenuActiveIndex - 1);
        (
          items[addQuickMenuActiveIndex] as HTMLButtonElement | undefined
        )?.focus();
        uxMetrics.quickMenuKeyboardOps += 1;
        uxMetrics.lastAction = "quickmenu_key_up";
        saveMetrics();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        (
          items[addQuickMenuActiveIndex] as HTMLButtonElement | undefined
        )?.click();
        uxMetrics.quickMenuKeyboardOps += 1;
        uxMetrics.lastAction = "quickmenu_key_activate";
        saveMetrics();
      } else if (e.key === "Escape") {
        e.preventDefault();
        hideAddQuickMenu();
      }
    };
    doc.addEventListener("keydown", addQuickMenuKeyHandler, false);
    doc.body.appendChild(addQuickMenuEl);
  }
  const top = rect.top + 40;
  const left = rect.left + 8;
  addQuickMenuEl.style.top = `${top}px`;
  addQuickMenuEl.style.left = `${left}px`;
  if (!addQuickMenuDocHandler) {
    addQuickMenuDocHandler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        addQuickMenuEl &&
        addOverlayEl &&
        t &&
        !addQuickMenuEl.contains(t) &&
        !addOverlayEl.contains(t as Node)
      ) {
        hideAddQuickMenu();
      }
    };
    doc.addEventListener("mousedown", addQuickMenuDocHandler, false);
  }
  insertStartAt = performance.now();
  uxMetrics.quickMenuOpens += 1;
  uxMetrics.lastAction = "quickmenu_open";
  saveMetrics();
}
function hideAddQuickMenu() {
  const doc = editor?.Canvas.getDocument();
  if (addQuickMenuEl && doc) {
    try {
      addQuickMenuEl.remove();
    } catch {}
  }
  addQuickMenuEl = null;
  if (doc && addQuickMenuDocHandler) {
    doc.removeEventListener("mousedown", addQuickMenuDocHandler, false);
  }
  if (doc && addQuickMenuKeyHandler) {
    doc.removeEventListener("keydown", addQuickMenuKeyHandler, false);
  }
  addQuickMenuDocHandler = null;
  addQuickMenuKeyHandler = null;
}
function updateAddOverlay() {
  removeAddOverlay();
}
const updateAddOverlayThrottled = throttle(
  () => {
    try {
      updateAddOverlay();
    } catch {}
  },
  150,
  { leading: true, trailing: true },
);
function toStyle(obj: Record<string, string | undefined> | undefined) {
  if (!obj) return "";
  return Object.entries(obj)
    .filter(([, v]) => v != null && v !== "")
    .map(([k, v]) => `${k}: ${v as string}`)
    .join("; ");
}
function addFromBlockManager(blockId: string) {
  if (!editor) return;
  const block = editor.BlockManager.get(blockId);
  if (!block) return;

  // Optimization: Set flag to skip heavy component:add listeners
  isAddingBlock.value = true;

  try {
    const content = block.getContent();
    const target = getInsertTarget() as Component;
    // content can be a string or object
    const added = target.append(content as any);
    try {
      if (Array.isArray(added)) {
        if (added.length > 0) editor.select(added[0]);
      } else {
        editor.select(added as Component);
      }
    } catch {}
    if (blockId === "landing-event-hero-countdown") {
      try {
        const selected = editor.getSelected() as any;
        const rootEl =
          selected && selected.getEl
            ? (selected.getEl() as HTMLElement | null)
            : null;
        let timer: HTMLElement | null = null;
        if (rootEl) {
          if (rootEl.matches(".countdown-timer")) {
            timer = rootEl;
          } else {
            timer = rootEl.querySelector(
              ".countdown-timer",
            ) as HTMLElement | null;
          }
        }
        if (timer) {
          countdownTargetTimer = timer;
          const evtData =
            (companyEvents.value && companyEvents.value[0]) ||
            pendingCountdownEvent.value ||
            getMockEvent();
          pendingCountdownEvent.value = evtData;
          const base = evtData.startDate
            ? new Date(evtData.startDate)
            : new Date();
          const pad = (n: number) => String(n).padStart(2, "0");
          const toLocalInput = (d: Date) => {
            const y = d.getFullYear();
            const m = pad(d.getMonth() + 1);
            const da = pad(d.getDate());
            const h = pad(d.getHours());
            const mi = pad(d.getMinutes());
            return `${y}-${m}-${da}T${h}:${mi}`;
          };
          countdownDateInput.value = toLocalInput(base);
          showCountdownDialog.value = true;
        }
      } catch {}
    }
    recordInsert();
    showFeedback(`Đã chèn ${block.getLabel()}`);
  } finally {
    isAddingBlock.value = false;
    scheduleUIUpdate();
  }
}

function addSpecBlock(
  id:
    | "container"
    | "table"
    | "form"
    | "media"
    | "text"
    | "grid"
    | "spacing"
    | "heading"
    | "paragraph"
    | "image"
    | "video"
    | "html",
) {
  if (!editor) return;
  const parent = getInsertTarget() as Component;
  const blocks = blocksSpec.blocks;
  const def = blocks.find((b) => b.id === id);
  const placeholder =
    "data:image/gif;base64,R0lGODlhAQABAPAAAP8AAAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
  if (id === "container") {
    const cont = parent.append({
      type: "text",
      tagName: "div",
      attributes: { style: toStyle(def?.defaults?.style) },
    });
    try {
      editor.select(cont);
    } catch {}
    recordInsert();
    showFeedback("Đã chèn Khối chứa");
    return;
  }
  if (id === "text") {
    const h = parent.append({
      type: "text",
      tagName: "h1",
      content: "Tiêu đề",
      attributes: {
        style: toStyle({
          ...(def?.defaults?.style || {}),
          "font-size": "24px",
          "font-weight": "700",
        }),
        class: "wb-heading",
      },
    });
    try {
      editor.select(h);
    } catch {}
    recordInsert();
    showFeedback("Đã chèn Văn bản");
    return;
  }
  if (id === "heading") {
    const h = parent.append({
      type: "text",
      tagName: "h1",
      content: "Tiêu đề",
      attributes: { style: toStyle(def?.defaults?.style), class: "wb-heading" },
    });
    try {
      editor.select(h);
    } catch {}
    recordInsert();
    showFeedback("Đã chèn Tiêu đề");
    return;
  }
  if (id === "paragraph") {
    const p = parent.append({
      type: "text",
      tagName: "p",
      content: "Đoạn văn",
      attributes: {
        style: toStyle(def?.defaults?.style),
        class: "wb-paragraph",
      },
    });
    try {
      editor.select(p);
    } catch {}
    recordInsert();
    showFeedback("Đã chèn Đoạn văn");
    return;
  }
  if (id === "media") {
    const img = parent.append({
      type: "image",
      attributes: {
        src: placeholder,
        alt: "",
        style: toStyle(def?.defaults?.style),
        class: "wb-image",
      },
    });
    if (!editor) {
      recordInsert();
      showFeedback("Đã chèn Đa phương tiện");
      return;
    }
    try {
      if (editor) editor.select(img);
      setTimeout(() => {
        if (editor)
          editor.runCommand("open-assets", {
            target: img,
            types: ["image"],
            accept: "image/*",
          });
      }, 100);
    } catch {}
    recordInsert();
    showFeedback("Đã chèn Đa phương tiện");
    return;
  }
  if (id === "image") {
    const img = parent.append({
      type: "image",
      attributes: {
        src: placeholder,
        alt: "",
        style: toStyle(def?.defaults?.style),
        class: "wb-image",
      },
    });
    if (!editor) {
      recordInsert();
      showFeedback("Đã chèn Hình ảnh");
      return;
    }
    try {
      if (editor) editor.select(img);
      setTimeout(() => {
        if (editor)
          editor.runCommand("open-assets", {
            target: img,
            types: ["image"],
            accept: "image/*",
          });
      }, 100);
    } catch {}
    recordInsert();
    showFeedback("Đã chèn Hình ảnh");
    return;
  }
  if (id === "video") {
    const vid = parent.append({
      type: "text",
      tagName: "video",
      attributes: {
        controls: true,
        style: toStyle(def?.defaults?.style),
        class: "wb-video",
      },
      content: "",
    });
    try {
      editor.select(vid);
    } catch {}
    recordInsert();
    showFeedback("Đã chèn Video");
    return;
  }
  if (id === "html") {
    const htmlBlock = parent.append({
      type: "text",
      tagName: "div",
      content: "<div>Mã HTML tùy chỉnh</div>",
      attributes: {
        style: toStyle(def?.defaults?.style),
        class: "wb-html-block",
        "data-wb-type": "html",
      },
    });
    try {
      editor.select(htmlBlock);
    } catch {}
    recordInsert();
    showFeedback("Đã chèn Mã HTML");
    return;
  }
  if (id === "table") {
    const tblCreated = parent.append({
      type: "text",
      tagName: "table",
      attributes: { style: toStyle(def?.defaults?.style), border: "1" },
    });
    const tbl = (
      Array.isArray(tblCreated)
        ? (tblCreated[0] as Component)
        : (tblCreated as Component)
    ) as Component;
    const theadTmp = tbl.append({ type: "text", tagName: "thead" });
    const thead = (
      Array.isArray(theadTmp)
        ? (theadTmp[0] as Component)
        : (theadTmp as Component)
    ) as Component;
    const headRowTmp = thead.append({ type: "text", tagName: "tr" });
    const headRow = (
      Array.isArray(headRowTmp)
        ? (headRowTmp[0] as Component)
        : (headRowTmp as Component)
    ) as Component;
    headRow.append({ type: "text", tagName: "td", content: "Cột A" });
    headRow.append({ type: "text", tagName: "td", content: "Cột B" });
    const tbodyTmp = tbl.append({ type: "text", tagName: "tbody" });
    const tbody = (
      Array.isArray(tbodyTmp)
        ? (tbodyTmp[0] as Component)
        : (tbodyTmp as Component)
    ) as Component;
    for (let i = 0; i < 2; i++) {
      const rTmp = tbody.append({ type: "text", tagName: "tr" });
      const r = (
        Array.isArray(rTmp) ? (rTmp[0] as Component) : (rTmp as Component)
      ) as Component;
      r.append({ type: "text", tagName: "td", content: `Hàng ${i + 1}-A` });
      r.append({ type: "text", tagName: "td", content: `Hàng ${i + 1}-B` });
    }
    try {
      editor.select(tbl);
    } catch {}
    recordInsert();
    showFeedback("Đã chèn Bảng");
    return;
  }
  if (id === "form") {
    const frmCreated = parent.append({
      type: "text",
      tagName: "form",
      attributes: { style: toStyle(def?.defaults?.style) },
    });
    const frm = (
      Array.isArray(frmCreated)
        ? (frmCreated[0] as Component)
        : (frmCreated as Component)
    ) as Component;
    frm.append({
      type: "text",
      tagName: "input",
      attributes: { type: "text", placeholder: "Nhập tên" },
    });
    const selTmp = frm.append({ type: "text", tagName: "select" });
    const sel = (
      Array.isArray(selTmp) ? (selTmp[0] as Component) : (selTmp as Component)
    ) as Component;
    sel.append({
      type: "text",
      tagName: "option",
      content: "Chọn",
    });
    sel.append({
      type: "text",
      tagName: "option",
      content: "A",
    });
    frm.append({
      type: "text",
      tagName: "textarea",
      content: "Ghi chú",
    });
    frm.append({
      type: "text",
      tagName: "button",
      content: "Gửi",
      attributes: {
        type: "submit",
        style:
          "padding:8px 12px;background:#2563eb;color:#fff;border:none;border-radius:6px;",
      },
    });
    try {
      editor.select(frm);
    } catch {}
    recordInsert();
    showFeedback("Đã chèn Biểu mẫu");
    return;
  }
  if (id === "grid") {
    const styleObj = { ...(def?.defaults?.style || {}) };
    delete styleObj["grid-template-columns"]; // Use class for responsive grid

    const grid = parent.append({
      type: "text",
      tagName: "div",
      attributes: {
        class: "wb-grid--cols-2",
        style: toStyle(styleObj),
      },
      components: [
        {
          type: "text",
          tagName: "div",
          attributes: {
            style: "padding:12px;border:1px solid #e5e7eb;border-radius:8px",
          },
          content: "",
        },
        {
          type: "text",
          tagName: "div",
          attributes: {
            style: "padding:12px;border:1px solid #e5e7eb;border-radius:8px",
          },
          content: "",
        },
      ],
    });
    try {
      editor.select(grid);
    } catch {}
    recordInsert();
    showFeedback("Đã chèn Lưới");
    return;
  }
  if (id === "spacing") {
    const sp = parent.append({
      type: "text",
      tagName: "div",
      attributes: { style: toStyle(def?.defaults?.style) },
    });
    try {
      editor.select(sp);
    } catch {}
    recordInsert();
    showFeedback("Đã chèn Khoảng đệm");
    return;
  }
}

function addNavbarBlock() {
  if (!editor) return;
  ensureCanvasThemeVars();
  ensureCanvasBlocksStyles();
  const target = getInsertTarget() as Component;
  const nav = target.append({
    type: "navbar",
    tagName: "nav",
    attributes: {
      style:
        "display:flex;gap:var(--space-3);align-items:center;padding:var(--space-3);border:1px solid #e5e7eb;border-radius:var(--radius-12);background:#f8fafc",
      class: "wb-navbar",
    },
    components: [
      {
        type: "link",
        tagName: "a",
        content: "Trang chủ",
        attributes: { href: "#", style: "color:#111827", class: "wb-link" },
      },
      {
        type: "link",
        tagName: "a",
        content: "Giới thiệu",
        attributes: { href: "#", style: "color:#111827", class: "wb-link" },
      },
      {
        type: "link",
        tagName: "a",
        content: "Liên hệ",
        attributes: { href: "#", style: "color:#111827", class: "wb-link" },
      },
    ],
  });
  try {
    editor.select(nav);
  } catch {}
  recordInsert();
  showFeedback("Đã chèn Thanh điều hướng");
}
function addMenuBlock() {
  if (!editor) return;
  const target = getInsertTarget() as Component;
  const menu = target.append({
    type: "text",
    tagName: "ul",
    attributes: {
      style: "padding:0;margin:12px 0;list-style:disc inside",
      class: "wb-menu",
    },
    components: [
      { type: "text", tagName: "li", content: "Mục 1" },
      { type: "text", tagName: "li", content: "Mục 2" },
      { type: "text", tagName: "li", content: "Mục 3" },
    ],
  });
  try {
    editor.select(menu);
  } catch {}
  recordInsert();
  showFeedback("Đã chèn Menu");
}
function addFormFieldBlock() {
  if (!editor) return;
  const target = getInsertTarget() as Component;
  const field = target.append({
    type: "text",
    tagName: "input",
    attributes: {
      type: "text",
      placeholder: "Nhập văn bản",
      style:
        "display:block;width:100%;padding:8px 12px;border:1px solid #d1d5db;border-radius:8px;margin:8px 0",
      class: "wb-form__field",
    },
  });
  try {
    editor.select(field);
  } catch {}
  recordInsert();
  showFeedback("Đã chèn Trường nhập liệu");
}
function addModalBlock() {
  if (!editor) return;
  ensureCanvasThemeVars();
  ensureCanvasBlocksStyles();
  const target = getInsertTarget() as Component;
  const overlayCreated = target.append({
    type: "text",
    tagName: "div",
    attributes: {
      style: "position:fixed;inset:0;background:rgba(2,8,23,.45)",
      "data-role": "overlay",
      "data-overlay-close": "true",
      class: "wb-modal__overlay",
    },
  });
  const modalCreated = target.append({
    type: "modal",
    tagName: "div",
    attributes: {
      style:
        "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);padding:var(--space-4);border:1px solid #d1d5db;border-radius:var(--radius-12);background:#ffffff;box-shadow:0 8px 24px rgba(0,0,0,0.12)",
      "data-role": "modal",
      class: "wb-modal",
    },
    components: [
      {
        type: "text",
        tagName: "button",
        content: "✕",
        attributes: {
          style:
            "position:absolute;right:var(--space-3);top:var(--space-3);border:none;background:transparent;color:#475569;font-size:16px;cursor:pointer",
          "data-role": "close",
          "aria-label": "Close",
          class: "wb-modal__close",
        },
      },
      {
        type: "text",
        tagName: "h3",
        content: "Tiêu đề hộp thoại",
        attributes: {
          style: "margin:0 0 var(--space-2)",
          class: "wb-modal__title",
        },
      },
      { type: "text", tagName: "p", content: "Nội dung hộp thoại" },
    ],
  });
  const overlay = (
    Array.isArray(overlayCreated)
      ? (overlayCreated[0] as Component)
      : (overlayCreated as Component)
  ) as Component;
  const modal = (
    Array.isArray(modalCreated)
      ? (modalCreated[0] as Component)
      : (modalCreated as Component)
  ) as Component;
  try {
    editor.select(modal);
  } catch {}
  initModalBehavior(modal, overlay);
  recordInsert();
  showFeedback("Đã chèn Hộp thoại");
}
function addSliderBlock() {
  if (!editor) return;
  ensureCanvasThemeVars();
  ensureCanvasA11yStyles();
  ensureCanvasBlocksStyles();
  const target = getInsertTarget() as Component;
  const sliderCreated = target.append({
    type: "slider",
    tagName: "div",
    attributes: {
      style: "position:relative",
      "aria-label": "Thanh trượt",
      "aria-roledescription": "carousel",
      class: "wb-slider",
    },
    components: [
      {
        type: "text",
        tagName: "div",
        attributes: {
          style: "display:flex;gap:var(--space-2);overflow:hidden",
          tabindex: "0",
          role: "listbox",
          "data-role": "viewport",
          class: "wb-slider__viewport",
        },
        components: [
          {
            type: "text",
            tagName: "div",
            attributes: {
              style:
                "min-width:160px;min-height:100px;background:#e5e7eb;border-radius:var(--radius-8)",
              role: "option",
              tabindex: "-1",
              "data-role": "slide",
              class: "wb-slider__slide",
            },
          },
          {
            type: "text",
            tagName: "div",
            attributes: {
              style:
                "min-width:160px;min-height:100px;background:#e5e7eb;border-radius:var(--radius-8)",
              role: "option",
              tabindex: "-1",
              "data-role": "slide",
              class: "wb-slider__slide",
            },
          },
          {
            type: "text",
            tagName: "div",
            attributes: {
              style:
                "min-width:160px;min-height:100px;background:#e5e7eb;border-radius:var(--radius-8)",
              role: "option",
              tabindex: "-1",
              "data-role": "slide",
              class: "wb-slider__slide",
            },
          },
        ],
      },
      {
        type: "slider-nav",
        tagName: "button",
        content: "<",
        attributes: {
          style:
            "position:absolute;left:var(--space-2);top:50%;transform:translateY(-50%);padding:var(--space-2) var(--space-3);border:none;border-radius:var(--radius-8);background:#6e41e2;background:var(--color-primary);color:#fff",
          "data-role": "prev",
          class: "wb-slider-nav wb-slider__nav wb-slider__nav--prev",
          "aria-hidden": "true",
        },
      },
      {
        type: "slider-nav",
        tagName: "button",
        content: ">",
        attributes: {
          style:
            "position:absolute;right:var(--space-2);top:50%;transform:translateY(-50%);padding:var(--space-2) var(--space-3);border:none;border-radius:var(--radius-8);background:#6e41e2;background:var(--color-primary);color:#fff",
          "data-role": "next",
          class: "wb-slider-nav wb-slider__nav wb-slider__nav--next",
          "aria-hidden": "true",
        },
      },
      {
        type: "text",
        tagName: "div",
        content: "1/3",
        attributes: {
          style:
            "position:absolute;right:var(--space-2);top:var(--space-2);padding:2px 6px;border-radius:999px;background:var(--bg-elevated);box-shadow:0 1px 2px rgba(0,0,0,.08);font-size:12px;color:var(--text-secondary)",
          "data-role": "indicator",
          "aria-live": "polite",
          class: "wb-slider__indicator",
        },
      },
      {
        type: "text",
        tagName: "div",
        content: "",
        attributes: {
          style:
            "position:absolute;width:1px;height:1px;padding:0;margin:-1px;border:0;clip:rect(0 0 0 0);overflow:hidden",
          "data-role": "announce",
          role: "status",
          "aria-live": "polite",
          "aria-atomic": "true",
          class: "wb-slider__announce",
        },
      },
    ],
  });
  const slider = (
    Array.isArray(sliderCreated)
      ? (sliderCreated[0] as Component)
      : (sliderCreated as Component)
  ) as Component;
  try {
    editor.select(slider);
  } catch {}
  initSliderBehavior(slider);
  recordInsert();
  showFeedback("Đã chèn Thanh trượt");
}
function resetSliderInstance(model: Component | null) {
  const el = model?.getEl?.() as HTMLElement | null;
  if (!el) return;
  try {
    el.removeAttribute("data-slider-init");
    el.removeAttribute("data-loop-init");
    const vp =
      (el.querySelector('[data-role="viewport"]') as HTMLElement) || el;
    // remove cloned sentinel slides
    Array.from(vp.querySelectorAll('[data-role="slide"]')).forEach((s) => {
      const id = String((s as HTMLElement).id || "");
      if (/\bclone-(first|last)\b/.test(id)) s.remove();
    });
    // remove dots container if present
    const dots = el.querySelector('[data-role="dots"]');
    if (dots) dots.remove();
  } catch {}
}
function initSliderBehavior(model: Component | null) {
  const doc = editor?.Canvas.getDocument();
  const el = model?.getEl?.();
  if (!doc || !el) return;
  try {
    const already = String(
      (el as HTMLElement).getAttribute("data-slider-init") || "",
    );
    if (already === "1") return;
    (el as HTMLElement).setAttribute("data-slider-init", "1");
  } catch {}
  const vp =
    (el.querySelector('[data-role="viewport"]') as HTMLElement | null) ||
    (el as HTMLElement);
  const prev = el.querySelector(
    'button[data-role="prev"]',
  ) as HTMLButtonElement | null;
  const next = el.querySelector(
    'button[data-role="next"]',
  ) as HTMLButtonElement | null;
  vp.style.scrollBehavior = "auto";
  vp.style.overflow = "hidden";
  vp.style.cursor = "grab";
  const items = Array.from(
    vp.querySelectorAll(':scope > [data-role="slide"]'),
  ) as HTMLElement[];
  const indicator = el.querySelector(
    '[data-role="indicator"]',
  ) as HTMLElement | null;
  const announce = el.querySelector(
    '[data-role="announce"]',
  ) as HTMLElement | null;
  let dots = el.querySelector('[data-role="dots"]') as HTMLElement | null;
  if (!items.length) return;
  let gap = parseFloat(getComputedStyle(el).gap || "8px") || 8;
  let step = (items[0].offsetWidth || 160) + gap;
  const prefix = `wb-slider-${Math.random().toString(36).slice(2, 7)}`;
  items.forEach((it, i) => {
    it.id = `${prefix}-item-${i}`;
    it.setAttribute("aria-selected", "false");
  });
  if (!el.getAttribute("data-loop-init")) {
    const firstItem = items[0];
    const lastItem = items[items.length - 1];
    const firstClone = firstItem.cloneNode(true) as HTMLElement;
    const lastClone = lastItem.cloneNode(true) as HTMLElement;
    firstClone.id = `${prefix}-clone-first`;
    lastClone.id = `${prefix}-clone-last`;
    firstClone.setAttribute("role", "option");
    firstClone.setAttribute("tabindex", "-1");
    firstClone.setAttribute("data-role", "slide");
    lastClone.setAttribute("role", "option");
    lastClone.setAttribute("tabindex", "-1");
    lastClone.setAttribute("data-role", "slide");
    vp.appendChild(firstClone);
    vp.insertBefore(lastClone, firstItem);
    el.setAttribute("data-loop-init", "1");
    vp.scrollLeft = step;
  }
  const baseOffset = step;
  const count = items.length;
  let animDuration = 260;
  let lastFPS = 60;
  let roleMode: "listbox" | "tabs" = "listbox";
  let easingMode: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear" =
    "ease";
  let effectMode: "smooth" | "instant" = "smooth";
  let animDurationUser: number | null = null;
  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));
  const maxScroll = vp.scrollWidth - vp.clientWidth;
  const recomputeStep = () => {
    gap = parseFloat(getComputedStyle(el).gap || "8px") || 8;
    step = (items[0].offsetWidth || 160) + gap;
  };
  const highlight = (index: number) => {
    const idx = ((index % count) + count) % count;
    for (let i = 0; i < count; i++) {
      items[i].style.boxShadow =
        i === idx ? `0 0 0 3px var(--color-primary-ring)` : "";
    }
  };
  const updateIndicator = (index: number) => {
    const idx = ((index % count) + count) % count;
    if (indicator) indicator.textContent = `${idx + 1}/${count}`;
  };
  const currentIndex = () => {
    const pos = vp.scrollLeft;
    return Math.round((pos - baseOffset) / step);
  };
  const setActive = (index: number) => {
    const idx = ((index % count) + count) % count;
    for (let i = 0; i < count; i++) {
      items[i].setAttribute("tabindex", i === idx ? "0" : "-1");
      items[i].setAttribute("aria-selected", i === idx ? "true" : "false");
    }
    el.setAttribute(
      "aria-activedescendant",
      items[idx].id || `${prefix}-item-${idx}`,
    );
    items[idx].focus();
    highlight(idx);
    updateIndicator(idx);
    updateDots(idx);
    if (announce)
      announce.textContent = `Đã chuyển tới mục ${idx + 1} trong tổng số ${count}`;
  };
  if (!dots) {
    dots = doc.createElement("div");
    dots.setAttribute("data-role", "dots");
    dots.className = "wb-slider-dots";
    dots.style.position = "absolute";
    dots.style.left = "50%";
    dots.style.bottom = "var(--space-2)";
    dots.style.transform = "translateX(-50%)";
    dots.style.display = "flex";
    dots.style.gap = "6px";
    dots.style.background = "transparent";
    for (let i = 0; i < count; i++) {
      const d = doc.createElement("button");
      d.type = "button";
      const labelId = `${prefix}-dot-${i}`;
      const hidden = doc.createElement("span");
      hidden.id = labelId;
      hidden.textContent = `Đi tới mục ${i + 1}`;
      hidden.style.position = "absolute";
      hidden.style.width = "1px";
      hidden.style.height = "1px";
      hidden.style.padding = "0";
      hidden.style.margin = "-1px";
      hidden.style.border = "0";
      hidden.style.clip = "rect(0 0 0 0)";
      hidden.style.overflow = "hidden";
      dots.appendChild(hidden);
      d.setAttribute("aria-controls", items[i].id);
      d.setAttribute("aria-labelledby", labelId);
      d.style.width = "8px";
      d.style.height = "8px";
      d.style.borderRadius = "999px";
      d.style.border = "none";
      d.style.background = i === 0 ? "var(--color-primary)" : "#cbd5e1";
      d.addEventListener("click", () => {
        const idx = i;
        smoothScrollTo(baseOffset + step * idx);
        setActive(idx);
        uxMetrics.lastAction = "slider_dot_click";
        saveMetrics();
      });
      d.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
          e.preventDefault();
          const idx = i;
          smoothScrollTo(baseOffset + step * idx);
          setActive(idx);
          uxMetrics.sliderKeyOps += 1;
          uxMetrics.lastAction = "slider_dot_key";
          saveMetrics();
        }
      });
      d.addEventListener("focus", () => {
        uxMetrics.lastAction = "slider_dot_focus";
        saveMetrics();
      });
      dots.appendChild(d);
    }
    el.appendChild(dots);
  }
  const updateDots = (index: number) => {
    if (!dots) return;
    const children = Array.from(dots.children).filter(
      (c) => String((c as Element).tagName || "").toLowerCase() === "button",
    ) as HTMLElement[];
    const idx = ((index % count) + count) % count;
    children.forEach((c, i) => {
      c.style.background = i === idx ? "var(--color-primary)" : "#cbd5e1";
      c.setAttribute("aria-current", i === idx ? "true" : "false");
      if (roleMode === "tabs")
        c.setAttribute("aria-selected", i === idx ? "true" : "false");
    });
  };
  let autoplayEnabled = false;
  let autoplayInterval = 3000;
  let autoplayPauseOnHover = true;
  let autoplayId: number | null = null;
  const stopAutoplay = () => {
    if (autoplayId != null) {
      clearInterval(autoplayId);
      autoplayId = null;
    }
  };
  const startAutoplay = () => {
    if (!autoplayEnabled) return;
    stopAutoplay();
    autoplayId = window.setInterval(
      () => {
        const idx = currentIndex() + 1;
        smoothScrollTo(baseOffset + step * idx);
        setActive(idx);
      },
      Math.max(800, autoplayInterval),
    );
  };
  const applyRoleMode = (mode: "listbox" | "tabs") => {
    roleMode = mode;
    if (mode === "tabs") {
      vp.setAttribute("role", "tablist");
      dots?.setAttribute("role", "presentation");
      const dotButtons = Array.from(dots?.querySelectorAll("button") || []);
      dotButtons.forEach((b, i) => {
        b.setAttribute("role", "tab");
        b.setAttribute("tabindex", i === currentIndex() ? "0" : "-1");
        b.setAttribute(
          "aria-selected",
          i === currentIndex() ? "true" : "false",
        );
      });
      items.forEach((it, i) => {
        it.setAttribute("role", "tabpanel");
        it.setAttribute("aria-labelledby", `${prefix}-dot-${i}`);
      });
    } else {
      vp.setAttribute("role", "listbox");
      dots?.setAttribute("role", "navigation");
      const dotButtons = Array.from(dots?.querySelectorAll("button") || []);
      dotButtons.forEach((b) => {
        b.setAttribute("role", "button");
        b.removeAttribute("aria-selected");
        b.removeAttribute("tabindex");
      });
      items.forEach((it) => {
        it.setAttribute("role", "option");
        it.removeAttribute("aria-labelledby");
      });
    }
  };
  const normalizeAfter = () => {
    if (vp.scrollLeft >= baseOffset + step * count - 1) {
      vp.scrollLeft = baseOffset;
    } else if (vp.scrollLeft <= 1) {
      vp.scrollLeft = baseOffset + step * (count - 1);
    }
    const idx = currentIndex();
    highlight(idx);
    updateIndicator(idx);
    setActive(idx);
  };
  const updateControls = () => {
    if (prev) {
      prev.disabled = false;
      prev.style.opacity = "1";
    }
    if (next) {
      next.disabled = false;
      next.style.opacity = "1";
    }
  };
  const smoothScrollTo = (target: number) => {
    const start = vp.scrollLeft;
    const dest = clamp(target, 0, maxScroll);
    if (effectMode === "instant") {
      vp.scrollLeft = dest;
      normalizeAfter();
      updateControls();
      updateDots(currentIndex());
      uxMetrics.sliderScrollCount += 1;
      uxMetrics.lastAction = "slider_scroll";
      saveMetrics();
      return;
    }
    const t0 = performance.now();
    let frames = 0;
    const easeFn = (t: number) => {
      if (easingMode === "linear") return t;
      if (easingMode === "ease-in") return t * t;
      if (easingMode === "ease-out") return t * (2 - t);
      if (easingMode === "ease-in-out")
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };
    const duration = animDurationUser || animDuration;
    const tick = (now: number) => {
      frames++;
      const p = Math.min(1, (now - t0) / duration);
      const e = easeFn(p);
      vp.scrollLeft = start + (dest - start) * e;
      if (p < 1) requestAnimationFrame(tick);
      else {
        normalizeAfter();
        updateControls();
        const ms = now - t0;
        const fps = Math.round((frames / ms) * 1000);
        lastFPS = fps;
        animDuration = lastFPS < 55 ? 320 : 240;
        updateDots(currentIndex());
        uxMetrics.sliderScrollCount += 1;
        uxMetrics.sliderFPSAvg = Math.round(
          (uxMetrics.sliderScrollCount
            ? uxMetrics.sliderFPSAvg * (uxMetrics.sliderScrollCount - 1) + fps
            : fps) / Math.max(1, uxMetrics.sliderScrollCount),
        );
        uxMetrics.lastAction = "slider_scroll";
        saveMetrics();
      }
    };
    requestAnimationFrame(tick);
  };
  const sliderEl = el as SliderElement;
  sliderEl.sliderSetRoleMode = (mode: "listbox" | "tabs") => {
    applyRoleMode(mode);
    updateDots(currentIndex());
  };
  const updateAutoplayAttrs = () => {
    el.setAttribute("data-autoplay", autoplayEnabled ? "true" : "false");
    el.setAttribute("data-interval", String(autoplayInterval));
    el.setAttribute(
      "data-pause-hover",
      autoplayPauseOnHover ? "true" : "false",
    );
  };
  sliderEl.sliderSetAutoplay = (opts: {
    enabled: boolean;
    interval?: number;
    pauseOnHover?: boolean;
  }) => {
    autoplayEnabled = !!opts.enabled;
    if (typeof opts.interval === "number") autoplayInterval = opts.interval;
    if (typeof opts.pauseOnHover === "boolean")
      autoplayPauseOnHover = opts.pauseOnHover;
    updateAutoplayAttrs();
    stopAutoplay();
    if (autoplayEnabled) startAutoplay();
  };
  sliderEl.sliderSetTransition = (opts: {
    effect?: "smooth" | "instant";
    duration?: number;
    easing?: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";
  }) => {
    effectMode = opts.effect === "instant" ? "instant" : "smooth";
    if (typeof opts.duration === "number")
      animDurationUser = Math.max(100, opts.duration);
    if (opts.easing) easingMode = opts.easing;
    el.setAttribute("data-transition", effectMode);
    el.setAttribute("data-duration", String(animDurationUser || animDuration));
    el.setAttribute("data-easing", easingMode);
  };
  sliderEl.sliderSetVisible = (n: number) => {
    const vis = Math.max(1, Math.min(6, Number(n) || 1));
    const g = parseFloat(getComputedStyle(el).gap || "8px") || 8;
    const w = `calc((100% - ${g}px * ${vis - 1}) / ${vis})`;
    items.forEach((it) => {
      it.style.minWidth = w;
      it.style.width = w;
    });
    el.setAttribute("data-visible", String(vis));
    recomputeStep();
    normalizeAfter();
    updateDots(currentIndex());
    updateIndicator(currentIndex());
  };
  applyRoleMode("listbox");
  sliderEl.sliderGoTo = (i: number) => {
    smoothScrollTo(baseOffset + step * i);
    setActive(i);
  };
  const onPrev = () => smoothScrollTo(vp.scrollLeft - step);
  const onNext = () => smoothScrollTo(vp.scrollLeft + step);
  prev?.addEventListener("click", onPrev);
  next?.addEventListener("click", onNext);
  prev?.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      onPrev();
      uxMetrics.sliderKeyOps += 1;
      uxMetrics.lastAction = "slider_prev_key";
      saveMetrics();
    }
  });
  next?.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      onNext();
      uxMetrics.sliderKeyOps += 1;
      uxMetrics.lastAction = "slider_next_key";
      saveMetrics();
    }
  });
  let down = false;
  let startX = 0;
  let startScroll = 0;
  const onDown = (x: number) => {
    down = true;
    vp.style.cursor = "grabbing";
    startX = x;
    startScroll = vp.scrollLeft;
  };
  const onMove = (x: number) => {
    if (!down) return;
    const dx = x - startX;
    vp.scrollLeft = startScroll - dx;
    updateControls();
  };
  const onUp = () => {
    down = false;
    vp.style.cursor = "grab";
    normalizeAfter();
  };
  vp.addEventListener("mousedown", (e: MouseEvent) => onDown(e.pageX));
  doc.addEventListener("mousemove", (e: MouseEvent) => onMove(e.pageX));
  doc.addEventListener("mouseup", onUp);
  vp.addEventListener(
    "touchstart",
    (e: TouchEvent) => onDown(e.touches[0]?.pageX || 0),
    { passive: true },
  );
  doc.addEventListener(
    "touchmove",
    (e: TouchEvent) => onMove(e.touches[0]?.pageX || 0),
    { passive: true },
  );
  doc.addEventListener("touchend", onUp);
  vp.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const idx = currentIndex() + 1;
      smoothScrollTo(baseOffset + step * idx);
      setActive(idx);
      uxMetrics.sliderKeyOps += 1;
      uxMetrics.lastAction = "slider_key_right";
      saveMetrics();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const idx = currentIndex() - 1;
      smoothScrollTo(baseOffset + step * idx);
      setActive(idx);
      uxMetrics.sliderKeyOps += 1;
      uxMetrics.lastAction = "slider_key_left";
      saveMetrics();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const delta = e.shiftKey ? -1 : 1;
      const idx = currentIndex() + delta;
      smoothScrollTo(baseOffset + step * idx);
      setActive(idx);
      uxMetrics.sliderKeyOps += 1;
      uxMetrics.lastAction = "slider_key_tab";
      saveMetrics();
    }
  });
  vp.addEventListener("focus", () => {
    vp.style.boxShadow = "0 0 0 3px var(--color-primary-ring)";
    setActive(currentIndex());
    updateDots(currentIndex());
    if (autoplayPauseOnHover) stopAutoplay();
  });
  vp.addEventListener("blur", () => {
    vp.style.boxShadow = "";
    if (autoplayPauseOnHover) startAutoplay();
  });
  vp.addEventListener("mouseenter", () => {
    if (autoplayPauseOnHover) stopAutoplay();
  });
  vp.addEventListener("mouseleave", () => {
    if (autoplayPauseOnHover) startAutoplay();
  });
  normalizeAfter();
  updateControls();
  // initialize from attributes if present
  autoplayEnabled =
    String(el.getAttribute("data-autoplay") || "false") === "true";
  autoplayInterval = Number(el.getAttribute("data-interval") || 3000) || 3000;
  autoplayPauseOnHover =
    String(el.getAttribute("data-pause-hover") || "true") === "true";
  const initTransition = String(el.getAttribute("data-transition") || "smooth");
  const initDuration = Number(el.getAttribute("data-duration") || 0) || 0;
  const initEasing = String(el.getAttribute("data-easing") || "ease") as
    | "ease"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"
    | "linear";
  const initVisible = Number(el.getAttribute("data-visible") || 0) || 0;
  sliderEl.sliderSetTransition?.({
    effect: initTransition === "instant" ? "instant" : "smooth",
    duration: initDuration > 0 ? initDuration : undefined,
    easing: initEasing || "ease",
  });
  if (initVisible > 0) sliderEl.sliderSetVisible?.(initVisible);
  updateAutoplayAttrs();
  if (autoplayEnabled) startAutoplay();
}
function initModalBehavior(
  model: Component | null,
  overlayModel: Component | null,
) {
  const doc = editor?.Canvas.getDocument();
  const el = model?.getEl?.() as HTMLElement | null;
  const ov = overlayModel?.getEl?.() as HTMLElement | null;
  if (!doc || !el || !ov) return;
  try {
    const already = String(el.getAttribute("data-modal-init") || "");
    if (already === "1") return;
    el.setAttribute("data-modal-init", "1");
  } catch {}
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-modal", "true");
  const title = el.querySelector("h3") as HTMLElement | null;
  if (title) {
    const id = `wb-modal-${Math.random().toString(36).slice(2, 7)}`;
    title.id = id;
    el.setAttribute("aria-labelledby", id);
  }
  const focusables = Array.from(
    el.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  );
  const first = focusables[0] || el;
  const last = focusables[focusables.length - 1] || el;
  try {
    (first as HTMLElement).focus();
  } catch {}
  const close = () => {
    try {
      overlayModel && overlayModel.remove?.();
      model && model.remove?.();
    } catch {}
  };
  ov.addEventListener("click", () => {
    const allow = String(ov.getAttribute("data-overlay-close") || "true");
    if (allow === "true") close();
  });
  const btnClose = el.querySelector(
    '[data-role="close"]',
  ) as HTMLElement | null;
  if (btnClose) btnClose.addEventListener("click", close);
  el.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      if (!focusables.length) return;
      const active =
        (el.ownerDocument && el.ownerDocument.activeElement) ||
        editor?.Canvas.getDocument()?.activeElement ||
        null;
      if (e.shiftKey) {
        if (active === first) {
          e.preventDefault();
          (last as HTMLElement).focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          (first as HTMLElement).focus();
        }
      }
    }
  });
}
window.addEventListener("keydown", (e: KeyboardEvent) => {
  const k = String(e?.key || "").toLowerCase();
  if (e.ctrlKey && e.shiftKey && k === "m")
    metricsOpen.value = !metricsOpen.value;
  if (e.ctrlKey && e.shiftKey && k === "r") resetMetrics();
});
onMounted(() => {
  loadMetrics();
});
function initAccordionBehavior(model: Component | null) {
  const doc = editor?.Canvas.getDocument();
  const el = model?.getEl?.() as HTMLElement | null;
  if (!doc || !el) return;
  try {
    const already = String(el.getAttribute("data-acc-init") || "");
    if (already === "1") return;
    el.setAttribute("data-acc-init", "1");
  } catch {}
  const items = Array.from(
    el.querySelectorAll(':scope > [data-role="acc-item"]'),
  ) as HTMLElement[];
  const headers = items.map(
    (it) =>
      it.querySelector('[data-role="acc-header"]') as HTMLButtonElement | null,
  );
  const panels = items.map(
    (it) => it.querySelector('[data-role="acc-panel"]') as HTMLElement | null,
  );
  const prefix = `wb-acc-${Math.random().toString(36).slice(2, 7)}`;
  for (let i = 0; i < items.length; i++) {
    const h = headers[i];
    const p = panels[i];
    if (!h || !p) continue;
    if (!p.id) p.id = `${prefix}-panel-${i}`;
    h.setAttribute("aria-controls", p.id);
    h.setAttribute("aria-expanded", "false");
    p.setAttribute("role", "region");
    p.style.display = "none";
  }
  let multiple =
    String(el.getAttribute("data-acc-multiple") || "false") === "true";
  let animate =
    String(el.getAttribute("data-acc-animate") || "true") === "true";
  let duration = Number(el.getAttribute("data-acc-duration") || 240) || 240;
  const setPanelVisible = (p: HTMLElement, show: boolean) => {
    if (!animate) {
      p.style.display = show ? "" : "none";
      return;
    }
    const d = Math.max(0, duration);
    p.style.overflow = "hidden";
    if (show) {
      p.style.display = "";
      const targetH = p.scrollHeight;
      p.style.height = "0px";
      p.style.transition = `height ${d}ms ease`;
      requestAnimationFrame(() => {
        p.style.height = `${targetH}px`;
        setTimeout(() => {
          p.style.height = "";
          p.style.transition = "";
          p.style.overflow = "";
        }, d + 20);
      });
    } else {
      const startH = p.scrollHeight;
      p.style.height = `${startH}px`;
      p.style.transition = `height ${d}ms ease`;
      requestAnimationFrame(() => {
        p.style.height = "0px";
        setTimeout(() => {
          p.style.display = "none";
          p.style.height = "";
          p.style.transition = "";
          p.style.overflow = "";
        }, d + 20);
      });
    }
  };

  const toggleIndex = (idx: number) => {
    const h = headers[idx];
    const p = panels[idx];
    if (!h || !p) return;
    const expanded =
      String(h.getAttribute("aria-expanded") || "false") === "true";
    if (expanded) {
      h.setAttribute("aria-expanded", "false");
      setPanelVisible(p, false);
    } else {
      if (!multiple) {
        for (let i = 0; i < headers.length; i++) {
          if (!headers[i] || !panels[i]) continue;
          headers[i]!.setAttribute("aria-expanded", "false");
          setPanelVisible(panels[i]!, false);
        }
      }
      h.setAttribute("aria-expanded", "true");
      setPanelVisible(p, true);
    }
  };
  headers.forEach((h, i) => {
    if (!h) return;
    h.addEventListener("click", () => toggleIndex(i));
    h.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        toggleIndex(i);
      } else if (e.key === "ArrowDown") {
        const next = headers[i + 1] || headers[0];
        next?.focus();
      } else if (e.key === "ArrowUp") {
        const prev = headers[i - 1] || headers[headers.length - 1];
        prev?.focus();
      }
    });
  });
  const accEl = el as AccordionElement;
  accEl.accordionSetOptions = (opts: {
    multiple?: boolean;
    animate?: boolean;
    duration?: number;
  }) => {
    if (typeof opts.multiple === "boolean") multiple = opts.multiple;
    if (typeof opts.animate === "boolean") animate = opts.animate;
    if (typeof opts.duration === "number") duration = opts.duration || 0;
    el.setAttribute("data-acc-multiple", multiple ? "true" : "false");
    el.setAttribute("data-acc-animate", animate ? "true" : "false");
    el.setAttribute("data-acc-duration", String(duration));
  };
}
function addRichTextBlock() {
  if (!editor) return;
  const target = getInsertTarget() as Component;
  const rt = target.append({
    type: "text",
    tagName: "div",
    content: "Văn bản định dạng",
    attributes: {
      style:
        "padding:var(--space-3);border:1px solid #e5e7eb;border-radius:var(--radius-8);background:var(--bg-elevated);color:var(--text-primary)",
      class: "wb-richtext",
    },
  });
  try {
    editor.select(rt);
  } catch {}
  recordInsert();
  showFeedback("Đã chèn Văn bản định dạng (Rich Text)");
}
function addListBlock() {
  if (!editor) return;
  const target = getInsertTarget() as Component;
  const ul = target.append({
    type: "text",
    tagName: "ul",
    attributes: {
      style:
        "padding-left:18px;margin:var(--space-2) 0;color:var(--text-primary)",
      class: "wb-list",
    },
    components: [
      {
        type: "text",
        tagName: "li",
        content: "Mục danh sách",
        attributes: { class: "wb-list__item" },
      },
      {
        type: "text",
        tagName: "li",
        content: "Mục danh sách",
        attributes: { class: "wb-list__item" },
      },
    ],
  });
  try {
    editor.select(ul);
  } catch {}
  recordInsert();
  showFeedback("Đã chèn Danh sách (List)");
}
function addAccordionBlock() {
  if (!editor) return;
  const target = getInsertTarget() as Component;
  const accCreated = target.append({
    type: "text",
    tagName: "div",
    attributes: {
      style:
        "display:block;border:1px solid #e5e7eb;border-radius:var(--radius-8);background:#ffffff",
      "data-role": "accordion",
      "data-acc-multiple": "false",
      "data-acc-animate": "true",
      "data-acc-duration": "240",
    },
    components: [
      {
        type: "text",
        tagName: "div",
        attributes: { "data-role": "acc-item" },
        components: [
          {
            type: "text",
            tagName: "button",
            content: "Mục 1",
            attributes: {
              style:
                "display:flex;justify-content:space-between;align-items:center;width:100%;padding:12px 16px;border:none;background:transparent;color:#111827;font-weight:600",
              "data-role": "acc-header",
              "aria-expanded": "false",
              "aria-controls": "acc-panel-1",
            },
          },
          {
            type: "text",
            tagName: "div",
            content: "Nội dung bảng 1",
            attributes: {
              style: "display:none;padding:0 16px 12px;color:#334155",
              id: "acc-panel-1",
              "data-role": "acc-panel",
              role: "region",
            },
          },
        ],
      },
      {
        type: "text",
        tagName: "div",
        attributes: { "data-role": "acc-item" },
        components: [
          {
            type: "text",
            tagName: "button",
            content: "Mục 2",
            attributes: {
              style:
                "display:flex;justify-content:space-between;align-items:center;width:100%;padding:12px 16px;border:none;background:transparent;color:#111827;font-weight:600",
              "data-role": "acc-header",
              "aria-expanded": "false",
              "aria-controls": "acc-panel-2",
            },
          },
          {
            type: "text",
            tagName: "div",
            content: "Nội dung bảng 2",
            attributes: {
              style: "display:none;padding:0 16px 12px;color:#334155",
              id: "acc-panel-2",
              "data-role": "acc-panel",
              role: "region",
            },
          },
        ],
      },
    ],
  });
  const acc = (
    Array.isArray(accCreated)
      ? (accCreated[0] as Component)
      : (accCreated as Component)
  ) as Component;
  try {
    editor.select(acc);
  } catch {}
  initAccordionBehavior(acc);
  recordInsert();
  showFeedback("Đã chèn Thanh xếp (Accordion)");
}
function addLinkBlock() {
  if (!editor) return;
  const target = getInsertTarget() as Component;
  const a = target.append({
    type: "link",
    tagName: "a",
    content: "Liên kết",
    attributes: { href: "#", style: "color:var(--color-secondary)" },
  });
  try {
    editor.select(a);
  } catch {}
  recordInsert();
  showFeedback("Đã chèn Liên kết (Link)");
}
function addButtonBlock() {
  if (!editor) return;
  const target = getInsertTarget() as Component;
  const btn = target.append({
    type: "link",
    tagName: "a",
    content: "Nút bấm",
    attributes: {
      href: "#",
      style:
        "display:inline-block;padding:10px 20px;background-color:var(--color-primary, #2563eb);color:#ffffff;border-radius:6px;text-decoration:none;font-weight:600;text-align:center;border:none;cursor:pointer;",
      class: "wb-button",
    },
  });
  try {
    editor.select(btn);
  } catch {}
  recordInsert();
  showFeedback("Đã chèn Nút bấm (Button)");
}
function addTicketingButtonBlock() {
  if (!editor) return;

  // Get event_id from available sources
  let eventId = eventIdParam.value;
  if (!eventId && companyEvents.value.length > 0) {
    eventId = companyEvents.value[0].id;
  }
  if (!eventId) {
    eventId = "[id_event]"; // Placeholder for template mode
  }

  const target = getInsertTarget() as Component;
  const btn = target.append({
    type: "link",
    tagName: "a",
    content: "Mua Vé Ngay",
    attributes: {
      href: `/order_wizard?event_id=${eventId}`,
      "data-event-id": eventId,
      target: "_self",
      onclick:
        "event.preventDefault(); window.openTicketingPopup ? window.openTicketingPopup() : (window.location.href=this.href)",
      style:
        "display:inline-block;padding:12px 24px;background-color:var(--color-primary, #2563eb);color:#ffffff;border-radius:8px;text-decoration:none;font-weight:600;text-align:center;border:none;cursor:pointer;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);transition:all 0.2s;",
      class: "wb-button wb-button--primary wb-ticket-btn js-buy-ticket-btn",
    },
  });
  try {
    editor.select(btn);
  } catch {}
  recordInsert();
  showFeedback("Đã chèn Nút Mua Vé (Ticketing)");
}
function addImageBlock() {
  if (!editor) return;
  const target = getInsertTarget() as Component;
  const img = target.append({
    type: "image",
    tagName: "img",
    attributes: {
      src: "https://placehold.co/150",
      alt: "Hình ảnh",
      style: "width:100%;height:auto;display:block",
      class: "wb-image",
    },
  });
  try {
    editor.select(img);
    setTimeout(() => {
      if (editor) {
        editor.runCommand("open-assets", {
          target: img,
          types: ["image"],
          accept: "image/*",
        });
      }
    }, 100);
  } catch {}
  recordInsert();
  showFeedback("Đã chèn Hình ảnh (Image)");
}
function addBackgroundImageBlock() {
  if (!editor) return;
  const target = getInsertTarget() as Component;
  const bg = target.append({
    type: "bgimage",
    tagName: "div",
    attributes: {
      style:
        "min-height:160px;border-radius:var(--radius-12);background-image:url('https://picsum.photos/600/300');background-size:cover;background-position:center;margin:var(--space-2) 0",
      class: "wb-bgimage",
    },
  });
  try {
    editor.select(bg);
  } catch {}
  recordInsert();
  showFeedback("Đã chèn Ảnh nền (Background)");
}
function addGalleryBlock() {
  if (!editor) return;
  const target = getInsertTarget() as Component;
  const gal = target.append({
    type: "gallery",
    tagName: "div",
    attributes: {
      style:
        "display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--space-2)",
      class: "wb-gallery",
    },
    components: [
      {
        type: "image",
        attributes: {
          src: "https://picsum.photos/200/140",
          alt: "",
          class: "wb-gallery__item",
        },
      },
      {
        type: "image",
        attributes: {
          src: "https://picsum.photos/201/140",
          alt: "",
          class: "wb-gallery__item",
        },
      },
      {
        type: "image",
        attributes: {
          src: "https://picsum.photos/202/140",
          alt: "",
          class: "wb-gallery__item",
        },
      },
    ],
  });
  try {
    editor.select(gal);
  } catch {}
  recordInsert();
  showFeedback("Đã chèn Bộ sưu tập (Gallery)");
}
function addGrid3Block() {
  if (!editor) return;
  const target = getInsertTarget() as Component;
  const grid = target.append({
    type: "text",
    tagName: "div",
    attributes: {
      style:
        "display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--space-3);margin:var(--space-3) 0",
      class: "wb-grid wb-grid--cols-3",
    },
    components: [
      {
        type: "text",
        tagName: "div",
        attributes: {
          style:
            "min-height:80px;padding:var(--space-3);border:1px solid #e5e7eb;border-radius:var(--radius-8);background:#fff",
          class: "wb-box",
        },
      },
      {
        type: "text",
        tagName: "div",
        attributes: {
          style:
            "min-height:80px;padding:var(--space-3);border:1px solid #e5e7eb;border-radius:var(--radius-8);background:#fff",
          class: "wb-box",
        },
      },
      {
        type: "text",
        tagName: "div",
        attributes: {
          style:
            "min-height:80px;padding:var(--space-3);border:1px solid #e5e7eb;border-radius:var(--radius-8);background:#fff",
          class: "wb-box",
        },
      },
    ],
  });
  try {
    editor.select(grid);
  } catch {}
  recordInsert();
  showFeedback("Đã chèn Lưới 3 cột (Grid 3 cols)");
}

function applyDisplay() {
  if (!selectedComponent.value) return;
  const currentStyle = selectedComponent.value.getAttributes().style || "";
  const without = currentStyle.replace(/display:\s*[^;]+;?/g, "").trim();
  const next =
    `${without}${without ? " " : ""}display: ${styleDisplay.value};`.trim();
  selectedComponent.value.addAttributes({ style: next });
}
function applyPosition() {
  if (!selectedComponent.value) return;
  const style: Record<string, string> = {};
  style["position"] = String(stylePosition.value || "static");
  const toPx = (v: string) => {
    const n = parseFloat(String(v));
    return Number.isFinite(n) ? `${n}px` : "";
  };
  style["top"] = toPx(styleTop.value || "");
  style["right"] = toPx(styleRight.value || "");
  style["bottom"] = toPx(styleBottom.value || "");
  style["left"] = toPx(styleLeft.value || "");
  style["z-index"] = `${parseInt(String(styleZIndex.value)) || 0}`;
  style["opacity"] =
    `${Math.max(0, Math.min(1, Number(styleOpacity.value) || 1))}`;
  selectedComponent.value.addStyle(style);
}
function getFlexIcon(dir: string) {
  if (dir === "column") return IconArrowDown;
  if (dir === "row-reverse") return IconArrowLeft;
  if (dir === "column-reverse") return IconArrowUp;
  return IconArrowRight;
}
function withUnit(v: number | null, unit: string) {
  if (v == null || Number.isNaN(v)) return "";
  return `${v}${unit}`;
}
function updateWidth() {
  if (!selectedComponent.value) return;
  selectedComponent.value.addStyle({
    width: withUnit(width.value, sizeUnit.value),
  });
  if (
    lockAspect.value &&
    sizeUnit.value === "px" &&
    (isImageComponent(selectedComponent.value) ||
      isVideoComponent(selectedComponent.value))
  ) {
    const r = aspectRatio.value || computeAspectRatio(selectedComponent.value);
    if (r && width.value != null) {
      heightAuto.value = false;
      const h = Math.round((Number(width.value) || 0) / r);
      height.value = h;
      selectedComponent.value.addStyle({
        height: withUnit(height.value, sizeUnit.value),
      });
    }
  }
}
function updateHeight() {
  if (!selectedComponent.value) return;
  selectedComponent.value.addStyle({
    height: withUnit(height.value, sizeUnit.value),
  });
  if (
    lockAspect.value &&
    sizeUnit.value === "px" &&
    (isImageComponent(selectedComponent.value) ||
      isVideoComponent(selectedComponent.value))
  ) {
    const r = aspectRatio.value || computeAspectRatio(selectedComponent.value);
    if (r && height.value != null) {
      widthAuto.value = false;
      const w = Math.round((Number(height.value) || 0) * r);
      width.value = w;
      selectedComponent.value.addStyle({
        width: withUnit(width.value, sizeUnit.value),
      });
    }
  }
}
function applyWidthAuto() {
  if (!selectedComponent.value) return;
  if (widthAuto.value) {
    selectedComponent.value.addStyle({ width: "auto" });
  } else {
    updateWidth();
  }
}
function applyHeightAuto() {
  if (!selectedComponent.value) return;
  if (heightAuto.value) {
    selectedComponent.value.addStyle({ height: "auto" });
  } else {
    updateHeight();
  }
}
function parseSize(v: string | number | null) {
  if (v == null) return { num: null, unit: null };
  const s = String(v);
  const m = s.match(/([0-9.]+)\s*(px|%|rem)$/);
  if (!m) return { num: null, unit: null };
  return { num: parseFloat(m[1]), unit: m[2] };
}
function computeAspectRatio(m: ModelLike | null) {
  try {
    if (!m) return null;
    const el = m.getEl?.();
    if (!el) return null;
    const tag = String(el.tagName || "").toLowerCase();
    if (tag === "img") {
      const iw = (el as HTMLImageElement).naturalWidth || 0;
      const ih = (el as HTMLImageElement).naturalHeight || 0;
      if (iw > 0 && ih > 0) return iw / ih;
    }
    if (tag === "video") {
      const vw = (el as HTMLVideoElement).videoWidth || 0;
      const vh = (el as HTMLVideoElement).videoHeight || 0;
      if (vw > 0 && vh > 0) return vw / vh;
    }
    const st = (m.getStyle?.() || {}) as Record<string, unknown>;
    const pw = parseSize(String(st.width ?? ""));
    const ph = parseSize(String(st.height ?? ""));
    if (pw.num && ph.num) return pw.num / ph.num;
  } catch {}
  return null;
}
function refreshSelectedSizing() {
  const sel = selectedComponent.value;
  if (!sel) return;
  const st = (sel.getStyle?.() || {}) as Record<string, unknown>;
  const w = String(st.width ?? "");
  const h = String(st.height ?? "");
  const ws = parseSize(w);
  const hs = parseSize(h);
  if (ws.unit) sizeUnit.value = ws.unit;
  if (hs.unit) sizeUnit.value = hs.unit;
  widthAuto.value = !w || String(w) === "auto";
  heightAuto.value = !h || String(h) === "auto";
  width.value = ws.num ?? width.value;
  height.value = hs.num ?? height.value;
  aspectRatio.value = computeAspectRatio(sel as unknown as ModelLike);
  lockAspect.value = isImageComponent(sel) || isVideoComponent(sel);
}
function toggleAspectLock() {
  lockAspect.value = !lockAspect.value;
}
function updateMinWidth() {
  if (!selectedComponent.value) return;
  selectedComponent.value.addStyle({
    "min-width": withUnit(minWidth.value, sizeUnit.value),
  });
}
function updateMinHeight() {
  if (!selectedComponent.value) return;
  selectedComponent.value.addStyle({
    "min-height": withUnit(minHeight.value, sizeUnit.value),
  });
}
function updateMaxWidth() {
  if (!selectedComponent.value) return;
  selectedComponent.value.addStyle({
    "max-width": withUnit(maxWidth.value, sizeUnit.value),
  });
}
function updateMaxHeight() {
  if (!selectedComponent.value) return;
  selectedComponent.value.addStyle({
    "max-height": withUnit(maxHeight.value, sizeUnit.value),
  });
}
function applyMaxWidthNone() {
  if (!selectedComponent.value) return;
  if (maxWidthNone.value) {
    selectedComponent.value.addStyle({ "max-width": "none" });
  } else {
    updateMaxWidth();
  }
}
function applyMaxHeightNone() {
  if (!selectedComponent.value) return;
  if (maxHeightNone.value) {
    selectedComponent.value.addStyle({ "max-height": "none" });
  } else {
    updateMaxHeight();
  }
}
function updatePadding() {
  if (!selectedComponent.value) return;
  const currentStyle = selectedComponent.value.getAttributes().style || "";
  const without = currentStyle.replace(/padding:\s*[^;]+;?/g, "").trim();
  const next =
    `${without}${without ? " " : ""}padding: ${withUnit(padding.value, spacingUnit.value)};`.trim();
  selectedComponent.value.addAttributes({ style: next });
}
function updateMargin() {
  if (!selectedComponent.value) return;
  const currentStyle = selectedComponent.value.getAttributes().style || "";
  const without = currentStyle.replace(/margin:\s*[^;]+;?/g, "").trim();
  const next =
    `${without}${without ? " " : ""}margin: ${withUnit(margin.value, spacingUnit.value)};`.trim();
  selectedComponent.value.addAttributes({ style: next });
}
function applyAdvancedId() {
  if (!selectedComponent.value) return;
  selectedComponent.value.addAttributes({ id: advancedId.value });
}
function applyAdvancedClass() {
  if (!selectedComponent.value) return;
  const cur = selectedComponent.value.getAttributes().class || "";
  const next = advancedClass.value;
  selectedComponent.value.addAttributes({ class: next || cur });
}
function applyOverflow() {
  if (!selectedComponent.value) return;
  selectedComponent.value.addStyle({ overflow: overflowMode.value });
}

function applyTransforms() {
  if (!selectedComponent.value) return;
  const parts: string[] = [];
  const r = Number(transformRotate.value) || 0;
  const s = Number(transformScale.value) || 1;
  const kx = Number(transformSkewX.value) || 0;
  const ky = Number(transformSkewY.value) || 0;
  if (r) parts.push(`rotate(${r}deg)`);
  if (s !== 1) parts.push(`scale(${s})`);
  if (kx) parts.push(`skewX(${kx}deg)`);
  if (ky) parts.push(`skewY(${ky}deg)`);
  selectedComponent.value.addStyle({ transform: parts.join(" ") || "none" });
}

function applyFilters() {
  if (!selectedComponent.value) return;
  const b = Math.max(0, Number(filterBlur.value) || 0);
  const br = Math.max(0, Number(filterBrightness.value) || 100);
  const parts: string[] = [];
  if (b) parts.push(`blur(${b}px)`);
  if (br !== 100) parts.push(`brightness(${br}%)`);
  selectedComponent.value.addStyle({ filter: parts.join(" ") || "none" });
}

function applyBackdropFilters() {
  if (!selectedComponent.value) return;
  const b = Math.max(0, Number(backdropBlur.value) || 0);
  const parts: string[] = [];
  if (b) parts.push(`blur(${b}px)`);
  selectedComponent.value.addStyle({
    "backdrop-filter": parts.join(" ") || "none",
  });
}

function applyEvents() {
  if (!selectedComponent.value) return;
  const attrs: Record<string, string> = {};
  if (eventType.value && eventType.value !== "none")
    attrs["data-on-event"] = eventType.value;
  if (eventAction.value) attrs["data-event-action"] = eventAction.value;
  selectedComponent.value.addAttributes(attrs);
}

function setClipInset() {
  if (!selectedComponent.value) return;
  selectedComponent.value.addStyle({ "clip-path": "inset(8px)" });
}
function setClipCircle() {
  if (!selectedComponent.value) return;
  selectedComponent.value.addStyle({ "clip-path": "circle(50% at 50% 50%)" });
}
function setClipPolygon() {
  if (!selectedComponent.value) return;
  selectedComponent.value.addStyle({
    "clip-path": "polygon(50% 0%, 0% 100%, 100% 100%)",
  });
}
function ensureInteractionClass(model: ModelLike) {
  const id = model.getId ? model.getId() : "";
  const cls = `comp-${id}`;
  const cur = ((model.getAttributes?.() as any)?.class || "") as string;
  if (!String(cur).split(/\s+/).includes(cls))
    model.addAttributes?.({ class: `${cur ? cur + " " : ""}${cls}` });
  return cls;
}
function applyInteractions() {
  if (!editor || !selectedComponent.value) return;
  const model = selectedComponent.value;
  const cls = ensureInteractionClass(model);
  const doc = editor?.Canvas.getDocument();
  doc?.head
    ?.querySelectorAll(`style[data-interactions='${cls}']`)
    .forEach((el) => el.remove());
  const styleTag = doc?.createElement("style");
  if (styleTag) {
    styleTag.setAttribute("data-interactions", cls);
    const t = animDuration.value;
    const e = animEasing.value;
    const hover = [] as string[];
    if (hoverShadow.value)
      hover.push("box-shadow: 0 8px 24px rgba(16,24,40,.12)");
    if (hoverScale.value) hover.push("transform: scale(1.02)");
    const base = `.${cls}{transition: all ${t}ms ${e}}`;
    const hv = hover.length ? `.${cls}:hover{${hover.join(";")}}` : "";
    styleTag.innerHTML = `${base}${hv}`;
    doc?.head?.appendChild(styleTag);
  }
}
function applyResponsive() {
  if (!editor || !selectedComponent.value) return;
  editor.setDevice?.(responsiveDevice.value);
}

type ModelLike = {
  get?: (key: string) => unknown;
  getTagName?: () => string;
  getEl?: () => HTMLElement | null | undefined;
  getStyle?: () => Record<string, unknown>;
  getAttributes?: () => Record<string, any>;
  addStyle?: (styles: Record<string, string>) => void;
  addAttributes?: (attrs: Record<string, string>) => void;
  set?: (key: string, value: any) => void;
  remove?: () => void;
  find?: (sel: string) => any;
  components?: () => unknown;
  getId?: () => string;
};
function isTextComponent(m: ModelLike | null) {
  if (!m) return false;
  const t = String(m.get?.("type") || "").toLowerCase();
  const tag = String(m.getTagName?.() || "").toLowerCase();
  const textTypes = [
    "text",
    "paragraph",
    "link",
    "span",
    "label",
    "button",
    "a",
    "p",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
  ];
  return textTypes.includes(t) || textTypes.includes(tag);
}

function isImageComponent(m: ModelLike | null) {
  if (!m) return false;
  const t = String(m.get?.("type") || "").toLowerCase();
  const tag = String(m.getTagName?.() || "").toLowerCase();
  return t === "image" || tag === "img";
}
function isVideoComponent(m: ModelLike | null) {
  if (!m) return false;
  const tag = String(m.getTagName?.() || "").toLowerCase();
  const type = String(m.get?.("type") || "").toLowerCase();
  return tag === "video" || type === "video";
}
function isIframeComponent(m: ModelLike | null) {
  if (!m) return false;
  const tag = String(m.getTagName?.() || "").toLowerCase();
  return tag === "iframe";
}
function isButtonComponent(m: ModelLike | null) {
  if (!m) return false;
  const t = String(m.get?.("type") || "").toLowerCase();
  const tag = String(m.getTagName?.() || "").toLowerCase();
  if (t === "button" || tag === "button" || tag === "a") return true;
  const el = m.getEl?.() as HTMLElement | null;
  if (el && (el.closest("a") || el.closest("button"))) return true;
  const attrs = m.getAttributes?.() || {};
  if ((attrs as Record<string, string>).href) return true;
  return false;
}
function hasLinkInSelection(m: ModelLike | null) {
  const el = m?.getEl?.() as HTMLElement | null;
  return !!el?.closest("a,button");
}
function isHtmlComponent(m: ModelLike | null) {
  if (!m) return false;
  const attrs = m.getAttributes?.() || {};
  return attrs["data-wb-type"] === "html" || m.get?.("type") === "custom-code";
}
function isNavbarComponent(m: ModelLike | null) {
  if (!m) return false;
  const t = String(m.get?.("type") || "").toLowerCase();
  if (t === "navbar") return true;
  const tag = String(m.getTagName?.() || "").toLowerCase();
  return tag === "nav";
}

function isBackgroundImageComponent(m: ModelLike | null) {
  if (!m) return false;
  const t = String(m.get?.("type") || "").toLowerCase();
  if (t === "bgimage") return true;

  // Treat all Banner templates as background-image capable
  const isBannerLike = (cmp: any) => {
    if (!cmp) return false;
    const attrs = (cmp.getAttributes?.() || {}) as Record<string, string>;
    const cls = String(attrs.class || attrs.className || "").toLowerCase();
    const hasBannerClass = cls.split(/\s+/).includes("banner-block");
    const isBannerData =
      String(attrs["data-banner-block"] || "").toLowerCase() === "true" ||
      !!attrs["data-banner-id"];
    return hasBannerClass || isBannerData;
  };

  if (isBannerLike(m)) return true;
  let parent = (m && (m as any).parent ? (m as any).parent() : null) as any;
  let depth = 0;
  while (parent && depth < 5) {
    if (isBannerLike(parent)) return true;
    parent = parent.parent?.() as any;
    depth++;
  }

  const tag = String(m.getTagName?.() || "").toLowerCase();
  if (tag !== "div" && tag !== "section") return false;
  const attrs = (m.getAttributes?.() || {}) as Record<string, string>;
  const style = String(attrs.style || "");
  return /background-image\s*:\s*url\(/i.test(style);
}
function isSliderComponent(m: ModelLike | null) {
  if (!m) return false;
  const t = String(m.get?.("type") || "").toLowerCase();
  if (t === "slider") return true;
  const el = m.getEl?.();
  if (!el) return false;
  const vp = (el as HTMLElement).querySelector(
    '[data-role="viewport"]',
  ) as HTMLElement | null;
  const roleSrc = (vp || (el as HTMLElement)) as HTMLElement;
  const role = String(roleSrc.getAttribute("role") || "").toLowerCase();
  const hasSlides = !!roleSrc.querySelector('[data-role="slide"]');
  return hasSlides && (role === "listbox" || role === "tablist");
}
function isGalleryComponent(m: ModelLike | null) {
  if (!m) return false;
  const t = String(m.get?.("type") || "").toLowerCase();
  if (t === "gallery") return true;
  const tag = String(m.getTagName?.() || "").toLowerCase();
  if (tag !== "div") return false;
  const style = String(m.getAttributes?.().style || "");
  const isGrid = /display:\s*grid/i.test(style);
  const children = (m.components?.() || []) as any[];
  const hasImages = children.some((c: any) => {
    const t = String(c?.get?.("type") || "").toLowerCase();
    const tg = String((c?.tagName as string) || "").toLowerCase();
    return t === "image" || tg === "img";
  });
  return isGrid && hasImages;
}

function isGenericGridComponent(m: ModelLike | null) {
  if (!m) return false;
  const st = m.getStyle?.() || {};
  return String(st["display"] || "").toLowerCase() === "grid";
}

function isFormComponent(m: ModelLike | null) {
  if (!m) return false;
  const tag = String(m.getTagName?.() || "").toLowerCase();
  if (["input", "select", "textarea", "label", "form"].includes(tag))
    return true;
  const type = String(m.get?.("type") || "").toLowerCase();
  if (type === "input") return true;
  const attrs = m.getAttributes?.() || {};
  const inputType = String(
    (attrs as Record<string, string>).type || "",
  ).toLowerCase();
  return tag === "div" && /checkbox|radio|range|date|time/.test(inputType);
}
function isModalComponent(m: ModelLike | null) {
  if (!m) return false;
  const t = String(m.get?.("type") || "").toLowerCase();
  if (t === "modal") return true;
  const attrs = m.getAttributes?.() || {};
  return (
    String((attrs as Record<string, string>)["data-role"] || "") === "modal"
  );
}
function isHeroComponent(m: ModelLike | null) {
  if (!m) return false;
  const t = String(m.get?.("type") || "").toLowerCase();
  if (t === "hero") return true;
  const tag = String(m.getTagName?.() || "").toLowerCase();
  if (tag !== "section") return false;
  const style = String(m.getAttributes?.().style || "");
  return /background-image\s*:\s*url\(/i.test(style);
}

function isAccordionComponent(m: ModelLike | null) {
  if (!m) return false;
  const el = m.getEl?.() as HTMLElement | null;
  if (!el) return false;
  const hasItems = !!el.querySelector('[data-role="acc-item"]');
  const hasHeaders = !!el.querySelector('[data-role="acc-header"]');
  const hasPanels = !!el.querySelector('[data-role="acc-panel"]');
  return hasItems && hasHeaders && hasPanels;
}

function refreshSelectedSettings() {
  const sel = selectedComponent.value;
  if (!sel) return;
  const attrs = sel.getAttributes?.() || {};
  const commonSt = sel.getStyle?.() || {};

  // Helper: Get computed style if inline style is missing
  const el = sel.getEl?.() as HTMLElement | null;
  const comp =
    el && typeof window !== "undefined" ? window.getComputedStyle(el) : null;

  // Background Color
  let bgColor = commonSt["background-color"];
  if (!bgColor && comp) {
    const c = comp.backgroundColor;
    if (c && c !== "rgba(0, 0, 0, 0)" && c !== "transparent") bgColor = c;
  }
  styleBgColor.value = String(bgColor || "");

  // Background Image
  let bgImg = commonSt["background-image"];
  if (!bgImg && comp) {
    const c = comp.backgroundImage;
    if (c && c !== "none") bgImg = c;
  }
  const mBgCommon = String(bgImg || "").match(/url\((['"]?)(.*?)\1\)/);
  styleBgImage.value = (mBgCommon && mBgCommon[2]) || "";

  // Background Repeat
  let bgRep = commonSt["background-repeat"];
  if (!bgRep && comp) {
    bgRep = comp.backgroundRepeat;
  }
  styleBgRepeat.value = String(bgRep || "repeat");

  // Background Position
  let bgPos = commonSt["background-position"];
  if (!bgPos && comp) {
    bgPos = comp.backgroundPosition;
  }
  // Simple mapping if computed returns percentages that match keywords
  if (bgPos === "0% 0%") bgPos = "top left";
  else if (bgPos === "50% 50%") bgPos = "center center";
  else if (bgPos === "100% 100%") bgPos = "bottom right";
  else if (bgPos === "50% 0%") bgPos = "top center";
  else if (bgPos === "0% 50%") bgPos = "center left";
  else if (bgPos === "100% 50%") bgPos = "center right";
  else if (bgPos === "0% 100%") bgPos = "bottom left";
  else if (bgPos === "50% 100%") bgPos = "bottom center";
  else if (bgPos === "100% 0%") bgPos = "top right";

  styleBgPosition.value = String(bgPos || "top left");

  // Background Size
  let bgSizeVal = commonSt["background-size"];
  if (!bgSizeVal && comp) {
    bgSizeVal = comp.backgroundSize;
  }
  styleBgSize.value = String(bgSizeVal || "auto");

  // Background Attachment
  let bgAtt = commonSt["background-attachment"];
  if (!bgAtt && comp) {
    bgAtt = comp.backgroundAttachment;
  }
  styleBgAttachment.value = String(bgAtt || "scroll");

  // Border
  let bStyle = commonSt["border-style"];
  if (!bStyle && comp) bStyle = comp.borderStyle;
  styleBorderStyle.value = String(bStyle || "none");

  let bColor = commonSt["border-color"];
  if (!bColor && comp) bColor = comp.borderColor;
  styleBorderColor.value = String(bColor || "");

  let bWidth = commonSt["border-width"];
  if (!bWidth && comp) bWidth = comp.borderWidth;
  styleBorderWidth.value = parseFloat(String(bWidth || "0")) || 0;

  let bRadius = commonSt["border-radius"];
  if (!bRadius && comp) bRadius = comp.borderRadius;
  styleBorderRadius.value = parseFloat(String(bRadius || "0")) || 0;

  // Spacing
  const getVal = (prop: string) => {
    let v = commonSt[prop];
    if (!v && comp) v = comp.getPropertyValue(prop);
    return parseFloat(String(v || "0")) || 0;
  };

  styleMarginTop.value = getVal("margin-top");
  styleMarginRight.value = getVal("margin-right");
  styleMarginBottom.value = getVal("margin-bottom");
  styleMarginLeft.value = getVal("margin-left");

  stylePaddingTop.value = getVal("padding-top");
  stylePaddingRight.value = getVal("padding-right");
  stylePaddingBottom.value = getVal("padding-bottom");
  stylePaddingLeft.value = getVal("padding-left");

  // Position & Effects
  let pos = commonSt["position"];
  if (!pos && comp) pos = comp.position;
  stylePosition.value = String(pos || "static");
  const getStrVal = (prop: string) => {
    let v = commonSt[prop];
    if (!v && comp) v = comp.getPropertyValue(prop);
    const num = parseFloat(String(v || ""));
    return Number.isFinite(num) ? String(num) : "";
  };
  styleTop.value = getStrVal("top");
  styleBottom.value = getStrVal("bottom");
  styleLeft.value = getStrVal("left");
  styleRight.value = getStrVal("right");
  let zi = commonSt["z-index"];
  if (!zi && comp) zi = comp.zIndex;
  styleZIndex.value = parseInt(String(zi ?? "0")) || 0;
  let op = commonSt["opacity"];
  if (!op && comp) op = comp.opacity;
  {
    const n = parseFloat(String(op ?? "1"));
    styleOpacity.value = Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 1;
  }

  advancedId.value = attrs.id || "";
  advancedClass.value = attrs.class || "";
  if (isImageComponent(sel)) {
    imageSrc.value = attrs.src || "";
    imageAlt.value = attrs.alt || "";
    const st = sel.getStyle?.() || {};
    imageFit.value = String(st["object-fit"] || imageFit.value);
    imagePosition.value = String(st["object-position"] || imagePosition.value);
  } else if (isVideoComponent(sel)) {
    // Check if it's a GrapesJS video component (type='video') which uses properties
    if (sel.get?.("type") === "video") {
      const provider = sel.get("provider");
      const vidId = sel.get("videoId");
      let src = sel.get("src") || attrs.src || "";

      if (provider === "yt" && vidId) {
        src = `https://www.youtube.com/watch?v=${vidId}`;
      } else if (provider === "vi" && vidId) {
        src = `https://vimeo.com/${vidId}`;
      }

      videoSrc.value = src;
      videoControls.value = !!(sel.get?.("controls") ?? attrs.controls);
      videoAutoplay.value = !!(sel.get?.("autoplay") ?? attrs.autoplay);
      videoLoop.value = !!(sel.get?.("loop") ?? attrs.loop);
      videoMuted.value = !!(sel.get?.("muted") ?? attrs.muted);
      videoPoster.value = sel.get?.("poster") || attrs.poster || "";
      videoPreload.value =
        sel.get?.("preload") || attrs.preload || videoPreload.value;
    } else {
      let src = attrs.src || "";
      // If src is empty, check for <source> children
      if (!src && sel.components) {
        const comps = sel.components();
        if (comps) {
          comps.forEach((c: any) => {
            if (src) return;
            if (String(c.getTagName?.() || "").toLowerCase() === "source") {
              src = c.getAttributes?.().src || "";
            }
          });
        }
      }

      videoSrc.value = src;
      videoControls.value = !!attrs.controls;
      videoAutoplay.value = !!attrs.autoplay;
      videoLoop.value = !!attrs.loop;
      videoMuted.value = !!attrs.muted;
      videoPoster.value = attrs.poster || "";
      videoPreload.value = attrs.preload || videoPreload.value;
    }
  } else if (isButtonComponent(sel)) {
    let read: Record<string, string> = attrs as Record<string, string>;
    const el = sel.getEl?.() as HTMLElement | null;
    const base =
      el &&
      (String(el.tagName || "").toLowerCase() === "a" ||
      String(el.tagName || "").toLowerCase() === "button"
        ? el
        : el.closest("a,button"));
    if (base) {
      const map = (base as Element | null)?.attributes as
        | NamedNodeMap
        | undefined;
      const obj: Record<string, string> = map
        ? Array.from(map).reduce((acc: Record<string, string>, a: Attr) => {
            acc[a.name] = a.value;
            return acc;
          }, {})
        : {};
      read = obj;
    }
    buttonHref.value = read.href || "";
    buttonTarget.value = read.target || "_self";
    buttonRel.value = read.rel || "";
    linkTitle.value = read.title || "";
    linkAriaLabel.value = String(read["aria-label"] || "");
    linkDownload.value = !!read.download;
    const relStr = String(read.rel || "").toLowerCase();
    relNoFollow.value = /\bnofollow\b/.test(relStr);
    relNoOpener.value = /\bnoopener\b/.test(relStr);
    relNoReferrer.value = /\bnoreferrer\b/.test(relStr);
    const txt = getBlockText(sel);
    buttonText.value = txt || "";

    // Read popup settings
    const classes = sel.getClasses ? sel.getClasses() : [];
    buttonOpenPopup.value =
      classes.includes("js-buy-ticket-btn") || read.open_popup === "true";
    buttonEventId.value = read["data-event-id"] || "";

    const st = sel.getStyle?.() || {};
    const bg = String(st["background"] || st["background-color"] || "");
    const bd = String(st["border"] || st["border-color"] || "");
    const pad = String(st["padding"] || "");
    buttonVariant.value = bg.includes("#1976d2")
      ? "primary"
      : bd.includes("solid") && !bg
        ? "outline"
        : "secondary";
    buttonSize.value = pad.includes("12px 20px")
      ? "md"
      : pad.includes("8px 12px")
        ? "sm"
        : pad.includes("14px 24px")
          ? "lg"
          : buttonSize.value;
  } else if (isHtmlComponent(sel)) {
    htmlContent.value = sel.get("content") || "";
  } else if (isIframeComponent(sel)) {
    const el = sel.getEl?.() as HTMLElement | null;
    htmlContent.value = el ? el.outerHTML : "";
  } else if (isBackgroundImageComponent(sel)) {
    const attrs = (sel.getAttributes?.() || {}) as Record<string, string>;
    const dataUrl = String(attrs["data-bg-video-url"] || "").trim();
    if (dataUrl) {
      bgImageUrl.value = dataUrl;
    } else {
      const st = String(attrs.style || "");
      const m = st.match(/background-image\s*:\s*url\((['"]?)(.*?)\1\)/i);
      bgImageUrl.value = (m && m[2]) || "";
    }
    const styleObj = sel.getStyle?.() || {};
    bgSize.value = String(styleObj["background-size"] || bgSize.value);
    bgPosition.value = String(
      styleObj["background-position"] || bgPosition.value,
    );
    try {
      const url = String(bgImageUrl.value || "").trim();
      const isYouTube =
        /youtu\.be\//i.test(url) ||
        /youtube\.com\/(watch|embed|shorts)\b/i.test(url);
      if (isYouTube) {
        nextTick(() => {
          applyBgImageAttributes();
        });
      }
    } catch {}
  } else if (isSliderComponent(sel)) {
    const cur = sel.getEl?.() as HTMLElement | null;
    const el =
      (cur?.closest('[data-gjs-type="slider"]') as HTMLElement | null) || cur;
    const vp =
      (el?.querySelector('[data-role="viewport"]') as HTMLElement | null) || el;
    const role = String(vp?.getAttribute("role") || "listbox");
    sliderRoleMode.value = role === "tablist" ? "tabs" : "listbox";
    const prev = el?.querySelector(
      'button[data-role="prev"]',
    ) as HTMLElement | null;
    const next = el?.querySelector(
      'button[data-role="next"]',
    ) as HTMLElement | null;
    const dots = el?.querySelector('[data-role="dots"]') as HTMLElement | null;
    sliderShowArrows.value = !prev || getComputedStyle(prev).display !== "none";
    sliderShowArrows.value =
      sliderShowArrows.value &&
      (!next || getComputedStyle(next).display !== "none");
    sliderShowDots.value = !dots || getComputedStyle(dots).display !== "none";
    sliderAutoplay.value =
      String(el?.getAttribute("data-autoplay") || "false") === "true";
    sliderAutoplayInterval.value =
      Number(el?.getAttribute("data-interval") || 3000) || 3000;
    sliderPauseOnHover.value =
      String(el?.getAttribute("data-pause-hover") || "true") === "true";
    const tr = String(el?.getAttribute("data-transition") || "smooth");
    sliderTransition.value = tr === "instant" ? "instant" : "smooth";
    const dur = Number(el?.getAttribute("data-duration") || 0) || 0;
    sliderSpeed.value = dur > 0 ? dur : 260;
    const eas = String(el?.getAttribute("data-easing") || "ease");
    sliderEasing.value =
      eas === "linear" ||
      eas === "ease-in" ||
      eas === "ease-out" ||
      eas === "ease-in-out"
        ? (eas as "linear" | "ease-in" | "ease-out" | "ease-in-out" | "ease")
        : "ease";
    const vis = Number(el?.getAttribute("data-visible") || 1) || 1;
    sliderVisibleCount.value = Math.max(1, Math.min(12, vis));
  } else if (isGalleryComponent(sel)) {
    const st = sel.getStyle?.() || {};
    const gtc = String(st["grid-template-columns"] || "1fr 1fr 1fr");
    const match = gtc.match(/repeat\((\d+)/);
    const cols = (match && Number(match[1])) || gtc.split(" ").length;
    galleryColumns.value = Math.max(1, Math.min(12, cols || 3));
    const gapVal = String(st["gap"] || "8px");
    const gapNum = Number(gapVal.replace(/px|rem|em/, "")) || 8;
    galleryGap.value = gapNum;
  } else if (isGenericGridComponent(sel)) {
    const st = sel.getStyle?.() || {};
    const gtc = String(st["grid-template-columns"] || "1fr 1fr");
    const match = gtc.match(/repeat\((\d+)/);
    const cols = (match && Number(match[1])) || gtc.split(" ").length;
    gridColumns.value = Math.max(1, Math.min(12, cols || 1));
    const gapVal = String(st["gap"] || "0px");
    const gapNum = Number(gapVal.replace(/px|rem|em/, "")) || 0;
    gridGap.value = gapNum;
  } else if (isNavbarComponent(sel)) {
    const st = sel.getStyle?.() || {};
    const gapVal = String(st["gap"] || "12px");
    navGap.value = Number(gapVal.replace(/px|rem|em/, "")) || 12;
    const padVal = String(st["padding"] || "12px");
    navPadding.value = Number(padVal.replace(/px|rem|em/, "")) || 12;
    const radVal = String(st["border-radius"] || "12px");
    navRadius.value = Number(radVal.replace(/px|rem|em/, "")) || 12;
    const bgVal = String(
      st["background"] || st["background-color"] || "#f8fafc",
    );
    navBgColor.value = bgVal || "#f8fafc";
    navJustify.value = String(st["justify-content"] || "flex-start");
    navSticky.value = String(st["position"] || "static") === "sticky";
  } else if (isModalComponent(sel)) {
    const el = sel.getEl?.() as HTMLElement | null;
    const st = sel.getStyle?.() || {};
    modalWidth.value =
      Number(String(st["width"] || "480").replace(/px|rem|%/, "")) || 480;
    modalPadding.value =
      Number(String(st["padding"] || "16").replace(/px|rem|%/, "")) || 16;
    modalRadius.value =
      Number(String(st["border-radius"] || "12").replace(/px|rem|%/, "")) || 12;
    const tEl = el?.querySelector("h3") as HTMLElement | null;
    const cEl = el?.querySelector("p") as HTMLElement | null;
    modalTitle.value = (tEl?.textContent || "Modal title").trim();
    modalContent.value = (cEl?.textContent || "Modal content").trim();
    const overlay = el?.parentElement?.querySelector(
      '[data-role="overlay"]',
    ) as HTMLElement | null;
    if (overlay) {
      const bg = getComputedStyle(overlay).backgroundColor;
      const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      overlayOpacity.value = m && m[4] ? Number(m[4]) : 0.45;
      modalOverlayClose.value =
        String(overlay.getAttribute("data-overlay-close") || "true") === "true";
    } else overlayOpacity.value = 0.45;
    const closeBtn = el?.querySelector(
      '[data-role="close"]',
    ) as HTMLElement | null;
    if (closeBtn) {
      const disp = getComputedStyle(closeBtn).display;
      modalShowClose.value = disp !== "none";
    }
  } else if (isHeroComponent(sel)) {
    const st = sel.getStyle?.() || {};
    const bg = String(st["background-image"] || "");
    const m = bg.match(/url\((['"]?)(.*?)\1\)/);
    heroBgUrl.value = (m && m[2]) || "";
    heroTextColor.value = String(st["color"] || "#ffffff");
    const el = sel.getEl?.() as HTMLElement | null;
    const h2 = el?.querySelector("h2") as HTMLElement | null;
    const p = el?.querySelector("p") as HTMLElement | null;
    heroTitle.value = (h2?.textContent || "Your hero title").trim();
    heroSubtitle.value = (
      p?.textContent || "A subtitle that describes your product"
    ).trim();
  } else if (isAccordionComponent(sel)) {
    const el = sel.getEl?.() as HTMLElement | null;
    accordionMultiple.value =
      String(el?.getAttribute("data-acc-multiple") || "false") === "true";
    accordionAnimate.value =
      String(el?.getAttribute("data-acc-animate") || "true") === "true";
    accordionDuration.value =
      Number(el?.getAttribute("data-acc-duration") || 240) || 240;
  } else if (isTextComponent(sel)) {
    selectedTextContent.value = getBlockText(sel) || "";
  }
  refreshSelectedSizing();
}

function applyImageAttributes() {
  if (!selectedComponent.value) return;
  selectedComponent.value.addAttributes({
    src: imageSrc.value,
    alt: imageAlt.value,
  });
  selectedComponent.value.addStyle({
    "object-fit": imageFit.value,
    "object-position": imagePosition.value,
  });
}
function applyVideoAttributes() {
  if (!selectedComponent.value) return;
  const sel = selectedComponent.value;

  if (sel.get?.("type") === "video") {
    sel.set("provider", "so");
    sel.set("src", videoSrc.value);
    sel.set("controls", videoControls.value);
    sel.set("autoplay", videoAutoplay.value);
    sel.set("loop", videoLoop.value);
    sel.set("muted", videoMuted.value);
    sel.set("poster", videoPoster.value);
    sel.set("preload", videoPreload.value);
  }

  sel.addAttributes({
    src: videoSrc.value,
    controls: videoControls.value ? true : undefined,
    autoplay: videoAutoplay.value ? true : undefined,
    loop: videoLoop.value ? true : undefined,
    muted: videoMuted.value ? true : undefined,
    poster: videoPoster.value || undefined,
    preload: videoPreload.value || undefined,
  });
}
function applyButtonAttributes() {
  if (!selectedComponent.value) return;
  const sel = selectedComponent.value;
  const relParts: string[] = [];
  const baseRel = (buttonRel.value || "").trim();
  if (baseRel) relParts.push(baseRel);
  if (relNoFollow.value) relParts.push("nofollow");
  if (relNoOpener.value) relParts.push("noopener");
  if (relNoReferrer.value) relParts.push("noreferrer");
  const relFinal = Array.from(
    new Set(relParts.join(" ").split(/\s+/).filter(Boolean)),
  ).join(" ");
  if (buttonOpenPopup.value) {
    sel.addClass("js-buy-ticket-btn");
    if (!buttonEventId.value) {
      const match = (buttonHref.value || "").match(/[?&]event_id=([^&]+)/);
      if (match && match[1]) buttonEventId.value = match[1];
    }
  } else {
    sel.removeClass("js-buy-ticket-btn");
  }

  sel.addAttributes({
    href: buttonHref.value,
    target: buttonTarget.value,
    rel: relFinal || undefined,
    title: linkTitle.value || undefined,
    "aria-label": linkAriaLabel.value || undefined,
    download: linkDownload.value ? true : undefined,
    open_popup: buttonOpenPopup.value ? "true" : "false",
    "data-event-id": buttonEventId.value || undefined,
  });
  setBlockText(sel, buttonText.value || "");
  // If the selected is a child inside an anchor/button, also update closest element's attributes in DOM
  try {
    const el = sel.getEl?.() as HTMLElement | null;
    const closest =
      el &&
      (String(el.tagName || "").toLowerCase() === "a" ||
      String(el.tagName || "").toLowerCase() === "button"
        ? el
        : el.closest("a,button"));
    if (closest) {
      if (buttonHref.value) closest.setAttribute("href", buttonHref.value);
      if (buttonTarget.value)
        closest.setAttribute("target", buttonTarget.value);
      if (relFinal) closest.setAttribute("rel", relFinal);
      if (linkTitle.value) closest.setAttribute("title", linkTitle.value);
      if (linkAriaLabel.value)
        closest.setAttribute("aria-label", linkAriaLabel.value);
      if (linkDownload.value) closest.setAttribute("download", "");
      else closest.removeAttribute("download");
    }
  } catch {}
  const styles: Record<string, string> = {};
  if (buttonVariant.value === "primary") {
    styles.background = "var(--color-primary)";
    styles.color = "#fff";
    styles.border = "none";
  } else if (buttonVariant.value === "secondary") {
    styles.background = "#e5e7eb";
    styles.color = "#111827";
    styles.border = "none";
  } else if (buttonVariant.value === "outline") {
    styles.background = "transparent";
    styles.color = "var(--color-primary)";
    styles.border = "1px solid var(--color-primary)";
  }
  if (buttonSize.value === "sm") styles.padding = "8px 12px";
  else if (buttonSize.value === "md") styles.padding = "12px 20px";
  else if (buttonSize.value === "lg") styles.padding = "14px 24px";
  sel.addStyle(styles);
}
function applyHtmlContent() {
  const sel = selectedComponent.value;
  if (!sel) return;
  if (isHtmlComponent(sel)) {
    sel.set("content", htmlContent.value);
    return;
  }
  if (isIframeComponent(sel)) {
    try {
      const parent = (sel as any).parent?.() as any;
      const coll = parent?.components?.();
      const children = Array.isArray(coll)
        ? (coll as any[]).map((c) => c)
        : Array.isArray((coll as any)?.models)
          ? ((coll as any).models as any[])
          : [];
      const idx = children.findIndex((c) => c === sel);
      const htmlBlock = parent.append({
        type: "text",
        tagName: "div",
        content: htmlContent.value,
        attributes: {
          "data-wb-type": "html",
          class: "wb-html-block",
        },
      });
      const newComp = (
        Array.isArray(htmlBlock) ? (htmlBlock[0] as any) : (htmlBlock as any)
      ) as any;
      if (idx >= 0 && typeof parent.components === "function") {
        try {
          const coll2 = parent.components();
          if (coll2?.remove) coll2.remove(newComp);
          if (coll2?.add) coll2.add(newComp, { at: idx });
        } catch {}
      }
      try {
        (sel as any).remove?.();
      } catch {}
      try {
        editor?.select?.(newComp);
      } catch {}
    } catch {}
    return;
  }
}

function applyBgImageAttributes() {
  if (!selectedComponent.value) return;
  const sel = selectedComponent.value as any;
  let url = bgImageUrl.value.trim();
  try {
    if (!url && sel && sel.getAttributes) {
      const attrs = sel.getAttributes() || {};
      const dataUrl = String((attrs as any)["data-bg-video-url"] || "").trim();
      if (dataUrl) {
        url = dataUrl;
        bgImageUrl.value = dataUrl;
      }
    }
  } catch {}
  const styles: Record<string, string> = {};
  const ov = overlayRgba(
    bgOverlayColor.value || "#0f172a",
    Math.max(0, Math.min(1, Number(bgOverlayOpacity.value) || 0)) || 0.35,
  );
  const isYouTube =
    /youtu\.be\//i.test(url) ||
    /youtube\.com\/(watch|embed|shorts)\b/i.test(url);
  try {
    if (sel && sel.addAttributes) {
      if (isYouTube && url) {
        sel.addAttributes({ "data-bg-video-url": url });
      } else {
        sel.addAttributes({ "data-bg-video-url": "" });
      }
    }
  } catch {}
  if (isYouTube) {
    styles["background"] = "none";
    styles["background-image"] = "none";
    styles["background-color"] = "transparent";
  } else {
    styles["background"] = url
      ? `linear-gradient(${ov}, ${ov}), url('${url}')`
      : "none";
    styles["background-image"] = url ? `url('${url}')` : "none";
    styles["background-size"] = `${bgSize.value}, ${bgSize.value}`;
    styles["background-position"] = `${bgPosition.value}, ${bgPosition.value}`;
  }
  selectedComponent.value.addStyle(styles);
  if (isYouTube) {
    try {
      const vids = (sel.find?.(".wb-bg__video") || []) as Component[];
      const ovs = (sel.find?.(".wb-bg__overlay") || []) as Component[];
      const vid =
        vids[0] ||
        (sel.append?.({
          type: "text",
          tagName: "div",
          attributes: {
            class: "wb-bg__video",
            style:
              "position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden;border-radius:inherit",
          },
          components: [
            {
              type: "text",
              tagName: "iframe",
              attributes: {
                src: "",
                style:
                  "position:absolute;inset:0;width:100%;height:100%;border:0",
                allow:
                  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                allowfullscreen: "true",
                referrerpolicy: "strict-origin-when-cross-origin",
              },
            },
          ],
        }) as unknown as Component);
      const ovl =
        ovs[0] ||
        (sel.append?.({
          type: "text",
          tagName: "div",
          attributes: {
            class: "wb-bg__overlay",
            style:
              "position:absolute;inset:0;z-index:1;border-radius:inherit;pointer-events:none",
          },
        }) as unknown as Component);
      const iframe = (vid?.find?.("iframe") || [])[0] as Component | null;
      const idMatch = url.match(
        /(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{6,})/,
      );
      const vidId = idMatch && idMatch[1] ? idMatch[1] : "";
      const src = vidId
        ? `https://www.youtube.com/embed/${vidId}?autoplay=1&mute=1&controls=0&rel=0&showinfo=0&loop=1&playlist=${vidId}&modestbranding=1&playsinline=1`
        : url;
      const scale = Math.max(0.5, Math.min(3, Number(bgVideoScale.value) || 1));
      const pos = String(bgPosition.value || "center center").toLowerCase();
      const parts = pos.split(/\s+/);
      const px = parts[0] || "center";
      const py = parts[1] || "center";
      const origin = `${px} ${py}`;
      const iframeStyle = `position:absolute;inset:0;width:100%;height:100%;border:0;transform:scale(${scale});transform-origin:${origin}`;
      if (iframe) {
        iframe.addAttributes({ src, style: iframeStyle });
      }
      if (vidId) {
        showFeedback("Đã áp dụng nền video YouTube (Nâng cao)", "success");
      } else {
        showFeedback(
          "Link YouTube thiếu VIDEO_ID (tham số v= hoặc ID)",
          "error",
        );
      }
      if (ovl) {
        ovl.addAttributes({
          style: `position:absolute;inset:0;z-index:1;border-radius:inherit;pointer-events:none;background:${ov}`,
        });
      }
      try {
        sel.addStyle({ position: "relative" });
        const children = (sel.components?.() || []) as any[];
        children.forEach((child: any) => {
          try {
            const attrs = child.getAttributes
              ? child.getAttributes() || {}
              : {};
            const cls = String(
              (attrs as any).class || (attrs as any).className || "",
            ).toLowerCase();
            if (cls.includes("wb-bg__video") || cls.includes("wb-bg__overlay"))
              return;
            const styleStr = String((attrs as any).style || "");
            const extra = "position:relative;z-index:2;";
            child.addAttributes?.({
              style: styleStr ? `${styleStr};${extra}` : extra,
            });
          } catch {}
        });
      } catch {}
    } catch {}
  } else {
    try {
      const vids = (sel.find?.(".wb-bg__video") || []) as Component[];
      const ovl = (sel.find?.(".wb-bg__overlay") || []) as Component[];
      vids.forEach((v) => v.remove?.());
      ovl.forEach((o) =>
        o.addAttributes?.({ style: "display:none;position:absolute;inset:0" }),
      );
    } catch {}
  }
}

function openAssetManager(callback: (url: string) => void) {
  if (!editor) return;
  const ed = editor;
  if (ed.AssetManager) {
    ed.AssetManager.open({
      select: (asset: any) => {
        const url = asset.getSrc();
        callback(url);
        ed.AssetManager.close();
      },
    });
  }
}

function applyBackground() {
  if (!selectedComponent.value) return;
  const style: Record<string, string> = {};
  const hasBgColor = !!styleBgColor.value;
  if (hasBgColor) style["background-color"] = styleBgColor.value;
  else style["background-color"] = "";

  const url = String(styleBgImage.value || "").trim();
  const isYouTube =
    /youtu\.be\//i.test(url) ||
    /youtube\.com\/(watch|embed|shorts)\b/i.test(url);
  if (isYouTube) {
    style["background-image"] = "none";
  } else {
    if (url) style["background-image"] = `url('${url}')`;
    else if (hasBgColor) style["background-image"] = "none";
    else style["background-image"] = "";
  }

  style["background-repeat"] = styleBgRepeat.value;
  style["background-position"] = styleBgPosition.value;
  style["background-size"] = styleBgSize.value;
  style["background-attachment"] = styleBgAttachment.value;
  selectedComponent.value.addStyle(style);

  if (isYouTube) {
    bgImageUrl.value = url;
    applyBgImageAttributes();
    showFeedback("Đã chuyển sang nền video YouTube (nhóm Nâng cao)", "success");
  }
}

function applyBorder() {
  if (!selectedComponent.value) return;
  const style: Record<string, string> = {};

  if (styleBorderStyle.value && styleBorderStyle.value !== "none") {
    style["border-style"] = styleBorderStyle.value;
    style["border-width"] = `${styleBorderWidth.value}px`;
    if (styleBorderColor.value) style["border-color"] = styleBorderColor.value;
  } else {
    style["border-style"] = "none";
  }

  style["border-radius"] = `${styleBorderRadius.value}px`;
  selectedComponent.value.addStyle(style);
}

function applySpacing() {
  if (!selectedComponent.value) return;
  const style: Record<string, string> = {};

  style["margin-top"] = `${styleMarginTop.value}px`;
  style["margin-right"] = `${styleMarginRight.value}px`;
  style["margin-bottom"] = `${styleMarginBottom.value}px`;
  style["margin-left"] = `${styleMarginLeft.value}px`;

  style["padding-top"] = `${stylePaddingTop.value}px`;
  style["padding-right"] = `${stylePaddingRight.value}px`;
  style["padding-bottom"] = `${stylePaddingBottom.value}px`;
  style["padding-left"] = `${stylePaddingLeft.value}px`;

  selectedComponent.value.addStyle(style);
}

function applySliderSettings() {
  if (!selectedComponent.value) return;
  const cur = selectedComponent.value.getEl?.() as HTMLElement | null;
  if (!cur) return;
  const root =
    (cur.closest('[data-gjs-type\u003D"slider"]') as HTMLElement | null) || cur;
  const el = root;
  try {
    const el2 = el as HTMLElement & {
      sliderSetRoleMode?: (mode: "listbox" | "tabs") => void;
      sliderSetAutoplay?: (opts: {
        enabled: boolean;
        interval: number;
        pauseOnHover: boolean;
      }) => void;
      sliderSetTransition?: (opts: {
        effect: string;
        duration: number;
        easing: string;
      }) => void;
      sliderSetVisible?: (n: number) => void;
    };
    el2.sliderSetRoleMode?.(sliderRoleMode.value);
  } catch {}
  const prev = el.querySelector(
    'button[data-role="prev"]',
  ) as HTMLElement | null;
  const next = el.querySelector(
    'button[data-role="next"]',
  ) as HTMLElement | null;
  const dots = el.querySelector('[data-role="dots"]') as HTMLElement | null;
  if (prev) prev.style.display = sliderShowArrows.value ? "" : "none";
  if (next) next.style.display = sliderShowArrows.value ? "" : "none";
  if (dots) dots.style.display = sliderShowDots.value ? "" : "none";
  try {
    const el2 = el as HTMLElement & {
      sliderSetAutoplay?: (opts: {
        enabled: boolean;
        interval: number;
        pauseOnHover: boolean;
      }) => void;
    };
    el2.sliderSetAutoplay?.({
      enabled: !!sliderAutoplay.value,
      interval: Math.max(500, Number(sliderAutoplayInterval.value) || 3000),
      pauseOnHover: !!sliderPauseOnHover.value,
    });
  } catch {}
  try {
    const el2 = el as HTMLElement & {
      sliderSetTransition?: (opts: {
        effect: string;
        duration: number;
        easing: string;
      }) => void;
    };
    el2.sliderSetTransition?.({
      effect: sliderTransition.value,
      duration: Math.max(100, Number(sliderSpeed.value) || 260),
      easing: sliderEasing.value,
    });
  } catch {}
  try {
    const el2 = el as HTMLElement & { sliderSetVisible?: (n: number) => void };
    el2.sliderSetVisible?.(
      Math.max(1, Math.min(12, Number(sliderVisibleCount.value) || 1)),
    );
  } catch {}
}
function applyGallerySettings() {
  if (!selectedComponent.value) return;
  const cols = Math.max(1, Math.min(6, Number(galleryColumns.value) || 3));
  const gap = Math.max(0, Number(galleryGap.value) || 8);
  selectedComponent.value.addStyle({
    display: "grid",
    "grid-template-columns": `repeat(${cols}, 1fr)`,
    gap: `${gap}px`,
  });
}
function applyGridSettings() {
  if (!selectedComponent.value) return;
  const cols = Math.max(1, Math.min(12, Number(gridColumns.value) || 2));
  const gap = Math.max(0, Number(gridGap.value) || 0);
  selectedComponent.value.addStyle({
    "grid-template-columns": `repeat(${cols}, 1fr)`,
    gap: `${gap}px`,
  });
}
function applyNavbarSettings() {
  if (!selectedComponent.value) return;
  const styles: Record<string, string> = {};
  styles["gap"] = `${Math.max(0, Number(navGap.value) || 0)}px`;
  styles["padding"] = `${Math.max(0, Number(navPadding.value) || 0)}px`;
  styles["border-radius"] = `${Math.max(0, Number(navRadius.value) || 0)}px`;
  styles["background"] = String(navBgColor.value || "");
  styles["justify-content"] = String(navJustify.value || "flex-start");
  selectedComponent.value.addStyle(styles);
  const sticky = !!navSticky.value;
  const pos = sticky ? "sticky" : "static";
  selectedComponent.value.addStyle({
    position: pos,
    top: sticky ? "0" : undefined,
  });
}
function applyModalSettings() {
  if (!selectedComponent.value) return;
  const sel = selectedComponent.value;
  const styles: Record<string, string> = {};
  styles["width"] = `${Math.max(0, Number(modalWidth.value) || 0)}px`;
  styles["padding"] = `${Math.max(0, Number(modalPadding.value) || 0)}px`;
  styles["border-radius"] = `${Math.max(0, Number(modalRadius.value) || 0)}px`;
  sel.addStyle(styles);
  const titles = (sel.find?.("h3") || []) as Component[];
  const paras = (sel.find?.("p") || []) as Component[];
  const tModel = titles[0] || null;
  const cModel = paras[0] || null;
  if (tModel) setBlockText(tModel, modalTitle.value || "");
  if (cModel) setBlockText(cModel, modalContent.value || "");
  const parent = sel.parent?.();
  const overlays = (parent?.find?.('[data-role="overlay"]') ||
    []) as Component[];
  const ovModel = overlays[0] || null;
  const alpha = Math.max(0, Math.min(1, Number(overlayOpacity.value) || 0.45));
  if (ovModel) {
    const base = `position:fixed;inset:0;background:rgba(2,8,23,${alpha})`;
    ovModel.addAttributes({
      style: base,
      "data-overlay-close": modalOverlayClose.value ? "true" : "false",
    });
  }
  const closeButtons = (sel.find?.('[data-role="close"]') || []) as Component[];
  const closeBtn = closeButtons[0] || null;
  if (closeBtn) {
    closeBtn.addAttributes({
      style: modalShowClose.value
        ? "position:absolute;right:var(--space-3);top:var(--space-3);border:none;background:transparent;color:#475569;font-size:16px;cursor:pointer"
        : "display:none",
    });
  }
}
function applyHeroSettings() {
  if (!selectedComponent.value) return;
  const url = heroBgUrl.value.trim();
  const styles: Record<string, string> = {};
  const ov = overlayRgba(
    heroOverlayColor.value || "#0f172a",
    Math.max(0, Math.min(1, Number(heroOverlayOpacity.value) || 0)) || 0.35,
  );
  styles["background"] = url
    ? `linear-gradient(${ov}, ${ov}), url('${url}')`
    : "none";
  styles["background-image"] = url ? `url('${url}')` : "none";
  styles["color"] = heroTextColor.value || "#ffffff";
  selectedComponent.value.addStyle(styles);
  const sel = selectedComponent.value;
  const titles = (sel.find?.("h2") || []) as Component[];
  const paras = (sel.find?.("p") || []) as Component[];
  const tModel = titles[0] || null;
  const pModel = paras[0] || null;
  if (tModel) setBlockText(tModel, heroTitle.value || "");
  if (pModel) setBlockText(pModel, heroSubtitle.value || "");
}

function applyGlobalSiteSettings() {
  const title = (siteTitle.value || "").trim();
  const subtitle = (siteSubtitle.value || "").trim();
  const logo = (siteLogoUrl.value || "").trim();
  if (!editor) return;
  try {
    const wrappers = editor.getWrapper?.();
    if (!wrappers) return;
    const sections = (wrappers.find?.("section") || []) as Component[];
    sections.forEach((sec: Component) => {
      const st = sec.getStyle?.() || {};
      const bg = String(st["background-image"] || "");
      if (/url\(/i.test(bg)) {
        const titles = (sec.find?.("h2") || []) as Component[];
        const paras = (sec.find?.("p") || []) as Component[];
        const tModel = titles[0] || null;
        const pModel = paras[0] || null;
        if (tModel && title) setBlockText(tModel, title);
        if (pModel && subtitle) setBlockText(pModel, subtitle);
      }
    });
    const explicitTitles = (wrappers.find?.('[data-role="site-title"]') ||
      []) as Component[];
    explicitTitles.forEach((m: Component) => {
      if (title) setBlockText(m, title);
    });
    const explicitSubtitles = (wrappers.find?.('[data-role="site-subtitle"]') ||
      []) as Component[];
    explicitSubtitles.forEach((m: Component) => {
      if (subtitle) setBlockText(m, subtitle);
    });
    const headers = (wrappers.find?.('[data-role="header"]') ||
      []) as Component[];
    headers.forEach((h: Component) => {
      const logos = (h.find?.('[data-role="logo"]') || []) as Component[];
      if (logos.length > 0) {
        logos.forEach((l: Component) => {
          if (logo) l.addAttributes({ src: logo, alt: title || "Logo" });
        });
      } else if (logo) {
        try {
          const coll = h.components?.();
          if (coll && coll.add) {
            coll.add(
              {
                type: "image",
                attributes: {
                  "data-role": "logo",
                  src: logo,
                  alt: title || "Logo",
                  style: "height:24px;width:auto;margin-right:var(--space-3)",
                },
              },
              { at: 0 },
            );
          } else {
            h.append?.({
              type: "image",
              attributes: {
                "data-role": "logo",
                src: logo,
                alt: title || "Logo",
                style: "height:24px;width:auto;margin-right:var(--space-3)",
              },
            });
          }
        } catch {}
      }
    });
  } catch {}
}

function applyPageMeta() {
  const doc = editor?.Canvas.getDocument();
  if (!doc) return;
  const t = String(seoMeta.value.title || "").trim();
  const d = String(seoMeta.value.description || "").trim();
  const ot = String(seoMeta.value.ogTitle || "").trim();
  const oi = String(seoMeta.value.ogImage || "").trim();
  const can = String(pageCanonical.value || "").trim();
  const fav = String(pageFaviconUrl.value || "").trim();
  const lang = String(pageLang.value || "").trim();
  try {
    if (t) doc.title = t;
    const head = doc.head;
    const upsertMeta = (attr: string, key: string, content: string) => {
      if (!content) return;
      const sel = `meta[${attr}="${key}"]`;
      let el = head.querySelector(sel) as HTMLMetaElement | null;
      if (!el) {
        el = doc.createElement("meta");
        el.setAttribute(attr, key);
        head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    const upsertLink = (rel: string, href: string) => {
      if (!href) return;
      const sel = `link[rel="${rel}"]`;
      let el = head.querySelector(sel) as HTMLLinkElement | null;
      if (!el) {
        el = doc.createElement("link");
        el.setAttribute("rel", rel);
        head.appendChild(el);
      }
      el.setAttribute("href", href);
    };
    if (d) upsertMeta("name", "description", d);
    if (ot) upsertMeta("property", "og:title", ot);
    if (oi) upsertMeta("property", "og:image", oi);
    if (can) upsertLink("canonical", can);
    if (fav) upsertLink("icon", fav);
    if (lang) doc.documentElement.setAttribute("lang", lang);
  } catch {}
}

function applyAccordionSettings() {
  if (!selectedComponent.value) return;
  const el = selectedComponent.value.getEl?.() as HTMLElement | null;
  if (!el) return;
  el.setAttribute(
    "data-acc-multiple",
    accordionMultiple.value ? "true" : "false",
  );
  el.setAttribute(
    "data-acc-animate",
    accordionAnimate.value ? "true" : "false",
  );
  el.setAttribute(
    "data-acc-duration",
    String(Math.max(0, Number(accordionDuration.value) || 0)),
  );
  try {
    const el2 = el as HTMLElement & {
      accordionSetOptions?: (opts: {
        multiple: boolean;
        animate: boolean;
        duration: number;
      }) => void;
    };
    el2.accordionSetOptions?.({
      multiple: !!accordionMultiple.value,
      animate: !!accordionAnimate.value,
      duration: Math.max(0, Number(accordionDuration.value) || 0),
    });
  } catch {}
}

function openAssetPicker(target: "siteLogo" | "ogImage" | "favicon") {
  currentAssetTarget = target;
  if (!editor) return;
  const am = editor.AssetManager;
  if (!am) return;
  try {
    if (assetSelectHandler && editor.off)
      editor.off("asset:select", assetSelectHandler);
  } catch {}
  assetSelectHandler = (asset: {
    get?: (k: string) => unknown;
    src?: string;
    attributes?: { src?: string };
  }) => {
    const src = String(
      (asset?.get?.("src") ?? asset?.src ?? asset?.attributes?.src ?? "") || "",
    );
    if (src) {
      if (currentAssetTarget === "siteLogo") siteLogoUrl.value = src;
      else if (currentAssetTarget === "ogImage") seoMeta.value.ogImage = src;
      else if (currentAssetTarget === "favicon") pageFaviconUrl.value = src;
    }
    try {
      am.close?.();
    } catch {}
    try {
      if (editor?.off && assetSelectHandler)
        editor?.off("asset:select", assetSelectHandler);
    } catch {}
    currentAssetTarget = null;
    assetSelectHandler = null;
  };
  try {
    editor.on("asset:select", assetSelectHandler);
  } catch {}
  try {
    am.open?.();
  } catch {}
}

function openHeaderPopup() {
  showHeaderPickerDialog.value = true;
}
function selectHeaderTemplate(tpl: HeaderTpl) {
  selectedHeaderTpl.value = tpl;
  isHeaderApplyChecked.value = false;
  showHeaderPickerDialog.value = false;
}
function _openHeaderModal() {
  showHeaderModal.value = true;
}
function closeHeaderModal() {
  showHeaderModal.value = false;
}
function buildExportCode() {
  try {
    if (!editor) return;
    const ed = editor as Editor;
    if (exportMode.value === "grapes") {
      const css = ed.getCss ? ed.getCss() : "";
      let html = ed.getHtml();
      html = cleanBuilderAttrs(html);
      exportCss.value = css || "";
      exportJs.value = "";
      exportHtml.value =
        css && css.trim() ? `${html}\n<style>\n${css}\n</style>` : html;
      return;
    }
    const doc = ed.Canvas.getDocument();
    if (!doc || !doc.body) return;
    const bodyHtml = doc.body.innerHTML;
    const metas = Array.from(doc.head.querySelectorAll('meta[data-symp="1"]'))
      .map((e) => e.outerHTML)
      .join("\n");
    const links = Array.from(doc.head.querySelectorAll('link[data-symp="1"]'))
      .map((e) => e.outerHTML)
      .join("\n");
    const styleBundle = Array.from(
      doc.head.querySelectorAll('style[data-symp="1"]'),
    )
      .map((s) => s.textContent || "")
      .join("\n");
    const scriptsInline = Array.from(
      doc.body.querySelectorAll('script[data-symp="1"]'),
    )
      .filter((s) => !s.getAttribute("src"))
      .map((s) => s.textContent || "")
      .join("\n");
    const scriptSrcs = Array.from(
      doc.body.querySelectorAll('script[data-symp="1"][src]'),
    ).map((s) => s.getAttribute("src") || "");
    exportCss.value = styleBundle;
    exportJs.value = scriptsInline;
    const parts: string[] = [];
    parts.push("<!doctype html>");
    parts.push("<html>");
    parts.push("<head>");
    parts.push(metas);
    parts.push(links);
    if (styleBundle) parts.push("<style>\n" + styleBundle + "\n</style>");
    parts.push("</head>");
    parts.push("<body>");
    parts.push(bodyHtml);
    const escapedInline = String(scriptsInline || "").replace(
      /<\/script>/gi,
      "<\\/script>",
    );
    const scOpen = "<scr" + "ipt";
    const scClose = "</scr" + "ipt>";
    if (escapedInline) parts.push(`${scOpen}>\n${escapedInline}\n${scClose}`);
    const srcTags = scriptSrcs
      .map((u) => `${scOpen} src="${u}">${scClose}`)
      .join("\n");
    if (srcTags) parts.push(srcTags);
    parts.push("</body>");
    parts.push("</html>");
    exportHtml.value = parts.join("\n");
  } catch {}
}
function _openExportCodeDialog() {
  showExportCodeDialog.value = true;
  buildExportCode();
}
function closeExportCodeDialog() {
  showExportCodeDialog.value = false;
}
function openHeaderPickerFromSidebar() {
  openHeaderPopup();
}
function removeExistingHeaders() {
  if (!editor) return;
  try {
    const wrappers = editor.getWrapper?.();
    const headers = wrappers?.find?.('[data-role="header"]') || [];
    headers.forEach((h: Component) => {
      try {
        h.remove?.();
      } catch {}
    });
  } catch {}
}
function insertHtechLogoIntoHeaderModel(h: Component) {
  try {
    const exists = (h.find?.('[data-role="logo"]') || []).length > 0;
    if (exists) return;
    const coll = h.components?.();
    if (coll && coll.add) {
      coll.add(
        {
          type: "image",
          attributes: {
            "data-role": "logo",
            src: logoHtechUrl,
            alt: "H-Tech",
            style: "height:24px;width:auto;margin-right:var(--space-3)",
          },
        },
        { at: 0 },
      );
    } else {
      h.append?.({
        type: "image",
        attributes: {
          "data-role": "logo",
          src: logoHtechUrl,
          alt: "H-Tech",
          style: "height:24px;width:auto;margin-right:var(--space-3)",
        },
      });
    }
  } catch {}
}
function applySelectedHeader() {
  if (!editor || !selectedHeaderTpl.value) return;
  ensureCanvasThemeVars();
  ensureCanvasBlocksStyles();
  removeExistingHeaders();
  const target = getInsertTarget() as Component;
  const blockCreated = target.append({
    tagName: "div",
    attributes: {
      style: "margin:var(--space-3) 0",
    },
  });
  const block = (
    Array.isArray(blockCreated)
      ? (blockCreated[0] as Component)
      : (blockCreated as Component)
  ) as Component;
  try {
    block.append?.(selectedHeaderTpl.value.html);
  } catch {}
  try {
    editor.select(block);
  } catch {}
  try {
    const headers = (block.find?.('[data-role="header"], header') ||
      []) as Component[];
    const h = headers[0] || null;
    if (h) {
      try {
        const attrs = h.getAttributes?.() || {};
        const role = String(
          (attrs as Record<string, string>)["data-role"] || "",
        );
        if (!role) h.addAttributes({ "data-role": "header" });
        const cls = String(h.getAttributes?.().class || "");
        h.addAttributes({ class: cls ? cls + " header" : "header" });
      } catch {}
      insertHtechLogoIntoHeaderModel(h);
      const preset = headerPreset.value;
      if (preset === "Brand")
        h.addAttributes({
          style: `${String(h.getAttributes?.().style || "")};background:#f0f7ff;color:#0f172a`,
        });
      else if (preset === "Dark")
        h.addAttributes({
          style: `${String(h.getAttributes?.().style || "")};background:#0f172a;color:#ffffff`,
        });
      else if (preset === "Light")
        h.addAttributes({
          style: `${String(h.getAttributes?.().style || "")};background:#ffffff;color:#0f172a`,
        });
    }
  } catch {}
  try {
    const d = editor?.Canvas.getDocument?.();
    const head = d?.head;
    if (d && head) {
      const id = "header-custom";
      let styleEl = head.querySelector(`#${id}`) as HTMLStyleElement | null;
      if (!styleEl) {
        styleEl = d.createElement("style") as HTMLStyleElement;
        styleEl.id = id;
        head.appendChild(styleEl);
      }
      styleEl.textContent = String(computedHeaderCss.value || "");
    }
  } catch {}
  try {
    const d = editor?.Canvas.getDocument?.();
    const root = d?.body || null;
    if (root) {
      const bad = root.querySelectorAll('[data-gjs-type="default"]');
      bad.forEach((el: Element) => {
        try {
          (el as HTMLElement).removeAttribute("data-gjs-type");
        } catch {}
      });
      const headers = root.querySelectorAll("header");
      headers.forEach((h: Element) => {
        try {
          const he = h as HTMLElement;
          if (!he.getAttribute("data-role"))
            he.setAttribute("data-role", "header");
          const cls = String(he.getAttribute("class") || "");
          if (!/\bheader\b/.test(cls))
            he.setAttribute("class", cls ? cls + " header" : "header");
        } catch {}
      });
    }
  } catch {}
  showHeaderModal.value = false;
  isHeaderApplyChecked.value = false;
}

function getBlockText(m: ModelLike | null) {
  if (!m) return "";
  const c = m.get?.("content");
  if (typeof c === "string" && c.trim()) return c.trim();
  const el = m.getEl?.();
  return (el && (el as HTMLElement).textContent?.trim()) || "";
}

function setBlockText(m: ModelLike | null, txt: string) {
  try {
    if (!m) return;
    const comps = m.components ? m.components() : null;
    if (comps && (comps as any).length > 0) {
      // If the component has children, try to find a text-like component to update
      let found = false;
      (comps as any).forEach((c: any) => {
        if (found) return;
        if (isTextComponent(c) || c.get("type") === "textnode") {
          c.set("content", txt);
          found = true;
        }
      });
      // Fallback: search for generic wrapper tags that might contain text
      if (!found) {
        (comps as any).forEach((c: any) => {
          if (found) return;
          const tag = String(c.getTagName?.() || "").toLowerCase();
          if (
            [
              "span",
              "p",
              "div",
              "label",
              "b",
              "i",
              "strong",
              "em",
              "small",
            ].includes(tag)
          ) {
            c.set("content", txt);
            found = true;
          }
        });
      }
      // If still not found, we might want to force set content on parent,
      // but this risks wiping icon children.
      // However, if the user explicitly edits text, they expect text to appear.
      // If the parent was empty, just set content.
      if (!found) {
        m.set?.("content", txt ?? "");
      }
    } else {
      m.set?.("content", txt ?? "");
    }
  } catch {}
}

function overlayRgba(color: string, alpha: number) {
  const a = Math.max(0, Math.min(1, Number(alpha) || 0));
  const c = String(color || "").trim();
  if (c.startsWith("rgba(")) {
    const parts = c
      .slice(5, -1)
      .split(",")
      .map((s) => s.trim());
    const r = Number(parts[0]) || 0;
    const g = Number(parts[1]) || 0;
    const b = Number(parts[2]) || 0;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  if (c.startsWith("rgb(")) {
    const parts = c
      .slice(4, -1)
      .split(",")
      .map((s) => s.trim());
    const r = Number(parts[0]) || 0;
    const g = Number(parts[1]) || 0;
    const b = Number(parts[2]) || 0;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  if (c.startsWith("#")) {
    const hex = c.slice(1);
    const to255 = (h: string) => parseInt(h, 16) || 0;
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 3) {
      r = to255(hex[0] + hex[0]);
      g = to255(hex[1] + hex[1]);
      b = to255(hex[2] + hex[2]);
    } else if (hex.length >= 6) {
      r = to255(hex.slice(0, 2));
      g = to255(hex.slice(2, 4));
      b = to255(hex.slice(4, 6));
    }
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return `rgba(15, 23, 42, ${a})`;
}

function cleanBuilderAttrs(html: string) {
  try {
    const container = document.createElement("div");
    container.innerHTML = html;
    const all = Array.from(container.querySelectorAll("*"));
    for (const el of all) {
      const attrs = Array.from(el.attributes);
      for (const a of attrs) {
        if (/^data-gjs-/i.test(a.name)) el.removeAttribute(a.name);
      }
    }
    return container.innerHTML;
  } catch {
    return html;
  }
}

function refreshSelectedTextMeta() {
  const sel = selectedComponent.value;
  if (!sel) {
    selectedTextName.value = "";
    return;
  }
  if (isTextComponent(sel)) {
    const t = getBlockText(sel);
    selectedTextName.value = t.length > 80 ? `${t.slice(0, 80)}…` : t;

    // Sync typography
    const st = (sel.getStyle?.() || {}) as Record<string, string>;
    textFontSize.value = parseInt(st["font-size"] || "") || null;
    textFontWeight.value = st["font-weight"] || "normal";
    textTextAlign.value = st["text-align"] || "left";

    // Handle color rgb to hex if needed, but input type=color expects hex
    // For now simple sync. Ideally we need rgbToHex helper if GrapesJS returns rgb
    const c = st["color"] || "#000000";
    textColor.value = c.startsWith("#") ? c : "#000000"; // Simplification

    textLineHeight.value = parseFloat(st["line-height"] || "") || null;
    textLetterSpacing.value = parseFloat(st["letter-spacing"] || "") || null;
  } else {
    selectedTextName.value = "";
  }
}

function applyTextContent() {
  if (!selectedComponent.value) return;
  setBlockText(selectedComponent.value, selectedTextContent.value);
}

function applyTypographySettings() {
  const m = selectedComponent.value;
  if (!m || !isTextComponent(m)) return;

  const style: Record<string, string> = {};

  if (textFontSize.value) style["font-size"] = `${textFontSize.value}px`;
  else style["font-size"] = "";

  style["font-weight"] = textFontWeight.value;
  style["text-align"] = textTextAlign.value;
  style["color"] = textColor.value;

  if (textLineHeight.value) style["line-height"] = String(textLineHeight.value);
  else style["line-height"] = "";

  if (textLetterSpacing.value)
    style["letter-spacing"] = `${textLetterSpacing.value}px`;
  else style["letter-spacing"] = "";

  m.addStyle(style);
}

function promptEditSelectedText() {
  const list = (editor?.getSelectedAll?.() || [selectedComponent.value]).filter(
    Boolean,
  ) as Component[];
  if (!list.length) return;
  const cur = getBlockText(list[0]);
  const next = window.prompt("Sửa nội dung", cur || "") ?? cur;
  for (const m of list) if (isTextComponent(m)) setBlockText(m, next);
  refreshSelectedTextMeta();
}

function removeSelectedText() {
  const list = (editor?.getSelectedAll?.() || [selectedComponent.value]).filter(
    Boolean,
  ) as Component[];
  for (const m of list) if (isTextComponent(m)) m.remove?.();
  selectedComponent.value = null;
  selectedTextName.value = "";
  multiSelectedCount.value = 0;
}

function toggleBold() {
  const list = (editor?.getSelectedAll?.() || [selectedComponent.value]).filter(
    Boolean,
  ) as Component[];
  for (const m of list)
    if (isTextComponent(m)) {
      const st = (m.getStyle?.() || {}) as Record<string, string>;
      const cur = String(st["font-weight"] || "normal");
      m.addStyle({
        "font-weight": cur === "700" || cur === "bold" ? "normal" : "700",
      });
    }
}
function toggleItalic() {
  const list = (editor?.getSelectedAll?.() || [selectedComponent.value]).filter(
    Boolean,
  ) as Component[];
  for (const m of list)
    if (isTextComponent(m)) {
      const st = (m.getStyle?.() || {}) as Record<string, string>;
      const cur = String(st["font-style"] || "normal");
      m.addStyle({ "font-style": cur === "italic" ? "normal" : "italic" });
    }
}
function toggleUnderline() {
  const list = (editor?.getSelectedAll?.() || [selectedComponent.value]).filter(
    Boolean,
  ) as Component[];
  for (const m of list)
    if (isTextComponent(m)) {
      const st = (m.getStyle?.() || {}) as Record<string, string>;
      const cur = String(st["text-decoration"] || "none");
      m.addStyle({
        "text-decoration": cur.includes("underline") ? "none" : "underline",
      });
    }
}
function alignText(val: "left" | "center" | "right") {
  const list = (editor?.getSelectedAll?.() || [selectedComponent.value]).filter(
    Boolean,
  ) as Component[];
  for (const m of list)
    if (isTextComponent(m)) {
      m.addStyle({ "text-align": val });
    }
}
function cryptoRandomId() {
  return Math.random().toString(36).slice(2, 10);
}
function generateUniqueId(base: string) {
  const doc = editor?.Canvas.getDocument();
  let id = `${base}-${cryptoRandomId()}`;
  try {
    while (doc?.getElementById(id)) id = `${base}-${cryptoRandomId()}`;
  } catch {}
  return id;
}
function hasDuplicateId(id: string) {
  try {
    const doc = editor?.Canvas.getDocument();
    if (!doc || !id) return false;
    const list = doc.querySelectorAll(`[id="${id}"]`);
    return list.length > 1;
  } catch {
    return false;
  }
}
function replaceIdRefs(m: Component, map: Record<string, string>) {
  try {
    const attrs = m.getAttributes?.() || {};
    const updated: Record<string, string> = {
      ...(attrs as Record<string, string>),
    };
    const keys = [
      "for",
      "aria-labelledby",
      "aria-controls",
      "aria-describedby",
      "aria-owns",
      "aria-activedescendant",
      "aria-flowto",
      "aria-details",
      "href",
    ];
    for (const k of keys) {
      const val = String(attrs[k] || "");
      if (!val) continue;
      if (k === "href" && /^#/.test(val)) {
        const old = val.slice(1);
        const nn = map[old];
        if (nn) updated[k] = `#${nn}`;
      } else {
        const old = val;
        const nn = map[old];
        if (nn) updated[k] = nn;
      }
    }
    m.addAttributes(updated);
  } catch {}
}
function _uniquifyIds(root: Component) {
  if (!root) return;
  const map: Record<string, string> = {};
  const stack: Component[] = [root];
  while (stack.length) {
    const m = stack.pop() as Component;
    try {
      const attrs = m.getAttributes?.() || {};
      const oldId = String(attrs.id || "");
      if (oldId && hasDuplicateId(oldId)) {
        const nid = generateUniqueId(oldId);
        m.addAttributes({ id: nid });
        map[oldId] = nid;
      }
      replaceIdRefs(m, map);
      const children = (m.components && m.components()) || [];
      for (const c of children) stack.push(c as Component);
    } catch {}
  }
}
function _treeHasIdsOrRefs(root: Component) {
  try {
    const stack: Component[] = [root];
    let checked = 0;
    const LIMIT = 160;
    while (stack.length && checked < LIMIT) {
      const m = stack.pop() as Component;
      const attrs = m.getAttributes?.() || {};
      if (attrs.id) return true;
      const keys = [
        "for",
        "aria-labelledby",
        "aria-controls",
        "aria-describedby",
      ];
      for (const k of keys) if (String(attrs[k] || "")) return true;
      const href = String((attrs as Record<string, string>).href || "");
      if (href && /^#/.test(href)) return true;
      const children = (m.components && m.components()) || [];
      for (const c of children) stack.push(c as Component);
      checked++;
    }
  } catch {}
  return false;
}
function _estimateNodeCount(root: Component) {
  try {
    if (!root) return 0;
    const stack: Component[] = [root];
    let n = 0;
    const LIMIT = 5000;
    while (stack.length && n < LIMIT) {
      const m = stack.pop() as Component;
      n++;
      const children = (m.components && m.components()) || [];
      for (const c of children) stack.push(c as Component);
    }
    return n;
  } catch {
    return 0;
  }
}
function estimateComponentCount() {
  try {
    if (!editor) return 0;
    const root = editor.getWrapper?.() as Component | null;
    if (!root) return 0;
    let n = 0;
    const stack: Component[] = [root];
    const LIMIT = 10000;
    while (stack.length && n < LIMIT) {
      const m = stack.pop()!;
      n++;
      const children = (m.components && m.components()) || [];
      for (const c of children) stack.push(c as Component);
    }
    return n;
  } catch {
    return 0;
  }
}
function computeChunkSize(est: number, tooLong: boolean) {
  try {
    try {
      const anyWin = typeof window !== "undefined" ? window : null;
      const pm = (anyWin?.performance as any)?.memory;
      if (pm && typeof pm.usedJSHeapSize === "number") {
        uxMetrics.memUsedMB = Math.round(pm.usedJSHeapSize / (1024 * 1024));
        uxMetrics.heapTotalMB = Math.round(pm.totalJSHeapSize / (1024 * 1024));
        uxMetrics.heapLimitMB = Math.round(pm.jsHeapSizeLimit / (1024 * 1024));
      }
    } catch {}
    let base =
      est > 3000 ? 20 : tooLong ? 30 : est > 2000 ? 30 : est > 1000 ? 40 : 60;
    const mem = uxMetrics.memUsedMB || 0;
    const dom = uxMetrics.domNodes || 0;
    const comps = uxMetrics.grapesComponents || 0;
    if (mem > 1200 || dom > 20000 || comps > 3000)
      base = Math.max(15, Math.floor(base * 0.5));
    else if (mem > 800 || dom > 15000 || comps > 2000)
      base = Math.max(20, Math.floor(base * 0.75));
    const anyWin = typeof window !== "undefined" ? window : null;
    const hasRIC =
      anyWin && typeof (anyWin as any).requestIdleCallback === "function";
    if (!hasRIC) base = Math.max(15, Math.floor(base * 0.85));
    return base;
  } catch {
    return est > 3000
      ? 20
      : tooLong
        ? 30
        : est > 2000
          ? 30
          : est > 1000
            ? 40
            : 60;
  }
}
function computeSlots(tooLong: boolean) {
  try {
    let base = tooLong ? 1 : 2;
    const mem = uxMetrics.memUsedMB || 0;
    const dom = uxMetrics.domNodes || 0;
    const comps = uxMetrics.grapesComponents || 0;
    if (mem > 1600 || dom > 40000 || comps > 5000) base = 1;
    else if (mem > 1200 || dom > 30000 || comps > 3500)
      base = Math.max(1, base - 1);
    return base;
  } catch {
    return tooLong ? 1 : 2;
  }
}
function computeNextDelay(queueLen: number, tooLong: boolean) {
  try {
    const mem = uxMetrics.memUsedMB || 0;
    const dom = uxMetrics.domNodes || 0;
    const comps = uxMetrics.grapesComponents || 0;
    if (queueLen > 80 || mem > 1600 || dom > 40000 || comps > 5000)
      return tooLong ? 220 : 250;
    if (queueLen > 40 || mem > 1200 || dom > 30000 || comps > 3500)
      return tooLong ? 160 : 180;
    return tooLong ? 120 : 150;
  } catch {
    return tooLong ? 120 : 150;
  }
}
function buildIdCountMap() {
  try {
    const doc = editor?.Canvas.getDocument?.();
    if (!doc) return null;
    const all = doc.querySelectorAll("[id]");
    const map: Record<string, number> = {};
    for (const el of Array.from(all)) {
      const id = (el as Element).getAttribute("id") || "";
      if (!id) continue;
      map[id] = (map[id] || 0) + 1;
    }
    return map;
  } catch {
    return null;
  }
}
function scheduleSliderReinit() {
  try {
    const anyWin = typeof window !== "undefined" ? window : null;
    const run = () => {
      try {
        for (const mdl of Array.from(sliderReinitQueue)) {
          resetSliderInstance(mdl);
          initSliderBehavior(mdl);
        }
      } catch {}
      sliderReinitQueue.clear();
    };
    const w = anyWin as Window & {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout?: number },
      ) => void;
    };
    if (w && typeof w.requestIdleCallback === "function")
      w.requestIdleCallback(run, { timeout: 500 });
    else setTimeout(run, 500);
  } catch {}
}
const updateMemStatsThrottled = throttle(
  () => {
    try {
      const anyWin = typeof window !== "undefined" ? window : null;
      const pm = anyWin?.performance as unknown;
      const mem = (
        pm as {
          memory?: {
            usedJSHeapSize: number;
            totalJSHeapSize: number;
            jsHeapSizeLimit: number;
          };
        }
      ).memory;
      if (mem && typeof mem.usedJSHeapSize === "number") {
        uxMetrics.memUsedMB = Math.round(mem.usedJSHeapSize / (1024 * 1024));
        uxMetrics.heapTotalMB = Math.round(mem.totalJSHeapSize / (1024 * 1024));
        uxMetrics.heapLimitMB = Math.round(mem.jsHeapSizeLimit / (1024 * 1024));
      }
      const doc = editor?.Canvas.getDocument();
      if (doc && doc.body) {
        uxMetrics.domNodes = doc.body.querySelectorAll("*").length;
      }
      uxMetrics.grapesComponents = estimateComponentCount();
    } catch {}
  },
  500,
  { leading: true, trailing: true },
);
function uniquifyIdsAsync(
  root: Component,
  chunkSize?: number,
  guardGen?: number,
) {
  return new Promise<void>((resolve) => {
    if (!root) return resolve();
    const map: Record<string, string> = {};
    const queue: Component[] = [root];
    const chunk =
      typeof chunkSize === "number" && chunkSize > 0 ? chunkSize : 10;
    const process = () => {
      if (typeof guardGen === "number" && guardGen !== dupGeneration) {
        return resolve();
      }
      let processed = 0;
      while (queue.length && processed < chunk) {
        const m = queue.shift() as Component;
        try {
          const attrs = m.getAttributes?.() || {};
          const oldId = String(attrs.id || "");
          const dup = dupIdCounts
            ? (dupIdCounts[oldId] || 0) > 1
            : hasDuplicateId(oldId);
          if (oldId && dup) {
            const nid = generateUniqueId(oldId);
            m.addAttributes({ id: nid });
            map[oldId] = nid;
            if (dupIdCounts) {
              dupIdCounts[oldId] = Math.max(0, (dupIdCounts[oldId] || 0) - 1);
              dupIdCounts[nid] = (dupIdCounts[nid] || 0) + 1;
            }
          }
          replaceIdRefs(m, map);
          const children = (m.components && m.components()) || [];
          for (const c of children) queue.push(c as Component);
        } catch {}
        processed++;
      }
      if (queue.length) {
        const anyWin = typeof window !== "undefined" ? window : null;
        const w = anyWin as Window & {
          requestIdleCallback?: (
            cb: () => void,
            opts?: { timeout?: number },
          ) => void;
        };
        const to = chunk <= 20 ? 100 : chunk <= 30 ? 150 : 200;
        if (w && typeof w.requestIdleCallback === "function")
          w.requestIdleCallback(process, { timeout: to });
        else if (typeof requestAnimationFrame === "function")
          requestAnimationFrame(process);
        else setTimeout(process, 0);
      } else resolve();
    };
    process();
  });
}
function _addSectionTo(area: "header" | "template" | "footer") {
  const item: SectionItem = {
    id: cryptoRandomId(),
    name:
      area === "header" ? "Phần đầu" : area === "template" ? "Phần" : "Phần cuối",
  };
  sections.value[area].push(item);
  if (!editor) return;
  const root = editor.getWrapper() as Component;
  const created = root.append({
    type: "text",
    tagName: "div",
    attributes: {
      style:
        "padding: 24px; margin: 12px 0; border: 1px solid #e5e7eb; border-radius: 12px;",
    },
  });
  const cModel = (
    Array.isArray(created) ? (created[0] as Component) : (created as Component)
  ) as Component;
  item.compId = cModel.getId ? cModel.getId() : undefined;
}
function _addBlockTo(area: "header" | "template" | "footer") {
  const item: SectionItem = { id: cryptoRandomId(), name: "Khối" };
  sections.value[area].push(item);
  if (!editor) return;
  const root = editor.getWrapper() as Component;
  const created = root.append({
    type: "text",
    tagName: "div",
    content: "Khối",
    attributes: {
      style:
        "padding: 16px; margin: 8px 0; border: 1px dashed #d1d5db; border-radius: 8px;",
    },
  });
  const cModel = (
    Array.isArray(created) ? (created[0] as Component) : (created as Component)
  ) as Component;
  item.compId = cModel.getId ? cModel.getId() : undefined;
}
function _applySidebarOrder(_area: "header" | "template" | "footer") {}
function _selectSidebarItem(item: SectionItem) {
  selectedSidebarId.value = item.id;
  activePanelType.value = (item.name || "").toLowerCase().includes("header")
    ? "header"
    : "block";
  if (!editor || !item.compId) return;
  const comps = editor?.getWrapper()?.find("*") || [];
  const target = comps.find(
    (c: Component) => c.getId && c.getId() === item.compId,
  );
  if (target)
    try {
      editor.select(target);
    } catch {}
}

function _newDesign() {
  if (editor) {
    const wrapperWidth = currentDevice.value === "large" ? 1982 : 1440;
    const gradient =
      "linear-gradient(180deg, #f0f4ff 0%, #ffffff 40%, #ffffff 100%)";
    const page = `
    <div style="max-width:${wrapperWidth}px;margin:0 auto;padding:32px 24px;background:${gradient}">
      <header style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
        <nav style="display:flex;gap:20px;color:#0f172a;opacity:.8">
          <a href="#" style="text-decoration:none;color:inherit">Trang chủ</a>
          <a href="#" style="text-decoration:none;color:inherit">Sản phẩm</a>
          <a href="#" style="text-decoration:none;color:inherit">Dịch vụ</a>
          <a href="#" style="text-decoration:none;color:inherit">Blog</a>
          <a href="#" style="text-decoration:none;color:inherit">Bảng giá</a>
        </nav>
        <div style="display:flex;gap:8px">
          <a href="#" style="background:#eef2ff;color:#6366f1;padding:10px 14px;border-radius:999px;text-decoration:none">Go Pro Today</a>
        </div>
      </header>
      <section style="text-align:center;padding:32px 0">
        <h1 style="margin:0 0 12px;font-size:44px;line-height:1.2;color:#0f172a">The World's Laziest Design System.</h1>
        <p style="margin:0 0 16px;font-size:16px;color:#475569">Introducing SlothUI, the design system tailored for entrepreneurs who like being lazy. Say goodbye to lengthy design processes and hello to efficient development.</p>
        <div style="display:flex;justify-content:center;gap:12px;margin-top:8px">
          <a href="#" style="background:#111827;color:#fff;padding:12px 18px;border-radius:12px;text-decoration:none">Download for Free</a>
          <a href="#" style="background:#eef2ff;color:#6366f1;padding:12px 18px;border-radius:12px;text-decoration:none">Sign in Today</a>
        </div>
      </section>
      <section style="margin-top:28px">
        <div style="border:1px solid #e5e7eb;border-radius:16px;box-shadow:0 8px 24px rgba(16,24,40,.12);overflow:hidden;background:#fff">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:16px">
            <div style="border:1px solid #f1f5f9;border-radius:12px;padding:16px">
              <div style="font-size:12px;color:#64748b;margin-bottom:8px">Audience</div>
              <div style="font-size:28px;color:#0f172a">1,878</div>
            </div>
            <div style="border:1px solid #f1f5f9;border-radius:12px;padding:16px">
              <div style="font-size:12px;color:#64748b;margin-bottom:8px">Visitors</div>
              <div style="font-size:28px;color:#0f172a">21,022</div>
            </div>
          </div>
          <div style="padding:16px">
            <div style="display:flex;gap:24px;align-items:center">
              <div style="flex:1;border:1px dashed #e2e8f0;border-radius:12px;height:180px"></div>
              <div style="width:220px;border:1px solid #f1f5f9;border-radius:12px;padding:12px">
                <div style="font-size:12px;color:#64748b;margin-bottom:8px">Global customers worldwide.</div>
                <div style="font-size:28px;color:#0f172a">98,2K</div>
              </div>
            </div>
          </div>
        </div>
        <div style="display:flex;justify-content:center;gap:32px;opacity:.9;color:#0f172a;margin-top:20px">
          <span>planetX</span><span>linez</span><span>blox</span><span>pwrup</span>
        </div>
      </section>
    </div>`;
    editor.setComponents(page);
  }
}
function _save() {
  const payload = {
    html: getHtmlWithCss(),
    theme: selectedTheme.value,
    page: selectedPage.value,
    seo: getSeoMeta(),
  };
  lastEmittedHtml.value = payload.html;
  emit("update:modelValue", payload.html);
  emit("save", payload);
  if (
    typeof window !== "undefined" &&
    window.parent &&
    window.parent !== window
  ) {
    try {
      const projectData = getProjectData();
      window.parent.postMessage(
        {
          source: "websitebuilder",
          type: "wb-save",
          payload: {
            ...payload,
            projectData,
          },
        },
        "*",
      );
    } catch {}
  }
}
function _undo() {
  try {
    editor?.UndoManager?.undo();
  } catch {}
}
function _redo() {
  try {
    editor?.UndoManager?.redo();
  } catch {}
}
function _applyHeaderLogoPosition() {
  if (!editor) return;
  const sel = editor.getSelected();
  if (!sel) return;
  const currentStyle = sel.getAttributes().style || "";
  const styleWithout = currentStyle
    .replace(/text-align:\s*[^;]+;?/g, "")
    .trim();
  const map: Record<string, string> = {
    Left: "left",
    "Middle Left": "left",
    Middle: "center",
    Right: "right",
  };
  const next =
    `${styleWithout}${styleWithout ? " " : ""}text-align: ${map[headerProps.value.logoPosition] || "left"};`.trim();
  sel.addAttributes({ style: next });
}
function _setHeaderMenuType(v: "dropdown" | "mega" | "drawer") {
  headerProps.value.menuType = v;
}
function _applyHeaderMenuPosition() {}
function _applyHeaderSeparator() {
  if (!editor) return;
  const sel = editor.getSelected();
  if (!sel) return;
  const current = sel.getAttributes().style || "";
  const without = current.replace(/border-bottom:\s*[^;]+;?/g, "").trim();
  const next = headerProps.value.showSeparator
    ? `${without}${without ? " " : ""}border-bottom: 1px solid #e5e7eb;`
    : without;
  sel.addAttributes({ style: next });
}

function _updateBackground() {
  if (!selectedComponent.value) return;
  const currentStyle = selectedComponent.value.getAttributes().style || "";
  const styleWithoutBg = currentStyle
    .replace(/background-color:\s*[^;]+;?/gi, "")
    .trim();
  const newStyle =
    `${styleWithoutBg}${styleWithoutBg ? " " : ""}background-color: ${backgroundColor.value};`.trim();
  selectedComponent.value.addAttributes({ style: newStyle });
}

function applyGlobalFont() {
  if (!editor) return;
  const css = `body{font-family:${globalFont.value};}`;
  editor?.Canvas.getDocument()
    ?.head?.querySelectorAll("style[data-global-font]")
    .forEach((el) => el.remove());
  const style = editor?.Canvas.getDocument()?.createElement("style");
  if (style) {
    style.setAttribute("data-global-font", "1");
    style.innerHTML = css;
    editor?.Canvas.getDocument()?.head?.appendChild(style);
  }
}
function applyGlobalTextColor() {
  if (!editor) return;
  const css = `body{color:${globalTextColor.value};}`;
  editor?.Canvas.getDocument()
    ?.head?.querySelectorAll("style[data-global-color]")
    .forEach((el) => el.remove());
  const style = editor?.Canvas.getDocument()?.createElement("style");
  if (style) {
    style.setAttribute("data-global-color", "1");
    style.innerHTML = css;
    editor?.Canvas.getDocument()?.head?.appendChild(style);
  }
}
function applyGlobalBg() {
  if (!editor) return;
  const wrapper = editor.getWrapper();
  wrapper?.addAttributes({ style: `background:${globalBgColor.value}` });
}
function applyGlobalSpacing() {
  if (!editor) return;
  const wrapper = editor.getWrapper();
  const current = wrapper?.getAttributes()?.style || "";
  const styleWithoutPadding = current.replace(/padding:\s*[^;]+;?/g, "").trim();
  const newStyle =
    `${styleWithoutPadding}${styleWithoutPadding ? " " : ""}padding: ${globalBaseSpacing.value}px;`.trim();
  wrapper?.addAttributes({ style: newStyle });
}

function setDevice(name: "mobile" | "tablet" | "desktop" | "large") {
  if (!editor) return;
  currentDevice.value = name;

  // Try standard API
  if (editor.setDevice) {
    editor.setDevice(name);
  }
  // Fallback to DeviceManager
  else if (editor.DeviceManager) {
    editor.DeviceManager.select(name);
  }

  // Force update
  editor.refresh && editor.refresh();
}

async function saveCompanyTemplate() {
  if (!editor || (isSuperAdmin.value && !isEmbed.value)) return;
  isSaving.value = true;
  try {
    const bodyHtml = cleanBuilderAttrs(editor.getHtml());
    const html = await getExportHtml("inline");
    const css = editor.getCss ? editor.getCss() : "";
    const assets =
      (editor.AssetManager?.getAll?.() as any[])?.map((a: any) => ({
        src: a?.get?.("src") || a?.src || "",
      })) || [];
    const gjs = {
      html: bodyHtml,
      projectData: getProjectData(),
      css,
      assets,
      headCss: collectCanvasStyles(false),
      headLinks: collectHeadLinks(),
      runtimeCode: collectRuntimeScriptCode(),
      headScripts: installedHeadScripts.value,
      bodyScripts: installedBodyScripts.value,
      meta: {
        source: lastImportedSnapshot.value ? "import" : "manual",
        baseUrl: lastImportedSnapshot.value?.baseUrl || "",
        savedAt: Date.now(),
      },
      snapshot: lastImportedSnapshot.value || null,
    };

    // Generate thumbnail
    const thumbnail = await generateTemplateThumbnail();

    const payload = {
      name: siteTitle.value || "Company Template",
      gjs,
      html,
      thumbnail,
    };

    if (!html.startsWith("<!doctype") && !html.startsWith("<html")) {
      console.warn(
        "WB Save: HTML does not start with doctype or html tag",
        html.slice(0, 100),
      );
      toast.warning("Cảnh báo: HTML xuất ra có thể không đầy đủ.");
    }

    lastSavePayload.value = payload;
    await websiteTemplateService.saveCompanyTemplate(payload);

    // If running in embed mode (e.g. inside Event Edit), notify parent to update the event
    if (
      isEmbed.value &&
      typeof window !== "undefined" &&
      window.parent &&
      window.parent !== window
    ) {
      try {
        let embedHtml = html;
        // Try to get inlined HTML for better fragment support in Event Description
        if (
          editor &&
          editor.Commands &&
          editor.Commands.has("gjs-get-inlined-html")
        ) {
          try {
            const inlined = editor.runCommand("gjs-get-inlined-html");
            // Only use inlined version if it's valid HTML or if we are okay with fragments
            // For Event Website, we usually want full HTML.
            // If inlined is a fragment but html is full, we might prefer html unless inlining is critical.
            // If inlined returns full HTML, use it.
            if (
              inlined &&
              (inlined.includes("<html") || inlined.includes("<!doctype"))
            ) {
              embedHtml = inlined;
            } else if (inlined) {
              // It's a fragment. If the original 'html' was full page, we probably want to keep 'html' structure
              // but maybe inject the inlined body?
              // For safety, let's stick to 'html' (which comes from getExportHtml and is full page)
              // unless we really need the fragment (which Event Description might).
              // But we can't easily distinguish here.
              // COMPROMISE: Send 'embedHtml' as inlined, but let the receiver (TemplatePopup) wrap it.
              // OR: Wrap it here.
              embedHtml = inlined;
            }
          } catch (e) {
            console.warn("Inlining failed", e);
          }
        }

        // Ensure embedHtml is not just a fragment if it's meant for a website
        // Check for basic structure
        if (
          embedHtml &&
          !/<html/i.test(embedHtml) &&
          !/<!doctype/i.test(embedHtml)
        ) {
          // It's a fragment.
          // If we have 'html' which IS full page, let's try to use that or wrap embedHtml.
          // Actually, getExportHtml("inline") already puts CSS in <style>.
          // gjs-get-inlined-html puts CSS in style attributes.
          // For a website, <style> is better (responsive).
          // So relying on 'html' (from getExportHtml) is actually better for Website.
          // The gjs-get-inlined-html override was likely added for Email/Description.
          // Let's use 'html' if it looks better.
          if (/<html/i.test(html)) {
            embedHtml = html;
          } else {
            embedHtml = `<!doctype html><html><head><meta charset="utf-8"></head><body>${embedHtml}</body></html>`;
          }
        }

        const projectData = getProjectData();
        window.parent.postMessage(
          {
            source: "websitebuilder",
            type: "wb-save",
            payload: {
              html: embedHtml,
              projectData,
              thumbnail, // Send the generated thumbnail to parent
              gjs,
            },
          },
          "*",
        );
      } catch (e) {
        console.error("Failed to post message to parent", e);
      }
    }

    let saveVerificationMismatch = false;
    let saveVerificationUnavailable = false;
    try {
      const fetched = await websiteTemplateService.getCompanyTemplate();
      const fj = fetched?.gjs || {};
      const okHtml = String(fj.html || "") === String(gjs.html || "");
      const okCss = String(fj.css || "") === String(gjs.css || "");
      const okHeadCss = String(fj.headCss || "") === String(gjs.headCss || "");
      const okScripts =
        JSON.stringify(fj.headScripts || []) ===
          JSON.stringify(gjs.headScripts || []) &&
        JSON.stringify(fj.bodyScripts || []) ===
          JSON.stringify(gjs.bodyScripts || []);
      const okLinks =
        JSON.stringify(fj.headLinks || []) ===
        JSON.stringify(gjs.headLinks || []);
      if (!(okHtml && okCss && okHeadCss && okScripts && okLinks)) {
        saveVerificationMismatch = true;
        toast.warning(
          "Đã gửi dữ liệu lưu nhưng bản đọc lại chưa khớp hoàn toàn. Vui lòng tải lại để kiểm tra.",
        );
        console.info("WB Save diff:", {
          okHtml,
          okCss,
          okHeadCss,
          okScripts,
          okLinks,
        });
      }
    } catch (verificationError) {
      saveVerificationUnavailable = true;
      console.warn("WB Save verification unavailable:", verificationError);
    }

    if (saveVerificationMismatch) {
      // The mismatch warning above is the only notification for this outcome.
    } else if (saveVerificationUnavailable) {
      try {
        toast.warning(
          "Đã gửi yêu cầu lưu website nhưng chưa xác minh được dữ liệu đọc lại. Vui lòng tải lại trang để kiểm tra.",
        );
      } catch {}
    } else {
      try {
        toast.success("Đã lưu website");
      } catch {}
    }
  } catch (e) {
    try {
      toast.error("Lỗi khi lưu website");
    } catch {}
  } finally {
    isSaving.value = false;
  }
}

async function openSaveSuperDialog() {
  showSaveSuperDialog.value = true;
  superTplName.value = siteTitle.value || "Template";
  superTplDesc.value = "";
}

async function confirmSaveSuperTemplate() {
  if (!editor || !isSuperAdmin.value) return;
  const name = String(
    superTplName.value || siteTitle.value || "Template",
  ).trim();
  try {
    const css = editor.getCss ? editor.getCss() : "";
    const gjs = {
      projectData: editor.getProjectData(),
      html: getHtmlWithCss(),
      css,
      headCss: collectCanvasStyles(false),
      headLinks: collectHeadLinks(),
      runtimeCode: collectRuntimeScriptCode(),
      headScripts: installedHeadScripts.value,
      bodyScripts: installedBodyScripts.value,
    };
    const thumbnail = await generateTemplateThumbnail();
    await websiteTemplateService.saveSuperTemplate({
      name,
      gjs,
      description: superTplDesc.value || "",
      thumbnail,
    });
    showSaveSuperDialog.value = false;
    try {
      toast.success("Đã lưu mẫu SuperAdmin");
    } catch {}
  } catch (e) {
    try {
      toast.error("Lỗi khi lưu mẫu SuperAdmin");
    } catch {}
  }
}

function stripHomepageHeaderFromHtml(html: string): string {
  if (!html) return html;
  let out = html;
  out = out.replace(
    /<header\b[^>]*data-role=["']?header["']?[^>]*>[\s\S]*?<\/header>/gi,
    "",
  );
  out = out.replace(
    /<header\b[^>]*class=["'][^"']*\bheader\b[^"']*["'][^>]*>[\s\S]*?<\/header>/gi,
    "",
  );
  out = out.replace(
    /<div\b[^>]*data-role=["']?header["']?[^>]*>[\s\S]*?<\/div>/gi,
    "",
  );
  out = out.replace(
    /<section\b[^>]*data-role=["']?header["']?[^>]*>[\s\S]*?<\/section>/gi,
    "",
  );
  return out;
}

async function saveHomepageTemplate() {
  if (!editor || !isSuperAdmin.value || isEmbed.value) return;
  isSaving.value = true;
  try {
    const bodyHtml = stripHomepageHeaderFromHtml(
      cleanBuilderAttrs(editor.getHtml()),
    );
    const exportHtmlRaw = stripHomepageHeaderFromHtml(
      await getExportHtml("inline"),
    );
    const marker = `<meta name="x-homepage-template" content="1">`;
    let exportHtml = exportHtmlRaw;
    if (!/x-homepage-template/i.test(exportHtml)) {
      if (/<head[^>]*>/i.test(exportHtml)) {
        exportHtml = exportHtml.replace(/<head[^>]*>/i, (m) => `${m}${marker}`);
      } else {
        exportHtml = `${marker}${exportHtml}`;
      }
    }
    const css = editor.getCss ? editor.getCss() : "";
    const gjs = {
      projectData: editor.getProjectData(),
      html: bodyHtml,
      exportHtml,
      css,
      headCss: collectCanvasStyles(false),
      headLinks: collectHeadLinks(),
      runtimeCode: collectRuntimeScriptCode(),
      headScripts: installedHeadScripts.value,
      bodyScripts: installedBodyScripts.value,
      meta: {
        mode: "homepage",
        savedAt: Date.now(),
      },
    };
    const thumbnail = await generateTemplateThumbnail();
    await websiteTemplateService.saveSuperTemplate({
      id: HOMEPAGE_TEMPLATE_ID,
      name: "Trang chủ",
      description: "Trang chủ",
      gjs,
      thumbnail,
    });
    try {
      toast.success("Đã lưu & xuất bản Homepage");
    } catch {}
  } catch {
    try {
      toast.error("Lỗi khi lưu Homepage");
    } catch {}
  } finally {
    isSaving.value = false;
  }
}

async function resetHomepageTemplate() {
  if (!editor || !isSuperAdmin.value || isEmbed.value) return;
  try {
    // Xác nhận trước khi khôi phục
    const ok =
      typeof window !== "undefined"
        ? window.confirm(
            "Khôi phục về bản gốc đã thiết lập? Thao tác này sẽ ghi đè nội dung hiện tại.",
          )
        : true;
    if (!ok) return;
    isSaving.value = true;
    try {
      await websiteTemplateService.resetSuperTemplate(HOMEPAGE_TEMPLATE_ID);
    } catch {
      // Nếu chưa có bản gốc, tạo bản gốc từ trạng thái hiện tại rồi reset lại
      await saveHomepageTemplate();
      await websiteTemplateService.setDefaultSuperTemplate(
        HOMEPAGE_TEMPLATE_ID,
      );
      await websiteTemplateService.resetSuperTemplate(HOMEPAGE_TEMPLATE_ID);
    }
    await loadHomepageTemplate();
    try {
      toast.success("Đã khôi phục về bản gốc");
    } catch {}
  } catch {
    try {
      toast.error("Không thể khôi phục");
    } catch {}
  } finally {
    isSaving.value = false;
  }
}

async function loadHomepageTemplate(): Promise<boolean> {
  if (!editor) return false;
  try {
    const tpl =
      await websiteTemplateService.getSuperTemplate(HOMEPAGE_TEMPLATE_ID);
    const gjs = (tpl as any)?.gjs || {};
    const html = typeof gjs.html === "string" ? gjs.html : "";
    const css = typeof gjs.css === "string" ? gjs.css : "";
    const headCss = String(gjs.headCss || gjs.headStyles || "");
    const headLinks = Array.isArray(gjs.headLinks) ? gjs.headLinks : [];
    const runtimeCode = String(gjs.runtimeCode || "");
    const headScripts = Array.isArray(gjs.headScripts) ? gjs.headScripts : [];
    const bodyScripts = Array.isArray(gjs.bodyScripts) ? gjs.bodyScripts : [];

    // Clear existing assets first
    clearImportedHeadAssets();

    // Prefer the GrapesJS snapshot, but recover from saved HTML/CSS if it
    // was produced by an incompatible editor version or cannot be restored.
    const restored = restoreTemplateContent({
      projectData: gjs.projectData,
      html,
      css,
      loadProjectData: (data) => editor.loadProjectData(data),
      setHtml: (value) => editor.setComponents(value),
      setCss: (value) => setCanvasImportCss(value),
    });
    if (!restored) return false;

    // Inject additional assets if available
    if (headCss) injectSavedHeadCss(headCss);
    if (headLinks.length > 0) injectSavedHeadLinks(headLinks);
    if (runtimeCode) injectSavedRuntime(runtimeCode);
    if (headScripts.length > 0) installSavedScripts(headScripts, "head");
    if (bodyScripts.length > 0) installSavedScripts(bodyScripts, "body");

    if (isHomepageMode.value) {
      try {
        const normalizeHomepageHtml = (input: string): string => {
          try {
            if (
              !input ||
              (!input.includes("hp-feature-grid") && !input.includes("hp-how"))
            ) {
              return input;
            }
            const parser = new DOMParser();
            const doc = parser.parseFromString(
              `<div id="__root__">${input}</div>`,
              "text/html",
            );
            const root = doc.getElementById("__root__");
            if (!root) return input;
            let changed = false;
            const grids = root.querySelectorAll(".hp-feature-grid");
            grids.forEach((grid) => {
              const directCards = Array.from(grid.children).filter((el) =>
                (el as HTMLElement)?.classList?.contains("hp-feature-card"),
              ) as HTMLElement[];
              directCards.forEach((cardEl) => {
                const item = doc.createElement("div");
                item.className = "hp-feature-item";
                const prev =
                  cardEl.previousElementSibling as HTMLElement | null;
                if (prev?.classList?.contains("hp-feature-iconWrap")) {
                  item.appendChild(prev);
                } else {
                  const icon = cardEl.querySelector(
                    ".hp-feature-iconWrap",
                  ) as HTMLElement | null;
                  if (icon) item.appendChild(icon);
                }
                grid.insertBefore(item, cardEl);
                item.appendChild(cardEl);
                changed = true;
              });
            });
            const howSections = root.querySelectorAll(".hp-how");
            howSections.forEach((sec) => {
              let banner = sec.querySelector(
                ":scope > .hp-how-banner",
              ) as HTMLElement | null;
              if (!banner) {
                const wrap = doc.createElement("div");
                wrap.className = "hp-how-banner";
                while (sec.firstChild) {
                  wrap.appendChild(sec.firstChild);
                }
                sec.appendChild(wrap);
                banner = wrap;
                changed = true;
              }
              try {
                const card = banner.querySelector(".hp-how-card");
                if (!card) return;
                if (card.querySelector(":scope > .hp-how-list")) return;
                const inner = card.querySelector(".hp-how-inner");
                if (!inner) return;
                const imgs = Array.from(
                  inner.querySelectorAll(".hp-how-leftItem img"),
                )
                  .map((img) => img.getAttribute("src") || "")
                  .filter(Boolean);
                const rows = Array.from(
                  inner.querySelectorAll(".hp-how-right .hp-how-row"),
                ) as HTMLElement[];
                if (!rows.length) return;
                const list = doc.createElement("div");
                list.className = "hp-how-list";
                rows.forEach((rowEl, idx) => {
                  const row = doc.createElement("div");
                  row.className = "hp-how-row";
                  const thumb = doc.createElement("div");
                  thumb.className = "hp-how-thumb";
                  const src = imgs[idx] || "";
                  if (src) {
                    const img = doc.createElement("img");
                    img.setAttribute("src", src);
                    img.setAttribute("alt", "");
                    thumb.appendChild(img);
                  }
                  row.appendChild(thumb);
                  const num = rowEl.querySelector(".hp-how-num");
                  const title = rowEl.querySelector(".hp-how-rowTitle");
                  const desc = rowEl.querySelector(".hp-how-rowDesc");
                  if (num) row.appendChild(num);
                  if (title) row.appendChild(title);
                  if (desc) row.appendChild(desc);
                  list.appendChild(row);
                });
                while (card.firstChild) card.removeChild(card.firstChild);
                card.appendChild(list);
                changed = true;
              } catch {}
            });
            return changed ? root.innerHTML : input;
          } catch {
            return input;
          }
        };
        const htmlNow = String(editor.getHtml?.() || "");
        const wrapped = normalizeHomepageHtml(htmlNow);
        if (wrapped !== htmlNow) {
          const cssNow = String(editor.getCss?.() || css || "");
          editor.setComponents(wrapped);
          if (cssNow) setCanvasImportCss(cssNow);
        }
      } catch {}
    }

    if (isHomepageMode.value) {
      try {
        const w = editor.getWrapper?.();
        if (w) {
          const hs = w.find?.("header") || [];
          const rs = w.find?.('[data-role="header"]') || [];
          [...hs, ...rs].forEach((c: unknown) => {
            try {
              (c as { remove?: () => void }).remove?.();
            } catch {}
          });
        }
      } catch {}
    }

    try {
      const htmlNow = String(editor.getHtml?.() || "").replace(/\s+/g, "");
      const w = editor.getWrapper?.();
      const comps = (
        w as unknown as { components?: () => { length?: number } }
      )?.components?.();
      const hasChildren =
        typeof comps?.length === "number" ? comps.length > 0 : true;
      if (!hasChildren || htmlNow.length < 20) return false;
    } catch {}

    try {
      rebindTicketBlocksAfterSuperApply();
    } catch {}
    injectSavedHeadCss(headCss);
    injectSavedHeadLinks(headLinks);
    injectSavedRuntime(runtimeCode);
    installSavedScripts(headScripts, "head");
    installSavedScripts(bodyScripts, "body");
    injectHomepageOverlayFixCss();
    return true;
  } catch {
    return false;
  }
}

async function openSuperTemplatePicker() {
  if (!canImportSuper.value) {
    try {
      toast.error("Bạn không có quyền sử dụng mẫu");
    } catch {}
    return;
  }
  showSuperTemplatesDialog.value = true;
  try {
    superTplLoading.value = true;
    superTemplatesMeta.value =
      await websiteTemplateService.listSuperTemplatesMeta();
  } catch {
  } finally {
    superTplLoading.value = false;
  }
}

function getThumbnailUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("data:") || path.startsWith("http")) return path;
  const base = apiClient.defaults.baseURL || "http://localhost:3000";
  const cleanBase = String(base).replace(/\/$/, "");
  const cleanPath = String(path).replace(/^\//, "");
  return `${cleanBase}/${cleanPath}`;
}

async function applySuperTemplate(id: string, manageLoading = true) {
  if (!editor) return;
  if (!canImportSuper.value) {
    try {
      toast.error("Bạn không có quyền import mẫu vào website");
    } catch {}
    return;
  }
  if (manageLoading) isApplyingTemplate.value = true;
  try {
    const tpl = await websiteTemplateService.getSuperTemplate(id);
    if (!tpl) return;

    const gjs = tpl.gjs || {};
    const h = String(gjs.html || "");
    const c = String(gjs.css || "");
    const headCss = String(gjs.headCss || gjs.headStyles || "");
    const headLinks = Array.isArray(gjs.headLinks) ? gjs.headLinks : [];
    const runtimeCode = String(gjs.runtimeCode || "");
    const headScripts = Array.isArray(gjs.headScripts) ? gjs.headScripts : [];
    const bodyScripts = Array.isArray(gjs.bodyScripts) ? gjs.bodyScripts : [];

    const projectData = gjs.projectData as any;
    const hasUsableProjectData = !!(
      projectData &&
      Array.isArray(projectData.pages) &&
      projectData.pages.length > 0 &&
      Array.isArray(projectData.pages[0]?.frames) &&
      projectData.pages[0].frames.length > 0 &&
      projectData.pages[0].frames[0]?.component
    );

    clearImportedHeadAssets();

    if (hasUsableProjectData) {
      editor.loadProjectData(projectData);
    } else if (h) {
      const bodyMatch = h.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      const htmlForCanvas = bodyMatch ? bodyMatch[1] : h;
      editor.setComponents(htmlForCanvas);
      if (c) {
        editor.setStyle(c);
        setCanvasImportCss(c);
      }
    } else {
      throw new Error("Template has no usable projectData or html");
    }

    try {
      rebindTicketBlocksAfterSuperApply();
    } catch {}

    if (headCss) injectSavedHeadCss(headCss);
    if (headLinks.length > 0) injectSavedHeadLinks(headLinks);
    if (runtimeCode) injectSavedRuntime(runtimeCode);
    if (headScripts.length > 0) installSavedScripts(headScripts, "head");
    if (bodyScripts.length > 0) installSavedScripts(bodyScripts, "body");

    editor.refresh();
    if (showPreview.value) {
      previewHtml.value = await buildPreviewHtml();
    }

    try {
      toast.success("Đã áp dụng mẫu Super");
    } catch {}
    showSuperTemplatesDialog.value = false;
  } catch {
    try {
      toast.error("Không áp dụng được mẫu");
    } catch {}
  } finally {
    if (manageLoading) isApplyingTemplate.value = false;
  }
}

async function deleteSuperTemplate(id: string) {
  try {
    if (!confirm("Bạn có chắc muốn xóa mẫu này?")) return;
    await websiteTemplateService.deleteSuperTemplate(id);
    superTemplatesMeta.value =
      await websiteTemplateService.listSuperTemplatesMeta();
    try {
      toast.success("Đã xóa mẫu");
    } catch {}
  } catch {
    try {
      toast.error("Không xóa được mẫu");
    } catch {}
  }
}

async function generateTemplateThumbnail(): Promise<string> {
  const placeholder =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
  try {
    if (!editor) return placeholder;
    const body = editor?.Canvas.getBody();
    if (!body) return placeholder;

    // Fetch and sanitize all external stylesheets to prevent html2canvas crashing on modern CSS features
    // like color(display-p3 ...) which it doesn't support.
    let sanitizedExternalCss = "";
    try {
      const doc = editor?.Canvas.getDocument();
      if (doc) {
        // Recursive function to fetch CSS and resolve @import
        const fetchedUrls = new Set<string>();
        const fetchCssRecursively = async (
          url: string,
          depth = 0,
        ): Promise<string> => {
          if (depth > 5 || fetchedUrls.has(url)) return "";
          fetchedUrls.add(url);
          try {
            let res = await fetch(url).catch(() => null);
            if (!res || !res.ok) {
              // Try proxy fallback for CORS issues
              try {
                const origin =
                  typeof window !== "undefined" ? window.location.origin : "";
                const cleanBase = String(origin).replace(/\/$/, "");
                let proxyUrl = url;
                if (!url.includes("/api/proxy/fetch")) {
                  proxyUrl = `${cleanBase}/api/proxy/fetch?url=${encodeURIComponent(
                    url,
                  )}`;
                } else if (url.startsWith("/api/proxy/fetch")) {
                  proxyUrl = `${cleanBase}${url}`;
                }
                res = await fetch(proxyUrl);
              } catch {}
            }

            if (!res || !res.ok) return "";
            let css = await res.text();

            // Resolve relative URLs in imports and fetch them
            const importRegex =
              /@import\s+(?:url\(['"]?([^'")]+)['"]?\)|['"]([^'"]+)['"]);?/gi;
            const imports: { match: string; url: string }[] = [];
            let match;
            while ((match = importRegex.exec(css)) !== null) {
              const relativeUrl = match[1] || match[2];
              try {
                const absoluteUrl = new URL(relativeUrl, url).href;
                imports.push({ match: match[0], url: absoluteUrl });
              } catch {}
            }

            for (const imp of imports) {
              const importedCss = await fetchCssRecursively(imp.url, depth + 1);
              // Replace the @import rule with the fetched content or empty string if failed
              css = css.replace(imp.match, importedCss || "");
            }

            // Resolve relative URLs in url(...) (images, fonts) to absolute URLs
            css = css.replace(/url\(['"]?([^'")]+)['"]?\)/gi, (m, p1) => {
              if (
                p1.startsWith("data:") ||
                p1.startsWith("http") ||
                p1.startsWith("//")
              )
                return m;
              try {
                const abs = new URL(p1, url).href;
                return `url("${abs}")`;
              } catch {
                return m;
              }
            });

            return css;
          } catch {
            return "";
          }
        };

        const links = Array.from(
          doc.querySelectorAll('link[rel="stylesheet"]'),
        ) as HTMLLinkElement[];
        const cssPromises = links.map((link) => {
          const href = link.href;
          if (!href) return Promise.resolve("");
          return fetchCssRecursively(href);
        });

        const cssContents = await Promise.all(cssPromises);
        let combinedCss = cssContents.join("\n");

        // Remove any remaining @import that failed or were missed to be safe
        combinedCss = combinedCss
          .replace(/@import\s+url\([^)]+\);?/gi, "")
          .replace(/@import\s+['"][^'"]+['"];?/gi, "");

        // Robust sanitization for color() functions and other modern features
        // We use a loop to handle deeply nested functions and multiple occurrences
        const sanitizeCss = (css: string) => {
          let clean = css
            // Remove @import to prevent uncontrolled fetching
            .replace(/@import\s+url\([^)]+\);?/gi, "")
            .replace(/@import\s+['"][^'"]+['"];?/gi, "");

          // Aggressively replace unsupported color functions
          // Matches: color( ... ), oklch( ... ), etc.
          // We replace them with a transparent color to prevent parsing errors
          const patterns = [
            "color",
            "color-mix",
            "oklch",
            "oklab",
            "lch",
            "lab",
            "hwb",
          ];

          // First pass: Simple replacement for non-nested cases (faster)
          const simpleRegex = new RegExp(
            `(${patterns.join("|")})\\s*\\([^)]+\\)`,
            "gi",
          );
          clean = clean.replace(simpleRegex, "rgba(0,0,0,0)");

          // Second pass: Loop to handle nested parentheses or complex cases
          // We look for the function name start, then find the matching closing parenthesis
          for (const func of patterns) {
            const startPattern = `${func}(`;
            let idx = clean.indexOf(startPattern);
            let loopGuard = 0;
            while (idx !== -1 && loopGuard < 1000) {
              let open = 1;
              let endIdx = idx + startPattern.length;
              while (open > 0 && endIdx < clean.length) {
                if (clean[endIdx] === "(") open++;
                else if (clean[endIdx] === ")") open--;
                endIdx++;
              }

              if (open === 0) {
                // Found the full function call, replace it
                const before = clean.substring(0, idx);
                const after = clean.substring(endIdx);
                clean = before + "rgba(0,0,0,0)" + after;
                // Search again from the same position (since we replaced text)
                idx = clean.indexOf(startPattern, idx);
              } else {
                // Malformed or too long, just skip this one to avoid infinite loop
                idx = clean.indexOf(startPattern, idx + 1);
              }
              loopGuard++;
            }
          }
          return clean;
        };

        sanitizedExternalCss = sanitizeCss(combinedCss);
      }
    } catch {}

    // Use html2canvas on the body with better options
    let canvas: HTMLCanvasElement | null = null;
    try {
      canvas = await html2canvas(body, {
        backgroundColor: "#ffffff",
        scale: 1,
        useCORS: true,
        allowTaint: false,
        logging: false,
        windowWidth: 1920,
        windowHeight: 1080,
        ignoreElements: (el) => {
          // Ignore script tags
          if (el.tagName.toLowerCase() === "script") return true;
          // Ignore external stylesheets because we inject them as sanitized inline styles
          if (
            el.tagName.toLowerCase() === "link" &&
            el.getAttribute("rel") === "stylesheet"
          )
            return true;
          return false;
        },
        onclone: (clonedDoc) => {
          try {
            Array.from(
              clonedDoc.querySelectorAll('link[rel="stylesheet"]'),
            ).forEach((el) => el.parentNode?.removeChild(el));
            // Helper to sanitize a string of CSS
            const sanitizeCss = (css: string) => {
              let clean = css
                .replace(/@import\s+url\([^)]+\);?/gi, "")
                .replace(/@import\s+['"][^'"]+['"];?/gi, "");

              const patterns = ["color", "oklch", "oklab", "lch", "lab", "hwb"];
              // Fast pass
              const simpleRegex = new RegExp(
                `(${patterns.join("|")})\\s*\\([^)]+\\)`,
                "gi",
              );
              clean = clean.replace(simpleRegex, "rgba(0,0,0,0)");

              // Detailed pass
              for (const func of patterns) {
                const startPattern = `${func}(`;
                let idx = clean.indexOf(startPattern);
                let loopGuard = 0;
                while (idx !== -1 && loopGuard < 1000) {
                  let open = 1;
                  let endIdx = idx + startPattern.length;
                  while (open > 0 && endIdx < clean.length) {
                    if (clean[endIdx] === "(") open++;
                    else if (clean[endIdx] === ")") open--;
                    endIdx++;
                  }
                  if (open === 0) {
                    clean =
                      clean.substring(0, idx) +
                      "rgba(0,0,0,0)" +
                      clean.substring(endIdx);
                    idx = clean.indexOf(startPattern, idx);
                  } else {
                    idx = clean.indexOf(startPattern, idx + 1);
                  }
                  loopGuard++;
                }
              }
              return clean;
            };

            // Inject the sanitized external CSS
            if (sanitizedExternalCss) {
              const s = clonedDoc.createElement("style");
              s.textContent = sanitizedExternalCss;
              clonedDoc.head.appendChild(s);
            }

            // Sanitize existing inline styles
            const styles = clonedDoc.querySelectorAll("style");
            styles.forEach((style) => {
              if (style.innerHTML) {
                style.innerHTML = sanitizeCss(style.innerHTML);
              }
            });

            // Sanitize style attributes
            const allElements = clonedDoc.querySelectorAll("*[style]");
            allElements.forEach((el) => {
              const s = el.getAttribute("style");
              if (s && /(color|oklch|oklab|lch|lab|hwb)\s*\(/.test(s)) {
                el.setAttribute("style", sanitizeCss(s));
              }
            });
          } catch {}
        },
      });
    } catch (e) {
      console.warn("html2canvas failed, trying fallback...", e);
    }

    if (canvas) {
      return cropToAspectAndResize(canvas, 1920, 1080);
    }

    // Fallback 1: dom-to-image
    try {
      const dataUrl = await domtoimage.toPng(body as any, {
        bgcolor: "#ffffff",
        width: 1920,
        height: 1080,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
        },
      });
      return dataUrl;
    } catch (e) {
      console.warn("dom-to-image failed, trying fallback 2...", e);
    }

    // Fallback 2: captureThumbnailViaForeignObject
    try {
      const data = await captureThumbnailViaForeignObject();
      if (data) return data;
    } catch (e) {
      console.warn("captureThumbnailViaForeignObject failed", e);
    }

    // Fallback 3: Return a transparent placeholder instead of null
    return placeholder;
  } catch (e) {
    console.error("Thumbnail generation error:", e);
    return placeholder;
  }
}

function cropToAspectAndResize(
  source: HTMLCanvasElement,
  targetW = 1920,
  targetH = 1080,
): string {
  const srcW = source.width;
  const srcH = source.height;
  const aspect = targetW / targetH;
  let cropW: number, cropH: number;
  if (srcW / srcH > aspect) {
    cropH = srcH;
    cropW = Math.round(srcH * aspect);
  } else {
    cropW = srcW;
    cropH = Math.round(srcW / aspect);
  }
  const sx = Math.max(0, Math.floor((srcW - cropW) / 2));
  // Force top alignment for website thumbnails (show header/hero)
  const sy = 0;
  const out = document.createElement("canvas");
  out.width = targetW;
  out.height = targetH;
  const ctx = out.getContext("2d");
  if (ctx) ctx.drawImage(source, sx, sy, cropW, cropH, 0, 0, targetW, targetH);
  return out.toDataURL("image/png", 0.92);
}

async function captureThumbnailViaForeignObject(): Promise<string | null> {
  try {
    if (!editor) return null;
    const d = editor?.Canvas.getDocument();
    const b = editor?.Canvas.getBody();
    if (!d || !b) return null;
    const clone = b.cloneNode(true) as HTMLElement;
    const walkerOrig = d.createTreeWalker(
      b,
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
    );
    const walkerClone = d.createTreeWalker(
      clone,
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
    );
    const props = [
      "color",
      "background-color",
      "font-family",
      "font-size",
      "font-weight",
      "font-style",
      "line-height",
      "letter-spacing",
      "text-transform",
      "text-decoration",
      "text-align",
      "white-space",
      "border-top-width",
      "border-top-style",
      "border-top-color",
      "border-right-width",
      "border-right-style",
      "border-right-color",
      "border-bottom-width",
      "border-bottom-style",
      "border-bottom-color",
      "border-left-width",
      "border-left-style",
      "border-left-color",
      "border-radius",
      "box-sizing",
      "display",
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "flex-direction",
      "flex-wrap",
      "align-items",
      "justify-content",
      "gap",
      "grid-template-columns",
      "grid-template-rows",
      "grid-column",
      "grid-row",
      "width",
      "height",
      "max-width",
      "min-width",
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",
      "transform",
      "opacity",
      "overflow",
      "object-fit",
    ];
    const sanitizeCssInline = (css: string) => {
      let clean = String(css || "");
      clean = clean
        .replace(/@import\s+url\([^)]+\);?/gi, "")
        .replace(/@import\s+['"][^'"]+['"];?/gi, "");
      const patterns = [
        "color",
        "color-mix",
        "oklch",
        "oklab",
        "lch",
        "lab",
        "hwb",
      ];
      const simpleRegex = new RegExp(
        `(${patterns.join("|")})\\s*\\([^)]+\\)`,
        "gi",
      );
      clean = clean.replace(simpleRegex, "rgba(0,0,0,0)");
      for (const func of patterns) {
        const startPattern = `${func}(`;
        let idx = clean.indexOf(startPattern);
        let guard = 0;
        while (idx !== -1 && guard < 1000) {
          let open = 1;
          let end = idx + startPattern.length;
          while (open > 0 && end < clean.length) {
            if (clean[end] === "(") open++;
            else if (clean[end] === ")") open--;
            end++;
          }
          if (open === 0) {
            clean =
              clean.substring(0, idx) + "rgba(0,0,0,0)" + clean.substring(end);
            idx = clean.indexOf(startPattern, idx);
          } else {
            idx = clean.indexOf(startPattern, idx + 1);
          }
          guard++;
        }
      }
      return clean;
    };
    while (true) {
      const o = walkerOrig.nextNode();
      const c = walkerClone.nextNode();
      if (!o || !c) break;
      if (o.nodeType === 1 && c.nodeType === 1) {
        const el = o as Element;
        const ec = c as Element;
        const cs = d.defaultView?.getComputedStyle(el);
        if (cs) {
          const styleParts: string[] = [];
          for (const p of props) {
            const v = cs.getPropertyValue(p);
            if (v) styleParts.push(`${p}:${v}`);
          }
          styleParts.push("background-image:none");
          styleParts.push("box-shadow:none");
          styleParts.push("outline:none");
          ec.setAttribute("style", sanitizeCssInline(styleParts.join(";")));
        }
      }
    }
    Array.from(clone.querySelectorAll('style,link[rel="stylesheet"]')).forEach(
      (n) => n.parentNode?.removeChild(n),
    );
    const w = 1920;
    const h = 1080;
    const wrap = d.createElement("div");
    wrap.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
    wrap.style.width = `${w}px`;
    wrap.style.height = `${h}px`;
    wrap.appendChild(clone);
    const xml = new XMLSerializer().serializeToString(wrap);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><foreignObject width="100%" height="100%">${xml}</foreignObject></svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("svg-image-error"));
      img.src = url;
    });
    if (ctx) ctx.drawImage(img, 0, 0, w, h);
    URL.revokeObjectURL(url);
    return canvas.toDataURL("image/png", 0.92);
  } catch {
    return null;
  }
}

function injectSavedHeadCss(css: string) {
  try {
    if (!editor || !css) return;
    const d = editor?.Canvas.getDocument();
    d?.head
      ?.querySelectorAll("style[data-saved-head-css]")
      ?.forEach((el) => el.remove());
    const style = d?.createElement("style");
    if (!style) return;
    style.setAttribute("data-saved-head-css", "1");
    style.textContent = sanitizeImportedCssForPreview(css);
    d?.head?.appendChild(style);
  } catch {}
}

function injectHomepageOverlayFixCss() {
  try {
    if (!editor || !isHomepageMode.value) return;
    const d = editor?.Canvas.getDocument();
    d?.head
      ?.querySelectorAll("style[data-homepage-overlay-fix]")
      ?.forEach((el) => el.remove());
    const style = d?.createElement("style");
    if (!style) return;
    style.setAttribute("data-homepage-overlay-fix", "1");
    style.textContent = [
      ".hp-section>h2,.hp-section>p{position:relative !important;z-index:5 !important;}",
      ".hp-feature-grid{position:relative !important;z-index:1 !important;}",
      ".hp-feature-item{position:relative !important;--hp-feature-icon-top:10px !important;padding-top:calc(56px + var(--hp-feature-icon-top,10px)) !important;}",
      ".hp-feature-card{position:relative !important;z-index:1 !important;}",
      ".hp-feature-iconWrap{z-index:2 !important;top:max(0px,var(--hp-feature-icon-top,10px)) !important;}",
      ".hp-how{margin-top:18px !important;position:relative !important;width:100vw !important;margin-left:calc(50% - 50vw) !important;background:url(/assets/home/SECTION/Artboard%209@4x-100.jpg) center/cover no-repeat !important;padding:32px 0 !important;}",
      '.hp-how::before{content:"" !important;position:absolute !important;inset:0 !important;background:rgba(2,6,23,.55) !important;}',
      ".hp-how-banner{position:relative !important;z-index:1 !important;max-width:1440px !important;margin:0 auto !important;padding:0 16px !important;background:transparent !important;border-radius:0 !important;overflow:visible !important;}",
      ".hp-how-list{display:flex !important;flex-direction:column !important;}",
      ".hp-how-row{display:grid !important;grid-template-columns:220px 88px 160px 1fr !important;gap:14px !important;align-items:center !important;padding:10px 14px !important;}",
      ".hp-how-row+.hp-how-row{border-top:1px solid rgba(15,23,42,.08) !important;}",
      ".hp-how-thumb{height:82px !important;border-radius:14px !important;overflow:hidden !important;background:#e5e7eb !important;border:1px solid rgba(15,23,42,.08) !important;}",
      ".hp-how-thumb img{width:100% !important;height:100% !important;object-fit:cover !important;display:block !important;}",
      "@media (max-width: 768px){.hp-how-row{grid-template-columns:140px 74px 1fr !important;grid-template-rows:auto auto !important;align-items:center !important;padding:10px 12px !important;}.hp-how-thumb{grid-row:1/3 !important;}.hp-how-num{grid-row:1/3 !important;font-size:40px !important;align-self:center !important;}.hp-how-rowTitle{grid-column:3 !important;}.hp-how-rowDesc{grid-column:3 !important;}}",
    ].join("");
    d?.head?.appendChild(style);
  } catch {}
}

function sanitizeImportedCssForPreview(css: string): string {
  try {
    if (!css) return css || "";
    let out = css;
    // Remove problematic AOS rule that hides fade elements
    // Matches selectors like: html:not(.no-js) [data-aos^="fade"][data-aos^="fade"] { opacity: 0; ... }
    const reAos =
      /\bhtml\s*:?\s*not\(\s*\.no-js\s*\)\s*\[data-aos\^\s*=\s*["']?fade["']?\]\s*\[data-aos\^\s*=\s*["']?fade["']?\]\s*\{[^}]*\}/gi;
    out = out.replace(reAos, "");
    // Fallback: remove any block that sets opacity:0 for double fade selector even without html:not(.no-js)
    const reAosFallback =
      /\[data-aos\^\s*=\s*["']?fade["']?\]\s*\[data-aos\^\s*=\s*["']?fade["']?\]\s*\{[^}]*opacity\s*:\s*0[^}]*\}/gi;
    out = out.replace(reAosFallback, "");
    return out;
  } catch {
    return css || "";
  }
}

function injectSavedRuntime(code: string) {
  try {
    if (!editor || !code) return;
    const d = editor?.Canvas.getDocument();
    d?.head
      ?.querySelectorAll("script[data-saved-runtime]")
      ?.forEach((el) => el.remove());
    const s = d?.createElement("script");
    if (!s) return;
    s.setAttribute("data-saved-runtime", "1");
    const wrapped =
      `(function(){` +
      `var prev=window.onerror;` +
      `window.onerror=function(msg,url,line,col,error){` +
      `try{if(typeof msg==='string'&&((msg.indexOf("innerHTML")>-1&&msg.indexOf("null")>-1)||msg.indexOf("initSwiper")>-1||msg.indexOf("isSpider")>-1)){console.warn("[WebsiteBuilder] Suppressed 3rd party script error:",msg);return true;}}catch(_){}return prev?prev.apply(this,arguments):false;};` +
      `try{` +
      `var prevUR = window.onunhandledrejection;` +
      `var handlerUR = function(e){` +
      `try{var reason = e && (e.reason || e.detail); var msg = String((reason && (reason.message || reason)) || '');` +
      `if(typeof msg==='string' && (msg.indexOf("isSpider")>-1 || msg.indexOf("initSwiper")>-1)){console.warn("[WebsiteBuilder] Suppressed unhandledrejection:", msg); e && e.preventDefault && e.preventDefault(); return true;}}catch(_){}return false;};` +
      `window.addEventListener('unhandledrejection', handlerUR);` +
      `if (prevUR) { window.onunhandledrejection = prevUR; }` +
      `}catch(_){}` +
      `try{` +
      String(code) +
      `}catch(e){try{var msg=String((e&&e.message)||'');if(typeof msg==='string'&&((msg.indexOf("innerHTML")>-1&&msg.indexOf("null")>-1)||msg.indexOf("initSwiper")>-1||msg.indexOf("isSpider")>-1)){console.warn("[WebsiteBuilder] Suppressed 3rd party script error:",msg);}else{console.error("[WebsiteBuilder] Runtime error:",e);}}catch(_){}}` +
      `})();`;
    s.textContent = wrapped;
    d?.head?.appendChild(s);
  } catch {}
}

async function togglePreview() {
  if (!editor) return;
  showPreview.value = !showPreview.value;
  if (showPreview.value) previewHtml.value = await buildPreviewHtml();
  try {
    const docCanvas = editor?.Canvas.getDocument();
    const editStyle = docCanvas.querySelector('style[data-symp="edit"]');
    if (showPreview.value) {
      if (editStyle) editStyle.parentNode?.removeChild(editStyle);
    } else {
      // Do not block pointer events in edit mode
    }
  } catch {}
}
async function _share() {
  if (!editor) return;
  showPreview.value = true;
  previewHtml.value = await buildPreviewHtml();
}
const lastEmittedHtml = ref("");
async function syncHtml() {
  if (!editor) return;
  const html = editor.getHtml();
  lastEmittedHtml.value = html || "";
  emit("update:modelValue", html || "");
  if (showPreview.value) previewHtml.value = await buildPreviewHtml();
}
const syncHtmlDebounced = debounce(syncHtml, 300, {
  leading: false,
  trailing: true,
});
function getHtmlWithCss() {
  if (!editor) return "";
  try {
    const css = collectCanvasStyles(true);
    let html = editor.getHtml();
    html = cleanBuilderAttrs(html);

    const links = collectHeadLinks();
    const linkTags = links
      .map((l) => `<link rel="stylesheet" href="${escapeHtmlAttribute(l.href)}">`)
      .join("\n");

    const genScript = composeExportScriptTag;

    const headScripts = installedHeadScripts.value.map(genScript).join("\n");
    const bodyScripts = installedBodyScripts.value.map(genScript).join("\n");

    const runtime = collectRuntimeScriptCode();
    const runtimeScript = runtime ? `${scOpen}>${runtime}${scClose}` : "";

    const combinedHead = [linkTags, headScripts, runtimeScript]
      .filter(Boolean)
      .join("\n");

    return composeHtmlWithCss({
      head: combinedHead,
      css,
      html,
      bodyScripts,
    });
  } catch {
    return editor ? editor.getHtml() : "";
  }
}
async function wbUploadCss(text: string): Promise<string> {
  const cacheKey = await wbComputeTextSha256(text || "");
  const globalWin = window as unknown as {
    __wbCssUploadCache?: Map<string, string>;
  };
  const g = globalWin.__wbCssUploadCache;
  const cssUploadCache: Map<string, string> =
    g && g instanceof Map ? g : new Map<string, string>();
  globalWin.__wbCssUploadCache = cssUploadCache;
  const cached = cssUploadCache.get(cacheKey);
  if (cached) return cached;
  const blob = new Blob([text || ""], { type: "text/css" });
  const ts = Date.now();
  const name = `style-${ts}.css`;
  const file = new File([blob], name, { type: "text/css" });
  const folder = `website/${companyId.value || "default"}/css`;
  const url = await mediaService.upload(file, folder);
  cssUploadCache.set(cacheKey, url);
  return url;
}
async function wbComputeTextSha256(text: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(text || "");
  const digest = await crypto.subtle.digest("SHA-256", data);
  const bytes = Array.from(new Uint8Array(digest));
  return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function getExportHtml(
  mode: "inline" | "linked" = "linked",
  opts?: {
    includeLinks?: boolean;
    includeScripts?: boolean;
    includeRuntime?: boolean;
  },
) {
  if (!editor) return "";
  try {
    const html = cleanBuilderAttrs(editor.getHtml());
    const css = collectCanvasStyles(true);
    const headLinks = collectHeadLinks();
    const pageMeta = collectPageMeta();
    const linkTags =
      opts?.includeLinks === false
        ? ""
        : headLinks
            .map((l) => `<link rel="stylesheet" href="${escapeHtmlAttribute(l.href)}">`)
            .join("\n");

    const headBase = `<meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`;
    const runtime =
      opts?.includeRuntime === false ? "" : collectRuntimeScriptCode();
    const scOpen = "<scr" + "ipt";
    const scClose = "</scr" + "ipt>";

    const genScript = composeExportScriptTag;

    const headScripts =
      opts?.includeScripts === false
        ? ""
        : installedHeadScripts.value.map(genScript).join("\n");
    const mobileToggleScript = `${scOpen}>(function(){document.addEventListener('click',function(e){var t=e.target.closest('.wb-mobile-toggle');if(t){var c=t.closest('.wb-header-container');if(c)c.classList.toggle('is-open');}});})();${scClose}`;
    const anchorScrollScript = `${scOpen}>(function(){document.addEventListener('click',function(e){var a=e.target.closest('a[href^=\"#\"]');if(!a)return;var href=a.getAttribute('href')||'';if(!href||href==='#')return;var id=href.slice(1);var t=document.getElementById(id)||document.querySelector('[name=\"'+id+'\"]');if(t){e.preventDefault();try{t.scrollIntoView({behavior:'smooth',block:'start'});}catch(_){t.scrollIntoView(true);}var c=a.closest('.wb-header-container');if(c&&c.classList.contains('is-open'))c.classList.remove('is-open');}});})();${scClose}`;

    const bodyScripts = composeExportBodyScripts({
      includeScripts: opts?.includeScripts !== false,
      installedScripts: installedBodyScripts.value.map(genScript).join("\n"),
      mobileToggleScript,
      anchorScrollScript,
    });

    let baseUrl = "";
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (apiUrl && apiUrl.startsWith("http")) {
        baseUrl = new URL(apiUrl).origin;
      } else {
        baseUrl = window.location.origin;
      }
    } catch (e) {
      baseUrl = window.location.origin;
    }

    const popupScript =
      opts?.includeScripts === false
        ? ""
        : `${scOpen} src="${escapeHtmlAttribute(baseUrl)}/ticketing/popup.js?v=${Date.now()}">${scClose}\n${scOpen} src="${escapeHtmlAttribute(baseUrl)}/ticketing/render-tickets.js?v=${Date.now()}">${scClose}`;

    let cssOutput = "";
    if (css && css.trim()) {
      if (mode === "inline") {
        cssOutput = `<style>${css}</style>`;
      } else {
        const uploadedCssUrl = await wbUploadCss(css);
        cssOutput = `<link rel="stylesheet" href="${escapeHtmlAttribute(uploadedCssUrl)}">`;
      }
    }

    const head = `${headBase}${pageMeta}${linkTags}${cssOutput}${
      runtime ? `${scOpen}>${runtime}${scClose}` : ""
    }${popupScript}${headScripts}`;

    const doc = editor?.Canvas.getDocument();
    const lang = doc?.documentElement?.getAttribute("lang") || "en";

    return `<!doctype html><html lang="${escapeHtmlAttribute(lang)}"><head>${head}</head><body>${html}${bodyScripts}</body></html>`;
  } catch (e) {
    console.error("getExportHtml failed:", e);
    const fallbackHtml = editor ? editor.getHtml() : "";
    return `<!doctype html><html><head><meta charset="utf-8"></head><body>${fallbackHtml}</body></html>`;
  }
}

function collectCanvasStyles(includeEditor = true) {
  if (!editor) return "";
  try {
    const d = editor?.Canvas.getDocument();
    // Collect all styles
    // We want to be inclusive to ensure we capture everything, including imported CSS
    const styles = Array.from(d?.head?.querySelectorAll("style") || []);

    // We used to filter out data-import-url, but we MUST include it to persist scraped CSS
    const relevantStyles = styles;

    const cssFromHead = relevantStyles
      .map((s) => s.innerHTML || "")
      .join("\n\n");

    if (!includeEditor) return cssFromHead;

    const cssFromEditor = editor.getCss ? editor.getCss() : "";
    const combined = [cssFromHead, cssFromEditor].filter(Boolean).join("\n\n");
    return sanitizeImportedCssForPreview(combined);
  } catch {
    try {
      return editor.getCss ? editor.getCss() : "";
    } catch {
      return "";
    }
  }
}
function collectRuntimeScriptCode() {
  try {
    const d = editor?.Canvas.getDocument();
    const wb = d?.head?.querySelector("script[data-wb-runtime]");
    const saved = Array.from(
      d?.head?.querySelectorAll("script[data-saved-runtime]") || [],
    )
      .map((s) => s.textContent || "")
      .filter((t) => t && t.trim())
      .join("\n");
    const base = wb?.textContent || "";
    return [base, saved].filter((t) => t && t.trim()).join("\n");
  } catch {
    return "";
  }
}
function collectHeadLinks() {
  if (!editor) return [];
  try {
    const d = editor?.Canvas.getDocument();
    const links = Array.from(
      d?.head?.querySelectorAll("link[rel='stylesheet']") || [],
    );
    return links
      .map((l) => ({ href: l.getAttribute("href") || "" }))
      .filter((l) => l.href);
  } catch {
    return [];
  }
}
function collectPageMeta() {
  if (!editor) return "";
  try {
    const d = editor?.Canvas.getDocument();
    const head = d?.head;
    if (!head) return "";

    const title = d?.title ? `<title>${d.title}</title>` : "";

    // Collect meta tags that are not charset or viewport
    const metas = Array.from(head.querySelectorAll("meta"))
      .map((m) => m.outerHTML)
      .filter(
        (h) => !h.includes('charset="utf-8"') && !h.includes('name="viewport"'),
      )
      .join("\n");

    // Collect canonical and icon links
    const links = Array.from(
      head.querySelectorAll("link[rel='canonical'], link[rel='icon']"),
    )
      .map((l) => l.outerHTML)
      .join("\n");

    return [title, metas, links].filter(Boolean).join("\n");
  } catch {
    return "";
  }
}
function injectSavedHeadLinks(links: { href: string }[]) {
  try {
    importedHeadLinksPersistent = Array.isArray(links) ? links.filter((l) => !!l?.href).map((l) => ({ href: String(l.href) })) : [];
    if (!editor || !links || !links.length) return;
    const d = editor?.Canvas.getDocument();
    d?.head
      ?.querySelectorAll("link[data-saved-link]")
      ?.forEach((el) => el.remove());
    links.forEach((l) => {
      if (!l.href) return;
      const link = d?.createElement("link");
      if (!link) return;
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", l.href);
      link.setAttribute("data-saved-link", "1");
      d?.head?.appendChild(link);
    });
  } catch {}
}
async function buildPreviewHtml(): Promise<string> {
  return getExportHtml("inline", {
    includeLinks: true,
    includeScripts: true,
    includeRuntime: true,
  });
}

async function hydrateImportedStylesheets(
  links: { href: string }[],
  baseUrl = "",
): Promise<string> {
  wbDebug("hydrateImportedStylesheets:START", { count: links?.length || 0, baseUrl });
  if (!editor || !links?.length) { wbDebugWarn("hydrateImportedStylesheets: missing editor or links"); return ""; }
  const d = editor?.Canvas.getDocument();
  if (!d?.head) return "";

  const apiBase = String(apiClient.defaults.baseURL || "").replace(/\/?$/, "");
  const hydratedCss: string[] = [];

  // External <link rel="stylesheet"> can be blocked/slow inside the GrapesJS
  // iframe (CSP, proxy, relative asset paths). Fetch the stylesheet through the
  // same proxy used by imported JS and inline it as a deterministic fallback.
  for (const item of links) {
    const href = resolveImportedUrl(String(item?.href || ""), baseUrl);
    if (!href || /^(data:|blob:)/i.test(href)) continue;
    if (/^https?:\/\/fonts\.(googleapis|gstatic)\.com/i.test(href)) continue;

    const already = d.head.querySelector(
      `style[data-imported-stylesheet="${CSS.escape(href)}"]`,
    );
    if (already) continue;

    try {
      const proxy = `${apiBase}/api/proxy/fetch?url=${encodeURIComponent(href)}`;
      wbDebug("CSS FETCH", { href, proxy });
      const res = await fetch(proxy, { credentials: "include" });
      if (!res.ok) { wbDebugWarn("CSS FETCH FAILED", { href, status: res.status }); continue; }
      const text = await res.text();
      wbDebug("CSS FETCH OK", { href, status: res.status, chars: text.length, contentType: res.headers.get("content-type") });      if (!text || /<html[\s>]/i.test(text.slice(0, 500))) continue;

      let css = text;
      // Make relative @import and url(...) references independent of the
      // GrapesJS iframe document URL.
      css = css.replace(
        /@import\s+(?:url\(\s*)?(["']?)([^"')\s]+)\1(\s*\))?([^;]*);?/gi,
        (m, q, u, close, tail) => {
          try {
            const abs = new URL(String(u || ""), href).toString();
            return `@import url("${abs}")${tail || ""};`;
          } catch {
            return m;
          }
        },
      );
      css = css.replace(
        /url\(\s*(["']?)(?!data:|blob:|https?:|\/\/|#)([^"')]+)\1\s*\)/gi,
        (m, q, u) => {
          try {
            const abs = new URL(String(u || "").trim(), href).toString();
            return `url("${abs}")`;
          } catch {
            return m;
          }
        },
      );

      const normalizedCss = sanitizeImportedCssForPreview(css);
      const style = d.createElement("style");
      style.setAttribute("data-imported-stylesheet", href);
      style.textContent = normalizedCss;
      d.head.appendChild(style);
      wbDebug("CSS HYDRATED APPENDED", { href, chars: normalizedCss.length });
      hydratedCss.push(normalizedCss);
    } catch (e) {
      console.warn("[WebsiteBuilder] Stylesheet hydration failed:", href, e);
    }
  }
  return hydratedCss.join("\n\n");
}

function clearImportedHeadAssets() {
  stopTailwindRuntimeCssSync();
  tailwindRuntimeFrozen = false;
  tailwindRuntimeCssCache = "";
  importedEditorCssPersistent = "";
  importedHeadLinksPersistent = [];
  importedBaseUrlPersistent = "";
  if (!editor) return;
  const d = editor?.Canvas.getDocument();
  if (!d) return;

  d.head?.querySelectorAll("style[data-import-url]").forEach((el) => el.remove());
  d.head?.querySelectorAll("style[data-imported-stylesheet]").forEach((el) => el.remove());
  d.head?.querySelectorAll("style[data-aos-override]").forEach((el) => el.remove());
  d.head?.querySelectorAll("style[data-saved-head-css]").forEach((el) => el.remove());
  d.head?.querySelectorAll("link[data-saved-link]").forEach((el) => el.remove());
  d.head?.querySelectorAll("script[data-import-script]").forEach((el) => el.remove());
  d.head?.querySelectorAll("script[data-import-seq]").forEach((el) => el.remove());
  d.head?.querySelectorAll("script[data-import-inline]").forEach((el) => el.remove());
  d.head?.querySelectorAll('script[data-saved-script="head"]').forEach((el) => el.remove());
  d.body?.querySelectorAll('script[data-saved-script="body"]').forEach((el) => el.remove());
  d.head?.querySelectorAll("script[data-saved-runtime]").forEach((el) => el.remove());
}

function setCanvasImportCss(css: string, baseUrl = "") {
  wbDebug("setCanvasImportCss", { chars: String(css || "").length, baseUrl });
  importedEditorCssPersistent = String(css || "");
  importedBaseUrlPersistent = baseUrl || importedBaseUrlPersistent || "";
  if (!editor) return;
  const d = editor?.Canvas.getDocument();
  if (!d) return;

  d.head
    ?.querySelectorAll("style[data-import-url]")
    .forEach((el) => el.remove());

  let resolvedCss = String(css || "");
  // CSS inside an imported page must resolve relative @import URLs against
  // the original page, not against the GrapesJS iframe URL. Without this,
  // pages that use relative CSS imports silently lose most of their styling.
  if (baseUrl) {
    resolvedCss = resolvedCss.replace(
      /@import\s+(?:url\(\s*)?([\"']?)([^\"')\s]+)\1(\s*\))?([^;]*);?/gi,
      (match, quote, url, close, tail) => {
        try {
          const abs = new URL(String(url || ""), baseUrl).toString();
          return `@import url(\"${abs}\")${tail || ""};`;
        } catch {
          return match;
        }
      },
    );
  }

  const style = d.createElement("style");
  style.setAttribute("data-import-url", "1");
  style.textContent = sanitizeImportedCssForPreview(resolvedCss);
  d.head.appendChild(style);

  d.head
    ?.querySelectorAll("style[data-aos-override]")
    .forEach((el) => el.remove());
  const ov = d.createElement("style");
  ov.setAttribute("data-aos-override", "1");
  ov.textContent =
    'html:not(.no-js) [data-aos^="fade"][data-aos^="fade"]{opacity:1 !important;}';
  d.head.appendChild(ov);
}

function resolveImportedUrl(value: string, baseUrl = ""): string {
  const raw = String(value || "").trim();
  if (!raw) return raw;
  if (/^(data:|blob:|javascript:|mailto:|tel:|#)/i.test(raw)) return raw;
  try {
    const base = baseUrl || document.baseURI || window.location.href;
    return new URL(raw, base).toString();
  } catch {
    return raw;
  }
}
async function installImportedScripts(
  jsList: { src: string; type?: string }[],
  baseUrl: string,
) {
  if (!editor) return;
  const d = editor?.Canvas.getDocument();
  d?.head
    ?.querySelectorAll("script[data-import-script]")
    ?.forEach((el) => el.remove());
  const base = apiClient.defaults.baseURL || "";
  for (const item of jsList) {
    try {
      const absUrl = new URL(item.src, baseUrl).toString();
      const cleanBase = String(base).replace(/\/?$/, "");
      let proxied = absUrl;
      if (!absUrl.includes("/api/proxy/fetch")) {
        proxied = `${cleanBase}/api/proxy/fetch?url=${encodeURIComponent(absUrl)}`;
      } else if (absUrl.startsWith("/api/proxy/fetch")) {
        proxied = `${cleanBase}${absUrl}`;
      }
      const res = await fetch(proxied, { credentials: "include" });
      const code = await res.text();
      const s = d?.createElement("script");
      if (!s) continue;
      s.setAttribute("data-import-script", "1");
      if (String(item.type || "").toLowerCase() === "module") {
        const rewritten = code
          .replace(
            /(import\s+[^'"\n]+['"])([^'"\n]+)(['"])/g,
            (m, a, spec, b) => {
              try {
                const u = new URL(spec, absUrl).toString();
                const cleanBase = String(base).replace(/\/?$/, "");
                if (u.includes("/api/proxy/fetch")) return a + u + b;
                return (
                  a +
                  `${cleanBase}/api/proxy/fetch?url=${encodeURIComponent(u)}` +
                  b
                );
              } catch {
                return m;
              }
            },
          )
          .replace(/(from\s+['"])([^'"\n]+)(['"])/g, (m, a, spec, b) => {
            try {
              const u = new URL(spec, absUrl).toString();
              const cleanBase = String(base).replace(/\/?$/, "");
              if (u.includes("/api/proxy/fetch")) return a + u + b;
              return (
                a +
                `${cleanBase}/api/proxy/fetch?url=${encodeURIComponent(u)}` +
                b
              );
            } catch {
              return m;
            }
          })
          .replace(
            /(import\(\s*['"])([^'"\n]+)(['"]\s*\))/g,
            (m, a, spec, b) => {
              try {
                const u = new URL(spec, absUrl).toString();
                const cleanBase = String(base).replace(/\/?$/, "");
                if (u.includes("/api/proxy/fetch")) return a + u + b;
                return (
                  a +
                  `${cleanBase}/api/proxy/fetch?url=${encodeURIComponent(u)}` +
                  b
                );
              } catch {
                return m;
              }
            },
          );
        const blob = new Blob([rewritten], { type: "text/javascript" });
        const urlObj = URL.createObjectURL(blob);
        s.type = "module";
        s.src = urlObj;
        installedHeadScripts.value.push({ code: rewritten, type: "module" });
      } else {
        s.textContent = code;
        installedHeadScripts.value.push({ code });
      }
      d?.head?.appendChild(s);
    } catch {}
  }
}
function installInlineScripts(
  inlineList: { code: string; type?: string; where?: "head" | "body" }[],
) {
  if (!editor) return;
  const d = editor?.Canvas.getDocument();
  d?.head
    ?.querySelectorAll("script[data-import-inline]")
    ?.forEach((el) => el.remove());
  inlineList.forEach((item) => {
    try {
      const s = d?.createElement("script");
      if (!s) return;
      s.setAttribute("data-import-inline", item.where || "body");
      if (item.type) s.type = item.type;
      s.textContent = item.code || "";
      const target = (item.where === "head" ? d?.head : d?.body) || d?.head;
      target?.appendChild(s);
      const obj = { code: item.code || "", type: item.type };
      if ((item.where || "body") === "head")
        installedHeadScripts.value.push(obj);
      else installedBodyScripts.value.push(obj);
    } catch {}
  });
}
async function installScriptsSequence(
  seq: {
    kind: "external" | "inline";
    src?: string;
    code?: string;
    type?: string;
    async?: boolean;
    defer?: boolean;
    where: "head" | "body";
  }[],
  baseUrl: string,
) {
  if (!editor) return;
  const d = editor?.Canvas.getDocument();
  const base = apiClient.defaults.baseURL || "";
  resetInstalledScripts(baseUrl);
  for (let itemIndex = 0; itemIndex < (seq || []).length; itemIndex++) {
    const item = seq[itemIndex];
    wbDebug("installScriptsSequence:ITEM", itemIndex, { kind: item?.kind, src: item?.src, type: item?.type, where: item?.where, async: item?.async, defer: item?.defer, codeChars: String(item?.code || "").length });

    // Keep Tailwind Play CDN enabled because it is responsible for generating
    // the utility CSS. All other imported scripts are skipped in fixed15
    // diagnostic mode so we can prove whether they are causing the delayed
    // canvas break. No script is deleted from the original imported HTML.
    const isTailwindItem =
      item?.kind === "external" &&
      !!item?.src &&
      (() => {
        try { return /(^|\.)cdn\.tailwindcss\.com$/i.test(new URL(item.src!, baseUrl).hostname); }
        catch { return false; }
      })();
    if (WB_DIAGNOSTIC_DISABLE_IMPORTED_SCRIPTS && !isTailwindItem) {
      wbDebug("IMPORTED SCRIPT SKIPPED (fixed15 diagnostic)", {
        itemIndex, kind: item?.kind, src: item?.src, where: item?.where,
        type: item?.type, codeChars: String(item?.code || "").length,
      });
      continue;
    }

    const target = (item.where === "head" ? d?.head : d?.body) || d?.head;
    if (item.kind === "external" && item.src) {
      try {
        const absUrl = new URL(item.src, baseUrl).toString();
        // Use proxy for the editor execution to avoid CORS/Mixed-Content issues
        const cleanBase = String(base).replace(/\/?$/, "");
        let proxied = absUrl;
        if (!absUrl.includes("/api/proxy/fetch")) {
          proxied = `${cleanBase}/api/proxy/fetch?url=${encodeURIComponent(absUrl)}`;
        } else if (absUrl.startsWith("/api/proxy/fetch")) {
          proxied = `${cleanBase}${absUrl}`;
        }

        const s = d?.createElement("script");
        if (!s) continue;
        s.setAttribute("data-import-seq", "external");
        if (item.async) s.async = true;
        if (item.defer) s.defer = true;

        const type = String(item.type || "").toLowerCase();

        // For modules, we MUST rewrite imports, so we need to fetch the code
        if (type === "module") {
          try {
            const res = await fetch(proxied, { credentials: "include" });
            if (!res.ok) throw new Error("Fetch failed");
            const code = await res.text();

            const rewritten = code
              .replace(
                /(import\s+[^'"\n]+['"])([^'"\n]+)(['"])/g,
                (m, a, spec, b) => {
                  try {
                    const u = new URL(spec, absUrl).toString();
                    const cleanBase = String(base).replace(/\/?$/, "");
                    if (u.includes("/api/proxy/fetch")) return a + u + b;
                    return (
                      a +
                      `${cleanBase}/api/proxy/fetch?url=${encodeURIComponent(u)}` +
                      b
                    );
                  } catch {
                    return m;
                  }
                },
              )
              .replace(/(from\s+['"])([^'"\n]+)(['"])/g, (m, a, spec, b) => {
                try {
                  const u = new URL(spec, absUrl).toString();
                  const cleanBase = String(base).replace(/\/?$/, "");
                  if (u.includes("/api/proxy/fetch")) return a + u + b;
                  return (
                    a +
                    `${cleanBase}/api/proxy/fetch?url=${encodeURIComponent(u)}` +
                    b
                  );
                } catch {
                  return m;
                }
              })
              .replace(
                /(import\(\s*['"])([^'"\n]+)(['"]\s*\))/g,
                (m, a, spec, b) => {
                  try {
                    const u = new URL(spec, absUrl).toString();
                    const cleanBase = String(base).replace(/\/?$/, "");
                    if (u.includes("/api/proxy/fetch")) return a + u + b;
                    return (
                      a +
                      `${cleanBase}/api/proxy/fetch?url=${encodeURIComponent(u)}` +
                      b
                    );
                  } catch {
                    return m;
                  }
                },
              );
            const blob = new Blob([rewritten], { type: "text/javascript" });
            const urlObj = URL.createObjectURL(blob);
            s.type = "module";
            s.src = urlObj;

            // Store module with code (rewritten) but NO src because it's modified
            const obj = {
              code: rewritten,
              type: "module",
              async: item.async,
              defer: item.defer,
            };
            if (item.where === "head") installedHeadScripts.value.push(obj);
            else installedBodyScripts.value.push(obj);

            target?.appendChild(s);
          } catch (e) {
            console.warn(
              "[WebsiteBuilder] Module script install error:",
              e,
              item,
            );
          }
        } else {
          // Tailwind Play CDN is a runtime compiler, not a normal production
          // stylesheet. Loading it as an external <script src> makes the
          // GrapesJS import wait on its load event and the CDN itself emits
          // a production warning. Execute the fetched CDN code inline instead:
          // this keeps Tailwind's runtime behaviour while avoiding the
          // PendingScript/load-event stall and the noisy warning.
          const isTailwindPlayCdn =
            /(^|\.)cdn\.tailwindcss\.com$/i.test(new URL(absUrl).hostname);
          if (isTailwindPlayCdn) {
            wbDebug("TAILWIND CDN DETECTED", { absUrl, proxied });
            try {
              const res = await fetch(proxied, { credentials: "include" });
              if (!res.ok) throw new Error(`Tailwind CDN fetch failed: ${res.status}`);
              const code = await res.text();
              wbDebug("TAILWIND CDN FETCHED", { status: res.status, chars: code.length, head: code.slice(0,250) });

              // The CDN warning is emitted with console.warn. Filter only that
              // exact message inside the Canvas; do not silence other warnings.
              const win = d?.defaultView as any;
              if (win && !win.__wbTailwindWarnFilterInstalled) {
                const originalWarn = win.console?.warn?.bind(win.console);
                if (originalWarn) {
                  win.console.warn = (...args: any[]) => {
                    const first = String(args?.[0] ?? "");
                    if (first.includes("cdn.tailwindcss.com should not be used in production")) return;
                    originalWarn(...args);
                  };
                }
                win.__wbTailwindWarnFilterInstalled = true;
              }

              s.removeAttribute("src");
              s.setAttribute("data-wb-tailwind-play-cdn", "1");
              s.async = false;
              s.defer = false;
              s.textContent = code;
              target?.appendChild(s);
              wbDebug("TAILWIND INLINE APPENDED", { target: item.where, scriptCount: d?.querySelectorAll("script[data-import-seq]").length || 0 });

              const obj = {
                code,
                type: item.type,
                async: false,
                defer: false,
              };
              if (item.where === "head") installedHeadScripts.value.push(obj);
              else installedBodyScripts.value.push(obj);

              // Inline classic scripts execute synchronously, so the import
              // sequence can continue immediately.
              continue;
            } catch (e) {
              console.warn("[WebsiteBuilder] Tailwind CDN install error:", e);
              continue;
            }
          }

          // Load all other external scripts synchronously in the import sequence.
          // Inline scripts may depend on globals created by this script.
          if (item.type) s.type = item.type;
          s.async = false;
          s.defer = false;
          s.src = proxied;

          const obj = {
            src: absUrl,
            type: item.type,
            async: item.async,
            defer: item.defer,
          };
          if (item.where === "head") installedHeadScripts.value.push(obj);
          else installedBodyScripts.value.push(obj);

          await new Promise<void>((resolve) => {
            let settled = false;
            const done = () => {
              if (settled) return;
              settled = true;
              resolve();
            };
            s.onload = done;
            s.onerror = (err) => {
              console.warn("[WebsiteBuilder] External script load error:", err, item);
              done();
            };
            wbDebug("EXTERNAL SCRIPT APPEND", { index: itemIndex, src: absUrl, proxied });
            target?.appendChild(s);
            // Inline/local/blob scripts can execute immediately and may not
            // reliably emit load in every browser/editor document.
            if (String(proxied).startsWith("blob:")) queueMicrotask(done);
          });
        }
      } catch (e) {
        console.warn("[WebsiteBuilder] Script install error:", e, item);
      }
    } else if (item.kind === "inline") {
     try {
          const s = d?.createElement("script");
          if (!s) continue;

          s.setAttribute("data-import-seq", "inline");

          if (item.type) {
            s.type = item.type;
          }

          let code = item.code || "";

          // Fix: một số HTML gọi `tailwind.config = ...`
          // trước khi global `tailwind` tồn tại.
          if (code.includes("tailwind.config")) {
            code = `
              window.tailwind = window.tailwind || {};
              var tailwind = window.tailwind;

              ${code}
            `;
          }

          s.textContent = code;
          target?.appendChild(s);

          const obj = {
            code: item.code || "",
            type: item.type,
          };

          if (item.where === "head") {
            installedHeadScripts.value.push(obj);
          } else {
            installedBodyScripts.value.push(obj);
          }
        } catch (e) {
          console.warn("[WebsiteBuilder] Inline script install error:", e);
        }
    }
  }
}

function installSavedScripts(
  scripts: {
    code?: string;
    type?: string;
    src?: string;
    async?: boolean;
    defer?: boolean;
  }[],
  where: "head" | "body",
) {
  if (!editor || !scripts) return;
  const d = editor?.Canvas.getDocument();
  const base = apiClient.defaults.baseURL || "";

  // Clean up existing saved scripts for this section
  const selector = `script[data-saved-script="${where}"]`;
  if (where === "head") {
    d?.head?.querySelectorAll(selector).forEach((el) => el.remove());
  } else {
    d?.body?.querySelectorAll(selector).forEach((el) => el.remove());
  }

  scripts.forEach((s) => {
    try {
      if (!s) return;
      const el = d?.createElement("script");
      if (!el) return;

      el.setAttribute("data-saved-script", where);

      if (s.async) el.async = true;
      if (s.defer) el.defer = true;

      if (s.src) {
        // Use proxy for editor execution
        const proxied = `${String(base).replace(/\/?$/, "")}/api/proxy/fetch?url=${encodeURIComponent(s.src)}`;
        el.src = proxied;
      } else {
        el.textContent = s.code || "";
      }

      if (s.type) el.type = s.type;

      if (where === "head") d?.head?.appendChild(el);
      else d?.body?.appendChild(el);
    } catch {}
  });
}
function installCanvasRuntime(baseUrl: string) {
  if (!editor) return;
  const d = editor?.Canvas.getDocument();
  const prev = d?.head?.querySelectorAll("script[data-wb-runtime]") || [];
  prev.forEach((el) => el.remove());
  const s = d?.createElement("script");
  const apiBase = String(apiClient.defaults.baseURL || "").replace(/\/?$/, "");

  const runtimeScript = `
(function(){
  const D=document;
  var WB_BASE='${baseUrl.replace(/'/g, "")}';
  var API_BASE='${apiBase.replace(/'/g, "")}';

  // Suppress specific 3rd party script errors that we cannot fix
  window.onerror = function(msg, url, line, col, error) {
    if (typeof msg === 'string' && (
      (msg.includes("innerHTML") && msg.includes("null")) || 
      msg.includes("initSwiper") ||
      msg.includes("isSpider")
    )) {
      console.warn("[WebsiteBuilder] Suppressed 3rd party script error:", msg);
      return true;
    }
  };
  try {
    var prevUR = window.onunhandledrejection;
    var handlerUR = function(e) {
      try {
        var reason = e && (e.reason || e.detail);
        var msg = String((reason && (reason.message || reason)) || '');
        if (typeof msg === 'string' && (msg.includes("isSpider") || msg.includes("initSwiper"))) {
          console.warn("[WebsiteBuilder] Suppressed unhandledrejection:", msg);
          e && e.preventDefault && e.preventDefault();
          return true;
        }
      } catch(_) {}
      return false;
    };
    window.addEventListener('unhandledrejection', handlerUR);
    if (prevUR) { window.onunhandledrejection = prevUR; }
  } catch(_) {}
  
  function abs(u){
    try {
      var s=String(u||'').trim();
      if(!s) return s;
      if(/^https?:\\/\\//i.test(s)) return s;
      return new URL(s, WB_BASE).toString();
    } catch(_) { return u; }
  }
  
  function prox(u){
    var s = String(u||'').trim();
    if (s.indexOf('/api/proxy/fetch') !== -1) {
       if (s.indexOf('http') === 0) return s;
       if (s.indexOf('/') === 0) return API_BASE + s;
       return s;
    }
    return API_BASE + '/api/proxy/fetch?url=' + encodeURIComponent(abs(u));
  }
  
  var ofetch = window.fetch;
  try {
    window.fetch = function(i, init) {
      try {
        var u = typeof i === 'string' ? i : (i && i.url) || '';
        return ofetch(prox(u), init);
      } catch(_) { return ofetch(i, init); }
    };
  } catch(_) {}
  
  try {
    var XO = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(m, u) {
      var rest = [];
      for(var i=2; i<arguments.length; i++) rest.push(arguments[i]);
      try {
        return XO.call(this, m, prox(u), rest[0], rest[1], rest[2]);
      } catch(_) {
        return XO.call(this, m, u, rest[0], rest[1], rest[2]);
      }
    };
  } catch(_) {}
  
  function qs(id) {
    try {
      return D.getElementById(id) || D.querySelector(id.startsWith('#') ? id : '#' + id);
    } catch(_) { return null; }
  }
  
  function tHidden(el, force) {
    if(!el) return;
    var c = 'hidden';
    if(force === true) el.classList.add(c);
    else if(force === false) el.classList.remove(c);
    else el.classList.toggle(c);
  }
  
  function bindCollapse() {
    D.querySelectorAll('[data-collapse-toggle]').forEach(function(btn) {
      var tid = btn.getAttribute('data-collapse-toggle') || btn.getAttribute('aria-controls');
      var target = tid ? qs(tid) : null;
      btn.addEventListener('click', function() { tHidden(target); });
    });
  }
  
  function bindDropdown() {
    D.querySelectorAll('[data-dropdown-toggle]').forEach(function(btn) {
      var tid = btn.getAttribute('data-dropdown-toggle') || btn.getAttribute('aria-controls');
      var target = tid ? qs(tid) : null;
      btn.addEventListener('click', function() { tHidden(target); });
    });
  }
  
  function bindModal() {
    D.querySelectorAll('[data-modal-toggle],[data-modal-target]').forEach(function(btn) {
      var tid = btn.getAttribute('data-modal-target') || btn.getAttribute('data-modal-toggle') || btn.getAttribute('aria-controls');
      var target = tid ? qs(tid) : null;
      btn.addEventListener('click', function() { tHidden(target, false); });
    });
    D.querySelectorAll('[data-modal-hide]').forEach(function(btn) {
      var tid = btn.getAttribute('data-modal-hide') || btn.getAttribute('aria-controls');
      var target = tid ? qs(tid) : btn.closest('[role="dialog"]');
      btn.addEventListener('click', function() { tHidden(target, true); });
    });
  }

  function bindAccordion() {
    D.querySelectorAll('[data-accordion]').forEach(function(acc) {
      acc.querySelectorAll('button,[data-accordion-target]').forEach(function(btn) {
        var tid = btn.getAttribute('data-accordion-target') || btn.getAttribute('aria-controls');
        var target = tid ? qs(tid) : null;
        btn.addEventListener('click', function() {
          var ex = String(btn.getAttribute('aria-expanded') || 'false') === 'true';
          btn.setAttribute('aria-expanded', ex ? 'false' : 'true');
          if (target) tHidden(target, ex ? true : false);
        });
      });
    });
  }
  
  function initCountdownTimers(root) {
    var r = root || D;
    function parseLocal(s){
      try{
        var t=String(s||'').trim();
        if(!t) return null;
        // Handle 'YYYY-MM-DDTHH:mm' as local time
        var m=t.match(/^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})$/);
        if(m){
          var y=+m[1], mo=+m[2]-1, d=+m[3], h=+m[4], mi=+m[5];
          return new Date(y, mo, d, h, mi, 0, 0);
        }
        var d2=new Date(t);
        if(isNaN(d2.getTime())) return null;
        return d2;
      }catch(_){ return null; }
    }
    function setup(el){
  try{
    var raw = el.getAttribute('data-event-json') || '';
    var evt = null;
    try{ evt = raw ? JSON.parse(raw) : null; }catch(_){ evt = null; }
    var s = el.getAttribute('data-start-date') || '';
    var start = parseLocal(s) || (evt && parseLocal(evt.startDate)) || null;

    if(!start){
      function pad(n){ return String(n).padStart(2,'0'); }
      var d = el.querySelector('.countdown-days');
      var h = el.querySelector('.countdown-hours');
      var m = el.querySelector('.countdown-minutes');
      var sEl = el.querySelector('.countdown-seconds');
      if(d) d.textContent = pad(0);
      if(h) h.textContent = pad(0);
      if(m) m.textContent = pad(0);
      if(sEl) sEl.textContent = pad(0);
      el.__cdStart = null;
      return;
    }

    if(!el.__cdStart){ el.__cdStart = start; }
    function pad(n){ return String(n).padStart(2,'0'); }
    function upd(){
      try{
        var now = new Date();
        var base = el.__cdStart || start;
        var diff = Math.max(0, base - now);
        var days = Math.floor(diff/(1000*60*60*24));
        var hours = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
        var minutes = Math.floor((diff%(1000*60*60))/(1000*60));
        var seconds = Math.floor((diff%(1000*60))/1000);
        var d = el.querySelector('.countdown-days');
        var h = el.querySelector('.countdown-hours');
        var m = el.querySelector('.countdown-minutes');
        var sEl = el.querySelector('.countdown-seconds');
        if(d) d.textContent = pad(days);
        if(h) h.textContent = pad(hours);
        if(m) m.textContent = pad(minutes);
        if(sEl) sEl.textContent = pad(seconds);
      }catch(_){}
    }
    upd();
  }catch(_){}
}
}
  
  function ensureCountdownScheduler(){
    try{
      var W = window;
      if (W.__wbCountdownInterval) return;
      var tick = function(){ try{ initCountdownTimers(D); }catch(_){} };
      W.__wbCountdownInterval = setInterval(tick, 1000);
      document.addEventListener('visibilitychange', function(){
        try{
          clearInterval(W.__wbCountdownInterval);
          W.__wbCountdownInterval = setInterval(tick, document.hidden ? 10000 : 1000);
        }catch(_){}
      });
    }catch(_){}
  }
  
  function init() {
    bindCollapse();
    bindDropdown();
    bindModal();
    bindAccordion();
    initCountdownTimers(D);
    ensureCountdownScheduler();
  }
  
  init();
  var mo = new MutationObserver(function(muts) { 
    init(); 
    try {
      for (var i=0;i<muts.length;i++){
        var rec = muts[i];
        if (rec.addedNodes){
          rec.addedNodes.forEach(function(n){
            if(n && n.nodeType===1){
              if (n.classList && n.classList.contains('countdown-timer')) initCountdownTimers(n);
              var inner = n.querySelectorAll ? n.querySelectorAll('.countdown-timer') : [];
              inner.forEach(function(el){ initCountdownTimers(el.parentNode || D); });
            }
          });
        }
      }
    } catch(_){}
  });
  mo.observe(D.body || D.documentElement, { childList: true, subtree: true });
})();
`;

  if (s) {
    s.setAttribute("data-wb-runtime", "1");
    s.textContent = runtimeScript;
    d?.head?.appendChild(s);
  }
}
function wbEscapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function wbRewriteHtmlImageUrls(html: string, map: Record<string, string>) {
  // Use DOMParser to safely replace URLs in HTML attributes
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    wbDebug("handleHtmlImport:PARSED", { htmlChars: html.length, title: doc.title, styles: doc.querySelectorAll("style").length, links: doc.querySelectorAll("link[rel=stylesheet]").length, scripts: doc.querySelectorAll("script").length, bodyChars: doc.body?.innerHTML?.length || 0 });

    // Replace in img src and other common attributes
    const elements = doc.querySelectorAll("*");
    elements.forEach((el) => {
      // Handle src attribute (img, audio, video, script, iframe, etc.)
      if (el.hasAttribute("src")) {
        const src = el.getAttribute("src");
        if (src && map[src]) {
          el.setAttribute("src", map[src]);
        }
      }

      // Handle srcset (img, source)
      if (el.hasAttribute("srcset")) {
        const srcset = el.getAttribute("srcset") || "";
        const newSrcset = srcset
          .split(",")
          .map((part) => {
            const [url, desc] = part.trim().split(/\s+/);
            if (url && map[url]) {
              return desc ? `${map[url]} ${desc}` : map[url];
            }
            return part;
          })
          .join(", ");
        if (newSrcset !== srcset) {
          el.setAttribute("srcset", newSrcset);
        }
      }

      // Handle poster (video)
      if (el.hasAttribute("poster")) {
        const poster = el.getAttribute("poster");
        if (poster && map[poster]) {
          el.setAttribute("poster", map[poster]);
        }
      }

      // Handle href (link, a) - be careful only to replace asset links if needed
      // For now, we only replace if it matches exactly an image asset
      if (el.hasAttribute("href")) {
        const href = el.getAttribute("href");
        if (href && map[href]) {
          el.setAttribute("href", map[href]);
        }
      }

      // Handle inline styles
      if (el.hasAttribute("style")) {
        const style = el.getAttribute("style") || "";
        let newStyle = style;
        for (const [from, to] of Object.entries(map)) {
          if (!from || !to) continue;
          // Replace url('from') or url("from") or url(from)
          // We use a regex that matches the specific URL inside url()
          try {
            const esc = wbEscapeRegExp(from);
            // Match url( ... from ... )
            // This is tricky because of quotes.
            // Simplest safe approach for style strings:
            // replace url("from"), url('from'), url(from)
            newStyle = newStyle.replace(
              new RegExp(`url\\(\\s*['"]?${esc}['"]?\\s*\\)`, "g"),
              `url("${to}")`,
            );
          } catch {}
        }
        if (newStyle !== style) {
          el.setAttribute("style", newStyle);
        }
      }
    });

    return doc.body ? doc.body.innerHTML : html;
  } catch (e) {
    console.error("Error rewriting HTML URLs:", e);
    // Fallback to naive replacement if DOM parsing fails (though it shouldn't for valid HTML)
    let out = html;
    for (const [from, to] of Object.entries(map)) {
      if (!from || !to) continue;
      try {
        const re = new RegExp(wbEscapeRegExp(from), "g");
        out = out.replace(re, to);
      } catch {}
    }
    return out;
  }
}

function wbRewriteCssUrls(css: string, map: Record<string, string>) {
  let out = css;
  for (const [from, to] of Object.entries(map)) {
    if (!from || !to) continue;
    try {
      const esc = wbEscapeRegExp(from);
      // More specific replacement for CSS to avoid replacing random text
      // Matches url("from"), url('from'), url(from)
      const re = new RegExp(`url\\(\\s*['"]?${esc}['"]?\\s*\\)`, "g");
      out = out.replace(re, `url("${to}")`);
    } catch {}
  }
  return out;
}
const wbUploadHashCache: Record<string, string> = {};
async function wbComputeBlobSha256(blob: Blob): Promise<string> {
  const buf = await blob.arrayBuffer();
  const hash = await crypto.subtle.digest("SHA-256", buf);
  const bytes = new Uint8Array(hash);
  let out = "";
  for (let i = 0; i < bytes.length; i++)
    out += bytes[i].toString(16).padStart(2, "0");
  return out;
}
const wbUploadCache: Record<string, string> = {};
async function wbFetchBlobViaProxy(url: string): Promise<Blob | null> {
  try {
    if (url.startsWith("data:")) {
      const res = await fetch(url);
      return await res.blob();
    }
    const base = apiClient.defaults.baseURL || "";
    const cleanBase = String(base).replace(/\/?$/, "");
    const proxyEndpoint = `${cleanBase}/api/proxy/fetch`;

    let prox = url;
    // Prevent double proxying if the URL is already a proxy URL
    if (!url.includes("/api/proxy/fetch")) {
      prox = `${proxyEndpoint}?url=${encodeURIComponent(url)}`;
    } else {
      // If it is already a proxy URL but missing the full base (relative), prepend base
      if (url.startsWith("/api/proxy/fetch")) {
        prox = `${cleanBase}${url}`;
      }
    }

    const res = await fetch(prox, { credentials: "include" });
    if (!res.ok) return null;
    return await res.blob();
  } catch {
    return null;
  }
}
function getExtensionFromMime(mime: string) {
  switch (mime) {
    case "image/jpeg":
    case "image/jpg":
      return ".jpg";
    case "image/png":
      return ".png";
    case "image/gif":
      return ".gif";
    case "image/webp":
      return ".webp";
    case "image/svg+xml":
      return ".svg";
    case "image/bmp":
      return ".bmp";
    case "image/tiff":
      return ".tiff";
    case "image/x-icon":
      return ".ico";
    case "font/woff":
    case "application/font-woff":
    case "application/x-font-woff":
      return ".woff";
    case "font/woff2":
      return ".woff2";
    case "font/ttf":
    case "application/font-sfnt":
    case "application/x-font-ttf":
      return ".ttf";
    case "font/otf":
      return ".otf";
    case "application/vnd.ms-fontobject":
      return ".eot";
    case "text/css":
      return ".css";
    case "text/javascript":
    case "application/javascript":
      return ".js";
    default:
      return "";
  }
}

async function wbUrlToFile(u: string): Promise<File | null> {
  try {
    const blob = await wbFetchBlobViaProxy(u);
    if (!blob || blob.size === 0) {
      console.warn("Empty blob for URL:", u);
      return null;
    }
    if (
      blob.type.includes("text/html") ||
      blob.type.includes("application/json")
    ) {
      console.warn("Skipping non-image blob (html/json):", u, blob.type);
      return null;
    }
    const urlObj = new URL(u);
    const nameFromPath = urlObj.pathname.split("/").pop() || "image";
    let name = nameFromPath.split("?")[0] || "image";

    // Ensure extension
    if (!/\.[a-z0-9]+$/i.test(name)) {
      const ext = getExtensionFromMime(blob.type);
      if (ext) name += ext;
    }

    // Clean filename
    name = name.replace(/[^a-zA-Z0-9._-]/g, "_");

    return new File([blob], name, {
      type: blob.type || "application/octet-stream",
    });
  } catch (e) {
    console.error("Failed to convert URL to file:", u, e);
    return null;
  }
}
async function wbUploadAssets(files: File[]): Promise<(string | null)[]> {
  const uploadPromises = files.map(async (f) => {
    if (!f || f.size === 0) {
      console.warn("Skipping empty file:", f?.name);
      return null;
    }
    console.log("Uploading file:", {
      name: f.name,
      type: f.type,
      size: f.size,
    });
    try {
      const folder = `website/${companyId.value || "default"}`;
      const u = await mediaService.upload(f, folder);
      return u || null;
    } catch (e: any) {
      console.error("Failed to upload asset:", f.name, e);
      // Log backend error details if available
      if (e.response && e.response.data) {
        console.error("Backend error details:", e.response.data);
      }
      return null;
    }
  });

  return Promise.all(uploadPromises);
}
async function wbUploadScrapedAssets(
  urls: string[],
): Promise<Record<string, string>> {
  const map: Record<string, string> = {};
  const seen = new Set<string>();
  const isAsset = (s: string) => {
    if (!s) return false;
    if (
      s.startsWith("#") ||
      s.startsWith("mailto:") ||
      s.startsWith("tel:") ||
      s.startsWith("javascript:")
    )
      return false;
    if (/^data:(image|font|application|text)\//i.test(s)) return true;
    // If it has an extension, verify it's an asset extension
    if (/\.[a-z0-9]{2,4}(\?|#|$)/i.test(s)) {
      return /(\.png|\.jpe?g|\.gif|\.webp|\.svg|\.avif|\.ico|\.bmp|\.tiff|\.woff2?|\.ttf|\.otf|\.eot|\.css|\.js)(\?|#|$)/i.test(
        s,
      );
    }
    // If no extension (e.g. dynamic image generator), assume it is an asset since it was in an img tag or css url
    return true;
  };
  for (const src0 of urls) {
    const src = String(src0 || "").trim();
    if (!src || seen.has(src) || !isAsset(src)) continue;
    seen.add(src);
    try {
      if (wbUploadCache[src]) {
        map[src] = wbUploadCache[src];
        continue;
      }
      let file: File | null = null;
      if (/^data:(image|font|text|application)\//i.test(src)) {
        const res = await fetch(src);
        const blob = await res.blob();
        if (blob.size === 0) {
          console.warn("Empty blob for data URI");
          continue;
        }
        const type = blob.type || "application/octet-stream";
        const ext = getExtensionFromMime(type);
        file = new File([blob], `asset${ext}`, { type });
      } else {
        file = await wbUrlToFile(src);
      }
      if (!file) continue;
      const hash = await wbComputeBlobSha256(file);
      if (wbUploadHashCache[hash]) {
        map[src] = wbUploadHashCache[hash];
        wbUploadCache[src] = wbUploadHashCache[hash];
        continue;
      }
      const uploaded = await wbUploadAssets([file]);
      const u = uploaded[0];
      if (u) {
        map[src] = u;
        wbUploadCache[src] = u;
        wbUploadHashCache[hash] = u;
      }
    } catch (e) {
      console.error("Error processing scraped asset:", src0, e);
    }
  }
  return map;
}
function getMimeType(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase();
  const map: Record<string, string> = {
    html: "text/html",
    htm: "text/html",
    css: "text/css",
    js: "text/javascript",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    svg: "image/svg+xml",
    json: "application/json",
    woff: "font/woff",
    woff2: "font/woff2",
    ttf: "font/ttf",
  };
  return map[ext || ""] || "application/octet-stream";
}

function installImportedScriptMutationDiagnostics() {
  if (!editor) return;
  try { wbImportedScriptMutationObserver?.disconnect(); } catch {}
  wbImportedScriptMutationObserver = null;
  wbImportedScriptMutationCount = 0;
  const d = editor?.Canvas.getDocument();
  const body = d?.body;
  const head = d?.head;
  if (!body || !head || typeof MutationObserver === "undefined") return;

  wbImportedScriptMutationObserver = new MutationObserver((mutations) => {
    wbImportedScriptMutationCount += mutations.length;
    const interesting = mutations
      .filter((m) => m.type === "attributes" || m.type === "childList")
      .slice(0, 8)
      .map((m) => ({
        type: m.type,
        target: (m.target as Element)?.tagName || "",
        id: (m.target as Element)?.id || "",
        className: String((m.target as Element)?.className || "").slice(0, 180),
        attr: m.type === "attributes" ? m.attributeName : undefined,
        added: m.addedNodes?.length || 0,
        removed: m.removedNodes?.length || 0,
      }));
    if (interesting.length) {
      wbDebug("CANVAS MUTATION", {
        total: wbImportedScriptMutationCount,
        mutations: interesting,
      });
    }
  });
  wbImportedScriptMutationObserver.observe(head, { subtree: true, childList: true, attributes: true, attributeFilter: ["class", "style", "hidden", "id"] });
  wbImportedScriptMutationObserver.observe(body, { subtree: true, childList: true, attributes: true, attributeFilter: ["class", "style", "hidden", "id"] });
  wbDebug("IMPORTED SCRIPT MUTATION DIAGNOSTICS:ON");
}

function scheduleFixed15CanvasDiagnostics() {
  if (!editor) return;
  [0, 500, 1500, 3000].forEach((ms) => {
    setTimeout(() => {
      try {
        wbDebug(`FIXED15 CANVAS CHECK +${ms}ms`, wbCanvasSnapshot(`fixed15+${ms}ms`));
      } catch {}
    }, ms);
  });
}

function restoreImportedCanvasHead() {
  wbDebug("restoreImportedCanvasHead:START", {
    cssChars: importedEditorCssPersistent.length,
    links: importedHeadLinksPersistent.length,
    tailwindChars: tailwindRuntimeCssCache.length,
  });
  if (!editor) return;
  const d = editor?.Canvas.getDocument();
  if (!d?.head) return;

  // Restore only CSS that belongs to the imported document. Tailwind Play CDN
  // owns its generated <style>; never remove, copy, replace, or freeze it here.
  d.head.querySelectorAll('style[data-import-url], style[data-imported-stylesheet]').forEach((el) => el.remove());
  d.head.querySelectorAll('link[data-saved-link]').forEach((el) => el.remove());

  if (importedEditorCssPersistent) {
    const style = d.createElement('style');
    style.setAttribute('data-import-url', '1');
    style.textContent = importedEditorCssPersistent;
    d.head.appendChild(style);
  }

  importedHeadLinksPersistent.forEach((item) => {
    if (!item?.href) return;
    const link = d.createElement('link');
    link.rel = 'stylesheet';
    link.href = item.href;
    link.setAttribute('data-saved-link', '1');
    d.head.appendChild(link);
  });

  wbCanvasSnapshot("restoreImportedCanvasHead:DONE");
}


async function loadGrapesBundle(bundle: any) {
  wbDebug("loadGrapesBundle:START", { bundleKeys: bundle ? Object.keys(bundle) : [], baseUrl: bundle?.baseUrl, htmlChars: String(bundle?.html || "").length, cssChars: String(bundle?.css || "").length, headLinks: Array.isArray(bundle?.headLinks) ? bundle.headLinks.length : 0, scripts: Array.isArray(bundle?.scripts) ? bundle.scripts.length : 0 });
  // An import replaces the current canvas. Remove previous imported head/body
  // assets first so old CSS/JS cannot keep affecting the newly imported page.
  try {
    clearImportedHeadAssets();
  } catch {}

  const parsed = toGrapesJson(bundle, {
    keepScripts: true,
    keepInlineHandlers: true,
  });
  if (editor) {
    let htmlToSet = parsed.html;
    try {
      const allAssetUrls: string[] = (parsed.assets || [])
        .map((a: any) => String(a?.src || ""))
        .filter((s: string) => !!s);
      const map = await wbUploadScrapedAssets(allAssetUrls);
      const uploadedImageUrls = Object.entries(map)
        .filter(([from]) =>
          /(\.png|\.jpe?g|\.gif|\.webp|\.svg|\.avif|\.ico)(\?|#|$)/i.test(from),
        )
        .map(([, to]) => to);
      if (Object.keys(map).length) {
        htmlToSet = wbRewriteHtmlImageUrls(parsed.html, map);
        if (parsed.css) parsed.css = wbRewriteCssUrls(parsed.css, map);
        if (uploadedImageUrls.length)
          editor.AssetManager.add(
            uploadedImageUrls.map((src) => ({ src })) as any,
          );
        else editor.AssetManager.add(parsed.assets as any);
      } else {
        editor.AssetManager.add(parsed.assets as any);
      }
    } catch {
      editor.AssetManager.add(parsed.assets as any);
    }
    wbDebug("loadGrapesBundle:BEFORE setComponents", { htmlChars: String(htmlToSet || "").length });
    editor.setComponents(htmlToSet);
    wbDebug("loadGrapesBundle:AFTER setComponents");
    wbCanvasSnapshot("after-setComponents");
    const importBaseUrl = String(bundle.baseUrl || document.baseURI || window.location.href);

    // IMPORTANT: GrapesJS component rendering can rebuild the canvas document
    // head. Keeping imported CSS only as a raw <style> in the iframe is
    // therefore not reliable: it can disappear after the component tree is
    // rendered/refreshed. Put the imported stylesheet into GrapesJS' CSS
    // Composer as the source of truth, and keep the iframe <style> as a
    // runtime fallback for rules such as @font-face/@import.
    const importedCss = sanitizeImportedCssForPreview(String(parsed.css || ""));
    wbDebug("CSS parsed/sanitized", { chars: importedCss.length, rawChars: String(parsed.css || "").length, first500: importedCss.slice(0,500) });
    try {
      wbDebug("BEFORE editor.setStyle(importedCss)");
      editor.setStyle(importedCss);
      wbDebug("AFTER editor.setStyle(importedCss)");
      wbCanvasSnapshot("after-editor-setStyle");
    } catch (e) {
      console.warn("[WebsiteBuilder] Failed to set imported CSS in CSS Composer:", e);
    }
    setCanvasImportCss(importedCss, importBaseUrl);

    // Keep external stylesheets as real <link> tags in the canvas head.
    // Using @import alone is fragile in the GrapesJS iframe and also breaks
    // relative stylesheet URLs.
    const importedHeadLinks = Array.isArray(bundle.headLinks) ? bundle.headLinks : [];
    if (importedHeadLinks.length) {
      const resolvedHeadLinks = importedHeadLinks
        .map((l: any) => ({
          href: resolveImportedUrl(String(l?.href || l), importBaseUrl),
        }))
        .filter((l: { href: string }) => !!l.href);

      // Keep the original links for correct font/CSS loading, but also hydrate
      // their CSS into the iframe so the imported page does not depend on the
      // iframe's base URL or cross-origin stylesheet timing.
      wbDebug("HEAD LINKS resolved", resolvedHeadLinks);
      injectSavedHeadLinks(resolvedHeadLinks);
      wbCanvasSnapshot("after-injectSavedHeadLinks");
      wbDebug("BEFORE hydrateImportedStylesheets", { count: resolvedHeadLinks.length });
      const hydratedCss = await hydrateImportedStylesheets(resolvedHeadLinks, importBaseUrl);
      wbDebug("AFTER hydrateImportedStylesheets", { chars: hydratedCss.length });
      if (hydratedCss) {
        try {
          // External CSS must also enter the CSS Composer. Otherwise it may
          // look correct in Preview (which rebuilds <head>) but disappear
          // from the editable Canvas after GrapesJS refreshes the iframe.
          const mergedCss = [importedCss, hydratedCss]
            .filter((v) => v && v.trim())
            .join("\n\n");
          editor.setStyle(mergedCss);
          setCanvasImportCss(mergedCss, importBaseUrl);
        } catch (e) {
          console.warn("[WebsiteBuilder] Failed to merge hydrated CSS:", e);
        }
      }
    }

    if (parsed.scripts && parsed.scripts.length) {
      wbDebug("BEFORE installScriptsSequence", { count: parsed.scripts.length });
      await installScriptsSequence(parsed.scripts, importBaseUrl);
      wbDebug("AFTER installScriptsSequence");
    } else {
      resetInstalledScripts(importBaseUrl);
      await installImportedScripts(parsed.js || [], importBaseUrl);
      installInlineScripts(parsed.inlineJs || []);
    }

    // Tailwind Play CDN owns its generated runtime stylesheet. Do not copy it
    // into the editor CSS Composer or replace it; only keep imported document
    // CSS/links persistent across GrapesJS canvas refreshes.
    wbDebug("BEFORE startTailwindRuntimeCssSync");
    startTailwindRuntimeCssSync();
    wbDebug("AFTER startTailwindRuntimeCssSync");
    wbDebug("BEFORE installCanvasRuntime", { baseUrl: importBaseUrl });
    installCanvasRuntime(importBaseUrl);
    wbDebug("AFTER installCanvasRuntime");
    // Do not manually dispatch DOMContentLoaded/load here. Browser/GrapesJS
    // owns the iframe lifecycle; synthetic load events can make imported
    // libraries rebuild DOM/head after the editor has stabilized.
    wbDebug("BEFORE restoreImportedCanvasHead");
    restoreImportedCanvasHead();
    wbDebug("AFTER restoreImportedCanvasHead");
    installImportedScriptMutationDiagnostics();
    scheduleFixed15CanvasDiagnostics();
    wbCanvasSnapshot("loadGrapesBundle:FINAL");
    try {
      const bodyHtml = cleanBuilderAttrs(htmlToSet);
      lastImportedSnapshot.value = {
        html: bodyHtml,
        headCss: parsed.css || "",
        headLinks: importedHeadLinks,
        runtimeCode: collectRuntimeScriptCode(),
        headScripts: installedHeadScripts.value,
        bodyScripts: installedBodyScripts.value,
        baseUrl: bundle.baseUrl || "",
        at: Date.now(),
      };
    } catch {}
  }
}

async function runImportFromUrl() {
  importError.value = null;
  const url = normalizeImportUrl(importUrl.value);
  if (!url) {
    importError.value = "Vui lòng nhập URL";
    return;
  }
  importing.value = true;
  try {
    const bundle = await scrapeToGrapes(url);
    await loadGrapesBundle(bundle);
    showFeedback("Import thành công", "success");
    showImportDialog.value = false;
  } catch {
    importError.value = "Không thể import từ URL";
    showFeedback("Lỗi import URL", "error");
  } finally {
    importing.value = false;
  }
}

async function runImportFromFile() {
  importError.value = null;
  const val = importFile.value;
  let file: File | null = null;

  if (Array.isArray(val)) {
    if (val.length > 0) file = val[0];
  } else if (val) {
    file = val as unknown as File;
  }

  if (!file) {
    importError.value = "Vui lòng chọn file";
    return;
  }

  // Prevent browser crash from large files (Limit 50MB)
  const MAX_SIZE = 50 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    importError.value = "File quá lớn (Tối đa 50MB)";
    return;
  }

  importing.value = true;
  try {
    if (file.name.toLowerCase().endsWith(".zip")) {
      await handleZipImport(file);
    } else {
      await handleHtmlImport(file);
    }
    showFeedback("Import thành công", "success");
    showImportDialog.value = false;
  } catch (e: any) {
    console.error(e);
    importError.value = e.message || "Lỗi import file";
    showFeedback("Lỗi import file", "error");
  } finally {
    importing.value = false;
  }
}

async function handleHtmlImport(file: File) {
  wbDebug("handleHtmlImport:START", { name: file?.name, size: file?.size, type: file?.type });
  const text = await file.text();
  let html = text;
  let css = "";
  const scripts: any[] = [];
  const headLinks: { href: string }[] = [];
  let baseUrl = "";

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Preserve the original page base URL when the document provides one.
    // This is critical for relative CSS/JS URLs inside the GrapesJS iframe.
    const baseEl = doc.querySelector("base[href]");
    baseUrl = baseEl?.getAttribute("href") || "";
    if (baseUrl) {
      baseUrl = resolveImportedUrl(baseUrl);
    }
    baseEl?.remove();

    // Extract inline styles. They are injected into the canvas <head> later.
    const styles = Array.from(doc.querySelectorAll("style"));
    styles.forEach((s) => {
      css += (s.textContent || s.innerHTML || "") + "\n";
      s.remove();
    });

    // Do NOT turn external stylesheets into @import rules. A real <link> in
    // the canvas head is much more reliable and preserves the stylesheet's
    // own relative imports/assets.
    const links = Array.from(doc.querySelectorAll("link[rel='stylesheet']"));
    links.forEach((l) => {
      const href = l.getAttribute("href");
      if (href) {
        headLinks.push({ href: resolveImportedUrl(href, baseUrl) });
      }
      l.remove();
    });

    // Extract scripts while preserving execution order and placement.
    const scriptEls = Array.from(doc.querySelectorAll("script"));
    scriptEls.forEach((s) => {
      const src = s.getAttribute("src");
      const type = s.getAttribute("type") || undefined;
      const isAsync = s.hasAttribute("async");
      const isDefer = s.hasAttribute("defer");
      const parent = s.parentElement;
      const where =
        parent && parent.tagName.toLowerCase() === "head" ? "head" : "body";

      if (src) {
        scripts.push({
          kind: "external",
          src: resolveImportedUrl(src, baseUrl),
          type,
          async: isAsync,
          defer: isDefer,
          where,
        });
      } else {
        scripts.push({
          kind: "inline",
          code: s.textContent || s.innerHTML || "",
          type,
          where,
        });
      }
      s.remove();
    });

    html = doc.documentElement.outerHTML;
  } catch (e) {
    console.warn("Error parsing HTML import:", e);
  }

  const bundle = {
    html,
    css,
    js: [],
    inlineJs: [],
    scripts,
    assets: [],
    baseUrl,
    headLinks,
  };
  await loadGrapesBundle(bundle);
}

async function handleZipImport(file: File) {
  const zip = await JSZip.loadAsync(file);
  let indexFile = zip.file("index.html") || zip.file("index.htm");
  let rootPath = "";

  if (!indexFile) {
    const rootHtml = Object.keys(zip.files).find(
      (n) =>
        !n.includes("/") && n.match(/\.html?$/i) && !n.startsWith("__MACOSX"),
    );
    if (rootHtml) {
      indexFile = zip.file(rootHtml);
    } else {
      const anyHtml = Object.keys(zip.files).find(
        (n) => n.match(/\.html?$/i) && !n.startsWith("__MACOSX"),
      );
      if (anyHtml) {
        indexFile = zip.file(anyHtml);
        const lastSlash = anyHtml.lastIndexOf("/");
        if (lastSlash !== -1) {
          rootPath = anyHtml.substring(0, lastSlash + 1);
        }
      }
    }
  }
  if (!indexFile) throw new Error("Không tìm thấy file .html trong ZIP");

  const htmlContent = await indexFile.async("string");
  const assetMap: Record<string, string> = {};
  const filesToUpload: { path: string; file: File }[] = [];

  for (const [path, zipEntry] of Object.entries(zip.files)) {
    if (zipEntry.dir || path.startsWith("__MACOSX") || path.match(/\.html?$/i))
      continue;
    const blob = await zipEntry.async("blob");
    const mime = getMimeType(path);
    const filename = path.split("/").pop() || "asset";
    const f = new File([blob], filename, { type: mime });
    filesToUpload.push({ path, file: f });
  }

  const uploadedUrls = await wbUploadAssets(filesToUpload.map((x) => x.file));
  filesToUpload.forEach((item, index) => {
    if (uploadedUrls[index]) {
      assetMap[item.path] = uploadedUrls[index];
    }
  });

  // Helper to resolve paths with .. support
  const resolvePath = (base: string, relative: string) => {
    const stack = base.split("/").filter((p) => p && p !== ".");
    const parts = relative.split("/");
    for (const part of parts) {
      if (part === "" || part === ".") continue;
      if (part === "..") {
        if (stack.length > 0) stack.pop();
      } else {
        stack.push(part);
      }
    }
    return stack.join("/");
  };

  // Helper to resolve paths against the asset map
  const resolveAssetUrl = (val: string, contextDir: string = rootPath) => {
    let cleanVal = val.trim();
    try {
      cleanVal = decodeURIComponent(cleanVal);
    } catch {}

    if (
      !cleanVal ||
      cleanVal.startsWith("data:") ||
      /^https?:\/\//i.test(cleanVal)
    )
      return null;

    let pathToCheck = "";
    if (cleanVal.startsWith("/")) {
      // Absolute path in zip -> relative to root (remove leading slash)
      pathToCheck = cleanVal.substring(1);
    } else {
      // Relative path -> resolve against contextDir
      pathToCheck = resolvePath(contextDir, cleanVal);
    }

    // 1. Try exact match
    if (assetMap[pathToCheck]) return assetMap[pathToCheck];

    // 2. Fallback: maybe contextDir was wrong or file is flattened?
    // Try checking normalized version without context
    let norm = cleanVal.replace(/^\.\//, "");
    if (norm.startsWith("/")) norm = norm.substring(1);

    if (assetMap[norm]) return assetMap[norm];

    // 3. Loose match by filename
    const filename = norm.split("/").pop();
    if (filename) {
      const found = Object.keys(assetMap).find((k) => k.endsWith(filename));
      if (found) return assetMap[found];
    }
    return null;
  };

  const replacePath = (content: string) => {
    return content.replace(
      /(src|href|data-src|data-background-image|url)\s*=\s*["']([^"']+)["']/gi,
      (match, attr, val) => {
        const url = resolveAssetUrl(val);
        return url ? `${attr}="${url}"` : match;
      },
    );
  };

  const replaceCssUrls = (css: string, contextDir: string = rootPath) => {
    return css.replace(
      /url\(\s*(['"]?)([^)'"]+)\1\s*\)/gi,
      (match, quote, val) => {
        const url = resolveAssetUrl(val, contextDir);
        return url ? `url(${quote}${url}${quote})` : match;
      },
    );
  };

  // Extract and process CSS and JS files
  let cssContent = "";
  const headLinksBundle: { href: string }[] = [];
  const scriptsBundle: {
    kind: "external" | "inline";
    src?: string;
    code?: string;
    type?: string;
    where: "head" | "body";
  }[] = [];
  let htmlToProcess = htmlContent;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // --- CSS Processing ---
    const links = Array.from(doc.querySelectorAll("link[rel='stylesheet']"));
    for (const link of links) {
      const href = link.getAttribute("href");
      if (!href) continue;

      let norm = href.trim().replace(/^\.\//, "");
      if (norm.startsWith("/")) norm = norm.substring(1);
      const fullPath = rootPath + norm;

      let zipEntry = zip.files[fullPath] || zip.files[norm];
      if (!zipEntry) {
        const filename = norm.split("/").pop();
        if (filename) {
          const foundKey = Object.keys(zip.files).find(
            (k) => k.endsWith(filename) && !k.startsWith("__MACOSX"),
          );
          if (foundKey) zipEntry = zip.files[foundKey];
        }
      }

      if (zipEntry) {
        const rawCss = await zipEntry.async("string");
        const lastSlash = fullPath.lastIndexOf("/");
        const cssDir =
          lastSlash !== -1 ? fullPath.substring(0, lastSlash + 1) : "";
        cssContent += replaceCssUrls(rawCss, cssDir) + "\n";
        link.remove();
      } else {
        // Keep remote stylesheets. Relative local stylesheets that are not
        // present in the ZIP cannot be resolved against the editor iframe.
        // Absolute URLs can still be loaded/hydrated normally.
        const rawHref = href.trim();
        if (/^(https?:)?\/\//i.test(rawHref)) {
          headLinksBundle.push({ href: rawHref });
        }
      }
    }

    // --- JS Processing ---
    const scriptTags = Array.from(doc.querySelectorAll("script"));
    for (const script of scriptTags) {
      const src = script.getAttribute("src");
      const type = script.getAttribute("type");

      let where: "head" | "body" = "body";
      let current = script.parentElement;
      while (current) {
        if (current.tagName.toLowerCase() === "head") {
          where = "head";
          break;
        }
        current = current.parentElement;
      }

      if (src) {
        let norm = src.trim().replace(/^\.\//, "");
        if (norm.startsWith("/")) norm = norm.substring(1);
        const fullPath = rootPath + norm;

        let zipEntry = zip.files[fullPath] || zip.files[norm];
        if (!zipEntry) {
          const filename = norm.split("/").pop();
          if (filename) {
            const foundKey = Object.keys(zip.files).find(
              (k) => k.endsWith(filename) && !k.startsWith("__MACOSX"),
            );
            if (foundKey) zipEntry = zip.files[foundKey];
          }
        }

        if (zipEntry) {
          const jsCode = await zipEntry.async("string");
          scriptsBundle.push({
            kind: "inline",
            code: jsCode,
            type: type || undefined,
            where,
          });
          script.remove();
        } else {
          scriptsBundle.push({
            kind: "external",
            src: src,
            type: type || undefined,
            where,
          });
          script.remove();
        }
      } else {
        const content = script.innerHTML;
        if (content.trim()) {
          scriptsBundle.push({
            kind: "inline",
            code: content,
            type: type || undefined,
            where,
          });
        }
        script.remove();
      }
    }

    htmlToProcess = doc.documentElement.outerHTML;
  } catch (e) {
    console.error("Error processing ZIP content:", e);
  }

  const processedHtml = replacePath(htmlToProcess);
  const bundle = {
    html: processedHtml,
    css: cssContent,
    js: [],
    inlineJs: [],
    scripts: scriptsBundle,
    assets: [],
    baseUrl: "",
    headLinks: headLinksBundle,
  };
  await loadGrapesBundle(bundle);
}
function normalizeImportUrl(u: string) {
  let s = String(u || "")
    .trim()
    .replace(/^['"`]\s*|\s*['"`]$/g, "");
  if (!/^https?:\/\//i.test(s)) s = `https://${s.replace(/^\/+/, "")}`;
  try {
    const x = new URL(s);
    if (
      /binance\.com$/i.test(x.hostname) &&
      /\/top-gaining-crypt\b/i.test(x.pathname)
    ) {
      x.pathname = x.pathname.replace(
        /top-gaining-crypt/i,
        "top-gaining-crypto",
      );
    }
    return x.toString();
  } catch {
    return s;
  }
}
function getProjectData() {
  if (!editor) return null;
  return editor.getProjectData();
}

function loadProjectData(data: any) {
  if (!editor || !data) return;
  editor.loadProjectData(data);
}
function setEditorHtml(html: string) {
  if (!editor) return false;
  try {
    editor.setComponents(html);
    return true;
  } catch {
    return false;
  }
}
function getSeoMeta() {
  return { ...seoMeta.value };
}
function setSeoMeta(
  meta: Partial<{
    title: string;
    description: string;
    ogTitle: string;
    ogImage: string;
  }>,
) {
  seoMeta.value = { ...seoMeta.value, ...meta };
}

defineExpose({
  getHtmlWithCss,
  getExportHtml,
  setEditorHtml,
  getSeoMeta,
  setSeoMeta,
  getProjectData,
  loadProjectData,
});

async function loadCompanyTemplate() {
  if (!editor || !companyId.value || isSuperAdminPerm.value) return false;
  try {
    const res = await websiteTemplateService.getCompanyTemplate();
    if (res && res.gjs) {
      const gjs = res.gjs;

      // Reset exported script state as well as canvas DOM. Otherwise a template
      // without saved scripts can accidentally export scripts from the prior one.
      installedHeadScripts.value = Array.isArray(gjs.headScripts) ? [...gjs.headScripts] : [];
      installedBodyScripts.value = Array.isArray(gjs.bodyScripts) ? [...gjs.bodyScripts] : [];

      // Clear existing assets first
      clearImportedHeadAssets();

      // Prefer the GrapesJS snapshot, but recover from saved HTML/CSS if
      // the snapshot is malformed or incompatible with this editor version.
      const restored = restoreTemplateContent({
        projectData: gjs.projectData,
        html: gjs.html,
        css: gjs.css,
        loadProjectData: (data) => editor.loadProjectData(data),
        setHtml: (value) => editor.setComponents(value),
        setCss: (value) => editor.setStyle(value),
      });
      if (!restored) return false;

      // Inject additional assets if available
      if (gjs.headCss) {
        injectSavedHeadCss(gjs.headCss);
        try {
          const d = editor?.Canvas.getDocument();
          d?.head
            ?.querySelectorAll("style[data-aos-override]")
            .forEach((el) => el.remove());
          const ov = d?.createElement("style");
          if (ov) {
            ov.setAttribute("data-aos-override", "1");
            ov.textContent =
              'html:not(.no-js) [data-aos^="fade"][data-aos^="fade"]{opacity:1 !important;}';
            d?.head?.appendChild(ov);
          }
        } catch {}
      }
      if (gjs.headLinks) {
        injectSavedHeadLinks(gjs.headLinks);
      }
      if (gjs.runtimeCode) {
        injectSavedRuntime(gjs.runtimeCode);
      }
      if (gjs.headScripts) {
        installSavedScripts(gjs.headScripts, "head");
      }
      if (gjs.bodyScripts) {
        installSavedScripts(gjs.bodyScripts, "body");
      }
      return true;
    }
  } catch (e) {
    // It's okay if no template is found
  }
  return false;
}

function ensurePopupScript() {
  if (!editor) return;
  try {
    const doc = editor?.Canvas.getDocument();
    if (!doc) return;

    let baseUrl = "";
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (apiUrl && apiUrl.startsWith("http")) {
        baseUrl = new URL(apiUrl).origin;
      } else {
        baseUrl = window.location.origin;
      }
    } catch (e) {
      baseUrl = window.location.origin;
    }

    // Check if popup.js already exists
    const existingPopup = doc.querySelector(
      'script[src*="/ticketing/popup.js"]',
    );
    if (!existingPopup) {
      const script = doc.createElement("script");
      script.src = `${baseUrl}/ticketing/popup.js?v=` + Date.now(); // Cache busting
      doc.head.appendChild(script);
    }

    // Check if render-tickets.js already exists
    const existingRender = doc.querySelector(
      'script[src*="/ticketing/render-tickets.js"]',
    );
    if (!existingRender) {
      const script2 = doc.createElement("script");
      script2.src = `${baseUrl}/ticketing/render-tickets.js?v=` + Date.now();
      doc.head.appendChild(script2);
    }
  } catch (e) {
    console.warn("Failed to inject popup script:", e);
  }
}

onMounted(async () => {
  wbInstallGlobalDebugHooks();
  // wbDebugShowPanel();
  // wbDebug("COMPONENT onMounted(async) START");
  // Do NOT inject Bootstrap into the builder document. Bootstrap is page CSS
  // and would override GrapesJS/editor UI after mount. It must only be loaded
  // inside the Canvas iframe when an imported page explicitly needs it.
  const startEditor = async (el: HTMLElement, extraConfig: any = {}) => {
    if (editor) {
      editor.destroy();
      editor = null;
    }

    const defaults = {
      container: el,
      height: "100%",
      width: "auto",
      noticeOnUnload: false,
      storageManager: {
        autosave: false,
        autoload: false,
      },
      undoManager: {
        trackSelection: false,
      },
      selectorManager: {
        componentFirst: true,
      },
      plugins: [presetWebpage, basicBlocks, landingPagePlugin] as unknown as ((
        editor: Editor,
      ) => void)[],
      panels: { defaults: [] },
      canvas: {
        styles: [],
        scripts: [], // Imported pages provide their own scripts; avoid a global editor-level jQuery copy
      },
      assetManager: {
        assets: [],
        upload: false,
        uploadFile: async (e: unknown): Promise<void> => {
          const dt = (e as DragEvent)?.dataTransfer;
          const target = (e as { target?: { files?: FileList } }).target;
          const files: File[] = Array.from(dt?.files || target?.files || []);
          if (!files.length) return;
          const urls = await wbUploadAssets(files);
          const validUrls = urls.filter((u): u is string => !!u);
          if (editor)
            editor.AssetManager.add(validUrls.map((src) => ({ src })));
          return;
        },
        embedAsBase64: false,
        openAssetsOnDrop: true,
        autoAdd: true,
        dropzone: true,
        headers: {},
        params: {},
        multiUpload: true,
        // Custom labels (override GrapesJS defaults)
        stylePrefix: 'gjs-',
        modalTitle: 'Chọn hình ảnh',
        addBtnLabel: 'Thêm hình ảnh',
        inputPlaceholder: 'http://đường/dẫn/ảnh.jpg',
        noFilesText: 'Chưa có hình ảnh nào',
        uploadText: 'Kéo thả file vào đây hoặc nhấn để tải lên',
      },
    };

    const finalConfig = merge({}, defaults, componentProps.config, extraConfig);
    // Handle plugins array concatenation manually
    const defaultPlugins = defaults.plugins || [];
    const propPlugins = componentProps.config?.plugins || [];
    const extraPlugins = extraConfig?.plugins || [];
    finalConfig.plugins = [...defaultPlugins, ...propPlugins, ...extraPlugins];

    try {
      editor = grapesjs.init(finalConfig);
      wbDebug("grapesjs.init DONE", { editorExists: !!editor });
      wbDebugAttachFrameLifecycle();

      // GrapesJS can recreate the iframe document/head during component
      // rendering. Re-attach imported CSS/links to the NEW head instead of
      // assuming the first iframe document remains alive.
      editor.on("canvas:frame:load", () => {
        wbDebug("EXISTING canvas:frame:load handler fired");
        setTimeout(() => {
          try { restoreImportedCanvasHead(); } catch (e) {
            console.warn("[WebsiteBuilder] Canvas CSS restore failed:", e);
          }
        }, 0);
      });

      // Override Asset Manager modal text after initialization
      if (editor && editor.AssetManager) {
        const am = editor.AssetManager;
        // Hook into modal open to translate dynamic text
        const originalOpen = am.open.bind(am);
        am.open = function(options: any = {}) {
          const result = originalOpen(options);
          // Translate modal text after it's rendered
          setTimeout(() => translateAssetModal(), 50);
          return result;
        };

        // Also observe for dynamic modal creation
        const observer = new MutationObserver(() => translateAssetModal());
        observer.observe(document.body, { childList: true, subtree: true });

        function translateAssetModal() {
          const modal = document.querySelector('.gjs-mdl-dialog');
          if (!modal) return;

          // Translate title
          const title = modal.querySelector('.gjs-mdl-title');
          if (title && title.textContent?.includes('Select')) title.textContent = 'Chọn hình ảnh';

          // Translate upload area
          const uploadTitle = modal.querySelector('#gjs-am-title');
          if (uploadTitle && uploadTitle.textContent?.includes('Drop')) {
            uploadTitle.textContent = 'Kéo thả file vào đây hoặc nhấn để tải lên';
          }

          // Translate add button
          const addBtn = modal.querySelector('.gjs-btn-prim');
          if (addBtn && addBtn.textContent?.includes('Add')) addBtn.textContent = 'Thêm hình ảnh';

          // Translate input placeholder
          const input = modal.querySelector('.gjs-am-add-field input') as HTMLInputElement | null;
          if (input && (input.placeholder?.includes('http') || input.placeholder?.includes('path'))) {
            input.placeholder = 'http://đường/dẫn/ảnh.jpg';
          }

          // Translate remove asset tooltips
          const removeBtns = modal.querySelectorAll('[data-toggle="asset-remove"]');
          removeBtns.forEach((btn) => {
            if (btn instanceof HTMLElement && !btn.title) {
              btn.title = 'Xóa hình ảnh';
            }
          });

          // Translate close modal button
          const closeBtn = modal.querySelector('.gjs-mdl-btn-close') as HTMLElement | null;
          if (closeBtn && !closeBtn.title) {
            closeBtn.title = 'Đóng';
          }
        }
      }
    } catch {
      editor = grapesjs.init({
        container: el,
        height: "100%",
        width: "auto",
        noticeOnUnload: false,
        storageManager: {
          autosave: false,
          autoload: false,
        },
        panels: { defaults: [] },
        canvas: {
          styles: [],
          scripts: [
            "/ticketing/popup.js",
            "/ticketing/render-tickets.js",
          ],
        },
      });
      if (editor) {
        editor.on("canvas:frame:load", () => {
          setTimeout(() => {
            try { restoreImportedCanvasHead(); } catch (e) {
              console.warn("[WebsiteBuilder] Canvas CSS restore failed:", e);
            }
          }, 0);
        });
      }
    }

    if (editor) {
      editor.on("component:selected", () => {
        if (isMobile.value) {
          sidebarOpen.value = false;
        }
      });
      try {
        const frameEl = editor?.Canvas.getFrameEl();
        if (frameEl) {
          frameEl.addEventListener("dragover", (e: DragEvent) =>
            e.preventDefault(),
          );
          frameEl.addEventListener("drop", (e: DragEvent) => {
            e.preventDefault();
            onCanvasDrop();
          });
        }
      } catch (e) {
        console.warn("Failed to attach drop listener to frame:", e);
      }
      try {
        const dc = editor.DomComponents;
        dc.addType("company-event-block", {
          isComponent: (el: any) =>
            el.dataset && el.dataset.gjsType === "company-event-block",
          model: {
            defaults: {
              attributes: { open_popup: "true" },
              traits: [
                {
                  type: "select",
                  name: "layout",
                  label: "Bố cục",
                  options: [
                    {
                      id: "vertical",
                      value: "vertical",
                      name: "Dọc (Mặc định)",
                    },
                    {
                      id: "horizontal",
                      value: "horizontal",
                      name: "Ngang (Map trái - Vé phải)",
                    },
                    {
                      id: "horizontal-reverse",
                      value: "horizontal-reverse",
                      name: "Ngang (Vé trái - Map phải)",
                    },
                  ],
                },
                {
                  type: "checkbox",
                  name: "open_popup",
                  label: "Mở Popup Mua Vé",
                  valueTrue: "true",
                  valueFalse: "false",
                },
              ],
            },
            init() {
              this.on("change:attributes:layout", this.handleLayoutChange);
              this.on("change:attributes:open_popup", this.handlePopupChange);

              // Ensure class is synced with attribute on load
              const openPopup = this.getAttributes().open_popup;
              if (openPopup === "true" || openPopup === true) {
                const buyButtons = this.find("a.event-buy-btn");
                buyButtons.forEach((btn: any) => {
                  if (!btn.getClasses().includes("js-buy-ticket-btn")) {
                    btn.addClass("js-buy-ticket-btn");
                  }
                  // Remove target="_blank" to prevent opening new tab
                  btn.addAttributes({ target: "_self" });
                });
              }
            },
            handleLayoutChange() {
              const layout = this.getAttributes().layout || "vertical";
              const wrapper = this.find(".event-content-wrapper")[0];
              if (!wrapper) return;

              if (layout === "horizontal") {
                wrapper.addStyle({ "flex-direction": "row" });
                const children = wrapper.components();
                children.forEach((child: any) =>
                  child.addStyle({ flex: "1", "min-width": "300px" }),
                );
              } else if (layout === "horizontal-reverse") {
                wrapper.addStyle({ "flex-direction": "row-reverse" });
                const children = wrapper.components();
                children.forEach((child: any) =>
                  child.addStyle({ flex: "1", "min-width": "300px" }),
                );
              } else {
                wrapper.addStyle({ "flex-direction": "column" });
                const children = wrapper.components();
                children.forEach((child: any) =>
                  child.addStyle({ flex: "unset", width: "100%" }),
                );
              }
            },
            handlePopupChange() {
              const openPopup = this.getAttributes().open_popup;
              // Find all buy buttons inside this component
              // Note: find() returns an array of Components
              const buyButtons = this.find("a.event-buy-btn");

              buyButtons.forEach((btn: any) => {
                const classes = btn.getClasses();
                if (openPopup === "true" || openPopup === true) {
                  // Add class if not present
                  if (!classes.includes("js-buy-ticket-btn")) {
                    btn.addClass("js-buy-ticket-btn");
                  }
                  // Remove target="_blank" to prevent opening new tab
                  btn.addAttributes({ target: "_self" });
                } else {
                  // Remove class if present
                  if (classes.includes("js-buy-ticket-btn")) {
                    btn.removeClass("js-buy-ticket-btn");
                  }
                }
              });
            },
          },
        });
        dc.addType("section", {
          isComponent: (el: HTMLElement) => {
            if (!el || el.nodeType !== 1) return false;
            const tag = String(el.tagName).toLowerCase();
            const cls = String(el.getAttribute("class") || "").toLowerCase();
            return tag === "section" && cls.split(/\s+/).includes("wb-section");
          },
          model: {
            defaults: {
              tagName: "section",
              draggable: true,
              droppable: true,
            },
          },
        });
        dc.addType("hero", {
          isComponent: (el: HTMLElement) => {
            if (!el || el.nodeType !== 1) return false;
            if (String(el.tagName).toLowerCase() !== "section") return false;
            const cls = String(el.getAttribute("class") || "").toLowerCase();
            if (cls.split(/\s+/).includes("wb-hero")) return true;
            const st = String(el.getAttribute("style") || "");
            return /background-image\s*:\s*url\(/i.test(st);
          },
          model: {
            defaults: {
              tagName: "section",
              draggable: true,
              droppable: true,
            },
          },
        });
        dc.addType("header", {
          isComponent: (el: HTMLElement) => {
            if (!el || el.nodeType !== 1) return false;
            const tag = String(el.tagName).toLowerCase();
            const role = String(el.getAttribute("data-role") || "");
            return tag === "header" || role === "header";
          },
          model: {
            defaults: {
              tagName: "header",
              draggable: true,
              droppable: true,
            },
          },
        });
        dc.addType("navbar", {
          isComponent: (el: HTMLElement) => {
            if (!el || el.nodeType !== 1) return false;
            return String(el.tagName).toLowerCase() === "nav";
          },
          model: {
            defaults: {
              tagName: "nav",
              draggable: true,
              droppable: true,
            },
          },
        });
        dc.addType("link", {
          isComponent: (el: HTMLElement) => {
            if (!el || el.nodeType !== 1) return false;
            return String(el.tagName).toLowerCase() === "a";
          },
          model: {
            defaults: {
              tagName: "a",
              draggable: true,
              droppable: false,
              traits: [
                {
                  type: "text",
                  name: "href",
                  label: "Liên kết (URL)",
                },
                {
                  type: "select",
                  name: "target",
                  label: "Mở trong",
                  options: [
                    { id: "_self", value: "_self", name: "Cửa sổ hiện tại" },
                    { id: "_blank", value: "_blank", name: "Cửa sổ mới" },
                  ],
                },
                {
                  type: "checkbox",
                  name: "open_popup",
                  label: "Mở Popup Mua Vé",
                  valueTrue: "true",
                  valueFalse: "false",
                },
                {
                  type: "text",
                  name: "data-event-id",
                  label: "ID Sự Kiện",
                  placeholder: "Nhập ID sự kiện",
                },
              ],
            },
            init() {
              this.on("change:attributes:open_popup", this.handlePopupChange);

              // Sync attribute -> class on init
              const openPopup = this.getAttributes().open_popup;
              if (openPopup === "true" || openPopup === true) {
                this.addClass("js-buy-ticket-btn");
                // Remove target="_blank" to prevent opening new tab
                this.addAttributes({ target: "_self" });

                // Ensure data-event-id is set
                const currentId = this.getAttributes()["data-event-id"];
                if (!currentId) {
                  const href = this.getAttributes().href || "";
                  const match = href.match(/[?&]event_id=([^&]+)/);
                  if (match && match[1]) {
                    this.addAttributes({ "data-event-id": match[1] });
                  }
                }
              }

              // Sync class -> attribute (backward compatibility)
              const classes = this.getClasses();
              if (classes.includes("js-buy-ticket-btn")) {
                this.addAttributes({ open_popup: "true" });
              }
            },
            handlePopupChange() {
              const openPopup = this.getAttributes().open_popup;
              if (openPopup === "true" || openPopup === true) {
                this.addClass("js-buy-ticket-btn");
                // Remove target="_blank" to prevent opening new tab
                this.addAttributes({ target: "_self" });

                // Auto-extract event ID from href if not set
                const currentId = this.getAttributes()["data-event-id"];
                if (!currentId) {
                  const href = this.getAttributes().href || "";
                  const match = href.match(/[?&]event_id=([^&]+)/);
                  if (match && match[1]) {
                    this.addAttributes({ "data-event-id": match[1] });
                  }
                }
              } else {
                this.removeClass("js-buy-ticket-btn");
              }
            },
          },
        });
        dc.addType("modal", {
          isComponent: (el: HTMLElement) => {
            if (!el || el.nodeType !== 1) return false;
            return String(el.getAttribute("data-role") || "") === "modal";
          },
          model: {
            defaults: {
              tagName: "div",
              draggable: false,
              droppable: true,
            },
          },
        });
        dc.addType("slider", {
          isComponent: (el: HTMLElement) => {
            if (!el || el.nodeType !== 1) return false;
            const vp = el.querySelector(
              '[data-role="viewport"]',
            ) as HTMLElement | null;
            const roleSrc = (vp || el) as HTMLElement;
            const role = String(
              roleSrc.getAttribute("role") || "",
            ).toLowerCase();
            const hasSlides = !!(vp || el).querySelector('[data-role="slide"]');
            return hasSlides && (role === "listbox" || role === "tablist");
          },
          model: {
            defaults: {
              tagName: "div",
              draggable: true,
              droppable: true,
            },
          },
        });
        dc.addType("slider-nav", {
          isComponent: (el: HTMLElement) => {
            if (!el || el.nodeType !== 1) return false;
            const tag = String(el.tagName).toLowerCase();
            const role = String(el.getAttribute("data-role") || "");
            const cls = String(el.getAttribute("class") || "");
            return (
              tag === "button" &&
              (role === "prev" ||
                role === "next" ||
                /\bwb-slider-nav\b/.test(cls))
            );
          },
          model: {
            defaults: {
              tagName: "button",
              draggable: true,
              droppable: false,
            },
          },
        });
        dc.addType("gallery", {
          isComponent: (el: HTMLElement) => {
            if (!el || el.nodeType !== 1) return false;
            if (String(el.tagName).toLowerCase() !== "div") return false;
            const st = String(el.getAttribute("style") || "");
            const isGrid = /display\s*:\s*grid/i.test(st);
            const hasImg = !!el.querySelector("img");
            return isGrid && hasImg;
          },
          model: {
            defaults: {
              tagName: "div",
              draggable: true,
              droppable: true,
            },
          },
        });
        dc.addType("bgimage", {
          isComponent: (el: HTMLElement) => {
            if (!el || el.nodeType !== 1) return false;
            const cls = String(el.getAttribute("class") || "").toLowerCase();
            if (cls.split(/\s+/).includes("wb-bgimage")) return true;
            const st = String(el.getAttribute("style") || "");
            return /background-image\s*:\s*url\(/i.test(st);
          },
          model: {
            defaults: {
              tagName: "div",
              draggable: true,
              droppable: true,
            },
          },
        });
        dc.addType("countdown", {
          isComponent: (el: HTMLElement) => {
            if (!el || el.nodeType !== 1) return false;
            const cls = String(el.getAttribute("class") || "");
            return cls.split(/\s+/).includes("countdown-timer");
          },
          model: {
            defaults: {
              tagName: "div",
              draggable: true,
              droppable: false,
              script: function () {
                const root = this as unknown as HTMLElement;
                try {
                  const raw = root.getAttribute("data-event-json") || "";
                  let evt = null as any;
                  if (raw) {
                    try {
                      evt = JSON.parse(raw);
                    } catch {}
                  }
                  const rawStart =
                    root.getAttribute("data-start-date") ||
                    (evt && evt.startDate) ||
                    "";
                  const parseLocal = (s: string | null | undefined) => {
                    try {
                      const t = String(s || "").trim();
                      if (!t) return null;
                      const m = t.match(
                        /^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})$/,
                      );
                      if (m) {
                        const y = +m[1];
                        const mo = +m[2] - 1;
                        const d = +m[3];
                        const h = +m[4];
                        const mi = +m[5];
                        return new Date(y, mo, d, h, mi, 0, 0);
                      }
                      const d2 = new Date(t);
                      if (isNaN(d2.getTime())) return null;
                      return d2;
                    } catch {
                      return null;
                    }
                  };
                  const startDate = parseLocal(rawStart);
                  const updateDigits = (
                    days: number,
                    hours: number,
                    minutes: number,
                    seconds: number,
                  ) => {
                    const d = root.querySelector(".countdown-days");
                    const h = root.querySelector(".countdown-hours");
                    const m = root.querySelector(".countdown-minutes");
                    const sEl = root.querySelector(".countdown-seconds");
                    const pad = (n: number) => String(n).padStart(2, "0");
                    if (d) (d as HTMLElement).textContent = pad(days);
                    if (h) (h as HTMLElement).textContent = pad(hours);
                    if (m) (m as HTMLElement).textContent = pad(minutes);
                    if (sEl) (sEl as HTMLElement).textContent = pad(seconds);
                  };
                  if (!startDate) {
                    updateDigits(0, 0, 0, 0);
                    return;
                  }
                  function update() {
                    const now = new Date();
                    const diff = Math.max(0, (startDate as any) - (now as any));
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor(
                      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                    );
                    const minutes = Math.floor(
                      (diff % (1000 * 60 * 60)) / (1000 * 60),
                    );
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                    const d = root.querySelector(".countdown-days");
                    const h = root.querySelector(".countdown-hours");
                    const m = root.querySelector(".countdown-minutes");
                    const sEl = root.querySelector(".countdown-seconds");
                    const pad = (n: number) => String(n).padStart(2, "0");
                    if (d) (d as HTMLElement).textContent = pad(days);
                    if (h) (h as HTMLElement).textContent = pad(hours);
                    if (m) (m as HTMLElement).textContent = pad(minutes);
                    if (sEl) (sEl as HTMLElement).textContent = pad(seconds);
                  }
                  update();
                  if (!(root as any).__countdownTimer) {
                    (root as any).__countdownTimer = setInterval(update, 1000);
                  }
                } catch {}
              },
            },
          },
        });
      } catch {}
      try {
        const origSelect = (editor as Editor).select?.bind(editor);
        (editor as Editor & { _origSelect?: typeof origSelect })._origSelect =
          origSelect;
        (editor as Editor).select = (
          el?: Component | Component[],
          opts?: unknown,
        ): Editor => {
          const now = Date.now();
          if (
            (!autoSelectOnAdd &&
              lastAddAt &&
              now - lastAddAt < ADD_SELECT_BLOCK_MS) ||
            dupProcessing ||
            pendingSyncAfterBurst ||
            now < bulkModeUntil
          ) {
            pendingSelectedComponent = (Array.isArray(el) ? el[0] : el) || null;
            scheduleSelectionRefresh();
            return editor as Editor;
          }
          try {
            return origSelect
              ? origSelect(el, opts as any)
              : (editor as Editor);
          } catch {
            return editor as Editor;
          }
        };
      } catch {}
      editor.DeviceManager.add({
        id: "mobile",
        name: "Di động",
        width: "375px",
        widthMedia: "480px",
      });
      editor.DeviceManager.add({
        id: "tablet",
        name: "Tablet",
        width: "768px",
        widthMedia: "768px",
      });
      editor.DeviceManager.add({
        id: "desktop",
        name: "Máy tính bàn",
        width: "1024px",
        widthMedia: "1024px",
      });
      editor.DeviceManager.add({
        id: "large",
        name: "Lớn",
        width: "1440px",
        widthMedia: "1440px",
      });
      editor.setDevice?.("large");

      const width = 1440;
      if (
        componentProps.modelValue &&
        typeof componentProps.modelValue === "string"
      ) {
        editor.setComponents(componentProps.modelValue);
      } else {
        // Only load homepage template if explicitly in homepage mode
        // Do NOT auto-load company template - it causes wrong template to appear
        let loaded = false;
        if (isHomepageMode.value && isSuperAdmin.value) {
          loaded = await loadHomepageTemplate();
        }
        // If no modelValue and not homepage mode, leave editor empty
        // User can manually select template from the template picker
        if (!loaded) {
          const isHomepage = isHomepageMode.value;
          const htmlDefault = `<div style="max-width:${width}px;margin:0 auto;padding:32px 24px">
<header data-role="header" class="header" style="display:flex;align-items:center;justify-content:space-between;padding:16px 24px;border-radius:12px;background:#ffffff;box-shadow:0 1px 0 rgba(0,0,0,.04)"><div style="font-weight:800;color:#0f172a">Brand</div><nav style="display:flex;gap:16px"><a href="#" style="text-decoration:none;color:#334155">Home</a><a href="#" style="text-decoration:none;color:#334155">Product</a><a href="#" style="text-decoration:none;color:#334155">Blog</a><a href="#" style="text-decoration:none;color:#334155">Contact</a></nav></header>
<section class="wb-hero" style="margin-top:24px;position:relative;padding:48px 24px;border-radius:12px;background-image:url(/assets/home/BANNER%20SLIDER/Artboard%203@4x-100.jpg);background-size:cover;background-position:center;color:#ffffff;text-align:center"><h1 style="margin:0 0 12px;font-size:36px;font-weight:800">Tiêu đề trang</h1><p style="margin:0 0 20px;opacity:.9">Mô tả ngắn</p><a href="#" style="background:#111827;color:#fff;padding:12px 18px;border-radius:12px;text-decoration:none">Bắt đầu</a></section>
<section style="margin-top:24px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px"><div style="padding:16px;border:1px solid #e5e7eb;border-radius:12px">Khối A</div><div style="padding:16px;border:1px solid #e5e7eb;border-radius:12px">Khối B</div><div style="padding:16px;border:1px solid #e5e7eb;border-radius:12px">Khối C</div></section>
</div>`;
          const htmlHomepage = `<div style="max-width:${width}px;margin:0 auto;padding:18px 16px 64px;background:#eef2f5">
<section class="hp-hero" style="--hp-hero:url(/assets/home/BANNER%20SLIDER/Artboard%203@4x-100.jpg)"></section>
<section class="hp-section">
<style>
*{box-sizing:border-box}
.hp-section{margin-top:18px}
.hp-hero{border-radius:18px;overflow:hidden;width:100%;aspect-ratio:7681/3601;background:var(--hp-hero) center/cover no-repeat;box-shadow:0 12px 30px rgba(15,23,42,.18)}
.hp-hero-overlay{min-height:260px;display:flex;justify-content:flex-end;align-items:center;padding:22px;background:linear-gradient(90deg,rgba(2,6,23,.12) 0%,rgba(2,6,23,.45) 60%,rgba(2,6,23,.55) 100%)}
.hp-hero-copy{max-width:520px;color:#fff;text-align:right}
.hp-hero-kicker{font-size:clamp(18px,2.2vw,22px);font-weight:900;letter-spacing:1px;opacity:.95}
.hp-hero-title{margin:6px 0 6px;font-size:clamp(36px,5.2vw,56px);font-weight:900;letter-spacing:1px;line-height:1}
.hp-hero-sub{font-size:clamp(12px,1.35vw,13px);opacity:.92}
.hp-hero-actions{margin-top:14px;display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap}
.hp-btn{display:inline-block;text-decoration:none;border-radius:999px;padding:10px 16px;font-weight:900}
.hp-btn-primary{background:#ff7a00;color:#fff}
.hp-btn-secondary{border:1px solid rgba(255,255,255,.75);color:#fff}
.hp-section>h2,.hp-section>p{position:relative;z-index:5}
.hp-feature-grid{margin-top:32px;position:relative;z-index:1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));column-gap:18px;row-gap:18px}
.hp-feature-item{position:relative;--hp-feature-icon-top:10px;padding-top:calc(56px + var(--hp-feature-icon-top))}
.hp-feature-card{position:relative;z-index:1;background:#fff;border-radius:22px;padding:92px 22px 18px;border:1px solid rgba(15,23,42,.06);box-shadow:0 14px 34px rgba(15,23,42,.14);text-align:center;min-height:240px}
.hp-feature-iconWrap{position:absolute;z-index:2;top:var(--hp-feature-icon-top);left:50%;transform:translateX(-50%);width:200px;height:150px;display:grid;place-items:center}
.hp-feature-plate{width:100%;height:100%;background:rgba(255,255,255,.96);clip-path:polygon(0% 0%,100% 0%,88% 100%,12% 100%);border-radius:26px;display:grid;place-items:center;box-shadow:0 18px 42px rgba(15,23,42,.18)}
.hp-feature-plate img{width:84px;height:84px;object-fit:contain;display:block}
.hp-feature-title{font-size:28px;font-weight:900;color:#111827;letter-spacing:-.2px}
.hp-feature-desc{margin-top:8px;font-size:18px;color:#6b7280;line-height:1.45}
.hp-feature-points{margin-top:16px;display:flex;gap:18px;justify-content:center;flex-wrap:nowrap;font-size:13px;font-weight:900;color:#111827}
.hp-feature-point{display:inline-flex;align-items:center;gap:8px;white-space:nowrap}
.hp-feature-check{width:auto;height:auto;border-radius:0;display:inline-block;background:transparent;color:#22c55e;font-size:18px;line-height:1;font-weight:900}
.hp-how{margin-top:18px;position:relative;width:100vw;margin-left:calc(50% - 50vw);background:url(/assets/home/SECTION/Artboard%209@4x-100.jpg) center/cover no-repeat;padding:32px 0}
.hp-how::before{content:"";position:absolute;inset:0;background:rgba(2,6,23,.55)}
.hp-how-banner{position:relative;z-index:1;max-width:1440px;margin:0 auto;padding:0 16px;background:transparent;border-radius:0;overflow:visible}
.hp-how-head{text-align:center;color:#fff}
.hp-how-title{font-size:clamp(26px,3.2vw,44px);font-weight:950;letter-spacing:.8px}
.hp-how-sub{margin-top:6px;font-size:clamp(14px,1.4vw,18px);opacity:.92}
.hp-how-card{margin-top:14px;border-radius:18px;background:#fff;overflow:hidden;border:1px solid rgba(255,255,255,.22)}
.hp-how-list{display:flex;flex-direction:column}
.hp-how-row{display:grid;grid-template-columns:220px 88px 160px 1fr;align-items:center;gap:14px;padding:10px 14px}
.hp-how-row + .hp-how-row{border-top:1px solid rgba(15,23,42,.08)}
.hp-how-thumb{height:82px;border-radius:14px;overflow:hidden;background:#e5e7eb;border:1px solid rgba(15,23,42,.08)}
.hp-how-thumb img{width:100%;height:100%;object-fit:cover;display:block}
.hp-how-num{font-size:54px;font-weight:950;color:#0d5c69;line-height:1;text-align:right}
.hp-how-rowTitle{font-size:18px;font-weight:950;color:#0b6a77;letter-spacing:.4px}
.hp-how-rowDesc{color:#475569;font-size:14px;line-height:1.35}
.hp-packages{margin-top:18px;border-radius:18px;overflow:hidden;position:relative;padding:22px;background:#0b1220}
.hp-packages::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(34,197,195,.92) 0%,rgba(11,44,128,.92) 65%),radial-gradient(520px 260px at 18% 40%,rgba(110,230,170,.55) 0%,rgba(110,230,170,0) 68%),radial-gradient(640px 320px at 80% 30%,rgba(59,130,246,.45) 0%,rgba(59,130,246,0) 70%);filter:blur(1px)}
.hp-packages-inner{position:relative}
.hp-packages-head{text-align:center;margin-bottom:14px;position:relative}
.hp-packages-title{font-size:clamp(26px,3.2vw,44px);font-weight:950;letter-spacing:1px;line-height:1;color:#fff;text-transform:uppercase}
.hp-packages-sub{margin-top:10px;color:rgba(255,255,255,.88);font-size:clamp(14px,1.4vw,18px)}
.hp-packages-grid{margin-top:14px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;align-items:stretch;position:relative}
.hp-package-card{position:relative;border-radius:22px;padding:18px;background:rgba(255,255,255,.96);border:3px solid rgba(226,232,240,.95);box-shadow:0 24px 60px rgba(2,6,23,.18),0 2px 0 rgba(255,255,255,.45) inset;text-align:center}
.hp-package-card::before{content:"";position:absolute;inset:10px;border-radius:16px;border:2px solid rgba(15,23,42,.06);pointer-events:none}
.hp-package-card.is-featured{background:rgba(11,63,74,.98);border:4px solid rgba(110,230,170,.85);box-shadow:0 26px 64px rgba(2,6,23,.28),0 0 0 1px rgba(255,255,255,.1) inset}
.hp-package-name{font-weight:900;color:#0f172a;letter-spacing:.6px;font-size:24px}
.hp-package-card.is-featured .hp-package-name{color:#fff}
.hp-package-sub{margin-top:6px;font-weight:800;color:rgba(15,23,42,.7);font-size:18px}
.hp-package-card.is-featured .hp-package-sub{color:rgba(255,255,255,.9)}
.hp-package-features{margin:16px 0 0;padding:0;list-style:none;display:grid;gap:10px;text-align:left;color:rgba(15,23,42,.72);font-weight:700;position:relative}
.hp-package-card.is-featured .hp-package-features{color:rgba(255,255,255,.92)}
.hp-package-features li{display:flex;gap:10px;align-items:flex-start}
.hp-package-features li::before{content:"✓";color:#22c55e;font-weight:950;line-height:1;margin-top:2px}
.hp-package-card.is-featured .hp-package-features li::before{color:#6ee6aa}
.hp-package-btn{display:block;width:100%;margin-top:18px;border-radius:14px;padding:12px 14px;background:#0f2b3a;color:#fff;font-weight:950;letter-spacing:.8px;text-decoration:none;position:relative}
.hp-package-btnFeatured{background:linear-gradient(90deg,#86efac 0%,#34d399 45%,#22c55e 100%);color:#0b1220}
.hp-head{text-align:center;margin-bottom:14px}
.hp-head-title{font-size:clamp(26px,3.2vw,44px);font-weight:950;letter-spacing:.8px;color:#0f172a}
.hp-head-sub{margin-top:6px;color:#64748b;font-size:clamp(14px,1.4vw,18px)}
.hp-checkin{margin-top:18px}
.hp-checkin-grid{display:grid;grid-template-columns:1.08fr .92fr;gap:22px;align-items:center}
.hp-checkin-left img{width:100%;height:100%;max-height:460px;object-fit:cover;display:block;border-radius:22px;border:3px solid rgba(15,43,58,.9);box-shadow:0 24px 60px rgba(2,6,23,.22),0 2px 0 rgba(255,255,255,.16) inset}
.hp-checkin-heading{font-size:clamp(26px,3.2vw,44px);font-weight:950;letter-spacing:1px;line-height:1.05;color:#0f2b3a;text-transform:uppercase}
.hp-checkin-card{margin-top:14px;background:#fff;border-radius:18px;padding:18px 18px 16px;border:1px solid rgba(15,23,42,.08);box-shadow:0 22px 58px rgba(2,6,23,.16),0 6px 18px rgba(2,6,23,.08)}
.hp-checkin-cardHead{display:flex;align-items:center;gap:10px;font-size:20px;font-weight:950;color:#0f172a}
.hp-checkin-icon{width:34px;height:34px;flex:0 0 34px;display:block}
.hp-checkin-badge{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:#f8fafc;border:1px solid rgba(15,23,42,.12);color:#0d5c69;font-weight:950;font-size:12px;letter-spacing:.6px}
.hp-checkin-section{margin-top:12px}
.hp-checkin-label{font-weight:950;color:#0f172a;font-size:13px}
.hp-checkin-text{margin-top:6px;color:#64748b;font-size:13px;line-height:1.45}
.hp-checkin-points{margin-top:8px;display:grid;gap:10px}
.hp-checkin-point{color:#64748b;font-size:13px;line-height:1.45}
.hp-checkin-pointTitle{font-weight:950;color:#0f172a}
.hp-process{margin-top:18px}
.hp-process-grid{margin-top:10px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.hp-process-card{background:#0b3f4a;border-radius:16px;padding:18px 18px 20px;border:4px solid rgba(110,230,170,.85);box-shadow:0 24px 60px rgba(2,6,23,.22),0 2px 0 rgba(255,255,255,.08) inset}
.hp-process-title{color:#fff;text-align:center;font-size:24px;font-weight:950;letter-spacing:.8px;padding:8px 0 14px;position:relative}
.hp-process-title::after{content:"";display:block;height:1px;background:rgba(110,230,170,.55);margin-top:12px}
.hp-process-list{margin:0;padding:0;list-style:none;display:grid;gap:12px;color:rgba(255,255,255,.92);line-height:1.5;font-weight:600;font-size:14px}
.hp-process-list li{display:flex;gap:10px;align-items:flex-start}
.hp-process-list li::before{content:"";width:10px;height:10px;border-radius:999px;background:#6ee6aa;margin-top:6px;box-shadow:0 0 0 3px rgba(110,230,170,.16);flex:0 0 10px}
.hp-testimonials{margin-top:18px}
.hp-testimonials-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.hp-testimonial-card{background:#fff;border-radius:18px;padding:18px;box-shadow:0 14px 34px rgba(15,23,42,.14);border:1px solid rgba(15,23,42,.06)}
.hp-testimonial-quote{color:#0f172a;font-weight:700;line-height:1.55}
.hp-testimonial-author{margin-top:12px;color:#64748b;font-weight:800}
.hp-cta{margin-top:18px;border-radius:18px;overflow:hidden;position:relative;min-height:320px;box-shadow:0 12px 30px rgba(15,23,42,.18)}
.hp-cta-bg{position:absolute;inset:0}
.hp-cta-bg img{width:100%;height:100%;object-fit:cover;display:block}
.hp-cta-content{position:relative;z-index:1;display:grid;grid-template-columns:1fr 420px;gap:16px;align-items:center;padding:22px;background:linear-gradient(90deg,rgba(2,6,23,.25) 0%,rgba(2,6,23,.35) 45%,rgba(2,6,23,.55) 100%)}
.hp-cta-title{font-size:clamp(22px,2.4vw,34px);font-weight:950;letter-spacing:.8px;color:#fff}
.hp-cta-sub{margin-top:8px;color:rgba(255,255,255,.9)}
.hp-cta-card{background:rgba(255,255,255,.92);border-radius:16px;padding:16px;border:1px solid rgba(15,23,42,.06)}
.hp-cta-card-title{font-weight:900;color:#0f172a;margin-bottom:10px}
.hp-cta-form{display:grid;gap:10px}
.hp-input{width:100%;padding:12px 12px;border:1px solid #e5e7eb;border-radius:12px;outline:none}
.hp-textarea{width:100%;padding:12px 12px;border:1px solid #e5e7eb;border-radius:12px;outline:none;resize:vertical}
.hp-btn-block{width:100%;text-align:center}
.hp-contact{margin-top:18px}
.hp-contact-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:16px;align-items:center}
.hp-contact-form{background:#fff;border-radius:18px;padding:18px;border:1px solid rgba(15,23,42,.06);box-shadow:0 14px 34px rgba(15,23,42,.14)}
.hp-contact-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
.hp-contact-actions{margin-top:12px}
.hp-contact-brand{display:grid;place-items:center}
.hp-contact-brand img{max-width:320px;width:100%;height:auto;display:block}
@media (max-width: 1024px){.hp-feature-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.hp-feature-item{--hp-feature-icon-top:8px;padding-top:calc(52px + var(--hp-feature-icon-top))}.hp-feature-iconWrap{width:180px;height:140px}.hp-feature-plate img{width:78px;height:78px}.hp-feature-points{flex-wrap:wrap}.hp-feature-point{white-space:normal}.hp-packages-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.hp-process-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.hp-cta-content{grid-template-columns:1fr 360px}}
@media (max-width: 768px){.hp-hero-overlay{justify-content:center;padding:16px;background:linear-gradient(180deg,rgba(2,6,23,.2) 0%,rgba(2,6,23,.55) 100%)}.hp-hero-copy{text-align:center}.hp-hero-actions{justify-content:center}}
@media (max-width: 768px){.hp-feature-grid{margin-top:24px;grid-template-columns:1fr;row-gap:18px}.hp-feature-item{--hp-feature-icon-top:6px;padding-top:calc(52px + var(--hp-feature-icon-top))}.hp-feature-card{padding:84px 16px 16px;min-height:auto}.hp-feature-iconWrap{width:180px;height:140px;top:var(--hp-feature-icon-top)}.hp-feature-plate img{width:78px;height:78px}.hp-feature-title{font-size:22px}.hp-feature-desc{font-size:14px}}
@media (max-width: 768px){.hp-how-row{grid-template-columns:140px 74px 1fr;grid-template-rows:auto auto;align-items:center;padding:10px 12px}.hp-how-thumb{grid-row:1/3}.hp-how-num{grid-row:1/3;font-size:40px;align-self:center}.hp-how-rowTitle{grid-column:3}.hp-how-rowDesc{grid-column:3}.hp-packages-grid{grid-template-columns:1fr}.hp-packages-title{font-size:38px}.hp-packages-sub{font-size:14px}.hp-checkin-grid{grid-template-columns:1fr}.hp-checkin-heading{font-size:38px;text-align:center}.hp-checkin-left img{max-height:340px}.hp-process .hp-head-title{font-size:38px}.hp-process-grid{grid-template-columns:1fr}.hp-testimonials-grid{grid-template-columns:1fr}.hp-cta-content{grid-template-columns:1fr}.hp-contact-grid{grid-template-columns:1fr}.hp-contact-row{grid-template-columns:1fr}}
</style>
<div class="hp-head">
  <div class="hp-head-title">TÍNH NĂNG NỔI BẬT</div>
  <div class="hp-head-sub">Hệ sinh thái hỗ trợ tổ chức sự kiện từ A‑Z</div>
</div>
<div class="hp-feature-grid">
  <div class="hp-feature-item">
    <div class="hp-feature-iconWrap"><div class="hp-feature-plate"><img src="/assets/home/ICON/Artboard%2010.svg" alt=""/></div></div>
    <div class="hp-feature-card">
      <div class="hp-feature-title">Tạo sự kiện dễ dàng</div>
      <div class="hp-feature-desc">Giao diện trực quan, đầy đủ thông tin</div>
      <div class="hp-feature-points">
        <span class="hp-feature-point"><span class="hp-feature-check">✓</span>Thiết lập nhanh</span>
        <span class="hp-feature-point"><span class="hp-feature-check">✓</span>Tùy biến linh hoạt</span>
        <span class="hp-feature-point"><span class="hp-feature-check">✓</span>Dễ vận hành</span>
      </div>
    </div>
  </div>
  <div class="hp-feature-item">
    <div class="hp-feature-iconWrap"><div class="hp-feature-plate"><img src="/assets/home/ICON/Artboard%2013.svg" alt=""/></div></div>
    <div class="hp-feature-card">
      <div class="hp-feature-title">Quản lý người tham gia</div>
      <div class="hp-feature-desc">Gửi lời mời, xử lý đăng ký</div>
      <div class="hp-feature-points">
        <span class="hp-feature-point"><span class="hp-feature-check">✓</span>Danh sách realtime</span>
        <span class="hp-feature-point"><span class="hp-feature-check">✓</span>Phân nhóm dễ</span>
        <span class="hp-feature-point"><span class="hp-feature-check">✓</span>Xuất dữ liệu</span>
      </div>
    </div>
  </div>
  <div class="hp-feature-item">
    <div class="hp-feature-iconWrap"><div class="hp-feature-plate"><img src="/assets/home/ICON/Artboard%2011.svg" alt=""/></div></div>
    <div class="hp-feature-card">
      <div class="hp-feature-title">Báo cáo chi tiết</div>
      <div class="hp-feature-desc">Phân tích hiệu quả thời gian thực</div>
      <div class="hp-feature-points">
        <span class="hp-feature-point"><span class="hp-feature-check">✓</span>Tổng quan nhanh</span>
        <span class="hp-feature-point"><span class="hp-feature-check">✓</span>Biểu đồ rõ ràng</span>
        <span class="hp-feature-point"><span class="hp-feature-check">✓</span>Theo dõi realtime</span>
      </div>
    </div>
  </div>
  <div class="hp-feature-item">
    <div class="hp-feature-iconWrap"><div class="hp-feature-plate"><img src="/assets/home/ICON/Artboard%2015.svg" alt=""/></div></div>
    <div class="hp-feature-card">
      <div class="hp-feature-title">Thanh toán tích hợp</div>
      <div class="hp-feature-desc">Tích hợp đa dạng cổng thanh toán để xử lý giao dịch an toàn và nhanh chóng</div>
      <div class="hp-feature-points">
        <span class="hp-feature-point"><span class="hp-feature-check">✓</span>Nhiều phương thức</span>
        <span class="hp-feature-point"><span class="hp-feature-check">✓</span>Bảo mật cao</span>
        <span class="hp-feature-point"><span class="hp-feature-check">✓</span>Hoàn toàn tự động</span>
      </div>
    </div>
  </div>
  <div class="hp-feature-item">
    <div class="hp-feature-iconWrap"><div class="hp-feature-plate"><img src="/assets/home/ICON/Artboard%2013_1.svg" alt=""/></div></div>
    <div class="hp-feature-card">
      <div class="hp-feature-title">Ứng dụng di động</div>
      <div class="hp-feature-desc">Quản lý mọi nơi</div>
      <div class="hp-feature-points">
        <span class="hp-feature-point"><span class="hp-feature-check">✓</span>Check‑in nhanh</span>
        <span class="hp-feature-point"><span class="hp-feature-check">✓</span>Đồng bộ tức thì</span>
        <span class="hp-feature-point"><span class="hp-feature-check">✓</span>Hoạt động ổn định</span>
      </div>
    </div>
  </div>
  <div class="hp-feature-item">
    <div class="hp-feature-iconWrap"><div class="hp-feature-plate"><img src="/assets/home/ICON/Artboard%2014.svg" alt=""/></div></div>
    <div class="hp-feature-card">
      <div class="hp-feature-title">Hỗ trợ 24/7</div>
      <div class="hp-feature-desc">Chat, hotline, tài liệu</div>
      <div class="hp-feature-points">
        <span class="hp-feature-point"><span class="hp-feature-check">✓</span>Tư vấn nhanh</span>
        <span class="hp-feature-point"><span class="hp-feature-check">✓</span>Hướng dẫn đầy đủ</span>
        <span class="hp-feature-point"><span class="hp-feature-check">✓</span>Hỗ trợ sự cố</span>
      </div>
    </div>
  </div>
</div>
</section>
<section class="hp-how">
  <div class="hp-how-banner">
  <div class="hp-how-head">
    <div class="hp-how-title">CÁCH THỨC HOẠT ĐỘNG</div>
    <div class="hp-how-sub">Chỉ với 4 bước đơn giản để tổ chức sự kiện thành công</div>
  </div>
  <div class="hp-how-card">
    <div class="hp-how-list">
      <div class="hp-how-row">
        <div class="hp-how-thumb"><img src="/assets/home/SECTION/Artboard%207@4x-100.jpg" alt=""/></div>
        <div class="hp-how-num">01</div>
        <div class="hp-how-rowTitle">Đăng ký tài khoản</div>
        <div class="hp-how-rowDesc">Tạo tài khoản miễn phí và truy cập vào dashboard quản lý</div>
      </div>
      <div class="hp-how-row">
        <div class="hp-how-thumb"><img src="/assets/home/SECTION/Artboard%207_1@4x-100.jpg" alt=""/></div>
        <div class="hp-how-num">02</div>
        <div class="hp-how-rowTitle">Thiết lập sự kiện</div>
        <div class="hp-how-rowDesc">Điền thông tin sự kiện, thiết lập vé và cấu hình các tùy chọn</div>
      </div>
      <div class="hp-how-row">
        <div class="hp-how-thumb"><img src="/assets/home/SECTION/Artboard%209@4x-100.jpg" alt=""/></div>
        <div class="hp-how-num">03</div>
        <div class="hp-how-rowTitle">Quảng bá sự kiện</div>
        <div class="hp-how-rowDesc">Chia sẻ link sự kiện và gửi lời mời đến danh sách khách hàng</div>
      </div>
      <div class="hp-how-row">
        <div class="hp-how-thumb"><img src="/assets/home/images/Artboard%2020@4x-100.jpg" alt=""/></div>
        <div class="hp-how-num">04</div>
        <div class="hp-how-rowTitle">Theo dõi & phân tích</div>
        <div class="hp-how-rowDesc">Giám sát tình hình đăng ký và phân tích hiệu quả sự kiện</div>
      </div>
    </div>
  </div>
  </div>
</section>
<section class="hp-checkin">
  <div class="hp-checkin-grid">
    <div class="hp-checkin-left">
      <img src="/assets/home/images/Section%20QR%20Code%20Check-in.jpg" alt="QR Code Check-in"/>
    </div>
    <div class="hp-checkin-right">
      <div class="hp-checkin-heading">HÌNH THỨC<br/>CHECK IN</div>
      <div class="hp-checkin-card">
        <div class="hp-checkin-cardHead">
          <img class="hp-checkin-icon" src="/assets/home/ICON/Artboard%2017%20(Section%20QR%20Code%20Check-in).svg" alt=""/>
          <div>CHECK‑IN BẰNG QR CODE</div>
        </div>
        <div class="hp-checkin-section">
          <div class="hp-checkin-label">Mô tả ngắn gọn:</div>
          <div class="hp-checkin-text">Check‑in bằng mã QR nhanh chóng, hiện đại và phù hợp với nhiều loại hình sự kiện.</div>
        </div>
        <div class="hp-checkin-section">
          <div class="hp-checkin-label">Điểm nổi bật:</div>
          <div class="hp-checkin-points">
            <div class="hp-checkin-point"><span class="hp-checkin-pointTitle">Linh hoạt:</span> Khách mời có thể check‑in bằng cách quét mã QR trên thiết bị nhận diện hoặc trực tiếp từ ứng dụng.</div>
            <div class="hp-checkin-point"><span class="hp-checkin-pointTitle">Nhanh chóng:</span> Quy trình check‑in được tối ưu hoá, giúp giảm thiểu thao tác thủ công và không cần xử lý giấy tờ phức tạp.</div>
            <div class="hp-checkin-point"><span class="hp-checkin-pointTitle">Tiết kiệm nhân sự:</span> Chỉ cần 1–2 nhân viên vẫn có thể quản lý và hỗ trợ check‑in cho số lượng lớn khách tham dự.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="hp-process">
  <div class="hp-head">
    <div class="hp-head-title">QUY TRÌNH SỬ DỤNG</div>
  </div>
  <div class="hp-process-grid">
    <div class="hp-process-card">
      <div class="hp-process-title">TRƯỚC SỰ KIỆN</div>
      <ul class="hp-process-list">
        <li>Đăng ký tham gia</li>
        <li>Thiết lập sự kiện</li>
        <li>Thiết kế thư mời, landing page</li>
        <li>Gửi email hoặc SMS xác nhận đăng ký</li>
        <li>Hỗ trợ trước sự kiện</li>
      </ul>
    </div>
    <div class="hp-process-card">
      <div class="hp-process-title">TRONG SỰ KIỆN</div>
      <ul class="hp-process-list">
        <li>Check-in sự kiện từ QR Code</li>
        <li>Kết nối màn hình Welcome</li>
        <li>Thông báo khách VIP</li>
        <li>Thống kê Check-in</li>
        <li>In name-tag</li>
      </ul>
    </div>
    <div class="hp-process-card">
      <div class="hp-process-title">SAU SỰ KIỆN</div>
      <ul class="hp-process-list">
        <li>Xuất báo cáo thống kê</li>
        <li>Gửi email cảm ơn</li>
      </ul>
    </div>
  </div>
</section>
<section class="hp-packages">
  <div class="hp-packages-inner">
    <div class="hp-packages-head">
      <div class="hp-packages-title">GÓI DỊCH VỤ</div>
      <div class="hp-packages-sub">Chọn gói phù hợp với nhu cầu của bạn</div>
    </div>
    <div class="hp-packages-grid">
      <div class="hp-package-card">
        <div class="hp-package-name">CƠ BẢN</div>
        <div class="hp-package-sub">Miễn phí 14 ngày</div>
        <ul class="hp-package-features">
          <li>Tối đa 1 sự kiện</li>
          <li>150 khách hàng</li>
          <li>500MB dung lượng</li>
          <li>Báo cáo cơ bản</li>
          <li>API tích hợp</li>
        </ul>
        <a class="hp-package-btn" href="#">BẮT ĐẦU NGAY</a>
      </div>
      <div class="hp-package-card">
        <div class="hp-package-name">CHUYÊN NGHIỆP</div>
        <div class="hp-package-sub">Liên hệ</div>
        <ul class="hp-package-features">
          <li>Sự kiện không giới hạn</li>
          <li>1,000 người tham gia/sự kiện</li>
          <li>Báo cáo chi tiết</li>
          <li>Tích hợp thanh toán</li>
          <li>Hỗ trợ 24/7</li>
        </ul>
        <a class="hp-package-btn" href="#">LIÊN HỆ NGAY</a>
      </div>
      <div class="hp-package-card is-featured">
        <div class="hp-package-name">CUSTOM</div>
        <div class="hp-package-sub">Liên hệ</div>
        <ul class="hp-package-features">
          <li>Tất cả tính năng Enterprise</li>
          <li>Phát triển tính năng riêng</li>
          <li>Hỗ trợ ưu tiên</li>
          <li>Tích hợp hệ thống nội bộ</li>
          <li>Hỗ trợ &amp; vận hành riêng</li>
        </ul>
        <a class="hp-package-btn hp-package-btnFeatured" href="#">LIÊN HỆ NGAY</a>
      </div>
    </div>
  </div>
</section>
<section class="hp-testimonials">
  <div class="hp-head">
    <div class="hp-head-title">KHÁCH HÀNG NÓI GÌ VỀ CHÚNG TÔI</div>
    <div class="hp-head-sub">Hơn 1.000 khách hàng tin tưởng</div>
  </div>
  <div class="hp-testimonials-grid">
    <div class="hp-testimonial-card">
      <div class="hp-testimonial-quote">“Hệ thống check‑in rất nhanh, giảm ùn tắc rõ rệt. Báo cáo realtime giúp đội vận hành kiểm soát tốt hơn.”</div>
      <div class="hp-testimonial-author">Ban tổ chức sự kiện</div>
    </div>
    <div class="hp-testimonial-card">
      <div class="hp-testimonial-quote">“Giao diện dễ dùng, hỗ trợ nhanh. Website sự kiện tùy biến linh hoạt, triển khai nhanh cho nhiều chương trình.”</div>
      <div class="hp-testimonial-author">Doanh nghiệp khách hàng</div>
    </div>
  </div>
</section>
<section class="hp-cta">
  <div class="hp-cta-bg">
    <img src="/assets/home/images/Section%20CTA.png" alt="CTA"/>
  </div>
  <div class="hp-cta-content">
    <div class="hp-cta-left">
      <div class="hp-cta-title">SẴN SÀNG TỔ CHỨC SỰ KIỆN ĐẦU TIÊN?</div>
      <div class="hp-cta-sub">Đăng ký dùng thử 14 ngày miễn phí, không cần thẻ.</div>
    </div>
    <div class="hp-cta-right">
      <div class="hp-cta-card">
        <div class="hp-cta-card-title">Đăng ký dùng thử</div>
        <div class="hp-cta-form">
          <input class="hp-input" placeholder="Họ và tên"/>
          <input class="hp-input" placeholder="Email"/>
          <input class="hp-input" placeholder="Số điện thoại"/>
          <a class="hp-btn hp-btn-primary hp-btn-block" href="#">Bắt đầu dùng thử</a>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="hp-contact">
  <div class="hp-head">
    <div class="hp-head-title">LIÊN HỆ VỚI CHÚNG TÔI</div>
  </div>
  <div class="hp-contact-grid">
    <div class="hp-contact-form">
      <div class="hp-contact-row">
        <input class="hp-input" placeholder="Họ và tên"/>
        <input class="hp-input" placeholder="Email"/>
      </div>
      <div class="hp-contact-row">
        <input class="hp-input" placeholder="Số điện thoại"/>
        <input class="hp-input" placeholder="Chủ đề"/>
      </div>
      <textarea class="hp-textarea" rows="4" placeholder="Nội dung"></textarea>
      <div class="hp-contact-actions">
        <a class="hp-btn hp-btn-primary" href="#">Gửi liên hệ</a>
      </div>
    </div>
    <div class="hp-contact-brand">
      <img src="/assets/home/LOGO%20HTECH/Artboard%2023@4x.png" alt="H-tech"/>
    </div>
  </div>
</section>
</div>`;
          editor.setComponents(isHomepage ? htmlHomepage : htmlDefault);
          if (isHomepage) injectHomepageOverlayFixCss();
        }
      }

      if (pendingTemplate.value) {
        const tpl = pendingTemplate.value;

        // Replace [id_event] with actual event ID if available
        if (eventIdParam.value) {
          if (tpl.projectData) {
            tpl.projectData = replaceEventIdPlaceholder(
              tpl.projectData,
              eventIdParam.value,
            );
          } else if (tpl.html) {
            tpl.html = replaceEventIdPlaceholder(tpl.html, eventIdParam.value);
          }
        }

        // Replace [ev_*] placeholders for CompanyAdmin when editing in event context
        if (isCompanyAdmin.value && eventContext.value) {
          if (tpl.projectData) {
            tpl.projectData = replaceEventPlaceholders(
              tpl.projectData,
              eventContext.value,
            );
          } else if (tpl.html) {
            tpl.html = replaceEventPlaceholders(tpl.html, eventContext.value);
          }
        }

        try {
          // A queued parent template must replace the previous canvas state,
          // including assets that are absent from the incoming template.
          clearImportedHeadAssets();
          installedHeadScripts.value = Array.isArray(tpl.headScripts)
            ? [...tpl.headScripts]
            : [];
          installedBodyScripts.value = Array.isArray(tpl.bodyScripts)
            ? [...tpl.bodyScripts]
            : [];

          if (tpl.projectData) {
            loadProjectData(tpl.projectData);
          } else {
            // Empty HTML is valid and must clear the previously displayed page.
            setEditorHtml(tpl.html || "");
          }

          // Empty CSS is meaningful: don't retain imported CSS from the old page.
          setCanvasImportCss(tpl.css || "");
          if (tpl.headCss) {
            injectSavedHeadCss(tpl.headCss);
          }
          if (Array.isArray(tpl.headLinks) && tpl.headLinks.length > 0) {
            injectSavedHeadLinks(tpl.headLinks);
          }
          if (tpl.runtimeCode) {
            injectSavedRuntime(tpl.runtimeCode);
          }
          if (installedHeadScripts.value.length > 0) {
            installSavedScripts(installedHeadScripts.value, "head");
          }
          if (installedBodyScripts.value.length > 0) {
            installSavedScripts(installedBodyScripts.value, "body");
          }
        } catch (error) {
          console.error("[WebsiteBuilder] Không thể áp dụng template đang chờ:", error);
          showFeedback("Không thể nạp đầy đủ template. Vui lòng thử tải lại.", "error");
        }
        pendingTemplate.value = null;
      }

      try {
        ensurePopupScript();
        const d = editor?.Canvas.getDocument?.();
        const root = d?.body || null;
        if (root) {
          const bad = root.querySelectorAll('[data-gjs-type="default"]');
          bad.forEach((el: Element) => {
            try {
              (el as HTMLElement).removeAttribute("data-gjs-type");
            } catch {}
          });
          if (!isHomepageMode.value) {
            const headers = root.querySelectorAll("header");
            headers.forEach((h: Element) => {
              try {
                const he = h as HTMLElement;
                if (!he.getAttribute("data-role"))
                  he.setAttribute("data-role", "header");
                const cls = String(he.getAttribute("class") || "");
                if (!/\bheader\b/.test(cls))
                  he.setAttribute("class", cls ? cls + " header" : "header");
              } catch {}
            });
          }
        }
      } catch {}

      let isReplacingPlaceholders = false;

      const applyEventPlaceholdersToEditor = () => {
        if (
          !editor ||
          !isCompanyAdmin.value ||
          !eventContext.value ||
          isReplacingPlaceholders
        )
          return;
        try {
          const currentHtml = editor.getHtml();
          const replacedHtml = replaceEventPlaceholders(
            currentHtml,
            eventContext.value,
          );
          if (replacedHtml && replacedHtml !== currentHtml) {
            isReplacingPlaceholders = true;
            editor.setComponents(replacedHtml);
            setTimeout(() => {
              isReplacingPlaceholders = false;
            }, 0);
          }
        } catch {
          isReplacingPlaceholders = false;
        }
      };

      editor.on("component:add", (m: Component) => {
        if (isHomepageMode.value) {
          try {
            const tag = String(
              (m as unknown as { getTagName?: () => string }).getTagName?.() ||
                (m as unknown as { tagName?: string }).tagName ||
                "",
            ).toLowerCase();
            const attrs =
              (
                m as unknown as {
                  getAttributes?: () => Record<string, unknown>;
                }
              ).getAttributes?.() || {};
            const role = String(
              (attrs as Record<string, unknown>)["data-role"] || "",
            );
            if (tag === "header" || role === "header") {
              try {
                (m as unknown as { remove?: () => void }).remove?.();
              } catch {}
              return;
            }
          } catch {}
        }
        if (isAddingBlock.value) return; // Skip heavy logic during bulk add
        bumpBulkMode();
        try {
          lastAddAt = Date.now();
          const _hasQueuedAncestor = (mm: Component) => {
            try {
              let p = (
                mm as unknown as { parent?: () => Component | null }
              ).parent?.();
              while (p) {
                const pid = p.getId?.();
                if (
                  (pid && duplicateWorkQueueIds.has(pid)) ||
                  (pid && dupRootSet.has(pid))
                )
                  return true;
                p = (
                  p as unknown as { parent?: () => Component | null }
                ).parent?.();
              }
            } catch {}
            return false;
          };
          if (_treeHasIdsOrRefs(m) && !_hasQueuedAncestor(m)) {
            duplicateWorkQueue.add(m);
            const id = m.getId?.();
            if (id) duplicateWorkQueueIds.add(id);
            if (duplicateWorkQueue.size > 200) {
              const arr = Array.from(duplicateWorkQueue);
              duplicateWorkQueue.clear();
              duplicateWorkQueueIds.clear();
              for (let i = Math.max(0, arr.length - 200); i < arr.length; i++) {
                const item = arr[i];
                duplicateWorkQueue.add(item);
                const iid = item.getId?.();
                if (iid) duplicateWorkQueueIds.add(iid);
              }
            }
          }
          if (isSliderComponent(m)) sliderReinitQueue.add(m);
        } catch {}

        applyEventPlaceholdersToEditor();
        try {
          (
            editor as unknown as {
              _origSelect?: (el?: unknown, opts?: unknown) => Editor;
            }
          )._origSelect?.(null);
        } catch {}
        scheduleUIUpdate();
      });
      editor.on("component:update", () => {
        bumpBulkMode();
        // Ensure settings are refreshed when component updates (e.g. class changes)
        if (
          selectedComponent.value &&
          editor?.getSelected() === selectedComponent.value
        ) {
          needSettingsRefresh = true;
        }
        scheduleUIUpdate();
      });
      editor.on("component:remove", () => {
        bumpBulkMode();
        scheduleUIUpdate();
      });
      editor.on("component:select", () => {
        const now = Date.now();
        if (
          !autoSelectOnAdd &&
          lastAddAt &&
          now - lastAddAt < ADD_SELECT_BLOCK_MS
        )
          return;
        pendingSelectedComponent = editor?.getSelected() || null;

        selectGeneration = Math.min(1_000_000, selectGeneration + 1);
        if (!pendingSelectedComponent) return;
        const tag = String(
          (pendingSelectedComponent as any).getTagName?.() ||
            (pendingSelectedComponent as any).tagName ||
            "",
        ).toLowerCase();
        activePanelType.value =
          !isHomepageMode.value && tag === "header" ? "header" : "block";
        showProperties.value = true;
        scheduleSelectionRefresh();
      });
      // Consolidate deselect handler
      editor.on("component:deselect", () => {
        selectedComponent.value = null;
        selectedTextName.value = "";
        multiSelectedCount.value = 0;
        removeAddOverlay();
      });

      editor.on("component:drag:end", (m: Component) => {
        try {
          const st = m.getStyle();
          let pos = String(st.position || "").toLowerCase();
          if (!pos) {
            try {
              const el = m.getEl?.() as HTMLElement | null;
              if (el)
                pos = String(getComputedStyle(el).position || "").toLowerCase();
            } catch {}
          }
          if (pos === "absolute") {
            const GRID_STEP = snapGridStep.value || 8;
            let leftNum = 0;
            let topNum = 0;
            try {
              leftNum =
                parseInt(String(st.left || "0").replace(/px$/, "")) || 0;
              topNum = parseInt(String(st.top || "0").replace(/px$/, "")) || 0;
              if ((!leftNum || !topNum) && m.getEl) {
                const el = m.getEl() as HTMLElement | null;
                if (el) {
                  const cs = getComputedStyle(el);
                  leftNum = parseInt(cs.left.replace(/px$/, "")) || leftNum;
                  topNum = parseInt(cs.top.replace(/px$/, "")) || topNum;
                }
              }
            } catch {}
            const nl = Math.round(leftNum / GRID_STEP) * GRID_STEP;
            const nt = Math.round(topNum / GRID_STEP) * GRID_STEP;
            m.addStyle({ left: `${nl}px`, top: `${nt}px` });
          }
        } catch {}
      });

      await listAssets();
      applyGlobalFont();
      applyGlobalTextColor();
      applyGlobalBg();
      applyGlobalSpacing();
      ensureCanvasBlocksStyles();
      try {
        const cur = (editor.getHtml && editor.getHtml().trim()) || "";
        if (!cur) {
          editor.setComponents(
            '<section data-gjs-name="Phần" style="min-height:600px;padding:20px;border:1px dashed #e5e7eb"></section>',
          );
        }
      } catch {}
      if (isEmbed.value) {
        try {
          window.parent?.postMessage(
            { source: "websitebuilder", type: "wb-ready" },
            "*",
          );
        } catch {}
      }
    }
  };

  if (canvasRef.value) {
    startEditor(canvasRef.value);
  } else {
    const unwatch = watch(canvasRef, (val) => {
      if (val) {
        unwatch();
        startEditor(val);
      }
    });
  }

  restartEditor = async (cfg?: any) => {
    if (canvasRef.value) {
      await startEditor(canvasRef.value, cfg);
    }
  };

  // Fallback: Check if canvas mount was missed
  setTimeout(() => {
    if (!editor && !canvasRef.value && editorCanvasRef.value) {
      const el = editorCanvasRef.value.getMountEl();
      if (el) {
        console.warn("Canvas ready event missed, forcing init");
        onCanvasReady(el);
      }
    }
  }, 500);
});

function onCanvasReady(el: HTMLElement) {
  canvasRef.value = el;
}

function onCanvasZoom(payload: { delta: number; x: number; y: number }) {
  if (!editor) return;
  try {
    const cur = (editor?.Canvas.getZoom && editor?.Canvas.getZoom()) || 100;
    const next = Math.max(
      30,
      Math.min(200, Math.round(cur * (1 + payload.delta))),
    );
    editor?.Canvas.setZoom?.(next);
  } catch {}
}

onBeforeUnmount(() => {
  if (editor) {
    editor.destroy();
    editor = null;
  }
});

watch(
  () => route.fullPath,
  async (to, from) => {
    if (to === from) return;
    if (!restartEditor) return;
    await nextTick();
    await restartEditor();
  },
  { flush: "post" },
);

watch(
  () => componentProps.modelValue,
  (val) => {
    if (!editor || typeof val !== "string") return;

    const currentHtml = editor.getHtml() || "";
    const action = getIncomingHtmlAction(
      val,
      currentHtml,
      lastEmittedHtml.value,
    );

    if (action === "empty") {
      if (currentHtml !== "") editor.setComponents("");
      lastEmittedHtml.value = "";
      return;
    }

    if (action === "ignore") return;

    editor.setComponents(val);
    lastEmittedHtml.value = val;
  },
);

async function listAssets() {
  try {
    const folder = `website/${companyId.value || "unknown"}`;
    const res = await apiClient.get(`/media/list`, { params: { folder } });
    const files = (res.data?.data?.files || res?.data?.files || []) as string[];
    if (editor && files.length > 0) {
      const am = editor.AssetManager;
      am.add(files.map((url) => ({ src: url })));
    }
  } catch {
    try {
      const defaultRes = await apiClient.get(`/media/list`, {
        params: { folder: "website/default" },
      });
      const defaultFiles = (defaultRes.data?.data?.files ||
        defaultRes?.data?.files ||
        []) as string[];
      if (editor && defaultFiles.length > 0)
        editor.AssetManager.add(defaultFiles.map((url) => ({ src: url })));
    } catch {}
  }
}

async function uploadAssets(files: File[]) {
  const out: string[] = [];
  for (const file of files) {
    try {
      const folder = `website/${companyId.value || "unknown"}`;
      const url = await mediaService.upload(file, folder);
      if (url) out.push(url);
    } catch {}
  }
  return out;
}

type ResizableComponent = {
  set?: (prop: string, value: unknown) => void;
  getEl?: () => HTMLElement | undefined | null;
  addStyle?: (styles: Record<string, string>) => void;
};
function enableResizable(model: ResizableComponent | null) {
  if (!model || !model.set) return;
  try {
    const el = model.getEl?.() as HTMLElement | null;
    if (!el) return;
    const tag = String(el.tagName || "").toLowerCase();
    const notResizable = [
      "span",
      "strong",
      "em",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "a",
      "li",
      "ul",
      "ol",
    ];
    if (notResizable.includes(tag)) return;

    (model as unknown as { set: (key: string, value: unknown) => void }).set(
      "resizable",
      {
        tl: 1,
        tc: 1,
        tr: 1,
        cl: 1,
        cr: 1,
        bl: 1,
        bc: 1,
        br: 1,
      },
    );
  } catch {}
}
</script>
<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}

.code-snippet {
  min-width: 120px;
  font-family:
    SFMono-Regular, ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 6px;
  background: #f3f4f6;
  color: #111827;
}

.website-builder {
  --color-bg: #ffffff;
  --color-panel: #ffffff;
  --color-border: #e5ecf7;
  --color-border-strong: #dfe6ff;
  --color-text-strong: #0f172a;
  --color-text: #111827;
  --color-muted: #64748b;
  --color-primary: #6e41e2;
  --color-primary-ring: rgba(110, 65, 226, 0.25);
  --color-hover-ring: rgba(16, 24, 40, 0.06);
  --color-pill-bg: #ecfdf5;
  --color-pill-text: #16a34a;
  --color-pill-dot: #22c55e;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --radius-8: 8px;
  --radius-12: 12px;
  --shadow-1: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-panel: 0 8px 24px rgba(16, 24, 40, 0.12);
  background: var(--color-bg);
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.website-builder.in-layout {
  height: 100%;
  border-radius: 0;
  border: none;
  box-shadow: none;
  overflow: hidden;
}

.website-builder.in-layout .topbar {
  border-radius: 0;
  margin-bottom: 0;
  border-left: 0;
  border-right: 0;
  border-top: 0;
}
.topbar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--space-3);
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-12);
  background: var(--color-panel);
  margin-bottom: var(--space-4);
}
@media (max-width: 768px) {
  .topbar {
    grid-template-columns: 1fr;
    gap: var(--space-2);
  }
  .tb-center,
  .device-width {
    display: none;
  }
  .hide-sm {
    display: none !important;
  }
  .tb-left {
    justify-content: flex-start;
  }
  /* On mobile, center the device toggles if possible, or hide them? 
     Let's keep device toggles but hide the group container background to save space */
  .device-group {
    background: transparent;
    border: none;
    padding: 0;
  }
  /* Show device toggles in center on mobile? No, tb-center is hidden above.
     Let's Un-hide tb-center but make it minimal */
  .tb-center {
    display: flex !important;
  }
}
.hide-sm {
  display: inline-flex;
}
@media (max-width: 1024px) {
  .hide-sm {
    display: none !important;
  }
}
.tb-left {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.tb-brand {
  font-weight: 800;
  color: #0f172a;
  background: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 4px 8px;
}
.tb-center {
  display: flex;
  justify-content: center;
}
.tb-center-group {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.tb-center-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.center-icon {
  color: #374151;
}
.tb-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-2);
}
.device-width {
  font-size: 12px;
  color: #334155;
  background: #f8fafc;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 6px 10px;
  margin-right: 8px;
}
.device-group {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f8fafc;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 4px 8px;
}
.device-btn {
  color: #374151;
}
.device-btn.active {
  color: #6366f1;
  background: #eef2ff;
  border-radius: 999px;
}
.tb-select {
  max-width: 220px;
}
.live-pill {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  background: var(--color-pill-bg);
  color: var(--color-pill-text);
  border-radius: 999px;
  font-size: 12px;
  padding: 2px 8px;
}
.live-dot {
  width: 6px;
  height: 6px;
  background: var(--color-pill-dot);
  border-radius: 50%;
  display: inline-block;
}
.tb-icon {
  color: #374151;
}
.tb-icon.active {
  color: #2563eb;
}
.save-btn {
  border-radius: var(--radius-12);
}
.layout {
  --left-width: 280px;
  --right-width: 300px;
  display: grid;
  grid-template-columns: var(--left-width) 1fr var(--right-width);
  gap: 0;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
.layout .properties {
  width: 100%;
  background: var(--color-panel);
  border-left: 1px solid var(--color-border);
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.layout.is-mobile {
  display: block;
  position: relative;
  overflow: hidden;
}
.layout.is-mobile .sidebar {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  z-index: 100;
  transform: translateX(0);
  transition: transform 0.3s ease;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}
.layout.is-mobile .sidebar.collapsed {
  transform: translateX(-100%);
  width: 280px;
}
.layout.is-mobile .properties {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  z-index: 100;
  transform: translateX(0);
  transition: transform 0.3s ease;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  height: 100%;
  margin-top: 0;
  overflow: hidden;
}

.mobile-only {
  display: none !important;
}
@media (max-width: 768px) {
  .mobile-only {
    display: inline-flex !important;
  }
}
.sidebar {
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-x: hidden;
  height: 100%;
  overflow-y: auto;
}
.sidebar.collapsed {
  width: 72px;
}
.sb-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #f3f4f6;
}
.sb-title {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.sb-help,
.sb-toggle {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}
.sb-help:hover,
.sb-toggle:hover {
  background: #f3f4f6;
  color: #111827;
}
.sb-tabs {
  display: flex;
  padding: 4px;
  margin: 12px 16px;
  background: #f3f4f6;
  border-radius: 8px;
  gap: 0;
  border-bottom: none;
}
.sb-tab {
  flex: 1;
  background: transparent;
  border: none;
  color: #6b7280;
  font-size: 12px;
  font-weight: 500;
  padding: 6px 0;
  border-radius: 6px;
  position: relative;
  transition: all 0.2s;
  text-align: center;
}
.sb-tab::after {
  display: none;
}
.sb-tab--active {
  background: #ffffff;
  color: #111827;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  font-weight: 600;
}
.sb-search {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 8px 12px;
  margin: 0 16px 16px;
  background: #ffffff;
  transition: all 0.2s;
}
.sb-search:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}
.sb-search-input {
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  font-size: 13px;
  color: #111827;
}
.sb-search-icon {
  margin-left: auto;
  color: #9ca3af;
  flex-shrink: 0;
}
.sb-search-clear {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #6b7280;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}
.sb-search-clear:hover {
  background: #f3f4f6;
  color: #111827;
}
.sb-search-clear:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
.sb-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 16px 24px;
  border-bottom: 1px solid #f9fafb;
}
.sb-group:last-child {
  border-bottom: none;
}
.sb-group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}
.sb-group-title {
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.sb-collapse {
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
}
.sb-collapse:hover {
  background: #f3f4f6;
  color: #6b7280;
}
.sb-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  padding: 0 4px;
}
.sb-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 8px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
  color: #4b5563;
  cursor: grab;
  transition: all 0.2s;
  text-align: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.sb-item span {
  font-size: 12px;
  line-height: 1.3;
  font-weight: 500;
}
.sb-item:hover {
  background: #f8fafc;
  border-color: #6366f1;
  box-shadow:
    0 4px 6px -1px rgba(99, 102, 241, 0.1),
    0 2px 4px -1px rgba(99, 102, 241, 0.06);
  color: #6366f1;
  transform: translateY(-2px);
}
.sb-item:active {
  cursor: grabbing;
}
.sb-slide-enter-active,
.sb-slide-leave-active {
  transition: all 180ms ease;
}
.sb-slide-enter-from,
.sb-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
.group-title {
  font-size: 12px;
  color: var(--color-muted);
  padding: 4px 0;
}
.canvas {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  overflow: hidden;
}
.canvas-shell,
.canvas-frame,
.preview-iframe {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.builder-toolbar {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-8);
  margin: 0 0 var(--space-4) 0;
  background: var(--color-panel);
  width: fit-content;
  box-shadow: var(--shadow-1);
}
.tb-btn {
  border-radius: 6px;
  min-width: 32px;
  height: 32px;
  padding: 0;
  color: #374151;
  transition: all 0.2s ease;
}
.tb-btn:hover {
  background-color: #f3f4f6;
  color: var(--color-text);
}
.tb-btn:active {
  background-color: var(--color-border);
  transform: translateY(0.5px);
}
.editor-container {
  display: flex;
  justify-content: center;
  padding: 0 var(--space-4);
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
}
.editor-main {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  flex-shrink: 0;
  height: 100%;
  overflow: hidden;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}
.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.inspector {
  background: #ffffff;
  color: #1f2937;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.inspector__header {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  padding: 12px 14px;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 5;
  background: #ffffff;
}

.inspector__topline {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;
}

.inspector__heading {
  min-width: 0;
}

.inspector__title {
  margin: 0;
  font-size: 14px;
  line-height: 1.35;
  font-weight: 700;
  color: #111827;
}

.inspector__hint {
  margin: 3px 0 0;
  color: #6b7280;
  font-size: 11px;
  line-height: 1.4;
}

.inspector__search {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
  min-height: 36px;
  padding: 0 9px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
  color: #6b7280;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
}

.inspector__search:focus-within {
  border-color: #6366f1;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
}

.inspector__search input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #111827;
  font-size: 12px;
}

.inspector__search input::-webkit-search-cancel-button {
  display: none;
}

.inspector__search-clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
}

.inspector__search-clear:hover {
  background: #e5e7eb;
  color: #111827;
}

.inspector-tabs {
  display: flex;
  padding: 4px;
  margin: 12px 16px;
  background: #f3f4f6;
  border-radius: 8px;
  flex-shrink: 0;
  position: sticky;
  top: 56px;
  z-index: 4;
}

.inspector-tab {
  flex: 1;
  border: none;
  background: transparent;
  color: #6b7280;
  font-size: 12px;
  font-weight: 500;
  padding: 6px 0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.inspector-tab:hover {
  color: #111827;
}

.inspector-tab.is-active {
  background: #ffffff;
  color: #111827;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  font-weight: 600;
}

.inspector-tab.is-active::after {
  display: none;
}

.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 6px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.icon-button:hover {
  background: #f3f4f6;
  color: #111827;
}

.floating-panel-content {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
}
.floating-panel-content::-webkit-scrollbar {
  width: 8px;
}
.floating-panel-content::-webkit-scrollbar-track {
  background: #f9fafb;
}
.floating-panel-content::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 999px;
}
.floating-panel-content::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}

.settings-section {
  padding: 12px 14px;
  border-bottom: 1px solid #f9fafb;
}
.inspector.compact .settings-section {
  padding: 8px;
}
.inspector.compact .inspector__header {
  padding: 8px 12px;
}
.inspector.compact .inspector-tabs {
  margin: 8px 12px;
}
.inspector.compact .field-label {
  font-size: 12px;
}
.inspector.compact .chip-input,
.inspector.compact .chip-select {
  height: 28px;
  font-size: 12px;
  padding: 0 8px;
}
.inspector.compact .field {
  gap: 4px;
}
.inspector.compact .group-header {
  padding: 8px 12px;
}
.inspector.compact .group-body {
  gap: 8px;
  padding: 8px 12px;
}
.inspector.compact .effects-list {
  gap: 4px;
}
.inspector.compact .effects-item {
  padding: 4px 0;
}
.inspector.compact .sub-group {
  margin-bottom: 4px;
  padding-bottom: 4px;
}
.inspector.compact .sub-group-body {
  padding-left: 6px;
  border-left-width: 1px;
}
.inspector.compact .sub-group-header {
  padding: 0;
}

.right-tabs {
  justify-self: end;
}
.selected-text-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
}
.selected-text-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.selected-text-row .label {
  font-size: 12px;
  color: var(--color-muted);
}
.selected-text-row .value {
  font-size: 13px;
  color: var(--color-text);
  max-width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.badge {
  display: inline-block;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
  color: #2563eb;
  background: #e8effe;
  border-radius: 999px;
}
.add-element-btn {
  appearance: none;
  border: 1px solid #dbeafe;
  background: #eef2ff;
  color: #6366f1;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 999px;
  box-shadow: 0 2px 6px var(--color-hover-ring);
  transition:
    transform 120ms ease,
    box-shadow 120ms ease;
  z-index: 2402;
}
.add-element-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px var(--color-hover-ring);
}
.add-element-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px var(--color-hover-ring);
}
.helper-warn {
  margin-top: 6px;
  font-size: 12px;
  color: #b45309;
  background: #fffbeb;
  border: 1px solid #fef3c7;
  border-radius: 6px;
  padding: 6px 8px;
}
.wb-empty:empty::before {
  content: attr(data-placeholder);
  display: block;
  color: var(--color-muted);
  font-size: 13px;
  padding: 12px;
}
@media (max-width: 768px) {
  .add-element-btn {
    font-size: 12px;
    padding: 6px 10px;
  }
}
.text-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
  color: #374151;
  font-size: 12px;
  font-weight: 600;
}
.action.danger {
  color: #dc2626;
  border-color: #fecaca;
}
.group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  background: #ffffff;
}
.group-header:hover {
  background-color: #f9fafb;
}
.group-header span {
  font-size: 11px;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.group-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: #ffffff;
}
.sizing-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
@media (max-width: 768px) {
  .sizing-grid {
    grid-template-columns: 1fr;
  }
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field-label {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 2px;
}
.segmented {
  display: flex;
  padding: 2px;
  background: #f3f4f6;
  border-radius: 6px;
  gap: 2px;
  width: 100%;
  flex-wrap: nowrap;
}
.segmented--small {
  border-radius: 6px;
}
.segment {
  flex: 1;
  appearance: none;
  border: none;
  background: transparent;
  color: #6b7280;
  font-size: 11px;
  font-weight: 500;
  padding: 6px 2px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height:0;
}
.segment + .segment {
  border-left: none;
}
.segment:hover:not(.is-active) {
  color: #374151;
  background: rgba(255, 255, 255, 0.5);
}
.segment.is-active {
  background: #ffffff;
  color: #111827;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  font-weight: 600;
}
.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  color: #374151;
  font-size: 12px;
  font-weight: 500;
}
.chip-input {
  width: 100%;
  height: 28px;
  padding: 0 8px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  color: #111827;
  font-size: 12px;
  transition: all 0.2s;
}
.chip-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
}
.chip-select {
  width: 100%;
  height: 28px;
  padding: 0 8px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  color: #111827;
  font-size: 12px;
  transition: all 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%208l5%205%205-5%22%20stroke%3D%22%239CA3AF%22%20stroke-width%3D%222%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  padding-right: 32px;
  cursor: pointer;
}
.wb-dialog-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wb-dialog {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  width: 640px;
  max-width: calc(100% - 32px);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.25);
}
.wb-dialog--wide {
  width: 720px;
}
.wb-dialog__header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  background: #f9fafb;
}
.wb-dialog__header-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.wb-dialog__title {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
}
.wb-dialog__subtitle {
  font-size: 12px;
  color: #6b7280;
}
.wb-dialog__close {
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}
.wb-dialog__close:hover {
  background: #f3f4f6;
  color: #4b5563;
}
.wb-dialog__body {
  padding: 24px;
}
.wb-dialog__body--scroll {
  overflow-y: auto;
  flex: 1;
}
.wb-dialog__footer {
  padding: 16px 24px;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-end;
  background: #f9fafb;
}
.page-settings-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 24px;
}
@media (min-width: 768px) {
  .page-settings-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
}
.page-settings-group .group-body {
  padding: 16px 16px 12px;
}
.page-settings-apply {
  width: 100%;
  justify-content: center;
}
.chip-select:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
}
.input-with-icon-right {
  position: relative;
  width: 100%;
}
.icon-btn-right {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: #6b7280;
  border-radius: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}
.icon-btn-right:hover {
  background: #f3f4f6;
  color: #111827;
}
.input-labeled {
  position: relative;
}
.label-mini {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  font-weight: 600;
  color: #9ca3af;
  pointer-events: none;
}
.input-labeled .chip-input {
  padding-left: 20px;
}
.input-with-prefix {
  position: relative;
  width: 100%;
}
.input-prefix {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  pointer-events: none;
  display: flex;
  align-items: center;
}
.pl-9 {
  padding-left: 36px !important;
}
.color-preview-small {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
}
.chev {
  color: #9ca3af;
  width: 16px;
  height: 16px;
}
.overflow-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.overflow-label {
  font-size: 12px;
  color: var(--color-muted);
}
.effect-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.effects-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}
.effects-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
}
.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  border-radius: 6px;
  padding: 0;
}
.effect-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}
.template-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}
.template-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-8);
  background: var(--color-panel);
  padding: var(--space-2);
}
.group-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-plus-mini {
  width: 24px;
  height: 24px;
  border: 1px solid #2e7d32;
  color: #2e7d32;
  background: #e8f5e9;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 20px;
}
.header-plus-mini:hover {
  background: #dcedc8;
}
.template-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-8);
  background: var(--color-panel);
  overflow: hidden;
  transition:
    box-shadow 150ms ease,
    transform 150ms ease;
}
.template-preview {
  padding: 10px;
}
.template-info {
  padding: 8px 10px;
  font-size: 13px;
  color: var(--color-text);
  border-top: 1px solid var(--color-border);
}
.template-card:hover {
  box-shadow: 0 2px 8px var(--color-hover-ring);
}
.template-card:active {
  transform: scale(0.95);
}
.template-actions {
  display: flex;
  justify-content: flex-end;
  padding: var(--space-2) 10px;
  border-top: 1px solid #f0f2f5;
}
.settings-section {
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--space-4);
}
/* Appearance Settings & Header */
.appearance-settings {
  border-top: 1px solid #e5e7eb;
  margin-top: 12px;
  padding-top: 12px;
}
.header-settings {
  position: relative;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px 12px 16px;
}
.header-settings-title {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
}
.header-plus {
  position: absolute;
  right: 12px;
  top: 12px;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #2e7d32;
  color: #2e7d32;
  background: #e8f5e9;
  font-size: 22px;
  line-height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.header-plus:hover {
  background: #dcedc8;
}
.header-popup {
  position: absolute;
  right: 12px;
  top: 52px;
  width: 520px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 12px 24px rgba(16, 24, 40, 0.12);
  z-index: 1000;
}
.popup-inner {
  padding: 10px;
}
.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 4px 8px;
  border-bottom: 1px solid #f1f5f9;
}
.popup-title {
  font-weight: 600;
  color: #0f172a;
}
.popup-close {
  border: none;
  background: transparent;
  font-size: 18px;
  color: #475569;
  cursor: pointer;
}
.popup-categories {
  display: flex;
  gap: 8px;
  padding: 8px 0;
}
.popup-search {
  padding: 6px 4px;
}
.popup-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
}
.page-label {
  font-size: 12px;
  color: #64748b;
}
.thumb-skeleton {
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 37%, #f1f5f9 63%);
  background-size: 400% 100%;
  animation: shimmer 1.2s infinite;
  border-radius: 6px;
}
@keyframes shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}
.category-btn {
  border: 1px solid #e5e7eb;
  background: #fff;
  border-radius: 20px;
  padding: 6px 10px;
  font-size: 12px;
}
.category-btn.active {
  background: #eff6ff;
  border-color: #93c5fd;
}
.template-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.template-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: #fff;
}
.template-thumbnail {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  height: 60px;
}
.template-name {
  font-size: 12px;
  padding: 6px 8px;
}
.header-preview-area {
  margin-top: 12px;
}
.preview-title {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 6px;
}
.preview-frame {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  overflow: auto;
}
.preview-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}
.modal-title {
  font-weight: 600;
}
.modal-actions {
  padding: 8px 16px;
}

/* fade animation 300ms */
.fade-300-enter-active,
.fade-300-leave-active {
  transition: opacity 300ms ease;
}
.fade-300-enter-from,
.fade-300-leave-to {
  opacity: 0;
}
.settings-section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.setting-group {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: #ffffff;
  border: none;
  border-radius: 0;
  padding: 0;
  margin: 0;
  box-shadow: none;
  border-bottom: 1px solid var(--color-border);
}
.sidebar-controls {
  position: sticky;
  top: 0;
  z-index: 2;
  background: #fff;
  padding: 8px 12px;
  border-bottom: 1px solid #e5e7eb;
}
.setting-group h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
}
.button-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
  align-items: start;
}
@media (max-width: 640px) {
  .button-group {
    grid-template-columns: 1fr;
  }
}
.setting-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.setting-item label {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-muted);
}
.settings-section :deep(.v-field) {
  border-radius: 12px !important;
  min-height: 44px !important;
}
.settings-section :deep(.v-field--variant-outlined) {
  --v-border-color: var(--color-border) !important;
}
.settings-section :deep(.v-field--variant-outlined.v-field--focused) {
  --v-border-color: #2563eb !important;
}
.canvas-shell {
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.gjs-canvas {
  height: 100% !important;
  min-height: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
}
.canvas-frame {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.preview-iframe {
  width: 100%;
  height: 100%;
  padding: var(--space-4);
  overflow: hidden;
}
:deep(.gjs-editor),
:deep(.gjs-cv-canvas),
:deep(.gjs-frame-wrapper),
:deep(.gjs-frame) {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}
:deep(.gjs-pn-devices),
:deep(.gjs-cv-devices),
:deep(.gjs-pn-panels),
:deep(.gjs-pn-panel) {
  display: none !important;
}
:deep(.gjs-cv-canvas),
:deep(.gjs-editor),
:deep(.gjs-frame-wrapper) {
  background: transparent !important;
}
:deep(.gjs-cv-canvas) {
  padding: 0;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0;
  height: 100% !important;
  min-height: 80vh;
  top: 0;
}
:deep(.gjs-frame) {
  width: 100% !important;
  max-width: 1440px !important;
  border: 1px solid #a8a8a8c7 !important;
}
:deep(.gjs-selected) {
  outline: 2px solid var(--color-primary) !important;
  outline-offset: -2px;
}
:deep(.gjs-hovered) {
  box-shadow: 0 0 0 2px var(--color-primary-ring) inset !important;
}
:deep(.v-overlay--active) {
  z-index: 2400 !important;
}
:deep(.v-dialog) {
  z-index: 2401 !important;
}
.properties {
  /* merged/overridden by .layout .properties */
  background: var(--color-panel);
  padding: var(--space-4);
}
.floating-panel-header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 8px;
}
.right-tabs {
  justify-self: end;
}
.ripplable {
  position: relative;
  overflow: hidden;
}

.ripple {
  position: absolute;
  width: 12px;
  height: 12px;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 999px;
  transform: scale(0);
  animation: ripple-anim 300ms ease-out forwards;
}
@keyframes ripple-anim {
  to {
    transform: scale(16);
    opacity: 0;
  }
}
.template-card:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Figma Topbar Overrides */
.topbar--figma {
  background: #ffffff;
  border-color: var(--color-border);
  color: #111827;
}
.topbar--figma .tb-left,
.topbar--figma .tb-center,
.topbar--figma .tb-right {
  display: flex;
  align-items: center;
}
.sb-item span {
  font-size: 0.7rem;
}
.topbar--figma .tb-left {
  gap: 8px;
}
.topbar--figma .tb-center {
  justify-content: center;
  gap: 8px;
}
.topbar--figma .tb-right {
  justify-content: flex-end;
  gap: 12px;
}

.topbar--figma .divider {
  width: 1px;
  height: 22px;
  background: var(--color-border);
  margin: 0 8px;
}

.topbar--figma .tb-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #111827;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 6px 10px;
}
.topbar--figma .tb-link:hover {
  background: #f3f4f6;
}

.topbar--figma .device-group {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: #f8fafc;
}
.topbar--figma .device-btn {
  display: grid;
  place-items: center;
  width: 32px;
  height: 28px;
  color: #374151;
  border-radius: 999px;
}
.topbar--figma .device-btn.active {
  background: #eef2ff;
  color: #6e41e2;
}
.topbar--figma .device-width {
  font-size: 12px;
  color: #334155;
  background: transparent;
  border: none;
  padding: 0;
  margin-right: 0;
}

.topbar--figma .tb-center-group {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
}
.topbar--figma .tb-favicon {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid var(--color-border);
}
.topbar--figma .tb-page-title {
  font-size: 12px;
  color: #111827;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 4px 10px;
}

.topbar--figma .tb-icon-btn {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: #fff;
  color: #374151;
}
.topbar--figma .tb-icon-btn:hover {
  background: #f8fafc;
}

.topbar--figma .tb-action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: #fff;
  color: #111827;
  padding: 6px 10px;
}
.topbar--figma .tb-action svg {
  width: 16px;
  height: 16px;
  color: #374151;
}
.topbar--figma .tb-action:hover {
  border-color: #203456;
}

.gjs-cv-canvas,
.gjs-editor,
.gjs-frame-wrapper {
  background: none !important;
}

:deep(.ui-form .v-field) {
  border-radius: 12px;
}
:deep(.ui-form .v-input) {
  margin: 6px 0;
}
.ui-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}
.canvas-frame {
  background: radial-gradient(#cccccc 1px, transparent 1px);
  background-size: 10px 10px;
  background-position: 0 0;
  width: 100%;
  min-height: inherit;
}
@media (min-width: 640px) {
  .ui-grid {
    grid-template-columns: 1fr 1fr;
  }
}
.ui-checks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.super-template-modal {
  display: flex;
  flex-direction: column;
}
.super-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
.super-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
}
.super-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e1;
}
.super-thumb {
  position: relative;
  aspect-ratio: 16/9;
  background: #f1f5f9;
  overflow: hidden;
}
.super-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.super-thumb-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
}
.super-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}
.super-card:hover .super-overlay {
  opacity: 1;
}
.admin-actions {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
}
.super-info {
  padding: 12px;
}
.super-name {
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}
.super-desc {
  font-size: 0.85rem;
  color: #64748b;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Box Model Editor */
.box-model-editor {
  display: flex;
  justify-content: center;
  padding: 12px 0;
  user-select: none;
}
.box-margin {
  position: relative;
  background-color: #fce7f3; /* pink-100 */
  border: 1px dashed #fbcfe8; /* pink-200 */
  padding: 24px 32px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-padding {
  position: relative;
  background-color: #dbeafe; /* blue-100 */
  border: 1px dashed #bfdbfe; /* blue-200 */
  padding: 24px 32px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-content {
  width: 40px;
  height: 24px;
  background-color: #f3f4f6; /* gray-100 */
  border: 1px solid #e5e7eb;
  border-radius: 2px;
}
.box-label {
  position: absolute;
  font-size: 8px;
  color: #9ca3af;
  font-weight: 600;
  top: 2px;
  left: 4px;
  text-transform: uppercase;
  pointer-events: none;
}
.box-input {
  position: absolute;
  width: 20px;
  height: 16px;
  font-size: 9px;
  text-align: center;
  border: none;
  background: transparent;
  color: #374151;
  padding: 0;
  appearance: none;
  cursor: text;
}
.box-input:hover,
.box-input:focus {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  outline: none;
  color: #000;
  font-weight: bold;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
/* Positioning Inputs */
.box-input.top {
  top: 1px;
  left: 50%;
  transform: translateX(-50%);
}
.box-input.bottom {
  bottom: 1px;
  left: 50%;
  transform: translateX(-50%);
}
.box-input.left {
  left: 1px;
  top: 50%;
  transform: translateY(-50%);
}
.box-input.right {
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
}

/* Grid for 2 cols */
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
}
.grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
}
.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
}
.field {
  margin-bottom: 4px;
}
.field-label {
  font-size: 11px;
  margin-bottom: 2px;
  color: #6b7280;
  font-weight: 500;
}
.input-labeled .chip-input {
  height: 24px;
  padding: 0 4px 0 16px;
  font-size: 11px;
  border-radius: 4px;
}
.label-mini {
  left: 4px;
  font-size: 9px;
}
.field-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
  flex-wrap: nowrap;
}
.mini-toggle {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #f3f4f6;
  color: #6b7280;
  cursor: pointer;
  border: none;
  white-space: nowrap;
  flex-shrink: 0;
}
.mini-toggle.active {
  background: #e0e7ff;
  color: #6366f1;
  font-weight: 600;
}

.color-input-group {
  display: flex;
  align-items: center;
  gap: 8px; /* Space between color preview, text input, and color picker */
}

.color-preview-small {
  width: 24px; /* Adjust size as needed */
  height: 24px; /* Adjust size as needed */
  border: 1px solid #d1d5db;
  border-radius: 4px;
  flex-shrink: 0; /* Prevent shrinking */
}

.chip-input.pl-9 { /* Specificity for existing inputs */
  padding-left: 8px !important; /* Adjust if needed to fit the picker nicely */
  flex-grow: 1; /* Allow input to take available space */
}

.color-picker-container {
  /* Position the native color input */
  position: relative;
  width: 36px; /* Size of the clickable area for the color picker */
  height: 36px;
  overflow: hidden; /* Hide default native color input */
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  background: transparent;
  flex-shrink: 0; /* Prevent shrinking */
}

.color-picker-container input[type="color"] {
  position: absolute;
  top: -10px; /* Adjust to hide the native input */
  left: -10px; /* Adjust to hide the native input */
  width: 150%; /* Make it bigger to cover the container */
  height: 150%;
  border: none;
  padding: 0;
  cursor: pointer;
}



/* UX refinement: consistent interaction states without changing editor/API logic. */
.website-builder,
.website-builder * {
  box-sizing: border-box;
}

.website-builder button,
.website-builder input,
.website-builder select,
.website-builder textarea {
  -webkit-tap-highlight-color: transparent;
}

.website-builder button {
  touch-action: manipulation;
}

.website-builder button:focus-visible,
.website-builder a:focus-visible,
.website-builder input:focus-visible,
.website-builder select:focus-visible,
.website-builder textarea:focus-visible,
.website-builder [tabindex]:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.website-builder button:disabled {
  cursor: not-allowed;
  opacity: 0.58;
  transform: none;
}

.website-builder .topbar {
  position: relative;
  z-index: 120;
  flex-shrink: 0;
  min-height: 52px;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.035);
}

.website-builder .tb-link,
.website-builder .device-btn {
  min-height: 36px;
  min-width: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0 9px;
  background: transparent;
  color: #334155;
  cursor: pointer;
  transition:
    background-color 150ms ease,
    border-color 150ms ease,
    color 150ms ease,
    box-shadow 150ms ease;
}

.website-builder .tb-link:hover,
.website-builder .device-btn:hover {
  background: #f8fafc;
  border-color: #e2e8f0;
  color: #312e81;
}

.website-builder .tb-link.active,
.website-builder .device-btn.active {
  background: #eef2ff;
  border-color: #c7d2fe;
  color: #4f46e5;
}

.website-builder .tb-link.primary-action {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(79, 70, 229, 0.18);
}

.website-builder .tb-link.primary-action:hover {
  background: #5b32cc;
  border-color: #5b32cc;
  color: #fff;
  box-shadow: 0 3px 8px rgba(79, 70, 229, 0.22);
}

.website-builder .device-group {
  gap: 3px;
  padding: 3px;
}

.website-builder .device-btn {
  min-height: 32px;
  min-width: 36px;
}

.website-builder .sidebar,
.website-builder .properties {
  min-height: 0;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

.website-builder .sidebar::-webkit-scrollbar,
.website-builder .properties::-webkit-scrollbar,
.website-builder .floating-panel-content::-webkit-scrollbar {
  width: 7px;
}

.website-builder .sidebar::-webkit-scrollbar-thumb,
.website-builder .properties::-webkit-scrollbar-thumb,
.website-builder .floating-panel-content::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 999px;
}

.website-builder .sb-item {
  min-width: 0;
  min-height: 88px;
  user-select: none;
  -webkit-user-select: none;
}

.website-builder .sb-item:focus-visible {
  outline-offset: 1px;
}

.website-builder .sb-search-input {
  min-width: 0;
}

.website-builder .sb-search-feedback {
  margin: -2px 10px 8px;
  padding: 7px 9px;
  border-radius: 7px;
  background: #f8fafc;
  color: #64748b;
  font-size: 11px;
  line-height: 1.45;
}

.website-builder .sb-search-feedback[role="status"] {
  overflow-wrap: anywhere;
}

.website-builder .canvas,
.website-builder .canvas-shell,
.website-builder .canvas-frame {
  min-width: 0;
  min-height: 0;
}

.website-builder .layout.is-mobile .sidebar,
.website-builder .layout.is-mobile .properties {
  max-width: min(86vw, 320px);
  background: #fff;
  box-shadow: 0 12px 36px rgba(15, 23, 42, 0.2);
}

@media (max-width: 768px) {
  .website-builder {
    height: 100dvh;
    min-height: 0;
  }

  .website-builder .topbar {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 6px;
    padding: 7px 8px;
    margin-bottom: 0;
    border-radius: 0;
  }

  .website-builder .tb-left {
    grid-column: 1;
    grid-row: 1;
    min-width: 0;
    gap: 4px;
  }

  .website-builder .tb-right {
    grid-column: 2;
    grid-row: 1;
    min-width: 0;
    gap: 4px;
  }

  .website-builder .tb-center {
    grid-column: 1 / -1;
    grid-row: 2;
    display: flex !important;
    justify-content: center;
    padding-top: 2px;
  }

  .website-builder .tb-link {
    min-width: 38px;
    min-height: 38px;
    padding: 0 8px;
  }

  .website-builder .device-group {
    width: auto;
    max-width: 100%;
  }

  .website-builder .layout {
    min-height: 0;
  }

  .website-builder .layout.is-mobile .sidebar,
  .website-builder .layout.is-mobile .properties {
    width: min(86vw, 320px);
    max-width: min(86vw, 320px);
    top: 0;
    bottom: 0;
  }

  .website-builder .sb-header {
    padding: 12px;
  }

  .website-builder .sb-item {
    min-height: 82px;
    padding: 12px 6px;
  }

  .website-builder .editor-container {
    padding-left: 8px;
    padding-right: 8px;
  }
}

@media (max-width: 420px) {
  .website-builder .tb-left,
  .website-builder .tb-right {
    gap: 2px;
  }

  .website-builder .tb-link {
    min-width: 34px;
    padding: 0 6px;
  }

  .website-builder .sb-grid {
    gap: 6px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .website-builder *,
  .website-builder *::before,
  .website-builder *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

 
/* Inspector search accepts Vietnamese keywords with or without diacritics. */
.website-builder .inspector__search input {
  min-width: 0;
  width: 100%;
}
.website-builder .inspector__search input::-webkit-search-cancel-button {
  cursor: pointer;
}

/* Right inspector UX: clearer hierarchy, readable controls and comfortable touch targets. */
.website-builder .inspector-tabs {
  gap: 4px;
  margin: 10px 12px 12px;
  padding: 5px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #f8fafc;
}
.website-builder .inspector-tab {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 0;
  min-height: 38px;
  padding: 7px 5px;
  color: #64748b;
  font-size: 12px;
  line-height: 1.25;
  white-space: nowrap;
}
.website-builder .inspector-tab.is-active {
  color: #4338ca;
  background: #fff;
  box-shadow: 0 1px 3px rgba(15, 23, 42, .12);
}
.website-builder .inspector-tab:focus-visible {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}
.website-builder .inspector__search {
  min-height: 40px;
  margin: 0 12px;
  border-radius: 10px;
}
.website-builder .floating-panel-content {
  padding: 0 2px 16px;
  scrollbar-gutter: stable;
}
.website-builder .floating-panel-content .group-header {
  min-height: 42px;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 650;
  color: #334155;
  border-radius: 8px;
}
.website-builder .floating-panel-content .group-header:hover {
  background: #f8fafc;
}
.website-builder .floating-panel-content .group-body {
  padding: 12px 14px 14px;
  gap: 10px;
}
.website-builder .floating-panel-content .field {
  margin-bottom: 10px;
}
.website-builder .floating-panel-content .field-label {
  margin-bottom: 5px;
  font-size: 12px;
  line-height: 1.4;
  color: #475569;
}
.website-builder .floating-panel-content .chip-input,
.website-builder .floating-panel-content .chip-select {
  min-width: 0;
  min-height: 36px;
  height: 36px;
  padding: 0 10px;
  border-radius: 8px;
  font-size: 13px;
}
.website-builder .floating-panel-content .mini-toggle,
.website-builder .floating-panel-content .segment {
  min-height: 32px;
  font-size: 12px;
}
.website-builder .floating-panel-content .segmented {
  gap: 3px;
  padding: 3px;
  border-radius: 9px;
}
@media (max-width: 768px) {
  .website-builder .inspector-tabs {
    margin: 8px 10px 10px;
  }
  .website-builder .inspector-tab {
    gap: 4px;
    min-height: 42px;
    font-size: 11px;
  }
  .website-builder .floating-panel-content .group-body {
    padding-right: 12px;
    padding-left: 12px;
  }
}

/* Right inspector redesign: calmer hierarchy, less visual noise, clearer controls. */
.website-builder .inspector.properties {
  min-width: 280px;
  background: #fff;
  border-left: 1px solid #e2e8f0;
  color: #0f172a;
}
.website-builder .inspector__header {
  gap: 12px;
  padding: 16px 14px 12px;
  border-bottom: 1px solid #e8edf4;
  box-shadow: 0 2px 6px rgba(15, 23, 42, .025);
}
.website-builder .inspector__title {
  font-size: 15px;
  letter-spacing: -.025em;
  color: #0f172a;
}
.website-builder .inspector__hint {
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.5;
  color: #64748b;
}
.website-builder .inspector__search {
  min-height: 40px;
  margin: 0;
  padding: 0 11px;
  border-color: #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
}
.website-builder .inspector__search input {
  font-size: 13px;
}
.website-builder .inspector-tabs {
  position: sticky;
  top: 0;
  z-index: 3;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 4px;
  margin: 10px 12px 8px;
  padding: 4px;
  border: 1px solid #e8edf4;
  border-radius: 11px;
  background: #f8fafc;
}
.website-builder .inspector-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 0;
  min-height: 36px;
  padding: 7px 4px;
  border: 1px solid transparent;
  border-radius: 8px;
  color: #64748b;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}
.website-builder .inspector-tab:hover {
  background: #eef2f7;
  color: #334155;
}
.website-builder .inspector-tab.is-active {
  border-color: #e2e8f0;
  background: #fff;
  color: #4338ca;
  box-shadow: 0 1px 2px rgba(15, 23, 42, .06);
}
.website-builder .floating-panel-content {
  padding: 4px 10px 22px;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}
.website-builder .floating-panel-content .settings-section {
  padding: 4px 0 12px;
  border-bottom: 0;
}
.website-builder .floating-panel-content .setting-group {
  margin: 0 0 8px;
  overflow: clip;
  border: 1px solid #e8edf4;
  border-radius: 10px;
  background: #fff;
}
.website-builder .floating-panel-content .group-header {
  min-height: 44px;
  padding: 11px 12px;
  border-radius: 0;
  color: #1e293b;
  font-size: 12px;
  font-weight: 650;
}
.website-builder .floating-panel-content .group-header:hover {
  background: #f8fafc;
}
.website-builder .floating-panel-content .group-body {
  gap: 10px;
  padding: 12px;
  border-top: 1px solid #f1f5f9;
}
.website-builder .floating-panel-content .field {
  min-width: 0;
  margin-bottom: 8px;
}
.website-builder .floating-panel-content .field-label {
  margin-bottom: 5px;
  color: #64748b;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .01em;
}
.website-builder .floating-panel-content .chip-input,
.website-builder .floating-panel-content .chip-select {
  min-width: 0;
  min-height: 38px;
  height: 38px;
  border: 1px solid #dbe3ed;
  border-radius: 8px;
  background-color: #fff;
  color: #0f172a;
  font-size: 13px;
  transition: border-color .15s ease, box-shadow .15s ease;
}
.website-builder .floating-panel-content .chip-input:focus,
.website-builder .floating-panel-content .chip-select:focus {
  border-color: #818cf8;
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, .12);
}
.website-builder .floating-panel-content .chip,
.website-builder .floating-panel-content .segment {
  border-radius: 8px;
}
.website-builder .floating-panel-content .selected-text-info {
  margin: 0 0 10px;
  padding: 12px;
  border: 1px solid #e0e7ff;
  border-radius: 10px;
  background: #f8faff;
}
.website-builder .floating-panel-content .selected-text-row .value {
  color: #312e81;
  font-weight: 600;
}
.website-builder .floating-panel-content .text-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.website-builder .floating-panel-content .text-actions .action {
  min-height: 32px;
  padding: 6px 9px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  color: #475569;
  font-size: 12px;
}
.website-builder .floating-panel-content .text-actions .action:hover {
  border-color: #c7d2fe;
  background: #eef2ff;
  color: #4338ca;
}
.website-builder .inspector__header .icon-button {
  flex: 0 0 32px;
  width: 32px;
  height: 32px;
  border: 1px solid #e2e8f0;
  border-radius: 9px;
}
.website-builder .inspector button:focus-visible,
.website-builder .inspector input:focus-visible,
.website-builder .inspector select:focus-visible {
  outline: 2px solid #818cf8;
  outline-offset: 2px;
}
@media (max-width: 360px) {
  .website-builder .inspector-tab svg {
    display: none;
  }
  .website-builder .inspector-tab {
    gap: 0;
    padding-right: 2px;
    padding-left: 2px;
    font-size: 10px;
  }
  .website-builder .inspector-tabs {
    margin-right: 6px;
    margin-left: 6px;
  }
}

@media (max-width: 768px) {
  .website-builder .inspector.properties {
    min-width: 0;
  }
  .website-builder .inspector__header {
    padding: 12px 10px 10px;
  }
  .website-builder .inspector-tabs {
    gap: 2px;
    margin: 8px 8px 6px;
  }
  .website-builder .inspector-tab {
    gap: 3px;
    min-height: 40px;
    font-size: 11px;
  }
  .website-builder .floating-panel-content {
    padding-right: 8px;
    padding-left: 8px;
  }
}

</style>
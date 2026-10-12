<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="wb-dialog-backdrop"
      @click.self="close"
    >
    <div class="wb-dialog wb-dialog--wide">
      <div class="wb-dialog__header">
        <div class="wb-dialog__header-text">
          <div class="wb-dialog__title">Cài đặt & SEO</div>
          <div class="wb-dialog__subtitle">
            Quản lý tiêu đề, logo và các thuộc tính SEO cho trang web.
          </div>
        </div>
        <button
          type="button"
          class="wb-dialog__close"
          aria-label="Đóng cài đặt"
          @click="close"
        >
          <IconX size="20" />
        </button>
      </div>
      <div class="wb-dialog__body wb-dialog__body--scroll">
        <div class="page-settings-grid">
          <!-- Site Settings Section -->
          <div class="setting-group page-settings-group">
            <div class="group-header" style="pointer-events: none">
              <span>Cấu hình chung</span>
            </div>
            <div class="group-body">
              <div class="field">
                <div class="field-label">Tiêu đề trang web</div>
                <input
                  :value="siteTitle"
                  class="chip-input"
                  type="text"
                  @input="emit('update:siteTitle', ($event.target as HTMLInputElement).value)"
                />
              </div>
              <div class="field">
                <div class="field-label">Phụ đề trang web</div>
                <input
                  :value="siteSubtitle"
                  class="chip-input"
                  type="text"
                  @input="emit('update:siteSubtitle', ($event.target as HTMLInputElement).value)"
                />
              </div>
              <div class="field">
                <div class="field-label">URL Logo</div>
                <div class="input-with-button">
                  <input
                    :value="siteLogoUrl"
                    class="chip-input"
                    type="text"
                    placeholder="https://.../logo.png"
                    aria-label="URL logo trang web"
                    @input="emit('update:siteLogoUrl', ($event.target as HTMLInputElement).value)"
                  />
                  <button
                    class="chip"
                    type="button"
                    @click="emit('openAssetPicker', 'siteLogo')"
                  >
                    Chọn file
                  </button>
                </div>
                <div v-if="siteLogoUrl.trim()" class="logo-preview" aria-live="polite">
                  <img
                    :src="siteLogoUrl.trim()"
                    alt="Xem trước logo"
                    @error="($event.target as HTMLImageElement).classList.add('logo-preview__image--error')"
                  />
                  <span>Kiểm tra logo trước khi cập nhật vào canvas</span>
                </div>
              </div>
              <div class="field">
                <button
                  class="chip page-settings-apply"
                  type="button"
                  @click="emit('applyGlobalSiteSettings')"
                >
                  Cập nhật Logo/Tiêu đề vào canvas
                </button>
              </div>
            </div>
          </div>

          <!-- SEO Settings Section -->
          <div class="setting-group page-settings-group">
            <div class="group-header" style="pointer-events: none">
              <span>SEO & Meta Tags</span>
            </div>
            <div class="group-body">
              <div class="field">
                <div class="field-label">Tiêu đề (Meta Title)</div>
                <input
                  :value="seoMeta.title"
                  class="chip-input"
                  type="text"
                  @input="updateSeo('title', ($event.target as HTMLInputElement).value)"
                />
              </div>
              <div class="field">
                <div class="field-label">Mô tả (Meta Description)</div>
                <textarea
                  :value="seoMeta.description"
                  class="chip-input"
                  style="height: 60px; resize: none; padding: 8px"
                  @input="updateSeo('description', ($event.target as HTMLTextAreaElement).value)"
                ></textarea>
              </div>
              <div class="field">
                <div class="field-label">Tiêu đề OG (Social)</div>
                <input
                  :value="seoMeta.ogTitle"
                  class="chip-input"
                  type="text"
                  @input="updateSeo('ogTitle', ($event.target as HTMLInputElement).value)"
                />
              </div>
              <div class="field">
                <div class="field-label">URL Hình ảnh OG</div>
                <div class="input-with-button">
                  <input
                    :value="seoMeta.ogImage"
                    class="chip-input"
                    type="text"
                    @input="updateSeo('ogImage', ($event.target as HTMLInputElement).value)"
                  />
                  <button
                    class="chip"
                    type="button"
                    @click="emit('openAssetPicker', 'ogImage')"
                  >
                    Chọn file
                  </button>
                </div>
              </div>
              <div class="field">
                <div class="field-label">URL Chính tắc (Canonical)</div>
                <input
                  :value="pageCanonical"
                  class="chip-input"
                  type="text"
                  @input="emit('update:pageCanonical', ($event.target as HTMLInputElement).value)"
                />
              </div>
              <div class="field">
                <div class="field-label">URL Favicon</div>
                <div class="input-with-button">
                  <input
                    :value="pageFaviconUrl"
                    class="chip-input"
                    type="text"
                    @input="emit('update:pageFaviconUrl', ($event.target as HTMLInputElement).value)"
                  />
                  <button
                    class="chip"
                    type="button"
                    @click="emit('openAssetPicker', 'favicon')"
                  >
                    Chọn file
                  </button>
                </div>
              </div>
              <div class="field">
                <div class="field-label">Ngôn ngữ</div>
                <select
                  :value="pageLang"
                  class="chip-select"
                  @change="emit('update:pageLang', ($event.target as HTMLSelectElement).value)"
                >
                  <option value="">Mặc định</option>
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div class="field">
                <button
                  class="chip page-settings-apply"
                  type="button"
                  @click="emit('applyPageMeta')"
                >
                  Cập nhật SEO Meta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wb-dialog__footer">
        <button class="chip" type="button" @click="close">
          Đóng
        </button>
      </div>
    </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { IconX } from "@tabler/icons-vue";

interface SeoMeta {
  title: string;
  description: string;
  ogTitle: string;
  ogImage: string;
}

const props = defineProps<{
  modelValue: boolean;
  siteTitle: string;
  siteSubtitle: string;
  siteLogoUrl: string;
  seoMeta: SeoMeta;
  pageCanonical: string;
  pageFaviconUrl: string;
  pageLang: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [val: boolean];
  'update:siteTitle': [val: string];
  'update:siteSubtitle': [val: string];
  'update:siteLogoUrl': [val: string];
  'update:seoMeta': [val: SeoMeta];
  'update:pageCanonical': [val: string];
  'update:pageFaviconUrl': [val: string];
  'update:pageLang': [val: string];
  'openAssetPicker': [target: any];
  'applyGlobalSiteSettings': [];
  'applyPageMeta': [];
}>();

function close() {
  emit('update:modelValue', false);
}

function updateSeo(key: keyof SeoMeta, val: string) {
  emit('update:seoMeta', {
    ...props.seoMeta,
    [key]: val,
  });
}
</script>

<style scoped>
.wb-dialog-backdrop {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.52);
  backdrop-filter: blur(2px);
}
.wb-dialog {
  display: flex;
  flex-direction: column;
  width: min(920px, 100%);
  max-height: min(86vh, 900px);
  overflow: hidden;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #fff;
  color: #0f172a;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.28);
}
.wb-dialog__header,
.wb-dialog__footer {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 24px;
  background: #f8fafc;
}
.wb-dialog__header { border-bottom: 1px solid #e2e8f0; }
.wb-dialog__footer { justify-content: flex-end; border-top: 1px solid #e2e8f0; }
.wb-dialog__header-text { min-width: 0; display: flex; flex-direction: column; gap: 4px; }
.wb-dialog__title { font-size: 18px; line-height: 1.35; font-weight: 700; color: #0f172a; }
.wb-dialog__subtitle { font-size: 13px; line-height: 1.5; color: #64748b; }
.wb-dialog__close {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #64748b;
  cursor: pointer;
}
.wb-dialog__close:hover { background: #e2e8f0; color: #0f172a; }
.wb-dialog__body { min-height: 0; padding: 22px 24px; }
.wb-dialog__body--scroll { flex: 1 1 auto; overflow: auto; overscroll-behavior: contain; }
.page-settings-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 18px; }
.page-settings-group { min-width: 0; overflow: visible; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff; }
.page-settings-group .group-header { padding: 13px 16px; border-bottom: 1px solid #edf2f7; background: #f8fafc; color: #334155; font-size: 13px; font-weight: 700; }
.page-settings-group .group-body { display: flex; flex-direction: column; gap: 14px; padding: 16px; }
.page-settings-group .field { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.page-settings-group .field-label { color: #475569; font-size: 12px; font-weight: 600; }
.page-settings-group .chip-input,
.page-settings-group .chip-select {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  min-height: 38px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 8px 10px;
  background: #fff;
  color: #0f172a;
  font: inherit;
  font-size: 13px;
}
.page-settings-group textarea.chip-input { min-height: 84px; height: auto !important; resize: vertical !important; }
.page-settings-group .chip-input:focus,
.page-settings-group .chip-select:focus { outline: 2px solid rgba(99, 102, 241, .22); border-color: #6366f1; }
.page-settings-group .input-with-button { display: flex; align-items: stretch; gap: 8px; min-width: 0; }
.logo-preview { display: flex; align-items: center; gap: 12px; min-width: 0; padding: 10px 12px; border: 1px dashed #cbd5e1; border-radius: 8px; background: #f8fafc; color: #64748b; font-size: 12px; }
.logo-preview img { display: block; width: auto; height: auto; max-width: 180px; max-height: 56px; object-fit: contain; }
.logo-preview img.logo-preview__image--error { display: none; }
.logo-preview span { min-width: 0; overflow-wrap: anywhere; }
.page-settings-group .input-with-button .chip-input { flex: 1 1 auto; }
.page-settings-group .chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 36px;
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #fff;
  color: #334155;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}
.page-settings-group .chip:hover { background: #f8fafc; border-color: #94a3b8; }
.page-settings-group .page-settings-apply { width: 100%; white-space: normal; background: #4f46e5; border-color: #4f46e5; color: #fff; }
.page-settings-group .page-settings-apply:hover { background: #4338ca; border-color: #4338ca; }
.wb-dialog__footer .chip {
  min-height: 38px;
  padding: 8px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #fff;
  color: #334155;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.wb-dialog__footer .chip:hover { background: #f8fafc; }
@media (min-width: 768px) {
  .page-settings-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: start; }
}
@media (max-width: 640px) {
  .wb-dialog-backdrop { align-items: flex-end; padding: 8px; }
  .wb-dialog { width: 100%; max-height: 92dvh; border-radius: 14px; }
  .wb-dialog__header, .wb-dialog__footer { padding: 14px 16px; }
  .wb-dialog__body { padding: 14px; }
  .page-settings-group .input-with-button { flex-wrap: wrap; }
  .page-settings-group .input-with-button .chip { flex: 0 0 auto; }
}
</style>

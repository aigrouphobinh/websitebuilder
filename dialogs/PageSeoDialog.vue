<template>
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

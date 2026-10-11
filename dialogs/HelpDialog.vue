<template>
  <div
    v-if="modelValue"
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
    @click.self="close"
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
        <div style="display: flex; align-items: center; gap: 8px">
          <IconAlertCircle size="20" color="#2563eb" />
          <h3
            style="
              margin: 0;
              font-size: 16px;
              font-weight: 600;
              color: #111827;
            "
          >
            Hướng dẫn sử dụng Website Builder
          </h3>
        </div>
        <button
          type="button"
          style="
            border: none;
            background: transparent;
            cursor: pointer;
            padding: 4px;
            color: #6b7280;
            border-radius: 4px;
          "
          class="hover:bg-gray-200"
          @click="close"
        >
          <IconX size="20" />
        </button>
      </div>

      <!-- Content -->
      <div style="padding: 24px; overflow-y: auto">
        <div class="help-sections" style="display: flex; flex-direction: column; gap: 16px">
          <div
            class="row"
            style="
              display: flex;
              gap: 16px;
              margin-bottom: 16px;
              padding-bottom: 16px;
              border-bottom: 1px solid #f3f4f6;
            "
          >
            <span
              class="label"
              style="
                min-width: 120px;
                font-weight: 600;
                color: #374151;
                font-size: 14px;
              "
              >Nhập Website</span
            >
            <div
              class="value"
              style="color: #4b5563; font-size: 14px; line-height: 1.5"
            >
              Chọn <b>Trình đơn → Nhập Website</b> để import giao diện từ
              <b>URL</b> hoặc <b>Tải file lên (ZIP/HTML)</b>.
            </div>
          </div>

          <div
            class="row"
            style="
              display: flex;
              gap: 16px;
              margin-bottom: 16px;
              padding-bottom: 16px;
              border-bottom: 1px solid #f3f4f6;
            "
          >
            <span
              class="label"
              style="
                min-width: 120px;
                font-weight: 600;
                color: #374151;
                font-size: 14px;
              "
              >Khối sự kiện</span
            >
            <div
              class="value"
              style="color: #4b5563; font-size: 14px; line-height: 1.5"
            >
              Chọn <b>Thêm khối sự kiện</b> trên thanh công cụ để nhúng giao
              diện sự kiện của công ty vào trang.
            </div>
          </div>

          <div
            class="row"
            style="
              display: flex;
              gap: 16px;
              margin-bottom: 16px;
              padding-bottom: 16px;
              border-bottom: 1px solid #f3f4f6;
            "
          >
            <span
              class="label"
              style="
                min-width: 120px;
                font-weight: 600;
                color: #374151;
                font-size: 14px;
              "
              >Phím tắt</span
            >
            <div
              class="value"
              style="color: #4b5563; font-size: 14px; line-height: 1.5"
            >
              <b>Ctrl + Z</b> (Undo), <b>Ctrl + Y</b> (Redo),
              <b>Ctrl + S</b> (Lưu & Xuất bản).
            </div>
          </div>

          <div
            class="row"
            style="
              display: flex;
              gap: 16px;
              margin-bottom: 16px;
              padding-bottom: 16px;
              border-bottom: 1px solid #f3f4f6;
            "
          >
            <span
              class="label"
              style="
                min-width: 120px;
                font-weight: 600;
                color: #374151;
                font-size: 14px;
              "
              >Chỉnh sửa nền</span
            >
            <div
              class="value"
              style="color: #4b5563; font-size: 14px; line-height: 1.5"
            >
              Chọn khối <b>Div</b> và mở tab Thuộc tính để chỉnh
              <b>Background</b> (màu, ảnh, vị trí, lặp, kích thước).
            </div>
          </div>

          <div
            class="row"
            style="
              display: flex;
              gap: 16px;
              margin-bottom: 16px;
              padding-bottom: 16px;
              border-bottom: 1px solid #f3f4f6;
            "
          >
            <span
              class="label"
              style="
                min-width: 120px;
                font-weight: 600;
                color: #374151;
                font-size: 14px;
              "
              >Iframe & HTML</span
            >
            <div
              class="value"
              style="color: #4b5563; font-size: 14px; line-height: 1.5"
            >
              Chọn phần tử <b>iframe</b> và chuyển sang chỉnh sửa <b>HTML</b> để
              nhúng map, video, hoặc mã nhúng khác.
            </div>
          </div>

          <div class="row" style="display: flex; gap: 16px">
            <span
              class="label"
              style="
                min-width: 120px;
                font-weight: 600;
                color: #374151;
                font-size: 14px;
              "
              >Upload ảnh</span
            >
            <div
              class="value"
              style="color: #4b5563; font-size: 14px; line-height: 1.5"
            >
              Dùng trình upload tích hợp trong Thuộc tính hoặc Import để tải
              ảnh, sau đó chọn từ Asset Manager.
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
          @click="close"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconAlertCircle, IconX } from "@tabler/icons-vue";

defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [val: boolean];
}>();

function close() {
  emit('update:modelValue', false);
}
</script>

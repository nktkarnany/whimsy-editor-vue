<template>
  <n-popover ref="popover" trigger="click" content-class="p-3">
    <template #trigger>
      <n-button variant="text">
        <span
          class="px-2"
          :style="{
            color: activeColorItem?.color,
            backgroundColor: activeHighlightItem?.color,
          }"
        >
          A
        </span>
        <ChevronDown />
      </n-button>
    </template>
    <div>
      <div class="px-2 my-2 text-sm color-gray-900">Color</div>
      <div class="d-flex">
        <n-button
          v-for="(textColor, index) in TEXT_COLORS"
          :key="index"
          variant="text"
          @click="
            () => {
              editor.commands.unsetColor();
              textColor.name !== 'Default' &&
                editor
                  .chain()
                  .focus()
                  .setColor(textColor.color || '')
                  .run();
              popover?.setShow(false);
            }
          "
        >
          <div class="flex items-center space-x-2">
            <div
              class="px-1 py-px font-medium border rounded-sm border-stone-200"
              :style="{ color: textColor.color }"
            >
              A
            </div>
            <span>{{ textColor.name }}</span>
          </div>
          <Check
            v-if="editor.isActive('textStyle', { color: textColor.color })"
            class="w-4 h-4"
          />
        </n-button>
      </div>
      <div class="px-2 mt-5 mb-2 text-sm color-gray-900">Background</div>
      <div class="d-flex">
        <n-button
          v-for="(highlightColor, index) in HIGHLIGHT_COLORS"
          :key="index"
          @click="
            () => {
              editor.commands.unsetHighlight();
              highlightColor.name !== 'Default' &&
                editor.commands.setHighlight({ color: highlightColor.color });
              popover?.setShow(false);
            }
          "
          class="flex items-center justify-between px-2 py-1 rounded-sm text-stone-600 hover:bg-stone-100"
          variant="text"
        >
          <div class="flex items-center space-x-2">
            <div
              class="px-1 py-px font-medium border rounded-sm border-stone-200"
              :style="{ backgroundColor: highlightColor.color }"
            >
              A
            </div>
            <span>{{ highlightColor.name }}</span>
          </div>

          <Check
            v-if="editor.isActive('highlight', { color: highlightColor.color })"
            class="w-4 h-4"
          />
        </n-button>
      </div>
    </div>
  </n-popover>
</template>

<script setup lang="ts">
import { Editor } from "@tiptap/core";
import { Check, ChevronDown } from "lucide-vue-next";
import { PropType, computed, ref } from "vue";

import { NPopover, NButton } from "naive-ui";

const props = defineProps({
  editor: {
    type: Object as PropType<Editor>,
    required: true,
  },
});

const popover = ref<typeof NPopover | null>(null);

const TEXT_COLORS = [
  {
    name: "Default",
    color: "var(--whimsy-black)",
  },
  {
    name: "Purple",
    color: "#9333EA",
  },
  {
    name: "Red",
    color: "#E00000",
  },
  {
    name: "Yellow",
    color: "#EAB308",
  },
  {
    name: "Blue",
    color: "#2563EB",
  },
  {
    name: "Green",
    color: "#008A00",
  },
  {
    name: "Orange",
    color: "#FFA500",
  },
  {
    name: "Pink",
    color: "#BA4081",
  },
  {
    name: "Gray",
    color: "#A8A29E",
  },
];

const HIGHLIGHT_COLORS = [
  {
    name: "Default",
    color: "var(--whimsy-highlight-default)",
  },
  {
    name: "Purple",
    color: "var(--whimsy-highlight-purple)",
  },
  {
    name: "Red",
    color: "var(--whimsy-highlight-red)",
  },
  {
    name: "Yellow",
    color: "var(--whimsy-highlight-yellow)",
  },
  {
    name: "Blue",
    color: "var(--whimsy-highlight-blue)",
  },
  {
    name: "Green",
    color: "var(--whimsy-highlight-green)",
  },
  {
    name: "Orange",
    color: "var(--whimsy-highlight-orange)",
  },
  {
    name: "Pink",
    color: "var(--whimsy-highlight-pink)",
  },
  {
    name: "Gray",
    color: "var(--whimsy-highlight-gray)",
  },
];

const activeColorItem = computed(() =>
  TEXT_COLORS.find(({ color }) => props.editor.isActive("textStyle", { color }))
);

const activeHighlightItem = computed(() =>
  HIGHLIGHT_COLORS.find(({ color }) =>
    props.editor.isActive("highlight", { color })
  )
);
</script>

<style scoped></style>

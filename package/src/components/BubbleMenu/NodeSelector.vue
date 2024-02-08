<template>
  <n-popover ref="popover" trigger="click">
    <template #trigger>
      <n-button variant="text">
        {{ activeItem?.name }} <ChevronDown />
      </n-button>
    </template>
    <div>
      <button
        v-for="(item, index) in items"
        :key="index"
        class="d-flex-center"
        type="button"
        @click="
          () => {
            item.command();
            popover?.setShow(false);
          }
        "
      >
        <div class="d-flex-center">
          <component :is="item.icon" />
          <span>{{ item.name }}</span>
        </div>
        <Check v-if="activeItem.name === item.name" />
      </button>
    </div>
  </n-popover>
</template>

<script setup lang="ts">
import { PropType, computed, ref } from "vue";

import { Editor } from "@tiptap/core";
import {
  Check,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  TextQuote,
  ListOrdered,
  TextIcon,
  Code,
  CheckSquare,
} from "lucide-vue-next";

import { NPopover, NButton } from "naive-ui";

const props = defineProps({
  editor: {
    type: Object as PropType<Editor>,
    required: true,
  },
});

const popover = ref<typeof NPopover | null>(null);

const items = [
  {
    name: "Text",
    icon: TextIcon,
    command: () =>
      props.editor.chain().focus().toggleNode("paragraph", "paragraph").run(),
    isActive: () =>
      props.editor.isActive("paragraph") &&
      !props.editor.isActive("bulletList") &&
      !props.editor.isActive("orderedList"),
  },
  {
    name: "Heading 1",
    icon: Heading1,
    command: () =>
      props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => props.editor.isActive("heading", { level: 1 }),
  },
  {
    name: "Heading 2",
    icon: Heading2,
    command: () =>
      props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => props.editor.isActive("heading", { level: 2 }),
  },
  {
    name: "Heading 3",
    icon: Heading3,
    command: () =>
      props.editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: () => props.editor.isActive("heading", { level: 3 }),
  },
  {
    name: "To-do List",
    icon: CheckSquare,
    command: () => props.editor.chain().focus().toggleTaskList().run(),
    isActive: () => props.editor.isActive("taskItem"),
  },
  {
    name: "Bullet List",
    icon: ListOrdered,
    command: () => props.editor.chain().focus().toggleBulletList().run(),
    isActive: () => props.editor.isActive("bulletList"),
  },
  {
    name: "Numbered List",
    icon: ListOrdered,
    command: () => props.editor.chain().focus().toggleOrderedList().run(),
    isActive: () => props.editor.isActive("orderedList"),
  },
  {
    name: "Quote",
    icon: TextQuote,
    command: () =>
      props.editor
        .chain()
        .focus()
        .toggleNode("paragraph", "paragraph")
        .toggleBlockquote()
        .run(),
    isActive: () => props.editor.isActive("blockquote"),
  },
  {
    name: "Code",
    icon: Code,
    command: () => props.editor.chain().focus().toggleCodeBlock().run(),
    isActive: () => props.editor.isActive("codeBlock"),
  },
];

const activeItem = computed(
  () =>
    items.filter((item) => item.isActive()).pop() ?? {
      name: "Multiple",
    }
);
</script>

<style scoped></style>

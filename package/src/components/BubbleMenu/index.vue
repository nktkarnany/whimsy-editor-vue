<template>
  <BubbleMenu
    :editor="editor"
    :tippy-options="{ maxWidth: '100%' }"
    class="bubble-menu"
  >
    <NodeSelector :editor="editor" />
    <LinkSelector :editor="editor" />
    <n-button
      v-for="(item, index) in items"
      :key="index"
      @click="item.command()"
      variant="text"
    >
      <component
        :is="item.icon"
        :class="{
          'text-blue-500': item.isActive(),
        }"
      />
    </n-button>
    <ColorSelector :editor="editor" />
  </BubbleMenu>
</template>

<script setup lang="ts">
import { BubbleMenu } from "@tiptap/vue-3";
import { PropType } from "vue";
import { Editor } from "@tiptap/core";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
} from "lucide-vue-next";

import { NButton } from "naive-ui";

import NodeSelector from "./NodeSelector.vue";
import LinkSelector from "./LinkSelector.vue";
import ColorSelector from "./ColorSelector.vue";

const props = defineProps({
  editor: {
    type: Object as PropType<Editor>,
    required: true,
  },
});

const items = [
  {
    name: "bold",
    isActive: () => props.editor.isActive("bold"),
    command: () => props.editor.chain().focus().toggleBold().run(),
    icon: BoldIcon,
  },
  {
    name: "italic",
    isActive: () => props.editor.isActive("italic"),
    command: () => props.editor.chain().focus().toggleItalic().run(),
    icon: ItalicIcon,
  },
  {
    name: "underline",
    isActive: () => props.editor.isActive("underline"),
    command: () => props.editor.chain().focus().toggleUnderline().run(),
    icon: UnderlineIcon,
  },
  {
    name: "strike",
    isActive: () => props.editor.isActive("strike"),
    command: () => props.editor.chain().focus().toggleStrike().run(),
    icon: StrikethroughIcon,
  },
  {
    name: "code",
    isActive: () => props.editor.isActive("code"),
    command: () => props.editor.chain().focus().toggleCode().run(),
    icon: CodeIcon,
  },
];
</script>

<style scoped lang="scss">
.bubble-menu {
  display: flex;
  align-items: center;
  gap: var(--spacing-small);
  background-color: var(--white);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border: 1px solid var(--gray-300);
  border-radius: 0.125rem;
  padding: var(--spacing-small);
}
</style>

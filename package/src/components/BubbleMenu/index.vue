<template>
  <BubbleMenu
    :editor="editor"
    :tippy-options="{
      maxWidth: '100%',
      onHidden: onHidden,
      onClickOutside: () => {},
    }"
    class="bubble-menu"
  >
    <NodeSelector ref="nodeSelectorRef" :editor="editor" />
    <LinkSelector ref="linkSelectorRef" :editor="editor" />
    <button
      v-for="(item, index) in items"
      :key="index"
      @click="item.command()"
      :class="`whimsy-btn ${item.isActive() ? 'active' : ''}`"
    >
      <component :is="item.icon" />
    </button>
  </BubbleMenu>
</template>

<script setup lang="ts">
import { BubbleMenu } from "@tiptap/vue-3";
import { PropType, ref } from "vue";
import { Editor } from "@tiptap/core";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
} from "lucide-vue-next";

import NodeSelector from "./NodeSelector.vue";
import LinkSelector from "./LinkSelector.vue";

const nodeSelectorRef = ref<typeof NodeSelector | null>(null);
const linkSelectorRef = ref<typeof LinkSelector | null>(null);

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

function onHidden() {
  linkSelectorRef.value?.closePopup();
  nodeSelectorRef.value?.closePopup();
}
</script>

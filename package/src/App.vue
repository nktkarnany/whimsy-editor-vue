<template>
  <Editor completion-api="http://localhost:3000/api/generate" ref="editor" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Editor from "./components/Editor.vue";
import { Editor as EditorClass } from "@tiptap/core";

const editor = ref<{ editor: EditorClass }>();
</script>

<style scoped></style>

<template>
  <div class="demo">
    <div class="demo-container">
      <Editor
        completion-api="http://localhost:3000/api/generate"
        ref="editor"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Editor from "./components/Editor.vue";
import { Editor as EditorClass } from "@tiptap/core";

const editor = ref<{ editor: EditorClass }>();
</script>

<style scoped lang="scss">
.demo {
  padding: 20vh var(--spacing-large);

  &-container {
    width: 100%;
    max-width: 1024px;
    margin: auto;
  }
}
</style>

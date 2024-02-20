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
  padding: 20vh 2rem;

  &-container {
    width: 100%;
    max-width: 1024px;
    margin: auto;
  }

  @media (max-width: 480px) {
    padding: 4vh 2rem;
  }
}
</style>

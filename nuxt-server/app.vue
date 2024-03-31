<template>
  <div class="demo">
    <div class="demo-container">
      <Editor completion-api="http://localhost:3000/api/generate" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Editor } from "whimsy-editor-vue";
import "./assets/styles.css";
import "whimsy-editor-vue/dist/style.css";
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

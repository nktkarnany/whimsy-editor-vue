<template>
  <div class="link-selector">
    <button
      class="whimsy-btn"
      @click="isOpen = !isOpen"
      :class="{
        active: editor.isActive('link'),
      }"
    >
      <component :is="Link2Icon" />
    </button>
    <form v-if="isOpen" @submit.prevent="submit" class="link-selector__form">
      <input
        ref="inputRef"
        type="url"
        placeholder="Paste a link"
        class="link-selector__form-input"
        :defaultValue="editor.getAttributes('link').href || ''"
      />

      <button
        v-if="editor.getAttributes('link').href"
        class="whimsy-btn"
        @click="
          () => {
            editor.chain().focus().unsetLink().run();
            isOpen = false;
          }
        "
      >
        <Trash />
      </button>
      <button v-else class="whimsy-btn">
        <Check />
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Editor } from "@tiptap/core";
import { Link2Icon, Check, Trash } from "lucide-vue-next";
import { PropType, ref } from "vue";

const props = defineProps({
  editor: {
    type: Object as PropType<Editor>,
    required: true,
  },
});

const isOpen = ref(false);

defineExpose({ closePopup });

const inputRef = ref<HTMLInputElement | null>(null);

function closePopup() {
  isOpen.value = false;
}

function submit(e: any) {
  console.log(e);

  const input = e.target[0] as HTMLInputElement;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = input.value.match(urlRegex);
  urls &&
    urls.length > 0 &&
    props.editor.chain().focus().setLink({ href: urls[0] }).run();
  closePopup();
}
</script>

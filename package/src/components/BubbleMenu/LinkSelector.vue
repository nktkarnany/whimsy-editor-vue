<template>
  <div class="link-selector">
    <n-button variant="text" @click="isOpen = !isOpen">
      <component
        :is="Link2Icon"
        :class="{
          active: editor.isActive('link'),
        }"
      />
    </n-button>
    <n-form v-if="isOpen" @submit.prevent="submit" class="link-selector__form">
      <n-input
        ref="inputRef"
        type="text"
        placeholder="Paste a link"
        class="link-selector__form-input"
        :defaultValue="editor.getAttributes('link').href || ''"
      />

      <n-button
        v-if="editor.getAttributes('link').href"
        variant="text"
        @click="
          () => {
            editor.chain().focus().unsetLink().run();
            isOpen = false;
          }
        "
      >
        <Trash />
      </n-button>
      <n-button v-else variant="text">
        <Check />
      </n-button>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { Editor } from "@tiptap/core";
import { Link2Icon, Check, Trash } from "lucide-vue-next";
import { PropType, ref } from "vue";

import { NButton, NForm, NInput } from "naive-ui";

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

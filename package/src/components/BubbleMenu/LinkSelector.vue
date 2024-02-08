<template>
  <div class="position-relative">
    <n-button variant="text" @click="isOpen = !isOpen">
      <component
        :is="Link2Icon"
        class="w-4 h-4"
        :class="{
          'text-blue-500': editor.isActive('link'),
        }"
      />
    </n-button>
    <n-form
      v-if="isOpen"
      @submit.prevent="submit"
      class="position-fixed d-flex-center bg-gray-200"
    >
      <n-input
        ref="inputRef"
        type="text"
        placeholder="Paste a link"
        class="flex-1 p-1 text-sm bg-white outline-none"
        :defaultValue="editor.getAttributes('link').href || ''"
      />

      <n-button
        v-if="editor.getAttributes('link').href"
        variant="text"
        class="flex items-center p-1 text-red-600 transition-all rounded-sm hover:bg-red-100 dark:hover:bg-red-800"
        @click="
          () => {
            editor.chain().focus().unsetLink().run();
            isOpen = false;
          }
        "
      >
        <Trash class="w-4 h-4" />
      </n-button>
      <n-button
        v-else
        variant="text"
        class="flex items-center p-1 transition-all rounded-sm text-stone-600 hover:bg-stone-100"
      >
        <Check class="w-4 h-4" />
      </n-button>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { Editor } from "@tiptap/core";
import { Link2Icon, Check, Trash } from "lucide-vue-next";
import { PropType, ref } from "vue";

import { NButton, NForm, NInput } from "naive-ui";

defineProps({
  editor: {
    type: Object as PropType<Editor>,
    required: true,
  },
});

const isOpen = ref(false);

const inputRef = ref<HTMLInputElement | null>(null);

function submit(e: any) {
  console.log(e);

  // const input = e.target[0] as HTMLInputElement;
  // const url = getUrlFromString(input.value);
  // url && editor.chain().focus().setLink({ href: url }).run();
  // setIsOpen(false);
}
</script>

<style scoped></style>

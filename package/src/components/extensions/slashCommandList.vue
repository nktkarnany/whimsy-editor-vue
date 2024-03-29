<template>
  <div v-if="items.length > 0" ref="commandListContainer" class="menu">
    <div
      v-for="(item, index) in items"
      class="menu__item"
      :key="index"
      :class="{ active: index === selectedIndex }"
      @click="selectItem(index)"
    >
      <component :is="item.icon" size="18" />
      <div class="menu__item-content">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, PropType, ref, watch } from "vue";
import { Editor, Range } from "@tiptap/core";
import { SlashCommandItem } from "./slashExtension";
import { useCompletion } from "ai/vue";
import { getPrevText } from "../../lib/editor";

const props = defineProps({
  items: {
    type: Array as PropType<SlashCommandItem[]>,
    required: true,
  },
  command: {
    type: Function,
    required: true,
  },
  editor: {
    type: Object as PropType<Editor>,
    required: true,
  },
  range: {
    type: Object as PropType<Range>,
    required: true,
  },
});

const selectedIndex = ref(0);

const { complete, isLoading } = useCompletion({
  id: "whimsy-editor-vue",
  api: inject("completionApi"),
  onResponse: (_) => {
    props.editor.chain().focus().deleteRange(props.range).run();
  },
  onFinish: (_prompt, completion) => {
    // highlight the generated text
    props.editor.commands.setTextSelection({
      from: props.range.from,
      to: props.range.from + completion.length,
    });
  },
  onError: (e) => {
    console.error(e);
  },
});

const commandListContainer = ref<HTMLDivElement>();

const navigationKeys = ["ArrowUp", "ArrowDown", "Enter"];
function onKeyDown(e: KeyboardEvent) {
  if (navigationKeys.includes(e.key)) {
    e.preventDefault();
    if (e.key === "ArrowUp") {
      selectedIndex.value =
        (selectedIndex.value + props.items.length - 1) % props.items.length;
      scrollToSelected();
      return true;
    }
    if (e.key === "ArrowDown") {
      selectedIndex.value = (selectedIndex.value + 1) % props.items.length;

      scrollToSelected();
      return true;
    }
    if (e.key === "Enter") {
      selectItem(selectedIndex.value);
      return true;
    }
    return false;
  }
}

watch(
  () => props.items,
  () => {
    selectedIndex.value = 0;
  }
);

defineExpose({
  onKeyDown,
});

function selectItem(index: number) {
  const item = props.items[index];

  if (item) {
    if (item.title === "Continue writing") {
      if (isLoading.value) return;
      complete(
        getPrevText(props.editor, {
          chars: 5000,
          offset: 1,
        })
      );
    } else {
      props.command(item);
    }
  }
}

function updateScrollView(container: HTMLElement, item: HTMLElement) {
  const containerHeight = container.offsetHeight;
  const itemHeight = item ? item.offsetHeight : 0;

  const top = item.offsetTop;
  const bottom = top + itemHeight;

  if (top < container.scrollTop) {
    container.scrollTop -= container.scrollTop - top + 5;
  } else if (bottom > containerHeight + container.scrollTop) {
    container.scrollTop += bottom - containerHeight - container.scrollTop + 5;
  }
}

function scrollToSelected() {
  const container = commandListContainer.value;
  const item = container?.children[selectedIndex.value] as HTMLElement;

  if (container && item) {
    updateScrollView(container, item);
  }
}
</script>

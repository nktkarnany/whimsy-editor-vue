<template>
  <div :class="`whimsy-editor ${className}`">
    <slot name="bubble-menu">
      <BubbleMenu v-if="editor" :editor="editor" />
    </slot>
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup lang="ts">
// Importing from vue
import {
  watchEffect,
  type PropType,
  ref,
  watch,
  provide,
  onMounted,
} from "vue";

// Importing from tiptap
import { useEditor, EditorContent, Content, Extension } from "@tiptap/vue-3";
import { EditorProps } from "@tiptap/pm/view";
import { Editor as EditorClass } from "@tiptap/core";

// Importing from vueuse utils
import { useStorage, useDebounceFn } from "@vueuse/core";

// Importing vercel ai sdk
import { useCompletion } from "ai/vue";

// Importing defaults
import { defaultEditorContent } from "../lib/default-content";
import { defaultExtensions } from "./extensions";
import {
  type SlashCommandItem,
  SlashCommand,
} from "./extensions/slashExtension";
import { defaultItems } from "./extensions/slashCommandItems";
import { defaultEditorProps } from "../lib/props";

// Importing bubble menu
import BubbleMenu from "../components/BubbleMenu/index.vue";

// Importing helpers
import { getPrevText } from "../lib/editor";

type Format = "html" | "json";

type StyleVariables = {
  mainBg: string;
  textColor: string;
  primaryAccent: string;
  secondaryAccent: string;
  mutedBg: string;
  mutedText: string;
  mutedAccent: string;
  mutedBorder: string;
  borderColor: string;
  boxShadow: string;
  codeBg: string;
  codeText: string;
  codeBorder: string;
  quoteBg: string;
  quoteText: string;
  quoteBorder: string;
  linkColor: string;
  generalSpacing: string;
  borderRadius: string;
  baseFont: string;
};

const props = defineProps({
  /**
   * The API route to use for the OpenAI completion API.
   * Defaults to "/api/generate".
   */
  completionApi: {
    type: String,
    default: "/api/generate",
  },
  /**
   * Additional classes to add to the editor container.
   * Defaults to "".
   */
  className: {
    type: String,
    default: "",
  },
  /**
   * The default value to use for the editor.
   * Defaults to defaultEditorContent.
   */
  defaultValue: {
    type: Object as PropType<Content>,
    default: () => {
      return defaultEditorContent;
    },
  },
  /**
   * The default format to use for the editor.
   * Defaults to json.
   */
  format: {
    type: String as PropType<Format>,
    default: "json",
  },
  /**
   * A list of extensions to use for the editor, in addition to the default whimsy extensions.
   * Defaults to [].
   */
  extensions: {
    type: Array as PropType<Extension[]>,
    default: [],
  },
  /**
   * Props to pass to the underlying Tiptap editor, in addition to the default Whimsy editor props.
   * Defaults to {}.
   */
  editorProps: {
    type: Object as PropType<EditorProps>,
    default: {},
  },
  /**
   * A callback function that is called whenever the editor is updated.
   * Defaults to () => {}.
   */
  onUpdate: {
    type: Function as PropType<(editor?: EditorClass) => void | Promise<void>>,
    default: () => {},
  },
  /**
   * A callback function that is called whenever the editor is updated, but only after the defined debounce duration.
   * Defaults to () => {}.
   */
  onDebouncedUpdate: {
    type: Function as PropType<(editor?: EditorClass) => void | Promise<void>>,
    default: () => {},
  },
  /**
   * The duration (in milliseconds) to debounce the onDebouncedUpdate callback.
   * Defaults to 750.
   */
  debounceDuration: {
    type: Number,
    default: 750,
  },
  /**
   * The key to use for storing the editor's value in local storage.
   * Defaults to "whimsy__content".
   */
  storageKey: {
    type: String,
    default: "whimsy__content",
  },
  /**
   * Placeholder text for the editor.
   * Defaults to "Type something here...".
   */
  placeholder: {
    type: String,
    default: "Type something here... or ++",
  },
  /**
   * List of commands that can be accessed using the slash(/).
   * Defaults to [].
   */
  slashCommands: {
    type: Array as PropType<SlashCommandItem[]>,
    default: defaultItems,
  },
  /**
   * Determines the default height of the input element.
   * Defaults to 3.
   */
  lines: {
    type: Number,
    default: 3,
  },
  /**
   * Determines the max height of the input element
   * after which the content overflow and appears with the scroll.
   * Defaults to 3.
   */
  maxLines: {
    type: Number,
    default: 3,
  },
  /**
   * Determines the max height of the input element
   * after which the content overflow and appears with the scroll.
   * Defaults to 3.
   */
  styleVars: {
    type: Object as PropType<StyleVariables>,
    default: {
      mainBg: "#FFFFFF",
      textColor: "#333333",
      primaryAccent: "#FFB38B",
      secondaryAccent: "#8FC1E3",
      mutedBg: "#F5F5F5",
      mutedText: "#757575",
      mutedAccent: "#FFC107",
      mutedBorder: "#E0E0E0",
      borderColor: "#BDBDBD",
      boxShadow: "0 0.125em 0.25em rgba(0, 0, 0, 0.2)",
      codeBg: "#F9F9F9",
      codeText: "#212121",
      codeBorder: "#CCCCCC",
      quoteBg: "#EEEEEE",
      quoteText: "#616161",
      quoteBorder: "#BDBDBD",
      linkColor: "#6A89CC",
      generalSpacing: "1em",
      borderRadius: "0.25em",
      baseFont: "1em",
    },
  },
});

onMounted(() => {
  // Create a new <style> element
  const styleElement = document.createElement("style");

  // Define CSS rules with new variables
  const cssRules = `
  /* Primary Colors */
  :root {
    --whimsy-main-background: ${props.styleVars.mainBg};
    --whimsy-text-color: ${props.styleVars.textColor};
    --whimsy-primary-accent: ${props.styleVars.primaryAccent};
    --whimsy-secondary-accent: ${props.styleVars.secondaryAccent};

    /* Muted Colors */
    --whimsy-muted-background: ${props.styleVars.mutedBg};
    --whimsy-muted-text: ${props.styleVars.mutedText};
    --whimsy-muted-accent: ${props.styleVars.mutedAccent};
    --whimsy-muted-border: ${props.styleVars.mutedBorder};

    /* Borders & Shadows */
    --whimsy-border-color: ${props.styleVars.borderColor};
    --whimsy-box-shadow: ${props.styleVars.boxShadow};

    /* Code Blocks */
    --whimsy-code-background: ${props.styleVars.codeBg};
    --whimsy-code-text: ${props.styleVars.codeText};
    --whimsy-code-border: ${props.styleVars.codeBorder};

    /* Quotes */
    --whimsy-quote-background: ${props.styleVars.quoteBg};
    --whimsy-quote-text: ${props.styleVars.quoteText};
    --whimsy-quote-border: ${props.styleVars.quoteBorder};

    /* Link Color */
    --whimsy-link-color: ${props.styleVars.linkColor};

    /* General */
    --whimsy-general-spacing: ${props.styleVars.generalSpacing};
    --whimsy-border-radius: ${props.styleVars.borderRadius};
    --whimsy-base-font: ${props.styleVars.baseFont};
  }
`;

  // Set the CSS rules to the <style> element
  styleElement.textContent = cssRules;

  // Append the <style> element to the <head> of the document
  document.head.appendChild(styleElement);
});

provide("completionApi", props.completionApi);

const content = useStorage(props.storageKey, props.defaultValue);

const debouncedUpdate = useDebounceFn(({ editor }) => {
  const json = editor.getJSON();
  content.value = json;
  props.onDebouncedUpdate(editor);
}, props.debounceDuration);

const editor = useEditor({
  extensions: [
    ...defaultExtensions({ placeholder: props.placeholder }),
    SlashCommand(props.slashCommands),
    ...props.extensions,
  ],
  editorProps: {
    ...defaultEditorProps,
    ...props.editorProps,
  },
  onUpdate: (e) => {
    const selection = e.editor.state.selection;
    const lastTwo = getPrevText(e.editor, {
      chars: 2,
    });
    // Run the completion API if the user types "++" at the end of the document.
    if (lastTwo === "++" && !isLoading.value) {
      e.editor.commands.deleteRange({
        from: selection.from - 2,
        to: selection.from,
      });
      complete(
        getPrevText(e.editor, {
          chars: 5000,
        })
      );
    } else {
      props.onUpdate(e.editor);
      debouncedUpdate(e);
    }
  },
  autofocus: "end",
});

defineExpose({
  editor,
});

const { complete, completion, isLoading, stop } = useCompletion({
  id: "whimsy-editor-vue",
  api: props.completionApi,
  onFinish: (_prompt, completion) => {
    editor.value?.commands.setTextSelection({
      from: editor.value.state.selection.from - completion.length,
      to: editor.value.state.selection.from,
    });
  },
  onError: (err) => {
    console.error(err);
  },
});

// Insert chunks of the generated text
watch(
  () => completion.value,
  (newCompletion, oldCompletion) => {
    const diff = newCompletion?.slice(oldCompletion?.length);
    if (diff) {
      editor.value?.commands.insertContent(diff);
    }
  }
);

// if user presses escape or cmd + z and it's loading,
// stop the request, delete the completion, and insert back the "++"
const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape" || (e.metaKey && e.key === "z")) {
    stop();
    if (e.key === "Escape") {
      editor.value?.commands.deleteRange({
        from: editor.value.state.selection.from - completion.value.length,
        to: editor.value.state.selection.from,
      });
    }
    editor.value?.commands.insertContent("++");
  }
};

const mousedownHandler = (e: MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  stop();
  if (window.confirm("AI writing paused. Continue?")) {
    complete(editor.value?.getText() || "");
  }
};

watch(
  () => isLoading.value,
  (isLoading) => {
    if (isLoading) {
      document.addEventListener("keydown", onKeyDown);
      window.addEventListener("mousedown", mousedownHandler);
    } else {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    }
  }
);

// Load the editor content from local storage on mount.
const hydrated = ref(false);
watchEffect(() => {
  if (editor.value && content.value && !hydrated.value) {
    editor.value.commands.setContent(content.value);
    hydrated.value = true;
  }
});
</script>

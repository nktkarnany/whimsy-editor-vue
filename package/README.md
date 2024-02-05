# Whimsy Vue

Whimsy Editor Vue is a vue 3 component

## Introduction

Whimsy Editor is a WYSIWYG editor with AI-powered autocompletions.

## Installation

To use Whimsy Editor in a project, you can run the following command to install the `whimsy-editor-vue` [NPM package](https://www.npmjs.com/package/whimsy-editor-vue):

```
npm i whimsy-editor-vue
```

Then, you can use it in your code like this:

```vue
<template>
  <Editor />
</template>

<script setup lang="ts">
import { Editor } from "whimsy-editor-vue";
import "whimsy-editor-vue/dist/style.css";
</script>
```

| Prop              | Type        | Description                                                                                                      | Default                                                                                                                                                     |
| ----------------- | ----------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| completionApi     | String      | The API route to use for the OpenAI completion API.                                                              | "/api/generate"                                                                                                                                             |
| className         | String      | Additional classes to add to the editor container.                                                               | "whimsy-editor" |
| defaultValue      | JSONContent | The default value to use for the editor.                                                                         | defaultEditorContent                                                                                                                                        |
| format            | String      | Supported formats `json` & `html`                                                                                | "json" |
| extensions        | Extension[] | A list of extensions to use for the editor, in addition to the default whimsy extensions.                         | []                                                                                                                                                          |
| editorProps       | EditorProps | Props to pass to the underlying Tiptap editor, in addition to the default Whimsy editor props.                    | {}                                                                                                                                                          |
| onUpdate          | Function    | A callback function that is called whenever the editor is updated.                                               | () => {}                                                                                                                                                    |
| onDebouncedUpdate | Function    | A callback function that is called whenever the editor is updated, but only after the defined debounce duration. | () => {}                                                                                                                                                    |
| debounceDuration  | Number      | The duration (in milliseconds) to debounce the onDebouncedUpdate callback.                                       | 750                                                                                                                                                         |
| storageKey        | String \| Null | The key to use for storing the editor's value in local storage. For value `null` it doesn't save in local storage.  | null                                                                                                                                          |

> **Note**: Make sure to define an API endpoint that matches the `completionApi` prop (default is `/api/generate`). This is needed for the AI autocompletions to work.
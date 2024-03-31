# Whimsy Editor Vue

Whimsy Editor Vue is a Vue 3 component for building WYSIWYG editors with AI-powered autocompletions.

## Introduction

Whimsy Editor is a simple WYSIWYG editor designed for Vue.js applications. With its AI-powered autocompletions, users can enhance their writing experience with intelligent suggestions.

## Installation

To use Whimsy Editor in your Vue project, simply install the `whimsy-editor-vue` NPM package:

```bash
npm install whimsy-editor-vue
```

## Usage Example

Then, integrate it into your Vue components as follows:

```vue
<template>
  <WhimsyEditorVue
    v-model="editorContent"
    :completionApi="yourCompletionApiEndpoint"
  />
</template>

<script>
import { ref } from "vue";
import WhimsyEditorVue from "whimsy-editor-vue";
import "whimsy-editor-vue/dist/style.css";

export default {
  components: {
    WhimsyEditorVue,
  },
  setup() {
    const editorContent = ref("");

    return {
      editorContent,
    };
  },
};
</script>
```

## Features

- **WYSIWYG Editing:** Whimsy Editor provides a What-You-See-Is-What-You-Get interface for seamless content creation.
- **AI-Powered Autocompletions:** Enhance your writing experience with intelligent autocompletion suggestions powered by AI.
- **Customizable:** Customize the editor to suit your needs with additional extensions and configuration options.

## Configuration Options

| Prop              | Type           | Description                                                                                                        | Default              |
| ----------------- | -------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------- |
| completionApi     | String         | The API route to use for the OpenAI completion API.                                                                | "/api/generate"      |
| className         | String         | Additional classes to add to the editor container.                                                                 | "whimsy-editor"      |
| defaultValue      | JSONContent    | The default value to use for the editor.                                                                           | defaultEditorContent |
| format            | String         | Supported formats `json` & `html`                                                                                  | "json"               |
| extensions        | Extension[]    | A list of extensions to use for the editor, in addition to the default whimsy extensions.                          | []                   |
| editorProps       | EditorProps    | Props to pass to the underlying Tiptap editor, in addition to the default Whimsy editor props.                     | {}                   |
| onUpdate          | Function       | A callback function that is called whenever the editor is updated.                                                 | () => {}             |
| onDebouncedUpdate | Function       | A callback function that is called whenever the editor is updated, but only after the defined debounce duration.   | () => {}             |
| debounceDuration  | Number         | The duration (in milliseconds) to debounce the onDebouncedUpdate callback.                                         | 750                  |
| storageKey        | String \| Null | The key to use for storing the editor's value in local storage. For value `null` it doesn't save in local storage. | null                 |

> **Note**: Ensure to define an API endpoint that matches the `completionApi` prop (default is `/api/generate`). This is needed for the AI autocompletions to work.

## API Documentation

Whimsy Editor Vue exposes the following public methods and events for interaction:

### Methods

- `methodName(arg1, arg2, ...): ReturnType`: Description of the method.

### Events

- `eventName`: Description of the event.

For detailed usage examples, refer to the [API Documentation](#api-documentation) section in the README.

## Contribution Guidelines

We welcome contributions from the community! To contribute to Whimsy Editor Vue, please follow these guidelines:

1. Check the [issue tracker](https://github.com/nktkarnany/whimsy-editor-vue/issues) for existing issues or open a new one to discuss proposed changes.
2. Fork the repository and create a new branch for your feature or bug fix.
3. Make your changes, ensuring they adhere to the coding standards and test them thoroughly.
4. Submit a pull request, explaining the changes you've made and any considerations for reviewers.

## License

Whimsy Editor Vue is licensed under the [MIT License](LICENSE).

## Credits

Whimsy Editor Vue was inspired by [Tiptap](https://tiptap.dev/) and uses the [OpenAI](https://openai.com/) API for autocompletions.

---

# Whimsy Editor Vue

Whimsy Editor is a WYSIWYG editor component built on top of Tiptap and Open AI.

## Introduction

Whimsy Editor is a simple WYSIWYG editor designed for Vue.js applications.

## Installation

To use Whimsy Editor in your Vue project, simply install the `whimsy-editor-vue` NPM package:

```bash
npm install whimsy-editor-vue
```

## Usage Example

Then, integrate it into your Vue components as follows:

```vue
<template>
  <Editor v-model="editorContent" :completionApi="yourCompletionApiEndpoint" />
</template>

<script setup>
import { ref } from "vue";
import { Editor } from "whimsy-editor-vue";
import "whimsy-editor-vue/dist/style.css";

const editorContent = ref("");
</script>
```

## Features

- **WYSIWYG Editing:** Whimsy Editor offers an intuitive What-You-See-Is-What-You-Get interface, ensuring that content creation is effortless and visually consistent.

- **Customizable:** Customize the editor according to your unique requirements with a comprehensive range of extensions and styling options.

- **Slash Commands:** Seamlessly integrate custom slash commands into the editor, enabling users to execute predefined actions or commands directly within the interface.

- **Bubble Menu:** Utilize the built-in bubble menu or effortlessly integrate your own customized version, providing users with an intuitive interface for accessing essential editing tools and functionalities with ease.

- **AI-Powered Autocompletions:** Elevate your writing process with AI-powered autocompletion suggestions that anticipate your next words or phrases based on context and language patterns, fostering productivity and enhancing the quality of your content.

## Configuration Options

| Prop              | Type               | Description                                                                                                        | Default                        |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| completionApi     | String             | The API route to use for the OpenAI completion API.                                                                | "/api/generate"                |
| className         | String             | Additional classes to add to the editor container.                                                                 | "whimsy-editor"                |
| defaultValue      | JSONContent        | The default value to use for the editor.                                                                           | defaultEditorContent           |
| format            | String             | Supported formats `json` & `html`                                                                                  | "json"                         |
| extensions        | Extension[]        | A list of extensions to use for the editor, in addition to the default whimsy extensions.                          | []                             |
| editorProps       | EditorProps        | Props to pass to the underlying Tiptap editor, in addition to the default Whimsy editor props.                     | {}                             |
| onUpdate          | Function           | A callback function that is called whenever the editor is updated.                                                 | () => {}                       |
| onDebouncedUpdate | Function           | A callback function that is called whenever the editor is updated, but only after the defined debounce duration.   | () => {}                       |
| debounceDuration  | Number             | The duration (in milliseconds) to debounce the onDebouncedUpdate callback.                                         | 750                            |
| storageKey        | String \| Null     | The key to use for storing the editor's value in local storage. For value `null` it doesn't save in local storage. | null                           |
| placeholder       | String             | Placeholder text for the editor.                                                                                   | "Type something here... or ++" |
| slashCommands     | SlashCommandItem[] | List of commands that can be accessed using the slash(/).                                                          | []                             |
| lines             | Number             | Determines the default height of the input element.                                                                | 3                              |
| maxLines          | Number             | Determines the max height of the input element after which the content overflows and appears with the scroll.      | 3                              |
| styleVars         | StyleVariables     | Determines the styling variables for the editor.                                                                   | See below                      |

### Default Style Variables:

```json
{
  "mainBg": "#FFFFFF",
  "textColor": "#333333",
  "primaryAccent": "#FFB38B",
  "secondaryAccent": "#8FC1E3",
  "mutedBg": "#F5F5F5",
  "mutedText": "#757575",
  "mutedAccent": "#FFC107",
  "mutedBorder": "#E0E0E0",
  "borderColor": "#BDBDBD",
  "boxShadow": "0 0.125em 0.25em rgba(0, 0, 0, 0.2)",
  "codeBg": "#F9F9F9",
  "codeText": "#212121",
  "codeBorder": "#CCCCCC",
  "quoteBg": "#EEEEEE",
  "quoteText": "#616161",
  "quoteBorder": "#BDBDBD",
  "linkColor": "#6A89CC",
  "generalSpacing": "1em",
  "borderRadius": "0.25em",
  "baseFont": "1em"
}
```

> **Note**: Ensure to define an API endpoint that matches the `completionApi` prop (default is `/api/generate`). This is needed for the AI autocompletions to work.

<!-- ## API Documentation

Whimsy Editor Vue exposes the following public methods and events for interaction:

### Methods

- `methodName(arg1, arg2, ...): ReturnType`: Description of the method.

### Events

- `eventName`: Description of the event.

For detailed usage examples, refer to the [API Documentation](#api-documentation) section in the README. -->

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

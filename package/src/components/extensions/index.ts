import StarterKit from "@tiptap/starter-kit";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TiptapLink from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TiptapUnderline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { Markdown } from "tiptap-markdown";
import Highlight from "@tiptap/extension-highlight";
import { InputRule } from "@tiptap/core";
import SlashCommand from "./slashExtension";

export const defaultExtensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "list-disc list-outside leading-3 mt-2",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal list-outside leading-3 mt-2",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "leading-normal mb-2",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-4 border-stone-700",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: "rounded-sm bg-gray-200 p-5 text-sm color-gray-700",
      },
    },
    code: {
      HTMLAttributes: {
        class: "rounded-md bg-gray-300 px-1 py-1 text-sm color-gray-800",
        spellcheck: "false",
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: "#DBEAFE",
      width: 4,
    },
    gapcursor: false,
  }),
  // patch to fix horizontal rule bug: https://github.com/ueberdosis/tiptap/pull/3859#issuecomment-1536799740
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state, range }) => {
            const attributes = {};

            const { tr } = state;
            const start = range.from;
            let end = range.to;

            tr.insert(start - 1, this.type.create(attributes)).delete(
              tr.mapping.map(start),
              tr.mapping.map(end)
            );
          },
        }),
      ];
    },
  }).configure({
    HTMLAttributes: {
      class: "mt-3 mb-5 border-top border-solid border-color",
    },
  }),
  TiptapLink.configure({
    HTMLAttributes: {
      class: "color-gray-500 underline underline-offset-4 cursor-pointer",
    },
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return `Heading ${node.attrs.level}`;
      }
      return "Press '/' for commands, or '++' for AI autocomplete...";
    },
    includeChildren: true,
  }),
  TiptapUnderline,
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: "not-prose pl-3",
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: "d-flex align-start my-3",
    },
    nested: true,
  }),
  Markdown.configure({
    html: false,
    transformCopiedText: true,
  }),
  SlashCommand,
];

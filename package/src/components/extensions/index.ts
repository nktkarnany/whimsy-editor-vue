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
    heading: {
      HTMLAttributes: {
        class: "heading",
      },
    },
    paragraph: {
      HTMLAttributes: {
        class: "paragraph",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "bullet-list not-prose",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "ordered-list not-prose",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "list-item",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "blockquote",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: "code-block",
        spellcheck: "false",
      },
    },
    code: {
      HTMLAttributes: {
        class: "code",
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
      class: "horizontal-rule",
    },
  }),
  TiptapLink.configure({
    HTMLAttributes: {
      class: "link",
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
      class: "d-flex align-center my-3",
    },
    nested: true,
  }),
  Markdown.configure({
    html: false,
    transformCopiedText: true,
  }),
  SlashCommand,
];

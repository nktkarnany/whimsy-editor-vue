import { Editor, Range } from "@tiptap/core";
import { h } from "vue";
import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  MessageSquarePlus,
  Text,
  TextQuote,
  Code,
  CheckSquare,
  Sparkles,
} from "lucide-vue-next";

interface CommandProps {
  editor: Editor;
  range: Range;
}

export interface SlashCommandItem {
  title: string;
  description: string;
  icon: any;
  searchTerms?: string[];
  command?: (props: CommandProps) => void;
}

export const defaultItems = [
  {
    title: "Continue writing",
    description: "Use AI to expand your thoughts.",
    searchTerms: ["gpt"],
    icon: h(Sparkles),
  },
  {
    title: "Send Feedback",
    description: "Let us know how we can improve.",
    icon: h(MessageSquarePlus),
    command: ({ editor, range }: CommandProps) => {
      editor.chain().focus().deleteRange(range).run();
      window.open("/feedback", "_blank");
    },
  },
  {
    title: "Text",
    description: "Just start typing with plain text.",
    searchTerms: ["p", "paragraph"],
    icon: h(Text),
    command: ({ editor, range }: CommandProps) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .run();
    },
  },
  {
    title: "To-do List",
    description: "Track tasks with a to-do list.",
    searchTerms: ["todo", "task", "list", "check", "checkbox"],
    icon: h(CheckSquare),
    command: ({ editor, range }: CommandProps) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "Heading 1",
    description: "Big section heading.",
    searchTerms: ["title", "big", "large"],
    icon: h(Heading1),
    command: ({ editor, range }: CommandProps) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading.",
    searchTerms: ["subtitle", "medium"],
    icon: h(Heading2),
    command: ({ editor, range }: CommandProps) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
  },
  {
    title: "Heading 3",
    description: "Small section heading.",
    searchTerms: ["subtitle", "small"],
    icon: h(Heading3),
    command: ({ editor, range }: CommandProps) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
  },
  {
    title: "Bullet List",
    description: "Create a simple bullet list.",
    searchTerms: ["unordered", "point"],
    icon: h(List),
    command: ({ editor, range }: CommandProps) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Numbered List",
    description: "Create a list with numbering.",
    searchTerms: ["ordered"],
    icon: h(ListOrdered),
    command: ({ editor, range }: CommandProps) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Quote",
    description: "Capture a quote.",
    searchTerms: ["blockquote"],
    icon: h(TextQuote),
    command: ({ editor, range }: CommandProps) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .toggleBlockquote()
        .run(),
  },
  {
    title: "Code",
    description: "Capture a code snippet.",
    searchTerms: ["codeblock"],
    icon: h(Code),
    command: ({ editor, range }: CommandProps) =>
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
  },
];

import { Editor, Range, Extension } from "@tiptap/core";
import { VueRenderer } from "@tiptap/vue-3";
import tippy from "tippy.js";
import Suggestion from "@tiptap/suggestion";
import SlashCommandList from "./slashCommandList.vue";

const Command = Extension.create({
  name: "slash-command",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({
          editor,
          range,
          props,
        }: {
          editor: Editor;
          range: Range;
          props: any;
        }) => {
          props.command({ editor, range });
        },
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export interface CommandProps {
  editor: Editor;
  range: Range;
}

interface SlashCommandItem {
  title: string;
  description: string;
  icon: any;
  searchTerms?: string[];
  command?: (props: CommandProps) => void;
}

const renderItems = () => {
  let component: VueRenderer | null = null;
  let popup: any | null = null;

  return {
    onStart: (props: { editor: Editor; clientRect: DOMRect }) => {
      component = new VueRenderer(SlashCommandList, {
        props,
        editor: props.editor,
      });

      if (!props.clientRect) {
        return;
      }

      // @ts-ignore
      popup = tippy("body", {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },
    onUpdate: (props: { editor: Editor; clientRect: DOMRect }) => {
      component?.updateProps(props);

      popup &&
        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
    },
    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === "Escape") {
        popup?.[0].hide();

        return true;
      }

      return component?.ref?.onKeyDown(props.event);
    },
    onExit: () => {
      popup?.[0].destroy();
      component?.destroy();
    },
  };
};

const SlashCommand = (items: SlashCommandItem[]) =>
  Command.configure({
    suggestion: {
      items: ({ query }: { query: string }) =>
        items.filter((item) => {
          if (typeof query === "string" && query.length > 0) {
            const search = query.toLowerCase();
            return (
              item.title.toLowerCase().includes(search) ||
              item.description.toLowerCase().includes(search) ||
              (item.searchTerms &&
                item.searchTerms.some((term: string) => term.includes(search)))
            );
          }
          return true;
        }),
      render: renderItems,
    },
  });

export { type SlashCommandItem, SlashCommand };

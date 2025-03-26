"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEffect } from "react";
import { useColorMode } from "../color-mode";

type Props = {
  markdown: string;
  readonly?: boolean;
  handleChange?: (markdown: string) => void;
};

export default function Editor({
  markdown,
  readonly = false,
  handleChange,
}: Props) {
  const { colorMode } = useColorMode();
  const editor = useCreateBlockNote();

  const onChange = async () => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    handleChange?.(markdown);
  };

  useEffect(() => {
    async function loadInitialHTML() {
      const blocks = await editor.tryParseMarkdownToBlocks(markdown);
      if (blocks.length > 0) {
        editor.replaceBlocks(editor.document, blocks);
      }
    }

    loadInitialHTML();
    onChange();
  }, [editor, markdown]);

  console.log({ markdown });

  return (
    <BlockNoteView
      aria-readonly={readonly}
      editor={editor}
      theme={colorMode}
      onChange={onChange}
    />
  );
}

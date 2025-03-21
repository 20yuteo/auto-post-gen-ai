"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEffect } from "react";
import { useColorMode } from "../color-mode";

type Props = {
  markdown: string;
  handleChange: (markdown: string) => void;
};

export default function Editor({ markdown, handleChange }: Props) {
  const { colorMode } = useColorMode();
  const editor = useCreateBlockNote();

  const onChange = async () => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    handleChange(markdown);
  };

  useEffect(() => {
    async function loadInitialHTML() {
      const blocks = await editor.tryParseMarkdownToBlocks(markdown);
      editor.replaceBlocks(editor.document, blocks);
    }
    loadInitialHTML();
    onChange();
  }, []);

  return (
    <BlockNoteView editor={editor} theme={colorMode} onChange={onChange} />
  );
}

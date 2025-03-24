"use client";
import {
  Button,
  CloseButton,
  Dialog,
  Flex,
  Heading,
  Input,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";
import { Editor } from "../components/ui/editor/DynamicEditor";
import { useCallback, useState } from "react";
import { PromptRequest } from "@/app/api/prompts/route";
import GeneratedPromptView from "../components/ui/generatedPromptView/GeneratedPromptView";

type PromptType = {
  content: string;
  ok: true;
};

export default function Prompt() {
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [generatedContent, setGeneratedContent] = useState<string>();

  const handleChange = (markdown: string) => {
    setMarkdown(markdown);
  };

  const handleSubmit = async () => {
    const body: PromptRequest = {
      title: title,
      markdown,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/prompts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
  };

  const handleTryPrompt = useCallback(async () => {
    setGeneratedContent(undefined);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/prompts/try`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prormpt: markdown,
        }),
      }
    );
    const data: PromptType = await response.json();
    setGeneratedContent(data.content);
  }, [markdown]);

  return (
    <Flex direction="row" gap={16} justifyContent="space-between">
      <Flex direction="column" gap={4} width="70rem" margin="0 auto">
        <Heading size="2xl">
          Let's set up a prompt to generate X posts 😎
        </Heading>
        <Input
          value={title}
          placeholder="Please input title..."
          onChange={(e) => setTitle(e.target.value)}
        />
        {generatedContent ? (
          <Editor markdown={generatedContent} readonly />
        ) : (
          <Editor markdown={markdown} handleChange={handleChange} />
        )}
        <GeneratedPromptView
          content={generatedContent}
          handleTryPrompt={handleTryPrompt}
          handleRegenerate={handleTryPrompt}
        />
      </Flex>
    </Flex>
  );
}

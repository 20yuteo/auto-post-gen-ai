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
import { useCallback, useEffect, useState } from "react";
import { PromptRequest } from "@/app/api/prompts/route";
import GeneratedPromptView from "../components/ui/generatedPromptView/GeneratedPromptView";

type PromptType = {
  content: string;
  ok: true;
};

type PromptInput = {
  id?: string;
  userId: string;
  title: string;
  content: string;
};

export default function Prompt() {
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [generatedContent, setGeneratedContent] = useState<string>();
  const [prompts, setPrompts] = useState<PromptInput[]>([]);

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

  useEffect(() => {
    const fetchPrompts = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/prompts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result: { prompts: PromptInput[] } = await res.json();
      setPrompts(result.prompts);
    };

    fetchPrompts();
  }, []);

  return (
    <Flex direction="row" gap={16} justifyContent="space-between">
      <Flex direction="column" gap={4} width="100%" margin="0 auto">
        <Heading size="2xl">
          Let's set up a prompt to generate X posts 😎
        </Heading>
        <Flex direction="row" gap={4} alignItems="center">
          <Flex direction="column" gap={4}></Flex>
          <Flex direction="column" gap={4}>
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
      </Flex>
    </Flex>
  );
}

"use client";
import { Button, Flex, Heading, Link, Textarea } from "@chakra-ui/react";
import { Editor } from "../components/ui/editor/DynamicEditor";
import { Suspense, useCallback, useEffect, useState } from "react";
import { PromptRequest } from "@/app/api/prompts/route";
import GeneratedPromptView from "../components/ui/generatedPromptView/GeneratedPromptView";
import { useSearchParams } from "next/navigation";
import { useColorMode } from "@/components/ui/color-mode";
import PromptsDrawer from "@/components/ui/promptsDrawer";

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

const PromptView = () => {
  const searchParams = useSearchParams();
  const prompt_id = searchParams.get("prompt_id");
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState<string>();
  const [prompts, setPrompts] = useState<PromptInput[]>([]);
  const [targetId, setTargetId] = useState<string>();
  const { colorMode } = useColorMode();

  const handleChange = (prompt: string) => {
    setPrompt(prompt);
  };

  const handleSubmit = async () => {
    const body: PromptRequest = {
      prompt,
    };

    if (targetId) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/prompts/${targetId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...body,
            id: targetId,
          }),
        }
      );
      return;
    }

    await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/prompts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
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
          prompt,
        }),
      }
    );
    const data: PromptType = await response.json();
    setGeneratedContent(data.content);
  }, [prompt]);

  useEffect(() => {
    if (prompt_id) {
      setTargetId(prompt_id);
      (async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/prompts/${prompt_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result: { prompt: PromptInput } = await res.json();
        console.log({ result });
        setPrompt(result.prompt.content);
      })();
    }

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
    <Flex
      direction="row"
      gap={16}
      justifyContent="space-between"
      height="100vh"
      width="100vw"
    >
      <Flex
        direction="column"
        gap={4}
        width="100%"
        margin="0 auto"
        padding={16}
      >
        <Heading size="5xl" textAlign="center">
          Let's set up a prompt to generate X posts 😎
        </Heading>
        <Flex direction="row" gap={4} alignItems="flex-start" width="100%">
          <Flex direction="column" gap={4} grow={2} padding={4} width="25rem">
            {generatedContent ? (
              <Editor markdown={generatedContent} readonly />
            ) : (
              <Textarea
                variant="subtle"
                size="xl"
                resize="none"
                value={prompt}
                onChange={(e) => handleChange(e.target.value)}
              />
            )}
            <Flex direction="row" gap={4}>
              <PromptsDrawer />
              <GeneratedPromptView
                content={generatedContent}
                handleTryPrompt={handleTryPrompt}
                handleRegenerate={handleTryPrompt}
              />
              <Button
                maxW="24rem"
                margin="0 auto"
                rounded={16}
                onClick={handleSubmit}
              >
                Save🥑
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default function Prompt() {
  return (
    <Suspense>
      <PromptView />
    </Suspense>
  );
}

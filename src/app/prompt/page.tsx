"use client";
import { Button, Flex, Heading, Link } from "@chakra-ui/react";
import { Editor } from "../components/ui/editor/DynamicEditor";
import { useCallback, useEffect, useState } from "react";
import { PromptRequest } from "@/app/api/prompts/route";
import GeneratedPromptView from "../components/ui/generatedPromptView/GeneratedPromptView";
import { useSearchParams } from "next/navigation";
import { useColorMode } from "@/components/ui/color-mode";

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
  const [generatedContent, setGeneratedContent] = useState<string>();
  const [prompts, setPrompts] = useState<PromptInput[]>([]);
  const [targetId, setTargetId] = useState<string>();
  const { colorMode } = useColorMode();

  const handleChange = (markdown: string) => {
    setMarkdown(markdown);
  };

  const handleSubmit = async () => {
    const body: PromptRequest = {
      markdown,
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
          prormpt: markdown,
        }),
      }
    );
    const data: PromptType = await response.json();
    setGeneratedContent(data.content);
  }, [markdown]);

  useEffect(() => {
    const searchParams = useSearchParams();
    const prompt_id = searchParams.get("prompt_id");
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
        setMarkdown(result.prompt.content);
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
    <Flex direction="row" gap={16} justifyContent="space-between">
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
          <Flex direction="column" gap={2} width="20rem">
            {prompts.map((prompt) => (
              <Link href={`/prompt?prompt_id=${prompt.id}`} key={prompt.id}>
                <Flex
                  direction="row"
                  gap={4}
                  key={prompt.id}
                  bgColor={colorMode === "dark" ? "gray.700" : "gray.200"}
                  borderRadius="md"
                  padding={2}
                  width="100%"
                >
                  <Flex direction="column" gap={4} width="100%">
                    <Heading
                      size="md"
                      textOverflow="ellipsis"
                      overflow="hidden"
                      whiteSpace="nowrap"
                    >
                      {prompt.title}
                    </Heading>
                  </Flex>
                </Flex>
              </Link>
            ))}
          </Flex>
          <Flex direction="column" gap={4} grow={2} padding={4} width="25rem">
            {generatedContent ? (
              <Editor markdown={generatedContent} readonly />
            ) : (
              <Editor markdown={markdown} handleChange={handleChange} />
            )}
            <Flex direction="row" gap={4}>
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
}

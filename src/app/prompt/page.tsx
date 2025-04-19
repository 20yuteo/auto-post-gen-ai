"use client";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  ProgressCircle,
  Textarea,
} from "@chakra-ui/react";
import { Suspense, useCallback, useEffect, useState } from "react";
import { PromptRequest } from "@/app/api/prompts/route";
import GeneratedPromptView from "../components/ui/generatedPromptView/GeneratedPromptView";
import { useRouter, useSearchParams } from "next/navigation";
import { HiHeart } from "react-icons/hi";
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
  const [targetId, setTargetId] = useState<string>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (prompt: string) => {
    setPrompt(prompt);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

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
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
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
      setPrompt(result.prompts[0].content);
      setTargetId(result.prompts[0].id);
      router.replace(`/prompt?prompt_id=${result.prompts[0].id}`);
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
            <Textarea
              variant="subtle"
              size="xl"
              resize="none"
              value={prompt}
              onChange={(e) => handleChange(e.target.value)}
            />
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
                Save
                {isLoading ? (
                  <ProgressCircle.Root value={null} size="xs">
                    <ProgressCircle.Circle>
                      <ProgressCircle.Track />
                      <ProgressCircle.Range />
                    </ProgressCircle.Circle>
                  </ProgressCircle.Root>
                ) : (
                  <Box
                    data-state="open"
                    _open={{
                      animation: "pulse 1000ms ease-out",
                    }}
                  >
                    <Icon size="lg" color="pink.500">
                      <HiHeart />
                    </Icon>
                  </Box>
                )}
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

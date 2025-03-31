"use client";

import {
  Button,
  CloseButton,
  Drawer,
  Flex,
  Heading,
  Link,
  Portal,
} from "@chakra-ui/react";
import { useColorMode } from "../color-mode";
import { useEffect, useState } from "react";
import { RepositoryProvider } from "@/app/adapter/repositories/provider";
import { PromptInput } from "@/app/domain/repositories/prompts";

export default function PromptsDrawer() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const { colorMode } = useColorMode();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchPrompts = async () => {
      setIsFetching(true);
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
      setIsFetching(false);
    };

    fetchPrompts();
  }, []);

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline" size="sm">
          Prompt List
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Drawer Title</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              {prompts.length === 0 && isFetching ? (
                <p>Loading...</p>
              ) : (
                prompts.map((prompt) => (
                  <Link href={`/prompt?prompt_id=${prompt.id}`} key={prompt.id}>
                    <Flex
                      direction="row"
                      gap={4}
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
                ))
              )}
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}

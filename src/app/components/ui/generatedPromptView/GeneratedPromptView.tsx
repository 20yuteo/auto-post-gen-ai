"use client";
import {
  Button,
  CloseButton,
  Dialog,
  Flex,
  Heading,
  Portal,
  Skeleton,
} from "@chakra-ui/react";
import { Editor } from "../editor/DynamicEditor";

type PromptProps = {
  content?: string;
  handleTryPrompt: () => void;
  handleRegenerate: () => void;
};

export default function GeneratedPromptView({
  content,
  handleTryPrompt,
  handleRegenerate,
}: PromptProps) {
  return (
    <Dialog.Root size="full">
      <Dialog.Trigger asChild>
        <Button
          maxW="24rem"
          margin="0 auto"
          rounded={16}
          onClick={handleTryPrompt}
        >
          try prompt?
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content width="100%">
            <Dialog.Body margin={24}>
              <Flex direction="row" gap={16} justifyContent="space-between">
                <Flex direction="column" gap={4} width="70rem" margin="0 auto">
                  <Heading size="2xl">
                    <Flex direction="row" justifyContent="flex-start" gap={16}>
                      <Button
                        onClick={handleRegenerate}
                        maxW="24rem"
                        rounded={32}
                      >
                        ReGenerate♺
                      </Button>
                      <Dialog.ActionTrigger asChild>
                        <Button variant="outline" maxW="24rem" rounded={32}>
                          ReEdit✍️
                        </Button>
                      </Dialog.ActionTrigger>
                    </Flex>
                  </Heading>
                  {content ? (
                    <Editor markdown={content} readonly />
                  ) : (
                    <Skeleton variant="shine" width="full" height={1120} />
                  )}
                </Flex>
              </Flex>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

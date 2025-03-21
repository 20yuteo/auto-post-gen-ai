"use client";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Flex,
  Input,
  Portal,
} from "@chakra-ui/react";
import { Editor } from "../editor/DynamicEditor";
import { useState } from "react";
import { PromptRequest } from "@/app/api/prompts/route";

export default function PromptDialog() {
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");

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
    console.log({ data });
  };

  return (
    <Dialog.Root size="full">
      <Dialog.Trigger asChild>
        <Button width="100%" rounded={32}>
          Setting Prompt
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Prompt</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Flex direction="column" gap={4}>
                <p>Let's set up a prompt to generate X posts.</p>
                <Input
                  value={title}
                  placeholder="Please input title..."
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Editor markdown={markdown} handleChange={handleChange} />
              </Flex>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleSubmit}>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

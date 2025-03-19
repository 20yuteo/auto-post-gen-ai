import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { Editor } from "../editor/DynamicEditor";

export const PromptDialog = () => {
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
              <p>Let's set up a prompt to generate X posts.</p>
              <Editor />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

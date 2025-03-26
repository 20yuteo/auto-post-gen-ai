"use client";
import { Flex, Button, Link, ListItem, Image, List } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";

export default function Home() {
  return (
    <Flex direction="column" align="center" justify="center" w="100%">
      <Image src="/next.svg" alt="Next.js logo" boxSize="180px" />
      <ColorModeButton />
      <List.Root>
        <ListItem>
          Get started by editing <code>src/app/page.tsx</code>.
        </ListItem>
        <ListItem>Save and see your changes instantly.</ListItem>
      </List.Root>
      <Flex gap={4} mt={6}>
        <Button as={Link} colorScheme="blue" rel="noopener noreferrer">
          Deploy now
        </Button>
        <Button as={Link} rel="noopener noreferrer" variant="outline">
          Read our docs
        </Button>
      </Flex>
    </Flex>
  );
}

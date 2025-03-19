import {
  Box,
  Flex,
  Button,
  Link,
  ListItem,
  Image,
  List,
} from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { PromptDialog } from "./components/ui/promptDialog";

export default async function Home() {
  return (
    <Box maxW="100vw" mx="auto" maxH="100vh">
      <Flex direction="row" align="center" justify="space-between" maxW="100vw">
        <Box
          bg="dark"
          p={4}
          borderRight={"1px solid #343536"}
          w="365px"
          h="100vh"
        >
          <Flex direction="column" justify="space-between" align="center">
            <Link href="/">Home</Link>
            <PromptDialog />
          </Flex>
        </Box>
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
      </Flex>
    </Box>
  );
}

"use client";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
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
import { AiFillHome } from "react-icons/ai";
import { BsChatLeftTextFill } from "react-icons/bs";

export default function Home() {
  return (
    <Box maxW="100vw" mx="auto" maxH="100vh">
      <Flex direction="row" align="center" justify="space-between" maxW="100vw">
        <Box
          bg="dark"
          p={4}
          borderRight={"1px solid #8f9192"}
          w="365px"
          h="100vh"
        >
          <Flex
            direction="column"
            justify="space-between"
            align="flex-start"
            padding={8}
            gap={8}
          >
            <Link href="/" color="white" fontSize={32}>
              <AiFillHome size={24} />
              Home
            </Link>
            <Link href="/prompt" color="white" fontSize={32}>
              <BsChatLeftTextFill size={24} />
              Prompt
            </Link>
            <SignedOut>
              <Button as={Link} colorScheme="blue" rel="noopener noreferrer">
                <SignInButton />
              </Button>
              <Button as={Link} colorScheme="blue" rel="noopener noreferrer">
                <SignUpButton />
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
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

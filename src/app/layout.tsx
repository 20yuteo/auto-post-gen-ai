"use client";
import { ColorModeProvider, useColorMode } from "@/components/ui/color-mode";
import { Provider } from "@/components/ui/provider";
import {
  Button,
  Box,
  createSystem,
  defaultConfig,
  defineConfig,
  Flex,
  Link,
} from "@chakra-ui/react";
import {
  ClerkProvider,
  SignUpButton,
  SignedOut,
  UserButton,
  SignedIn,
  SignInButton,
} from "@clerk/nextjs";
import { AiFillHome } from "react-icons/ai";
import { BsChatLeftTextFill } from "react-icons/bs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { colorMode } = useColorMode();
  return (
    <ClerkProvider>
      <html
        lang="ja"
        className={colorMode}
        style={{ colorScheme: colorMode }}
        suppressHydrationWarning
      >
        <body>
          <Provider>
            <ColorModeProvider>
              <Box maxW="100vw" mx="auto" maxH="100vh">
                <Flex
                  direction="row"
                  align="center"
                  justify="space-between"
                  maxW="100vw"
                >
                  <Box
                    bg="dark"
                    p={4}
                    borderRight={"1px solid #8f9192"}
                    w="12rem"
                    h="100vh"
                  >
                    <Flex
                      direction="column"
                      justify="space-between"
                      align="flex-start"
                      padding={8}
                      gap={8}
                    >
                      <Link href="/" color={colorMode} fontSize={24}>
                        <AiFillHome size={24} />
                        Home
                      </Link>
                      <Link href="/prompt" color={colorMode} fontSize={24}>
                        <BsChatLeftTextFill size={24} />
                        Prompt
                      </Link>
                      <SignedOut>
                        <Button
                          as={Link}
                          colorScheme="blue"
                          rel="noopener noreferrer"
                        >
                          <SignInButton />
                        </Button>
                        <Button
                          as={Link}
                          colorScheme="blue"
                          rel="noopener noreferrer"
                        >
                          <SignUpButton />
                        </Button>
                      </SignedOut>
                      <SignedIn>
                        <UserButton />
                      </SignedIn>
                    </Flex>
                  </Box>
                  {children}
                </Flex>
              </Box>
            </ColorModeProvider>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}

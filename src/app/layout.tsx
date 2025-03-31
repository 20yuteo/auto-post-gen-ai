"use client";
import { ColorModeProvider, useColorMode } from "@/components/ui/color-mode";
import { Provider } from "@/components/ui/provider";
import { Button, Box, Flex, Link } from "@chakra-ui/react";
import {
  ClerkProvider,
  SignUpButton,
  SignedOut,
  UserButton,
  SignedIn,
  SignInButton,
  useAuth,
} from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsChatLeftTextFill } from "react-icons/bs";
import { accessTokenAtom } from "./atoms";
import { useAtom, useAtomValue } from "jotai";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { colorMode } = useColorMode();

  return (
    <ClerkProvider>
      <AuthWrapper>
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
                    <Sidebar colorMode={colorMode} />
                    {children}
                  </Flex>
                </Box>
              </ColorModeProvider>
            </Provider>
          </body>
        </html>
      </AuthWrapper>
    </ClerkProvider>
  );
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { userId } = useAuth();
  const [_, setOauthToken] = useAtom(accessTokenAtom);

  useEffect(() => {
    if (userId) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/oauth_token?userId=${userId}`
      )
        .then((res) => res.json())
        .then((data) => {
          const oauthToken = data.token.data[0].token;
          setOauthToken(oauthToken);
        })
        .catch((err) => console.error("Error fetching OAuth Token:", err));
    }
  }, [userId]);

  return <>{children}</>;
}

function Sidebar({ colorMode }: { colorMode: string }) {
  const { userId } = useAuth();

  const handleClick = async () => {
    if (userId) {
      await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      });
    }
  };

  return (
    <Box bg="dark" p={4} borderRight="1px solid #8f9192" w="12rem" h="100vh">
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
        <form action={handleClick}>
          <Button type="submit">OAuth Token</Button>
        </form>
      </Flex>
    </Box>
  );
}

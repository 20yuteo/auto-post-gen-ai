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
import { useAtom } from "jotai";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { colorMode } = useColorMode();
  const [clientColorMode, setClientColorMode] = useState<string>("dark");

  useEffect(() => {
    setClientColorMode(colorMode);
  }, [colorMode]);

  return (
    <ClerkProvider>
      <AuthWrapper>
        <html
          lang="ja"
          className={clientColorMode}
          style={{ colorScheme: clientColorMode }}
          suppressHydrationWarning
        >
          <body suppressHydrationWarning>
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
          if (data.error) {
            console.error("Error fetching OAuth Token:", data.error);
            return;
          }
          console.log(data.token.data);

          if (!data.token.data) {
            return;
          }
          const oauthToken = data.token.data[0].token;
          setOauthToken(oauthToken);
        })
        .catch((err) => console.error("Error fetching OAuth Token:", err));
    }
  }, [userId]);

  return <>{children}</>;
}

function Sidebar({ colorMode }: { colorMode: string }) {
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
      </Flex>
    </Box>
  );
}

"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider, useColorMode } from "@/components/ui/color-mode";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { colorMode } = useColorMode();
  return (
    <html lang="ja" className={colorMode} style={{ colorScheme: colorMode }}>
      <body>
        <ChakraProvider value={defaultSystem}>
          <ColorModeProvider>{children}</ColorModeProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}

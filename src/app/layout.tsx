"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <ChakraProvider value={defaultSystem}>
          {/* <ThemeProvider attribute="class" disableTransitionOnChange> */}
          {children}
          {/* </ThemeProvider> */}
        </ChakraProvider>
      </body>
    </html>
  );
}

"use client";
import { ColorModeProvider, useColorMode } from "@/components/ui/color-mode";
import { Provider } from "@/components/ui/provider";
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { ClerkProvider } from "@clerk/nextjs";

const config = defineConfig({
  globalCss: {
    html: {
      colorPalette: "blue",
    },
  },
});

export const system = createSystem(defaultConfig, config);

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
            <ColorModeProvider>{children}</ColorModeProvider>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}

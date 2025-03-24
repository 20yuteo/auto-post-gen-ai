"use client";

import dynamic from "next/dynamic";

export const GeneratedPromptView = dynamic(
  () => import("./GeneratedPromptView"),
  {
    ssr: false,
  }
);

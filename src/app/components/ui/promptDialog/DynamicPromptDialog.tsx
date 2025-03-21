"use client";

import dynamic from "next/dynamic";

export const PromptDialog = dynamic(() => import("./PromptDialog"), {
  ssr: false,
});

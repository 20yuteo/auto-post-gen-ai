import { RepositoryProvider } from "@/app/adapter/repositories/provider";
import { NextResponse } from "next/server";

export const getSystemPrompt = (goal: string) => `
    You are a social media content planner who shares helpful information for engineers on X (formerly Twitter).
    Your goal is ${goal}.
    Please follow these guidelines:
    1. Be mindful of creating longer-form content.
    2. Use emojis to make the post visually appealing and approachable.
    3. Add relevant hashtags to increase visibility.
    4. Focus on introducing specific tools or techniques rather than abstract concepts.
    5. Write in English for an English-speaking engineering audience.
    6. Output only one post at a time, in plain text (no Markdown formatting).
    7. Do not include replies—only output the post itself.
    8. Always aim to communicate useful, specific information as briefly and clearly as possible.
  `;

export async function POST(req: Request) {
  const data = await req.json();

  const LLMRepository = new RepositoryProvider().llm;

  const res = await LLMRepository.generateContent(getSystemPrompt(data.prompt));
  return NextResponse.json({ ok: true, content: res });
}

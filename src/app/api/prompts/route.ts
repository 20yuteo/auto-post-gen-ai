import { RepositoryProvider } from "@/app/adapter/repositories/provider";
import { PromptInput } from "@/app/domain/repositories/prompts";
import { NextResponse } from "next/server";
import { v4 } from "uuid";

const PromptsRepository = new RepositoryProvider().prompts;

export type PromptRequest = {
  title: string;
  markdown: string;
};

export async function GET() {
  const prompts = await PromptsRepository.findAll();
  return NextResponse.json({ prompts });
}

export async function POST(req: Request) {
  const data: PromptRequest = await req.json();
  const PromptsRepository = new RepositoryProvider().prompts;
  const userId = v4();
  const input: PromptInput = {
    userId,
    title: data.title,
    content: data.markdown,
  };
  const result = await PromptsRepository.create(input);
  console.log({ result });
  return NextResponse.json({ ok: true });
}

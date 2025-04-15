import { RepositoryProvider } from "@/app/adapter/repositories/provider";
import { PromptInput } from "@/app/domain/repositories/prompts";
import { NextResponse } from "next/server";
import { v4 } from "uuid";

const PromptsRepository = new RepositoryProvider().prompts;

export type PromptRequest = {
  id?: number;
  prompt: string;
};

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id && typeof id !== "string" && !Array.isArray(id)) {
    return NextResponse.json({ ok: false });
  }
  const prompt = await PromptsRepository.findById(id as string);

  if (!prompt) {
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ prompt });
}

export async function PUT(req: Request) {
  const data: PromptRequest = await req.json();
  const PromptsRepository = new RepositoryProvider().prompts;
  const LlmRepository = new RepositoryProvider().llm;
  const id = data.id;
  if (!id) {
    return NextResponse.json({ ok: false });
  }

  const prompt = await PromptsRepository.findById(String(id));

  if (!prompt) {
    return NextResponse.json({ ok: false });
  }

  const updatePrompt = {
    ...prompt,
    content: data.prompt,
  };

  await PromptsRepository.update(updatePrompt);
  return NextResponse.json({ ok: true });
}

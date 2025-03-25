import { RepositoryProvider } from "@/app/adapter/repositories/provider";
import { PromptInput } from "@/app/domain/repositories/prompts";
import { Params } from "next/dist/server/request/params";
import { NextResponse } from "next/server";
import { v4 } from "uuid";

const PromptsRepository = new RepositoryProvider().prompts;

export type PromptRequest = {
  title: string;
  markdown: string;
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
  return NextResponse.json({ prompt });
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

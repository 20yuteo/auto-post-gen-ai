import { RepositoryProvider } from "@/app/adapter/repositories/provider";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const LLMRepository = new RepositoryProvider().llm;
  const res = await LLMRepository.generateContent(data.prompt);
  return NextResponse.json({ ok: true, content: res });
}

import { RepositoryProvider } from "@/app/adapter/repositories/provider";
import { PromptInput } from "@/app/domain/repositories/prompts";
import { NextResponse } from "next/server";
import { v4 } from "uuid";

const PromptsRepository = new RepositoryProvider().prompts;
const SchedulesRepository = new RepositoryProvider().schedules;

export type PromptRequest = {
  id?: number;
  prompt: string;
  schedules: {
    label: string;
    value: string;
  }[];
};

export async function GET() {
  const prompts = await PromptsRepository.findAll();

  if (prompts.length === 0) {
    return NextResponse.json({ prompts: [] });
  }

  const schedules = await Promise.all(
    prompts.map(async (prompt) => {
      if (!prompt.id) {
        return {
          label: "",
          value: "",
        };
      }

      const schadules = await SchedulesRepository.findByPromptId(prompt.id);

      return schadules.map((s) => ({
        label: s.scheduledDate,
        value: s.id,
      }));
    })
  );

  const response = {
    ...prompts.map((prompt, index) => ({
      id: prompt.id,
      content: prompt.content,
      schedules: schedules[index],
    })),
  };

  return NextResponse.json({ prompts: response });
}

export async function POST(req: Request) {
  const data: PromptRequest = await req.json();
  const PromptsRepository = new RepositoryProvider().prompts;
  const userId = v4();
  const input: PromptInput = {
    userId,
    content: data.prompt,
  };
  const result = await PromptsRepository.create(input);

  const schedules = data.schedules.map((schedule) => ({
    promptId: result.id!,
    scheduledDate: schedule.value,
  }));

  schedules.map((schedule) => SchedulesRepository.create(schedule));

  return NextResponse.json({ ok: true });
}

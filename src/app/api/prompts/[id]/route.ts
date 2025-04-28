import { RepositoryProvider } from "@/app/adapter/repositories/provider";
import { NextResponse } from "next/server";

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

  const schedules = await SchedulesRepository.findByPromptId(id as string);

  return NextResponse.json({
    prompt,
    schedules: schedules.map((schedule) => ({
      label: schedule.scheduledDate,
      value: schedule.scheduledDate,
    })),
  });
}

export async function PUT(req: Request) {
  const data: PromptRequest = await req.json();
  const PromptsRepository = new RepositoryProvider().prompts;

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

  const schadules = await SchedulesRepository.findByPromptId(String(id));

  const scheduleIds = schadules.map((s) => s.id as string);

  await SchedulesRepository.deleteAll(scheduleIds);

  data.schedules.map(async (schadule) => {
    const input = {
      promptId: String(id),
      scheduledDate: schadule.value,
    };

    await SchedulesRepository.create(input);
  });

  return NextResponse.json({ ok: true });
}

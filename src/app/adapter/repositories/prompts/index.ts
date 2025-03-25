import { dbClient } from "@/app/configs";
import {
  PromptsRepository,
  PromptInput,
} from "@/app/domain/repositories/prompts";
import { prompts } from "@/schema/prompts";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export class PromptsRepositoryImple implements PromptsRepository {
  create(input: PromptInput): Promise<void> {
    dbClient
      .insert(prompts)
      .values({
        ...input,
      })
      .execute();
    return Promise.resolve();
  }

  async findAll(): Promise<PromptInput[]> {
    const res = await dbClient.select().from(prompts).execute();
    return res.map((item) => ({ ...item, userId: item.userId || "" }));
  }

  async findById(id: string): Promise<PromptInput> {
    const res = await dbClient
      .select()
      .from(prompts)
      .where(eq(prompts.id, id))
      .execute();

    if (!res[0]) {
      throw new NextResponse("not found");
    }

    const prompt: PromptInput = {
      id: res[0].id,
      title: res[0].title,
      content: res[0].content,
      userId: res[0].userId || "",
    };
    return prompt;
  }

  async update(input: PromptInput): Promise<void> {
    if (!input.id) {
      throw new Error("id is required");
    }

    await dbClient
      .update(prompts)
      .set({
        content: input.content,
      })
      .where(eq(prompts.id, input.id))
      .execute();
  }
}

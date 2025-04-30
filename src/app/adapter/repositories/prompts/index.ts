import { dbClient } from "@/app/configs";
import {
  PromptsRepository,
  PromptInput,
} from "@/app/domain/repositories/prompts";
import { prompts } from "@/schema/prompts";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { users } from "@/schema/users";

export class PromptsRepositoryImple implements PromptsRepository {
  async create(input: PromptInput): Promise<PromptInput> {
    const res = await dbClient
      .insert(prompts)
      .values({
        ...input,
      })
      .returning();

    return Promise.resolve({
      id: res[0].id,
      content: res[0].content,
      userId: res[0].userId || "",
    });
  }

  async findAll(): Promise<PromptInput[]> {
    const { userId } = await auth();

    if (!userId) {
      return [];
    }

    const res = await dbClient
      .select()
      .from(prompts)
      .innerJoin(users, eq(users.id, prompts.userId))
      .where(and(eq(users.extId, userId), eq(prompts.userId, users.id)))
      .execute();

    return res.map((item) => ({
      ...item.prompts,
      userId: item.users.id || "",
    }));
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
      content: res[0].content,
      userId: res[0].userId || "",
    };
    return prompt;
  }

  async findByUserId(userId: string): Promise<PromptInput[]> {
    const res = await dbClient
      .select()
      .from(prompts)
      .where(eq(prompts.userId, userId))
      .execute();
    return res.map((item) => ({ ...item, userId: item.userId || "" }));
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

import { dbClient } from "@/app/configs";
import {
  ScheduleInput,
  SchedulesRepository,
} from "@/app/domain/repositories/schedules";
import { schadules } from "@/schema/schadules";
import { eq, inArray, and, isNull, is } from "drizzle-orm";

export class SchedulesRepositoryImple implements SchedulesRepository {
  async create(input: ScheduleInput): Promise<void> {
    await dbClient
      .insert(schadules)
      .values({
        ...input,
      })
      .execute();
    return Promise.resolve();
  }

  async findByPromptId(promptId: string): Promise<ScheduleInput[]> {
    const res = await dbClient
      .select()
      .from(schadules)
      .where(and(eq(schadules.promptId, promptId), isNull(schadules.deletedAt)))
      .execute();

    if (res.length === 0) {
      return [];
    }

    const mapped = res.map((res) => ({
      id: res.id,
      promptId: res.promptId,
      scheduledDate: res.scheduledDate,
    }));

    return mapped;
  }

  async update(input: ScheduleInput): Promise<void> {
    if (!input.id) {
      return Promise.reject(new Error("id is required"));
    }

    await dbClient
      .update(schadules)
      .set({
        ...input,
      })
      .where(eq(schadules.id, input.id))
      .execute();
    return Promise.resolve();
  }

  async deleteAll(scheduleIds: string[]): Promise<ScheduleInput[]> {
    return await dbClient
      .update(schadules)
      .set({
        deletedAt: new Date(),
      })
      .where(inArray(schadules.id, scheduleIds))
      .returning();
  }
}

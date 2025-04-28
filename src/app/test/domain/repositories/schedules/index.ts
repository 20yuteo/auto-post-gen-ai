import {
  ScheduleInput,
  SchedulesRepository,
} from "@/app/domain/repositories/schedules";

export class SchedulesRepositoryEmpty implements SchedulesRepository {
  create(input: ScheduleInput): Promise<void> {
    return Promise.resolve();
  }

  findByPromptId(promptId: string): Promise<ScheduleInput[]> {
    return Promise.resolve([]);
  }

  update(input: ScheduleInput): Promise<void> {
    return Promise.resolve();
  }

  deleteAll(promptIds: string[]): Promise<ScheduleInput[]> {
    return Promise.resolve([]);
  }
}

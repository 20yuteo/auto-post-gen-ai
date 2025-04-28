export type ScheduleInput = {
  id?: string;
  promptId: string;
  scheduledDate: string;
};

export interface SchedulesRepository {
  create: (input: ScheduleInput) => Promise<void>;

  findByPromptId: (promptId: string) => Promise<ScheduleInput[]>;

  update: (input: ScheduleInput) => Promise<void>;

  deleteAll: (promptIds: string[]) => Promise<ScheduleInput[]>;
}

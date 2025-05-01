export type PromptInput = {
  id?: string;
  userId: string;
  content: string;
};

export interface PromptsRepository {
  create: (input: PromptInput) => Promise<PromptInput>;

  findAll: (userId: string) => Promise<PromptInput[]>;

  findById: (id: string, userId: string) => Promise<PromptInput | undefined>;

  findByUserId: (userId: string) => Promise<PromptInput[]>;

  update: (input: PromptInput) => Promise<void>;
}

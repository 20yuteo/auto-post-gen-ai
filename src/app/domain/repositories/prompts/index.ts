export type PromptInput = {
  id?: string;
  userId: string;
  content: string;
};

export interface PromptsRepository {
  create: (input: PromptInput) => Promise<PromptInput>;

  findAll: () => Promise<PromptInput[]>;

  findById: (id: string) => Promise<PromptInput | undefined>;

  findByUserId: (userId: string) => Promise<PromptInput[]>;

  update: (input: PromptInput) => Promise<void>;
}

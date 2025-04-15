export type PromptInput = {
  id?: string;
  userId: string;
  title: string;
  content: string;
};

export interface PromptsRepository {
  create: (input: PromptInput) => Promise<void>;

  findAll: () => Promise<PromptInput[]>;

  findById: (id: string) => Promise<PromptInput | undefined>;

  findByUserId: (userId: string) => Promise<PromptInput[]>;

  update: (input: PromptInput) => Promise<void>;
}

export type PromptType = {
  id?: string;
  userId: string;
  content: string;
};

export interface PromptsRepository {
  create: (input: PromptType) => Promise<void>;
}

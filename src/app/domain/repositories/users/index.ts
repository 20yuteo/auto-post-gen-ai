export type User = {
  id?: string;
  extId: string;
  name: string;
  email: string;
};

export interface UserRepository {
  findAll: () => Promise<User[]>;

  findByExtId: (extId: string) => Promise<User | undefined>;

  getUser: (userId: string) => Promise<User>;

  create: (user: User) => Promise<User>;
}

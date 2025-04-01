export type User = {
  id: string;
  extId: string;
  name: string;
  email: string;
  accessToken: string;
};

export interface UserRepository {
  findByExtId: (extId: string) => Promise<User>;

  getUser: (userId: string) => Promise<User>;

  create: (user: User) => Promise<User>;
}

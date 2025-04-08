import { UserRepository } from "@/app/domain/repositories/users";
import { User } from "@/app/domain/repositories/users";

export class UserRepositoryEmpty implements UserRepository {
  async findAll(): Promise<User[]> {
    return Promise.resolve([
      {
        id: "1",
        extId: "1",
        name: "test",
        email: "test@example.com",
        accessToken: "test",
      },
    ]);
  }

  async findByExtId(extId: string): Promise<User> {
    return Promise.resolve({
      id: "1",
      extId: "1",
      name: "test",
      email: "test@example.com",
      accessToken: "test",
    });
  }

  async getUser(userId: string): Promise<User> {
    return Promise.resolve({
      id: "1",
      extId: "1",
      name: "test",
      email: "test@example.com",
      accessToken: "test",
    });
  }

  async create(user: User): Promise<User> {
    return Promise.resolve({
      id: "1",
      extId: "1",
      name: "test",
      email: "test@example.com",
      accessToken: "test",
    });
  }
}

import { dbClient } from "@/app/configs/db";
import { User, UserRepository } from "@/app/domain/repositories/users";
import { users } from "@/schema/users";
import { eq } from "drizzle-orm";

export class userRepositoryImple implements UserRepository {
  async findAll(): Promise<User[]> {
    const userList = await dbClient.select().from(users).execute();
    return userList.map((user) => ({
      id: user.id,
      extId: user.extId,
      name: user.name || "",
      email: user.email || "",
    }));
  }

  async findByExtId(extId: string): Promise<User | undefined> {
    const res = await dbClient
      .select()
      .from(users)
      .where(eq(users.extId, extId))
      .execute();
    if (res.length === 0) {
      return undefined;
    }
    const user: User = {
      id: res[0].id,
      extId: res[0].extId,
      name: res[0].name || "",
      email: res[0].email || "",
    };
    return user;
  }

  async getUser(id: string): Promise<User> {
    const res = await dbClient
      .select()
      .from(users)
      .where(eq(users.id, id))
      .execute();
    const user: User = {
      id: res[0].id,
      extId: res[0].extId,
      name: res[0].name || "",
      email: res[0].email || "",
    };

    return user;
  }

  async create(user: User): Promise<User> {
    const res = await dbClient
      .insert(users)
      .values({
        extId: user.extId,
        name: user.name,
        email: user.email,
      })
      .returning()
      .execute();
    const createdUser: User = {
      id: res[0].id,
      extId: res[0].extId,
      name: res[0].name || "",
      email: res[0].email || "",
    };

    return createdUser;
  }
}

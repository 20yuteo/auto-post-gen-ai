import { NextResponse } from "next/server";
import { getOAuthToken } from "@/utils/getOAuthToken";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { RepositoryProvider } from "@/app/adapter/repositories/provider";
import { User } from "@/app/domain/repositories/users";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const userRepository = new RepositoryProvider().users;

  if (userId) {
    const extIdUser = await userRepository.findByExtId(userId);
    const res = await clerkClient.users.getUserOauthAccessToken(userId, "x");
    if (res.data.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const accessToken = res.data[0].token;

    if (extIdUser) {
      return NextResponse.json({ token: accessToken });
    }

    const target = await clerkClient.users.getUser(userId);

    const user: User = {
      id: target.id,
      extId: userId,
      name: target.fullName || "",
      email: (target.emailAddresses[0] || {}).emailAddress || "",
    };
    await userRepository.create(user);
  }

  if (!userId) {
    return NextResponse.json({ error: "extId is missing" }, { status: 400 });
  }

  const token = await getOAuthToken(userId);
  return NextResponse.json({ token });
}

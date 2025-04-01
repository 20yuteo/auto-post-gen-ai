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

    if (extIdUser) {
      return NextResponse.json({ token: extIdUser.accessToken });
    }

    const target = await clerkClient.users.getUser(userId);
    const res = await clerkClient.users.getUserOauthAccessToken(userId, "x");
    const accessToken = res.data[0].token;

    const user: User = {
      id: target.id,
      extId: userId,
      name: target.fullName || "",
      email: (target.emailAddresses[0] || {}).emailAddress || "",
      accessToken,
    };
    await userRepository.create(user);
  }

  if (!userId) {
    return NextResponse.json({ error: "extId is missing" }, { status: 400 });
  }

  const token = await getOAuthToken(userId);
  return NextResponse.json({ token });
}

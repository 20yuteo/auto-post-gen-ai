import { NextResponse } from "next/server";
import { getOAuthToken } from "@/utils/getOAuthToken";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const token = await getOAuthToken(userId);
  return NextResponse.json({ token });
}

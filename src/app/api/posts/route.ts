import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getPostsOf } from "@/service/posts";
import { getUserByUsername } from "@/service/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const exercise = req.nextUrl.searchParams.get("exercise") || "all";

  if (!user) {
    return redirect("/auth/signin");
  }

  return getPostsOf(user.username, exercise).then((data) => NextResponse.json(data));
}
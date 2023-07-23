import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getPostsOf } from "@/service/posts";
import { getUserByUsername } from "@/service/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

//req: NextRequest
export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return redirect("/auth/signin");
    // return NextResponse.json({ error: "Not logged in" });
  }

  return getPostsOf(user.username).then((data) => NextResponse.json(data));
}
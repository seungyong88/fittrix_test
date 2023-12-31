import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { createPost, getPostsOf } from "@/service/posts";
import { getUserByUsername } from "@/service/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ error: "Not logged in" });
  }

  const form = await req.formData();
  const text = form.get("text") as string;
  const images = form.getAll("images") as Blob[];
  const exercise = form.get("exercise") as string;
  
  return createPost(user.username, text, exercise, images).then((data) => NextResponse.json(data));
}
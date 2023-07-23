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
  
  console.log("@@@@@@@@@", text, images[0], images);

  if(!text && !images.length) {
    return NextResponse.json({ error: "No content" });
  }

  return createPost(user.username, text, images).then((data) => NextResponse.json(data));
}
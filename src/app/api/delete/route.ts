import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { deletePost } from "@/service/posts";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return redirect("/auth/signin");
  }

  const { id } = await req.json();

  console.log(id);

  return deletePost(id).then((data) => NextResponse.json(data));
}
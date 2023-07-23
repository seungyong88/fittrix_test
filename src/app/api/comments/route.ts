import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { addComment } from "@/service/posts";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ error: "Not logged in" });
  }

  const { id, comment } = await req.json();

  if(!id || comment == undefined) {
    return NextResponse.json({ error: "Bad Request" });
  }
  
  return addComment(id, user.username, comment)
  .then((data) => NextResponse.json(data))
  .catch((err) => NextResponse.json(err));
}
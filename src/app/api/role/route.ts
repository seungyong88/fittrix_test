import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { setRole } from "@/service/user";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const url = req.nextUrl.clone();
  const user = session?.user;
  
  if(!user) {
    return NextResponse.json(url)
  }

  const role = req.nextUrl.searchParams.get("role");

  if(!role) {
    return NextResponse.json(url)
  }

  const res = await setRole(user, role);
  return NextResponse.json(res)
}
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { setRole } from "@/service/user";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log("ssdasdsad", session);
  const url = req.nextUrl.clone();
  const user = session?.user;
  
  if(!user) {
    return NextResponse.json(url)
  }

  const role = req.nextUrl.searchParams.get("role");
  console.log("check role", role);

  if(!role) {
    return NextResponse.json(url)
  }

  const res = await setRole(user, role);
  console.log(res);
  return NextResponse.json(res)
  // .then((data) =>{
  //   console.log("aslikdjlaskjdas", data)
  //   return NextResponse.json(data)
  // } 
}
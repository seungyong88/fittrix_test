import { getServerSession } from "next-auth";
import NewPost from "../components/NewPost";
import { useSession } from "next-auth/react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function NewPage() {
  const session = await getServerSession(authOptions);

  if(!session) {
    return <div>loading...</div>
  }

  return <NewPost user={session.user} />;
}

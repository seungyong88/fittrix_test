import { addUser } from "@/service/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "Credentials",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any) {
        const username = credentials!.username;
        const password = credentials!.password;

        const user = await addUser({ username, password });

        if (user) {
          return user;
        }

        throw new Error("아이디 혹은 패스워드가 틀립니다.");
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
  },
  callbacks: {
    // async signIn(user: any) {
    //   return true;
    // },
    async jwt(props) {
      if (props.trigger === "update") {
        return {
          ...props.token,
          userType: props.session.userType,
        };
      }

      return {
        ...props.token,
        ...props.user,
      };
    },
    async session({ session, token }: any) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token;
      // session.user.username = token.username;
      session.user.userType = token.userType;
      // session.user.avatar = token.image.asset._ref;
      return session;
    },
  },
};

export default NextAuth(authOptions);

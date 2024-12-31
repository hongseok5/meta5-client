import NextAuth, { User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
//import CredentialsProvider from "next-auth/providers/credentials";
//import bcrypt from "bcrypt";
/*
const dbConfig = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_SCHEMA,
};
*/

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // Google OAuth 클라이언트 ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // Google OAuth 클라이언트 Secret
    })
  ],
  callbacks: {
    async signIn({ user}: {user:User}) {
      // 필요한 경우 사용자 데이터를 확인하거나 저장하는 로직 추가
      console.log("callbacks signIn")
      console.log("user!")
      console.log(user)
      return true; // true일 경우 로그인이 성공
    },
    async session({ session, token }: { session: any; token: any }) {
      // 세션에 사용자 정보를 추가'
      console.log("callbacks session")
      console.log(session)
      console.log("token!")
      console.log(token)
      session.user.id = token.sub;
      return session;
    },
  },
  session : {
    jwt: true, 
    maxAge: 1 * 2 * 60 * 60, // 2시간
    updateAge: 60 * 60
  },
  pages : {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: undefined
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);

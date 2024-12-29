import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID, // Google OAuth 클라이언트 ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google OAuth 클라이언트 Secret
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // 필요한 경우 사용자 데이터를 확인하거나 저장하는 로직 추가
      console.log("callbacks signIn")
      console.log("user!")
      console.log(user)
      console.log("account!")
      console.log( account)
      console.log("profile!")
      console.log(profile)
      return true; // true일 경우 로그인이 성공
    },
    async session({ session, user, token }) {
      // 세션에 사용자 정보를 추가'
      console.log("callbacks session")
      console.log(session)
      console.log("user!")
      console.log(user)
      console.log("token!")
      console.log(token)
      session.user.id = token.sub;

      return session;
    },
  },
  session : {
    //jwt: true
    strategy: "jwt",
    maxAge: 1 * 2 * 60 * 60, // 2시간
    updateAge: 60 * 60
  }
};

export default NextAuth(authOptions);

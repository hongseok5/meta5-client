import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const dbConfig = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_SCHEMA,
};


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID, // Google OAuth 클라이언트 ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google OAuth 클라이언트 Secret
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};

        // DB 연결 및 사용자 정보 조회
        const connection = await createConnection(dbConfig);
        const [rows] = await connection.execute(
          "SELECT * FROM users WHERE email = ?",
          [email]
        );
        await connection.end();

        if (!rows || rows.length === 0) {
          throw new Error("No user found with the provided email");
        }

        const user = rows[0];

        // 비밀번호 검증
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // 사용자 정보 반환
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
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
  },
  pages : {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: null
  },
};

export default NextAuth(authOptions);

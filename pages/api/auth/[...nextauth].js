import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
 
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      synchronize: false,
    }),
    
  ],
  pages:{
      signIn: "/auth/signin",
  },
  callbacks: {
      async session ({ session, token, user }) {
          session.user.username = session.user.name.split(" ").join("").toLocaleLowerCase();

          session.user.uid = token.sub;
          return session;
      }
  }
})
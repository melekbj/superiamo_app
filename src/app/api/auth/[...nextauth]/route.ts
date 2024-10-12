import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import type { Session, User } from "next-auth";
import prisma from "@/lib/prisma"; // Import the singleton Prisma client

// Extend the User type to include your custom fields
interface CustomUser extends User {
  firstName?: string | null;
  lastName?: string | null;
  dateOfBirth?: string | null;
  address?: string | null;
  phoneNumber?: string | null;
}

// Extend the Session type to include the custom user
interface CustomSession extends Session {
  user: CustomUser;
}

// Define the auth options
const authOptions = {
  adapter: PrismaAdapter(prisma), // Use the singleton Prisma client
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: CustomSession; user: CustomUser }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.firstName = user.firstName || null;
        session.user.lastName = user.lastName || null;
        session.user.dateOfBirth = user.dateOfBirth || null;
        session.user.address = user.address || null;
        session.user.phoneNumber = user.phoneNumber || null;
      }
      return session;
    },
  },
};

// Export the NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

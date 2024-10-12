// src/types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    dateOfBirth?: string | null;
    address?: string | null;
    phoneNumber?: string | null;
  }

  interface Session {
    user: User;
  }
}
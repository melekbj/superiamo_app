'use client';  // Add this line at the top

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button className="text-black" onClick={() => signOut()}>Sign out</button>
    );
  }
  return (
    <button className="text-black" onClick={() => signIn()}>Sign in</button>
  );
}
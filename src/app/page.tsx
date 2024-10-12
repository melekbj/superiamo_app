import Link from 'next/link';
import { getServerSession } from "next-auth/next";
// import { authOptions } from "./api/auth/[...nextauth]/route";
import { authOptions } from "../lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="text-center text-black">
      <h1 className="text-4xl font-bold mb-4">Welcome to My OAuth App</h1>
      {session ? (
        <div>
          <p className="mb-4">Hello, {session.user?.firstName} {session.user?.lastName}!</p>
          <Link href="/profile" className="text-blue-500 hover:text-blue-600">
            View and Edit Your Profile
          </Link>
        </div>
      ) : (
        <p>Please sign in to access your profile.</p>
      )}
    </div>
  );
}
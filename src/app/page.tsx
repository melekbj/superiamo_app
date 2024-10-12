import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to Our Application</h1>
        {session ? (
          <div className="space-y-4">
            <p className="text-lg text-gray-600">Logged in as <span className="font-semibold">{session.user?.email}</span></p>
            <Link href="/profile" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              View Profile
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg text-gray-600">You are not logged in</p>
            <Link href="/api/auth/signin" className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
              Log In
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
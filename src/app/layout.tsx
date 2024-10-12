import './globals.css';
import { Inter } from 'next/font/google';
import { getServerSession } from "next-auth";
import { authOptions } from '@/lib/auth';
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider from next-auth
import AuthButton from "@/components/AuthButton";
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch the session using getServerSession and authOptions
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Pass the session to the SessionProvider */}
        <SessionProvider session={session}>
          <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
              <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="text-lg text-black font-semibold">Home</Link>
                <div className="space-x-4">
                  <Link href="/profile" className="text-blue-500 hover:text-blue-600">Profile</Link>
                  <AuthButton />
                </div>
              </nav>
            </header>
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/ProfileForm";
import { authOptions } from "../../lib/auth";  // Move authOptions to a shared location

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-black font-bold mb-4">User Profile</h1>
      <ProfileForm user={session.user} />
    </div>
  );
}

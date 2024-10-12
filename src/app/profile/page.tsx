import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import ProfileForm from "./ProfileForm";

const prisma = new PrismaClient();

// Définir le type de l'utilisateur basé sur le schéma Prisma
type PrismaUser = {
  id: string;
  email: string;
  name: string | null;
  password: string | null;
  firstName: string | null;
  lastName: string | null;
  birthDate: Date | null;
  address: string | null;
  phone: string | null;
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
  });

  if (!user) {
    // Gérer le cas où l'utilisateur n'est pas trouvé
    return <div>User not found</div>;
  }

  // Adapter l'objet utilisateur pour correspondre à la structure attendue par ProfileForm
  const adaptedUser = {
    ...user,
    dateOfBirth: user.birthDate ? user.birthDate.toISOString().split('T')[0] : null,
    phoneNumber: user.phone,
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <ProfileForm user={adaptedUser} />
        </div>
      </div>
    </div>
  );
}
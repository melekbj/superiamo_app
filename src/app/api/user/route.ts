import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { PrismaClient } from '@prisma/client';
import { authOptions } from "../../../lib/auth";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const data = await request.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email! },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        address: data.address,
        phoneNumber: data.phoneNumber,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

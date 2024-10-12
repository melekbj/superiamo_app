import { PrismaClient } from "@prisma/client";

// Declare PrismaClient as a global variable to persist across serverless function invocations
let prisma: PrismaClient;

declare global {
  var prisma: PrismaClient | undefined;
}

// Use the global object to avoid recreating the PrismaClient in each function call in a serverless environment
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;

import { PrismaClient } from "@prisma/client";
import { dev } from "$app/environment";

const prisma = globalThis.prisma || new PrismaClient()

if (dev) {
    globalThis.prisma = prisma;
}

export { prisma }
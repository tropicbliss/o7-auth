import lucia from "lucia-auth"
import prismaAdapter from "@lucia-auth/adapter-prisma"
import { dev } from "$app/environment"
import { prisma } from "$lib/server/prisma"

export const auth = lucia({
    adapter: prismaAdapter(prisma),
    env: dev ? "DEV" : "PROD",
    transformUserData: (userData) => {
        return {
            avatar: userData.avatar,
            discriminator: userData.discriminator,
            id: userData.id,
            public_flags: userData.public_flags,
            username: userData.username,
        }
    }
})

export type Auth = typeof auth
import lucia from "lucia-auth"
import prismaAdapter from "@lucia-auth/adapter-prisma"
import { dev } from "$app/environment"
import { prisma } from "$lib/server/prisma"
import { sveltekit } from "lucia-auth/middleware"
import "lucia-auth/polyfill/node"

export const auth = lucia({
    adapter: prismaAdapter(prisma),
    env: dev ? "DEV" : "PROD",
    transformDatabaseUser: (userData) => {
        return { ...userData }
    },
    middleware: sveltekit(),
})

export type Auth = typeof auth
import { auth } from "$lib/server/lucia"
import { fail, redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"
import { z } from "zod"

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.validate()
    if (session) {
        throw redirect(302, "/")
    }
}

const userSchema = z.object({
    name: z.string().min(1).max(64).trim(),
    username: z.string().min(1).max(64).email(),
    password: z.string().min(6).trim()
})

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData())
        try {
            const res = userSchema.parse(formData);
            await auth.createUser({
                primaryKey: {
                    providerId: "username", // or discord if you so choose
                    providerUserId: res.username, // or email if you so choose
                    password: res.password
                },
                attributes: {
                    name: res.name,
                    username: res.username
                }
            })
        } catch (err) {
            console.error(err)
            return fail(400, { message: "could not register user" })
        }
        throw redirect(302, "/login")
    }
}
import { fail, redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"
import { z } from "zod"
import { auth } from "$lib/server/lucia"

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.validate()
    if (session) {
        throw redirect(302, "/")
    }
}

const userSchema = z.object({
    username: z.string().trim(),
    password: z.string().trim()
})

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const formData = Object.fromEntries(await request.formData())
        try {
            const res = userSchema.parse(formData);
            const key = await auth.useKey("username", res.username, res.password)
            const session = await auth.createSession(key.userId)
            locals.setSession(session)
        } catch (err) {
            console.error(err)
            return fail(400, { "message": "could not login user" })
        }
        throw redirect(302, "/")
    }
}
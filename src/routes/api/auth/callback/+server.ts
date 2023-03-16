import { discordAuth } from "$lib/server/oauth"
import type { RequestHandler } from "./$types"
import { redirect, fail } from "@sveltejs/kit"
import { auth } from "$lib/server/lucia";

export const GET: RequestHandler = async ({ request, cookies, locals }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get("code")
    const state = url.searchParams.get("state")
    const storedState = cookies.get("state")
    if (state !== storedState || code === null) {
        throw fail(400, { "message": "could not login user" })
    }
    const { existingUser, providerUser, createUser } = await discordAuth.validateCallback(code)
    const getUser = async () => {
        if (existingUser) {
            throw redirect(302, "/")
        }
        return await createUser({ ...providerUser });
    }
    const user = await getUser();
    const session = await auth.createSession(user.userId)
    locals.setSession(session)
    throw redirect(302, "/")
}
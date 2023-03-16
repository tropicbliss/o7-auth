import { discordAuth } from "$lib/server/oauth"
import type { RequestHandler } from "./$types"
import { redirect } from "@sveltejs/kit"

export const GET: RequestHandler = async ({ cookies }) => {
    const [url, state] = await discordAuth.getAuthorizationUrl();
    cookies.set("state", state, {
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60
    });
    throw redirect(302, url.toString())
}
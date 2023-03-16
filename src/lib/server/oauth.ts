import { discord } from "@lucia-auth/oauth/providers"
import { auth } from "./lucia"
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, OAUTH_REDIRECT_URI } from "$env/static/private"

export const discordAuth = discord(auth, {
    clientId: DISCORD_CLIENT_ID,
    clientSecret: DISCORD_CLIENT_SECRET,
    redirectUri: OAUTH_REDIRECT_URI
})
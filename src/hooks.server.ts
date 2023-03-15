import { handleHooks } from "@lucia-auth/sveltekit"
import { auth } from "$lib/server/lucia"
import type { Handle } from "@sveltejs/kit"
import { sequence } from "@sveltejs/kit/hooks"


export const handle: Handle = sequence(handleHooks(auth))
import type { inferAsyncReturnType } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { prisma } from '$lib/server/prisma';
import type { RequestEvent } from '@sveltejs/kit';
import { auth } from './lucia';

export async function createContext(event: RequestEvent) {
	async function getSession() {
		const authSession = event.cookies.get("auth_session")
		if (authSession === undefined) {
			return undefined;
		}
		try {
			return await auth.getSessionUser(authSession);
		} catch (err) {
			return undefined;
		}
	}
	const session = await getSession();
	return (_opts: FetchCreateContextFnOptions) => {
		return {
			prisma,
			session
		};
	};
}

export type Context = inferAsyncReturnType<
	inferAsyncReturnType<typeof createContext>
>;

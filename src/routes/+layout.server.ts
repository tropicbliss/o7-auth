import { trpc } from '$lib/trpc';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const { locals } = event;
	const { user } = await locals.validateUser()
	return {
		trpc: trpc.ssr(event),
		user
	};
};

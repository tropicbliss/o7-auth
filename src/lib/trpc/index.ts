import { createTRPCSvelte, httpBatchLink } from 'trpc-svelte-query';
import { ssrLink } from 'trpc-svelte-query/ssr';
import type { AppRouter } from '$lib/server/routes/_app';
import { transformer } from './transformer';

export const trpc = createTRPCSvelte<AppRouter>({
	links: [
		ssrLink(httpBatchLink)({
			url: '/api/trpc',
		}),
	],
	transformer,
});

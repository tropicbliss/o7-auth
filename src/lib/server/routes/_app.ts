import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const appRouter = router({
	greeting: publicProcedure
		.input(
			z.object({
				name: z.string().optional(),
			})
		)
		.query(({ input, ctx }) => {
			return `Hello, ${input.name ?? 'world'}!`;
		}),
});

export type AppRouter = typeof appRouter;

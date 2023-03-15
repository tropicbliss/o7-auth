import { initTRPC, TRPCError } from '@trpc/server';
import type { Context } from './context';
import { transformer } from '$lib/trpc/transformer';

const t = initTRPC.context<Context>().create({
	transformer,
	// errorFormatter: (shape) => ({ ...shape }),
});

const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
	if (ctx.session === undefined) {
		throw new TRPCError({
			code: "UNAUTHORIZED"
		})
	}
	return next({
		ctx: {
			session: ctx.session
		}
	})
})

export const router = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
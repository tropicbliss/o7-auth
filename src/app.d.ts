/// <reference types="@sveltejs/kit" />

import type { PrismaClient } from "@prisma/client";

declare global {
	var prisma: PrismaClient;

	/// <reference types="lucia-auth" />
	declare namespace Lucia {
		type Auth = import("$lib/server/lucia").Auth
		type UserAttributes = import("@prisma/client").User
	}

	declare namespace App {
		// interface Platform {}
		type AuthRequest = import("lucia-auth").AuthRequest

		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface Locals extends AuthRequest { }
		// interface Error {}
		// interface Session {}
		// interface Stuff {}
	}
}

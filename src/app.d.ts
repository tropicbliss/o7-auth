/// <reference types="@sveltejs/kit" />

import type { PrismaClient } from "@prisma/client";

declare global {
	var prisma: PrismaClient;

	/// <reference types="lucia-auth" />
	declare namespace Lucia {
		type Auth = import("$lib/server/lucia").Auth
		type UserAttributes = Omit<import("@prisma/client").User, "id">
	}

	declare namespace App {
		// interface Platform {}
		interface Locals {
			validate: import("@lucia-auth/sveltekit").Validate
			validateUser: import("@lucia-auth/sveltekit").ValidateUser
			setSession: import("@lucia-auth/sveltekit").SetSession
		}
		// interface Error {}
		// interface Session {}
		// interface Stuff {}
	}
}

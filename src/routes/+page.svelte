<script lang="ts">
	import { trpc } from '$lib/trpc';
	import type { PageData } from './$types';

	const res = trpc.greeting.query({ name: 'tRPC' });
	export let data: PageData;
</script>

<h1>{$res.data}</h1>
{#if !data.user}
	<h1>You are not logged in!</h1>
	<a href="/api/auth/login">Login</a>
{:else}
	<h1>You are now logged in!</h1>
	<h2>{`Welcome back ${data.user.username}!`}</h2>
{/if}

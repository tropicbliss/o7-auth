<script lang="ts">
	import { trpc } from '$lib/trpc';
	import type { PageData } from './$types';

	const res = trpc.greeting.query({ name: 'tRPC' });
	export let data: PageData;
</script>

<!-- <h1>{$res.data}</h1> -->
{#if !data.user}
	<h1>You are not logged in</h1>
{:else}
	<form method="post">
		<button formaction="/logout" type="submit">Logout</button>
	</form>
{/if}

<script>
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import Button from '$lib/client/components/base/Button.svelte';
	import Text from '$lib/client/components/base/Text.svelte';
	import InputField from '$lib/client/components/base/InputField.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex flex-col justify-center items-center gap-5">
	<div class="flex flex-col items-center">
		<Text variant="h1">This is a h1 Heading</Text>
		<Text variant="h2">This is a h2 Heading</Text>
		<Text variant="h3">This is a h3 Heading</Text>
		<Text>This is normal text</Text>
	</div>
	<div class="flex gap-2">
		<Button variant="primary">Primary</Button>
		<Button variant="secondary">Secondary</Button>
		<Button variant="danger">Danger</Button>
	</div>
	<InputField placeholder="This is a placeholder" />

	<hr class="w-full bg-slate-500" />

	<div class="flex flex-col gap-2">
		{#if $page.data.session}
			<Button on:click={signOut}>Sign out</Button>
			<pre class="bg-gray-800 bg-blend-normal text-white rounded-xl p-4">{JSON.stringify(
					$page.data.session,
					null,
					2
				)}</pre>
		{:else}
			<Button on:click={() => signIn()}>Sign in</Button>
		{/if}
	</div>
</section>

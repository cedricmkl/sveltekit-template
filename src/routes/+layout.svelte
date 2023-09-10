<script>
	import Text from '$lib/client/components/base/Text.svelte';
	import './styles.css';
</script>

<div class="flex flex-col min-h-screen p-2 bg-background-light dark:bg-background-dark">
	<main>
		<slot />
	</main>

	<footer class="mt-auto flex items-center justify-center">
		<Text>© {new Date().getFullYear()} your project</Text>
	</footer>
</div>

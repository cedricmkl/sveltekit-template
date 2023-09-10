<script lang="ts">
	export let variant: 'h1' | 'h2' | 'h3' | 'p' = 'p';
</script>

{#if variant === 'h1'}
	<h1 class="text-black dark:text-white text-2xl font-bold"><slot /></h1>
{:else if variant === 'h2'}
	<h2 class="text-black dark:text-white text-xl font-semibold"><slot /></h2>
{:else if variant === 'h3'}
	<h3 class="text-black dark:text-white text-lg font-semibold"><slot /></h3>
{:else if variant === 'p'}
	<p class="text-black dark:text-white text-base"><slot /></p>
{/if}

<script lang="ts">
	import { cn } from '$lib/client/utils/styles';
</script>

<input
	{...$$restProps}
	class={cn(
		'bg-transparent border border-gray-300 rounded-md py-2 px-4 dark:text-white',
		$$restProps.class
	)}
/>

<script lang="ts">
	import { cn } from '$lib/client/utils/styles';

	export let variant: 'primary' | 'secondary' | 'danger' = 'primary';
</script>

<button
	on:click
	class={cn(
		'text-white font-semibold py-2 px-4 rounded',
		{
			'bg-primary-200 hover:bg-primary-100': variant === 'primary',
			'bg-secondary-200 hover:bg-secondary-100': variant === 'secondary',
			'bg-danger-200 hover:bg-danger-100': variant === 'danger'
		},
		$$restProps.class
	)}
>
	<slot />
</button>

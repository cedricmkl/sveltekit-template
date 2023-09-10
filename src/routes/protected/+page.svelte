<script>
	import { page } from '$app/stores';
	import Text from '$lib/client/components/base/Text.svelte';
</script>

<Text>This is a protected route! HI {$page.data.session?.user?.name}</Text>

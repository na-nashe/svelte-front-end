<script lang="ts">
	let { value, big = false }: { value: number; big?: boolean } = $props();

	const color = $derived(
		value >= 70 ? 'text-green-600' : value >= 40 ? 'text-yellow-600' : 'text-red-600'
	);
</script>

<span class="font-mono font-bold {color} {big ? 'text-xl' : 'text-[13px]'}">{value}%</span>

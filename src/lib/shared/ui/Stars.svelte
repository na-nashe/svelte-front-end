<script lang="ts">
	let { rating }: { rating: number } = $props();
</script>

<span class="inline-flex items-center gap-px">
	{#each [1, 2, 3, 4, 5] as i (i)}
		<span
			class="text-[11px] transition-colors duration-200 {i <= Math.round(rating)
				? 'text-amber-400'
				: 'text-stone-200'}">★</span
		>
	{/each}
	<span class="ml-0.5 font-mono text-[11px] font-semibold text-stone-500">{rating}</span>
</span>

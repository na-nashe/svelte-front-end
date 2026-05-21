<script lang="ts">
	import { ITEMS } from '$lib/entities/product/data';
	import type { Category } from '$lib/entities/category';

	let {
		activeCat = $bindable<string | null>(null),
		categories = []
	}: {
		activeCat?: string | null;
		categories?: Category[];
	} = $props();

	let hovCat = $state<string | null>(null);

	function countForCat(title: string): number {
		return ITEMS.filter((it) => it.cat === title).length;
	}
</script>

<div class="flex flex-wrap gap-2 mt-6">
	<!-- All button -->
	<button
		onclick={() => (activeCat = null)}
		onmouseenter={() => (hovCat = 'all')}
		onmouseleave={() => (hovCat = null)}
		class="flex cursor-pointer items-center gap-2 rounded-[14px] px-[18px] py-2.5 pl-3 font-[Outfit] text-[13px] transition-all duration-[250ms]
			{!activeCat
			? 'border-[1.5px] border-stone-900 bg-stone-900 font-bold text-white'
			: 'border-[1.5px] border-stone-200 bg-white font-semibold text-stone-600'}
			animate-scale-in"
		style={hovCat === 'all' && activeCat ? 'transform: translateY(-1px)' : ''}
	>
		<span class="text-base">📦</span>Усі
		<span class="ml-0.5 font-[JetBrains_Mono] text-[10px] opacity-50">{ITEMS.length}</span>
	</button>

	{#each categories as c, i (c.id)}
		{@const count = countForCat(c.title)}
		{@const active = activeCat === c.title}
		{@const isHov = hovCat === c.title}
		{#if count > 0}
			<button
				onclick={() => (activeCat = active ? null : c.title)}
				onmouseenter={() => (hovCat = c.title)}
				onmouseleave={() => (hovCat = null)}
				class="flex cursor-pointer items-center gap-[7px] rounded-[14px] px-4 py-2.5 pl-[11px] font-[Outfit] text-[13px] transition-all duration-[250ms]
					{active
					? 'border-[1.5px] border-[#0057B730] bg-[#0057B70a] font-bold text-[#0057B7]'
					: 'border-[1.5px] border-stone-200 bg-white font-medium text-stone-600'}
					animate-scale-in"
				style="animation-delay: {(i + 1) * 0.03}s; {isHov && !active
					? 'transform: translateY(-1px)'
					: ''}"
			>
				<span
					class="text-base transition-transform duration-200"
					style={isHov ? 'transform: scale(1.2)' : ''}>{c.icon}</span
				>
				{c.title}
				<span
					class="rounded-[6px] px-1.5 py-px font-[JetBrains_Mono] text-[10px] font-semibold transition-all duration-200
						{active ? 'bg-[#0057B712] text-[#0057B7]' : 'bg-stone-100 text-stone-400'}"
				>
					{count}
				</span>
			</button>
		{/if}
	{/each}
</div>

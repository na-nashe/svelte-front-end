<script lang="ts">
	import type { Product } from '$lib/entities/product/data';
	import type { Category } from '$lib/entities/category';

	let {
		activeCat = $bindable<string | null>(null),
		categories = [],
		items = [] as Product[]
	}: {
		activeCat?: string | null;
		categories?: Category[];
		items?: Product[];
	} = $props();

	let hovCat = $state<string | null>(null);

	function allTitles(cat: Category): string[] {
		if (!cat.children?.length) return [cat.title];
		return [cat.title, ...cat.children.flatMap(allTitles)];
	}

	function countForCat(cat: Category): number {
		const titles = allTitles(cat);
		return items.filter((it) => titles.includes(it.cat)).length;
	}
</script>

<div class="mt-6 flex flex-wrap gap-2">
	<!-- All button -->

	<!-- {#each categories as c, i (c.id)}
		{@const count = countForCat(c)}
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
	{/each} -->
</div>

<script lang="ts">
	import { CATS, ITEMS } from '$lib/entities/product/data';

	let {
		sort = $bindable('popular'),
		viewMode = $bindable('list'),
		expandAll = $bindable(false),
		activeCat = null,
		totalItems = 0,
		totalAlts = 0
	}: {
		sort?: string;
		viewMode?: string;
		expandAll?: boolean;
		activeCat?: string | null;
		totalItems?: number;
		totalAlts?: number;
	} = $props();

	const activeCatObj = $derived(activeCat ? CATS.find((c) => c.slug === activeCat) : null);

	const sortOptions: [string, string][] = [
		['popular', 'Популярні'],
		['alts', 'К-сть альт.'],
		['alpha', 'А→Я']
	];

	const viewOptions: [string, string][] = [
		['list', '☰'],
		['grid', '▦']
	];
</script>

<div
	class="mb-5 flex animate-up flex-wrap items-center justify-between gap-2.5 rounded-[14px] border border-stone-200 bg-white px-4 py-2.5"
	style="animation-delay: 0.1s"
>
	<div class="flex items-center gap-2">
		{#if activeCatObj}
			<div
				class="inline-flex animate-scale-in items-center gap-[5px] rounded-full border border-[#0057B712] bg-[#0057B708] py-1 pr-2.5 pl-1.5"
			>
				<span class="text-sm">{activeCatObj.icon}</span>
				<span class="text-[11px] font-bold text-[#0057B7]">{activeCatObj.name}</span>
				<button
					onclick={() => (activeCat = null)}
					class="grid h-4 w-4 cursor-pointer place-items-center rounded-full border-none bg-[#0057B715] text-[9px] text-[#0057B7]"
				>
					✕
				</button>
			</div>
		{/if}
		<span class="text-xs text-stone-400">
			<strong class="font-[JetBrains_Mono] text-stone-900">{totalItems}</strong> продуктів ·
			<strong class="font-[JetBrains_Mono] text-stone-900">{totalAlts}</strong> альтернатив
		</span>
	</div>

	<div class="flex items-center gap-1.5">
		<!-- Sort buttons -->
		<div class="flex gap-px rounded-[10px] bg-stone-100 p-0.5">
			{#each sortOptions as [id, label] (id)}
				<button
					onclick={() => (sort = id)}
					class="cursor-pointer rounded-lg border-none px-2.5 py-[5px] font-[Outfit] text-[11px] transition-all duration-200
						{sort === id
						? 'bg-white font-bold text-stone-900 shadow-[0_1px_4px_#0000000a]'
						: 'bg-transparent font-medium text-stone-400'}"
				>
					{label}
				</button>
			{/each}
		</div>

		<!-- View mode toggle -->
		<div class="flex gap-px rounded-[10px] bg-stone-100 p-0.5">
			{#each viewOptions as [id, icon] (id)}
				<button
					onclick={() => (viewMode = id)}
					class="grid h-[26px] w-7 cursor-pointer place-items-center rounded-[7px] border-none text-[13px] transition-all duration-200
						{viewMode === id
						? 'bg-white text-stone-900 shadow-[0_1px_4px_#0000000a]'
						: 'bg-transparent text-stone-400'}"
				>
					{icon}
				</button>
			{/each}
		</div>

		<!-- Expand/collapse (list mode only) -->
		{#if viewMode === 'list'}
			<button
				onclick={() => (expandAll = !expandAll)}
				class="cursor-pointer rounded-lg border border-stone-200 px-2.5 py-[5px] font-[Outfit] text-[11px] font-semibold transition-all duration-200
					{expandAll ? 'bg-stone-900 text-white' : 'bg-white text-stone-500'}"
			>
				{expandAll ? 'Згорнути' : 'Розгорнути'}
			</button>
		{/if}
	</div>
</div>

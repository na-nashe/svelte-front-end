<script lang="ts">
	import { page } from '$app/stores';
	import { ITEMS, CATS, type Alternative } from '$lib/entities/product/data';
	import HeroCatalog from '$lib/widgets/catalog/HeroCatalog.svelte';
	import CatalogSidebar from '$lib/widgets/catalog/CatalogSidebar.svelte';
	import CategoryPills from '$lib/features/catalog-filter/CategoryPills.svelte';
	import SortControls from '$lib/features/catalog-filter/SortControls.svelte';
	import ItemBlock from '$lib/entities/product/ui/ItemBlock.svelte';
	import GridCard from '$lib/entities/product/ui/GridCard.svelte';

	let cat = $state<string | null>(null);
	let sort = $state('popular');
	let viewMode = $state('list');
	let expandAll = $state(false);

	const filtered = $derived(cat ? ITEMS.filter((it) => it.cat === cat) : ITEMS);
	const sorted = $derived(
		[...filtered].sort((a, b) => {
			if (sort === 'alts') return b.alts.length - a.alts.length;
			if (sort === 'alpha') return a.orig.localeCompare(b.orig);
			return 0;
		})
	);
	const totalAlts = $derived(sorted.reduce((s, it) => s + it.alts.length, 0));
	const activeCatObj = $derived(cat ? CATS.find((c) => c.slug === cat) : null);

	function handleAltClick(a: Alternative) {
		// Could open modal in layout via event dispatch
		console.log('Alt clicked:', a.name);
	}
</script>

<section class="mx-auto max-w-[1040px] px-6 pb-20">
	<HeroCatalog />

	<!-- Category pills -->
	<div class="mb-7">
		<CategoryPills bind:activeCat={cat} />
	</div>

	<!-- Toolbar -->
	<SortControls
		bind:sort
		bind:viewMode
		bind:expandAll
		activeCat={cat}
		totalItems={sorted.length}
		{totalAlts}
	/>

	<!-- Main area -->
	<div class="flex items-start gap-6">
		<!-- Sidebar (list mode only) -->
		{#if viewMode === 'list'}
			<CatalogSidebar bind:activeCat={cat} />
		{/if}

		<!-- Items -->
		<div class="flex-1" class:key={`${cat}-${sort}-${viewMode}`}>
			{#if sorted.length === 0}
				<!-- Empty state -->
				<div
					class="animate-scale-in rounded-[28px] border border-stone-200 bg-white p-[72px] text-center"
				>
					<div class="mb-4 animate-float text-5xl">📭</div>
					<h3 class="mb-2 text-xl font-extrabold">Тут поки порожньо</h3>
					<p class="mx-auto mb-5 max-w-[300px] text-sm text-stone-500">
						В цій категорії ще немає продуктів
					</p>
					<button
						onclick={() => (cat = null)}
						class="cursor-pointer rounded-xl border-[1.5px] border-stone-200 bg-white px-6 py-2.5 font-[Outfit] text-[13px] font-bold transition-colors hover:bg-stone-50"
						>Показати все</button
					>
				</div>
			{:else if viewMode === 'list'}
				<div class="flex flex-col gap-3">
					{#each sorted as it, i (it.orig)}
						<ItemBlock item={it} index={i} openDefault={expandAll} onAltClick={handleAltClick} />
					{/each}
				</div>
			{:else}
				<div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3.5">
					{#each sorted as it, i (it.orig)}
						<GridCard item={it} index={i} onAltClick={handleAltClick} />
					{/each}
				</div>
			{/if}

			{#if sorted.length > 0}
				<div class="animate-up pt-10 text-center" style="animation-delay: 0.3s">
					<p class="text-xs text-stone-400">
						Показано <strong class="text-stone-900">{sorted.length}</strong> продуктів з
						<strong class="text-stone-900">{totalAlts}</strong> альтернативами
						{#if cat && activeCatObj}
							<span> в <strong class="text-[#0057B7]">{activeCatObj.name}</strong></span>
						{/if}
					</p>
				</div>
			{/if}
		</div>
	</div>
</section>

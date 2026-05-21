<script lang="ts">
	import type { PageData } from './$types';
	import type { Product, Alternative } from '$lib/entities/product/data';
	import type { ApiProduct, ApiAlternative } from '$lib/entities/product/types';
	import HeroCatalog from '$lib/widgets/catalog/HeroCatalog.svelte';
	import CatalogSidebar from '$lib/widgets/catalog/CatalogSidebar.svelte';
	import CategoryPills from '$lib/features/catalog-filter/CategoryPills.svelte';
	import SortControls from '$lib/features/catalog-filter/SortControls.svelte';
	import ItemBlock from '$lib/entities/product/ui/ItemBlock.svelte';
	import GridCard from '$lib/entities/product/ui/GridCard.svelte';

	let { data }: { data: PageData } = $props();

	const categories = $derived(data.categories ?? []);

	const PALETTE = [
		'#3A76F0', '#7360F2', '#25D366', '#EA4335', '#FF6B00',
		'#6D4AFF', '#00B956', '#E4405F', '#FB542B', '#34D186'
	];

	function colorFromName(name: string): string {
		let hash = 0;
		for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) & 0xffffffff;
		return PALETTE[Math.abs(hash) % PALETTE.length];
	}

	function initialsFromName(name: string): string {
		const parts = name.trim().split(/\s+/);
		return parts.length > 1
			? (parts[0][0] + parts[1][0]).toUpperCase()
			: name.slice(0, 2).toUpperCase();
	}

	function mapAlternative(a: ApiAlternative): Alternative {
		return {
			name: a.name,
			c2: a.country,
			ratio: 0,
			r: 0,
			rev: 0,
			L: initialsFromName(a.name),
			cl: colorFromName(a.name),
			pr: 'free',
			d: a.description ?? ''
		};
	}

	function mapProduct(p: ApiProduct): Product {
		return {
			orig: p.name,
			flag: p.origin,
			kw: p.aliases,
			cat: p.category,
			alts: p.alternatives.map(mapAlternative)
		};
	}

	const items = $derived((data.products ?? []).map(mapProduct));

	let cat = $state<string | null>(null);
	let sort = $state('popular');
	let viewMode = $state('list');
	let expandAll = $state(false);

	const filtered = $derived(cat ? items.filter((it) => it.cat === cat) : items);
	const sorted = $derived(
		[...filtered].sort((a, b) => {
			if (sort === 'alts') return b.alts.length - a.alts.length;
			if (sort === 'alpha') return a.orig.localeCompare(b.orig);
			return 0;
		})
	);
	const totalAlts = $derived(sorted.reduce((s, it) => s + it.alts.length, 0));
	const activeCatObj = $derived(cat ? categories.find((c) => c.title === cat) : null);

	function handleAltClick(a: Alternative) {
		console.log('Alt clicked:', a.name);
	}
</script>

<section class="mx-auto max-w-[1040px] px-6 pb-20">
	<HeroCatalog categoriesCount={categories.length} />

	<!-- Category pills -->
	<div class="mb-7">
		<CategoryPills bind:activeCat={cat} {categories} />
	</div>

	<!-- Toolbar -->
	<SortControls
		bind:sort
		bind:viewMode
		bind:expandAll
		bind:activeCat={cat}
		{categories}
		totalItems={sorted.length}
		{totalAlts}
	/>

	<!-- Main area -->
	<div class="flex flex-col gap-6 md:flex-row md:items-start">
		<!-- Sidebar (list mode only) -->
		{#if viewMode === 'list'}
			<CatalogSidebar bind:activeCat={cat} {categories} />
		{/if}

		<!-- Items -->
		<div class="flex-1">
			{#if items.length === 0 && !data.isAuthenticated}
				<div class="animate-scale-in rounded-[28px] border border-stone-200 bg-white p-[72px] text-center">
					<div class="mb-4 animate-float text-5xl">🔒</div>
					<h3 class="mb-2 text-xl font-extrabold">Увійдіть, щоб переглянути каталог</h3>
					<p class="mx-auto mb-5 max-w-[300px] text-sm text-stone-500">
						Для перегляду продуктів необхідна авторизація
					</p>
					<a
						href="/sign-in"
						class="inline-block cursor-pointer rounded-xl border-[1.5px] border-[#0057B7] bg-[#0057B7] px-6 py-2.5 font-[Outfit] text-[13px] font-bold text-white transition-colors hover:bg-[#0046a0]"
					>
						Увійти
					</a>
				</div>
			{:else if sorted.length === 0}
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
							<span> в <strong class="text-[#0057B7]">{activeCatObj.title}</strong></span>
						{/if}
					</p>
				</div>
			{/if}
		</div>
	</div>
</section>

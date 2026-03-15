<script lang="ts">
	import { UA_BRANDS } from '$lib/entities/brand/data';
	import BrandCard from '$lib/entities/brand/ui/BrandCard.svelte';
	import HeroNashe from '$lib/widgets/nashe/HeroNashe.svelte';
	import SuccessStories from '$lib/widgets/nashe/SuccessStories.svelte';
	import Timeline from '$lib/widgets/nashe/Timeline.svelte';
	import NasheCta from '$lib/widgets/nashe/NasheCta.svelte';

	let filter = $state('all');
	let expandedBrand = $state<string | null>(null);

	const cats = ['all', ...new Set(UA_BRANDS.map((b) => b.cat))];
	const filteredBrands = $derived(filter === 'all' ? UA_BRANDS : UA_BRANDS.filter((b) => b.cat === filter));
	const featured = $derived(filteredBrands.filter((b) => b.ft));
	const rest = $derived(filteredBrands.filter((b) => !b.ft));
</script>

<section class="mx-auto max-w-[1040px] px-6 pb-20">
	<HeroNashe />

	<!-- Category filter -->
	<div class="animate-up mb-8 flex flex-wrap gap-2" style="animation-delay: 0.1s">
		{#each cats as c (c)}
			<button
				class="cursor-pointer rounded-xl border-none px-5 py-2.5 font-[Outfit] text-[13px] font-bold transition-all duration-200 hover:-translate-y-px"
				style="background: {filter === c ? '#0057B7' : '#f5f5f4'}; color: {filter === c ? '#fff' : '#78716c'}; box-shadow: {filter === c ? '0 4px 16px #0057B718' : 'none'}"
				onclick={() => (filter = c)}
			>{c === 'all' ? '🔥 Всі бренди' : c}</button>
		{/each}
	</div>

	<!-- Featured brands (2-col) -->
	{#if featured.length > 0}
		<div class="mb-4">
			<div class="mb-4 flex items-center gap-2">
				<span class="animate-float text-lg">⭐</span>
				<span class="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-widest text-stone-400">Обрані бренди</span>
				<span class="rounded-full bg-[#0057B7]/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#0057B7]">{featured.length}</span>
			</div>
			<div class="mb-10 grid grid-cols-2 gap-4">
				{#each featured as brand, i (brand.name)}
					<BrandCard
						{brand}
						index={i}
						variant="featured"
						onclick={() => (expandedBrand = expandedBrand === brand.name ? null : brand.name)}
					/>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Rest of brands (compact grid) -->
	{#if rest.length > 0}
		<div class="mb-14">
			<div class="mb-4 flex items-center gap-2">
				<span class="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-widest text-stone-400">Всі українські бренди</span>
				<span class="rounded-full bg-stone-100 px-2.5 py-0.5 font-mono text-[11px] font-bold text-stone-500">{rest.length}</span>
			</div>
			<div class="grid grid-cols-3 gap-3">
				{#each rest as brand, i (brand.name)}
					<BrandCard
						{brand}
						index={i}
						variant="compact"
						onclick={() => (expandedBrand = expandedBrand === brand.name ? null : brand.name)}
					/>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Empty state -->
	{#if filteredBrands.length === 0}
		<div class="animate-up mb-14 rounded-3xl border border-stone-200 bg-white/50 py-16 text-center">
			<div class="mb-3 text-4xl">🔍</div>
			<p class="mb-1 text-lg font-bold text-stone-800">Нічого не знайдено</p>
			<p class="text-sm text-stone-400">Спробуйте іншу категорію</p>
		</div>
	{/if}

	<SuccessStories />
	<Timeline />
	<NasheCta />
</section>

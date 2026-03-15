<script lang="ts">
	import { page } from '$app/stores';
	import { ITEMS, type Alternative } from '$lib/entities/product/data';
	import ItemBlock from '$lib/entities/product/ui/ItemBlock.svelte';

	const query = $derived($page.url.searchParams.get('q') ?? '');
	const q = $derived(query.toLowerCase());

	const results = $derived(
		ITEMS.filter(
			(it) =>
				it.orig.toLowerCase().includes(q) ||
				it.kw.some((k) => k.includes(q)) ||
				it.alts.some((a) => a.name.toLowerCase().includes(q))
		)
	);

	const totalAlts = $derived(results.reduce((s, r) => s + r.alts.length, 0));

	function handleAltClick(a: Alternative) {
		console.log('Alt clicked:', a.name);
	}
</script>

<section class="mx-auto max-w-[660px] px-6 pt-9 pb-20">
	<div class="animate-slide-r mb-6 flex items-center gap-3">
		<a
			href="/"
			class="grid h-9 w-9 cursor-pointer place-items-center rounded-[10px] border-[1.5px] border-stone-200 bg-white text-base text-stone-500 no-underline transition-all duration-150 hover:scale-105 hover:bg-stone-50"
		>←</a>
		<div>
			<h2 class="text-[22px] font-extrabold tracking-tight">«{query}»</h2>
			<span class="font-[JetBrains_Mono] text-xs text-stone-400">{totalAlts} альтернатив</span>
		</div>
	</div>

	{#if results.length > 0}
		<div class="flex flex-col gap-3.5">
			{#each results as it, i (it.orig)}
				<ItemBlock item={it} index={i} openDefault={true} onAltClick={handleAltClick} />
			{/each}
		</div>
	{:else}
		<div class="animate-scale-in rounded-3xl border border-stone-200 bg-white px-6 py-16 text-center">
			<div class="animate-float mb-3.5 text-[44px]">🔍</div>
			<h3 class="mb-2 text-[19px] font-extrabold">Нічого не знайдено</h3>
			<p class="mx-auto mb-[22px] max-w-[300px] text-[13px] text-stone-500">
				Спробуйте інший запит або додайте альтернативу
			</p>
			<a
				href="/"
				class="inline-block cursor-pointer rounded-full border-2 border-stone-200 bg-white px-[26px] py-2.5 font-[Outfit] text-[13px] font-bold text-stone-900 no-underline transition-colors hover:bg-stone-50"
			>← Головна</a>
		</div>
	{/if}
</section>

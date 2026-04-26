<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { ITEMS, type Alternative } from '$lib/entities/product/data';
	import ItemBlock from '$lib/entities/product/ui/ItemBlock.svelte';
	import AlternativesSearchResults from '$lib/entities/alternative/ui/AlternativesSearchResults.svelte';
	import { searchAlternatives } from '$lib/entities/alternative/search';
	import type { AlternativeSearchItem } from '$lib/entities/alternative/types';

	let { data }: { data: PageData } = $props();

	const query = $derived($page.url.searchParams.get('q') ?? '');
	const q = $derived(query.toLowerCase());

	const localResults = $derived(
		ITEMS.filter(
			(it) =>
				it.orig.toLowerCase().includes(q) ||
				it.kw.some((k) => k.includes(q)) ||
				it.alts.some((a) => a.name.toLowerCase().includes(q))
		)
	);

	const totalAlts = $derived(localResults.reduce((s, r) => s + r.alts.length, 0));

	let apiLoading = $state(false);
	let apiError = $state<string | null>(null);
	let apiResults = $state<AlternativeSearchItem[]>([]);
	let apiMessage = $state<string | null>(null);

	$effect(() => {
		const currentQuery = query;
		if (!currentQuery.trim()) return;

		apiLoading = true;
		apiError = null;
		apiResults = [];
		apiMessage = null;

		let cancelled = false;
		const categories = (data.categories ?? []).map((c) => c.title);

		searchAlternatives({ productName: currentQuery, categories })
			.then((res) => {
				if (cancelled) return;
				apiResults = res.alternatives ?? [];
				apiMessage = res.message ?? null;
			})
			.catch((err: Error) => {
				if (cancelled) return;
				apiError = err.message ?? 'Щось пішло не так';
			})
			.finally(() => {
				if (!cancelled) apiLoading = false;
			});

		return () => {
			cancelled = true;
		};
	});

	function handleAltClick(a: Alternative) {
		console.log('Alt clicked:', a.name);
	}
</script>

<section class="mx-auto max-w-[660px] px-6 pt-9 pb-20">
	<div class="mb-6 flex animate-slide-r items-center gap-3">
		<a
			href="/"
			class="grid h-9 w-9 cursor-pointer place-items-center rounded-[10px] border-[1.5px] border-stone-200 bg-white text-base text-stone-500 no-underline transition-all duration-150 hover:scale-105 hover:bg-stone-50"
			>←</a
		>
		<div>
			<h2 class="text-[22px] font-extrabold tracking-tight">«{query}»</h2>
			<span class="font-[JetBrains_Mono] text-xs text-stone-400">{totalAlts} альтернатив</span>
		</div>
	</div>

	{#if localResults.length > 0}
		<div class="flex flex-col gap-3.5">
			{#each localResults as it, i (it.orig)}
				<ItemBlock item={it} index={i} openDefault={true} onAltClick={handleAltClick} />
			{/each}
		</div>
	{:else}
		<div
			class="animate-scale-in rounded-3xl border border-stone-200 bg-white px-6 py-16 text-center"
		>
			<div class="mb-3.5 animate-float text-[44px]">🔍</div>
			<h3 class="mb-2 text-[19px] font-extrabold">Нічого не знайдено</h3>
			<p class="mx-auto mb-[22px] max-w-[300px] text-[13px] text-stone-500">
				Спробуйте інший запит або додайте альтернативу
			</p>
			<a
				href="/"
				class="inline-block cursor-pointer rounded-full border-2 border-stone-200 bg-white px-[26px] py-2.5 font-[Outfit] text-[13px] font-bold text-stone-900 no-underline transition-colors hover:bg-stone-50"
				>← Головна</a
			>
		</div>
	{/if}

	<!-- API-sourced alternatives -->
	{#if apiLoading || apiError || apiResults.length > 0 || apiMessage}
		<div class="mt-8">
			<div class="mb-4 flex items-center gap-3">
				<div class="h-px flex-1 bg-stone-200"></div>
				<span
					class="font-[JetBrains_Mono] text-[10px] font-bold tracking-widest text-stone-400 uppercase"
				>
					{#if apiLoading}
						<span class="flex items-center gap-1.5">
							<span class="inline-block h-1.5 w-1.5 animate-ping rounded-full bg-stone-400"></span>
							Шукаємо…
						</span>
					{:else}
						Знайдено через базу
					{/if}
				</span>
				<div class="h-px flex-1 bg-stone-200"></div>
			</div>
			<AlternativesSearchResults
				alternatives={apiResults}
				loading={apiLoading}
				error={apiError}
				message={apiMessage}
			/>
		</div>
	{/if}
</section>

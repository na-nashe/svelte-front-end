<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { ITEMS, type Alternative } from '$lib/entities/product/data';
	import AlternativesSearchResults from '$lib/entities/alternative/ui/AlternativesSearchResults.svelte';
	import { searchAlternatives } from '$lib/entities/alternative/search-alternatives-summary';
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
		</div>
	</div>

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

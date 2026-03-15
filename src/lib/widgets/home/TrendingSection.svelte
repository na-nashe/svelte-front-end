<script lang="ts">
	import ItemBlock from '$lib/entities/product/ui/ItemBlock.svelte';
	import { ITEMS, type Alternative } from '$lib/entities/product/data';
	import { resolve } from '$app/paths';

	let {
		onAlt
	}: {
		onAlt: (a: Alternative) => void;
	} = $props();

	const topItems = ITEMS.slice(0, 3);
</script>

<section class="bg-[#fafaf9] px-4 py-16 sm:py-24">
	<div class="mx-auto max-w-3xl">
		<!-- Header -->
		<div class="mb-10 text-center">
			<span
				class="mb-3 inline-block font-[JetBrains_Mono] text-[11px] font-bold tracking-widest text-stone-400 uppercase"
			>
				Топ замін
			</span>
			<h2 class="font-[Outfit] text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
				Найчастіші заміни
			</h2>
		</div>

		<!-- Items -->
		<div class="flex flex-col gap-4">
			{#each topItems as item, i (item.orig)}
				<ItemBlock {item} index={i} openDefault={i === 0} onAltClick={onAlt} />
			{/each}
		</div>

		<!-- CTA -->
		<div class="mt-10 text-center">
			<a
				href={resolve('/catalog')}
				class="inline-flex items-center gap-2 rounded-full border-2 border-stone-200 bg-white px-6 py-3 font-[Outfit] text-sm font-bold text-stone-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-lg"
			>
				Весь каталог →
			</a>
		</div>
	</div>
</section>

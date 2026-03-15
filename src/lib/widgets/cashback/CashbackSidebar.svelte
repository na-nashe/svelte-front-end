<script lang="ts">
	import { CB_CATS, CB } from '$lib/entities/cashback/data';

	let {
		activeCat = $bindable<string | null>(null)
	}: {
		activeCat?: string | null;
	} = $props();

	const catCounts = $derived(
		Object.fromEntries(CB_CATS.map((c) => [c, CB.filter((p) => p.cat === c).length]))
	);
</script>

<div class="animate-slide-r sticky top-[76px] w-[200px] shrink-0" style="animation-delay: 0.2s">
	<!-- Category nav -->
	<div class="mb-3.5 rounded-[20px] border border-stone-200 bg-white px-4 py-5">
		<p class="mb-2.5 font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-widest text-stone-400">
			Категорії
		</p>
		{#each CB_CATS as c, i (c)}
			{@const n = catCounts[c] || 0}
			{@const act = activeCat === c}
			{#if n > 0}
				<button
					onclick={() => (activeCat = act ? null : c)}
					class="mb-px flex w-full cursor-pointer items-center rounded-[9px] border-none px-2.5 py-2 text-left font-[Outfit] text-xs transition-all duration-150 animate-slide-r
						{act ? 'bg-green-50 font-bold text-[#065f46]' : 'bg-transparent font-medium text-stone-500 hover:bg-stone-50'}"
					style="animation-delay: {i * 0.03}s"
				>
					<span class="flex-1">{c}</span>
					<span class="font-[JetBrains_Mono] text-[10px] {act ? 'text-[#065f46]' : 'text-stone-300'}">{n}</span>
				</button>
			{/if}
		{/each}
	</div>

	<!-- How it works card -->
	<div class="rounded-[20px] border-[1.5px] border-green-200 bg-gradient-to-br from-green-50 to-green-50/50 px-4 py-5">
		<div class="mb-2.5 text-xs font-extrabold text-[#065f46]">💡 Як отримати?</div>
		{#each ['Купуй товари з позначкою 🇺🇦', 'Скануй чек у Дії', 'Отримуй 10% на картку'] as step, i}
			<div class="mb-2 flex items-start gap-2">
				<div class="mt-px grid h-5 w-5 shrink-0 place-items-center rounded-[6px] bg-[#065f4612] text-[10px] font-extrabold text-[#065f46]">
					{i + 1}
				</div>
				<span class="text-[11px] leading-[1.4] text-[#065f46cc]">{step}</span>
			</div>
		{/each}
	</div>
</div>

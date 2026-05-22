<script lang="ts">
	import { ITEMS } from '$lib/entities/product/data';
	import type { Category } from '$lib/entities/category';

	let {
		activeCat = $bindable<string | null>(null),
		categories = []
	}: {
		activeCat?: string | null;
		categories?: Category[];
	} = $props();

	function countForCat(title: string): number {
		return ITEMS.filter((it) => it.cat === title).length;
	}

	const insights = [
		{ label: 'Топ заміна', value: 'Signal', num: '92%', cl: '#3A76F0' },
		{ label: 'Найбільше відг.', value: 'Gmail', num: '612', cl: '#EA4335' },
		{ label: 'Найновіше', value: 'Sweet.tv', num: '81%', cl: '#FF2D55' }
	];
</script>

<div class="sticky top-[76px] w-full md:w-[200px] md:shrink-0 animate-slide-r" style="animation-delay: 0.15s">
	<p
		class="mb-2 px-2 font-[JetBrains_Mono] text-[10px] font-bold tracking-widest text-stone-400 uppercase"
	>
		Навігація
	</p>
	{#each categories as c, i (c.id)}
		{@const count = countForCat(c.title)}
		{@const active = activeCat === c.title}
		{#if count > 0}
			<button
				onclick={() => (activeCat = active ? null : c.title)}
				class="mb-px flex w-full animate-slide-r cursor-pointer items-center gap-2 rounded-[10px] border-none px-2.5 py-[9px] font-[Outfit] text-xs transition-all duration-200
					{active
					? 'bg-[#0057B708] font-bold text-[#0057B7]'
					: 'bg-transparent font-medium text-stone-500 hover:bg-stone-50'}"
				style="animation-delay: {i * 0.03}s"
			>
				<span class="text-sm">{c.icon}</span>
				<span class="flex-1 text-left">{c.title}</span>
				<span
					class="rounded-[5px] px-1.5 py-px font-[JetBrains_Mono] text-[10px]
						{active ? 'bg-[#0057B70a] text-[#0057B7]' : 'bg-stone-100 text-stone-300'}">{count}</span
				>
			</button>
		{/if}
	{/each}

	<!-- Insights panel -->
	<div class="mt-5 rounded-2xl border border-stone-200 bg-white p-3.5 px-[14px]">
		<div class="mb-2.5 text-[11px] font-bold">📊 Інсайти</div>
		{#each insights as ins, i (ins.value)}
			<div
				class="flex items-center gap-2 py-[7px]"
				style="border-bottom: {i < insights.length - 1 ? '1px solid #f5f5f4' : 'none'}"
			>
				<div
					class="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-[6px] text-[8px] font-extrabold"
					style="background: {ins.cl}0c; color: {ins.cl}"
				>
					{ins.value[0]}
				</div>
				<div class="flex-1">
					<div class="text-[11px] font-semibold">{ins.value}</div>
					<div class="text-[9px] text-stone-400">{ins.label}</div>
				</div>
				<span class="font-[JetBrains_Mono] text-[10px] font-bold" style="color: {ins.cl}"
					>{ins.num}</span
				>
			</div>
		{/each}
	</div>
</div>

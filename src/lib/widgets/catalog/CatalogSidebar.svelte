<script lang="ts">
	import { CATS, ITEMS } from '$lib/entities/product/data';

	let {
		activeCat = $bindable<string | null>(null)
	}: {
		activeCat?: string | null;
	} = $props();

	function countForCat(slug: string): number {
		return ITEMS.filter((it) => it.cat === slug).length;
	}

	const insights = [
		{ label: 'Топ заміна', value: 'Signal', num: '92%', cl: '#3A76F0' },
		{ label: 'Найбільше відг.', value: 'Gmail', num: '612', cl: '#EA4335' },
		{ label: 'Найновіше', value: 'Sweet.tv', num: '81%', cl: '#FF2D55' }
	];
</script>

<div class="sticky top-[76px] w-[200px] shrink-0 animate-slide-r" style="animation-delay: 0.15s">
	<p
		class="mb-2 px-2 font-[JetBrains_Mono] text-[10px] font-bold tracking-widest text-stone-400 uppercase"
	>
		Навігація
	</p>
	{#each CATS as c, i (c.slug)}
		{@const count = countForCat(c.slug)}
		{@const active = activeCat === c.slug}
		{#if count > 0}
			<button
				onclick={() => (activeCat = active ? null : c.slug)}
				class="mb-px flex w-full animate-slide-r cursor-pointer items-center gap-2 rounded-[10px] border-none px-2.5 py-[9px] font-[Outfit] text-xs transition-all duration-200
					{active
					? 'bg-[#0057B708] font-bold text-[#0057B7]'
					: 'bg-transparent font-medium text-stone-500 hover:bg-stone-50'}"
				style="animation-delay: {i * 0.03}s"
			>
				<span class="text-sm">{c.icon}</span>
				<span class="flex-1 text-left">{c.name}</span>
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

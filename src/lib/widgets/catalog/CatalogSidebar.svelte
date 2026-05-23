<script lang="ts">
	import type { Product } from '$lib/entities/product/data';
	import type { Category } from '$lib/entities/category';

	let {
		activeCat = $bindable<string | null>(null),
		categories = [],
		items = [] as Product[]
	}: {
		activeCat?: string | null;
		categories?: Category[];
		items?: Product[];
	} = $props();

	let expanded = $state<Set<number>>(new Set());

	function toggle(id: number) {
		const next = new Set(expanded);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		expanded = next;
	}

	function countForCat(cat: Category): number {
		const titles = allTitles(cat);
		return items.filter((it) => titles.includes(it.cat)).length;
	}

	function allTitles(cat: Category): string[] {
		if (!cat.children?.length) return [cat.title];
		return [cat.title, ...cat.children.flatMap(allTitles)];
	}
</script>

<div
	class="sticky top-[76px] flex w-full animate-slide-r flex-col md:w-[200px] md:shrink-0"
	style="animation-delay: 0.15s; max-height: calc(100vh - 100px)"
>
	<p
		class="mb-2 shrink-0 px-2 font-[JetBrains_Mono] text-[10px] font-bold tracking-widest text-stone-400 uppercase"
	>
		Навігація
	</p>

	<div class="overflow-y-auto pr-0.5">
		{#each categories as c, i (c.id)}
			{@const count = countForCat(c)}
			{@const active = activeCat === c.title}
			{@const open = expanded.has(c.id)}
			{@const hasChildren = !!c.children?.length}

			<button
				onclick={() => {
					if (hasChildren) toggle(c.id);
					activeCat = active ? null : c.title;
				}}
				class="mb-px flex w-full cursor-pointer items-center gap-2 rounded-[10px] border-none px-2.5 py-[9px] font-[Outfit] text-xs transition-all duration-200
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
				{#if hasChildren}
					<span
						class="ml-0.5 text-[9px] text-stone-400 transition-transform duration-200"
						style="display:inline-block; transform: rotate({open ? 90 : 0}deg)">▶</span
					>
				{/if}
			</button>

			{#if hasChildren && open}
				<div class="mb-1">
					{#each c.children as sub (sub.id)}
						{@const subCount = countForCat(sub)}
						{@const subActive = activeCat === sub.title}
						<button
							onclick={() => (activeCat = subActive ? null : sub.title)}
							class="mb-px flex w-full cursor-pointer items-center gap-2 rounded-[10px] border-none py-[7px] pr-2.5 pl-6 font-[Outfit] text-xs transition-all duration-200
								{subActive
								? 'bg-[#0057B708] font-bold text-[#0057B7]'
								: 'bg-transparent font-medium text-stone-400 hover:bg-stone-50'}"
						>
							<span class="text-xs">{sub.icon}</span>
							<span class="flex-1 text-left">{sub.title}</span>
							<span
								class="rounded-[5px] px-1.5 py-px font-[JetBrains_Mono] text-[10px]
									{subActive ? 'bg-[#0057B70a] text-[#0057B7]' : 'bg-stone-100 text-stone-300'}">{subCount}</span
							>
						</button>
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</div>

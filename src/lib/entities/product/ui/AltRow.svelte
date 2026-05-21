<script lang="ts">
	import Ratio from '$lib/shared/ui/Ratio.svelte';
	import Tag from '$lib/shared/ui/Tag.svelte';
	import type { Alternative } from '../data';

	let {
		alt,
		index = 0,
		onclick
	}: { alt: Alternative; index?: number; onclick?: (a: Alternative) => void } = $props();

	let hovered = $state(false);
</script>

<button
	class="flex w-full animate-slide-r cursor-pointer items-center gap-3.5 rounded-[14px] px-4 py-3.5 text-left transition-all duration-250"
	style="border-left: 3px solid {hovered ? alt.cl : 'transparent'}; transform: {hovered
		? 'translateX(4px)'
		: 'none'}; animation-delay: {index * 0.06}s; background: {hovered ? '#fafaf9' : 'transparent'}"
	onmouseenter={() => (hovered = true)}
	onmouseleave={() => (hovered = false)}
	onclick={() => onclick?.(alt)}
>
	<div
		class="grid h-11 w-11 shrink-0 place-items-center rounded-xl font-[Outfit] text-base font-extrabold transition-transform duration-200"
		style="background: {alt.cl}0a; color: {alt.cl}; border: 1.5px solid {alt.cl}14; transform: {hovered
			? 'scale(1.08)'
			: 'none'}"
	>
		{alt.L}
	</div>
	<div class="min-w-0 flex-1">
		<div class="mb-0.5 flex flex-wrap items-center gap-1.5">
			<span class="text-sm font-bold"><a href={alt.url} target="_blank" rel="noopener noreferrer" onclick={(e) => e.stopPropagation()>{alt.name}</a></span>
			<span class="text-[13px]">{alt.c2}</span>
			<Tag type={alt.pr} />
		</div>
		<div class="text-xs text-stone-500">{alt.d}</div>
	</div>
	<div class="shrink-0 text-right">
		<Ratio value={alt.ratio} />
		<div
			class="mt-0.5 text-[9px] text-stone-400 transition-opacity duration-200"
			style="opacity: {hovered ? 1 : 0}"
		>
			рекомендують
		</div>
	</div>
</button>

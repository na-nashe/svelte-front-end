<script lang="ts">
	import Tag from '$lib/shared/ui/Tag.svelte';
	import AltLogo from './AltLogo.svelte';
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
	<div style="transform: {hovered ? 'scale(1.08)' : 'none'}; transition: transform 0.2s">
		<AltLogo url={alt.url} letter={alt.L} color={alt.cl} size={44} />
	</div>
	<div class="min-w-0 flex-1">
		<div class="mb-0.5 flex flex-wrap items-center gap-1.5">
			<span class="text-sm font-bold"
				><a
					href={alt.url}
					target="_blank"
					rel="noopener noreferrer"
					onclick={(e) => e.stopPropagation()}>{alt.name}</a
				></span
			>
			<span class="text-[13px]">{alt.c2}</span>
			<Tag type={alt.pr} />
		</div>
		<div class="text-xs text-stone-500">{alt.d}</div>
	</div>
	<div class="shrink-0 text-right">
		{#if alt.rev > 0}
			<span class="text-[13px] font-bold text-amber-500">★ {alt.r.toFixed(1)}</span>
			<div class="mt-0.5 text-[9px] text-stone-400">
				{alt.rev} відгук{alt.rev === 1 ? '' : alt.rev < 5 ? 'и' : 'ів'}
			</div>
		{:else}
			<span class="text-[11px] text-stone-300 italic">немає відгуків</span>
		{/if}
	</div>
</button>

<script lang="ts">
	import type { Product, Alternative } from '../data';
	import AltRow from './AltRow.svelte';

	let {
		item,
		index = 0,
		openDefault = false,
		onAltClick
	}: {
		item: Product;
		index?: number;
		openDefault?: boolean;
		onAltClick?: (a: Alternative) => void;
	} = $props();

	let open = $state(openDefault);
</script>

<div
	class="bg-white rounded-[20px] overflow-hidden border border-stone-200 transition-shadow duration-300 animate-up"
	style="box-shadow: {open ? '0 8px 32px rgba(0,0,0,0.02)' : '0 1px 3px rgba(0,0,0,0.01)'}; animation-delay: {index * 0.08}s"
>
	<button
		onclick={() => (open = !open)}
		class="w-full flex items-center justify-between px-6 py-5 cursor-pointer transition-colors duration-300"
		style="background: {open ? 'linear-gradient(135deg, rgba(254,242,242,0.03), rgba(255,247,237,0.02))' : 'transparent'}"
	>
		<div class="flex items-center gap-3.5">
			<div
				class="w-10 h-10 rounded-[11px] bg-red-50 border-[1.5px] border-red-200 grid place-items-center shrink-0 transition-transform duration-200"
				style="transform: {open ? 'rotate(-3deg) scale(1.05)' : 'none'}"
			>
				<span class="text-xs font-extrabold text-red-600">✕</span>
			</div>
			<div class="text-left">
				<div class="flex items-center gap-1.5 flex-wrap">
					<span class="font-extrabold text-base tracking-tight">{item.orig}</span>
					<span class="text-sm">{item.flag}</span>
					<span class="text-[8px] px-1.5 py-0.5 rounded-full bg-red-50 text-red-600 font-bold border border-red-200 uppercase tracking-wide">ворожий</span>
				</div>
				<span class="text-xs text-stone-400">{item.alts.length} альтернатив</span>
			</div>
		</div>
		<div
			class="w-7 h-7 rounded-lg bg-stone-100 grid place-items-center transition-all duration-300"
			style="transform: {open ? 'rotate(180deg)' : 'none'}"
		>
			<svg width="14" height="14" viewBox="0 0 20 20" class="text-stone-500">
				<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" />
			</svg>
		</div>
	</button>

	<div
		class="overflow-hidden transition-all duration-400"
		style="max-height: {open ? '600px' : '0'}; opacity: {open ? 1 : 0}; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)"
	>
		<div class="px-2.5 pb-3.5">
			{#each item.alts as alt, j}
				<AltRow {alt} index={j} onclick={onAltClick} />
			{/each}
		</div>
	</div>
</div>

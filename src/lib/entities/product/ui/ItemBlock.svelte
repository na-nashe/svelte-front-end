<script lang="ts">
	import type { Product, Alternative } from '../data';
	import AltRow from './AltRow.svelte';

	let {
		item,
		index = 0,
		openDefault = false,
		onAltClick,
		isAuthenticated = false
	}: {
		item: Product;
		index?: number;
		openDefault?: boolean;
		onAltClick?: (a: Alternative) => void;
		isAuthenticated?: boolean;
	} = $props();

	let open = $state(openDefault);
</script>

<div
	class="animate-up overflow-hidden rounded-[20px] border border-stone-200 bg-white transition-shadow duration-300"
	style="box-shadow: {open
		? '0 8px 32px rgba(0,0,0,0.02)'
		: '0 1px 3px rgba(0,0,0,0.01)'}; animation-delay: {index * 0.08}s"
>
	<button
		onclick={() => (open = !open)}
		class="flex w-full cursor-pointer items-center justify-between px-6 py-5 transition-colors duration-300"
		style="background: {open
			? 'linear-gradient(135deg, rgba(254,242,242,0.03), rgba(255,247,237,0.02))'
			: 'transparent'}"
	>
		<div class="flex items-center gap-3.5">
			<div
				class="grid h-10 w-10 shrink-0 place-items-center rounded-[11px] border-[1.5px] border-red-200 bg-red-50 transition-transform duration-200"
				style="transform: {open ? 'rotate(-3deg) scale(1.05)' : 'none'}"
			>
				<span class="text-xs font-extrabold text-red-600">✕</span>
			</div>
			<div class="text-left">
				<div class="flex flex-wrap items-center gap-1.5">
					<span class="text-base font-extrabold tracking-tight">{item.orig}</span>
					<span class="text-sm">{item.flag}</span>
					<span
						class="rounded-full border border-red-200 bg-red-50 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-red-600 uppercase"
						>ворожий</span
					>
				</div>
				<span class="text-xs text-stone-400">{item.alts.length} альтернатив</span>
			</div>
		</div>
		<div
			class="grid h-7 w-7 place-items-center rounded-lg bg-stone-100 transition-all duration-300"
			style="transform: {open ? 'rotate(180deg)' : 'none'}"
		>
			<svg width="14" height="14" viewBox="0 0 20 20" class="text-stone-500">
				<path
					d="M5 7.5L10 12.5L15 7.5"
					stroke="currentColor"
					stroke-width="2"
					fill="none"
					stroke-linecap="round"
				/>
			</svg>
		</div>
	</button>

	<div
		class="overflow-hidden transition-all duration-400"
		style="max-height: {open ? '600px' : '0'}; opacity: {open
			? 1
			: 0}; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)"
	>
		<div class="px-2.5 pb-3.5">
			{#each item.alts as alt, j}
				<AltRow {alt} index={j} onclick={onAltClick} />
			{/each}
			{#if isAuthenticated && item.id}
				<a
					href="/catalog/{item.id}/add-alternative"
					class="mt-1 flex w-full items-center gap-2 rounded-[14px] px-4 py-3 text-left text-xs font-semibold text-stone-400 transition-colors hover:bg-stone-50 hover:text-stone-600"
				>
					<span
						class="flex h-6 w-6 items-center justify-center rounded-lg border border-dashed border-stone-300 text-sm"
						>+</span
					>
					Додати альтернативу
				</a>
			{/if}
		</div>
	</div>
</div>

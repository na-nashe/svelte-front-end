<script lang="ts">
	import Ratio from '$lib/shared/ui/Ratio.svelte';
	import type { Product, Alternative } from '../data';
	import AltRow from './AltRow.svelte';

	let {
		item,
		index = 0,
		onAltClick
	}: { item: Product; index?: number; onAltClick?: (a: Alternative) => void } = $props();

	let hov = $state(false);
	let expanded = $state(false);

	const top = $derived(item.alts[0]);
	const best = $derived(Math.max(...item.alts.map((a) => a.ratio)));
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="animate-up overflow-hidden rounded-3xl bg-white transition-all duration-350"
	style="border: 1.5px solid {hov ? top.cl + '20' : '#e7e5e4'}; transform: {hov
		? 'translateY(-4px)'
		: 'none'}; box-shadow: {hov
		? `0 20px 48px ${top.cl}08`
		: '0 1px 3px rgba(0,0,0,0.01)'}; animation-delay: {index * 0.07}s"
	onmouseenter={() => (hov = true)}
	onmouseleave={() => (hov = false)}
>
	<!-- Color accent bar -->
	<div
		class="h-[3px] transition-opacity duration-300"
		style="background: linear-gradient(90deg, #dc2626 50%, {top.cl} 50%); opacity: {hov ? 1 : 0.3}"
	></div>

	<div class="p-[22px] pb-[18px]">
		<!-- Header -->
		<div class="mb-4 flex items-start gap-3">
			<div
				class="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] border-[1.5px] border-red-200 bg-red-50 transition-transform duration-350"
				style="transform: {hov ? 'rotate(-6deg) scale(1.08)' : 'none'}"
			>
				<span class="text-sm font-extrabold text-red-600">✕</span>
			</div>
			<div class="flex-1">
				<div class="mb-0.5 flex items-center gap-1.5">
					<span class="text-[17px] font-extrabold tracking-tight">{item.orig}</span>
					<span class="text-[15px]">{item.flag}</span>
				</div>
				<div class="flex items-center gap-1.5">
					<span
						class="rounded-full border border-red-200 bg-red-50 px-1.5 py-0.5 text-[8px] font-bold text-red-600 uppercase"
						>ворожий</span
					>
					<span class="text-[11px] text-stone-400">{item.alts.length} альтернатив</span>
				</div>
			</div>
			<div class="shrink-0 text-right">
				<div class="mb-0.5 text-[10px] text-stone-400">найкращий</div>
				<span class="font-mono text-base font-extrabold text-green-600">{best}%</span>
			</div>
		</div>

		<!-- Top alternative comparison -->
		<div
			class="flex items-center gap-2.5 rounded-[14px] border border-stone-100 bg-stone-50 p-3 px-3.5"
		>
			<div
				class="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-lg border border-red-200 bg-red-50"
			>
				<span class="text-[9px] font-extrabold text-red-600">✕</span>
			</div>
			<svg width="16" height="8" viewBox="0 0 16 8" class="shrink-0">
				<path
					d="M0 4h12M10 1l3 3-3 3"
					stroke="#a8a29e"
					stroke-width="1.5"
					fill="none"
					stroke-linecap="round"
				/>
			</svg>
			<button
				class="flex flex-1 cursor-pointer items-center gap-2 rounded-[10px] px-2.5 py-1.5 transition-all duration-200"
				style="background: {top.cl}08; border: 1px solid {top.cl}12"
				onclick={() => onAltClick?.(top)}
			>
				<div
					class="grid h-7 w-7 place-items-center rounded-[7px] font-[Outfit] text-[11px] font-extrabold"
					style="background: {top.cl}12; color: {top.cl}"
				>
					{top.L}
				</div>
				<div class="min-w-0 flex-1">
					<div class="text-xs font-bold">{top.name} {top.c2}</div>
					<div class="truncate text-[10px] text-stone-500">{top.d}</div>
				</div>
				<div class="shrink-0"><Ratio value={top.ratio} /></div>
			</button>
		</div>
	</div>

	<!-- Footer: alt avatars + expand -->
	<div class="flex items-center justify-between px-[22px] pb-4">
		<div class="flex items-center">
			{#each item.alts as a, j (j)}
				<button
					class="grid h-7 w-7 cursor-pointer place-items-center rounded-lg text-[10px] font-extrabold transition-all duration-200 hover:z-10 hover:scale-120"
					style="background: {a.cl}0c; color: {a.cl}; border: 1.5px solid {a.cl}18; margin-left: {j >
					0
						? '-5px'
						: '0'}; z-index: {item.alts.length - j}"
					onclick={() => onAltClick?.(a)}
				>
					{a.L}
				</button>
			{/each}
			{#if item.alts.length > 1}
				<span class="ml-2 text-[10px] text-stone-400">+{item.alts.length - 1} ще</span>
			{/if}
		</div>
		<button
			class="flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1.5 font-[Outfit] text-[11px] font-semibold transition-all duration-200"
			style="border: 1px solid {expanded ? '#1c1917' : '#e7e5e4'}; background: {expanded
				? '#1c1917'
				: '#fff'}; color: {expanded ? '#fff' : '#78716c'}"
			onclick={() => (expanded = !expanded)}
		>
			{expanded ? 'Згорнути' : 'Усі альт.'}
			<svg
				width="10"
				height="10"
				viewBox="0 0 20 20"
				style="transition: transform 0.25s; transform: {expanded ? 'rotate(180deg)' : 'none'}"
			>
				<path
					d="M5 7.5L10 12.5L15 7.5"
					stroke="currentColor"
					stroke-width="2.5"
					fill="none"
					stroke-linecap="round"
				/>
			</svg>
		</button>
	</div>

	<!-- Expanded alternatives -->
	<div
		class="overflow-hidden transition-all duration-450"
		style="max-height: {expanded ? '500px' : '0'}; opacity: {expanded ? 1 : 0}"
	>
		<div class="border-t border-stone-100 px-2.5 pb-3.5">
			{#each item.alts as a, j (j)}
				<AltRow alt={a} index={j} onclick={onAltClick} />
			{/each}
		</div>
	</div>
</div>

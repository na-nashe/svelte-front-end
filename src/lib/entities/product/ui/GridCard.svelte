<script lang="ts">
	import Tag from '$lib/shared/ui/Tag.svelte';
	import type { Product, Alternative } from '../data';

	let {
		item,
		index = 0,
		onAltClick
	}: { item: Product; index?: number; onAltClick?: (a: Alternative) => void } = $props();

	const PREVIEW = 3;

	let hov = $state(false);
	let expanded = $state(false);

	const accent = $derived(item.alts[0]?.cl ?? '#0057B7');
	const visible = $derived(expanded ? item.alts : item.alts.slice(0, PREVIEW));
	const hidden = $derived(item.alts.length - PREVIEW);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="grid animate-up grid-rows-[auto_1fr_auto] overflow-hidden rounded-3xl bg-white transition-all duration-300"
	style="border: 1.5px solid {hov ? accent + '30' : '#e7e5e4'};
	       transform: {hov ? 'translateY(-3px)' : 'none'};
	       box-shadow: {hov ? `0 16px 40px ${accent}10` : '0 1px 3px rgba(0,0,0,0.04)'};
	       animation-delay: {index * 0.06}s"
	onmouseenter={() => (hov = true)}
	onmouseleave={() => (hov = false)}
>
	<!-- Accent bar -->
	<div
		class="h-[3px] transition-opacity duration-300"
		style="background: linear-gradient(90deg, #dc2626 40%, {accent} 40%); opacity: {hov ? 1 : 0.35}"
	></div>

	<div class="grid gap-4 p-5">
		<!-- Header -->
		<div class="grid grid-cols-[44px_1fr] items-start gap-3">
			<div
				class="grid h-11 w-11 place-items-center rounded-[13px] border-[1.5px] border-red-200 bg-red-50 transition-transform duration-300"
				style="transform: {hov ? 'rotate(-6deg) scale(1.07)' : 'none'}"
			>
				<span class="text-sm font-extrabold text-red-600">✕</span>
			</div>
			<div>
				<div class="mb-1 flex flex-wrap items-center gap-1.5">
					<span class="text-base font-extrabold tracking-tight">{item.orig}</span>
					<span class="text-sm">{item.flag}</span>
				</div>
				<div class="flex items-center gap-2">
					<span
						class="rounded-full border border-red-200 bg-red-50 px-1.5 py-0.5 text-[8px] font-bold text-red-600 uppercase"
					>
						ворожий
					</span>
					<span class="text-[11px] text-stone-400">{item.alts.length} альт.</span>
				</div>
			</div>
		</div>

		<!-- Alternatives list -->
		<div class="grid gap-1.5">
			{#each visible as a (a.name)}
				<button
					onclick={() => onAltClick?.(a)}
					class="grid cursor-pointer grid-cols-[32px_1fr_auto] items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-all duration-200 hover:bg-stone-50"
					style="border: 1px solid transparent"
					onmouseenter={(e) => (e.currentTarget.style.borderColor = a.cl + '20')}
					onmouseleave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
				>
					<div
						class="grid h-8 w-8 place-items-center rounded-[8px] font-[Outfit] text-[11px] font-extrabold"
						style="background: {a.cl}12; color: {a.cl}"
					>
						{a.L}
					</div>
					<div class="min-w-0">
						<div class="flex flex-wrap items-center gap-1 leading-tight">
							<span class="text-xs font-semibold">{a.name}</span>
							<span class="text-[11px]">{a.c2}</span>
						</div>
						{#if a.d}
							<div class="truncate text-[10px] text-stone-400">{a.d}</div>
						{/if}
					</div>
					<Tag type={a.pr} />
				</button>
			{/each}
		</div>
	</div>

	<!-- Footer -->
	<div class="grid grid-cols-[1fr_auto] items-center gap-2 border-t border-stone-100 px-5 py-3">
		<div class="flex items-center gap-1">
			{#each item.alts.slice(0, 5) as a, j (j)}
				<button
					onclick={() => onAltClick?.(a)}
					class="grid h-6 w-6 cursor-pointer place-items-center rounded-[6px] text-[9px] font-extrabold transition-all duration-200 hover:scale-110"
					style="background: {a.cl}0c; color: {a.cl}; border: 1.5px solid {a.cl}20; margin-left: {j >
					0
						? '-4px'
						: '0'}; z-index: {item.alts.length - j}"
					title={a.name}
				>
					{a.L}
				</button>
			{/each}
			{#if hidden > 0}
				<span class="ml-1.5 text-[10px] text-stone-400">+{hidden}</span>
			{/if}
		</div>

		{#if item.alts.length > PREVIEW}
			<button
				onclick={() => (expanded = !expanded)}
				class="flex cursor-pointer items-center gap-1 rounded-lg px-2.5 py-1.5 font-[Outfit] text-[11px] font-semibold transition-all duration-200"
				style="border: 1px solid {expanded ? '#1c1917' : '#e7e5e4'}; background: {expanded
					? '#1c1917'
					: '#fff'}; color: {expanded ? '#fff' : '#78716c'}"
			>
				{expanded ? 'Згорнути' : 'Усі'}
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
		{/if}
	</div>
</div>

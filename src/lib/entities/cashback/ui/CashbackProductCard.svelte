<script lang="ts">
	import type { CashbackProduct } from '../data';

	let {
		product,
		index = 0,
		onclick
	}: {
		product: CashbackProduct;
		index?: number;
		onclick?: (p: CashbackProduct) => void;
	} = $props();

	let hov = $state(false);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="relative animate-up cursor-pointer overflow-hidden rounded-[20px] bg-white p-[22px] px-5 transition-all duration-300"
	style="border: 1.5px solid {hov ? product.cl + '35' : '#e7e5e4'}; transform: {hov
		? 'translateY(-3px)'
		: 'none'}; box-shadow: {hov
		? `0 16px 40px ${product.cl}0a`
		: '0 1px 3px rgba(0,0,0,0.01)'}; animation-delay: {index * 0.04}s"
	onmouseenter={() => (hov = true)}
	onmouseleave={() => (hov = false)}
	onclick={() => onclick?.(product)}
>
	<div
		class="absolute -top-5 -right-5 h-[70px] w-[70px] rounded-full blur-[20px] transition-opacity duration-300"
		style="background: {product.cl}; opacity: {hov ? 0.06 : 0}"
	></div>

	<div class="relative">
		<div class="mb-3.5 flex gap-3">
			<div
				class="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] font-[Outfit] text-base font-extrabold transition-transform duration-300"
				style="background: {product.cl}0c; color: {product.cl}; border: 2px solid {product.cl}14; transform: {hov
					? 'scale(1.08) rotate(-3deg)'
					: 'none'}"
			>
				{product.L}
			</div>
			<div class="flex-1">
				<div class="mb-0.5 flex items-center gap-1.5">
					<span class="text-[15px] font-extrabold tracking-tight">{product.name}</span>
				</div>
				<div class="text-[11px] text-stone-400">{product.brand}</div>
			</div>
		</div>

		<div
			class="flex items-center justify-between rounded-xl border border-stone-100 bg-stone-50 p-2.5 px-3"
		>
			<div class="flex items-center gap-1.5">
				<span class="text-[11px] text-stone-500">{product.cat}</span>
				<span class="h-[3px] w-[3px] rounded-full bg-stone-300"></span>
				<span class="text-[11px] text-stone-500">📍 {product.origin}</span>
			</div>
			<span
				class="rounded-full border border-green-200 bg-green-50 px-2.5 py-[3px] font-mono text-xs font-bold text-green-600 transition-transform duration-200"
				style="transform: {hov ? 'scale(1.06)' : 'none'}">−{product.pct}%</span
			>
		</div>

		{#if product.v}
			<div
				class="mt-2.5 flex items-center gap-1 transition-opacity duration-300"
				style="opacity: {hov ? 1 : 0.4}"
			>
				<svg width="12" height="12" viewBox="0 0 24 24" fill="#059669">
					<path
						d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
					/>
				</svg>
				<span class="text-[10px] font-semibold text-green-600">Верифіковано</span>
			</div>
		{/if}
	</div>
</div>

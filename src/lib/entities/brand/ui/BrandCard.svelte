<script lang="ts">
	import type { Brand } from '../data';

	let {
		brand,
		index = 0,
		variant = 'featured',
		onclick
	}: {
		brand: Brand;
		index?: number;
		variant?: 'featured' | 'compact';
		onclick?: () => void;
	} = $props();

	let hov = $state(false);
	let expanded = $state(false);
</script>

{#if variant === 'featured'}
	<!-- Featured large card -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="relative animate-up cursor-pointer overflow-hidden rounded-3xl bg-white transition-all duration-400"
		style="border: 1.5px solid {hov ? brand.cl + '30' : '#e7e5e4'}; transform: {hov
			? 'translateY(-5px)'
			: 'none'}; box-shadow: {hov
			? `0 24px 56px ${brand.cl}0a`
			: '0 1px 3px rgba(0,0,0,0.01)'}; animation-delay: {index * 0.08}s"
		onmouseenter={() => (hov = true)}
		onmouseleave={() => (hov = false)}
		{onclick}
	>
		<div
			class="h-1 transition-opacity duration-400"
			style="background: linear-gradient(90deg, {brand.cl}, {brand.cl}60); opacity: {hov ? 1 : 0.2}"
		></div>
		<div
			class="absolute -top-[30px] -right-[30px] h-[120px] w-[120px] rounded-full blur-[30px] transition-opacity duration-400"
			style="background: {brand.cl}; opacity: {hov ? 0.06 : 0}"
		></div>

		<div class="p-7 pb-3.5">
			<div class="relative flex gap-[18px]">
				<div
					class="grid h-16 w-16 shrink-0 place-items-center rounded-[18px] font-[Outfit] text-[26px] font-extrabold transition-transform duration-350"
					style="background: {brand.cl}0a; color: {brand.cl}; border: 2px solid {brand.cl}14; transform: {hov
						? 'scale(1.1) rotate(-3deg)'
						: 'none'}"
				>
					{brand.L}
				</div>
				<div class="flex-1">
					<div class="mb-1 flex items-center gap-2">
						<span class="text-xl font-extrabold tracking-tight">{brand.name}</span>
						<span
							class="rounded-full px-2 py-0.5 text-[10px] font-bold"
							style="background: {brand.cl}0c; color: {brand.cl}; border: 1px solid {brand.cl}18"
							>{brand.tag}</span
						>
					</div>
					<div class="mb-2 flex items-center gap-2">
						<span class="text-[11px] font-semibold text-stone-400">{brand.cat}</span>
						<span class="h-[3px] w-[3px] rounded-full bg-stone-300"></span>
						<span class="font-mono text-[11px] font-bold text-stone-600">{brand.users} users</span>
					</div>
					<p class="text-[13px] leading-[1.55] text-stone-600">{brand.d}</p>
				</div>
			</div>
		</div>

		<!-- Expand toggle -->
		<div class="px-7 pb-1.5">
			<button
				class="flex cursor-pointer items-center gap-1 border-none bg-transparent py-2 font-[Outfit] text-xs font-semibold transition-all duration-200"
				style="color: {brand.cl}"
				onclick={(e) => {
					e.stopPropagation();
					expanded = !expanded;
				}}
			>
				{expanded ? 'Менше' : 'Детальніше'}
				<svg
					width="10"
					height="10"
					viewBox="0 0 20 20"
					style="transition: transform 0.3s; transform: {expanded ? 'rotate(180deg)' : 'none'}"
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
		<div
			class="overflow-hidden transition-all duration-400"
			style="max-height: {expanded ? '200px' : '0'}; opacity: {expanded ? 1 : 0}"
		>
			<div class="px-7 pb-5">
				<div class="mb-3 flex gap-2">
					{#each ['Надійний', 'Інноваційний', 'Глобальний'] as t (t)}
						<span
							class="rounded-lg bg-stone-100 px-2.5 py-[3px] text-[10px] font-semibold text-stone-600"
							>{t}</span
						>
					{/each}
				</div>
				<div class="flex gap-3">
					{#each [{ v: brand.users, l: 'Користувачів' }, { v: '★ 4.8', l: 'Рейтинг', green: true }, { v: '🇺🇦', l: 'Зроблено в UA' }] as stat (stat)}
						<div class="flex-1 rounded-xl border border-stone-100 bg-stone-50 p-3 px-3.5">
							<div class="font-mono text-base font-extrabold" class:text-green-600={stat.green}>
								{stat.v}
							</div>
							<div class="text-[10px] text-stone-400">{stat.l}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{:else}
	<!-- Compact card -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="animate-up cursor-pointer rounded-[18px] bg-white p-6 px-[22px] transition-all duration-300"
		style="border: 1.5px solid {hov ? brand.cl + '28' : '#e7e5e4'}; transform: {hov
			? 'translateY(-3px)'
			: 'none'}; box-shadow: {hov ? `0 12px 32px ${brand.cl}08` : 'none'}; animation-delay: {index *
			0.05}s"
		onmouseenter={() => (hov = true)}
		onmouseleave={() => (hov = false)}
		{onclick}
	>
		<div class="flex gap-3.5">
			<div
				class="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] font-[Outfit] text-xl font-extrabold transition-transform duration-300"
				style="background: {brand.cl}0a; color: {brand.cl}; border: 1.5px solid {brand.cl}14; transform: {hov
					? 'scale(1.08) rotate(-2deg)'
					: 'none'}"
			>
				{brand.L}
			</div>
			<div class="flex-1">
				<div class="mb-1 flex items-center gap-1.5">
					<span class="text-base font-extrabold tracking-tight">{brand.name}</span>
					<span
						class="rounded-full px-1.5 py-0.5 text-[9px] font-bold"
						style="background: {brand.cl}0c; color: {brand.cl}">{brand.tag}</span
					>
				</div>
				<p class="mb-2.5 text-xs leading-[1.45] text-stone-500">{brand.d}</p>
				<div class="flex items-center gap-2">
					<span class="font-mono text-[13px] font-bold text-stone-900">{brand.users}</span>
					<span class="text-[10px] text-stone-400">users</span>
					<span
						class="ml-auto text-[11px] font-bold transition-all duration-300"
						style="color: {brand.cl}; opacity: {hov ? 1 : 0}; transform: {hov
							? 'translateX(0)'
							: 'translateX(-6px)'}">→</span
					>
				</div>
			</div>
		</div>
	</div>
{/if}

<script lang="ts">
	import type { AlternativeSearchItem } from '../types';

	let {
		alternatives = [],
		loading = false,
		error = null,
		message = null
	}: {
		alternatives?: AlternativeSearchItem[];
		loading?: boolean;
		error?: string | null;
		message?: string | null;
	} = $props();

	const COLORS = ['#2563eb', '#7c3aed', '#059669', '#d97706', '#0891b2', '#be185d'];

	function colorFor(name: string): string {
		let hash = 0;
		for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
		return COLORS[Math.abs(hash) % COLORS.length];
	}

	function safeUrl(url: string): string {
		if (!url) return '#';
		if (url.startsWith('http://') || url.startsWith('https://')) return url;
		return `https://${url}`;
	}
</script>

{#if loading}
	<div class="flex flex-col gap-3">
		{#each [0, 1, 2] as i (i)}
			<div
				class="animate-scale-in rounded-2xl border border-stone-200 bg-white p-5"
				style="animation-delay: {i * 0.07}s"
			>
				<div class="flex items-start gap-4">
					<div class="h-12 w-12 flex-shrink-0 animate-grad rounded-xl bg-stone-100"></div>
					<div class="flex-1 space-y-2.5">
						<div class="h-4 w-1/3 animate-grad rounded-full bg-stone-100"></div>
						<div class="h-3 w-full animate-grad rounded-full bg-stone-100"></div>
						<div class="h-3 w-2/3 animate-grad rounded-full bg-stone-100"></div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{:else if error}
	<div class="animate-scale-in rounded-3xl border border-red-100 bg-red-50 px-6 py-12 text-center">
		<div class="mb-3 text-4xl">⚠️</div>
		<h3 class="mb-1 text-base font-extrabold text-red-700">Помилка пошуку</h3>
		<p class="text-sm text-red-500">{error}</p>
	</div>
{:else if message && (!alternatives || alternatives.length === 0)}
	<div class="animate-scale-in rounded-3xl border border-stone-200 bg-white px-6 py-12 text-center">
		<div class="mb-3 animate-float text-4xl">🔍</div>
		<h3 class="mb-1 text-base font-extrabold">Нічого не знайдено</h3>
		<p class="mx-auto max-w-xs text-sm text-stone-500">{message}</p>
	</div>
{:else if alternatives && alternatives.length > 0}
	<div class="flex flex-col gap-3">
		{#each alternatives as alt, i (alt.name)}
			{@const color = colorFor(alt.name)}
			<a
				href={safeUrl(alt.url)}
				target="_blank"
				rel="noopener noreferrer"
				class="group flex animate-up items-start gap-4 rounded-2xl border border-stone-200 bg-white p-5 no-underline shadow-[0_2px_12px_#00000006] transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-[0_8px_32px_#00000010]"
				style="animation-delay: {i * 0.06}s"
			>
				<div
					class="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl font-[Outfit] text-lg font-extrabold transition-transform duration-200 group-hover:scale-105"
					style="background: {color}0d; color: {color}; border: 1.5px solid {color}20"
				>
					{alt.name.charAt(0).toUpperCase()}
				</div>
				<div class="min-w-0 flex-1">
					<div class="mb-1 flex flex-wrap items-center gap-2">
						<span class="text-sm font-bold text-stone-900">{alt.name}</span>
						{#if alt.country}
							<span
								class="rounded-full bg-stone-100 px-2 py-0.5 font-[JetBrains_Mono] text-[10px] font-medium text-stone-500"
							>
								{alt.country}
							</span>
						{/if}
					</div>
					{#if alt.description}
						<p class="text-xs text-stone-500">{alt.description}</p>
					{/if}
				</div>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					class="mt-0.5 flex-shrink-0 text-stone-300 transition-colors duration-150 group-hover:text-stone-500"
				>
					<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
					<polyline points="15 3 21 3 21 9" />
					<line x1="10" y1="14" x2="21" y2="3" />
				</svg>
			</a>
		{/each}
	</div>
{/if}

<script lang="ts">
	import SearchBar from '$lib/features/search/SearchBar.svelte';
	import type { Category } from '$lib/entities/category';

	let {
		query = $bindable(''),
		onSearch,
		categories = [],
		alternativesTotal = null
	}: {
		query: string;
		onSearch: (q: string) => void;
		categories?: Category[];
		alternativesTotal?: number | null;
	} = $props();

	const quickCats = $derived(categories.slice(0, 6));

	const orbitIcons = ['💬', '🌐', '🔒', '📄', '🎬', '🚕'];
	const hasAlternatives = !!alternativesTotal;
</script>

<section
	class="relative overflow-hidden bg-[#fafaf9] px-4 pt-16 pb-10 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-5"
>
	<!-- Floating gradient orbs -->
	<div
		class="pointer-events-none absolute -top-32 -left-32 h-[400px] w-[400px] animate-wave-float rounded-full opacity-20 blur-3xl"
		style="background: radial-gradient(circle, #0057B7, transparent)"
	></div>
	<div
		class="pointer-events-none absolute -right-24 -bottom-24 h-[350px] w-[350px] animate-wave-float rounded-full opacity-15 blur-3xl"
		style="background: radial-gradient(circle, #FFD700, transparent); animation-delay: 4s"
	></div>
	<div
		class="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-wave-float rounded-full opacity-10 blur-3xl"
		style="background: radial-gradient(circle, #7c3aed, transparent); animation-delay: 8s"
	></div>

	<!-- Orbiting icons -->
	<div class="pointer-events-none absolute top-1/2 left-1/2 hidden h-0 w-0 lg:block">
		{#each orbitIcons as icon, i (icon)}
			<span
				class="absolute text-2xl opacity-20"
				style="animation: orbit{(i % 3) + 1} {18 + i * 4}s linear infinite; animation-delay: {i *
					2}s"
			>
				{icon}
			</span>
		{/each}
	</div>

	<div class="relative z-10 mx-auto max-w-3xl text-center">
		<!-- Badge -->
		<div
			class="mb-6 inline-flex animate-up items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 shadow-sm"
		>
			<span class="relative flex h-2 w-2">
				<span
					class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
				></span>
				<span class="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
			</span>
			<span class="font-[JetBrains_Mono] text-[11px] font-medium text-stone-500">
				{alternativesTotal || 0} альтернатив
			</span>
		</div>

		<!-- Title -->
		<h1
			class="mb-4 animate-up font-[Outfit] text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
			style="animation-delay: 0.1s"
		>
			Заміни
			<span class="relative inline-block text-stone-900">
				ворожe
				<svg
					aria-hidden="true"
					class="absolute left-0 w-full overflow-visible"
					style="bottom: -7px; height: 12px"
					viewBox="0 0 200 12"
					preserveAspectRatio="none"
				>
					<path
						d="M0 8 Q25 2 50 8 Q75 14 100 8 Q125 2 150 8 Q175 14 200 8"
						stroke="#dc2626"
						stroke-width="4"
						fill="none"
						stroke-linecap="round"
						class="wave-underline"
					/>
				</svg>
			</span>
			на
			<span
				class="bg-clip-text text-5xl sm:text-7xl text-transparent"
				style="background-image: linear-gradient(90deg, #0057B7, #2f7df0, #d9a400, #c98a00, #d9a400, #2f7df0, #0057B7); background-size: 300% auto; animation: grad 35s ease infinite"
			>
				наше
			</span>
		</h1>

		<!-- Subtitle -->
		<p
			class="mx-auto mb-8 max-w-lg animate-up font-[Outfit] text-base text-stone-500 sm:text-lg"
			style="animation-delay: 0.15s"
		>
			Знайди українські та світові альтернативи ворожим продуктам
		</p>

		<!-- Search Bar -->
		<div class="relative z-[1000]! mx-auto mb-3 max-w-xl animate-up" style="animation-delay: 0.2s">
			<SearchBar bind:query big onGo={onSearch} />
		</div>

		<!-- Quick categories -->
		<div class="flex animate-up flex-wrap justify-center gap-2" style="animation-delay: 0.25s">
			{#each quickCats as c (c.id)}
				<a
					href="/catalog?cat={encodeURIComponent(c.title)}"
					class="flex cursor-pointer items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3.5 py-2 font-[Outfit] text-xs font-semibold text-stone-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-md"
				>
					<span>{c.icon}</span>
					<span>{c.title}</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.wave-underline {
		stroke-dasharray: 240;
		stroke-dashoffset: 240;
		animation:
			draw-wave 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards,
			pulse-wave 2.2s ease-in-out 1.4s infinite;
	}

	@keyframes draw-wave {
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes pulse-wave {
		0%,
		100% {
			stroke: #dc2626;
			stroke-width: 4;
			opacity: 1;
		}
		50% {
			stroke: #ef4444;
			stroke-width: 5.5;
			opacity: 0.75;
		}
	}
</style>

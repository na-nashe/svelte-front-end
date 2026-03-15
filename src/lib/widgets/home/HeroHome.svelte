<script lang="ts">
	import SearchBar from '$lib/features/search/SearchBar.svelte';
	import { CATS } from '$lib/entities/product/data';

	let {
		query = $bindable(''),
		onSearch
	}: {
		query: string;
		onSearch: (q: string) => void;
	} = $props();

	const quickCats = CATS.slice(0, 6);

	const stats = [
		{ value: '847', label: 'альтернатив', icon: '🔄' },
		{ value: '12K+', label: 'відгуків', icon: '✍️' },
		{ value: '45K+', label: 'користувачів', icon: '👥' }
	];

	const orbitIcons = ['💬', '🌐', '🔒', '📄', '🎬', '🚕'];
</script>

<section class="relative overflow-hidden bg-[#fafaf9] px-4 pt-24 pb-16 sm:pt-32 sm:pb-24">
	<!-- Floating gradient orbs -->
	<div
		class="animate-wave-float pointer-events-none absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full opacity-20 blur-3xl"
		style="background: radial-gradient(circle, #0057B7, transparent)"
	></div>
	<div
		class="animate-wave-float pointer-events-none absolute -right-24 -bottom-24 h-[350px] w-[350px] rounded-full opacity-15 blur-3xl"
		style="background: radial-gradient(circle, #FFD700, transparent); animation-delay: 4s"
	></div>
	<div
		class="animate-wave-float pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl"
		style="background: radial-gradient(circle, #7c3aed, transparent); animation-delay: 8s"
	></div>

	<!-- Orbiting icons -->
	<div class="pointer-events-none absolute top-1/2 left-1/2 hidden h-0 w-0 lg:block">
		{#each orbitIcons as icon, i (icon)}
			<span
				class="absolute text-2xl opacity-20"
				style="animation: orbit{(i % 3) + 1} {18 + i * 4}s linear infinite; animation-delay: {i * 2}s"
			>
				{icon}
			</span>
		{/each}
	</div>

	<div class="relative z-10 mx-auto max-w-3xl text-center">
		<!-- Badge -->
		<div class="animate-up mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 shadow-sm">
			<span class="relative flex h-2 w-2">
				<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
				<span class="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
			</span>
			<span class="font-[JetBrains_Mono] text-[11px] font-medium text-stone-500">
				847 альтернатив · Оновлено сьогодні
			</span>
		</div>

		<!-- Title -->
		<h1 class="animate-up mb-4 font-[Outfit] text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl" style="animation-delay: 0.1s">
			Заміни
			<span class="bg-gradient-to-r from-[#0057B7] via-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">
				ворожe
			</span>
			на наше
		</h1>

		<!-- Subtitle -->
		<p class="animate-up mx-auto mb-8 max-w-lg font-[Outfit] text-base text-stone-500 sm:text-lg" style="animation-delay: 0.15s">
			Знайди українські та світові альтернативи ворожим продуктам
		</p>

		<!-- Search Bar -->
		<div class="animate-up mx-auto mb-8 max-w-xl" style="animation-delay: 0.2s">
			<SearchBar bind:query big onGo={onSearch} />
		</div>

		<!-- Quick categories -->
		<div class="animate-up mb-10 flex flex-wrap justify-center gap-2" style="animation-delay: 0.25s">
			{#each quickCats as c (c.slug)}
				<button
					onclick={() => {
						query = c.name;
						onSearch(c.name);
					}}
					class="flex cursor-pointer items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3.5 py-2 font-[Outfit] text-xs font-semibold text-stone-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-md"
				>
					<span>{c.icon}</span>
					<span>{c.name}</span>
				</button>
			{/each}
		</div>

		<!-- Stats row -->
		<div class="animate-up flex justify-center gap-8 sm:gap-12" style="animation-delay: 0.3s">
			{#each stats as stat (stat.label)}
				<div class="text-center">
					<div class="flex items-center justify-center gap-1">
						<span class="text-sm">{stat.icon}</span>
						<span class="font-[Outfit] text-xl font-extrabold text-stone-900 sm:text-2xl">{stat.value}</span>
					</div>
					<span class="font-[Outfit] text-xs text-stone-400">{stat.label}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

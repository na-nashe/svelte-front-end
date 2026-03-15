<script lang="ts">
	import { ITEMS, CATS } from '$lib/entities/product/data';

	const totalProducts = ITEMS.length;
	const totalAlts = ITEMS.reduce((s, it) => s + it.alts.length, 0);
	const totalCats = CATS.length;

	const topAlts = ITEMS.flatMap((it) =>
		it.alts.map((a) => ({ ...a, from: it.orig, ff: it.flag }))
	)
		.sort((a, b) => b.ratio - a.ratio)
		.slice(0, 5);

	const stats = [
		{ value: totalProducts, label: 'продуктів', icon: '📦' },
		{ value: totalAlts, label: 'альтернатив', icon: '🔄' },
		{ value: totalCats, label: 'категорій', icon: '📂' }
	];
</script>

<section class="relative overflow-hidden rounded-b-[36px] bg-[#1c1917] px-4 pt-24 pb-6 sm:pt-32 sm:pb-10">
	<!-- Dot grid pattern -->
	<div
		class="pointer-events-none absolute inset-0"
		style="background-image: radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px); background-size: 24px 24px;"
	></div>

	<!-- Floating orbs -->
	<div
		class="animate-wave-float pointer-events-none absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full opacity-20 blur-3xl"
		style="background: radial-gradient(circle, #0057B7, transparent)"
	></div>
	<div
		class="animate-wave-float pointer-events-none absolute -right-24 -bottom-24 h-[350px] w-[350px] rounded-full opacity-15 blur-3xl"
		style="background: radial-gradient(circle, #FFD700, transparent); animation-delay: 4s"
	></div>

	<div class="relative z-10 mx-auto max-w-6xl">
		<!-- Main content grid -->
		<div class="mb-10 grid items-center gap-10 lg:grid-cols-2">
			<!-- Left: Title area -->
			<div>
				<!-- Badge -->
				<div class="animate-up mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
					<span class="relative flex h-2 w-2">
						<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
						<span class="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
					</span>
					<span class="font-[JetBrains_Mono] text-[11px] font-medium text-stone-400">
						Оновлено сьогодні
					</span>
				</div>

				<h1 class="animate-up mb-4 font-[Outfit] text-4xl font-extrabold tracking-tight text-white sm:text-5xl" style="animation-delay: 0.1s">
					Каталог
					<span class="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
						альтернатив
					</span>
				</h1>

				<p class="animate-up max-w-md font-[Outfit] text-base text-stone-400" style="animation-delay: 0.15s">
					Повний перелік перевірених замін ворожим сервісам та продуктам. Обирай свідомо.
				</p>
			</div>

			<!-- Right: Stats -->
			<div class="animate-up flex flex-wrap justify-center gap-4 lg:justify-end" style="animation-delay: 0.2s">
				{#each stats as stat (stat.label)}
					<div class="flex min-w-[140px] flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-sm">
						<span class="mb-1 text-2xl">{stat.icon}</span>
						<span class="font-[Outfit] text-3xl font-extrabold text-white">{stat.value}</span>
						<span class="font-[Outfit] text-xs text-stone-400">{stat.label}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Bottom: Top alternatives strip -->
		<div class="animate-up rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm" style="animation-delay: 0.3s">
			<div class="mb-3 flex items-center gap-2">
				<span class="text-sm">🏆</span>
				<span class="font-[Outfit] text-xs font-semibold tracking-wide text-stone-400 uppercase">Найкращі альтернативи</span>
			</div>

			<div class="grid gap-3 sm:grid-cols-5">
				{#each topAlts as alt (alt.name)}
					<div class="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-3 py-2.5 transition-all duration-200 hover:bg-white/10">
						<div
							class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-[Outfit] text-xs font-bold text-white"
							style="background-color: {alt.cl}"
						>
							{alt.L}
						</div>
						<div class="min-w-0 flex-1">
							<div class="flex items-center gap-1">
								<span class="truncate font-[Outfit] text-sm font-semibold text-white">{alt.name}</span>
								<span class="text-xs">{alt.c2}</span>
							</div>
							<div class="truncate font-[Outfit] text-[10px] text-stone-500">замість {alt.from} {alt.ff}</div>
						</div>
						<span class="font-[JetBrains_Mono] text-xs font-bold text-green-400">{alt.ratio}%</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

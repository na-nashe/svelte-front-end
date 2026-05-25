<script lang="ts">
	import type { Product } from '$lib/entities/product/data';

	let {
		categoriesCount = 0,
		items = [] as Product[]
	}: {
		categoriesCount?: number;
		items?: Product[];
	} = $props();

	const totalProducts = $derived(items.length);
	const totalAlts = $derived(items.reduce((s, it) => s + it.alts.length, 0));

	const stats = $derived([
		{ value: totalProducts, label: 'продуктів', icon: '📦' },
		{ value: totalAlts, label: 'альтернатив', icon: '🔄' },
		{ value: categoriesCount, label: 'категорій', icon: '📂' }
	]);

	const topAlts = $derived(
		items.flatMap((it) => it.alts.map((a) => ({ ...a, from: it.orig, ff: it.flag }))).slice(0, 5)
	);

	const prLabel: Record<string, string> = {
		free: 'Безкоштовно',
		freemium: 'Freemium',
		paid: 'Платно'
	};
</script>

<section
	class="hero-catalog relative overflow-hidden rounded-b-[36px] px-4 pt-24 pb-6 sm:pt-32 sm:pb-10"
>
	<!-- Top accent strip: Ukrainian flag inspired -->
	<div class="ua-strip pointer-events-none absolute inset-x-0 top-0 h-[3px]"></div>

	<!-- Dot grid pattern -->
	<div
		class="pointer-events-none absolute inset-0 opacity-60"
		style="background-image: radial-gradient(circle, rgba(255,215,0,0.04) 1px, transparent 1px); background-size: 24px 24px;"
	></div>

	<!-- Animated mesh gradient orbs -->
	<div
		class="pointer-events-none absolute -top-32 -left-32 h-[460px] w-[460px] animate-wave-float rounded-full opacity-30 blur-3xl"
		style="background: radial-gradient(circle, #0057B7 0%, rgba(0,87,183,0.4) 40%, transparent 70%)"
	></div>
	<div
		class="pointer-events-none absolute -right-24 -bottom-24 h-[380px] w-[380px] animate-wave-float rounded-full opacity-25 blur-3xl"
		style="background: radial-gradient(circle, #FFD700 0%, rgba(255,215,0,0.3) 40%, transparent 70%); animation-delay: 4s"
	></div>
	<div
		class="pointer-events-none absolute top-1/3 left-1/2 h-[300px] w-[300px] -translate-x-1/2 animate-wave-float rounded-full opacity-15 blur-3xl"
		style="background: radial-gradient(circle, #FFA500, transparent); animation-delay: 8s"
	></div>

	<div class="relative z-10 mx-auto max-w-6xl">
		<!-- Main content grid -->
		<div class="mb-10 grid items-center gap-10 lg:grid-cols-2">
			<!-- Left: Title area -->
			<div>
				<!-- Badge -->
				<div
					class="badge mb-5 inline-flex animate-up items-center gap-2 rounded-full border border-[#FFD700]/20 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
				>
					<span class="relative flex h-2 w-2">
						<span
							class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFD700] opacity-75"
						></span>
						<span class="relative inline-flex h-2 w-2 rounded-full bg-[#FFD700]"></span>
					</span>
					<span
						class="font-[JetBrains_Mono] text-[10px] font-medium tracking-wider text-[#FFD700]/90 uppercase"
					>
						Слава Україні
					</span>
				</div>

				<h1
					class="mb-4 animate-up font-[Outfit] text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
					style="animation-delay: 0.1s"
				>
					Каталог
					<span class="title-gradient bg-clip-text text-transparent"> альтернатив </span>
				</h1>

				<p
					class="max-w-md animate-up font-[Outfit] text-base text-stone-300/80"
					style="animation-delay: 0.15s"
				>
					Повний перелік перевірених замін ворожим сервісам та продуктам.
					<span class="text-[#FFD700]/90">Обирай свідомо.</span>
				</p>
			</div>

			<!-- Right: Stats -->
			<div
				class="flex animate-up flex-wrap justify-center gap-4 lg:justify-end"
				style="animation-delay: 0.2s"
			>
				{#each stats as stat, i (stat.label)}
					<div
						class="stat-card group relative flex min-w-[140px] flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#FFD700]/30 hover:bg-white/[0.08]"
						style="animation-delay: {0.2 + i * 0.08}s"
					>
						<span
							class="stat-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
						></span>
						<span
							class="relative mb-1 text-2xl transition-transform duration-500 ease-out group-hover:scale-110"
							>{stat.icon}</span
						>
						<span
							class="relative font-[Outfit] text-3xl font-extrabold text-white transition-colors duration-300 group-hover:text-[#FFD700]"
							>{stat.value}</span
						>
						<span class="relative font-[Outfit] text-xs text-stone-400">{stat.label}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Bottom: Top alternatives strip -->
		{#if topAlts.length > 0}
			<div
				class="animate-up rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm"
				style="animation-delay: 0.3s"
			>
				<div class="mb-3 flex items-center gap-2">
					<span class="text-sm">🔄</span>
					<span
						class="font-[Outfit] text-xs font-semibold tracking-wide text-[#FFD700]/80 uppercase"
						>Альтернативи</span
					>
				</div>

				<div class="grid gap-3">
					{#each topAlts as alt, i (alt.name)}
						<div
							class="alt-row group relative flex items-center gap-3 overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5 transition-all duration-300 ease-out hover:translate-x-1 hover:border-[#FFD700]/25 hover:bg-white/[0.08]"
							style="animation: up 0.4s ease both; animation-delay: {0.35 + i * 0.05}s"
						>
							<span
								class="alt-accent absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100"
							></span>
							<div
								class="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-[Outfit] text-xs font-bold text-white shadow-lg transition-transform duration-300 ease-out group-hover:scale-105"
								style="background-color: {alt.cl}"
							>
								{alt.L}
							</div>
							<div class="relative min-w-0 flex-1">
								<div class="flex items-center gap-1">
									<span
										class="truncate font-[Outfit] text-sm font-semibold text-white transition-colors duration-300 group-hover:text-[#FFD700]"
										>{alt.name}</span
									>
									<span class="text-xs text-white">{alt.c2}</span>
								</div>
								<div class="truncate font-[Outfit] text-[10px] text-stone-400">
									замість {alt.from}
									{alt.ff}
								</div>
							</div>
							<span class="relative font-[JetBrains_Mono] text-[9px] font-bold text-green-400"
								>{prLabel[alt.pr] ?? alt.pr}</span
							>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	.hero-catalog {
		background:
			radial-gradient(ellipse at top left, rgba(0, 87, 183, 0.18), transparent 55%),
			radial-gradient(ellipse at bottom right, rgba(255, 215, 0, 0.08), transparent 55%),
			linear-gradient(180deg, #0a1428 0%, #0f1a2e 50%, #0a1019 100%);
	}

	.ua-strip {
		background: linear-gradient(
			90deg,
			transparent 0%,
			#0057b7 20%,
			#0057b7 45%,
			#ffd700 55%,
			#ffd700 80%,
			transparent 100%
		);
		background-size: 200% 100%;
		animation: stripSweep 8s ease-in-out infinite;
	}

	@keyframes stripSweep {
		0%,
		100% {
			background-position: 0% 0;
			opacity: 0.7;
		}
		50% {
			background-position: 100% 0;
			opacity: 1;
		}
	}

	.title-gradient {
		background-image: linear-gradient(
			90deg,
			#ffd700 0%,
			#ffa500 25%,
			#ffd700 50%,
			#4d8fe3 75%,
			#0057b7 100%
		);
		background-size: 200% auto;
		animation: titleSweep 6s ease-in-out infinite;
	}

	@keyframes titleSweep {
		0%,
		100% {
			background-position: 0% center;
		}
		50% {
			background-position: 100% center;
		}
	}

	.stat-card {
		animation: up 0.4s ease both;
	}

	.stat-glow {
		background: radial-gradient(circle at 50% 0%, rgba(255, 215, 0, 0.18), transparent 70%);
	}

	.alt-accent {
		background: linear-gradient(180deg, #ffd700, #0057b7);
	}

	.badge {
		position: relative;
	}

	.badge::before {
		content: '';
		position: absolute;
		inset: -1px;
		border-radius: 9999px;
		padding: 1px;
		background: linear-gradient(
			90deg,
			rgba(0, 87, 183, 0.4),
			rgba(255, 215, 0, 0.4),
			rgba(0, 87, 183, 0.4)
		);
		background-size: 200% 100%;
		-webkit-mask:
			linear-gradient(#000 0 0) content-box,
			linear-gradient(#000 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		animation: titleSweep 5s ease-in-out infinite;
		pointer-events: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.ua-strip,
		.title-gradient,
		.badge::before {
			animation: none;
		}
	}
</style>

<script lang="ts">
	import { badges, activity } from '$lib/entities/profile/data';

	let hovBadge = $state<number | null>(null);

	const heatmapWeeks = [
		[0, 1, 0, 2, 1, 0, 0],
		[1, 2, 1, 3, 2, 0, 1],
		[0, 0, 1, 1, 0, 0, 0],
		[2, 3, 2, 4, 3, 1, 2],
		[1, 1, 0, 2, 1, 0, 0],
		[3, 4, 3, 4, 2, 1, 3],
		[2, 2, 1, 3, 2, 0, 1],
		[1, 3, 2, 4, 3, 1, 2],
		[0, 1, 1, 2, 1, 0, 0],
		[2, 3, 3, 4, 4, 2, 3],
		[3, 4, 2, 3, 2, 1, 2],
		[4, 3, 4, 4, 3, 2, 4]
	];
	const heatColors = ['#f5f5f4', '#bbf7d0', '#4ade80', '#16a34a', '#166534'];

	const impactStats = [
		{ v: '12', l: 'переходів на UA', ic: '🔄', acl: '#4ade80' },
		{ v: '47', l: 'відгуків написано', ic: '✍️', acl: '#fbbf24' },
		{ v: '₴2.4K', l: 'збережено на UA', ic: '💰', acl: '#60a5fa' }
	];
</script>

<div>
	<!-- Streak + Heatmap row -->
	<div class="mb-7 grid grid-cols-[220px_1fr] gap-4">
		<!-- Streak card -->
		<div
			class="relative flex animate-scale-in flex-col items-center justify-center overflow-hidden rounded-[22px] border-[1.5px] border-stone-200 bg-white px-5 py-6 text-center"
		>
			<div
				class="pointer-events-none absolute -top-5 -right-5 h-20 w-20 rounded-full bg-amber-500 opacity-[0.06] blur-[20px]"
			></div>
			<div
				class="mb-2 animate-float text-5xl"
				style="filter: drop-shadow(0 4px 12px rgba(245,158,11,0.25))"
			>
				🔥
			</div>
			<div
				class="font-mono text-4xl font-black tracking-tight text-stone-900"
				style="line-height: 1"
			>
				31
			</div>
			<div class="mt-1 mb-3 text-xs font-semibold text-stone-500">день поспіль</div>
			<div class="h-1 w-full overflow-hidden rounded-sm bg-stone-100">
				<div
					class="h-full w-[88%] rounded-sm"
					style="background: linear-gradient(90deg, #f59e0b, #ef4444)"
				></div>
			</div>
			<div class="mt-1.5 text-[10px] text-stone-400">До рекорду (35): 4 дні</div>
		</div>

		<!-- Contribution heatmap -->
		<div
			class="animate-slide-r rounded-[22px] border-[1.5px] border-stone-200 bg-white px-6 py-5"
			style="animation-delay: 0.1s"
		>
			<div class="mb-3.5 flex items-center justify-between">
				<div class="text-[13px] font-extrabold">📅 Активність за 12 тижнів</div>
				<div class="flex items-center gap-1 text-[10px] text-stone-400">
					<span>Менше</span>
					{#each [0, 1, 2, 3, 4] as l (l)}
						<div class="h-2.5 w-2.5 rounded-[3px]" style="background: {heatColors[l]}"></div>
					{/each}
					<span>Більше</span>
				</div>
			</div>
			<div class="flex gap-[3px]">
				{#each heatmapWeeks as week, w (w)}
					<div class="flex flex-col gap-[3px]">
						{#each week as v, d (d)}
							<div
								class="h-3.5 w-3.5 cursor-default rounded-[3px] transition-all duration-200 hover:scale-[1.3] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
								style="background: {heatColors[v]}"
							></div>
						{/each}
					</div>
				{/each}
			</div>
			<div class="mt-2.5 flex justify-between font-mono text-[10px] text-stone-400">
				<span>9 тижнів тому</span><span>Цей тиждень</span>
			</div>
		</div>
	</div>

	<!-- Badges + Impact + Activity -->
	<div class="flex flex-wrap items-start gap-6">
		<div class="min-w-[400px] flex-[1_1_400px]">
			<!-- Badges -->
			<div class="mb-4 flex items-center justify-between">
				<h3 class="flex items-center gap-2 text-[17px] font-extrabold">
					🏆 Бейджі
					<span
						class="rounded-full bg-stone-100 px-2 py-0.5 font-mono text-[10px] font-semibold text-stone-400"
						>{badges.filter((b) => b.earned).length}/{badges.length}</span
					>
				</h3>
				<div class="text-[11px] text-stone-400">
					Наступний: <strong class="text-stone-900">Легенда</strong>
				</div>
			</div>
			<div class="mb-7 grid grid-cols-3 gap-2.5">
				{#each badges as b, i (b.n)}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="relative animate-scale-in overflow-hidden rounded-[20px] px-3.5 py-6 text-center transition-all duration-[350ms]"
						style="
							background: {b.earned ? '#fff' : '#fafaf9'};
							border: 1.5px {b.earned ? 'solid' : 'dashed'} {hovBadge === i && b.earned
							? '#0057B725'
							: b.earned
								? '#e7e5e4'
								: '#d6d3d1'};
							opacity: {b.earned ? 1 : 0.4};
							animation-delay: {i * 0.06}s;
							transform: {hovBadge === i && b.earned ? 'translateY(-5px) scale(1.04)' : 'none'};
							box-shadow: {hovBadge === i && b.earned ? '0 16px 40px rgba(0,0,0,0.03)' : 'none'};
							cursor: default;
						"
						onmouseenter={() => (hovBadge = i)}
						onmouseleave={() => (hovBadge = null)}
					>
						{#if hovBadge === i && b.earned}
							<div
								class="absolute inset-0"
								style="background: radial-gradient(circle at 50% 30%, #0057B706, transparent 70%)"
							></div>
						{/if}
						<div
							class="relative mb-2.5 text-[40px] transition-transform duration-[400ms]"
							style="transform: {hovBadge === i ? 'scale(1.25) rotate(-8deg)' : 'none'}"
						>
							{b.ic}
						</div>
						<div class="relative text-[13px] font-extrabold">{b.n}</div>
						<div class="relative text-[10px] leading-snug text-stone-400">{b.d}</div>
						{#if b.earned}
							<div class="mt-2.5 flex items-center justify-center gap-1">
								<div
									class="h-1.5 w-1.5 rounded-full bg-green-600"
									style="box-shadow: 0 0 8px rgba(22,163,74,0.38)"
								></div>
								<span class="font-mono text-[9px] font-semibold text-green-600">Отримано</span>
							</div>
						{:else}
							<div class="mt-2.5">
								<div class="h-[3px] overflow-hidden rounded-sm bg-stone-200">
									<div class="h-full w-[62%] rounded-sm bg-stone-400"></div>
								</div>
								<div class="mt-1 font-mono text-[9px] font-bold text-stone-400">62%</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>

			<!-- Impact card -->
			<div
				class="relative animate-up overflow-hidden rounded-3xl px-7 py-[30px] text-white"
				style="background: linear-gradient(135deg, #0057B7 0%, #1e40af 60%, #7c3aed 100%); animation-delay: 0.3s"
			>
				<div
					class="pointer-events-none absolute -top-[30px] right-5 h-[120px] w-[120px] animate-wave-float rounded-full opacity-10 blur-[35px]"
					style="background: #FFD700"
				></div>
				<div class="relative">
					<div class="mb-5 flex items-center justify-between">
						<div class="font-mono text-[10px] font-bold tracking-widest text-[#FFD700] uppercase">
							🇺🇦 Твій внесок у перемогу
						</div>
						<div
							class="rounded-full border border-white/[0.09] bg-white/[0.06] px-2.5 py-[3px] text-[9px] font-semibold text-white/[0.67]"
						>
							Топ 5%
						</div>
					</div>
					<div class="grid grid-cols-3 gap-5">
						{#each impactStats as s, i (s.l)}
							<div class="animate-count-up text-center" style="animation-delay: {0.4 + i * 0.1}s">
								<div
									class="mx-auto mb-2.5 grid h-11 w-11 place-items-center rounded-[13px] border border-white/[0.06] bg-white/[0.05] text-xl"
								>
									{s.ic}
								</div>
								<div
									class="font-mono text-2xl font-extrabold tracking-tight"
									style="color: {s.acl}"
								>
									{s.v}
								</div>
								<div class="mt-1 text-[10px] leading-snug text-white/[0.67]">{s.l}</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- Activity timeline -->
		<div class="min-w-[300px] flex-[1_1_300px]">
			<div class="mb-4 flex items-center justify-between">
				<h3 class="text-[17px] font-extrabold">📋 Активність</h3>
				<span class="text-[11px] text-stone-400">Останні 3 тижні</span>
			</div>
			<div class="relative pl-7">
				<div
					class="absolute top-1.5 bottom-1.5 left-[11px] w-0.5 rounded-sm"
					style="background: linear-gradient(to bottom, #e7e5e4, #f5f5f4)"
				></div>
				{#each activity as a, i (a.t)}
					<div class="relative mb-1.5 animate-slide-r" style="animation-delay: {i * 0.06}s">
						<div
							class="absolute top-[18px] -left-7 z-[1] grid h-[22px] w-[22px] place-items-center rounded-full bg-white"
							style="border: 2.5px solid {a.cl}"
						>
							<div class="h-2 w-2 rounded-full" style="background: {a.cl}"></div>
						</div>
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="rounded-2xl border-[1.5px] border-stone-200 bg-white px-[18px] py-4 transition-all duration-[250ms]"
							onmouseenter={(e) => {
								e.currentTarget.style.borderColor = a.cl + '30';
								e.currentTarget.style.transform = 'translateX(6px)';
								e.currentTarget.style.boxShadow = `0 6px 20px ${a.cl}08`;
							}}
							onmouseleave={(e) => {
								e.currentTarget.style.borderColor = '#e7e5e4';
								e.currentTarget.style.transform = 'none';
								e.currentTarget.style.boxShadow = 'none';
							}}
						>
							<div class="flex items-center gap-2">
								<span class="text-[15px]">{a.ic}</span>
								<span class="text-[13px] font-semibold">{a.t}</span>
							</div>
							<div class="mt-1.5 flex items-center justify-between">
								<span class="text-[11px] text-stone-400">{a.time}</span>
								<span
									class="rounded-full px-2 py-0.5 text-[9px] font-semibold"
									style="background: {a.cl}0a; color: {a.cl}; border: 1px solid {a.cl}15"
									>+{10 + i * 5} XP</span
								>
							</div>
						</div>
					</div>
				{/each}
			</div>
			<button
				class="mt-2 w-full cursor-pointer rounded-[14px] border-[1.5px] border-stone-200 bg-white py-3 font-[Outfit] text-xs font-bold text-stone-500 transition-all duration-150 hover:bg-stone-50"
			>
				Вся історія →
			</button>
		</div>
	</div>
</div>

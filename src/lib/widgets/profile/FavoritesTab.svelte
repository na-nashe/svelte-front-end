<script lang="ts">
	import Ratio from '$lib/shared/ui/Ratio.svelte';
	import { favorites } from '$lib/entities/profile/data';

	let activeCat = $state('Усі');
	const cats = ['Усі', ...new Set(favorites.map((f) => f.cat))];
	const filtered = $derived(
		activeCat === 'Усі' ? favorites : favorites.filter((f) => f.cat === activeCat)
	);
</script>

<div>
	<div class="mb-5 flex animate-up flex-wrap gap-1.5">
		{#each cats as c (c)}
			<button
				class="cursor-pointer rounded-[10px] border border-stone-200 px-3.5 py-1.5 font-[Outfit] text-[11px] transition-all duration-150 hover:bg-stone-50"
				style="background: {activeCat === c ? '#1c1917' : '#fff'}; color: {activeCat === c
					? '#fff'
					: '#78716c'}; font-weight: {activeCat === c ? 700 : 500}"
				onclick={() => (activeCat = c)}>{c}</button
			>
		{/each}
	</div>
	<div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3.5">
		{#each filtered as f, i (f.n)}
			<a
				href="/catalog"
				class="relative animate-scale-in overflow-hidden rounded-3xl border-[1.5px] border-stone-200 bg-white no-underline transition-all duration-[350ms] hover:-translate-y-1"
				style="animation-delay: {i * 0.05}s; color: inherit"
				onmouseenter={(e) => {
					e.currentTarget.style.borderColor = f.cl + '30';
					e.currentTarget.style.boxShadow = `0 20px 44px ${f.cl}0c`;
				}}
				onmouseleave={(e) => {
					e.currentTarget.style.borderColor = '#e7e5e4';
					e.currentTarget.style.boxShadow = 'none';
				}}
			>
				<div class="h-[3px]" style="background: linear-gradient(90deg, {f.cl}, {f.cl}40)"></div>
				<div
					class="pointer-events-none absolute -top-[15px] -right-[15px] h-[70px] w-[70px] rounded-full opacity-[0.04] blur-[18px]"
					style="background: {f.cl}"
				></div>
				<div class="px-[22px] py-6">
					<div class="relative mb-[18px] flex items-center gap-3.5">
						<div
							class="grid h-14 w-14 shrink-0 place-items-center rounded-[17px] font-[Outfit] text-[22px] font-extrabold"
							style="background: {f.cl}0a; color: {f.cl}; border: 2px solid {f.cl}14"
						>
							{f.L}
						</div>
						<div>
							<div class="text-lg font-extrabold tracking-tight">{f.n}</div>
							<span
								class="rounded-md px-2 py-0.5 text-[10px] font-semibold"
								style="background: {f.cl}0a; color: {f.cl}; border: 1px solid {f.cl}12"
								>{f.cat}</span
							>
						</div>
						<div
							class="absolute top-0 right-0 cursor-pointer text-base transition-transform duration-200 hover:scale-[1.3]"
						>
							❤️
						</div>
					</div>
					<div class="rounded-2xl border border-stone-100 bg-stone-50 px-4 py-3.5">
						<div class="mb-2 flex items-center justify-between">
							<span
								class="font-mono text-[10px] font-semibold tracking-wider text-stone-400 uppercase"
								>Рейтинг</span
							>
							<Ratio value={f.ratio} big />
						</div>
						<div class="h-1.5 overflow-hidden rounded-sm bg-stone-200">
							<div
								class="h-full rounded-sm transition-[width] duration-1000"
								style="width: {f.ratio}%; background: {f.ratio >= 90
									? 'linear-gradient(90deg,#16a34a,#4ade80)'
									: f.ratio >= 70
										? 'linear-gradient(90deg,#ca8a04,#fbbf24)'
										: 'linear-gradient(90deg,#dc2626,#f87171)'}"
							></div>
						</div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>

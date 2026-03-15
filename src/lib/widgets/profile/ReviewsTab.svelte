<script lang="ts">
	import Stars from '$lib/shared/ui/Stars.svelte';
	import { reviews } from '$lib/entities/profile/data';

	const ratingDist: [number, number, string][] = [
		[5, 3, '#16a34a'],
		[4, 1, '#84cc16'],
		[3, 0, '#fbbf24'],
		[2, 0, '#f97316'],
		[1, 0, '#ef4444']
	];
</script>

<div class="flex flex-col gap-3.5">
	<!-- Review summary strip -->
	<div
		class="mb-1 flex animate-up items-center gap-4 rounded-[20px] border-[1.5px] border-stone-200 bg-white px-6 py-5"
	>
		<div class="border-r-[1.5px] border-stone-100 pr-5 text-center">
			<div class="font-mono text-4xl font-black tracking-tight text-stone-900">4.5</div>
			<div class="my-1 flex justify-center gap-0.5">
				{#each [1, 2, 3, 4, 5] as s (s)}
					<span class="text-sm" style="color: {s <= 4 ? '#fbbf24' : '#e7e5e4'}">★</span>
				{/each}
			</div>
			<div class="text-[10px] text-stone-400">{reviews.length} відгуки</div>
		</div>
		<div class="flex-1">
			{#each ratingDist as [star, count, cl], i (star)}
				<div class="flex items-center gap-2" class:mb-1={i < 4}>
					<span class="w-3 text-right font-mono text-[11px] font-semibold text-stone-400"
						>{star}</span
					>
					<span class="text-[10px] text-amber-400">★</span>
					<div class="h-1.5 flex-1 overflow-hidden rounded-sm bg-stone-100">
						<div
							class="h-full rounded-sm transition-[width] duration-800"
							style="width: {(count / reviews.length) * 100}%; background: {cl}"
						></div>
					</div>
					<span class="w-3.5 font-mono text-[10px] font-semibold text-stone-400">{count}</span>
				</div>
			{/each}
		</div>
		<div class="border-l-[1.5px] border-stone-100 pl-5 text-center">
			<div class="rounded-xl border border-green-200 bg-green-50 px-3.5 py-2">
				<div class="font-mono text-lg font-extrabold text-green-600">100%</div>
				<div class="text-[9px] font-semibold text-green-600">рекомендують</div>
			</div>
		</div>
	</div>

	<!-- Review cards -->
	{#each reviews as rv, i (rv.prod)}
		<div
			class="relative animate-up overflow-hidden rounded-[22px] border-[1.5px] border-stone-200 bg-white px-7 py-[26px] transition-all duration-300 hover:-translate-y-0.5"
			style="animation-delay: {i * 0.07}s"
			onmouseenter={(e) => {
				e.currentTarget.style.boxShadow = `0 12px 36px ${rv.cl}0a`;
				e.currentTarget.style.borderColor = rv.cl + '25';
			}}
			onmouseleave={(e) => {
				e.currentTarget.style.boxShadow = 'none';
				e.currentTarget.style.borderColor = '#e7e5e4';
			}}
		>
			<div
				class="absolute top-0 right-0 left-0 h-[3px]"
				style="background: linear-gradient(90deg, {rv.cl}, {rv.cl}50)"
			></div>

			<div class="relative mb-3.5 flex items-start justify-between">
				<div class="flex items-center gap-3.5">
					<div
						class="grid h-[50px] w-[50px] shrink-0 place-items-center rounded-[15px] font-[Outfit] text-[19px] font-extrabold"
						style="background: {rv.cl}0a; color: {rv.cl}; border: 2px solid {rv.cl}14"
					>
						{rv.L}
					</div>
					<div>
						<div class="mb-[3px] flex items-center gap-2">
							<span class="text-lg font-extrabold tracking-tight">{rv.prod}</span>
							<span
								class="rounded-full border border-green-200 bg-green-50 px-2 py-[3px] text-[9px] font-bold text-green-600"
								>✓ рекомендую</span
							>
						</div>
						<div class="flex items-center gap-1.5 text-xs text-stone-400">
							<span>замість</span>
							<span
								class="rounded-md border border-red-200 bg-red-50 px-2 py-px text-[11px] font-semibold text-red-600"
								>{rv.from}</span
							>
						</div>
					</div>
				</div>
				<div class="shrink-0 text-right">
					<Stars rating={rv.r} />
					<div class="mt-1 text-[10px] text-stone-400">{rv.date}</div>
				</div>
			</div>

			<p
				class="mb-4 rounded-[14px] border-l-[3px] bg-stone-50 px-4 py-3 text-sm leading-[1.7] text-stone-700"
				style="border-left-color: {rv.cl}20"
			>
				{rv.t}
			</p>

			<div class="mb-4 flex flex-wrap gap-1.5">
				{#each rv.pros as p (p)}
					<span
						class="rounded-[10px] border border-green-200 bg-green-50 px-3 py-1 text-[11px] font-semibold text-green-900"
						>✓ {p}</span
					>
				{/each}
				{#each rv.cons as c (c)}
					<span
						class="rounded-[10px] border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-semibold text-red-900"
						>✕ {c}</span
					>
				{/each}
			</div>

			<div class="flex items-center gap-2 border-t border-stone-100 pt-3.5">
				<button
					class="inline-flex cursor-pointer items-center gap-1.5 rounded-[10px] border border-green-200 bg-green-50 px-4 py-[7px] font-[Outfit] text-xs font-semibold text-green-600 transition-all duration-200 hover:scale-[1.03] hover:bg-green-100"
				>
					👍 {rv.h} корисно
				</button>
				<button
					class="inline-flex cursor-pointer items-center gap-1 rounded-[10px] border border-stone-200 bg-white px-3.5 py-[7px] font-[Outfit] text-xs font-semibold text-stone-500 transition-all duration-150 hover:bg-stone-50"
				>
					💬 Відповісти
				</button>
				<button
					class="ml-auto cursor-pointer rounded-[10px] border border-stone-200 bg-white px-3 py-[7px] font-[Outfit] text-[11px] text-stone-400 transition-colors hover:text-stone-600"
				>
					✎ Редагувати
				</button>
			</div>
		</div>
	{/each}
</div>

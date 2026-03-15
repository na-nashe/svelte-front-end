<script lang="ts">
	import Ratio from '$lib/shared/ui/Ratio.svelte';
	import Stars from '$lib/shared/ui/Stars.svelte';
	import Tag from '$lib/shared/ui/Tag.svelte';
	import type { Alternative } from '../data';

	let { alt, onclose }: { alt: Alternative; onclose: () => void } = $props();

	const reviews = [
		{ u: 'Олена К.', s: 5, t: 'Чудовий після переходу. Інтерфейс зрозумілий, все працює.', p: ['Шифрування'], c: ['Менше стікерів'], h: 42 },
		{ u: 'Андрій М.', s: 4, t: 'Добра альтернатива для базового спілкування.', p: ['Open source'], c: ['Немає каналів'], h: 28 }
	];
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="fixed inset-0 z-200 grid place-items-center" onclick={onclose}>
	<div class="absolute inset-0 bg-black/25 backdrop-blur-[14px] animate-fade-in"></div>

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="relative w-[min(480px,92vw)] max-h-[85vh] overflow-auto bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] animate-pop"
		onclick={(e) => e.stopPropagation()}
	>
		<!-- Color bar -->
		<div class="h-1 rounded-t-3xl" style="background: linear-gradient(90deg, {alt.cl}, {alt.cl}80)"></div>

		<div class="p-6 px-7 pb-7">
			<!-- Header -->
			<div class="flex justify-between items-start mb-5">
				<div class="flex gap-3.5">
					<div
						class="w-[60px] h-[60px] rounded-[18px] grid place-items-center text-[26px] font-extrabold font-[Outfit] animate-scale-in"
						style="background: {alt.cl}0c; color: {alt.cl}; border: 2px solid {alt.cl}18; animation-delay: 0.1s"
					>{alt.L}</div>
					<div class="animate-slide-r" style="animation-delay: 0.15s">
						<div class="flex items-center gap-1.5 mb-1">
							<h2 class="text-[22px] font-extrabold tracking-tight">{alt.name}</h2>
							<span class="text-[17px]">{alt.c2}</span>
						</div>
						<div class="text-[13px] text-stone-500 mb-1.5">{alt.d}</div>
						<div class="flex gap-2"><Stars rating={alt.r} /><Tag type={alt.pr} /></div>
					</div>
				</div>
				<button
					onclick={onclose}
					class="w-[34px] h-[34px] rounded-full bg-stone-100 hover:bg-stone-200 cursor-pointer grid place-items-center text-sm text-stone-500 transition-all duration-150 border-none"
				>✕</button>
			</div>

			<!-- Stats -->
			<div class="flex gap-2 mb-6">
				{#each [{ v: alt.ratio, l: 'рекомендують', isRatio: true }, { v: alt.rev, l: 'відгуків', isRatio: false }] as stat, i}
					<div class="flex-1 bg-stone-100 rounded-2xl py-[18px] px-3 text-center animate-up" style="animation-delay: {0.2 + i * 0.08}s">
						{#if stat.isRatio}
							<Ratio value={stat.v} big />
						{:else}
							<span class="text-xl font-extrabold font-mono">{stat.v}</span>
						{/if}
						<div class="text-[11px] text-stone-500 mt-1">{stat.l}</div>
					</div>
				{/each}
			</div>

			<!-- Reviews -->
			<h3 class="text-sm font-extrabold mb-3">Відгуки</h3>
			{#each reviews as rv, i}
				<div class="p-4 bg-stone-50 rounded-[14px] mb-2 border border-stone-100 animate-up" style="animation-delay: {0.3 + i * 0.08}s">
					<div class="flex justify-between mb-1.5">
						<div class="flex items-center gap-1.5">
							<div class="w-[26px] h-[26px] rounded-full bg-stone-200 grid place-items-center text-[10px] font-bold text-stone-500">{rv.u[0]}</div>
							<span class="font-bold text-xs">{rv.u}</span>
							<Stars rating={rv.s} />
						</div>
					</div>
					<p class="text-xs text-stone-700 leading-[1.55] mb-2">{rv.t}</p>
					<div class="flex gap-1">
						{#each rv.p as p}
							<span class="text-[9px] px-1.5 py-0.5 rounded-[5px] bg-green-100 text-green-800 font-semibold">✓ {p}</span>
						{/each}
						{#each rv.c as c}
							<span class="text-[9px] px-1.5 py-0.5 rounded-[5px] bg-red-50 text-red-800 font-semibold">✕ {c}</span>
						{/each}
					</div>
				</div>
			{/each}

			<button class="w-full p-3.5 rounded-[14px] border-none bg-stone-900 hover:bg-stone-700 text-white text-sm font-bold cursor-pointer font-[Outfit] mt-2 transition-all duration-150">
				Відкрити сайт →
			</button>
		</div>
	</div>
</div>

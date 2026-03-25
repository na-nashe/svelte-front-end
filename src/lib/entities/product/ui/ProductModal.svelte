<script lang="ts">
	import Ratio from '$lib/shared/ui/Ratio.svelte';
	import Stars from '$lib/shared/ui/Stars.svelte';
	import Tag from '$lib/shared/ui/Tag.svelte';
	import type { Alternative } from '../data';

	let { alt, onclose }: { alt: Alternative; onclose: () => void } = $props();

	const reviews = [
		{
			u: 'Олена К.',
			s: 5,
			t: 'Чудовий після переходу. Інтерфейс зрозумілий, все працює.',
			p: ['Шифрування'],
			c: ['Менше стікерів'],
			h: 42
		},
		{
			u: 'Андрій М.',
			s: 4,
			t: 'Добра альтернатива для базового спілкування.',
			p: ['Open source'],
			c: ['Немає каналів'],
			h: 28
		}
	];
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="fixed inset-0 z-200 grid place-items-center" onclick={onclose}>
	<div class="absolute inset-0 animate-fade-in bg-black/25 backdrop-blur-[14px]"></div>

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="relative max-h-[85vh] w-[min(480px,92vw)] animate-pop overflow-auto rounded-3xl bg-white shadow-[0_32px_80px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]"
		onclick={(e) => e.stopPropagation()}
	>
		<!-- Color bar -->
		<div
			class="h-1 rounded-t-3xl"
			style="background: linear-gradient(90deg, {alt.cl}, {alt.cl}80)"
		></div>

		<div class="p-6 px-7 pb-7">
			<!-- Header -->
			<div class="mb-5 flex items-start justify-between">
				<div class="flex gap-3.5">
					<div
						class="grid h-[60px] w-[60px] animate-scale-in place-items-center rounded-[18px] font-[Outfit] text-[26px] font-extrabold"
						style="background: {alt.cl}0c; color: {alt.cl}; border: 2px solid {alt.cl}18; animation-delay: 0.1s"
					>
						{alt.L}
					</div>
					<div class="animate-slide-r" style="animation-delay: 0.15s">
						<div class="mb-1 flex items-center gap-1.5">
							<h2 class="text-[22px] font-extrabold tracking-tight">{alt.name}</h2>
							<span class="text-[17px]">{alt.c2}</span>
						</div>
						<div class="mb-1.5 text-[13px] text-stone-500">{alt.d}</div>
						<div class="flex gap-2"><Stars rating={alt.r} /><Tag type={alt.pr} /></div>
					</div>
				</div>
				<button
					onclick={onclose}
					class="grid h-[34px] w-[34px] cursor-pointer place-items-center rounded-full border-none bg-stone-100 text-sm text-stone-500 transition-all duration-150 hover:bg-stone-200"
					>✕</button
				>
			</div>

			<!-- Stats -->
			<div class="mb-6 flex gap-2">
				{#each [{ v: alt.ratio, l: 'рекомендують', isRatio: true }, { v: alt.rev, l: 'відгуків', isRatio: false }] as stat, i}
					<div
						class="flex-1 animate-up rounded-2xl bg-stone-100 px-3 py-[18px] text-center"
						style="animation-delay: {0.2 + i * 0.08}s"
					>
						{#if stat.isRatio}
							<Ratio value={stat.v} big />
						{:else}
							<span class="font-mono text-xl font-extrabold">{stat.v}</span>
						{/if}
						<div class="mt-1 text-[11px] text-stone-500">{stat.l}</div>
					</div>
				{/each}
			</div>

			<!-- Reviews -->
			<h3 class="mb-3 text-sm font-extrabold">Відгуки</h3>
			{#each reviews as rv, i}
				<div
					class="mb-2 animate-up rounded-[14px] border border-stone-100 bg-stone-50 p-4"
					style="animation-delay: {0.3 + i * 0.08}s"
				>
					<div class="mb-1.5 flex justify-between">
						<div class="flex items-center gap-1.5">
							<div
								class="grid h-[26px] w-[26px] place-items-center rounded-full bg-stone-200 text-[10px] font-bold text-stone-500"
							>
								{rv.u[0]}
							</div>
							<span class="text-xs font-bold">{rv.u}</span>
							<Stars rating={rv.s} />
						</div>
					</div>
					<p class="mb-2 text-xs leading-[1.55] text-stone-700">{rv.t}</p>
					<div class="flex gap-1">
						{#each rv.p as p}
							<span
								class="rounded-[5px] bg-green-100 px-1.5 py-0.5 text-[9px] font-semibold text-green-800"
								>✓ {p}</span
							>
						{/each}
						{#each rv.c as c}
							<span
								class="rounded-[5px] bg-red-50 px-1.5 py-0.5 text-[9px] font-semibold text-red-800"
								>✕ {c}</span
							>
						{/each}
					</div>
				</div>
			{/each}

			<button
				class="mt-2 w-full cursor-pointer rounded-[14px] border-none bg-stone-900 p-3.5 font-[Outfit] text-sm font-bold text-white transition-all duration-150 hover:bg-stone-700"
			>
				Відкрити сайт →
			</button>
		</div>
	</div>
</div>

<script lang="ts">
	import { onMount } from 'svelte';

	const imps = [
		{ v: '2.4M', l: 'переходів на українське', i: '🔄' },
		{ v: '₴18M+', l: 'збережено в UA-економіці', i: '💰' },
		{ v: '340+', l: 'українських брендів', i: '🇺🇦' },
		{ v: '98%', l: 'задоволених користувачів', i: '💙' }
	];

	let impI = $state(0);

	onMount(() => {
		const t = setInterval(() => (impI = (impI + 1) % 4), 3200);
		return () => clearInterval(t);
	});

	const quickStats = [
		{ v: '8', l: 'компаній', sub: 'на платформі' },
		{ v: '4', l: 'єдинороги', sub: '$1B+' },
		{ v: '169', l: 'країн', sub: 'покриття' },
		{ v: '80M+', l: 'users', sub: 'загалом' }
	];
</script>

<section
	class="animate-fade-in relative mb-12 overflow-hidden rounded-b-[36px] px-12 pt-[60px] pb-[52px]"
	style="background: linear-gradient(140deg, #0057B7 0%, #1e3a8a 35%, #1e40af 65%, #0057B7 100%); color: #fff"
>
	<!-- Decorations -->
	<div class="pointer-events-none absolute inset-0" style="background-image: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 24px 24px"></div>
	<div class="animate-wave-float pointer-events-none absolute -top-[60px] right-[30px] h-[320px] w-[320px] rounded-full opacity-[0.07] blur-[70px]" style="background: #FFD700"></div>
	<div class="animate-wave-float pointer-events-none absolute -bottom-[50px] -left-[10px] h-[260px] w-[260px] rounded-full opacity-[0.05] blur-[60px]" style="background: #FFD700; animation-delay: 7s"></div>
	<div class="animate-wave-float pointer-events-none absolute top-1/2 right-[15%] h-[160px] w-[160px] rounded-full opacity-[0.04] blur-[50px]" style="background: #a78bfa; animation-delay: 3s"></div>

	<div class="relative">
		<div class="mb-10 flex flex-wrap items-start justify-between gap-8">
			<div class="animate-slide-r max-w-[500px]" style="animation-delay: 0.1s">
				<div class="mb-[22px] inline-flex items-center gap-1.5 rounded-full border border-[#FFD70030] bg-[#FFD70018] py-[5px] pr-3.5 pl-[7px]">
					<span class="grid h-5 w-5 place-items-center rounded-full bg-[#FFD70030] text-[10px]">🇺🇦</span>
					<span class="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-widest text-[#FFD700]">Підтримуй наше</span>
				</div>
				<h1 class="mb-4 text-[clamp(34px,5.5vw,52px)] font-black leading-[1.05] tracking-tighter">
					Українські продукти
					<span class="bg-gradient-to-r from-[#FFD700] to-[#fde68a] bg-clip-text text-transparent">світового рівня</span>
				</h1>
				<p class="m-0 max-w-[420px] text-base leading-[1.6] text-white/[0.63]">
					Ці компанії народились в Україні та конкурують глобально. Обираючи їх — інвестуєш у перемогу.
				</p>
			</div>

			<!-- Impact counter -->
			<div class="animate-slide-l min-w-[240px] rounded-[22px] border border-white/10 bg-white/[0.04] px-[30px] py-6 backdrop-blur-2xl" style="animation-delay: 0.2s">
				<p class="mb-3.5 font-[JetBrains_Mono] text-[9px] font-bold uppercase tracking-widest text-white/25">Наш вплив</p>
				{#each imps as s, i (s.v)}
					{#if i === impI}
						<div class="animate-count-up flex items-center gap-3.5">
							<div class="grid h-12 w-12 place-items-center rounded-[14px] border border-white/[0.04] bg-white/[0.05] text-2xl">{s.i}</div>
							<div>
								<div class="font-[JetBrains_Mono] text-[28px] font-extrabold tracking-tight">{s.v}</div>
								<div class="mt-0.5 text-xs text-white/[0.38]">{s.l}</div>
							</div>
						</div>
					{/if}
				{/each}
				<div class="mt-[18px] flex gap-1">
					{#each imps as _, i}
						<button
							onclick={() => (impI = i)}
							class="h-[3px] flex-1 cursor-pointer rounded-sm border-none transition-all duration-400"
							style="background: {i === impI ? '#FFD700' : 'rgba(255,255,255,0.08)'}; box-shadow: {i === impI ? '0 0 8px #FFD70040' : 'none'}"
						></button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Quick stats -->
		<div class="animate-up flex gap-3" style="animation-delay: 0.35s">
			{#each quickStats as stat (stat.l)}
				<div
					class="flex-1 rounded-2xl border border-white/[0.05] bg-white/[0.03] px-[18px] py-4 transition-all duration-[250ms] hover:-translate-y-0.5 hover:bg-white/[0.07]"
				>
					<div class="font-[JetBrains_Mono] text-[22px] font-extrabold tracking-tight">{stat.v}</div>
					<div class="mt-0.5 text-xs font-semibold text-white/75">{stat.l}</div>
					<div class="text-[10px] text-white/25">{stat.sub}</div>
				</div>
			{/each}
		</div>
	</div>
</section>

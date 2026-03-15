<script lang="ts">
	import { CB_CATS, CB } from '$lib/entities/cashback/data';

	let stepHov = $state<number | null>(null);

	const heroStats = [
		{ value: '10%', label: 'кешбек', icon: '💰', accent: '#fbbf24' },
		{ value: String(CB_CATS.length), label: 'категорій', icon: '📂', accent: '#34d399' },
		{ value: `${CB.length}+`, label: 'брендів', icon: '🏷️', accent: '#a7f3d0' }
	];

	const steps = [
		{ n: '1', title: 'Обирай', desc: 'Купуй товари українського виробництва в магазинах', icon: '🛒' },
		{ n: '2', title: 'Скануй', desc: 'Відскануй QR-код чеку через додаток Дія', icon: '📱' },
		{ n: '3', title: 'Отримуй', desc: '10% повернеться на картку протягом 5 днів', icon: '💸' }
	];
</script>

<section
	class="animate-fade-in relative mb-11 overflow-hidden rounded-b-[36px] px-12 pt-14 pb-12"
	style="background: linear-gradient(135deg, #064e3b 0%, #065f46 30%, #047857 70%, #059669 100%); color: #fff"
>
	<!-- Dot pattern -->
	<div
		class="pointer-events-none absolute inset-0"
		style="background-image: radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px); background-size: 22px 22px"
	></div>

	<!-- Orbs -->
	<div class="animate-wave-float pointer-events-none absolute -top-[50px] right-10 h-[300px] w-[300px] rounded-full opacity-[0.06] blur-[60px]" style="background: #fbbf24"></div>
	<div class="animate-wave-float pointer-events-none absolute -bottom-10 -left-5 h-[220px] w-[220px] rounded-full opacity-[0.07] blur-[50px]" style="background: #34d399; animation-delay: 7s"></div>
	<div class="animate-wave-float pointer-events-none absolute top-1/2 right-[15%] h-[150px] w-[150px] rounded-full opacity-[0.04] blur-[40px]" style="background: #a7f3d0; animation-delay: 3s"></div>

	<div class="relative">
		<div class="mb-10 flex flex-wrap items-start justify-between gap-8">
			<div class="animate-slide-r max-w-[480px]" style="animation-delay: 0.1s">
				<div class="mb-5 inline-flex items-center gap-1.5 rounded-full border border-[#fbbf2430] bg-[#fbbf2418] py-[5px] pr-3.5 pl-[7px]">
					<span class="grid h-[22px] w-[22px] place-items-center rounded-full bg-[#fbbf2430] text-[11px]">💳</span>
					<span class="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-widest text-[#fbbf24]">Національний кешбек</span>
				</div>
				<h1 class="mb-3.5 text-[clamp(30px,5vw,48px)] font-black leading-[1.05] tracking-tighter">
					Купуй <span class="bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] bg-clip-text text-transparent">українське</span>
					<br />— отримуй кешбек
				</h1>
				<p class="m-0 text-base leading-[1.55] text-white/[0.67]">
					Повернення 10% вартості за товари українського виробництва через додаток Дія
				</p>
			</div>

			<!-- Stats cards -->
			<div class="animate-slide-l flex gap-3" style="animation-delay: 0.2s">
				{#each heroStats as stat, i (stat.label)}
					<div
						class="animate-up min-w-[110px] rounded-[20px] border border-white/10 bg-white/[0.03] px-[22px] py-5 text-center backdrop-blur-[12px]"
						style="animation-delay: {0.25 + i * 0.08}s"
					>
						<div class="mx-auto mb-2.5 grid h-10 w-10 place-items-center rounded-xl text-lg" style="background: {stat.accent}18">{stat.icon}</div>
						<div class="font-[JetBrains_Mono] text-[26px] font-extrabold tracking-tight">{stat.value}</div>
						<div class="mt-[3px] text-[10px] text-white/50">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- How it works -->
		<div class="animate-up grid grid-cols-3 gap-3" style="animation-delay: 0.35s">
			{#each steps as step, i (step.n)}
				<div
					class="cursor-default rounded-[18px] px-[18px] py-5 transition-all duration-300"
					style="background: rgba(255,255,255,{stepHov === i ? 0.05 : 0.03}); border: 1px solid rgba(255,255,255,{stepHov === i ? 0.13 : 0.05}); transform: {stepHov === i ? 'translateY(-2px)' : 'none'}"
					onmouseenter={() => (stepHov = i)}
					onmouseleave={() => (stepHov = null)}
				>
					<div class="mb-2.5 flex items-center gap-2.5">
						<div
							class="grid h-9 w-9 place-items-center rounded-[10px] text-base transition-all duration-300"
							style="background: {stepHov === i ? '#fbbf2420' : 'rgba(255,255,255,0.05)'}"
						>{step.icon}</div>
						<div>
							<span class="font-[JetBrains_Mono] text-[10px] font-bold text-[#fbbf24]">Крок {step.n}</span>
							<div class="text-[15px] font-extrabold">{step.title}</div>
						</div>
					</div>
					<p class="m-0 text-xs leading-[1.5] text-white/[0.38]">{step.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

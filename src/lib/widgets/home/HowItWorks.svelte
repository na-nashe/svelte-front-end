<script lang="ts">
	import { fly } from 'svelte/transition';

	let sectionEl = $state<HTMLElement | undefined>(undefined);
	let scrollY = $state(0);

	const steps = [
		{
			n: '01',
			icon: '🔍',
			title: 'Знайди',
			desc: 'Введи назву ворожого продукту. AI розпізнає сленг, скорочення та навіть помилки',
			color: '#0057B7',
			preview: 'Telegram → Signal, Viber, WhatsApp'
		},
		{
			n: '02',
			icon: '⚡',
			title: 'Порівняй',
			desc: 'Рейтинги від спільноти, відгуки реальних користувачів, ціни та можливості',
			color: '#f59e0b',
			preview: 'Signal — 92% рекомендують ★4.7'
		},
		{
			n: '03',
			icon: '✓',
			title: 'Переходь',
			desc: 'Обери найкраще та допоможи іншим — залиш відгук про свій досвід переходу',
			color: '#16a34a',
			preview: 'Telegram ✕ → Signal ✓ Готово!'
		}
	];

	function captureEl(el: HTMLElement) {
		sectionEl = el;
		return () => {
			sectionEl = undefined;
		};
	}

	const activeStep = $derived.by(() => {
		if (!sectionEl) return 0;
		const sectionTop = sectionEl.offsetTop;
		const sectionHeight = sectionEl.offsetHeight;
		const windowHeight = window.innerHeight;
		const scrollProgress = scrollY - sectionTop;
		const scrollableHeight = sectionHeight - windowHeight;

		if (scrollProgress <= 0) return 0;
		if (scrollProgress >= scrollableHeight) return steps.length - 1;
		const step = Math.floor((scrollProgress / scrollableHeight) * steps.length);
		return Math.min(steps.length - 1, step);
	});

	const active = $derived(steps[activeStep]);
</script>

<svelte:window bind:scrollY />

<section
	{@attach captureEl}
	class="relative bg-[#fafaf9] px-4"
	style="height: {steps.length * 100}vh"
>
	<div class="sticky top-0 flex h-screen items-center pb-16">
		<div class="mx-auto w-full max-w-5xl">
			<!-- Header -->
			<div class="mb-12 text-center">
				<span
					class="mb-3 inline-block font-[JetBrains_Mono] text-[11px] font-bold tracking-widest text-stone-400 uppercase"
				>
					3 прості кроки
				</span>
				<h2 class="font-[Outfit] text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
					Як це працює
				</h2>
			</div>

			<div class="grid gap-10 lg:grid-cols-2 lg:gap-16">
				<!-- Left: Step nav -->
				<div class="flex flex-col gap-3">
					{#each steps as step, i (step.n)}
						<div
							class="flex w-full items-start gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all duration-500"
							style="border-color: {activeStep === i
								? step.color
								: 'transparent'}; background: {activeStep === i ? step.color + '08' : 'white'}"
						>
							<div
								class="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl font-[JetBrains_Mono] text-sm font-bold text-white transition-all duration-500"
								style="background: {activeStep === i ? step.color : '#d6d3d1'}"
							>
								{step.n}
							</div>

							<div class="flex-1">
								<div class="flex items-center gap-2">
									<span class="text-lg">{step.icon}</span>
									<span class="font-[Outfit] text-base font-bold text-stone-900">{step.title}</span>
								</div>
								<p class="mt-1 font-[Outfit] text-sm leading-relaxed text-stone-500">
									{step.desc}
								</p>
							</div>

							<div class="mt-2 flex-shrink-0">
								<div
									class="h-2.5 w-2.5 rounded-full transition-all duration-500"
									style="background: {activeStep === i
										? step.color
										: '#e7e5e4'}; box-shadow: {activeStep === i
										? `0 0 0 4px ${step.color}20`
										: 'none'}"
								></div>
							</div>
						</div>
					{/each}

					<!-- Progress bar -->
					<div class="mt-2 flex gap-1.5">
						{#each steps as step, i (step.n)}
							<div
								class="h-1 flex-1 rounded-full transition-all duration-500"
								style="background: {i <= activeStep ? step.color : '#e7e5e4'}"
							></div>
						{/each}
					</div>
				</div>

				<!-- Right: Preview card with fly animation -->
				<div class="relative flex min-h-[320px] items-center justify-center overflow-hidden">
					{#key activeStep}
						<div
							in:fly={{ y: 24, duration: 400, delay: 80 }}
							out:fly={{ y: -24, duration: 280 }}
							class="absolute w-full max-w-sm rounded-3xl border-2 bg-white p-8 shadow-lg"
							style="border-color: {active.color}20"
						>
							<div
								class="mb-5 grid h-16 w-16 place-items-center rounded-2xl text-3xl"
								style="background: {active.color}10"
							>
								{active.icon}
							</div>

							<h3 class="mb-2 font-[Outfit] text-xl font-bold text-stone-900">
								{active.title}
							</h3>

							<p class="mb-6 font-[Outfit] text-sm leading-relaxed text-stone-500">
								{active.desc}
							</p>

							<div
								class="rounded-xl px-4 py-3 font-[JetBrains_Mono] text-sm font-medium"
								style="background: {active.color}08; color: {active.color}; border: 1px solid {active.color}18"
							>
								{active.preview}
							</div>
						</div>
					{/key}
				</div>
			</div>
		</div>
	</div>
</section>

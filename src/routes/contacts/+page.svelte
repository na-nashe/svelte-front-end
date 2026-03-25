<script lang="ts">
	import { resolve } from '$app/paths';

	const faqs = [
		{
			q: 'Як формуються рейтинги?',
			a: 'Рейтинги базуються на відгуках реальних користувачів. Ніяких платних місць — лише чесна оцінка.'
		},
		{
			q: 'Знайшов помилку — що робити?',
			a: 'Напиши в Telegram або відкрий Issue на GitHub. Баги виправляємо максимально швидко.'
		}
	];

	let openFaq = $state<number | null>(null);
</script>

<svelte:head>
	<title>Контакти · НаНаше</title>
	<meta name="description" content="Звʼяжись з командою НаНаше — Telegram, GitHub або email." />
</svelte:head>

<!-- Hero -->
<section class="relative overflow-hidden px-4 py-20 sm:py-28">
	<div
		class="pointer-events-none absolute top-[10%] left-[5%] h-80 w-80 rounded-full opacity-[0.07] blur-3xl"
		style="background: radial-gradient(circle, #0057B7, transparent); animation: waveFloat 12s ease-in-out infinite"
	></div>
	<div
		class="pointer-events-none absolute right-[5%] bottom-[5%] h-64 w-64 rounded-full opacity-[0.05] blur-3xl"
		style="background: radial-gradient(circle, #FFD700, transparent); animation: waveFloat 18s ease-in-out infinite reverse"
	></div>

	<div class="relative mx-auto max-w-2xl text-center">
		<div
			class="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 font-[JetBrains_Mono] text-[11px] font-bold tracking-widest text-stone-400 uppercase shadow-sm"
		>
			<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0057B7]"></span>
			Контакти
		</div>

		<h1 class="mb-4 font-[Outfit] text-4xl font-black tracking-tight text-stone-900 sm:text-5xl">
			Звʼяжись з нами
		</h1>
		<p class="font-[Outfit] text-lg leading-relaxed text-stone-500">
			Маєш ідею, знайшов помилку або хочеш приєднатись до проєкту? Ми відкриті до всього.
		</p>
	</div>
</section>

<!-- Channels -->
<section class="px-4 pb-16 sm:pb-24">
	<div class="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
		<!-- Telegram -->
		<a
			href="https://t.me/nanashe"
			class="group flex flex-col rounded-2xl border border-stone-100 bg-white p-6 no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
		>
			<div
				class="mb-4 grid h-12 w-12 place-items-center rounded-xl text-2xl"
				style="background: #0057B710"
			>
				💬
			</div>
			<h2 class="mb-1.5 font-[Outfit] text-base font-bold text-stone-900">Telegram</h2>
			<p class="mb-5 flex-1 font-[Outfit] text-sm leading-relaxed text-stone-500">
				Швидкий звʼязок, анонси оновлень та чат спільноти
			</p>
			<span
				class="inline-flex items-center gap-1 font-[Outfit] text-xs font-semibold text-[#0057B7]"
				>Написати →</span
			>
		</a>

		<!-- Email -->
		<a
			href="mailto:hello@nanashe.ua"
			class="group flex flex-col rounded-2xl border border-stone-100 bg-white p-6 no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
		>
			<div
				class="mb-4 grid h-12 w-12 place-items-center rounded-xl text-2xl"
				style="background: #7c3aed10"
			>
				✉️
			</div>
			<h2 class="mb-1.5 font-[Outfit] text-base font-bold text-stone-900">Email</h2>
			<p class="mb-5 flex-1 font-[Outfit] text-sm leading-relaxed text-stone-500">
				Для партнерств, пресси та серйозних питань
			</p>
			<span
				class="inline-flex items-center gap-1 font-[Outfit] text-xs font-semibold text-[#7c3aed]"
				>hello@nanashe.ua →</span
			>
		</a>
	</div>
</section>

<!-- FAQ -->
<section class="bg-[#fafaf9] px-4 py-16 sm:py-24">
	<div class="mx-auto max-w-2xl">
		<div class="mb-10 text-center">
			<span
				class="mb-3 inline-block font-[JetBrains_Mono] text-[11px] font-bold tracking-widest text-stone-400 uppercase"
			>
				FAQ
			</span>
			<h2 class="font-[Outfit] text-3xl font-extrabold tracking-tight text-stone-900">
				Часті питання
			</h2>
		</div>

		<div class="flex flex-col gap-2">
			{#each faqs as faq, i (faq.q)}
				<button
					onclick={() => (openFaq = openFaq === i ? null : i)}
					class="w-full cursor-pointer rounded-2xl border border-stone-100 bg-white px-6 py-4 text-left transition-all duration-200 hover:border-stone-200"
				>
					<div class="flex items-center justify-between gap-4">
						<span class="font-[Outfit] text-sm font-semibold text-stone-900">{faq.q}</span>
						<span
							class="flex-shrink-0 font-[JetBrains_Mono] text-stone-400 transition-transform duration-200"
							style="transform: rotate({openFaq === i ? 45 : 0}deg)">+</span
						>
					</div>
					{#if openFaq === i}
						<p class="mt-3 animate-fade-in font-[Outfit] text-sm leading-relaxed text-stone-500">
							{faq.a}
						</p>
					{/if}
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- CTA -->
<section class="px-4 py-16 sm:py-24">
	<div class="mx-auto max-w-xl text-center">
		<div class="mb-4 text-3xl">🇺🇦</div>
		<h2 class="mb-3 font-[Outfit] text-2xl font-extrabold text-stone-900">Разом ми сильніші</h2>
		<p class="mb-8 font-[Outfit] text-sm leading-relaxed text-stone-500">
			НаНаше — відкритий проєкт. Будь-яка допомога, від коду до відгуку, наближає нас до мети.
		</p>
		<a
			href={resolve('/about')}
			class="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-6 py-3 font-[Outfit] text-sm font-semibold text-stone-700 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-md"
		>
			Дізнатись більше про проєкт →
		</a>
	</div>
</section>

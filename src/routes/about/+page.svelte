<script lang="ts">
	import { resolve } from '$app/paths';

	const values = [
		{
			icon: '🇺🇦',
			title: 'Підтримка України',
			desc: 'Кожен перехід від ворожого продукту — це внесок у стійкість України. Ми допомагаємо зробити цей вибір легким і усвідомленим.',
			color: '#0057B7'
		},
		{
			icon: '🔍',
			title: 'Прозорість',
			desc: 'Рейтинги формуються спільнотою. Ніяких прихованих рекламних угод — лише чесні відгуки реальних користувачів.',
			color: '#7c3aed'
		},
		{
			icon: '⚡',
			title: 'Простота',
			desc: 'Ми прибрали все зайве. Знайди ворожий продукт — отримай кращу альтернативу за секунди.',
			color: '#f59e0b'
		},
		{
			icon: '🌱',
			title: 'Зростання разом',
			desc: 'Платформа розвивається разом зі спільнотою. Твої відгуки та пропозиції формують НаНаше.',
			color: '#16a34a'
		}
	];

	const stats = [
		{ value: '8+', label: 'категорій продуктів' },
		{ value: '40+', label: 'перевірених альтернатив' },
		{ value: '100%', label: 'відкритий код' },
		{ value: '🇺🇦', label: 'зроблено в Україні' }
	];
</script>

<svelte:head>
	<title>Про проєкт · НаНаше</title>
	<meta
		name="description"
		content="НаНаше — платформа для пошуку українських та етичних альтернатив ворожим продуктам і сервісам."
	/>
</svelte:head>

<!-- Hero -->
<section class="relative overflow-hidden px-4 py-20 sm:py-28">
	<!-- Background orbs -->
	<div
		class="pointer-events-none absolute top-[10%] left-[5%] h-80 w-80 rounded-full opacity-[0.08] blur-3xl"
		style="background: radial-gradient(circle, #0057B7, transparent); animation: waveFloat 12s ease-in-out infinite"
	></div>
	<div
		class="pointer-events-none absolute right-[5%] bottom-[10%] h-64 w-64 rounded-full opacity-[0.06] blur-3xl"
		style="background: radial-gradient(circle, #FFD700, transparent); animation: waveFloat 16s ease-in-out infinite reverse"
	></div>

	<div class="relative mx-auto max-w-3xl text-center">
		<!-- Badge -->
		<div
			class="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 font-[JetBrains_Mono] text-[11px] font-bold tracking-widest text-stone-400 uppercase shadow-sm"
		>
			<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0057B7]"></span>
			Про проєкт
		</div>

		<h1 class="mb-5 font-[Outfit] text-4xl font-black tracking-tight text-stone-900 sm:text-5xl">
			Обирай
			<span
				style="background: linear-gradient(135deg, #0057B7, #FFD700); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text"
				>наше</span
			>, а не їхнє
		</h1>

		<p class="mx-auto mb-10 max-w-xl font-[Outfit] text-lg leading-relaxed text-stone-500">
			НаНаше — це відкрита платформа, яка допомагає знаходити українські та міжнародні альтернативи
			ворожим продуктам і сервісам. Кожен вибір має значення.
		</p>

		<div class="flex flex-wrap justify-center gap-3">
			<a
				href={resolve('/catalog')}
				class="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-[Outfit] text-sm font-bold text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
				style="background: linear-gradient(135deg, #0057B7, #1e40af); box-shadow: 0 4px 16px #0057B730"
			>
				Переглянути каталог →
			</a>
		</div>
	</div>
</section>

<!-- Stats -->
<section class="border-y border-stone-100 bg-white px-4 py-10">
	<div class="mx-auto grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
		{#each stats as stat (stat.label)}
			<div class="text-center">
				<div class="mb-1 font-[Outfit] text-3xl font-black text-stone-900">{stat.value}</div>
				<div class="font-[Outfit] text-xs text-stone-400">{stat.label}</div>
			</div>
		{/each}
	</div>
</section>

<!-- Mission -->
<section class="px-4 py-16 sm:py-24">
	<div class="mx-auto max-w-3xl">
		<div class="mb-10 text-center">
			<span
				class="mb-3 inline-block font-[JetBrains_Mono] text-[11px] font-bold tracking-widest text-stone-400 uppercase"
			>
				Наша місія
			</span>
			<h2 class="font-[Outfit] text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
				Навіщо ми існуємо
			</h2>
		</div>

		<div class="rounded-3xl border border-stone-100 bg-white p-8 shadow-sm sm:p-10">
			<p class="mb-5 font-[Outfit] text-base leading-relaxed text-stone-600">
				Після повномасштабного вторгнення Росії в Україну мільйони людей почали замислюватися: а чим
				я користуюся щодня? Чи не фінансую я ворога? Telegram, Yandex, Касперський, 1С — ці та
				багато інших продуктів пов'язані з країною, яка веде війну проти нас.
			</p>
			<p class="mb-5 font-[Outfit] text-base leading-relaxed text-stone-600">
				Ми створили НаНаше, щоб зробити пошук альтернатив простим і зрозумілим. Не потрібно годинами
				шукати в інтернеті — введи назву, отримай список перевірених варіантів із рейтингами від
				спільноти.
			</p>
			<p class="font-[Outfit] text-base leading-relaxed text-stone-600">
				Ми підтримуємо як українські продукти, так і міжнародні рішення, які не пов'язані з Росією.
				Наша ціль — не ізоляція, а свідомий вибір.
			</p>
		</div>
	</div>
</section>

<!-- Values -->
<section class="bg-[#fafaf9] px-4 py-16 sm:py-24">
	<div class="mx-auto max-w-4xl">
		<div class="mb-12 text-center">
			<span
				class="mb-3 inline-block font-[JetBrains_Mono] text-[11px] font-bold tracking-widest text-stone-400 uppercase"
			>
				Принципи
			</span>
			<h2 class="font-[Outfit] text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
				На чому ми стоїмо
			</h2>
		</div>

		<div class="grid gap-4 sm:grid-cols-2">
			{#each values as val (val.title)}
				<div
					class="rounded-2xl border border-stone-100 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
				>
					<div
						class="mb-4 grid h-12 w-12 place-items-center rounded-xl text-2xl"
						style="background: {val.color}10"
					>
						{val.icon}
					</div>
					<h3 class="mb-2 font-[Outfit] text-base font-bold text-stone-900">{val.title}</h3>
					<p class="font-[Outfit] text-sm leading-relaxed text-stone-500">{val.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- How it helps -->
<section class="px-4 py-16 sm:py-24">
	<div class="mx-auto max-w-3xl">
		<div class="mb-10 text-center">
			<span
				class="mb-3 inline-block font-[JetBrains_Mono] text-[11px] font-bold tracking-widest text-stone-400 uppercase"
			>
				Як ми допомагаємо
			</span>
			<h2 class="font-[Outfit] text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
				Що ти отримуєш
			</h2>
		</div>

		<div class="flex flex-col gap-3">
			{#each [{ n: '01', icon: '🎯', text: 'Швидкий пошук за назвою, ключовими словами або навіть з помилками' }, { n: '02', icon: '⭐', text: 'Рейтинги та відгуки реальних користувачів для кожної альтернативи' }, { n: '03', icon: '🏷️', text: 'Інформація про ціноутворення: безкоштовно, freemium або платно' }, { n: '04', icon: '🇺🇦', text: 'Розділ українських брендів — підтримуй своїх' }, { n: '05', icon: '🔄', text: 'Регулярне оновлення бази з новими продуктами та альтернативами' }] as item (item.n)}
				<div class="flex items-start gap-4 rounded-2xl border border-stone-100 bg-white p-5">
					<div
						class="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-stone-900 font-[JetBrains_Mono] text-xs font-bold text-white"
					>
						{item.n}
					</div>
					<div class="flex items-center gap-3 pt-1.5">
						<span class="text-xl">{item.icon}</span>
						<p class="font-[Outfit] text-sm leading-relaxed text-stone-600">{item.text}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA -->
<section class="px-4 pb-20 sm:pb-28">
	<div class="mx-auto max-w-2xl">
		<div
			class="relative overflow-hidden rounded-3xl p-10 text-center text-white"
			style="background: linear-gradient(135deg, #0057B7 0%, #1e40af 100%)"
		>
			<div
				class="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full opacity-20 blur-2xl"
				style="background: #FFD700"
			></div>
			<div
				class="pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full opacity-10 blur-2xl"
				style="background: #FFD700"
			></div>

			<div class="relative">
				<div class="mb-3 text-3xl">🇺🇦</div>
				<h2 class="mb-3 font-[Outfit] text-2xl font-extrabold sm:text-3xl">
					Зроби свій перший крок
				</h2>
				<p class="mb-8 font-[Outfit] text-sm leading-relaxed text-white/80">
					Знайди альтернативу продукту, яким користуєшся зараз. Це займе менше хвилини.
				</p>
				<a
					href={resolve('/')}
					class="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-[Outfit] text-sm font-bold text-[#0057B7] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
				>
					Спробувати зараз →
				</a>
			</div>
		</div>
	</div>
</section>

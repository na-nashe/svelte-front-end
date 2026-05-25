<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';
	import type { SpotlightBrand, CatalogBrand } from '$lib/data/ukrainian-brands';
	import Tag from '$lib/shared/ui/Tag.svelte';
	import AltLogo from '$lib/entities/product/ui/AltLogo.svelte';

	let { data }: { data: PageData } = $props();

	const spotlightBrands = $derived(data.spotlightBrands ?? []);
	const catalogBrands = $derived(data.catalogBrands ?? []);

	// ── Impact counter ──
	const impacts = [
		{ value: '2.4M', label: 'перейшло на українське', icon: '🇺🇦' },
		{ value: '₴18M+', label: 'збережено в UA-економіці', icon: '💰' },
		{ value: '340+', label: 'українських брендів', icon: '🏷️' },
		{ value: '98%', label: 'задоволення користувачів', icon: '⭐' }
	];
	let impactIndex = $state(0);

	$effect(() => {
		const t = setInterval(() => {
			impactIndex = (impactIndex + 1) % impacts.length;
		}, 3200);
		return () => clearInterval(t);
	});

	// ── Category filter ──
	const spotlightCategories = $derived(['all', ...new Set(spotlightBrands.map((b) => b.category))]);
	let activeFilter = $state('all');

	const featuredBrands = $derived(
		spotlightBrands.filter(
			(b) => b.featured && (activeFilter === 'all' || b.category === activeFilter)
		)
	);
	const regularBrands = $derived(
		spotlightBrands.filter(
			(b) => !b.featured && (activeFilter === 'all' || b.category === activeFilter)
		)
	);

	// ── Hover / expand state ──
	let hovBrand = $state<string | null>(null);
	let expandedBrand = $state<string | null>(null);

	// ── Catalog brands (from API) ──
	const catalogCategories = $derived([...new Set(catalogBrands.map((b) => b.category))].sort());
	const catalogByCategory = $derived(
		catalogCategories.map((cat) => ({
			name: cat,
			brands: catalogBrands.filter((b) => b.category === cat)
		}))
	);

	// ── Success stories ──
	const stories = [
		{
			user: 'Марія К.',
			initials: 'МК',
			text: 'Перейшла на Monobank 2 роки тому — не уявляю як жила без кешбеку та донатів на ЗСУ прямо з апки.',
			brand: 'Monobank',
			color: '#1c1917',
			stars: 5
		},
		{
			user: 'Олексій М.',
			initials: 'ОМ',
			text: 'Grammarly щодня допомагає з англійською. Пишаюся тим, що це український продукт.',
			brand: 'Grammarly',
			color: '#15803d',
			stars: 5
		},
		{
			user: 'Ірина В.',
			initials: 'ІВ',
			text: 'Ajax Systems — тепер мій дім під захистом. Встановлення зайняло 20 хвилин.',
			brand: 'Ajax Systems',
			color: '#e11d48',
			stars: 5
		}
	];

	// ── Timeline ──
	const milestones = [
		{ year: '2014', event: 'Monobank запускає перший в Україні повністю мобільний банк' },
		{ year: '2017', event: 'Grammarly оцінений в $1B — перший український єдиноріг' },
		{ year: '2020', event: 'Дія стає цифровою державою #1 у світі' },
		{ year: '2022', event: 'Ajax Systems виходить на ринки 169 країн' },
		{ year: '2024', event: 'MacPaw Setapp досягає 1M підписників' },
		{ year: '2025', event: '340+ UA-брендів на платформі НаНаше' }
	];

	function reviewSuffix(n: number): string {
		if (n === 1) return 'відгук';
		if (n >= 2 && n <= 4) return 'відгуки';
		return 'відгуків';
	}
</script>

<svelte:head>
	<title>Українські бренди · НаНаше</title>
	<meta
		name="description"
		content="Підтримуй українські продукти та сервіси. Monobank, Grammarly, Ajax, Diia та сотні інших українських брендів."
	/>
</svelte:head>

<!-- ─── HERO ─── -->
<section
	class="relative overflow-hidden"
	style="border-radius: 0 0 36px 36px; padding: 60px 48px 52px; margin-bottom: 48px; background: linear-gradient(140deg, #0057B7 0%, #1e3a8a 35%, #1e40af 65%, #0057B7 100%); color: #fff;"
>
	<!-- dot grid -->
	<div
		class="pointer-events-none absolute inset-0 opacity-[0.03]"
		style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 24px 24px;"
	></div>
	<!-- orbs -->
	<div
		class="pointer-events-none absolute"
		style="top:-60px; right:30px; width:320px; height:320px; border-radius:50%; background:#FFD700; opacity:.07; filter:blur(70px); animation:waveFloat 14s ease-in-out infinite"
	></div>
	<div
		class="pointer-events-none absolute"
		style="bottom:-50px; left:-10px; width:260px; height:260px; border-radius:50%; background:#FFD700; opacity:.05; filter:blur(60px); animation:waveFloat 14s ease-in-out infinite 7s"
	></div>

	<div class="relative mx-auto max-w-[960px]">
		<div class="flex flex-wrap items-start justify-between gap-8" style="margin-bottom:40px">
			<!-- Left copy -->
			<div class="max-w-[500px]" style="animation: slideR .6s ease .1s both">
				<div
					class="mb-6 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5"
					style="background:#FFD70018; border:1px solid #FFD70030"
				>
					<span
						class="grid h-5 w-5 place-items-center rounded-full text-[10px]"
						style="background:#FFD70030">🇺🇦</span
					>
					<span
						class="font-[JetBrains_Mono] text-[10px] font-bold tracking-widest uppercase"
						style="color:#FFD700">Підтримуй наше</span
					>
				</div>

				<h1
					class="font-[Outfit] font-black tracking-tight text-white"
					style="font-size:clamp(34px,5.5vw,52px); line-height:1.05; letter-spacing:-.05em; margin:0 0 16px"
				>
					Українські продукти
					<span
						style="background:linear-gradient(135deg,#FFD700 20%,#fde68a 80%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text"
					>
						світового рівня
					</span>
				</h1>

				<p class="max-w-[420px] font-[Outfit] text-base leading-relaxed" style="color:#ffffffa0">
					Ці компанії народилися в Україні та конкурують глобально. Обираючи їх — інвестуєш у
					перемогу.
				</p>
			</div>

			<!-- Impact counter card -->
			<div
				class="min-w-[240px] rounded-[22px] p-6"
				style="background:#ffffff0a; backdrop-filter:blur(16px); border:1px solid #ffffff10; animation: slideL .6s ease .2s both"
			>
				<p
					class="mb-3.5 font-[JetBrains_Mono] text-[9px] font-bold tracking-widest uppercase"
					style="color:#ffffff40"
				>
					Наш вплив
				</p>
				{#each impacts as imp, i (i)}
					{#if i === impactIndex}
						<div
							class="flex items-center gap-3.5"
							style="animation: countUp .45s cubic-bezier(.4,0,.2,1) both"
						>
							<div
								class="grid h-12 w-12 place-items-center rounded-[14px] text-2xl"
								style="background:#ffffff0c; border:1px solid #ffffff0a"
							>
								{imp.icon}
							</div>
							<div>
								<div
									class="font-[JetBrains_Mono] font-bold tracking-tight"
									style="font-size:28px; letter-spacing:-.03em"
								>
									{imp.value}
								</div>
								<div class="mt-0.5 text-[12px]" style="color:#ffffff60">{imp.label}</div>
							</div>
						</div>
					{/if}
				{/each}

				<!-- dots -->
				<div class="mt-4 flex gap-1">
					{#each impacts as _, i (i)}
						<button
							onclick={() => (impactIndex = i)}
							aria-label="Показник {i + 1}"
							class="h-[3px] flex-1 cursor-pointer rounded-sm transition-all duration-400"
							style="background: {i === impactIndex ? '#FFD700' : '#ffffff15'}; box-shadow: {i ===
							impactIndex
								? '0 0 8px #FFD70040'
								: 'none'}"
						></button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Quick stats row -->
		<div class="flex gap-3" style="animation: up .5s ease .35s both">
			{#each [['8', 'компаній', 'на платформі'], ['4', 'єдинороги', '$1B+'], ['169', 'країн', 'покриття'], ['80M+', 'users', 'загалом']] as [v, l, sub], i (i)}
				<div
					class="flex-1 cursor-default rounded-2xl p-4 transition-all duration-200"
					style="background:#ffffff08; border:1px solid #ffffff08"
					onmouseenter={(e) => {
						(e.currentTarget as HTMLElement).style.background = '#ffffff12';
						(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
					}}
					onmouseleave={(e) => {
						(e.currentTarget as HTMLElement).style.background = '#ffffff08';
						(e.currentTarget as HTMLElement).style.transform = 'none';
					}}
					role="presentation"
				>
					<div class="font-[JetBrains_Mono] text-xl font-bold tracking-tight">{v}</div>
					<div class="mt-0.5 text-xs font-semibold" style="color:#ffffffc0">{l}</div>
					<div class="text-[10px]" style="color:#ffffff40">{sub}</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ─── MAIN CONTENT ─── -->
<div class="mx-auto max-w-[1040px] px-6 pb-24">
	<!-- ─── CATEGORY FILTER ─── -->
	<div class="mb-8 flex flex-wrap gap-1.5" style="animation: fadeIn .4s ease both">
		{#each spotlightCategories as cat, i (cat)}
			<button
				onclick={() => (activeFilter = cat)}
				class="cursor-pointer rounded-xl px-4 py-2 font-[Outfit] text-[13px] transition-all duration-200"
				style="
					background: {activeFilter === cat ? '#0057B7' : '#fff'};
					border: 1.5px solid {activeFilter === cat ? '#0057B7' : '#e7e5e4'};
					color: {activeFilter === cat ? '#fff' : '#57534e'};
					font-weight: {activeFilter === cat ? 700 : 500};
					animation: scaleIn .25s ease {i * 0.03}s both
				"
				onmouseenter={(e) => {
					if (activeFilter !== cat) {
						(e.currentTarget as HTMLElement).style.borderColor = '#0057B740';
						(e.currentTarget as HTMLElement).style.color = '#0057B7';
					}
				}}
				onmouseleave={(e) => {
					if (activeFilter !== cat) {
						(e.currentTarget as HTMLElement).style.borderColor = '#e7e5e4';
						(e.currentTarget as HTMLElement).style.color = '#57534e';
					}
				}}
			>
				{cat === 'all' ? '🇺🇦 Усі' : cat}
			</button>
		{/each}
	</div>

	<!-- ─── FEATURED BRANDS (large editorial cards, 2-col) ─── -->
	{#if featuredBrands.length > 0}
		<div class="mb-5 grid gap-4 sm:grid-cols-2">
			{#each featuredBrands as brand, i (brand.name)}
				{@const isHov = hovBrand === brand.name}
				{@const isExp = expandedBrand === brand.name}
				<div
					class="relative overflow-hidden rounded-3xl bg-white transition-all duration-400"
					style="
						border: 1.5px solid {isHov ? brand.color + '30' : '#e7e5e4'};
						transform: {isHov ? 'translateY(-5px)' : 'none'};
						box-shadow: {isHov ? `0 24px 56px ${brand.color}0a` : '0 1px 3px #00000004'};
						animation: up .45s ease {i * 0.08}s both;
					"
					onmouseenter={() => (hovBrand = brand.name)}
					onmouseleave={() => (hovBrand = null)}
					role="presentation"
				>
					<!-- color accent bar -->
					<div
						class="h-1 transition-opacity duration-400"
						style="background: linear-gradient(90deg, {brand.color}, {brand.color}60); opacity: {isHov
							? 1
							: 0.2}"
					></div>
					<!-- glow -->
					<div
						class="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full transition-opacity duration-400"
						style="background:{brand.color}; opacity:{isHov ? 0.06 : 0}; filter:blur(30px)"
					></div>

					<div class="p-7">
						<div class="flex gap-5">
							<div
								class="grid h-16 w-16 flex-shrink-0 place-items-center rounded-[18px] font-[Outfit] text-2xl font-bold transition-transform duration-300"
								style="
									background:{brand.color}0a;
									color:{brand.color};
									border:2px solid {brand.color}14;
									transform:{isHov ? 'scale(1.1) rotate(-3deg)' : 'none'};
								"
							>
								{brand.letter}
							</div>
							<div class="flex-1">
								<div class="mb-1 flex flex-wrap items-center gap-2">
									<span class="font-[Outfit] text-xl font-extrabold tracking-tight"
										>{brand.name}</span
									>
									<span
										class="rounded-full px-2.5 py-0.5 font-[Outfit] text-[10px] font-bold"
										style="background:{brand.color}0c; color:{brand.color}; border:1px solid {brand.color}18"
									>
										{brand.tag}
									</span>
								</div>
								<div class="mb-2 flex items-center gap-2">
									<span class="font-[Outfit] text-[11px] text-stone-400">{brand.category}</span>
									<span class="h-1 w-1 rounded-full bg-stone-300"></span>
									<span class="font-[JetBrains_Mono] text-[11px] font-bold text-stone-600"
										>{brand.users} users</span
									>
								</div>
								<p class="font-[Outfit] text-[13px] leading-relaxed text-stone-500">
									{brand.description}
								</p>
							</div>
						</div>

						<!-- expand toggle -->
						<button
							onclick={() => (expandedBrand = isExp ? null : brand.name)}
							class="mt-4 flex cursor-pointer items-center gap-1.5 border-none bg-transparent font-[Outfit] text-xs font-semibold transition-all duration-200"
							style="color:{brand.color}"
						>
							{isExp ? 'Менше' : 'Детальніше'}
							<svg
								width="10"
								height="10"
								viewBox="0 0 20 20"
								style="transition:transform .3s; transform:{isExp ? 'rotate(180deg)' : 'none'}"
							>
								<path
									d="M5 7.5L10 12.5L15 7.5"
									stroke="currentColor"
									stroke-width="2.5"
									fill="none"
									stroke-linecap="round"
								/>
							</svg>
						</button>
					</div>

					<!-- expanded details -->
					<div
						style="max-height:{isExp
							? '200px'
							: '0'}; overflow:hidden; transition:max-height .4s cubic-bezier(.4,0,.2,1), opacity .3s; opacity:{isExp
							? 1
							: 0}"
					>
						<div class="px-7 pb-6">
							<div class="mb-3 flex gap-2">
								{#each ['Надійний', 'Інноваційний', 'Глобальний'] as t (t)}
									<span
										class="rounded-lg px-2.5 py-1 font-[Outfit] text-[10px] font-semibold text-stone-600"
										style="background:#f5f5f4"
									>
										{t}
									</span>
								{/each}
							</div>
							<div class="grid grid-cols-3 gap-3">
								{#each [[brand.users, 'Користувачів'], ['⭐ 4.8', 'Рейтинг'], ['🇺🇦', 'Зроблено в UA']] as [v, l] (l)}
									<div class="rounded-xl border border-stone-100 bg-stone-50 p-3 text-center">
										<div class="font-[JetBrains_Mono] text-base font-bold">{v}</div>
										<div class="font-[Outfit] text-[10px] text-stone-400">{l}</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<!-- ─── REGULAR SPOTLIGHT BRANDS (compact grid) ─── -->
	{#if regularBrands.length > 0}
		<div class="mb-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
			{#each regularBrands as brand, i (brand.name)}
				{@const isHov = hovBrand === brand.name}
				<div
					class="relative overflow-hidden rounded-2xl bg-white p-5 transition-all duration-300"
					style="
						border: 1.5px solid {isHov ? brand.color + '28' : '#e7e5e4'};
						transform: {isHov ? 'translateY(-3px)' : 'none'};
						box-shadow: {isHov ? `0 12px 32px ${brand.color}08` : 'none'};
						cursor: default;
						animation: up .35s ease {i * 0.05}s both;
					"
					onmouseenter={() => (hovBrand = brand.name)}
					onmouseleave={() => (hovBrand = null)}
					role="presentation"
				>
					<div
						class="pointer-events-none absolute -top-5 -right-5 h-20 w-20 rounded-full transition-opacity duration-400"
						style="background:{brand.color}; opacity:{isHov ? 0.06 : 0}; filter:blur(20px)"
					></div>

					<div class="flex gap-3.5">
						<div
							class="grid h-12 w-12 flex-shrink-0 place-items-center rounded-[14px] font-[Outfit] text-lg font-bold transition-transform duration-300"
							style="
								background:{brand.color}0a;
								color:{brand.color};
								border:1.5px solid {brand.color}14;
								transform:{isHov ? 'scale(1.08) rotate(-2deg)' : 'none'};
							"
						>
							{brand.letter}
						</div>
						<div class="flex-1">
							<div class="mb-1 flex flex-wrap items-center gap-1.5">
								<span class="font-[Outfit] text-[15px] font-extrabold tracking-tight"
									>{brand.name}</span
								>
								<span
									class="rounded-full px-2 py-0.5 font-[Outfit] text-[9px] font-bold"
									style="background:{brand.color}0c; color:{brand.color}"
								>
									{brand.tag}
								</span>
							</div>
							<p class="mb-2.5 font-[Outfit] text-[11px] leading-snug text-stone-500">
								{brand.description}
							</p>
							<div class="flex items-center gap-1.5">
								<span class="font-[JetBrains_Mono] text-[13px] font-bold text-stone-800"
									>{brand.users}</span
								>
								<span class="font-[Outfit] text-[10px] text-stone-400">users</span>
								<span
									class="ml-auto font-[Outfit] text-[11px] font-bold transition-all duration-300"
									style="color:{brand.color}; opacity:{isHov ? 1 : 0}; transform:{isHov
										? 'translateX(0)'
										: 'translateX(-6px)'}"
								>
									→
								</span>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<!-- ─── CATALOG BRANDS (from API) ─── -->
	{#if data.isAuthenticated && catalogBrands.length > 0}
		<div class="mb-14">
			<div class="mb-6 text-center">
				<span
					class="font-[JetBrains_Mono] text-[10px] font-bold tracking-widest text-stone-400 uppercase"
				>
					В нашому каталозі
				</span>
				<h2 class="mt-1.5 font-[Outfit] text-2xl font-extrabold tracking-tight text-stone-900">
					Українські альтернативи
				</h2>
			</div>

			<div class="flex flex-col gap-10">
				{#each catalogByCategory as group (group.name)}
					<div>
						<div class="mb-4 flex items-center gap-3">
							<h3 class="font-[Outfit] text-base font-extrabold text-stone-900">{group.name}</h3>
							<span
								class="rounded-full bg-stone-100 px-2.5 py-0.5 font-[Outfit] text-[11px] font-bold text-stone-400"
							>
								{group.brands.length}
							</span>
							<div class="h-px flex-1 bg-stone-100"></div>
						</div>

						<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
							{#each group.brands as brand, i (brand.name)}
								<div
									class="flex animate-up flex-col gap-3 rounded-2xl border border-stone-100 bg-white p-5 transition-all duration-250 hover:-translate-y-0.5 hover:shadow-md"
									style="animation-delay:{i * 0.05}s; border-color:{brand.color}18"
								>
									<div class="flex items-start gap-3">
										<AltLogo url={brand.url} letter={brand.letter} color={brand.color} size={44} />
										<div class="min-w-0 flex-1">
											<div class="mb-0.5 flex flex-wrap items-center gap-1.5">
												{#if brand.url}
													<a
														href={brand.url}
														target="_blank"
														rel="noopener noreferrer"
														class="font-[Outfit] text-sm font-bold text-stone-900 no-underline hover:underline"
													>
														{brand.name}
													</a>
												{:else}
													<span class="font-[Outfit] text-sm font-bold text-stone-900"
														>{brand.name}</span
													>
												{/if}
												<span class="text-[13px]">🇺🇦</span>
											</div>
											<Tag type={brand.pricingModel} />
										</div>
									</div>

									{#if brand.description}
										<p class="font-[Outfit] text-xs leading-relaxed text-stone-500">
											{brand.description}
										</p>
									{/if}

									<div class="mt-auto flex items-center justify-between gap-2">
										<div
											class="flex items-center gap-1.5 rounded-lg border border-stone-100 bg-stone-50 px-2.5 py-1"
										>
											<span class="font-[Outfit] text-[10px] text-stone-400">замість</span>
											<span class="font-[Outfit] text-[11px] font-bold text-stone-700"
												>{brand.replacesProduct}</span
											>
											<span class="text-[11px]">{brand.replacesFlag}</span>
										</div>

										{#if brand.reviewCount > 0}
											<div class="flex flex-col items-end">
												<span class="font-[JetBrains_Mono] text-[13px] font-bold text-amber-500"
													>★ {brand.rating.toFixed(1)}</span
												>
												<span class="font-[Outfit] text-[9px] text-stone-400"
													>{brand.reviewCount} {reviewSuffix(brand.reviewCount)}</span
												>
											</div>
										{:else}
											<span class="font-[Outfit] text-[11px] text-stone-300 italic"
												>немає відгуків</span
											>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:else if !data.isAuthenticated}
		<div
			class="mb-14 rounded-[28px] border border-stone-200 bg-white p-16 text-center"
			style="animation: scaleIn .4s ease both"
		>
			<div class="mb-4 text-5xl" style="animation: float 3s ease-in-out infinite">🔒</div>
			<h3 class="mb-2 font-[Outfit] text-xl font-extrabold">
				Увійдіть, щоб побачити каталог брендів
			</h3>
			<p class="mx-auto mb-5 max-w-[300px] font-[Outfit] text-sm text-stone-500">
				Повний список українських альтернатив доступний після авторизації
			</p>
			<a
				href={resolve('/sign-in')}
				class="inline-block cursor-pointer rounded-xl border-[1.5px] border-[#0057B7] bg-[#0057B7] px-6 py-2.5 font-[Outfit] text-[13px] font-bold text-white no-underline transition-colors hover:bg-[#0046a0]"
			>
				Увійти
			</a>
		</div>
	{/if}

	<!-- ─── SUCCESS STORIES ─── -->
	<div class="mb-14">
		<div class="mb-7 text-center" style="animation: up .4s ease both">
			<span
				class="font-[JetBrains_Mono] text-[10px] font-bold tracking-widest text-[#0057B7] uppercase"
			>
				Історії переходу
			</span>
			<h2 class="mt-1.5 font-[Outfit] text-2xl font-extrabold tracking-tight text-stone-900">
				Люди вже обрали українське
			</h2>
		</div>

		<div class="grid gap-3.5 sm:grid-cols-3">
			{#each stories as story, i (story.user)}
				<div
					class="rounded-[22px] border border-stone-100 bg-white p-6 transition-all duration-250"
					style="animation: up .4s ease {i * 0.08}s both"
					onmouseenter={(e) => {
						(e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
						(e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px ${story.color}08`;
					}}
					onmouseleave={(e) => {
						(e.currentTarget as HTMLElement).style.transform = 'none';
						(e.currentTarget as HTMLElement).style.boxShadow = 'none';
					}}
					role="presentation"
				>
					<!-- stars -->
					<div class="mb-3">
						{#each Array(5) as _, s (s)}
							<span
								style="color:{s < story.stars
									? '#FBBF24'
									: '#e7e5e4'}; font-size:14px; margin-right:1px">★</span
							>
						{/each}
					</div>

					<p class="mb-4 font-[Outfit] text-[13px] leading-relaxed text-stone-600 italic">
						«{story.text}»
					</p>

					<div class="flex items-center gap-2.5 border-t border-stone-100 pt-3.5">
						<div
							class="grid h-8 w-8 place-items-center rounded-full font-[Outfit] text-[11px] font-bold"
							style="background:{story.color}0c; color:{story.color}; border:1.5px solid {story.color}14"
						>
							{story.initials}
						</div>
						<div>
							<div class="font-[Outfit] text-[13px] font-bold">{story.user}</div>
							<div class="font-[Outfit] text-[10px] text-stone-400">перейшла на {story.brand}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ─── TIMELINE ─── -->
	<div class="mb-14">
		<div class="mb-8 text-center" style="animation: up .4s ease both">
			<span
				class="font-[JetBrains_Mono] text-[10px] font-bold tracking-widest text-amber-500 uppercase"
			>
				Шлях UA-Tech
			</span>
			<h2 class="mt-1.5 font-[Outfit] text-2xl font-extrabold tracking-tight text-stone-900">
				Історія українських інновацій
			</h2>
		</div>

		<div class="relative mx-auto max-w-[640px]">
			<!-- vertical line -->
			<div
				class="absolute top-0 bottom-0 left-6 w-0.5 rounded-sm"
				style="background:linear-gradient(180deg,#e7e5e4,#0057B720,#e7e5e4)"
			></div>

			{#each milestones as m, i (m.year)}
				<div class="relative mb-5 flex gap-5" style="animation: slideR .4s ease {i * 0.08}s both">
					<button
						class="relative z-10 grid h-12 w-12 flex-shrink-0 place-items-center rounded-[14px] border-2 border-stone-200 bg-white font-[JetBrains_Mono] text-[11px] font-bold text-[#0057B7] transition-all duration-250"
						onmouseenter={(e) => {
							const el = e.currentTarget as HTMLElement;
							el.style.background = '#0057B7';
							el.style.color = '#fff';
							el.style.borderColor = '#0057B7';
							el.style.transform = 'scale(1.1)';
						}}
						onmouseleave={(e) => {
							const el = e.currentTarget as HTMLElement;
							el.style.background = '#fff';
							el.style.color = '#0057B7';
							el.style.borderColor = '#e7e5e4';
							el.style.transform = 'none';
						}}
					>
						{m.year}
					</button>

					<div
						class="flex-1 rounded-2xl border border-stone-100 bg-white p-3.5 transition-all duration-200"
						onmouseenter={(e) => {
							(e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
							(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px #00000006';
						}}
						onmouseleave={(e) => {
							(e.currentTarget as HTMLElement).style.transform = 'none';
							(e.currentTarget as HTMLElement).style.boxShadow = 'none';
						}}
						role="presentation"
					>
						<p class="font-[Outfit] text-[13px] leading-relaxed text-stone-600">{m.event}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ─── CTA ─── -->
	<div
		class="relative overflow-hidden rounded-3xl p-12 text-center text-white"
		style="background:linear-gradient(135deg,#0057B7 0%,#1e40af 100%); animation: up .5s ease .2s both"
	>
		<div
			class="pointer-events-none absolute top-0 left-1/2 -ml-24 h-48 w-48 rounded-full opacity-[0.08] blur-3xl"
			style="background:#FFD700; animation:waveFloat 10s ease-in-out infinite"
		></div>

		<div class="relative">
			<div class="mb-4 text-4xl" style="animation: float 5s ease-in-out infinite">🇺🇦</div>
			<h2 class="mb-3 font-[Outfit] text-2xl font-black tracking-tight sm:text-3xl">
				Кожен вибір має значення
			</h2>
			<p
				class="mx-auto mb-7 max-w-[440px] font-[Outfit] text-[15px] leading-relaxed"
				style="color:#ffffffa0"
			>
				Обираючи українське — ти створюєш робочі місця, підтримуєш інновації та наближаєш перемогу
				💛
			</p>

			<div class="flex flex-wrap justify-center gap-2.5">
				<a
					href={resolve('/catalog')}
					class="inline-flex cursor-pointer items-center gap-2 rounded-[14px] bg-white px-6 py-3 font-[Outfit] text-[14px] font-bold text-[#0057B7] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
				>
					Знайти альтернативу
				</a>
				<a
					href={resolve('/sign-up')}
					class="inline-flex cursor-pointer items-center gap-2 rounded-[14px] px-6 py-3 font-[Outfit] text-[14px] font-bold text-white no-underline transition-all duration-200 hover:bg-white/10"
					style="border:1.5px solid #ffffff30"
				>
					Додати бренд →
				</a>
			</div>
		</div>
	</div>
</div>

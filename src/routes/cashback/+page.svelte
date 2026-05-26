<script lang="ts">
	import { CB_CATS, type CashbackProduct } from '$lib/entities/cashback/data';
	import CashbackProductCard from '$lib/entities/cashback/ui/CashbackProductCard.svelte';
	import VerificationTool from '$lib/features/cashback-verify/VerificationTool.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const allProducts = $derived(data.catalogProducts ?? []);

	let search = $state('');
	let activeCat = $state<string | null>(null);
	let hovStep = $state<number | null>(null);

	const availableCats = $derived([...new Set(allProducts.map((p) => p.cat))]);

	const catCounts = $derived(
		Object.fromEntries(availableCats.map((c) => [c, allProducts.filter((p) => p.cat === c).length]))
	);

	const filtered = $derived(
		allProducts.filter((p) => {
			const mc = !activeCat || p.cat === activeCat;
			const ms =
				!search ||
				p.name.toLowerCase().includes(search.toLowerCase()) ||
				p.brand.toLowerCase().includes(search.toLowerCase());
			return mc && ms;
		})
	);

	function selectProduct(p: CashbackProduct) {
		search = p.name;
	}

	const steps = [
		{
			n: '1',
			icon: '🛒',
			title: 'Обирай',
			desc: 'Купуй товари українського виробництва в магазинах'
		},
		{ n: '2', icon: '📱', title: 'Скануй', desc: 'Відскануй QR-код чеку через додаток Дія' },
		{ n: '3', icon: '💸', title: 'Отримуй', desc: '10% повернеться на картку протягом 5 днів' }
	];
</script>

<section class="mx-auto px-3 pb-14 sm:px-6 sm:pb-20">
	<!-- ═══ HERO ═══ -->
	<div
		class="relative mb-6 animate-fade-in overflow-hidden rounded-[20px] px-5 pt-8 pb-6 sm:mb-11 sm:rounded-none sm:rounded-b-[36px] sm:px-12 sm:pt-14 sm:pb-12"
		style="background: linear-gradient(135deg,#064e3b 0%,#065f46 30%,#047857 70%,#059669 100%); color: #fff;"
	>
		<!-- Dot grid -->
		<div
			class="absolute inset-0 opacity-[0.025]"
			style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 22px 22px"
		></div>
		<!-- Orbs -->
		<div
			class="absolute -top-12 right-10 h-[300px] w-[300px] animate-wave-float rounded-full blur-[60px]"
			style="background: #fbbf24; opacity: 0.06"
		></div>
		<div
			class="absolute -bottom-10 -left-5 h-[220px] w-[220px] animate-wave-float rounded-full blur-[50px]"
			style="background: #34d399; opacity: 0.07; animation-delay: 7s"
		></div>

		<div class="relative">
			<div class="mb-10 flex flex-wrap items-start justify-between gap-8">
				<!-- Left copy -->
				<div class="max-w-[480px] animate-slide-r" style="animation-delay: 0.1s">
					<div
						class="mb-5 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-[5px]"
						style="background: #fbbf2418; border-color: #fbbf2430"
					>
						<span
							class="grid h-[22px] w-[22px] place-items-center rounded-full text-[11px]"
							style="background: #fbbf2430">💳</span
						>
						<span
							class="font-[JetBrains_Mono] text-[10px] font-bold tracking-[.08em] uppercase"
							style="color: #fbbf24">Національний кешбек</span
						>
					</div>
					<h1
						class="m-0 mb-3.5 leading-[1.05] font-extrabold tracking-tight"
						style="font-size: clamp(30px,5vw,48px); letter-spacing: -0.05em"
					>
						Купуй <span
							style="background: linear-gradient(135deg,#fbbf24,#f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent"
							>українське</span
						><br />— отримуй кешбек
					</h1>
					<p class="m-0 text-base leading-[1.55]" style="color: #ffffffaa">
						Повернення 10% вартості за товари українського виробництва через додаток Дія
					</p>
				</div>

				<!-- Stats -->
				<div class="flex flex-wrap animate-slide-l gap-2 sm:gap-3" style="animation-delay: 0.2s">
					{#each [['10%', 'кешбек', '💰', '#fbbf24'], [String(availableCats.length), 'категорій', '📂', '#34d399'], [`${allProducts.length}+`, 'брендів', '🏷️', '#a7f3d0']] as [v, l, ic, accent], i (l)}
						<div
							class="flex-1 min-w-[90px] animate-up rounded-[20px] border p-4 sm:p-5 text-center"
							style="background: #ffffff08; border-color: #ffffff10; animation-delay: {0.25 +
								i * 0.08}s"
						>
							<div
								class="mx-auto mb-2.5 grid h-10 w-10 place-items-center rounded-xl text-lg"
								style="background: {accent}18"
							>
								{ic}
							</div>
							<div
								class="font-[JetBrains_Mono] text-2xl leading-none font-extrabold tracking-tight"
							>
								{v}
							</div>
							<div class="mt-[3px] text-[10px]" style="color: #ffffff50">{l}</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- How it works steps inside hero -->
			<div class="grid animate-up grid-cols-1 gap-3 sm:grid-cols-3" style="animation-delay: 0.35s">
				{#each steps as s, i (s.n)}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="rounded-[18px] border p-5 transition-all duration-300"
						style="background: #ffffff08; border-color: {hovStep === i
							? '#ffffff20'
							: '#ffffff08'}; transform: {hovStep === i ? 'translateY(-2px)' : 'none'}"
						onmouseenter={() => (hovStep = i)}
						onmouseleave={() => (hovStep = null)}
					>
						<div class="mb-2.5 flex items-center gap-2.5">
							<div
								class="grid h-9 w-9 place-items-center rounded-[10px] text-base transition-all duration-300"
								style="background: {hovStep === i ? '#fbbf2420' : '#ffffff0c'}"
							>
								{s.icon}
							</div>
							<div>
								<span class="font-[JetBrains_Mono] text-[10px] font-bold" style="color: #fbbf24"
									>Крок {s.n}</span
								>
								<div class="text-[15px] font-extrabold">{s.title}</div>
							</div>
						</div>
						<p class="m-0 text-xs leading-[1.5]" style="color: #ffffff60">{s.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ═══ VERIFICATION TOOL ═══ -->
	<VerificationTool bind:search onSelect={selectProduct} />

	<!-- ═══ CATEGORY CHIPS ═══ -->
	<div class="mb-6 flex flex-wrap gap-1.5">
		<button
			onclick={() => (activeCat = null)}
			class="flex cursor-pointer items-center gap-1.5 rounded-xl border px-4 py-[9px] font-[Outfit] text-[13px] font-bold transition-all duration-200"
			style="background: {!activeCat ? '#065f46' : '#fff'}; border-color: {!activeCat
				? '#065f46'
				: '#e7e5e4'}; color: {!activeCat ? '#fff' : '#57534e'}"
		>
			Усі <span class="font-[JetBrains_Mono] text-[10px] opacity-60">{allProducts.length}</span>
		</button>
		{#each availableCats as c, i (c)}
			{@const n = catCounts[c] ?? 0}
			{#if n > 0}
				{@const act = activeCat === c}
				<button
					onclick={() => (activeCat = act ? null : c)}
					class="flex animate-scale-in cursor-pointer items-center gap-[5px] rounded-xl border px-3.5 py-[9px] font-[Outfit] text-[13px] transition-all duration-200"
					style="background: {act ? '#f0fdf4' : '#fff'}; border-color: {act
						? '#bbf7d0'
						: '#e7e5e4'}; color: {act ? '#065f46' : '#57534e'}; font-weight: {act
						? 700
						: 500}; animation-delay: {(i + 1) * 0.03}s"
				>
					{c}
					<span
						class="rounded-[5px] px-1.5 py-[1px] font-[JetBrains_Mono] text-[10px]"
						style="background: {act ? '#bbf7d020' : '#f5f5f4'}; color: {act
							? '#065f46'
							: '#a8a29e'}">{n}</span
					>
				</button>
			{/if}
		{/each}
	</div>

	<!-- ═══ MAIN AREA (sidebar + grid) ═══ -->
	<div class="flex items-start gap-6">
		<!-- Sidebar — hidden on mobile -->
		<div class="hidden sm:block sticky top-[76px] w-[200px] shrink-0 animate-slide-r" style="animation-delay: 0.2s">
			<!-- Category nav -->
			<div class="mb-3.5 rounded-[20px] border border-stone-200 bg-white p-4 px-4">
				<p
					class="mb-2.5 font-[JetBrains_Mono] text-[10px] font-bold tracking-widest text-stone-400 uppercase"
				>
					Категорії
				</p>
				{#each availableCats as c, i (c)}
					{@const n = catCounts[c] ?? 0}
					{#if n > 0}
						{@const act = activeCat === c}
						<button
							onclick={() => (activeCat = act ? null : c)}
							class="mb-[1px] w-full animate-slide-r cursor-pointer rounded-[9px] border-none px-2.5 py-2 text-left font-[Outfit] text-xs transition-all duration-150"
							style="background: {act ? '#f0fdf4' : 'transparent'}; color: {act
								? '#065f46'
								: '#78716c'}; font-weight: {act ? 700 : 500}; animation-delay: {i * 0.03}s"
						>
							{c}
							<span
								class="float-right font-[JetBrains_Mono] text-[10px]"
								style="color: {act ? '#065f46' : '#d6d3d1'}">{n}</span
							>
						</button>
					{/if}
				{/each}
			</div>

			<!-- How to get card -->
			<div
				class="rounded-[20px] border-[1.5px] border-green-200 p-4"
				style="background: linear-gradient(135deg,#ecfdf5,#f0fdf4)"
			>
				<div class="mb-2.5 text-xs font-extrabold" style="color: #065f46">💡 Як отримати?</div>
				{#each ['Купуй товари з позначкою 🇺🇦', 'Скануй чек у Дії', 'Отримуй 10% на картку'] as s, i (s)}
					<div class="mb-2 flex items-start gap-2">
						<div
							class="mt-[1px] grid h-5 w-5 shrink-0 place-items-center rounded-[6px] text-[10px] font-extrabold"
							style="background: #065f4612; color: #065f46"
						>
							{i + 1}
						</div>
						<span class="text-[11px] leading-[1.4]" style="color: #065f46cc">{s}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Product grid -->
		<div class="flex-1">
			<!-- Count bar -->
			<div class="mb-3.5 flex items-center justify-between px-0.5">
				<span class="text-xs text-stone-400">
					<strong class="font-[JetBrains_Mono] text-stone-900">{filtered.length}</strong>
					{filtered.length === 1 ? 'продукт' : 'продуктів'}
					{#if activeCat}
						· <strong class="text-[#065f46]">{activeCat}</strong>
					{/if}
				</span>
				{#if search || activeCat}
					<button
						onclick={() => {
							activeCat = null;
							search = '';
						}}
						class="cursor-pointer border-none bg-none font-[Outfit] text-[11px] font-semibold text-stone-400 transition-colors duration-150 hover:text-stone-900"
					>
						Скинути фільтри
					</button>
				{/if}
			</div>

			{#if filtered.length > 0}
				<div class="grid gap-3" style="grid-template-columns: repeat(auto-fill,minmax(240px,1fr))">
					{#each filtered as p, i (p.name)}
						<CashbackProductCard product={p} index={i} onclick={selectProduct} />
					{/each}
				</div>

				<div class="animate-up pt-9 text-center" style="animation-delay: 0.2s">
					<p class="text-xs text-stone-400">
						Усього <strong class="text-stone-900">{allProducts.length}</strong> брендів у
						<strong class="text-stone-900">{availableCats.length}</strong> категоріях · Кешбек
						<strong style="color: #065f46">10%</strong> через Дію
					</p>
				</div>
			{:else}
				<div
					class="animate-scale-in rounded-[28px] border border-stone-200 bg-white py-16 text-center"
				>
					<div class="mb-4 animate-float text-5xl">📭</div>
					<h3 class="mb-2 text-xl font-extrabold">Нічого не знайдено</h3>
					<p class="mx-auto mb-5 max-w-[300px] text-sm text-stone-500">
						Спробуйте інший запит або оберіть категорію
					</p>
					<button
						onclick={() => {
							activeCat = null;
							search = '';
						}}
						class="cursor-pointer rounded-xl border-[1.5px] border-stone-200 bg-white px-6 py-2.5 font-[Outfit] text-[13px] font-bold hover:bg-stone-50"
					>
						Показати все
					</button>
				</div>
			{/if}
		</div>
	</div>
</section>

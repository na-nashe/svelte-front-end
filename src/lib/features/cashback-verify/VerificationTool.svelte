<script lang="ts">
	import { CB, type CashbackProduct } from '$lib/entities/cashback/data';

	let {
		search = $bindable(''),
		onSelect
	}: {
		search?: string;
		onSelect?: (p: CashbackProduct) => void;
	} = $props();

	let checked = $state<CashbackProduct | null>(null);
	let showRes = $state(false);
	let inputEl: HTMLInputElement | undefined = $state();
	let resultEl: HTMLDivElement | undefined = $state();

	function doCheck(val?: string) {
		const q = (val || search).trim().toLowerCase();
		if (!q) return;
		const found = CB.find(
			(p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
		);
		checked = found || null;
		showRes = true;
		setTimeout(() => resultEl?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
	}

	function selectProduct(p: CashbackProduct) {
		search = p.name;
		checked = p;
		showRes = true;
		onSelect?.(p);
		setTimeout(() => resultEl?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
	}

	const popularBrands = $derived(CB.filter((p) => p.pop));
</script>

<div
	bind:this={resultEl}
	class="mb-11 animate-up rounded-[28px] border-[1.5px] border-stone-200 bg-white p-9 shadow-[0_4px_32px_#00000004]"
	style="animation-delay: 0.1s"
>
	<!-- Header -->
	<div class="mb-5 flex items-center gap-2.5">
		<div
			class="grid h-10 w-10 place-items-center rounded-xl border-[1.5px] border-green-200 bg-green-50 text-lg"
		>
			🔍
		</div>
		<div>
			<h2 class="m-0 text-xl font-extrabold tracking-tight">Перевірити продукт</h2>
			<p class="m-0 text-xs text-stone-500">Дізнайтеся чи діє кешбек на ваш товар</p>
		</div>
	</div>

	<!-- Search input -->
	<div class="mb-[18px] flex gap-2">
		<div
			class="flex flex-1 cursor-text items-center gap-3 rounded-full border-2 border-stone-200 bg-stone-50 px-[22px] py-3 transition-all duration-[250ms] focus-within:border-[#065f46]"
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#a8a29e"
				stroke-width="2.5"
				class="flex-shrink-0"
			>
				<circle cx="11" cy="11" r="7" />
				<line x1="16.5" y1="16.5" x2="21" y2="21" />
			</svg>
			<input
				bind:this={inputEl}
				bind:value={search}
				oninput={() => (showRes = false)}
				onkeydown={(e) => {
					if (e.key === 'Enter') doCheck();
				}}
				placeholder="Назва товару або бренду…"
				class="flex-1 border-none bg-transparent font-[Outfit] text-base font-medium text-stone-900 outline-none"
			/>
			{#if search}
				<button
					onclick={() => {
						search = '';
						showRes = false;
						inputEl?.focus();
					}}
					class="grid h-6 w-6 cursor-pointer place-items-center rounded-full border-none bg-stone-100 text-[11px] text-stone-500"
				>
					✕
				</button>
			{/if}
		</div>
		<button
			onclick={() => doCheck()}
			class="flex-shrink-0 cursor-pointer rounded-full border-none bg-[#065f46] px-8 py-3.5 font-[Outfit] text-[15px] font-bold text-white shadow-[0_4px_16px_#06593f20] transition-all duration-200 hover:scale-[1.03] hover:bg-[#047857] hover:shadow-[0_8px_24px_#06593f30]"
		>
			Перевірити
		</button>
	</div>

	<!-- Result -->
	{#if showRes}
		<div class="mb-1.5 animate-pop">
			{#if checked}
				<!-- Found -->
				<div
					class="overflow-hidden rounded-[20px] border-2 border-emerald-600 bg-gradient-to-br from-green-50 via-green-50/50 to-green-50"
				>
					<div class="p-[26px_28px]">
						<div class="flex items-center gap-4">
							<div
								class="grid h-14 w-14 animate-scale-in place-items-center rounded-2xl border-2 border-[#05966920] bg-[#05966915]"
								style="animation-delay: 0.1s"
							>
								<svg
									width="30"
									height="30"
									viewBox="0 0 24 24"
									fill="none"
									stroke="#059669"
									stroke-width="3"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M20 6L9 17l-5-5" />
								</svg>
							</div>
							<div class="flex-1 animate-slide-r" style="animation-delay: 0.15s">
								<div class="mb-1.5 flex items-center gap-2">
									<span class="text-[19px] font-black text-[#065f46]">Кешбек діє!</span>
									<span
										class="rounded-full bg-emerald-600 px-3.5 py-1 font-[JetBrains_Mono] text-[13px] font-bold text-white shadow-[0_2px_8px_#05966930]"
									>
										-{checked.pct}%
									</span>
								</div>
								<div class="flex flex-wrap gap-2">
									<div
										class="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-white py-1 pr-3 pl-1"
									>
										<div
											class="grid h-[22px] w-[22px] place-items-center rounded-[6px] text-[9px] font-extrabold"
											style="background: {checked.cl}10; color: {checked.cl}"
										>
											{checked.L}
										</div>
										<span class="text-xs font-bold text-[#065f46]">{checked.name}</span>
									</div>
									<span class="flex items-center gap-1 px-1 py-1 text-xs text-[#065f46aa]">
										{checked.brand} · {checked.cat} · 📍 {checked.origin}
									</span>
								</div>
							</div>
						</div>

						<!-- Tips -->
						<div class="mt-[18px] flex animate-up gap-2" style="animation-delay: 0.3s">
							{#each [['Відскануйте чек у Дії', '📱'], ['Кешбек за 5 днів', '⏱️'], ['На будь-яку картку', '💳']] as [text, icon]}
								<div
									class="flex flex-1 items-center gap-1.5 rounded-xl border border-green-200 bg-white px-3 py-2.5"
								>
									<span class="text-sm">{icon}</span>
									<span class="text-[11px] font-semibold text-[#065f46]">{text}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{:else}
				<!-- Not found -->
				<div
					class="overflow-hidden rounded-[20px] border-2 border-red-400 bg-gradient-to-br from-red-50 to-rose-50"
				>
					<div class="p-[26px_28px]">
						<div class="flex items-center gap-4">
							<div
								class="grid h-14 w-14 animate-scale-in place-items-center rounded-2xl bg-[#f8717112]"
							>
								<svg
									width="28"
									height="28"
									viewBox="0 0 24 24"
									fill="none"
									stroke="#dc2626"
									stroke-width="3"
									stroke-linecap="round"
								>
									<line x1="7" y1="7" x2="17" y2="17" />
									<line x1="17" y1="7" x2="7" y2="17" />
								</svg>
							</div>
							<div class="animate-slide-r" style="animation-delay: 0.1s">
								<div class="mb-1 text-[19px] font-black text-[#991b1b]">Не знайдено</div>
								<div class="text-[13px] text-[#991b1baa]">
									«{search}» не є учасником програми кешбеку
								</div>
							</div>
						</div>
						<div
							class="mt-4 animate-up rounded-xl border border-red-200 bg-white px-4 py-3"
							style="animation-delay: 0.2s"
						>
							<span class="text-xs text-stone-500"
								>💡 Спробуйте інший запит або перегляньте каталог нижче</span
							>
						</div>
					</div>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Popular quick-checks -->
	{#if !showRes}
		<div class="animate-up" style="animation-delay: 0.15s">
			<p
				class="mb-2.5 font-[JetBrains_Mono] text-[10px] font-bold tracking-widest text-stone-400 uppercase"
			>
				Популярні бренди
			</p>
			<div class="flex flex-wrap gap-1.5">
				{#each popularBrands as p, i (p.name)}
					<button
						onclick={() => selectProduct(p)}
						class="inline-flex animate-scale-in cursor-pointer items-center gap-1.5 rounded-full border-[1.5px] border-stone-200 bg-white py-2 pr-4 pl-2 font-[Outfit] text-xs font-semibold text-stone-700 transition-all duration-200 hover:-translate-y-px hover:border-[#065f46] hover:bg-[#065f46] hover:text-white"
						style="animation-delay: {i * 0.04}s"
					>
						<div
							class="grid h-[22px] w-[22px] place-items-center rounded-[7px] text-[9px] font-extrabold"
							style="background: {p.cl}10; color: {p.cl}; border: 1px solid {p.cl}15"
						>
							{p.L}
						</div>
						{p.name}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>

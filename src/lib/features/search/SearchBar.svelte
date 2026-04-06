<script lang="ts">
	import { ITEMS, POPS } from '$lib/entities/product/data';
	import Ratio from '$lib/shared/ui/Ratio.svelte';

	interface Suggestion {
		t: 'o' | 'a';
		name: string;
		fl: string;
		n?: number;
		parent?: string;
		cl?: string;
		L?: string;
		ratio?: number;
	}

	let {
		query = $bindable(''),
		big = false,
		onGo
	}: {
		query?: string;
		big?: boolean;
		onGo: (q: string) => void;
	} = $props();

	let open = $state(false);
	let inputEl: HTMLInputElement | undefined = $state();
	let blurTimeout: ReturnType<typeof setTimeout> | undefined;

	const sugs = $derived.by(() => {
		if (!query) return [];
		const lc = query.toLowerCase();
		const m: Suggestion[] = [];
		for (const it of ITEMS) {
			if (it.orig.toLowerCase().includes(lc) || it.kw.some((k) => k.includes(lc)))
				m.push({ t: 'o', name: it.orig, fl: it.flag, n: it.alts.length });
			for (const a of it.alts) {
				if (a.name.toLowerCase().includes(lc))
					m.push({
						t: 'a',
						name: a.name,
						fl: a.c2,
						parent: it.orig,
						cl: a.cl,
						L: a.L,
						ratio: a.ratio
					});
			}
		}
		return m.slice(0, 5);
	});

	const dd = $derived(open && (query === '' || sugs.length > 0 || query.length > 0));

	function fire(v?: string) {
		onGo(v || query);
		open = false;
	}

	function handleFocus() {
		clearTimeout(blurTimeout);
		open = true;
	}

	function handleBlur() {
		blurTimeout = setTimeout(() => (open = false), 160);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') fire();
		if (e.key === 'Escape') inputEl?.blur();
	}
</script>

<div class="relative w-full">
	<!-- Input bar -->
	<div
		class="flex items-center rounded-full bg-white transition-all duration-300
			{big ? 'gap-3.5 py-2 pr-2 pl-7' : 'gap-2 py-1 pr-1 pl-4'}
			{open
			? 'border-2 border-stone-900 shadow-[0_0_0_4px_#1c191706,0_16px_48px_#00000010]'
			: big
				? 'border-2 border-stone-200 shadow-[0_4px_32px_#00000006]'
				: 'border-2 border-stone-200'}"
	>
		<svg
			width={big ? 20 : 16}
			height={big ? 20 : 16}
			viewBox="0 0 24 24"
			fill="none"
			stroke={open ? '#1c1917' : '#a8a29e'}
			stroke-width="2.5"
			class="transition-colors duration-200"
		>
			<circle cx="11" cy="11" r="7" />
			<line x1="16.5" y1="16.5" x2="21" y2="21" />
		</svg>
		<input
			bind:this={inputEl}
			bind:value={query}
			onfocus={handleFocus}
			onblur={handleBlur}
			onkeydown={handleKeydown}
			placeholder="Назва продукту…"
			class="min-w-0 flex-1 border-none bg-transparent font-[Outfit] font-medium text-stone-900 outline-none
				{big ? 'text-[17px]' : 'text-sm'}"
		/>
		{#if query}
			<button
				onclick={() => {
					query = '';
					inputEl?.focus();
				}}
				class="grid h-6 w-6 flex-shrink-0 cursor-pointer place-items-center rounded-full border-none bg-stone-100 text-[11px] text-stone-500 transition-all duration-150 hover:bg-stone-200"
			>
				✕
			</button>
		{/if}
		<button
			onclick={() => fire()}
			class="flex-shrink-0 cursor-pointer rounded-full border-none bg-stone-900 font-[Outfit] font-bold whitespace-nowrap text-white transition-all duration-150 hover:bg-stone-800
				{big ? 'px-7 py-3 text-[15px]' : 'px-[18px] py-2 text-xs'}"
		>
			Знайти
		</button>
	</div>

	<!-- Dropdown -->
	{#if dd}
		<div
			class="absolute top-[calc(100%+8px)] right-0 left-0 z-[1002] animate-pop rounded-[20px] bg-white p-2 shadow-[0_20px_60px_#00000014,0_0_0_1px_#0000000a]"
		>
			{#if query === ''}
				<!-- Popular terms -->
				<div class="px-3 py-2">
					<p
						class="mb-2 font-[JetBrains_Mono] text-[10px] font-bold tracking-widest text-stone-400 uppercase"
					>
						Популярні
					</p>
					<div class="flex flex-wrap gap-[5px]">
						{#each POPS as s (s)}
							<button
								onmousedown={(e) => e.preventDefault()}
								onclick={() => {
									query = s;
									fire(s);
								}}
								class="cursor-pointer rounded-full border-[1.5px] border-stone-200 bg-stone-50 px-3.5 py-1.5 font-[Outfit] text-xs font-semibold text-stone-700 transition-all duration-150 hover:border-stone-900 hover:bg-stone-900 hover:text-white"
							>
								{s}
							</button>
						{/each}
					</div>
				</div>
			{:else if sugs.length > 0}
				<!-- Suggestions -->
				{#each sugs as s, i (s.name + s.t)}
					<button
						onmousedown={(e) => e.preventDefault()}
						onclick={() => {
							const v = s.t === 'o' ? s.name : s.parent!;
							query = v;
							fire(v);
						}}
						class="flex w-full animate-up items-center gap-2.5 rounded-xl border-none bg-transparent px-3 py-2.5 text-left font-[Outfit] transition-all duration-100 hover:bg-stone-100"
						style="animation-delay: {i * 0.04}s"
					>
						<div
							class="grid h-[34px] w-[34px] flex-shrink-0 place-items-center rounded-[9px] font-bold"
							class:bg-red-50={s.t === 'o'}
							class:border-red-200={s.t === 'o'}
							class:text-red-600={s.t === 'o'}
							class:text-[10px]={s.t === 'o'}
							class:text-[13px]={s.t !== 'o'}
							style={s.t === 'o'
								? 'border: 1px solid #fecaca;'
								: `background: ${s.cl}0c; border: 1px solid ${s.cl}18; color: ${s.cl}; font-weight: 800;`}
						>
							{s.t === 'o' ? '✕' : s.L}
						</div>
						<div class="flex-1">
							<div class="text-[13px] font-bold">
								{s.name}
								{s.fl}
							</div>
							<div class="text-[10px] text-stone-400">
								{s.t === 'o' ? `${s.n} альтернатив` : `→ ${s.parent}`}
							</div>
						</div>
						{#if s.t === 'o'}
							<span
								class="rounded-full border border-red-200 bg-red-50 px-1.5 py-0.5 text-[8px] font-bold text-red-600 uppercase"
								>ворожий</span
							>
						{:else}
							<Ratio value={s.ratio!} />
						{/if}
					</button>
				{/each}
			{:else}
				<div class="px-3 py-5 text-center text-xs text-stone-400">Нічого не знайдено</div>
			{/if}
		</div>
	{/if}
</div>

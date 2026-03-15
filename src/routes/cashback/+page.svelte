<script lang="ts">
	import { CB, CB_CATS, type CashbackProduct } from '$lib/entities/cashback/data';
	import HeroCashback from '$lib/widgets/cashback/HeroCashback.svelte';
	import CashbackSidebar from '$lib/widgets/cashback/CashbackSidebar.svelte';
	import VerificationTool from '$lib/features/cashback-verify/VerificationTool.svelte';
	import CashbackProductCard from '$lib/entities/cashback/ui/CashbackProductCard.svelte';

	let search = $state('');
	let activeCat = $state<string | null>(null);

	const filtered = $derived(
		CB.filter((p) => {
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

	const catCounts = $derived(
		Object.fromEntries(CB_CATS.map((c) => [c, CB.filter((p) => p.cat === c).length]))
	);
</script>

<section class="mx-auto max-w-[1040px] px-6 pb-20">
	<HeroCashback />

	<!-- Verification tool -->
	<VerificationTool bind:search onSelect={selectProduct} />

	<!-- Category chips -->
	<div class="mb-6 flex flex-wrap gap-1.5">
		<button
			onclick={() => (activeCat = null)}
			class="flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-[9px] font-[Outfit] text-[13px] transition-all duration-200 animate-scale-in
				{!activeCat
				? 'border-[1.5px] border-[#065f46] bg-[#065f46] font-bold text-white'
				: 'border-[1.5px] border-stone-200 bg-white font-semibold text-stone-600'}"
		>
			Усі <span class="font-[JetBrains_Mono] text-[10px] opacity-60">{CB.length}</span>
		</button>
		{#each CB_CATS as c, i (c)}
			{@const n = catCounts[c] || 0}
			{@const act = activeCat === c}
			{#if n > 0}
				<button
					onclick={() => (activeCat = act ? null : c)}
					class="flex cursor-pointer items-center gap-[5px] rounded-xl px-3.5 py-[9px] font-[Outfit] text-[13px] transition-all duration-200 animate-scale-in
						{act
						? 'border-[1.5px] border-green-200 bg-green-50 font-bold text-[#065f46]'
						: 'border-[1.5px] border-stone-200 bg-white font-medium text-stone-600'}"
					style="animation-delay: {(i + 1) * 0.03}s"
				>
					{c}
					<span class="rounded-[5px] px-1.5 py-px font-[JetBrains_Mono] text-[10px] {act ? 'bg-[#bbf7d020] text-[#065f46]' : 'bg-stone-100 text-stone-400'}">{n}</span>
				</button>
			{/if}
		{/each}
	</div>

	<!-- Product grid with sidebar -->
	<div class="flex items-start gap-6">
		<CashbackSidebar bind:activeCat />

		<div class="flex-1">
			<!-- Count bar -->
			<div class="mb-3.5 flex items-center justify-between px-0.5">
				<span class="text-xs text-stone-400">
					<strong class="font-[JetBrains_Mono] text-stone-900">{filtered.length}</strong>
					{filtered.length === 1 ? 'продукт' : 'продуктів'}
					{#if activeCat}
						<span> · <strong class="text-[#065f46]">{activeCat}</strong></span>
					{/if}
				</span>
				{#if search || activeCat}
					<button
						onclick={() => { activeCat = null; search = ''; }}
						class="cursor-pointer border-none bg-transparent font-[Outfit] text-[11px] font-semibold text-stone-400 transition-colors hover:text-stone-900"
					>
						Скинути фільтри
					</button>
				{/if}
			</div>

			{#if filtered.length > 0}
				<div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
					{#each filtered as p, i (p.name)}
						<CashbackProductCard product={p} index={i} onclick={selectProduct} />
					{/each}
				</div>

				<!-- Summary -->
				<div class="animate-up pt-9 text-center" style="animation-delay: 0.2s">
					<p class="text-xs text-stone-400">
						Усього <strong class="text-stone-900">{CB.length}</strong> брендів у
						<strong class="text-stone-900">{CB_CATS.length}</strong> категоріях · Кешбек
						<strong class="text-[#065f46]">10%</strong> через Дію
					</p>
				</div>
			{:else}
				<div class="animate-scale-in rounded-[28px] border border-stone-200 bg-white p-[72px] text-center">
					<div class="animate-float mb-4 text-5xl">📭</div>
					<h3 class="mb-2 text-xl font-extrabold">Нічого не знайдено</h3>
					<p class="mx-auto mb-5 max-w-[300px] text-sm text-stone-500">
						Спробуйте інший запит або оберіть категорію
					</p>
					<button
						onclick={() => { activeCat = null; search = ''; }}
						class="cursor-pointer rounded-xl border-[1.5px] border-stone-200 bg-white px-6 py-2.5 font-[Outfit] text-[13px] font-bold"
					>Показати все</button>
				</div>
			{/if}
		</div>
	</div>
</section>

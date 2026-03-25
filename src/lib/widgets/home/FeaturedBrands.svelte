<script lang="ts">
	import { UA_BRANDS } from '$lib/entities/brand/data';

	const featured = UA_BRANDS.filter((b) => b.ft === true).slice(0, 4);
</script>

<section class="bg-[#fafaf9] px-4 py-16 sm:py-24">
	<div class="mx-auto max-w-5xl">
		<!-- Header -->
		<div class="mb-12 text-center">
			<span
				class="mb-3 inline-block font-[JetBrains_Mono] text-[11px] font-bold tracking-widest text-stone-400 uppercase"
			>
				Made in Ukraine
			</span>
			<h2 class="font-[Outfit] text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
				Продукти, якими пишається світ
			</h2>
		</div>

		<!-- Brand grid -->
		<div class="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each featured as brand (brand.name)}
				<div
					class="group cursor-pointer rounded-2xl border border-stone-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl"
				>
					<!-- Logo letter -->
					<div
						class="mb-4 grid h-12 w-12 place-items-center rounded-xl text-lg font-extrabold text-white transition-transform duration-300 group-hover:scale-110"
						style="background: {brand.cl}"
					>
						{brand.L}
					</div>

					<!-- Tag badge -->
					<span
						class="mb-3 inline-block rounded-full px-2.5 py-0.5 font-[JetBrains_Mono] text-[10px] font-bold"
						style="background: {brand.cl}10; color: {brand.cl}; border: 1px solid {brand.cl}20"
					>
						{brand.tag}
					</span>

					<!-- Name -->
					<h3 class="mb-1 font-[Outfit] text-base font-bold text-stone-900">
						{brand.name}
					</h3>

					<!-- Description -->
					<p class="mb-3 font-[Outfit] text-xs leading-relaxed text-stone-500">
						{brand.d}
					</p>

					<!-- Users count -->
					<div class="flex items-center gap-1.5">
						<span class="text-xs">👥</span>
						<span class="font-[JetBrains_Mono] text-[11px] font-medium text-stone-400">
							{brand.users} користувачів
						</span>
					</div>
				</div>
			{/each}
		</div>

		<!-- CTA -->
		<div class="text-center">
			<a
				href="/nashe"
				class="inline-flex items-center gap-2 rounded-full border-2 border-stone-200 bg-white px-6 py-3 font-[Outfit] text-sm font-bold text-stone-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-lg"
			>
				Усі українські продукти →
			</a>
		</div>
	</div>
</section>

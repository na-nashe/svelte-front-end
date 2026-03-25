<script lang="ts">
	const cards = [
		{
			icon: '🇺🇦',
			title: 'Українські бренди',
			desc: 'Підтримай своїх — відкрий для себе українські продукти світового рівня',
			href: '/nashe',
			gradient: 'linear-gradient(135deg, #0057B7, #1e40af)'
		},
		{
			icon: '💳',
			title: 'Перевір свій продукт',
			desc: 'Дізнайся, чи підтримує твій улюблений бренд ворога або Україну',
			href: '/cashback',
			gradient: 'linear-gradient(135deg, #065f46, #059669)'
		}
	];
</script>

<section class="bg-[#fafaf9] px-4 py-16 sm:py-24">
	<div class="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
		{#each cards as card (card.href)}
			<a
				href={card.href}
				class="group relative overflow-hidden rounded-3xl p-8 text-white no-underline transition-all duration-300 hover:-translate-y-[3px] hover:shadow-2xl sm:p-10"
				style="background: {card.gradient}"
			>
				<!-- Floating gold orb -->
				<div
					class="pointer-events-none absolute -right-8 -bottom-8 h-32 w-32 rounded-full opacity-20 blur-2xl"
					style="background: #FFD700"
				></div>

				<!-- Icon -->
				<div class="mb-4 text-4xl">{card.icon}</div>

				<!-- Title -->
				<h3 class="mb-2 font-[Outfit] text-xl font-extrabold sm:text-2xl">
					{card.title}
				</h3>

				<!-- Description -->
				<p class="mb-8 font-[Outfit] text-sm leading-relaxed text-white/80">
					{card.desc}
				</p>

				<!-- Arrow -->
				<div
					class="absolute right-6 bottom-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 font-bold text-white transition-transform duration-300 group-hover:translate-x-1"
				>
					→
				</div>
			</a>
		{/each}
	</div>
</section>

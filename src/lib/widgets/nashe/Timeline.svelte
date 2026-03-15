<script lang="ts">
	const milestones = [
		{ year: '2014', event: 'Monobank запускає перший в Україні повністю мобільний банк' },
		{ year: '2017', event: 'Grammarly оцінений у $1B — перший український єдиноріг' },
		{ year: '2020', event: 'Дія стає цифровою державою #1 у світі' },
		{ year: '2022', event: 'Ajax Systems виходить на ринки 169 країн' },
		{ year: '2024', event: 'MacPaw Setapp досягає 1M підписників' },
		{ year: '2025', event: '340+ UA-брендів на платформі НаНаше' }
	];
</script>

<div class="mb-14">
	<div class="animate-up mb-8 text-center">
		<span class="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-widest text-amber-500">Шлях UA-Tech</span>
		<h2 class="mt-1.5 text-[26px] font-black tracking-tight">Історія українських інновацій</h2>
	</div>
	<div class="relative mx-auto max-w-[640px]">
		<!-- Vertical line -->
		<div class="absolute top-0 bottom-0 left-6 w-0.5 rounded-sm" style="background: linear-gradient(180deg, #e7e5e4, #0057B720, #e7e5e4)"></div>

		{#each milestones as m, i (m.year)}
			<div class="animate-slide-r relative mb-5 flex gap-5" style="animation-delay: {i * 0.08}s">
				<div
					class="group relative z-[1] grid h-[50px] w-[50px] shrink-0 place-items-center rounded-[14px] border-2 border-stone-200 bg-white font-[JetBrains_Mono] text-[11px] font-extrabold transition-all duration-[250ms] hover:scale-110 hover:border-[#0057B7] hover:bg-[#0057B7] hover:text-white"
					style="color: #0057B7"
				>{m.year}</div>
				<div
					class="flex-1 rounded-2xl border border-stone-200 bg-white px-[18px] py-3.5 transition-all duration-200 hover:translate-x-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.024)]"
				>
					<p class="m-0 text-sm font-medium leading-[1.5] text-stone-700">{m.event}</p>
				</div>
			</div>
		{/each}
	</div>
</div>

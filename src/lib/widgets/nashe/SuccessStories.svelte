<script lang="ts">
	const stories = [
		{ user: 'Марія К.', avatar: 'МК', text: 'Перейшла на Monobank 2 роки тому — не уявляю як жила без кешбеку та донатів на ЗСУ прямо з апки.', brand: 'Monobank', cl: '#1c1917', stars: 5 },
		{ user: 'Олексій Д.', avatar: 'ОД', text: 'Grammarly щодня допомагає з англійською. Горджуся що це український продукт.', brand: 'Grammarly', cl: '#15803d', stars: 5 },
		{ user: 'Ірина П.', avatar: 'ІП', text: 'Ajax Systems — тепер мій дім під захистом. Встановлення зайняло 20 хвилин.', brand: 'Ajax Systems', cl: '#e11d48', stars: 5 }
	];
</script>

<div class="mb-14">
	<div class="animate-up mb-7 text-center">
		<span class="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-widest text-[#0057B7]">Історії переходу</span>
		<h2 class="mt-1.5 text-[26px] font-black tracking-tight">Люди вже обрали українське</h2>
	</div>
	<div class="grid grid-cols-3 gap-3.5">
		{#each stories as s, i (s.user)}
			<div
				class="animate-up rounded-[22px] border border-stone-200 bg-white px-6 py-[26px] transition-all duration-[250ms] hover:-translate-y-[3px]"
				style="animation-delay: {i * 0.08}s; --hover-shadow: 0 12px 32px {s.cl}08"
				onmouseenter={(e) => { e.currentTarget.style.boxShadow = `0 12px 32px ${s.cl}08`; }}
				onmouseleave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
			>
				<div class="mb-3">
					{#each Array(5) as _, j}
						<span class="mr-px text-sm" style="color: {j < s.stars ? '#FBBF24' : '#e7e5e4'}">★</span>
					{/each}
				</div>
				<p class="mb-4 text-sm italic leading-[1.6] text-stone-700">«{s.text}»</p>
				<div class="flex items-center gap-2.5 border-t border-stone-100 pt-3.5">
					<div
						class="grid h-[34px] w-[34px] place-items-center rounded-full text-[11px] font-extrabold"
						style="background: {s.cl}0c; color: {s.cl}; border: 1.5px solid {s.cl}14"
					>{s.avatar}</div>
					<div>
						<div class="text-[13px] font-bold">{s.user}</div>
						<div class="text-[10px] text-stone-400">перейшла на {s.brand}</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

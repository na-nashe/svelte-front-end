<script lang="ts">
	const socialProof = [
		{ user: 'Марія', action: 'перейшла з Telegram на Signal', time: '2 хв тому', emoji: '🔄' },
		{ user: 'Олексій', action: 'залишив відгук на Brave', time: '8 хв тому', emoji: '✍️' },
		{ user: 'Ірина', action: 'перейшла з VK на Instagram', time: '12 хв тому', emoji: '🔄' },
		{ user: 'Андрій', action: 'додав Uklon в обрані', time: '15 хв тому', emoji: '❤️' },
		{ user: 'Катерина', action: 'перейшла з 1С на BAS', time: '18 хв тому', emoji: '🔄' }
	];

	const doubled = [...socialProof, ...socialProof];
</script>

<div class="overflow-hidden border-t border-b border-stone-200 bg-white py-3">
	<div class="animate-marquee flex w-max gap-8">
		{#each doubled as item, i (i)}
			<div class="flex flex-shrink-0 items-center gap-2 font-[Outfit] text-sm text-stone-500 whitespace-nowrap">
				<span>{item.emoji}</span>
				<span class="font-semibold text-stone-700">{item.user}</span>
				<span>{item.action}</span>
				<span class="font-[JetBrains_Mono] text-[10px] text-stone-300">·</span>
				<span class="font-[JetBrains_Mono] text-[10px] text-stone-400">{item.time}</span>
			</div>
		{/each}
	</div>
</div>

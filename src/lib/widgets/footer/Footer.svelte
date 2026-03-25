<footer class="border-t border-stone-200 bg-white px-6 py-7">
	<div class="mx-auto flex max-w-[960px] flex-wrap items-center justify-between gap-2.5">
		<div class="flex items-center gap-1.5 text-xs text-stone-400">
			<span class="font-bold text-stone-900">НаНаше</span> © 2026 · Зроблено в Україні 🇺🇦
		</div>
		<div class="flex gap-5">
			{#each ['Про проєкт'] as link (link)}
				<a
					href="#"
					class="text-xs text-stone-400 no-underline transition-colors duration-150 hover:text-stone-900"
				>
					{link}
				</a>
			{/each}
		</div>
	</div>
</footer>

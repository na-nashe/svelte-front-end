<script lang="ts">
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';

	const status = $derived($page.status);
	const is404 = $derived(status === 404);
</script>

<svelte:head>
	<title>{is404 ? '404 — Сторінку не знайдено' : `${status} — Помилка`} · НаНаше</title>
</svelte:head>

<section class="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
	<!-- Floating orbs -->
	<div
		class="pointer-events-none fixed top-[20%] left-[10%] h-72 w-72 rounded-full opacity-[0.07] blur-3xl"
		style="background: radial-gradient(circle, #0057B7, transparent); animation: waveFloat 12s ease-in-out infinite"
	></div>
	<div
		class="pointer-events-none fixed right-[10%] bottom-[20%] h-64 w-64 rounded-full opacity-[0.06] blur-3xl"
		style="background: radial-gradient(circle, #FFD700, transparent); animation: waveFloat 16s ease-in-out infinite reverse"
	></div>

	<!-- Status badge -->
	<div
		class="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 font-[JetBrains_Mono] text-[11px] font-bold tracking-widest text-stone-400 uppercase shadow-sm"
	>
		<span class="h-1.5 w-1.5 rounded-full" style="background: {is404 ? '#f59e0b' : '#dc2626'}"
		></span>
		{status}
	</div>

	<!-- Big number -->
	<div
		class="mb-4 font-[Outfit] text-[120px] leading-none font-black tracking-tight select-none sm:text-[160px]"
		style="background: linear-gradient(135deg, #0057B7 0%, #FFD700 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text"
	>
		{status}
	</div>

	<!-- Message -->
	<h1 class="mb-3 font-[Outfit] text-2xl font-extrabold text-stone-900 sm:text-3xl">
		{#if is404}
			Сторінку не знайдено
		{:else}
			Щось пішло не так
		{/if}
	</h1>

	<p class="mb-10 max-w-sm font-[Outfit] text-base leading-relaxed text-stone-500">
		{#if is404}
			Такої сторінки не існує або вона була переміщена. Але на НаНаше ще багато чого цікавого!
		{:else}
			На жаль, сталася помилка. Спробуй оновити сторінку або повернись на головну.
		{/if}
	</p>

	<!-- Actions -->
	<div class="flex flex-wrap justify-center gap-3">
		<a
			href={resolve('/')}
			class="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-[Outfit] text-sm font-bold text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
			style="background: linear-gradient(135deg, #0057B7, #1e40af); box-shadow: 0 4px 16px #0057B730"
		>
			← На головну
		</a>
		<a
			href={resolve('/catalog')}
			class="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-6 py-3 font-[Outfit] text-sm font-semibold text-stone-700 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-md"
		>
			Переглянути каталог
		</a>
	</div>

	<!-- Ukrainian flag hint -->
	<div class="mt-14 font-[Outfit] text-xs text-stone-400">НаНаше · Зроблено в Україні 🇺🇦</div>
</section>

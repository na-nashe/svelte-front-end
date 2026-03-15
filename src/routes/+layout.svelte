<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/widgets/header/Header.svelte';
	import Footer from '$lib/widgets/footer/Footer.svelte';
	import ProductModal from '$lib/entities/product/ui/ProductModal.svelte';
	import type { Alternative } from '$lib/entities/product/data';

	let { children } = $props();
	let modal = $state<Alternative | null>(null);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen flex-col bg-stone-50 font-[Outfit] text-stone-900">
	<Header />
	<main class="flex-1 animate-fade-in">
		{@render children()}
	</main>
	<Footer />
</div>

{#if modal}
	<ProductModal alt={modal} onclose={() => (modal = null)} />
{/if}

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={localizeHref(page.url.pathname, { locale })}>
			{locale}
		</a>
	{/each}
</div>

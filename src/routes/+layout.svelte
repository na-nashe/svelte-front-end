<script lang="ts">
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

<div style="display:none"></div>

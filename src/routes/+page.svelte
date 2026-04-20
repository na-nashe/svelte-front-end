<script lang="ts">
	import HeroHome from '$lib/widgets/home/HeroHome.svelte';
	import ActivityTicker from '$lib/widgets/home/ActivityTicker.svelte';
	import HowItWorks from '$lib/widgets/home/HowItWorks.svelte';
	import FeaturedBrands from '$lib/widgets/home/FeaturedBrands.svelte';
	import DualCta from '$lib/widgets/home/DualCta.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let query = $state('');

	function handleSearch(q: string) {
		const t = q.trim();
		if (!t) return;
		window.location.href = `/catalog?q=${encodeURIComponent(t)}`;
	}
</script>

<HeroHome
	bind:query
	onSearch={handleSearch}
	categories={data.categories ?? []}
	alternativesTotal={data.alternativesTotal ?? null}
/>
<ActivityTicker />
<HowItWorks />
<FeaturedBrands />
<DualCta />

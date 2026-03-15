<script lang="ts">
	import HeroProfile from '$lib/widgets/profile/HeroProfile.svelte';
	import ProfileTabs from '$lib/widgets/profile/ProfileTabs.svelte';
	import OverviewTab from '$lib/widgets/profile/OverviewTab.svelte';
	import ReviewsTab from '$lib/widgets/profile/ReviewsTab.svelte';
	import FavoritesTab from '$lib/widgets/profile/FavoritesTab.svelte';
	import SettingsTab from '$lib/widgets/profile/SettingsTab.svelte';

	let tab = $state('overview');
	let name = $state('Олена Коваленко');
</script>

<section class="mx-auto max-w-[1040px] px-6 pb-20">
	<HeroProfile bind:name />

	<ProfileTabs bind:activeTab={tab} />

	<div class="animate-up">
		{#if tab === 'overview'}
			<OverviewTab />
		{:else if tab === 'reviews'}
			<ReviewsTab />
		{:else if tab === 'favorites'}
			<FavoritesTab />
		{:else if tab === 'settings'}
			<SettingsTab bind:name />
		{/if}
	</div>
</section>

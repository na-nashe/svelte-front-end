<script lang="ts">
	import { profileTabs } from '$lib/entities/profile/data';

	let { activeTab = $bindable('overview') } = $props();
</script>

<div class="mx-1 mt-7 mb-6 flex gap-0.5 border-b-[1.5px] border-stone-200">
	{#each profileTabs as t, i (t.id)}
		<button
			class="animate-up flex cursor-pointer items-center gap-1.5 border-none bg-transparent px-5 py-3.5 font-[Outfit] text-[13px] transition-all duration-200"
			style="border-bottom: 3px solid {activeTab === t.id ? '#0057B7' : 'transparent'}; color: {activeTab === t.id ? '#1c1917' : '#a8a29e'}; font-weight: {activeTab === t.id ? 700 : 500}; animation-delay: {i * 0.04}s"
			onclick={() => (activeTab = t.id)}
		>
			<span class="text-[15px]">{t.ic}</span>{t.l}
		</button>
	{/each}
</div>

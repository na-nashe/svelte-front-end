<script lang="ts">
	import { faviconUrl } from '$lib/shared/utils/favicon';

	let {
		url,
		letter,
		color,
		size = 44
	}: { url?: string | null; letter: string; color: string; size?: number } = $props();

	let error = $state(false);
	const logo = $derived(faviconUrl(url));

	const imgSize = $derived(Math.round(size * 0.6));
</script>

<div
	class="grid shrink-0 place-items-center overflow-hidden font-[Outfit] font-extrabold"
	style="
		width: {size}px;
		height: {size}px;
		background: {color}0a;
		color: {color};
		border: 1.5px solid {color}14;
		border-radius: {Math.round(size * 0.27)}px;
		font-size: {Math.round(size * 0.32)}px;
	"
>
	{#if logo && !error}
		<img
			src={logo}
			alt=""
			width={imgSize}
			height={imgSize}
			class="object-contain"
			onerror={() => (error = true)}
		/>
	{:else}
		{letter}
	{/if}
</div>

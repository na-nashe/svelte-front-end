<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		active = false,
		color = '#0057B7',
		onclick,
		children
	}: {
		active?: boolean;
		color?: string;
		onclick?: () => void;
		children: Snippet;
	} = $props();
</script>

<button
	{onclick}
	class="cursor-pointer rounded-xl px-4 py-2 font-[Outfit] text-[13px] transition-all duration-200
		{active ? 'font-bold text-stone-900' : 'font-medium text-stone-500'}
		{active ? '' : 'border-[1.5px] border-stone-200 bg-white'}"
	style={active ? `border: 2px solid ${color}; background: ${color}08;` : ''}
>
	{@render children()}
</button>

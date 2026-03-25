<script lang="ts">
	let { type }: { type: 'free' | 'freemium' | 'paid' } = $props();

	const config: Record<string, { label: string; bg: string; text: string }> = {
		free: { label: 'Безкоштовно', bg: 'bg-green-100', text: 'text-green-800' },
		freemium: { label: 'Freemium', bg: 'bg-blue-100', text: 'text-blue-800' },
		paid: { label: 'Платно', bg: 'bg-amber-100', text: 'text-amber-800' }
	};

	const c = $derived(config[type] ?? config.free);
</script>

<span class="rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase {c.bg} {c.text}"
	>{c.label}</span
>

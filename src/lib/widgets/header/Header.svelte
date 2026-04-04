<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';
	import SearchBar from '$lib/features/search/SearchBar.svelte';

	let query = $state('');

	const tabs: { id: string; path: Parameters<typeof resolve>[0]; label: string }[] = [
		{ id: 'home', path: '/', label: 'Головна' },
		{ id: 'catalog', path: '/catalog', label: 'Каталог' }
	];

	const currentPath = $derived($page.url.pathname);

	function isActive(path: string): boolean {
		if (path === '/') return currentPath === '/';
		return currentPath.startsWith(path);
	}

	function handleSearch(q: string) {
		const t = q.trim();
		if (!t) return;
		query = t;
		window.location.href = `/catalog?q=${encodeURIComponent(t)}`;
	}

	const showSearch = $derived(currentPath !== '/');
</script>

<nav
	class="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/[0.92] backdrop-blur-[20px] backdrop-saturate-[1.4]"
>
	<div class="mx-auto flex h-[58px] max-w-[960px] items-center gap-1.5 px-6">
		<!-- Logo -->
		<a href={resolve('/')} class="mr-5 flex cursor-pointer items-center gap-[7px] no-underline">
			<div
				class="grid h-8 w-8 place-items-center rounded-[9px] bg-gradient-to-br from-[#0057B7] to-[#FFD700] text-sm font-extrabold text-white shadow-[0_2px_8px_#0057B720] transition-transform duration-200 hover:scale-[1.08] hover:-rotate-3"
			>
				Н
			</div>
			<span class="text-lg font-extrabold tracking-tight">НаНаше</span>
		</a>

		<!-- Nav tabs -->
		{#each tabs as t (t.id)}
			{@const active = isActive(t.path)}
			<a
				href={resolve(t.path)}
				class="cursor-pointer rounded-lg border-b-[2.5px] border-none px-3.5 py-1.5 font-[Outfit] text-[13px] no-underline transition-all duration-150
					{active
					? 'border-b-[#0057B7] bg-stone-900/[0.03] font-bold text-stone-900'
					: 'border-b-transparent bg-transparent font-medium text-stone-400 hover:text-stone-600'}"
				style={active
					? 'border-bottom: 2.5px solid #0057B7'
					: 'border-bottom: 2.5px solid transparent'}
			>
				{t.label}
			</a>
		{/each}

		<div class="flex-1"></div>

		<!-- Compact search -->
		{#if showSearch}
			<div class="w-60">
				<SearchBar bind:query onGo={handleSearch} />
			</div>
		{/if}

		<!-- Profile -->
		<a
			href={resolve('/profile')}
			class="ml-2.5 flex cursor-pointer items-center gap-1.5 rounded-full border-2 border-[#0057B7] py-[3px] pr-2.5 pl-[3px] no-underline
				 transition-all duration-200
				"
		>
			<div
				class="grid h-[30px] w-[30px] place-items-center rounded-full bg-gradient-to-br from-[#0057B7] to-[#2563eb] text-[10px] font-extrabold text-white transition-transform duration-200"
			>
				ОК
			</div>
			<span
				class="text-xs font-semibold
					text-stone-500"
			>
				Олена
			</span>
		</a>
	</div>
</nav>

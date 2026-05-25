<script lang="ts">
	import { resolve, base } from '$app/paths';
	import { page } from '$app/stores';
	import SearchBar from '$lib/features/search/SearchBar.svelte';

	let query = $state('');

	const tabs: { id: string; path: Parameters<typeof resolve>[0]; label: string }[] = [
		{ id: 'home', path: '/', label: 'Головна' },
		{ id: 'catalog', path: '/catalog', label: 'Каталог' },
		{ id: 'ukrainian-brands', path: '/ukrainian-brands', label: '🇺🇦 Свої бренди' }
	];

	const currentPath = $derived($page.url.pathname);
	const isAuthenticated = $derived($page.data.isAuthenticated ?? false);

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

	async function handleLogout() {
		await fetch('/api/auth/logout', { method: 'POST' });
		window.location.href = '/';
	}

	const showSearch = $derived(
		currentPath !== '/' &&
			currentPath !== '/profile' &&
			currentPath !== '/sign-in' &&
			currentPath !== '/sign-up'
	);
</script>

<nav
	class="sticky top-0 z-50 w-full overflow-x-hidden border-b border-stone-200 bg-stone-50/[0.92] backdrop-blur-[20px] backdrop-saturate-[1.4]"
>
	<div class="mx-auto flex h-[58px] w-full max-w-[960px] items-center gap-1.5 px-4 sm:px-6">
		<!-- Logo -->
		<a href={resolve('/')} class="mr-5 flex cursor-pointer items-center gap-[7px] no-underline">
			<div
				class="grid h-8 w-8 place-items-center rounded-[9px] bg-gradient-to-br from-[#0057B7] to-[#FFD700] text-sm font-extrabold text-white shadow-[0_2px_8px_#0057B720] transition-transform duration-200 hover:scale-[1.08] hover:-rotate-3"
			>
				Н
			</div>
			<span class="hidden text-lg font-extrabold tracking-tight sm:inline">НаНаше</span>
		</a>

		<!-- Nav tabs -->
		{#each tabs as t (t.id)}
			{@const active = isActive(t.path)}
			<a
				href="{base}{t.path}"
				class="cursor-pointer rounded-lg border-b-[2.5px] border-none px-2 py-1 font-[Outfit] text-[11px] no-underline transition-all duration-150 sm:px-3.5 sm:py-1.5 sm:text-[13px]
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
			<div class="hidden w-32 min-w-0 sm:block sm:w-60">
				<SearchBar bind:query onGo={handleSearch} />
			</div>
		{/if}

		<!-- Auth -->
		{#if isAuthenticated}
			<a
				href={resolve('/profile')}
				class="ml-2.5 flex cursor-pointer items-center gap-1.5 rounded-[10px] border-2 border-[#0057B7] px-3 py-1 font-[Outfit] text-[13px] font-bold text-[#0057B7] no-underline transition-all duration-200"
			>
				Профіль
			</a>
			<button
				onclick={handleLogout}
				class="rounded-[10px] bg-stone-100 px-3.5 py-1.5 font-[Outfit] text-[13px] font-bold text-stone-600 no-underline transition-all duration-150 hover:bg-stone-200"
			>
				Вийти
			</button>
		{:else}
			<a
				href={resolve('/sign-in')}
				class="ml-2.5 flex cursor-pointer items-center gap-1.5 rounded-[10px] border-2 border-[#0057B7] px-2 py-1 font-[Outfit] text-[11px] font-bold text-[#0057B7] no-underline transition-all duration-200 sm:px-3 sm:text-[13px]"
			>
				Увійти
			</a>
			<a
				href={resolve('/sign-up')}
				class="rounded-[10px] bg-[#0057B7] px-2 py-1.5 font-[Outfit] text-[11px] font-bold text-white no-underline shadow-[0_2px_8px_#0057B730] transition-all duration-150 hover:bg-[#0049a3] sm:px-3.5 sm:py-1.5 sm:text-[13]"
			>
				Реєстрація
			</a>
		{/if}
	</div>
</nav>

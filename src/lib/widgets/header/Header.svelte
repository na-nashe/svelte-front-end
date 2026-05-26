<script lang="ts">
	import { resolve, base } from '$app/paths';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import SearchBar from '$lib/features/search/SearchBar.svelte';

	let query = $state('');
	let menuOpen = $state(false);

	const tabs: { id: string; path: string; label: string }[] = [
		{ id: 'home', path: '/', label: 'Головна' },
		{ id: 'catalog', path: '/catalog', label: 'Каталог' },
		{ id: 'ukrainian-brands', path: '/ukrainian-brands', label: '🇺🇦 Свої бренди' },
		{ id: 'cashback', path: '/cashback', label: '💳 Кешбек' }
	];

	const currentPath = $derived($page.url.pathname);
	const isAuthenticated = $derived($page.data.isAuthenticated ?? false);

	$effect(() => {
		// Close mobile menu on navigation
		currentPath;
		menuOpen = false;
	});

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
			currentPath !== '/sign-up' &&
			currentPath !== '/cashback'
	);
</script>

<nav
	class="sticky top-0 z-50 w-full overflow-x-hidden border-b border-stone-200 bg-stone-50/[0.92] backdrop-blur-[20px] backdrop-saturate-[1.4]"
>
	<div class="mx-auto flex h-[58px] w-full max-w-[960px] items-center gap-1.5 px-4 sm:px-6">
		<!-- Logo -->
		<a
			href={resolve('/')}
			class="mr-2 flex cursor-pointer items-center gap-[7px] no-underline sm:mr-5"
		>
			<div
				class="grid h-8 w-8 place-items-center rounded-[9px] bg-gradient-to-br from-[#0057B7] to-[#FFD700] text-sm font-extrabold text-white shadow-[0_2px_8px_#0057B720] transition-transform duration-200 hover:scale-[1.08] hover:-rotate-3"
			>
				Н
			</div>
			<span class="hidden text-lg font-extrabold tracking-tight sm:inline">НаНаше</span>
		</a>

		<!-- Nav tabs — hidden on mobile -->
		<div class="hidden items-center gap-1.5 sm:flex">
			{#each tabs as t (t.id)}
				{@const active = isActive(t.path)}
				<a
					href={resolve(t.path)}
					class="cursor-pointer rounded-lg border-b-[2.5px] border-solid px-3.5 py-1.5 font-[Outfit] text-[13px] no-underline transition-colors duration-150
						{active
						? 'bg-stone-900/[0.03] font-bold text-stone-900'
						: 'bg-transparent font-medium text-stone-400 hover:text-stone-600'}"
					style="border-bottom-color: {active ? '#0057B7' : 'transparent'}"
				>
					{t.label}
				</a>
			{/each}
		</div>

		<div class="flex-1"></div>

		<!-- Compact search — hidden on mobile -->
		{#if showSearch}
			<div class="hidden w-32 min-w-0 sm:block sm:w-60">
				<SearchBar bind:query onGo={handleSearch} />
			</div>
		{/if}

		<!-- Auth — hidden on mobile, shown in dropdown -->
		{#if isAuthenticated}
			<a
				href={resolve('/profile')}
				class="ml-2.5 hidden cursor-pointer items-center gap-1.5 rounded-[10px] border-2 border-[#0057B7] px-3 py-1 font-[Outfit] text-[13px] font-bold text-[#0057B7] no-underline transition-all duration-200 sm:flex"
			>
				Профіль
			</a>
			<button
				onclick={handleLogout}
				class="hidden rounded-[10px] bg-stone-100 px-3.5 py-1.5 font-[Outfit] text-[13px] font-bold text-stone-600 transition-all duration-150 hover:bg-stone-200 sm:block"
			>
				Вийти
			</button>
		{:else}
			<a
				href={resolve('/sign-in')}
				class="ml-2.5 hidden cursor-pointer items-center gap-1.5 rounded-[10px] border-2 border-[#0057B7] px-3 py-1 font-[Outfit] text-[13px] font-bold text-[#0057B7] no-underline transition-all duration-200 sm:flex"
			>
				Увійти
			</a>
			<a
				href={resolve('/sign-up')}
				class="hidden rounded-[10px] bg-[#0057B7] px-3.5 py-1.5 font-[Outfit] text-[13px] font-bold text-white no-underline shadow-[0_2px_8px_#0057B730] transition-all duration-150 hover:bg-[#0049a3] sm:block"
			>
				Реєстрація
			</a>
		{/if}

		<!-- Hamburger button — mobile only -->
		<button
			onclick={() => (menuOpen = !menuOpen)}
			class="ml-1 flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-lg border border-stone-200 bg-white transition-colors duration-150 hover:bg-stone-50 sm:hidden"
			aria-label="Меню"
		>
			{#if menuOpen}
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
				>
					<line x1="6" y1="6" x2="18" y2="18" />
					<line x1="18" y1="6" x2="6" y2="18" />
				</svg>
			{:else}
				<span class="h-0.5 w-[16px] rounded bg-stone-600"></span>
				<span class="h-0.5 w-[16px] rounded bg-stone-600"></span>
				<span class="h-0.5 w-[16px] rounded bg-stone-600"></span>
			{/if}
		</button>
	</div>

</nav>

<!-- Mobile dropdown — fixed so it overlays content without shifting the nav height -->
{#if menuOpen}
	<div
		role="presentation"
		class="fixed inset-0 top-[58px] z-40 sm:hidden"
		onclick={() => (menuOpen = false)}
	></div>
	<div
		transition:slide={{ duration: 150 }}
		class="fixed left-0 right-0 top-[58px] z-50 border-t border-stone-200 bg-stone-50/[0.98] px-4 pt-2 pb-4 shadow-[0_8px_24px_#00000012] sm:hidden"
	>
		{#each tabs as t (t.id)}
			{@const active = isActive(t.path)}
			<a
				href={resolve(t.path)}
				onclick={() => (menuOpen = false)}
				class="mb-0.5 block rounded-lg px-3 py-2.5 font-[Outfit] text-[14px] no-underline transition-all duration-150
					{active
					? 'bg-stone-900/[0.04] font-bold text-stone-900'
					: 'font-medium text-stone-500 hover:text-stone-900'}"
				style={active
					? 'border-left: 3px solid #0057B7; padding-left: 10px'
					: 'border-left: 3px solid transparent; padding-left: 10px'}
			>
				{t.label}
			</a>
		{/each}

		{#if showSearch}
			<div class="mt-3">
				<SearchBar bind:query onGo={handleSearch} />
			</div>
		{/if}

		<div class="mt-3 flex gap-2">
			{#if isAuthenticated}
				<a
					href={resolve('/profile')}
					onclick={() => (menuOpen = false)}
					class="flex flex-1 cursor-pointer items-center justify-center rounded-[10px] border-2 border-[#0057B7] py-2 font-[Outfit] text-[13px] font-bold text-[#0057B7] no-underline"
				>
					Профіль
				</a>
				<button
					onclick={handleLogout}
					class="flex-1 rounded-[10px] bg-stone-100 py-2 font-[Outfit] text-[13px] font-bold text-stone-600"
				>
					Вийти
				</button>
			{:else}
				<a
					href={resolve('/sign-in')}
					onclick={() => (menuOpen = false)}
					class="flex flex-1 cursor-pointer items-center justify-center rounded-[10px] border-2 border-[#0057B7] py-2 font-[Outfit] text-[13px] font-bold text-[#0057B7] no-underline"
				>
					Увійти
				</a>
				<a
					href={resolve('/sign-up')}
					onclick={() => (menuOpen = false)}
					class="flex flex-1 cursor-pointer items-center justify-center rounded-[10px] bg-[#0057B7] py-2 font-[Outfit] text-[13px] font-bold text-white no-underline"
				>
					Реєстрація
				</a>
			{/if}
		</div>
	</div>
{/if}

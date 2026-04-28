<script lang="ts">
	import { resolve } from '$app/paths';

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);
	let agree = $state(false);

	async function handleSignUp(event: Event) {
  event.preventDefault();

  const response = await fetch('/auth/singup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: name,
      email: email,
      password: password
    })
  });

  if (response.ok) {
    alert('Успіх!');
  } else {
    alert('Помилка сервера');
  }
}

</script>

<svelte:head>
	<title>Реєстрація · НаНаше</title>
	<meta name="description" content="Створи акаунт НаНаше та приєднуйся до спільноти." />
</svelte:head>

<div class="flex min-h-[calc(100vh-58px)] items-center justify-center px-4 py-16">
	<!-- Orbs -->
	<div
		class="pointer-events-none fixed left-[10%] top-[20%] h-96 w-96 rounded-full opacity-[0.06] blur-3xl"
		style="background: radial-gradient(circle, #0057B7, transparent); animation: waveFloat 14s ease-in-out infinite"
	></div>
	<div
		class="pointer-events-none fixed right-[8%] bottom-[15%] h-72 w-72 rounded-full opacity-[0.04] blur-3xl"
		style="background: radial-gradient(circle, #7c3aed, transparent); animation: waveFloat 20s ease-in-out infinite reverse"
	></div>

	<div class="relative w-full max-w-[400px] animate-up">
		<!-- Card -->
		<div class="rounded-[20px] border border-stone-100 bg-white p-8 shadow-[0_8px_40px_#00000009]">
			<!-- Logo -->
			<a href={resolve('/')} class="mb-8 flex items-center gap-2 no-underline">
				<div
					class="grid h-9 w-9 place-items-center rounded-[10px] bg-gradient-to-br from-[#0057B7] to-[#FFD700] text-[13px] font-extrabold text-white shadow-[0_2px_8px_#0057B720]"
				>
					Н
				</div>
				<span class="font-[Outfit] text-lg font-extrabold tracking-tight text-stone-900">НаНаше</span>
			</a>

			<h1 class="mb-1 font-[Outfit] text-2xl font-black text-stone-900">Реєстрація</h1>
			<p class="mb-7 font-[Outfit] text-sm text-stone-400">Приєднуйся до спільноти 🇺🇦</p>

			<form onsubmit={handleSignUp} class="flex flex-col gap-4">
				<!-- Name -->
				<div class="flex flex-col gap-1.5">
					<label for="name" class="font-[Outfit] text-xs font-semibold text-stone-500">
						Імʼя
					</label>
					<input
						id="name"
						type="text"
						bind:value={name}
						placeholder="Олена Петренко"
						autocomplete="name"
						class="w-full rounded-[11px] border border-stone-200 bg-stone-50 px-4 py-2.5 font-[Outfit] text-sm text-stone-900 outline-none transition-all duration-150 placeholder:text-stone-300 focus:border-[#0057B7] focus:bg-white focus:ring-2 focus:ring-[#0057B7]/10"
					/>
				</div>

				<!-- Email -->
				<div class="flex flex-col gap-1.5">
					<label for="email" class="font-[Outfit] text-xs font-semibold text-stone-500">
						Електронна пошта
					</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						placeholder="you@example.com"
						autocomplete="email"
						class="w-full rounded-[11px] border border-stone-200 bg-stone-50 px-4 py-2.5 font-[Outfit] text-sm text-stone-900 outline-none transition-all duration-150 placeholder:text-stone-300 focus:border-[#0057B7] focus:bg-white focus:ring-2 focus:ring-[#0057B7]/10"
					/>
				</div>

				<!-- Password -->
				<div class="flex flex-col gap-1.5">
					<label for="password" class="font-[Outfit] text-xs font-semibold text-stone-500">
						Пароль
					</label>
					<div class="relative">
						<input
							id="password"
							type={showPassword ? 'text' : 'password'}
							bind:value={password}
							placeholder="Мінімум 8 символів"
							autocomplete="new-password"
							class="w-full rounded-[11px] border border-stone-200 bg-stone-50 px-4 py-2.5 pr-11 font-[Outfit] text-sm text-stone-900 outline-none transition-all duration-150 placeholder:text-stone-300 focus:border-[#0057B7] focus:bg-white focus:ring-2 focus:ring-[#0057B7]/10"
						/>
						<button
							type="button"
							onclick={() => (showPassword = !showPassword)}
							class="absolute top-1/2 right-3.5 -translate-y-1/2 text-stone-300 transition-colors hover:text-stone-500"
							aria-label={showPassword ? 'Сховати пароль' : 'Показати пароль'}
						>
							{#if showPassword}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
									<path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
									<line x1="1" y1="1" x2="23" y2="23"/>
								</svg>
							{:else}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
									<circle cx="12" cy="12" r="3"/>
								</svg>
							{/if}
						</button>
					</div>
					<!-- Password strength indicator -->
					{#if password.length > 0}
						{@const strength = password.length < 6 ? 0 : password.length < 10 ? 1 : 2}
						<div class="flex gap-1 pt-0.5">
							{#each [0, 1, 2] as bar (bar)}
								<div
									class="h-1 flex-1 rounded-full transition-all duration-300"
									style="background: {bar <= strength
										? strength === 0 ? '#dc2626' : strength === 1 ? '#f59e0b' : '#16a34a'
										: '#e7e5e4'}"
								></div>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Agree -->
				<label class="flex cursor-pointer items-start gap-2.5 pt-0.5">
					<input
						type="checkbox"
						bind:checked={agree}
						class="mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer rounded accent-[#0057B7]"
					/>
					<span class="font-[Outfit] text-xs leading-relaxed text-stone-400">
						Я погоджуюсь з
						<a href={resolve('/about')} class="text-[#0057B7] no-underline hover:underline">умовами використання</a>
						та
						<a href={resolve('/about')} class="text-[#0057B7] no-underline hover:underline">політикою конфіденційності</a>
					</span>
				</label>

				<!-- Submit -->
				<button
					type="submit"
					disabled={!agree}
					class="mt-1 w-full rounded-[11px] bg-[#0057B7] px-4 py-2.5 font-[Outfit] text-sm font-bold text-white shadow-[0_4px_16px_#0057B730] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0049a3] hover:shadow-[0_6px_20px_#0057B740] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-[0_4px_16px_#0057B730]"
				>
					Створити акаунт
				</button>
			</form>

			<!-- Divider -->
			<div class="my-6 flex items-center gap-3">
				<div class="h-px flex-1 bg-stone-100"></div>
				<span class="font-[JetBrains_Mono] text-[11px] text-stone-300">або</span>
				<div class="h-px flex-1 bg-stone-100"></div>
			</div>

			<!-- OAuth placeholder -->
			<button
				type="button"
				class="flex w-full items-center justify-center gap-2.5 rounded-[11px] border border-stone-200 bg-white px-4 py-2.5 font-[Outfit] text-sm font-medium text-stone-600 transition-all duration-200 hover:border-stone-300 hover:bg-stone-50"
			>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
					<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
					<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
					<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
					<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
				</svg>
				Продовжити через Google
			</button>
		</div>

		<!-- Sign-in link -->
		<p class="mt-5 text-center font-[Outfit] text-sm text-stone-400">
			Вже маєш акаунт?
			<a href={resolve('/sign-in')} class="font-semibold text-[#0057B7] no-underline hover:underline">
				Увійти
			</a>
		</p>
	</div>
</div>

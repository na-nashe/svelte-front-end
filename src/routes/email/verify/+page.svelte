<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.success ? 'Email підтверджено' : 'Помилка підтвердження'} · НаНаше</title>
</svelte:head>

<div class="flex min-h-[calc(100vh-58px)] items-center justify-center px-4 py-16">
	<!-- Orbs -->
	<div
		class="pointer-events-none fixed top-[20%] left-[10%] h-96 w-96 rounded-full opacity-[0.06] blur-3xl"
		style="background: radial-gradient(circle, #0057B7, transparent); animation: waveFloat 14s ease-in-out infinite"
	></div>
	<div
		class="pointer-events-none fixed right-[8%] bottom-[15%] h-72 w-72 rounded-full opacity-[0.04] blur-3xl"
		style="background: radial-gradient(circle, #FFD700, transparent); animation: waveFloat 20s ease-in-out infinite reverse"
	></div>

	<div class="relative w-full max-w-[400px] animate-up">
		<div
			class="rounded-[20px] border border-stone-100 bg-white p-8 text-center shadow-[0_8px_40px_#00000009]"
		>
			<!-- Logo -->
			<a href={resolve('/')} class="mb-8 flex items-center justify-center gap-2 no-underline">
				<div
					class="grid h-9 w-9 place-items-center rounded-[10px] bg-gradient-to-br from-[#0057B7] to-[#FFD700] text-[13px] font-extrabold text-white shadow-[0_2px_8px_#0057B720]"
				>
					Н
				</div>
				<span class="font-[Outfit] text-lg font-extrabold tracking-tight text-stone-900"
					>НаНаше</span
				>
			</a>

			{#if data.success}
				<!-- Success icon -->
				<div
					class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50"
				>
					<svg
						width="32"
						height="32"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#22c55e"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="20 6 9 17 4 12" />
					</svg>
				</div>
				<h1 class="mb-2 font-[Outfit] text-2xl font-black text-stone-900">Email підтверджено!</h1>
				<p class="mb-7 font-[Outfit] text-sm text-stone-400">
					Ваша електронна пошта успішно підтверджена. Тепер можна увійти до акаунту.
				</p>
				<a
					href={resolve('/sign-in')}
					class="inline-block w-full rounded-[11px] bg-[#0057B7] px-4 py-2.5 font-[Outfit] text-sm font-bold text-white no-underline shadow-[0_4px_16px_#0057B730] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0049a3] hover:shadow-[0_6px_20px_#0057B740]"
				>
					Увійти
				</a>
			{:else}
				<!-- Error icon -->
				<div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
					<svg
						width="32"
						height="32"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#ef4444"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="12" cy="12" r="10" />
						<line x1="15" y1="9" x2="9" y2="15" />
						<line x1="9" y1="9" x2="15" y2="15" />
					</svg>
				</div>
				<h1 class="mb-2 font-[Outfit] text-2xl font-black text-stone-900">Посилання недійсне</h1>
				<p class="mb-7 font-[Outfit] text-sm text-stone-400">
					{#if data.reason === 'missing_token'}
						Токен підтвердження відсутній. Перевірте посилання з листа.
					{:else}
						Посилання недійсне або вже використане. Зверніться до підтримки або зареєструйтесь
						знову.
					{/if}
				</p>
				<a
					href={resolve('/')}
					class="inline-block w-full rounded-[11px] border border-stone-200 bg-white px-4 py-2.5 font-[Outfit] text-sm font-medium text-stone-600 no-underline transition-all duration-200 hover:border-stone-300 hover:bg-stone-50"
				>
					На головну
				</a>
			{/if}
		</div>
	</div>
</div>

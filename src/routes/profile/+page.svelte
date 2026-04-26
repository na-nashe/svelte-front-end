<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import ProfileCard from '$lib/widgets/profile/ProfileCard.svelte';
</script>

<div class="min-h-screen bg-[#F7F7F6] px-4 py-12 font-serif sm:px-6 lg:px-8">
	<div class="mx-auto max-w-3xl">
		<div class="mb-8" in:fly={{ y: -20, duration: 400, delay: 0, easing: cubicOut }}>
			<h1 class="text-[32px] leading-none font-bold tracking-tight text-gray-900">Мій профіль</h1>
			<p class="mt-2 text-sm text-gray-500">Керуй своїми даними та налаштуваннями</p>
		</div>

		<ProfileCard title="Аватарка" delay={100}>
			<div class="flex items-center gap-6">
				<div
					class="flex h-22 w-22 items-center justify-center rounded-full bg-[#5252FF] text-2xl leading-none font-bold text-white"
				>
					ОК
				</div>
				<div>
					<h3 class="text-[19px] leading-none font-bold text-gray-900">Олена Коваль</h3>
					<p class="mt-1.5 mb-3 text-sm text-gray-500">olena@example.com</p>
					<button
						class="flex items-center gap-2 rounded-lg border border-gray-200 bg-[#F9F9F8] px-4 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100"
					>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
							></path></svg
						>
						Завантажити фото
					</button>
				</div>
			</div>
		</ProfileCard>

		<ProfileCard title="Ім'я користувача" delay={200}>
			<label
				for="fullName"
				class="mb-2 block text-[11px] font-bold tracking-wider text-gray-400 uppercase"
				>Повне ім'я</label
			>
			<div class="flex gap-3">
				<input
					id="fullName"
					type="text"
					value="Олена Коваль"
					class="flex-1 rounded-lg border border-gray-100 bg-[#F9F9F8] px-4 py-2.5 text-sm text-gray-600 outline-none"
				/>
				<button
					class="rounded-lg border border-gray-200 bg-[#F9F9F8] px-6 py-2.5 text-sm font-bold text-[#5252FF] transition hover:bg-gray-100"
					>Редагувати</button
				>
			</div>
		</ProfileCard>

		<ProfileCard title="Електронна пошта" delay={300}>
			<label
				for="email"
				class="mb-2 block text-[11px] font-bold tracking-wider text-gray-400 uppercase"
				>Email адреса</label
			>
			<div class="mb-2 flex gap-3">
				<input
					id="email"
					type="text"
					value="olena@example.com"
					class="flex-1 rounded-lg border border-gray-100 bg-[#F9F9F8] px-4 py-2.5 text-sm text-gray-600 outline-none"
				/>
				<button
					class="rounded-lg border border-gray-200 bg-[#F9F9F8] px-6 py-2.5 text-sm font-bold text-[#5252FF] transition hover:bg-gray-100"
					>Редагувати</button
				>
			</div>
			<p class="text-[13px] text-gray-400">
				Після зміни ми надішлемо лист підтвердження на нову адресу.
			</p>
		</ProfileCard>

		<ProfileCard title="Пароль" delay={400}>
			<p class="mb-4 text-[14px] text-gray-500">Пароль змінено: 3 місяці тому</p>
			<button
				class="w-full rounded-lg bg-[#F9F9F8] px-4 py-3 text-left text-sm font-bold text-[#5252FF] transition hover:bg-gray-100"
				>Змінити пароль</button
			>
		</ProfileCard>

		<ProfileCard
			title="Небезпечна зона"
			delay={500}
			dotColor="bg-[#EF4444]"
			titleColor="text-[#EF4444]"
		>
			<div class="flex items-center justify-between">
				<div>
					<h3 class="text-[15px] font-bold text-gray-900">Видалити акаунт</h3>
					<p class="mt-0.5 text-[14px] text-gray-500">Всі твої дані будуть видалені назавжди.</p>
				</div>
				<button
					class="rounded-lg border border-[#FEE2E2] bg-[#FEF2F2] px-6 py-2.5 text-sm font-bold text-[#EF4444] transition hover:bg-[#FEE2E2]"
					>Видалити акаунт</button
				>
			</div>
		</ProfileCard>
	</div>
</div>

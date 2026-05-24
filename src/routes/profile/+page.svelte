<script lang="ts">
	import { untrack } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { enhance } from '$app/forms';
	import ProfileCard from '$lib/widgets/profile/ProfileCard.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let username = $state(untrack(() => data.user.username));
	let email = $state(untrack(() => data.user.email ?? ''));

	let editingUsername = $state(false);
	let editingEmail = $state(false);
	let confirmingDelete = $state(false);

	let usernameError = $state<string | null>(null);
	let emailError = $state<string | null>(null);

	let savingUsername = $state(false);
	let savingEmail = $state(false);

	const initials = $derived(
		username
			.trim()
			.split(/\s+/)
			.filter(Boolean)
			.slice(0, 2)
			.map((part) => part[0])
			.join('')
			.toUpperCase() || '?'
	);
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
					{initials}
				</div>
				<div>
					<h3 class="text-[19px] leading-none font-bold text-gray-900">{username}</h3>
					<p class="mt-1.5 text-sm text-gray-500">{email || 'Email не вказано'}</p>
				</div>
			</div>
		</ProfileCard>

		<ProfileCard title="Ім'я користувача" delay={200}>
			<label
				for="fullName"
				class="mb-2 block text-[11px] font-bold tracking-wider text-gray-400 uppercase"
				>Повне ім'я</label
			>
			<form
				method="POST"
				action="?/updateUsername"
				class="flex gap-3"
				use:enhance={() => {
					savingUsername = true;
					return async ({ result, update }) => {
						savingUsername = false;
						if (result.type === 'failure') {
							usernameError = (result.data?.error as string) ?? 'Не вдалося зберегти';
						} else if (result.type === 'success') {
							usernameError = null;
							username = (result.data?.username as string) ?? username;
							editingUsername = false;
							await update({ reset: false });
						}
					};
				}}
			>
				<input
					id="fullName"
					name="username"
					type="text"
					bind:value={username}
					readonly={!editingUsername}
					class="flex-1 rounded-lg border border-gray-100 bg-[#F9F9F8] px-4 py-2.5 text-sm text-gray-600 outline-none read-only:text-gray-500 focus:border-gray-300"
				/>
				{#if editingUsername}
					<button
						type="submit"
						disabled={savingUsername}
						class="rounded-lg bg-[#5252FF] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#4242e0] disabled:opacity-60"
						>{savingUsername ? 'Збереження…' : 'Зберегти'}</button
					>
				{:else}
					<button
						type="button"
						onclick={() => {
							editingUsername = true;
							usernameError = null;
						}}
						class="rounded-lg border border-gray-200 bg-[#F9F9F8] px-6 py-2.5 text-sm font-bold text-[#5252FF] transition hover:bg-gray-100"
						>Редагувати</button
					>
				{/if}
			</form>
			{#if usernameError}
				<p class="mt-2 text-[13px] text-[#EF4444]">{usernameError}</p>
			{/if}
		</ProfileCard>

		<ProfileCard title="Електронна пошта" delay={300}>
			<label
				for="email"
				class="mb-2 block text-[11px] font-bold tracking-wider text-gray-400 uppercase"
				>Email адреса</label
			>
			<form
				method="POST"
				action="?/updateEmail"
				class="mb-2 flex gap-3"
				use:enhance={() => {
					savingEmail = true;
					return async ({ result, update }) => {
						savingEmail = false;
						if (result.type === 'failure') {
							emailError = (result.data?.error as string) ?? 'Не вдалося зберегти';
						} else if (result.type === 'success') {
							emailError = null;
							email = (result.data?.email as string) ?? email;
							editingEmail = false;
							await update({ reset: false });
						}
					};
				}}
			>
				<input
					id="email"
					name="email"
					type="email"
					bind:value={email}
					readonly={!editingEmail}
					placeholder="you@example.com"
					class="flex-1 rounded-lg border border-gray-100 bg-[#F9F9F8] px-4 py-2.5 text-sm text-gray-600 outline-none read-only:text-gray-500 focus:border-gray-300"
				/>
				{#if editingEmail}
					<button
						type="submit"
						disabled={savingEmail}
						class="rounded-lg bg-[#5252FF] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#4242e0] disabled:opacity-60"
						>{savingEmail ? 'Збереження…' : 'Зберегти'}</button
					>
				{:else}
					<button
						type="button"
						onclick={() => {
							editingEmail = true;
							emailError = null;
						}}
						class="rounded-lg border border-gray-200 bg-[#F9F9F8] px-6 py-2.5 text-sm font-bold text-[#5252FF] transition hover:bg-gray-100"
						>Редагувати</button
					>
				{/if}
			</form>
			{#if emailError}
				<p class="text-[13px] text-[#EF4444]">{emailError}</p>
			{:else}
				<p class="text-[13px] text-gray-400">Адреса використовується для входу та сповіщень.</p>
			{/if}
		</ProfileCard>

		<ProfileCard
			title="Небезпечна зона"
			delay={400}
			dotColor="bg-[#EF4444]"
			titleColor="text-[#EF4444]"
		>
			<div class="flex items-center justify-between gap-4">
				<div>
					<h3 class="text-[15px] font-bold text-gray-900">Видалити акаунт</h3>
					<p class="mt-0.5 text-[14px] text-gray-500">Всі твої дані будуть видалені назавжди.</p>
				</div>
				{#if confirmingDelete}
					<form method="POST" action="?/deleteAccount" use:enhance class="flex items-center gap-2">
						<button
							type="button"
							onclick={() => (confirmingDelete = false)}
							class="rounded-lg border border-gray-200 bg-[#F9F9F8] px-4 py-2.5 text-sm font-bold text-gray-600 transition hover:bg-gray-100"
							>Скасувати</button
						>
						<button
							type="submit"
							class="rounded-lg bg-[#EF4444] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#dc2626]"
							>Підтвердити</button
						>
					</form>
				{:else}
					<button
						type="button"
						onclick={() => (confirmingDelete = true)}
						class="rounded-lg border border-[#FEE2E2] bg-[#FEF2F2] px-6 py-2.5 text-sm font-bold text-[#EF4444] transition hover:bg-[#FEE2E2]"
						>Видалити акаунт</button
					>
				{/if}
			</div>
		</ProfileCard>
	</div>
</div>

<script lang="ts">
	import { user } from '$lib/entities/profile/data';

	let { name = $bindable('Олена Коваленко') } = $props();

	let notifications = $state([
		{ l: 'Нові альтернативи', d: 'Коли зʼявляються нові', on: true },
		{ l: 'Відповіді на відгуки', d: 'Коли хтось відповідає', on: true },
		{ l: 'Щотижневий дайджест', d: 'Огляд нових замін', on: false },
		{ l: 'Бейджі та досягнення', d: 'Нові нагороди', on: true }
	]);

	const fields = [
		{ l: "Ім'я", v: name },
		{ l: 'Email', v: user.email },
		{ l: 'Місто', v: user.city },
		{ l: 'Біо', v: 'Шукаю українські альтернативи 🇺🇦', textarea: true }
	];
</script>

<div class="grid max-w-[740px] grid-cols-2 gap-4">
	<!-- Profile form -->
	<div class="animate-up rounded-3xl border-[1.5px] border-stone-200 bg-white px-[26px] py-[30px]">
		<h3 class="mb-6 flex items-center gap-2 text-base font-extrabold">
			<span
				class="grid h-[30px] w-[30px] place-items-center rounded-[9px] text-[15px]"
				style="background: #0057B70a; border: 1px solid #0057B712">👤</span
			> Профіль
		</h3>
		<div class="mb-6 flex items-center gap-4 rounded-2xl border border-stone-100 bg-stone-50 p-4">
			<div
				class="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-xl font-extrabold text-white"
				style="background: linear-gradient(135deg, #0057B7, #7c3aed)"
			>
				{user.av}
			</div>
			<div>
				<div class="mb-1 text-[13px] font-bold">Фото профілю</div>
				<button
					class="cursor-pointer rounded-lg border border-stone-200 bg-white px-3 py-1 font-[Outfit] text-[11px] font-semibold"
					style="color: #0057B7">Змінити</button
				>
			</div>
		</div>
		{#each fields as f, i (f.l)}
			<div class="mb-[18px] animate-slide-r" style="animation-delay: {i * 0.06}s">
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label
					class="mb-1.5 block font-mono text-[10px] font-bold tracking-wider text-stone-400 uppercase"
					>{f.l}</label
				>
				{#if f.textarea}
					<textarea
						value={f.v}
						rows="2"
						class="w-full resize-y rounded-[14px] border-[1.5px] border-stone-200 bg-stone-50 px-4 py-3 font-[Outfit] text-sm font-medium text-stone-900 transition-all duration-[250ms] outline-none focus:border-[#0057B7] focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,87,183,0.05)]"
					></textarea>
				{:else}
					<input
						value={f.v}
						class="w-full rounded-[14px] border-[1.5px] border-stone-200 bg-stone-50 px-4 py-3 font-[Outfit] text-sm font-medium text-stone-900 transition-all duration-[250ms] outline-none focus:border-[#0057B7] focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,87,183,0.05)]"
					/>
				{/if}
			</div>
		{/each}
		<button
			class="w-full cursor-pointer rounded-[14px] border-none bg-stone-900 py-3.5 font-[Outfit] text-[13px] font-bold text-white transition-all duration-200 hover:bg-stone-800"
			>Зберегти зміни</button
		>
	</div>

	<!-- Right column -->
	<div class="flex flex-col gap-4">
		<!-- Notifications -->
		<div
			class="animate-up rounded-3xl border-[1.5px] border-stone-200 bg-white px-[26px] py-[30px]"
			style="animation-delay: 0.1s"
		>
			<h3 class="mb-5 flex items-center gap-2 text-base font-extrabold">
				<span
					class="grid h-[30px] w-[30px] place-items-center rounded-[9px] border border-amber-200 bg-amber-50 text-[15px]"
					>🔔</span
				> Сповіщення
			</h3>
			{#each notifications as n, i (n.l)}
				<div
					class="flex items-center justify-between py-3.5"
					style="border-bottom: {i < notifications.length - 1 ? '1px solid #f5f5f4' : 'none'}"
				>
					<div>
						<div class="mb-0.5 text-[13px] font-semibold text-stone-900">{n.l}</div>
						<div class="text-[11px] text-stone-400">{n.d}</div>
					</div>
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button
						class="relative h-[26px] w-11 shrink-0 cursor-pointer rounded-[13px] border-none p-[3px] transition-colors duration-300"
						style="background: {n.on ? '#0057B7' : '#e7e5e4'}"
						onclick={() => {
							notifications[i].on = !notifications[i].on;
						}}
					>
						<div
							class="h-5 w-5 rounded-[10px] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-transform duration-300"
							style="transform: translateX({n.on ? '18px' : '0'})"
						></div>
					</button>
				</div>
			{/each}
		</div>

		<!-- Interface -->
		<div
			class="animate-up rounded-3xl border-[1.5px] border-stone-200 bg-white px-[26px] py-[30px]"
			style="animation-delay: 0.2s"
		>
			<h3 class="mb-5 flex items-center gap-2 text-base font-extrabold">
				<span
					class="grid h-[30px] w-[30px] place-items-center rounded-[9px] border border-violet-200 bg-violet-50 text-[15px]"
					>🎨</span
				> Інтерфейс
			</h3>
			<div class="mb-5 flex items-center justify-between">
				<div>
					<div class="text-[13px] font-semibold">Мова</div>
					<div class="text-[11px] text-stone-400">Мова інтерфейсу</div>
				</div>
				<select
					class="cursor-pointer rounded-xl border-[1.5px] border-stone-200 bg-stone-50 px-4 py-2.5 font-[Outfit] text-[13px] text-stone-900 outline-none"
				>
					<option>🇺🇦 Українська</option>
					<option>🇬🇧 English</option>
				</select>
			</div>
			<div class="border-t-[1.5px] border-red-200 pt-5">
				<div class="mb-2.5 flex items-center gap-1 text-xs font-bold text-red-600">
					⚠️ Небезпечна зона
				</div>
				<button
					class="w-full cursor-pointer rounded-[14px] border-[1.5px] border-red-200 bg-red-50 py-3 font-[Outfit] text-[13px] font-bold text-red-600 transition-all duration-150 hover:bg-red-100"
					>Вийти з акаунту</button
				>
			</div>
		</div>
	</div>
</div>

<script lang="ts">
	import { user, stats } from '$lib/entities/profile/data';

	let { name = $bindable('Олена Коваленко') } = $props();

	let editName = $state(false);
	let nameIn = $state(name);

	const xpPct = Math.round((user.xp / user.xpN) * 100);

	function saveName() {
		name = nameIn;
		editName = false;
	}
</script>

<div class="relative animate-fade-in overflow-hidden rounded-b-[36px]">
	<!-- Dark gradient bg -->
	<div
		class="relative px-11 pt-[52px] pb-[90px]"
		style="background: linear-gradient(135deg, #0c0a09 0%, #1c1917 40%, #292524 100%)"
	>
		<div
			class="pointer-events-none absolute inset-0 opacity-[0.02]"
			style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 22px 22px"
		></div>
		<div
			class="pointer-events-none absolute -top-10 right-20 h-60 w-60 animate-wave-float rounded-full opacity-[0.08] blur-[60px]"
			style="background: #0057B7"
		></div>
		<div
			class="pointer-events-none absolute -bottom-[30px] left-[60px] h-[180px] w-[180px] animate-wave-float rounded-full opacity-[0.06] blur-[50px]"
			style="background: #FFD700; animation-delay: 7s"
		></div>

		<div class="relative flex items-center gap-6">
			<!-- Avatar -->
			<div
				class="grid h-[100px] w-[100px] shrink-0 animate-scale-in place-items-center rounded-[28px] text-[34px] font-extrabold text-white"
				style="background: linear-gradient(135deg, #0057B7, #2563eb, #7c3aed); background-size: 200% 200%; animation: grad 6s ease infinite; box-shadow: 0 12px 40px #0057B735; border: 3px solid rgba(255,255,255,0.08)"
			>
				{user.av}
			</div>

			<div class="animate-slide-r text-white" style="animation-delay: 0.15s">
				<div class="mb-1.5 flex items-center gap-2.5">
					{#if editName}
						<div class="flex animate-scale-in gap-1.5">
							<input
								bind:value={nameIn}
								class="w-[280px] border-b-2 border-[#FFD700] bg-transparent p-0 pb-0.5 font-[Outfit] text-[28px] font-extrabold text-white outline-none"
								style="border-top: none; border-left: none; border-right: none"
								onkeydown={(e) => {
									if (e.key === 'Enter') saveName();
									if (e.key === 'Escape') {
										nameIn = name;
										editName = false;
									}
								}}
							/>
							<button
								onclick={saveName}
								class="cursor-pointer rounded-lg border-none bg-[#FFD700] px-3.5 py-1.5 text-xs font-bold text-stone-900"
								>&#10003;</button
							>
						</div>
					{:else}
						<h1 class="m-0 text-[30px] font-black tracking-tight">{name}</h1>
						<button
							onclick={() => {
								editName = true;
								nameIn = name;
							}}
							class="grid h-7 w-7 cursor-pointer place-items-center rounded-lg border-none text-xs text-white/[0.38] transition-all duration-200 hover:bg-white/[0.15]"
							style="background: rgba(255,255,255,0.07)">&#9998;</button
						>
					{/if}
				</div>
				<div class="mb-2 text-[13px] text-white/[0.38]">{user.email}</div>
				<div class="flex gap-4 text-xs text-white/25">
					<span>&#128205; {user.city}</span>
					<span>&#128197; З {user.since}</span>
					<span
						class="inline-flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.04] px-2.5 py-0.5"
					>
						<span
							class="h-1.5 w-1.5 rounded-full bg-green-600"
							style="box-shadow: 0 0 6px rgba(22,163,74,0.5)"
						></span>
						<span class="text-[10px] font-semibold text-white/30">Онлайн</span>
					</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Floating cards overlay -->
	<div
		class="relative z-[2] mx-6 -mt-14 grid animate-up grid-cols-[1fr_auto] gap-4"
		style="animation-delay: 0.25s"
	>
		<!-- Stats strip -->
		<div class="grid grid-cols-4 gap-2">
			{#each stats as s, i (s.l)}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="animate-up cursor-default rounded-[20px] border border-stone-200 bg-white px-[18px] py-5 shadow-[0_4px_20px_rgba(0,0,0,0.024)] transition-all duration-300 hover:-translate-y-[3px]"
					style="animation-delay: {0.3 + i * 0.06}s"
					onmouseenter={(e) => {
						e.currentTarget.style.boxShadow = `0 12px 32px ${s.cl}12`;
						e.currentTarget.style.borderColor = s.cl + '30';
					}}
					onmouseleave={(e) => {
						e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.024)';
						e.currentTarget.style.borderColor = '#e7e5e4';
					}}
				>
					<div class="mb-1.5 flex items-center gap-2">
						<div
							class="grid h-8 w-8 place-items-center rounded-[9px] text-[15px]"
							style="background: {s.cl}0a; border: 1px solid {s.cl}12"
						>
							{s.ic}
						</div>
						<span class="font-mono text-[28px] font-extrabold tracking-tight text-stone-900"
							>{s.v}</span
						>
					</div>
					<div class="text-[11px] font-medium text-stone-500">{s.l}</div>
				</div>
			{/each}
		</div>

		<!-- Level card -->
		<div
			class="min-w-[230px] animate-slide-l rounded-[20px] border border-stone-200 bg-white px-[22px] py-5 shadow-[0_4px_20px_rgba(0,0,0,0.024)]"
			style="animation-delay: 0.35s"
		>
			<div class="mb-3.5 flex items-center gap-3">
				<div
					class="grid h-12 w-12 animate-float place-items-center rounded-[14px] text-xl font-extrabold text-white"
					style="background: linear-gradient(135deg, #fbbf24, #f59e0b); box-shadow: 0 6px 16px rgba(251,191,36,0.21)"
				>
					{user.lvl}
				</div>
				<div>
					<div class="text-base font-extrabold">Рівень {user.lvl}</div>
					<div class="text-[11px] text-stone-400">Експерт</div>
				</div>
			</div>
			<div class="mb-1.5 flex items-center gap-2">
				<div class="h-2 flex-1 overflow-hidden rounded bg-stone-100">
					<div
						class="h-full rounded"
						style="width: {xpPct}%; background: linear-gradient(90deg, #0057B7, #2563eb, #7c3aed); background-size: 200%; transition: width 1.5s cubic-bezier(.4,0,.2,1)"
					></div>
				</div>
				<span class="font-mono text-[10px] font-bold text-stone-400">{xpPct}%</span>
			</div>
			<div class="flex justify-between font-mono text-[10px] text-stone-400">
				<span>{user.xp} XP</span><span>{user.xpN} XP</span>
			</div>
			<div class="mt-3.5 flex items-center justify-between border-t border-stone-100 pt-3.5">
				<span class="text-[10px] text-stone-400">Репутація</span>
				<span
					class="bg-gradient-to-br from-[#FFD700] to-[#f59e0b] bg-clip-text font-mono text-lg font-extrabold text-transparent"
					>{user.rep}</span
				>
			</div>
		</div>
	</div>
</div>

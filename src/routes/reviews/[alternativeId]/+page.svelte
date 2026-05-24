<script lang="ts">
	import type { PageData } from './$types';
	import { faviconUrl } from '$lib/shared/utils/favicon';

	interface ApiReview {
		id: number;
		username: string;
		avatar: string | null;
		rating: number;
		title: string | null;
		content: string | null;
		pros: string[];
		cons: string[];
		timestamp: string;
		likes: number;
		dislikes: number;
		myVote: number;
	}

	let { data }: { data: PageData } = $props();

	const summary = $derived(data.summary as { text: string; updatedAt: string } | null);

	const alt = $derived(data.alternative as {
		id: number; name: string; description: string;
		url: string; country: string; pricing_model: string;
	});

	const myReviewId = $derived(data.myReviewId as number | null);

	let altLogoError = $state(false);
	const altLogo = $derived(faviconUrl(alt.url));

	let reviews = $state<ApiReview[]>(data.reviews ?? []);
	const avgRating = $derived(
		reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0
	);

	// Form state
	let hovStar = $state(0);
	let rating = $state(0);
	let title = $state('');
	let content = $state('');
	let pros = $state<string[]>([]);
	let cons = $state<string[]>([]);
	let newPro = $state('');
	let newCon = $state('');
	let submitting = $state(false);
	let submitError = $state<string | null>(null);
	let alreadyReviewed = $state(false);

	const prLabel: Record<string, string> = {
		free: 'Безкоштовно', freemium: 'Freemium', paid: 'Платно'
	};
	const prClass: Record<string, string> = {
		free: 'bg-green-100 text-green-800',
		freemium: 'bg-blue-100 text-blue-800',
		paid: 'bg-amber-100 text-amber-800'
	};

	function stars(n: number, filled: number): string[] {
		return Array.from({ length: 5 }, (_, i) => i < filled ? '★' : '☆');
	}

	function formatDate(ts: string): string {
		return new Date(ts).toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' });
	}

	function initials(name: string): string {
		return name.slice(0, 2).toUpperCase();
	}

	function addPro() {
		const t = newPro.trim();
		if (t) { pros = [...pros, t]; newPro = ''; }
	}
	function addCon() {
		const t = newCon.trim();
		if (t) { cons = [...cons, t]; newCon = ''; }
	}

	// Edit state
	let editingId = $state<number | null>(null);
	let editRating = $state(0);
	let editTitle = $state('');
	let editContent = $state('');
	let editPros = $state<string[]>([]);
	let editCons = $state<string[]>([]);
	let editNewPro = $state('');
	let editNewCon = $state('');
	let editHovStar = $state(0);
	let editSaving = $state(false);
	let editError = $state<string | null>(null);

	// Delete state
	let deletingId = $state<number | null>(null);
	let deleteConfirmId = $state<number | null>(null);

	// Vote state
	let votingId = $state<number | null>(null);

	async function vote(r: ApiReview, value: 1 | -1) {
		if (!data.isAuthenticated || votingId === r.id) return;
		const toggle = r.myVote === value;
		votingId = r.id;
		try {
			const res = await fetch(`/api/reviews/${alt.id}/${r.id}/vote`, {
				method: toggle ? 'DELETE' : 'POST',
				...(toggle
					? {}
					: { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) })
			});
			if (!res.ok) return;
			const body = await res.json();
			reviews = reviews.map((x) =>
				x.id === r.id
					? { ...x, likes: body.likes, dislikes: body.dislikes, myVote: body.myVote }
					: x
			);
		} finally {
			votingId = null;
		}
	}

	function startEdit(r: ApiReview) {
		editingId = r.id;
		editRating = r.rating;
		editTitle = r.title ?? '';
		editContent = r.content ?? '';
		editPros = [...r.pros];
		editCons = [...r.cons];
		editNewPro = '';
		editNewCon = '';
		editError = null;
	}

	function cancelEdit() {
		editingId = null;
		editError = null;
	}

	async function saveEdit(reviewId: number) {
		if (!editRating) { editError = 'Оберіть рейтинг'; return; }
		editSaving = true;
		editError = null;
		try {
			const res = await fetch(`/api/reviews/${alt.id}/${reviewId}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ rating: editRating, title: editTitle || null, content: editContent || null, pros: editPros, cons: editCons })
			});
			const body = await res.json();
			if (!res.ok) { editError = body.message ?? 'Помилка збереження'; return; }
			reviews = reviews.map((r) => r.id === reviewId ? { ...r, ...body } : r);
			editingId = null;
		} catch {
			editError = 'Помилка мережі';
		} finally {
			editSaving = false;
		}
	}

	async function deleteReview(reviewId: number) {
		deletingId = reviewId;
		try {
			const res = await fetch(`/api/reviews/${alt.id}/${reviewId}`, { method: 'DELETE' });
			if (!res.ok) return;
			reviews = reviews.filter((r) => r.id !== reviewId);
			deleteConfirmId = null;
			if (reviewId === myReviewId) alreadyReviewed = false;
		} finally {
			deletingId = null;
		}
	}

	async function submit() {
		if (!rating) { submitError = 'Оберіть рейтинг'; return; }
		submitting = true;
		submitError = null;
		try {
			const res = await fetch(`/api/reviews/${alt.id}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ rating, title: title || null, content: content || null, pros, cons })
			});
			const body = await res.json();
			if (!res.ok) {
				if (res.status === 409) alreadyReviewed = true;
				submitError = body.message ?? 'Щось пішло не так';
				return;
			}
			reviews = [{ ...body, likes: 0, dislikes: 0, myVote: 0 }, ...reviews];
			rating = 0; title = ''; content = ''; pros = []; cons = [];
		} catch {
			submitError = 'Помилка мережі';
		} finally {
			submitting = false;
		}
	}
</script>

<div class="mx-auto max-w-[760px] px-6 py-10">

	<!-- Back -->
	<a
		href="/catalog"
		class="mb-8 inline-flex items-center gap-1.5 font-[Outfit] text-sm text-stone-400 transition-colors hover:text-stone-700"
	>
		<svg width="16" height="16" viewBox="0 0 20 20" fill="none">
			<path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
		</svg>
		Назад до каталогу
	</a>

	<!-- Alternative card -->
	<div class="animate-up mb-8 overflow-hidden rounded-3xl border border-stone-200 bg-white">
		<div class="h-[3px]" style="background: linear-gradient(90deg, #0057B7, #7c3aed)"></div>
		<div class="p-6">
			<div class="flex items-start gap-4">
				{#if altLogo && !altLogoError}
					<img
						src={altLogo}
						alt={alt.name}
						class="h-14 w-14 shrink-0 rounded-2xl border border-stone-200 bg-white object-contain p-1.5"
						onerror={() => (altLogoError = true)}
					/>
				{:else}
					<div
						class="grid h-14 w-14 shrink-0 place-items-center rounded-2xl font-[Outfit] text-lg font-extrabold text-white"
						style="background: linear-gradient(135deg, #0057B7, #7c3aed)"
					>
						{initials(alt.name)}
					</div>
				{/if}
				<div class="flex-1">
					<div class="mb-1 flex flex-wrap items-center gap-2">
						<h1 class="text-xl font-extrabold">{alt.name}</h1>
						<span class="text-base">{alt.country}</span>
						{#if alt.pricing_model}
							<span class="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase {prClass[alt.pricing_model] ?? 'bg-stone-100 text-stone-600'}">
								{prLabel[alt.pricing_model] ?? alt.pricing_model}
							</span>
						{/if}
					</div>
					{#if alt.description}
						<p class="mb-3 text-sm text-stone-500">{alt.description}</p>
					{/if}
					<div class="flex items-center gap-3">
						<div class="flex text-amber-400 text-lg">
							{#each stars(5, Math.round(avgRating)) as s}
								<span>{s}</span>
							{/each}
						</div>
						<span class="font-[JetBrains_Mono] text-sm font-bold text-stone-700">
							{avgRating > 0 ? avgRating.toFixed(1) : '—'}
						</span>
						<span class="text-xs text-stone-400">{reviews.length} відгук{reviews.length === 1 ? '' : reviews.length < 5 ? 'и' : 'ів'}</span>
						{#if alt.url}
							<a
								href={alt.url}
								target="_blank"
								rel="noopener noreferrer"
								class="ml-auto rounded-lg border border-stone-200 px-3 py-1.5 font-[Outfit] text-xs font-semibold text-stone-600 transition-colors hover:bg-stone-50"
							>
								Відвідати сайт →
							</a>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- AI Summary -->
	{#if summary}
		<div class="animate-up mb-8 rounded-3xl border border-stone-200 bg-white p-6" style="animation-delay: 0.08s">
			<div class="mb-3 flex items-center gap-2">
				<span class="text-base">✦</span>
				<h2 class="font-[Outfit] text-sm font-extrabold text-stone-700">Підсумок відгуків</h2>
				<span class="ml-auto text-[10px] text-stone-300">
					оновлено {new Date(summary.updatedAt).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' })}
				</span>
			</div>
			<p class="text-sm leading-relaxed text-stone-600">{summary.text}</p>
		</div>
	{/if}

	<!-- Write review -->
	{#if data.isAuthenticated && !alreadyReviewed}
		<div class="animate-up mb-8 rounded-3xl border border-stone-200 bg-white p-6" style="animation-delay: 0.1s">
			<h2 class="mb-5 font-[Outfit] text-base font-extrabold">Написати відгук</h2>

			<!-- Star picker -->
			<div class="mb-5">
				<p class="mb-2 text-xs font-semibold text-stone-500">Рейтинг <span class="text-red-500">*</span></p>
				<div class="flex gap-1">
					{#each [1, 2, 3, 4, 5] as n}
						<button
							onmouseenter={() => (hovStar = n)}
							onmouseleave={() => (hovStar = 0)}
							onclick={() => (rating = n)}
							class="cursor-pointer text-3xl transition-transform duration-100 hover:scale-110 {(hovStar || rating) >= n ? 'text-amber-400' : 'text-stone-200'}"
						>★</button>
					{/each}
					{#if rating}
						<span class="ml-2 self-center font-[Outfit] text-sm font-semibold text-stone-500">{rating}/5</span>
					{/if}
				</div>
			</div>

			<!-- Title -->
			<div class="mb-4">
				<label class="mb-1.5 block text-xs font-semibold text-stone-500" for="rev-title">Заголовок</label>
				<input
					id="rev-title"
					bind:value={title}
					placeholder="Коротко про враження..."
					maxlength="200"
					class="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 font-[Outfit] text-sm outline-none transition-colors focus:border-[#0057B7] focus:ring-2 focus:ring-[#0057B710]"
				/>
			</div>

			<!-- Content -->
			<div class="mb-4">
				<label class="mb-1.5 block text-xs font-semibold text-stone-500" for="rev-content">Відгук</label>
				<textarea
					id="rev-content"
					bind:value={content}
					placeholder="Детальніше про досвід використання..."
					rows="4"
					class="w-full resize-none rounded-xl border border-stone-200 px-3.5 py-2.5 font-[Outfit] text-sm outline-none transition-colors focus:border-[#0057B7] focus:ring-2 focus:ring-[#0057B710]"
				></textarea>
			</div>

			<!-- Pros & Cons -->
			<div class="mb-5 grid gap-4 sm:grid-cols-2">
				<div>
					<p class="mb-2 text-xs font-semibold text-stone-500">Переваги</p>
					<div class="mb-2 flex flex-wrap gap-1.5">
						{#each pros as pro, i}
							<span class="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700">
								+ {pro}
								<button onclick={() => (pros = pros.filter((_, j) => j !== i))} class="cursor-pointer text-green-400 hover:text-green-700">×</button>
							</span>
						{/each}
					</div>
					<div class="flex gap-2">
						<input
							bind:value={newPro}
							onkeydown={(e) => e.key === 'Enter' && addPro()}
							placeholder="Додати перевагу..."
							class="flex-1 rounded-xl border border-stone-200 px-3 py-2 text-xs outline-none focus:border-green-400"
						/>
						<button
							onclick={addPro}
							class="cursor-pointer rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-xs font-bold text-green-700 transition-colors hover:bg-green-100"
						>+</button>
					</div>
				</div>
				<div>
					<p class="mb-2 text-xs font-semibold text-stone-500">Недоліки</p>
					<div class="mb-2 flex flex-wrap gap-1.5">
						{#each cons as con, i}
							<span class="flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700">
								− {con}
								<button onclick={() => (cons = cons.filter((_, j) => j !== i))} class="cursor-pointer text-red-400 hover:text-red-700">×</button>
							</span>
						{/each}
					</div>
					<div class="flex gap-2">
						<input
							bind:value={newCon}
							onkeydown={(e) => e.key === 'Enter' && addCon()}
							placeholder="Додати недолік..."
							class="flex-1 rounded-xl border border-stone-200 px-3 py-2 text-xs outline-none focus:border-red-400"
						/>
						<button
							onclick={addCon}
							class="cursor-pointer rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700 transition-colors hover:bg-red-100"
						>+</button>
					</div>
				</div>
			</div>

			{#if submitError}
				<p class="mb-3 rounded-xl bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600">{submitError}</p>
			{/if}

			<div class="flex justify-end">
				<button
					onclick={submit}
					disabled={submitting}
					class="cursor-pointer rounded-xl bg-[#0057B7] px-6 py-2.5 font-[Outfit] text-sm font-bold text-white transition-colors hover:bg-[#0046a0] disabled:opacity-50"
				>
					{submitting ? 'Надсилаємо...' : 'Опублікувати відгук'}
				</button>
			</div>
		</div>
	{:else if !data.isAuthenticated}
		<div class="animate-up mb-8 rounded-3xl border border-stone-200 bg-white p-6 text-center" style="animation-delay: 0.1s">
			<div class="mb-3 text-3xl">🔒</div>
			<p class="mb-4 text-sm text-stone-500">Увійдіть, щоб залишити відгук</p>
			<a href="/sign-in" class="inline-block rounded-xl bg-[#0057B7] px-5 py-2 font-[Outfit] text-sm font-bold text-white hover:bg-[#0046a0]">
				Увійти
			</a>
		</div>
	{/if}

	<!-- Reviews list -->
	<div>
		<h2 class="mb-4 font-[Outfit] text-base font-extrabold text-stone-700">
			{reviews.length > 0 ? `Відгуки (${reviews.length})` : 'Ще немає відгуків'}
		</h2>

		{#if reviews.length === 0}
			<div class="rounded-3xl border border-dashed border-stone-200 p-12 text-center text-sm text-stone-400">
				Будьте першим, хто залишить відгук!
			</div>
		{/if}

		<div class="flex flex-col gap-4">
			{#each reviews as r (r.id)}
				<div class="animate-up rounded-2xl border border-stone-200 bg-white p-5 transition-shadow hover:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.12)]">
					<!-- Header -->
					<div class="mb-3 flex items-start gap-3">
						{#if r.avatar}
							<img src={r.avatar} alt={r.username} class="h-10 w-10 rounded-full object-cover ring-2 ring-stone-100" />
						{:else}
							<div class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#0057B7] to-[#7c3aed] font-[Outfit] text-xs font-extrabold text-white ring-2 ring-stone-100">
								{initials(r.username)}
							</div>
						{/if}
						<div class="flex-1">
							<div class="flex flex-wrap items-center gap-2">
								<span class="font-[Outfit] text-sm font-bold text-stone-800">@{r.username}</span>
								<span class="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5">
									<span class="flex text-amber-400 text-xs leading-none">
										{#each stars(5, r.rating) as s}<span>{s}</span>{/each}
									</span>
									<span class="font-[JetBrains_Mono] text-[10px] font-bold text-amber-600">{r.rating}/5</span>
								</span>
							</div>
							<span class="text-[11px] text-stone-400">{formatDate(r.timestamp)}</span>
						</div>
						{#if r.id === myReviewId && editingId !== r.id && deleteConfirmId !== r.id}
							<div class="flex gap-1">
								<button
									onclick={() => startEdit(r)}
									class="cursor-pointer rounded-lg p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700"
									title="Редагувати"
								>
									<svg width="14" height="14" viewBox="0 0 20 20" fill="none">
										<path d="M14.5 2.5a2.121 2.121 0 0 1 3 3L6 17H3v-3L14.5 2.5z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
									</svg>
								</button>
								<button
									onclick={() => (deleteConfirmId = r.id)}
									class="cursor-pointer rounded-lg p-1.5 text-stone-400 transition-colors hover:bg-red-50 hover:text-red-600"
									title="Видалити"
								>
									<svg width="14" height="14" viewBox="0 0 20 20" fill="none">
										<path d="M3 5h14M8 5V3h4v2M6 5l1 12h6l1-12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
								</button>
							</div>
						{/if}
					</div>

					{#if deleteConfirmId === r.id}
						<div class="rounded-xl bg-red-50 px-4 py-3 text-sm">
							<p class="mb-3 font-semibold text-red-700">Видалити цей відгук?</p>
							<div class="flex gap-2">
								<button
									onclick={() => deleteReview(r.id)}
									disabled={deletingId === r.id}
									class="cursor-pointer rounded-lg bg-red-600 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
								>
									{deletingId === r.id ? 'Видаляємо...' : 'Так, видалити'}
								</button>
								<button
									onclick={() => (deleteConfirmId = null)}
									class="cursor-pointer rounded-lg border border-stone-200 bg-white px-4 py-1.5 text-xs font-bold text-stone-600 transition-colors hover:bg-stone-50"
								>Скасувати</button>
							</div>
						</div>
					{:else if editingId === r.id}
						<!-- Inline edit form -->
						<div class="space-y-4">
							<!-- Star picker -->
							<div>
								<p class="mb-1.5 text-xs font-semibold text-stone-500">Рейтинг <span class="text-red-500">*</span></p>
								<div class="flex gap-1">
									{#each [1,2,3,4,5] as n}
										<button
											onmouseenter={() => (editHovStar = n)}
											onmouseleave={() => (editHovStar = 0)}
											onclick={() => (editRating = n)}
											class="cursor-pointer text-2xl transition-transform duration-100 hover:scale-110 {(editHovStar || editRating) >= n ? 'text-amber-400' : 'text-stone-200'}"
										>★</button>
									{/each}
								</div>
							</div>
							<!-- Title -->
							<input
								bind:value={editTitle}
								placeholder="Заголовок..."
								maxlength="200"
								class="w-full rounded-xl border border-stone-200 px-3.5 py-2 font-[Outfit] text-sm outline-none focus:border-[#0057B7] focus:ring-2 focus:ring-[#0057B710]"
							/>
							<!-- Content -->
							<textarea
								bind:value={editContent}
								placeholder="Відгук..."
								rows="3"
								class="w-full resize-none rounded-xl border border-stone-200 px-3.5 py-2 font-[Outfit] text-sm outline-none focus:border-[#0057B7] focus:ring-2 focus:ring-[#0057B710]"
							></textarea>
							<!-- Pros -->
							<div>
								<p class="mb-1.5 text-xs font-semibold text-stone-500">Переваги</p>
								<div class="mb-1.5 flex flex-wrap gap-1.5">
									{#each editPros as pro, i}
										<span class="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700">
											+ {pro}
											<button onclick={() => (editPros = editPros.filter((_, j) => j !== i))} class="cursor-pointer text-green-400 hover:text-green-700">×</button>
										</span>
									{/each}
								</div>
								<div class="flex gap-2">
									<input bind:value={editNewPro} onkeydown={(e) => { if (e.key === 'Enter' && editNewPro.trim()) { editPros = [...editPros, editNewPro.trim()]; editNewPro = ''; } }} placeholder="Додати перевагу..." class="flex-1 rounded-xl border border-stone-200 px-3 py-2 text-xs outline-none focus:border-green-400" />
									<button onclick={() => { if (editNewPro.trim()) { editPros = [...editPros, editNewPro.trim()]; editNewPro = ''; } }} class="cursor-pointer rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-xs font-bold text-green-700 hover:bg-green-100">+</button>
								</div>
							</div>
							<!-- Cons -->
							<div>
								<p class="mb-1.5 text-xs font-semibold text-stone-500">Недоліки</p>
								<div class="mb-1.5 flex flex-wrap gap-1.5">
									{#each editCons as con, i}
										<span class="flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700">
											− {con}
											<button onclick={() => (editCons = editCons.filter((_, j) => j !== i))} class="cursor-pointer text-red-400 hover:text-red-700">×</button>
										</span>
									{/each}
								</div>
								<div class="flex gap-2">
									<input bind:value={editNewCon} onkeydown={(e) => { if (e.key === 'Enter' && editNewCon.trim()) { editCons = [...editCons, editNewCon.trim()]; editNewCon = ''; } }} placeholder="Додати недолік..." class="flex-1 rounded-xl border border-stone-200 px-3 py-2 text-xs outline-none focus:border-red-400" />
									<button onclick={() => { if (editNewCon.trim()) { editCons = [...editCons, editNewCon.trim()]; editNewCon = ''; } }} class="cursor-pointer rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-100">+</button>
								</div>
							</div>
							{#if editError}
								<p class="rounded-xl bg-red-50 px-4 py-2 text-xs font-semibold text-red-600">{editError}</p>
							{/if}
							<div class="flex justify-end gap-2">
								<button onclick={cancelEdit} class="cursor-pointer rounded-xl border border-stone-200 px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-50">Скасувати</button>
								<button
									onclick={() => saveEdit(r.id)}
									disabled={editSaving}
									class="cursor-pointer rounded-xl bg-[#0057B7] px-5 py-2 text-xs font-bold text-white hover:bg-[#0046a0] disabled:opacity-50"
								>
									{editSaving ? 'Зберігаємо...' : 'Зберегти'}
								</button>
							</div>
						</div>
					{:else}
						{#if r.title}
							<h3 class="mb-1.5 font-[Outfit] text-base font-bold text-stone-800">{r.title}</h3>
						{/if}
						{#if r.content}
							<p class="mb-4 text-sm leading-relaxed text-stone-600">{r.content}</p>
						{/if}
						{#if r.pros?.length || r.cons?.length}
							<div class="grid gap-3 sm:grid-cols-2">
								{#if r.pros?.length}
									<div class="rounded-2xl border border-green-100 bg-green-50/60 p-4">
										<div class="mb-2.5 flex items-center gap-1.5">
											<span class="grid h-5 w-5 place-items-center rounded-full bg-green-500 text-white">
												<svg width="11" height="11" viewBox="0 0 20 20" fill="none">
													<path d="M4 10.5l4 4 8-9" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
												</svg>
											</span>
											<span class="font-[Outfit] text-xs font-extrabold uppercase tracking-wide text-green-700">Переваги</span>
										</div>
										<ul class="flex flex-col gap-2">
											{#each r.pros as pro}
												<li class="flex items-start gap-2 text-sm text-stone-700">
													<span class="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-green-400"></span>
													<span>{pro}</span>
												</li>
											{/each}
										</ul>
									</div>
								{/if}
								{#if r.cons?.length}
									<div class="rounded-2xl border border-rose-100 bg-rose-50/60 p-4">
										<div class="mb-2.5 flex items-center gap-1.5">
											<span class="grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-white">
												<svg width="11" height="11" viewBox="0 0 20 20" fill="none">
													<path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
												</svg>
											</span>
											<span class="font-[Outfit] text-xs font-extrabold uppercase tracking-wide text-rose-700">Недоліки</span>
										</div>
										<ul class="flex flex-col gap-2">
											{#each r.cons as con}
												<li class="flex items-start gap-2 text-sm text-stone-700">
													<span class="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400"></span>
													<span>{con}</span>
												</li>
											{/each}
										</ul>
									</div>
								{/if}
							</div>
						{/if}

						<!-- Helpful votes -->
						<div class="mt-4 flex items-center gap-2 border-t border-stone-100 pt-3">
							<span class="mr-1 font-[Outfit] text-[11px] font-semibold text-stone-400">Корисно?</span>
							<button
								onclick={() => vote(r, 1)}
								disabled={!data.isAuthenticated || votingId === r.id}
								title={data.isAuthenticated ? 'Корисний відгук' : 'Увійдіть, щоб голосувати'}
								class="flex cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 py-1 font-[Outfit] text-xs font-semibold transition-colors disabled:cursor-default disabled:opacity-50 {r.myVote === 1 ? 'border-green-300 bg-green-50 text-green-700' : 'border-stone-200 text-stone-500 hover:bg-stone-50'}"
							>
								<svg width="14" height="14" viewBox="0 0 20 20" fill="none">
									<path d="M6 9v8H3V9h3zm0 0l4-6c1 0 2 .8 2 2v3h4.5c.8 0 1.5.7 1.3 1.6l-1.3 5.4c-.2.8-.9 1.4-1.7 1.4H6" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
								</svg>
								{r.likes}
							</button>
							<button
								onclick={() => vote(r, -1)}
								disabled={!data.isAuthenticated || votingId === r.id}
								title={data.isAuthenticated ? 'Некорисний відгук' : 'Увійдіть, щоб голосувати'}
								class="flex cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 py-1 font-[Outfit] text-xs font-semibold transition-colors disabled:cursor-default disabled:opacity-50 {r.myVote === -1 ? 'border-red-300 bg-red-50 text-red-600' : 'border-stone-200 text-stone-500 hover:bg-stone-50'}"
							>
								<svg width="14" height="14" viewBox="0 0 20 20" fill="none">
									<path d="M14 11V3h3v8h-3zm0 0l-4 6c-1 0-2-.8-2-2v-3H3.5c-.8 0-1.5-.7-1.3-1.6l1.3-5.4C3.7 3.6 4.4 3 5.2 3H14" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
								</svg>
								{r.dislikes}
							</button>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

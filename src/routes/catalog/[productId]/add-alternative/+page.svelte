<script lang="ts">
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	const pricingOptions = [
		{ value: 'FREE', label: 'Безкоштовно' },
		{ value: 'FREEMIUM', label: 'Freemium' },
		{ value: 'PAID', label: 'Платно' }
	];
</script>

<div class="mx-auto max-w-[600px] px-6 py-10">
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

	<div class="animate-up overflow-hidden rounded-3xl border border-stone-200 bg-white">
		<div class="h-[3px]" style="background: linear-gradient(90deg, #0057B7, #7c3aed)"></div>
		<div class="p-7">
			<p class="mb-1 font-[Outfit] text-xs font-semibold text-stone-400">Альтернатива для</p>
			<h1 class="mb-7 font-[Outfit] text-xl font-extrabold">{data.product.name}</h1>

			<form method="POST" class="space-y-5">
				<!-- Name -->
				<div>
					<label class="mb-1.5 block text-xs font-semibold text-stone-500" for="name">
						Назва <span class="text-red-500">*</span>
					</label>
					<input
						id="name"
						name="name"
						required
						placeholder="Назва альтернативи..."
						maxlength="150"
						class="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 font-[Outfit] text-sm outline-none transition-colors focus:border-[#0057B7] focus:ring-2 focus:ring-[#0057B710]"
					/>
				</div>

				<!-- Country -->
				<div>
					<label class="mb-1.5 block text-xs font-semibold text-stone-500" for="countryId">
						Країна <span class="text-red-500">*</span>
					</label>
					<select
						id="countryId"
						name="countryId"
						required
						class="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 font-[Outfit] text-sm outline-none transition-colors focus:border-[#0057B7] focus:ring-2 focus:ring-[#0057B710]"
					>
						<option value="" disabled selected>Оберіть країну...</option>
						{#each data.countries as c}
							<option value={c.id}>{c.name}</option>
						{/each}
					</select>
				</div>

				<!-- Pricing model -->
				<div>
					<p class="mb-2 text-xs font-semibold text-stone-500">Модель ціноутворення <span class="text-red-500">*</span></p>
					<div class="flex gap-2">
						{#each pricingOptions as opt}
							<label class="flex-1 cursor-pointer">
								<input type="radio" name="pricingModel" value={opt.value} class="peer sr-only" required />
								<span class="block rounded-xl border border-stone-200 px-3 py-2.5 text-center text-xs font-semibold text-stone-500 transition-all peer-checked:border-[#0057B7] peer-checked:bg-[#0057B710] peer-checked:text-[#0057B7]">
									{opt.label}
								</span>
							</label>
						{/each}
					</div>
				</div>

				<!-- Description -->
				<div>
					<label class="mb-1.5 block text-xs font-semibold text-stone-500" for="description">
						Опис
					</label>
					<textarea
						id="description"
						name="description"
						rows="3"
						placeholder="Короткий опис..."
						class="w-full resize-none rounded-xl border border-stone-200 px-3.5 py-2.5 font-[Outfit] text-sm outline-none transition-colors focus:border-[#0057B7] focus:ring-2 focus:ring-[#0057B710]"
					></textarea>
				</div>

				<!-- URL -->
				<div>
					<label class="mb-1.5 block text-xs font-semibold text-stone-500" for="url">
						Вебсайт
					</label>
					<input
						id="url"
						name="url"
						type="url"
						placeholder="https://..."
						maxlength="500"
						class="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 font-[Outfit] text-sm outline-none transition-colors focus:border-[#0057B7] focus:ring-2 focus:ring-[#0057B710]"
					/>
				</div>

				{#if form?.error}
					<p class="rounded-xl bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600">{form.error}</p>
				{/if}

				<div class="flex justify-end pt-1">
					<button
						type="submit"
						class="cursor-pointer rounded-xl bg-[#0057B7] px-6 py-2.5 font-[Outfit] text-sm font-bold text-white transition-colors hover:bg-[#0046a0]"
					>
						Додати альтернативу
					</button>
				</div>
			</form>
		</div>
	</div>
</div>

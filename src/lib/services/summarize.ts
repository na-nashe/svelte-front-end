import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { db } from '$lib/db';
import { reviews, reviewSummaries } from '$lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { config } from 'dotenv';

config();

const openai = createOpenAI({
	apiKey: process.env.OPENAI_API_KEY
});
export async function regenerateSummary(alternativeId: number): Promise<void> {
	const latest = await db
		.select({
			rating: reviews.rating,
			title: reviews.title,
			content: reviews.content,
			pros: reviews.pros,
			cons: reviews.cons
		})
		.from(reviews)
		.where(eq(reviews.alternativeId, alternativeId))
		.orderBy(desc(reviews.timestamp))
		.limit(10);

	if (latest.length === 0) return;

	const reviewsText = latest
		.map((r, i) => {
			const parts = [`Відгук ${i + 1}: Рейтинг ${r.rating}/5`];
			if (r.title) parts.push(`Заголовок: "${r.title}"`);
			if (r.content) parts.push(`Текст: ${r.content}`);
			if (r.pros?.length) parts.push(`Переваги: ${r.pros.join(', ')}`);
			if (r.cons?.length) parts.push(`Недоліки: ${r.cons.join(', ')}`);
			return parts.join('. ');
		})
		.join('\n');

	const { text } = await generateText({
		model: openai('gpt-4o-mini'),
		prompt: `Проаналізуй ці відгуки користувачів і склади короткий підсумок (2-3 речення) українською мовою. Зазнач загальне враження, головні переваги та недоліки:\n\n${reviewsText}`
	});
	await db
		.insert(reviewSummaries)
		.values({ alternativeId, summary: text, updatedAt: new Date().toISOString() })
		.onConflictDoUpdate({
			target: reviewSummaries.alternativeId,
			set: { summary: text, updatedAt: new Date().toISOString() }
		});
}

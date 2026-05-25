import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { config } from 'dotenv';

config();

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface ValidationResult {
	valid: boolean;
	reason: string;
}

export async function validateAlternative(
	name: string,
	url?: string | null
): Promise<ValidationResult> {
	const urlHint = url ? ` (website: ${url})` : '';

	try {
		const { text } = await generateText({
			model: openai.responses('gpt-4o-mini'),
			tools: {
				webSearch: openai.tools.webSearchPreview({})
			},
			prompt: `Search for "${name}"${urlHint} and determine:
1. Is this a real, legitimate software product or service (not gibberish or made-up)?
2. Is this product or its parent company originally from Russia or Belarus?

Respond ONLY with a JSON object, no markdown, no extra text:
{"valid": boolean, "isRussianOrBelarusian": boolean, "reason": "short explanation in Ukrainian"}`
		});

		const json = JSON.parse(text.trim().replace(/^```json\n?|```$/g, ''));

		if (json.isRussianOrBelarusian) {
			return { valid: false, reason: json.reason ?? 'Продукт з Росії або Білорусі' };
		}

		return { valid: !!json.valid, reason: json.reason ?? '' };
	} catch {
		return { valid: true, reason: '' };
	}
}

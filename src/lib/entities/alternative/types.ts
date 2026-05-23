export interface AlternativeSummary {
	total: number;
}

export interface AlternativeSearchRequest {
	productName: string;
	categories: string[];
}

export type PricingModel = 'FREE' | 'PAID' | 'FREEMIUM';

export interface AlternativeSearchItem {
	name: string;
	description: string;
	url: string;
	country: string;
	pricingModel?: PricingModel | null;
	isCashbackAvailable?: boolean | null;
	cashbackInfo?: string | null;
}

export interface AlternativeSearchResponse {
	message?: string;
	alternatives?: AlternativeSearchItem[];
}

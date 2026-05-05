export interface AlternativeSummary {
	total: number;
}

export interface AlternativeSearchRequest {
	productName: string;
	categories: string[];
}

export interface AlternativeSearchItem {
	name: string;
	description: string;
	url: string;
	country: string;
}

export interface AlternativeSearchResponse {
	message?: string;
	alternatives?: AlternativeSearchItem[];
}

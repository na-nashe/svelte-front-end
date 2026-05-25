export interface ApiAlternative {
	id: number;
	name: string;
	description: string;
	url: string;
	country: string;
	pricing_model: 'free' | 'freemium' | 'paid';
	avg_rating: number;
	review_count: number;
}

export interface ApiProduct {
	id: number;
	name: string;
	category: string;
	origin: string;
	aliases: string[];
	alternatives: ApiAlternative[];
}

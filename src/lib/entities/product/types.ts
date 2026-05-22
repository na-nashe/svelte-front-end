export interface ApiAlternative {
	name: string;
	description: string;
	url: string;
	country: string;
	pricing_model: 'free' | 'freemium' | 'paid';
}

export interface ApiProduct {
	id: number;
	name: string;
	category: string;
	origin: string;
	aliases: string[];
	alternatives: ApiAlternative[];
}

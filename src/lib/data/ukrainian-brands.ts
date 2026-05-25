export interface SpotlightBrand {
	name: string;
	category: string;
	letter: string;
	color: string;
	users: string;
	description: string;
	tag: string;
	featured: boolean;
}

export interface CatalogBrand {
	id?: number;
	name: string;
	description: string;
	url?: string;
	pricingModel: 'free' | 'freemium' | 'paid';
	rating: number;
	reviewCount: number;
	letter: string;
	color: string;
	category: string;
	replacesProduct: string;
	replacesFlag: string;
}

export const SPOTLIGHT_BRANDS: SpotlightBrand[] = [
	{
		name: 'Monobank',
		category: 'Банкінг',
		letter: 'M',
		color: '#1c1917',
		users: '8M+',
		description: 'Мобільний банк з найкращим UX. Cashback, донати на ЗСУ.',
		tag: 'Лідер',
		featured: true
	},
	{
		name: 'Grammarly',
		category: 'AI',
		letter: 'G',
		color: '#15803d',
		users: '30M+',
		description: 'AI-помічник для письма, заснований у Києві.',
		tag: 'Глобальний',
		featured: true
	},
	{
		name: 'Ajax Systems',
		category: 'IoT',
		letter: 'A',
		color: '#e11d48',
		users: '2M+',
		description: 'Безпека для дому та бізнесу — 169 країн.',
		tag: 'Безпека',
		featured: false
	},
	{
		name: 'Readdle',
		category: 'Додатки',
		letter: 'R',
		color: '#6d28d9',
		users: '15M+',
		description: 'Spark, PDF Expert — must-have для Apple.',
		tag: 'Топ',
		featured: false
	},
	{
		name: 'MacPaw',
		category: 'Софт',
		letter: 'M',
		color: '#0ea5e9',
		users: '20M+',
		description: 'CleanMyMac, Setapp — екосистема для Mac.',
		tag: 'Глобальний',
		featured: true
	},
	{
		name: 'Uklon',
		category: 'Таксі',
		letter: 'U',
		color: '#00C853',
		users: '10M+',
		description: 'Повністю українська служба таксі.',
		tag: 'Наше',
		featured: false
	},
	{
		name: 'Megogo',
		category: 'Стрімінг',
		letter: 'Me',
		color: '#6C3FB5',
		users: '5M+',
		description: 'Фільми, серіали, ТБ — все українською.',
		tag: 'Наше',
		featured: false
	},
	{
		name: 'Diia',
		category: 'Держпослуги',
		letter: 'Д',
		color: '#0057B7',
		users: '20M+',
		description: 'Цифрова держава у смартфоні.',
		tag: 'Держава',
		featured: true
	}
];

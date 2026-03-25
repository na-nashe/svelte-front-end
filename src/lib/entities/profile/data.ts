export const user = {
	av: 'ОК',
	email: 'olena.k@gmail.com',
	since: 'Лютий 2025',
	city: 'Київ',
	lvl: 4,
	xp: 720,
	xpN: 1000,
	rep: 1840
};

export interface Badge {
	ic: string;
	n: string;
	d: string;
	earned: boolean;
}

export const badges: Badge[] = [
	{ ic: '🏅', n: 'Новачок', d: 'Перший відгук', earned: true },
	{ ic: '⭐', n: 'Критик', d: '10+ відгуків', earned: true },
	{ ic: '🔥', n: 'Активіст', d: '30 днів поспіль', earned: true },
	{ ic: '💎', n: 'Експерт', d: '50+ корисних', earned: true },
	{ ic: '🇺🇦', n: 'Патріот', d: '5+ переходів на UA', earned: true },
	{ ic: '👑', n: 'Легенда', d: '100+ відгуків', earned: false }
];

export interface Stat {
	v: number;
	l: string;
	ic: string;
	cl: string;
}

export const stats: Stat[] = [
	{ v: 47, l: 'Відгуків', ic: '✍️', cl: '#0057B7' },
	{ v: 312, l: 'Корисних', ic: '👍', cl: '#059669' },
	{ v: 12, l: 'Переходів', ic: '🔄', cl: '#f59e0b' },
	{ v: 8, l: 'Обраних', ic: '❤️', cl: '#e11d48' }
];

export interface Review {
	prod: string;
	L: string;
	cl: string;
	r: number;
	t: string;
	date: string;
	h: number;
	from: string;
	pros: string[];
	cons: string[];
}

export const reviews: Review[] = [
	{
		prod: 'Signal',
		L: 'S',
		cl: '#3A76F0',
		r: 5,
		t: 'Повністю перейшла з Telegram. Шифрування на рівні, все працює.',
		date: '3 дні тому',
		h: 24,
		from: 'Telegram',
		pros: ['Шифрування', 'Open source'],
		cons: ['Менше стікерів']
	},
	{
		prod: 'Brave',
		L: 'B',
		cl: '#FB542B',
		r: 5,
		t: 'Найкращий браузер. Реклама зникла, сторінки летять швидко.',
		date: '1 тиждень тому',
		h: 18,
		from: 'Yandex Browser',
		pros: ['Швидкість', 'Adblock'],
		cons: []
	},
	{
		prod: 'Uklon',
		L: 'Uk',
		cl: '#00C853',
		r: 4,
		t: 'Класний сервіс, водії ввічливі. Іноді довго чекати в не-пікові.',
		date: '2 тижні тому',
		h: 11,
		from: 'Яндекс.Таксі',
		pros: ['Українське', 'Ціни'],
		cons: ['Час очікування']
	},
	{
		prod: 'ESET NOD32',
		L: 'E',
		cl: '#00B956',
		r: 4,
		t: 'Надійний, не гальмує систему. Інтерфейс міг би бути кращим.',
		date: '3 тижні тому',
		h: 8,
		from: 'Касперський',
		pros: ['Захист', 'Легкий'],
		cons: ['UI']
	}
];

export interface Favorite {
	n: string;
	cl: string;
	L: string;
	ratio: number;
	cat: string;
}

export const favorites: Favorite[] = [
	{ n: 'Signal', cl: '#3A76F0', L: 'S', ratio: 92, cat: 'Месенджери' },
	{ n: 'Brave', cl: '#FB542B', L: 'B', ratio: 95, cat: 'Браузери' },
	{ n: 'Megogo', cl: '#6C3FB5', L: 'Me', ratio: 86, cat: 'Стрімінг' },
	{ n: 'Uklon', cl: '#00C853', L: 'U', ratio: 93, cat: 'Таксі' },
	{ n: 'ProtonMail', cl: '#6D4AFF', L: 'P', ratio: 90, cat: 'Пошта' },
	{ n: 'ESET NOD32', cl: '#00B956', L: 'E', ratio: 91, cat: 'Безпека' },
	{ n: 'BAS', cl: '#0057B7', L: 'B', ratio: 89, cat: 'ERP' },
	{ n: 'Dilovod', cl: '#FF6B00', L: 'D', ratio: 84, cat: 'ERP' }
];

export interface Activity {
	t: string;
	time: string;
	ic: string;
	cl: string;
}

export const activity: Activity[] = [
	{ t: 'Залишила відгук на Signal', time: '3 дні тому', ic: '✍️', cl: '#3A76F0' },
	{ t: 'Перейшла Telegram → Signal', time: '3 дні тому', ic: '🔄', cl: '#16a34a' },
	{ t: 'Залишила відгук на Brave', time: '1 тиждень', ic: '✍️', cl: '#FB542B' },
	{ t: 'Додала Megogo в обрані', time: '1 тиждень', ic: '❤️', cl: '#e11d48' },
	{ t: 'Отримала бейдж «Експерт»', time: '2 тижні', ic: '💎', cl: '#8b5cf6' },
	{ t: 'Перейшла Касперський → ESET', time: '3 тижні', ic: '🔄', cl: '#16a34a' }
];

export const profileTabs = [
	{ id: 'overview', l: 'Огляд', ic: '📊' },
	{ id: 'reviews', l: 'Відгуки (4)', ic: '✍️' },
	{ id: 'favorites', l: 'Обрані (8)', ic: '❤️' },
	{ id: 'settings', l: 'Налаштування', ic: '⚙️' }
];

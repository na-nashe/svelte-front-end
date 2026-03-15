export interface CashbackProduct {
	name: string;
	cat: string;
	pct: number;
	brand: string;
	origin: string;
	L: string;
	cl: string;
	v: boolean;
	pop: boolean;
}

export const CB_CATS = [
	'Одяг та взуття',
	'Продукти харчування',
	'Техніка',
	'Косметика',
	'Меблі',
	'Побутова хімія',
	'Іграшки',
	'Спорт'
];

export const CB: CashbackProduct[] = [
	{ name: 'Roshen', cat: 'Продукти харчування', pct: 10, brand: 'Roshen', origin: 'Вінниця', L: 'R', cl: '#c2185b', v: true, pop: true },
	{ name: 'Наша Ряба', cat: 'Продукти харчування', pct: 10, brand: 'MHP', origin: 'Київ', L: 'НР', cl: '#e65100', v: true, pop: true },
	{ name: 'Galychyna', cat: 'Продукти харчування', pct: 10, brand: 'Галичина', origin: 'Львів', L: 'Г', cl: '#2e7d32', v: true, pop: false },
	{ name: 'Чумак', cat: 'Продукти харчування', pct: 10, brand: 'Чумак', origin: 'Каховка', L: 'Ч', cl: '#d32f2f', v: true, pop: true },
	{ name: 'Andre Tan', cat: 'Одяг та взуття', pct: 10, brand: 'Andre Tan', origin: 'Київ', L: 'AT', cl: '#1c1917', v: true, pop: true },
	{ name: 'Arber', cat: 'Одяг та взуття', pct: 10, brand: 'Arber', origin: 'Харків', L: 'A', cl: '#263238', v: true, pop: true },
	{ name: 'BEVZA', cat: 'Одяг та взуття', pct: 10, brand: 'BEVZA', origin: 'Київ', L: 'B', cl: '#212121', v: true, pop: true },
	{ name: 'KACHOROVSKA', cat: 'Одяг та взуття', pct: 10, brand: 'Kachorovska', origin: 'Київ', L: 'K', cl: '#5d4037', v: true, pop: false },
	{ name: 'Yuki', cat: 'Косметика', pct: 10, brand: 'Yuki', origin: 'Київ', L: 'Y', cl: '#e91e63', v: true, pop: true },
	{ name: 'Фармак', cat: 'Косметика', pct: 10, brand: 'Фармак', origin: 'Київ', L: 'Ф', cl: '#00838f', v: true, pop: false },
	{ name: 'Ajax Systems', cat: 'Техніка', pct: 10, brand: 'Ajax', origin: 'Київ', L: 'Aj', cl: '#e11d48', v: true, pop: true },
	{ name: 'Kiddisvit', cat: 'Іграшки', pct: 10, brand: 'Kiddisvit', origin: 'Київ', L: 'Ki', cl: '#f57c00', v: true, pop: false },
	{ name: 'Blest', cat: 'Меблі', pct: 10, brand: 'Blest', origin: 'Хмельницький', L: 'Bl', cl: '#546e7a', v: true, pop: false },
	{ name: 'Freia', cat: 'Побутова хімія', pct: 10, brand: 'Freia', origin: 'Дніпро', L: 'Fr', cl: '#0277bd', v: true, pop: false },
	{ name: 'Sharm', cat: 'Спорт', pct: 10, brand: 'Sharm Design', origin: 'Київ', L: 'Sh', cl: '#00897b', v: true, pop: false }
];

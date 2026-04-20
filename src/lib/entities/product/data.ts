export interface Alternative {
	name: string;
	c2: string;
	ratio: number;
	r: number;
	rev: number;
	L: string;
	cl: string;
	pr: 'free' | 'freemium' | 'paid';
	d: string;
}

export interface Product {
	orig: string;
	flag: string;
	kw: string[];
	cat: string;
	alts: Alternative[];
}

export const ITEMS: Product[] = [
	{
		orig: 'Telegram',
		flag: '🇷🇺',
		kw: ['telegram', 'телеграм', 'телега', 'тг', 'дуров'],
		cat: 'Месенджери',
		alts: [
			{
				name: 'Signal',
				c2: '🇺🇸',
				ratio: 92,
				r: 4.7,
				rev: 284,
				L: 'S',
				cl: '#3A76F0',
				pr: 'free',
				d: 'Наскрізне шифрування, відкритий код'
			},
			{
				name: 'Viber',
				c2: '🇯🇵',
				ratio: 78,
				r: 4.1,
				rev: 512,
				L: 'V',
				cl: '#7360F2',
				pr: 'free',
				d: 'Безкоштовні дзвінки, підтримка України'
			},
			{
				name: 'WhatsApp',
				c2: '🇺🇸',
				ratio: 71,
				r: 3.9,
				rev: 389,
				L: 'W',
				cl: '#25D366',
				pr: 'free',
				d: '2 млрд користувачів у світі'
			}
		]
	},
	{
		orig: 'Yandex Browser',
		flag: '🇷🇺',
		kw: ['yandex', 'яндекс', 'браузер'],
		cat: 'Браузери',
		alts: [
			{
				name: 'Brave',
				c2: '🇺🇸',
				ratio: 95,
				r: 4.8,
				rev: 198,
				L: 'B',
				cl: '#FB542B',
				pr: 'free',
				d: 'Вбудований блокувальник реклами'
			},
			{
				name: 'Firefox',
				c2: '🇺🇸',
				ratio: 88,
				r: 4.5,
				rev: 341,
				L: 'F',
				cl: '#FF7139',
				pr: 'free',
				d: 'Відкритий код від Mozilla'
			}
		]
	},
	{
		orig: 'Касперський',
		flag: '🇷🇺',
		kw: ['kaspersky', 'касперський', 'каспер', 'антивірус'],
		cat: 'Безпека',
		alts: [
			{
				name: 'ESET NOD32',
				c2: '🇸🇰',
				ratio: 91,
				r: 4.6,
				rev: 156,
				L: 'E',
				cl: '#00B956',
				pr: 'paid',
				d: 'Словацький, підтримує Україну'
			},
			{
				name: 'Bitdefender',
				c2: '🇷🇴',
				ratio: 87,
				r: 4.4,
				rev: 203,
				L: 'Bd',
				cl: '#ED1C24',
				pr: 'freemium',
				d: 'Румунський, мінімальне навантаження'
			}
		]
	},
	{
		orig: 'VK (ВКонтакте)',
		flag: '🇷🇺',
		kw: ['vk', 'вк', 'вконтакте', 'соцмережа'],
		cat: 'Месенджери',
		alts: [
			{
				name: 'Instagram',
				c2: '🇺🇸',
				ratio: 82,
				r: 4.3,
				rev: 567,
				L: 'Ig',
				cl: '#E4405F',
				pr: 'free',
				d: 'Фото, відео, рілси'
			},
			{
				name: 'Facebook',
				c2: '🇺🇸',
				ratio: 65,
				r: 3.5,
				rev: 421,
				L: 'Fb',
				cl: '#1877F2',
				pr: 'free',
				d: 'Групи, маркетплейс, події'
			}
		]
	},
	{
		orig: '1С Бухгалтерія',
		flag: '🇷🇺',
		kw: ['1с', '1c', 'бухгалтерія', 'облік', 'erp'],
		cat: 'Офіс & Пошта',
		alts: [
			{
				name: 'BAS',
				c2: '🇺🇦',
				ratio: 89,
				r: 4.5,
				rev: 178,
				L: 'B',
				cl: '#0057B7',
				pr: 'paid',
				d: 'Українська ERP-система'
			},
			{
				name: 'Dilovod',
				c2: '🇺🇦',
				ratio: 84,
				r: 4.3,
				rev: 134,
				L: 'D',
				cl: '#FF6B00',
				pr: 'freemium',
				d: 'Хмарний облік для бізнесу'
			}
		]
	},
	{
		orig: 'Mail.ru',
		flag: '🇷🇺',
		kw: ['mail.ru', 'мейл', 'пошта', 'email'],
		cat: 'Офіс & Пошта',
		alts: [
			{
				name: 'Gmail',
				c2: '🇺🇸',
				ratio: 94,
				r: 4.7,
				rev: 612,
				L: 'G',
				cl: '#EA4335',
				pr: 'free',
				d: 'Пошта від Google'
			},
			{
				name: 'Ukr.net',
				c2: '🇺🇦',
				ratio: 76,
				r: 3.8,
				rev: 298,
				L: 'U',
				cl: '#0057B7',
				pr: 'free',
				d: 'Українська пошта'
			},
			{
				name: 'ProtonMail',
				c2: '🇨🇭',
				ratio: 90,
				r: 4.6,
				rev: 187,
				L: 'P',
				cl: '#6D4AFF',
				pr: 'freemium',
				d: 'Швейцарське шифрування'
			}
		]
	},
	{
		orig: 'Яндекс.Таксі',
		flag: '🇷🇺',
		kw: ['яндекс таксі', 'таксі', 'taxi'],
		cat: 'Таксі',
		alts: [
			{
				name: 'Uklon',
				c2: '🇺🇦',
				ratio: 93,
				r: 4.6,
				rev: 445,
				L: 'Uk',
				cl: '#00C853',
				pr: 'free',
				d: 'Українське таксі №1'
			},
			{
				name: 'Bolt',
				c2: '🇪🇪',
				ratio: 88,
				r: 4.4,
				rev: 378,
				L: 'Bo',
				cl: '#34D186',
				pr: 'free',
				d: 'Естонський, працює в Україні'
			}
		]
	},
	{
		orig: 'Кинопоиск',
		flag: '🇷🇺',
		kw: ['кинопоиск', 'кіно', 'фільми', 'стрімінг'],
		cat: 'Стрімінг',
		alts: [
			{
				name: 'Megogo',
				c2: '🇺🇦',
				ratio: 86,
				r: 4.2,
				rev: 289,
				L: 'Me',
				cl: '#6C3FB5',
				pr: 'freemium',
				d: 'Українська стримінг-платформа'
			},
			{
				name: 'Sweet.tv',
				c2: '🇺🇦',
				ratio: 81,
				r: 4.0,
				rev: 167,
				L: 'Sw',
				cl: '#FF2D55',
				pr: 'paid',
				d: 'IPTV + кінотеатр'
			}
		]
	}
];

export const POPS = ['Telegram', 'VK', 'Яндекс', 'Kaspersky', '1С', 'Mail.ru'];

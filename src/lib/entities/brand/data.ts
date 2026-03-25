export interface Brand {
	name: string;
	cat: string;
	L: string;
	cl: string;
	users: string;
	d: string;
	tag: string;
	ft: boolean;
}

export const UA_BRANDS: Brand[] = [
	{
		name: 'Monobank',
		cat: 'Банкінг',
		L: 'M',
		cl: '#1c1917',
		users: '8M+',
		d: 'Мобільний банк з найкращим UX. Cashback, донати на ЗСУ.',
		tag: 'Лідер',
		ft: true
	},
	{
		name: 'Grammarly',
		cat: 'AI',
		L: 'G',
		cl: '#15803d',
		users: '30M+',
		d: 'AI-помічник для письма, заснований у Києві.',
		tag: 'Глобальний',
		ft: true
	},
	{
		name: 'Ajax Systems',
		cat: 'IoT',
		L: 'A',
		cl: '#e11d48',
		users: '2M+',
		d: 'Безпека для дому та бізнесу — 169 країн.',
		tag: 'Безпека',
		ft: false
	},
	{
		name: 'Readdle',
		cat: 'Апки',
		L: 'R',
		cl: '#6d28d9',
		users: '15M+',
		d: 'Spark, PDF Expert — must-have для Apple.',
		tag: 'Топ',
		ft: false
	},
	{
		name: 'MacPaw',
		cat: 'Софт',
		L: 'M',
		cl: '#0ea5e9',
		users: '20M+',
		d: 'CleanMyMac, Setapp — екосистема для Mac.',
		tag: 'Глобальний',
		ft: true
	},
	{
		name: 'Uklon',
		cat: 'Таксі',
		L: 'U',
		cl: '#00C853',
		users: '10M+',
		d: 'Повністю українська служба таксі.',
		tag: 'Наше',
		ft: false
	},
	{
		name: 'Megogo',
		cat: 'Стрімінг',
		L: 'M',
		cl: '#6C3FB5',
		users: '5M+',
		d: 'Фільми, серіали, ТБ — все українською.',
		tag: 'Наше',
		ft: false
	},
	{
		name: 'Diia',
		cat: 'Держпослуги',
		L: 'Д',
		cl: '#0057B7',
		users: '20M+',
		d: 'Цифрова держава у смартфоні.',
		tag: 'Держава',
		ft: true
	}
];

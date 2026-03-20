import { useState, useEffect, useRef, useCallback } from 'react';

/* ═══ DESIGN TOKENS ═══ */
const F = "'Outfit',sans-serif";
const M = "'JetBrains Mono',monospace";
const BG = '#fafaf9';
const blue = '#0057B7';
const gold = '#FFD700';

/* ═══ DATA ═══ */
const CATS = [
	{ name: 'Месенджери', icon: '💬', n: 24, slug: 'messengers' },
	{ name: 'Браузери', icon: '🌐', n: 12, slug: 'browsers' },
	{ name: 'Безпека', icon: '🔒', n: 18, slug: 'vpn' },
	{ name: 'Офіс & Пошта', icon: '📄', n: 15, slug: 'office' },
	{ name: 'Стрімінг', icon: '🎬', n: 9, slug: 'streaming' },
	{ name: 'Їжа', icon: '🍕', n: 7, slug: 'food' },
	{ name: 'Таксі', icon: '🚕', n: 5, slug: 'taxi' },
	{ name: 'Банкінг', icon: '🏦', n: 11, slug: 'banking' }
];

const ITEMS = [
	{
		orig: 'Telegram',
		flag: '🇷🇺',
		kw: ['telegram', 'телеграм', 'телега', 'тг', 'дуров'],
		cat: 'messengers',
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
		cat: 'browsers',
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
		cat: 'vpn',
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
		cat: 'messengers',
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
		cat: 'office',
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
		cat: 'office',
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
		cat: 'taxi',
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
		cat: 'streaming',
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

const UA_BRANDS = [
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

const CB_CATS = [
	'Одяг та взуття',
	'Продукти харчування',
	'Техніка',
	'Косметика',
	'Меблі',
	'Побутова хімія',
	'Іграшки',
	'Спорт'
];
const CB = [
	{
		name: 'Roshen',
		cat: 'Продукти харчування',
		pct: 10,
		brand: 'Roshen',
		origin: 'Вінниця',
		L: 'R',
		cl: '#c2185b',
		v: true,
		pop: true
	},
	{
		name: 'Наша Ряба',
		cat: 'Продукти харчування',
		pct: 10,
		brand: 'MHP',
		origin: 'Київ',
		L: 'НР',
		cl: '#e65100',
		v: true,
		pop: true
	},
	{
		name: 'Galychyna',
		cat: 'Продукти харчування',
		pct: 10,
		brand: 'Галичина',
		origin: 'Львів',
		L: 'Г',
		cl: '#2e7d32',
		v: true,
		pop: false
	},
	{
		name: 'Чумак',
		cat: 'Продукти харчування',
		pct: 10,
		brand: 'Чумак',
		origin: 'Каховка',
		L: 'Ч',
		cl: '#d32f2f',
		v: true,
		pop: true
	},
	{
		name: 'Andre Tan',
		cat: 'Одяг та взуття',
		pct: 10,
		brand: 'Andre Tan',
		origin: 'Київ',
		L: 'AT',
		cl: '#1c1917',
		v: true,
		pop: true
	},
	{
		name: 'Arber',
		cat: 'Одяг та взуття',
		pct: 10,
		brand: 'Arber',
		origin: 'Харків',
		L: 'A',
		cl: '#263238',
		v: true,
		pop: true
	},
	{
		name: 'BEVZA',
		cat: 'Одяг та взуття',
		pct: 10,
		brand: 'BEVZA',
		origin: 'Київ',
		L: 'B',
		cl: '#212121',
		v: true,
		pop: true
	},
	{
		name: 'KACHOROVSKA',
		cat: 'Одяг та взуття',
		pct: 10,
		brand: 'Kachorovska',
		origin: 'Київ',
		L: 'K',
		cl: '#5d4037',
		v: true,
		pop: false
	},
	{
		name: 'Yuki',
		cat: 'Косметика',
		pct: 10,
		brand: 'Yuki',
		origin: 'Київ',
		L: 'Y',
		cl: '#e91e63',
		v: true,
		pop: true
	},
	{
		name: 'Фармак',
		cat: 'Косметика',
		pct: 10,
		brand: 'Фармак',
		origin: 'Київ',
		L: 'Ф',
		cl: '#00838f',
		v: true,
		pop: false
	},
	{
		name: 'Ajax Systems',
		cat: 'Техніка',
		pct: 10,
		brand: 'Ajax',
		origin: 'Київ',
		L: 'Aj',
		cl: '#e11d48',
		v: true,
		pop: true
	},
	{
		name: 'Kiddisvit',
		cat: 'Іграшки',
		pct: 10,
		brand: 'Kiddisvit',
		origin: 'Київ',
		L: 'Ki',
		cl: '#f57c00',
		v: true,
		pop: false
	},
	{
		name: 'Blest',
		cat: 'Меблі',
		pct: 10,
		brand: 'Blest',
		origin: 'Хмельницький',
		L: 'Bl',
		cl: '#546e7a',
		v: true,
		pop: false
	},
	{
		name: 'Freia',
		cat: 'Побутова хімія',
		pct: 10,
		brand: 'Freia',
		origin: 'Дніпро',
		L: 'Fr',
		cl: '#0277bd',
		v: true,
		pop: false
	},
	{
		name: 'Sharm',
		cat: 'Спорт',
		pct: 10,
		brand: 'Sharm Design',
		origin: 'Київ',
		L: 'Sh',
		cl: '#00897b',
		v: true,
		pop: false
	}
];
const POPS = ['Telegram', 'VK', 'Яндекс', 'Kaspersky', '1С', 'Mail.ru'];

/* ═══ ANIMATIONS CSS ═══ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
*{box-sizing:border-box;margin:0}
::selection{background:#fef08a;color:#1c1917}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#d6d3d1;border-radius:3px}
input::placeholder{color:#a8a29e}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
@keyframes pop{from{opacity:0;transform:scale(.95) translateY(14px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes slideR{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideL{from{opacity:0;transform:translateX(12px)}to{opacity:1;transform:translateX(0)}}
@keyframes grad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes ripple{0%{transform:scale(1);opacity:.4}100%{transform:scale(2.5);opacity:0}}
@keyframes countUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes checkmark{0%{stroke-dashoffset:40}100%{stroke-dashoffset:0}}
@keyframes expandH{from{max-height:0;opacity:0}to{max-height:600px;opacity:1}}
@keyframes orbit{0%{transform:rotate(0deg) translateX(140px) rotate(0deg)}100%{transform:rotate(360deg) translateX(140px) rotate(-360deg)}}
@keyframes orbit2{0%{transform:rotate(120deg) translateX(110px) rotate(-120deg)}100%{transform:rotate(480deg) translateX(110px) rotate(-480deg)}}
@keyframes orbit3{0%{transform:rotate(240deg) translateX(170px) rotate(-240deg)}100%{transform:rotate(600deg) translateX(170px) rotate(-600deg)}}
@keyframes typeIn{from{width:0}to{width:100%}}
@keyframes blink{0%,100%{border-color:transparent}50%{border-color:#0057B7}}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes waveFloat{0%,100%{transform:translateY(0) rotate(0deg)}25%{transform:translateY(-8px) rotate(1deg)}75%{transform:translateY(4px) rotate(-1deg)}}
@keyframes glowPulse{0%,100%{box-shadow:0 0 20px rgba(0,87,183,0.08)}50%{box-shadow:0 0 40px rgba(0,87,183,0.16)}}
@keyframes slideUp2{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
`;

/* ═══ MICRO COMPONENTS ═══ */
const Ratio = ({ v, big }) => {
	const c = v >= 70 ? '#16a34a' : v >= 40 ? '#ca8a04' : '#dc2626';
	return (
		<span style={{ color: c, fontWeight: 700, fontSize: big ? 20 : 13, fontFamily: M }}>{v}%</span>
	);
};

const Stars = ({ r }) => (
	<span style={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
		{[1, 2, 3, 4, 5].map((i) => (
			<span
				key={i}
				style={{
					color: i <= Math.round(r) ? '#FBBF24' : '#e7e5e4',
					fontSize: 11,
					transition: 'color .2s'
				}}
			>
				★
			</span>
		))}
		<span style={{ fontSize: 11, fontWeight: 600, color: '#78716c', fontFamily: M, marginLeft: 3 }}>
			{r}
		</span>
	</span>
);

const Tag = ({ t }) => {
	const m = {
		free: ['Безкоштовно', '#dcfce7', '#166534'],
		freemium: ['Freemium', '#dbeafe', '#1e40af'],
		paid: ['Платно', '#fef3c7', '#92400e']
	};
	const [l, b, c] = m[t] || m.free;
	return (
		<span
			style={{
				fontSize: 9,
				padding: '2px 7px',
				borderRadius: 4,
				background: b,
				color: c,
				fontWeight: 700,
				textTransform: 'uppercase',
				letterSpacing: '.04em'
			}}
		>
			{l}
		</span>
	);
};

const Pill = ({ children, active, color, onClick, style: s }) => (
	<button
		onClick={onClick}
		style={{
			padding: '8px 16px',
			borderRadius: 12,
			border: active ? `2px solid ${color || blue}` : '1.5px solid #e7e5e4',
			background: active ? (color || blue) + '08' : '#fff',
			color: active ? '#1c1917' : '#78716c',
			fontSize: 13,
			fontWeight: active ? 700 : 500,
			cursor: 'pointer',
			fontFamily: F,
			transition: 'all .2s',
			...s
		}}
	>
		{children}
	</button>
);

/* ═══ SEARCH BAR ═══ */
function SearchBar({ q, setQ, onGo, big }) {
	const [open, setOpen] = useState(false);
	const [sugs, setSugs] = useState([]);
	const ref = useRef();
	const bt = useRef();

	useEffect(() => {
		if (!q) {
			setSugs([]);
			return;
		}
		const lc = q.toLowerCase();
		const m = [];
		ITEMS.forEach((it) => {
			if (it.orig.toLowerCase().includes(lc) || it.kw.some((k) => k.includes(lc)))
				m.push({ t: 'o', name: it.orig, fl: it.flag, n: it.alts.length });
			it.alts.forEach((a) => {
				if (a.name.toLowerCase().includes(lc))
					m.push({
						t: 'a',
						name: a.name,
						fl: a.c2,
						parent: it.orig,
						cl: a.cl,
						L: a.L,
						ratio: a.ratio
					});
			});
		});
		setSugs(m.slice(0, 5));
	}, [q]);

	const fire = (v) => {
		onGo(v || q);
		setOpen(false);
	};
	const dd = open && (q === '' || sugs.length > 0 || q.length > 0);

	return (
		<div style={{ position: 'relative', width: '100%' }}>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: big ? 14 : 8,
					padding: big ? '8px 8px 8px 28px' : '4px 4px 4px 16px',
					borderRadius: 99,
					background: '#fff',
					border: open ? '2px solid #1c1917' : '2px solid #e7e5e4',
					boxShadow: open
						? '0 0 0 4px #1c191706, 0 16px 48px #00000010'
						: big
							? '0 4px 32px #00000006'
							: 'none',
					transition: 'all .3s cubic-bezier(.4,0,.2,1)'
				}}
			>
				<svg
					width={big ? 20 : 16}
					height={big ? 20 : 16}
					viewBox="0 0 24 24"
					fill="none"
					stroke={open ? '#1c1917' : '#a8a29e'}
					strokeWidth={2.5}
					style={{ transition: 'stroke .2s' }}
				>
					<circle cx={11} cy={11} r={7} />
					<line x1={16.5} y1={16.5} x2={21} y2={21} />
				</svg>
				<input
					ref={ref}
					value={q}
					onChange={(e) => setQ(e.target.value)}
					onFocus={() => {
						clearTimeout(bt.current);
						setOpen(true);
					}}
					onBlur={() => {
						bt.current = setTimeout(() => setOpen(false), 160);
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter') fire();
						if (e.key === 'Escape') ref.current?.blur();
					}}
					placeholder="Назва продукту…"
					style={{
						flex: 1,
						border: 'none',
						outline: 'none',
						fontSize: big ? 17 : 14,
						fontWeight: 500,
						fontFamily: F,
						color: '#1c1917',
						background: 'transparent',
						minWidth: 0
					}}
				/>
				{q && (
					<button
						onClick={() => {
							setQ('');
							ref.current?.focus();
						}}
						style={{
							width: 24,
							height: 24,
							borderRadius: 99,
							border: 'none',
							background: '#f5f5f4',
							cursor: 'pointer',
							fontSize: 11,
							color: '#78716c',
							display: 'grid',
							placeItems: 'center',
							flexShrink: 0,
							transition: 'all .15s'
						}}
						onMouseOver={(e) => (e.target.style.background = '#e7e5e4')}
						onMouseOut={(e) => (e.target.style.background = '#f5f5f4')}
					>
						✕
					</button>
				)}
				<button
					onClick={() => fire()}
					style={{
						padding: big ? '12px 28px' : '8px 18px',
						borderRadius: 99,
						border: 'none',
						background: '#1c1917',
						color: '#fff',
						fontSize: big ? 15 : 12,
						fontWeight: 700,
						cursor: 'pointer',
						fontFamily: F,
						whiteSpace: 'nowrap',
						flexShrink: 0,
						transition: 'all .15s'
					}}
					onMouseOver={(e) => (e.target.style.background = '#292524')}
					onMouseOut={(e) => (e.target.style.background = '#1c1917')}
				>
					Знайти
				</button>
			</div>

			{dd && (
				<div
					style={{
						position: 'absolute',
						top: 'calc(100% + 8px)',
						left: 0,
						right: 0,
						background: '#fff',
						borderRadius: 20,
						padding: 8,
						boxShadow: '0 20px 60px #00000014, 0 0 0 1px #0000000a',
						zIndex: 30,
						animation: 'pop .2s cubic-bezier(.4,0,.2,1)'
					}}
				>
					{q === '' ? (
						<div style={{ padding: '8px 12px' }}>
							<p
								style={{
									fontSize: 10,
									fontWeight: 700,
									color: '#a8a29e',
									textTransform: 'uppercase',
									letterSpacing: '.1em',
									marginBottom: 8,
									fontFamily: M
								}}
							>
								Популярні
							</p>
							<div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
								{POPS.map((s) => (
									<button
										key={s}
										onMouseDown={(e) => e.preventDefault()}
										onClick={() => {
											setQ(s);
											fire(s);
										}}
										style={{
											padding: '6px 14px',
											borderRadius: 99,
											border: '1.5px solid #e7e5e4',
											background: '#fafaf9',
											color: '#44403c',
											fontSize: 12,
											fontWeight: 600,
											cursor: 'pointer',
											fontFamily: F,
											transition: 'all .15s'
										}}
										onMouseOver={(e) => {
											e.target.style.background = '#1c1917';
											e.target.style.color = '#fff';
											e.target.style.borderColor = '#1c1917';
										}}
										onMouseOut={(e) => {
											e.target.style.background = '#fafaf9';
											e.target.style.color = '#44403c';
											e.target.style.borderColor = '#e7e5e4';
										}}
									>
										{s}
									</button>
								))}
							</div>
						</div>
					) : sugs.length > 0 ? (
						sugs.map((s, i) => (
							<button
								key={i}
								onMouseDown={(e) => e.preventDefault()}
								onClick={() => {
									const v = s.t === 'o' ? s.name : s.parent;
									setQ(v);
									fire(v);
								}}
								style={{
									width: '100%',
									display: 'flex',
									alignItems: 'center',
									gap: 10,
									padding: '10px 12px',
									borderRadius: 12,
									border: 'none',
									background: 'transparent',
									cursor: 'pointer',
									textAlign: 'left',
									fontFamily: F,
									transition: 'all .1s',
									animation: `up .2s ease ${i * 0.04}s both`
								}}
								onMouseOver={(e) => (e.currentTarget.style.background = '#f5f5f4')}
								onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
							>
								<div
									style={{
										width: 34,
										height: 34,
										borderRadius: 9,
										flexShrink: 0,
										background: s.t === 'o' ? '#fef2f2' : s.cl + '0c',
										display: 'grid',
										placeItems: 'center',
										fontSize: s.t === 'o' ? 10 : 13,
										fontWeight: 800,
										color: s.t === 'o' ? '#dc2626' : s.cl,
										border: s.t === 'o' ? '1px solid #fecaca' : `1px solid ${s.cl}18`
									}}
								>
									{s.t === 'o' ? '✕' : s.L}
								</div>
								<div style={{ flex: 1 }}>
									<div style={{ fontWeight: 700, fontSize: 13 }}>
										{s.name} {s.fl}
									</div>
									<div style={{ fontSize: 10, color: '#a8a29e' }}>
										{s.t === 'o' ? `${s.n} альтернатив` : `→ ${s.parent}`}
									</div>
								</div>
								{s.t === 'o' ? (
									<span
										style={{
											fontSize: 8,
											padding: '2px 6px',
											borderRadius: 99,
											background: '#fef2f2',
											color: '#dc2626',
											fontWeight: 700,
											border: '1px solid #fecaca',
											textTransform: 'uppercase'
										}}
									>
										ворожий
									</span>
								) : (
									<Ratio v={s.ratio} />
								)}
							</button>
						))
					) : (
						<div
							style={{ padding: '20px 12px', textAlign: 'center', color: '#a8a29e', fontSize: 12 }}
						>
							Нічого не знайдено
						</div>
					)}
				</div>
			)}
		</div>
	);
}

/* ═══ ALT ROW ═══ */
function AltRow({ a, i, onClick }) {
	const [h, setH] = useState(false);
	return (
		<div
			onMouseEnter={() => setH(true)}
			onMouseLeave={() => setH(false)}
			onClick={() => onClick?.(a)}
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: 14,
				padding: '14px 16px',
				borderRadius: 14,
				cursor: 'pointer',
				background: h ? '#fafaf9' : 'transparent',
				borderLeft: `3px solid ${h ? a.cl : 'transparent'}`,
				transform: h ? 'translateX(4px)' : 'none',
				transition: 'all .25s cubic-bezier(.4,0,.2,1)',
				animation: `slideR .3s ease ${(i || 0) * 0.06}s both`
			}}
		>
			<div
				style={{
					width: 44,
					height: 44,
					borderRadius: 12,
					background: a.cl + '0a',
					display: 'grid',
					placeItems: 'center',
					fontSize: 16,
					fontWeight: 800,
					color: a.cl,
					fontFamily: F,
					border: `1.5px solid ${a.cl}14`,
					flexShrink: 0,
					transition: 'transform .2s',
					transform: h ? 'scale(1.08)' : 'none'
				}}
			>
				{a.L}
			</div>
			<div style={{ flex: 1, minWidth: 0 }}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 6,
						flexWrap: 'wrap',
						marginBottom: 2
					}}
				>
					<span style={{ fontWeight: 700, fontSize: 14 }}>{a.name}</span>
					<span style={{ fontSize: 13 }}>{a.c2}</span>
					<Tag t={a.pr} />
				</div>
				<div style={{ fontSize: 12, color: '#78716c' }}>{a.d}</div>
			</div>
			<div style={{ textAlign: 'right', flexShrink: 0 }}>
				<Ratio v={a.ratio} />
				<div
					style={{
						fontSize: 9,
						color: '#a8a29e',
						marginTop: 2,
						opacity: h ? 1 : 0,
						transition: 'opacity .2s'
					}}
				>
					рекомендують
				</div>
			</div>
		</div>
	);
}

/* ═══ ITEM BLOCK ═══ */
function ItemBlock({ item, i, openDef, onAlt }) {
	const [open, setOpen] = useState(openDef);
	return (
		<div
			style={{
				background: '#fff',
				borderRadius: 20,
				overflow: 'hidden',
				border: '1px solid #e7e5e4',
				boxShadow: open ? '0 8px 32px #00000006' : '0 1px 3px #00000004',
				transition: 'box-shadow .3s',
				animation: `up .4s cubic-bezier(.4,0,.2,1) ${(i || 0) * 0.08}s both`
			}}
		>
			<div
				onClick={() => setOpen(!open)}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '20px 24px',
					cursor: 'pointer',
					background: open ? 'linear-gradient(135deg,#fef2f208,#fff7ed06)' : 'transparent',
					transition: 'background .3s'
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
					<div
						style={{
							width: 40,
							height: 40,
							borderRadius: 11,
							background: '#fef2f2',
							display: 'grid',
							placeItems: 'center',
							border: '1.5px solid #fecaca',
							flexShrink: 0,
							transition: 'transform .2s',
							transform: open ? 'rotate(-3deg) scale(1.05)' : 'none'
						}}
					>
						<span style={{ fontSize: 12, fontWeight: 800, color: '#dc2626' }}>✕</span>
					</div>
					<div>
						<div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
							<span style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-.02em' }}>
								{item.orig}
							</span>
							<span style={{ fontSize: 14 }}>{item.flag}</span>
							<span
								style={{
									fontSize: 8,
									padding: '2px 7px',
									borderRadius: 99,
									background: '#fef2f2',
									color: '#dc2626',
									fontWeight: 700,
									border: '1px solid #fecaca',
									textTransform: 'uppercase',
									letterSpacing: '.04em'
								}}
							>
								ворожий
							</span>
						</div>
						<span style={{ fontSize: 12, color: '#a8a29e' }}>{item.alts.length} альтернатив</span>
					</div>
				</div>
				<div
					style={{
						width: 28,
						height: 28,
						borderRadius: 8,
						background: '#f5f5f4',
						display: 'grid',
						placeItems: 'center',
						transition: 'all .3s',
						transform: open ? 'rotate(180deg)' : 'none'
					}}
				>
					<svg width={14} height={14} viewBox="0 0 20 20" style={{ color: '#78716c' }}>
						<path
							d="M5 7.5L10 12.5L15 7.5"
							stroke="currentColor"
							strokeWidth={2}
							fill="none"
							strokeLinecap="round"
						/>
					</svg>
				</div>
			</div>
			<div
				style={{
					maxHeight: open ? 600 : 0,
					overflow: 'hidden',
					transition: 'max-height .4s cubic-bezier(.4,0,.2,1), opacity .3s',
					opacity: open ? 1 : 0
				}}
			>
				<div style={{ padding: '0 10px 14px' }}>
					{item.alts.map((a, j) => (
						<AltRow key={a.name} a={a} i={j} onClick={onAlt} />
					))}
				</div>
			</div>
		</div>
	);
}

/* ═══ DETAIL MODAL ═══ */
function Modal({ a, onClose }) {
	if (!a) return null;
	return (
		<div
			style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'grid', placeItems: 'center' }}
			onClick={onClose}
		>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: '#00000040',
					backdropFilter: 'blur(14px)',
					animation: 'fadeIn .15s ease'
				}}
			/>
			<div
				onClick={(e) => e.stopPropagation()}
				style={{
					position: 'relative',
					width: 'min(480px,92vw)',
					maxHeight: '85vh',
					overflow: 'auto',
					background: '#fff',
					borderRadius: 24,
					boxShadow: '0 32px 80px #00000020, 0 0 0 1px #0000000a',
					animation: 'pop .3s cubic-bezier(.34,1.56,.64,1)'
				}}
			>
				{/* Color bar */}
				<div
					style={{
						height: 4,
						background: `linear-gradient(90deg,${a.cl},${a.cl}80)`,
						borderRadius: '24px 24px 0 0'
					}}
				/>
				<div style={{ padding: '24px 28px 28px' }}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'flex-start',
							marginBottom: 22
						}}
					>
						<div style={{ display: 'flex', gap: 14 }}>
							<div
								style={{
									width: 60,
									height: 60,
									borderRadius: 18,
									background: a.cl + '0c',
									display: 'grid',
									placeItems: 'center',
									fontSize: 26,
									fontWeight: 800,
									color: a.cl,
									fontFamily: F,
									border: `2px solid ${a.cl}18`,
									animation: 'scaleIn .4s ease .1s both'
								}}
							>
								{a.L}
							</div>
							<div style={{ animation: 'slideR .3s ease .15s both' }}>
								<div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
									<h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: '-.02em' }}>
										{a.name}
									</h2>
									<span style={{ fontSize: 17 }}>{a.c2}</span>
								</div>
								<div style={{ fontSize: 13, color: '#78716c', marginBottom: 6 }}>{a.d}</div>
								<div style={{ display: 'flex', gap: 8 }}>
									<Stars r={a.r} />
									<Tag t={a.pr} />
								</div>
							</div>
						</div>
						<button
							onClick={onClose}
							style={{
								width: 34,
								height: 34,
								borderRadius: 99,
								border: 'none',
								background: '#f5f5f4',
								cursor: 'pointer',
								fontSize: 14,
								color: '#78716c',
								display: 'grid',
								placeItems: 'center',
								transition: 'all .15s'
							}}
							onMouseOver={(e) => (e.target.style.background = '#e7e5e4')}
							onMouseOut={(e) => (e.target.style.background = '#f5f5f4')}
						>
							✕
						</button>
					</div>
					<div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
						{[
							{ v: <Ratio v={a.ratio} big />, l: 'рекомендують' },
							{
								v: <span style={{ fontSize: 20, fontWeight: 800, fontFamily: M }}>{a.rev}</span>,
								l: 'відгуків'
							}
						].map((s, i) => (
							<div
								key={i}
								style={{
									flex: 1,
									background: '#f5f5f4',
									borderRadius: 16,
									padding: '18px 12px',
									textAlign: 'center',
									animation: `up .3s ease ${0.2 + i * 0.08}s both`
								}}
							>
								{s.v}
								<div style={{ fontSize: 11, color: '#78716c', marginTop: 5 }}>{s.l}</div>
							</div>
						))}
					</div>
					<h3 style={{ fontSize: 14, fontWeight: 800, marginBottom: 12 }}>Відгуки</h3>
					{[
						{
							u: 'Олена К.',
							s: 5,
							t: 'Чудовий після переходу. Інтерфейс зрозумілий, все працює.',
							p: ['Шифрування'],
							c: ['Менше стікерів'],
							h: 42
						},
						{
							u: 'Андрій М.',
							s: 4,
							t: 'Добра альтернатива для базового спілкування.',
							p: ['Open source'],
							c: ['Немає каналів'],
							h: 28
						}
					].map((rv, i) => (
						<div
							key={i}
							style={{
								padding: 16,
								background: '#fafaf9',
								borderRadius: 14,
								marginBottom: 8,
								border: '1px solid #f5f5f4',
								animation: `up .3s ease ${0.3 + i * 0.08}s both`
							}}
						>
							<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
								<div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
									<div
										style={{
											width: 26,
											height: 26,
											borderRadius: 99,
											background: '#e7e5e4',
											display: 'grid',
											placeItems: 'center',
											fontSize: 10,
											fontWeight: 700,
											color: '#78716c'
										}}
									>
										{rv.u[0]}
									</div>
									<span style={{ fontWeight: 700, fontSize: 12 }}>{rv.u}</span>
									<Stars r={rv.s} />
								</div>
							</div>
							<p style={{ fontSize: 12, color: '#44403c', lineHeight: 1.55, margin: '0 0 8px' }}>
								{rv.t}
							</p>
							<div style={{ display: 'flex', gap: 4 }}>
								{rv.p.map((p) => (
									<span
										key={p}
										style={{
											fontSize: 9,
											padding: '2px 7px',
											borderRadius: 5,
											background: '#dcfce7',
											color: '#166534',
											fontWeight: 600
										}}
									>
										✓ {p}
									</span>
								))}
								{rv.c.map((c) => (
									<span
										key={c}
										style={{
											fontSize: 9,
											padding: '2px 7px',
											borderRadius: 5,
											background: '#fef2f2',
											color: '#991b1b',
											fontWeight: 600
										}}
									>
										✕ {c}
									</span>
								))}
							</div>
						</div>
					))}
					<button
						style={{
							width: '100%',
							padding: 14,
							borderRadius: 14,
							border: 'none',
							background: '#1c1917',
							color: '#fff',
							fontSize: 14,
							fontWeight: 700,
							cursor: 'pointer',
							fontFamily: F,
							marginTop: 8,
							transition: 'all .15s'
						}}
						onMouseOver={(e) => (e.target.style.background = '#292524')}
						onMouseOut={(e) => (e.target.style.background = '#1c1917')}
					>
						Відкрити сайт →
					</button>
				</div>
			</div>
		</div>
	);
}

/* ═══════════════════════════════════════════ */
/*                   PAGES                     */
/* ═══════════════════════════════════════════ */

/* ── HOME ── */
function Home({ q, setQ, onSearch, onAlt, goTo }) {
	const [heroHov, setHeroHov] = useState(null);
	const [activeStep, setActiveStep] = useState(0);
	const [tick, setTick] = useState(0);

	// Rotate "how it works" steps
	useEffect(() => {
		const t = setInterval(() => setActiveStep((p) => (p + 1) % 3), 4000);
		return () => clearInterval(t);
	}, []);
	// Live counter tick
	useEffect(() => {
		const t = setInterval(() => setTick((p) => p + 1), 3000);
		return () => clearInterval(t);
	}, []);

	const socialProof = [
		{ user: 'Дмитро', action: 'перейшов з Telegram на Signal', time: '2 хв тому', emoji: '🔄' },
		{ user: 'Марія', action: 'знайшла заміну Касперському', time: '5 хв тому', emoji: '🔍' },
		{ user: 'Олексій', action: 'залишив відгук на Brave', time: '8 хв тому', emoji: '✍️' },
		{ user: 'Ірина', action: 'перейшла з VK на Instagram', time: '12 хв тому', emoji: '🔄' },
		{ user: 'Андрій', action: 'додав Uklon в обрані', time: '15 хв тому', emoji: '❤️' },
		{ user: 'Катерина', action: 'перейшла з 1С на BAS', time: '18 хв тому', emoji: '🔄' }
	];

	const steps = [
		{
			n: '01',
			icon: '🔍',
			title: 'Знайди',
			desc: 'Введи назву ворожого продукту. AI розпізнає сленг, скорочення та навіть помилки',
			color: '#0057B7',
			preview: 'Telegram → Signal, Viber, WhatsApp'
		},
		{
			n: '02',
			icon: '⚡',
			title: 'Порівняй',
			desc: 'Рейтинги від спільноти, відгуки реальних користувачів, ціни та можливості',
			color: '#f59e0b',
			preview: 'Signal — 92% рекомендують ★4.7'
		},
		{
			n: '03',
			icon: '✓',
			title: 'Переходь',
			desc: 'Обери найкраще та допоможи іншим — залиш відгук про свій досвід переходу',
			color: '#16a34a',
			preview: 'Telegram ✕ → Signal ✓ Готово!'
		}
	];

	const topBrands = UA_BRANDS.filter((b) => b.ft).slice(0, 4);

	return (
		<>
			{/* ═══ HERO ═══ */}
			<section
				style={{
					position: 'relative',
					minHeight: '72vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '80px 24px 48px',
					overflow: 'hidden'
				}}
			>
				{/* Dot grid */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						opacity: 0.015,
						backgroundImage: 'radial-gradient(#1c1917 1px,transparent 1px)',
						backgroundSize: '28px 28px'
					}}
				/>

				{/* Floating orbs — larger, more vivid */}
				<div
					style={{
						position: 'absolute',
						top: '5%',
						left: '3%',
						width: 400,
						height: 400,
						borderRadius: '50%',
						background: `radial-gradient(circle,${blue}18,transparent 70%)`,
						filter: 'blur(40px)',
						animation: 'waveFloat 12s ease-in-out infinite'
					}}
				/>
				<div
					style={{
						position: 'absolute',
						bottom: '0%',
						right: '5%',
						width: 350,
						height: 350,
						borderRadius: '50%',
						background: `radial-gradient(circle,${gold}20,transparent 70%)`,
						filter: 'blur(40px)',
						animation: 'waveFloat 12s ease-in-out infinite 6s'
					}}
				/>
				<div
					style={{
						position: 'absolute',
						top: '40%',
						right: '25%',
						width: 200,
						height: 200,
						borderRadius: '50%',
						background: `radial-gradient(circle,#a78bfa15,transparent 70%)`,
						filter: 'blur(30px)',
						animation: 'waveFloat 10s ease-in-out infinite 3s'
					}}
				/>

				{/* Orbiting icons */}
				<div style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0 }}>
					{['💬', '🌐', '🔒', '🚕', '🎬', '🏦'].map((ic, i) => (
						<div
							key={i}
							style={{
								position: 'absolute',
								width: 36,
								height: 36,
								borderRadius: 10,
								background: '#fff',
								display: 'grid',
								placeItems: 'center',
								fontSize: 16,
								boxShadow: '0 4px 16px #00000008',
								border: '1px solid #e7e5e430',
								animation: `orbit${i % 3 === 0 ? '' : i % 3 === 1 ? '2' : '3'} ${25 + i * 5}s linear infinite`,
								opacity: 0.35
							}}
						>
							{ic}
						</div>
					))}
				</div>

				<div style={{ maxWidth: 640, textAlign: 'center', position: 'relative', zIndex: 2 }}>
					{/* Badge */}
					<div
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: 7,
							padding: '5px 16px 5px 6px',
							borderRadius: 99,
							background: '#fff',
							border: '1.5px solid #e7e5e4',
							marginBottom: 28,
							boxShadow: '0 2px 12px #00000006',
							animation: 'scaleIn .5s cubic-bezier(.34,1.56,.64,1) .1s both'
						}}
					>
						<span
							style={{
								width: 22,
								height: 22,
								borderRadius: 99,
								background: `linear-gradient(135deg,${blue},${gold})`,
								display: 'grid',
								placeItems: 'center',
								fontSize: 9,
								fontWeight: 800,
								color: '#fff'
							}}
						>
							✦
						</span>
						<span style={{ fontSize: 12, fontWeight: 600, color: '#57534e' }}>
							847 альтернатив · Оновлено сьогодні
						</span>
					</div>

					{/* Title */}
					<h1
						style={{
							fontSize: 'clamp(44px,8vw,76px)',
							fontWeight: 900,
							color: '#1c1917',
							lineHeight: 0.98,
							letterSpacing: '-.06em',
							marginBottom: 20,
							animation: 'slideUp2 .7s cubic-bezier(.4,0,.2,1) .15s both'
						}}
					>
						Заміни{' '}
						<span
							style={{
								position: 'relative',
								display: 'inline-block',
								background: `linear-gradient(135deg,${blue} 15%,#2563eb 45%,#7c3aed 70%,${blue} 100%)`,
								backgroundSize: '300% 300%',
								animation: 'grad 6s ease infinite',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent'
							}}
						>
							ворожe
							<svg
								style={{
									position: 'absolute',
									bottom: -4,
									left: 0,
									width: '100%',
									height: 8,
									overflow: 'visible'
								}}
								viewBox="0 0 200 8"
								preserveAspectRatio="none"
							>
								<path
									d="M0 5 Q50 0 100 5 Q150 10 200 5"
									stroke="#dc2626"
									strokeWidth="2.5"
									fill="none"
									strokeLinecap="round"
									opacity=".25"
									style={{ animation: 'fadeIn .8s ease .8s both' }}
								/>
							</svg>
						</span>
						<br />
						на наше
					</h1>

					{/* Subtitle */}
					<p
						style={{
							fontSize: 19,
							color: '#78716c',
							lineHeight: 1.55,
							marginBottom: 0,
							maxWidth: 460,
							margin: '0 auto 40px',
							fontWeight: 400,
							animation: 'slideUp2 .7s ease .3s both'
						}}
					>
						Знаходь українські альтернативи ворожим продуктам.{' '}
						<span style={{ color: '#1c1917', fontWeight: 600 }}>Безкоштовно.</span>
					</p>

					{/* Search */}
					<div style={{ maxWidth: 560, margin: '0 auto', animation: 'slideUp2 .7s ease .4s both' }}>
						<SearchBar q={q} setQ={setQ} onGo={onSearch} big />
					</div>

					{/* Quick categories under search */}
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							flexWrap: 'wrap',
							gap: 6,
							marginTop: 18,
							animation: 'slideUp2 .6s ease .55s both'
						}}
					>
						{CATS.slice(0, 6).map((c, i) => (
							<button
								key={c.slug}
								onClick={() => {
									setQ(c.name);
									onSearch(c.name);
								}}
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									gap: 4,
									padding: '5px 12px',
									borderRadius: 99,
									border: '1px solid #e7e5e4',
									background: '#fff',
									fontSize: 11,
									fontWeight: 600,
									color: '#78716c',
									cursor: 'pointer',
									fontFamily: F,
									transition: 'all .2s',
									animation: `scaleIn .3s ease ${0.6 + i * 0.05}s both`
								}}
								onMouseOver={(e) => {
									e.currentTarget.style.background = '#1c1917';
									e.currentTarget.style.color = '#fff';
									e.currentTarget.style.borderColor = '#1c1917';
								}}
								onMouseOut={(e) => {
									e.currentTarget.style.background = '#fff';
									e.currentTarget.style.color = '#78716c';
									e.currentTarget.style.borderColor = '#e7e5e4';
								}}
							>
								<span style={{ fontSize: 13 }}>{c.icon}</span>
								{c.name}
							</button>
						))}
					</div>

					{/* Stats */}
				</div>
			</section>

			{/* ═══ LIVE ACTIVITY TICKER ═══ */}
			<section
				style={{
					overflow: 'hidden',
					borderTop: '1px solid #e7e5e4',
					borderBottom: '1px solid #e7e5e4',
					background: '#fff',
					padding: '12px 0'
				}}
			>
				<div
					style={{
						display: 'flex',
						animation: 'marquee 30s linear infinite',
						width: 'max-content'
					}}
				>
					{[...socialProof, ...socialProof].map((s, i) => (
						<div
							key={i}
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								gap: 8,
								padding: '0 32px',
								whiteSpace: 'nowrap',
								flexShrink: 0
							}}
						>
							<span style={{ fontSize: 14 }}>{s.emoji}</span>
							<span style={{ fontSize: 12, color: '#57534e' }}>
								<strong>{s.user}</strong> {s.action}
							</span>
							<span style={{ fontSize: 10, color: '#a8a29e' }}>· {s.time}</span>
						</div>
					))}
				</div>
			</section>

			{/* ═══ HOW IT WORKS — interactive ═══ */}
			<section style={{ maxWidth: 900, margin: '0 auto', padding: '72px 24px 64px' }}>
				<div style={{ textAlign: 'center', marginBottom: 44 }}>
					<span
						style={{
							fontSize: 10,
							fontWeight: 700,
							color: blue,
							textTransform: 'uppercase',
							letterSpacing: '.1em',
							fontFamily: M,
							animation: 'up .4s ease both'
						}}
					>
						Як це працює
					</span>
					<h2
						style={{
							fontSize: 32,
							fontWeight: 900,
							letterSpacing: '-.04em',
							marginTop: 8,
							animation: 'up .4s ease .05s both'
						}}
					>
						Три кроки до переходу
					</h2>
				</div>

				<div style={{ display: 'flex', gap: 20, alignItems: 'stretch' }}>
					{/* Steps nav */}
					<div style={{ width: 320, flexShrink: 0 }}>
						{steps.map((s, i) => {
							const act = activeStep === i;
							return (
								<div
									key={i}
									onClick={() => setActiveStep(i)}
									style={{
										display: 'flex',
										gap: 16,
										padding: '22px 20px',
										borderRadius: 18,
										cursor: 'pointer',
										background: act ? '#fff' : 'transparent',
										border: act ? '1.5px solid #e7e5e4' : '1.5px solid transparent',
										boxShadow: act ? '0 8px 32px #00000006' : 'none',
										transition: 'all .35s cubic-bezier(.4,0,.2,1)',
										marginBottom: 8,
										animation: `slideR .4s ease ${i * 0.1}s both`
									}}
								>
									<div
										style={{
											width: 48,
											height: 48,
											borderRadius: 14,
											flexShrink: 0,
											background: act ? s.color + '12' : '#f5f5f4',
											display: 'grid',
											placeItems: 'center',
											fontSize: 22,
											border: act ? `2px solid ${s.color}20` : '2px solid transparent',
											transition: 'all .3s',
											transform: act ? 'scale(1.05)' : 'none'
										}}
									>
										{s.icon}
									</div>
									<div>
										<div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
											<span
												style={{
													fontSize: 10,
													fontWeight: 700,
													color: act ? s.color : '#a8a29e',
													fontFamily: M,
													transition: 'color .3s'
												}}
											>
												{s.n}
											</span>
											<span
												style={{
													fontWeight: 800,
													fontSize: 16,
													color: act ? '#1c1917' : '#78716c',
													transition: 'color .3s'
												}}
											>
												{s.title}
											</span>
										</div>
										<p
											style={{
												fontSize: 12,
												color: '#78716c',
												lineHeight: 1.5,
												margin: 0,
												maxHeight: act ? 60 : 0,
												overflow: 'hidden',
												opacity: act ? 1 : 0,
												transition: 'all .35s'
											}}
										>
											{s.desc}
										</p>
									</div>
								</div>
							);
						})}
						{/* Progress dots */}
						<div style={{ display: 'flex', gap: 4, padding: '8px 20px' }}>
							{steps.map((s, i) => (
								<div
									key={i}
									onClick={() => setActiveStep(i)}
									style={{
										flex: 1,
										height: 3,
										borderRadius: 2,
										cursor: 'pointer',
										background: i <= activeStep ? steps[activeStep].color : '#e7e5e4',
										transition: 'background .4s'
									}}
								/>
							))}
						</div>
					</div>

					{/* Preview card */}
					<div style={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>
						{steps.map((s, i) => (
							<div
								key={i}
								style={{
									display: activeStep === i ? 'flex' : 'none',
									flexDirection: 'column',
									justifyContent: 'center',
									width: '100%',
									background: '#fff',
									borderRadius: 24,
									padding: '40px 36px',
									border: '1.5px solid #e7e5e4',
									position: 'relative',
									overflow: 'hidden',
									animation: activeStep === i ? 'scaleIn .4s cubic-bezier(.4,0,.2,1) both' : 'none'
								}}
							>
								{/* Decorative corner */}
								<div
									style={{
										position: 'absolute',
										top: -30,
										right: -30,
										width: 120,
										height: 120,
										borderRadius: '50%',
										background: s.color,
										opacity: 0.06,
										filter: 'blur(25px)'
									}}
								/>

								<div style={{ position: 'relative' }}>
									<div
										style={{ fontSize: 52, marginBottom: 20, animation: 'float 4s ease infinite' }}
									>
										{s.icon}
									</div>
									<div
										style={{
											fontSize: 10,
											fontWeight: 700,
											color: s.color,
											fontFamily: M,
											textTransform: 'uppercase',
											letterSpacing: '.1em',
											marginBottom: 8
										}}
									>
										Крок {s.n}
									</div>
									<h3
										style={{
											fontSize: 24,
											fontWeight: 900,
											letterSpacing: '-.03em',
											marginBottom: 12
										}}
									>
										{s.title}
									</h3>
									<p
										style={{
											fontSize: 14,
											color: '#78716c',
											lineHeight: 1.6,
											marginBottom: 24,
											maxWidth: 340
										}}
									>
										{s.desc}
									</p>

									{/* Mock preview */}
									<div
										style={{
											padding: '14px 18px',
											borderRadius: 14,
											background: s.color + '08',
											border: `1.5px solid ${s.color}15`,
											fontFamily: M,
											fontSize: 13,
											color: s.color,
											fontWeight: 600,
											letterSpacing: '-.01em'
										}}
									>
										{s.preview}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ═══ TRENDING ═══ */}
			<section
				style={{
					background: '#fff',
					borderTop: '1px solid #e7e5e4',
					borderBottom: '1px solid #e7e5e4'
				}}
			>
				<div style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px' }}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'baseline',
							marginBottom: 24
						}}
					>
						<div>
							<span
								style={{
									fontSize: 10,
									fontWeight: 700,
									color: blue,
									textTransform: 'uppercase',
									letterSpacing: '.1em',
									fontFamily: M
								}}
							>
								Популярне
							</span>
							<h2 style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-.03em', marginTop: 4 }}>
								Найчастіші заміни
							</h2>
						</div>
						<button
							onClick={() => goTo('catalog')}
							style={{
								padding: '8px 18px',
								borderRadius: 10,
								border: '1.5px solid #e7e5e4',
								background: '#fff',
								fontSize: 13,
								fontWeight: 700,
								cursor: 'pointer',
								fontFamily: F,
								transition: 'all .2s',
								color: '#57534e'
							}}
							onMouseOver={(e) => {
								e.target.style.background = '#1c1917';
								e.target.style.color = '#fff';
								e.target.style.borderColor = '#1c1917';
							}}
							onMouseOut={(e) => {
								e.target.style.background = '#fff';
								e.target.style.color = '#57534e';
								e.target.style.borderColor = '#e7e5e4';
							}}
						>
							Весь каталог →
						</button>
					</div>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
						{ITEMS.slice(0, 3).map((it, i) => (
							<ItemBlock key={it.orig} item={it} i={i} openDef={i === 0} onAlt={onAlt} />
						))}
					</div>
				</div>
			</section>

			{/* ═══ FEATURED UA BRANDS — horizontal scroll ═══ */}
			<section style={{ maxWidth: 960, margin: '0 auto', padding: '72px 24px 56px' }}>
				<div style={{ textAlign: 'center', marginBottom: 36 }}>
					<span
						style={{
							fontSize: 10,
							fontWeight: 700,
							color: '#16a34a',
							textTransform: 'uppercase',
							letterSpacing: '.1em',
							fontFamily: M
						}}
					>
						🇺🇦 Українське
					</span>
					<h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-.03em', marginTop: 6 }}>
						Продукти, якими пишається світ
					</h2>
				</div>
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
					{topBrands.map((b, i) => {
						const isH = heroHov === b.name;
						return (
							<div
								key={b.name}
								onMouseEnter={() => setHeroHov(b.name)}
								onMouseLeave={() => setHeroHov(null)}
								onClick={() => goTo('nashe')}
								style={{
									position: 'relative',
									overflow: 'hidden',
									background: '#fff',
									borderRadius: 22,
									padding: '28px 22px',
									border: isH ? `1.5px solid ${b.cl}30` : '1.5px solid #e7e5e4',
									cursor: 'pointer',
									transition: 'all .35s cubic-bezier(.4,0,.2,1)',
									transform: isH ? 'translateY(-4px)' : 'none',
									boxShadow: isH ? `0 20px 48px ${b.cl}0c` : 'none',
									animation: `up .45s ease ${i * 0.08}s both`
								}}
							>
								<div
									style={{
										position: 'absolute',
										top: -20,
										right: -20,
										width: 80,
										height: 80,
										borderRadius: '50%',
										background: b.cl,
										opacity: isH ? 0.06 : 0,
										filter: 'blur(20px)',
										transition: 'opacity .4s'
									}}
								/>
								<div
									style={{
										width: 52,
										height: 52,
										borderRadius: 15,
										background: b.cl + '0a',
										display: 'grid',
										placeItems: 'center',
										fontSize: 22,
										fontWeight: 800,
										color: b.cl,
										fontFamily: F,
										border: `2px solid ${b.cl}14`,
										marginBottom: 16,
										transition: 'transform .3s',
										transform: isH ? 'scale(1.08) rotate(-3deg)' : 'none'
									}}
								>
									{b.L}
								</div>
								<span
									style={{
										fontSize: 10,
										padding: '2px 8px',
										borderRadius: 99,
										background: b.cl + '0c',
										color: b.cl,
										fontWeight: 700,
										border: `1px solid ${b.cl}15`,
										display: 'inline-block',
										marginBottom: 8
									}}
								>
									{b.tag}
								</span>
								<div
									style={{
										fontWeight: 800,
										fontSize: 17,
										letterSpacing: '-.02em',
										marginBottom: 4
									}}
								>
									{b.name}
								</div>
								<p style={{ fontSize: 12, color: '#78716c', lineHeight: 1.45, marginBottom: 12 }}>
									{b.d}
								</p>
								<div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
									<span style={{ fontSize: 14, fontWeight: 800, fontFamily: M }}>{b.users}</span>
									<span style={{ fontSize: 10, color: '#a8a29e' }}>users</span>
								</div>
							</div>
						);
					})}
				</div>
				<div style={{ textAlign: 'center', marginTop: 24 }}>
					<button
						onClick={() => goTo('nashe')}
						style={{
							padding: '10px 24px',
							borderRadius: 99,
							border: '1.5px solid #e7e5e4',
							background: '#fff',
							fontSize: 13,
							fontWeight: 700,
							color: '#57534e',
							cursor: 'pointer',
							fontFamily: F,
							transition: 'all .2s'
						}}
						onMouseOver={(e) => {
							e.target.style.background = '#f5f5f4';
						}}
						onMouseOut={(e) => {
							e.target.style.background = '#fff';
						}}
					>
						Усі українські продукти →
					</button>
				</div>
			</section>

			{/* ═══ DUAL CTA ═══ */}
			<section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 80px' }}>
				<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
					{/* Nashe CTA */}
					<div
						onClick={() => goTo('nashe')}
						style={{
							position: 'relative',
							overflow: 'hidden',
							borderRadius: 24,
							padding: '36px 32px',
							background: `linear-gradient(135deg,${blue} 0%,#1e40af 100%)`,
							cursor: 'pointer',
							color: '#fff',
							transition: 'all .3s cubic-bezier(.4,0,.2,1)',
							animation: 'up .5s ease .1s both'
						}}
						onMouseOver={(e) => {
							e.currentTarget.style.transform = 'translateY(-3px) scale(1.01)';
							e.currentTarget.style.boxShadow = `0 24px 64px ${blue}20`;
						}}
						onMouseOut={(e) => {
							e.currentTarget.style.transform = 'none';
							e.currentTarget.style.boxShadow = 'none';
						}}
					>
						<div
							style={{
								position: 'absolute',
								top: -20,
								right: 30,
								width: 120,
								height: 120,
								borderRadius: '50%',
								background: gold,
								opacity: 0.1,
								filter: 'blur(35px)'
							}}
						/>
						<div style={{ position: 'relative' }}>
							<div style={{ fontSize: 32, marginBottom: 12, animation: 'float 5s ease infinite' }}>
								🇺🇦
							</div>
							<p
								style={{
									fontSize: 10,
									fontWeight: 700,
									color: gold,
									textTransform: 'uppercase',
									letterSpacing: '.08em',
									marginBottom: 6,
									fontFamily: M
								}}
							>
								Підтримуй наше
							</p>
							<h3
								style={{
									fontSize: 19,
									fontWeight: 800,
									margin: '0 0 8px',
									letterSpacing: '-.02em'
								}}
							>
								Українські бренди
							</h3>
							<p style={{ fontSize: 12, color: '#ffffffaa', lineHeight: 1.5, margin: 0 }}>
								Monobank, Grammarly, Ajax та інші
							</p>
						</div>
						<div
							style={{ position: 'absolute', bottom: 20, right: 24, fontSize: 24, opacity: 0.6 }}
						>
							→
						</div>
					</div>

					{/* Cashback CTA */}
					<div
						onClick={() => goTo('cashback')}
						style={{
							position: 'relative',
							overflow: 'hidden',
							borderRadius: 24,
							padding: '36px 32px',
							background: 'linear-gradient(135deg,#065f46 0%,#059669 100%)',
							cursor: 'pointer',
							color: '#fff',
							transition: 'all .3s cubic-bezier(.4,0,.2,1)',
							animation: 'up .5s ease .15s both'
						}}
						onMouseOver={(e) => {
							e.currentTarget.style.transform = 'translateY(-3px) scale(1.01)';
							e.currentTarget.style.boxShadow = '0 24px 64px #05966920';
						}}
						onMouseOut={(e) => {
							e.currentTarget.style.transform = 'none';
							e.currentTarget.style.boxShadow = 'none';
						}}
					>
						<div
							style={{
								position: 'absolute',
								top: -20,
								right: 30,
								width: 120,
								height: 120,
								borderRadius: '50%',
								background: '#fbbf24',
								opacity: 0.1,
								filter: 'blur(35px)'
							}}
						/>
						<div style={{ position: 'relative' }}>
							<div
								style={{ fontSize: 32, marginBottom: 12, animation: 'float 5s ease infinite 2.5s' }}
							>
								💳
							</div>
							<p
								style={{
									fontSize: 10,
									fontWeight: 700,
									color: '#fbbf24',
									textTransform: 'uppercase',
									letterSpacing: '.08em',
									marginBottom: 6,
									fontFamily: M
								}}
							>
								Національний кешбек
							</p>
							<h3
								style={{
									fontSize: 19,
									fontWeight: 800,
									margin: '0 0 8px',
									letterSpacing: '-.02em'
								}}
							>
								Перевір свій продукт
							</h3>
							<p style={{ fontSize: 12, color: '#ffffffaa', lineHeight: 1.5, margin: 0 }}>
								Повернення 10% за українське
							</p>
						</div>
						<div
							style={{ position: 'absolute', bottom: 20, right: 24, fontSize: 24, opacity: 0.6 }}
						>
							→
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

/* ── CATALOG ── */
function Catalog({ onAlt }) {
	const [cat, setCat] = useState(null);
	const [sort, setSort] = useState('popular');
	const [viewMode, setViewMode] = useState('list');
	const [hovCat, setHovCat] = useState(null);
	const [expandAll, setExpandAll] = useState(false);

	const filtered = cat ? ITEMS.filter((it) => it.cat === cat) : ITEMS;
	const sorted = [...filtered].sort((a, b) => {
		if (sort === 'alts') return b.alts.length - a.alts.length;
		if (sort === 'alpha') return a.orig.localeCompare(b.orig);
		return 0;
	});
	const totalAlts = ITEMS.reduce((s, it) => s + it.alts.length, 0);
	const activeCatObj = cat ? CATS.find((c) => c.slug === cat) : null;

	// Top rated alternatives across all items
	const topAlts = ITEMS.flatMap((it) => it.alts.map((a) => ({ ...a, from: it.orig, ff: it.flag })))
		.sort((a, b) => b.ratio - a.ratio)
		.slice(0, 5);

	return (
		<section style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px 80px' }}>
			{/* ═══ HERO HEADER ═══ */}
			<div
				style={{
					position: 'relative',
					overflow: 'hidden',
					borderRadius: '0 0 36px 36px',
					padding: '52px 44px 44px',
					marginBottom: 36,
					background: '#1c1917',
					color: '#fff',
					animation: 'fadeIn .4s ease both'
				}}
			>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						opacity: 0.025,
						backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)',
						backgroundSize: '22px 22px'
					}}
				/>
				<div
					style={{
						position: 'absolute',
						top: -50,
						right: 60,
						width: 260,
						height: 260,
						borderRadius: '50%',
						background: blue,
						opacity: 0.07,
						filter: 'blur(60px)',
						animation: 'waveFloat 14s ease infinite'
					}}
				/>
				<div
					style={{
						position: 'absolute',
						bottom: -40,
						left: 20,
						width: 200,
						height: 200,
						borderRadius: '50%',
						background: gold,
						opacity: 0.05,
						filter: 'blur(50px)',
						animation: 'waveFloat 14s ease infinite 7s'
					}}
				/>

				<div style={{ position: 'relative' }}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'flex-start',
							flexWrap: 'wrap',
							gap: 28,
							marginBottom: 36
						}}
					>
						<div style={{ animation: 'slideR .5s ease .1s both', maxWidth: 440 }}>
							<span
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									gap: 5,
									fontSize: 10,
									fontWeight: 700,
									padding: '4px 12px',
									borderRadius: 99,
									background: '#ffffff0c',
									border: '1px solid #ffffff12',
									color: '#ffffff60',
									textTransform: 'uppercase',
									letterSpacing: '.08em',
									marginBottom: 16,
									fontFamily: M
								}}
							>
								<span
									style={{
										width: 6,
										height: 6,
										borderRadius: 99,
										background: '#16a34a',
										boxShadow: '0 0 6px #16a34a80'
									}}
								/>
								Оновлено сьогодні
							</span>
							<h1
								style={{
									fontSize: 'clamp(30px,4.5vw,44px)',
									fontWeight: 900,
									letterSpacing: '-.05em',
									lineHeight: 1.05,
									marginBottom: 8
								}}
							>
								Каталог{' '}
								<span
									style={{
										background: `linear-gradient(135deg,${gold} 20%,#fbbf24 80%)`,
										WebkitBackgroundClip: 'text',
										WebkitTextFillColor: 'transparent'
									}}
								>
									альтернатив
								</span>
							</h1>
							<p style={{ fontSize: 15, color: '#ffffff50', lineHeight: 1.5 }}>
								Перевірені заміни ворожим продуктам, сервісам та додаткам
							</p>
						</div>

						<div style={{ display: 'flex', gap: 20, animation: 'slideL .5s ease .2s both' }}>
							{[
								[String(ITEMS.length), 'продуктів', '🎯'],
								[String(totalAlts), 'альтернатив', '✦'],
								[String(CATS.length), 'категорій', '📂']
							].map(([v, l, ic], i) => (
								<div key={i} style={{ textAlign: 'center' }}>
									<div
										style={{
											width: 44,
											height: 44,
											borderRadius: 13,
											background: '#ffffff08',
											border: '1px solid #ffffff0c',
											display: 'grid',
											placeItems: 'center',
											fontSize: 18,
											margin: '0 auto 8px'
										}}
									>
										{ic}
									</div>
									<div
										style={{
											fontSize: 22,
											fontWeight: 800,
											fontFamily: M,
											letterSpacing: '-.03em'
										}}
									>
										{v}
									</div>
									<div style={{ fontSize: 10, color: '#ffffff40', marginTop: 2 }}>{l}</div>
								</div>
							))}
						</div>
					</div>

					{/* Top rated strip */}
					<div style={{ animation: 'up .5s ease .3s both' }}>
						<p
							style={{
								fontSize: 10,
								fontWeight: 700,
								color: '#ffffff35',
								textTransform: 'uppercase',
								letterSpacing: '.08em',
								fontFamily: M,
								marginBottom: 10
							}}
						>
							⭐ Найкращі альтернативи
						</p>
						<div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
							{topAlts.map((a, i) => (
								<div
									key={i}
									onClick={() => onAlt?.(a)}
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 10,
										padding: '10px 16px 10px 10px',
										borderRadius: 14,
										background: '#ffffff08',
										border: '1px solid #ffffff0c',
										cursor: 'pointer',
										flexShrink: 0,
										minWidth: 185,
										transition: 'all .25s',
										animation: `slideR .3s ease ${i * 0.06}s both`
									}}
									onMouseOver={(e) => {
										e.currentTarget.style.background = '#ffffff14';
										e.currentTarget.style.transform = 'translateY(-2px)';
									}}
									onMouseOut={(e) => {
										e.currentTarget.style.background = '#ffffff08';
										e.currentTarget.style.transform = 'none';
									}}
								>
									<div
										style={{
											width: 34,
											height: 34,
											borderRadius: 9,
											background: a.cl + '18',
											display: 'grid',
											placeItems: 'center',
											fontSize: 13,
											fontWeight: 800,
											color: a.cl,
											fontFamily: F,
											flexShrink: 0
										}}
									>
										{a.L}
									</div>
									<div style={{ minWidth: 0 }}>
										<div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
											<span style={{ fontWeight: 700, fontSize: 12, color: '#fff' }}>{a.name}</span>
											<span style={{ fontSize: 11 }}>{a.c2}</span>
										</div>
										<div
											style={{
												fontSize: 10,
												color: '#ffffff40',
												whiteSpace: 'nowrap',
												overflow: 'hidden',
												textOverflow: 'ellipsis'
											}}
										>
											замість {a.from} {a.ff}
										</div>
									</div>
									<span
										style={{
											fontSize: 12,
											fontWeight: 700,
											color: '#16a34a',
											fontFamily: M,
											marginLeft: 'auto',
											flexShrink: 0
										}}
									>
										{a.ratio}%
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* ═══ CATEGORY PILLS ═══ */}
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
				<button
					onClick={() => setCat(null)}
					onMouseEnter={() => setHovCat('all')}
					onMouseLeave={() => setHovCat(null)}
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 8,
						padding: '10px 18px 10px 12px',
						borderRadius: 14,
						cursor: 'pointer',
						fontFamily: F,
						background: !cat ? '#1c1917' : '#fff',
						border: !cat ? '1.5px solid #1c1917' : '1.5px solid #e7e5e4',
						color: !cat ? '#fff' : '#57534e',
						fontSize: 13,
						fontWeight: !cat ? 700 : 600,
						transition: 'all .25s cubic-bezier(.4,0,.2,1)',
						transform: hovCat === 'all' && cat ? 'translateY(-1px)' : 'none',
						animation: 'scaleIn .3s ease both'
					}}
				>
					<span style={{ fontSize: 16 }}>📦</span>Усі
					<span style={{ fontSize: 10, fontFamily: M, opacity: 0.5, marginLeft: 2 }}>
						{ITEMS.length}
					</span>
				</button>
				{CATS.map((c, i) => {
					const active = cat === c.slug;
					const isHov = hovCat === c.slug;
					const count = ITEMS.filter((it) => it.cat === c.slug).length;
					if (!count) return null;
					return (
						<button
							key={c.slug}
							onClick={() => setCat(active ? null : c.slug)}
							onMouseEnter={() => setHovCat(c.slug)}
							onMouseLeave={() => setHovCat(null)}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 7,
								padding: '10px 16px 10px 11px',
								borderRadius: 14,
								cursor: 'pointer',
								fontFamily: F,
								background: active ? blue + '0a' : '#fff',
								border: active ? `1.5px solid ${blue}30` : '1.5px solid #e7e5e4',
								color: active ? blue : '#57534e',
								fontSize: 13,
								fontWeight: active ? 700 : 500,
								transition: 'all .25s cubic-bezier(.4,0,.2,1)',
								transform: isHov && !active ? 'translateY(-1px)' : 'none',
								animation: `scaleIn .3s ease ${(i + 1) * 0.03}s both`
							}}
						>
							<span
								style={{
									fontSize: 16,
									transition: 'transform .2s',
									transform: isHov ? 'scale(1.2)' : 'none'
								}}
							>
								{c.icon}
							</span>
							{c.name}
							<span
								style={{
									fontSize: 10,
									fontFamily: M,
									padding: '1px 6px',
									borderRadius: 6,
									background: active ? blue + '12' : '#f5f5f4',
									color: active ? blue : '#a8a29e',
									fontWeight: 600,
									transition: 'all .2s'
								}}
							>
								{count}
							</span>
						</button>
					);
				})}
			</div>

			{/* ═══ TOOLBAR ═══ */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
					gap: 10,
					padding: '10px 16px',
					borderRadius: 14,
					background: '#fff',
					border: '1px solid #e7e5e4',
					marginBottom: 20,
					animation: 'up .3s ease .1s both'
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
					{activeCatObj && (
						<div
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								gap: 5,
								padding: '4px 10px 4px 6px',
								borderRadius: 99,
								background: blue + '08',
								border: `1px solid ${blue}12`,
								animation: 'scaleIn .2s ease both'
							}}
						>
							<span style={{ fontSize: 14 }}>{activeCatObj.icon}</span>
							<span style={{ fontSize: 11, fontWeight: 700, color: blue }}>
								{activeCatObj.name}
							</span>
							<button
								onClick={() => setCat(null)}
								style={{
									width: 16,
									height: 16,
									borderRadius: 99,
									border: 'none',
									background: blue + '15',
									color: blue,
									fontSize: 9,
									cursor: 'pointer',
									display: 'grid',
									placeItems: 'center'
								}}
							>
								✕
							</button>
						</div>
					)}
					<span style={{ fontSize: 12, color: '#a8a29e' }}>
						<strong style={{ color: '#1c1917', fontFamily: M }}>{sorted.length}</strong> продуктів ·{' '}
						<strong style={{ color: '#1c1917', fontFamily: M }}>
							{sorted.reduce((s, it) => s + it.alts.length, 0)}
						</strong>{' '}
						альтернатив
					</span>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
					<div
						style={{ display: 'flex', gap: 1, padding: 2, borderRadius: 10, background: '#f5f5f4' }}
					>
						{[
							['popular', 'Популярні'],
							['alts', 'К-сть альт.'],
							['alpha', 'А→Я']
						].map(([id, l]) => (
							<button
								key={id}
								onClick={() => setSort(id)}
								style={{
									padding: '5px 10px',
									borderRadius: 8,
									border: 'none',
									background: sort === id ? '#fff' : 'transparent',
									boxShadow: sort === id ? '0 1px 4px #0000000a' : 'none',
									color: sort === id ? '#1c1917' : '#a8a29e',
									fontSize: 11,
									fontWeight: sort === id ? 700 : 500,
									cursor: 'pointer',
									fontFamily: F,
									transition: 'all .2s'
								}}
							>
								{l}
							</button>
						))}
					</div>
					<div
						style={{ display: 'flex', gap: 1, padding: 2, borderRadius: 10, background: '#f5f5f4' }}
					>
						{[
							['list', '☰'],
							['grid', '▦']
						].map(([id, ic]) => (
							<button
								key={id}
								onClick={() => setViewMode(id)}
								style={{
									width: 28,
									height: 26,
									borderRadius: 7,
									border: 'none',
									background: viewMode === id ? '#fff' : 'transparent',
									boxShadow: viewMode === id ? '0 1px 4px #0000000a' : 'none',
									color: viewMode === id ? '#1c1917' : '#a8a29e',
									fontSize: 13,
									cursor: 'pointer',
									display: 'grid',
									placeItems: 'center',
									transition: 'all .2s'
								}}
							>
								{ic}
							</button>
						))}
					</div>
					{viewMode === 'list' && (
						<button
							onClick={() => setExpandAll(!expandAll)}
							style={{
								padding: '5px 10px',
								borderRadius: 8,
								border: '1px solid #e7e5e4',
								background: expandAll ? '#1c1917' : '#fff',
								color: expandAll ? '#fff' : '#78716c',
								fontSize: 11,
								fontWeight: 600,
								cursor: 'pointer',
								fontFamily: F,
								transition: 'all .2s'
							}}
						>
							{expandAll ? 'Згорнути' : 'Розгорнути'}
						</button>
					)}
				</div>
			</div>

			{/* ═══ MAIN AREA ═══ */}
			<div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
				{/* Sidebar (list mode only) */}
				{viewMode === 'list' && (
					<div
						style={{
							width: 200,
							flexShrink: 0,
							position: 'sticky',
							top: 76,
							animation: 'slideR .35s ease .15s both'
						}}
					>
						<p
							style={{
								fontSize: 10,
								fontWeight: 700,
								color: '#a8a29e',
								textTransform: 'uppercase',
								letterSpacing: '.08em',
								marginBottom: 8,
								fontFamily: M,
								padding: '0 8px'
							}}
						>
							Навігація
						</p>
						{CATS.map((c, i) => {
							const active = cat === c.slug;
							const count = ITEMS.filter((it) => it.cat === c.slug).length;
							if (!count) return null;
							return (
								<button
									key={c.slug}
									onClick={() => setCat(active ? null : c.slug)}
									style={{
										width: '100%',
										display: 'flex',
										alignItems: 'center',
										gap: 8,
										padding: '9px 10px',
										borderRadius: 10,
										border: 'none',
										background: active ? blue + '08' : 'transparent',
										color: active ? blue : '#78716c',
										fontSize: 12,
										fontWeight: active ? 700 : 500,
										cursor: 'pointer',
										fontFamily: F,
										transition: 'all .2s',
										marginBottom: 1,
										animation: `slideR .25s ease ${i * 0.03}s both`
									}}
									onMouseOver={(e) => {
										if (!active) e.currentTarget.style.background = '#fafaf9';
									}}
									onMouseOut={(e) => {
										if (!active)
											e.currentTarget.style.background = active ? blue + '08' : 'transparent';
									}}
								>
									<span style={{ fontSize: 14 }}>{c.icon}</span>
									<span style={{ flex: 1 }}>{c.name}</span>
									<span
										style={{
											fontSize: 10,
											fontFamily: M,
											color: active ? blue : '#d6d3d1',
											background: active ? blue + '0a' : '#f5f5f4',
											padding: '1px 6px',
											borderRadius: 5
										}}
									>
										{count}
									</span>
								</button>
							);
						})}

						{/* Sidebar insights */}
						<div
							style={{
								marginTop: 20,
								padding: '16px 14px',
								borderRadius: 16,
								background: '#fff',
								border: '1px solid #e7e5e4'
							}}
						>
							<div style={{ fontSize: 11, fontWeight: 700, marginBottom: 10 }}>📊 Інсайти</div>
							{[
								['Топ заміна', 'Signal', '92%', '#3A76F0'],
								['Найбільше відг.', 'Gmail', '612', '#EA4335'],
								['Найновіше', 'Sweet.tv', '81%', '#FF2D55']
							].map(([l, v, n, cl], i) => (
								<div
									key={i}
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 8,
										padding: '7px 0',
										borderBottom: i < 2 ? '1px solid #f5f5f4' : 'none'
									}}
								>
									<div
										style={{
											width: 22,
											height: 22,
											borderRadius: 6,
											background: cl + '0c',
											display: 'grid',
											placeItems: 'center',
											fontSize: 8,
											fontWeight: 800,
											color: cl,
											flexShrink: 0
										}}
									>
										{v[0]}
									</div>
									<div style={{ flex: 1 }}>
										<div style={{ fontSize: 11, fontWeight: 600 }}>{v}</div>
										<div style={{ fontSize: 9, color: '#a8a29e' }}>{l}</div>
									</div>
									<span style={{ fontSize: 10, fontWeight: 700, fontFamily: M, color: cl }}>
										{n}
									</span>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Items */}
				<div style={{ flex: 1 }} key={`${cat}-${sort}-${viewMode}`}>
					{sorted.length === 0 ? (
						<div
							style={{
								textAlign: 'center',
								padding: 72,
								background: '#fff',
								borderRadius: 28,
								border: '1px solid #e7e5e4',
								animation: 'scaleIn .4s ease both'
							}}
						>
							<div style={{ fontSize: 48, marginBottom: 16, animation: 'float 3s ease infinite' }}>
								📭
							</div>
							<h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Тут поки порожньо</h3>
							<p style={{ fontSize: 14, color: '#78716c', maxWidth: 300, margin: '0 auto 20px' }}>
								В цій категорії ще немає продуктів
							</p>
							<button
								onClick={() => setCat(null)}
								style={{
									padding: '10px 24px',
									borderRadius: 12,
									border: '1.5px solid #e7e5e4',
									background: '#fff',
									fontSize: 13,
									fontWeight: 700,
									cursor: 'pointer',
									fontFamily: F
								}}
								onMouseOver={(e) => (e.target.style.background = '#f5f5f4')}
								onMouseOut={(e) => (e.target.style.background = '#fff')}
							>
								Показати все
							</button>
						</div>
					) : viewMode === 'list' ? (
						<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
							{sorted.map((it, i) => (
								<ItemBlock key={it.orig} item={it} i={i} openDef={expandAll} onAlt={onAlt} />
							))}
						</div>
					) : (
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
								gap: 14
							}}
						>
							{sorted.map((it, i) => (
								<GridCard key={it.orig} item={it} i={i} onAlt={onAlt} />
							))}
						</div>
					)}

					{sorted.length > 0 && (
						<div
							style={{
								textAlign: 'center',
								padding: '40px 0 0',
								animation: 'up .4s ease .3s both'
							}}
						>
							<p style={{ fontSize: 12, color: '#a8a29e' }}>
								Показано <strong style={{ color: '#1c1917' }}>{sorted.length}</strong> продуктів з{' '}
								<strong style={{ color: '#1c1917' }}>
									{sorted.reduce((s, it) => s + it.alts.length, 0)}
								</strong>{' '}
								альтернативами
								{cat && (
									<>
										{' '}
										в <strong style={{ color: blue }}>{activeCatObj?.name}</strong>
									</>
								)}
							</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}

/* ═══ GRID CARD ═══ */
function GridCard({ item, i, onAlt }) {
	const [hov, setHov] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const top = item.alts[0];
	const best = Math.max(...item.alts.map((a) => a.ratio));

	return (
		<div
			onMouseEnter={() => setHov(true)}
			onMouseLeave={() => setHov(false)}
			style={{
				background: '#fff',
				borderRadius: 24,
				overflow: 'hidden',
				border: hov ? `1.5px solid ${top.cl}20` : '1.5px solid #e7e5e4',
				transition: 'all .35s cubic-bezier(.4,0,.2,1)',
				transform: hov ? 'translateY(-4px)' : 'none',
				boxShadow: hov ? `0 20px 48px ${top.cl}08` : '0 1px 3px #00000004',
				animation: `up .4s ease ${i * 0.07}s both`
			}}
		>
			{/* Color accent bar */}
			<div
				style={{
					height: 3,
					background: `linear-gradient(90deg,#dc2626 50%,${top.cl} 50%)`,
					opacity: hov ? 1 : 0.3,
					transition: 'opacity .3s'
				}}
			/>

			<div style={{ padding: '22px 22px 18px' }}>
				<div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
					<div
						style={{
							width: 48,
							height: 48,
							borderRadius: 14,
							background: '#fef2f2',
							display: 'grid',
							placeItems: 'center',
							border: '1.5px solid #fecaca',
							flexShrink: 0,
							transition: 'transform .35s cubic-bezier(.34,1.56,.64,1)',
							transform: hov ? 'rotate(-6deg) scale(1.08)' : 'none'
						}}
					>
						<span style={{ fontSize: 14, fontWeight: 800, color: '#dc2626' }}>✕</span>
					</div>
					<div style={{ flex: 1 }}>
						<div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
							<span style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-.02em' }}>
								{item.orig}
							</span>
							<span style={{ fontSize: 15 }}>{item.flag}</span>
						</div>
						<div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
							<span
								style={{
									fontSize: 8,
									padding: '2px 7px',
									borderRadius: 99,
									background: '#fef2f2',
									color: '#dc2626',
									fontWeight: 700,
									border: '1px solid #fecaca',
									textTransform: 'uppercase'
								}}
							>
								ворожий
							</span>
							<span style={{ fontSize: 11, color: '#a8a29e' }}>{item.alts.length} альтернатив</span>
						</div>
					</div>
					<div style={{ textAlign: 'right', flexShrink: 0 }}>
						<div style={{ fontSize: 10, color: '#a8a29e', marginBottom: 2 }}>найкращий</div>
						<span style={{ fontSize: 16, fontWeight: 800, fontFamily: M, color: '#16a34a' }}>
							{best}%
						</span>
					</div>
				</div>

				{/* Comparison visual */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 10,
						padding: '12px 14px',
						borderRadius: 14,
						background: '#fafaf9',
						border: '1px solid #f0f0ef'
					}}
				>
					<div
						style={{
							width: 30,
							height: 30,
							borderRadius: 8,
							background: '#fef2f2',
							display: 'grid',
							placeItems: 'center',
							border: '1px solid #fecaca',
							flexShrink: 0
						}}
					>
						<span style={{ fontSize: 9, fontWeight: 800, color: '#dc2626' }}>✕</span>
					</div>
					<svg width={16} height={8} viewBox="0 0 16 8" style={{ flexShrink: 0 }}>
						<path
							d="M0 4h12M10 1l3 3-3 3"
							stroke="#a8a29e"
							strokeWidth={1.5}
							fill="none"
							strokeLinecap="round"
						/>
					</svg>
					<div
						onClick={() => onAlt?.(top)}
						style={{
							flex: 1,
							display: 'flex',
							alignItems: 'center',
							gap: 8,
							padding: '6px 10px',
							borderRadius: 10,
							background: top.cl + '08',
							cursor: 'pointer',
							border: `1px solid ${top.cl}12`,
							transition: 'all .2s'
						}}
						onMouseOver={(e) => (e.currentTarget.style.background = top.cl + '12')}
						onMouseOut={(e) => (e.currentTarget.style.background = top.cl + '08')}
					>
						<div
							style={{
								width: 28,
								height: 28,
								borderRadius: 7,
								background: top.cl + '12',
								display: 'grid',
								placeItems: 'center',
								fontSize: 11,
								fontWeight: 800,
								color: top.cl,
								fontFamily: F
							}}
						>
							{top.L}
						</div>
						<div style={{ flex: 1, minWidth: 0 }}>
							<div style={{ fontWeight: 700, fontSize: 12 }}>
								{top.name} {top.c2}
							</div>
							<div
								style={{
									fontSize: 10,
									color: '#78716c',
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									textOverflow: 'ellipsis'
								}}
							>
								{top.d}
							</div>
						</div>
						<div style={{ flexShrink: 0 }}>
							<Ratio v={top.ratio} />
						</div>
					</div>
				</div>
			</div>

			{/* Alt avatars + expand */}
			<div
				style={{
					padding: '0 22px 16px',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					{item.alts.map((a, j) => (
						<div
							key={j}
							onClick={() => onAlt?.(a)}
							style={{
								width: 28,
								height: 28,
								borderRadius: 8,
								background: a.cl + '0c',
								display: 'grid',
								placeItems: 'center',
								fontSize: 10,
								fontWeight: 800,
								color: a.cl,
								border: `1.5px solid ${a.cl}18`,
								marginLeft: j > 0 ? -5 : 0,
								cursor: 'pointer',
								transition: 'all .2s',
								position: 'relative',
								zIndex: item.alts.length - j
							}}
							onMouseOver={(e) => {
								e.currentTarget.style.transform = 'scale(1.2)';
								e.currentTarget.style.zIndex = '10';
							}}
							onMouseOut={(e) => {
								e.currentTarget.style.transform = 'none';
								e.currentTarget.style.zIndex = String(item.alts.length - j);
							}}
						>
							{a.L}
						</div>
					))}
					{item.alts.length > 1 && (
						<span style={{ fontSize: 10, color: '#a8a29e', marginLeft: 8 }}>
							+{item.alts.length - 1} ще
						</span>
					)}
				</div>
				<button
					onClick={() => setExpanded(!expanded)}
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 4,
						padding: '5px 12px',
						borderRadius: 8,
						border: '1px solid #e7e5e4',
						background: expanded ? '#1c1917' : '#fff',
						color: expanded ? '#fff' : '#78716c',
						fontSize: 11,
						fontWeight: 600,
						cursor: 'pointer',
						fontFamily: F,
						transition: 'all .2s'
					}}
					onMouseOver={(e) => {
						if (!expanded) e.currentTarget.style.background = '#f5f5f4';
					}}
					onMouseOut={(e) => {
						if (!expanded) e.currentTarget.style.background = expanded ? '#1c1917' : '#fff';
					}}
				>
					{expanded ? 'Згорнути' : 'Усі альт.'}
					<svg
						width={10}
						height={10}
						viewBox="0 0 20 20"
						style={{
							transition: 'transform .25s',
							transform: expanded ? 'rotate(180deg)' : 'none'
						}}
					>
						<path
							d="M5 7.5L10 12.5L15 7.5"
							stroke="currentColor"
							strokeWidth={2.5}
							fill="none"
							strokeLinecap="round"
						/>
					</svg>
				</button>
			</div>

			<div
				style={{
					maxHeight: expanded ? 500 : 0,
					overflow: 'hidden',
					transition: 'max-height .45s cubic-bezier(.4,0,.2,1), opacity .3s',
					opacity: expanded ? 1 : 0
				}}
			>
				<div style={{ padding: '0 10px 14px', borderTop: '1px solid #f5f5f4' }}>
					{item.alts.map((a, j) => (
						<AltRow key={a.name} a={a} i={j} onClick={onAlt} />
					))}
				</div>
			</div>
		</div>
	);
}
function Nashe() {
	const [hov, setHov] = useState(null);
	const [impI, setImpI] = useState(0);
	const [filter, setFilter] = useState('all');
	const [expandedBrand, setExpandedBrand] = useState(null);

	const imps = [
		{ v: '2.4M', l: 'переходів на українське', i: '🔄' },
		{ v: '₴18M+', l: 'збережено в UA-економіці', i: '💰' },
		{ v: '340+', l: 'українських брендів', i: '🇺🇦' },
		{ v: '98%', l: 'задоволених користувачів', i: '💙' }
	];
	useEffect(() => {
		const t = setInterval(() => setImpI((p) => (p + 1) % 4), 3200);
		return () => clearInterval(t);
	}, []);

	const cats = ['all', ...new Set(UA_BRANDS.map((b) => b.cat))];
	const filteredBrands = filter === 'all' ? UA_BRANDS : UA_BRANDS.filter((b) => b.cat === filter);
	const featured = filteredBrands.filter((b) => b.ft);
	const rest = filteredBrands.filter((b) => !b.ft);

	// Success stories
	const stories = [
		{
			user: 'Марія К.',
			avatar: 'МК',
			text: 'Перейшла на Monobank 2 роки тому — не уявляю як жила без кешбеку та донатів на ЗСУ прямо з апки.',
			brand: 'Monobank',
			cl: '#1c1917',
			stars: 5
		},
		{
			user: 'Олексій Д.',
			avatar: 'ОД',
			text: 'Grammarly щодня допомагає з англійською. Горджуся що це український продукт.',
			brand: 'Grammarly',
			cl: '#15803d',
			stars: 5
		},
		{
			user: 'Ірина П.',
			avatar: 'ІП',
			text: 'Ajax Systems — тепер мій дім під захистом. Встановлення зайняло 20 хвилин.',
			brand: 'Ajax Systems',
			cl: '#e11d48',
			stars: 5
		}
	];

	// Timeline milestones
	const milestones = [
		{ year: '2014', event: 'Monobank запускає перший в Україні повністю мобільний банк' },
		{ year: '2017', event: 'Grammarly оцінений у $1B — перший український єдиноріг' },
		{ year: '2020', event: 'Дія стає цифровою державою #1 у світі' },
		{ year: '2022', event: 'Ajax Systems виходить на ринки 169 країн' },
		{ year: '2024', event: 'MacPaw Setapp досягає 1M підписників' },
		{ year: '2025', event: '340+ UA-брендів на платформі НаНаше' }
	];

	return (
		<section style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px 80px' }}>
			{/* ═══ HERO — full bleed ═══ */}
			<div
				style={{
					position: 'relative',
					overflow: 'hidden',
					borderRadius: '0 0 36px 36px',
					padding: '60px 48px 52px',
					marginBottom: 48,
					background: `linear-gradient(140deg,${blue} 0%,#1e3a8a 35%,#1e40af 65%,${blue} 100%)`,
					color: '#fff',
					animation: 'fadeIn .4s ease both'
				}}
			>
				{/* Decorations */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						opacity: 0.03,
						backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)',
						backgroundSize: '24px 24px'
					}}
				/>
				<div
					style={{
						position: 'absolute',
						top: -60,
						right: 30,
						width: 320,
						height: 320,
						borderRadius: '50%',
						background: gold,
						opacity: 0.07,
						filter: 'blur(70px)',
						animation: 'waveFloat 14s ease infinite'
					}}
				/>
				<div
					style={{
						position: 'absolute',
						bottom: -50,
						left: -10,
						width: 260,
						height: 260,
						borderRadius: '50%',
						background: gold,
						opacity: 0.05,
						filter: 'blur(60px)',
						animation: 'waveFloat 14s ease infinite 7s'
					}}
				/>
				<div
					style={{
						position: 'absolute',
						top: '50%',
						right: '15%',
						width: 160,
						height: 160,
						borderRadius: '50%',
						background: '#a78bfa',
						opacity: 0.04,
						filter: 'blur(50px)',
						animation: 'waveFloat 12s ease infinite 3s'
					}}
				/>

				<div style={{ position: 'relative' }}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'flex-start',
							flexWrap: 'wrap',
							gap: 32,
							marginBottom: 40
						}}
					>
						<div style={{ maxWidth: 500, animation: 'slideR .6s ease .1s both' }}>
							<div
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									gap: 6,
									padding: '5px 14px 5px 7px',
									borderRadius: 99,
									background: `${gold}18`,
									border: `1px solid ${gold}30`,
									marginBottom: 22
								}}
							>
								<span
									style={{
										width: 20,
										height: 20,
										borderRadius: 99,
										background: `${gold}30`,
										display: 'grid',
										placeItems: 'center',
										fontSize: 10
									}}
								>
									🇺🇦
								</span>
								<span
									style={{
										fontSize: 10,
										fontWeight: 700,
										color: gold,
										textTransform: 'uppercase',
										letterSpacing: '.08em',
										fontFamily: M
									}}
								>
									Підтримуй наше
								</span>
							</div>
							<h1
								style={{
									fontSize: 'clamp(34px,5.5vw,52px)',
									fontWeight: 900,
									lineHeight: 1.05,
									letterSpacing: '-.05em',
									margin: '0 0 16px'
								}}
							>
								Українські продукти{' '}
								<span
									style={{
										background: `linear-gradient(135deg,${gold} 20%,#fde68a 80%)`,
										WebkitBackgroundClip: 'text',
										WebkitTextFillColor: 'transparent'
									}}
								>
									світового рівня
								</span>
							</h1>
							<p
								style={{
									fontSize: 16,
									color: '#ffffffa0',
									lineHeight: 1.6,
									margin: 0,
									maxWidth: 420
								}}
							>
								Ці компанії народились в Україні та конкурують глобально. Обираючи їх — інвестуєш у
								перемогу.
							</p>
						</div>

						{/* Impact counter */}
						<div
							style={{
								background: '#ffffff0a',
								backdropFilter: 'blur(16px)',
								borderRadius: 22,
								padding: '24px 30px',
								border: '1px solid #ffffff10',
								minWidth: 240,
								animation: 'slideL .6s ease .2s both'
							}}
						>
							<p
								style={{
									fontSize: 9,
									fontWeight: 700,
									color: '#ffffff40',
									textTransform: 'uppercase',
									letterSpacing: '.1em',
									fontFamily: M,
									marginBottom: 14
								}}
							>
								Наш вплив
							</p>
							{imps.map((s, i) => (
								<div
									key={i}
									style={{
										display: i === impI ? 'flex' : 'none',
										alignItems: 'center',
										gap: 14,
										animation: i === impI ? 'countUp .45s cubic-bezier(.4,0,.2,1) both' : 'none'
									}}
								>
									<div
										style={{
											width: 48,
											height: 48,
											borderRadius: 14,
											background: '#ffffff0c',
											display: 'grid',
											placeItems: 'center',
											fontSize: 24,
											border: '1px solid #ffffff0a'
										}}
									>
										{s.i}
									</div>
									<div>
										<div
											style={{
												fontSize: 28,
												fontWeight: 800,
												letterSpacing: '-.03em',
												fontFamily: M
											}}
										>
											{s.v}
										</div>
										<div style={{ fontSize: 12, color: '#ffffff60', marginTop: 2 }}>{s.l}</div>
									</div>
								</div>
							))}
							<div style={{ display: 'flex', gap: 4, marginTop: 18 }}>
								{imps.map((_, i) => (
									<div
										key={i}
										onClick={() => setImpI(i)}
										style={{
											flex: 1,
											height: 3,
											borderRadius: 2,
											cursor: 'pointer',
											transition: 'all .4s',
											background: i === impI ? gold : '#ffffff15',
											boxShadow: i === impI ? `0 0 8px ${gold}40` : 'none'
										}}
									/>
								))}
							</div>
						</div>
					</div>

					{/* Quick stats row */}
					<div style={{ display: 'flex', gap: 12, animation: 'up .5s ease .35s both' }}>
						{[
							['8', 'компаній', 'на платформі'],
							['4', 'єдинороги', '$1B+'],
							['169', 'країн', 'покриття'],
							['80M+', 'users', 'загалом']
						].map(([v, l, sub], i) => (
							<div
								key={i}
								style={{
									flex: 1,
									padding: '16px 18px',
									borderRadius: 16,
									background: '#ffffff08',
									border: '1px solid #ffffff08',
									transition: 'all .25s'
								}}
								onMouseOver={(e) => {
									e.currentTarget.style.background = '#ffffff12';
									e.currentTarget.style.transform = 'translateY(-2px)';
								}}
								onMouseOut={(e) => {
									e.currentTarget.style.background = '#ffffff08';
									e.currentTarget.style.transform = 'none';
								}}
							>
								<div
									style={{ fontSize: 22, fontWeight: 800, fontFamily: M, letterSpacing: '-.03em' }}
								>
									{v}
								</div>
								<div style={{ fontSize: 12, fontWeight: 600, color: '#ffffffc0', marginTop: 2 }}>
									{l}
								</div>
								<div style={{ fontSize: 10, color: '#ffffff40' }}>{sub}</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* ═══ CATEGORY FILTER ═══ */}
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 32 }}>
				{cats.map((c, i) => (
					<button
						key={c}
						onClick={() => setFilter(c)}
						style={{
							padding: '8px 18px',
							borderRadius: 12,
							cursor: 'pointer',
							fontFamily: F,
							background: filter === c ? blue : '#fff',
							border: filter === c ? `1.5px solid ${blue}` : '1.5px solid #e7e5e4',
							color: filter === c ? '#fff' : '#57534e',
							fontSize: 13,
							fontWeight: filter === c ? 700 : 500,
							transition: 'all .2s',
							animation: `scaleIn .25s ease ${i * 0.03}s both`
						}}
						onMouseOver={(e) => {
							if (filter !== c) {
								e.currentTarget.style.borderColor = blue + '40';
								e.currentTarget.style.color = blue;
							}
						}}
						onMouseOut={(e) => {
							if (filter !== c) {
								e.currentTarget.style.borderColor = '#e7e5e4';
								e.currentTarget.style.color = '#57534e';
							}
						}}
					>
						{c === 'all' ? '🌍 Усі' : c}
					</button>
				))}
			</div>

			{/* ═══ FEATURED — large editorial cards ═══ */}
			{featured.length > 0 && (
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(2,1fr)',
						gap: 16,
						marginBottom: 20
					}}
				>
					{featured.map((b, i) => {
						const isH = hov === b.name;
						const isExp = expandedBrand === b.name;
						return (
							<div
								key={b.name}
								onMouseEnter={() => setHov(b.name)}
								onMouseLeave={() => setHov(null)}
								style={{
									position: 'relative',
									overflow: 'hidden',
									background: '#fff',
									borderRadius: 24,
									border: isH ? `1.5px solid ${b.cl}30` : '1.5px solid #e7e5e4',
									cursor: 'pointer',
									transition: 'all .4s cubic-bezier(.4,0,.2,1)',
									transform: isH ? 'translateY(-5px)' : 'none',
									boxShadow: isH ? `0 24px 56px ${b.cl}0a` : '0 1px 3px #00000004',
									animation: `up .45s ease ${i * 0.08}s both`
								}}
							>
								{/* Color accent bar */}
								<div
									style={{
										height: 4,
										background: `linear-gradient(90deg,${b.cl},${b.cl}60)`,
										opacity: isH ? 1 : 0.2,
										transition: 'opacity .4s'
									}}
								/>
								{/* Glow */}
								<div
									style={{
										position: 'absolute',
										top: -30,
										right: -30,
										width: 120,
										height: 120,
										borderRadius: '50%',
										background: b.cl,
										opacity: isH ? 0.06 : 0,
										filter: 'blur(30px)',
										transition: 'opacity .4s'
									}}
								/>

								<div style={{ padding: '28px 28px 14px' }}>
									<div style={{ display: 'flex', gap: 18, position: 'relative' }}>
										<div
											style={{
												width: 64,
												height: 64,
												borderRadius: 18,
												background: b.cl + '0a',
												display: 'grid',
												placeItems: 'center',
												fontSize: 26,
												fontWeight: 800,
												color: b.cl,
												fontFamily: F,
												border: `2px solid ${b.cl}14`,
												flexShrink: 0,
												transition: 'transform .35s cubic-bezier(.34,1.56,.64,1)',
												transform: isH ? 'scale(1.1) rotate(-3deg)' : 'none'
											}}
										>
											{b.L}
										</div>
										<div style={{ flex: 1 }}>
											<div
												style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}
											>
												<span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-.03em' }}>
													{b.name}
												</span>
												<span
													style={{
														fontSize: 10,
														padding: '2px 9px',
														borderRadius: 99,
														background: b.cl + '0c',
														color: b.cl,
														fontWeight: 700,
														border: `1px solid ${b.cl}18`
													}}
												>
													{b.tag}
												</span>
											</div>
											<div
												style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}
											>
												<span style={{ fontSize: 11, color: '#a8a29e', fontWeight: 600 }}>
													{b.cat}
												</span>
												<span
													style={{ width: 3, height: 3, borderRadius: 99, background: '#d6d3d1' }}
												/>
												<span
													style={{ fontSize: 11, fontWeight: 700, fontFamily: M, color: '#57534e' }}
												>
													{b.users} users
												</span>
											</div>
											<p style={{ fontSize: 13, color: '#57534e', lineHeight: 1.55, margin: 0 }}>
												{b.d}
											</p>
										</div>
									</div>
								</div>

								{/* Expandable section */}
								<div style={{ padding: '0 28px 6px' }}>
									<button
										onClick={(e) => {
											e.stopPropagation();
											setExpandedBrand(isExp ? null : b.name);
										}}
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: 5,
											padding: '8px 0',
											border: 'none',
											background: 'none',
											cursor: 'pointer',
											fontFamily: F,
											fontSize: 12,
											fontWeight: 600,
											color: b.cl,
											transition: 'all .2s'
										}}
									>
										{isExp ? 'Менше' : 'Детальніше'}
										<svg
											width={10}
											height={10}
											viewBox="0 0 20 20"
											style={{
												transition: 'transform .3s',
												transform: isExp ? 'rotate(180deg)' : 'none'
											}}
										>
											<path
												d="M5 7.5L10 12.5L15 7.5"
												stroke="currentColor"
												strokeWidth={2.5}
												fill="none"
												strokeLinecap="round"
											/>
										</svg>
									</button>
								</div>
								<div
									style={{
										maxHeight: isExp ? 200 : 0,
										overflow: 'hidden',
										transition: 'max-height .4s cubic-bezier(.4,0,.2,1), opacity .3s',
										opacity: isExp ? 1 : 0
									}}
								>
									<div style={{ padding: '0 28px 22px' }}>
										<div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
											{['Надійний', 'Інноваційний', 'Глобальний'].map((t, j) => (
												<span
													key={j}
													style={{
														fontSize: 10,
														padding: '3px 10px',
														borderRadius: 8,
														background: '#f5f5f4',
														color: '#57534e',
														fontWeight: 600
													}}
												>
													{t}
												</span>
											))}
										</div>
										<div style={{ display: 'flex', gap: 12 }}>
											<div
												style={{
													flex: 1,
													padding: '12px 14px',
													borderRadius: 12,
													background: '#fafaf9',
													border: '1px solid #f0f0ef'
												}}
											>
												<div style={{ fontSize: 16, fontWeight: 800, fontFamily: M }}>
													{b.users}
												</div>
												<div style={{ fontSize: 10, color: '#a8a29e' }}>Користувачів</div>
											</div>
											<div
												style={{
													flex: 1,
													padding: '12px 14px',
													borderRadius: 12,
													background: '#fafaf9',
													border: '1px solid #f0f0ef'
												}}
											>
												<div
													style={{ fontSize: 16, fontWeight: 800, color: '#16a34a', fontFamily: M }}
												>
													★ 4.8
												</div>
												<div style={{ fontSize: 10, color: '#a8a29e' }}>Рейтинг</div>
											</div>
											<div
												style={{
													flex: 1,
													padding: '12px 14px',
													borderRadius: 12,
													background: '#fafaf9',
													border: '1px solid #f0f0ef'
												}}
											>
												<div style={{ fontSize: 16, fontWeight: 800, fontFamily: M }}>🇺🇦</div>
												<div style={{ fontSize: 10, color: '#a8a29e' }}>Зроблено в UA</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}

			{/* ═══ REST — compact grid ═══ */}
			{rest.length > 0 && (
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
						gap: 12,
						marginBottom: 56
					}}
				>
					{rest.map((b, i) => {
						const isH = hov === b.name;
						return (
							<div
								key={b.name}
								onMouseEnter={() => setHov(b.name)}
								onMouseLeave={() => setHov(null)}
								style={{
									background: '#fff',
									borderRadius: 18,
									padding: '24px 22px',
									border: isH ? `1.5px solid ${b.cl}28` : '1.5px solid #e7e5e4',
									cursor: 'pointer',
									transition: 'all .3s cubic-bezier(.4,0,.2,1)',
									transform: isH ? 'translateY(-3px)' : 'none',
									boxShadow: isH ? `0 12px 32px ${b.cl}08` : 'none',
									animation: `up .35s ease ${i * 0.05}s both`
								}}
							>
								<div style={{ display: 'flex', gap: 14 }}>
									<div
										style={{
											width: 48,
											height: 48,
											borderRadius: 14,
											background: b.cl + '0a',
											display: 'grid',
											placeItems: 'center',
											fontSize: 20,
											fontWeight: 800,
											color: b.cl,
											fontFamily: F,
											border: `1.5px solid ${b.cl}14`,
											flexShrink: 0,
											transition: 'transform .3s',
											transform: isH ? 'scale(1.08) rotate(-2deg)' : 'none'
										}}
									>
										{b.L}
									</div>
									<div style={{ flex: 1 }}>
										<div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
											<span style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-.01em' }}>
												{b.name}
											</span>
											<span
												style={{
													fontSize: 9,
													padding: '2px 7px',
													borderRadius: 99,
													background: b.cl + '0c',
													color: b.cl,
													fontWeight: 700
												}}
											>
												{b.tag}
											</span>
										</div>
										<p
											style={{
												fontSize: 12,
												color: '#78716c',
												lineHeight: 1.45,
												margin: '0 0 10px'
											}}
										>
											{b.d}
										</p>
										<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
											<span
												style={{ fontSize: 13, fontWeight: 700, fontFamily: M, color: '#1c1917' }}
											>
												{b.users}
											</span>
											<span style={{ fontSize: 10, color: '#a8a29e' }}>users</span>
											<span
												style={{
													marginLeft: 'auto',
													fontSize: 11,
													fontWeight: 700,
													color: b.cl,
													opacity: isH ? 1 : 0,
													transform: isH ? 'translateX(0)' : 'translateX(-6px)',
													transition: 'all .3s'
												}}
											>
												→
											</span>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}

			{/* ═══ SUCCESS STORIES ═══ */}
			<div style={{ marginBottom: 56 }}>
				<div style={{ textAlign: 'center', marginBottom: 28, animation: 'up .4s ease both' }}>
					<span
						style={{
							fontSize: 10,
							fontWeight: 700,
							color: blue,
							textTransform: 'uppercase',
							letterSpacing: '.1em',
							fontFamily: M
						}}
					>
						Історії переходу
					</span>
					<h2 style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-.03em', marginTop: 6 }}>
						Люди вже обрали українське
					</h2>
				</div>
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
					{stories.map((s, i) => (
						<div
							key={i}
							style={{
								background: '#fff',
								borderRadius: 22,
								padding: '26px 24px',
								border: '1px solid #e7e5e4',
								animation: `up .4s ease ${i * 0.08}s both`,
								transition: 'all .25s'
							}}
							onMouseOver={(e) => {
								e.currentTarget.style.transform = 'translateY(-3px)';
								e.currentTarget.style.boxShadow = `0 12px 32px ${s.cl}08`;
							}}
							onMouseOut={(e) => {
								e.currentTarget.style.transform = 'none';
								e.currentTarget.style.boxShadow = 'none';
							}}
						>
							{/* Stars */}
							<div style={{ marginBottom: 12 }}>
								{[1, 2, 3, 4, 5].map((j) => (
									<span
										key={j}
										style={{
											color: j <= s.stars ? '#FBBF24' : '#e7e5e4',
											fontSize: 14,
											marginRight: 1
										}}
									>
										★
									</span>
								))}
							</div>
							<p
								style={{
									fontSize: 14,
									color: '#44403c',
									lineHeight: 1.6,
									margin: '0 0 16px',
									fontStyle: 'italic'
								}}
							>
								«{s.text}»
							</p>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 10,
									paddingTop: 14,
									borderTop: '1px solid #f5f5f4'
								}}
							>
								<div
									style={{
										width: 34,
										height: 34,
										borderRadius: 99,
										background: s.cl + '0c',
										display: 'grid',
										placeItems: 'center',
										fontSize: 11,
										fontWeight: 800,
										color: s.cl,
										border: `1.5px solid ${s.cl}14`
									}}
								>
									{s.avatar}
								</div>
								<div>
									<div style={{ fontSize: 13, fontWeight: 700 }}>{s.user}</div>
									<div style={{ fontSize: 10, color: '#a8a29e' }}>перейшла на {s.brand}</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* ═══ TIMELINE ═══ */}
			<div style={{ marginBottom: 56 }}>
				<div style={{ textAlign: 'center', marginBottom: 32, animation: 'up .4s ease both' }}>
					<span
						style={{
							fontSize: 10,
							fontWeight: 700,
							color: '#f59e0b',
							textTransform: 'uppercase',
							letterSpacing: '.1em',
							fontFamily: M
						}}
					>
						Шлях UA-Tech
					</span>
					<h2 style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-.03em', marginTop: 6 }}>
						Історія українських інновацій
					</h2>
				</div>
				<div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
					{/* Vertical line */}
					<div
						style={{
							position: 'absolute',
							left: 24,
							top: 0,
							bottom: 0,
							width: 2,
							background: 'linear-gradient(180deg,#e7e5e4,#0057B720,#e7e5e4)',
							borderRadius: 1
						}}
					/>
					{milestones.map((m, i) => (
						<div
							key={i}
							style={{
								display: 'flex',
								gap: 20,
								marginBottom: 20,
								position: 'relative',
								animation: `slideR .4s ease ${i * 0.08}s both`
							}}
						>
							<div
								style={{
									width: 50,
									height: 50,
									borderRadius: 14,
									flexShrink: 0,
									background: '#fff',
									border: '2px solid #e7e5e4',
									display: 'grid',
									placeItems: 'center',
									fontSize: 11,
									fontWeight: 800,
									fontFamily: M,
									color: blue,
									position: 'relative',
									zIndex: 1,
									transition: 'all .25s'
								}}
								onMouseOver={(e) => {
									e.currentTarget.style.background = blue;
									e.currentTarget.style.color = '#fff';
									e.currentTarget.style.borderColor = blue;
									e.currentTarget.style.transform = 'scale(1.1)';
								}}
								onMouseOut={(e) => {
									e.currentTarget.style.background = '#fff';
									e.currentTarget.style.color = blue;
									e.currentTarget.style.borderColor = '#e7e5e4';
									e.currentTarget.style.transform = 'none';
								}}
							>
								{m.year}
							</div>
							<div
								style={{
									flex: 1,
									padding: '14px 18px',
									borderRadius: 16,
									background: '#fff',
									border: '1px solid #e7e5e4',
									transition: 'all .2s'
								}}
								onMouseOver={(e) => {
									e.currentTarget.style.transform = 'translateX(4px)';
									e.currentTarget.style.boxShadow = '0 4px 16px #00000006';
								}}
								onMouseOut={(e) => {
									e.currentTarget.style.transform = 'none';
									e.currentTarget.style.boxShadow = 'none';
								}}
							>
								<p
									style={{
										fontSize: 14,
										color: '#44403c',
										lineHeight: 1.5,
										margin: 0,
										fontWeight: 500
									}}
								>
									{m.event}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* ═══ CTA ═══ */}
			<div
				style={{
					position: 'relative',
					overflow: 'hidden',
					borderRadius: 28,
					padding: '48px 44px',
					background: `linear-gradient(135deg,${blue} 0%,#1e40af 100%)`,
					color: '#fff',
					textAlign: 'center',
					animation: 'up .5s ease .2s both'
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: -40,
						left: '50%',
						marginLeft: -100,
						width: 200,
						height: 200,
						borderRadius: '50%',
						background: gold,
						opacity: 0.08,
						filter: 'blur(50px)',
						animation: 'waveFloat 10s ease infinite'
					}}
				/>
				<div style={{ position: 'relative' }}>
					<div style={{ fontSize: 40, marginBottom: 16, animation: 'float 5s ease infinite' }}>
						🇺🇦
					</div>
					<h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-.04em', marginBottom: 10 }}>
						Кожен вибір має значення
					</h2>
					<p
						style={{
							fontSize: 15,
							color: '#ffffffa0',
							maxWidth: 440,
							margin: '0 auto 28px',
							lineHeight: 1.55
						}}
					>
						Обираючи українське — ти створюєш робочі місця, підтримуєш інновації та наближаєш
						перемогу 💛
					</p>
					<div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
						<button
							style={{
								padding: '13px 28px',
								borderRadius: 14,
								border: 'none',
								background: '#fff',
								color: blue,
								fontSize: 14,
								fontWeight: 800,
								cursor: 'pointer',
								fontFamily: F,
								transition: 'all .2s'
							}}
							onMouseOver={(e) => {
								e.target.style.transform = 'translateY(-2px)';
								e.target.style.boxShadow = '0 8px 24px #00000020';
							}}
							onMouseOut={(e) => {
								e.target.style.transform = 'none';
								e.target.style.boxShadow = 'none';
							}}
						>
							Знайти альтернативу
						</button>
						<button
							style={{
								padding: '13px 28px',
								borderRadius: 14,
								border: '1.5px solid #ffffff30',
								background: 'transparent',
								color: '#fff',
								fontSize: 14,
								fontWeight: 700,
								cursor: 'pointer',
								fontFamily: F,
								transition: 'all .2s'
							}}
							onMouseOver={(e) => {
								e.target.style.background = '#ffffff14';
							}}
							onMouseOut={(e) => {
								e.target.style.background = 'transparent';
							}}
						>
							Додати бренд →
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

/* ── CASHBACK ── */
function Cashback() {
	const [search, setSearch] = useState('');
	const [activeCat, setActiveCat] = useState(null);
	const [checked, setChecked] = useState(null);
	const [showRes, setShowRes] = useState(false);
	const [hovCard, setHovCard] = useState(null);
	const [stepHov, setStepHov] = useState(null);
	const cRef = useRef(null);
	const inRef = useRef(null);

	const filtered = CB.filter((p) => {
		const mc = !activeCat || p.cat === activeCat;
		const ms =
			!search ||
			p.name.toLowerCase().includes(search.toLowerCase()) ||
			p.brand.toLowerCase().includes(search.toLowerCase());
		return mc && ms;
	});

	const doCheck = (val) => {
		const q = (val || search).trim().toLowerCase();
		if (!q) return;
		const found = CB.find(
			(p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
		);
		setChecked(found || null);
		setShowRes(true);
		setTimeout(() => cRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
	};

	const selectProduct = (p) => {
		setSearch(p.name);
		setChecked(p);
		setShowRes(true);
		setTimeout(() => cRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
	};

	const catCounts = {};
	CB_CATS.forEach((c) => {
		catCounts[c] = CB.filter((p) => p.cat === c).length;
	});
	const g = '#065f46';

	return (
		<section style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px 80px' }}>
			{/* ═══ HERO — full bleed ═══ */}
			<div
				style={{
					position: 'relative',
					overflow: 'hidden',
					borderRadius: '0 0 36px 36px',
					padding: '56px 48px 48px',
					marginBottom: 44,
					background: 'linear-gradient(135deg,#064e3b 0%,#065f46 30%,#047857 70%,#059669 100%)',
					color: '#fff',
					animation: 'fadeIn .4s ease both'
				}}
			>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						opacity: 0.025,
						backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)',
						backgroundSize: '22px 22px'
					}}
				/>
				<div
					style={{
						position: 'absolute',
						top: -50,
						right: 40,
						width: 300,
						height: 300,
						borderRadius: '50%',
						background: '#fbbf24',
						opacity: 0.06,
						filter: 'blur(60px)',
						animation: 'waveFloat 14s ease infinite'
					}}
				/>
				<div
					style={{
						position: 'absolute',
						bottom: -40,
						left: -20,
						width: 220,
						height: 220,
						borderRadius: '50%',
						background: '#34d399',
						opacity: 0.07,
						filter: 'blur(50px)',
						animation: 'waveFloat 14s ease infinite 7s'
					}}
				/>
				<div
					style={{
						position: 'absolute',
						top: '50%',
						right: '15%',
						width: 150,
						height: 150,
						borderRadius: '50%',
						background: '#a7f3d0',
						opacity: 0.04,
						filter: 'blur(40px)',
						animation: 'waveFloat 10s ease infinite 3s'
					}}
				/>

				<div style={{ position: 'relative' }}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'flex-start',
							flexWrap: 'wrap',
							gap: 32,
							marginBottom: 40
						}}
					>
						<div style={{ maxWidth: 480, animation: 'slideR .5s ease .1s both' }}>
							<div
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									gap: 6,
									padding: '5px 14px 5px 7px',
									borderRadius: 99,
									background: '#fbbf2418',
									border: '1px solid #fbbf2430',
									marginBottom: 20
								}}
							>
								<span
									style={{
										width: 22,
										height: 22,
										borderRadius: 99,
										background: '#fbbf2430',
										display: 'grid',
										placeItems: 'center',
										fontSize: 11
									}}
								>
									💳
								</span>
								<span
									style={{
										fontSize: 10,
										fontWeight: 700,
										color: '#fbbf24',
										textTransform: 'uppercase',
										letterSpacing: '.08em',
										fontFamily: M
									}}
								>
									Національний кешбек
								</span>
							</div>
							<h1
								style={{
									fontSize: 'clamp(30px,5vw,48px)',
									fontWeight: 900,
									lineHeight: 1.05,
									letterSpacing: '-.05em',
									margin: '0 0 14px'
								}}
							>
								Купуй{' '}
								<span
									style={{
										background: 'linear-gradient(135deg,#fbbf24,#f59e0b)',
										WebkitBackgroundClip: 'text',
										WebkitTextFillColor: 'transparent'
									}}
								>
									українське
								</span>
								<br />— отримуй кешбек
							</h1>
							<p style={{ fontSize: 16, color: '#ffffffaa', lineHeight: 1.55, margin: 0 }}>
								Повернення 10% вартості за товари українського виробництва через додаток Дія
							</p>
						</div>

						{/* Stats cards */}
						<div style={{ display: 'flex', gap: 12, animation: 'slideL .5s ease .2s both' }}>
							{[
								['10%', 'кешбек', '💰', '#fbbf24'],
								[String(CB_CATS.length), 'категорій', '📂', '#34d399'],
								[`${CB.length}+`, 'брендів', '🏷️', '#a7f3d0']
							].map(([v, l, ic, accent], i) => (
								<div
									key={i}
									style={{
										background: '#ffffff08',
										backdropFilter: 'blur(12px)',
										borderRadius: 20,
										padding: '20px 22px',
										border: '1px solid #ffffff10',
										minWidth: 110,
										textAlign: 'center',
										animation: `up .4s ease ${0.25 + i * 0.08}s both`
									}}
								>
									<div
										style={{
											width: 40,
											height: 40,
											borderRadius: 12,
											background: accent + '18',
											display: 'grid',
											placeItems: 'center',
											fontSize: 18,
											margin: '0 auto 10px'
										}}
									>
										{ic}
									</div>
									<div
										style={{
											fontSize: 26,
											fontWeight: 800,
											fontFamily: M,
											letterSpacing: '-.03em'
										}}
									>
										{v}
									</div>
									<div style={{ fontSize: 10, color: '#ffffff50', marginTop: 3 }}>{l}</div>
								</div>
							))}
						</div>
					</div>

					{/* How it works — inside hero */}
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(3,1fr)',
							gap: 12,
							animation: 'up .5s ease .35s both'
						}}
					>
						{[
							['1', 'Обирай', 'Купуй товари українського виробництва в магазинах', '🛒'],
							['2', 'Скануй', 'Відскануй QR-код чеку через додаток Дія', '📱'],
							['3', 'Отримуй', '10% повернеться на картку протягом 5 днів', '💸']
						].map(([n, t, d, ic], i) => (
							<div
								key={i}
								onMouseEnter={() => setStepHov(i)}
								onMouseLeave={() => setStepHov(null)}
								style={{
									padding: '20px 18px',
									borderRadius: 18,
									background: '#ffffff08',
									border: stepHov === i ? '1px solid #ffffff20' : '1px solid #ffffff08',
									transition: 'all .3s',
									cursor: 'default',
									transform: stepHov === i ? 'translateY(-2px)' : 'none'
								}}
							>
								<div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
									<div
										style={{
											width: 36,
											height: 36,
											borderRadius: 10,
											background: stepHov === i ? '#fbbf2420' : '#ffffff0c',
											display: 'grid',
											placeItems: 'center',
											fontSize: 16,
											transition: 'all .3s'
										}}
									>
										{ic}
									</div>
									<div>
										<span
											style={{ fontSize: 10, fontFamily: M, color: '#fbbf24', fontWeight: 700 }}
										>
											Крок {n}
										</span>
										<div style={{ fontWeight: 800, fontSize: 15 }}>{t}</div>
									</div>
								</div>
								<p style={{ fontSize: 12, color: '#ffffff60', lineHeight: 1.5, margin: 0 }}>{d}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* ═══ VERIFICATION TOOL ═══ */}
			<div
				ref={cRef}
				style={{
					background: '#fff',
					borderRadius: 28,
					padding: '40px 36px',
					border: '1.5px solid #e7e5e4',
					marginBottom: 44,
					boxShadow: '0 4px 32px #00000004',
					animation: 'up .4s ease .1s both'
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
					<div
						style={{
							width: 40,
							height: 40,
							borderRadius: 12,
							background: '#ecfdf5',
							border: '1.5px solid #bbf7d0',
							display: 'grid',
							placeItems: 'center',
							fontSize: 18
						}}
					>
						🔍
					</div>
					<div>
						<h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: '-.02em' }}>
							Перевірити продукт
						</h2>
						<p style={{ fontSize: 12, color: '#78716c', margin: 0 }}>
							Дізнайтеся чи діє кешбек на ваш товар
						</p>
					</div>
				</div>

				<div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
					<div
						style={{
							flex: 1,
							display: 'flex',
							alignItems: 'center',
							gap: 12,
							padding: '12px 22px',
							borderRadius: 99,
							border: '2px solid #e7e5e4',
							background: BG,
							transition: 'all .25s'
						}}
						onClick={() => inRef.current?.focus()}
						onFocusCapture={() => {}}
					>
						<svg
							width={20}
							height={20}
							viewBox="0 0 24 24"
							fill="none"
							stroke="#a8a29e"
							strokeWidth={2.5}
							style={{ flexShrink: 0 }}
						>
							<circle cx={11} cy={11} r={7} />
							<line x1={16.5} y1={16.5} x2={21} y2={21} />
						</svg>
						<input
							ref={inRef}
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
								setShowRes(false);
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter') doCheck();
							}}
							onFocus={(e) => (e.target.closest('div').style.borderColor = g)}
							onBlur={(e) => (e.target.closest('div').style.borderColor = '#e7e5e4')}
							placeholder="Назва товару або бренду…"
							style={{
								flex: 1,
								border: 'none',
								outline: 'none',
								fontSize: 16,
								fontWeight: 500,
								fontFamily: F,
								color: '#1c1917',
								background: 'transparent'
							}}
						/>
						{search && (
							<button
								onClick={() => {
									setSearch('');
									setShowRes(false);
									inRef.current?.focus();
								}}
								style={{
									width: 24,
									height: 24,
									borderRadius: 99,
									border: 'none',
									background: '#f5f5f4',
									cursor: 'pointer',
									fontSize: 11,
									color: '#78716c',
									display: 'grid',
									placeItems: 'center'
								}}
							>
								✕
							</button>
						)}
					</div>
					<button
						onClick={() => doCheck()}
						style={{
							padding: '14px 32px',
							borderRadius: 99,
							border: 'none',
							background: g,
							color: '#fff',
							fontSize: 15,
							fontWeight: 700,
							cursor: 'pointer',
							fontFamily: F,
							transition: 'all .2s',
							flexShrink: 0,
							boxShadow: '0 4px 16px #06593f20'
						}}
						onMouseOver={(e) => {
							e.target.style.background = '#047857';
							e.target.style.transform = 'scale(1.03)';
							e.target.style.boxShadow = '0 8px 24px #06593f30';
						}}
						onMouseOut={(e) => {
							e.target.style.background = g;
							e.target.style.transform = 'none';
							e.target.style.boxShadow = '0 4px 16px #06593f20';
						}}
					>
						Перевірити
					</button>
				</div>

				{/* Result */}
				{showRes && (
					<div style={{ animation: 'pop .35s cubic-bezier(.34,1.56,.64,1)', marginBottom: 6 }}>
						{checked ? (
							<div
								style={{
									borderRadius: 20,
									overflow: 'hidden',
									border: '2px solid #059669',
									background: 'linear-gradient(135deg,#ecfdf5,#f0fdf4,#ecfdf5)'
								}}
							>
								<div style={{ padding: '26px 28px' }}>
									<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
										<div
											style={{
												width: 56,
												height: 56,
												borderRadius: 16,
												background: '#05966915',
												display: 'grid',
												placeItems: 'center',
												border: '2px solid #05966920',
												animation: 'scaleIn .4s cubic-bezier(.34,1.56,.64,1) .1s both'
											}}
										>
											<svg
												width={30}
												height={30}
												viewBox="0 0 24 24"
												fill="none"
												stroke="#059669"
												strokeWidth={3}
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path d="M20 6L9 17l-5-5" />
											</svg>
										</div>
										<div style={{ flex: 1, animation: 'slideR .35s ease .15s both' }}>
											<div
												style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}
											>
												<span style={{ fontWeight: 900, fontSize: 19, color: g }}>Кешбек діє!</span>
												<span
													style={{
														fontSize: 13,
														padding: '4px 14px',
														borderRadius: 99,
														background: '#059669',
														color: '#fff',
														fontWeight: 700,
														fontFamily: M,
														boxShadow: '0 2px 8px #05966930'
													}}
												>
													−{checked.pct}%
												</span>
											</div>
											<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
												{[[checked.name, checked.cl, checked.L]].map(([v, cl, l], i) => (
													<div
														key={i}
														style={{
															display: 'inline-flex',
															alignItems: 'center',
															gap: 6,
															padding: '4px 12px 4px 4px',
															borderRadius: 99,
															background: '#fff',
															border: '1px solid #bbf7d0'
														}}
													>
														<div
															style={{
																width: 22,
																height: 22,
																borderRadius: 6,
																background: cl + '10',
																display: 'grid',
																placeItems: 'center',
																fontSize: 9,
																fontWeight: 800,
																color: cl
															}}
														>
															{l}
														</div>
														<span style={{ fontSize: 12, fontWeight: 700, color: g }}>{v}</span>
													</div>
												))}
												<span
													style={{
														fontSize: 12,
														color: '#065f46aa',
														padding: '4px 0',
														display: 'flex',
														alignItems: 'center',
														gap: 4
													}}
												>
													{checked.brand} · {checked.cat} · 📍 {checked.origin}
												</span>
											</div>
										</div>
									</div>
									{/* Tips */}
									<div
										style={{
											display: 'flex',
											gap: 8,
											marginTop: 18,
											animation: 'up .3s ease .3s both'
										}}
									>
										{[
											['Відскануйте чек у Дії', '📱'],
											['Кешбек за 5 днів', '⏱️'],
											['На будь-яку картку', '💳']
										].map(([t, ic], i) => (
											<div
												key={i}
												style={{
													flex: 1,
													padding: '10px 12px',
													borderRadius: 12,
													background: '#fff',
													border: '1px solid #bbf7d0',
													display: 'flex',
													alignItems: 'center',
													gap: 6
												}}
											>
												<span style={{ fontSize: 14 }}>{ic}</span>
												<span style={{ fontSize: 11, color: g, fontWeight: 600 }}>{t}</span>
											</div>
										))}
									</div>
								</div>
							</div>
						) : (
							<div
								style={{
									borderRadius: 20,
									overflow: 'hidden',
									border: '2px solid #f87171',
									background: 'linear-gradient(135deg,#fef2f2,#fff1f2)'
								}}
							>
								<div style={{ padding: '26px 28px' }}>
									<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
										<div
											style={{
												width: 56,
												height: 56,
												borderRadius: 16,
												background: '#f8717112',
												display: 'grid',
												placeItems: 'center',
												animation: 'scaleIn .3s ease both'
											}}
										>
											<svg
												width={28}
												height={28}
												viewBox="0 0 24 24"
												fill="none"
												stroke="#dc2626"
												strokeWidth={3}
												strokeLinecap="round"
											>
												<line x1={7} y1={7} x2={17} y2={17} />
												<line x1={17} y1={7} x2={7} y2={17} />
											</svg>
										</div>
										<div style={{ animation: 'slideR .3s ease .1s both' }}>
											<div
												style={{ fontWeight: 900, fontSize: 19, color: '#991b1b', marginBottom: 4 }}
											>
												Не знайдено
											</div>
											<div style={{ fontSize: 13, color: '#991b1baa' }}>
												«{search}» не є учасником програми кешбеку
											</div>
										</div>
									</div>
									<div
										style={{
											marginTop: 16,
											padding: '12px 16px',
											borderRadius: 12,
											background: '#fff',
											border: '1px solid #fecaca',
											animation: 'up .3s ease .2s both'
										}}
									>
										<span style={{ fontSize: 12, color: '#78716c' }}>
											💡 Спробуйте інший запит або перегляньте каталог нижче
										</span>
									</div>
								</div>
							</div>
						)}
					</div>
				)}

				{/* Popular quick-checks */}
				{!showRes && (
					<div style={{ animation: 'up .3s ease .15s both' }}>
						<p
							style={{
								fontSize: 10,
								fontWeight: 700,
								color: '#a8a29e',
								textTransform: 'uppercase',
								letterSpacing: '.08em',
								marginBottom: 10,
								fontFamily: M
							}}
						>
							Популярні бренди
						</p>
						<div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
							{CB.filter((p) => p.pop).map((p, i) => (
								<button
									key={p.name}
									onClick={() => selectProduct(p)}
									style={{
										display: 'inline-flex',
										alignItems: 'center',
										gap: 6,
										padding: '8px 16px 8px 8px',
										borderRadius: 99,
										border: '1.5px solid #e7e5e4',
										background: '#fff',
										color: '#44403c',
										fontSize: 12,
										fontWeight: 600,
										cursor: 'pointer',
										fontFamily: F,
										transition: 'all .2s',
										animation: `scaleIn .25s ease ${i * 0.04}s both`
									}}
									onMouseOver={(e) => {
										e.currentTarget.style.background = g;
										e.currentTarget.style.color = '#fff';
										e.currentTarget.style.borderColor = g;
										e.currentTarget.style.transform = 'translateY(-1px)';
									}}
									onMouseOut={(e) => {
										e.currentTarget.style.background = '#fff';
										e.currentTarget.style.color = '#44403c';
										e.currentTarget.style.borderColor = '#e7e5e4';
										e.currentTarget.style.transform = 'none';
									}}
								>
									<div
										style={{
											width: 22,
											height: 22,
											borderRadius: 7,
											background: p.cl + '10',
											display: 'grid',
											placeItems: 'center',
											fontSize: 9,
											fontWeight: 800,
											color: p.cl,
											border: `1px solid ${p.cl}15`
										}}
									>
										{p.L}
									</div>
									{p.name}
								</button>
							))}
						</div>
					</div>
				)}
			</div>

			{/* ═══ CATEGORY CHIPS ═══ */}
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
				<button
					onClick={() => setActiveCat(null)}
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 6,
						padding: '9px 16px',
						borderRadius: 12,
						cursor: 'pointer',
						background: !activeCat ? g : '#fff',
						border: !activeCat ? `1.5px solid ${g}` : '1.5px solid #e7e5e4',
						color: !activeCat ? '#fff' : '#57534e',
						fontSize: 13,
						fontWeight: !activeCat ? 700 : 600,
						fontFamily: F,
						transition: 'all .2s',
						animation: 'scaleIn .25s ease both'
					}}
				>
					Усі <span style={{ fontSize: 10, fontFamily: M, opacity: 0.6 }}>{CB.length}</span>
				</button>
				{CB_CATS.map((c, i) => {
					const n = catCounts[c] || 0;
					if (!n) return null;
					const act = activeCat === c;
					return (
						<button
							key={c}
							onClick={() => setActiveCat(act ? null : c)}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 5,
								padding: '9px 14px',
								borderRadius: 12,
								cursor: 'pointer',
								background: act ? '#f0fdf4' : '#fff',
								border: act ? `1.5px solid #bbf7d0` : '1.5px solid #e7e5e4',
								color: act ? g : '#57534e',
								fontSize: 13,
								fontWeight: act ? 700 : 500,
								fontFamily: F,
								transition: 'all .2s',
								animation: `scaleIn .25s ease ${(i + 1) * 0.03}s both`
							}}
						>
							{c}
							<span
								style={{
									fontSize: 10,
									fontFamily: M,
									padding: '1px 6px',
									borderRadius: 5,
									background: act ? '#bbf7d020' : '#f5f5f4',
									color: act ? g : '#a8a29e'
								}}
							>
								{n}
							</span>
						</button>
					);
				})}
			</div>

			{/* ═══ PRODUCT GRID ═══ */}
			<div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
				{/* Sidebar */}
				<div
					style={{
						width: 200,
						flexShrink: 0,
						position: 'sticky',
						top: 76,
						animation: 'slideR .35s ease .2s both'
					}}
				>
					<div
						style={{
							background: '#fff',
							borderRadius: 20,
							padding: '20px 16px',
							border: '1px solid #e7e5e4',
							marginBottom: 14
						}}
					>
						<p
							style={{
								fontSize: 10,
								fontWeight: 700,
								color: '#a8a29e',
								textTransform: 'uppercase',
								letterSpacing: '.08em',
								marginBottom: 10,
								fontFamily: M
							}}
						>
							Категорії
						</p>
						{CB_CATS.map((c, i) => {
							const n = catCounts[c] || 0;
							if (!n) return null;
							const act = activeCat === c;
							return (
								<button
									key={c}
									onClick={() => setActiveCat(act ? null : c)}
									style={{
										width: '100%',
										padding: '8px 10px',
										borderRadius: 9,
										border: 'none',
										background: act ? '#f0fdf4' : 'transparent',
										color: act ? g : '#78716c',
										fontSize: 12,
										fontWeight: act ? 700 : 500,
										cursor: 'pointer',
										textAlign: 'left',
										fontFamily: F,
										marginBottom: 1,
										transition: 'all .15s',
										animation: `slideR .25s ease ${i * 0.03}s both`
									}}
									onMouseOver={(e) => {
										if (!act) e.currentTarget.style.background = '#fafaf9';
									}}
									onMouseOut={(e) => {
										if (!act) e.currentTarget.style.background = act ? '#f0fdf4' : 'transparent';
									}}
								>
									{c}{' '}
									<span
										style={{
											float: 'right',
											fontFamily: M,
											fontSize: 10,
											color: act ? g : '#d6d3d1'
										}}
									>
										{n}
									</span>
								</button>
							);
						})}
					</div>

					{/* How it works card */}
					<div
						style={{
							padding: '20px 16px',
							borderRadius: 20,
							background: 'linear-gradient(135deg,#ecfdf5,#f0fdf4)',
							border: '1.5px solid #bbf7d0'
						}}
					>
						<div style={{ fontSize: 12, fontWeight: 800, color: g, marginBottom: 10 }}>
							💡 Як отримати?
						</div>
						{['Купуй товари з позначкою 🇺🇦', 'Скануй чек у Дії', 'Отримуй 10% на картку'].map(
							(s, i) => (
								<div
									key={i}
									style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}
								>
									<div
										style={{
											width: 20,
											height: 20,
											borderRadius: 6,
											background: g + '12',
											display: 'grid',
											placeItems: 'center',
											fontSize: 10,
											fontWeight: 800,
											color: g,
											flexShrink: 0,
											marginTop: 1
										}}
									>
										{i + 1}
									</div>
									<span style={{ fontSize: 11, color: '#065f46cc', lineHeight: 1.4 }}>{s}</span>
								</div>
							)
						)}
					</div>
				</div>

				{/* Grid */}
				<div style={{ flex: 1 }}>
					{/* Count bar */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginBottom: 14,
							padding: '0 2px'
						}}
					>
						<span style={{ fontSize: 12, color: '#a8a29e' }}>
							<strong style={{ color: '#1c1917', fontFamily: M }}>{filtered.length}</strong>{' '}
							{filtered.length === 1 ? 'продукт' : 'продуктів'}
							{activeCat && (
								<>
									{' '}
									· <strong style={{ color: g }}>{activeCat}</strong>
								</>
							)}
						</span>
						{(search || activeCat) && (
							<button
								onClick={() => {
									setActiveCat(null);
									setSearch('');
									setShowRes(false);
								}}
								style={{
									fontSize: 11,
									fontWeight: 600,
									color: '#a8a29e',
									background: 'none',
									border: 'none',
									cursor: 'pointer',
									fontFamily: F,
									transition: 'color .15s'
								}}
								onMouseOver={(e) => (e.target.style.color = '#1c1917')}
								onMouseOut={(e) => (e.target.style.color = '#a8a29e')}
							>
								Скинути фільтри
							</button>
						)}
					</div>

					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))',
							gap: 12
						}}
					>
						{filtered.map((p, i) => {
							const isH = hovCard === p.name;
							return (
								<div
									key={p.name}
									onMouseEnter={() => setHovCard(p.name)}
									onMouseLeave={() => setHovCard(null)}
									onClick={() => selectProduct(p)}
									style={{
										position: 'relative',
										overflow: 'hidden',
										background: '#fff',
										borderRadius: 20,
										padding: '22px 20px',
										border: isH ? `1.5px solid ${p.cl}35` : '1.5px solid #e7e5e4',
										cursor: 'pointer',
										transition: 'all .3s cubic-bezier(.4,0,.2,1)',
										transform: isH ? 'translateY(-3px)' : 'none',
										boxShadow: isH ? `0 16px 40px ${p.cl}0a` : '0 1px 3px #00000003',
										animation: `up .3s ease ${i * 0.04}s both`
									}}
								>
									{/* Glow */}
									<div
										style={{
											position: 'absolute',
											top: -20,
											right: -20,
											width: 70,
											height: 70,
											borderRadius: '50%',
											background: p.cl,
											opacity: isH ? 0.06 : 0,
											filter: 'blur(20px)',
											transition: 'opacity .3s'
										}}
									/>

									<div style={{ position: 'relative' }}>
										<div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
											<div
												style={{
													width: 48,
													height: 48,
													borderRadius: 14,
													background: p.cl + '0c',
													display: 'grid',
													placeItems: 'center',
													fontSize: 16,
													fontWeight: 800,
													color: p.cl,
													fontFamily: F,
													border: `2px solid ${p.cl}14`,
													flexShrink: 0,
													transition: 'transform .3s',
													transform: isH ? 'scale(1.08) rotate(-3deg)' : 'none'
												}}
											>
												{p.L}
											</div>
											<div style={{ flex: 1 }}>
												<div
													style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}
												>
													<span style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-.01em' }}>
														{p.name}
													</span>
												</div>
												<div style={{ fontSize: 11, color: '#a8a29e' }}>{p.brand}</div>
											</div>
										</div>

										{/* Meta row */}
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
												padding: '10px 12px',
												borderRadius: 12,
												background: '#fafaf9',
												border: '1px solid #f5f5f4'
											}}
										>
											<div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
												<span style={{ fontSize: 11, color: '#78716c' }}>{p.cat}</span>
												<span
													style={{ width: 3, height: 3, borderRadius: 99, background: '#d6d3d1' }}
												/>
												<span style={{ fontSize: 11, color: '#78716c' }}>📍 {p.origin}</span>
											</div>
											<span
												style={{
													fontSize: 12,
													padding: '3px 10px',
													borderRadius: 99,
													background: '#ecfdf5',
													color: '#059669',
													fontWeight: 700,
													fontFamily: M,
													border: '1px solid #bbf7d0',
													transition: 'all .2s',
													transform: isH ? 'scale(1.06)' : 'none'
												}}
											>
												−{p.pct}%
											</span>
										</div>

										{/* Verified badge */}
										{p.v && (
											<div
												style={{
													display: 'flex',
													alignItems: 'center',
													gap: 4,
													marginTop: 10,
													opacity: isH ? 1 : 0.4,
													transition: 'opacity .3s'
												}}
											>
												<svg width={12} height={12} viewBox="0 0 24 24" fill="#059669">
													<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
												</svg>
												<span style={{ fontSize: 10, color: '#059669', fontWeight: 600 }}>
													Верифіковано
												</span>
											</div>
										)}
									</div>
								</div>
							);
						})}
					</div>

					{filtered.length === 0 && (
						<div
							style={{
								textAlign: 'center',
								padding: 72,
								background: '#fff',
								borderRadius: 28,
								border: '1px solid #e7e5e4',
								animation: 'scaleIn .4s ease both'
							}}
						>
							<div style={{ fontSize: 48, marginBottom: 16, animation: 'float 3s ease infinite' }}>
								📭
							</div>
							<h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Нічого не знайдено</h3>
							<p style={{ fontSize: 14, color: '#78716c', maxWidth: 300, margin: '0 auto 20px' }}>
								Спробуйте інший запит або оберіть категорію
							</p>
							<button
								onClick={() => {
									setActiveCat(null);
									setSearch('');
									setShowRes(false);
								}}
								style={{
									padding: '10px 24px',
									borderRadius: 12,
									border: '1.5px solid #e7e5e4',
									background: '#fff',
									fontSize: 13,
									fontWeight: 700,
									cursor: 'pointer',
									fontFamily: F
								}}
							>
								Показати все
							</button>
						</div>
					)}

					{/* Summary */}
					{filtered.length > 0 && (
						<div
							style={{
								textAlign: 'center',
								padding: '36px 0 0',
								animation: 'up .4s ease .2s both'
							}}
						>
							<p style={{ fontSize: 12, color: '#a8a29e' }}>
								Усього <strong style={{ color: '#1c1917' }}>{CB.length}</strong> брендів у{' '}
								<strong style={{ color: '#1c1917' }}>{CB_CATS.length}</strong> категоріях · Кешбек{' '}
								<strong style={{ color: g }}>10%</strong> через Дію
							</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}

/* ── PROFILE ── */
function Profile({ goTo }) {
	const [tab, setTab] = useState('overview');
	const [editName, setEditName] = useState(false);
	const [name, setName] = useState('Олена Коваленко');
	const [nameIn, setNameIn] = useState(name);
	const [hovBadge, setHovBadge] = useState(null);

	const u = {
		av: 'ОК',
		email: 'olena.k@gmail.com',
		since: 'Лютий 2025',
		city: 'Київ',
		lvl: 4,
		xp: 720,
		xpN: 1000,
		rep: 1840
	};
	const badges = [
		{ ic: '🏅', n: 'Новачок', d: 'Перший відгук', earned: true },
		{ ic: '⭐', n: 'Критик', d: '10+ відгуків', earned: true },
		{ ic: '🔥', n: 'Активіст', d: '30 днів поспіль', earned: true },
		{ ic: '💎', n: 'Експерт', d: '50+ корисних', earned: true },
		{ ic: '🇺🇦', n: 'Патріот', d: '5+ переходів на UA', earned: true },
		{ ic: '👑', n: 'Легенда', d: '100+ відгуків', earned: false }
	];
	const stats = [
		{ v: 47, l: 'Відгуків', ic: '✍️', cl: blue },
		{ v: 312, l: 'Корисних', ic: '👍', cl: '#059669' },
		{ v: 12, l: 'Переходів', ic: '🔄', cl: '#f59e0b' },
		{ v: 8, l: 'Обраних', ic: '❤️', cl: '#e11d48' }
	];
	const reviews = [
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
	const favs = [
		{ n: 'Signal', cl: '#3A76F0', L: 'S', ratio: 92, cat: 'Месенджери' },
		{ n: 'Brave', cl: '#FB542B', L: 'B', ratio: 95, cat: 'Браузери' },
		{ n: 'Megogo', cl: '#6C3FB5', L: 'Me', ratio: 86, cat: 'Стрімінг' },
		{ n: 'Uklon', cl: '#00C853', L: 'U', ratio: 93, cat: 'Таксі' },
		{ n: 'ProtonMail', cl: '#6D4AFF', L: 'P', ratio: 90, cat: 'Пошта' },
		{ n: 'ESET NOD32', cl: '#00B956', L: 'E', ratio: 91, cat: 'Безпека' },
		{ n: 'BAS', cl: '#0057B7', L: 'B', ratio: 89, cat: 'ERP' },
		{ n: 'Dilovod', cl: '#FF6B00', L: 'D', ratio: 84, cat: 'ERP' }
	];
	const activity = [
		{ t: 'Залишила відгук на Signal', time: '3 дні тому', ic: '✍️', cl: '#3A76F0' },
		{ t: 'Перейшла Telegram → Signal', time: '3 дні тому', ic: '🔄', cl: '#16a34a' },
		{ t: 'Залишила відгук на Brave', time: '1 тиждень', ic: '✍️', cl: '#FB542B' },
		{ t: 'Додала Megogo в обрані', time: '1 тиждень', ic: '❤️', cl: '#e11d48' },
		{ t: 'Отримала бейдж «Експерт»', time: '2 тижні', ic: '💎', cl: '#8b5cf6' },
		{ t: 'Перейшла Касперський → ESET', time: '3 тижні', ic: '🔄', cl: '#16a34a' }
	];
	const pTabs = [
		{ id: 'overview', l: 'Огляд', ic: '📊' },
		{ id: 'reviews', l: `Відгуки (${reviews.length})`, ic: '✍️' },
		{ id: 'favorites', l: `Обрані (${favs.length})`, ic: '❤️' },
		{ id: 'settings', l: 'Налаштування', ic: '⚙️' }
	];
	const xpPct = Math.round((u.xp / u.xpN) * 100);

	return (
		<section style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px 80px' }}>
			{/* ═══ PROFILE HERO BANNER ═══ */}
			<div
				style={{
					position: 'relative',
					overflow: 'hidden',
					borderRadius: '0 0 36px 36px',
					marginBottom: 0,
					animation: 'fadeIn .4s ease both'
				}}
			>
				{/* Dark gradient bg */}
				<div
					style={{
						padding: '52px 44px 90px',
						position: 'relative',
						background: `linear-gradient(135deg,#0c0a09 0%,#1c1917 40%,#292524 100%)`
					}}
				>
					<div
						style={{
							position: 'absolute',
							inset: 0,
							opacity: 0.02,
							backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)',
							backgroundSize: '22px 22px'
						}}
					/>
					<div
						style={{
							position: 'absolute',
							top: -40,
							right: 80,
							width: 240,
							height: 240,
							borderRadius: '50%',
							background: blue,
							opacity: 0.08,
							filter: 'blur(60px)',
							animation: 'waveFloat 14s ease infinite'
						}}
					/>
					<div
						style={{
							position: 'absolute',
							bottom: -30,
							left: 60,
							width: 180,
							height: 180,
							borderRadius: '50%',
							background: gold,
							opacity: 0.06,
							filter: 'blur(50px)',
							animation: 'waveFloat 14s ease infinite 7s'
						}}
					/>

					<div style={{ position: 'relative', display: 'flex', gap: 24, alignItems: 'center' }}>
						{/* Avatar */}
						<div
							style={{
								width: 100,
								height: 100,
								borderRadius: 28,
								flexShrink: 0,
								background: `linear-gradient(135deg,${blue},#2563eb,#7c3aed)`,
								backgroundSize: '200% 200%',
								animation:
									'grad 6s ease infinite, scaleIn .5s cubic-bezier(.34,1.56,.64,1) .1s both',
								display: 'grid',
								placeItems: 'center',
								fontSize: 34,
								fontWeight: 800,
								color: '#fff',
								boxShadow: `0 12px 40px ${blue}35`,
								border: '3px solid #ffffff15'
							}}
						>
							{u.av}
						</div>

						<div style={{ color: '#fff', animation: 'slideR .5s ease .15s both' }}>
							<div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
								{editName ? (
									<div style={{ display: 'flex', gap: 6, animation: 'scaleIn .2s ease both' }}>
										<input
											value={nameIn}
											onChange={(e) => setNameIn(e.target.value)}
											autoFocus
											onKeyDown={(e) => {
												if (e.key === 'Enter') {
													setName(nameIn);
													setEditName(false);
												}
												if (e.key === 'Escape') {
													setNameIn(name);
													setEditName(false);
												}
											}}
											style={{
												fontSize: 28,
												fontWeight: 800,
												fontFamily: F,
												border: 'none',
												borderBottom: `2px solid ${gold}`,
												outline: 'none',
												padding: '0 0 2px',
												background: 'transparent',
												color: '#fff',
												width: 280
											}}
										/>
										<button
											onClick={() => {
												setName(nameIn);
												setEditName(false);
											}}
											style={{
												padding: '6px 14px',
												borderRadius: 8,
												border: 'none',
												background: gold,
												color: '#1c1917',
												fontSize: 12,
												fontWeight: 700,
												cursor: 'pointer'
											}}
										>
											✓
										</button>
									</div>
								) : (
									<>
										<h1
											style={{ margin: 0, fontSize: 30, fontWeight: 900, letterSpacing: '-.04em' }}
										>
											{name}
										</h1>
										<button
											onClick={() => setEditName(true)}
											style={{
												width: 28,
												height: 28,
												borderRadius: 8,
												border: 'none',
												background: '#ffffff12',
												cursor: 'pointer',
												fontSize: 12,
												color: '#ffffff60',
												display: 'grid',
												placeItems: 'center',
												transition: 'all .2s'
											}}
											onMouseOver={(e) => (e.target.style.background = '#ffffff25')}
											onMouseOut={(e) => (e.target.style.background = '#ffffff12')}
										>
											✎
										</button>
									</>
								)}
							</div>
							<div style={{ fontSize: 13, color: '#ffffff60', marginBottom: 8 }}>{u.email}</div>
							<div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#ffffff40' }}>
								<span>📍 {u.city}</span>
								<span>📅 З {u.since}</span>
								<span
									style={{
										display: 'inline-flex',
										alignItems: 'center',
										gap: 4,
										padding: '2px 10px',
										borderRadius: 99,
										background: '#ffffff0a',
										border: '1px solid #ffffff10'
									}}
								>
									<span
										style={{
											width: 6,
											height: 6,
											borderRadius: 99,
											background: '#16a34a',
											boxShadow: '0 0 6px #16a34a80'
										}}
									/>
									<span style={{ color: '#ffffff50', fontSize: 10, fontWeight: 600 }}>Онлайн</span>
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* ── Floating card overlay ── */}
				<div
					style={{
						margin: '-56px 24px 0',
						position: 'relative',
						zIndex: 2,
						display: 'grid',
						gridTemplateColumns: '1fr auto',
						gap: 16,
						animation: 'slideUp2 .5s ease .25s both'
					}}
				>
					{/* Stats strip */}
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
						{stats.map((s, i) => (
							<div
								key={i}
								style={{
									background: '#fff',
									borderRadius: 20,
									padding: '20px 18px',
									border: '1px solid #e7e5e4',
									boxShadow: '0 4px 20px #00000006',
									transition: 'all .3s cubic-bezier(.4,0,.2,1)',
									cursor: 'default',
									animation: `up .35s ease ${0.3 + i * 0.06}s both`
								}}
								onMouseOver={(e) => {
									e.currentTarget.style.transform = 'translateY(-3px)';
									e.currentTarget.style.boxShadow = `0 12px 32px ${s.cl}12`;
									e.currentTarget.style.borderColor = s.cl + '30';
								}}
								onMouseOut={(e) => {
									e.currentTarget.style.transform = 'none';
									e.currentTarget.style.boxShadow = '0 4px 20px #00000006';
									e.currentTarget.style.borderColor = '#e7e5e4';
								}}
							>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
									<div
										style={{
											width: 32,
											height: 32,
											borderRadius: 9,
											background: s.cl + '0a',
											display: 'grid',
											placeItems: 'center',
											fontSize: 15,
											border: `1px solid ${s.cl}12`
										}}
									>
										{s.ic}
									</div>
									<span
										style={{
											fontSize: 28,
											fontWeight: 800,
											fontFamily: M,
											color: '#1c1917',
											letterSpacing: '-.03em'
										}}
									>
										{s.v}
									</span>
								</div>
								<div style={{ fontSize: 11, color: '#78716c', fontWeight: 500 }}>{s.l}</div>
							</div>
						))}
					</div>

					{/* Level card */}
					<div
						style={{
							background: '#fff',
							borderRadius: 20,
							padding: '20px 22px',
							minWidth: 230,
							border: '1px solid #e7e5e4',
							boxShadow: '0 4px 20px #00000006',
							animation: 'slideL .4s ease .35s both'
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
							<div
								style={{
									width: 48,
									height: 48,
									borderRadius: 14,
									background: 'linear-gradient(135deg,#fbbf24,#f59e0b)',
									display: 'grid',
									placeItems: 'center',
									fontSize: 20,
									fontWeight: 800,
									color: '#fff',
									boxShadow: '0 6px 16px #fbbf2435',
									animation: 'float 4s ease infinite'
								}}
							>
								{u.lvl}
							</div>
							<div>
								<div style={{ fontWeight: 800, fontSize: 16 }}>Рівень {u.lvl}</div>
								<div style={{ fontSize: 11, color: '#a8a29e' }}>Експерт</div>
							</div>
						</div>
						<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
							<div
								style={{
									flex: 1,
									height: 8,
									borderRadius: 4,
									background: '#f5f5f4',
									overflow: 'hidden'
								}}
							>
								<div
									style={{
										height: '100%',
										width: `${xpPct}%`,
										borderRadius: 4,
										background: `linear-gradient(90deg,${blue},#2563eb,#7c3aed)`,
										backgroundSize: '200%',
										animation: 'grad 4s ease infinite',
										transition: 'width 1.5s cubic-bezier(.4,0,.2,1)'
									}}
								/>
							</div>
							<span style={{ fontSize: 10, fontWeight: 700, fontFamily: M, color: '#a8a29e' }}>
								{xpPct}%
							</span>
						</div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								fontSize: 10,
								color: '#a8a29e'
							}}
						>
							<span>{u.xp} XP</span>
							<span>{u.xpN} XP</span>
						</div>
						<div
							style={{
								marginTop: 14,
								paddingTop: 14,
								borderTop: '1px solid #f5f5f4',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}
						>
							<span style={{ fontSize: 10, color: '#a8a29e' }}>Репутація</span>
							<span
								style={{
									fontSize: 18,
									fontWeight: 800,
									fontFamily: M,
									background: `linear-gradient(135deg,${gold},#f59e0b)`,
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent'
								}}
							>
								{u.rep}
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* ═══ TABS ═══ */}
			<div
				style={{
					display: 'flex',
					gap: 2,
					margin: '28px 0 24px',
					borderBottom: '1.5px solid #e7e5e4',
					padding: '0 4px'
				}}
			>
				{pTabs.map((t, ti) => {
					const act = tab === t.id;
					return (
						<button
							key={t.id}
							onClick={() => setTab(t.id)}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 6,
								padding: '14px 20px',
								border: 'none',
								borderBottom: act ? `3px solid ${blue}` : '3px solid transparent',
								background: 'transparent',
								color: act ? '#1c1917' : '#a8a29e',
								fontSize: 13,
								fontWeight: act ? 700 : 500,
								cursor: 'pointer',
								fontFamily: F,
								transition: 'all .2s',
								position: 'relative',
								animation: `up .3s ease ${ti * 0.04}s both`
							}}
							onMouseOver={(e) => {
								if (!act) e.currentTarget.style.color = '#57534e';
							}}
							onMouseOut={(e) => {
								if (!act) e.currentTarget.style.color = '#a8a29e';
							}}
						>
							<span style={{ fontSize: 15 }}>{t.ic}</span>
							{t.l}
						</button>
					);
				})}
			</div>

			{/* ═══ TAB CONTENT ═══ */}
			<div key={tab} style={{ animation: 'up .3s ease both' }}>
				{/* ── OVERVIEW ── */}
				{tab === 'overview' && (
					<div>
						{/* Streak + Contribution heatmap row */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '220px 1fr',
								gap: 16,
								marginBottom: 28
							}}
						>
							{/* Streak card */}
							<div
								style={{
									position: 'relative',
									overflow: 'hidden',
									borderRadius: 22,
									padding: '24px 20px',
									background: '#fff',
									border: '1.5px solid #e7e5e4',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									textAlign: 'center',
									animation: 'scaleIn .4s ease both'
								}}
							>
								<div
									style={{
										position: 'absolute',
										top: -20,
										right: -20,
										width: 80,
										height: 80,
										borderRadius: '50%',
										background: '#f59e0b',
										opacity: 0.06,
										filter: 'blur(20px)'
									}}
								/>
								<div
									style={{
										fontSize: 48,
										marginBottom: 8,
										animation: 'float 3s ease infinite',
										filter: 'drop-shadow(0 4px 12px #f59e0b40)'
									}}
								>
									🔥
								</div>
								<div
									style={{
										fontSize: 36,
										fontWeight: 900,
										fontFamily: M,
										color: '#1c1917',
										letterSpacing: '-.04em',
										lineHeight: 1
									}}
								>
									31
								</div>
								<div
									style={{
										fontSize: 12,
										color: '#78716c',
										fontWeight: 600,
										marginTop: 4,
										marginBottom: 12
									}}
								>
									день поспіль
								</div>
								<div
									style={{
										width: '100%',
										height: 4,
										borderRadius: 2,
										background: '#f5f5f4',
										overflow: 'hidden'
									}}
								>
									<div
										style={{
											height: '100%',
											width: '88%',
											borderRadius: 2,
											background: 'linear-gradient(90deg,#f59e0b,#ef4444)',
											transition: 'width 1s'
										}}
									/>
								</div>
								<div style={{ fontSize: 10, color: '#a8a29e', marginTop: 6 }}>
									До рекорду (35): 4 дні
								</div>
							</div>

							{/* Contribution heatmap */}
							<div
								style={{
									background: '#fff',
									borderRadius: 22,
									padding: '20px 24px',
									border: '1.5px solid #e7e5e4',
									animation: 'slideR .4s ease .1s both'
								}}
							>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										marginBottom: 14
									}}
								>
									<div style={{ fontSize: 13, fontWeight: 800 }}>📅 Активність за 12 тижнів</div>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: 4,
											fontSize: 10,
											color: '#a8a29e'
										}}
									>
										<span>Менше</span>
										{[0, 1, 2, 3, 4].map((l) => (
											<div
												key={l}
												style={{
													width: 10,
													height: 10,
													borderRadius: 3,
													background:
														l === 0
															? '#f5f5f4'
															: l === 1
																? '#bbf7d0'
																: l === 2
																	? '#4ade80'
																	: l === 3
																		? '#16a34a'
																		: '#166534'
												}}
											/>
										))}
										<span>Більше</span>
									</div>
								</div>
								<div style={{ display: 'flex', gap: 3 }}>
									{Array.from({ length: 12 }, (_, w) => {
										const weekData = [
											[0, 1, 0, 2, 1, 0, 0],
											[1, 2, 1, 3, 2, 0, 1],
											[0, 0, 1, 1, 0, 0, 0],
											[2, 3, 2, 4, 3, 1, 2],
											[1, 1, 0, 2, 1, 0, 0],
											[3, 4, 3, 4, 2, 1, 3],
											[2, 2, 1, 3, 2, 0, 1],
											[1, 3, 2, 4, 3, 1, 2],
											[0, 1, 1, 2, 1, 0, 0],
											[2, 3, 3, 4, 4, 2, 3],
											[3, 4, 2, 3, 2, 1, 2],
											[4, 3, 4, 4, 3, 2, 4]
										][w];
										return (
											<div key={w} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
												{weekData.map((v, d) => {
													const colors = ['#f5f5f4', '#bbf7d0', '#4ade80', '#16a34a', '#166534'];
													return (
														<div
															key={d}
															style={{
																width: 14,
																height: 14,
																borderRadius: 3,
																background: colors[v],
																transition: 'all .2s',
																cursor: 'default'
															}}
															onMouseOver={(e) => {
																e.target.style.transform = 'scale(1.3)';
																e.target.style.boxShadow = '0 2px 8px #00000015';
															}}
															onMouseOut={(e) => {
																e.target.style.transform = 'none';
																e.target.style.boxShadow = 'none';
															}}
														/>
													);
												})}
											</div>
										);
									})}
								</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										marginTop: 10,
										fontSize: 10,
										color: '#a8a29e',
										fontFamily: M
									}}
								>
									<span>9 тижнів тому</span>
									<span>Цей тиждень</span>
								</div>
							</div>
						</div>

						{/* Badges + Impact + Activity */}
						<div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
							<div style={{ flex: '1 1 400px' }}>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										marginBottom: 16
									}}
								>
									<h3
										style={{
											fontSize: 17,
											fontWeight: 800,
											display: 'flex',
											alignItems: 'center',
											gap: 8
										}}
									>
										🏆 Бейджі{' '}
										<span
											style={{
												fontSize: 10,
												padding: '2px 8px',
												borderRadius: 99,
												background: '#f5f5f4',
												color: '#a8a29e',
												fontWeight: 600,
												fontFamily: M
											}}
										>
											{badges.filter((b) => b.earned).length}/{badges.length}
										</span>
									</h3>
									<div style={{ fontSize: 11, color: '#a8a29e' }}>
										Наступний: <strong style={{ color: '#1c1917' }}>Легенда</strong>
									</div>
								</div>
								<div
									style={{
										display: 'grid',
										gridTemplateColumns: 'repeat(3,1fr)',
										gap: 10,
										marginBottom: 28
									}}
								>
									{badges.map((b, i) => {
										const isH = hovBadge === i;
										return (
											<div
												key={i}
												onMouseEnter={() => setHovBadge(i)}
												onMouseLeave={() => setHovBadge(null)}
												style={{
													position: 'relative',
													overflow: 'hidden',
													background: b.earned ? '#fff' : '#fafaf9',
													borderRadius: 20,
													padding: '24px 14px',
													textAlign: 'center',
													cursor: 'default',
													border:
														isH && b.earned
															? `1.5px solid ${blue}25`
															: b.earned
																? '1.5px solid #e7e5e4'
																: '1.5px dashed #d6d3d1',
													opacity: b.earned ? 1 : 0.4,
													animation: `scaleIn .35s cubic-bezier(.34,1.56,.64,1) ${i * 0.06}s both`,
													transition: 'all .35s cubic-bezier(.4,0,.2,1)',
													transform: isH && b.earned ? 'translateY(-5px) scale(1.04)' : 'none',
													boxShadow: isH && b.earned ? '0 16px 40px #00000008' : 'none'
												}}
											>
												{isH && b.earned && (
													<div
														style={{
															position: 'absolute',
															inset: 0,
															background: `radial-gradient(circle at 50% 30%, ${blue}06, transparent 70%)`
														}}
													/>
												)}
												<div
													style={{
														fontSize: 40,
														marginBottom: 10,
														position: 'relative',
														transition: 'transform .4s cubic-bezier(.34,1.56,.64,1)',
														transform: isH ? 'scale(1.25) rotate(-8deg)' : 'none'
													}}
												>
													{b.ic}
												</div>
												<div
													style={{
														fontWeight: 800,
														fontSize: 13,
														marginBottom: 3,
														position: 'relative'
													}}
												>
													{b.n}
												</div>
												<div
													style={{
														fontSize: 10,
														color: '#a8a29e',
														lineHeight: 1.4,
														position: 'relative'
													}}
												>
													{b.d}
												</div>
												{b.earned && (
													<div
														style={{
															display: 'flex',
															justifyContent: 'center',
															alignItems: 'center',
															gap: 4,
															marginTop: 10
														}}
													>
														<div
															style={{
																width: 6,
																height: 6,
																borderRadius: 99,
																background: '#16a34a',
																boxShadow: '0 0 8px #16a34a60'
															}}
														/>
														<span
															style={{
																fontSize: 9,
																fontWeight: 600,
																color: '#16a34a',
																fontFamily: M
															}}
														>
															Отримано
														</span>
													</div>
												)}
												{!b.earned && (
													<div style={{ marginTop: 10 }}>
														<div
															style={{
																height: 3,
																borderRadius: 2,
																background: '#e7e5e4',
																overflow: 'hidden'
															}}
														>
															<div
																style={{
																	height: '100%',
																	width: '62%',
																	borderRadius: 2,
																	background: '#a8a29e'
																}}
															/>
														</div>
														<div
															style={{
																fontSize: 9,
																fontWeight: 700,
																color: '#a8a29e',
																marginTop: 5,
																fontFamily: M
															}}
														>
															62%
														</div>
													</div>
												)}
											</div>
										);
									})}
								</div>

								{/* Impact card */}
								<div
									style={{
										position: 'relative',
										overflow: 'hidden',
										borderRadius: 24,
										padding: '30px 28px',
										background: `linear-gradient(135deg,${blue} 0%,#1e40af 60%,#7c3aed 100%)`,
										color: '#fff',
										animation: 'up .4s ease .3s both'
									}}
								>
									<div
										style={{
											position: 'absolute',
											top: -30,
											right: 20,
											width: 120,
											height: 120,
											borderRadius: '50%',
											background: gold,
											opacity: 0.1,
											filter: 'blur(35px)',
											animation: 'waveFloat 10s ease infinite'
										}}
									/>
									<div style={{ position: 'relative' }}>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
												marginBottom: 20
											}}
										>
											<div
												style={{
													fontSize: 10,
													fontWeight: 700,
													color: gold,
													textTransform: 'uppercase',
													letterSpacing: '.1em',
													fontFamily: M
												}}
											>
												🇺🇦 Твій внесок у перемогу
											</div>
											<div
												style={{
													fontSize: 9,
													padding: '3px 10px',
													borderRadius: 99,
													background: '#ffffff10',
													color: '#ffffffaa',
													fontWeight: 600,
													border: '1px solid #ffffff15'
												}}
											>
												Топ 5%
											</div>
										</div>
										<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
											{[
												['12', 'переходів на UA', '🔄', '#4ade80'],
												['47', 'відгуків написано', '✍️', '#fbbf24'],
												['₴2.4K', 'збережено на UA', '💰', '#60a5fa']
											].map(([v, l, ic, acl], i) => (
												<div
													key={i}
													style={{
														textAlign: 'center',
														animation: `countUp .4s ease ${0.4 + i * 0.1}s both`
													}}
												>
													<div
														style={{
															width: 44,
															height: 44,
															borderRadius: 13,
															background: '#ffffff0c',
															border: '1px solid #ffffff10',
															display: 'grid',
															placeItems: 'center',
															fontSize: 20,
															margin: '0 auto 10px'
														}}
													>
														{ic}
													</div>
													<div
														style={{
															fontSize: 24,
															fontWeight: 800,
															fontFamily: M,
															letterSpacing: '-.03em',
															color: acl
														}}
													>
														{v}
													</div>
													<div
														style={{
															fontSize: 10,
															color: '#ffffffaa',
															marginTop: 4,
															lineHeight: 1.3
														}}
													>
														{l}
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>

							{/* Right — activity timeline */}
							<div style={{ flex: '1 1 300px' }}>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										marginBottom: 16
									}}
								>
									<h3 style={{ fontSize: 17, fontWeight: 800 }}>📋 Активність</h3>
									<span style={{ fontSize: 11, color: '#a8a29e' }}>Останні 3 тижні</span>
								</div>
								<div style={{ position: 'relative', paddingLeft: 28 }}>
									<div
										style={{
											position: 'absolute',
											left: 11,
											top: 6,
											bottom: 6,
											width: 2,
											borderRadius: 1,
											background: 'linear-gradient(to bottom,#e7e5e4 0%,#f5f5f4 100%)'
										}}
									/>
									{activity.map((a, i) => (
										<div
											key={i}
											style={{
												position: 'relative',
												marginBottom: 6,
												animation: `slideR .35s ease ${i * 0.06}s both`
											}}
										>
											<div
												style={{
													position: 'absolute',
													left: -28,
													top: 18,
													width: 22,
													height: 22,
													borderRadius: 99,
													background: '#fff',
													border: `2.5px solid ${a.cl}`,
													display: 'grid',
													placeItems: 'center',
													zIndex: 1
												}}
											>
												<div style={{ width: 8, height: 8, borderRadius: 99, background: a.cl }} />
											</div>
											<div
												style={{
													background: '#fff',
													borderRadius: 16,
													padding: '16px 18px',
													border: '1.5px solid #e7e5e4',
													transition: 'all .25s cubic-bezier(.4,0,.2,1)'
												}}
												onMouseOver={(e) => {
													e.currentTarget.style.borderColor = a.cl + '30';
													e.currentTarget.style.transform = 'translateX(6px)';
													e.currentTarget.style.boxShadow = `0 6px 20px ${a.cl}08`;
												}}
												onMouseOut={(e) => {
													e.currentTarget.style.borderColor = '#e7e5e4';
													e.currentTarget.style.transform = 'none';
													e.currentTarget.style.boxShadow = 'none';
												}}
											>
												<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
													<span style={{ fontSize: 15 }}>{a.ic}</span>
													<span style={{ fontSize: 13, fontWeight: 600 }}>{a.t}</span>
												</div>
												<div
													style={{
														display: 'flex',
														justifyContent: 'space-between',
														alignItems: 'center',
														marginTop: 6
													}}
												>
													<span style={{ fontSize: 11, color: '#a8a29e' }}>{a.time}</span>
													<span
														style={{
															fontSize: 9,
															padding: '2px 8px',
															borderRadius: 99,
															background: a.cl + '0a',
															color: a.cl,
															fontWeight: 600,
															border: `1px solid ${a.cl}15`
														}}
													>
														+{10 + i * 5} XP
													</span>
												</div>
											</div>
										</div>
									))}
								</div>
								<button
									style={{
										width: '100%',
										padding: 12,
										borderRadius: 14,
										border: '1.5px solid #e7e5e4',
										background: '#fff',
										fontSize: 12,
										fontWeight: 700,
										color: '#78716c',
										cursor: 'pointer',
										fontFamily: F,
										marginTop: 8,
										transition: 'all .15s'
									}}
									onMouseOver={(e) => (e.target.style.background = '#fafaf9')}
									onMouseOut={(e) => (e.target.style.background = '#fff')}
								>
									Вся історія →
								</button>
							</div>
						</div>
					</div>
				)}

				{/* ── REVIEWS ── */}
				{tab === 'reviews' && (
					<div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
						{/* Review summary strip */}
						<div
							style={{
								display: 'flex',
								gap: 16,
								padding: '20px 24px',
								borderRadius: 20,
								background: '#fff',
								border: '1.5px solid #e7e5e4',
								marginBottom: 4,
								animation: 'up .3s ease both',
								alignItems: 'center'
							}}
						>
							<div
								style={{
									textAlign: 'center',
									paddingRight: 20,
									borderRight: '1.5px solid #f5f5f4'
								}}
							>
								<div
									style={{
										fontSize: 36,
										fontWeight: 900,
										fontFamily: M,
										color: '#1c1917',
										letterSpacing: '-.04em'
									}}
								>
									4.5
								</div>
								<div style={{ display: 'flex', gap: 2, justifyContent: 'center', margin: '4px 0' }}>
									{[1, 2, 3, 4, 5].map((s) => (
										<span key={s} style={{ color: s <= 4 ? '#fbbf24' : '#e7e5e4', fontSize: 14 }}>
											★
										</span>
									))}
								</div>
								<div style={{ fontSize: 10, color: '#a8a29e' }}>{reviews.length} відгуки</div>
							</div>
							<div style={{ flex: 1 }}>
								{[
									[5, 3, '#16a34a'],
									[4, 1, '#84cc16'],
									[3, 0, '#fbbf24'],
									[2, 0, '#f97316'],
									[1, 0, '#ef4444']
								].map(([star, count, cl], i) => (
									<div
										key={i}
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: 8,
											marginBottom: i < 4 ? 4 : 0
										}}
									>
										<span
											style={{
												fontSize: 11,
												fontWeight: 600,
												fontFamily: M,
												color: '#a8a29e',
												width: 12,
												textAlign: 'right'
											}}
										>
											{star}
										</span>
										<span style={{ fontSize: 10, color: '#fbbf24' }}>★</span>
										<div
											style={{
												flex: 1,
												height: 6,
												borderRadius: 3,
												background: '#f5f5f4',
												overflow: 'hidden'
											}}
										>
											<div
												style={{
													height: '100%',
													width: `${(count / reviews.length) * 100}%`,
													borderRadius: 3,
													background: cl,
													transition: 'width .8s'
												}}
											/>
										</div>
										<span
											style={{
												fontSize: 10,
												fontWeight: 600,
												fontFamily: M,
												color: '#a8a29e',
												width: 14
											}}
										>
											{count}
										</span>
									</div>
								))}
							</div>
							<div
								style={{ paddingLeft: 20, borderLeft: '1.5px solid #f5f5f4', textAlign: 'center' }}
							>
								<div
									style={{
										padding: '8px 14px',
										borderRadius: 12,
										background: '#ecfdf5',
										border: '1px solid #bbf7d0'
									}}
								>
									<div style={{ fontSize: 18, fontWeight: 800, fontFamily: M, color: '#059669' }}>
										100%
									</div>
									<div style={{ fontSize: 9, color: '#059669', fontWeight: 600 }}>рекомендують</div>
								</div>
							</div>
						</div>

						{reviews.map((rv, i) => (
							<div
								key={i}
								style={{
									position: 'relative',
									overflow: 'hidden',
									background: '#fff',
									borderRadius: 22,
									padding: '26px 28px',
									border: '1.5px solid #e7e5e4',
									animation: `up .4s ease ${i * 0.07}s both`,
									transition: 'all .3s cubic-bezier(.4,0,.2,1)'
								}}
								onMouseOver={(e) => {
									e.currentTarget.style.boxShadow = `0 12px 36px ${rv.cl}0a`;
									e.currentTarget.style.borderColor = rv.cl + '25';
									e.currentTarget.style.transform = 'translateY(-2px)';
								}}
								onMouseOut={(e) => {
									e.currentTarget.style.boxShadow = 'none';
									e.currentTarget.style.borderColor = '#e7e5e4';
									e.currentTarget.style.transform = 'none';
								}}
							>
								<div
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
										right: 0,
										height: 3,
										background: `linear-gradient(90deg,${rv.cl},${rv.cl}50)`
									}}
								/>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'flex-start',
										marginBottom: 14,
										position: 'relative'
									}}
								>
									<div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
										<div
											style={{
												width: 50,
												height: 50,
												borderRadius: 15,
												background: rv.cl + '0a',
												display: 'grid',
												placeItems: 'center',
												fontSize: 19,
												fontWeight: 800,
												color: rv.cl,
												fontFamily: F,
												border: `2px solid ${rv.cl}14`,
												flexShrink: 0
											}}
										>
											{rv.L}
										</div>
										<div>
											<div
												style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}
											>
												<span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-.02em' }}>
													{rv.prod}
												</span>
												<span
													style={{
														fontSize: 9,
														padding: '3px 8px',
														borderRadius: 99,
														background: '#ecfdf5',
														color: '#059669',
														fontWeight: 700,
														border: '1px solid #bbf7d0'
													}}
												>
													✓ рекомендую
												</span>
											</div>
											<div
												style={{
													display: 'flex',
													alignItems: 'center',
													gap: 6,
													fontSize: 12,
													color: '#a8a29e'
												}}
											>
												<span>замість</span>
												<span
													style={{
														padding: '1px 8px',
														borderRadius: 6,
														background: '#fef2f2',
														color: '#dc2626',
														fontWeight: 600,
														fontSize: 11,
														border: '1px solid #fecaca'
													}}
												>
													{rv.from}
												</span>
											</div>
										</div>
									</div>
									<div style={{ textAlign: 'right', flexShrink: 0 }}>
										<Stars r={rv.r} />
										<div style={{ fontSize: 10, color: '#a8a29e', marginTop: 4 }}>{rv.date}</div>
									</div>
								</div>
								<p
									style={{
										fontSize: 14,
										color: '#44403c',
										lineHeight: 1.7,
										margin: '0 0 16px',
										padding: '12px 16px',
										borderRadius: 14,
										background: '#fafaf9',
										borderLeft: `3px solid ${rv.cl}20`
									}}
								>
									{rv.t}
								</p>
								<div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
									{rv.pros.map((p) => (
										<span
											key={p}
											style={{
												fontSize: 11,
												padding: '4px 12px',
												borderRadius: 10,
												background: '#dcfce7',
												color: '#166534',
												fontWeight: 600,
												border: '1px solid #bbf7d0'
											}}
										>
											✓ {p}
										</span>
									))}
									{rv.cons.map((c) => (
										<span
											key={c}
											style={{
												fontSize: 11,
												padding: '4px 12px',
												borderRadius: 10,
												background: '#fef2f2',
												color: '#991b1b',
												fontWeight: 600,
												border: '1px solid #fecaca'
											}}
										>
											✕ {c}
										</span>
									))}
								</div>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 8,
										paddingTop: 14,
										borderTop: '1px solid #f5f5f4'
									}}
								>
									<button
										style={{
											display: 'inline-flex',
											alignItems: 'center',
											gap: 6,
											fontSize: 12,
											fontWeight: 600,
											fontFamily: F,
											padding: '7px 16px',
											borderRadius: 10,
											background: '#ecfdf5',
											border: '1px solid #bbf7d0',
											color: '#059669',
											cursor: 'pointer',
											transition: 'all .2s'
										}}
										onMouseOver={(e) => {
											e.currentTarget.style.background = '#dcfce7';
											e.currentTarget.style.transform = 'scale(1.03)';
										}}
										onMouseOut={(e) => {
											e.currentTarget.style.background = '#ecfdf5';
											e.currentTarget.style.transform = 'none';
										}}
									>
										👍 {rv.h} корисно
									</button>
									<button
										style={{
											display: 'inline-flex',
											alignItems: 'center',
											gap: 4,
											fontSize: 12,
											padding: '7px 14px',
											borderRadius: 10,
											border: '1px solid #e7e5e4',
											background: '#fff',
											color: '#78716c',
											fontWeight: 600,
											cursor: 'pointer',
											fontFamily: F,
											transition: 'all .15s'
										}}
										onMouseOver={(e) => (e.currentTarget.style.background = '#fafaf9')}
										onMouseOut={(e) => (e.currentTarget.style.background = '#fff')}
									>
										💬 Відповісти
									</button>
									<button
										style={{
											marginLeft: 'auto',
											fontSize: 11,
											padding: '7px 12px',
											borderRadius: 10,
											border: '1px solid #e7e5e4',
											background: '#fff',
											color: '#a8a29e',
											cursor: 'pointer',
											fontFamily: F
										}}
										onMouseOver={(e) => (e.currentTarget.style.color = '#78716c')}
										onMouseOut={(e) => (e.currentTarget.style.color = '#a8a29e')}
									>
										✎ Редагувати
									</button>
								</div>
							</div>
						))}
					</div>
				)}

				{/* ── FAVORITES ── */}
				{tab === 'favorites' && (
					<div>
						<div
							style={{
								display: 'flex',
								gap: 6,
								marginBottom: 20,
								flexWrap: 'wrap',
								animation: 'up .25s ease both'
							}}
						>
							{[
								'Усі',
								'Месенджери',
								'Браузери',
								'Стрімінг',
								'Таксі',
								'Пошта',
								'Безпека',
								'ERP'
							].map((c, i) => (
								<button
									key={c}
									style={{
										padding: '6px 14px',
										borderRadius: 10,
										border: '1px solid #e7e5e4',
										background: i === 0 ? '#1c1917' : '#fff',
										color: i === 0 ? '#fff' : '#78716c',
										fontSize: 11,
										fontWeight: i === 0 ? 700 : 500,
										cursor: 'pointer',
										fontFamily: F,
										transition: 'all .15s'
									}}
									onMouseOver={(e) => {
										if (i !== 0) e.target.style.background = '#f5f5f4';
									}}
									onMouseOut={(e) => {
										if (i !== 0) e.target.style.background = '#fff';
									}}
								>
									{c}
								</button>
							))}
						</div>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))',
								gap: 14
							}}
						>
							{favs.map((f, i) => (
								<div
									key={i}
									onClick={() => goTo('catalog')}
									style={{
										position: 'relative',
										overflow: 'hidden',
										background: '#fff',
										borderRadius: 24,
										cursor: 'pointer',
										border: '1.5px solid #e7e5e4',
										transition: 'all .35s cubic-bezier(.4,0,.2,1)',
										animation: `scaleIn .35s cubic-bezier(.34,1.56,.64,1) ${i * 0.05}s both`
									}}
									onMouseOver={(e) => {
										e.currentTarget.style.borderColor = f.cl + '30';
										e.currentTarget.style.transform = 'translateY(-4px)';
										e.currentTarget.style.boxShadow = `0 20px 44px ${f.cl}0c`;
									}}
									onMouseOut={(e) => {
										e.currentTarget.style.borderColor = '#e7e5e4';
										e.currentTarget.style.transform = 'none';
										e.currentTarget.style.boxShadow = 'none';
									}}
								>
									<div
										style={{ height: 3, background: `linear-gradient(90deg,${f.cl},${f.cl}40)` }}
									/>
									<div
										style={{
											position: 'absolute',
											top: -15,
											right: -15,
											width: 70,
											height: 70,
											borderRadius: '50%',
											background: f.cl,
											opacity: 0.04,
											filter: 'blur(18px)'
										}}
									/>
									<div style={{ padding: '24px 22px' }}>
										<div
											style={{
												display: 'flex',
												gap: 14,
												alignItems: 'center',
												marginBottom: 18,
												position: 'relative'
											}}
										>
											<div
												style={{
													width: 56,
													height: 56,
													borderRadius: 17,
													background: f.cl + '0a',
													display: 'grid',
													placeItems: 'center',
													fontSize: 22,
													fontWeight: 800,
													color: f.cl,
													fontFamily: F,
													border: `2px solid ${f.cl}14`,
													flexShrink: 0
												}}
											>
												{f.L}
											</div>
											<div>
												<div style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-.02em' }}>
													{f.n}
												</div>
												<span
													style={{
														fontSize: 10,
														padding: '2px 8px',
														borderRadius: 6,
														background: f.cl + '0a',
														color: f.cl,
														fontWeight: 600,
														border: `1px solid ${f.cl}12`
													}}
												>
													{f.cat}
												</span>
											</div>
											<div
												style={{
													position: 'absolute',
													top: 0,
													right: 0,
													fontSize: 16,
													cursor: 'pointer',
													transition: 'transform .2s'
												}}
												onMouseOver={(e) => (e.target.style.transform = 'scale(1.3)')}
												onMouseOut={(e) => (e.target.style.transform = 'none')}
											>
												❤️
											</div>
										</div>
										<div
											style={{
												padding: '14px 16px',
												borderRadius: 16,
												background: '#fafaf9',
												border: '1px solid #f0f0ef'
											}}
										>
											<div
												style={{
													display: 'flex',
													justifyContent: 'space-between',
													alignItems: 'center',
													marginBottom: 8
												}}
											>
												<span
													style={{
														fontSize: 10,
														color: '#a8a29e',
														fontWeight: 600,
														fontFamily: M,
														textTransform: 'uppercase',
														letterSpacing: '.04em'
													}}
												>
													Рейтинг
												</span>
												<Ratio v={f.ratio} big />
											</div>
											<div
												style={{
													height: 6,
													borderRadius: 3,
													background: '#e7e5e4',
													overflow: 'hidden'
												}}
											>
												<div
													style={{
														height: '100%',
														borderRadius: 3,
														width: `${f.ratio}%`,
														background:
															f.ratio >= 90
																? 'linear-gradient(90deg,#16a34a,#4ade80)'
																: f.ratio >= 70
																	? 'linear-gradient(90deg,#ca8a04,#fbbf24)'
																	: 'linear-gradient(90deg,#dc2626,#f87171)',
														transition: 'width 1s cubic-bezier(.4,0,.2,1)'
													}}
												/>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* ── SETTINGS ── */}
				{tab === 'settings' && (
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 740 }}>
						<div
							style={{
								background: '#fff',
								borderRadius: 24,
								padding: '30px 26px',
								border: '1.5px solid #e7e5e4',
								animation: 'up .3s ease both'
							}}
						>
							<h3
								style={{
									fontSize: 16,
									fontWeight: 800,
									marginBottom: 24,
									display: 'flex',
									alignItems: 'center',
									gap: 8
								}}
							>
								<span
									style={{
										width: 30,
										height: 30,
										borderRadius: 9,
										background: blue + '0a',
										display: 'grid',
										placeItems: 'center',
										fontSize: 15,
										border: `1px solid ${blue}12`
									}}
								>
									👤
								</span>{' '}
								Профіль
							</h3>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 16,
									marginBottom: 24,
									padding: '16px',
									borderRadius: 16,
									background: '#fafaf9',
									border: '1px solid #f0f0ef'
								}}
							>
								<div
									style={{
										width: 56,
										height: 56,
										borderRadius: 16,
										flexShrink: 0,
										background: `linear-gradient(135deg,${blue},#7c3aed)`,
										display: 'grid',
										placeItems: 'center',
										fontSize: 20,
										fontWeight: 800,
										color: '#fff'
									}}
								>
									{u.av}
								</div>
								<div>
									<div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Фото профілю</div>
									<button
										style={{
											fontSize: 11,
											padding: '4px 12px',
											borderRadius: 8,
											border: '1px solid #e7e5e4',
											background: '#fff',
											color: blue,
											fontWeight: 600,
											cursor: 'pointer',
											fontFamily: F
										}}
									>
										Змінити
									</button>
								</div>
							</div>
							{[
								{ l: 'Імʼя', v: name },
								{ l: 'Email', v: u.email },
								{ l: 'Місто', v: u.city },
								{ l: 'Біо', v: 'Шукаю українські альтернативи 🇺🇦', t: 'textarea' }
							].map((f, i) => (
								<div
									key={i}
									style={{ marginBottom: 18, animation: `slideR .3s ease ${i * 0.06}s both` }}
								>
									<label
										style={{
											fontSize: 10,
											fontWeight: 700,
											color: '#a8a29e',
											textTransform: 'uppercase',
											letterSpacing: '.06em',
											display: 'block',
											marginBottom: 6,
											fontFamily: M
										}}
									>
										{f.l}
									</label>
									{f.t === 'textarea' ? (
										<textarea
											defaultValue={f.v}
											rows={2}
											style={{
												width: '100%',
												padding: '12px 16px',
												borderRadius: 14,
												border: '1.5px solid #e7e5e4',
												fontSize: 14,
												fontWeight: 500,
												fontFamily: F,
												color: '#1c1917',
												outline: 'none',
												transition: 'all .25s',
												background: '#fafaf9',
												resize: 'vertical'
											}}
											onFocus={(e) => {
												e.target.style.borderColor = blue;
												e.target.style.boxShadow = `0 0 0 4px ${blue}0c`;
												e.target.style.background = '#fff';
											}}
											onBlur={(e) => {
												e.target.style.borderColor = '#e7e5e4';
												e.target.style.boxShadow = 'none';
												e.target.style.background = '#fafaf9';
											}}
										/>
									) : (
										<input
											defaultValue={f.v}
											style={{
												width: '100%',
												padding: '12px 16px',
												borderRadius: 14,
												border: '1.5px solid #e7e5e4',
												fontSize: 14,
												fontWeight: 500,
												fontFamily: F,
												color: '#1c1917',
												outline: 'none',
												transition: 'all .25s',
												background: '#fafaf9'
											}}
											onFocus={(e) => {
												e.target.style.borderColor = blue;
												e.target.style.boxShadow = `0 0 0 4px ${blue}0c`;
												e.target.style.background = '#fff';
											}}
											onBlur={(e) => {
												e.target.style.borderColor = '#e7e5e4';
												e.target.style.boxShadow = 'none';
												e.target.style.background = '#fafaf9';
											}}
										/>
									)}
								</div>
							))}
							<button
								style={{
									width: '100%',
									padding: '13px',
									borderRadius: 14,
									border: 'none',
									background: '#1c1917',
									color: '#fff',
									fontSize: 13,
									fontWeight: 700,
									cursor: 'pointer',
									fontFamily: F,
									transition: 'all .2s'
								}}
								onMouseOver={(e) => (e.target.style.background = '#292524')}
								onMouseOut={(e) => (e.target.style.background = '#1c1917')}
							>
								Зберегти зміни
							</button>
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
							<div
								style={{
									background: '#fff',
									borderRadius: 24,
									padding: '30px 26px',
									border: '1.5px solid #e7e5e4',
									animation: 'up .3s ease .1s both'
								}}
							>
								<h3
									style={{
										fontSize: 16,
										fontWeight: 800,
										marginBottom: 20,
										display: 'flex',
										alignItems: 'center',
										gap: 8
									}}
								>
									<span
										style={{
											width: 30,
											height: 30,
											borderRadius: 9,
											background: '#fef3c7',
											display: 'grid',
											placeItems: 'center',
											fontSize: 15,
											border: '1px solid #fde68a'
										}}
									>
										🔔
									</span>{' '}
									Сповіщення
								</h3>
								{[
									{ l: 'Нові альтернативи', d: 'Коли зʼявляються нові', on: true },
									{ l: 'Відповіді на відгуки', d: 'Коли хтось відповідає', on: true },
									{ l: 'Щотижневий дайджест', d: 'Огляд нових замін', on: false },
									{ l: 'Бейджі та досягнення', d: 'Нові нагороди', on: true }
								].map((n, i) => (
									<div
										key={i}
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											padding: '14px 0',
											borderBottom: i < 3 ? '1px solid #f5f5f4' : 'none'
										}}
									>
										<div>
											<div
												style={{ fontSize: 13, fontWeight: 600, color: '#1c1917', marginBottom: 2 }}
											>
												{n.l}
											</div>
											<div style={{ fontSize: 11, color: '#a8a29e' }}>{n.d}</div>
										</div>
										<div
											onClick={(e) => {
												const d = e.currentTarget;
												const on = d.dataset.on === 'true';
												d.dataset.on = String(!on);
												d.style.background = !on ? blue : '#e7e5e4';
												d.querySelector('div').style.transform = !on
													? 'translateX(18px)'
													: 'translateX(0)';
											}}
											data-on={String(n.on)}
											style={{
												width: 44,
												height: 26,
												borderRadius: 13,
												background: n.on ? blue : '#e7e5e4',
												padding: 3,
												cursor: 'pointer',
												transition: 'background .3s',
												flexShrink: 0
											}}
										>
											<div
												style={{
													width: 20,
													height: 20,
													borderRadius: 10,
													background: '#fff',
													boxShadow: '0 1px 4px #0002',
													transition: 'transform .3s cubic-bezier(.4,0,.2,1)',
													transform: n.on ? 'translateX(18px)' : 'translateX(0)'
												}}
											/>
										</div>
									</div>
								))}
							</div>
							<div
								style={{
									background: '#fff',
									borderRadius: 24,
									padding: '30px 26px',
									border: '1.5px solid #e7e5e4',
									animation: 'up .3s ease .2s both'
								}}
							>
								<h3
									style={{
										fontSize: 16,
										fontWeight: 800,
										marginBottom: 20,
										display: 'flex',
										alignItems: 'center',
										gap: 8
									}}
								>
									<span
										style={{
											width: 30,
											height: 30,
											borderRadius: 9,
											background: '#ede9fe',
											display: 'grid',
											placeItems: 'center',
											fontSize: 15,
											border: '1px solid #ddd6fe'
										}}
									>
										🎨
									</span>{' '}
									Інтерфейс
								</h3>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										marginBottom: 20
									}}
								>
									<div>
										<div style={{ fontSize: 13, fontWeight: 600 }}>Мова</div>
										<div style={{ fontSize: 11, color: '#a8a29e' }}>Мова інтерфейсу</div>
									</div>
									<select
										style={{
											padding: '9px 16px',
											borderRadius: 12,
											border: '1.5px solid #e7e5e4',
											fontSize: 13,
											fontFamily: F,
											color: '#1c1917',
											background: '#fafaf9',
											cursor: 'pointer',
											outline: 'none'
										}}
									>
										<option>🇺🇦 Українська</option>
										<option>🇬🇧 English</option>
									</select>
								</div>
								<div style={{ paddingTop: 20, borderTop: '1.5px solid #fecaca' }}>
									<div
										style={{
											fontSize: 12,
											fontWeight: 700,
											color: '#dc2626',
											marginBottom: 10,
											display: 'flex',
											alignItems: 'center',
											gap: 4
										}}
									>
										⚠️ Небезпечна зона
									</div>
									<button
										style={{
											width: '100%',
											padding: '12px',
											borderRadius: 14,
											border: '1.5px solid #fecaca',
											background: '#fef2f2',
											color: '#dc2626',
											fontSize: 13,
											fontWeight: 700,
											cursor: 'pointer',
											fontFamily: F,
											transition: 'all .15s'
										}}
										onMouseOver={(e) => (e.target.style.background = '#fee2e2')}
										onMouseOut={(e) => (e.target.style.background = '#fef2f2')}
									>
										Вийти з акаунту
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

/* ── RESULTS ── */
function Results({ query, onAlt, onBack }) {
	const q = query.toLowerCase();
	const res = ITEMS.filter(
		(it) =>
			it.orig.toLowerCase().includes(q) ||
			it.kw.some((k) => k.includes(q)) ||
			it.alts.some((a) => a.name.toLowerCase().includes(q))
	);
	const total = res.reduce((s, r) => s + r.alts.length, 0);

	return (
		<section style={{ maxWidth: 660, margin: '0 auto', padding: '36px 24px 80px' }}>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 12,
					marginBottom: 24,
					animation: 'slideR .3s ease both'
				}}
			>
				<button
					onClick={onBack}
					style={{
						width: 36,
						height: 36,
						borderRadius: 10,
						border: '1.5px solid #e7e5e4',
						background: '#fff',
						cursor: 'pointer',
						display: 'grid',
						placeItems: 'center',
						fontSize: 16,
						color: '#78716c',
						transition: 'all .15s'
					}}
					onMouseOver={(e) => {
						e.currentTarget.style.background = '#f5f5f4';
						e.currentTarget.style.transform = 'scale(1.05)';
					}}
					onMouseOut={(e) => {
						e.currentTarget.style.background = '#fff';
						e.currentTarget.style.transform = 'none';
					}}
				>
					←
				</button>
				<div>
					<h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: '-.02em' }}>
						«{query}»
					</h2>
					<span style={{ fontSize: 12, color: '#a8a29e', fontFamily: M }}>{total} альтернатив</span>
				</div>
			</div>
			{res.length > 0 ? (
				<div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
					{res.map((it, i) => (
						<ItemBlock key={it.orig} item={it} i={i} openDef onAlt={onAlt} />
					))}
				</div>
			) : (
				<div
					style={{
						textAlign: 'center',
						padding: '64px 24px',
						background: '#fff',
						borderRadius: 24,
						border: '1px solid #e7e5e4',
						animation: 'scaleIn .4s ease both'
					}}
				>
					<div style={{ fontSize: 44, marginBottom: 14, animation: 'float 3s ease infinite' }}>
						🔍
					</div>
					<h3 style={{ fontSize: 19, fontWeight: 800, marginBottom: 8 }}>Нічого не знайдено</h3>
					<p style={{ fontSize: 13, color: '#78716c', maxWidth: 300, margin: '0 auto 22px' }}>
						Спробуйте інший запит або додайте альтернативу
					</p>
					<button
						onClick={onBack}
						style={{
							padding: '10px 26px',
							borderRadius: 99,
							border: '2px solid #e7e5e4',
							background: '#fff',
							fontSize: 13,
							fontWeight: 700,
							cursor: 'pointer',
							fontFamily: F,
							transition: 'all .15s'
						}}
						onMouseOver={(e) => {
							e.target.style.background = '#f5f5f4';
						}}
						onMouseOut={(e) => {
							e.target.style.background = '#fff';
						}}
					>
						← Головна
					</button>
				</div>
			)}
		</section>
	);
}

/* ═══════════════════════════════════════════ */
/*                   APP                       */
/* ═══════════════════════════════════════════ */
export default function App() {
	const [page, setPage] = useState('home');
	const [q, setQ] = useState('');
	const [searchQ, setSearchQ] = useState('');
	const [modal, setModal] = useState(null);

	const doSearch = useCallback(
		(v) => {
			const t = (v || q).trim();
			if (!t) return;
			setSearchQ(t);
			setQ(t);
			setPage('search');
			window.scrollTo({ top: 0, behavior: 'smooth' });
		},
		[q]
	);

	const goTo = (p) => {
		setPage(p);
		if (p !== 'search') setQ('');
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const tabs = [
		{ id: 'home', l: 'Головна' },
		{ id: 'catalog', l: 'Каталог' },
		{ id: 'nashe', l: '🇺🇦 Наше' },
		{ id: 'cashback', l: '💳 Кешбек' }
	];

	return (
		<div style={{ minHeight: '100vh', background: BG, fontFamily: F, color: '#1c1917' }}>
			<style>{CSS}</style>

			{/* NAV */}
			<nav
				style={{
					position: 'sticky',
					top: 0,
					zIndex: 50,
					background: 'rgba(250,250,249,.92)',
					backdropFilter: 'blur(20px) saturate(1.4)',
					borderBottom: '1px solid #e7e5e4'
				}}
			>
				<div
					style={{
						maxWidth: 960,
						margin: '0 auto',
						padding: '0 24px',
						display: 'flex',
						alignItems: 'center',
						height: 58,
						gap: 6
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 7,
							cursor: 'pointer',
							marginRight: 20
						}}
						onClick={() => goTo('home')}
					>
						<div
							style={{
								width: 32,
								height: 32,
								borderRadius: 9,
								background: `linear-gradient(135deg,${blue},${gold})`,
								display: 'grid',
								placeItems: 'center',
								fontWeight: 800,
								fontSize: 14,
								color: '#fff',
								boxShadow: `0 2px 8px ${blue}20`,
								transition: 'transform .2s'
							}}
							onMouseOver={(e) => (e.target.style.transform = 'scale(1.08) rotate(-3deg)')}
							onMouseOut={(e) => (e.target.style.transform = 'none')}
						>
							Н
						</div>
						<span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-.03em' }}>НаНаше</span>
					</div>

					{tabs.map((t) => {
						const act = page === t.id || (page === 'search' && t.id === 'home');
						return (
							<button
								key={t.id}
								onClick={() => goTo(t.id)}
								style={{
									padding: '6px 14px',
									borderRadius: 8,
									border: 'none',
									background: act ? '#1c191708' : 'transparent',
									color: act ? '#1c1917' : '#a8a29e',
									fontSize: 13,
									fontWeight: act ? 700 : 500,
									cursor: 'pointer',
									fontFamily: F,
									transition: 'all .15s',
									borderBottom: act ? `2.5px solid ${blue}` : '2.5px solid transparent'
								}}
								onMouseOver={(e) => {
									if (!act) e.target.style.color = '#57534e';
								}}
								onMouseOut={(e) => {
									if (!act) e.target.style.color = '#a8a29e';
								}}
							>
								{t.l}
							</button>
						);
					})}

					<div style={{ flex: 1 }} />
					{page !== 'home' && page !== 'profile' && (
						<div style={{ width: 240 }}>
							<SearchBar q={q} setQ={setQ} onGo={doSearch} />
						</div>
					)}

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 6,
							cursor: 'pointer',
							marginLeft: 10,
							padding: '3px 10px 3px 3px',
							borderRadius: 99,
							border: page === 'profile' ? `2px solid ${blue}` : '2px solid transparent',
							transition: 'all .2s'
						}}
						onClick={() => goTo('profile')}
						onMouseOver={(e) => {
							if (page !== 'profile') e.currentTarget.style.background = '#f5f5f4';
						}}
						onMouseOut={(e) => {
							e.currentTarget.style.background = 'transparent';
						}}
					>
						<div
							style={{
								width: 30,
								height: 30,
								borderRadius: 99,
								background: `linear-gradient(135deg,${blue},#2563eb)`,
								display: 'grid',
								placeItems: 'center',
								fontSize: 10,
								fontWeight: 800,
								color: '#fff',
								transition: 'transform .2s'
							}}
						>
							ОК
						</div>
						<span
							style={{
								fontSize: 12,
								fontWeight: 600,
								color: page === 'profile' ? '#1c1917' : '#78716c'
							}}
						>
							Олена
						</span>
					</div>
				</div>
			</nav>

			{/* PAGES */}
			<main key={page} style={{ animation: 'fadeIn .2s ease' }}>
				{page === 'home' && (
					<Home q={q} setQ={setQ} onSearch={doSearch} onAlt={setModal} goTo={goTo} />
				)}
				{page === 'catalog' && <Catalog onAlt={setModal} />}
				{page === 'nashe' && <Nashe />}
				{page === 'cashback' && <Cashback />}
				{page === 'profile' && <Profile goTo={goTo} />}
				{page === 'search' && (
					<Results query={searchQ} onAlt={setModal} onBack={() => goTo('home')} />
				)}
			</main>

			{/* FOOTER */}
			<footer style={{ borderTop: '1px solid #e7e5e4', padding: '28px 24px', background: '#fff' }}>
				<div
					style={{
						maxWidth: 960,
						margin: '0 auto',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						flexWrap: 'wrap',
						gap: 10
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 6,
							fontSize: 12,
							color: '#a8a29e'
						}}
					>
						<span style={{ fontWeight: 700, color: '#1c1917' }}>НаНаше</span> © 2026 · Зроблено в
						Україні 🇺🇦
					</div>
					<div style={{ display: 'flex', gap: 20 }}>
						{['Про проєкт', 'API', 'GitHub', 'Контакти'].map((l) => (
							<a
								key={l}
								href="#"
								style={{
									fontSize: 12,
									color: '#a8a29e',
									textDecoration: 'none',
									transition: 'color .12s'
								}}
								onMouseOver={(e) => (e.target.style.color = '#1c1917')}
								onMouseOut={(e) => (e.target.style.color = '#a8a29e')}
							>
								{l}
							</a>
						))}
					</div>
				</div>
			</footer>

			{modal && <Modal a={modal} onClose={() => setModal(null)} />}
		</div>
	);
}

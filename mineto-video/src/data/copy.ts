/** Every on-screen string, in one place, so localisation and edits stay trivial. */
export const COPY = {
	brand: 'MINETO',
	url: 'mineto.tech',

	intro: {
		line1: ['Lo', 'que', 'ganas', 'no', 'es', 'lo', 'mismo'],
		line2: ['que', 'lo', 'que', 'puedes', 'gastar.'],
		/** Index in line1 of the word that appears first and splits. */
		keyword: 2,
	},

	income: {
		label: 'Recibiste este mes',
		barLabel: 'Ingreso',
		barShare: '100%',
		reservesTitle: 'Obligaciones y reservas',
		reservesShare: '≈ 20%',
		availableTitle: 'Disponible',
		availableShare: '≈ 80% del ingreso',
		categories: ['Seguridad social', 'Impuestos', 'Retenciones'],
	},

	distribution: {
		tiers: ['Ingreso', 'Obligaciones\ny reservas', 'Disponible'],
		shareSuffix: 'del ingreso',
		availableNote: 'de tu ingreso',
	},

	product: {
		account: 'AR',
		period: 'Septiembre',
		availableLabel: 'Tu disponible',
		availableSub: 'de $6.000.000 recibidos este mes',
		pending: 'Por separar',
		done: 'Separado',
		alert: 'Pago de seguridad social · vence en 6 días',
		eyebrow: 'Copiloto financiero para independientes',
		headline: ['Mineto organiza', 'lo importante', 'antes de que', 'gastes de más.'],
		tooltip: 'Disponible',
	},

	manifesto: ['Entiende tus números.', 'Separa lo que necesitas.', 'Usa el resto con claridad.'],

	endCard: {
		tagline: ['Tu', 'dinero.', 'Más', 'claro.'],
		cta: 'Calcula tu disponible',
	},

	hud: {
		sections: {
			income: {index: '01', title: 'Ingreso'},
			distribution: {index: '02', title: 'Distribución'},
			product: {index: '03', title: 'Tu disponible'},
		},
		disclaimer: 'Ejemplo ilustrativo · Cifras demostrativas, no constituyen un cálculo fiscal',
	},
} as const;

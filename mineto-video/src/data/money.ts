import {COLORS} from '../theme/colors';

/**
 * DEMO FIGURES — illustrative only.
 * They are chosen to read well on screen and to add up; they are not a tax
 * or social-security calculation and the piece labels them as such.
 */
export const INCOME = 6_000_000;

export type BucketId = 'social' | 'tax' | 'withholding' | 'available';

export type Bucket = {
	id: BucketId;
	/** Long label (distribution cards). */
	label: string;
	/** Short label (product UI rows). */
	shortLabel: string;
	value: number;
	color: string;
};

export const RESERVES: Bucket[] = [
	{
		id: 'social',
		label: 'Seguridad social',
		shortLabel: 'Seguridad social',
		value: 696_600,
		color: COLORS.blue,
	},
	{
		id: 'tax',
		label: 'Reserva para impuestos',
		shortLabel: 'Impuestos',
		value: 380_000,
		color: COLORS.amber,
	},
	{
		id: 'withholding',
		label: 'Retenciones',
		shortLabel: 'Retenciones',
		value: 120_000,
		color: COLORS.slate,
	},
];

export const RESERVED_TOTAL = RESERVES.reduce((sum, b) => sum + b.value, 0);
export const AVAILABLE = INCOME - RESERVED_TOTAL; // 4.803.400

export const AVAILABLE_BUCKET: Bucket = {
	id: 'available',
	label: 'Disponible',
	shortLabel: 'Disponible',
	value: AVAILABLE,
	color: COLORS.mint,
};

/** Reserves first, then what is left. Left-to-right order of every bar. */
export const BUCKETS: Bucket[] = [...RESERVES, AVAILABLE_BUCKET];

export const shareOfIncome = (value: number) => value / INCOME;

/** Available balance after subtracting each reserve in turn. */
export const RUNNING_AVAILABLE = RESERVES.reduce<number[]>(
	(acc, b) => [...acc, acc[acc.length - 1] - b.value],
	[INCOME],
);

/** Colombian peso format: $6.000.000 */
export const formatCOP = (value: number) =>
	`$${Math.round(value)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

/** es-CO decimal comma: 11,6% */
export const formatPercent = (ratio: number, decimals = 1) =>
	`${(ratio * 100).toFixed(decimals).replace('.', ',')}%`;

/** Compact millions with es-CO decimal comma: $4,8M */
export const formatMillions = (value: number) =>
	`$${(value / 1_000_000).toFixed(1).replace('.', ',')}M`;

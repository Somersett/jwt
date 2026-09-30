import type {CSSProperties} from 'react';
import {COLORS} from './colors';

export const FONT_FAMILY = {
	sans: 'Geist',
	mono: 'Geist Mono',
} as const;

export const FONT_STACK = {
	sans: `'${FONT_FAMILY.sans}', 'Inter', system-ui, sans-serif`,
	mono: `'${FONT_FAMILY.mono}', ui-monospace, 'SF Mono', monospace`,
} as const;

/**
 * Vertical metrics of Geist (units per em = 1000), read from the font file.
 * They let us place rules and bars against the baseline instead of guessing.
 */
export const FONT_METRICS = {
	ascent: 1.005,
	descent: 0.295,
	capHeight: 0.71,
	xHeight: 0.53,
} as const;

/** Distance from the top of a line box to the baseline. */
export const baselineFromTop = (fontSize: number, lineHeight: number) =>
	fontSize * (lineHeight / 2 + (FONT_METRICS.ascent - FONT_METRICS.descent) / 2);

/** Distance from the top of a line box to the vertical centre of capitals. */
export const capCenterFromTop = (fontSize: number, lineHeight: number) =>
	baselineFromTop(fontSize, lineHeight) - (FONT_METRICS.capHeight * fontSize) / 2;

/** A text style with concrete numeric metrics, so layout code can do maths on it. */
export type TextStyle = CSSProperties & {
	fontFamily: string;
	fontSize: number;
	fontWeight: number;
	letterSpacing: string;
	lineHeight: number;
};

const sans = (
	fontSize: number,
	fontWeight: number,
	letterSpacing: string,
	lineHeight = 1,
): TextStyle => ({
	fontFamily: FONT_STACK.sans,
	fontSize,
	fontWeight,
	letterSpacing,
	lineHeight,
	color: COLORS.ink,
});

const mono = (fontSize: number, letterSpacing: string): TextStyle => ({
	fontFamily: FONT_STACK.mono,
	fontSize,
	fontWeight: 500,
	letterSpacing,
	lineHeight: 1,
	textTransform: 'uppercase',
	color: COLORS.inkSoft,
});

export const TABULAR = {fontVariantNumeric: 'tabular-nums'} as const;

/** Type scale. Sizes are for the 1920×1080 master. */
export const TYPE = {
	wordmark: sans(172, 600, '0.04em'),
	display: {...sans(216, 600, '-0.05em'), ...TABULAR},
	hero: {...sans(168, 600, '-0.05em'), ...TABULAR},
	amountXL: {...sans(150, 600, '-0.05em'), ...TABULAR},
	statement: sans(104, 500, '-0.04em'),
	headline: sans(84, 500, '-0.035em', 1.12),
	title: sans(76, 500, '-0.035em', 1.08),
	amountL: {...sans(72, 600, '-0.04em'), ...TABULAR},
	amount: {...sans(52, 600, '-0.035em'), ...TABULAR},
	lead: sans(30, 500, '-0.015em', 1.2),
	body: sans(24, 500, '-0.01em', 1.25),
	small: sans(20, 500, '-0.005em', 1.25),
	label: mono(16, '0.14em'),
	micro: mono(14, '0.12em'),
} satisfies Record<string, TextStyle>;

export type TypeToken = keyof typeof TYPE;

import React from 'react';
import type {CSSProperties} from 'react';
import {COPY} from '../data/copy';
import {textWidth} from '../layout/measure';
import {clamp01} from '../motion/animate';
import type {Rect} from '../motion/animate';
import {COLORS} from '../theme/colors';
import {FONT_METRICS, TYPE, capCenterFromTop} from '../theme/typography';

/**
 * The mark is a square cut in two: a narrow part set aside (ink) and the
 * larger part you can use (mint). The money bar, reduced to a symbol.
 * Proportions are fractions of the mark's side.
 */
const MARK = {
	reserved: 0.28,
	gap: 0.08,
	available: 0.64,
	outerRadius: 0.18,
	innerRadius: 0.05,
};

/** Space between mark and wordmark, in em of the wordmark. */
const MARK_TO_WORDMARK = 0.34;

export type LogoLayout = {
	fontSize: number;
	side: number;
	left: number;
	width: number;
	reserved: Rect;
	available: Rect;
	wordmark: {x: number; top: number; width: number};
};

/** Absolute geometry of the lockup, so scenes can morph other shapes into it. */
export const logoLayout = (
	fontSize: number,
	anchor: {x: number; y: number},
	align: 'center' | 'left' = 'center',
): LogoLayout => {
	const style = {...TYPE.wordmark, fontSize};
	const trailingTracking = parseFloat(String(TYPE.wordmark.letterSpacing)) * fontSize;
	const wordmarkWidth = textWidth(COPY.brand, style) - trailingTracking;
	const side = FONT_METRICS.capHeight * fontSize;
	const width = side + MARK_TO_WORDMARK * fontSize + wordmarkWidth;
	const left = align === 'center' ? anchor.x - width / 2 : anchor.x;
	const top = anchor.y - side / 2;
	return {
		fontSize,
		side,
		left,
		width,
		reserved: {x: left, y: top, w: side * MARK.reserved, h: side},
		available: {x: left + side * (MARK.reserved + MARK.gap), y: top, w: side * MARK.available, h: side},
		wordmark: {
			x: left + side + MARK_TO_WORDMARK * fontSize,
			top: anchor.y - capCenterFromTop(fontSize, 1),
			width: wordmarkWidth,
		},
	};
};

export const markPartRadius = (side: number, part: 'reserved' | 'available') => {
	const outer = side * MARK.outerRadius;
	const inner = side * MARK.innerRadius;
	return part === 'reserved'
		? `${outer}px ${inner}px ${inner}px ${outer}px`
		: `${inner}px ${outer}px ${outer}px ${inner}px`;
};

type LogoProps = {
	layout: LogoLayout;
	ink?: string;
	accent?: string;
	/** 0→1 opens the wordmark from a horizontal slit through its centre. */
	wordmarkOpen?: number;
	/** 0→1 grows the mark parts from their inner edge. */
	markReveal?: number;
	/** Extra horizontal separation of the two mark parts, in px. */
	split?: number;
	/** Wordmark tracking override (e.g. '0.06em'). */
	tracking?: string;
	style?: CSSProperties;
};

/** MINETO lockup, absolutely positioned in stage (or parent) coordinates. */
export const Logo: React.FC<LogoProps> = ({
	layout,
	ink = COLORS.ink,
	accent = COLORS.mint,
	wordmarkOpen = 1,
	markReveal = 1,
	split = 0,
	tracking,
	style,
}) => {
	const {reserved, available, wordmark, side, fontSize} = layout;
	const open = clamp01(wordmarkOpen);
	const grow = clamp01(markReveal);
	const part = (rect: Rect, color: string, which: 'reserved' | 'available', dx: number) => (
		<div
			style={{
				position: 'absolute',
				left: rect.x + dx,
				top: rect.y,
				width: rect.w,
				height: rect.h,
				background: color,
				borderRadius: markPartRadius(side, which),
				transformOrigin: which === 'reserved' ? '100% 50%' : '0% 50%',
				transform: `scaleX(${grow})`,
			}}
		/>
	);

	return (
		<div style={{position: 'absolute', left: 0, top: 0, ...style}}>
			{part(reserved, ink, 'reserved', -split / 2)}
			{part(available, accent, 'available', split / 2)}
			<div
				style={{
					...TYPE.wordmark,
					fontSize,
					letterSpacing: tracking ?? TYPE.wordmark.letterSpacing,
					color: ink,
					position: 'absolute',
					left: wordmark.x,
					top: wordmark.top,
					whiteSpace: 'nowrap',
					clipPath: `inset(${(1 - open) * 50}% -5% ${(1 - open) * 50}% -5%)`,
				}}
			>
				{COPY.brand}
			</div>
		</div>
	);
};

/** Small lockup for chrome and UI, laid out in its own box. */
export const LogoInline: React.FC<{fontSize: number; ink?: string; accent?: string}> = ({
	fontSize,
	ink,
	accent,
}) => {
	const layout = logoLayout(fontSize, {x: 0, y: (FONT_METRICS.capHeight * fontSize) / 2}, 'left');
	return (
		<div style={{position: 'relative', width: layout.width, height: layout.side}}>
			<Logo layout={layout} ink={ink} accent={accent} />
		</div>
	);
};

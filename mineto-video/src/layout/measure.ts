import {measureText} from '@remotion/layout-utils';
import type {CSSProperties} from 'react';

/**
 * Width of `text` rendered with a TYPE style. Only call this below <FontGate>,
 * otherwise the measurement would be taken against a fallback font.
 */
export const textWidth = (text: string, style: CSSProperties) =>
	measureText({
		text,
		fontFamily: String(style.fontFamily),
		fontSize: Number(style.fontSize),
		fontWeight: style.fontWeight,
		letterSpacing: style.letterSpacing === undefined ? undefined : String(style.letterSpacing),
		fontVariantNumeric: style.fontVariantNumeric,
		validateFontIsLoaded: true,
	}).width;

export type PlacedWord = {text: string; x: number; width: number};

/**
 * Absolute x for every word of a single line, so a word can be animated in and
 * out of its slot. Words are measured as prefixes to keep spacing exact.
 */
export const layoutLine = (
	words: readonly string[],
	style: CSSProperties,
	align: 'left' | 'center',
	anchorX: number,
): {words: PlacedWord[]; width: number} => {
	const lineWidth = textWidth(words.join(' '), style);
	const left = align === 'center' ? anchorX - lineWidth / 2 : anchorX;
	const placed = words.map((word, i) => {
		const prefixWithWord = textWidth(words.slice(0, i + 1).join(' '), style);
		const width = textWidth(word, style);
		return {text: word, x: left + prefixWithWord - width, width};
	});
	return {words: placed, width: lineWidth};
};

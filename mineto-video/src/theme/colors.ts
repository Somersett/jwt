/**
 * Mineto palette.
 *
 * Every colour carries a job. Mint is money you can use, blue is social
 * security, amber is money set aside for taxes (and anything that needs
 * attention), slate is withholdings. Red exists for completeness but the
 * promo never needs it: nothing here is an error.
 */
export const COLORS = {
	// Surfaces
	paper: '#F3F1EC',
	paperRaised: '#FBFAF7',
	paperSunken: '#ECE9E2',

	// Ink
	ink: '#0E0F0D',
	inkSoft: '#4E504A',
	inkMute: '#8A8B84',
	line: 'rgba(14, 15, 13, 0.11)',
	lineStrong: 'rgba(14, 15, 13, 0.22)',

	// Brand + semantic
	mint: '#22C088',
	mintDeep: '#0A7453',
	mintWash: '#DCF2E7',
	blue: '#2B59FF',
	blueWash: '#E2E8FF',
	amber: '#F2A516',
	amberDeep: '#8F5B00',
	amberWash: '#FBEFD3',
	slate: '#6A6E66',
	red: '#E5484D',

	// Inverted section (manifesto)
	night: '#0E0F0D',
	nightLine: 'rgba(243, 241, 236, 0.14)',
	nightInkSoft: 'rgba(243, 241, 236, 0.62)',
} as const;

export type ColorToken = keyof typeof COLORS;

import {STAGE} from '../theme/spacing';

/**
 * The edit is cut to a minimal electronic track at 120 BPM.
 * One beat = 60 / 120 s = 0.5 s = 15 frames at 30 fps, so every scene
 * boundary and most cues land on the beat grid.
 */
export const BPM = 120;
export const BEAT = (60 / BPM) * STAGE.fps;
export const beats = (n: number) => Math.round(n * BEAT);

export const SCENE_ORDER = [
	'intro',
	'income',
	'distribution',
	'product',
	'manifesto',
	'endCard',
] as const;

export type SceneId = (typeof SCENE_ORDER)[number];

/** Nominal length of each scene, until the next one starts. */
const LENGTH: Record<SceneId, number> = {
	intro: beats(8), // 0.0 – 4.0 s
	income: beats(8), // 4.0 – 8.0 s
	distribution: beats(9), // 8.0 – 12.5 s
	product: beats(10), // 12.5 – 17.5 s
	manifesto: beats(7), // 17.5 – 21.0 s
	endCard: beats(8), // 21.0 – 25.0 s
};

/**
 * Frames a scene keeps rendering after the next one has started, so its exit
 * can overlap the next entrance instead of cutting to an empty frame.
 */
const TAIL: Record<SceneId, number> = {
	intro: 20,
	income: 0,
	distribution: 0,
	product: 0,
	manifesto: 0,
	endCard: 0,
};

export type SceneSlot = {from: number; duration: number; tail: number};

export const SCENES = SCENE_ORDER.reduce(
	(acc, id, i) => {
		const prev = i === 0 ? null : acc[SCENE_ORDER[i - 1]];
		const from = prev ? prev.from + prev.duration : 0;
		acc[id] = {from, duration: LENGTH[id], tail: TAIL[id]};
		return acc;
	},
	{} as Record<SceneId, SceneSlot>,
);

export const TOTAL_FRAMES = SCENE_ORDER.reduce((sum, id) => sum + LENGTH[id], 0);

/*
 * Per-scene cue sheets, in frames local to each scene.
 * Audio notes: see src/audio/cues.ts, which maps these to sound design.
 */

export const INTRO_T = {
	wordmarkIn: 3,
	toMasthead: 30, // beat 2
	ganasIn: 40,
	ganasToSlot: 52,
	/** The rest of the sentence ripples out from the keyword once it has landed. */
	sentenceIn: 66,
	underlineDraw: 74,
	underlineSplit: 90, // beat 6
	exit: 100,
} as const;

export const INCOME_T = {
	barTravel: 4,
	labelIn: 8,
	numberIn: 14,
	count: 14,
	countDuration: 40,
	barGrow: 16,
	barGrowDuration: 38,
	/** Ink pours over the coloured slices: first the whole income. */
	inkFill: 18,
	inkFillDuration: 26,
	annotationsIn: 42,
	divider: 60, // beat 4
	split: 66,
	groupLabelsIn: 72,
	categoriesIn: 84,
	/** Everything but the amount and the bar clears before the cut (last exit ends ~f117). */
	exit: 98,
} as const;

export const DISTRIBUTION_T = {
	move: 0,
	moveDuration: 26,
	spine: 8,
	tiers: [10, 22, 34],
	availableIn: 34,
	buckets: [45, 60, 75], // beats 3, 4, 5
	connectorDuration: 12,
	cardDelay: 6,
	countDelay: 10,
	rollDelay: 10,
	rollDuration: 14,
	resolve: 105, // beat 7 of the scene, on the grid
	exit: 116,
} as const;

export const PRODUCT_T = {
	move: 0,
	moveDuration: 24,
	suffixSwap: 12,
	suffixSwapDuration: 20,
	/** The card grows out of the figure once it has landed. */
	frameReveal: 18,
	frameRevealDuration: 26,
	topbarIn: 30,
	labelIn: 30,
	subIn: 38,
	barIn: 38,
	rowsIn: 44,
	checks: 66,
	alertIn: 84,
	headlineIn: 88,
	cursorIn: 100,
	tooltipIn: 114,
	wipe: 135,
	wipeDuration: 15,
} as const;

export const MANIFESTO_T = {
	lines: [4, 26, 48],
	dimDuration: 10,
	/** Markers line up on the slit as one segmented bar, then become the logo mark. */
	markersAlign: 68,
	markersAlignDuration: 16,
	markersToMark: 86,
	markersToMarkDuration: 14,
	/** Statements 1 and 3 clear away through their masks. */
	converge: 68,
	convergeDuration: 12,
	/** Statement 2 collapses into a hairline. */
	slit: 76,
	slitDuration: 12,
	wordmarkOpen: 90, // lands on the beat
	wordmarkOpenDuration: 14,
} as const;

export const END_T = {
	wipe: 0,
	wipeDuration: 22,
	logoUp: 12,
	taglineIn: 24,
	ctaIn: 40,
	urlIn: 48,
	ctaHover: 68,
	logoClose: 86,
} as const;

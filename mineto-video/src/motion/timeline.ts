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

/**
 * Nominal length of each scene, until the next one starts. Every scene ends
 * with a reading hold: once its last element lands, it stays complete on
 * screen for roughly 1.5–2.5 s before anything leaves.
 */
const LENGTH: Record<SceneId, number> = {
	intro: beats(11), // 0.0 – 5.5 s
	income: beats(13), // 5.5 – 12.0 s
	distribution: beats(15), // 12.0 – 19.5 s
	product: beats(15), // 19.5 – 27.0 s
	manifesto: beats(11), // 27.0 – 32.5 s
	endCard: beats(10), // 32.5 – 37.5 s
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
	toMasthead: 45, // beat 3 — MINETO holds a full second first
	ganasIn: 56,
	ganasToSlot: 72,
	/** The rest of the sentence ripples out from the keyword once it has landed. */
	sentenceIn: 86,
	rippleStagger: 2,
	underlineDraw: 96,
	underlineSplit: 120, // beat 8
	exit: 150, // beat 10 — complete sentence reads for ~1.7 s
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
	divider: 75, // beat 5 — the full amount reads for ~0.7 s before the cut
	split: 81,
	groupLabelsIn: 88,
	categoriesIn: 100,
	categoryStagger: 8,
	/** Reading hold, then everything but the amount and the bar clears before the cut. */
	exit: 172,
} as const;

export const DISTRIBUTION_T = {
	move: 0,
	moveDuration: 26,
	spine: 8,
	tiers: [10, 22, 34],
	availableIn: 34,
	buckets: [45, 75, 105], // beats 3, 5, 7 — one reserve per second
	connectorDuration: 12,
	cardDelay: 6,
	countDelay: 10,
	rollDelay: 10,
	rollDuration: 14,
	resolve: 135, // beat 9
	exit: 200, // ~2.2 s reading hold on the resolved breakdown
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
	rowsIn: 50,
	rowStagger: 8,
	checks: 90, // beat 6
	checkStagger: 8,
	alertIn: 118,
	headlineIn: 130,
	cursorIn: 165,
	tooltipIn: 180,
	wipe: 210, // beat 14 — headline reads for ~2.7 s
	wipeDuration: 15,
} as const;

export const MANIFESTO_T = {
	/** ~1.2 s per statement. */
	lines: [6, 42, 78],
	dimDuration: 10,
	/** Markers line up on the slit as one segmented bar, then become the logo mark. */
	markersAlign: 118,
	markersAlignDuration: 16,
	markersToMark: 136,
	markersToMarkDuration: 14,
	/** Statements 1 and 3 clear away through their masks. */
	converge: 120,
	convergeDuration: 12,
	/** Statement 2 collapses into a hairline. */
	slit: 124,
	slitDuration: 12,
	wordmarkOpen: 135, // beat 9; the logo then holds on ink until the cut
	wordmarkOpenDuration: 14,
} as const;

export const END_T = {
	wipe: 0,
	wipeDuration: 22,
	logoUp: 12,
	taglineIn: 24,
	ctaIn: 44,
	urlIn: 54,
	ctaHover: 84,
	logoClose: 104, // then a ~0.8 s final hold
} as const;

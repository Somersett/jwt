import {Easing} from 'remotion';
import type {SpringConfig} from 'remotion';

/**
 * Motion vocabulary. Four curves and three springs cover the whole piece;
 * nothing in a scene should reach for an ad-hoc bezier.
 */
export const EASE = {
	/** Entrances. Fast attack, long silky settle (expo-out). */
	out: Easing.bezier(0.16, 1, 0.3, 1),
	/** Big blocks entering: a touch softer than `out`. */
	outSoft: Easing.bezier(0.22, 1, 0.36, 1),
	/** Moving an element between two resting positions. */
	inOut: Easing.bezier(0.65, 0, 0.35, 1),
	/** Exits: accelerate away, never linger. */
	in: Easing.bezier(0.6, 0, 0.9, 0.3),
	linear: Easing.linear,
} as const;

export type EasingFn = (t: number) => number;

/** Critically damped by default: things arrive, they do not wobble. */
export const SPRING = {
	settle: {damping: 200, stiffness: 140, mass: 1},
	/** A hair of overshoot for small UI confirmations (checks, chips). */
	snap: {damping: 22, stiffness: 210, mass: 0.7},
	soft: {damping: 30, stiffness: 90, mass: 1},
} satisfies Record<string, Partial<SpringConfig>>;

/** Standard durations, in frames at 30 fps. */
export const DUR = {
	micro: 8,
	fast: 12,
	base: 18,
	move: 24,
	slow: 32,
} as const;

/** Standard stagger between sibling elements, in frames. */
export const STAGGER = {
	char: 2,
	word: 1.5,
	line: 4,
	item: 6,
} as const;

import {interpolate, interpolateColors, spring} from 'remotion';
import type {SpringConfig} from 'remotion';
import {STAGE} from '../theme/spacing';
import {EASE, SPRING} from './easing';
import type {EasingFn} from './easing';

export const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

export const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

/** Eased 0→1 progress of a window that starts at `start` and lasts `duration` frames. */
export const progress = (
	frame: number,
	start: number,
	duration: number,
	easing: EasingFn = EASE.out,
) =>
	interpolate(frame, [start, start + duration], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing,
	});

/** Spring that starts at `start`. Returns 0 before it and settles on 1. */
export const springAt = (
	frame: number,
	start: number,
	config: Partial<SpringConfig> = SPRING.settle,
) =>
	spring({
		frame: Math.max(0, frame - start),
		fps: STAGE.fps,
		config,
	});

export const mixColor = (from: string, to: string, t: number) =>
	interpolateColors(clamp01(t), [0, 1], [from, to]);

export type Rect = {x: number; y: number; w: number; h: number};

export const lerpRect = (a: Rect, b: Rect, t: number): Rect => ({
	x: lerp(a.x, b.x, t),
	y: lerp(a.y, b.y, t),
	w: lerp(a.w, b.w, t),
	h: lerp(a.h, b.h, t),
});

/** Very slow push used while a composition holds, so nothing ever freezes. */
export const drift = (frame: number, start: number, end: number, amount = 0.012) =>
	1 + amount * progress(frame, start, end - start, EASE.linear);

/** Seamless 0→1→0 oscillation, for pulses. */
export const pulse = (frame: number, period: number) =>
	0.5 - 0.5 * Math.cos((frame / period) * Math.PI * 2);

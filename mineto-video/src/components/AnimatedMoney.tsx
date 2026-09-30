import React from 'react';
import type {CSSProperties} from 'react';
import {useCurrentFrame} from 'remotion';
import {formatCOP} from '../data/money';
import {lerp, progress} from '../motion/animate';
import {DUR, EASE} from '../motion/easing';
import type {EasingFn} from '../motion/easing';
import {TABULAR} from '../theme/typography';

export type MoneyKeyframe = {at: number; value: number};

type AnimatedMoneyProps = {
	/** First keyframe is the resting value; each later one animates to its value at `at`. */
	keyframes: readonly MoneyKeyframe[];
	/**
	 * count: the value ticks through intermediate amounts (a number filling up).
	 * roll:  each digit rolls independently to its new figure (an odometer).
	 */
	mode?: 'count' | 'roll';
	duration?: number;
	easing?: EasingFn;
	/** Granularity of intermediate values in count mode, so the tail digits stay calm. */
	roundTo?: number;
	format?: (value: number) => string;
	/** Frames between neighbouring digits in roll mode (units roll first). */
	digitStagger?: number;
	style?: CSSProperties;
};

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const EDGE_FADE = 'linear-gradient(to bottom, transparent 0%, #000 13%, #000 87%, transparent 100%)';

const activeTransition = (keyframes: readonly MoneyKeyframe[], frame: number) => {
	let index = 0;
	for (let i = 1; i < keyframes.length; i++) {
		if (frame >= keyframes[i].at) index = i;
	}
	return index;
};

const DigitSlot: React.FC<{from: number; to: number; t: number}> = ({from, to, t}) => (
	<span
		style={{
			position: 'relative',
			display: 'inline-block',
			height: '1em',
			lineHeight: 1,
			overflow: 'hidden',
			verticalAlign: 'top',
			WebkitMaskImage: EDGE_FADE,
			maskImage: EDGE_FADE,
		}}
	>
		<span style={{visibility: 'hidden'}}>0</span>
		<span
			style={{
				position: 'absolute',
				left: 0,
				top: 0,
				display: 'flex',
				flexDirection: 'column',
				transform: `translateY(${-lerp(from, to, t)}em)`,
			}}
		>
			{DIGITS.map((d) => (
				<span key={d} style={{height: '1em', lineHeight: 1}}>
					{d}
				</span>
			))}
		</span>
	</span>
);

/** Colombian-peso amount that counts or rolls between keyframed values. */
export const AnimatedMoney: React.FC<AnimatedMoneyProps> = ({
	keyframes,
	mode = 'count',
	duration = DUR.slow,
	easing = EASE.out,
	roundTo = 1000,
	format = formatCOP,
	digitStagger = 1.2,
	style,
}) => {
	const frame = useCurrentFrame();
	const k = activeTransition(keyframes, frame);
	const wrapper: CSSProperties = {
		display: 'inline-block',
		whiteSpace: 'nowrap',
		...TABULAR,
		...style,
	};

	if (mode === 'count') {
		let value = keyframes[0].value;
		if (k > 0) {
			const t = progress(frame, keyframes[k].at, duration, easing);
			const raw = lerp(keyframes[k - 1].value, keyframes[k].value, t);
			value = t >= 1 ? keyframes[k].value : Math.round(raw / roundTo) * roundTo;
		}
		return <span style={wrapper}>{format(value)}</span>;
	}

	const strings = keyframes.map((kf) => format(kf.value));
	const length = Math.max(...strings.map((s) => s.length));
	const padded = strings.map((s) => s.padStart(length, ' '));
	const current = padded[k];
	const previous = padded[Math.max(0, k - 1)];

	return (
		<span style={wrapper}>
			{Array.from(current).map((char, i) => {
				const prevChar = previous[i];
				const isDigit = DIGITS.includes(char) && DIGITS.includes(prevChar);
				if (!isDigit) return <span key={i}>{char === ' ' ? '' : char}</span>;
				const delay = (length - 1 - i) * digitStagger;
				const t = k === 0 ? 1 : progress(frame, keyframes[k].at + delay, duration, easing);
				return <DigitSlot key={i} from={Number(prevChar)} to={Number(char)} t={t} />;
			})}
		</span>
	);
};

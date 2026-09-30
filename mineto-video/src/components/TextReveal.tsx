import React from 'react';
import type {CSSProperties} from 'react';
import {useCurrentFrame} from 'remotion';
import {progress} from '../motion/animate';
import {DUR, EASE, STAGGER} from '../motion/easing';
import type {EasingFn} from '../motion/easing';

/** How far (in % of the line box) masked content travels to be fully hidden. */
const MASK_TRAVEL = 135;

type MaskProps = {
	/** 0 = hidden past the mask edge, 1 = resting in place. */
	enter: number;
	/** 0 = resting, 1 = gone past the opposite edge. */
	exit?: number;
	from?: 'below' | 'above';
	exitTo?: 'above' | 'below';
	/** Room around the glyphs so accents, descenders and overhangs never clip. */
	bleed?: string;
	style?: CSSProperties;
	children: React.ReactNode;
};

/** The primitive behind every text entrance: content slides through a hard mask edge. */
export const Mask: React.FC<MaskProps> = ({
	enter,
	exit = 0,
	from = 'below',
	exitTo = 'above',
	bleed = '0.22em',
	style,
	children,
}) => {
	const inOffset = (1 - enter) * (from === 'below' ? 1 : -1);
	const outOffset = exit * (exitTo === 'above' ? -1 : 1);
	const sideBleed = '0.08em';
	return (
		<span
			style={{
				display: 'inline-block',
				overflow: 'hidden',
				verticalAlign: 'top',
				padding: `${bleed} ${sideBleed}`,
				margin: `calc(-1 * ${bleed}) calc(-1 * ${sideBleed})`,
				...style,
			}}
		>
			<span
				style={{
					display: 'inline-block',
					transform: `translateY(${(inOffset + outOffset) * MASK_TRAVEL}%)`,
				}}
			>
				{children}
			</span>
		</span>
	);
};

type TextRevealProps = {
	/** A string (split by word or char) or pre-split tokens. */
	text: string | readonly string[];
	/** Local frame at which the first token starts entering. */
	start: number;
	by?: 'word' | 'char';
	stagger?: number;
	duration?: number;
	easing?: EasingFn;
	/** Local frame at which tokens start leaving. Omit to stay on screen. */
	exitAt?: number;
	exitStagger?: number;
	exitDuration?: number;
	from?: 'below' | 'above';
	exitTo?: 'above' | 'below';
	style?: CSSProperties;
	tokenStyle?: (index: number) => CSSProperties | undefined;
};

/** Masked, staggered text entrance (and optional exit). */
export const TextReveal: React.FC<TextRevealProps> = ({
	text,
	start,
	by = 'word',
	stagger = by === 'word' ? STAGGER.word : STAGGER.char,
	duration = DUR.base,
	easing = EASE.out,
	exitAt,
	exitStagger = 1,
	exitDuration = DUR.fast,
	from = 'below',
	exitTo = 'above',
	style,
	tokenStyle,
}) => {
	const frame = useCurrentFrame();
	const tokens: readonly string[] =
		typeof text === 'string' ? (by === 'char' ? Array.from(text) : text.split(' ')) : text;

	return (
		<span style={{whiteSpace: 'pre', ...style}}>
			{tokens.map((token, i) => {
				const enter = progress(frame, start + i * stagger, duration, easing);
				const exit =
					exitAt === undefined
						? 0
						: progress(frame, exitAt + i * exitStagger, exitDuration, EASE.in);
				const separator = by === 'word' && i < tokens.length - 1 ? ' ' : '';
				return (
					<React.Fragment key={`${token}-${i}`}>
						<Mask enter={enter} exit={exit} from={from} exitTo={exitTo} style={tokenStyle?.(i)}>
							{token === ' ' ? ' ' : token}
						</Mask>
						{separator}
					</React.Fragment>
				);
			})}
		</span>
	);
};

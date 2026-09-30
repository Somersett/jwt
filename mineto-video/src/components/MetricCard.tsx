import React from 'react';
import {useCurrentFrame} from 'remotion';
import {formatPercent} from '../data/money';
import {progress} from '../motion/animate';
import type {Rect} from '../motion/animate';
import {DUR, EASE} from '../motion/easing';
import {COLORS} from '../theme/colors';
import {RADIUS, space} from '../theme/spacing';
import {TYPE} from '../theme/typography';
import {AnimatedMoney} from './AnimatedMoney';
import {Mask} from './TextReveal';

type MetricCardProps = {
	rect: Rect;
	label: string;
	value: number;
	/** Share of income, 0–1. Drives the footer meter. */
	share: number;
	color: string;
	/** Local frame at which the card starts to open (top edge first). */
	at: number;
	/** Frames after `at` before the amount starts counting. */
	countDelay?: number;
	/** Local frame at which the card folds away. */
	exitAt?: number;
	shareSuffix?: string;
};

const PAD = space(3.5); // 28

/** A bucket: where one slice of the income lands. */
export const MetricCard: React.FC<MetricCardProps> = ({
	rect,
	label,
	value,
	share,
	color,
	at,
	countDelay = 8,
	exitAt,
	shareSuffix = '',
}) => {
	const frame = useCurrentFrame();
	const open = progress(frame, at, DUR.base, EASE.out);
	const fold = exitAt === undefined ? 0 : progress(frame, exitAt, DUR.fast, EASE.in);
	const content = progress(frame, at + 4, DUR.base, EASE.out);
	const contentOut = exitAt === undefined ? 0 : progress(frame, exitAt - 2, DUR.fast, EASE.in);
	const meter = progress(frame, at + countDelay, DUR.slow, EASE.out);

	if (open <= 0) return null;

	return (
		<div
			style={{
				position: 'absolute',
				left: rect.x,
				top: rect.y,
				width: rect.w,
				height: rect.h,
				background: COLORS.paperRaised,
				border: `1px solid ${COLORS.line}`,
				borderRadius: RADIUS.lg,
				boxSizing: 'border-box',
				padding: PAD,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				clipPath: `inset(0 0 ${(1 - open + fold) * 100}% 0 round ${RADIUS.lg}px)`,
				transform: `translateY(${(1 - open) * -10 + fold * 12}px)`,
			}}
		>
			<div style={{display: 'flex', alignItems: 'center', gap: space(1.5)}}>
				<div
					style={{
						width: 12,
						height: 12,
						borderRadius: 3,
						background: color,
						transform: `scale(${content})`,
					}}
				/>
				<div style={{...TYPE.body, color: COLORS.inkSoft}}>
					<Mask enter={content} exit={contentOut}>
						{label}
					</Mask>
				</div>
			</div>

			<div style={TYPE.amount}>
				<Mask enter={content} exit={contentOut}>
					<AnimatedMoney
						keyframes={[
							{at: 0, value: 0},
							{at: at + countDelay, value},
						]}
						duration={DUR.move}
						roundTo={100}
					/>
				</Mask>
			</div>

			<div style={{display: 'flex', alignItems: 'center', gap: space(2)}}>
				<div style={{...TYPE.label, color: COLORS.inkMute, whiteSpace: 'nowrap'}}>
					<Mask enter={content} exit={contentOut}>
						{`${formatPercent(share)} ${shareSuffix}`.trim()}
					</Mask>
				</div>
				<div
					style={{
						flex: 1,
						height: 4,
						borderRadius: 2,
						background: COLORS.paperSunken,
						overflow: 'hidden',
					}}
				>
					<div
						style={{
							width: `${share * meter * (1 - contentOut) * 100}%`,
							height: '100%',
							background: color,
							borderRadius: 2,
						}}
					/>
				</div>
			</div>
		</div>
	);
};

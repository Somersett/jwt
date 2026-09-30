import React from 'react';
import type {CSSProperties} from 'react';
import {clamp01} from '../motion/animate';
import {BAR} from '../theme/spacing';

export type BarSegment = {value: number; color: string};

/** A stretch of the bar (in px from its left end) painted over in one flat colour. */
export type BarCover = {from: number; to: number; color: string};

type ReserveBarProps = {
	segments: readonly BarSegment[];
	width: number;
	height?: number;
	/** Gap after each segment (length = segments - 1). 0 = one continuous bar. */
	gaps?: readonly number[];
	/** Per-segment colour override, for animated recolouring. */
	colors?: readonly string[];
	/** Per-segment opacity, for hover/dim states. */
	opacities?: readonly number[];
	/** 0→1 draws the bar in from the left. */
	reveal?: number;
	/**
	 * Flat covers laid over the segments. Recolouring by moving a hard edge
	 * keeps every frame crisp, where tweening colours passes through mud.
	 */
	covers?: readonly BarCover[];
	style?: CSSProperties;
};

export type SegmentBox = {x: number; w: number};

/** Horizontal geometry of each segment, shared with anything that must point at one. */
export const segmentBoxes = (
	segments: readonly BarSegment[],
	width: number,
	gaps: readonly number[] = [],
): SegmentBox[] => {
	const total = segments.reduce((sum, s) => sum + s.value, 0);
	const gapSum = gaps.reduce((sum, g) => sum + g, 0);
	const available = width - gapSum;
	let cursor = 0;
	return segments.map((segment, i) => {
		const w = (available * segment.value) / total;
		const box = {x: cursor, w};
		cursor += w + (gaps[i] ?? 0);
		return box;
	});
};

/**
 * The money bar: one income split into proportional buckets. Inner corners
 * round off as gaps open, so a split reads as pieces separating, not as
 * stripes being painted.
 */
export const ReserveBar: React.FC<ReserveBarProps> = ({
	segments,
	width,
	height = BAR.height,
	gaps = [],
	colors,
	opacities,
	reveal = 1,
	covers = [],
	style,
}) => {
	const radius = height / 2;
	const boxes = segmentBoxes(segments, width, gaps);
	const innerRadius = (gap: number | undefined) => radius * clamp01((gap ?? 0) / 4);

	const paint = (colorOf: (i: number) => string, opacityOf: (i: number) => number) =>
		boxes.map((box, i) => {
			const left = i === 0 ? radius : innerRadius(gaps[i - 1]);
			const right = i === boxes.length - 1 ? radius : innerRadius(gaps[i]);
			return (
				<div
					key={i}
					style={{
						position: 'absolute',
						left: box.x,
						top: 0,
						width: box.w,
						height,
						background: colorOf(i),
						opacity: opacityOf(i),
						borderRadius: `${left}px ${right}px ${right}px ${left}px`,
					}}
				/>
			);
		});

	return (
		<div
			style={{
				position: 'absolute',
				width: width * clamp01(reveal),
				height,
				overflow: 'hidden',
				borderRadius: radius,
				...style,
			}}
		>
			{paint(
				(i) => colors?.[i] ?? segments[i].color,
				(i) => opacities?.[i] ?? 1,
			)}
			{covers
				.filter((cover) => cover.to - cover.from > 0.01)
				.map((cover, c) => (
					<div
						key={`cover-${c}`}
						style={{
							position: 'absolute',
							inset: 0,
							width,
							clipPath: `inset(0 ${width - cover.to}px 0 ${cover.from}px)`,
						}}
					>
						{paint(
							() => cover.color,
							() => 1,
						)}
					</div>
				))}
		</div>
	);
};

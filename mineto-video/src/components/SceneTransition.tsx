import React from 'react';
import type {CSSProperties} from 'react';
import {AbsoluteFill} from 'remotion';
import {clamp01} from '../motion/animate';
import {STAGE} from '../theme/spacing';

export type Side = 'left' | 'right' | 'top' | 'bottom';

/** clip-path that shows `amount` (0–1) of an element, growing in from `from`. */
export const revealClip = (amount: number, from: Side) => {
	const hidden = (1 - clamp01(amount)) * 100;
	switch (from) {
		case 'bottom':
			return `inset(${hidden}% 0 0 0)`;
		case 'top':
			return `inset(0 0 ${hidden}% 0)`;
		case 'left':
			return `inset(0 ${hidden}% 0 0)`;
		case 'right':
			return `inset(0 0 0 ${hidden}%)`;
	}
};

type WipeProps = {
	/** 0 = off stage, 1 = covering the whole stage. */
	progress: number;
	from: Side;
	color: string;
	/** Thin accent line riding the leading edge. */
	edgeColor?: string;
	edgeSize?: number;
};

/** A solid panel sweeping across the stage, with a precise leading edge. */
export const Wipe: React.FC<WipeProps> = ({progress, from, color, edgeColor, edgeSize = 6}) => {
	const p = clamp01(progress);
	if (p <= 0) return null;
	const horizontal = from === 'left' || from === 'right';
	const extent = (horizontal ? STAGE.width : STAGE.height) * p;
	// The edge thins out as the panel lands so no sliver is left at the border.
	const edge = edgeSize * Math.min(1, (1 - p) * 10);

	const panel: CSSProperties = horizontal
		? {top: 0, bottom: 0, width: extent, [from]: 0}
		: {left: 0, right: 0, height: extent, [from]: 0};
	const edgeStyle: CSSProperties = horizontal
		? {top: 0, bottom: 0, width: edge, [from]: extent - edge / 2}
		: {left: 0, right: 0, height: edge, [from]: extent - edge / 2};

	return (
		<AbsoluteFill style={{pointerEvents: 'none'}}>
			<div style={{position: 'absolute', background: color, ...panel}} />
			{edgeColor && edge > 0 ? (
				<div style={{position: 'absolute', background: edgeColor, ...edgeStyle}} />
			) : null}
		</AbsoluteFill>
	);
};

type ClipRevealProps = {
	progress: number;
	from: Side;
	style?: CSSProperties;
	children: React.ReactNode;
};

/** Reveals a full-stage layer through a moving hard edge (matched to a Wipe). */
export const ClipReveal: React.FC<ClipRevealProps> = ({progress, from, style, children}) => (
	<AbsoluteFill style={{clipPath: revealClip(progress, from), ...style}}>{children}</AbsoluteFill>
);

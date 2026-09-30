import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {AnimatedMoney} from '../components/AnimatedMoney';
import {ReserveBar, segmentBoxes} from '../components/ReserveBar';
import {Mask, TextReveal} from '../components/TextReveal';
import {COPY} from '../data/copy';
import {BUCKETS, INCOME, RESERVES} from '../data/money';
import {INCOME_GEO, incomeDividerX, incomeGroupGaps, introLayout} from '../layout/geometry';
import {lerp, progress} from '../motion/animate';
import {DUR, EASE, STAGGER} from '../motion/easing';
import {INCOME_T} from '../motion/timeline';
import {COLORS} from '../theme/colors';
import {STROKE, space} from '../theme/spacing';
import {TYPE} from '../theme/typography';
import {INTRO_HANDOFF, introUnderlineState} from './Scene1Intro';

/**
 * 4–8 s · "Recibiste este mes: $6.000.000", then a line divides it.
 *
 * AUDIO  f0   whoosh: the split underline travels down
 *        f14  number tick run while the amount counts up (14 → 54)
 *        f60  transition hit on the beat: the dividing line drops
 *        f66  soft click as the bar breaks at the line
 *        f84  three soft ticks, one per category
 */

const G = INCOME_GEO;
const T = INCOME_T;

/**
 * Bar state at any frame of this scene; the distribution scene continues from it.
 * The four slices travel down, close ranks and ink pours over them (the whole
 * income). When the line cuts, the ink pulls away from the cut on both sides.
 */
export const incomeBarState = (frame: number) => {
	const intro = introLayout();
	const handoff = introUnderlineState(INTRO_HANDOFF, intro.underline.w);
	const travel = progress(frame, T.barTravel, DUR.move - 2, EASE.inOut);
	const grow = progress(frame, T.barGrow, T.barGrowDuration, EASE.out);
	const merge = progress(frame, T.barGrow, DUR.move, EASE.inOut);
	const fill = progress(frame, T.inkFill, T.inkFillDuration, EASE.inOut);
	const split = progress(frame, T.split, DUR.base, EASE.inOut);

	const w = lerp(intro.underline.w, G.bar.w, grow);
	const introGap = handoff.gaps[0];
	const gaps = incomeGroupGaps(G.groupGap * split).map((g) => g + introGap * (1 - merge));
	const boxes = segmentBoxes(BUCKETS, w, gaps);
	const cut = boxes[3].x - gaps[2] / 2;
	const inked = w * fill;

	return {
		x: lerp(intro.underline.x, G.bar.x, travel),
		y: lerp(intro.underline.y, G.bar.y, travel),
		h: lerp(intro.underline.h, G.bar.h, travel),
		w,
		gaps,
		covers: [
			{from: 0, to: Math.min(inked, cut * (1 - split)), color: COLORS.ink},
			{from: cut + (w - cut) * split, to: inked, color: COLORS.ink},
		],
	};
};

const Dot: React.FC<{color: string; scale: number}> = ({color, scale}) => (
	<div style={{width: 10, height: 10, borderRadius: 5, background: color, transform: `scale(${scale})`}} />
);

export const Scene2Income: React.FC = () => {
	const frame = useCurrentFrame();
	const bar = incomeBarState(frame);
	const dividerX = incomeDividerX();

	const exitAt = T.exit;
	const out = (i: number) => progress(frame, exitAt + i * 1.5, DUR.fast, EASE.in);
	const numberIn = progress(frame, T.numberIn, DUR.move, EASE.out);
	const dividerDraw = progress(frame, T.divider, DUR.base, EASE.inOut);
	const dividerRetract = progress(frame, exitAt, DUR.base, EASE.in);
	const dividerLength = G.divider.bottom - G.divider.top;
	const annotation = progress(frame, T.annotationsIn, DUR.base, EASE.out);
	const groups = progress(frame, T.groupLabelsIn, DUR.base, EASE.out);
	const labelSize = Number(TYPE.label.fontSize);

	return (
		<AbsoluteFill>
			<div style={{...TYPE.lead, color: COLORS.inkSoft, position: 'absolute', left: G.label.x, top: G.label.top}}>
				<TextReveal text={COPY.income.label} start={T.labelIn} exitAt={exitAt} />
			</div>

			<div style={{...TYPE.display, position: 'absolute', left: G.number.x, top: G.number.top}}>
				<Mask enter={numberIn} bleed="0.04em">
					<AnimatedMoney
						keyframes={[
							{at: 0, value: 0},
							{at: T.count, value: INCOME},
						]}
						duration={T.countDuration}
						roundTo={10_000}
					/>
				</Mask>
			</div>

			<ReserveBar
				segments={BUCKETS}
				width={bar.w}
				height={bar.h}
				gaps={bar.gaps}
				covers={bar.covers}
				style={{left: bar.x, top: bar.y}}
			/>

			{/* Bar annotation, right-aligned above its end */}
			<div
				style={{
					...TYPE.label,
					position: 'absolute',
					right: G.bar.x,
					top: G.bar.y - space(2) - labelSize,
					display: 'flex',
					gap: space(2),
				}}
			>
				<Mask enter={annotation} exit={out(0)}>
					<span style={{color: COLORS.inkMute}}>{COPY.income.barLabel}</span>
				</Mask>
				<Mask enter={annotation} exit={out(0)}>
					<span style={{color: COLORS.ink}}>{COPY.income.barShare}</span>
				</Mask>
			</div>

			{/* The line that divides the money */}
			<div
				style={{
					position: 'absolute',
					left: dividerX - STROKE.line / 2,
					top: G.divider.top + dividerLength * dividerRetract,
					width: STROKE.line,
					height: dividerLength * (dividerDraw - dividerRetract),
					background: COLORS.ink,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					left: dividerX - 5,
					top: G.divider.top - 5,
					width: 10,
					height: 10,
					borderRadius: 5,
					border: `${STROKE.line}px solid ${COLORS.ink}`,
					background: COLORS.paper,
					boxSizing: 'border-box',
					transform: `scale(${progress(frame, T.divider - 2, DUR.fast, EASE.out) * (1 - dividerRetract)})`,
				}}
			/>

			{/* Two columns born from the cut */}
			{[
				{x: G.bar.x, title: COPY.income.reservesTitle, share: COPY.income.reservesShare},
				{x: dividerX + space(4), title: COPY.income.availableTitle, share: COPY.income.availableShare},
			].map((col, i) => (
				<div key={col.title} style={{position: 'absolute', left: col.x, top: G.columnsTop}}>
					<div style={{...TYPE.body, color: COLORS.ink}}>
						<Mask enter={progress(frame, T.groupLabelsIn + i * STAGGER.line, DUR.base, EASE.out)} exit={out(1 + i)}>
							{col.title}
						</Mask>
					</div>
					<div style={{...TYPE.label, color: i === 1 ? COLORS.mintDeep : COLORS.inkMute, marginTop: space(1.5)}}>
						<Mask enter={groups} exit={out(2 + i)}>
							{col.share}
						</Mask>
					</div>
				</div>
			))}

			{RESERVES.map((bucket, i) => {
				const enter = progress(frame, T.categoriesIn + i * STAGGER.item, DUR.base, EASE.out);
				const exit = out(3 + i);
				const top = G.categoriesTop + i * G.categoryStep;
				return (
					<div
						key={bucket.id}
						style={{
							position: 'absolute',
							left: G.bar.x,
							top,
							display: 'flex',
							alignItems: 'center',
							gap: space(1.5),
						}}
					>
						<Dot color={bucket.color} scale={enter * (1 - exit)} />
						<div style={{...TYPE.small, color: COLORS.inkSoft, lineHeight: 1}}>
							<Mask enter={enter} exit={exit}>
								{COPY.income.categories[i]}
							</Mask>
						</div>
					</div>
				);
			})}
		</AbsoluteFill>
	);
};

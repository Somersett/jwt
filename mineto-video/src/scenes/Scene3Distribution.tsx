import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {AnimatedMoney} from '../components/AnimatedMoney';
import {Connector} from '../components/Connector';
import {MetricCard} from '../components/MetricCard';
import {ReserveBar} from '../components/ReserveBar';
import {Mask} from '../components/TextReveal';
import {COPY} from '../data/copy';
import {
	AVAILABLE,
	BUCKETS,
	INCOME,
	RESERVES,
	RUNNING_AVAILABLE,
	formatCOP,
	formatPercent,
	shareOfIncome,
} from '../data/money';
import {DISTRIBUTION_GEO, INCOME_GEO, distributionConnector} from '../layout/geometry';
import {textWidth} from '../layout/measure';
import {lerp, mixColor, progress, pulse, springAt} from '../motion/animate';
import {DUR, EASE, SPRING} from '../motion/easing';
import {DISTRIBUTION_T, SCENES} from '../motion/timeline';
import {COLORS} from '../theme/colors';
import {RADIUS, STROKE, space} from '../theme/spacing';
import {TYPE, capCenterFromTop} from '../theme/typography';
import {incomeBarState} from './Scene2Income';

/**
 * 12–19.5 s · Income → reserves → what is left.
 * Frames below are local to the scene.
 *
 * AUDIO  f0    whoosh: the amount lifts into tier 01
 *        f45   soft click (seguridad social lands)
 *        f75   soft click (impuestos)
 *        f105  soft click (retenciones)
 *        f55   number tick (odometer) each time the available amount rolls down (55, 85, 115)
 *        f135  transition hit: the available amount resolves in mint (beat 9)
 */

const G = DISTRIBUTION_GEO;
const T = DISTRIBUTION_T;

/** Gaps of the bar at any frame: each reserve detaches when its card lands. */
const barGaps = (frame: number, move: number) => {
	const from = incomeBarState(SCENES.income.duration).gaps;
	const reserveGaps = [0, 1].map((i) =>
		lerp(from[i], G.barGap, progress(frame, T.buckets[i], DUR.base, EASE.inOut)),
	);
	return [...reserveGaps, lerp(from[2], G.barGap, move)];
};

const TierLabel: React.FC<{index: number; frame: number; exit: number}> = ({index, frame, exit}) => {
	const fontSize = Number(TYPE.label.fontSize);
	const lineHeight = 1.5;
	const lines = COPY.distribution.tiers[index].split('\n');
	return (
		<div
			style={{
				...TYPE.label,
				lineHeight,
				position: 'absolute',
				left: G.tierLabelX,
				top: G.nodeY[index] - capCenterFromTop(fontSize, lineHeight),
				whiteSpace: 'nowrap',
			}}
		>
			{lines.map((line, i) => (
				<div key={line}>
					<Mask enter={progress(frame, T.tiers[index] + i * 3, DUR.base, EASE.out)} exit={exit}>
						{i === 0 ? <span style={{color: COLORS.ink}}>{`0${index + 1}  `}</span> : <span style={{visibility: 'hidden'}}>{'00  '}</span>}
						<span style={{color: COLORS.inkSoft}}>{line}</span>
					</Mask>
				</div>
			))}
		</div>
	);
};

export const Scene3Distribution: React.FC = () => {
	const frame = useCurrentFrame();
	const from = INCOME_GEO;
	const move = progress(frame, T.move, T.moveDuration, EASE.inOut);
	const exit = (delay = 0) => progress(frame, T.exit + delay, DUR.fast, EASE.in);

	// Tier 01: the income figure shrinks into place.
	const numberScale = lerp(1, G.incomeNumber.fontSize / from.number.fontSize, move);
	const numberX = lerp(from.number.x, G.incomeNumber.x, move);
	const numberTop = lerp(from.number.top, G.incomeNumber.top, move);

	// The bar follows, then splits as each reserve lands.
	const incoming = incomeBarState(SCENES.income.duration);
	const gaps = barGaps(frame, move);
	const barX = lerp(incoming.x, G.bar.x, move);
	const barY = lerp(incoming.y, G.bar.y, move);
	const barW = lerp(incoming.w, G.bar.w, move);
	const barOut = progress(frame, T.exit, DUR.base, EASE.in);

	// Spine linking the three tiers.
	const spine = progress(frame, T.spine, DUR.slow + 4, EASE.inOut);
	const spineOut = progress(frame, T.exit, DUR.base, EASE.in);
	const spineTop = G.nodeY[0];
	const spineLength = G.nodeY[2] - G.nodeY[0];

	// Tier 03: what is left, rolling down as each reserve is taken.
	const resolve = progress(frame, T.resolve, DUR.base, EASE.out);
	const availableIn = progress(frame, T.availableIn, DUR.move, EASE.out);
	const availableColor = mixColor(COLORS.inkSoft, COLORS.mintDeep, resolve);
	const chipX = G.available.x + textWidth(formatCOP(AVAILABLE), TYPE.amountXL) + space(4);

	return (
		<AbsoluteFill>
			{/* Spine */}
			<div
				style={{
					position: 'absolute',
					left: G.spineX - STROKE.hair / 2,
					top: spineTop + spineLength * spineOut,
					width: STROKE.hair,
					height: spineLength * Math.max(0, spine - spineOut),
					background: COLORS.lineStrong,
				}}
			/>
			{G.nodeY.map((y, i) => {
				const pop = springAt(frame, T.tiers[i], SPRING.snap) * (1 - exit(i * 2));
				const isAvailable = i === 2;
				const ring = isAvailable ? pulse(Math.max(0, frame - T.resolve), 40) * resolve : 0;
				return (
					<React.Fragment key={y}>
						{isAvailable ? (
							<div
								style={{
									position: 'absolute',
									left: G.spineX - 6,
									top: y - 6,
									width: 12,
									height: 12,
									borderRadius: 6,
									background: COLORS.mint,
									opacity: 0.35 * (1 - ring) * resolve * (1 - exit()),
									transform: `scale(${1 + ring * 1.6})`,
								}}
							/>
						) : null}
						<div
							style={{
								position: 'absolute',
								left: G.spineX - 6,
								top: y - 6,
								width: 12,
								height: 12,
								borderRadius: 6,
								boxSizing: 'border-box',
								border: `${STROKE.line}px solid ${isAvailable ? mixColor(COLORS.ink, COLORS.mint, resolve) : COLORS.ink}`,
								background: isAvailable ? mixColor(COLORS.paper, COLORS.mint, resolve) : COLORS.paper,
								transform: `scale(${pop})`,
							}}
						/>
					</React.Fragment>
				);
			})}
			{[0, 1, 2].map((i) => (
				<TierLabel key={i} index={i} frame={frame} exit={exit(i * 2)} />
			))}

			{/* Tier 01 · income */}
			<div
				style={{
					...TYPE.display,
					position: 'absolute',
					left: numberX,
					top: numberTop,
					transformOrigin: '0 0',
					transform: `scale(${numberScale})`,
					whiteSpace: 'nowrap',
				}}
			>
				<Mask enter={1} exit={exit(2)}>
					{formatCOP(INCOME)}
				</Mask>
			</div>

			<ReserveBar
				segments={BUCKETS}
				width={barW}
				gaps={gaps}
				colors={BUCKETS.map((b) => b.color)}
				reveal={1 - barOut}
				style={{left: barX, top: barY}}
			/>

			{/* Tier 02 · reserves, each routed from its slice of the bar */}
			{RESERVES.map((bucket, i) => {
				const at = T.buckets[i];
				return (
					<React.Fragment key={bucket.id}>
						<Connector
							points={distributionConnector(i, gaps)}
							draw={progress(frame, at, T.connectorDuration, EASE.inOut)}
							retract={progress(frame, T.exit - 6 + i * 2, DUR.fast, EASE.in)}
							color={bucket.color}
						/>
						<MetricCard
							rect={G.cards[i]}
							label={bucket.label}
							value={bucket.value}
							share={shareOfIncome(bucket.value)}
							color={bucket.color}
							at={at + T.cardDelay}
							countDelay={T.countDelay - T.cardDelay + 3}
							exitAt={T.exit + i * 3}
							shareSuffix={COPY.distribution.shareSuffix}
						/>
					</React.Fragment>
				);
			})}

			{/* Tier 03 · available */}
			<div
				style={{
					...TYPE.amountXL,
					color: availableColor,
					position: 'absolute',
					left: G.available.x,
					top: G.available.top,
				}}
			>
				<Mask enter={availableIn}>
					<AnimatedMoney
						mode="roll"
						keyframes={RUNNING_AVAILABLE.map((value, i) => ({
							at: i === 0 ? 0 : T.buckets[i - 1] + T.rollDelay,
							value,
						}))}
						duration={T.rollDuration}
						digitStagger={1}
					/>
				</Mask>
			</div>
			<div
				style={{
					position: 'absolute',
					left: chipX,
					top: G.nodeY[2] - 22,
					height: 44,
					padding: `0 ${space(2.25)}px`,
					borderRadius: RADIUS.pill,
					...TYPE.small,
					background: COLORS.mintWash,
					color: COLORS.mintDeep,
					display: 'flex',
					alignItems: 'center',
					fontWeight: 600,
					whiteSpace: 'nowrap',
					clipPath: `inset(0 ${(1 - progress(frame, T.resolve + 4, DUR.move, EASE.out) + exit()) * 100}% 0 0 round ${RADIUS.pill}px)`,
				}}
			>
				{`${formatPercent(shareOfIncome(AVAILABLE))} ${COPY.distribution.availableNote}`}
			</div>
		</AbsoluteFill>
	);
};

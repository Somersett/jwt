import React from 'react';
import {useCurrentFrame} from 'remotion';
import {COPY} from '../data/copy';
import {AVAILABLE, BUCKETS, RESERVES, formatCOP, formatMillions, formatPercent, shareOfIncome} from '../data/money';
import {PRODUCT_GEO} from '../layout/geometry';
import {textWidth} from '../layout/measure';
import {clamp01, lerp, lerpRect, mixColor, progress, pulse, springAt} from '../motion/animate';
import type {Rect} from '../motion/animate';
import {DUR, EASE, SPRING} from '../motion/easing';
import {PRODUCT_T} from '../motion/timeline';
import {COLORS} from '../theme/colors';
import {RADIUS, space} from '../theme/spacing';
import {TABULAR, TYPE, capCenterFromTop} from '../theme/typography';
import {AnimatedMoney} from './AnimatedMoney';
import {LogoInline} from './Logo';
import {ReserveBar, segmentBoxes} from './ReserveBar';
import {Mask} from './TextReveal';

/** How the hero amount is carried in from the previous scene. 0 offsets = at rest. */
export type HeroMorph = {
	dx: number;
	dy: number;
	scale: number;
	color: string;
	/** 0→1: the full amount collapses into its compact form. */
	swap: number;
};

const G = PRODUCT_GEO;
const STATUS_W = 172;
const STATUS_H = 40;
/** UI text runs a size above the web original so it survives on a phone screen. */
const ROW_TEXT = {...TYPE.body, fontSize: 26, lineHeight: 1};
const AMOUNT_RIGHT = G.card.x + G.card.w - G.pad - STATUS_W - space(3);

const commonPrefix = (a: string, b: string) => {
	let i = 0;
	while (i < a.length && i < b.length && a[i] === b[i]) i++;
	return a.slice(0, i);
};

const HERO_FULL = formatCOP(AVAILABLE);
const HERO_COMPACT = formatMillions(AVAILABLE);
const HERO_PREFIX = commonPrefix(HERO_FULL, HERO_COMPACT);

const FROM_TAIL = HERO_FULL.slice(HERO_PREFIX.length);
const TO_TAIL = HERO_COMPACT.slice(HERO_PREFIX.length);

/** Width of the part after the shared prefix, mid-swap. */
const tailWidth = (swap: number) =>
	lerp(textWidth(FROM_TAIL, TYPE.hero), textWidth(TO_TAIL, TYPE.hero), EASE.inOut(swap));

/** The protagonist figure. Its tail rolls away as the full amount becomes "$4,8M". */
const HeroAmount: React.FC<{morph: HeroMorph}> = ({morph}) => {
	const style = TYPE.hero;
	const fromTail = FROM_TAIL;
	const toTail = TO_TAIL;
	const width = tailWidth(morph.swap);
	const out = clamp01(morph.swap / 0.6);
	const inn = clamp01((morph.swap - 0.4) / 0.6);
	return (
		<div
			style={{
				...style,
				color: morph.color,
				position: 'absolute',
				left: G.hero.x,
				top: G.hero.top,
				whiteSpace: 'nowrap',
				transformOrigin: '0 0',
				transform: `translate(${morph.dx}px, ${morph.dy}px) scale(${morph.scale})`,
			}}
		>
			<span>{HERO_PREFIX}</span>
			<span style={{position: 'relative', display: 'inline-block', width, height: '1em', verticalAlign: 'top'}}>
				<span style={{position: 'absolute', left: 0, top: 0}}>
					<Mask enter={1} exit={EASE.in(out)}>
						{fromTail}
					</Mask>
				</span>
				<span style={{position: 'absolute', left: 0, top: 0}}>
					<Mask enter={EASE.out(inn)}>{toTail}</Mask>
				</span>
			</span>
		</div>
	);
};

const Check: React.FC<{draw: number; color: string}> = ({draw, color}) => (
	<svg width={14} height={14} viewBox="0 0 14 14" style={{flexShrink: 0}}>
		<path
			d="M2.5 7.4 L5.6 10.3 L11.5 3.8"
			fill="none"
			stroke={color}
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			pathLength={1}
			strokeDasharray={`${clamp01(draw)} 2`}
		/>
	</svg>
);

const StatusPill: React.FC<{at: number}> = ({at}) => {
	const frame = useCurrentFrame();
	const done = springAt(frame, at, SPRING.snap);
	const t = clamp01(done);
	const pop = 1 + 0.06 * Math.sin(Math.PI * progress(frame, at, DUR.fast, EASE.linear));
	return (
		<div
			style={{
				position: 'relative',
				width: STATUS_W,
				height: STATUS_H,
				borderRadius: RADIUS.pill,
				border: `1px solid ${mixColor(COLORS.lineStrong, COLORS.mintWash, t)}`,
				background: mixColor(COLORS.paperRaised, COLORS.mintWash, t),
				boxSizing: 'border-box',
				transform: `scale(${pop})`,
				overflow: 'hidden',
			}}
		>
			{[
				{text: COPY.product.pending, color: COLORS.inkMute, enter: 1, exit: t, icon: false},
				{text: COPY.product.done, color: COLORS.mintDeep, enter: t, exit: 0, icon: true},
			].map((state) => (
				<div
					key={state.text}
					style={{
						position: 'absolute',
						inset: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: space(1),
						...TYPE.small,
						fontSize: 19,
						color: state.color,
					}}
				>
					<Mask enter={state.enter} exit={state.exit}>
						<span style={{display: 'inline-flex', alignItems: 'center', gap: space(1)}}>
							{state.icon ? <Check draw={progress(frame, at + 3, DUR.base, EASE.out)} color={state.color} /> : null}
							{state.text}
						</span>
					</Mask>
				</div>
			))}
		</div>
	);
};

const Row: React.FC<{index: number; frame: number}> = ({index, frame}) => {
	const bucket = RESERVES[index];
	const top = G.rowsTop + index * G.rowHeight;
	const enter = progress(frame, PRODUCT_T.rowsIn + index * PRODUCT_T.rowStagger, DUR.base, EASE.out);
	const rule = progress(frame, PRODUCT_T.rowsIn + index * PRODUCT_T.rowStagger - 4, DUR.move, EASE.out);
	const centerY = G.rowHeight / 2;
	const textTop = centerY - capCenterFromTop(ROW_TEXT.fontSize, 1);
	return (
		<div style={{position: 'absolute', left: G.card.x + G.pad, top, width: G.card.w - G.pad * 2, height: G.rowHeight}}>
			<div
				style={{
					position: 'absolute',
					left: 0,
					top: 0,
					height: 1,
					width: `${rule * 100}%`,
					background: COLORS.line,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					left: 0,
					top: centerY - 5,
					width: 10,
					height: 10,
					borderRadius: 5,
					background: bucket.color,
					transform: `scale(${enter})`,
				}}
			/>
			<div style={{...ROW_TEXT, position: 'absolute', left: space(3.5), top: textTop}}>
				<Mask enter={enter}>{bucket.shortLabel}</Mask>
			</div>
			<div
				style={{
					...ROW_TEXT,
					...TABULAR,
					fontWeight: 600,
					position: 'absolute',
					right: G.card.x + G.card.w - G.pad - AMOUNT_RIGHT,
					top: textTop,
				}}
			>
				<Mask enter={enter}>
					<AnimatedMoney
						keyframes={[
							{at: 0, value: 0},
							{at: PRODUCT_T.rowsIn + index * PRODUCT_T.rowStagger, value: bucket.value},
						]}
						duration={DUR.slow}
						roundTo={100}
					/>
				</Mask>
			</div>
			<div
				style={{
					position: 'absolute',
					right: 0,
					top: centerY - STATUS_H / 2,
					clipPath: `inset(0 0 0 ${(1 - enter) * 100}% round ${RADIUS.pill}px)`,
				}}
			>
				<StatusPill at={PRODUCT_T.checks + index * PRODUCT_T.checkStagger} />
			</div>
		</div>
	);
};

const Cursor: React.FC<{x: number; y: number; press: number; scale: number}> = ({x, y, press, scale}) => (
	<div
		style={{
			position: 'absolute',
			left: x,
			top: y,
			transformOrigin: '2px 2px',
			transform: `scale(${scale * (1 - 0.12 * press)})`,
		}}
	>
		<svg width={30} height={36} viewBox="0 0 30 36" style={{overflow: 'visible'}}>
			<path
				d="M2 2 L2 28 L9.2 21.4 L14 32.6 L18.6 30.6 L13.9 19.6 L23.6 19.6 Z"
				fill={COLORS.ink}
				stroke={COLORS.paperRaised}
				strokeWidth={2}
				strokeLinejoin="round"
			/>
		</svg>
	</div>
);

/**
 * A fictional but plausible Mineto screen: one protagonist figure, the money
 * bar, three reserves with their state, and one timely nudge.
 */
export const InterfaceMockup: React.FC<{hero: HeroMorph}> = ({hero}) => {
	const frame = useCurrentFrame();
	const t = PRODUCT_T;
	const {card} = G;

	// The card grows out of the figure's box once the figure has landed.
	const heroBox: Rect = {
		x: G.hero.x - space(2.5),
		y: G.hero.top - space(1),
		w: textWidth(HERO_PREFIX, TYPE.hero) + tailWidth(hero.swap) + space(5),
		h: G.hero.fontSize + space(2),
	};
	const grow = progress(frame, t.frameReveal, t.frameRevealDuration, EASE.inOut);
	const box = lerpRect(heroBox, card, grow);
	const surface = progress(frame, t.frameReveal, DUR.micro, EASE.out);
	const showCard = frame >= t.frameReveal;

	const topbar = progress(frame, t.topbarIn, DUR.base, EASE.out);
	const label = progress(frame, t.labelIn, DUR.base, EASE.out);
	const sub = progress(frame, t.subIn, DUR.base, EASE.out);
	const bar = progress(frame, t.barIn, DUR.slow, EASE.out);
	const alert = progress(frame, t.alertIn, DUR.move, EASE.out);

	// Hover micro-interaction on the available slice of the bar.
	const boxes = segmentBoxes(BUCKETS, G.bar.w, [G.barGap, G.barGap, G.barGap]);
	const target = {
		x: G.bar.x + boxes[3].x + boxes[3].w * 0.64,
		y: G.bar.y + G.bar.h / 2 + 4,
	};
	const cursorIn = progress(frame, t.cursorIn, DUR.move, EASE.inOut);
	const cursorShow = progress(frame, t.cursorIn, DUR.micro, EASE.out);
	const cursor = {
		x: lerp(card.x + card.w - 90, target.x, cursorIn),
		y: lerp(card.y + card.h - 70, target.y, cursorIn),
	};
	const press = Math.sin(Math.PI * progress(frame, t.tooltipIn - 6, DUR.micro, EASE.linear));
	const tip = progress(frame, t.tooltipIn, DUR.base, EASE.out);
	const dim = progress(frame, t.tooltipIn - 2, DUR.fast, EASE.out);

	const chipX = G.hero.x + textWidth(HERO_COMPACT, TYPE.hero) + space(3.5);
	const heroCapCenter = G.hero.top + capCenterFromTop(G.hero.fontSize, 1);

	return (
		<>
			{/* Card surface: grows from the figure, content stays fixed in stage space. */}
			<div
				style={{
					display: showCard ? 'block' : 'none',
					position: 'absolute',
					left: box.x,
					top: box.y,
					width: box.w,
					height: box.h,
					borderRadius: lerp(RADIUS.md, RADIUS.xl, grow),
					background: mixColor(COLORS.paper, COLORS.paperRaised, surface),
					border: `1px solid ${mixColor(COLORS.paper, 'rgba(14,15,13,0.11)', surface)}`,
					boxSizing: 'border-box',
					boxShadow: `0 1px 0 rgba(14,15,13,0.03), 0 40px 80px -40px rgba(14,15,13,${0.22 * grow})`,
					overflow: 'hidden',
				}}
			>
				<div style={{position: 'absolute', left: -box.x, top: -box.y, width: 1920, height: 1080}}>
					{/* Top bar */}
					<div
						style={{
							position: 'absolute',
							left: card.x + space(4),
							top: card.y,
							width: card.w - space(8),
							height: G.topbarHeight,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<div style={{clipPath: `inset(0 ${(1 - topbar) * 100}% 0 0)`}}>
							<LogoInline fontSize={24} />
						</div>
						<div style={{display: 'flex', alignItems: 'center', gap: space(1.5)}}>
							<div
								style={{
									...TYPE.small,
									fontSize: 18,
									color: COLORS.inkSoft,
									border: `1px solid ${COLORS.line}`,
									borderRadius: RADIUS.pill,
									padding: `${space(1)}px ${space(2)}px`,
									display: 'flex',
									alignItems: 'center',
									gap: space(1),
									transform: `translateY(${(1 - topbar) * 8}px)`,
									opacity: topbar,
								}}
							>
								{COPY.product.period}
								<svg width={10} height={10} viewBox="0 0 10 10">
									<path d="M2 3.5 L5 6.5 L8 3.5" fill="none" stroke={COLORS.inkMute} strokeWidth={1.5} strokeLinecap="round" />
								</svg>
							</div>
							<div
								style={{
									width: 38,
									height: 38,
									borderRadius: 19,
									background: COLORS.ink,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									...TYPE.micro,
									color: COLORS.paper,
									transform: `scale(${topbar})`,
								}}
							>
								{COPY.product.account}
							</div>
						</div>
					</div>
					<div
						style={{
							position: 'absolute',
							left: card.x,
							top: card.y + G.topbarHeight,
							height: 1,
							width: card.w * topbar,
							background: COLORS.line,
						}}
					/>

					{/* Label + context */}
					<div style={{...TYPE.body, fontSize: 26, color: COLORS.inkSoft, position: 'absolute', left: G.label.x, top: G.label.top}}>
						<Mask enter={label}>{COPY.product.availableLabel}</Mask>
					</div>
					<div style={{...TYPE.small, fontSize: 22, color: COLORS.inkMute, position: 'absolute', left: G.sub.x, top: G.sub.top}}>
						<Mask enter={sub}>{COPY.product.availableSub}</Mask>
					</div>
					<div
						style={{
							position: 'absolute',
							left: chipX,
							top: heroCapCenter - 20,
							height: 40,
							padding: `0 ${space(2)}px`,
							borderRadius: RADIUS.pill,
							...TYPE.small,
							fontSize: 20,
							background: COLORS.mintWash,
							color: COLORS.mintDeep,
							display: 'flex',
							alignItems: 'center',
							fontWeight: 600,
							clipPath: `inset(0 ${(1 - sub) * 100}% 0 0 round ${RADIUS.pill}px)`,
						}}
					>
						{`${formatPercent(shareOfIncome(AVAILABLE))} ${COPY.distribution.availableNote}`}
					</div>

					{/* Money bar */}
					<ReserveBar
						segments={BUCKETS}
						width={G.bar.w}
						gaps={[G.barGap, G.barGap, G.barGap]}
						reveal={bar}
						opacities={[1 - 0.6 * dim, 1 - 0.6 * dim, 1 - 0.6 * dim, 1]}
						style={{left: G.bar.x, top: G.bar.y}}
					/>

					{/* Reserves */}
					{RESERVES.map((_, i) => (
						<Row key={i} index={i} frame={frame} />
					))}

					{/* Timely nudge */}
					<div
						style={{
							position: 'absolute',
							left: G.card.x + G.pad,
							top: G.alertTop,
							height: 52,
							padding: `0 ${space(2.5)}px`,
							borderRadius: RADIUS.pill,
							background: COLORS.amberWash,
							display: 'flex',
							alignItems: 'center',
							gap: space(1.5),
							clipPath: `inset(0 ${(1 - alert) * 100}% 0 0 round ${RADIUS.pill}px)`,
						}}
					>
						<div style={{position: 'relative', width: 10, height: 10}}>
							<div
								style={{
									position: 'absolute',
									inset: 0,
									borderRadius: 5,
									background: COLORS.amber,
									transform: `scale(${1 + 1.4 * pulse(frame - t.alertIn, 30)})`,
									opacity: 0.35 * (1 - pulse(frame - t.alertIn, 30)),
								}}
							/>
							<div style={{position: 'absolute', inset: 0, borderRadius: 5, background: COLORS.amber}} />
						</div>
						<div style={{...TYPE.small, fontSize: 21, color: COLORS.amberDeep, whiteSpace: 'nowrap'}}>
							<Mask enter={progress(frame, t.alertIn + 4, DUR.base, EASE.out)}>{COPY.product.alert}</Mask>
						</div>
					</div>

					{/* Tooltip */}
					{tip > 0 ? (
						<div
							style={{
								position: 'absolute',
								left: target.x,
								top: G.bar.y - 16,
								transform: `translate(-50%, -100%) translateY(${(1 - tip) * 8}px)`,
								clipPath: `inset(${(1 - tip) * 100}% 0 0 0 round ${RADIUS.sm}px)`,
							}}
						>
							<div
								style={{
									background: COLORS.ink,
									borderRadius: RADIUS.sm,
									padding: `${space(1.25)}px ${space(1.75)}px`,
									display: 'flex',
									alignItems: 'center',
									gap: space(1.25),
									whiteSpace: 'nowrap',
									...TYPE.small,
									fontSize: 18,
									color: COLORS.paper,
								}}
							>
								<div style={{width: 8, height: 8, borderRadius: 4, background: COLORS.mint}} />
								<span style={{color: 'rgba(243,241,236,0.7)'}}>{COPY.product.tooltip}</span>
								<span style={{...TABULAR, fontWeight: 600}}>{formatCOP(AVAILABLE)}</span>
							</div>
						</div>
					) : null}
				</div>
			</div>

			<HeroAmount morph={hero} />

			{cursorShow > 0 ? <Cursor x={cursor.x} y={cursor.y} press={press} scale={cursorShow} /> : null}
		</>
	);
};

import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Logo, logoLayout, markPartRadius} from '../components/Logo';
import {TextReveal} from '../components/TextReveal';
import {COPY} from '../data/copy';
import {LOGO_END, MANIFESTO_GEO} from '../layout/geometry';
import {textWidth} from '../layout/measure';
import {clamp01, lerp, lerpRect, progress} from '../motion/animate';
import type {Rect} from '../motion/animate';
import {DUR, EASE} from '../motion/easing';
import {MANIFESTO_T} from '../motion/timeline';
import {COLORS} from '../theme/colors';
import {CONTENT} from '../theme/spacing';
import {capCenterFromTop} from '../theme/typography';

/**
 * 27–32.5 s · Three statements, then they fuse into MINETO.
 * Frames below are local to the scene.
 *
 * AUDIO  f6    soft whoosh per statement (6, 42, 78)
 *        f118  riser as the markers line up on the slit
 *        f124  reverse swell: the middle statement collapses into a hairline
 *        f135  transition hit: the wordmark opens out of the slit (beat 9)
 *        f136  soft click: the bar folds into the logo mark
 */

const G = MANIFESTO_GEO;
const T = MANIFESTO_T;

/** Each statement is tagged by a slice of the money bar. */
const MARKER_COLORS = [COLORS.paper, COLORS.amber, COLORS.mint];
/**
 * What each marker becomes: the outer two turn into the two parts of the mark,
 * the middle one is squeezed out into the slit between them.
 */
const MARKER_TARGET = ['reserved', 'slit', 'available'] as const;
/** Room around the glyphs inside each statement's own mask. */
const BLEED = 0.24;
/** Gap between markers once they line up as a single bar. */
const MARKER_GAP = 6;

export const Scene5Manifesto: React.FC = () => {
	const frame = useCurrentFrame();
	const style = G.style;
	const fontSize = style.fontSize;

	const widths = COPY.manifesto.map((line) => textWidth(line, style));
	const blockWidth = G.marker.w + G.marker.gap + Math.max(...widths);
	const left = CONTENT.centerX - blockWidth / 2;
	const textX = left + G.marker.w + G.marker.gap;
	const centers = COPY.manifesto.map((_, i) => G.centerY + (i - 1) * G.lineStep);
	// Lined up on the slit, the markers sit just left of the collapsing statement.
	const slitBarLeft = textX - G.marker.gap - (G.marker.w * 3 + MARKER_GAP * 2);

	const leave = progress(frame, T.converge, T.convergeDuration, EASE.in);
	const slit = progress(frame, T.slit, T.slitDuration, EASE.inOut);
	const align = progress(frame, T.markersAlign, T.markersAlignDuration, EASE.inOut);
	const toMark = progress(frame, T.markersToMark, T.markersToMarkDuration, EASE.inOut);
	const wordmarkOpen = progress(frame, T.wordmarkOpen, T.wordmarkOpenDuration, EASE.out);
	const logo = logoLayout(LOGO_END.fontSize, {x: CONTENT.centerX, y: LOGO_END.centerY.born});

	// The hairline that the middle statement collapses into, then the wordmark opens from.
	const hairlineOpacity = clamp01((slit - 0.55) / 0.25) * (1 - clamp01(wordmarkOpen / 0.4));
	const hairlineLeft = lerp(textX, logo.wordmark.x, wordmarkOpen);
	const hairlineWidth = lerp(widths[1], logo.wordmark.width, wordmarkOpen);

	return (
		<AbsoluteFill style={{background: COLORS.night}}>
			{COPY.manifesto.map((line, i) => {
				const next = T.lines[i + 1];
				const dim = next === undefined ? 0 : progress(frame, next, T.dimDuration, EASE.out);
				const top = centers[i] - capCenterFromTop(fontSize, 1);
				// Outer lines clear away from the centre through their own mask edge,
				// leaving the middle one alone to collapse into the slit.
				const awayFromCentre = i === 0 ? -1 : i === 2 ? 1 : 0;
				const bleed = BLEED * fontSize;
				return (
					<div
						key={line}
						style={{
							position: 'absolute',
							left: textX - bleed,
							top: top - bleed,
							width: widths[i] + bleed * 2,
							height: fontSize + bleed * 2,
							overflow: 'hidden',
							clipPath: i === 1 ? `inset(${slit * 50}% 0 ${slit * 50}% 0)` : undefined,
						}}
					>
						<div
							style={{
								...style,
								color: COLORS.paper,
								position: 'absolute',
								left: bleed,
								top: bleed,
								whiteSpace: 'nowrap',
								opacity: lerp(1, 0.28, dim),
								transform: `translateY(${awayFromCentre * leave * (fontSize + bleed * 2)}px)`,
							}}
						>
							<TextReveal text={line} start={T.lines[i]} stagger={2} duration={DUR.move} />
						</div>
					</div>
				);
			})}

			{hairlineOpacity > 0 ? (
				<div
					style={{
						position: 'absolute',
						left: hairlineLeft,
						top: G.centerY - 1,
						width: hairlineWidth,
						height: 2,
						background: COLORS.paper,
						opacity: hairlineOpacity,
					}}
				/>
			) : null}

			{/* Markers: they line up on the slit as one segmented bar, then become the mark. */}
			{COPY.manifesto.map((line, i) => {
				const drawIn = progress(frame, T.lines[i] - 2, DUR.base, EASE.out);
				const start: Rect = {x: left, y: centers[i] - G.marker.h / 2, w: G.marker.w, h: G.marker.h};
				const onSlit: Rect = {
					x: slitBarLeft + i * (G.marker.w + MARKER_GAP),
					y: G.centerY - G.marker.h / 2,
					w: G.marker.w,
					h: G.marker.h,
				};
				const part = MARKER_TARGET[i];
				const target: Rect =
					part === 'slit'
						? {
								x: (logo.reserved.x + logo.reserved.w + logo.available.x) / 2,
								y: logo.available.y,
								w: 0,
								h: logo.side,
							}
						: logo[part];
				const rect = lerpRect(lerpRect(start, onSlit, align), target, toMark);
				const radius =
					toMark < 1 || part === 'slit'
						? `${lerp(G.marker.h / 2, logo.side * 0.12, toMark)}px`
						: markPartRadius(logo.side, part);
				if (rect.w < 0.5) return null;
				return (
					<div
						key={line}
						style={{
							position: 'absolute',
							left: rect.x,
							top: rect.y,
							width: rect.w,
							height: rect.h,
							borderRadius: radius,
							background: MARKER_COLORS[i],
							transformOrigin: '0 50%',
							transform: `scaleX(${drawIn})`,
						}}
					/>
				);
			})}

			{/* The wordmark opens out of the slit; the mark is made of the markers. */}
			<Logo layout={logo} ink={COLORS.paper} wordmarkOpen={wordmarkOpen} markReveal={0} />
		</AbsoluteFill>
	);
};

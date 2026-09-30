import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Logo, logoLayout} from '../components/Logo';
import {ClipReveal} from '../components/SceneTransition';
import {Mask, TextReveal} from '../components/TextReveal';
import {COPY} from '../data/copy';
import {END_GEO, LOGO_END} from '../layout/geometry';
import {lerp, mixColor, progress, springAt} from '../motion/animate';
import {DUR, EASE, SPRING} from '../motion/easing';
import {END_T} from '../motion/timeline';
import {COLORS} from '../theme/colors';
import {CONTENT, RADIUS, STAGE, STROKE, space} from '../theme/spacing';
import {TYPE} from '../theme/typography';

/**
 * 32.5–37.5 s · End card.
 * Frames below are local to the scene.
 *
 * AUDIO  f0    transition hit: paper wipes up over the ink
 *        f24   soft whoosh under the tagline
 *        f84   soft click: CTA hover
 *        f114  final "click" as the mark closes; let the pad ring out
 */

const T = END_T;

const Arrow: React.FC<{color: string; nudge: number}> = ({color, nudge}) => (
	<svg width={20} height={20} viewBox="0 0 20 20" style={{transform: `translateX(${nudge}px)`}}>
		<path
			d="M4 10 H15 M10.5 5.5 L15 10 L10.5 14.5"
			fill="none"
			stroke={color}
			strokeWidth={1.8}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export const Scene6EndCard: React.FC = () => {
	const frame = useCurrentFrame();

	const wipe = progress(frame, T.wipe, T.wipeDuration, EASE.inOut);
	const up = progress(frame, T.logoUp, DUR.slow, EASE.inOut);
	const centerY = lerp(LOGO_END.centerY.born, LOGO_END.centerY.rest, up);
	const layout = logoLayout(LOGO_END.fontSize, {x: CONTENT.centerX, y: centerY});

	// Closing gesture: the two parts of the mark part and click back together.
	const open = progress(frame, T.logoClose, DUR.fast, EASE.out);
	const close = springAt(frame, T.logoClose + DUR.fast, SPRING.snap);
	const split = 16 * (open - close);

	const ctaIn = progress(frame, T.ctaIn, DUR.move, EASE.out);
	const hover = progress(frame, T.ctaHover, DUR.base, EASE.inOut);
	const nudge = 5 * Math.sin(Math.PI * progress(frame, T.ctaHover + 4, DUR.base, EASE.inOut));
	const edgeY = STAGE.height * (1 - wipe);

	return (
		<AbsoluteFill>
			{/* Below: the manifesto's ink, still holding the light logo */}
			<AbsoluteFill style={{background: COLORS.night}}>
				<Logo layout={layout} ink={COLORS.paper} split={split} />
			</AbsoluteFill>

			{/* Above: paper rises; the logo recolours exactly at the edge */}
			<ClipReveal progress={wipe} from="bottom" style={{background: COLORS.paper}}>
				<Logo layout={layout} ink={COLORS.ink} split={split} />

				<div
					style={{
						...TYPE.headline,
						fontSize: 60,
						position: 'absolute',
						left: 0,
						width: STAGE.width,
						top: END_GEO.taglineTop,
						textAlign: 'center',
					}}
				>
					<TextReveal
						text={COPY.endCard.tagline}
						start={T.taglineIn}
						stagger={3}
						duration={DUR.move}
						tokenStyle={(i) => (i >= 2 ? {color: COLORS.mintDeep} : undefined)}
					/>
				</div>

				<div
					style={{
						position: 'absolute',
						left: 0,
						width: STAGE.width,
						top: END_GEO.ctaTop,
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							position: 'relative',
							height: END_GEO.ctaHeight,
							padding: `0 ${space(4)}px`,
							borderRadius: RADIUS.pill,
							border: `${STROKE.line}px solid ${COLORS.ink}`,
							boxSizing: 'border-box',
							display: 'flex',
							alignItems: 'center',
							gap: space(1.5),
							overflow: 'hidden',
							clipPath: `inset(0 ${(1 - ctaIn) * 50}% 0 ${(1 - ctaIn) * 50}% round ${RADIUS.pill}px)`,
						}}
					>
						<div
							style={{
								position: 'absolute',
								left: 0,
								top: 0,
								bottom: 0,
								width: `${hover * 100}%`,
								background: COLORS.ink,
							}}
						/>
						<div
							style={{
								...TYPE.body,
								position: 'relative',
								color: mixColor(COLORS.ink, COLORS.paper, hover),
								whiteSpace: 'nowrap',
							}}
						>
							<Mask enter={progress(frame, T.ctaIn + 6, DUR.base, EASE.out)}>{COPY.endCard.cta}</Mask>
						</div>
						<div style={{position: 'relative', display: 'flex'}}>
							<Arrow color={mixColor(COLORS.ink, COLORS.mint, hover)} nudge={nudge} />
						</div>
					</div>
				</div>

				<div
					style={{
						...TYPE.label,
						fontSize: 20,
						color: COLORS.inkSoft,
						position: 'absolute',
						left: 0,
						width: STAGE.width,
						top: END_GEO.urlTop,
						textAlign: 'center',
						textTransform: 'none',
						letterSpacing: '0.06em',
					}}
				>
					<TextReveal text={COPY.url} by="char" start={T.urlIn} stagger={1} duration={DUR.base} />
				</div>
			</ClipReveal>

			{/* Leading edge of the wipe */}
			{wipe > 0 && wipe < 1 ? (
				<div
					style={{
						position: 'absolute',
						left: 0,
						width: STAGE.width,
						top: edgeY - 2,
						height: 4,
						background: COLORS.mint,
					}}
				/>
			) : null}
		</AbsoluteFill>
	);
};

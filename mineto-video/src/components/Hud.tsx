import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {COPY} from '../data/copy';
import {HUD_GEO} from '../layout/geometry';
import {progress} from '../motion/animate';
import {DUR, EASE} from '../motion/easing';
import {SCENES} from '../motion/timeline';
import {COLORS} from '../theme/colors';
import {CONTENT, space} from '../theme/spacing';
import {TYPE, capCenterFromTop} from '../theme/typography';
import {LogoInline} from './Logo';
import {Mask} from './TextReveal';

const SECTIONS = (['income', 'distribution', 'product'] as const).map((id) => ({
	id,
	...COPY.hud.sections[id],
	from: SCENES[id].from,
	to: SCENES[id].from + SCENES[id].duration,
}));

const HUD_START = SCENES.income.from;
const HUD_END = SCENES.manifesto.from;
const labelTop = (centerY: number, fontSize: number) => centerY - capCenterFromTop(fontSize, 1);

/**
 * Editorial chrome for the data scenes: brand, section index and the
 * "illustrative example" disclaimer. Driven by the global frame.
 */
export const Hud: React.FC = () => {
	const frame = useCurrentFrame();
	if (frame < HUD_START || frame >= HUD_END) return null;

	const enter = progress(frame, HUD_START + 24, DUR.base, EASE.out);
	const disclaimer = progress(frame, HUD_START + 36, DUR.base, EASE.out);
	const labelSize = Number(TYPE.label.fontSize);
	const microSize = Number(TYPE.micro.fontSize);

	return (
		<AbsoluteFill style={{pointerEvents: 'none'}}>
			<div
				style={{
					position: 'absolute',
					left: CONTENT.left,
					top: HUD_GEO.topCenterY - 9,
					clipPath: `inset(0 ${(1 - enter) * 100}% 0 0)`,
				}}
			>
				<LogoInline fontSize={25} />
			</div>

			<div
				style={{
					position: 'absolute',
					right: CONTENT.left,
					top: labelTop(HUD_GEO.topCenterY, labelSize),
					...TYPE.label,
				}}
			>
				{SECTIONS.map((section, i) => {
					const inAt = i === 0 ? HUD_START + 26 : section.from + 2;
					const sectionEnter = progress(frame, inAt, DUR.base, EASE.out);
					const sectionExit =
						i === SECTIONS.length - 1 ? 0 : progress(frame, section.to - 8, DUR.fast, EASE.in);
					if (sectionEnter <= 0 || sectionExit >= 1) return null;
					return (
						<div key={section.id} style={{position: 'absolute', right: 0, top: 0, whiteSpace: 'nowrap'}}>
							<Mask enter={sectionEnter} exit={sectionExit}>
								<span style={{color: COLORS.ink}}>{section.index}</span>
								<span style={{color: COLORS.inkMute}}>{`  —  ${section.title}`}</span>
							</Mask>
						</div>
					);
				})}
			</div>

			<div
				style={{
					position: 'absolute',
					left: CONTENT.left,
					top: labelTop(HUD_GEO.bottomCenterY, microSize),
					display: 'flex',
					alignItems: 'center',
					gap: space(1.5),
					...TYPE.micro,
					color: COLORS.inkMute,
				}}
			>
				<div
					style={{
						width: 8,
						height: 8,
						borderRadius: 4,
						border: `1.5px solid ${COLORS.inkMute}`,
						transform: `scale(${disclaimer})`,
					}}
				/>
				<Mask enter={disclaimer}>{COPY.hud.disclaimer}</Mask>
			</div>
		</AbsoluteFill>
	);
};

import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {InterfaceMockup} from '../components/InterfaceMockup';
import {Mask} from '../components/TextReveal';
import {COPY} from '../data/copy';
import {DISTRIBUTION_GEO, PRODUCT_GEO} from '../layout/geometry';
import {lerp, mixColor, progress} from '../motion/animate';
import {DUR, EASE, STAGGER} from '../motion/easing';
import {PRODUCT_T} from '../motion/timeline';
import {COLORS} from '../theme/colors';
import {TYPE} from '../theme/typography';

/**
 * 12.5–17.5 s · The available amount becomes the product.
 *
 * AUDIO  f0    whoosh: the amount flies into the interface
 *        f12   number tick as "$4.803.400" rolls into "$4,8M"
 *        f18   soft riser: the card grows out of the figure
 *        f66   three soft clicks, one per "Separado" check (66, 72, 78)
 *        f84   soft click: the payment nudge slides in
 *        f88   whoosh (light) under the headline
 *        f108  soft click: cursor press on the bar
 *        f135  transition hit: the ink wipe (handled in MinetoPromo)
 */

const G = PRODUCT_GEO;
const T = PRODUCT_T;

export const Scene4Product: React.FC = () => {
	const frame = useCurrentFrame();
	const from = DISTRIBUTION_GEO.available;

	const move = progress(frame, T.move, T.moveDuration, EASE.inOut);
	const hero = {
		dx: (from.x - G.hero.x) * (1 - move),
		dy: (from.top - G.hero.top) * (1 - move),
		scale: lerp(from.fontSize / G.hero.fontSize, 1, move),
		color: mixColor(COLORS.mintDeep, COLORS.ink, move),
		swap: progress(frame, T.suffixSwap, T.suffixSwapDuration, EASE.linear),
	};

	const headline = G.headline;
	const lineStep = Number(TYPE.title.fontSize) * Number(TYPE.title.lineHeight);

	return (
		<AbsoluteFill>
			<InterfaceMockup hero={hero} />

			<div style={{position: 'absolute', left: headline.x, top: headline.eyebrowTop}}>
				<div style={{...TYPE.label, color: COLORS.mintDeep}}>
					<Mask enter={progress(frame, T.headlineIn, DUR.base, EASE.out)}>{COPY.product.eyebrow}</Mask>
				</div>
			</div>
			{COPY.product.headline.map((line, i) => (
				<div
					key={line}
					style={{
						...TYPE.title,
						position: 'absolute',
						left: headline.x,
						top: headline.top + i * lineStep,
						whiteSpace: 'nowrap',
						color: i === COPY.product.headline.length - 1 ? COLORS.inkSoft : COLORS.ink,
					}}
				>
					<Mask enter={progress(frame, T.headlineIn + 4 + i * STAGGER.line, DUR.move, EASE.out)}>{line}</Mask>
				</div>
			))}
		</AbsoluteFill>
	);
};

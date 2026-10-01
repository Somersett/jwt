import React from 'react';
import {AbsoluteFill, Html5Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Hud} from './components/Hud';
import {Wipe} from './components/SceneTransition';
import {FontGate} from './fonts';
import {progress} from './motion/animate';
import {EASE} from './motion/easing';
import {PRODUCT_T, SCENES, SCENE_ORDER} from './motion/timeline';
import type {SceneId} from './motion/timeline';
import {Scene1Intro} from './scenes/Scene1Intro';
import {Scene2Income} from './scenes/Scene2Income';
import {Scene3Distribution} from './scenes/Scene3Distribution';
import {Scene4Product} from './scenes/Scene4Product';
import {Scene5Manifesto} from './scenes/Scene5Manifesto';
import {Scene6EndCard} from './scenes/Scene6EndCard';
import {COLORS} from './theme/colors';

const SCENE_COMPONENTS: Record<SceneId, React.FC> = {
	intro: Scene1Intro,
	income: Scene2Income,
	distribution: Scene3Distribution,
	product: Scene4Product,
	manifesto: Scene5Manifesto,
	endCard: Scene6EndCard,
};

/** Ink wipe from the product scene into the manifesto; it also covers the HUD. */
const ProductToManifesto: React.FC = () => {
	const frame = useCurrentFrame();
	if (frame >= SCENES.manifesto.from) return null;
	const start = SCENES.product.from + PRODUCT_T.wipe;
	const amount = progress(frame, start, PRODUCT_T.wipeDuration, EASE.inOut);
	return <Wipe progress={amount} from="right" color={COLORS.night} edgeColor={COLORS.mint} />;
};

/**
 * Score + sound design, synthesised from the same timeline by `npm run audio`
 * (see audio/synth.py). One mastered stereo track, starting at frame 0.
 */
const SOUNDTRACK = staticFile('audio/soundtrack.wav');

export const MinetoPromo: React.FC = () => (
	<FontGate>
		<AbsoluteFill style={{background: COLORS.paper}}>
			<Html5Audio src={SOUNDTRACK} />
			{SCENE_ORDER.map((id) => {
				const slot = SCENES[id];
				const Scene = SCENE_COMPONENTS[id];
				return (
					<Sequence key={id} name={id} from={slot.from} durationInFrames={slot.duration + slot.tail}>
						<Scene />
					</Sequence>
				);
			})}
			<Hud />
			<ProductToManifesto />
		</AbsoluteFill>
	</FontGate>
);

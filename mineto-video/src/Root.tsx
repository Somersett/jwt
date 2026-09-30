import React from 'react';
import {Composition} from 'remotion';
import {MinetoPromo} from './MinetoPromo';
import {TOTAL_FRAMES} from './motion/timeline';
import {STAGE} from './theme/spacing';

export const RemotionRoot: React.FC = () => (
	<Composition
		id="MinetoPromo"
		component={MinetoPromo}
		durationInFrames={TOTAL_FRAMES}
		fps={STAGE.fps}
		width={STAGE.width}
		height={STAGE.height}
	/>
);

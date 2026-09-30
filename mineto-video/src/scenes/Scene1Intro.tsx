import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {ReserveBar} from '../components/ReserveBar';
import {Mask} from '../components/TextReveal';
import {COPY} from '../data/copy';
import {BUCKETS} from '../data/money';
import {INTRO_GEO, introLayout} from '../layout/geometry';
import {lerp, progress} from '../motion/animate';
import {DUR, EASE, STAGGER} from '../motion/easing';
import {INTRO_T, SCENES} from '../motion/timeline';
import {COLORS} from '../theme/colors';
import {CONTENT, STAGE} from '../theme/spacing';
import {TYPE} from '../theme/typography';

/**
 * 0–4 s · "Lo que ganas no es lo mismo que lo que puedes gastar."
 *
 * AUDIO  f3   soft riser under the wordmark
 *        f30  whoosh as MINETO lifts into the masthead (beat 2)
 *        f52  soft click as "ganas" snaps into its slot
 *        f66  soft tick run as the sentence ripples out
 *        f90  transition hit: the underline splits into four (beat 6)
 */

/**
 * State of the "ganas" underline at any frame; the income scene continues
 * from it. It draws in ink (what you earn), then splits: gaps open and the ink
 * slides off to the right, uncovering the four buckets underneath.
 */
export const introUnderlineState = (frame: number, width: number) => {
	const draw = progress(frame, INTRO_T.underlineDraw, DUR.base, EASE.out);
	const split = progress(frame, INTRO_T.underlineSplit, DUR.base, EASE.inOut);
	const uncover = progress(frame, INTRO_T.underlineSplit + 2, DUR.base, EASE.inOut);
	const gap = INTRO_GEO.splitGap * split;
	return {
		draw,
		gaps: [gap, gap, gap],
		covers: [{from: width * uncover, to: width, color: COLORS.ink}],
	};
};

/** Frame (local to this scene) after which the income scene owns the underline. */
export const INTRO_HANDOFF = SCENES.intro.duration;

const Wordmark: React.FC<{frame: number}> = ({frame}) => {
	const {tracking} = INTRO_GEO;
	const settle = progress(frame, 0, DUR.slow + 8, EASE.out);
	const lift = progress(frame, INTRO_T.toMasthead, DUR.move - 2, EASE.inOut);
	const exit = progress(frame, INTRO_T.exit, DUR.fast, EASE.in);
	const letterSpacing = lerp(lerp(tracking.enter, tracking.rest, settle), tracking.masthead, lift);
	const scale = lerp(1, INTRO_GEO.mastheadScale, lift);
	const centerY = lerp(INTRO_GEO.wordmarkCenterY, INTRO_GEO.mastheadCenterY, lift);
	const fontSize = Number(TYPE.wordmark.fontSize);

	return (
		<div
			style={{
				position: 'absolute',
				left: 0,
				width: STAGE.width,
				top: centerY - fontSize / 2,
				textAlign: 'center',
				transform: `scale(${scale})`,
				transformOrigin: '50% 50%',
			}}
		>
			<div
				style={{
					...TYPE.wordmark,
					letterSpacing: `${letterSpacing}em`,
					// Balances the tracking added after the last letter, so the word stays centred.
					paddingLeft: `${letterSpacing}em`,
					whiteSpace: 'pre',
					display: 'inline-block',
				}}
			>
				{Array.from(COPY.brand).map((char, i) => (
					<Mask
						key={i}
						enter={progress(frame, INTRO_T.wordmarkIn + i * STAGGER.char, DUR.move, EASE.out)}
						exit={exit}
					>
						{char}
					</Mask>
				))}
			</div>
		</div>
	);
};

export const Scene1Intro: React.FC = () => {
	const frame = useCurrentFrame();
	const layout = introLayout();
	const style = INTRO_GEO.sentenceStyle;

	// "ganas" arrives alone, centred, then glides into its slot in the sentence.
	const keywordIn = progress(frame, INTRO_T.ganasIn, DUR.base, EASE.out);
	const toSlot = progress(frame, INTRO_T.ganasToSlot, DUR.base - 2, EASE.inOut);
	const keywordDx = (CONTENT.centerX - layout.keywordCenter.x) * (1 - toSlot);
	const keywordDy = (CONTENT.centerY - layout.keywordCenter.y) * (1 - toSlot);
	const keywordScale = lerp(INTRO_GEO.keywordScale, 1, toSlot);

	const lines = [layout.line1.words, layout.line2.words];
	// Ripple: words enter in order of distance from the keyword.
	const rippleRank = new Map(
		lines
			.flatMap((words, li) =>
				words.map((w, wi) => ({
					key: `${li}-${wi}`,
					d: Math.hypot(
						w.x + w.width / 2 - layout.keywordCenter.x,
						(layout.tops[li] - layout.tops[0]) * 2.2,
					),
				})),
			)
			.filter((w) => w.key !== `0-${COPY.intro.keyword}`)
			.sort((a, b) => a.d - b.d)
			.map((w, rank) => [w.key, rank] as const),
	);
	let exitOrder = 0;

	const underline = introUnderlineState(frame, layout.underline.w);

	return (
		<AbsoluteFill>
			<Wordmark frame={frame} />

			{lines.map((words, lineIndex) =>
				words.map((word, wordIndex) => {
					const isKeyword = lineIndex === 0 && wordIndex === COPY.intro.keyword;
					const rank = rippleRank.get(`${lineIndex}-${wordIndex}`) ?? 0;
					const enter = isKeyword
						? keywordIn
						: progress(frame, INTRO_T.sentenceIn + rank * STAGGER.word, DUR.base, EASE.out);
					const exit = progress(frame, INTRO_T.exit + exitOrder++ * 0.6, DUR.fast, EASE.in);
					return (
						<div
							key={`${lineIndex}-${wordIndex}`}
							style={{
								...style,
								position: 'absolute',
								left: word.x,
								top: layout.tops[lineIndex],
								whiteSpace: 'pre',
								transformOrigin: '50% 50%',
								transform: isKeyword
									? `translate(${keywordDx}px, ${keywordDy}px) scale(${keywordScale})`
									: undefined,
							}}
						>
							<Mask enter={enter} exit={exit}>
								{word.text}
							</Mask>
						</div>
					);
				}),
			)}

			{frame < INTRO_HANDOFF && underline.draw > 0 ? (
				<ReserveBar
					segments={BUCKETS}
					width={layout.underline.w}
					height={layout.underline.h}
					gaps={underline.gaps}
					covers={underline.covers}
					reveal={underline.draw}
					style={{left: layout.underline.x, top: layout.underline.y}}
				/>
			) : null}
		</AbsoluteFill>
	);
};

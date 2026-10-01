/**
 * Sound-effect cue sheet.
 *
 * Every cue is derived from the same timing tables the animation uses, so
 * moving an animation moves its sound. `npm run audio` exports this sheet and
 * the score (./score.ts) to audio/plan.json and synthesises the soundtrack.
 *
 * Kinds:
 *   whoosh  — air under a large move or wipe (uses `length`)
 *   click   — soft UI click (checks, chips, snaps)
 *   tick    — tiny number tick; runs use `repeats`
 *   hit     — soft transition hit on a structural change, on the beat
 *   riser   — short build that ends exactly where the next hit lands (uses `length`)
 *   swell   — soft air that blooms under an entrance (uses `length`)
 *
 * Print the sheet with:  npm run cues
 */
import {DUR, EASE} from '../motion/easing';
import type {EasingFn} from '../motion/easing';
import {
	BEAT,
	DISTRIBUTION_T,
	END_T,
	INCOME_T,
	INTRO_T,
	MANIFESTO_T,
	PRODUCT_T,
	SCENES,
} from '../motion/timeline';
import {STAGE} from '../theme/spacing';

export type CueKind = 'whoosh' | 'click' | 'tick' | 'hit' | 'riser' | 'swell';

export type Cue = {
	frame: number;
	kind: CueKind;
	note: string;
	/** Level offset in dB against the kind's default. */
	gain?: number;
	/** Length in frames, for sounds that span time. */
	length?: number;
	/** Further triggers of the same sound, as absolute frames (tick runs, triple clicks). */
	repeats?: number[];
};

const at = (scene: keyof typeof SCENES, local: number) => SCENES[scene].from + local;

/** One tick each time an eased count crosses another 1/steps of its range. */
const easedRun = (start: number, duration: number, steps: number, easing: EasingFn = EASE.out) => {
	const frames: number[] = [];
	let k = 1;
	for (let f = 0; f <= duration && k <= steps; f++) {
		const reached = easing(f / duration);
		let crossed = false;
		while (k <= steps && reached >= k / steps - 1e-9) {
			k++;
			crossed = true;
		}
		if (crossed) frames.push(start + f);
	}
	return frames;
};

const every = (start: number, step: number, count: number) =>
	Array.from({length: count}, (_, i) => start + i * step);

const ganasLands = INTRO_T.ganasToSlot + DUR.base - 2;
const countRun = easedRun(at('income', INCOME_T.count), INCOME_T.countDuration, 14);

export const CUES: Cue[] = [
	{frame: at('intro', 0), kind: 'swell', length: 40, gain: -4, note: 'Air under MINETO rising'},
	{frame: at('intro', INTRO_T.toMasthead), kind: 'whoosh', length: 22, gain: -5, note: 'Wordmark lifts into the masthead'},
	{frame: at('intro', ganasLands), kind: 'click', gain: -3, note: '"ganas" settles into the sentence'},
	{frame: at('intro', INTRO_T.underlineSplit), kind: 'hit', gain: -5, note: 'Underline splits into four buckets'},

	{frame: at('income', INCOME_T.barTravel), kind: 'whoosh', length: 22, note: 'Split underline travels to the income bar'},
	{frame: countRun[0], kind: 'tick', repeats: countRun.slice(1), note: 'Amount counts up to $6.000.000'},
	{frame: at('income', INCOME_T.divider), kind: 'hit', note: 'Dividing line drops'},
	{frame: at('income', INCOME_T.split), kind: 'click', gain: -2, note: 'Bar breaks at the line'},
	{
		frame: at('income', INCOME_T.categoriesIn),
		kind: 'tick',
		gain: 2,
		repeats: every(at('income', INCOME_T.categoriesIn + INCOME_T.categoryStagger), INCOME_T.categoryStagger, 2),
		note: 'Categories appear (three ticks)',
	},

	{frame: at('distribution', DISTRIBUTION_T.move), kind: 'whoosh', length: DISTRIBUTION_T.moveDuration, note: 'Amount lifts into tier 01'},
	...DISTRIBUTION_T.buckets.flatMap((local, i): Cue[] => [
		{frame: at('distribution', local + DISTRIBUTION_T.cardDelay), kind: 'click', note: `Reserve ${i + 1} lands`},
		{
			frame: at('distribution', local + DISTRIBUTION_T.rollDelay),
			kind: 'tick',
			gain: -3,
			repeats: every(at('distribution', local + DISTRIBUTION_T.rollDelay + 2), 2, 3),
			note: `Available amount rolls down (${i + 1}/3)`,
		},
	]),
	{frame: at('distribution', DISTRIBUTION_T.resolve), kind: 'hit', note: 'Available amount resolves in mint'},

	{frame: at('product', PRODUCT_T.move), kind: 'whoosh', length: PRODUCT_T.moveDuration, note: 'Amount flies into the interface'},
	{
		frame: at('product', PRODUCT_T.suffixSwap),
		kind: 'tick',
		repeats: every(at('product', PRODUCT_T.suffixSwap + 4), 4, 2),
		note: '$4.803.400 rolls into $4,8M',
	},
	{
		frame: at('product', PRODUCT_T.checks),
		kind: 'click',
		gain: -2,
		repeats: every(at('product', PRODUCT_T.checks + PRODUCT_T.checkStagger), PRODUCT_T.checkStagger, 2),
		note: `Three "Separado" checks (every ${PRODUCT_T.checkStagger} frames)`,
	},
	{frame: at('product', PRODUCT_T.alertIn), kind: 'click', gain: -4, note: 'Payment nudge slides in'},
	{frame: at('product', PRODUCT_T.headlineIn), kind: 'whoosh', length: 20, gain: -9, note: 'Headline (light)'},
	{frame: at('product', PRODUCT_T.tooltipIn - 6), kind: 'click', gain: -3, note: 'Cursor presses the bar'},
	{frame: at('product', PRODUCT_T.wipe), kind: 'whoosh', length: PRODUCT_T.wipeDuration, gain: 1, note: 'Ink wipe sweeps across'},
	{frame: SCENES.manifesto.from, kind: 'hit', gain: -2, note: 'Ink lands: the manifesto begins'},

	...MANIFESTO_T.lines.map(
		(local, i): Cue => ({frame: at('manifesto', local), kind: 'swell', length: 20, gain: -5, note: `Statement ${i + 1}`}),
	),
	{
		frame: at('manifesto', MANIFESTO_T.markersAlign),
		kind: 'riser',
		length: MANIFESTO_T.wordmarkOpen - MANIFESTO_T.markersAlign,
		note: 'Markers line up on the slit',
	},
	{frame: at('manifesto', MANIFESTO_T.wordmarkOpen), kind: 'hit', note: 'Wordmark opens out of the slit'},
	{
		frame: at('manifesto', MANIFESTO_T.markersToMark + MANIFESTO_T.markersToMarkDuration),
		kind: 'click',
		gain: -4,
		note: 'The bar folds into the logo mark',
	},

	{frame: at('endCard', END_T.wipe), kind: 'whoosh', length: END_T.wipeDuration, gain: -3, note: 'Paper wipes up; logo recolours at the edge'},
	{frame: at('endCard', END_T.taglineIn), kind: 'swell', length: 24, gain: -8, note: 'Tagline'},
	{frame: at('endCard', END_T.ctaHover), kind: 'click', gain: -4, note: 'CTA hover'},
	{frame: at('endCard', END_T.logoClose + DUR.fast + 2), kind: 'click', note: 'Mark closes: final click'},
];

const formatCue = (cue: Cue) => {
	const seconds = (cue.frame / STAGE.fps).toFixed(2).padStart(5, ' ');
	const beat = (cue.frame / BEAT + 1).toFixed(2).padStart(6, ' ');
	const extra = cue.repeats?.length ? `  (+${cue.repeats.length})` : '';
	return `f${String(cue.frame).padStart(4, '0')}  ${seconds}s  beat ${beat}  ${cue.kind.padEnd(6)}  ${cue.note}${extra}`;
};

export const cueSheet = () => CUES.map(formatCue).join('\n');

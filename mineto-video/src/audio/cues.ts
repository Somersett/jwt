/**
 * Sound-design cue sheet.
 *
 * The piece works silent. It is cut for a minimal electronic track at 120 BPM
 * (one beat = 15 frames), and every cue below is derived from the same timing
 * tables the animation uses, so moving an animation moves its cue.
 *
 * Kinds:
 *   whoosh      — air under a large move or wipe
 *   click       — soft UI click (checks, chips, snaps)
 *   tick        — number tick / odometer run
 *   hit         — transition hit on a structural change, ideally on the downbeat
 *   riser       — short build into a hit
 *
 * Print the sheet with:  npm run cues
 */
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

export type CueKind = 'whoosh' | 'click' | 'tick' | 'hit' | 'riser';

export type Cue = {frame: number; kind: CueKind; note: string};

const at = (scene: keyof typeof SCENES, local: number) => SCENES[scene].from + local;

export const CUES: Cue[] = [
	{frame: at('intro', INTRO_T.wordmarkIn), kind: 'riser', note: 'MINETO rises letter by letter'},
	{frame: at('intro', INTRO_T.toMasthead), kind: 'whoosh', note: 'Wordmark lifts into the masthead'},
	{frame: at('intro', INTRO_T.ganasToSlot), kind: 'click', note: '"ganas" snaps into the sentence'},
	{frame: at('intro', INTRO_T.sentenceIn), kind: 'tick', note: 'Sentence ripples out (light tick run)'},
	{frame: at('intro', INTRO_T.underlineSplit), kind: 'hit', note: 'Underline splits into four buckets'},

	{frame: at('income', INCOME_T.barTravel), kind: 'whoosh', note: 'Split underline travels to the income bar'},
	{frame: at('income', INCOME_T.count), kind: 'tick', note: 'Amount counts up to $6.000.000'},
	{frame: at('income', INCOME_T.divider), kind: 'hit', note: 'Dividing line drops'},
	{frame: at('income', INCOME_T.split), kind: 'click', note: 'Bar breaks at the line'},
	{frame: at('income', INCOME_T.categoriesIn), kind: 'tick', note: 'Categories appear (three ticks)'},

	{frame: at('distribution', DISTRIBUTION_T.move), kind: 'whoosh', note: 'Amount lifts into tier 01'},
	...DISTRIBUTION_T.buckets.map(
		(local, i): Cue => ({
			frame: at('distribution', local),
			kind: 'click',
			note: `Reserve ${i + 1} lands; available amount rolls down`,
		}),
	),
	{frame: at('distribution', DISTRIBUTION_T.resolve), kind: 'hit', note: 'Available amount resolves in mint'},

	{frame: at('product', PRODUCT_T.move), kind: 'whoosh', note: 'Amount flies into the interface'},
	{frame: at('product', PRODUCT_T.suffixSwap), kind: 'tick', note: '$4.803.400 rolls into $4,8M'},
	{frame: at('product', PRODUCT_T.checks), kind: 'click', note: 'Three "Separado" checks (every 6 frames)'},
	{frame: at('product', PRODUCT_T.alertIn), kind: 'click', note: 'Payment nudge slides in'},
	{frame: at('product', PRODUCT_T.headlineIn), kind: 'whoosh', note: 'Headline (light)'},
	{frame: at('product', PRODUCT_T.tooltipIn - 6), kind: 'click', note: 'Cursor presses the bar'},
	{frame: at('product', PRODUCT_T.wipe), kind: 'hit', note: 'Ink wipe into the manifesto'},

	...MANIFESTO_T.lines.map(
		(local, i): Cue => ({frame: at('manifesto', local), kind: 'whoosh', note: `Statement ${i + 1}`}),
	),
	{frame: at('manifesto', MANIFESTO_T.markersAlign), kind: 'riser', note: 'Markers line up on the slit'},
	{frame: at('manifesto', MANIFESTO_T.wordmarkOpen), kind: 'hit', note: 'Wordmark opens out of the slit'},

	{frame: at('endCard', END_T.wipe), kind: 'hit', note: 'Paper wipes up; logo recolours at the edge'},
	{frame: at('endCard', END_T.taglineIn), kind: 'whoosh', note: 'Tagline (soft)'},
	{frame: at('endCard', END_T.ctaHover), kind: 'click', note: 'CTA hover'},
	{frame: at('endCard', END_T.logoClose + 10), kind: 'click', note: 'Mark closes: final click, let it ring out'},
];

const formatCue = (cue: Cue) => {
	const seconds = (cue.frame / STAGE.fps).toFixed(2).padStart(5, ' ');
	const beat = (cue.frame / BEAT + 1).toFixed(2).padStart(6, ' ');
	return `f${String(cue.frame).padStart(3, '0')}  ${seconds}s  beat ${beat}  ${cue.kind.padEnd(6)}  ${cue.note}`;
};

export const cueSheet = () => CUES.map(formatCue).join('\n');

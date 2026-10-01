/**
 * Score for the soundtrack: a soft, minimal electronic piece at 120 BPM in
 * D major. Harmony and arrangement changes are pinned to the same moments as
 * the picture (every change lands on a beat), and synthesised by audio/synth.py.
 */
import {BPM, DISTRIBUTION_T, INCOME_T, INTRO_T, MANIFESTO_T, SCENES, beats} from '../motion/timeline';

export type Chord = 'Dmaj9' | 'Bm9' | 'Gmaj9' | 'Em9' | 'A6sus' | 'Asus4';

export type Section = {
	frame: number;
	name: string;
	/** Pad colour: open and warm, or darker for the manifesto. */
	pad: 'bright' | 'dark';
	/** Felt-piano pattern density. */
	felt: 'off' | 'sparse' | 'quarter' | 'eighth';
	bass: boolean;
	kick: boolean;
	shaker: boolean;
	snap: boolean;
};

const at = (scene: keyof typeof SCENES, local: number) => SCENES[scene].from + local;

export const SCORE = {
	bpm: BPM,
	key: 'D major',

	/** Chord changes, each on a beat and on a visual event. */
	chords: [
		{frame: 0, chord: 'Dmaj9'},
		{frame: at('intro', INTRO_T.underlineSplit), chord: 'Bm9'},
		{frame: at('income', INCOME_T.divider), chord: 'Gmaj9'},
		{frame: SCENES.distribution.from, chord: 'Em9'},
		{frame: at('distribution', DISTRIBUTION_T.buckets[2] - beats(1)), chord: 'A6sus'},
		{frame: at('distribution', DISTRIBUTION_T.resolve), chord: 'Dmaj9'},
		{frame: SCENES.product.from, chord: 'Bm9'},
		{frame: SCENES.product.from + beats(8), chord: 'Gmaj9'},
		{frame: SCENES.manifesto.from, chord: 'Em9'},
		{frame: SCENES.manifesto.from + beats(6), chord: 'Asus4'},
		{frame: at('manifesto', MANIFESTO_T.wordmarkOpen), chord: 'Dmaj9'},
	] satisfies {frame: number; chord: Chord}[],

	/** Arrangement: which layers play from each point on. */
	sections: [
		{frame: 0, name: 'intro', pad: 'bright', felt: 'off', bass: false, kick: false, shaker: false, snap: false},
		{frame: at('intro', INTRO_T.toMasthead), name: 'intro-motif', pad: 'bright', felt: 'quarter', bass: false, kick: false, shaker: false, snap: false},
		{frame: at('intro', INTRO_T.underlineSplit), name: 'bass-in', pad: 'bright', felt: 'quarter', bass: true, kick: false, shaker: false, snap: false},
		{frame: SCENES.income.from, name: 'income', pad: 'bright', felt: 'quarter', bass: true, kick: false, shaker: true, snap: false},
		{frame: at('income', INCOME_T.divider), name: 'groove', pad: 'bright', felt: 'eighth', bass: true, kick: true, shaker: true, snap: false},
		{frame: SCENES.product.from, name: 'product', pad: 'bright', felt: 'eighth', bass: true, kick: true, shaker: true, snap: true},
		{frame: SCENES.manifesto.from, name: 'manifesto', pad: 'dark', felt: 'sparse', bass: true, kick: false, shaker: false, snap: false},
		{frame: at('manifesto', MANIFESTO_T.wordmarkOpen), name: 'logo', pad: 'bright', felt: 'sparse', bass: true, kick: false, shaker: false, snap: false},
	] satisfies Section[],

	/** Bell accents on the two resolutions to the tonic. */
	bells: [at('distribution', DISTRIBUTION_T.resolve), at('manifesto', MANIFESTO_T.wordmarkOpen)],

	/** Seconds of fade at the very end, over the end card's final hold. */
	fadeOutSeconds: 1.6,
};

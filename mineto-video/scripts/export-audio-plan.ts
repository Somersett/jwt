import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {CUES} from '../src/audio/cues';
import {SCORE} from '../src/audio/score';
import {SCENES, TOTAL_FRAMES} from '../src/motion/timeline';
import {STAGE} from '../src/theme/spacing';

/** Writes everything the synthesiser needs (timing, cues, score) to audio/plan.json. */
const out = resolve(__dirname, '../audio/plan.json');
mkdirSync(dirname(out), {recursive: true});
writeFileSync(
	out,
	`${JSON.stringify({fps: STAGE.fps, totalFrames: TOTAL_FRAMES, scenes: SCENES, score: SCORE, cues: CUES}, null, 2)}\n`,
);
console.log(`audio plan → ${out} (${CUES.length} cues, ${SCORE.chords.length} chord changes)`);

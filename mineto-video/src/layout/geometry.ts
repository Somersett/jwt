/**
 * Scene geometry for the 16:9 master.
 *
 * Every position lives here, and scenes that hand an element to the next one
 * read the same numbers, which is what makes the matched cuts seamless.
 * A 9:16 cut should only need a sibling of this file (see README).
 */
import {COPY} from '../data/copy';
import {BUCKETS} from '../data/money';
import type {Rect} from '../motion/animate';
import {segmentBoxes} from '../components/ReserveBar';
import {BAR, CONTENT, SAFE, STAGE, space} from '../theme/spacing';
import {TYPE, baselineFromTop, capCenterFromTop} from '../theme/typography';
import {layoutLine} from './measure';

/* ───────────── Scene 1 · Intro ───────────── */

export const INTRO_GEO = {
	wordmarkCenterY: CONTENT.centerY,
	mastheadCenterY: 344,
	mastheadScale: 0.25,
	/** Tracking of the wordmark while it is big, while it enters, and as a masthead. */
	tracking: {enter: 0.5, rest: 0.04, masthead: 0.34},
	sentenceStyle: {...TYPE.headline, lineHeight: 1.3},
	sentenceTop: 462,
	/** The keyword first appears alone, centred and slightly larger. */
	keywordScale: 1.3,
	/** Underline sits below the descender of the "g". */
	underlineOffset: 0.3,
	underlineHeight: 8,
	splitGap: 4,
} as const;

export const introLayout = () => {
	const style = INTRO_GEO.sentenceStyle;
	const fontSize = style.fontSize;
	const step = fontSize * style.lineHeight;
	const line1 = layoutLine(COPY.intro.line1, style, 'center', CONTENT.centerX);
	const line2 = layoutLine(COPY.intro.line2, style, 'center', CONTENT.centerX);
	const tops = [INTRO_GEO.sentenceTop, INTRO_GEO.sentenceTop + step];
	const keyword = line1.words[COPY.intro.keyword];
	const baseline = tops[0] + baselineFromTop(fontSize, style.lineHeight);
	const underline: Rect = {
		x: keyword.x,
		y: baseline + INTRO_GEO.underlineOffset * fontSize,
		w: keyword.width,
		h: INTRO_GEO.underlineHeight,
	};
	const keywordCenter = {
		x: keyword.x + keyword.width / 2,
		y: tops[0] + step / 2,
	};
	return {line1, line2, tops, step, keyword, keywordCenter, underline};
};

/* ───────────── Scene 2 · Income ───────────── */

export const INCOME_GEO = {
	label: {x: CONTENT.left, top: 282},
	number: {x: CONTENT.left, top: 336, fontSize: TYPE.display.fontSize},
	bar: {x: CONTENT.left, y: 600, w: CONTENT.width, h: BAR.height},
	/** Gap that opens between "reserves" and "available" when the line cuts. */
	groupGap: 12,
	divider: {top: 566, bottom: 822},
	columnsTop: 646,
	categoriesTop: 730,
	categoryStep: 38,
	annotationTop: 632,
} as const;

/** Bar gaps for the two-group split: reserves stay fused, available detaches. */
export const incomeGroupGaps = (groupGap: number) => [0, 0, groupGap];

export const incomeDividerX = () => {
	const boxes = segmentBoxes(BUCKETS, INCOME_GEO.bar.w, incomeGroupGaps(INCOME_GEO.groupGap));
	return INCOME_GEO.bar.x + boxes[3].x - INCOME_GEO.groupGap / 2;
};

/* ───────────── Scene 3 · Distribution ───────────── */

const TIER_NODE_Y = [230, 462, 776] as const;
const DIST_CONTENT_X = 520;
const DIST_CONTENT_W = CONTENT.right - DIST_CONTENT_X;
const CARD_GAP = space(4);
const CARD_W = (DIST_CONTENT_W - CARD_GAP * 2) / 3;

export const DISTRIBUTION_GEO = {
	spineX: CONTENT.left + 8,
	nodeY: TIER_NODE_Y,
	tierLabelX: CONTENT.left + 40,
	contentX: DIST_CONTENT_X,
	incomeNumber: {
		x: DIST_CONTENT_X,
		top: TIER_NODE_Y[0] - capCenterFromTop(TYPE.amountL.fontSize, 1),
		fontSize: TYPE.amountL.fontSize,
	},
	bar: {x: DIST_CONTENT_X, y: 292, w: DIST_CONTENT_W, h: BAR.height},
	barGap: BAR.gap,
	cards: [0, 1, 2].map(
		(i): Rect => ({x: DIST_CONTENT_X + i * (CARD_W + CARD_GAP), y: 420, w: CARD_W, h: 212}),
	),
	/** Elbow heights, nested so the three routes never cross. */
	elbowY: [380, 358, 336],
	available: {
		x: DIST_CONTENT_X,
		top: TIER_NODE_Y[2] - capCenterFromTop(TYPE.amountXL.fontSize, 1),
		fontSize: TYPE.amountXL.fontSize,
	},
} as const;

/** Orthogonal route from a bar segment down to its card. */
export const distributionConnector = (i: number, gaps: readonly number[]) => {
	const {bar, cards, elbowY} = DISTRIBUTION_GEO;
	const box = segmentBoxes(BUCKETS, bar.w, gaps)[i];
	const startX = bar.x + box.x + box.w / 2;
	const card = cards[i];
	const endX = card.x + card.w / 2;
	return [
		[startX, bar.y + bar.h + 6],
		[startX, elbowY[i]],
		[endX, elbowY[i]],
		[endX, card.y - 8],
	] as const;
};

/* ───────────── Scene 4 · Product ───────────── */

const CARD: Rect = {x: CONTENT.left, y: 150, w: 900, h: 780};
const UI_PAD = space(6); // 48

export const PRODUCT_GEO = {
	card: CARD,
	pad: UI_PAD,
	topbarHeight: 76,
	label: {x: CARD.x + UI_PAD, top: 266},
	hero: {x: CARD.x + UI_PAD, top: 300, fontSize: TYPE.hero.fontSize},
	sub: {x: CARD.x + UI_PAD, top: 490},
	bar: {x: CARD.x + UI_PAD, y: 548, w: CARD.w - UI_PAD * 2, h: BAR.height},
	barGap: 4,
	rowsTop: 590,
	rowHeight: 66,
	alertTop: 820,
	headline: {x: 1120, eyebrowTop: 368, top: 418},
} as const;

/* ───────────── Scene 5 · Manifesto ───────────── */

export const MANIFESTO_GEO = {
	style: TYPE.statement,
	lineStep: 150,
	marker: {w: 64, h: BAR.height, gap: space(5)},
	centerY: CONTENT.centerY,
} as const;

/* ───────────── Scene 6 · End card ───────────── */

export const LOGO_END = {
	fontSize: 128,
	/** Where the lockup is born (end of the manifesto) and where it settles. */
	centerY: {born: CONTENT.centerY, rest: 404},
} as const;

export const END_GEO = {
	taglineTop: 500,
	ctaTop: 628,
	ctaHeight: 68,
	urlTop: 744,
} as const;

/* ───────────── Chrome ───────────── */

export const HUD_GEO = {
	topCenterY: SAFE.y + 12,
	bottomCenterY: STAGE.height - SAFE.y - 8,
} as const;

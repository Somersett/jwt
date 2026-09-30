/** Master canvas. Everything is laid out on this grid. */
export const STAGE = {
	width: 1920,
	height: 1080,
	fps: 30,
} as const;

/** 8px base grid. */
export const UNIT = 8;
export const space = (n: number) => n * UNIT;

export const SAFE = {
	/** Horizontal margin shared by every scene. */
	x: space(15), // 120
	/** Top/bottom margin for the persistent chrome (HUD). */
	y: space(9), // 72
} as const;

export const CONTENT = {
	left: SAFE.x,
	right: STAGE.width - SAFE.x,
	width: STAGE.width - SAFE.x * 2,
	centerX: STAGE.width / 2,
	centerY: STAGE.height / 2,
} as const;

export const RADIUS = {
	xs: 4,
	sm: 8,
	md: 14,
	lg: 20,
	xl: 28,
	pill: 999,
} as const;

export const STROKE = {
	hair: 1,
	line: 1.5,
	rule: 2,
} as const;

/** Thickness of the "money bar", the element that threads the whole piece. */
export const BAR = {
	height: 14,
	gap: 6,
} as const;

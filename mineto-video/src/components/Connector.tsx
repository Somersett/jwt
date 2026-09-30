import React from 'react';
import {clamp01} from '../motion/animate';
import {COLORS} from '../theme/colors';
import {STAGE, STROKE} from '../theme/spacing';

type Point = readonly [number, number];

type ConnectorProps = {
	/** Orthogonal polyline in stage coordinates. */
	points: readonly Point[];
	/** 0→1 draws the line from its first point to its last. */
	draw: number;
	/** 0→1 retracts the line back towards its last point. */
	retract?: number;
	color?: string;
	strokeWidth?: number;
	cornerRadius?: number;
	/** Small terminal dot that lands when the line arrives. */
	endDot?: boolean;
};

const roundedPath = (points: readonly Point[], r: number) => {
	let d = `M ${points[0][0]} ${points[0][1]}`;
	for (let i = 1; i < points.length - 1; i++) {
		const [px, py] = points[i - 1];
		const [x, y] = points[i];
		const [nx, ny] = points[i + 1];
		const inLen = Math.hypot(x - px, y - py);
		const outLen = Math.hypot(nx - x, ny - y);
		const radius = Math.min(r, inLen / 2, outLen / 2);
		const ax = x - ((x - px) / inLen) * radius;
		const ay = y - ((y - py) / inLen) * radius;
		const bx = x + ((nx - x) / outLen) * radius;
		const by = y + ((ny - y) / outLen) * radius;
		d += ` L ${ax} ${ay} Q ${x} ${y} ${bx} ${by}`;
	}
	const [lx, ly] = points[points.length - 1];
	return `${d} L ${lx} ${ly}`;
};

/** A hairline that links two concepts, drawn like a pen stroke. */
export const Connector: React.FC<ConnectorProps> = ({
	points,
	draw,
	retract = 0,
	color = COLORS.lineStrong,
	strokeWidth = STROKE.line,
	cornerRadius = 10,
	endDot = true,
}) => {
	const shown = clamp01(draw);
	const hidden = clamp01(retract);
	const [ex, ey] = points[points.length - 1];
	const dotScale = clamp01((shown - 0.85) / 0.15) * (1 - hidden);
	// A zero-length dash with round caps would still paint a dot.
	if (shown - hidden <= 0.001) return null;
	return (
		<svg
			width={STAGE.width}
			height={STAGE.height}
			style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}
		>
			<path
				d={roundedPath(points, cornerRadius)}
				pathLength={1}
				fill="none"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeDasharray={`${Math.max(0, shown - hidden)} 2`}
				strokeDashoffset={-hidden}
			/>
			{endDot ? <circle cx={ex} cy={ey} r={3.5 * dotScale} fill={color} /> : null}
		</svg>
	);
};

import {loadFont} from '@remotion/fonts';
import React, {useEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender, staticFile} from 'remotion';
import {FONT_FAMILY} from './theme/typography';

/** Geist is bundled locally (SIL OFL 1.1) so renders never depend on the network. */
const FONT_FACES = [
	{family: FONT_FAMILY.sans, file: 'fonts/Geist-Variable.woff2'},
	{family: FONT_FAMILY.mono, file: 'fonts/GeistMono-Variable.woff2'},
];

let fontsReady: Promise<void> | null = null;

export const ensureFonts = () => {
	fontsReady ??= Promise.all(
		FONT_FACES.map((face) =>
			loadFont({family: face.family, url: staticFile(face.file), weight: '100 900'}),
		),
	).then(() => undefined);
	return fontsReady;
};

/**
 * Holds the render until the fonts are loaded. Layout code measures text
 * (see layout/measure.ts), so nothing may render against a fallback font.
 */
export const FontGate: React.FC<{children: React.ReactNode}> = ({children}) => {
	const [handle] = useState(() => delayRender('Loading Geist'));
	const [ready, setReady] = useState(false);

	useEffect(() => {
		ensureFonts()
			.then(() => setReady(true))
			.catch((err) => cancelRender(err));
	}, []);

	useEffect(() => {
		if (ready) continueRender(handle);
	}, [ready, handle]);

	return ready ? <>{children}</> : null;
};

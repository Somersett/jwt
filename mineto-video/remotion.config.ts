import {Config} from '@remotion/cli/config';

// Lossless frame capture: JPEG frames would leave ringing around type edges.
Config.setVideoImageFormat('png');
Config.setOverwriteOutput(true);
Config.setCodec('h264');
// Flat colour compresses to almost nothing; a generous master survives social re-encodes.
Config.setCrf(12);
Config.setX264Preset('slow');
Config.setPixelFormat('yuv420p');
// Tag and convert as BT.709 so browsers, QuickTime and social platforms agree on colour.
Config.setColorSpace('bt709');
// The soundtrack is mastered to -16 LUFS / -1 dBTP; keep the AAC transparent.
Config.setAudioBitrate('320k');

// Remotion downloads its own headless Chrome by default. In sandboxes without
// that download, point REMOTION_BROWSER_EXECUTABLE at a local headless_shell.
if (process.env.REMOTION_BROWSER_EXECUTABLE) {
	Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
}

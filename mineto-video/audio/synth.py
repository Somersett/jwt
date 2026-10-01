#!/usr/bin/env python3
"""
Mineto soundtrack synthesiser.

Reads audio/plan.json (exported from the TypeScript timeline by
scripts/export-audio-plan.ts) and writes public/audio/soundtrack.wav:
a soft, minimal electronic score at 120 BPM in D major plus sound design,
mixed and mastered in one pass. Everything is synthesised from sine waves and
filtered noise with a fixed random seed, so the output is fully reproducible
and free of third-party samples.

    python3 audio/synth.py [--stems] [--report path.png]

--stems   also writes out/audio/{music,sfx}.wav
--report  writes a waveform + spectrogram PNG for visual QA
"""
from __future__ import annotations

import argparse
import json
import math
from pathlib import Path

import numpy as np
from scipy import signal
from scipy.io import wavfile
from scipy.ndimage import minimum_filter1d, uniform_filter1d

ROOT = Path(__file__).resolve().parent.parent
PLAN = json.loads((ROOT / "audio" / "plan.json").read_text())

SR = 48_000
FPS = PLAN["fps"]
SCORE = PLAN["score"]
BPM = SCORE["bpm"]
BEAT_S = 60.0 / BPM
DURATION_S = PLAN["totalFrames"] / FPS
N = int(round(DURATION_S * SR))
RNG = np.random.default_rng(20260930)

# ─────────────────────────── mix targets ───────────────────────────
# Each music layer is measured (gated integrated loudness, where it plays) and
# scaled to its target, so the balance does not depend on guessed gains.
STEM_LUFS = {
    "pad": -21.0,
    "felt": -23.5,
    "bass": -25.0,
    "kick": -27.5,
    "shaker": -38.0,
    "snap": -34.0,
    "bell": -27.0,
}
# Each sound effect is scaled so its loudest 400 ms sits at this level before
# per-cue offsets: roughly 3–8 LU under the music bed, audible but never on top.
SFX_MOMENTARY = {
    "whoosh": -20.0,
    "swell": -23.0,
    "hit": -17.0,
    "riser": -19.0,
    "click": -25.0,
    "tick": -28.0,
}
REVERB_RETURN_DB = -7.0
REVERB_SEND = {"pad": 0.25, "felt": 0.45, "bell": 0.6, "snap": 0.5, "shaker": 0.2, "sfx": 0.3, "kick": 0.04}
TARGET_LUFS = -16.0  # soft; comfortable on web and social
CEILING_DBFS = -1.0

# ─────────────────────────── harmony ───────────────────────────
# MIDI note numbers. Pad voicings move by step between chords; the felt piano
# plays chord tones an octave above; the bass holds the root.
CHORDS = {
    "Dmaj9": {"pad": [50, 54, 57, 61, 64], "felt": [69, 74, 76, 78, 73], "root": 38},
    "Bm9": {"pad": [47, 54, 57, 62, 73], "felt": [66, 71, 73, 74, 69], "root": 35},
    "Gmaj9": {"pad": [55, 59, 62, 66, 69], "felt": [67, 71, 74, 78, 69], "root": 31},
    "Em9": {"pad": [52, 55, 59, 62, 66], "felt": [64, 67, 71, 74, 66], "root": 40},
    "A6sus": {"pad": [57, 59, 64, 66], "felt": [64, 69, 71, 76, 66], "root": 33},
    "Asus4": {"pad": [57, 59, 62, 64], "felt": [64, 69, 74, 71, 76], "root": 33},
}
FELT_PATTERN = [0, 2, 1, 3, 0, 2, 4, 3]
FELT_VELOCITY = [1.0, 0.55, 0.75, 0.5, 0.9, 0.55, 0.7, 0.5]


# ─────────────────────────── helpers ───────────────────────────
def hz(note: float) -> float:
    return 440.0 * 2 ** ((note - 69) / 12)


def db(x: float) -> float:
    return 10 ** (x / 20)


def sec(frame: float) -> float:
    return frame / FPS


def idx(seconds: float) -> int:
    return int(round(seconds * SR))


def raised(x: np.ndarray) -> np.ndarray:
    """0→1 ramp with zero slope at both ends."""
    return 0.5 - 0.5 * np.cos(np.pi * np.clip(x, 0, 1))


def envelope(n: int, attack_s: float, release_s: float) -> np.ndarray:
    i = np.arange(n)
    a = raised(i / max(1, idx(attack_s)))
    r = raised((n - 1 - i) / max(1, idx(release_s)))
    return a * r


def lowpass(x: np.ndarray, cutoff: float, order: int = 2) -> np.ndarray:
    sos = signal.butter(order, cutoff, "low", fs=SR, output="sos")
    return signal.sosfilt(sos, x, axis=0)


def highpass(x: np.ndarray, cutoff: float, order: int = 2) -> np.ndarray:
    sos = signal.butter(order, cutoff, "high", fs=SR, output="sos")
    return signal.sosfilt(sos, x, axis=0)


def bandpass(x: np.ndarray, lo: float, hi: float, order: int = 2) -> np.ndarray:
    sos = signal.butter(order, [lo, hi], "band", fs=SR, output="sos")
    return signal.sosfilt(sos, x, axis=0)


def pink(n: int) -> np.ndarray:
    white = RNG.standard_normal(n)
    b = [0.049922035, -0.095993537, 0.050612699, -0.004408786]
    a = [1, -2.494956002, 2.017265875, -0.522189400]
    out = signal.lfilter(b, a, white)
    return out / (np.std(out) + 1e-12)


def svf(x: np.ndarray, cutoff: np.ndarray, q: float, mode: str) -> np.ndarray:
    """Topology-preserving state-variable filter with a per-sample cutoff."""
    g = np.tan(np.pi * np.clip(cutoff, 20, SR * 0.45) / SR)
    k = 1.0 / q
    ic1 = ic2 = 0.0
    out = np.empty_like(x)
    for n in range(len(x)):
        gn = g[n]
        a1 = 1.0 / (1.0 + gn * (gn + k))
        v3 = x[n] - ic2
        v1 = a1 * ic1 + gn * a1 * v3
        v2 = ic2 + gn * v1
        ic1 = 2 * v1 - ic1
        ic2 = 2 * v2 - ic2
        out[n] = v2 if mode == "low" else v1
    return out


def place(bus: np.ndarray, start_s: float, mono: np.ndarray, pan: float = 0.0, gain: float = 1.0) -> None:
    """Equal-power pan a mono sound onto a stereo bus at a time in seconds."""
    start = idx(start_s)
    if start < 0:
        mono, start = mono[-start:], 0
    end = min(N, start + len(mono))
    if end <= start:
        return
    seg = mono[: end - start] * gain
    theta = (np.clip(pan, -1, 1) + 1) * np.pi / 4
    bus[start:end, 0] += seg * np.cos(theta)
    bus[start:end, 1] += seg * np.sin(theta)


def stereo() -> np.ndarray:
    return np.zeros((N, 2))


def curve(points: list[tuple[float, float]], smooth_s: float = 0.08) -> np.ndarray:
    """Step automation (seconds → value), smoothed so changes never click."""
    out = np.zeros(N)
    for i, (t, v) in enumerate(points):
        end = points[i + 1][0] if i + 1 < len(points) else DURATION_S
        out[idx(t) : idx(end)] = v
    w = max(1, idx(smooth_s))
    return np.convolve(out, np.ones(w) / w, mode="same")


# ─────────────────────────── plan ───────────────────────────
chords = [(sec(c["frame"]), c["chord"]) for c in SCORE["chords"]]
sections = [dict(s, t=sec(s["frame"])) for s in SCORE["sections"]]


def chord_at(t: float) -> str:
    name = chords[0][1]
    for start, chord in chords:
        if t + 1e-6 >= start:
            name = chord
    return name


def section_at(t: float) -> dict:
    current = sections[0]
    for s in sections:
        if t + 1e-6 >= s["t"]:
            current = s
    return current


def beat_times() -> np.ndarray:
    return np.arange(0, DURATION_S, BEAT_S)


# ─────────────────────────── instruments ───────────────────────────
def saw_voice(freq: float, n: int, phase: float) -> np.ndarray:
    """Band-limited saw by additive synthesis, harmonics kept under 9 kHz."""
    t = np.arange(n) / SR
    out = np.zeros(n)
    k = 1
    while freq * k < 9000 and k <= 24:
        out += np.sin(2 * np.pi * freq * k * t + phase * k) / k
        k += 1
    return out * (2 / np.pi)


def render_pad() -> np.ndarray:
    bus = stereo()
    release = 1.8
    for i, (start, name) in enumerate(chords):
        end = chords[i + 1][0] if i + 1 < len(chords) else DURATION_S
        attack = 3.0 if i == 0 else (0.25 if name == "Dmaj9" and i == len(chords) - 1 else 0.7)
        n = idx(end - start + release)
        env = envelope(n, attack, release)
        for note in CHORDS[name]["pad"]:
            for detune, pan in ((-0.07, -0.55), (0.0, 0.0), (0.07, 0.55)):
                voice = saw_voice(hz(note + detune), n, RNG.uniform(0, 2 * np.pi))
                place(bus, start, voice * env, pan=pan, gain=0.12)
    # Slow breathing so a held chord is never static.
    t = np.arange(N) / SR
    bus *= (1 + 0.06 * np.sin(2 * np.pi * 0.17 * t))[:, None]
    bright = lowpass(bus, 1900, order=4)
    dark = lowpass(bus, 700, order=4)
    tone = curve([(s["t"], 1.0 if s["pad"] == "dark" else 0.0) for s in sections], smooth_s=0.9)[:, None]
    return bright * (1 - tone) + dark * tone


def felt_note(freq: float, velocity: float) -> np.ndarray:
    """Felt piano: soft attack, partials that die faster the higher they are."""
    n = idx(2.4)
    t = np.arange(n) / SR
    out = np.zeros(n)
    for k, amp in ((1, 1.0), (2, 0.32), (3, 0.12), (4, 0.05), (5, 0.02)):
        tau = 1.1 / (k**0.85)
        out += amp * np.sin(2 * np.pi * freq * k * (1 + 0.0003 * k * k) * t) * np.exp(-t / tau)
    hammer = lowpass(RNG.standard_normal(n), 1800) * np.exp(-t / 0.006) * 0.05
    out = (out + hammer) * raised(t / 0.006) * raised((t[-1] - t) / 0.05)
    brightness = 1400 + 2200 * velocity
    return lowpass(out, brightness) * velocity


def render_felt() -> np.ndarray:
    bus = stereo()
    step = BEAT_S / 2
    for i, t in enumerate(np.arange(0, DURATION_S, step)):
        mode = section_at(t)["felt"]
        beat = i // 2
        on_beat = i % 2 == 0
        if mode == "off":
            continue
        if mode == "quarter" and not on_beat:
            continue
        if mode == "sparse" and not (on_beat and beat % 2 == 0):
            continue
        tones = CHORDS[chord_at(t)]["felt"]
        if mode == "eighth":
            slot = i % len(FELT_PATTERN)
        elif mode == "quarter":
            slot = (beat % 4) * 2
        else:  # sparse: one note every two beats, walking through the chord
            slot = ((beat // 2) % 4) * 2 + 1
        note = tones[FELT_PATTERN[slot] % len(tones)]
        vel = FELT_VELOCITY[slot] * (0.8 if mode == "eighth" else 1.0)
        vel *= RNG.uniform(0.92, 1.05)
        jitter = RNG.uniform(-0.004, 0.004)
        place(bus, t + jitter, felt_note(hz(note), vel), pan=RNG.uniform(-0.25, 0.25))
    return bus


def render_bass() -> np.ndarray:
    bus = np.zeros(N)
    release = 0.45
    for i, (start, name) in enumerate(chords):
        end = chords[i + 1][0] if i + 1 < len(chords) else DURATION_S
        n = idx(end - start + release)
        t = np.arange(n) / SR
        f = hz(CHORDS[name]["root"])
        tone = np.sin(2 * np.pi * f * t) + 0.28 * np.sin(4 * np.pi * f * t) + 0.08 * np.sin(6 * np.pi * f * t)
        tone = np.tanh(1.3 * tone) / np.tanh(1.3)
        s = idx(start)
        e = min(N, s + n)
        bus[s:e] += (tone * envelope(n, 0.12, release))[: e - s]
    gate = curve([(s["t"], 1.0 if s["bass"] else 0.0) for s in sections], smooth_s=1.4)
    bus = lowpass(bus * gate, 420)
    return np.stack([bus, bus], axis=1)


def kick_sound() -> np.ndarray:
    n = idx(0.5)
    t = np.arange(n) / SR
    freq = 46 + 58 * np.exp(-t / 0.03)
    body = np.sin(2 * np.pi * np.cumsum(freq) / SR) * np.exp(-t / 0.17)
    knock = lowpass(RNG.standard_normal(n), 900) * np.exp(-t / 0.006) * 0.12
    return (body + knock) * raised(t / 0.0025)


def render_drums() -> tuple[np.ndarray, np.ndarray, np.ndarray, list[float]]:
    kick, shaker, snap = stereo(), stereo(), stereo()
    kick_times: list[float] = []
    kick_one = kick_sound()
    for b, t in enumerate(beat_times()):
        s = section_at(t)
        if s["kick"]:
            place(kick, t, kick_one)
            kick_times.append(t)
        if s["snap"] and b % 2 == 1:
            n = idx(0.25)
            tt = np.arange(n) / SR
            body = bandpass(RNG.standard_normal(n), 1300, 3600) * np.exp(-tt / 0.028)
            tone = np.sin(2 * np.pi * 1150 * tt) * np.exp(-tt / 0.012) * 0.4
            place(snap, t + 0.004, (body + tone) * raised(tt / 0.001), pan=-0.18)
    accents = [0.32, 0.16, 0.7, 0.2]
    for i, t in enumerate(np.arange(0, DURATION_S, BEAT_S / 4)):
        if not section_at(t)["shaker"]:
            continue
        n = idx(0.12)
        tt = np.arange(n) / SR
        grain = bandpass(RNG.standard_normal(n), 4800, 10500) * np.exp(-tt / 0.035) * raised(tt / 0.004)
        place(shaker, t + RNG.uniform(-0.003, 0.003), grain * accents[i % 4] * RNG.uniform(0.85, 1.1), pan=0.3)
    return kick, shaker, snap, kick_times


def render_bells() -> np.ndarray:
    bus = stereo()
    for frame in SCORE["bells"]:
        for j, note in enumerate((86, 81, 78)):  # D6, A5, F#5
            n = idx(3.0)
            t = np.arange(n) / SR
            f = hz(note)
            index = 1.8 * np.exp(-t / 0.35)
            tone = np.sin(2 * np.pi * f * t + index * np.sin(2 * np.pi * f * 3.5 * t))
            tone *= np.exp(-t / 1.4) * raised(t / 0.003) * raised((t[-1] - t) / 0.1)
            place(bus, sec(frame) + j * 0.11, lowpass(tone, 5000) * (0.9 - 0.2 * j), pan=(-0.3, 0.25, 0.0)[j])
    return bus


def sidechain(kick_times: list[float], depth: float) -> np.ndarray:
    duck = np.zeros(N)
    shape_n = idx(0.32)
    tt = np.arange(shape_n) / SR
    shape = raised(tt / 0.006) * np.exp(-tt / 0.13)
    for t in kick_times:
        s = idx(t)
        e = min(N, s + shape_n)
        duck[s:e] = np.maximum(duck[s:e], shape[: e - s])
    return (1 - depth * duck)[:, None]


# ─────────────────────────── sound design ───────────────────────────
def shape_curve(n: int, peak: float) -> np.ndarray:
    """Asymmetric bell: rises to `peak` (0–1 of the length), then falls."""
    x = np.linspace(0, 1, n)
    a = peak / (1 - peak)
    y = (x**a) * (1 - x)
    return y / (y.max() + 1e-12)


def whoosh(length_s: float) -> tuple[np.ndarray, np.ndarray]:
    n = idx(length_s + 0.35)
    x = np.linspace(0, 1, n)
    noise = pink(n)
    centre = 260 * (2200 / 260) ** np.sin(np.pi * np.clip(x * 1.15, 0, 1)) ** 1.4
    air = lowpass(svf(noise, centre, 0.9, "band") * 1.6 + lowpass(noise, 600) * 0.35, 4500)
    amp = shape_curve(n, 0.42)
    mono = air * amp
    return mono, np.linspace(-0.45, 0.45, n)


def click() -> np.ndarray:
    n = idx(0.09)
    t = np.arange(n) / SR
    tone = 0.6 * np.sin(2 * np.pi * 1650 * t) * np.exp(-t / 0.010) + 0.45 * np.sin(2 * np.pi * 820 * t) * np.exp(-t / 0.022)
    tick_noise = lowpass(RNG.standard_normal(n), 3000) * np.exp(-t / 0.0025) * 0.15
    return lowpass((tone + tick_noise) * raised(t / 0.0015), 4500)


def tick(pitch: float) -> np.ndarray:
    n = idx(0.05)
    t = np.arange(n) / SR
    tone = 0.55 * np.sin(2 * np.pi * 2500 * pitch * t) * np.exp(-t / 0.0045) + 0.45 * np.sin(2 * np.pi * 1250 * pitch * t) * np.exp(-t / 0.008)
    return lowpass(tone * raised(t / 0.0004), 7000)


def hit() -> tuple[np.ndarray, float]:
    """Soft transition hit: a short air swell into a deep, round thump. Returns (sound, pre-roll s)."""
    pre = 0.18
    n = idx(pre + 1.6)
    t = np.arange(n) / SR - pre
    swell = lowpass(pink(n), 1400) * raised((t + pre) / pre) * (t < 0) * 0.35
    post = np.clip(t, 0, None)
    freq = 44 + 50 * np.exp(-post / 0.05)
    thump = np.sin(2 * np.pi * np.cumsum(freq) / SR) * np.exp(-post / 0.32) * (t >= 0) * raised(post / 0.004)
    tail = lowpass(pink(n), 1100) * np.exp(-post / 0.45) * (t >= 0) * 0.18 * raised(post / 0.01)
    return swell + thump + tail, pre


def riser(length_s: float) -> np.ndarray:
    n = idx(length_s)
    x = np.linspace(0, 1, n)
    cutoff = 220 * (5200 / 220) ** (x**1.3)
    body = svf(pink(n), cutoff, 0.8, "low")
    amp = x**2.2 * raised((1 - x) / 0.03)
    return body * amp


def swell(length_s: float) -> np.ndarray:
    n = idx(length_s + 0.4)
    return lowpass(pink(n), 1800) * shape_curve(n, 0.55)


def sfx_scale() -> dict[str, float]:
    """Linear gain per kind that puts a typical instance at its momentary target."""
    prototypes = {
        "whoosh": whoosh(0.6)[0],
        "swell": swell(0.7),
        "hit": hit()[0],
        "riser": riser(0.6),
        "click": click(),
        "tick": tick(1.0),
    }
    return {kind: db(SFX_MOMENTARY[kind] - momentary_max(sound)) for kind, sound in prototypes.items()}


def render_sfx() -> np.ndarray:
    bus = stereo()
    scale = sfx_scale()
    for cue in PLAN["cues"]:
        kind = cue["kind"]
        gain = scale[kind] * db(cue.get("gain", 0))
        length = sec(cue.get("length", 18))
        for k, frame in enumerate([cue["frame"], *cue.get("repeats", [])]):
            t = sec(frame)
            if kind == "whoosh":
                mono, pans = whoosh(length)
                # Pan sweeps with the move: split into two halves for a moving image.
                half = len(mono) // 2
                place(bus, t, np.concatenate([mono[:half], np.zeros(len(mono) - half)]), pan=pans[half // 2], gain=gain)
                place(bus, t, np.concatenate([np.zeros(half), mono[half:]]), pan=pans[half + (len(mono) - half) // 2], gain=gain)
            elif kind == "click":
                place(bus, t, click(), pan=0.1, gain=gain)
            elif kind == "tick":
                decay = 0.93**k
                place(bus, t, tick(1 + 0.04 * ((k * 7) % 5 - 2)), pan=0.15, gain=gain * decay)
            elif kind == "hit":
                sound, pre = hit()
                place(bus, t - pre, sound, gain=gain)
            elif kind == "riser":
                place(bus, t, riser(length), gain=gain)
            elif kind == "swell":
                place(bus, t - 0.1, swell(length), pan=RNG.uniform(-0.2, 0.2), gain=gain)
    return bus


# ─────────────────────────── space + master ───────────────────────────
def reverb_ir(rt60: float = 2.3, length_s: float = 3.2, predelay_s: float = 0.022) -> np.ndarray:
    n = idx(length_s)
    t = np.arange(n) / SR
    noise = RNG.standard_normal((n, 2))
    decay = np.exp(-6.91 * t / rt60)[:, None]
    early = noise * decay
    damped = lowpass(noise, 2600) * decay
    mix = np.exp(-t / 0.35)[:, None]
    ir = early * mix + damped * (1 - mix)
    ir = highpass(ir, 180)
    ir = np.concatenate([np.zeros((idx(predelay_s), 2)), ir])
    return ir / np.sqrt(np.sum(ir**2, axis=0, keepdims=True))


def convolve_reverb(send: np.ndarray) -> np.ndarray:
    ir = reverb_ir()
    wet = np.stack([signal.fftconvolve(send[:, c], ir[:, c])[:N] for c in range(2)], axis=1)
    return lowpass(wet, 7000)


def true_peak(x: np.ndarray) -> float:
    up = signal.resample_poly(x, 4, 1, axis=0)
    return float(np.max(np.abs(up)))


def limiter(x: np.ndarray, ceiling: float, release_s: float = 0.12, lookahead_s: float = 0.005) -> np.ndarray:
    """Look-ahead peak limiter: gain drops smoothly before a peak and recovers slowly."""
    look = idx(lookahead_s)
    peak = np.max(np.abs(x), axis=1)
    need = np.minimum(1.0, ceiling / np.maximum(peak, 1e-9))
    # The min-filter holds the reduction across the look-ahead window; averaging
    # inside that window gives a smooth attack that still meets every peak.
    gain = uniform_filter1d(minimum_filter1d(need, size=2 * look + 1), size=look)
    rel = math.exp(-1.0 / (release_s * SR))
    smoothed = np.empty_like(gain)
    g = 1.0
    for i, target in enumerate(gain):
        g = target if target < g else target + (g - target) * rel
        smoothed[i] = g
    return x * smoothed[:, None]


K_WEIGHTING = (
    ([1.53512485958697, -2.69169618940638, 1.19839281085285], [1.0, -1.69065929318241, 0.73248077421585]),
    ([1.0, -2.0, 1.0], [1.0, -1.99004745483398, 0.99007225036621]),
)


def momentary_max(x: np.ndarray) -> float:
    """Loudest 400 ms window, BS.1770 K-weighted (LUFS)."""
    y = x if x.ndim == 2 else np.stack([x, x], axis=1)
    for b, a in K_WEIGHTING:
        y = signal.lfilter(b, a, y, axis=0)
    w = idx(0.4)
    power = np.sum(uniform_filter1d(y**2, size=w, axis=0, mode="constant"), axis=1)
    return -0.691 + 10 * math.log10(float(power.max()) + 1e-12)


def calibrate(x: np.ndarray, target_lufs: float) -> np.ndarray:
    return x * db(target_lufs - loudness(x))


def loudness(x: np.ndarray) -> float:
    import pyloudnorm as pyln

    return float(pyln.Meter(SR).integrated_loudness(x))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--stems", action="store_true")
    parser.add_argument("--report", type=Path)
    args = parser.parse_args()

    pad = calibrate(render_pad(), STEM_LUFS["pad"])
    felt = calibrate(render_felt(), STEM_LUFS["felt"])
    bass = calibrate(render_bass(), STEM_LUFS["bass"])
    kick, shaker, snap, kick_times = render_drums()
    kick = calibrate(kick, STEM_LUFS["kick"])
    shaker = calibrate(shaker, STEM_LUFS["shaker"])
    snap = calibrate(snap, STEM_LUFS["snap"])
    bells = calibrate(render_bells(), STEM_LUFS["bell"])
    sfx = render_sfx()

    # Gentle pump from the kick keeps the bed breathing with the groove.
    pad *= sidechain(kick_times, 0.22)
    bass *= sidechain(kick_times, 0.35)
    felt *= sidechain(kick_times, 0.08)

    send = (
        pad * REVERB_SEND["pad"]
        + felt * REVERB_SEND["felt"]
        + bells * REVERB_SEND["bell"]
        + snap * REVERB_SEND["snap"]
        + shaker * REVERB_SEND["shaker"]
        + kick * REVERB_SEND["kick"]
    )
    music = pad + felt + bass + kick + shaker + snap + bells + convolve_reverb(send) * db(REVERB_RETURN_DB)
    sfx = sfx + convolve_reverb(sfx * REVERB_SEND["sfx"]) * db(REVERB_RETURN_DB)

    mix = highpass(music + sfx, 28)
    t = np.arange(N) / SR
    fade_in = raised(t / 0.04)
    fade_out = raised((DURATION_S - t) / SCORE["fadeOutSeconds"])
    mix *= (fade_in * fade_out)[:, None]

    lufs = loudness(mix)
    mix *= db(TARGET_LUFS - lufs)
    mix = limiter(mix, db(CEILING_DBFS - 0.3))
    mix *= db(TARGET_LUFS - loudness(mix))
    peak = true_peak(mix)
    if peak > db(CEILING_DBFS):
        mix *= db(CEILING_DBFS) / peak

    out = ROOT / "public" / "audio" / "soundtrack.wav"
    out.parent.mkdir(parents=True, exist_ok=True)
    dither = (RNG.random((N, 2)) - RNG.random((N, 2))) / 32768
    pcm = np.clip(np.round((mix + dither) * 32767), -32768, 32767).astype(np.int16)
    wavfile.write(out, SR, pcm)

    stats = {
        "file": str(out.relative_to(ROOT)),
        "seconds": round(N / SR, 3),
        "integrated_lufs": round(loudness(mix), 2),
        "true_peak_dbfs": round(20 * math.log10(true_peak(mix)), 2),
        "music_lufs": round(loudness(music), 2),
        "sfx_lufs": round(loudness(sfx), 2),
        "max_step": round(float(np.max(np.abs(np.diff(mix, axis=0)))), 4),
    }
    print(json.dumps(stats, indent=2))

    if args.stems:
        stems = ROOT / "out" / "audio"
        stems.mkdir(parents=True, exist_ok=True)
        norm = db(TARGET_LUFS - lufs)
        for name, data in (("music", music), ("sfx", sfx)):
            wavfile.write(stems / f"{name}.wav", SR, np.clip(data * norm, -1, 1).astype(np.float32))

    if args.report:
        import matplotlib

        matplotlib.use("Agg")
        import matplotlib.pyplot as plt

        mono = mix.mean(axis=1)
        fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(18, 7), sharex=True)
        ax1.plot(t, mono, linewidth=0.3, color="#0E0F0D")
        for s in PLAN["scenes"].values():
            ax1.axvline(sec(s["from"]), color="#22C088", linewidth=0.8)
        for cue in PLAN["cues"]:
            ax1.axvline(sec(cue["frame"]), color="#F2A516", linewidth=0.4, alpha=0.6)
        ax1.set_ylabel("amplitude")
        ax2.specgram(mono, NFFT=2048, Fs=SR, noverlap=1536, cmap="magma", vmin=-130)
        ax2.set_ylim(0, 8000)
        ax2.set_ylabel("Hz")
        ax2.set_xlabel("seconds")
        fig.tight_layout()
        fig.savefig(args.report, dpi=90)
        print(f"report → {args.report}")


if __name__ == "__main__":
    main()

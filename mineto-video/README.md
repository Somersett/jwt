# MINETO — video promocional (motion graphics)

Pieza de 37,5 s en **Remotion + React + TypeScript**, construida solo con texto, formas, SVG y CSS, con música y efectos **sintetizados por código**. No usa assets de pago ni samples, y las fuentes están incluidas en el repositorio.

| | |
|---|---|
| Composición | `MinetoPromo` (`src/MinetoPromo.tsx`) |
| Duración | 1125 frames = **37,5 s** |
| Resolución | **1920 × 1080**, 16:9 |
| FPS | 30 |
| Salida | H.264, yuv420p, BT.709 · audio AAC estéreo 48 kHz, 320 kbps, −17 LUFS |

> **Cifras demostrativas.** $6.000.000, $696.600, etc. son un *ejemplo ilustrativo*: no son un cálculo fiscal ni de seguridad social, y el video lo indica en pantalla. Se editan en `src/data/money.ts` (el disponible se recalcula solo).

---

## Dirección artística

- **Fintech editorial.** Off-white cálido (`#F3F1EC`), tinta casi negra, mucho aire, bordes de 1 px y números grandes con tracking negativo.
- **El color tiene significado.** Menta = dinero disponible · azul eléctrico = seguridad social · ámbar = impuestos / atención · pizarra = retenciones. El rojo no se usa porque nada en la pieza es un error.
- **Tipografía.** Geist para titulares y cifras (con `tnum`, para que los números no bailen al animarse) y Geist Mono en versalitas para etiquetas técnicas.
- **Un hilo conductor: la barra de dinero.** Nace como subrayado de "ganas", se parte en cuatro, se convierte en la barra de ingreso, se reparte en buckets, reaparece dentro de la UI y termina plegándose en el símbolo del logo.
- **Logo.** Un cuadrado partido en dos: una parte estrecha apartada (tinta) y la parte que puedes usar (menta). Es la barra reducida a símbolo.

## Sistema de movimiento

- **Curvas** (`src/motion/easing.ts`): `out` (expo-out) para entradas, `inOut` para desplazamientos entre posiciones, `in` para salidas. Muelles críticamente amortiguados; el pequeño rebote se reserva para confirmaciones de UI.
- **Nada aparece con fade.** El texto entra por máscaras (`Mask` / `TextReveal`), las superficies crecen desde el elemento que las origina y los cambios de color se hacen con un borde duro que se desplaza (`ReserveBar.covers`), nunca interpolando colores, porque eso pasa por tonos turbios.
- **Matched cuts.** El estado final de un elemento compartido en una escena es exactamente el estado inicial en la siguiente, porque ambas leen la misma geometría.
- **Ritmo.** El montaje está cortado a **120 BPM** (1 beat = 15 frames). Todas las escenas empiezan en un beat y los seis golpes de transición caen en beat exacto.
- **Tiempo de lectura.** Las animaciones son rápidas, pero cada escena termina con una pausa en la que todo queda quieto y completo en pantalla (~1,5–2,5 s) antes de salir. Las entradas secuenciales van espaciadas: una tarjeta por segundo y ~1,2 s por frase.

## Timeline

| # | Escena | Frames | Segundos | Qué pasa |
|---|---|---|---|---|
| 1 | Intro | 0–165 | 0–5,5 | MINETO entra letra a letra y sube a cabecera. "ganas" aparece sola, viaja a su sitio y la frase se completa en onda. Su subrayado en tinta se descubre partido en 4 buckets. |
| 2 | Ingreso | 165–360 | 5,5–12 | La barra partida viaja, se cierra y se cubre de tinta mientras **$6.000.000** cuenta. Cae una línea vertical, la tinta se retira desde el corte y aparecen las categorías. |
| 3 | Distribución | 360–585 | 12–19,5 | La cifra se encoge al nivel 01. Conectores ortogonales bajan de cada tramo de la barra a su tarjeta y el disponible rueda como odómetro: 6.000.000 → 5.303.400 → 4.923.400 → **4.803.400**. |
| 4 | Producto | 585–810 | 19,5–27 | La cifra viaja a la UI y "$4.803.400" se convierte en "$4,8M". La tarjeta crece desde la cifra, las reservas pasan a "Separado", entran el aviso ámbar y el titular, y el cursor muestra un tooltip. Barrido a tinta. |
| 5 | Manifiesto | 810–975 | 27–32,5 | Tres frases con su marcador de color. Las externas se retiran, la central colapsa en una rendija, los marcadores forman una barra y se pliegan en el símbolo mientras MINETO se abre. |
| 6 | Cierre | 975–1125 | 32,5–37,5 | El papel sube sobre la tinta y el logo se recolorea en el borde exacto del barrido. Luego tagline, CTA con hover, mineto.tech y el "clic" final del símbolo. |

Los tiempos internos de cada escena están en `src/motion/timeline.ts` (`INTRO_T`, `INCOME_T`, …). Para dar más o menos tiempo de lectura, alarga la escena en `LENGTH` y mueve su `exit` (o `wipe`) en la misma cantidad de frames.

## Audio

Música y efectos se generan con `audio/synth.py` a partir de la timeline. No hay samples ni pistas externas: todo sale de ondas senoidales y ruido filtrado, con semilla fija, así que el resultado es idéntico en cada ejecución.

- **Música.** Electrónica minimalista y suave a **120 BPM en Re mayor**: pad de tono redondo, piano tipo *felt* en arpegio, bajo limpio, bombo suave y campanas FM en las dos resoluciones (el disponible y el logo). Pocas capas a propósito: cada una tiene su espacio en frecuencia (el pad no baja de 180 Hz, el bajo no baja de 45 Hz, la reverb no tiene graves). Los acordes y la entrada de cada capa están fijados a momentos visuales en `src/audio/score.ts`. En el manifiesto la percusión se retira y el pad se oscurece; en el logo resuelve a Re mayor y el final se desvanece.
- **Efectos.** Pocos y suaves: 16 cues en `src/audio/cues.ts`, solo en los movimientos grandes, cuando aterriza el dinero y en los golpes estructurales. Los ticks del conteo se espacian con la misma curva que el número, y los clicks caen justo cuando aterriza cada tarjeta o se marca cada "Separado".
- **Mezcla y máster.** Cada capa se calibra por sonoridad medida (LUFS): los efectos quedan 4–10 LU bajo la música, audibles pero nunca encima. Máster a **−17 LUFS integrados**, con margen suficiente para que el limitador nunca actúe (pico real ≈ −1,8 dBTP).

```bash
pip install -r audio/requirements.txt   # numpy, scipy, pyloudnorm (+ matplotlib opcional)
npm run audio    # timeline → audio/plan.json → public/audio/soundtrack.wav
npm run cues     # hoja de cues legible (frame · segundos · beat · tipo)
python3 audio/synth.py --stems --report out/audio.png   # stems + forma de onda/espectrograma
```

Si cambias tiempos en `src/motion/timeline.ts`, vuelve a ejecutar `npm run audio` antes de renderizar para que el sonido siga a la imagen. La pista se monta en `src/MinetoPromo.tsx` con `<Html5Audio>`.

## Estructura

```
mineto-video/
├─ remotion.config.ts        códec, calidad, color BT.709, navegador opcional
├─ public/fonts/             Geist + Geist Mono (SIL OFL 1.1, licencia incluida)
├─ scripts/print-cues.ts     npm run cues
└─ src/
   ├─ index.ts / Root.tsx    registro de la composición
   ├─ MinetoPromo.tsx        COMPOSICIÓN PRINCIPAL: escenas, HUD y barrido global
   ├─ fonts.tsx              carga local de Geist + FontGate (bloquea el render hasta tener fuentes)
   ├─ theme/                 colors · typography (escala + métricas verticales) · spacing
   ├─ motion/                easing (curvas, muelles, duraciones) · timeline (BPM, escenas, cues) · animate
   ├─ layout/                geometry (todas las posiciones) · measure (medición de texto)
   ├─ data/                  money (cifras demo + formato es-CO) · copy (todos los textos)
   ├─ audio/                 cues.ts (efectos) · score.ts (acordes y arreglo)
   ├─ components/
   │  ├─ AnimatedMoney.tsx   conteo o rodillo por dígito (odómetro)
   │  ├─ MetricCard.tsx      bucket con cantidad, % y medidor
   │  ├─ ReserveBar.tsx      la barra de dinero: segmentos, huecos, coberturas
   │  ├─ TextReveal.tsx      Mask + revelado por palabra/letra
   │  ├─ Logo.tsx            lockup + geometría exportable (para morphs)
   │  ├─ SceneTransition.tsx Wipe + ClipReveal
   │  ├─ InterfaceMockup.tsx UI ficticia de Mineto
   │  ├─ Connector.tsx       líneas ortogonales que se dibujan
   │  └─ Hud.tsx             cromo editorial (marca, sección, disclaimer)
   └─ scenes/                Scene1Intro … Scene6EndCard
```

## Renderizar

Requisitos: Node 18+ (probado con Node 22).

```bash
npm install
npm run audio            # (opcional) regenera la banda sonora; ya viene incluida
npm run dev              # Remotion Studio para previsualizar y ajustar
npm run render           # → out/mineto-promo-1920x1080.mp4
npm run render:preview   # → out/preview-960x540.mp4 (rápido, media resolución)
npm run still            # → out/poster.png (último frame)
npm run typecheck
```

Remotion descarga su propio Chrome headless la primera vez. En entornos sin esa descarga (CI, sandboxes), apunta a un `headless_shell` local:

```bash
REMOTION_BROWSER_EXECUTABLE=/ruta/a/headless_shell npm run render
```

## Adaptar a 9:16

Todo lo que depende del formato está concentrado, no repartido por las escenas:

1. **Lienzo.** `STAGE`, `SAFE` y `CONTENT` en `src/theme/spacing.ts`.
2. **Posiciones.** Todas viven en `src/layout/geometry.ts`, agrupadas por escena. Las escenas no tienen coordenadas propias.
3. **Tipografía.** La escala está en `src/theme/typography.ts`.

Pasos para un corte vertical 1080 × 1920:

- Crear `geometry.portrait.ts` con la misma forma que `geometry.ts`. Lo que cambia de verdad: en la escena 3 las tres tarjetas se apilan en columna (el enrutado de los conectores ya es genérico); en la 4 el titular pasa debajo de la tarjeta; en el resto basta con recentrar y reducir la escala tipográfica (~0,8×).
- Exponer la geometría con un `React.Context` (o un parámetro `format` en las props) en lugar de importarla directamente, y registrar una segunda `<Composition id="MinetoPromoVertical" width={1080} height={1920} …/>` en `Root.tsx`.
- La timeline, los componentes, el movimiento y los cues de audio no cambian.

## Licencias

- **Geist / Geist Mono:** SIL Open Font License 1.1 (`public/fonts/OFL-LICENSE.txt`).
- **Remotion:** gratis para personas y empresas de hasta 3 empleados. Otras empresas necesitan una [licencia de empresa](https://remotion.pro/license).

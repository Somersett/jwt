# Finalista SECOP II para mipymes y personas naturales contratistas en regiones (Huila y sur del país): alertas filtradas y análisis "¿cumplo o no cumplo?" de pliegos

Convenciones de estas notas:
- **Acceso de todas las fuentes: 2026-10-01** (abreviado "acc."). Si una página no muestra fecha de publicación, se indica "sin fecha visible".
- Etiquetas: **[HECHO]** = dato verificable en la fuente o resultado directo de una consulta a datos abiertos; **[ESTIMACIÓN]** = cálculo propio sobre datos oficiales o cifra aproximada de la fuente; **[HIPÓTESIS]** = inferencia sin dato duro. En los hallazgos clave se indica qué **prueba** y qué **NO prueba**.
- Las señales de **demanda** (gente que licita o se queja) se separan de las de **disposición a pagar (DAP)** (precios publicados, salarios y clientes declarados).
- Este documento **no repite** el escaneo preliminar (oportunidad 12 en `oportunidades_secop_cobranza_restaurantes_icfes.md`), lo **profundiza y verifica**. Del escaneo se reutilizan, sin volver a consultarlos, dos datos: 22.849 proveedores distintos ganaron contratos competitivos en 2025 y el salario de un analista de licitaciones (Indeed: 2.021.461 COP/mes; Computrabajo: 2,2 a 4,0 millones).
- TRM de referencia: 3.341,23 COP/USD, cierre de septiembre de 2026, tomada de `contexto_colombia.md`. La meta del fundador (~500 USD/mes) equivale a ≈ **1,67 millones COP/mes**.
- Las consultas a la API Socrata de datos.gov.co se ejecutaron el 2026-10-01. Los datasets se actualizan a diario, así que las cifras pueden variar un poco en consultas futuras.

---

## 1. Cliente y problema: quién licita de verdad, en qué modalidades, cuántos procesos y oferentes hay (nacional, Huila, Tolima, Caquetá y Putumayo)

### Takeaway
En 2025 SECOP II publicó **84.432 procesos competitivos**. El 69 % fue de mínima cuantía, frente a ~1,68 millones de procesos directos o de régimen especial. Hubo **34.920 oferentes distintos** que presentaron 279.274 ofertas. Pero la mitad (48 %) ofertó **una sola vez** en el año y solo ~10.300 ofertaron 4 o más veces. En el sur, las entidades de Huila, Tolima, Caquetá y Putumayo publicaron **7.443 procesos competitivos** (Huila: 2.379, ~200 al mes) y recibieron ofertas de 5.285 proponentes distintos. De ellos, solo **1.812 están domiciliados en esos cuatro departamentos** (673 en Huila) y apenas **658 ofertaron 4 o más veces en el año**. El cliente que de verdad necesita alertas y análisis es la mipyme que oferta con frecuencia en modalidades competitivas, sobre todo mínima cuantía. Ese segmento es real, pero regionalmente pequeño.

### Cited Findings

#### Consultas exactas usadas (API Socrata, datos.gov.co, ejecutadas el 2026-10-01)
Datasets: [SECOP II – Procesos de Contratación (p6dx-8zbt)](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt), [SECOPII – Ofertas Por Proceso (wi7w-2nvm)](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOPII-Ofertas-Por-Proceso/wi7w-2nvm), [SECOP II – Proveedores Registrados (qmzu-gj57)](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Proveedores-Registrados/qmzu-gj57) y [SECOP II – Contratos Electrónicos (jbjy-vk9h)](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Contratos-Electr-nicos/jbjy-vk9h). Según los metadatos de la API, los cuatro se actualizaron el 2026-09-30 con frecuencia "Diaria".

```
-- Modalidades competitivas (MOD7) = 'Mínima cuantía','Selección Abreviada de Menor Cuantía','Selección abreviada subasta inversa',
--   'Licitación pública','Concurso de méritos abierto','Licitación pública Obra Publica','Seleccion Abreviada Menor Cuantia Sin Manifestacion Interes'
-- (1) Procesos por modalidad (p6dx-8zbt); se cuenta id_del_portafolio (CO1.BDOS), porque id_del_proceso (CO1.REQ) se repite por fase
$select=modalidad_de_contratacion,count(distinct id_del_portafolio)
$where=fecha_de_publicacion_del between "2025-01-01T00:00:00" and "2025-12-31T23:59:59"   $group=modalidad_de_contratacion
-- (2) Igual que (1), agregando departamento_entidad in ('Huila','Tolima','Caquetá','Putumayo') y agrupando por departamento y modalidad
-- (3) Oferentes promedio y precio base (p6dx-8zbt): avg(proveedores_unicos_con), avg(precio_base) where MOD7 and adjudicado='Si'
-- (4) Ofertas 2025 (wi7w-2nvm): $select=modalidad,count(distinct identificador_de_la_oferta),count(distinct nit_del_proveedor),
--     count(distinct id_del_proceso_de_compra)  $where=fecha_de_registro between "2025-01-01..." and "2025-12-31..."  $group=modalidad
-- (5) Frecuencia por oferente: $select=nit_del_proveedor,count(distinct identificador_de_la_oferta) $group=nit_del_proveedor (una consulta por modalidad)
-- (6) Sur: id_del_portafolio de p6dx (MOD7, 2025, 4 deptos) -> wi7w-2nvm where id_del_proceso_de_compra in (...) en lotes de 200
--     -> cruce de nit_del_proveedor con qmzu-gj57 (departamento, tipo_empresa, espyme)
-- (7) Contratos 2025 (jbjy-vk9h): fecha_de_firma en 2025, 6 modalidades competitivas, valor_del_contrato < 1e11, agrupado por es_pyme / tipodocproveedor
```
Trampas de los datos que corregí: (a) en wi7w-2nvm cada oferta aparece repetida en varias filas, una por `c_digo_entidad`, así que se cuenta `identificador_de_la_oferta` distinto; (b) filtrar ofertas por NIT de la entidad infla las cifras regionales, porque entidades nacionales como el SENA (NIT 899999034) comparten NIT en todo el país, así que el cruce regional se hizo **por ID de proceso**; (c) `es_pyme`, `departamento` y `tipo_empresa` son **autodeclarados** por el proveedor.

#### Volumen de procesos 2025 por modalidad (nacional)
- [HECHO] Procesos distintos (id_del_portafolio) publicados en 2025: **régimen especial 934.735; contratación directa 746.531; mínima cuantía 58.312**; solicitud de información 29.337; contratación directa con ofertas 11.356; **selección abreviada de menor cuantía 11.233**; régimen especial con ofertas 9.543; **subasta inversa 8.162**; **concurso de méritos abierto 2.926**; **licitación pública 2.138**; **licitación de obra pública 1.530**; SAMC sin manifestación 131. Las 7 modalidades competitivas suman **84.432** procesos y la mínima cuantía es el **69 %**. — [p6dx-8zbt](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt), consulta (1) (acc. 2026-10-01). *Prueba:* el universo competitivo es ~5 % de los procesos y está dominado por mínima cuantía. *No prueba:* cuántos procesos le interesan a un sector concreto.
- [HECHO] Monto de la mínima cuantía: el precio base de los procesos de 2025 en fase de oferta se reparte así: <5 M: 4.392; **5–20 M: 15.170; 20–50 M: 24.432**; 50–100 M: 8.463; 100–200 M: 4.756; ≥200 M: 13. El promedio de los adjudicados es **42,7 M COP**. — [p6dx-8zbt](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt) (acc. 2026-10-01). En el sur el promedio es menor: Huila 34,7 M, Tolima 44,7 M, Caquetá 36,9 M y Putumayo 36,3 M.
- [HECHO] Umbral legal: la menor cuantía depende del presupuesto de la entidad (1.000, 850, 650, 450 o 280 SMMLV) y la mínima cuantía es el 10 % de ella — [Ley 1150 de 2007, art. 2, compilación Cancillería](https://cancilleria.gov.co/normograma/compilacion/docs/ley_1150_2007.htm) (acc. 2026-10-01). [ESTIMACIÓN] Con el SMMLV 2026 de 1.750.905, el tope de mínima cuantía va de **49,0 M COP** (entidades pequeñas: 28 SMMLV, el caso típico de los municipios del Huila) a **175,1 M COP** (100 SMMLV). Ejemplo verificado: en la Superservicios la mínima cuantía 2026 es de 45 SMMLV, es decir, **78.790.725 COP** — [Circular interna SSPD 20265000000014, 07-ene-2026](https://www.superservicios.gov.co/sites/default/files/inline-files/Cuantias-para-la-contratacion-en-la-vigencia-fiscal-2026.pdf) (acc. 2026-10-01).

#### Volumen regional 2025 (entidades con sede en el departamento)
- [HECHO] Procesos competitivos 2025 por departamento de la entidad (consulta 2):

| Depto. | Mínima cuantía | SA menor cuantía | Subasta inversa | Licitación | Licit. obra | Concurso méritos | **Total competitivo** | Directa con ofertas | Rég. especial con ofertas |
|---|---|---|---|---|---|---|---|---|---|
| Huila | 1.826 | 207 | 232 | 31 | 30 | 53 | **2.379** | 287 | 164 |
| Tolima | 1.904 | 385 | 170 | 88 | 68 | 104 | **2.719** | 97 | 359 |
| Caquetá | 893 | 234 | 153 | 26 | 21 | 46 | **1.373** | 69 | 189 |
| Putumayo | 650 | 158 | 106 | 12 | 17 | 29 | **972** | 22 | 89 |
| **Sur (4)** | 5.273 | 984 | 661 | 157 | 136 | 232 | **7.443** | 475 | 801 |

  — [p6dx-8zbt](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt) (acc. 2026-10-01). *Prueba:* el Huila genera ~200 procesos competitivos al mes, unos 10 por día hábil, y el 77 % son de mínima cuantía. *No prueba:* cuántos corresponden al sector de un cliente dado.

#### Oferentes: cuántos hay, cada cuánto ofertan y cuánta competencia hay por proceso
- [HECHO] **Ofertas 2025 a nivel nacional** (consulta 4): en las 7 modalidades competitivas hubo **279.274 ofertas** de **34.920 NIT distintos**. Si se suman contratación directa y régimen especial "con ofertas", son **41.367 NIT**. Por modalidad: mínima cuantía tuvo 24.208 oferentes, 159.331 ofertas y 49.312 procesos; SA menor cuantía 8.500 oferentes; subasta 5.175; concurso de méritos 3.316; licitación de obra 2.727; licitación pública 2.225. — [wi7w-2nvm](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOPII-Ofertas-Por-Proceso/wi7w-2nvm) (acc. 2026-10-01). *Prueba:* el universo de "buscadores de licitaciones" activos (~35.000) es ~1,5 veces el de ganadores (22.849, según el escaneo previo). *No prueba:* el tamaño de las empresas.
- [HECHO] **Frecuencia anual por oferente** (consulta 5; 34.858 NIT y 278.983 ofertas en 6 modalidades): **1 oferta: 16.844 (48,3 %)**; 2–3: 7.727 (22,2 %); **4–11: 6.245 (17,9 %)**; **12–50: 3.255 (9,3 %)**; **>50: 787 (2,3 %)**. Es decir, **10.287 oferentes presentaron 4 o más ofertas** y **4.042 presentaron 12 o más** (≈ 1 al mes). — [wi7w-2nvm](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOPII-Ofertas-Por-Proceso/wi7w-2nvm) (acc. 2026-10-01). *Prueba:* el mercado de suscripción mensual es el de los ~4.000 a 10.000 oferentes frecuentes. *No prueba:* que los ocasionales no pagarían por análisis sueltos.
- [HECHO] **Competencia por proceso.** El promedio de oferentes únicos en procesos adjudicados en 2025 fue: mínima cuantía **3,36**, SA menor cuantía 3,6, licitación pública 8,0, subasta 10,6, concurso de méritos 19,3 y licitación de obra pública **46,1**. En mínima cuantía, **18.450 de 47.075 procesos adjudicados (39 %) tuvieron 0 o 1 oferente**. — [p6dx-8zbt](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt), campo `proveedores_unicos_con` (acc. 2026-10-01).
- [HECHO] **Sur, cruce por proceso** (consulta 6):

| Depto. entidad | Procesos con ofertas | Oferentes distintos | Ofertas | Oferentes/proceso (mediana · promedio) | Procesos con 1 oferente | Oferentes con domicilio en el depto. | Personas naturales | Marcados pyme |
|---|---|---|---|---|---|---|---|---|
| Huila | 2.016 | 2.287 | 7.620 | 2 · 3,34 | 815 (40 %) | 648 | 409 | 1.803 de 2.079 cruzados |
| Tolima | 2.345 | 2.694 | 8.150 | 2 · 3,04 | 1.090 (46 %) | 604 | 442 | 2.175 de 2.469 |
| Caquetá | 1.206 | 1.056 | 2.583 | 1 · 2,11 | 809 (67 %) | 273 | 161 | 891 de 980 |
| Putumayo | 852 | 749 | 1.730 | 1 · 1,95 | 564 (66 %) | 234 | 139 | 624 de 686 |

  En total, **5.285 oferentes distintos** ofertaron a entidades del sur. Por domicilio registrado: 988 en Bogotá, 896 "No provisto" y 556 sin cruce en el registro. **Solo 1.812 están domiciliados en los 4 departamentos** (569 personas naturales y 1.560 pyme). El **54 %** de los 5.285 ofertó a un solo proceso del sur en el año. — [wi7w-2nvm](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOPII-Ofertas-Por-Proceso/wi7w-2nvm) + [qmzu-gj57](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Proveedores-Registrados/qmzu-gj57) (acc. 2026-10-01). *Prueba:* en Caquetá y Putumayo dos de cada tres procesos tienen un solo oferente, así que encontrar el proceso a tiempo vale mucho. *No prueba:* que esos procesos sean del sector del cliente ni que sean rentables.
- [HECHO] **Frecuencia de los oferentes locales**, medida con sus ofertas nacionales de 2025:
  - Huila (673 domiciliados): 244 ofertaron 1 vez, 166 entre 2 y 3, 146 entre 4 y 11 y 117 12 o más veces; 221 son personas naturales.
  - Tolima (616): 245 / 143 / 146 / 82.
  - Caquetá (282): 108 / 77 / 60 / 37.
  - Putumayo (241): 105 / 66 / 48 / 22.
  - Total de los 4 departamentos: **658 con 4 o más ofertas y 258 con 12 o más**.
  - Visto desde el registro: de **25.970 proveedores activos domiciliados en el Huila** en qmzu-gj57, solo **756 presentaron alguna oferta competitiva en 2025** (a cualquier entidad del país). De ellos, **280 ofertaron 4 o más veces**, **124 ofertaron 12 o más** y 237 son personas naturales.
  
  — [qmzu-gj57](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Proveedores-Registrados/qmzu-gj57) + [wi7w-2nvm](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOPII-Ofertas-Por-Proceso/wi7w-2nvm) (acc. 2026-10-01). *Prueba:* **el mercado frecuente del Huila tiene ~120 a 280 empresas o personas**. *No prueba:* su sector ni su capacidad de pago.

#### Quién gana: mipymes y personas naturales
- [HECHO] Contratos firmados en 2025 en 6 modalidades competitivas, excluidos los valores ≥100.000 M por posibles errores (consulta 7): los proveedores con `es_pyme = Si` firmaron **59.541 contratos (81 %)** por **16,2 billones COP (41 % del valor)**. Los no pyme firmaron 13.984 contratos por 23,4 billones. En **mínima cuantía**, las pyme tienen 41.626 contratos y **1,75 billones COP (83 % del valor)**. Las **personas naturales (cédula) firmaron 11.823 contratos de mínima cuantía (24 %)**: son 4.546 personas distintas, por 0,49 billones. — [jbjy-vk9h](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Contratos-Electr-nicos/jbjy-vk9h) (acc. 2026-10-01). *Prueba:* las mipymes **sí ganan** con frecuencia en las modalidades pequeñas; esto descarta el argumento de que "las mipymes rara vez ganan". *No prueba:* su margen ni su rentabilidad.

### Inferences
- [ESTIMACIÓN] Si a los 34.920 oferentes se les restan los 22.849 ganadores del escaneo previo, quedan unos **12.000 que ofertaron en 2025 sin ganar ningún contrato competitivo**. Son posibles clientes con dolor de "no cumplo" o "no gano" (los datasets y las bases de fecha difieren, así que es una aproximación).
- [HIPÓTESIS] El cliente con más necesidad es la mipyme o persona natural que oferta **4 o más veces al año en mínima cuantía o SA menor cuantía**. Las de licitación de obra o concurso de méritos (46 y 19 oferentes promedio) son más profesionales, suelen tener analista y su pliego es "tipo", es decir, estandarizado. Las que ofertan una vez al año no sostienen una suscripción mensual.
- [HIPÓTESIS] La contratación directa (746.531 procesos) y el régimen especial sin ofertas no necesitan alertas. El régimen especial **con** ofertas (801 procesos en el sur, sobre todo ESE hospitalarias y universidades) es un nicho adicional que conviene verificar si cubren los competidores.

### Gaps
- No pude identificar el **sector (UNSPSC)** de los oferentes del sur para estimar cuántos procesos por mes le llegan a un cliente típico. Se puede hacer con `codigo_principal_de_categoria` de p6dx-8zbt en una siguiente iteración.
- El tamaño real de la empresa (micro, pequeña o mediana) no está en los datasets, solo el campo autodeclarado `espyme`. En el sur, el 87 % de los oferentes cruzados está marcado como pyme.
- En el dataset de procesos no existe un estado "Desierto" separado, así que no pude aislar los procesos declarados desiertos (ver sección 2).

---

## 2. Frecuencia y consecuencias del problema: tiempo de búsqueda y lectura, rechazos, procesos fallidos y costo de hacerlo con personal o consultores

### Takeaway
La consecuencia de no "cumplir" es medible. En ~**58 a 62 %** de los procesos de mínima cuantía adjudicados con 2 o más ofertas comparables, **el ganador no fue la oferta más barata**. Como la norma obliga a adjudicar a la de menor precio que cumpla, eso indica que las ofertas más baratas suelen quedar descalificadas (es un indicador con ruido). Además, el **18 %** de los procesos de mínima cuantía de 2025 no se adjudicó. Los plazos son cortos: entre publicación y cierre pasan en mediana **5 días calendario** en mínima cuantía, y en el 36 % de los procesos son 3 días o menos. No encontré estadísticas oficiales de causales de rechazo, ni mediciones independientes de horas dedicadas, ni tarifas públicas de consultores por proceso.

### Cited Findings
- [HECHO] **Regla de adjudicación en mínima cuantía.** "La Entidad Estatal debe revisar las ofertas económicas y verificar que la de menor precio cumple con las condiciones de la invitación. Si esta no cumple, … verificar … la oferta con el segundo mejor precio, y así sucesivamente". La invitación se publica "por un término no inferior a un (1) día hábil". La capacidad financiera solo "podrá" exigirse "cuando no hace el pago contra entrega"; la experiencia mínima, "si se exige". — [Decreto 1860 de 2021, art. 2.2.1.2.1.5.2 (copia en el normograma de Cancillería)](https://www.cancilleria.gov.co/sites/default/files/Normograma/docs/pdf/decreto_1860_2021.pdf) (pub. 24-dic-2021 · acc. 2026-10-01; el gestor de Función Pública devolvió 503). *Prueba:* en mínima cuantía gana el más barato **que cumpla**, y los habilitantes son documentales y simples.
- [ESTIMACIÓN] **Indicador de ofertas descalificadas.** Tomé los procesos de mínima cuantía adjudicados en 2025 con 2 o más ofertas registradas por valores entre el 50 % y el 105 % del precio base, y en los que el NIT ganador aparece en las ofertas. En el **sur**, en **669 de 1.080 (61,9 %)** el adjudicatario no fue el de menor valor ofertado. En una **muestra nacional aleatoria** de 4.000 procesos, ocurrió en **1.067 de 1.831 (58,3 %)**. Sin el filtro de valores, los resultados son 63,5 % y 59,6 %. Revisé a mano 12 procesos del Huila de marzo de 2025. Ejemplo: en CO1.BDOS.7795476 hubo tres ofertas más baratas que la ganadora; en CO1.BDOS.7860636 el ganador fue el cuarto más barato. — [wi7w-2nvm](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOPII-Ofertas-Por-Proceso/wi7w-2nvm) + [p6dx-8zbt](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt) (acc. 2026-10-01). *Prueba:* es frecuente que la oferta más barata no quede habilitada. *No prueba:* la causa exacta, que puede ser documentos, experiencia, condiciones técnicas, rechazo por precio artificialmente bajo, ofertas con o sin IVA, lotes o errores de captura. Además, 1.280 procesos del sur quedaron fuera porque el NIT ganador no cruzaba, lo que puede introducir sesgo.
- [HECHO] **Procesos de mínima cuantía no adjudicados en 2025:** en la fase "Presentación de oferta", **10.151 de 57.226 filas (17,7 %)** tienen `adjudicado = No`. Por estado: Cancelado 6.428, Seleccionado 1.643, Abierto 1.329, Evaluación 746 y Suspendido 5. — [p6dx-8zbt](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt) (acc. 2026-10-01). *No prueba:* cuántos fueron "desiertos" por no haber ofertas hábiles, porque el dataset no tiene ese estado.
- [HECHO] **Ventanas de tiempo.** Días calendario entre `fecha_de_publicacion_del` y `fecha_de_recepcion_de` (cierre de ofertas) en 2025:

| Modalidad | Mediana | P25 | P75 | Procesos con 3 días o menos |
|---|---|---|---|---|
| Mínima cuantía, nacional (n = 57.220) | 5 | 3 | 7 | 35,9 % |
| Mínima cuantía, Huila (n = 1.760) | 6 | 4 | 6 | 23,5 % |
| SA menor cuantía | 4 | 2 | 6 | 43,4 % |
| Subasta inversa | 9 | 7 | 13 | 7,2 % |
| Licitación de obra pública | 15 | 12 | 21 | 0 % |

  — [p6dx-8zbt](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt) (acc. 2026-10-01; los campos son solo de fecha, sin hora). *Prueba:* en mínima cuantía, enterarse tarde equivale a perder el proceso.
- [HECHO] Las causales de declaratoria de desierta "solo proceden por motivos o causas que impidan la escogencia objetiva", por ejemplo cuando no se presentan ofertas o ninguna cumple. Los requisitos que no afectan la asignación de puntaje son subsanables. — resumen del buscador sobre [CCE, base de conocimiento de mínima cuantía](https://www.colombiacompra.gov.co/base-conocimiento/minima-cuantia-secop-ii) (actualizada el 23-abr-2025) y la [ficha de jurisprudencia de CCE](https://sintesis.colombiacompra.gov.co/jurisprudencia/ficha/7653) (sin fecha visible · acc. 2026-10-01). No encontré **estadísticas** oficiales de rechazos por causal.
- [HIPÓTESIS, fuente con sesgo] Tiempo dedicado: el único dato es un blog de un proveedor, ya citado en el escaneo previo, que menciona ~3 h/semana de búsqueda en una constructora. No es verificable.
- [HECHO] Costo de personal, mercado local: en elempleo.com, la búsqueda "auxiliar de licitaciones Neiva" solo mostró **un** cargo de licitaciones, y está en **Bogotá** (Conconcreto, salario confidencial, exige "manejo de SECOP"). Las demás ofertas de Neiva no eran de licitaciones. — [elempleo.com](https://www.elempleo.com/co/ofertas-empleo/trabajo-auxiliar-de-licitaciones-neiva) (acc. 2026-10-01). Un resumen del buscador mencionó "auxiliar de licitaciones en Neiva a 1.800.000", pero no lo pude verificar en la página. *Prueba:* en Neiva casi no hay demanda visible de este cargo, así que la mipyme regional lo hace con su propio personal (**[HIPÓTESIS]**).
- [HECHO] Consultores y formación con precio público: **Asesoría en Licitaciones** (Miyer Sánchez, Medellín, "14 años de experiencia") vende cursos por 150.000 (mínima cuantía), 250.000 (ofertas económicas), 285.600 (SECOP II para proveedores), 300.000 (RUP optimizado) y 618.800 COP (combo). Los servicios de "Diagnóstico", "Asesoría" y "Mentoría para licitar" **no tienen precio publicado**. — [asesorialicitaciones.com](https://asesorialicitaciones.com/) (sin fecha visible · acc. 2026-10-01). *Prueba:* hay quien paga por aprender a licitar (DAP por formación). *No prueba:* tarifas por proceso ni de éxito.

### Inferences
- [HIPÓTESIS] El dolor de "¿cumplo o no cumplo?" tiene respaldo indirecto: en ~6 de cada 10 adjudicaciones con competencia de precio, la oferta más barata no ganó. Para el producto, esto apunta a un **chequeo documental previo** (experiencia, documentos, condiciones técnicas y garantías) más que a un simple resumen.
- [HIPÓTESIS] Con una mediana de 5 días y uno de cada tres procesos con 3 días o menos, el valor de una alerta depende de su **inmediatez** (ver la dependencia técnica en la sección 5).

### Gaps
- No encontré estudios de CCE ni académicos de 2024–2026 con **causales de rechazo cuantificadas** en mínima cuantía, ni estadísticas oficiales de procesos desiertos.
- No encontré **tarifas públicas de consultores por propuesta ni de éxito** (% del contrato). Las búsquedas solo devolvieron cursos y plataformas.
- No hay medición independiente de las **horas por semana** que dedica una mipyme a buscar y leer pliegos.

---

## 3. Disposición a pagar (DAP) y competencia: comparación de alternativas con precios públicos

### Takeaway
La DAP está probada por al menos 13 ofertas pagas con precios publicados. Algunas declaran bases de clientes grandes: **LicitaYa "4.150+ clientes"** y **Fromus "150+ pymes"**, ambas autodeclaradas. El mercado está segmentado en tres niveles: (a) alertas baratas por 15.900 a 60.800 COP/mes, varias con resumen IA y una con WhatsApp; (b) "¿califico?" con IA contra el RUP por 50.000 a 199.000 COP/mes o **46.000 a 50.000 COP por pliego**; (c) suites para equipos por 690.000 a 1.890.000 COP/mes. La propuesta del fundador (alertas + "¿cumplo?" + WhatsApp + mipyme regional) **ya existe en partes**: Leadcitaciones vende WhatsApp + IA a 25.000, LicitIA tiene un plan para personas naturales a 29.900 con evaluaciones de elegibilidad, y Optima opera desde Pasto. Lo que no encontré es una oferta con foco en mínima cuantía del sur ni con acompañamiento local en Neiva.

### Cited Findings

#### Tabla comparativa (precios en COP; todas las páginas sin fecha visible, acc. 2026-10-01)

| # | Alternativa (operador) | Cliente objetivo | Oferta | Precio público | Fortalezas | Limitaciones | Fuente |
|---|---|---|---|---|---|---|---|
| 1 | **SECOP II, notificaciones** (CCE) | Todo proveedor registrado | Correo cuando se crea un proceso con UNSPSC de interés, más invitaciones y resúmenes | **Gratis** | Oficial, inmediata al crear el proceso | Solo filtra por UNSPSC; no resume ni evalúa requisitos (ver sección 4) | [CCE FAQ](https://www.colombiacompra.gov.co/archivos/pregunta-frecuente/como-activo-notificaciones-al-correo) |
| 2 | **Leadcitaciones.info** (Dysruptia LLC) | Mipymes | Alertas ilimitadas por **correo y WhatsApp**, "resumen IA completo por proceso", puntaje de compatibilidad, Excel; revisa SECOP II cada 3 h; cubre "todas las modalidades competitivas excepto contratación directa" | Gratis (3 palabras clave, 5 alertas/semana); **PRO 25.000/mes**; 22.500/mes trimestral; −25 % anual | Precio piso con WhatsApp + IA | Pago solo con tarjeta (Stripe); operador LLC | [precios](https://www.leadcitaciones.info/precios) |
| 3 | **LicitIA** (licitia.com.co) | Desde personas naturales hasta agencias | Alertas SECOP I, II y PAA por correo y **Telegram**, evaluaciones de elegibilidad con RUP, propuestas con IA, simulador AIU | **Starter 15.900**; **Especialista 29.900** ("profesionales independientes y personas naturales": 5 evaluaciones y 3 propuestas al mes); Empresarial 59.900; Agencia 159.900; Corporativo 299.000 | El precio más bajo con RUP; 7 días gratis; "no se renuevan solos" | Sin WhatsApp; sin número de clientes | [licitia.com.co](https://licitia.com.co/) |
| 4 | **LicitaYa!** | Pymes | Alertas, entre 3 y 25 análisis IA al mes, 2 a 5 perfiles RUP; "analiza tu RUP y lo compara con los requisitos" | **49.999 / 66.999 / 90.999 / 129.999 al mes** | Declara **"4.150+ clientes"**; 3 días gratis | WhatsApp solo como contacto | [licitaya.co](https://www.licitaya.co/) |
| 5 | **ContratoRadar** (AMAUCO S.A.S., NIT 901.119.725-2, Cartagena) | Mipymes | Alertas por correo por sector (UNSPSC), geografía y valor, a partir de datos abiertos | **49.000 por 30 días**, sin renovación automática | Simple | Sin IA, sin WhatsApp, sin RUP | [contratoradar.com](https://contratoradar.com/) |
| 6 | **Optima** (Pasto, Nariño) | Mipymes | Alertas por correo **cada 2 h de 6 a. m. a 10 p. m.**, análisis competitivo, calendario de cierres | **Desde 129.000/mes**; 7 días gratis | **Competidor del sur del país** | Sin análisis de pliego ni RUP visibles | [contratosoptima.com](https://contratosoptima.com/) |
| 7 | **El País Licita** (respaldado por el diario El País, Cali) | Empresas del suroccidente | Alertas por categoría, monto y palabra clave con resúmenes IA de requisitos; Pro con "Asistente GPT para análisis conversacional de pliegos" | **Alertas 60.800/mes + IVA** (anual); **42.560 para afiliados de la Cámara de Comercio de Cali**; **Pro 160.000** (112.000 afiliados); 1 mes gratis | Canal de medio de comunicación + **alianza con cámara de comercio** | Foco en Cali | [elpaislicita.com](https://elpaislicita.com/) |
| 8 | **Fromus** | Pymes en Bogotá, Medellín, Cali, Cúcuta y Bucaramanga | Filtro por perfil, análisis financiero y de habilitantes, documentos con vencimientos, inteligencia competitiva, propuesta autollenada ~85 % (APU/AIU), ~15 análisis al mes | **199.000/mes + IVA** (1 empresa, 5 usuarios); 3 días gratis | Declara **"150+ pymes"** | Solo correo | [fromus.tech](https://www.fromus.tech/) |
| 9 | **Licitarus** | Contratistas medianos y equipos | Análisis IA del pliego: "si calificas, qué te falta", riesgos con citas, oferta económica con histórico y formatos CCE | Gratis (búsqueda + 3 análisis); **3 análisis por 150.000 (50.000 c/u)**, 10 por 480.000, 25 por 1.150.000; **Pro 690.000/mes** (30 análisis, 5 usuarios; 5.900.000/año) | **Precio por pliego publicado** | Caro para microempresas; sin WhatsApp | [licitarus.com](https://www.licitarus.com/) |
| 10 | **Yiki AI** | Empresas | Agentes que preparan requisitos, documentos, cronograma y riesgos; habilitantes contra el perfil | **USD 99 / 499 / 1.499 al mes**, cobrados en COP | Cita un costo de ~USD 0,03 por análisis | Precio alto | [yikiai.com](https://yikiai.com/) |
| 11 | **Licitum** | Empresas | Mide el cumplimiento habilitante (financiero, experiencia, UNSPSC, RUP) y genera anexos | **1.890.000/mes** según un resumen del buscador; **no verificado** porque el sitio devolvió 403 | — | — | [licitum.co](https://licitum.co/) |
| 12 | Licitaciones.info · Colombia Licita | — | Ya documentados en el escaneo previo | 240.000 a 2.000.000 por periodo · desde 25.000 | — | — | escaneo previo |
| 13 | Analista de licitaciones en nómina | Empresas medianas | Persona dedicada | ~2,0 M/mes (Indeed) o 2,2 a 4,0 M (Computrabajo) | Criterio humano | Costo fijo alto; casi no hay demanda en Neiva | escaneo previo; [elempleo](https://www.elempleo.com/co/ofertas-empleo/trabajo-auxiliar-de-licitaciones-neiva) |

Otros actores encontrados sin precio verificado: secopAI ([secopai.lat](https://secopai.lat/), la página no mostró contenido), highteck ([highteck.com.co](https://highteck.com.co/software-licitaciones-secop-colombia/)), Coaxios ([guía](https://coaxios.com/guias/secop-ii-como-participar.html)), secopcolombia.co ([sitio](https://www.secopcolombia.co/)), CSCOP SAS ([Facebook](https://www.facebook.com/cscop/)). **buscasecop.com no resuelve DNS** (acc. 2026-10-01).

#### Señales separadas
- *Demanda (no prueba pago):* 34.920 oferentes activos y 10.287 frecuentes (sección 1); en ~60 % de las adjudicaciones de mínima cuantía no gana el más barato (sección 2).
- *DAP (prueba pago o intención de cobro):* 13 precios públicos; clientes autodeclarados (LicitaYa "4.150+", Fromus "150+"; ninguno verificable); el descuento para afiliados a la cámara de comercio que ofrece El País Licita; cursos pagos a 150.000–618.800; un cargo asalariado de licitaciones.

### Inferences
- [ESTIMACIÓN] Si fuera cierto que LicitaYa tiene 4.150 clientes, equivaldrían al **~12 % de los 34.920 oferentes nacionales** y al ~40 % de los 10.287 frecuentes. Eso sugiere un mercado con penetración y competencia altas. No es verificable: es una cifra de marketing.
- [HIPÓTESIS] El precio de referencia ya se partió en dos: **alertas ≤ 30.000/mes** (Leadcitaciones, LicitIA, Colombia Licita) y **análisis por pliego ≈ 46.000–50.000** (Licitarus). Un entrante solo puede posicionarse en precio por pliego **por debajo de 50.000** o con un servicio "hecho por ti" que incluya revisión humana.
- [HIPÓTESIS] Ninguna oferta revisada se presenta como especializada en **mínima cuantía**, donde no se exige el RUP (sección 5). La mayoría vende el cruce "RUP contra pliego", que en ese 69 % de los procesos no aplica tal cual.

### Gaps
- No hay métricas verificables de clientes, ingresos ni churn de ningún competidor.
- No pude leer Licitum (403) ni secopAI (sin contenido). Colombia Licita y Licitaciones.info no se re-verificaron porque ya estaban en el escaneo previo.
- No encontré reseñas independientes (Google Maps, Trustpilot o foros) sobre la calidad de los análisis IA de los competidores.

---

## 4. Sustitutos gratuitos: notificaciones de SECOP II, Tienda Virtual, cámaras de comercio y gremios

### Takeaway
El sustituto gratuito principal (las notificaciones por UNSPSC de SECOP II) **llega al crearse el proceso**, es decir, antes que cualquier alerta construida sobre datos abiertos, que tienen 1 a 2 días de rezago. Lo que no hace es resumir ni evaluar requisitos. La Tienda Virtual tiene catálogos mipyme hasta el tope de mínima cuantía, que pueden sacar compras del circuito de mínima cuantía. No encontré boletines gratuitos de procesos de la Cámara de Comercio del Huila ni de gremios.

### Cited Findings
- [HECHO] SECOP II permite que el proveedor configure "notificaciones de oportunidades de negocio por medio de códigos UNSPSC", que avisan sobre "la creación de Procesos relativo a las áreas de interés". Los Términos y Condiciones (v01, 30-sep-2021) califican el envío automático de correos de alerta como "una funcionalidad complementaria" que "no exime del deber de diligencia" de revisar la cuenta. — [CCE FAQ notificaciones](https://www.colombiacompra.gov.co/archivos/pregunta-frecuente/como-activo-notificaciones-al-correo) (act. 25-sep-2024) y [T&C SECOP II, CCE-GTI-IDI-05](https://www.colombiacompra.gov.co/wp-content/uploads/2024/10/cce-gti-idi-05_terminos_y_condiciones_de_uso_del_sistema_electronico_de_contratacion_publica_-_secop_ii_19-11-2021.pdf) (acc. 2026-10-01). *Prueba:* el filtrado por UNSPSC es gratis y oficial. *No prueba:* su calidad percibida, porque los foros de community.secop.gov.co requieren sesión.
- [HECHO] Rezago de los datos abiertos: el dataset de procesos (p6dx-8zbt) tenía el 2026-10-01 como fecha máxima de publicación el **2026-09-29**, y ese día solo con 844 filas, frente a 3.000–4.400 en un día hábil normal. Los campos de fecha **no tienen hora**. — [p6dx-8zbt](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt), consulta `max(fecha_de_publicacion_del)` y conteo diario desde el 2026-09-20 (acc. 2026-10-01). *Prueba:* una alerta basada solo en la API pública llega con 1 a 2 días de retraso, en procesos de mínima cuantía cuya ventana mediana es de 5 días.
- [HECHO] La propia CCE vende la debilidad del sistema actual: SECOP II promedió **12.239 fallas operativas en 2024**, según El Tiempo, que cita a CCE. — [El Tiempo, 17-mar-2025](https://www.eltiempo.com/datos/habra-nuevo-secop-y-empezara-en-diciembre-los-claroscuros-de-uno-de-los-contratos-mas-importantes-del-ano-3435569) (acc. 2026-10-01). El plan oficial del "Nuevo SECOP" promete "filtros de búsqueda mejores", "alertas en tiempo real" y "búsqueda avanzada con IA" — [CCE, Nuevo SECOP](https://operaciones.colombiacompra.gov.co/ciudadanos/nuevo-secop) (act. 13-feb-2025). *Prueba:* el Estado planea cubrir parte del valor de las alertas. *No prueba:* que lo haya hecho (ver sección 5).
- [HECHO] **Tienda Virtual del Estado Colombiano:** el Decreto 1860 ordenó crear catálogos de instrumentos de agregación de demanda (IAD) **con mipymes y grandes almacenes** para compras hasta la mínima cuantía — [Decreto 1860 de 2021, art. 2.2.1.2.1.5.4](https://www.cancilleria.gov.co/sites/default/files/Normograma/docs/pdf/decreto_1860_2021.pdf). Ya existe un "Catálogo de Materiales de Construcción y Ferretería derivado del IAD MIPYMES" — [CCE](https://www.colombiacompra.gov.co/archivos/portfolio-item/catalogo-de-materiales-de-construccion-y-ferreteria-derivado-del-iad-mipymes) (sin fecha visible · acc. 2026-10-01). *Prueba:* una parte de las compras de mínima cuantía puede hacerse por catálogo, sin proceso abierto. *No prueba:* cuánto volumen se desvía.
- [HECHO] **Cámara de Comercio del Huila:** su página de RUP ofrece inscripción, renovación, actualización y cancelación virtuales. **No menciona boletines ni alertas de oportunidades.** — [cchuila.org, RUP](https://www.cchuila.org/servicios-registrales/registro-unico-de-proponentes/) (acc. 2026-10-01). La Gobernación del Huila impulsa "Compras Públicas Locales", con ruedas de negocios para productores agropecuarios y el PAE (Ley 2046 de 2020) — [huila.gov.co](https://www.huila.gov.co/publicaciones/16768/compras-publicas-locales-una-gran-oportunidad-para-los-pequenos-productores-del-huila/) (sin fecha visible · acc. 2026-10-01). Ese segmento es distinto: productores, no contratistas de SECOP.
- [HECHO] CCE ofrece formación virtual gratuita ("24/7: SECOP 2 para proveedores") — [formacionvirtual.colombiacompra.gov.co](https://formacionvirtual.colombiacompra.gov.co/mod/page/view.php?id=2292) (acc. 2026-10-01).

### Inferences
- [HIPÓTESIS] Para la **alerta pura**, el sustituto gratuito es más rápido que un MVP sobre datos abiertos. Un entrante competiría en **filtrado fino** (municipio, cuantía, entidad), **entrega por WhatsApp** y **análisis**, no en velocidad, salvo que consulte el portal transaccional (ver los riesgos de esa vía en la sección 5).
- [HIPÓTESIS] Con ~10 procesos competitivos por día hábil en todo el Huila, un contratista local de un solo sector podría revisar SECOP II a mano. Eso reduce el valor de "alertas regionales" como producto independiente.

### Gaps
- No verifiqué en una cuenta real si SECOP II permite filtrar notificaciones por **cuantía o municipio** (requiere registrarse, lo cual estaba prohibido en esta investigación).
- No encontré boletines gratuitos de ACOPI, CCI ni otros gremios para el Huila.

---

## 5. Regulación y dependencias: Ley 2069/2020, Decreto 1860/2021, reformas 2025–2026, nuevo SECOP, datos abiertos, Ley 1581 y Ley de Garantías

### Takeaway
La regulación **favorece** a la mipyme local. Hasta **US$125.000 (511,7 M COP en 2026)** la convocatoria debe limitarse a mipymes si lo piden 2 de ellas, y se puede limitar a las **domiciliadas en el departamento o municipio**. Hay requisitos diferenciales y hasta un 0,25 % de puntaje adicional. Pero **en mínima cuantía no se exige RUP**, así que el chequeo "contra el RUP" solo aplica al ~31 % competitivo restante. Las dependencias principales son tres: (1) los datos abiertos sí se pueden reutilizar comercialmente (CC BY-SA 4.0, con cita obligatoria), pero se actualizan a diario y con rezago; (2) **el portal SECOP II bloquea consultas masivas automatizadas**; (3) el "nuevo SECOP" está en duda: el concurso de 2025 figura **cancelado** y CCE contrató soporte y evolución de SECOP II hasta el 15-dic-2026. La Ley 1581 no protege los correos corporativos de personas jurídicas, pero sí los datos de las personas naturales.

### Cited Findings

#### Mipymes (Ley 2069 de 2020 y Decreto 1860 de 2021)
- [HECHO] **Convocatorias limitadas:** las entidades "deben limitar la convocatoria … a las Mipyme colombianas con mínimo un (1) año de existencia" cuando el valor sea "menor a … US$125.000" y se reciban "solicitudes de por lo menos dos (2) Mipyme", como mínimo 1 día hábil antes de la apertura. En mínima cuantía, las solicitudes se presentan durante el término de observaciones. — [Decreto 1860 de 2021, arts. 2.2.1.2.4.2.2 y 2.2.1.2.1.5.2](https://www.cancilleria.gov.co/sites/default/files/Normograma/docs/pdf/decreto_1860_2021.pdf) (pub. 24-dic-2021 · acc. 2026-10-01).
- [HECHO] **Limitación territorial:** se pueden "realizar convocatorias limitadas a Mipyme colombianas que tengan domicilio en los departamentos o municipios en donde se va a ejecutar el contrato". El domicilio se acredita con el registro mercantil, el certificado de existencia o el RUP, expedidos con no más de 60 días de antigüedad. — mismo decreto, arts. 2.2.1.2.4.2.3 y 2.2.1.2.4.2.4.
- [HECHO] **Criterios diferenciales y puntaje:** los pliegos "deberán incorporar requisitos habilitantes diferenciales" para mipymes en tiempo de experiencia, número de contratos, índices financieros, índices organizacionales o garantía de seriedad. Además, "con excepción de … subasta inversa y de mínima cuantía", pueden dar un puntaje adicional que "en ningún caso … podrá superar el cero punto veinticinco por ciento (0.25%)". — mismo decreto, art. 2.2.1.2.4.2.18.
- [HECHO] **Umbral 2026:** US$125.000 = **511.708.497 COP**. — [Beltrán Pardo Abogados, 4-feb-2026](https://www.beltranpardo.com/noticias-juridicas/atencion-umbral-para-limitar-procesos-mipymes-en-2026), que cita a MinCIT, y [CCE, Atención mipymes](https://www.colombiacompra.gov.co/archivos/27419) (act. 24-mar-2026) (acc. 2026-10-01). *Prueba:* **todos** los procesos de mínima cuantía (tope de 175 M) y la mayoría de los de SA menor cuantía pueden limitarse a mipymes locales.
- [HECHO] **RUP no exigible en mínima cuantía:** el art. 6 de la Ley 1150 exceptúa del RUP, entre otros, la contratación directa, los servicios de salud, la **mínima cuantía** y la enajenación de bienes. — [Ley 1150 de 2007, compilación Cancillería](https://cancilleria.gov.co/normograma/compilacion/docs/ley_1150_2007.htm) (acc. 2026-10-01). *Prueba:* en el 69 % de los procesos competitivos el chequeo debe hacerse contra **documentos y experiencia acreditada**, no contra los indicadores del RUP.

#### Reformas 2025–2026
- [HECHO] Un proyecto radicado en el Senado (agosto de 2026, en la Comisión Séptima según la nota) busca modificar el art. 25 de la Ley 80. Exigiría que, antes de un contrato interadministrativo, se demuestre que el contratista puede ejecutar el objeto directamente, y crearía un registro público de entidades habilitadas a cargo de CCE. **La nota no menciona cambios a la mínima cuantía, a las mipymes ni al SECOP.** — [Infobae, 6-ago-2026](https://www.infobae.com/colombia/2026/08/06/la-contratacion-publica-podria-cambiar-dentro-de-muy-poco-en-colombia-desde-el-congreso-dicen-que-hay-que-acabar-con-los-contrataderos/) (acc. 2026-10-01). La autoría que reporta el resumen ("Claudia Margarita Zuleta") **no está verificada** y no encontré número de proyecto. *No prueba:* que el proyecto avance.
- [HECHO] Existe una ponencia para primer debate del **PL 270 de 2025 Cámara** sobre contratación pública (noviembre de 2025) — [camara.gov.co (PDF)](https://www.camara.gov.co/wp-content/uploads/2025/11/proyectos-ley/publicaciones/proyecto-29944/PONENCIA-PRIMER-DEBATE-DEFINITIVA-PL-270-DE-2025-CAMARA-Contratacion-publica-26102025-1.pdf). **No lo leí**, solo apareció en el buscador. Portafolio reporta una reforma que incluiría a organizaciones comunales como contratistas — [Portafolio](https://www.portafolio.co/economia/gobierno/reforma-a-la-contratacion-publica-en-colombia-encenderia-alertas-al-incluir-a-organizaciones-comunales-como-contratistas-del-estado-630783) (fecha no verificada; no leído).

#### Plataforma SECOP: estabilidad y nuevo SECOP
- [HECHO] El plan oficial preveía lanzar el nuevo SECOP en diciembre de 2025 (contratación directa) y en 2026 los demás procesos (licitación, concursos, acuerdos marco), "sin migración masiva de datos" — [CCE, Nuevo SECOP](https://operaciones.colombiacompra.gov.co/ciudadanos/nuevo-secop) (act. 13-feb-2025) y [El Tiempo, 17-mar-2025](https://www.eltiempo.com/datos/habra-nuevo-secop-y-empezara-en-diciembre-los-claroscuros-de-uno-de-los-contratos-mas-importantes-del-ano-3435569).
- [HECHO] En SECOP II, el concurso **CCE-CM-001-2025** ("diseño, desarrollo e implementación de una nueva plataforma de compras públicas", publicado el 2025-03-08) figura como **"Cancelado"**, sin adjudicar. Además, CCE firmó el **CCE-432-2025** con SIMPLIFAE PORTUGAL S.A. por 7.490 M COP para "soporte y mantenimiento correctivo y … evolutivo de la plataforma … SECOP II" (firmado el 2025-12-11, vence el **2026-12-15**) y el **CCE-427-2025** con COMCEL por 10.663 M COP de nube para SECOP II (vence el 2026-07-31; estado "Modificado"). — [p6dx-8zbt](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt) y [jbjy-vk9h](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Contratos-Electr-nicos/jbjy-vk9h) (acc. 2026-10-01). *Prueba:* SECOP II sigue siendo la plataforma operativa al menos hasta finales de 2026. *No prueba:* qué pasará en 2027, ni si el nuevo SECOP se contrató por otra vía.
- [HECHO] Hubo mantenimiento programado de SECOP II del 28-may al 1-jun-2026 (el servicio volvió el 31-may), y CCE aclaró que eso no constituye una "indisponibilidad certificable". — [CCE, comunicado del 3-jun-2026](https://www.colombiacompra.gov.co/archivos/28448) (acc. 2026-10-01).

#### Datos abiertos y uso del portal
- [HECHO] Los cuatro datasets usados tienen licencia **Creative Commons Attribution-ShareAlike 4.0**, atribución a la ANCP-CCE y actualización "Diaria" (metadatos de la API `/api/views/{id}.json`, acc. 2026-10-01). Los T&C de SECOP II dicen que los datos abiertos se pueden usar "de forma libre y sin restricciones, para hacer aplicaciones por parte de terceros", incluida la "redistribución, compilación, extracción…". Exigen citar "Fuente: PORTAL DE DATOS ABIERTOS - SECOPII" con la fecha de la última actualización y prohíben "desnaturalizar el sentido de los datos". — [T&C SECOP II (PDF)](https://www.colombiacompra.gov.co/wp-content/uploads/2024/10/cce-gti-idi-05_terminos_y_condiciones_de_uso_del_sistema_electronico_de_contratacion_publica_-_secop_ii_19-11-2021.pdf) (v01, 30-sep-2021 · acc. 2026-10-01). *Prueba:* un SaaS sobre datos abiertos es legal. *No prueba:* cómo se aplica el "ShareAlike" a datos derivados; conviene publicar los datasets derivados bajo CC BY-SA (**[HIPÓTESIS]**, sin revisión jurídica).
- [HECHO] Los mismos T&C advierten que "en los casos que se detecte un comportamiento anormal y de uso masivo de solicitudes, búsquedas, descargas … automáticamente se bloquea el acceso". También declaran que la propiedad intelectual "sobre la información, infogramas e imágenes contenidas en la SECOP II" es del Estado y que está "prohibido" su uso "con cualquier tipo de finalidad, en especial comercial" sin autorización. — mismo PDF. *Prueba:* **descargar pliegos o consultar el portal transaccional de forma masiva es un riesgo operativo y legal**. Los documentos de los procesos (pliegos e invitaciones) **no están en la API**, que solo trae metadatos y la URL del proceso.

#### Datos personales (Ley 1581 de 2012)
- [HECHO] La SIC concluye que los "datos corporativos de una persona jurídica tales como correo institucional, celular corporativo, dirección de contacto … escapan de la órbita de protección de la Ley Estatutaria 1581 de 2012". Los datos de personas naturales, incluidos comerciantes y representantes legales en su calidad personal, sí están protegidos. — [SIC, concepto 23-571469, 1-mar-2024](https://sedeelectronica.sic.gov.co/publicaciones/boletin-juridico/concepto/ambito-de-aplicacion-de-la-ley-1581-de-2012-en-datos-corporativos) (acc. 2026-10-01). La SIC también ha dicho que los datos personales inscritos en las cámaras de comercio están protegidos por la Ley 1581 — [SIC, Boletín jurídico de junio de 2017](https://www.sic.gov.co/boletin-juridico-junio-2017/los-datos-personales-inscritos-en-las-camaras-de-comercio-se-encuentran-protegidos-por-la-ley-1581-de-2012-y-sus-disposiciones-reglamentarias) (acc. 2026-10-01).
- [HECHO] El dataset qmzu-gj57 publica teléfono, correo y nombre del representante legal, también de **personas naturales** (ejemplo: una persona natural de La Cruz, Nariño, con su Gmail y su celular). — [qmzu-gj57](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Proveedores-Registrados/qmzu-gj57) (acc. 2026-10-01).

#### Ley de Garantías (Ley 996 de 2005) y calendario
- [HECHO] En el ciclo 2026, la restricción a la contratación directa rigió desde el **31-ene-2026** hasta el 31-may-2026, o hasta el **21-jun-2026** si había segunda vuelta. La de convenios interadministrativos de entidades territoriales rigió desde el **8-nov-2025**. Las modalidades competitivas (licitación, concurso, selección abreviada y mínima cuantía) siguieron permitidas. — resumen del buscador sobre [CCE, "El 8 de noviembre inicia la Ley de Garantías"](https://www.colombiacompra.gov.co/archivos/23847), [Infobae, 8-oct-2025](https://www.infobae.com/colombia/2025/10/08/restricciones-en-contratacion-estatal-entraran-en-vigor-antes-de-los-comicios-presidenciales-pero-habra-excepciones/) y [abceconomia, 30-ene-2026](https://abceconomia.co/2026/01/30/ley-de-garantias-2026-inicia-veda-a-contratacion-directa/) (acc. 2026-10-01). No abrí el texto de CCE.
- [HECHO] **Efecto observado** en los datos (procesos por mes según fecha de publicación; competitivos = 7 modalidades):

| Mes | Competitivos (nacional) | Contratación directa (nacional) | Competitivos Huila |
|---|---|---|---|
| 2025-01 | 2.316 | 126.352 | 79 |
| 2025-02 | 5.587 | 127.166 | 150 |
| 2025-03 | 7.977 | 74.795 | 210 |
| 2025-04 | 7.982 | 45.546 | 225 |
| 2025-05 | 9.163 | 39.993 | 266 |
| 2025-06 | 7.852 | 35.570 | 197 |
| 2025-07 | 9.494 | 56.022 | 244 |
| 2025-08 | 7.998 | 50.918 | 200 |
| 2025-09 | 9.338 | 62.595 | 239 |
| 2025-10 | 11.028 | 53.528 | 306 |
| 2025-11 | 10.708 | 50.094 | 304 |
| 2025-12 | 7.818 | 23.954 | 235 |
| 2026-01 | 2.471 | **409.006** | 84 |
| 2026-02 | 7.915 | **2.655** | 315 |
| 2026-03 | 9.599 | **1.368** | 293 |
| 2026-04 | 5.509 | **825** | 153 |
| 2026-05 | 9.417 | **1.639** | 284 |
| 2026-06 | 8.907 | 10.275 | 249 |
| 2026-07 | 7.870 | 79.501 | 234 |
| 2026-08 | 6.249 | 79.076 | 191 |
| 2026-09* | 5.053 | 49.189 | 161 |

  *Septiembre de 2026 está incompleto por el rezago del dataset. — [p6dx-8zbt](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt), `date_trunc_ym(fecha_de_publicacion_del)` (acc. 2026-10-01). *Prueba:* la veda casi eliminó la contratación directa entre febrero y mayo de 2026, después de una avalancha en enero, mientras los procesos competitivos siguieron en 8.000–9.600 al mes. **Enero es un mes muerto** para los procesos competitivos (~2.300–2.500) y el pico es **octubre–noviembre**.
- [HECHO] Precedente territorial: en las elecciones de 2023, la restricción de convenios interadministrativos para autoridades territoriales empezó el **29-jun-2023** — [Asuntos Legales](https://www.asuntoslegales.com.co/actualidad/ley-de-garantias-restricciones-en-contratacion-publica-por-las-elecciones-territoriales-a-partir-del-29-de-junio-3646712) e [Infobae, 29-jun-2023](https://www.infobae.com/colombia/2023/06/29/ley-de-garantias-rige-desde-el-29-de-junio-que-prohibiciones-tienen-las-autoridades-territoriales/) (acc. 2026-10-01). Según un resumen del buscador, el Consejo de Estado (17-oct-2025) habría anulado la extensión de esa restricción a los "contratos" interadministrativos. **No lo verifiqué.**

### Inferences
- [HIPÓTESIS] Hay una funcionalidad poco explotada: avisar a tiempo y **generar la "solicitud de limitación a Mipyme" con domicilio local** (se necesitan 2 solicitudes dentro del término de observaciones). Para una mipyme del Huila esto puede cambiar quiénes compiten. No encontré ningún competidor que la anuncie.
- [HIPÓTESIS] En 2027 (elecciones territoriales de octubre de 2027, fecha exacta no verificada) **no** aplica la veda general a la contratación directa, solo la de convenios interadministrativos territoriales desde unos 4 meses antes. El efecto sobre los procesos competitivos sería menor que en 2026.
- [HIPÓTESIS] Arquitectura recomendada por las dependencias: usar datos abiertos para el histórico y el descubrimiento, notificaciones de SECOP II reenviadas por el propio cliente o consultas puntuales al portal para lo urgente, y que el **cliente suba el PDF** del pliego (o descargarlo bajo demanda, uno por solicitud) para el análisis. Así se evita el raspado masivo.
- [HIPÓTESIS] Para prospección: escribir al correo corporativo de personas jurídicas queda fuera de la Ley 1581, según la SIC. Usar el correo o celular de **personas naturales** del dataset para marketing requeriría autorización previa, así que conviene excluirlas de la prospección en frío. Esto deja fuera del contacto directo a ~1/3 de los oferentes locales.

### Gaps
- No pude leer el texto completo del Decreto 1860 en Función Pública (503); usé la copia del normograma de Cancillería. Tampoco verifiqué si hubo modificaciones posteriores (2023–2026) a los arts. 2.2.1.2.4.2.x.
- No leí el PL 270/2025 ni confirmé el número y la autoría del proyecto del Senado de agosto de 2026.
- No encontré el estado oficial del nuevo SECOP a octubre de 2026 (ni comunicado de relanzamiento ni nuevo contrato).
- No verifiqué si la Ley 2300 de 2023 restringe el contacto comercial B2B por WhatsApp; parece orientada a consumidores y cobranza.
- No hay límites de tasa publicados para la API Socrata de datos.gov.co; en las pruebas, las consultas agregadas sobre 47 M de filas tardaron hasta 2 a 3 minutos y una falló por tiempo de espera.

---

## 6. Segmento desatendido y ventaja concreta de un nuevo entrante

### Takeaway
La evidencia **apoya parcialmente** que existe un hueco regional. En el sur hay muy poca competencia por proceso (mediana de 1 oferente en Caquetá y Putumayo, 40–46 % de procesos con un solo oferente en Huila y Tolima), la norma permite cerrar convocatorias a mipymes locales y casi todos los competidores están en Bogotá, Medellín, Cali, Cartagena o Pasto, con foco en el RUP. Pero **casi todos los componentes de la ventaja ya los vende alguien**: WhatsApp e IA (Leadcitaciones, 25.000), plan para personas naturales (LicitIA, 29.900), análisis por pliego (Licitarus, 50.000) y un competidor del sur (Optima). La única ventaja diferencial plausible es un **servicio local "hecho contigo" para mínima cuantía**. Es una **hipótesis**.

### Cited Findings
- [HECHO] Baja competencia en el sur: mediana de oferentes por proceso de 2 en Huila y Tolima y de 1 en Caquetá y Putumayo; los procesos con un solo oferente son el 40 % (Huila), 46 % (Tolima), 67 % (Caquetá) y 66 % (Putumayo). — sección 1, [wi7w-2nvm](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOPII-Ofertas-Por-Proceso/wi7w-2nvm) (acc. 2026-10-01).
- [HECHO] Los oferentes de fuera son muchos: de 5.285 oferentes a entidades del sur, **988 tienen domicilio en Bogotá**, frente a 673 en el Huila. — sección 1, [qmzu-gj57](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Proveedores-Registrados/qmzu-gj57) (acc. 2026-10-01). *Prueba:* hay espacio para que las mipymes locales usen la limitación territorial. *No prueba:* que la soliciten ni que la conozcan.
- [HECHO] La limitación territorial a mipymes domiciliadas existe (Decreto 1860, art. 2.2.1.2.4.2.3) y en mínima cuantía no se exige RUP (Ley 1150, art. 6) — ver sección 5.
- [HECHO] Los competidores ya cubren: WhatsApp + IA a 25.000 ([Leadcitaciones](https://www.leadcitaciones.info/precios)); un plan para personas naturales a 29.900 ([LicitIA](https://licitia.com.co/)); análisis por pliego a 46.000–50.000 ([Licitarus](https://www.licitarus.com/)); un competidor con sede en Pasto ([Optima](https://contratosoptima.com/)); y alianza con cámara de comercio ([El País Licita](https://elpaislicita.com/)). Las ciudades que declara Fromus no incluyen el sur ([Fromus](https://www.fromus.tech/)) (acc. 2026-10-01).

### Inferences
- [HIPÓTESIS] Posibles ventajas concretas, en orden de defendibilidad:
  1. **"¿Cumplo?" para mínima cuantía sin RUP:** checklist automático contra la invitación (experiencia certificada, documentos, condiciones técnicas, garantías, capacidad financiera si aplica), con **revisión humana** del fundador en Neiva para los primeros clientes.
  2. **Solicitud de limitación a mipyme local** a tiempo, con plantilla y recordatorio, y coordinación de las 2 solicitudes necesarias.
  3. **Cobertura de régimen especial con ofertas** (ESE hospitales, empresas de servicios públicos y universidades del sur: 801 procesos en 2025). Falta verificar si los competidores la cubren.
  4. Precio por pliego **más bajo que Licitarus** (por ejemplo, 15.000–30.000 COP) para el oferente ocasional, que es el 48 % del mercado.
  5. Entrega por WhatsApp y en español llano. **No es diferencial**, porque ya existe.
- [HIPÓTESIS] La ventaja del fundador (vive en Neiva y es ingeniero de datos) es **de distribución y confianza local**, no tecnológica. Con 20 h/semana y sin contactos, esa ventaja empieza en cero.

### Gaps
- No verifiqué si LicitIA, LicitaYa o Leadcitaciones ya filtran por municipio y procesan bien las invitaciones de mínima cuantía sin RUP, ni si cubren el régimen especial; eso requería registrarse en sus pruebas gratis.
- No hay evidencia directa (entrevistas o encuestas) de que las mipymes del Huila conozcan o usen la limitación territorial. Se puede medir en SECOP con los avisos de "proceso limitado a Mipyme", algo que no consulté.

---

## 7. Tamaño del mercado bottom-up (nacional y Huila/sur), con escenarios

### Takeaway
A nivel nacional, el gasto potencial en suscripciones va de ~**1.200 millones COP/año** (escenario bajo) a ~**18.500 millones COP/año** (alto), con ~6.200 millones en el base (≈ USD 1,85 M). El mercado del Huila es diminuto: de **37 a 504 millones COP/año** (base de 168 M). **Para llegar a 1,67 M COP/mes, el fundador necesitaría ~34 clientes a 49.900 COP**: el ~12 % de los oferentes frecuentes del Huila, el ~5 % de los del sur o el 0,3 % de los nacionales. Conclusión: la venta tiene que ser **nacional y digital**, con el sur solo como punta de lanza.

### Cited Findings
- [HECHO] Insumos: oferentes nacionales con 4 o más ofertas, **10.287**; con 12 o más, **4.042** (sección 1). Sur (domiciliados en los 4 departamentos): 4 o más, **658**; 12 o más, **258**. Huila (domiciliados, ofertas a cualquier entidad): 4 o más, **280**; 12 o más, **124**. — [wi7w-2nvm](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOPII-Ofertas-Por-Proceso/wi7w-2nvm) + [qmzu-gj57](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Proveedores-Registrados/qmzu-gj57) (acc. 2026-10-01).
- [HECHO] Precios de referencia: bajo 25.000 COP/mes ([Leadcitaciones](https://www.leadcitaciones.info/precios)); medio ~49.000–50.000 ([LicitaYa](https://www.licitaya.co/), [ContratoRadar](https://contratoradar.com/)); alto ~150.000–199.000 ([Fromus](https://www.fromus.tech/); 3 análisis de [Licitarus](https://www.licitarus.com/) por 150.000) (acc. 2026-10-01).

### Inferences
- [ESTIMACIÓN] Escenarios anuales (gasto potencial si **todos** los del segmento pagaran; no es ingreso alcanzable):

| Escenario | Supuesto | Nacional | Sur (4 deptos.) | Huila |
|---|---|---|---|---|
| **Bajo** | Solo quienes ofertan ≥12 veces/año, a 25.000/mes | 4.042 × 25.000 × 12 = **1.213 M COP** (≈ USD 0,36 M) | 258 × 25.000 × 12 = **77 M** | 124 × 25.000 × 12 = **37 M** |
| **Base** | Quienes ofertan ≥4 veces/año, a 50.000/mes | 10.287 × 50.000 × 12 = **6.172 M COP** (≈ USD 1,85 M) | 658 × 50.000 × 12 = **395 M** | 280 × 50.000 × 12 = **168 M** |
| **Alto** | Quienes ofertan ≥4 veces/año, a 150.000/mes (gasto tipo Fromus o Licitarus) | 10.287 × 150.000 × 12 = **18.517 M COP** (≈ USD 5,5 M) | **1.184 M** | **504 M** |

- [ESTIMACIÓN] Escenario complementario por pliego, para los ocasionales: el 48 % de los oferentes presenta 1 oferta al año. Si un 5 % de las 279.274 ofertas anuales comprara un análisis a 30.000 COP, serían ~**419 M COP/año** a nivel nacional. El 5 % es un supuesto, no un dato.
- [ESTIMACIÓN] Meta del fundador: 1,67 M COP/mes brutos equivalen a **34 clientes a 49.900**, **67 a 25.000**, **17 a 99.000** o ~**56 análisis al mes a 30.000**. Sobre los oferentes frecuentes (4 o más ofertas), esos 34 clientes son el **12,1 % del Huila (280)**, el **5,2 % del sur (658)** y el **0,33 % nacional (10.287)**.
- [HIPÓTESIS] Una penetración del 12 % en el Huila es poco realista para un solo fundador sin contactos y con competidores a 15.900–25.000. Una del 0,3 % nacional parece plausible solo con un diferencial claro y adquisición digital (SEO y contenidos).

### Gaps
- No conozco la tasa de conversión, el CAC ni el churn de los competidores, así que los escenarios son de **gasto potencial**, no de ingresos proyectados.
- No segmenté por sector (UNSPSC) ni por capacidad de pago.

---

## 8. Monetización y operación: oferta, precio a probar, costos, margen, trabajo manual, recurrencia, churn y estacionalidad

### Takeaway
El costo variable es bajo. Un análisis de pliego con LLM cuesta del orden de **USD 0,03–0,25 (≈100–800 COP)**, cobrar una suscripción de 50.000 cuesta ~5 % en pasarela y WhatsApp de utilidad cuesta céntimos. El margen bruto sería del **85–95 %** si no hay trabajo humano. El riesgo está en la **recurrencia**: la mitad de los oferentes oferta una vez al año, enero casi no tiene procesos y el cliente que gana un contrato puede dejar de buscar mientras lo ejecuta. Recomiendo probar un **modelo híbrido**: análisis por pliego (15.000–30.000) + plan mensual de alertas y análisis ilimitados con revisión humana (~49.900–79.900), con pago anticipado trimestral para amortiguar la estacionalidad. Es una **hipótesis**.

### Cited Findings
- [HECHO] Precios de la API de Claude (referencia de la API de Anthropic en caché al 2026-09-25): **Claude Haiku 4.5: USD 1 por millón de tokens de entrada y USD 5 de salida**; **Claude Sonnet 5.5: USD 2 / USD 10**; la API de lotes (Batch) cuesta un 50 % menos. — [Anthropic, precios](https://www.anthropic.com/pricing) (figuras tomadas de la documentación de la API, no de un fetch de esa página · acc. 2026-10-01).
- [HECHO, fuente con sesgo] Un competidor cita un costo de "$0.03 USD" por análisis como ejemplo de transparencia — [Yiki AI](https://yikiai.com/) (acc. 2026-10-01).
- [HECHO] Costo efectivo de cobrar una suscripción de 50.000 COP: **≈ 2.410–3.207 COP (4,8–6,4 %)**, con Wompi, PayU, Mercado Pago, ePayco o Bold. Mercado Pago y ePayco tienen producto de suscripciones. — `contexto_colombia.md` §5, con fuentes [Wompi](https://wompi.com/es/co/planes-tarifas/), [Mercado Pago](https://www.mercadopago.com.co/herramientas-para-vender/suscripciones) y [ePayco](https://epayco.com/tarifas/) (acc. 2026-10-01).
- [HECHO, secundaria y no verificada en la tarifa oficial de Meta] WhatsApp Business Platform en Colombia: mensaje de utilidad ≈ USD 0,0008 (≈2,7 COP) y de marketing ≈ USD 0,0125 (≈41,8 COP) — `contexto_colombia.md` §6, con fuente [Simla](https://www.simla.com/blog/precios-whatsapp-business-api) (pub. 11-feb-2026).
- [HECHO] Estacionalidad: los procesos competitivos caen a ~2.300–2.500 en **enero**, frente a 8.000–11.000 en los demás meses, con pico en **octubre y noviembre**. La veda de 2026 redujo la contratación directa, no los procesos competitivos (tabla en la sección 5). — [p6dx-8zbt](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt) (acc. 2026-10-01).
- [HECHO] Recurrencia: el 48,3 % de los oferentes presentó 1 sola oferta en 2025 y el 54 % de los oferentes del sur ofertó a un solo proceso del sur (sección 1). Varios competidores evitan la renovación automática ("No se renuevan solos" en [LicitIA](https://licitia.com.co/); "30 días, sin renovación automática" en [ContratoRadar](https://contratoradar.com/)) o venden paquetes de análisis válidos 12 meses ([Licitarus](https://www.licitarus.com/)) (acc. 2026-10-01). *Prueba:* el mercado ya se adaptó a una demanda intermitente.

### Inferences
- [ESTIMACIÓN] **Costo de LLM por pliego** (supuestos propios: texto extraído del PDF a ~500–700 tokens por página; salida de 1.500–3.000 tokens):
  - Invitación de mínima cuantía de ~30 páginas (≈20.000 tokens): Haiku 4.5 ≈ USD 0,02 + 0,01 = **≈ USD 0,03 (≈100 COP)**; Sonnet 5.5 ≈ **USD 0,06 (≈200 COP)**.
  - Pliego de licitación de ~150 páginas (≈100.000 tokens): Haiku ≈ **USD 0,12 (≈400 COP)**; Sonnet ≈ **USD 0,23 (≈770 COP)**.
  - Con la API de lotes, la mitad. Si se envía el PDF como imagen y texto, el costo sube varias veces. Sigue siendo <1 % de un precio de 30.000 COP.
- [ESTIMACIÓN] **Economía unitaria por cliente al mes, plan de 49.900:**
  - Pasarela ≈ 2.400–3.200; LLM para 10 análisis ≈ 1.000–8.000; WhatsApp de utilidad (60 mensajes) ≈ 160.
  - Hosting compartido, supuesto de USD 10–20/mes para toda la base: ≈ 1.000–2.000 por cliente con 34 clientes. **[HIPÓTESIS]**: no busqué precios de hosting.
  - Resultado: **margen bruto ≈ 75–90 %** sin trabajo humano. Si el fundador revisa cada análisis (~20–30 min), el cuello de botella son las horas: con 20 h/semana caben unos 40–60 análisis revisados al mes.
- [HIPÓTESIS] **Oferta a probar:** (a) **pliego suelto a 19.900–29.900** ("¿cumplo o no?" + lista de documentos faltantes en 24 h, con revisión humana); (b) **plan Sur a 49.900/mes** (alertas por WhatsApp filtradas por municipio y sector + 5 análisis + aviso para solicitar limitación a mipyme); (c) trimestral anticipado con descuento. La **tarifa de éxito** (por ejemplo, % del contrato ganado) es difícil de cobrar y de verificar, y no encontré precedentes públicos. No la recomiendo para empezar.
- [HIPÓTESIS] **Churn:** previsible en diciembre–enero y en clientes que ganan un contrato y quedan copados ejecutándolo. Mitigantes: plan anual o trimestral, pausa en lugar de cancelación, y recordar el valor con estadísticas ("te avisamos de N procesos y ganaste X").

### Gaps
- No medí con la API (`count_tokens`) el tamaño real en tokens de invitaciones del Huila. Las páginas por pliego son supuestas.
- No hay datos públicos de churn de SaaS de licitaciones en Colombia.
- No verifiqué el precio oficial de WhatsApp (tarifa de Meta) ni el costo de hosting.

---

## 9. Primeros 10 clientes por canales digitales: dónde se congregan los contratistas y ciclo de venta

### Takeaway
La ventaja de canal más concreta es que **los datos abiertos identifican a cada oferente**, con nombre, NIT y procesos a los que ofertó, incluidos los ~280 frecuentes del Huila. Eso permite contactar a personas jurídicas con un mensaje hiperpersonalizado ("ofertaste en X y perdiste contra Y") sin chocar con la Ley 1581 si se usa el correo corporativo. Los demás canales (grupos de Facebook, YouTube, cámaras de comercio) **no se pudieron cuantificar**. El ciclo de venta de los competidores es autoservicio con prueba gratis de 3 a 30 días, lo que sugiere decisiones rápidas y de bajo ticket.

### Cited Findings
- [HECHO] Hay listas de prospectos verificables: los 756 proveedores domiciliados en el Huila que ofertaron en 2025 (280 con 4 o más ofertas; 237 personas naturales) son identificables por NIT en [qmzu-gj57](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Proveedores-Registrados/qmzu-gj57) y [wi7w-2nvm](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOPII-Ofertas-Por-Proceso/wi7w-2nvm) (acc. 2026-10-01).
- [HECHO] Límite legal: los correos corporativos de personas jurídicas están fuera de la Ley 1581; los datos de personas naturales están protegidos — [SIC, 1-mar-2024](https://sedeelectronica.sic.gov.co/publicaciones/boletin-juridico/concepto/ambito-de-aplicacion-de-la-ley-1581-de-2012-en-datos-corporativos) (acc. 2026-10-01).
- [HECHO] Precedente de canal institucional: El País Licita ofrece una **tarifa para afiliados de la Cámara de Comercio de Cali** (42.560 frente a 60.800 COP/mes) — [elpaislicita.com](https://elpaislicita.com/) (acc. 2026-10-01). *Prueba:* una cámara de comercio regional puede ser un canal. *No prueba:* que la Cámara de Comercio del Huila acepte una alianza parecida.
- [HECHO] Comunidades encontradas, sin cifras verificadas:
  - la página de Facebook "CSCOP SAS SECOP II & Contratación Pública", que tendría 3.716 seguidores según el buscador (no verificado): [facebook.com/cscop](https://www.facebook.com/cscop/);
  - el canal de YouTube "SECOP II Y LICITACIONES EXITOSAS" (suscriptores no visibles): [YouTube](https://www.youtube.com/channel/UCmB3TNsC-aEYWjarmCbTiEg);
  - tutoriales de YouTube sobre cómo presentar ofertas: [video 1](https://www.youtube.com/watch?v=mf8_0r1Z9As) y [video 2](https://m.youtube.com/watch?v=bEyb_M45sO8).
  
  Los grupos de Facebook requieren iniciar sesión para ver los miembros, y no se intentó (acc. 2026-10-01).
- [HECHO] Los competidores hacen **SEO de contenidos y páginas por entidad o municipio**: Colombia Licita tiene páginas por municipio y entidad del Huila, como "Pitalito, Huila; CAMARA DE COMERCIO DE NEIVA" ([colombialicita.com](https://colombialicita.com/?municipioA=84&entidadA=4588)), y varios tienen blogs sobre UNSPSC o SECOP ([Leadcitaciones](https://www.leadcitaciones.info/blog/codigos-unspsc), [Fromus](https://www.fromus.tech/blog/codigos-unspsc-como-elegir-correctos), [Optima](https://contratosoptima.com/blog/que-es-el-codigo-unspsc)) (acc. 2026-10-01). *Prueba:* el canal orgánico está disputado.
- [HECHO] Duración de las pruebas gratis de los competidores: 3 días (LicitaYa, Fromus), 7 días (LicitIA, Optima, Yiki) y 1 mes (El País Licita) — fuentes de la sección 3. *Prueba:* el modelo dominante es autoservicio con ciclo corto.

### Inferences
- [HIPÓTESIS] **Ruta a los primeros 10 clientes:**
  1. Construir una lista de las ~263 personas jurídicas y personas naturales del Huila con 4 o más ofertas en 2025, de las cuales solo se contactaría en frío a las **personas jurídicas**.
  2. Enviarles por correo corporativo un **informe gratuito personalizado**: "en 2025 ofertaste N veces; en X procesos la oferta más baja no fue habilitada; estos son los 5 procesos abiertos hoy de tu código UNSPSC en el Huila".
  3. Ofrecer **1 análisis "¿cumplo?" gratis** a cambio de una llamada de 15 minutos.
  4. Convertir con un **pliego suelto a 19.900–29.900** o con el plan Sur.
  5. En paralelo, abrir un **canal de WhatsApp gratuito con los procesos abiertos del Huila**, con opt-in, para captar a las personas naturales sin usar sus datos del dataset.
  6. Buscar a la Cámara de Comercio del Huila o a la Gobernación (rueda de compras públicas) como aliados de contenido.
- [HIPÓTESIS] El ciclo de venta debería ser de **días**: el ticket es bajo y la urgencia la impone el cierre del proceso. El cuello de botella es la **confianza** (enviar sus documentos a un desconocido) y la credibilidad frente a marcas con miles de clientes declarados.
- [HIPÓTESIS] La tasa de respuesta del correo en frío B2B a mipymes regionales es desconocida. Si fuera del 2–5 % sobre ~200 personas jurídicas, saldrían 4–10 conversaciones, apenas suficiente para los 10 primeros clientes en el Huila. Habría que ampliar a Tolima, Caquetá y Putumayo (658 frecuentes) desde el día uno.

### Gaps
- No hay cifras verificables de miembros de grupos de Facebook o LinkedIn sobre SECOP, ni de suscriptores de canales de YouTube.
- No encontré programas de 2026 de la Cámara de Comercio del Huila, ACOPI o la CCI dirigidos a proponentes de SECOP.
- No hay datos de conversión ni de CAC de canales B2B a mipymes en Colombia para este nicho.

---

## 10. Evidencia que podría INVALIDAR la idea (y lectura para el go/no-go)

### Takeaway
La evidencia en contra es **fuerte en "alertas"** y **moderada en "análisis de pliego"**: (1) hay ≥13 competidores, con precios piso de 15.900–25.000 que ya incluyen IA o WhatsApp, y uno de ellos declara 4.150+ clientes; (2) el sustituto oficial gratuito avisa antes que la API pública; (3) el mercado regional frecuente es de ~280 (Huila) a 658 (sur) oferentes; (4) la mitad de los oferentes oferta una vez al año, con lo que se espera un churn alto. **No** se sostiene que "las mipymes rara vez ganan": ganan el 81 % de los contratos competitivos y el 83 % del valor en mínima cuantía. La señal a favor más útil es que en ~60 % de las adjudicaciones de mínima cuantía no gana el más barato, lo que indica muchas ofertas no habilitadas. **Lectura preliminar:** no-go como SaaS genérico de alertas regionales; go condicionado solo para un experimento barato (≤4 semanas, ≤500.000 COP) de **análisis "¿cumplo?" por pliego para mínima cuantía**, vendido por adelantado a mipymes del sur.

### Cited Findings
- [HECHO] **Saturación y precios bajos:** LicitIA desde 15.900 con RUP; Leadcitaciones a 25.000 con WhatsApp e IA; Colombia Licita desde 25.000; LicitaYa desde 49.999 ("4.150+ clientes"); un competidor del sur (Optima, Pasto) desde 129.000. — fuentes de la sección 3 (acc. 2026-10-01).
- [HECHO] **Sustituto gratuito más rápido:** SECOP II notifica al crear el proceso, mientras que los datos abiertos tienen 1–2 días de rezago y una ventana mediana de mínima cuantía de 5 días. — [CCE FAQ](https://www.colombiacompra.gov.co/archivos/pregunta-frecuente/como-activo-notificaciones-al-correo) y [p6dx-8zbt](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt) (acc. 2026-10-01).
- [HECHO] **Mercado regional pequeño:** de 25.970 proveedores activos del Huila, solo 756 ofertaron en 2025 y 280 lo hicieron 4 o más veces. — [qmzu-gj57](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Proveedores-Registrados/qmzu-gj57) + [wi7w-2nvm](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOPII-Ofertas-Por-Proceso/wi7w-2nvm) (acc. 2026-10-01).
- [HECHO] **Baja recurrencia:** el 48,3 % de los oferentes nacionales presentó una sola oferta en 2025, y enero tiene una cuarta parte de los procesos de un mes normal. — mismas fuentes (acc. 2026-10-01).
- [HECHO] **El RUP no aplica en mínima cuantía** (Ley 1150, art. 6). El argumento "comparo tu RUP con el pliego" que usan casi todos los competidores no sirve para el 69 % de los procesos competitivos. Esto es a la vez una amenaza a la propuesta original y una oportunidad de diferenciarse. — [Ley 1150, Cancillería](https://cancilleria.gov.co/normograma/compilacion/docs/ley_1150_2007.htm) (acc. 2026-10-01).
- [HECHO] **Riesgo de plataforma:** el portal bloquea las consultas masivas y el futuro del SECOP es incierto, aunque está asegurado hasta el 15-dic-2026. — [T&C SECOP II](https://www.colombiacompra.gov.co/wp-content/uploads/2024/10/cce-gti-idi-05_terminos_y_condiciones_de_uso_del_sistema_electronico_de_contratacion_publica_-_secop_ii_19-11-2021.pdf) y [jbjy-vk9h](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Contratos-Electr-nicos/jbjy-vk9h) (acc. 2026-10-01).
- [HECHO] **No invalida (a favor):** las mipymes ganan el 81 % de los contratos competitivos y el 83 % del valor en mínima cuantía, y las personas naturales ganan el 24 % de los contratos de mínima cuantía — [jbjy-vk9h](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Contratos-Electr-nicos/jbjy-vk9h). En ~58–62 % de las adjudicaciones de mínima cuantía con competencia de precio no ganó la oferta más barata — [wi7w-2nvm](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOPII-Ofertas-Por-Proceso/wi7w-2nvm) (acc. 2026-10-01).

### Inferences
- [HIPÓTESIS] **Criterios sugeridos para el go/no-go final**, a validar sin gastar más de ~500.000 COP:
  - **GO** si en 4 semanas se logran al menos **10 pagos anticipados** (pliego suelto ≥19.900 o plan ≥49.900) de mipymes o personas naturales del sur, **y** al menos 3 de ellas declaran que **no** usan LicitIA, LicitaYa ni Leadcitaciones o que no les resolvieron la mínima cuantía.
  - **NO-GO** si las respuestas indican que ya tienen alertas gratuitas o baratas suficientes, y que el "¿cumplo?" lo resuelven solas porque la invitación de mínima cuantía es corta.
- [HIPÓTESIS] Si se hace, conviene **no construir el motor de alertas primero**. Lo primero es el análisis "¿cumplo?" semimanual (LLM + revisión del fundador), con el PDF subido por el cliente. Las alertas pueden venir después, sobre datos abiertos más reenvíos de las notificaciones de SECOP II.
- [ESTIMACIÓN] Puntajes actualizados (1–5) frente al escaneo previo:
  - Intensidad del problema: **3 → 3,5**, por el indicador de ~60 % de ofertas más baratas no adjudicadas.
  - Evidencia de DAP: **4**, sin cambio.
  - Acceso a canales digitales: **4 → 3**, por el límite de la Ley 1581 para personas naturales y porque el SEO está disputado.
  - Escalabilidad y margen: **4**, sin cambio.
  - Oportunidad competitiva: **1–2 → 1,5**, porque aparecieron más competidores (LicitIA, Licitarus, Optima, El País Licita, ContratoRadar, Yiki AI, Licitum).
  - Encaje con el fundador: **5**, sin cambio.
  - Velocidad para validar y cobrar: **4**, sin cambio.

### Gaps
- Falta evidencia primaria (entrevistas, preventas) de mipymes del Huila. Nada de lo anterior prueba que **este** fundador pueda vender ni a **qué precio** en el sur.
- No hay métricas de retención de competidores que permitan estimar el churn real.
- No verifiqué si los competidores baratos (LicitIA a 15.900, Leadcitaciones a 25.000) tienen la calidad de análisis que dicen tener; si la tuvieran, el espacio para un entrante se reduciría aún más.

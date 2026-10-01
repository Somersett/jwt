# Evidencia preliminar de demanda, gasto y competencia: oportunidades 12 (SECOP), 13 (cobranza), 14 (pedidos propios para restaurantes) y 15 (Saber 11)

Convenciones usadas en estas notas:
- **Fecha de acceso de todas las fuentes: 2026-10-01** (se repite como "acc." en cada hallazgo).
- Cada hallazgo se etiqueta como **[HECHO]** (dato verificable en la fuente), **[ESTIMACIÓN]** (cifra aproximada de la fuente o cálculo propio sobre datos oficiales) o **[HIPÓTESIS]** (inferencia sin dato duro). Para los hallazgos clave también se indica qué prueba y qué NO prueba.
- Las consultas a datos abiertos (SECOP II y RUES en datos.gov.co, API Socrata) las ejecuté directamente el 2026-10-01. Cito la página del dataset y describo el filtro aplicado. Las cifras de las APIs pueden cambiar en futuras actualizaciones del dataset.
- Las fuentes de proveedores (blogs de competidores) tienen sesgo comercial. Las quejas en blogs o foros sirven para descubrir problemas, pero no prueban disposición a pagar (DAP).
- Meta de ingresos del fundador: ~500 USD/mes ≈ ~2 millones COP (con ~4.000 COP/USD; **tasa no verificada en esta investigación**).

---

## Oportunidad 12: alertas SECOP I/II filtradas por UNSPSC, entidad, región y cuantía, con resúmenes de pliegos, para mipymes y contratistas regionales

### Takeaway
El dolor y la DAP existen: hay al menos 6 proveedores pagos con precios públicos entre 25.000 y ~240.000 COP/mes, y un "analista de licitaciones" cuesta entre 2 y 4 millones COP/mes. El problema es que el mercado está saturado y los precios van a la baja: una alternativa ofrece alertas por WhatsApp con resumen IA a 25.000 COP/mes y SECOP II envía gratis notificaciones por código UNSPSC. Además, el 76 % de los contratos de 2025 fueron por contratación directa, donde una alerta sirve de poco. El mercado real lo forman ~22.800 proveedores distintos que ganaron en modalidades competitivas en 2025 (~980 en Huila). La idea solo es viable con un diferencial fuerte, como el análisis de requisitos habilitantes contra el RUP, y aun así compite con LicitaYa, Fromus y LicitarUS, que ya lo ofrecen.

### Cited Findings

#### Dolor, frecuencia y datos de volumen
- [HECHO] En SECOP II se firmaron **1.050.953 contratos** con fecha de firma en 2025 (consulta `count(*)` con `fecha_de_firma` entre 2025-01-01 y 2025-12-31). — [SECOP II – Contratos Electrónicos, datos.gov.co (jbjy-vk9h)](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Contratos-Electr-nicos/jbjy-vk9h) (dataset vivo · acc. 2026-10-01). *Prueba:* el volumen total de contratación en SECOP II. *No prueba:* cuántos son oportunidades abiertas a competencia ni su valor. La suma de `valor_del_contrato` dio ~1.128 billones COP, un valor inverosímil frente a los ~100 billones/año que reportaba CCE en una nota antigua ([CCE](https://www.colombiacompra.gov.co/archivos/9821), fecha no verificada). Probablemente hay valores atípicos o errores de digitación, así que **no se debe usar esa suma**.
- [HECHO] Por modalidad, los contratos firmados en 2025 se reparten así: **Contratación directa 802.211 (76,3 %)**, Régimen especial 155.817 (14,8 %), **Mínima cuantía 49.693**, Contratación directa con ofertas 10.567, **Selección abreviada de menor cuantía 9.564**, Régimen especial con ofertas 8.397, **Subasta inversa 8.194**, **Concurso de méritos abierto 2.574**, **Licitación pública 2.164**, **Licitación pública de obra 1.375**, Acuerdo Marco 174. — [SECOP II – Contratos Electrónicos (jbjy-vk9h)](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Contratos-Electr-nicos/jbjy-vk9h) (consulta agrupada por `modalidad_de_contratacion` · acc. 2026-10-01). *Prueba:* la gran mayoría de los contratos no se compite abiertamente. *No prueba:* el número de procesos publicados (incluidos los desiertos o no adjudicados), que estaría en el dataset de procesos y no se consultó.
- [HECHO] En las 6 modalidades competitivas clásicas (mínima cuantía, SA menor cuantía, subasta inversa, licitación pública, licitación de obra y concurso de méritos abierto) hubo **73.564 contratos en 2025, ganados por 22.849 proveedores distintos** (`count(distinct documento_proveedor)`). — mismo dataset (acc. 2026-10-01). *Prueba:* el tamaño aproximado del universo de empresas que efectivamente ganan licitaciones. *No prueba:* cuántos oferentes participaron y perdieron. El mercado de "buscadores de licitaciones" es mayor que el de ganadores.
- [HECHO] En esas modalidades competitivas, **59.548 contratos (81 %)** fueron firmados con proveedores marcados `es_pyme = Si`, que suman **17.044 proveedores pyme distintos** (los no pyme suman 14.016 contratos y 5.838 proveedores). — mismo dataset (acc. 2026-10-01). *Prueba:* el segmento objetivo (mipymes) domina en número de contratos competitivos. *No prueba:* la participación en valor. Además, el campo `es_pyme` lo autodeclara el proveedor.
- [HECHO] En **Huila**, en 2025 se firmaron 18.342 contratos en SECOP II (todas las modalidades). En modalidades competitivas fueron **2.056 contratos, ganados por 981 proveedores distintos**. — mismo dataset, filtro `departamento='Huila'`, que es el departamento de la entidad contratante (acc. 2026-10-01). *Prueba:* el mercado local inmediato es pequeño (~1.000 empresas). *No prueba:* dónde están domiciliados esos proveedores.
- [HECHO] El dataset de proveedores registrados en SECOP II tiene **1.617.193 registros**. De ellos, 1.615.773 están activos y no son entidades estatales: **218.802 marcados como pyme**, **1.176.758 personas naturales colombianas** (en su mayoría contratistas de prestación de servicios) y **93.015 SAS**. En **Huila** hay **26.055 registros activos**, de los cuales **7.899 no son personas naturales**. — [SECOP II – Proveedores Registrados (qmzu-gj57)](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Proveedores-Registrados/qmzu-gj57) (actualizado 2026-09-28 según el portal · acc. 2026-10-01). *Prueba:* el universo máximo de cuentas de proveedor. *No prueba:* cuántas cuentas están activas comercialmente. El dataset incluye datos de contacto (correo y teléfono), pero usarlos para prospección masiva puede chocar con la Ley 1581 de 2012 de habeas data (**[HIPÓTESIS]** sin revisión jurídica).
- [HECHO] Anomalía de datos: otro dataset con nombre casi idéntico, "Proveedores Registrados -SECOP II" (sqpp-4gyj), devuelve hoy solo **93 filas**, aunque se actualizó el 2026-09-30. — [datos.gov.co sqpp-4gyj](https://www.datos.gov.co/Gastos-Gubernamentales/Proveedores-Registrados-SECOP-II/sqpp-4gyj) (acc. 2026-10-01). No debe usarse para dimensionar el mercado.
- [HECHO] Según CCE, el SECOP procesó "más de 492 mil contratos" durante la vigencia de la Ley de Garantías, con un promedio mensual de 88.000 contratos. — [Colombia Compra Eficiente, comunicado](https://www.colombiacompra.gov.co/archivos/29125) (pub. 2026-07-28 · acc. 2026-10-01). El comunicado no publica la participación de las mipymes en valor.
- [HIPÓTESIS, fuente con sesgo] Un blog de un proveedor afirma que SECOP II "fue diseñado para abogados y funcionarios", es lento, envía notificaciones genéricas y obliga a revisar manualmente. Pone como ejemplo una constructora que dedica ~3 h/semana y encuentra procesos ya cerrados. — [Fuera de Código, blog](https://fueradecodigo.com/buscar-procesos-en-secop-2/) (fecha no visible · acc. 2026-10-01). *Prueba:* que existe un relato de dolor. *No prueba:* frecuencia ni DAP. El "caso real" no es verificable.
- [HECHO] Un blog de LicitaMatch describe caídas y mantenimientos de SECOP II, habitualmente entre las 10:00 p. m. y las 6:00 a. m. o los fines de semana, sin cifras de frecuencia. — [LicitaMatch](https://licitamatch.co/blog/indisponibilidad-secop-ii/) (pub. 2026-05-21 · acc. 2026-10-01).

#### Cómo lo resuelven hoy y cuánto pagan (precios públicos)
- [HECHO] **Licitaciones.info**: 240.000 a 2.000.000 COP según el periodo (de 30 días a 28 meses, pago anticipado), con prueba gratis de 30 días. Monitorea SECOP I/II y otros 800 portales, y un analista humano clasifica cada proceso. — [Fromus, comparativo 2026](https://www.fromus.tech/blog/mejores-plataformas-licitaciones-colombia-2026) (pub. 2026-06-03, autor competidor) y [Términos de Licitaciones.info](https://licitaciones.info/terminos-condiciones) (acc. 2026-10-01).
- [HECHO] **LicitaYa!**: Basic **49.999**, Pro **66.999**, Business **90.999** y Enterprise **129.999 COP/mes**. Incluye entre 3 y 25 análisis IA de procesos, perfiles con RUP y prueba de 3 días. Dice monitorear "370.000+ procesos". — [licitaya.co](https://www.licitaya.co/) (acc. 2026-10-01).
- [HECHO] **Leadcitaciones.info**: plan gratis (3 palabras clave, 5 alertas/semana, solo correo) y plan **PRO a 25.000 COP/mes** (22.500 en trimestral, 25 % de descuento anual) con palabras clave ilimitadas, "alertas ilimitadas por email y WhatsApp", "resumen IA completo por proceso", puntaje de compatibilidad y exportación a Excel. — [leadcitaciones.info/precios](https://www.leadcitaciones.info/precios) (acc. 2026-10-01). *Prueba:* casi exactamente la propuesta de valor 12 ya se vende a ~6 USD/mes. Es la evidencia más fuerte en contra de la idea.
- [HECHO] **Fromus**: **199.000 COP/mes**, con verificación de RUP, análisis de habilitantes jurídicos y financieros, análisis competitivo y generación de propuesta económica. Prueba de 3 días. — [Fromus](https://www.fromus.tech/blog/mejores-plataformas-licitaciones-colombia-2026) (pub. 2026-06-03 · acc. 2026-10-01).
- [HECHO] **LicitarUS**: freemium con 20 alertas/mes gratis y **150.000 COP por análisis de pliego**. **Alicia**: resúmenes IA de pliegos, precio no publicado. — misma fuente (vendor) (acc. 2026-10-01).
- [HECHO] **Colombia Licita**: "Acceso TOTAL desde $25.000", búsqueda en SECOP I y II y actualizaciones automáticas de búsquedas guardadas. — [colombialicita.com](https://colombialicita.com/) (acc. 2026-10-01).
- [HECHO] Otros actores sin precio público o no verificados: Licitaciones Colombia (licitacionescolombia.co, 17 países de LatAm, filtros UNSPSC, prueba gratis) — [alertas](https://www.licitacionescolombia.co/alertas); LicitaIA — [licitaia.co](https://www.licitaia.co/) (HTTP 429, no se pudo leer); Yiki AI — [yikiai.com](https://yikiai.com/); Licitia — [licitia.com.co](https://licitia.com.co/donde-buscar-licitaciones-en-colombia.html); El País Licita — [elpaislicita.com](https://elpaislicita.com/); LicitaMatch — [licitamatch.co](https://licitamatch.co/blog/indisponibilidad-secop-ii/). buscasecop.com aparece en los buscadores, pero su dominio no resolvió al intentar abrirlo (acc. 2026-10-01). *Prueba:* hay al menos 10 a 12 competidores activos en 2026, varios con IA.
- [HECHO] Costo de hacerlo manualmente: el salario promedio de un "Analista de licitaciones" es **2.021.461 COP/mes** (Indeed). En Computrabajo hay ofertas de 2,2 a 4,0 millones COP/mes, concentradas en Bogotá y Medellín. — [Indeed Colombia](https://co.indeed.com/career/analista-de-licitaciones/salaries); [Computrabajo](https://co.computrabajo.com/trabajo-de-analista-de-licitaciones) (acc. 2026-10-01). *Prueba:* hay empresas que pagan por esta función. *No prueba:* que una microempresa regional contrate a alguien. Lo normal es que el gerente lo haga él mismo (**[HIPÓTESIS]**).

#### Herramienta gratuita del gobierno (invalidante parcial)
- [HECHO] **SECOP II envía gratis notificaciones automáticas de "Oportunidades de negocio"** cuando se crea un proceso con un código UNSPSC que coincide con las áreas de interés del proveedor. La frecuencia es configurable y también hay notificaciones de invitaciones directas, de contratos, de PAA y correos resumen. — [Colombia Compra Eficiente, FAQ "¿Cómo activo notificaciones al correo?"](https://www.colombiacompra.gov.co/archivos/pregunta-frecuente/como-activo-notificaciones-al-correo) (última actualización 2024-09-25 · acc. 2026-10-01). *Prueba:* el filtrado por UNSPSC ya existe gratis. *No prueba:* que funcione bien. No filtra por cuantía ni región con la misma granularidad y no resume pliegos (**[HIPÓTESIS]**, no verificado).
- Contradicción: el blog de Fromus afirma que SECOP II "no filtra por su perfil, no avisa, no analiza pliegos" — [Fromus](https://www.fromus.tech/blog/mejores-plataformas-licitaciones-colombia-2026). La FAQ oficial de CCE lo contradice en cuanto a avisos por UNSPSC. Se debe preferir la fuente oficial y tratar la de Fromus como sesgada.
- [HECHO] Los datos de SECOP I/II son abiertos y gratuitos vía API Socrata en datos.gov.co (verificado al hacer las consultas de esta investigación). Esto favorece al fundador, pero también a cualquier competidor.

#### Regulación
- No encontré una restricción regulatoria para revender o alertar sobre datos públicos de SECOP. Sí aplica la Ley 1581 de 2012 si se usan datos personales de contacto de los proveedores para marketing (**[HIPÓTESIS]**; no se revisó la norma en esta sesión).

#### Señales de demanda vs. señales de DAP (separadas)
- *Demanda (no prueba pago):* quejas en blogs de proveedores sobre la usabilidad de SECOP II ([Fuera de Código](https://fueradecodigo.com/buscar-procesos-en-secop-2/)); 22.849 ganadores distintos en modalidades competitivas en 2025 (dataset jbjy-vk9h).
- *DAP (prueba pago o intención de cobro):* precios públicos de Licitaciones.info, LicitaYa, Fromus, LicitarUS, Leadcitaciones y Colombia Licita; existencia de un cargo asalariado ("analista de licitaciones"). No encontré número de clientes pagos de ningún competidor (gap).

### Inferences
- [ESTIMACIÓN] Para llegar a ~2 millones COP/mes se necesitan unos **40 clientes a 50.000 COP/mes** o **80 a 25.000 COP/mes**. Sobre un universo nacional de ~22.800 ganadores competitivos, eso es un 0,2 % a 0,35 %, lo que parece alcanzable en teoría. En la práctica, el precio de referencia ya cayó a 25.000 COP/mes (Leadcitaciones) y hay versiones gratis (SECOP II, freemium de LicitarUS y de Leadcitaciones).
- [HIPÓTESIS] El nicho regional (Huila, Tolima, Caquetá) es demasiado pequeño por sí solo (~981 ganadores en Huila en 2025). Habría que vender a nivel nacional con canal digital.
- [HIPÓTESIS] El diferencial defendible no son las alertas, que ya son un commodity, sino: (a) comparar automáticamente los requisitos habilitantes del pliego con el RUP del cliente, algo que LicitaYa y Fromus ya anuncian; (b) inteligencia de competidores, precios históricos adjudicados por entidad y tasas de oferentes; (c) foco en un sector vertical (por ejemplo, obra menor o suministros de mínima cuantía).
- **Puntajes preliminares (1–5):**
  - Intensidad/frecuencia del problema: **3**. La necesidad es diaria para quien licita, pero el 76 % de los contratos son directos y no requieren búsqueda.
  - Evidencia de gasto/DAP: **4**. Hay ≥6 competidores con precios públicos y un cargo asalariado dedicado.
  - Acceso a clientes por canales digitales: **4**. Los proveedores son identificables en datos abiertos y buscan en Google ("licitaciones Colombia"), aunque con cuidado de habeas data.
  - Escalabilidad y margen: **4**. Software sobre API abierta con costo marginal bajo; el costo de LLM por resumen es acotado.
  - Oportunidad competitiva: **1–2**. El mercado está saturado (≥10 actores), el precio piso es de 25.000 COP/mes con IA y WhatsApp, y SECOP ofrece alertas UNSPSC gratis.
  - Encaje con el fundador: **5**. No requiere licencias, es ingeniería de datos pura y se trabaja 100 % remoto.
  - Velocidad para validar y cobrar: **4**. Se puede construir un MVP en 2 a 4 semanas y es plausible cobrar desde el primer mes, aunque a precio bajo.

### Gaps
- No obtuve la participación oficial de las mipymes en el **valor** de la contratación 2025–2026 (CCE no la publica en los comunicados revisados) ni el número de **procesos publicados** en 2025 (dataset de procesos de SECOP II, no consultado por tiempo).
- No encontré el número de clientes ni los ingresos de ningún competidor (Licitaciones.info, LicitaYa, etc.), así que no hay prueba de la tracción real.
- No verifiqué si las notificaciones de SECOP II permiten filtrar por cuantía o región, ni su calidad percibida en foros oficiales (community.secop.gov.co requiere sesión).
- No verifiqué la normativa de "convocatorias limitadas a mipymes" (Ley 2069 de 2020 / Decreto 1860 de 2021), que podría reforzar la demanda en mínima cuantía.
- No hay datos de búsquedas (Google Trends) porque no se pudo acceder en esta sesión.

---

## Oportunidad 13: cobranza automatizada (recordatorios por WhatsApp o correo con links de pago y conciliación) para pymes que venden a crédito o con cuotas recurrentes

### Takeaway
El dolor es real y recurrente, sobre todo en colegios privados: el 91,7 % dice que la morosidad afecta su operación mensual y la proporción con cartera mayor al 10 % se duplicó (6 % → 12,3 %). También hay DAP por software de cobro. Sin embargo, la competencia es fuerte y varios ya incluyen la función: Mattilda (fintech con ~50M USD levantados, específica para colegios), Siigo y Alegra (recordatorios de cobro dentro de software contable que la pyme ya paga), Treinta, Treli (más de 1.500 clientes), Controla.club (gimnasios, desde 99.000 COP/mes) y Cobros360. La Ley 2300 de 2023 aplica también a la pyme que cobra directamente y limita horarios, frecuencia y canales.

### Cited Findings

#### Dolor, frecuencia y consecuencias
- [HECHO] Informe Mattilda 2026 sobre colegios privados en Colombia: el **91,7 %** de los colegios reconoce que la morosidad afecta su funcionamiento mensual. Los colegios con cartera mayor al 10 % al cierre del año pasaron del **6 % al 12,3 %**. El 58,4 % no tiene colchón para 6 meses y el 70,8 % carece de reservas para el próximo año. La ocupación promedio bajó del 68 % al 62 %. — [Semana](https://www.semana.com/economia/macroeconomia/articulo/mas-estudiantes-pero-menos-respaldo-financiero-el-panorama-de-los-colegios-privados-en-colombia/202634/) (informe publicado 2026-07-03 · acc. 2026-10-01). *Prueba:* el dolor de cartera en colegios. *No prueba:* tamaño de la muestra (no se reporta) ni DAP por una herramienta nueva. La fuente es un actor interesado (Mattilda vende la solución).
- [HECHO] MinEducación reconoce las dificultades de los colegios privados, especialmente los que atienden estratos 1–3, y la caída de la natalidad: **453.901 nacimientos en 2024**, −12,0 % frente a 2023 y −31,3 % frente a 2015. — [MinEducación, comunicado](https://www.mineducacion.gov.co/portal/salaprensa/Comunicados/427158:Que-esta-pasando-con-los-colegios-privados-en-Colombia) (pub. 2026-01-22 · acc. 2026-10-01). *Prueba:* el segmento está bajo presión financiera, lo que se traduce en dolor pero también en poca capacidad de pago.
- [HECHO] La Ley 2024 de 2020 (pago en plazos justos) obliga a pagar a las mipymes en máximo **45 días** desde el segundo año de vigencia. Las mipymes pueden reclamar intereses moratorios desde el día 46. — [Ley 2024 de 2020, Secretaría del Senado](http://www.secretariasenado.gov.co/senado/basedoc/ley_2024_2020.html); [ABC Bancolombia](https://blog.bancolombia.com/negocios/ley-de-pago-a-plazos-justos/) (acc. 2026-10-01). *Prueba:* el legislador reconoce que a las mipymes les pagan tarde. *No prueba:* cifras actuales de cartera vencida de las pymes.
- [HECHO] Encuesta de Desempeño Empresarial de Acopi, cuarto trimestre de 2025: el **50,4 %** de las mipymes registró caída en ventas, el 47,3 % en producción y el 53,3 % en inversión. — [El Colombiano](https://www.elcolombiano.com/negocios/mipymes-acopi-colombia-caida-inversion-2025-BM34924371) (acc. 2026-10-01). Es contexto de liquidez, no evidencia directa de morosidad.
- [HECHO] Costo de hacerlo manualmente: el salario promedio de un "auxiliar de cartera" es **1.540.882 COP/mes** (Indeed). Las ofertas de septiembre de 2026 en elempleo van de ~1,75 millones más auxilio de transporte a 2,5 millones COP. — [Indeed](https://co.indeed.com/career/auxiliar-de-cartera/salaries); [elempleo](https://www.elempleo.com/co/ofertas-empleo/trabajo-auxiliar-de-cartera) (acc. 2026-10-01). *Prueba:* hay un costo laboral que se podría reemplazar. *No prueba:* que una microempresa tenga ese cargo.

#### Cuántos clientes potenciales (RUES)
- [HECHO] Personas naturales y jurídicas con matrícula **ACTIVA** renovada en 2025 o 2026, por CIIU principal, a nivel nacional y en la Cámara de Comercio del **Huila**:
  - **9311** (gestión de instalaciones deportivas, que incluye gimnasios): 6.034 nacional, **152** Huila.
  - **8559** (otros tipos de educación n.c.p., es decir, academias): 6.271 nacional, **89** Huila.
  - **6820** (actividades inmobiliarias por retribución, como administración de arriendos): 12.574 nacional, **89** Huila.
  - **8513, 8521, 8522 y 8523** (colegios de básica y media): 633, 352, 219 y 705 a nivel nacional; 12, 4, 1 y 17 en Huila.
  - Fuente: [RUES – Personas Naturales, Jurídicas y ESAL, datos.gov.co (c82u-588k)](https://www.datos.gov.co/resource/c82u-588k.json) (actualizado 2026-09-04 · acc. 2026-10-01).
  - *Prueba:* órdenes de magnitud por vertical. *No prueba:* el número real de colegios privados, porque muchos son ESAL, comunidades religiosas o personas no registradas con esos CIIU. Los conteos de 85xx en RUES **subestiman claramente** el universo de colegios. Tampoco cuenta distribuidoras (CIIU 46xx, no consultado).
- [ESTIMACIÓN] Según el ICFES, ~20 % de los evaluados de Saber 11 pertenecen al sector no oficial (ver oportunidad 15), lo que implica ~98.000 estudiantes de grado 11 en colegios privados en 2025 (cálculo propio: 20 % × 489.880).

#### Cómo lo resuelven hoy y cuánto pagan
- [HECHO] **Mattilda** (fintech mexicana): automatiza cobro, recaudo, conciliación y mensajes transaccionales a los padres, y además ofrece factoring, "ingreso garantizado" y crédito a colegios. Al llegar a Colombia (mayo de 2024) apuntaba a ~400 colegios en 2 años. — [Valora Analitik](https://www.valoraanalitik.com/mattilda-startup-mexicana-en-colombia/) (pub. 2024-05-13 · acc. 2026-10-01). Levantó 50 millones de USD — [El Tiempo](https://www.eltiempo.com/economia/sectores/plataforma-educativa-mattilda-levanta-50-millones-de-dolares-para-consolidarse-como-el-aliado-financiero-de-los-colegios-en-america-latina-3490517) (acc. 2026-10-01). Un resumen de búsqueda le atribuye "más de 500 colegios y ~250.000 familias" y presencia en más de 50 municipios de Colombia (**no verificado en la fuente primaria**; ver [Portafolio](https://www.portafolio.co/emprendimiento/la-startup-mattilda-busca-duplicar-su-presencia-en-colegios-privados-de-la-region-640982)). Precio no publicado. *Prueba:* hay un incumbente bien financiado en la vertical de colegios.
- [HECHO] **Siigo** incluye "Notificación de cobranza por WhatsApp" y "Cartera seguimiento de cobranza" en planes de ~145.993 a ~207.869 COP/mes (plan anual). — [programascontabilidad.com, guía de precios 2026](https://programascontabilidad.com/comparativas-de-software/precios-de-software-contable-colombia-2026/) (acc. 2026-10-01). Hay conflicto de cifras: el blog de Moonflow indica 155.118 COP/mes ([Moonflow](https://www.moonflow.ai/es-co/blog/mejores-software-cobranza-colombia), pub. 2026-06-15) y otro resumen indica 136.869–207.869. El precio exacto no se verificó en siigo.com.
- [HECHO] **Alegra**: facturación electrónica desde 17.900 COP/mes (Emprendedor) hasta 179.900 (Plus) y contabilidad de 74.900 a 319.900 COP/mes. Una reseña indica que envía recordatorios automáticos de pagos pendientes o vencidos. — [Alegra precios](https://www.alegra.com/colombia/precios/); [Medesk, reseña Alegra 2026](https://www.medesk.net/es/blog/alegra-review/) (acc. 2026-10-01).
- [HECHO] **Treinta**: Esencial 39.900 COP/mes y Pro 79.900 COP/mes, con descuentos trimestral y anual. — [treinta.co/planes-y-precios](https://treinta.co/planes-y-precios) (acc. 2026-10-01, vía resultado de búsqueda; la página no se abrió directamente).
- [HECHO] **Treli** (Colombia): suscripciones y cobros recurrentes, recordatorios por WhatsApp y correo, links de pago, para academias, educación, salud, clubes e inmobiliario. Dice tener "más de 1500 clientes atendidos". Precio no publicado. — [treli.co](https://treli.co/) (acc. 2026-10-01).
- [HECHO] **Controla.club** (gimnasios y clubes): WhatsApp Business API más pasarela, desde **99.000 COP/mes**. — [controla.club blog](https://controla.club/blog/como-cobrar-membresias-por-whatsapp-paso-a-paso) (acc. 2026-10-01, vía resultado de búsqueda).
- [HECHO] **Moonflow**: entre 49 y 379 USD/mes, cobranza omnicanal con IA y links de pago PSE, Wompi y ePayco. — [Moonflow](https://www.moonflow.ai/es-co/blog/mejores-software-cobranza-colombia) (pub. 2026-06-15; autor competidor).
- [HECHO] **Cobros360**: cobranza multicanal (WhatsApp, correo, SMS, llamadas IA) con cumplimiento de la Ley 2300 integrado (ventanas horarias y límites de frecuencia). Precio no publicado. — [Cobros360](https://cobros360.com/blog/ley-2300-de-2023-cobranza-etica-colombia) (pub. 2026-04-28 · acc. 2026-10-01).
- [HECHO] **Botiffy** (chatbots de WhatsApp para pymes): 399.000 COP/mes (200 conversaciones) y 690.000 COP/mes (500), más un setup de 599.000 a 1.200.000 COP. — [Botiffy](https://botiffy.com/blog-chatbot-whatsapp-pymes-colombia.html) (acc. 2026-10-01, vía búsqueda).
- [HECHO] Costos de insumos: los links de pago de **Wompi** cuestan **1,5 % + IVA** (Nequi/Bancolombia), **1,99 % + IVA** (tarjetas) y **2,69 % + IVA** (PSE); el plan agregador cuesta 2,65 % + 700 COP + IVA. — [Mentora Colombia](https://mentoracolombia.com/pasarelas-de-pago-colombia-2026-comisiones-wompi-bold-mercadopago/) y [Bytechhub](https://bytechhub.com/blog/pasarelas-de-pago-en-colombia-comparativa-2026/) (acc. 2026-10-01; fuentes secundarias, no wompi.com). Wompi bajó al 1 % la tarifa de pagos con QR — [Cambio](https://cambiocolombia.com/peso-a-peso-paso-a-paso/articulo/2026/9/wompi-amplia-los-pagos-sin-contacto-y-baja-al-uno-por-ciento-la-tarifa-de-los-pagos-con-qr) (pub. 2026-09).
- [HECHO] **WhatsApp Business API** en Colombia: mensaje de utilidad **0,0008 USD**, marketing 0,0125 USD. Según la fuente, desde el **1 de octubre de 2026** también se cobran los mensajes de utilidad dentro de la ventana de 24 h. — [Leadsales](https://leadsales.io/blog/whatsapp-business-api-cuanto-cuesta/) (pub. 2026-08-24 · acc. 2026-10-01; fuente secundaria, no se verificó en developers.facebook.com). *Prueba:* el costo variable del canal es muy bajo.

#### Regulación (restricción relevante)
- [HECHO] **Ley 2300 de 2023 ("Dejen de fregar")**, vigente desde el 10-oct-2023: aplica a las entidades vigiladas por la Superfinanciera **y a todas las personas naturales y jurídicas que adelanten gestiones de cobranza directamente, por terceros o por cesión**. Horario: lunes a viernes de 7:00 a. m. a 7:00 p. m. y sábados de 8:00 a. m. a 3:00 p. m.; nada en domingos ni festivos. No se puede contactar por varios canales en una misma semana ni más de una vez al día. Está prohibido contactar referencias personales. Sancionan la SFC y la SIC. — [Ley 2300 de 2023, Alcaldía de Bogotá (SISJUR)](https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=143903); [Función Pública PDF](https://www.funcionpublica.gov.co/eva/gestornormativo/norma_pdf.php?i=213990) (acc. 2026-10-01). Cobros360 confirma: "La ley aplica a toda gestión de cobranza extrajudicial, sea hecha por la empresa acreedora directamente o por una casa de cobranza" — [Cobros360](https://cobros360.com/blog/ley-2300-de-2023-cobranza-etica-colombia) (pub. 2026-04-28).
- [HIPÓTESIS] Queda en zona gris si un recordatorio **preventivo** (antes del vencimiento) cuenta como "gestión de cobranza". Las fuentes revisadas no lo aclaran. El producto tendría que restringir por diseño el horario, el número de contactos por día y por semana y el canal, y conservar trazabilidad.
- [HIPÓTESIS] Cobrar un "% de lo recuperado" puede asemejarse a una casa de cobranza y aumentar la exposición regulatoria y reputacional. Una suscripción por volumen es más simple.

#### Señales de demanda vs. señales de DAP
- *Demanda:* morosidad en colegios (encuesta Mattilda), estrés de liquidez de las mipymes (Acopi), Ley 2024 de 2020.
- *DAP:* precios públicos de Siigo, Alegra, Treinta, Controla.club, Botiffy y Moonflow; 1.500 clientes declarados por Treli; Mattilda con capital de riesgo y modelo de negocio. **No** encontré precios públicos de Mattilda, Treli ni Cobros360.

### Inferences
- [HIPÓTESIS] La pyme típica que ya paga Siigo o Alegra ya tiene recordatorios de cobro incluidos. Un producto nuevo tendría que ganar en una vertical con flujo recurrente (academias, gimnasios, administradores de arriendos pequeños) donde no se usa software contable completo, o en conciliación automática (match de pagos de Nequi, Bancolombia y PSE con deudores).
- [HIPÓTESIS] Los colegios son el segmento con más dolor, pero también el de mayor fragilidad financiera y con un incumbente especializado (Mattilda), además de ciclos de decisión largos (rector, consejo y contador).
- [ESTIMACIÓN] Para ~2 millones COP/mes harían falta ~20 a 25 clientes a 80.000–100.000 COP/mes (rango de Treinta Pro y Controla.club). Es plausible en número, pero exige venta consultiva e integración de datos del cliente.
- **Puntajes preliminares (1–5):**
  - Intensidad/frecuencia: **4**. El cobro es mensual y la morosidad en colegios está documentada.
  - Evidencia de gasto/DAP: **3**. Hay herramientas pagas, pero la función suele venir incluida en software ya pagado.
  - Acceso digital: **3**. Las verticales están fragmentadas; gimnasios y academias son alcanzables por Instagram y WhatsApp, mientras que los colegios requieren relación.
  - Escalabilidad/margen: **3**. El costo de WhatsApp y la pasarela es bajo, pero cada cliente exige onboarding e integración, más la carga de cumplir la Ley 2300.
  - Oportunidad competitiva: **2**. Mattilda, Siigo, Alegra, Treinta, Treli, Controla.club, Cobros360 y Moonflow.
  - Encaje con el fundador: **4**. Es software puro y no requiere licencia, pero sí manejar dinero de terceros vía pasarela y cumplir la regulación de cobranza.
  - Velocidad para validar y cobrar: **3**. La venta B2B a pymes requiere confianza y acceso a la lista de deudores del cliente.

### Gaps
- No encontré datos oficiales recientes de **cartera vencida de pymes no financieras** en Colombia (ANIF, Supersociedades o DataCrédito). La página de la [Encuesta Mipyme ANIF](https://www.anif.com.co/encuesta-mipyme-de-anif/) apareció en la búsqueda, pero no se extrajo ningún dato.
- No hay precios públicos de Mattilda, Treli ni Cobros360, ni tasas de éxito verificables. El "85 % de recuperación" de Cobros360 es una afirmación comercial sin verificar.
- No hay un conteo oficial vigente de colegios privados. La mejor aproximación son los establecimientos no oficiales con evaluados en Saber 11 de 2022: ~3.487 a nivel nacional y ~75 en Huila (ver oportunidad 15). Esa cifra solo cubre colegios con grado 11. Los datasets del DUE en datos.gov.co no son tabulares.
- No verifiqué directamente las tarifas en wompi.com ni en la página de precios de Meta.

---

## Oportunidad 14: catálogo y pedidos propios por WhatsApp con pago en línea para restaurantes y comidas rápidas con domicilio propio en ciudades intermedias

### Takeaway
El dolor está bien documentado: comisiones de Rappi de ~27–32 % y de DiDi Food de ~22–28 % (más IVA) en un sector que, según Acodrés, pasaría a margen operativo negativo (−9 %) en 2026. Pero la solución propuesta está **muy commoditizada y suele ser gratis**: OlaClick, Treggio, JacaMenu y Ordenalo tienen planes gratuitos, los pagos están entre 19.900 y 79.000 COP/mes, y el catálogo de WhatsApp Business es nativo. Además, **DiDi ofrece "DiDi Tu Negocio"**: pedidos por canal propio (WhatsApp, teléfono o link) con repartidores de DiDi al 9,5 % + IVA. La evidencia invalida la idea como negocio de suscripción para un solo fundador.

### Cited Findings

#### Dolor y datos
- [ESTIMACIÓN] Rappi no publica su comisión. Los reportes de 2026 la ubican en **27–32 %** (rango general de 15–35 %), más **IVA del 19 %** sobre la comisión. Rappi Ads se cobra aparte. — [Menuthere, "What Rappi charges restaurants in Colombia"](https://menuthere.com/delivery-app-commission/rappi-colombia) (revisado en sept. 2026 · acc. 2026-10-01; la fuente es un competidor que vende una alternativa sin comisión). Otros reportan 25–30 % — [Nautilus](https://nautilusrestaurante.co/que-porcentaje-cobra-rappi-a-los-restaurantes/) (2025). *Prueba:* hay un costo alto por pedido en la app. *No prueba:* cuánto del volumen de un restaurante pasa por las apps.
- [ESTIMACIÓN] DiDi Food: los reportes de 2026 hablan de una comisión del **22–28 %**. — [Menuthere DiDi](https://menuthere.com/delivery-app-commission/didi-food-colombia); [Chejefe](https://www.chejefe.com/blog/independencia-de-las-apps/comisiones-didi-food) (acc. 2026-10-01; secundarias).
- [HECHO] Acodrés Bogotá Región proyecta que los costos operativos de los restaurantes pasarán del **87 % al 109 % de los ingresos** en 2026 (margen operativo de +13 % a **−9 %**): alimentos del 35 % al 43 % y nómina del 25 % al 30 %. — [Portafolio](https://www.portafolio.co/negocios/empresas/costos-y-cargas-fiscales-llevarian-a-los-restaurantes-a-perdidas-operativas-en-486952) (pub. 2026-01-24 · acc. 2026-10-01). *Prueba:* hay presión fuerte sobre los márgenes, lo que hace atractivo reducir comisiones. *También indica:* poca capacidad para pagar suscripciones nuevas. Es una proyección gremial, no un dato observado.
- [HECHO] DiDi Food tiene ~**15.000 restaurantes** y 9 millones de usuarios en Colombia, y creció ~30 % en 2026. — [La Nota Económica](https://lanotaeconomica.com.co/movidas-empresarial/cinco-anos-acompanando-la-evolucion-de-la-cultura-gastronomica-de-colombia-didi-food-crece-aproximadamente-30-en-lo-corrido-de-2026/) (sept. 2026 · acc. 2026-10-01).
- [HECHO] Rappi conecta más de **19.000 establecimientos gastronómicos en 60 ciudades** e incluyó por primera vez a "ciudades intermedias" (entre ellas **Neiva**) en sus premios Bigote Dorado 2026. — [Technocio](https://www.technocio.com/rappi-revela-el-nuevo-mapa-gastronomico-de-colombia-regiones-y-ciudades-intermedias-ganan-protagonismo-en-premios-bigote-dorado/); [Prensa Mercosur](https://prensamercosur.org/2026/05/29/rappi-revela-el-nuevo-mapa-gastronomico-de-colombia-regiones-y-ciudades-intermedias-ganan-protagonismo-en-premios-bigote-dorado/) (pub. 2026-05-29 · acc. 2026-10-01).
- [HECHO, no abierto] En los títulos de búsqueda, las páginas de Rappi muestran "Comida a domicilio Neiva en **546** restaurantes" y en otra versión "**497**". — [rappi.com.co/neiva/restaurantes](https://www.rappi.com.co/neiva/restaurantes) (acc. 2026-10-01, solo el título del resultado de búsqueda). Es el orden de magnitud de los restaurantes de Neiva que ya pagan comisión a Rappi.

#### Cuántos clientes potenciales (RUES)
- [HECHO] Matrículas activas renovadas en 2025 o 2026 por CIIU principal, a nivel nacional y en la Cámara de Comercio del **Huila**:
  - **5611** (expendio a la mesa de comidas preparadas): **80.331** nacional, **2.084** Huila.
  - **5613** (cafeterías): 25.282 nacional, 619 Huila.
  - **5619** (otros expendios, que incluye muchas comidas rápidas): 33.474 nacional, 969 Huila.
  - **5612** (autoservicio): 3.250 nacional, 37 Huila.
  - En CIIU 5611 por cámara: Bogotá 17.305, Medellín 6.259, Cali 4.774.
  - Fuente: [RUES, datos.gov.co (c82u-588k)](https://www.datos.gov.co/resource/c82u-588k.json) (actualizado 2026-09-04 · acc. 2026-10-01).
  - *Prueba:* el universo formal es de ~142.000 negocios de comida a nivel nacional (suma de 56xx) y ~3.700 en Huila. *No prueba:* cuántos tienen domicilio propio, ni cuenta establecimientos (una persona jurídica puede tener varias sedes), ni incluye la informalidad.
- [ESTIMACIÓN] Una nota de prensa atribuye a Acodrés ~150.000 restaurantes en Colombia. — [El Colombiano](https://www.elcolombiano.com/negocios/didi-food-medellin-pedidos-comida-restaurantes-2026-LC41079525) (2026 · acc. 2026-10-01; no se verificó en la fuente primaria). Es coherente con el total de 56xx en RUES.

#### Cómo lo resuelven hoy y cuánto pagan (gratuitos y pagos)
- [HECHO] **DiDi Tu Negocio**: "recibir pedidos desde canales directos (Whatsapp y teléfono), asignar repartidores de DiDi"; "Solo se cobra una comisión del 9.5% por pedido (+ IVA). Sin costos fijos ni cargos adicionales"; incluye un enlace único con menú en línea. — [DiDi, página oficial](https://web.didiglobal.com/co/food/restaurantes/didi-tu-negocio/) (acc. 2026-10-01). *Prueba:* el incumbente ya ofrece canal propio más logística. Es un **invalidante fuerte** para una suscripción sin logística.
- [HECHO] **OlaClick**: "100% gratuita para empezar", con POS, menú QR, pedidos por WhatsApp, delivery propio y chatbot IA, sin mensualidad ni comisión. Los planes premium arrancan en ~15 USD/mes. — [OlaClick](https://olaclick.com/es/software-para-restaurantes/) (acc. 2026-10-01). La página /prices/ devolvió 404, así que el precio premium sale del resumen de búsqueda y no está verificado.
- [HECHO] **Treggio**: gratis, "más de 680 restaurantes en Colombia" con menú QR y pedidos por WhatsApp. — [treggio.co](https://treggio.co/menu-digital-para-restaurantes/) (acc. 2026-10-01, vía búsqueda).
- [HECHO] **Ordenalo**: plan gratis permanente (hasta 10 productos) y planes pagos desde **19.900 COP/mes**, sin comisión por pedido, con pedido enviado a WhatsApp. — [ordenaloapp.com](https://ordenaloapp.com/menu-digital-restaurante) (acc. 2026-10-01).
- [HECHO] **JacaMenu**: base gratis y plan "Mesa Directa" a **74.700 COP/mes** con IVA. — [jacamenu.com](https://www.jacamenu.com/) (acc. 2026-10-01, vía búsqueda).
- [HECHO] **Foodi**: Starter a **79.000 COP/mes**, con POS, bot de WhatsApp y pagos vía Nequi, transferencia o contraentrega. — [foodi.restaurant](https://foodi.restaurant/) (acc. 2026-10-01, vía búsqueda).
- [HECHO] **Menuthere**: gratis hasta 50 pedidos/mes; Lite a 9 USD/mes; Pro a 39 USD/mes con pedidos por WhatsApp. — [Menuthere](https://menuthere.com/delivery-app-commission/rappi-colombia) (acc. 2026-10-01).
- [HECHO] Otros catálogos con carrito y pedido por WhatsApp: CatalogoCode, 4Wasap y Pedi.app (pruebas de 7 días). Incluso hay plantillas open source gratuitas (GitHub, con Google Sheets como base de datos). — [CatalogoCode](https://catalogocode.com/); [4Wasap](https://4wasap.com/); [GitHub valentinjurado/catalogo-whatsapp](https://github.com/valentinjurado/catalogo-whatsapp) (acc. 2026-10-01).
- [HECHO] Pago en línea: los links de Wompi cuestan desde 1,5 % + IVA (Nequi/Bancolombia) y el QR un 1 % (ver oportunidad 13 para las fuentes). Es un insumo barato y accesible para cualquier competidor.
- [HIPÓTESIS] El **catálogo nativo de WhatsApp Business** es gratuito, pero no tiene carrito con pago integrado ni resumen automático de pedidos completo, según un proveedor que vende el complemento ([Vercatalogo](https://vercatalogo.com/blog/whatsapp-business-catalogo-online)). No verifiqué en fuentes de Meta el estado de pagos nativos de WhatsApp en Colombia en 2026.

#### Regulación
- No identifiqué restricciones regulatorias específicas para un catálogo con pedidos. Aplica el habeas data a la base de clientes del restaurante (**[HIPÓTESIS]**). Con impuesto al consumo, la facturación electrónica es responsabilidad del restaurante. Acodrés acusó a Rappi de evasión del impoconsumo — [La República](https://www.larepublica.co/empresas/las-cuentas-que-hace-acodres-para-acusar-a-rappi-de-evasion-del-impoconsumo-3540921) (2023).

#### Señales de demanda vs. señales de DAP
- *Demanda:* comisiones altas, proyección de pérdidas de Acodrés, crecimiento del domicilio en ciudades intermedias (Rappi, DiDi).
- *DAP:* existen planes pagos de 19.900 a 79.000 COP/mes (Ordenalo, JacaMenu, Foodi) y de ~15 USD (OlaClick premium), pero **los líderes compiten con planes gratis**. No encontré número de clientes **pagos** de ninguno. El dato de 680 restaurantes de Treggio corresponde a usuarios gratuitos.

### Inferences
- [HIPÓTESIS] El ahorro de comisión solo se materializa si el restaurante logra mover a sus clientes al canal propio. El software no genera esa demanda, y la logística (domiciliarios) es el verdadero cuello de botella, que DiDi Tu Negocio ya resuelve por un 9,5 %.
- [ESTIMACIÓN] Para ~2 millones COP/mes se necesitarían ~40 restaurantes a 50.000 COP/mes compitiendo contra herramientas gratis. Es improbable de lograr y sostener (churn alto esperado, **[HIPÓTESIS]**) con 20 h/semana.
- [HIPÓTESIS] El único ángulo plausible sería de servicio y no de software: gestionar el canal propio (marketing en Instagram más fidelización) para restaurantes de Neiva. Eso choca con la preferencia del fundador por la escalabilidad.
- **Puntajes preliminares (1–5):**
  - Intensidad/frecuencia: **4**. Las comisiones del 22–32 % más IVA golpean cada pedido diario.
  - Evidencia de gasto/DAP: **2**. Hay planes pagos baratos, pero el mercado se ancla en "gratis".
  - Acceso digital: **4**. Los restaurantes son visibles en Instagram, Google Maps y los listados de Rappi.
  - Escalabilidad/margen: **2–3**. El ARPU es bajo y el soporte por cliente alto.
  - Oportunidad competitiva: **1**. Hay ≥8 alternativas gratis o baratas, además de DiDi Tu Negocio con logística.
  - Encaje con el fundador: **4**. Es técnicamente trivial para él.
  - Velocidad para validar y cobrar: **3**. Se puede probar rápido en Neiva, pero cobrar es difícil frente a opciones gratis.

### Gaps
- No verifiqué la presencia de DiDi Food en Neiva ni la penetración de las apps en las ventas de restaurantes de ciudades intermedias.
- No encontré datos de qué porcentaje de restaurantes tiene domicilio propio ni de cuántos pedidos llegan hoy por WhatsApp.
- No hay precio premium verificado de OlaClick (su página de precios dio 404) ni número de clientes pagos de ningún competidor.
- iFood no opera en Colombia según el contexto general. **No verifiqué** en esta sesión su salida ni su estado en 2026.

---

## Oportunidad 15: plataforma de simulacros Saber 11 (banco de preguntas, análisis de resultados y planes de estudio) para colegios privados pequeños y estudiantes de grado 11 en ciudades intermedias

### Takeaway
El mercado es grande y estable: **489.880 evaluados en 2025**, ~20 % de ellos en colegios no oficiales, con una brecha de 36 puntos entre los sectores oficial y no oficial. Hay **DAP comprobada** en los tres canales: B2C con cursos de 220.000 a 600.000 COP, B2B con Instruimos a 36.000 COP por estudiante por 4 pruebas, y B2G con municipios que contratan preparación en SECOP por 13 a más de 200 millones COP. Pero la competencia es fuerte: Milton Ochoa (más de 1.150 colegios), Helmer Pardo, Instruimos, Lumina y decenas de simuladores gratis, además de materiales gratuitos del ICFES. La demanda es estacional (preparación entre enero y julio para el calendario A), así que lanzar en octubre complica cobrar desde el primer mes. Al fundador también le falta experticia pedagógica y un banco de preguntas propio.

### Cited Findings

#### Dolor y datos
- [HECHO] El número de evaluados en Saber 11 pasó de **463.722 (2014) a 489.880 (2025)**. El mínimo fue en 2020 (457.214). Cerca del **80 % pertenece al sector oficial y alrededor del 20 % al no oficial**, una distribución "casi idéntica en los últimos cinco años". — [ICFES, Nota de política "Doce años del examen Saber 11.º"](https://www.icfes.gov.co/wp-content/uploads/2026/08/NOTA-POLITICA-Doce-an%CC%83os-del-examen-Saber-11.o-4.pdf) (pub. agosto de 2026 · acc. 2026-10-01). *Prueba:* el tamaño anual del mercado de estudiantes. *No prueba:* cuántos pagan preparación.
- [HECHO] En 2025 el sector oficial obtuvo **253 puntos** y el no oficial **289**, una brecha de **36 puntos**, superior a la de 2014 (249 vs. 279). La brecha entre zonas rurales y urbanas pasó de 22 a 30 puntos entre 2014 y 2025. — misma fuente ICFES. *Prueba:* hay brechas persistentes, lo que es un argumento de venta para colegios y familias. *No prueba:* que la preparación externa las cierre.
- [ESTIMACIÓN] El 20 % de 489.880 da ~**98.000 estudiantes de grado 11 en colegios privados** en 2025 (cálculo propio con datos ICFES).
- [HECHO, tercero] **Huila 2025**: promedio de **263,9** puntos frente a 256,3 nacional y **266 instituciones** evaluadas, según un sitio de análisis no oficial. — [icfes-analytics.com, Huila](https://www.icfes-analytics.com/icfes/departamento/huila/) (acc. 2026-10-01). El dato no fue verificado contra los microdatos del ICFES.
- [HECHO, dato de 2022] En el dataset oficial "Resultados únicos Saber 11" (periodo 20224, calendario A 2022, que es el último disponible ahí) hay **3.487 establecimientos no oficiales** y **6.891 oficiales** distintos con evaluados a nivel nacional. En **Huila** son **75 no oficiales** y **211 oficiales** (consulta `count(distinct cole_cod_dane_establecimiento)` agrupada por `cole_naturaleza`). — [ICFES, Resultados únicos Saber 11, datos.gov.co (kgxf-xxbe)](https://www.datos.gov.co/resource/kgxf-xxbe.json) (dataset actualizado 2023-08 · acc. 2026-10-01). *Prueba:* hay **~75 colegios privados en Huila** que presentan Saber 11, que es el universo B2B local, y ~3.500 a nivel nacional (dato de 2022). *Advertencia:* el número de filas de ese periodo (1.065.886 nacional; 26.360 en Huila) es más del doble de los ~470.000 evaluados que reporta el ICFES para esa época. Parece haber filas duplicadas, así que **no se deben usar los conteos de filas como número de estudiantes**. El total de 266 instituciones en Huila según icfes-analytics (2025) es coherente con los 286 establecimientos de 2022 (75 + 211).
- [HECHO] La natalidad cae: 453.901 nacimientos en 2024, −31,3 % frente a 2015 — [MinEducación](https://www.mineducacion.gov.co/portal/salaprensa/Comunicados/427158:Que-esta-pasando-con-los-colegios-privados-en-Colombia) (pub. 2026-01-22). En el largo plazo se reducirá la cohorte de grado 11 (**[HIPÓTESIS]** sobre el efecto a ~2032+).
- [HECHO] Fragilidad financiera de los colegios privados: el 70,8 % no tiene reservas para el próximo año y la ocupación bajó del 68 % al 62 % — [Semana / informe Mattilda](https://www.semana.com/economia/macroeconomia/articulo/mas-estudiantes-pero-menos-respaldo-financiero-el-panorama-de-los-colegios-privados-en-colombia/202634/) (2026-07). *Implica:* poca DAP B2B en colegios pequeños (**[HIPÓTESIS]**).

#### Cómo lo resuelven hoy y cuánto pagan
- [HECHO] **Instruimos** (B2B o B2B2C): **36.000 COP por estudiante** por "4 pruebas de periodo en las áreas evaluadas en la Prueba Saber 11", pagados por las familias mediante un link de Instruimos. — [IEM Liceo Integrado de Zipaquirá](https://liceointegrado.edu.co/2026/02/17/pago-pruebas-de-periodo-plataforma-instruimos/) (pub. 2026-02-17 · acc. 2026-10-01). *Prueba:* el colegio, aunque sea oficial, puede trasladar el cobro a los padres con un precio de referencia de ~9.000 COP por prueba.
- [HECHO] **Milton Ochoa**: más de 25 años y "más de 1.150 colegios en 32 departamentos". El programa "Martes de Prueba" incluye 10 pruebas anuales más un simulacro Saber 11. Precios no públicos (varían por paquete). — [aamocolombia.com](https://aamocolombia.com/); [GPS Suba, Martes de Prueba](https://www.gps.edu.co/martes-de-prueba/); [Lumina vs Milton Ochoa](https://luminaeducation.app/lumina-vs/milton-ochoa) (acc. 2026-10-01).
- [HECHO] **Lumina** (B2C, app con IA): pago único "desde COP $220.000" hasta el examen, o plan de 300.000 COP con tutor de inglés por voz. — [luminaeducation.app](https://luminaeducation.app/lumina-vs/milton-ochoa) (acc. 2026-10-01; página comparativa del propio competidor, sin fecha).
- [HECHO] **Grupo 500**: preicfes calendario A 2026 (abril–julio/agosto) por 600.000 COP, con promoción de 500.000. **Escolaria**: preicfes virtual de 597.000 COP (descuento a 397.000). **PreICFES Fundamental** (con página para Huila): 3.000 COP/día, 10.000 COP/semana o 30.000 COP/mes. — [Grupo 500](https://grupo500educacion.com/products/preicfes-calendario-a-2026); [Escolaria](https://escolaria.co/preicfes-virtual/); [PreICFES Fundamental – Huila](https://preicfesfundamental.com/preicfes-huila/) (acc. 2026-10-01; precios tomados de resúmenes de búsqueda, no abrí cada página).
- [HECHO] **Helmer Pardo**: el preicfes virtual tiene 16 sesiones en vivo los sábados (de 7:30 a 12:00), con inicios el 7 de febrero y el 18 de julio. Ofrecía "Matrícula 2026 con precios 2025". El precio no se pudo leer porque la página no devolvió contenido. — [helmerpardosedeprincipal.com](https://www.helmerpardosedeprincipal.com/preicfes-virtual/) (acc. 2026-10-01).
- [HECHO] **B2G en SECOP II (2025)**: municipios y entidades contrataron preparación para Saber 11. Ejemplos de una muestra de 200 registros que contienen "ICFES", "PRUEBAS SABER" o "PREICFES" en el objeto:
  - Municipio de Cómbita con **Comercializadora Milton Ochoa SAS**: 50.974.420 COP.
  - Maripí con Milton Ochoa: 13.235.000 COP.
  - Liceos del Ejército con Asesorías Académicas Milton Ochoa: 138.765.515 COP.
  - Confines (Santander) con **Grupo Helmer Pardo SAS**: 14.000.000 COP.
  - Ocaña con Mindsit SAS, por simulacros presenciales: 39.908.000 COP.
  - Madrid (Cundinamarca) con UMAYOR: 200.000.000 COP.
  - Bello: 799.999.705 COP.
  - Barrancabermeja con Fundación Avancemos: 1.222.210.850 COP (convenio).
  - Fuente: [SECOP II – Contratos Electrónicos (jbjy-vk9h)](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Contratos-Electr-nicos/jbjy-vk9h) (acc. 2026-10-01).
  - *Prueba:* hay DAP pública recurrente por preparación. *No prueba:* el volumen total (la muestra estaba limitada a 200 filas y no es un conteo exhaustivo). Además, estos contratos suelen requerir RUP, experiencia y a menudo servicio presencial.

#### Herramientas gratuitas (invalidante parcial)
- [HECHO] El ICFES ofrece gratis la "Caja de herramientas Saber 11", con qué se evalúa, ejemplos explicados de preguntas de las cinco pruebas e interpretación de resultados. — [ICFES, Caja de herramientas](https://www.icfes.gov.co/caja-de-herramientas-saber-11/) (acc. 2026-10-01). La página no muestra un simulador en línea completo. El nombre "Pruébate" no apareció en la página revisada.
- [HECHO, antiguo] MinEducación anunció en su momento "El Icfes tiene un preicfes", un simulador virtual gratuito. — [MinEducación](https://www.mineducacion.gov.co/portal/salaprensa/Noticias/382369:Icfes-pone-en-servicio-simulacro-virtual-para-prueba-Saber-11) (fecha no visible; probablemente de hace varios años). **No pude verificar si sigue activo en 2026.**
- [HECHO] Hay muchos simuladores gratuitos en 2026: Filadd (256 preguntas, 5 materias), simulacroicfes.co, saber-11.co, simuladoricfes.co, preicfes.net y Mente Viva (12 h gratis), entre otros. — [Filadd](https://filadd.com.co/simulacro_icfes/); [simulacroicfes.co](https://simulacroicfes.co/); [saber-11.co](https://saber-11.co/); [preicfes.net](https://preicfes.net/) (acc. 2026-10-01). *Prueba:* el banco de preguntas básico ya es un commodity gratuito.

#### Regulación
- [HIPÓTESIS] Los usuarios son menores de edad, así que aplica el tratamiento reforzado de datos de niños, niñas y adolescentes (Ley 1581 de 2012), con autorización de los padres. No se revisó la norma en esta sesión.
- [HIPÓTESIS] Si se usan preguntas liberadas por el ICFES, hay que revisar los términos de uso y derechos. No se verificó.
- No se requiere licencia para vender una plataforma de práctica, pero vender a entidades públicas (B2G) exige RUP y procesos SECOP (**[HIPÓTESIS]** basada en la práctica general de contratación, no verificada aquí).

#### Estacionalidad
- [HECHO] La oferta comercial de preparación para el calendario A se concentra entre febrero y agosto: Helmer Pardo inicia el 7 de febrero y el 18 de julio, Grupo 500 vende "Calendario A 2026 abril–julio" y "Calendario B 2026 enero–marzo", y Escolaria tiene oferta en julio de 2026. — fuentes citadas arriba (acc. 2026-10-01). *Implica:* en octubre, el pico de preparación del calendario A 2026 ya pasó (**[HIPÓTESIS]**; no verifiqué las fechas oficiales del examen 2026 en icfes.gov.co).

#### Señales de demanda vs. señales de DAP
- *Demanda:* ~490.000 evaluados al año, brechas de puntaje y decenas de simuladores gratis (que muestran tráfico pero no pago).
- *DAP:* Instruimos a 36.000 COP por estudiante, Lumina a 220.000–300.000, Grupo 500 a 500.000–600.000, Escolaria a 397.000–597.000, PreICFES Fundamental a 30.000 COP/mes y contratos en SECOP de municipios con Milton Ochoa, Helmer Pardo y Mindsit, entre otros.

### Inferences
- [ESTIMACIÓN] Para ~2 millones COP/mes: B2C a ~30.000 COP/mes (precio de PreICFES Fundamental) requiere ~67 suscriptores activos; B2B a ~36.000 COP por estudiante y año (precio de Instruimos) requiere ~670 estudiantes al año, unos 15 a 20 colegios pequeños de ~40 alumnos en grado 11 (**[HIPÓTESIS]** sobre el tamaño típico de curso).
- [HIPÓTESIS] El activo crítico es un **banco de preguntas de calidad, alineado al ICFES y con analítica creíble**. Construirlo exige trabajo pedagógico (docentes por área) que el fundador no tiene. Generar preguntas con IA sin validar arriesga la calidad y la reputación.
- [HIPÓTESIS] El B2B con colegios privados pequeños de Neiva es accesible localmente (pocas decenas de colegios), pero hay que desplazar a Milton Ochoa e Instruimos, que ya están en el colegio, y los colegios están financieramente estresados.
- **Puntajes preliminares (1–5):**
  - Intensidad/frecuencia: **3**. El examen es de alto impacto, pero ocurre una vez al año y la demanda es estacional.
  - Evidencia de gasto/DAP: **4**. Hay pago comprobado en B2C, B2B y B2G.
  - Acceso digital: **3**. B2C es viable por TikTok o Instagram, pero quien paga es el padre; B2B requiere relación y B2G licitación.
  - Escalabilidad/margen: **4**. Es software y contenido reutilizable, aunque con un costo inicial alto de contenido.
  - Oportunidad competitiva: **2**. Milton Ochoa, Helmer Pardo, Instruimos, Lumina, muchos simuladores gratis y la caja de herramientas del ICFES.
  - Encaje con el fundador: **3**. Encaja en lo técnico, pero no en lo pedagógico ni en la credibilidad educativa.
  - Velocidad para validar y cobrar: **2**. Arrancar en octubre queda fuera de temporada para el calendario A y el contenido toma tiempo.

### Gaps
- El conteo de colegios privados con Saber 11 (75 en Huila y 3.487 a nivel nacional) corresponde a **2022**. No obtuve cifras de 2025 por sector ni el número confiable de **estudiantes evaluados en Huila y Neiva por sector**: los datasets de microdatos más recientes y del directorio DUE en datos.gov.co no son tabulares, y los conteos de filas de kgxf-xxbe parecen tener duplicados.
- No hay precios públicos de Milton Ochoa ni de Helmer Pardo.
- No verifiqué si "Pruébate" o "El Icfes tiene un preicfes" siguen vigentes en 2026 ni las fechas oficiales del examen 2026 y 2027.
- No tengo un conteo exhaustivo de contratos B2G de preparación en 2025 (la muestra se truncó en 200 filas).

---

## Comparación transversal y lectura para el investigador de mercado

### Takeaway
En las cuatro oportunidades hay dolor documentado. La DAP está mejor probada en la 12 (SECOP) y la 15 (Saber 11) y es débil en la 14 (restaurantes). La evidencia invalidante más fuerte es: en la **14**, herramientas gratis más DiDi Tu Negocio al 9,5 %; en la **12**, un competidor con alertas por WhatsApp e IA a 25.000 COP/mes, alertas gratis de SECOP por UNSPSC y ≥10 competidores; en la **13**, Mattilda y el software contable que ya incluye recordatorios, más la carga de la Ley 2300; en la **15**, los incumbentes B2B, los simuladores gratis y la estacionalidad. Por encaje con el fundador y velocidad, la 12 es la más fácil de construir y cobrar, pero la menos defendible. Ninguna justifica un deep dive sin un diferencial claro.

### Cited Findings
- Tabla resumen de puntajes preliminares (1–5), cuyo detalle y fuentes están en cada sección:

| Criterio | 12 SECOP | 13 Cobranza | 14 Restaurantes | 15 Saber 11 |
|---|---|---|---|---|
| Intensidad/frecuencia | 3 | 4 | 4 | 3 |
| Evidencia de gasto/DAP | 4 | 3 | 2 | 4 |
| Acceso por canales digitales | 4 | 3 | 4 | 3 |
| Escalabilidad y margen | 4 | 3 | 2–3 | 4 |
| Oportunidad competitiva | 1–2 | 2 | 1 | 2 |
| Encaje con el fundador | 5 | 4 | 4 | 3 |
| Velocidad para validar y cobrar | 4 | 3 | 3 | 2 |

- Precio de referencia más bajo encontrado en cada oportunidad: SECOP 25.000 COP/mes con IA y WhatsApp ([Leadcitaciones](https://www.leadcitaciones.info/precios)); cobranza 39.900 COP/mes en Treinta Esencial ([Treinta](https://treinta.co/planes-y-precios)) o incluido en el software contable; restaurantes gratis ([OlaClick](https://olaclick.com/es/software-para-restaurantes/), [Treggio](https://treggio.co/menu-digital-para-restaurantes/)); Saber 11 gratis ([Filadd](https://filadd.com.co/simulacro_icfes/), [ICFES](https://www.icfes.gov.co/caja-de-herramientas-saber-11/)) o 36.000 COP por estudiante en B2B ([Instruimos](https://liceointegrado.edu.co/2026/02/17/pago-pruebas-de-periodo-plataforma-instruimos/)).

### Inferences
- [HIPÓTESIS] Si se hace un deep dive, la candidata es la **12** con un ángulo distinto a "alertas": verificación de habilitantes contra el RUP, inteligencia de precios y competidores por entidad o sector, o un vertical como obra menor o mínima cuantía regional. Habría que validar primero si los clientes de los competidores (LicitaYa, Fromus) cambiarían o pagarían por algo más. La **15** sería la segunda opción solo en modalidad B2C de nicho (por ejemplo, analítica y plan de estudio sobre bancos existentes) y empezando en enero de 2027.
- [HIPÓTESIS] La **14** debería descartarse como SaaS. La **13** solo tiene sentido en una vertical estrecha sin software contable (academias o gimnasios pequeños) y con cumplimiento de la Ley 2300 integrado al diseño.

### Gaps
- No hay métricas de tracción (clientes pagos, churn) de ningún competidor en ninguna de las cuatro oportunidades.
- No hay datos de volumen de búsqueda (Google Trends o Keyword Planner) por limitación de acceso.
- No verifiqué la tasa de cambio COP/USD vigente.

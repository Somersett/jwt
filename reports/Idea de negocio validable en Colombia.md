# Idea de negocio validable en Colombia: venda revisiones de pliegos antes de programar

*Informe de investigación de mercado · Neiva (Huila), 1 de octubre de 2026 · Fuentes consultadas el 2026-10-01*

Ninguna de las 15 ideas investigadas tiene todavía evidencia suficiente para invertir en construir un producto. La recomendación es validar antes de programar: durante 30 días, vender a mano y por adelantado revisiones "¿cumplo o no cumplo?" de invitaciones de **mínima cuantía** en SECOP II a mipymes del Huila y del sur del país, a **$24.900 por análisis** o **$49.900 al mes**. Esta oportunidad obtiene el mejor puntaje ponderado de las cinco preseleccionadas: **3,70 sobre 5**, o 3,48 con los supuestos más conservadores del investigador. Une un problema caro y medible, porque en cerca del **60 %** de los procesos de mínima cuantía con competencia de precio no ganó la oferta más barata, lo que indica ofertas descalificadas. Además, el gasto ya existe en el mercado (al menos **13 servicios con precio público**), los clientes se pueden identificar uno a uno en datos abiertos y la idea encaja muy bien con un ingeniero de software que vive en Neiva. La confianza es **media-baja**: hay alertas con inteligencia artificial desde $15.900–25.000 al mes, SECOP II avisa gratis, casi la mitad de los oferentes (48 %) se presenta una sola vez al año y nadie ha comprobado que estas empresas le paguen a un recién llegado. El experimento cuesta entre **$335.000 y ≈ $967.000** (entre el 20 % y el 58 % de los 500 USD) y tiene una regla simple: continuar solo con **al menos 10 pagos reales de 8 clientes distintos** y abandonar con 3 o menos. La alternativa es un software multicliente de SG-SST para asesores con licencia (3,25 sobre 5). Su hueco de precio ya lo ocupan SafetYA y Progresst, y su supuesto central, cuántas empresas atiende cada asesor, no tiene datos. Nada de esto se ha ejecutado: el fundador debe hacer él mismo cada contacto, cada publicación y cada cobro.

**Cómo leer este informe.** Cada hallazgo importante lleva una de estas etiquetas:

| Etiqueta | Qué significa |
|---|---|
| **[Hecho]** | Dato publicado por una fuente oficial o por el propio proveedor, o resultado directo de una consulta a datos abiertos. |
| **[Estimación]** | Cálculo propio o cifra aproximada de un tercero. |
| **[Hipótesis]** | Inferencia todavía sin verificar. |

Todas las fuentes se consultaron el **1 de octubre de 2026 (2026-10-01)**. Cuando la página muestra fecha de publicación, se indica. Los precios de los competidores son los que publicaban ese día y pueden cambiar. Las cifras de SECOP, REPS y RUES salen de consultas propias del equipo de investigación a datos.gov.co, cuyos datos se actualizan a diario, así que una consulta futura puede dar números algo distintos. En este trabajo no se contactó a ningún cliente, no se publicó nada y no se compró nada.

| Término | Qué significa en este informe |
|---|---|
| SECOP II | Plataforma pública donde las entidades del Estado publican sus compras y los proveedores presentan ofertas. |
| Mínima cuantía | Modalidad de compra pública de menor valor (en 2026, hasta unos $49–175 millones según la entidad). Gana la oferta más barata que cumpla los requisitos. |
| Invitación o pliego | Documento del proceso con los requisitos que debe cumplir quien se presenta (el "proponente"). |
| Requisito habilitante | Requisito que da derecho a competir, pero no da puntos. Si falta o tiene errores, a veces se puede **subsanar** (corregir) dentro de las reglas del proceso. |
| RUP | Registro Único de Proponentes, en la cámara de comercio. No se exige en mínima cuantía. |
| UNSPSC | Código que clasifica los bienes y servicios en SECOP. |
| SG-SST y ARL | Sistema de gestión de seguridad y salud en el trabajo, obligatorio para todo empleador, y aseguradora de riesgos laborales. |
| Eventos RADIAN (030 y 032) | Mensajes electrónicos con los que el comprador confirma que recibió una factura y el bien o servicio. |
| Proveedor tecnológico (PT) | Empresa autorizada por la DIAN para facturar electrónicamente a nombre de otros. |
| SaaS | Software que se usa por internet y se paga por suscripción. |
| Servicio manual o *concierge* | Prestar a mano el servicio que algún día hará un software, para probar si alguien paga antes de construirlo. |
| Disposición a pagar | Que el cliente efectivamente pague. Solo se demuestra con pagos o compromisos reales, no con opiniones. |
| Margen bruto | Lo que queda del precio después de los costos directos de prestar el servicio. |
| Tasa de cancelación (*churn*) | Porcentaje de clientes que dejan de pagar cada mes. |
| Entrevista tipo *Mom Test* | Entrevista que pregunta por hechos y gastos pasados, no por opiniones ni intenciones futuras. |
| SMMLV, UVT y TRM | Salario mínimo, unidad de valor tributario de la DIAN y tasa de cambio oficial del dólar. |

## 1. Resumen: probar primero el "¿cumplo?" de mínima cuantía, con confianza media-baja

### 1.1 La recomendación en palabras simples

La evidencia pública alcanza para decidir **qué probar**, pero no para decidir **qué construir**. Se exploraron 15 ideas; cinco pasaron el primer filtro y tres se investigaron a fondo con normas, precios publicados y consultas propias a datos abiertos. Las tres sobrevivieron solo en una versión más estrecha que la original, y en las tres apareció más competencia de la esperada. Por eso este informe no recomienda invertir en un producto. Recomienda un experimento de 30 días que produzca la evidencia que hoy falta: pagos reales.

El experimento recomendado consiste en vender, como servicio manual, una revisión de requisitos de procesos de **mínima cuantía** en SECOP II, la modalidad de compra pública más pequeña y más numerosa. Los clientes serían mipymes del Huila, el Tolima, el Caquetá y el Putumayo que se presentan con frecuencia. El problema es concreto y medible:

- En el Huila se publican unos **200 procesos competitivos al mes**; el 77 % son de mínima cuantía y el plazo mediano para ofertar es de **6 días** ([SECOP II – Procesos de Contratación, datos.gov.co](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt)) [Hecho].
- En esa modalidad gana la oferta más barata **que cumpla** los requisitos ([Decreto 1860 de 2021, copia del normograma de Cancillería](https://www.cancilleria.gov.co/sites/default/files/Normograma/docs/pdf/decreto_1860_2021.pdf)) [Hecho].
- En cerca del **60 %** de los procesos con competencia de precio, el ganador no fue el que ofreció menos, señal de ofertas descalificadas ([SECOP II – Ofertas por proceso](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOPII-Ofertas-Por-Proceso/wi7w-2nvm)) [Estimación].
- Un contrato promedio de mínima cuantía en el Huila vale **$34,7 millones** ([SECOP II – Procesos](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt)) [Hecho]. Una revisión de $24.900 cuesta menos del 0,1 % de lo que está en juego.

Hay tres razones más para elegir esta idea:

1. **El gasto ya existe.** Al menos 13 servicios cobran por alertas o por análisis de licitaciones, desde $15.900 al mes hasta $46.000–50.000 por pliego ([LicitIA](https://licitia.com.co/); [Licitarus](https://www.licitarus.com/)) [Hecho].
2. **Los clientes se pueden identificar uno a uno.** Según los datos abiertos, **280 proveedores domiciliados en el Huila** presentaron 4 o más ofertas en 2025, y **658** en los cuatro departamentos del sur ([SECOP II – Proveedores Registrados](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Proveedores-Registrados/qmzu-gj57); [Ofertas por proceso](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOPII-Ofertas-Por-Proceso/wi7w-2nvm)) [Hecho]. Además, la Superintendencia de Industria y Comercio (SIC) considera que el correo corporativo de una empresa queda fuera de la ley de datos personales ([SIC, concepto del 1-mar-2024](https://sedeelectronica.sic.gov.co/publicaciones/boletin-juridico/concepto/ambito-de-aplicacion-de-la-ley-1581-de-2012-en-datos-corporativos)) [Hecho].
3. **El encaje con el fundador es casi perfecto.** Es trabajo con datos y lectura de documentos, no exige licencia y él vive en la región.

La confianza es **media-baja**, y conviene decirlo sin rodeos. Las alertas ya son un producto barato: Leadcitaciones cobra $25.000 al mes con resumen por inteligencia artificial y aviso por WhatsApp ([Leadcitaciones](https://www.leadcitaciones.info/precios)) [Hecho], y SECOP II avisa gratis según el código de producto ([Colombia Compra Eficiente, preguntas frecuentes](https://www.colombiacompra.gov.co/archivos/pregunta-frecuente/como-activo-notificaciones-al-correo)) [Hecho]. Casi la mitad de los oferentes del país (48 %) se presentó una sola vez en 2025 y enero casi no tiene procesos [Hecho], lo que amenaza los ingresos recurrentes. Y nada prueba que una mipyme le entregue sus documentos y le pague a un desconocido de Neiva. El experimento está diseñado para responder justamente esa última pregunta con dinero, no con opiniones.

Lo que **no** debe hacer el fundador en estos 30 días es construir un motor de alertas o una aplicación. La primera versión del servicio es él mismo: una inteligencia artificial lee la invitación pública y él revisa a mano los documentos del cliente. Si diez clientes pagan, el paso siguiente es automatizar lo repetitivo en diciembre y enero, cuando el mercado está quieto, y relanzar en febrero a escala nacional, donde hay **10.287 oferentes frecuentes** ([SECOP II – Ofertas por proceso](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOPII-Ofertas-Por-Proceso/wi7w-2nvm)) [Hecho].

La alternativa es un software multicliente de SG-SST para asesores con licencia. Su mayor fortaleza es que el asesor ya cobra entre $249.000 y $349.000 al mes por cada microempresa ([Mentora](https://mentoracolombia.com/sst); [Cuidamos](https://cuidamos.com.co/planes-sgsst/)) [Hecho; la cifra de Cuidamos sale de un resumen del buscador], así que un software de $10.000–15.000 por empresa pesa poco en sus costos. Su debilidad es que SafetYA y Progresst ya venden planes multicliente por unos $50.000 al mes ([SafetYA](https://safetya.co/membresia/); [Progresst](https://sstmasterpro.com/)) [Hecho], y nadie sabe cuántas empresas atiende un asesor típico.

### 1.2 La decisión en una tabla

| Pregunta | Respuesta |
|---|---|
| ¿Qué validar primero? | Revisión "¿cumplo o no cumplo?" de invitaciones de mínima cuantía en SECOP II, como servicio manual con apoyo de inteligencia artificial. |
| ¿Para quién? | Mipymes con forma de sociedad (SAS o Ltda.) del Huila, el Tolima, el Caquetá y el Putumayo que presentaron 4 o más ofertas en 2025. |
| ¿Qué vender antes de programar? | Un análisis entregado en 24 horas hábiles ($24.900) y un "Plan Sur" de 30 días ($49.900) con avisos de procesos y 5 análisis. |
| ¿Cuánto gastar? | Entre $335.000 y $966.890 en 30 días, menos del 60 % de los 500 USD (detalle en 4.6). |
| ¿Cuándo continuar? | Con 10 o más pagos de al menos 8 clientes distintos, 3 o más recompras y menos de 30 minutos promedio por análisis. |
| ¿Cuándo abandonar? | Con 3 pagos o menos, o si la mayoría dice que las alertas gratis o baratas más su propia revisión le bastan. |
| Alternativa | Software multicliente de SG-SST para asesores con licencia: preventa de un "plan fundador" de $49.000–79.000 al mes. |
| Confianza | Media-baja: el problema y el gasto existente están bien documentados, pero no hay entrevistas ni pagos. |
| Mayor riesgo | Que las mipymes no le paguen a un recién llegado cuando hay alertas con inteligencia artificial desde $15.900 y avisos oficiales gratis. |
| Calendario | Octubre y noviembre son el pico anual de procesos; enero es el mes más flojo. Conviene decidir a comienzos de noviembre. |

### 1.3 Supuestos sobre el fundador

Donde el perfil no dice nada, este informe asume lo siguiente. Si algún supuesto es falso, varias conclusiones cambian.

| Tema | Lo que dijo el fundador | Lo que este informe supone |
|---|---|---|
| Ubicación y mercado | Vive en Neiva y vende solo en Colombia. | Puede vender a todo el país por canales digitales. El Huila sirve para empezar y para alguna reunión presencial. |
| Presupuesto | Unos 500 USD (≈ $1,6–1,67 millones), que puede perder. | Es un presupuesto total para validar, no mensual. Se recomienda gastar menos de $1 millón en los primeros 30 días. |
| Tiempo | 20 horas por semana. | Puede sostenerlas al menos tres meses, unas 80 horas al mes. |
| Meta | Unos 500 USD al mes, cobrando desde el primer mes después de lanzar. | Ingreso bruto de ≈ $1,67 millones al mes, antes de impuestos y comisiones. |
| Habilidades | Ingeniero de software con muchos proyectos. | Puede construir y mantener software solo (web, APIs, datos, inteligencia artificial) y consultar APIs de datos abiertos. |
| Licencias y títulos | No tiene. | No puede firmar trabajos reservados a profesionales con licencia (contador, abogado, licencia SST, profesional de la salud). Solo puede vender herramientas o servicios que no la exijan. |
| Forma legal | No la menciona. | Empieza como persona natural con RUT. No tiene sociedad, certificación ISO ni firma digital. |
| Contactos | No tiene. | No tiene audiencia, marca ni referidos: todo canal empieza en cero. |
| Inglés | Conversaciones simples. | No es relevante, porque todo el mercado es colombiano. |
| Tipo de cliente | Cualquiera; prefiere canales digitales. | Acepta llamadas por teléfono o video. Una reunión presencial en Neiva es posible, pero no la regla. |
| Escala | Quiere una empresa escalable, solo y quizá luego con un socio. | Acepta prestar un servicio manual por un tiempo si es el camino hacia un software. |
| Empleo actual | No lo menciona. | No tiene un contrato laboral que le impida vender por su cuenta. |
| Medios de pago | No los menciona. | Tiene cuenta bancaria o billetera digital y puede abrir una pasarela de pagos como persona natural. |

### 1.4 Valores de referencia de 2026 y contexto que pesa en todas las ideas

| Valor | Cifra | Tipo y fuente |
|---|---|---|
| Salario mínimo (SMMLV) | $1.750.905 | [Hecho, fuente secundaria] Fijado de forma transitoria por el Decreto 0159 de 2026 ([Alegra](https://blog.alegra.com/colombia/salario-minimo-en-colombia-2026/); [elempleo, 27-feb-2026](https://www.elempleo.com/co/noticias/tendencias-laborales/salario-minimo-2026-el-gobierno-ratifica-el-aumento-del-23-mediante-decreto-transitorio-8757)). |
| UVT | $52.374 | [Hecho, fuente secundaria] ([Actualícese](https://actualicese.com/uvt-2026/)). |
| TRM del 30-sep-2026 | $3.341,23 por dólar | [Hecho] ([serie oficial en datos.gov.co](https://www.datos.gov.co/resource/32sa-8pi3.json)). |
| 500 USD | ≈ $1.670.615 (entre $1,52 y $1,90 millones según la TRM de 2026) | [Estimación] |
| Meta anual | ≈ $20,0 millones ≈ 383 UVT | [Estimación] |
| Tope para no cobrar IVA (3.500 UVT) | $183.309.000 al año | [Estimación] 3.500 × UVT. |

Dos datos de contexto pesan sobre todas las ideas. El primero: el mercado empresarial local es casi todo micro. El Huila tiene **39.281 unidades empresariales**: el 97,32 % son microempresas y el 80,8 % personas naturales ([Cámara de Comercio del Huila, Estimación del Potencial de Comerciantes 2025](https://www.cchuila.org/wp-content/uploads/Estimacion-del-Potencial-de-Comerciantes-CCH-2025.pdf)) [Hecho]. Eso deja solo unas 1.000 pequeñas y medianas empresas en todo el departamento [Estimación], así que cualquier software para empresas tiene que venderse en todo el país. El segundo: la microempresa trabaja con el celular, no con el computador. El **89,1 %** de los micronegocios no usó computador ni tableta para el negocio y el 70,9 % usó celular ([DANE, EMICRON 2024, publicado el 30-jul-2025](https://www.dane.gov.co/files/operaciones/EMICRON/bol-EMICRON-2024.pdf)) [Hecho]. Por eso las ideas que funcionan mejor le venden a un profesional (asesor, contador) o a una empresa con algo concreto en juego, y no a la microempresa directamente.

## 2. Tabla comparativa: SECOP lidera, pero ningún puntaje sustituye un pago

Las cinco oportunidades preseleccionadas se calificaron de 1 (muy desfavorable) a 5 (muy favorable) en los siete criterios pedidos, con los pesos exactos solicitados. Las ideas (a), (b) y (c) se califican con la evidencia de la investigación a fondo, y su puntaje corresponde a la **versión de la idea que sobrevivió** a esa investigación (ver el inicio de la sección 3). Las ideas (d) y (e) se califican solo con la evidencia del escaneo preliminar, y por eso su confianza es baja.

### 2.1 Puntajes ponderados de las cinco preseleccionadas

| Criterio | Peso | (a) SG-SST para asesores | (b) Conciliación DIAN para contadores | (c) SECOP "¿cumplo?" en el sur | (d) RIPS/FEV para profesionales de salud | (e) Recordatorios de citas por WhatsApp |
|---|---|---|---|---|---|---|
| Intensidad y frecuencia del problema | 20 % | 4 | 3 | 4 | 5 | 3 |
| Evidencia de gasto y disposición a pagar | 20 % | 4 | 3 | 4 | 4 | 4 |
| Acceso a clientes y viabilidad comercial | 15 % | 2 | 3 | 4 | 3 | 4 |
| Escalabilidad y margen potencial | 15 % | 4 | 3 | 3 | 3 | 4 |
| Oportunidad competitiva | 15 % | 2 | 1 | 2 | 1 | 1 |
| Ajuste a recursos y experiencia del fundador | 10 % | 3 | 4 | 5 | 3 | 4 |
| Rapidez para validar y cobrar | 5 % | 3 | 4 | 5 | 3 | 4 |
| **Puntaje ponderado (sobre 5)** | **100 %** | **3,25** | **2,85** | **3,70** | **3,30** | **3,35** |
| Profundidad de la investigación | — | A fondo | A fondo | A fondo | Solo escaneo | Solo escaneo |
| Confianza de la evidencia | — | Media | Media | Media | Baja | Baja |
| Puesto por puntaje | — | 4.º | 5.º | 1.º | 3.º | 2.º |

### 2.2 La aritmética, paso a paso

Cada puntaje se multiplica por su peso y los resultados se suman.

| Idea | Cálculo | Total |
|---|---|---|
| (a) SG-SST | 4×0,20 + 4×0,20 + 2×0,15 + 4×0,15 + 2×0,15 + 3×0,10 + 3×0,05 = 0,80 + 0,80 + 0,30 + 0,60 + 0,30 + 0,30 + 0,15 | **3,25** |
| (b) DIAN | 3×0,20 + 3×0,20 + 3×0,15 + 3×0,15 + 1×0,15 + 4×0,10 + 4×0,05 = 0,60 + 0,60 + 0,45 + 0,45 + 0,15 + 0,40 + 0,20 | **2,85** |
| (c) SECOP | 4×0,20 + 4×0,20 + 4×0,15 + 3×0,15 + 2×0,15 + 5×0,10 + 5×0,05 = 0,80 + 0,80 + 0,60 + 0,45 + 0,30 + 0,50 + 0,25 | **3,70** |
| (d) RIPS | 5×0,20 + 4×0,20 + 3×0,15 + 3×0,15 + 1×0,15 + 3×0,10 + 3×0,05 = 1,00 + 0,80 + 0,45 + 0,45 + 0,15 + 0,30 + 0,15 | **3,30** |
| (e) WhatsApp | 3×0,20 + 4×0,20 + 4×0,15 + 4×0,15 + 1×0,15 + 4×0,10 + 4×0,05 = 0,60 + 0,80 + 0,60 + 0,60 + 0,15 + 0,40 + 0,20 | **3,35** |

**Prueba de sensibilidad.** El investigador de SECOP propuso sus propios puntajes, con medios puntos: 3,5; 4; 3; 4; 1,5; 5 y 4. Con ellos el total de (c) baja a 0,70 + 0,80 + 0,45 + 0,60 + 0,225 + 0,50 + 0,20 = **3,48**, y (c) sigue en primer lugar. Este informe le da a (c) un punto más en acceso, por la lista de prospectos identificables, y en rapidez, por la temporada alta actual. También le quita un punto en escalabilidad, por la revisión humana y la baja recurrencia.

### 2.3 Por qué cada puntaje

**(c) SECOP "¿cumplo?" para mínima cuantía en el sur — 3,70**

| Criterio | Puntaje | Justificación |
|---|---|---|
| Intensidad | 4 | En ~60 % de los procesos de mínima cuantía con competencia de precio no ganó la oferta más barata [Estimación]. El plazo mediano para ofertar es de 5 días y un contrato promedio vale $34,7 millones en el Huila [Hecho]. No llega a 5 porque el 48 % de los oferentes se presenta una sola vez al año y muchos requisitos se pueden subsanar. |
| Gasto y disposición a pagar | 4 | Hay al menos 13 ofertas con precio público (de $15.900 a $199.000 al mes, y de $46.000 a $50.000 por pliego), cursos pagos de $150.000 a $618.800 y un cargo asalariado de $2,0 a 4,0 millones al mes [Hecho]. No llega a 5 porque ninguna cifra de clientes que pagan es verificable. |
| Acceso | 4 | Cada oferente es identificable por NIT, con su historial, en datos abiertos. Se puede escribir al correo corporativo de las sociedades, el ticket es bajo y el ciclo de venta debería ser de días. Resta puntos que un tercio sean personas naturales (no se les puede escribir en frío), que el mercado regional sea pequeño y que la confianza en un desconocido sea baja. |
| Escalabilidad y margen | 3 | El costo variable es mínimo (≈ $100–800 de inteligencia artificial por pliego) y el mercado es nacional. Pero al inicio hace falta revisión humana (tope de 40–60 análisis al mes), enero casi no tiene procesos y quien gana un contrato deja de buscar mientras lo ejecuta. |
| Oportunidad competitiva | 2 | Hay 13 o más competidores y avisos oficiales gratis que llegan más rápido. Ninguno se presenta como especialista en mínima cuantía, donde no se exige RUP (69 % de los procesos competitivos), ni ofrece ayuda para pedir que el proceso se limite a mipymes locales. |
| Ajuste al fundador | 5 | Es ingeniería de datos sobre APIs abiertas, sin licencias, 100 % remoto, y el fundador vive en la región objetivo. |
| Rapidez | 5 | Se puede vender un análisis manual en la primera semana, sin construir nada, y octubre-noviembre es el pico anual de procesos competitivos. |

**(a) SG-SST multicliente para asesores con licencia — 3,25**

| Criterio | Puntaje | Justificación |
|---|---|---|
| Intensidad | 4 | El calendario es continuo: autoevaluación en diciembre, registro anual (plazo del 31-jul-2026), avance a la ARL en julio e investigación de accidentes en 15 días. Además, las normas nuevas suman carga (Resoluciones 1843 y 4179 de 2025). No es 5 porque la multa a una micro es de 1 a 5 SMMLV y el dolor propio del asesor (horas persiguiendo evidencias) no está medido. |
| Gasto y disposición a pagar | 4 | Cinco proveedores venden planes pensados para asesores: CumpleSST cobra $790.000 + IVA por 5 empresas, SafetYA $649.000 al año y Progresst $49.900 al mes. El asesor cobra $249.000–349.000 al mes por micro. Pero ningún proveedor publica cuántos clientes le pagan. |
| Acceso | 2 | Los asesores se reúnen alrededor de marcas que son competidoras (SafetYA tiene 58,6 mil suscriptores en YouTube). Las listas públicas de licenciatarios son datos personales. Con referencias internacionales, conseguir 10 clientes exigiría entre 55 y 110 asesores en prueba [Estimación]. |
| Escalabilidad y margen | 4 | Margen bruto estimado de 85–92 %, el ingreso crece con cada empresa nueva del asesor y la configuración inicial toma 1–3 horas. Resta la cancelación, que en referencias internacionales ronda el 6 % mensual, y que los portales del Ministerio de Trabajo y de las ARL no tienen API. |
| Oportunidad competitiva | 2 | Hay 12 o más alternativas y el multicliente barato ya existe. Las ARL dan software gratis por cada empresa afiliada y hay un competidor multicliente en Pitalito (Huila). El hueco posible, recordatorios por WhatsApp al empleador, no está probado. |
| Ajuste al fundador | 3 | Es software y la licencia la aporta el cliente. Pero el fundador no es del sector (le falta credibilidad), el producto de gestión es amplio y toca datos de salud de los trabajadores. |
| Rapidez | 3 | La autoevaluación de diciembre da un buen momento para preventa. Pero un servicio manual creíble exige conocimiento de SST que el fundador no tiene. |

**(b) Conciliación DIAN y eventos RADIAN para contadores — 2,85**

| Criterio | Puntaje | Justificación |
|---|---|---|
| Intensidad | 3 | El cierre es mensual, pero la ley solo exige 2 eventos (030 y 032) y solo en compras a crédito (art. 616-1 del Estatuto Tributario). El Consejo de Estado eliminó la exigencia de enviarlos en un plazo (Sentencia 29509 de 2025). Conciliar la DIAN contra la contabilidad es una buena práctica, no una obligación legal. |
| Gasto y disposición a pagar | 3 | Hay pago real (QFe $500.000–600.000 al año; SisteAcuse declara más de 240 clientes; N1 cobra $750 por documento). Pero el precio de referencia por NIT colapsó: SisteAcuse cuesta ≈ $917–2.083 por NIT al mes y Alegra es gratis para el contador. |
| Acceso | 3 | Hay comunidades de contadores (Conpucol tiene 21.453 seguidores en Facebook; ASCONPHU funciona en Neiva). Habría unos 100 contadores objetivo en Neiva [Hipótesis]. Pero el principal medio de contenido para contadores (Actualícese) está aliado con Siigo. Ciclo de venta estimado de 1 a 3 semanas. |
| Escalabilidad y margen | 3 | El margen supera el 85 %, pero cada cliente exige soporte (buzones, certificados, formatos de cada software) y hay que mantener la herramienta ante cada cambio de la DIAN. |
| Oportunidad competitiva | 1 | Hay 14 o más alternativas. Los grandes la dan gratis o casi gratis (Alegra; Siigo Contador Ilimitado a $535.900 al año), la conciliación ya existe (Kontalid) y la integración con World Office también (N1). |
| Ajuste al fundador | 4 | Encaja con un ingeniero (XML, servicios web, conciliación) y no exige licencia. Le resta la necesidad de conocimiento tributario y el riesgo de custodiar certificados de terceros. |
| Rapidez | 4 | Se puede ofrecer en días una conciliación manual con el Excel de la DIAN y el auxiliar contable, y el problema es mensual. |

**(d) RIPS y factura electrónica de salud para profesionales independientes — 3,30 (solo escaneo preliminar)**

| Criterio | Puntaje | Justificación |
|---|---|---|
| Intensidad | 5 | Sin el Código Único de Validación (CUV), el pagador no puede recibir ni tramitar la factura (Resolución 948 de 2026). Las reglas se endurecieron el 1-jun y el 1-jul-2026, y la obligación aplica a cada factura. |
| Gasto y disposición a pagar | 4 | TYR cobra $700.000 al año solo por RIPS y Saludtools $147.000–168.000 al mes por profesional. Hay ofertas de auxiliar de facturación en salud en Neiva por $1,0–1,97 millones al mes (tomadas de resúmenes del buscador). |
| Acceso | 3 | El registro público de prestadores (REPS) lista 550 profesionales independientes y 160 IPS en Neiva, con correo y teléfono. Pero usar esos datos para vender es dudoso bajo la Ley 1581; las IPS sí son personas jurídicas. |
| Escalabilidad y margen | 3 | Es software de alto margen, pero la norma cambió cuatro veces en menos de tres años y la factura de salud necesita un proveedor tecnológico autorizado por la DIAN. |
| Oportunidad competitiva | 1 | Hay decenas de proveedores, y el Ministerio de Salud ofrece gratis un convertidor y un validador. |
| Ajuste al fundador | 3 | Encaja en lo técnico. Pero el fundador no puede ser proveedor tecnológico (exige sociedad, ISO 27001 y patrimonio), los datos clínicos son sensibles y el tema es complejo. |
| Rapidez | 3 | La urgencia es real, pero ganar la confianza necesaria para manejar la facturación y las credenciales de SISPRO es lento. |

**(e) Recordatorios y confirmación de citas por WhatsApp para consultorios — 3,35 (solo escaneo preliminar)**

| Criterio | Puntaje | Justificación |
|---|---|---|
| Intensidad | 3 | La inasistencia de 12–18 % solo está medida en Nueva EPS en 2017–2018. El olvido es una de varias causas, y los recordatorios mejoran la asistencia de forma modesta (un 10–14 % relativo, según la revisión Cochrane). |
| Gasto y disposición a pagar | 4 | Doctoralia cobra $249.000–329.000 al mes. AgendaPro cobra $29.900–510.000 al mes y vende paquetes extra de WhatsApp ($10.000 por 50 mensajes). |
| Acceso | 4 | Los consultorios y unos 1.300 negocios de belleza del Huila son visibles en mapas y redes sociales, y la venta local es posible. |
| Escalabilidad y margen | 4 | Un mensaje de utilidad cuesta ≈ USD 0,0008 y el producto sirve para muchos sectores. |
| Oportunidad competitiva | 1 | Hay planes gratis (AgenditApp, Doctocliq, Psiris) y AgendaPro cuesta $29.900 con 50 recordatorios incluidos. |
| Ajuste al fundador | 4 | Es software puro y no exige licencias, aunque hay que cuidar los datos de salud. |
| Rapidez | 4 | Una primera versión sale en semanas y se puede vender en Neiva, pero es difícil diferenciarse. |

### 2.4 Confianza de la evidencia y mayor riesgo de cada idea

| Idea | Confianza | Por qué esa confianza | El riesgo más grande |
|---|---|---|---|
| (c) SECOP | Media | El mercado y el dolor se midieron con datos abiertos oficiales. La disposición a pagar se infiere de los precios de los competidores. No hay entrevistas ni clientes verificados. | Que las mipymes no le paguen a un recién llegado cuando hay alertas con inteligencia artificial desde $15.900–25.000 al mes y avisos oficiales gratis. |
| (a) SG-SST | Media | Precios y normas verificados. El supuesto central (cuántas empresas atiende cada asesor) no tiene datos, y el único indicio disponible apunta en contra. | Que los asesores atiendan pocas empresas o ya resuelvan con SafetYA, Progresst o las herramientas gratis de las ARL. |
| (b) DIAN | Media | Norma, competencia y bloqueos verificados en fuentes primarias o de proveedores. Las horas de trabajo por NIT no están medidas. La evidencia disponible apunta en contra. | Que Alegra, Siigo y SisteAcuse ya resuelvan el problema a precio cero o casi cero, mientras la DIAN sigue bloqueando la automatización. |
| (d) RIPS | Baja | Solo escaneo preliminar. La resolución se leyó en una transcripción porque el PDF oficial es una imagen escaneada. | Saturación de proveedores, herramientas gratis del Ministerio de Salud y la barrera del proveedor tecnológico DIAN para la factura. |
| (e) WhatsApp | Baja | Solo escaneo preliminar. Los datos de inasistencia son de una EPS en 2017–2018 y no hay ninguno de consultorios privados. | Es un producto genérico con planes gratis, y AgendaPro ya incluye WhatsApp por $29.900. |

### 2.5 Fácil de construir no es lo mismo que fácil de vender ni que fácil de escalar

| Idea | Construir | Vender | Escalar |
|---|---|---|---|
| (c) SECOP | **Fácil**: el servicio manual no exige programar. Después bastan un formulario, inteligencia artificial y una plantilla. | **Media**: hay una lista legal de prospectos, pero hay 13 competidores y desconfianza hacia un desconocido. | **Media-difícil**: exige automatizar la revisión, vender en todo el país y convivir con baja recurrencia. |
| (a) SG-SST | **Media-difícil**: un producto de gestión amplio, con datos sensibles. | **Difícil**: la audiencia está en manos de competidores, no hay lista legal de prospectos y al fundador le falta credibilidad en SST. | **Fácil-media**: es multiempresa, con margen alto. |
| (b) DIAN | **Media y frágil**: XML, servicios web y certificados. La automatización del portal se rompe. | **Difícil**: los grandes lo dan gratis y el precio de referencia es casi cero. | **Media**: cada cliente exige soporte y hay que seguir los cambios de la DIAN. |
| (d) RIPS | **Difícil**: la norma cambia, la factura exige un proveedor tecnológico y los datos de salud son sensibles. | **Media**: el dolor es obligatorio, pero hay decenas de proveedores y herramientas gratis. | **Media** |
| (e) WhatsApp | **Fácil** | **Media** en Neiva, cara a cara; **difícil** a un precio que valga la pena. | **Difícil**: es un producto genérico con planes gratis. La diferencia tendría que estar en el servicio local. |

Esta tabla muestra por qué un buen puntaje no basta. La inteligencia artificial y el SaaS no son mejores por sí mismos. En la idea ganadora, lo primero que se vende es un servicio con criterio humano, y el software llega después, solo si alguien paga.

### 2.6 Lo que la tabla dice y lo que no dice

La preselección fue coherente con la evidencia preliminar. Si se aplican los pesos pedidos a los puntajes del escaneo inicial de las 15 ideas (tabla 2.7), los cinco primeros lugares son exactamente las cinco preseleccionadas y los tres primeros son exactamente las tres finalistas: conciliación DIAN (3,55), SECOP (3,53) y SG-SST (3,50).

La investigación a fondo cambió el orden de forma importante, y hay que decirlo con transparencia:

| Idea | Puntaje con la evidencia preliminar | Puntaje después de investigar a fondo | Qué lo cambió |
|---|---|---|---|
| (b) DIAN | 3,55 (1.º) | 2,85 | La Sentencia 29509, un precio de referencia casi nulo, grandes proveedores que lo regalan y los bloqueos del portal de la DIAN. |
| (c) SECOP | 3,53 | 3,70 (3,48 con los puntajes del investigador) | Sube la intensidad por el indicador del ~60 %. Aparecieron 7 competidores nuevos, pero también un nicho sin atender: mínima cuantía sin RUP. |
| (a) SG-SST | 3,50 | 3,25 | Baja el acceso (los canales son de competidores) y el ajuste (el fundador no es del sector). Aparecieron 4 competidores multicliente, uno en Pitalito. |
| (e) WhatsApp | 3,35 | No se investigó a fondo | — |
| (d) RIPS | 3,30 | No se investigó a fondo | — |

Hay una contradicción que no se debe esconder: con los pesos pedidos, (e) y (d) quedan hoy por encima de (a) y (b). Esto no cambia la recomendación principal, porque (c) va primera con cualquiera de las dos versiones de puntaje. Sí obliga a leer la tabla con cuidado, por tres razones:

1. **Los puntajes de (d) y (e) son probablemente optimistas.** En las tres investigaciones a fondo, mirar más de cerca hizo aparecer más competidores y bajó el puntaje de oportunidad competitiva. Nada indica que (d) y (e) se salvarían de ese patrón: ambas ya tienen documentado un sustituto gratuito.
2. **Las diferencias entre (a), (d) y (e) son menores que un punto en cualquier criterio.** Un punto vale 0,20 en un criterio de peso 20 % y 0,15 en uno de 15 %. La diferencia entre (a) y (e) es de 0,10: es un empate técnico. La ventaja de (c) sobre (e) va de 0,13 a 0,35, más o menos un punto en un criterio: es real, pero modesta.
3. **Un buen puntaje con evidencia débil sigue siendo una hipótesis, también para (c).** Ningún puntaje de esta tabla incluye una entrevista, una preventa o un pago.

La elección de la alternativa (sección 4.12) es, por tanto, una decisión de criterio y se explica allí.

### 2.7 Cómo se llegó a estas cinco: las 15 ideas exploradas

Los puntajes preliminares los asignaron tres investigadores con los mismos siete criterios, a veces con medios puntos. Aquí se recalculan con los pesos pedidos. Como cada investigador aplicó su propio criterio, la comparación entre grupos de ideas es aproximada.

| # | Oportunidad (Resolver… para… mediante… cobrando por…) | Puntaje preliminar ponderado | Veredicto preliminar |
|---|---|---|---|
| 1 | Resolver el cumplimiento de la ley de datos personales (política, autorizaciones y aviso de privacidad) para micro y pequeñas empresas con bases de clientes, mediante un kit o generador de documentos, cobrando por kit. | 2,40 | Descartada: no hay evidencia de pago y hay plantillas gratis, incluida una oficial. |
| 2 (a) | Resolver el seguimiento de estándares mínimos y evidencias del SG-SST de varias microempresas para asesores SST con licencia, mediante software multicliente, cobrando por empresa gestionada al mes. | 3,50 | Preseleccionada y finalista. |
| 3 | Resolver la emisión del tiquete POS electrónico para microcomercios, mediante un POS o facturador simple, cobrando una suscripción mensual. | 2,05 | Descartada: la DIAN ofrece facturación gratuita y muchos microcomercios no están obligados. |
| 4 | Resolver la consulta masiva de listas restrictivas (SAGRILAFT y PTEE) para empresas obligadas y sus oficiales de cumplimiento, mediante consultas por lote con evidencia para auditoría, cobrando por paquete de consultas. | 3,10 | Descartada: riesgo legal de datos personales y venta corporativa sin contactos. |
| 5 (b) | Resolver la descarga, los eventos RADIAN y la conciliación de documentos electrónicos DIAN contra la contabilidad para contadores con varios NIT, mediante una herramienta multi-NIT, cobrando por NIT al mes. | 3,55 | Preseleccionada y finalista. |
| 6 | Resolver la preparación de la información exógena para contadores, mediante software que genera y valida los formatos, cobrando una licencia anual según el número de empresas. | 3,10 | Descartada: es estacional y los grandes ya la incluyen. Podría ser un módulo de (b). |
| 7 | Resolver el cobro de cuotas y la cartera para administradores de propiedad horizontal, mediante software de administración, cobrando por unidad residencial al mes. | 3,00 | Descartada: hay planes gratis, un competidor con capital y una venta lenta. |
| 8 | Resolver la declaración de renta de personas naturales, mediante un servicio o una herramienta en línea, cobrando por declaración. | 2,40 | Descartada: la DIAN la entrega sugerida y gratis, es estacional y exige criterio de contador. |
| 9 (d) | Resolver la generación y validación de RIPS con factura electrónica de salud (CUV) para profesionales independientes y pequeñas IPS, mediante software, cobrando una suscripción mensual por profesional. | 3,30 | Preseleccionada; no se investigó a fondo. |
| 10 (e) | Resolver las inasistencias a citas para consultorios de salud, odontología y estética, mediante recordatorios y confirmación por WhatsApp con agenda en línea, cobrando una suscripción mensual por consultorio. | 3,35 | Preseleccionada; no se investigó a fondo. |
| 11 | Resolver las reservas perdidas y las cancelaciones de último minuto para canchas sintéticas, mediante reservas en línea con pago anticipado, cobrando por cancha al mes. | 2,80 | Descartada: el mercado es diminuto y existe un sustituto gratis (WhatsApp + Bre-B). |
| 12 (c) | Resolver encontrar a tiempo y saber si se cumplen los requisitos de procesos de SECOP para mipymes y contratistas del sur del país, mediante alertas filtradas y análisis "¿cumplo?" de pliegos, cobrando por suscripción o por pliego. | 3,53 | Preseleccionada y finalista. |
| 13 | Resolver la cartera morosa para pymes con cuotas recurrentes (colegios, academias, gimnasios), mediante recordatorios con links de pago y conciliación, cobrando una suscripción mensual. | 3,15 | Descartada: la función ya viene en el software contable y hay un competidor muy capitalizado. |
| 14 | Resolver las comisiones de las apps de domicilios para restaurantes con domicilio propio, mediante catálogo y pedidos por WhatsApp con pago en línea, cobrando una suscripción mensual. | 2,88 | Descartada: abundan las opciones gratis y DiDi ya ofrece canal propio con repartidores. |
| 15 | Resolver la preparación para Saber 11 de colegios privados pequeños y estudiantes de grado 11, mediante simulacros, analítica y planes de estudio, cobrando por estudiante. | 3,15 | Descartada: es estacional, hay incumbentes fuertes y simuladores gratis, y falta el contenido pedagógico. |

Las ideas 13 (cobranza) y 9 (RIPS) empataban con pesos iguales (22 de 35 puntos). Con los pesos pedidos, RIPS queda por encima (3,30 frente a 3,15), así que la preselección es coherente.

### 2.8 Por qué se descartaron las otras diez

| # | Idea | Motivo principal del descarte | Evidencia clave |
|---|---|---|---|
| 1 | Datos personales (kit) | Se vende un documento que se consigue gratis, y la fiscalización a pequeñas empresas es mínima. | La SIC abrió 101 investigaciones en 2025, con corte al 14-ago ([SIC](https://sedeelectronica.sic.gov.co/noticias/por-violacion-las-normas-de-proteccion-de-datos-personales-la-superintendencia-de-industria-y-comercio-ha-iniciado-101-investigaciones-e)) [Hecho]. El registro de bases de datos no aplica a empresas con activos menores a 100.000 UVT ([Actualícese, Decreto 090 de 2018](https://actualicese.com/archivo/decreto-090-de-18-01-2018/)) [Hecho]. Hay plantillas gratuitas ([Buk](https://www.buk.co/blog/politica-de-tratamiento-de-datos-guia-y-plantilla)) y no se encontró ningún precio público de kits. |
| 3 | POS electrónico | Existe un sustituto oficial gratis y gran parte del segmento no está obligado. | La DIAN permite facturar el 100 % de las ventas con su software gratuito ([ABECÉ POS de la DIAN](https://www.dian.gov.co/impuestos/factura-electronica/Documents/Abece-POS-Electronico-documento-equivalente.pdf)) [Hecho]. Alegra POS cuesta desde $25.900 al mes ([Alegra](https://www.alegra.com/colombia/pos/precios/)) [Hecho]. Hay 97 proveedores tecnológicos autorizados. |
| 4 | Listas restrictivas | Riesgo legal eliminatorio y un mercado de unas 8.000 empresas, casi ninguna en el Huila. | La SIC sancionó a Risks International con $190.547.400 por crear una base de antecedentes sin autorización (6-ago-2025) ([SIC](https://sedeelectronica.sic.gov.co/comunicado/la-superintendencia-de-industria-y-comercio-confirmo-sancion-risks-international-sas-por-infraccion-al-regimen-de-proteccion-de-datos)) [Hecho]. La nueva Circular 100-000020 de 2026 sí crea demanda hasta el 31-may-2027 ([Holland & Knight, 15-jul-2026](https://www.hklaw.com/en/insights/publications/2026/07/cambios-en-sagrilaft-y-ptee-en-colombia-por-la-circular-externa)) [Hecho]. |
| 6 | Exógena | Es estacional: la temporada 2026 cerró el 12-jun. Además, los grandes programas contables la generan y los prevalidadores de la DIAN son gratis. | Exógena Pro cobra $199.000–1.690.000 al año ([Exógena Pro](https://exogenapro.com.co/software-exogena-dian/)) [Hecho]. Plazos y formatos en [Alegra](https://blog.alegra.com/colombia/informacion-exogena-2025/). |
| 7 | Propiedad horizontal | Hay planes gratis y un competidor con capital, y la venta pasa por administrador, consejo y asamblea. | Resia es gratis hasta 50 unidades ([Resia](https://resia.cloud/)) y PH Fácil tiene plan gratis y promoción de 6 meses gratis ([PH Fácil](https://phfacil.com/)) [Hecho]. Según un resumen del buscador, ComunidadFeliz entró a Colombia con US$3 millones ([Portea](https://www.portea.com.co/blog/alternativas-a-comunidadfeliz-colombia/)). No hay un conteo de conjuntos en Neiva. |
| 8 | Renta de personas naturales | Hay un sustituto oficial masivo, la temporada termina en octubre y el servicio sin contador tiene riesgo legal. | La DIAN entregó 7.541.910 declaraciones sugeridas en 2025 ([Informe de Gestión DIAN 2025](https://www.dian.gov.co/atencionciudadano/Documents/Informe-de-Gestion-DIAN-2025-30012026-V2.pdf)) [Hecho]. Los vencimientos de 2026 van hasta el 26-oct ([DIAN, comunicado 090](https://www.dian.gov.co/Prensa/Paginas/NG-Comunicado-de-Prensa-090-2026.aspx)). Tributi cobra $149.000–550.000 con contadores certificados ([Tributi](https://www.tributi.com/planes)) [Hecho]. |
| 11 | Canchas sintéticas | El mercado es de decenas de negocios y existe un sustituto gratis. | En el Huila solo 34 establecimientos tienen "SINTETIC" en el nombre ([RUES](https://www.datos.gov.co/resource/nb3d-v3n7.json)) [Hecho, conteo propio]. Las plataformas cobran USD 14–36 por cancha ([Ubitec](https://ubitec.co/)). Los anticipos se pueden cobrar gratis con Bre-B ([Banco de la República](https://www.banrep.gov.co/es/bre-b/que-es)) [Hecho]. |
| 13 | Cobranza | La función ya está incluida en software que la pyme paga, hay un competidor muy capitalizado y una ley que limita el contacto. | Mattilda levantó US$50 millones y trabaja con colegios ([Semana](https://www.semana.com/economia/macroeconomia/articulo/mas-estudiantes-pero-menos-respaldo-financiero-el-panorama-de-los-colegios-privados-en-colombia/202634/)). Treli declara más de 1.500 clientes ([Treli](https://treli.co/)). La Ley 2300 de 2023 limita horarios y canales de cobro ([SISJUR](https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=143903)) [Hecho]. |
| 14 | Restaurantes | Las herramientas son gratis y el gran actor ya ofrece la solución con repartidores. | DiDi Tu Negocio cobra 9,5 % + IVA con repartidores ([DiDi](https://web.didiglobal.com/co/food/restaurantes/didi-tu-negocio/)) y OlaClick es gratis ([OlaClick](https://olaclick.com/es/software-para-restaurantes/)) [Hecho]. |
| 15 | Saber 11 | Es estacional (preparación de febrero a agosto), hay incumbentes y no hay banco de preguntas propio. | 489.880 evaluados en 2025 ([ICFES, ago-2026](https://www.icfes.gov.co/wp-content/uploads/2026/08/NOTA-POLITICA-Doce-an%CC%83os-del-examen-Saber-11.o-4.pdf)). Instruimos cobra $36.000 por estudiante ([Liceo Integrado](https://liceointegrado.edu.co/2026/02/17/pago-pruebas-de-periodo-plataforma-instruimos/)). Hay simuladores gratis ([Filadd](https://filadd.com.co/simulacro_icfes/)) [Hecho]. |

## 3. Análisis de las tres finalistas: cada una sobrevive solo en una versión más estrecha

Las tres finalistas se investigaron con normas, páginas de precios y consultas propias a datos abiertos. En las tres, la versión original de la idea quedó invalidada y solo sobrevivió una versión más angosta. Los puntajes de la sección 2 califican esa versión.

| Finalista | Lo que la evidencia invalidó | Lo que queda vivo |
|---|---|---|
| (c) Alertas SECOP + "¿cumplo?" para mipymes y personas naturales del sur | Las alertas: son un producto barato y SECOP II avisa gratis y antes. Comparar el RUP con el pliego tampoco sirve en mínima cuantía, donde el RUP no se exige. Y a las personas naturales no se les puede escribir en frío con sus datos de SECOP. | Un "¿cumplo?" con revisión humana para invitaciones de mínima cuantía, vendido a mipymes del sur constituidas como sociedad. |
| (a) SG-SST multicliente barato para asesores | El hueco de precio: SafetYA cuesta ≈ $54.000 al mes con 10 licencias y Progresst $49.900 con clientes ilimitados. | Una diferenciación operativa todavía no probada: recordatorios por WhatsApp al empleador y un calendario multicliente que funcione con todas las ARL. |
| (b) Descarga + eventos RADIAN + conciliación, cobrando por NIT al mes | La descarga automática del portal de la DIAN, bloqueada tres veces en 15 meses. Los eventos para varios NIT, que SisteAcuse vende desde ≈ $917 por NIT al mes. La urgencia, que la Sentencia 29509 redujo. | Una conciliación mensual por NIT que quede guardada, sin raspar el portal, para contadores que usan software de escritorio. |

### 3.1 Finalista (c) SECOP: en ~60 % de los procesos de mínima cuantía no gana la oferta más barata

#### Cliente y problema

| Rol | Quién es |
|---|---|
| Segmento inicial | Mipymes constituidas como sociedad (SAS o Ltda.) y domiciliadas en el Huila, el Tolima, el Caquetá o el Putumayo, que presentaron 4 o más ofertas competitivas en 2025, sobre todo de mínima cuantía y de selección abreviada de menor cuantía. Serían ≈ 190 en el Huila y ≈ 450 en los cuatro departamentos [Estimación: a los 280 y 658 oferentes frecuentes se les resta el ~31 % de personas naturales que se observa entre todos los oferentes]. |
| Usuario | Quien arma la oferta: casi siempre el gerente o un auxiliar administrativo. En Neiva casi no se publican cargos de "analista de licitaciones". |
| Comprador y dueño del presupuesto | El dueño o gerente, que lo paga como gasto operativo. Hoy paga con su propio tiempo, con cursos o con herramientas de alertas. |
| Fuera del segmento inicial | Las personas naturales (solo entrarían si llegan por un canal que ellas mismas autorizaron). También las licitaciones de obra y los concursos de méritos, donde compiten empresas más profesionales, con analista propio y entre 19 y 46 oferentes por proceso. Y los oferentes ocasionales, que se presentan una vez al año. |

El problema aparece cada vez que una entidad publica una invitación que encaja con lo que vende la empresa. En el Huila hubo **2.379 procesos competitivos en 2025**, unos 10 por día hábil en todo el departamento, y el 77 % fueron de mínima cuantía. El proponente tiene en mediana **6 días calendario** para leer la invitación, reunir certificados de experiencia, pólizas y documentos, y presentar la oferta. En todo el país, el **36 %** de los procesos de mínima cuantía dio 3 días o menos ([SECOP II – Procesos](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt)) [Hecho].

Equivocarse cuesta el contrato, aunque se tenga el mejor precio: la entidad revisa primero la oferta más barata y, si no cumple, pasa a la siguiente ([Decreto 1860 de 2021](https://www.cancilleria.gov.co/sites/default/files/Normograma/docs/pdf/decreto_1860_2021.pdf)) [Hecho]. El indicador que se construyó con los datos de ofertas sugiere que eso pasa a menudo. En el sur, en **669 de 1.080** procesos de mínima cuantía con dos o más ofertas comparables (61,9 %) el ganador no fue quien ofreció menos; en una muestra nacional, el 58,3 % ([Ofertas por proceso](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOPII-Ofertas-Por-Proceso/wi7w-2nvm)) [Estimación]. El indicador tiene ruido, porque también hay rechazos por precio artificialmente bajo, errores de IVA o de digitación. Prueba que la oferta más barata pierde con frecuencia, no por qué pierde. Además, el **17,7 %** de los procesos de mínima cuantía de 2025 no se adjudicó [Hecho]. Un atenuante importante: los requisitos que no dan puntaje se pueden subsanar ([Colombia Compra Eficiente, base de conocimiento](https://www.colombiacompra.gov.co/base-conocimiento/minima-cuantia-secop-ii)) [Hecho, tomado de un resumen del buscador], lo que reduce el costo de algunos errores.

Hoy el problema se resuelve de cinco maneras:

1. **El gerente lo hace solo.** Probablemente es lo más común: la búsqueda "auxiliar de licitaciones Neiva" en elempleo.com mostró un solo cargo, y era en Bogotá ([elempleo](https://www.elempleo.com/co/ofertas-empleo/trabajo-auxiliar-de-licitaciones-neiva)) [Hecho; que sea lo más común es una Hipótesis].
2. **Con las notificaciones gratuitas de SECOP II.**
3. **Con herramientas pagas**, de $15.900 a $199.000 al mes.
4. **Con cursos**, de $150.000 a $618.800 ([Asesoría en Licitaciones](https://asesorialicitaciones.com/)) [Hecho].
5. **Con un analista de licitaciones**, en empresas medianas, que cuesta de $2,0 a 4,0 millones al mes ([Indeed](https://co.indeed.com/career/analista-de-licitaciones/salaries); [Computrabajo](https://co.computrabajo.com/trabajo-de-analista-de-licitaciones)) [Hecho, salarios de portales de empleo].

Las mipymes **sí ganan**: firmaron el **81 %** de los contratos competitivos de 2025 y el **83 %** del valor de la mínima cuantía. Las personas naturales firmaron el 24 % de los contratos de mínima cuantía ([SECOP II – Contratos](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Contratos-Electr-nicos/jbjy-vk9h)) [Hecho; el campo "es pyme" lo declara el propio proveedor].

| Señales de demanda (muestran el problema, no prueban que alguien pague) | Señales de disposición a pagar (muestran que alguien cobra o paga) |
|---|---|
| 34.920 oferentes activos en 2025, de los cuales 10.287 presentaron 4 o más ofertas. | 13 ofertas con precio público, desde $15.900 al mes hasta $1.890.000 al mes. |
| En ~60 % de las adjudicaciones de mínima cuantía no ganó la oferta más barata. | Licitarus vende análisis por pliego a ≈ $46.000–50.000 ([Licitarus](https://www.licitarus.com/)). |
| El 39 % de los procesos de mínima cuantía tuvo 0 o 1 oferente; en el sur, entre el 40 % y el 67 %. | LicitaYa declara más de 4.150 clientes y Fromus más de 150 pymes (cifras de los propios proveedores). |
| Plazos medianos de 5 días; el 36 % de los procesos da 3 días o menos. | Cursos de licitación de $150.000 a $618.800. |
| El plan oficial del "nuevo SECOP" promete mejores alertas y búsqueda con inteligencia artificial ([Colombia Compra Eficiente](https://operaciones.colombiacompra.gov.co/ciudadanos/nuevo-secop)), lo que reconoce el problema. | Analista de licitaciones de $2,0 a 4,0 millones al mes, sobre todo en Bogotá y Medellín. |
| SECOP II tuvo 12.239 fallas operativas en 2024, según El Tiempo ([El Tiempo, 17-mar-2025](https://www.eltiempo.com/datos/habra-nuevo-secop-y-empezara-en-diciembre-los-claroscuros-de-uno-de-los-contratos-mas-importantes-del-ano-3435569)). | El País Licita cobra $42.560–60.800 al mes, con descuento para afiliados de la Cámara de Comercio de Cali ([El País Licita](https://elpaislicita.com/)). |

#### Mercado y competencia

| Alternativa | Cliente objetivo | Oferta | Precio público | Fortaleza | Limitación |
|---|---|---|---|---|---|
| Notificaciones de SECOP II (Colombia Compra Eficiente) | Todo proveedor registrado | Correo cuando se crea un proceso con su código de producto | Gratis | Oficial y más rápida que los datos abiertos | Solo filtra por código de producto; no resume ni evalúa requisitos |
| [Leadcitaciones](https://www.leadcitaciones.info/precios) | Mipymes | Alertas por correo y WhatsApp, resumen con IA, puntaje de compatibilidad | Gratis con límites; $25.000 al mes | Precio más bajo con WhatsApp e IA | Solo cobra con tarjeta; el operador es una empresa extranjera |
| [LicitIA](https://licitia.com.co/) | Desde personas naturales hasta agencias | Alertas por correo y Telegram; revisa si califica según el RUP; propuestas con IA | $15.900–299.000 al mes; $29.900 el plan para independientes | El más barato que revisa el RUP; no se renueva solo | Sin WhatsApp; se basa en el RUP |
| [LicitaYa!](https://www.licitaya.co/) | Pymes | Alertas y de 3 a 25 análisis con IA al mes; compara el RUP con los requisitos | $49.999–129.999 al mes | Declara más de 4.150 clientes | Se basa en el RUP |
| [Optima](https://contratosoptima.com/) (Pasto) | Mipymes | Alertas cada 2 horas, análisis de competidores, calendario | Desde $129.000 al mes | Competidor del sur del país | No muestra análisis de pliegos |
| [El País Licita](https://elpaislicita.com/) (Cali) | Empresas del suroccidente | Alertas con resumen de requisitos; asistente para pliegos | $60.800 al mes + IVA ($42.560 para afiliados); plan Pro de $160.000 | Respaldo de un periódico y alianza con una cámara de comercio | Enfocado en Cali |
| [Fromus](https://www.fromus.tech/) | Pymes de cinco ciudades grandes | Requisitos habilitantes, análisis financiero, propuesta casi lista | $199.000 al mes + IVA | Análisis profundo | Caro para una micro; no cubre el sur |
| [Licitarus](https://www.licitarus.com/) | Contratistas medianos | Análisis del pliego con IA: si califica y qué le falta | 3 análisis por $150.000; plan Pro de $690.000 al mes | Publica precio por pliego | Caro para una microempresa |
| [ContratoRadar](https://contratoradar.com/) (Cartagena) | Mipymes | Alertas por sector, zona y valor | $49.000 por 30 días | Simple; no se renueva solo | Sin IA, sin RUP y sin WhatsApp |
| Analista de licitaciones en nómina | Empresas medianas | Una persona dedicada | $2,0–4,0 millones al mes | Criterio humano | Costo fijo alto; casi no hay ofertas de ese cargo en Neiva |
| Hacerlo uno mismo, o no hacer nada | Micro y personas naturales | Revisar SECOP a mano y presentarse | Tiempo propio | Gratis, y muchos requisitos se pueden subsanar | Plazos cortos y riesgo de quedar fuera |

**Alcance de la búsqueda.** Se revisaron las páginas de precios de 13 ofertas y se encontraron otras 5 sin precio publicado (secopAI, highteck, Coaxios, secopcolombia.co y CSCOP). Licitum devolvió error 403 y buscasecop.com no cargó. Ningún competidor publica un número de clientes que se pueda verificar. Tampoco se probó la calidad de los análisis de los competidores, porque eso exigía registrarse en sus pruebas gratis, y no se permitía hacerlo en esta investigación.

**Segmento desatendido y ventaja concreta.** Todo lo que sigue son hipótesis.

- **Mínima cuantía.** Casi todos los competidores venden "comparamos su RUP con el pliego". Pero en mínima cuantía el RUP no se exige ([Ley 1150 de 2007, art. 6](https://cancilleria.gov.co/normograma/compilacion/docs/ley_1150_2007.htm)) [Hecho], y esa modalidad es el 69 % de los procesos competitivos. Ninguna oferta revisada se presenta como especialista en mínima cuantía.
- **Poca competencia en el sur.** En el Huila, el 40 % de los procesos tuvo un solo oferente; en el Caquetá y el Putumayo, dos de cada tres [Hecho].
- **Limitar el proceso a mipymes locales.** La norma permite que, si al menos dos mipymes lo piden a tiempo, un proceso de menos de US$125.000 (**$511.708.497 en 2026**) se limite a mipymes, e incluso a las domiciliadas en el departamento o municipio ([Decreto 1860 de 2021](https://www.cancilleria.gov.co/sites/default/files/Normograma/docs/pdf/decreto_1860_2021.pdf); [Beltrán Pardo Abogados, 4-feb-2026](https://www.beltranpardo.com/noticias-juridicas/atencion-umbral-para-limitar-procesos-mipymes-en-2026)) [Hecho]. Ningún competidor anuncia ayuda para hacer esa solicitud.
- **Proveedores de fuera.** Al sur le ofertaron 988 proveedores con domicilio en Bogotá, más que los 673 del Huila [Hecho].

La ventaja del fundador no es tecnológica: es estar en la región y saber convertir los datos abiertos en una conversación personalizada.

#### Mercado inicial accesible, de abajo hacia arriba

La tabla muestra el **gasto potencial si todos los del segmento pagaran**. No es un ingreso alcanzable.

| Escenario | Supuesto | Nacional | Sur (4 departamentos) | Huila |
|---|---|---|---|---|
| Bajo | Solo quienes ofertan 12 o más veces al año, a $25.000 al mes | 4.042 × $25.000 × 12 = **$1.213 millones al año** | 258 × $25.000 × 12 = **$77 millones** | 124 × $25.000 × 12 = **$37 millones** |
| Base | Quienes ofertan 4 o más veces al año, a $50.000 al mes | 10.287 × $50.000 × 12 = **$6.172 millones** | 658 × $50.000 × 12 = **$395 millones** | 280 × $50.000 × 12 = **$168 millones** |
| Alto | Quienes ofertan 4 o más veces al año, a $150.000 al mes | **$18.517 millones** | **$1.184 millones** | **$504 millones** |

Fuente de los conteos: [Ofertas por proceso](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOPII-Ofertas-Por-Proceso/wi7w-2nvm) y [Proveedores registrados](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Proveedores-Registrados/qmzu-gj57) [Hecho]. Los precios son supuestos tomados de los competidores [Estimación].

Para llegar a $1,67 millones al mes, el fundador necesita **34 clientes con el plan de $49.900** o unos **67 análisis al mes a $24.900** [Estimación]. Esos 34 clientes equivalen al **12,1 %** de los oferentes frecuentes del Huila, al **5,2 %** de los del sur o al **0,33 %** de los del país. Una participación del 12 % en el Huila es poco realista para un fundador solo. El sur sirve para empezar y aprender, pero el negocio tendría que volverse nacional.

#### Monetización y operación

| Aspecto | Detalle |
|---|---|
| Oferta inicial | Un análisis "¿cumplo?" de una invitación de mínima cuantía, entregado en 24 horas hábiles: una tabla de requisitos marcados como "cumple", "falta" o "subsanable", más la lista de documentos que faltan, con revisión humana. |
| Resultado por el que el cliente pagaría | No perder un contrato de unos $35–43 millones por un papel, y ahorrar horas de lectura. |
| Modelo de cobro y precios a validar | Por análisis, entre $19.900 y $29.900. Un plan mensual pagado por adelantado de $49.900 (avisos filtrados por municipio y sector, 5 análisis y aviso para pedir la limitación a mipymes). Y un plan trimestral pagado por adelantado, con descuento [Hipótesis]. |
| Costos principales | Inteligencia artificial: ≈ $100–200 por una invitación de 30 páginas y ≈ $400–770 por un pliego de 150 páginas, con las tarifas publicadas por Anthropic ([Anthropic](https://www.anthropic.com/pricing)) [Estimación]. Pasarela de pago: ≈ 5–6 % en un cobro de $50.000 y ≈ 7–9 % en uno de $24.900 [Estimación con tarifas publicadas]. WhatsApp: ≈ $2,7 por mensaje de utilidad. Alojamiento web: USD 4–20 al mes. |
| Margen bruto | De 75 % a 90 % si no hay trabajo humano [Estimación]. Con revisión humana de 20–30 minutos por análisis, el límite son las horas del fundador: caben unos 40–60 análisis al mes. |
| Recurrencia | Débil. El 48,3 % de los oferentes se presentó una sola vez en 2025. Enero de 2026 tuvo 2.471 procesos competitivos, frente a 11.028 en octubre de 2025. Además, quien gana un contrato deja de buscar mientras lo ejecuta ([SECOP II – Procesos](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt)) [Hecho]. Se puede mitigar con pagos trimestrales y la opción de pausar en vez de cancelar. |
| Expansión | Alertas filtradas, la solicitud de limitación a mipymes, precios históricos de adjudicación por entidad, el régimen especial con ofertas (801 procesos en el sur, de hospitales públicos, universidades y empresas de servicios públicos) y luego todo el país. |
| Canal para los primeros 10 clientes | Correos personalizados con datos abiertos a las sociedades del Huila, y luego del resto del sur, al correo corporativo. Un canal gratuito de WhatsApp con procesos abiertos, al que la gente se suscribe por su cuenta. Y, como posibles aliados, la Cámara de Comercio del Huila y la Gobernación ("Compras Públicas Locales"). |
| Ciclo de venta probable | Días: el ticket es bajo y la fecha de cierre del proceso impone la urgencia [Hipótesis]. El cuello de botella es la confianza: el cliente tiene que enviar sus documentos a un desconocido. |
| Qué se puede estandarizar | Una plantilla de requisitos típicos de mínima cuantía, la extracción de requisitos con inteligencia artificial, el formato del informe y la base de proponentes. |
| Qué limita el crecimiento | Las horas de revisión humana, la responsabilidad si se comete un error, el rezago de 1 a 2 días de los datos abiertos y que los pliegos no están en la API (el cliente sube el PDF o se descarga uno por uno). |
| Dependencias | SECOP II: el concurso para el nuevo SECOP figura como cancelado y Colombia Compra Eficiente contrató soporte de SECOP II hasta el 15-dic-2026 [Hecho]. Los términos de uso permiten reutilizar los datos abiertos con atribución (licencia CC BY-SA 4.0), pero bloquean y prohíben el uso masivo y comercial del portal ([Términos y condiciones de SECOP II](https://www.colombiacompra.gov.co/wp-content/uploads/2024/10/cce-gti-idi-05_terminos_y_condiciones_de_uso_del_sistema_electronico_de_contratacion_publica_-_secop_ii_19-11-2021.pdf)) [Hecho]. También depende del proveedor de inteligencia artificial y de las pasarelas de pago. |

#### Evidencia que podría invalidarla

| Evidencia | Qué invalida | Qué deja en pie |
|---|---|---|
| Hay 13 o más competidores, con alertas e IA desde $15.900–25.000 al mes, y uno declara más de 4.150 clientes. | Un negocio basado en alertas. | Un análisis con revisión humana para mínima cuantía, si alguien lo paga. |
| SECOP II avisa gratis cuando se crea el proceso, y los datos abiertos llegan con 1 a 2 días de rezago ([Colombia Compra Eficiente](https://www.colombiacompra.gov.co/archivos/pregunta-frecuente/como-activo-notificaciones-al-correo)). | Competir en velocidad de aviso. | El filtrado fino y el análisis. |
| Solo 756 de 25.970 proveedores del Huila ofertaron en 2025 y solo 280 lo hicieron 4 o más veces. | Un negocio limitado al Huila. | El Huila como punto de partida antes de ir a todo el país. |
| El 48 % de los oferentes se presenta una vez al año, y enero es el mes más flojo. | Una suscripción mensual como único modelo. | El cobro por análisis y los planes trimestrales. |
| Las invitaciones de mínima cuantía son cortas y los requisitos que no dan puntaje se pueden subsanar. | El "¿cumplo?" si los clientes dicen que lo resuelven solos. | Nada, si eso se confirma: sería la señal para abandonar. |
| Riesgo de plataforma: el futuro del SECOP en 2027 es incierto. | Un software atado al portal. | Un servicio basado en documentos que el cliente aporta. |

### 3.2 Finalista (a) SG-SST para asesores: el hueco de precio ya lo ocupan SafetYA y Progresst

#### Cliente y problema

| Rol | Quién es |
|---|---|
| Segmento inicial | Asesor SST independiente, con licencia vigente, que atiende 5 o más microempresas (hasta 10 trabajadores, riesgo I a III), ojalá afiliadas a distintas ARL y en ciudades intermedias. |
| Usuario | El asesor. El empleador solo subiría evidencias desde el celular. |
| Comprador | El asesor o el dueño de una microconsultora. Hay 881 sociedades activas con "SST" o "salud ocupacional" en el nombre, 16 de ellas en el Huila ([RUES, datos.gov.co](https://www.datos.gov.co/resource/c82u-588k.json)) [Hecho, conteo propio]. |
| Dueño del presupuesto | El asesor, con cargo al honorario que cobra a cada micro: $249.000–349.000 al mes según precios publicados ([Mentora](https://mentoracolombia.com/sst); [Cuidamos](https://cuidamos.com.co/planes-sgsst/), esta última según un resumen del buscador). En contratos públicos del Huila, el honorario mediano de un profesional SG-SST es de $3,5 millones al mes ([SECOP II – Contratos](https://www.datos.gov.co/resource/jbjy-vk9h.json)) [Hecho, consulta propia]. |

El problema es un calendario continuo que se multiplica por cada cliente. El SG-SST incluye:

- la autoevaluación de estándares en diciembre;
- el registro anual en la plataforma del Ministerio de Trabajo, cuyo plazo en 2026 fue el **31 de julio** según la Circular 0027 ([Actualícese, 24-abr-2026](https://actualicese.com/mintrabajo-establece-calendario-2026-del-sistema-de-gestion-de-seguridad-y-salud-en-el-trabajo-sg-sst/)) [Hecho];
- el informe de avance a la ARL en julio;
- la investigación de cada accidente en 15 días;
- y la conservación de registros por 20 años [Hecho, tomado de resúmenes del buscador sobre el Decreto 1072, porque Función Pública devolvió error 503].

La carga no baja. La Resolución 1843 de 2025 cambió las evaluaciones médicas, y la Resolución 4179 de 2025 permite inspecciones sin previo aviso desde noviembre de 2025 ([Buk](https://www.buk.co/blog/resolucion-4179-2025-inspeccion-laboral-colombia)) [Hecho, fuente secundaria].

Para una microempresa, la consecuencia es una multa de **1 a 5 SMMLV** (≈ $1,75–8,75 millones) por incumplir normas de SST, según la tabla del Decreto 472 de 2015 que publica [Verifty (19-jul-2026)](https://www.verifty.com/blog/multas-sanciones-sst-ministerio-trabajo-2026) [Hecho, fuente secundaria; el texto oficial devolvió error 503]. La fiscalización existe en la región: el Ministerio de Trabajo multó a la Alcaldía de Neiva con más de $831 millones por seis cargos del SG-SST, y la multa quedó en unos $350 millones tras la apelación ([La Voz de la Región, 3-ago-2026](https://lavozdelaregion.co/persisten-sanciones-laborales-contra-la-alcaldia-de-neiva/)) [Hecho]. Eso prueba que se fiscaliza en el Huila, pero no dice nada sobre el riesgo de una micro privada.

Hoy el problema se resuelve de varias formas:

- con plantillas de Excel de pago único ($110.000–220.000);
- con las herramientas gratis de cada ARL, que funcionan por empresa afiliada;
- con software pagado;
- con consultoras que cobran el servicio completo;
- o contratando personal: en Neiva se ofrecían $1.750.905 al mes por un auxiliar HSE y $2.000.000 por un profesional SST ([Computrabajo Neiva](https://co.computrabajo.com/trabajo-de-profesional-sst-en-neiva)) [Hecho].

| Señales de demanda (no prueban que alguien pague) | Señales de disposición a pagar |
|---|---|
| 1.234.903 empresas afiliadas a riesgos laborales, todas obligadas a tener SG-SST ([Fasecolda, 24-sep-2025](https://www.fasecolda.com/wp-content/uploads/COMUNICADO-CONVENCION_vf24092025-1.pdf)). | CumpleSST cobra $790.000 + IVA al mes por hasta 5 empresas, unos $188.000 por empresa con IVA ([CumpleSST](https://cumplesst.com/)). |
| 171.571 licencias SST expedidas entre 2013 y junio de 2022, 5.316 de ellas en el Huila ([SafetYA](https://safetya.co/cuantas-licencias-de-salud-ocupacional-hay-en-colombia/)). | SafetYA cobra $649.000 al año por su plan para prevencionistas, con "10 licencias" ([SafetYA](https://safetya.co/membresia/)). |
| El Valle del Cauca expidió 1.247 licencias a personas naturales en 2025 ([UESVALLE](https://www.datos.gov.co/resource/8fgr-ag38.json)). | Progresst cobra $49.900 al mes en su plan para asesores ([Progresst](https://sstmasterpro.com/)). |
| Cinco proveedores venden planes "consultor" o "asesor", señal de que perciben demanda. | Los asesores cobran $249.000–349.000 al mes por cada micro. |
| Muchos artículos sobre la Circular 0027 entre febrero y julio de 2026. | Las plantillas de Excel de FLT Ingeniería declaran más de 1.200 compradores ([FLT](https://www.fltingenieriasas.com/producto/plantilla-en-excel-sg-sst/)); la cifra es del vendedor. |

#### Mercado y competencia

| Alternativa | Cliente objetivo | Oferta | Precio público | Fortaleza | Limitación |
|---|---|---|---|---|---|
| [CumpleSST](https://cumplesst.com/) | Empresas y consultores | Diagnóstico según la Resolución 0312, repositorio por empresa, alertas antes de cada vencimiento | $99.000 / $299.000 / $790.000 (hasta 5 empresas) + IVA al mes | Precio claro y vista de todas las empresas | ≈ $188.000 por empresa: caro frente al honorario de una micro |
| [SafetYA](https://safetya.co/membresia/) | Prevencionistas independientes | Software más academia, alertas legales, matrices | $649.000 al año (≈ $54.083 al mes) | Marca de contenido con 58,6 mil suscriptores en [YouTube](https://www.youtube.com/@SafetYA) | No queda claro si 10 licencias equivalen a 10 empresas |
| [Progresst](https://sstmasterpro.com/) | Asesores con muchos clientes | Evaluaciones, capacitación, matrices con IA | $49.900 al mes, clientes ilimitados | Muy barato | No cubre la gestión completa del sistema |
| [HoldingSoft+](https://holdingsoft.org/precios) | Consultoras ISO y SST | Más de 40 aplicaciones, incluida la autoevaluación de la Resolución 0312 | USD 30–300 al mes por organización | Amplitud y programa de aliados | Cobra en dólares y por organización |
| [SG-SST APP](https://appsgsst.com/precios) (Pitalito) | Empresas y profesionales SST | Registro de "todos tus clientes", plan anual, investigación de accidentes | No publica precios | Competidor local en el Huila | El sitio parece desactualizado (© 2020) [Hipótesis] |
| [Verifty](https://www.verifty.com/sst-colombia) | Empresas | Plan gratis con 9 módulos; programa para especialistas | Gratis; los planes pagos no muestran precio | Fija la expectativa de "gratis" | Venta mediante demostración |
| Alissta (ARL Positiva) y herramientas de otras ARL | Empresas afiliadas a cada ARL | Autoevaluación, plan anual, matrices | Gratis ([manual de Alissta](https://portalvida.positiva.gov.co/documents/2978451/4622490/Manual_de_usuario_alissta+%28Gestion%29+Empresas.pdf/69d3b630-d83a-5ee0-3d4c-69c518522a63?t=1751550741623)) | Gratis y oficial; Positiva atiende 515.000 empresas ([La República](https://amp.larepublica.co/empresas/positiva-acelera-su-apuesta-en-salud-microseguros-y-pensiones-para-2026-4278797)) | Una cuenta por empresa (por NIT) y solo para afiliados de esa ARL |
| Plantillas de Excel ([FLT](https://www.fltingenieriasas.com/producto/plantilla-en-excel-sg-sst/)) | Profesionales y empresas | 21 o 60 estándares | $110.000–220.000, pago único | Barato y sin mensualidad | Sin recordatorios ni trazabilidad |
| Empleado interno | Empresas medianas | Auxiliar o profesional SST | $1,75–2,0 millones al mes en Neiva | Dedicación completa | No es viable para una micro |
| No hacer nada | Microempresas | Asumir el riesgo | $0 | Sin costo inmediato | Multa de 1 a 5 SMMLV si hay inspección |

**Alcance de la búsqueda.** Se revisaron las páginas de precios de 12 proveedores, un catálogo de software y el manual de Alissta. No se encontraron reseñas independientes, y no se pudieron consultar Facebook ni LinkedIn porque exigen iniciar sesión. Puede haber más desarrollos de consultoras regionales que no aparecen en los buscadores.

**Segmento desatendido y ventaja.** El candidato es el asesor de ciudad intermedia con entre 5 y 30 microempresas cliente, repartidas en varias ARL. Las herramientas de las ARL exigen una cuenta por NIT ([manual de Alissta](https://portalvida.positiva.gov.co/documents/2978451/4622490/Manual_de_usuario_alissta+%28Gestion%29+Empresas.pdf/69d3b630-d83a-5ee0-3d4c-69c518522a63?t=1751550741623)) [Hecho], y no se encontró ningún competidor que envíe recordatorios por WhatsApp al empleador para que suba sus evidencias. Ese es un resultado negativo de búsqueda, no una prueba de que no exista. La ventaja de ser local en el Huila **no es exclusiva**, porque SG-SST APP opera desde Pitalito.

#### Mercado inicial accesible, de abajo hacia arriba

| Escenario | Asesores que pagarían | Empresas por asesor | Precio por empresa al mes | Mercado mensual | Mercado anual | Huila (3,1 %), mensual |
|---|---|---|---|---|---|---|
| Bajo | 3.000 | 5 | $8.000 | $120 millones | $1.440 millones | $3,7 millones |
| Base | 8.000 | 8 | $12.000 | $768 millones | $9.216 millones | $23,8 millones |
| Alto | 15.000 | 12 | $15.000 | $2.700 millones | $32.400 millones | $83,7 millones |

Todos son supuestos [Estimación]:

- **Número de asesores.** El escenario bajo parte de los 2.176 contratistas SG-SST de SECOP más las 881 consultoras. Los escenarios base y alto suponen el 5 % y el 9 % de los 171.571 licenciatarios históricos.
- **Empresas por asesor.** Salen de los paquetes de los competidores (5 en CumpleSST y la afirmación de "10–30 clientes" de HoldingSoft).
- **Mercado anual.** Es el mensual multiplicado por 12.

Para la meta harían falta **112 empresas a $15.000 o 167 a $10.000**, es decir, unos **14 a 21 asesores** con 8 empresas cada uno. El mercado no es la restricción. El supuesto más débil es cuántas empresas atiende cada asesor: no hay datos, y en SECOP solo el **4 %** de los contratistas SG-SST (87 de 2.176) trabajó para dos o más entidades públicas ([SECOP II – Contratos](https://www.datos.gov.co/resource/jbjy-vk9h.json)) [Hecho, consulta propia]. Ese dato no muestra la cartera privada de los asesores.

#### Monetización y operación

| Aspecto | Detalle |
|---|---|
| Oferta inicial | Un calendario multicliente con los vencimientos de cada empresa y recordatorios por WhatsApp para que el empleador suba fotos de capacitaciones, listas de asistencia y certificados, sin crear cuenta. |
| Resultado por el que se pagaría | Que el asesor deje de perseguir evidencias y pueda atender más empresas sin contratar una asistente. |
| Modelo y precio a validar | Entre $9.000 y $15.000 por empresa activa al mes (mínimo 3), o una tarifa plana de $49.000–79.000 al mes hasta 10 empresas [Hipótesis]. |
| Costos y margen | Alojamiento desde USD 4 al mes ([DigitalOcean](https://www.digitalocean.com/pricing/droplets)). Unos 1.400 mensajes de WhatsApp al mes cuestan ≈ USD 1,1. La pasarela cobra ≈ 5 %. Margen bruto estimado de 85–92 % [Estimación]. |
| Trabajo por cliente | Configuración inicial de 1 a 3 horas por asesor y luego entre media hora y una hora al mes. Con 20 horas por semana, el fundador podría atender unos 20 asesores [Hipótesis]. |
| Recurrencia y expansión | Recurrencia mensual, y el ingreso crece con cada cliente nuevo del asesor. Hay módulos adicionales posibles (batería psicosocial, plan de seguridad vial). El riesgo es la cancelación, que en referencias internacionales ronda el 6 % mensual. |
| Canal para 10 clientes | Contenido corto sobre "cómo llevar 10 micro clientes sin perder evidencias", ligado al pico de diciembre. Un calendario 2027 en Excel, gratis, a cambio del contacto. Participación en páginas y grupos de SST respetando sus reglas, y alianzas con cursos de 50 horas. Para conseguir 10 clientes harían falta entre 55 y 110 asesores en prueba [Estimación]. |
| Ciclo de venta | De días: decide una sola persona y el ticket es bajo. El cuello de botella es la confianza, porque el fundador no es del sector. Un socio o embajador con licencia ayudaría [Hipótesis]. |
| Qué se puede estandarizar | Plantillas de 7, 21 y 60 estándares, el calendario anual, los vencimientos por empresa y los formatos. |
| Qué limita el crecimiento | Los datos de salud de los trabajadores: no se debe guardar la historia clínica, que custodia el prestador según la Resolución 1843. Los portales del Ministerio de Trabajo y de las ARL no tienen API, y el calendario cambia cada año por circular. |

#### Evidencia que podría invalidarla

| Evidencia | Qué invalida |
|---|---|
| SafetYA ofrece 10 licencias por ≈ $54.000 al mes, con formación incluida, y Progresst cuesta $49.900 al mes con clientes ilimitados. | La idea de competir por precio bajo por empresa. |
| Las ARL dan herramientas gratis y Positiva cubre ≈ 42 % de las empresas afiliadas. | Que la micro necesite pagar por un software. |
| SG-SST APP es un competidor multicliente en Pitalito. | La idea de que ser "local en el Huila" sea una ventaja única. |
| Solo el 4 % de los contratistas públicos de SG-SST atiende más de una entidad. | El supuesto de que hay muchos asesores con 10–30 clientes, si se repite en el sector privado. |
| Las marcas con audiencia (SafetYA, HSEQ Nueva Visión) son también competidoras. | El acceso barato a los clientes. |

### 3.3 Finalista (b) Conciliación DIAN para contadores: los grandes la regalan y el portal bloquea los robots

#### Cliente y problema

| Rol | Quién es |
|---|---|
| Segmento inicial | Contador independiente o firma pequeña que lleva entre 5 y 30 NIT con compras a crédito y trabaja con software de escritorio o con varios programas (World Office, Helisa, ContaPyme, Excel). |
| Usuario | El contador o su auxiliar. |
| Comprador | El contador o el dueño de la firma. |
| Dueño del presupuesto | Sale de los honorarios mensuales. Un proveedor estima $600.000–1.200.000 al mes por pyme ([SisteAcuse, blog](https://sisteacuse.com/blog/honorarios-servicios-contables-colombia-2026)) [Estimación de proveedor]. |

El problema aparece en cada cierre mensual. La ley exige al comprador **solo dos eventos**, el acuse de la factura (030) y el recibo del bien o servicio (032), y **solo en las compras a crédito o con plazo**, para que la factura sirva de soporte de costos, deducciones e IVA descontable ([art. 616-1 del Estatuto Tributario, Secretaría del Senado](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr025.html)) [Hecho]. La aceptación (033) es un requisito comercial para que la factura funcione como título valor ([Resolución DIAN 85 de 2022](https://normograma.dian.gov.co/dian/compilacion/docs/resolucion_dian_0085_2022.htm)) [Hecho], no un requisito tributario. Además, el Consejo de Estado anuló en julio de 2025 la doctrina de la DIAN que exigía enviar los eventos antes de pedir el IVA y en el mismo período ([INCP, 17-jul-2025](https://incp.org.co/publicaciones/infoincp-publicaciones/impuestos/2025/07/acuse-de-recibo-de-la-factura-electronica-para-descontar-el-iva-consejo-de-estado-anulo-interpretacion-de-la-dian/)) [Hecho, fuente secundaria: la sentencia no se leyó]. El incentivo existe, pero **no hay un plazo mensual**. Conciliar los documentos de la DIAN contra la contabilidad es una buena práctica que firmas como Forvis Mazars venden como servicio ([Forvis Mazars](https://www.forvismazars.com/co/es/acerca-de-nosotros/noticias-publicaciones-y-media/nuestras-publicaciones/outsourcing/conciliacion-token-dian-y-documentos-electronicos)), no una obligación legal.

La DIAN sí cruza la factura electrónica: en 2025 envió 17.174 oficios por "transacciones exorbitantes" y un extracto fiscal mensual a 847.292 emisores ([Informe de Gestión DIAN 2025](https://www.dian.gov.co/atencionciudadano/Documents/Informe-de-Gestion-DIAN-2025-30012026-V2.pdf)) [Hecho].

Hoy el contador entra al portal por cada NIT, exporta el listado por semanas (la DIAN muestra páginas de 150 documentos), baja los XML que faltan y marca los eventos. El costo se puede aproximar con el sueldo de un auxiliar contable en Neiva, de $1,5 a 2,5 millones al mes [Estimación, tomada de resúmenes del buscador sobre [elempleo](https://www.elempleo.com/co/ofertas-empleo/trabajo-auxiliar-contable-neiva)]. Si la tarea toma de 1 a 3 horas por NIT al mes, costaría unos $15.000–63.000 por NIT al mes, pero esas horas son un supuesto no medido [Hipótesis].

| Señales de demanda | Señales de disposición a pagar |
|---|---|
| Tutoriales y guías de proveedores sobre cómo descargar facturas de la DIAN. | QFe cobra $500.000–600.000 al año ([QFe](https://qfecollector.com/)). |
| Forvis Mazars recomienda conciliar cada mes. | SisteAcuse declara más de 240 clientes y vende planes para contadores ([SisteAcuse](https://sisteacuse.com/)). |
| La DIAN cruza cada vez más la factura electrónica. | N1 declara más de 1.000.000 de facturas procesadas, a $750 por documento ([N1](https://www.n1.app/)). |
| Algunas ofertas de empleo de auxiliar contable mencionan los eventos de acuse (resúmenes del buscador). | Kontalid Elite incluye "Conciliación DIAN" por $527.700 al año ([Kontalid](https://www.kontalid.com/info/lector-xml-pro/)). |

#### Mercado y competencia

| Alternativa | Cliente objetivo | Oferta | Precio público | Fortaleza | Limitación |
|---|---|---|---|---|---|
| [QFe Collector](https://qfecollector.com/) | Empresas y contadores | Programa de Windows: descarga, eventos por lotes, auditoría RADIAN | $500.000–600.000 al año | Funciona en el computador del usuario y no guarda sus claves | Depende del acceso al portal |
| [SisteAcuse](https://sisteacuse.com/) | Empresas y contadores | Eventos masivos y acuse automático | $250.000 al año por 10 empresas; $550.000 por 50 | ≈ $917–2.083 por NIT al mes | Envía la aceptación (033) por defecto, con riesgo comercial para el cliente |
| [Kontalid](https://www.kontalid.com/info/lector-xml-pro/) | Contadores | Lector de XML y "Conciliación DIAN" | $167.700–527.700 al año, más $150.000 por cada empresa con certificado | Ya concilia | La conciliación "no se guarda" y hay que repetirla |
| [N1](https://www.n1.app/) | Firmas de contabilidad y contadores | Importa de la DIAN o del correo, extrae con IA, envía eventos y prepara la causación | $750–900 por documento | Se integra con Siigo, Alegra y World Office | Cobra por volumen; se apoya en un proveedor tecnológico |
| [Alegra](https://www.alegra.com/colombia/contadores/) | Pymes; contadores gratis | Sincronización con la DIAN, buzón, eventos, "conciliación fiscal" | Gratis para el contador | Más de 1.700 firmas | Sirve solo si el cliente usa Alegra |
| [Siigo Contador](https://www.siigo.com/precios-siigo/) | Contadores | Varias empresas en un solo tablero | $535.900 al año con empresas ilimitadas | Incumbente | Su página no menciona la importación desde la DIAN |
| [consultorcontable](https://www.consultorcontable.com/descargador-xml-fe/) | Contadores | Extensión para el navegador: listado de 65 campos y XML | $249.000 al año | Barato | "No aplican devoluciones" si la DIAN bloquea la consulta |
| [World Office](https://www.worldoffice.com.co/planesEscritorio.html) | Contadores y pymes | Licencia de escritorio para varias empresas | $809.200 + 15 % anual de renovación | Muy usado en escritorio | La recepción de documentos solo está en planes superiores (según un resumen del buscador) |
| Portal DIAN y un auxiliar | Todos | Listado, consulta por factura y eventos uno a uno | Gratis, más $1,5–2,5 millones al mes de sueldo | Oficial | Trabajo manual y bloqueos contra la automatización |
| [Forvis Mazars](https://www.forvismazars.com/co/es/acerca-de-nosotros/noticias-publicaciones-y-media/nuestras-publicaciones/outsourcing/conciliacion-token-dian-y-documentos-electronicos) | Medianas y grandes empresas | Conciliación como servicio externo | Por cotización | Firma reconocida | Fuera del alcance de una pyme |

**Segmento desatendido.** Sería el contador con software de escritorio o con clientes en varios programas, que necesita cada mes, por NIT, una lista guardada de lo que la DIAN tiene y su contabilidad no (y al revés), más las compras a crédito sin los eventos 030 y 032. Hoy hay piezas sueltas: Kontalid concilia, pero no guarda el resultado; N1 ya se integra con World Office; y SisteAcuse vende eventos para muchos NIT a precio casi nulo ([Kontalid](https://www.kontalid.com/info/lector-xml-pro/); [N1](https://www.n1.app/)). La ventaja tendría que ser integración, historial y simplicidad, no una función nueva [Hipótesis sin evidencia directa].

#### Mercado inicial accesible, de abajo hacia arriba

| Supuesto | Bajo | Base | Alto |
|---|---|---|---|
| NIT de partida | 79.627 (pequeñas y medianas en el RUES) | 847.292 (emisores con extracto fiscal DIAN) | 1.519.707 (facturadores acumulados) |
| % atendido por contador independiente y con compras a crédito | 40 % | 35 % | 40 % |
| NIT direccionables | 31.851 | 296.552 | 607.883 |
| Precio por NIT al mes | $5.000 | $15.000 | $35.000 |
| Mercado anual | ≈ $1.911 millones | ≈ $53.379 millones | ≈ $255.311 millones |

Los porcentajes y precios son supuestos [Estimación]; los universos salen del [Informe de Gestión DIAN 2025](https://www.dian.gov.co/atencionciudadano/Documents/Informe-de-Gestion-DIAN-2025-30012026-V2.pdf) y de los datos de Confecámaras citados en las notas. Como el precio por NIT está bajando hacia cero, para un recién llegado lo realista es el escenario bajo o un punto intermedio. La meta exige entre 43 y 355 NIT según el precio, es decir, **entre 4 y 35 contadores**. En Neiva habría unos 100 contadores objetivo [Hipótesis].

#### Monetización y operación

| Aspecto | Detalle |
|---|---|
| Oferta inicial | Por cada NIT: un buzón de recepción, la carga mensual del Excel de la DIAN y del auxiliar contable, y un informe con tres columnas (está en la DIAN y no en la contabilidad; está en la contabilidad y no en la DIAN; hay diferencias de valor), más la lista de compras a crédito sin 030 y 032. |
| Precio a validar | Variante A: $12.000 por NIT al mes, con un mínimo de 5 NIT. Variante B: $990.000 al año hasta 15 NIT. Un precio de $40.000 o más por NIT es improbable frente a SisteAcuse [Hipótesis]. |
| Costos y margen | Infraestructura de menos de $40.000 al mes y margen bruto superior al 85 % [Estimación]. Si se usa la ruta con certificados, el cliente pagaría unos $150.000–190.000 por NIT al año ([Kontalid](https://kontalid.com.co/anuncios-general); [ConCertificado](https://concertificado.com/blog/certificado-digital-dian-gratis-vs-pago/)). |
| Trabajo por cliente | Configuración de 1 a 2 horas por NIT la primera vez (cambio del correo de recepción, certificados, formatos de cada programa). |
| Recurrencia y expansión | Mensual por naturaleza. Se podría añadir un módulo de exógena (de abril a junio de 2027), conciliación bancaria y revisión de retenciones. |
| Canal para 10 clientes | Contenido sobre "qué compras a crédito no tienen 030 y 032 después de la Sentencia 29509", una plantilla de conciliación gratuita, una preventa a 20–30 contadores, una charla en ASCONPHU ([ASCONPHU](https://www.asconphu.org/quienessomos/)) y grupos de contadores en Facebook. Ciclo estimado de 1 a 3 semanas [Hipótesis]. |
| Dependencias | No existe un servicio oficial de la DIAN para listar los documentos recibidos ([Anexo Técnico 1.9](https://www.dian.gov.co/impuestos/factura-electronica/Documents/Anexo-Tecnico-Factura-Electronica-de-Venta-vr-1-9.pdf)) [Hecho]. Ser proveedor tecnológico exige constituir una sociedad, tener un patrimonio de 20.000 UVT (≈ $1.047 millones) y la certificación ISO 27001 ([Resolución DIAN 165 de 2023](https://normograma.dian.gov.co/dian/compilacion/docs/resolucion_dian_0165_2023.htm)) [Hecho]. Eso es inviable para el fundador. |

#### Evidencia que podría invalidarla

| Frente | Evidencia | Efecto |
|---|---|---|
| Plataforma | Un CAPTCHA del 18-jun-2026 bloqueó toda descarga automática. Desde el 28 y el 30-jul-2026 se exige el NIT y la DIAN bloquea "robots, automatizaciones o agentes de inteligencia artificial" ([Kontalid](https://kontalid.com.co/anuncios-general); [Actualícese, 27-jul-2026](https://actualicese.com/dian-implementara-nuevo-control-de-seguridad-para-consultar-facturas-electronicas/)). | Invalida cualquier producto que dependa de raspar el portal. |
| Incumbentes | Alegra es gratis para el contador, Siigo Contador Ilimitado cuesta $535.900 al año y N1 se integra con World Office. | Invalida la idea para contadores cuyos clientes usan Alegra o Siigo. |
| Precio | SisteAcuse cobra ≈ $917–2.083 por NIT al mes y Kontalid ya concilia. | Invalida cobrar $40.000 por NIT; obliga a demostrar una diferencia real para cobrar $10.000–15.000. |
| Urgencia | Sentencia 29509 de 2025 ([Actualícese, 17-jul-2025](https://actualicese.com/consejo-de-estado-anula-doctrina-de-la-dian-sobre-acuses-de-recibo-en-factura-electronica/)). | Invalida el argumento de "acepte en 3 días o pierde el IVA". |
| Seguridad | Guardar las claves o certificados de decenas de NIT expone su información tributaria si hay una filtración. | Sube el costo de confianza y de cumplimiento. |

## 4. Plan de validación: diez pagos reales en 30 días o se abandona

Todo lo que sigue debe ejecutarlo el fundador. En esta investigación no se contactó a nadie, no se publicó nada, no se abrió ninguna cuenta y no se compró nada. El plan no construye el producto: vende un servicio manual para averiguar si alguien paga. El mejor momento para hacerlo es ahora, porque octubre y noviembre son el pico anual de procesos competitivos (11.028 y 10.708 en 2025, frente a 2.471 en enero de 2026) ([SECOP II – Procesos](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt)) [Hecho].

### 4.1 Cliente inicial definido con precisión

El cliente inicial es una **mipyme constituida como sociedad (SAS o Ltda.)** con estas características:

- tiene domicilio registrado en el Huila (primera ola) o en el Tolima, el Caquetá o el Putumayo (segunda ola);
- presentó **4 o más ofertas** en modalidades competitivas de SECOP II en 2025, sobre todo de **mínima cuantía**;
- su correo registrado es **corporativo**;
- y quien decide la compra es el gerente o representante legal, que suele preparar las ofertas él mismo y paga con caja de la empresa.

Son unas **190 empresas en el Huila** y unas **270 más** en los otros tres departamentos [Estimación: 280 y 658 oferentes frecuentes, menos ≈ 31 % de personas naturales]. Quedan fuera del contacto en frío las personas naturales y cualquier correo que parezca personal (por ejemplo, un Gmail con nombre propio). Esas personas solo entran si llegan por su cuenta a un canal que ellas mismas autorizaron.

### 4.2 Propuesta de valor en una frase

> "Antes de que cierre la invitación, le digo en 24 horas hábiles si su empresa cumple cada requisito de un proceso de mínima cuantía y qué documento le falta, para que su oferta no quede por fuera por un papel."

### 4.3 Oferta mínima vendible: un servicio manual, sin programar el producto

**Análisis "¿Cumplo?" de mínima cuantía.** Funciona así:

1. El cliente envía el número o el enlace del proceso y una carpeta con sus documentos habituales: RUT, certificado de existencia, certificados de experiencia y, si aplica, estados financieros y pólizas.
2. El fundador descarga la invitación, un proceso a la vez y a mano, sin automatizar el portal.
3. Usa inteligencia artificial **solo sobre la invitación, que es un documento público**, para extraer la lista de requisitos.
4. Compara a mano cada requisito con los documentos del cliente. Así evita enviar datos personales del cliente a un proveedor externo de inteligencia artificial, lo cual es una precaución [Hipótesis] y no una conclusión jurídica.
5. Entrega una tabla de una página con cuatro columnas (requisito; ¿cumple?: sí, no, falta documento o subsanable; qué hacer; fecha límite).
6. Cuando aplique, añade un aviso sobre la posibilidad de pedir que el proceso se limite a mipymes locales. Esa solicitud exige que la hagan al menos dos mipymes dentro del término de observaciones ([Decreto 1860 de 2021](https://www.cancilleria.gov.co/sites/default/files/Normograma/docs/pdf/decreto_1860_2021.pdf)) [Hecho].

El informe lleva una nota visible: "Revisión documental. No es un concepto jurídico. La decisión de presentarse y la responsabilidad por la oferta son del proponente."

**Plan Sur (prueba de 30 días).** Incluye hasta 5 análisis y un mensaje de WhatsApp en los días hábiles con los procesos abiertos en los municipios y el sector del cliente. El fundador los arma a mano con búsquedas en SECOP II o con las notificaciones que el propio cliente le reenvía. Incluye también el aviso de oportunidades para pedir la limitación a mipymes. Se paga por adelantado y **no se renueva solo**, una práctica que ya usan LicitIA y ContratoRadar ([LicitIA](https://licitia.com.co/); [ContratoRadar](https://contratoradar.com/)) [Hecho].

Para montar esto solo hacen falta herramientas gratuitas: un formulario con aviso de privacidad, una carpeta compartida, WhatsApp Business y una plantilla de informe. Además, un script propio para armar la lista de prospectos desde datos abiertos. Ese script es una herramienta de prospección, no el producto.

### 4.4 Precio inicial a probar y su fundamento

| Oferta | Precio de lanzamiento | Fundamento |
|---|---|---|
| Análisis suelto | **$24.900** | Es cerca de la mitad del análisis por pliego de Licitarus (3 por $150.000, unos $50.000 cada uno) ([Licitarus](https://www.licitarus.com/)), pero incluye revisión humana y se concentra en invitaciones cortas. Es menos del 0,1 % de un contrato promedio de mínima cuantía en el Huila ($34,7 millones). Queda por encima de lo que se cobra por alertas ($25.000 al mes en Leadcitaciones), porque vende otro resultado. |
| Plan Sur, 30 días | **$49.900** | Igual al plan básico de LicitaYa ($49.999) y a ContratoRadar ($49.000) ([LicitaYa](https://www.licitaya.co/); [ContratoRadar](https://contratoradar.com/)). Por debajo de Optima ($129.000) y Fromus ($199.000). Pagar 3 análisis sueltos costaría más ($74.700), lo que empuja hacia el plan. |
| Regla de ajuste | Subir a $34.900 después de las primeras 10 ventas | Si ninguno de los primeros diez compradores objeta el precio, probablemente está bajo [Hipótesis]. |

Cuenta de la meta: $1,67 millones al mes equivalen a **67 análisis a $24.900** o a **34 planes a $49.900** [Estimación]. Con 20 a 30 minutos por análisis, 67 análisis exigen entre 22 y 34 horas al mes de las 80 disponibles.

### 4.5 Plan semana a semana

| Semana | Objetivo | Actividades | Métricas (meta) | Gasto estimado |
|---|---|---|---|---|
| 1 (días 1 a 7) | Preparar sin construir el producto | Sacar o revisar el RUT y agendar una consulta con un contador (ver 4.11). Armar la lista de prospectos con datos abiertos: sociedades domiciliadas en el sur con 4 o más ofertas en 2025, con su NIT, número de ofertas, contratos ganados y códigos de producto; descartar personas naturales y correos personales. Calibrar el servicio con 10 análisis de procesos ya cerrados del Huila (por ejemplo CO1.BDOS.7795476 y CO1.BDOS.7860636), comparándolos con el informe de evaluación real y midiendo los minutos de cada uno. Preparar la plantilla del informe, el formulario con aviso de privacidad y autorización, la cuenta de pasarela como persona natural, la llave Bre-B y WhatsApp Business. Escribir una página sencilla con la oferta. | 150 o más sociedades con correo corporativo válido; 10 análisis de calibración; 8 de 10 coinciden con la evaluación real; minutos por análisis. | $110.000–416.890 (contador, matrícula y dominio opcionales, inteligencia artificial) |
| 2 (días 8 a 14) | Conversar con empresas del Huila | Enviar de 20 a 30 correos personalizados por día hábil a las ≈ 190 sociedades del Huila. Publicar en 2 o 3 grupos o páginas de contratación estatal con permiso del administrador. Abrir un canal gratuito de WhatsApp, "Procesos abiertos del Huila", al que la gente se une por su cuenta. Hacer entrevistas de 20 minutos (guion en 4.7) y, al final de cada una, presentar la oferta pagada (4.9). | Respuesta de 5 % o más; 8 o más entrevistas; 2 o más pagos. | $35.000–45.000 (inteligencia artificial y datos móviles) |
| 3 (días 15 a 21) | Cobrar y ampliar al sur | Escribir a las ≈ 270 sociedades del Tolima, el Caquetá y el Putumayo. Entregar cada análisis pagado en 24 horas hábiles y anotar el tiempo. Preguntar a cada cliente si se presentó y si quedó habilitado. Si la respuesta acumulada a los correos es menor al 2 %, probar una pauta pequeña que lleve al canal de WhatsApp. | 12 o más entrevistas acumuladas; 6 o más pagos acumulados; 30 minutos o menos por análisis. | $35.000–345.000 (incluye la pauta opcional) |
| 4 (días 22 a 30) | Recompra y decisión | Ofrecer el Plan Sur a quienes ya pagaron y a los entrevistados. Pedir un segundo análisis y un referido. Reunir todos los datos y aplicar la tabla de decisión (4.10) el día 30. | 10 o más pagos de 8 o más clientes distintos; 3 o más recompras o planes; devoluciones de 10 % o menos. | $155.000–160.000 (incluye una reserva para devoluciones, que solo se gasta si hay devoluciones) |

Si la lista del sur no alcanza, la segunda ronda puede incluir las sociedades de todo el país con 12 o más ofertas en 2025. A nivel nacional hay 4.042 oferentes con esa frecuencia, entre sociedades y personas naturales [Hecho].

### 4.6 Presupuesto estimado

| Concepto | Mínimo | Completo | Base del cálculo |
|---|---|---|---|
| RUT | $0 | $0 | Trámite ante la DIAN [supuesto: no tiene costo] |
| Consulta con un contador (régimen tributario y cómo cobrar) | $100.000 | $200.000 | [Supuesto: hay que cotizarla] |
| Matrícula mercantil de persona natural (solo si el contador la exige) | $0 | $46.900 | Tarifas 2026 de la Cámara de Comercio del Huila ([CCH](https://www.cchuila.org/wp-content/uploads/Tarifas2026CCHweb-1.pdf)) [Estimación] |
| Dominio .co para el correo y la página | $0 | $149.990 | [MI.COM.CO](https://mi.com.co/precios) [Hecho, fuente secundaria] |
| Inteligencia artificial para ≈ 100 análisis | $35.000 | $70.000 | Entre $100 y $800 por pliego [Estimación] |
| Pasarela de pago | $0 fijo | $0 fijo | Bold y Mercado Pago no cobran mensualidad ([Bold](https://bold.co/tarifas); [Mercado Pago](https://www.mercadopago.com.co/herramientas-para-vender/suscripciones)). Solo cobran comisión por venta. |
| WhatsApp Business (aplicación), formularios y carpetas | $0 | $0 | Herramientas gratuitas [supuesto] |
| Datos móviles y llamadas | $50.000 | $50.000 | [Supuesto] |
| Pauta digital de prueba (solo si la respuesta es menor al 2 %) | $0 | $300.000 | [Supuesto: las notas no traen datos de costo por clic] |
| Reserva para devoluciones | $150.000 | $150.000 | [Supuesto: unas 6 devoluciones de $24.900] |
| **Total** | **$335.000** | **$966.890** | Entre el **20 % y el 58 %** de los 500 USD ($1.670.615) |

El resto del presupuesto queda guardado para la fase siguiente. No conviene gastarlo en el experimento.

### 4.7 Guion de entrevista: hechos y gastos pasados, nunca intenciones

La regla del método *Mom Test* es preguntar por lo que la persona ya hizo y ya pagó, no por lo que haría. **No** pregunte "¿pagaría por esto?", "¿le gustaría…?" ni "¿le parece buena idea?". Las respuestas a esas preguntas no sirven como evidencia.

| # | Pregunta | Qué busca |
|---|---|---|
| 1 | Cuénteme del último proceso al que se presentó: ¿cuál fue y cuándo cerró? | Situarse en un caso real y reciente. |
| 2 | ¿Cómo se enteró de ese proceso y cuántos días antes del cierre? | Cómo se entera hoy y con cuánto retraso. |
| 3 | ¿Quién preparó la oferta y cuántas horas le tomó leer la invitación y reunir los documentos? | Cuánto le cuesta en tiempo. |
| 4 | ¿Cómo le fue? Si no ganó, ¿qué decía el informe de evaluación? | Si pierde por requisitos o por precio. |
| 5 | En los últimos 12 meses, ¿cuántas veces le dijeron que su oferta no era hábil o le pidieron subsanar algo? ¿Qué requisito fue? | Con qué frecuencia le pasa. |
| 6 | La última vez que pasó, ¿qué hizo después? ¿Cambió algo en su forma de preparar ofertas? | Si actuó: el dolor real produce acción. |
| 7 | ¿Qué herramientas o servicios usa hoy para encontrar o revisar procesos (notificaciones de SECOP, LicitIA, LicitaYa, Leadcitaciones, Optima, un consultor)? ¿Desde cuándo y cuánto paga? | Gasto actual y competencia real. |
| 8 | ¿Alguna vez le ha pagado a alguien (abogado, consultor, contador, empleado) para revisar un pliego o armar una oferta? ¿Cuánto le pagó y por qué? | Precedentes de pago. |
| 9 | ¿Ha probado alguna herramienta de licitaciones y la dejó? ¿Por qué? | Qué no funcionó antes. |
| 10 | ¿Alguna vez ha pedido que un proceso se limite a mipymes o a empresas del departamento? ¿Cómo le fue? | Si conoce y usa la limitación. |
| 11 | El mes pasado, ¿cuántos procesos revisó y a cuántos se presentó? ¿Por qué descartó los otros? | Volumen y cuánto lo filtra la falta de tiempo. |
| 12 | Cuando su empresa paga un servicio así, ¿quién lo aprueba y cómo se paga (transferencia, tarjeta, Nequi)? | Quién decide y cómo cobrarle. |
| 13 | Cierre: "¿Me puede presentar a otro proponente que haya tenido el mismo problema?" | Compromiso de reputación: un referido vale más que un elogio. |

Al terminar la entrevista, y solo entonces, presente la oferta pagada (4.9). Anote textualmente las cifras, los nombres de herramientas y los montos que mencione el entrevistado.

### 4.8 Mensajes listos para copiar

**A. Correo a una empresa.** Úselo solo con sociedades y solo en su correo corporativo del registro público de SECOP II. Según la SIC, los datos corporativos de una persona jurídica quedan fuera de la Ley 1581 ([SIC, 1-mar-2024](https://sedeelectronica.sic.gov.co/publicaciones/boletin-juridico/concepto/ambito-de-aplicacion-de-la-ley-1581-de-2012-en-datos-corporativos)) [Hecho].

> **Asunto:** Sus [N] ofertas en SECOP en 2025: una pregunta
>
> Buenos días, equipo de [Nombre de la empresa]:
>
> Mi nombre es [Nombre], soy ingeniero de software en Neiva. Estoy investigando por qué muchas ofertas de mínima cuantía en el Huila no quedan habilitadas, aunque sean las más baratas. En los datos abiertos de SECOP II vi que su empresa presentó [N] ofertas en 2025.
>
> ¿Me regala 20 minutos esta semana para contarme cómo prepara sus ofertas? En esa llamada no le voy a vender nada. Como agradecimiento, le envío la lista de procesos abiertos hoy en su sector en [departamento].
>
> Tomé este correo corporativo del registro público de proveedores de SECOP II (datos abiertos de Colombia Compra Eficiente). Si no desea recibir más mensajes, responda "NO" y lo retiro de inmediato.
>
> [Nombre] · [Celular] · [Correo]

**B. Publicación en un grupo o página de contratación estatal.** Publique solo si las reglas del grupo lo permiten.

> Estoy investigando cómo preparan sus ofertas las mipymes que se presentan a procesos de mínima cuantía en el Huila, el Tolima, el Caquetá y el Putumayo. Si este año se ha presentado a 3 o más procesos y alguna vez le rechazaron una oferta por requisitos, me gustaría escucharle 20 minutos. No vendo nada en la llamada. Escríbame por mensaje privado. También tengo un canal gratuito de WhatsApp con los procesos abiertos del Huila; si le interesa, pida el enlace.

**C. WhatsApp.** Úselo solo con quien se unió al canal o le escribió primero; nunca con números sacados de SECOP.

> Hola, [nombre]. Gracias por unirse al canal de procesos abiertos del Huila. Estoy hablando con proponentes para entender cómo revisan si cumplen los requisitos de una invitación de mínima cuantía. ¿Tendría 15 minutos esta semana para una llamada? Si prefiere no recibir más mensajes, escriba SALIR.

**D. Oferta pagada.** Envíela después de la entrevista.

> Le propongo algo concreto. Me envía el enlace de la próxima invitación de mínima cuantía a la que piense presentarse y sus documentos habituales. En 24 horas hábiles le devuelvo una tabla con cada requisito marcado como "cumple", "falta" o "subsanable", y la lista de lo que le falta. Cuesta $24.900 y se paga con este enlace [enlace de pago] o a la llave Bre-B [llave]. Si no le llega a tiempo o no le sirve, le devuelvo el 100 % en 5 días hábiles. Es una revisión documental, no un concepto jurídico.

Sobre la ley de datos personales:

- **No** use el correo ni el celular de personas naturales tomados del registro de SECOP, que sí los publica ([Proveedores registrados](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Proveedores-Registrados/qmzu-gj57)) [Hecho].
- Identifíquese en cada mensaje, diga de dónde sacó el dato, ofrezca darse de baja y lleve un registro de quién pidió no ser contactado.
- Antes de recibir documentos, publique una política de tratamiento sencilla y pida autorización en el formulario.

### 4.9 Prueba de disposición a pagar

**Mecánica.**

- El pago se hace **antes** de entregar el análisis, con un enlace de pago creado como persona natural en Bold o Mercado Pago (tarjeta o PSE), o por transferencia a una llave Bre-B, Nequi o un código QR.
- En un cobro de $24.900, el enlace de pago cuesta aproximadamente entre el 7 % y el 9 % [Estimación, calculada con las tarifas publicadas de [Bold](https://bold.co/tarifas) y [Mercado Pago](https://www.mercadopago.com.co/herramientas-para-vender/suscripciones)]. El QR estándar de Bold cuesta 0 % y registrar una llave Bre-B es gratis ([Banco de la República](https://www.banrep.gov.co/es/bre-b/que-es)) [Hecho]. Para tickets pequeños, conviene ofrecer primero la transferencia.
- Bre-B no permite cobros automáticos recurrentes [Hecho], por eso el Plan Sur se cobra como pago único por 30 días.

**Política de devolución.** Se devuelve el 100 % en 5 días hábiles, por el mismo medio, en tres casos: si el análisis no llega en 24 horas hábiles, si el cliente dice que no le sirvió o si el proceso se cancela antes de la entrega. El Plan Sur se devuelve completo si el cliente lo pide en los primeros 7 días.

**Si el cliente desconfía.** Si el cliente se niega a pagar por adelantado a un desconocido, se le puede permitir pagar al recibir el análisis, siempre antes del cierre del proceso. Esos casos se anotan aparte, y solo cuenta el dinero efectivamente recibido.

**Qué cuenta como validación.** Un pago recibido y no devuelto, un Plan Sur pagado, una segunda compra y un referido que termina pagando.

**Qué no cuenta.** Elogios, frases como "me interesa" o "avíseme cuando esté listo", "me gusta" en redes, suscripciones al canal gratuito, encuestas favorables, análisis regalados y promesas de pago futuro.

### 4.10 Criterios para continuar, modificar o abandonar (día 30)

| Señal | Continuar | Modificar | Abandonar |
|---|---|---|---|
| Pagos reales (análisis de $19.900 o más, o plan de $49.900 o más) | 10 o más pagos de al menos 8 clientes distintos | De 4 a 9 pagos | 3 pagos o menos |
| Recompras o planes | 3 o más clientes vuelven a pagar | 1 o 2 | Ninguno |
| Competencia | 3 o más clientes que pagaron no usan LicitIA, LicitaYa ni Leadcitaciones, o dicen que esas herramientas no les resuelven la mínima cuantía | — | La mayoría dice que las alertas gratis o baratas, más su propia revisión, le bastan |
| Dolor documentado | La mitad o más de los entrevistados tuvo una oferta rechazada o con requisitos por subsanar en los últimos 12 meses | Entre la cuarta parte y la mitad | Menos de la cuarta parte |
| Minutos por análisis (semana 4) | 30 o menos | Entre 31 y 60 (acotar el alcance o subir el precio) | Más de 60, y los clientes no aceptan pagar más |
| Respuesta a los correos | 5 % o más | Entre 2 % y 5 % | Menos de 2 % y ningún pago |
| Devoluciones | 10 % o menos | Entre 10 % y 30 % | Más de 30 % |

**Si el resultado es "continuar".** En diciembre y enero, cuando el mercado está quieto, automatice la extracción de requisitos y el informe, manteniendo la revisión humana como control de calidad. En febrero relance a nivel nacional, apoyado en contenido y en correos personalizados con datos abiertos. La meta sería 34 planes o 67 análisis al mes.

**Si el resultado es "modificar".** Cambie una sola cosa por vez: el segmento (personas naturales que llegan por el canal de WhatsApp, u oferentes de todo el país), la oferta (solo análisis sueltos o solo avisos locales) o el precio.

**Si el resultado es "abandonar".** Pase a validar la alternativa (4.12).

### 4.11 Mínimos legales para cobrar

Esto no reemplaza el concepto de un contador; es lo que conviene confirmar con uno antes del primer cobro.

**1. Inscribirse en el RUT como persona natural.** Es lo mínimo para cobrarles a empresas y para abrir una pasarela de pagos. Hay que confirmar con el contador la actividad económica (código CIIU) que se registra.

**2. Puede empezar como "no responsable de IVA".** Esto aplica a una persona natural con ingresos menores de 3.500 UVT ($183.309.000 en 2026) que cumpla las demás condiciones del artículo 437 del Estatuto Tributario ([Secretaría del Senado](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr017.html)) [Hecho]. En ese caso no cobra IVA y, según fuentes secundarias, no está obligado a facturar electrónicamente; la empresa que le compra elabora un "documento soporte" ([Gerencie](https://www.gerencie.com/factura-de-las-personas-naturales-no-obligadas-a-expedir-factura.html)) [Hecho, fuente secundaria: no se verificó en el decreto]. Para respaldar el cobro bastaría un documento simple de cobro, lo que en Colombia suele llamarse "cuenta de cobro" [Supuesto, a confirmar con el contador].

**3. Retención en la fuente.** Una empresa compradora podría retener entre el 4 % y el 11 %, según cómo clasifique el servicio ([Siigo, tabla de retención 2026](https://www.siigo.com/blog/obligaciones-fiscales/tabla-de-retencion-en-la-fuente/)) [Hecho, fuente secundaria]. Si lo clasifica como "servicio general", la base mínima es de 2 UVT ($104.748), así que un cobro de $24.900 o $49.900 quedaría por debajo de ella. Si lo clasifica como honorarios, la base es $0. Esto hay que confirmarlo.

**4. Régimen Simple: una decisión incierta.**

- **A favor:** elimina la retención en la fuente.
- **En contra:** obliga a facturar electrónicamente y a pagar anticipos cada dos meses.
- **Tarifa:** sería del 1,6 % o del 5,9 % según cómo se clasifique la actividad ([Secretaría del Senado, artículos 903 a 916](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr036.html)) [Hecho]. A 500 USD al mes, la diferencia va de ≈ $321.000 a ≈ $1,18 millones al año [Estimación].
- **Duda sin resolver:** hay una tensión entre el artículo 915, que dice que quienes están en el Simple son responsables de IVA, y la figura de no responsable del artículo 437.
- **Plazo:** quien ya tiene RUT solo puede pasarse al Simple hasta el último día hábil de febrero de cada año.

**5. IVA del servicio.** Un análisis de pliegos es un servicio que, en principio, causaría IVA si el fundador fuera responsable de ese impuesto. El software en la nube que cumpla las condiciones de la DIAN está excluido de IVA (artículo 476, numeral 21) ([Secretaría del Senado](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr019.html)) [Hecho].

**6. Matrícula mercantil.** No es seguro que haga falta para este servicio. Si el contador la recomienda, cuesta unos $46.900 en la Cámara de Comercio del Huila [Estimación].

**7. Datos personales (Ley 1581).** Hacen falta una política de tratamiento, la autorización en el formulario de recepción, borrar los documentos del cliente después de entregar el análisis y no compartirlos con nadie.

Una precaución adicional: no se encontró ninguna norma ni concepto que diga si revisar requisitos de un pliego, sin ser abogado, puede considerarse asesoría jurídica. Los competidores venden análisis similares abiertamente, pero conviene presentarlo siempre como "revisión documental" y preguntarlo en la consulta con el contador o con un abogado.

### 4.12 La alternativa en breve: SG-SST para asesores

La alternativa elegida es (a), aunque (d) y (e) tengan un puntaje un poco mayor. Las razones:

- Su evidencia es más profunda (confianza media frente a baja).
- Le vende a un profesional que ya cobra por el cumplimiento, el patrón donde la disposición a pagar fue más clara en toda la investigación.
- Escala mejor que un servicio local de recordatorios.
- No exige las cargas de RIPS: proveedor tecnológico, datos clínicos y cambios frecuentes de la norma.

| Elemento | Propuesta |
|---|---|
| Cliente inicial | Asesor SST con licencia vigente y 5 o más microempresas cliente, en varias ARL. |
| Propuesta de valor | "Lleve a sus micro clientes al día sin perseguir evidencias: cada empleador recibe por WhatsApp lo que debe subir, y usted ve en un tablero lo que falta." |
| Oferta mínima, servicio manual | Durante 30 días, el fundador arma a mano una hoja de cálculo con el calendario multicliente de un asesor y envía él mismo los recordatorios a los empleadores, con permiso del asesor. |
| Precio de prueba | "Plan fundador" de $49.000–79.000 al mes hasta 10 empresas. Referencias: Progresst cobra $49.900, SafetYA ≈ $54.083 al mes y CumpleSST $790.000 por 5 empresas. |
| Canal | Contenido y un calendario multicliente 2027 en Excel, gratis, antes de la autoevaluación de diciembre. Participación en páginas de SST. **No** escribir en frío usando las listas públicas de licenciatarios ni los contratistas de SECOP, porque son datos personales. |
| Paso previo barato | Confirmar en los términos de SafetYA o en una demostración si sus "10 licencias" equivalen a 10 empresas cliente. |
| Continuar si | 5 o más de 15 asesores entrevistados pagan el primer mes por adelantado. |
| Abandonar si | La mayoría atiende menos de 5 empresas, o ya usa SafetYA, Alissta o Excel sin quejarse, o rechaza pagar más de $30.000 al mes en total. |

### 4.13 Qué descubrimientos cambiarían la recomendación

| Si descubre que… | Entonces… |
|---|---|
| Las mipymes dicen que la invitación de mínima cuantía es corta y la revisan solas, y nadie paga. | Abandone (c) y valide (a). |
| Pagan por análisis sueltos, pero nadie compra el plan. | Mantenga el cobro por análisis y suba el precio. Es un negocio de servicio que solo escala si se automatiza la revisión. |
| Los informes de evaluación muestran que se pierde sobre todo por precio, no por requisitos. | El "¿cumplo?" pierde sentido. Antes de abandonar, pruebe vender precios históricos de adjudicación por entidad. |
| Quienes responden son personas naturales que llegan por el canal de WhatsApp, más que las empresas. | Cambie el segmento a personas naturales que dieron su autorización, con un precio por análisis más bajo. |
| Los clientes ya usan LicitIA, LicitaYa o Leadcitaciones y están satisfechos con lo que les dan en mínima cuantía. | Abandone (c). |
| Colombia Compra Eficiente lanza alertas con inteligencia artificial en un nuevo SECOP. | Las alertas dejan de valer; el "¿cumplo?" con revisión humana puede sobrevivir. |
| Los asesores SST atienden 5 o más empresas y 5 de 15 pagan. | (a) pasa a ser la oportunidad principal. |
| Los contadores con software de escritorio dedican una hora o más por NIT al mes a conciliar y pagan $10.000 o más por NIT. | Vale la pena reconsiderar (b). |
| Una investigación a fondo de (d) o (e) no encuentra más competidores ni sustitutos gratis que los ya conocidos. | Esa idea sube por encima de (a) como alternativa. |

## Conclusión: lo escaso es la conversación, no el código

La lección más útil no es cuál idea ganó, sino por qué perdieron las demás. En las tres investigaciones a fondo, mirar de cerca hizo aparecer más competencia y desarmó la versión original de la idea:

- en SG-SST aparecieron cuatro proveedores multicliente, uno de ellos en Pitalito;
- en la conciliación DIAN, herramientas casi gratuitas y grandes proveedores que la regalan;
- en SECOP, siete competidores más.

Para un fundador sin contactos, lo que limita no es programar, sino lograr que un desconocido le pague. Su ventaja real no es el software. Es saber convertir datos abiertos en una conversación personalizada ("en 2025 su empresa presentó N ofertas y ganó M") y estar cerca de un mercado regional que los competidores atienden desde Bogotá, Cali, Cartagena o Pasto. Por eso, en los primeros 30 días el mejor "producto" es una lista de prospectos bien construida y una buena entrevista.

La segunda lección es dónde está el dinero. Las obligaciones más duras (RIPS, SG-SST, eventos RADIAN) son justo las que el Estado y los grandes proveedores ofrecen gratis, porque afectan a millones. El pago aparece cuando alguien arriesga un ingreso concreto: el asesor que cobra por el cumplimiento, el contador que cobra por el cierre, el proponente que puede perder un contrato de $35 millones por un documento. Cobrar $24.900 frente a un contrato de $34,7 millones es una relación de valor de más de mil a uno. Si ni siquiera así diez mipymes pagan en un mes, el problema no es el precio sino la confianza o el canal. Saber eso vale más que cualquier producto construido a ciegas.

## 5. Fuentes y preguntas que siguen sin resolver

### 5.1 Limitaciones de acceso que heredan las conclusiones

Varias fuentes primarias no se pudieron leer el 2026-10-01.

**Errores 503 (servidor no disponible).** Fallaron Función Pública y la Secretaría del Senado para la Ley 675 de 2001, la Ley 1581 de 2012, el Decreto 1072 de 2015, el Decreto 472 de 2015, el Decreto 1860 de 2021 y el Decreto 1154 de 2020. Para el Decreto 1860 se usó la copia del normograma de Cancillería. Las páginas del Estatuto Tributario en la Secretaría del Senado sí cargaron.

También fallaron:

- la Junta Central de Contadores, con error 503 y luego un error del certificado de seguridad, así que no hay cifra vigente de contadores;
- la herramienta RL Datos de Fasecolda, sin desglose de empresas por tamaño ni por departamento;
- varias páginas de la SIC, incluida su cartilla de formatos.

**Errores 403 (acceso denegado) o páginas vacías.** Ocurrió con PayU, Nequi, Computrabajo (algunas ofertas), Ámbito Jurídico, OISS, Workana y Licitum. LicitaIA respondió con error 429 (demasiadas solicitudes).

**Fuentes que no se consultaron:**

- los grupos de Facebook, LinkedIn y WhatsApp, porque exigen iniciar sesión;
- Google Trends, que no estuvo disponible;
- el tarifario oficial de WhatsApp de Meta, que no se pudo descargar: sus tarifas para Colombia vienen de fuentes secundarias, y las fuentes no coinciden sobre el cobro de mensajes de servicio desde el 1-oct-2026;
- el boletín EMICRON 2025, que devolvió error 404.

**Cifras con un nivel menor de verificación:**

- Varias cifras salen solo del resumen del buscador: las tarifas de Cuidamos, Nequi y PayU, los salarios de Computrabajo y elempleo, el desglose del SG-SST en el Decreto 1072 y el dato de ComunidadFeliz. Así se indica en el texto.
- La Resolución 948 de 2026 se leyó en una transcripción de SISJUR, porque el PDF oficial es una imagen escaneada.
- La Sentencia 29509 se conoce por resúmenes del INCP y de Actualícese.
- Los precios de la inteligencia artificial se tomaron de la documentación de la API de Anthropic, no de una consulta directa a la página de precios.
- Los datos de SECOP cambian a diario y los campos "es pyme", "departamento" y "tipo de empresa" los declara el propio proveedor.
- Los conteos del RUES por nombre de establecimiento son aproximados.

### 5.2 Hallazgos clave, con fuente y alcance

Todas las fuentes de esta tabla se consultaron el **2026-10-01**.

| # | Hallazgo | Tipo | Fuente y fecha de publicación | Qué prueba | Qué no prueba |
|---|---|---|---|---|---|
| 1 | 84.432 procesos competitivos en 2025; el 69 % de mínima cuantía | Hecho (consulta propia) | [SECOP II – Procesos](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt), datos actualizados a diario | Tamaño y composición del mercado competitivo | Cuántos procesos le interesan a un sector concreto |
| 2 | 34.920 oferentes; 48,3 % ofertó una sola vez; 10.287 ofertaron 4 o más veces | Hecho (consulta propia) | [SECOP II – Ofertas por proceso](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOPII-Ofertas-Por-Proceso/wi7w-2nvm) | Universo de clientes frecuentes | Tamaño y capacidad de pago de las empresas |
| 3 | Huila: 756 proveedores domiciliados ofertaron; 280 lo hicieron 4 o más veces y 124 lo hicieron 12 o más | Hecho (cruce propio) | [Proveedores registrados](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Proveedores-Registrados/qmzu-gj57) y [Ofertas](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOPII-Ofertas-Por-Proceso/wi7w-2nvm) | Mercado local frecuente de 120 a 280 empresas | Su sector y su disposición a pagar |
| 4 | En el 58–62 % de las adjudicaciones de mínima cuantía con competencia de precio no ganó la oferta más barata | Estimación (indicador propio, con ruido) | [Ofertas](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOPII-Ofertas-Por-Proceso/wi7w-2nvm) y [Procesos](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt) | La oferta más barata queda por fuera con frecuencia | La causa: documentos, precio artificialmente bajo, IVA o errores de digitación |
| 5 | Plazo mediano de 5 días para ofertar en mínima cuantía; 36 % con 3 días o menos | Hecho | [SECOP II – Procesos](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt) | La rapidez importa | Las horas reales que dedica una mipyme |
| 6 | Las mipymes firmaron el 81 % de los contratos competitivos y el 83 % del valor de la mínima cuantía | Hecho (campo que declara el proveedor) | [SECOP II – Contratos](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Contratos-Electr-nicos/jbjy-vk9h) | Las mipymes sí ganan | Su margen o rentabilidad |
| 7 | En mínima cuantía se adjudica a la oferta más barata que cumpla | Hecho (norma) | [Decreto 1860 de 2021](https://www.cancilleria.gov.co/sites/default/files/Normograma/docs/pdf/decreto_1860_2021.pdf), publicado el 24-dic-2021 | Los requisitos documentales deciden quién gana | Estadísticas oficiales de rechazos |
| 8 | En mínima cuantía no se exige el RUP | Hecho (norma) | [Ley 1150 de 2007, art. 6](https://cancilleria.gov.co/normograma/compilacion/docs/ley_1150_2007.htm) | Comparar el RUP con el pliego no sirve para el 69 % de los procesos competitivos | Que los competidores analicen mal la mínima cuantía |
| 9 | Los procesos de menos de US$125.000 ($511.708.497 en 2026) se pueden limitar a mipymes y a empresas del territorio | Hecho | [Beltrán Pardo, 4-feb-2026](https://www.beltranpardo.com/noticias-juridicas/atencion-umbral-para-limitar-procesos-mipymes-en-2026); [Colombia Compra Eficiente, actualizado el 24-mar-2026](https://www.colombiacompra.gov.co/archivos/27419) | Existe una herramienta legal a favor de las mipymes locales | Que las mipymes la conozcan o la usen |
| 10 | SECOP II avisa gratis según el código de producto | Hecho | [Colombia Compra Eficiente, actualizado el 25-sep-2024](https://www.colombiacompra.gov.co/archivos/pregunta-frecuente/como-activo-notificaciones-al-correo) | Existe un sustituto oficial gratuito | Su calidad o si filtra por municipio |
| 11 | Los datos abiertos de SECOP llegan con 1 a 2 días de retraso | Hecho (consulta propia) | [SECOP II – Procesos](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Procesos-de-Contrataci-n/p6dx-8zbt) | Una alerta construida sobre datos abiertos llega tarde | — |
| 12 | Los datos abiertos se pueden reutilizar (CC BY-SA 4.0); el portal bloquea y prohíbe el uso masivo y comercial | Hecho | [Términos y condiciones de SECOP II](https://www.colombiacompra.gov.co/wp-content/uploads/2024/10/cce-gti-idi-05_terminos_y_condiciones_de_uso_del_sistema_electronico_de_contratacion_publica_-_secop_ii_19-11-2021.pdf), versión del 30-sep-2021 | Un servicio basado en datos abiertos es legal; raspar el portal no | Cómo se aplica la cláusula "compartir igual" a datos derivados |
| 13 | Precios: Leadcitaciones $25.000 al mes; LicitIA $15.900–299.000; LicitaYa $49.999–129.999; Licitarus 3 análisis por $150.000 | Hecho (precio publicado, sin fecha visible) | [Leadcitaciones](https://www.leadcitaciones.info/precios); [LicitIA](https://licitia.com.co/); [LicitaYa](https://www.licitaya.co/); [Licitarus](https://www.licitarus.com/) | Hay gasto y precios de referencia | Número de clientes, calidad y permanencia |
| 14 | LicitaYa declara más de 4.150 clientes | Dato del propio proveedor | [LicitaYa](https://www.licitaya.co/) | Posible penetración alta del mercado | Clientes reales |
| 15 | El correo corporativo de una persona jurídica está fuera de la Ley 1581 | Hecho (concepto de la SIC) | [SIC, 1-mar-2024](https://sedeelectronica.sic.gov.co/publicaciones/boletin-juridico/concepto/ambito-de-aplicacion-de-la-ley-1581-de-2012-en-datos-corporativos) | Se puede escribir al correo corporativo de una empresa | Que se puedan usar los datos de personas naturales sin autorización (no se puede) |
| 16 | SECOP II tiene soporte contratado hasta el 15-dic-2026; el concurso del nuevo SECOP figura como cancelado | Hecho (consulta propia) | [SECOP II – Contratos](https://www.datos.gov.co/Estad-sticas-Nacionales/SECOP-II-Contratos-Electr-nicos/jbjy-vk9h) | La plataforma sigue operando en 2026 | Qué pasará en 2027 |
| 17 | Diseñar un SG-SST exige licencia SST | Hecho (norma) | [Resolución 0312 de 2019, Sisjur](https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=82666), del 13-feb-2019 | El fundador no puede vender el diseño del SG-SST | Que no pueda vender software a quien tiene licencia |
| 18 | 1.234.903 empresas afiliadas a riesgos laborales | Hecho | [Fasecolda, 24-sep-2025](https://www.fasecolda.com/wp-content/uploads/COMUNICADO-CONVENCION_vf24092025-1.pdf) | Universo de empleadores obligados | Desglose por tamaño o para el Huila |
| 19 | SafetYA: $649.000 al año con "10 licencias"; CumpleSST: $790.000 + IVA por 5 empresas; Progresst: $49.900 al mes | Precio publicado por el proveedor | [SafetYA](https://safetya.co/membresia/); [CumpleSST](https://cumplesst.com/); [Progresst](https://sstmasterpro.com/) | Ya existen planes multicliente baratos | Si 10 licencias son 10 empresas; número de clientes |
| 20 | Solo el 4 % de los contratistas SG-SST en SECOP trabajó para dos o más entidades | Hecho (consulta propia) | [SECOP II – Contratos](https://www.datos.gov.co/resource/jbjy-vk9h.json) | En el sector público predomina un profesional por entidad | La cartera privada de los asesores |
| 21 | Alissta (Positiva) es gratis y funciona por empresa (NIT) | Hecho | [Manual de Alissta v4.0](https://portalvida.positiva.gov.co/documents/2978451/4622490/Manual_de_usuario_alissta+%28Gestion%29+Empresas.pdf/69d3b630-d83a-5ee0-3d4c-69c518522a63?t=1751550741623) | Hay un sustituto gratuito para ≈ 42 % de las empresas | Si cubre el trabajo diario del asesor |
| 22 | Artículo 616-1 del Estatuto Tributario: solo dos eventos y solo en compras a crédito | Hecho (norma) | [Secretaría del Senado](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr025.html) | El problema legal es más estrecho de lo que dicen los proveedores | Una sanción por omitir los eventos |
| 23 | La Sentencia 29509 (10-jul-2025) eliminó la exigencia de plazo para los eventos | Hecho (fuente secundaria) | [INCP, 17-jul-2025](https://incp.org.co/publicaciones/infoincp-publicaciones/impuestos/2025/07/acuse-de-recibo-de-la-factura-electronica-para-descontar-el-iva-consejo-de-estado-anulo-interpretacion-de-la-dian/) | La urgencia mensual es menor | El texto de la sentencia, que no se leyó |
| 24 | La DIAN bloqueó la automatización de su portal el 18-jun y el 28 y 30-jul-2026 | Dato de proveedor y de prensa especializada | [Kontalid](https://kontalid.com.co/anuncios-general); [Actualícese, 27-jul-2026](https://actualicese.com/dian-implementara-nuevo-control-de-seguridad-para-consultar-facturas-electronicas/) | Automatizar el portal es frágil | Que el acceso de una persona con su token esté bloqueado |
| 25 | No existe un servicio oficial para listar los documentos recibidos | Hecho | [Anexo Técnico 1.9 de la DIAN](https://www.dian.gov.co/impuestos/factura-electronica/Documents/Anexo-Tecnico-Factura-Electronica-de-Venta-vr-1-9.pdf) | Para tener todos los documentos hace falta un buzón o un paso manual | Los requisitos exactos del servicio de descarga por factura |
| 26 | SisteAcuse cuesta ≈ $917–2.083 por NIT al mes; Alegra es gratis para el contador | Precio publicado por el proveedor | [SisteAcuse](https://sisteacuse.com/); [Alegra](https://www.alegra.com/colombia/contadores/) | El precio de referencia es casi cero | Calidad o satisfacción de los usuarios |
| 27 | Resolución 948 de 2026: sin CUV no se tramita la factura de salud | Hecho (norma, leída en transcripción) | [SISJUR, 14-may-2026](https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=193275&dt=S) | Es una obligación dura para quien factura a EPS, ARL o prepagadas | La tasa de rechazos; el texto literal |
| 28 | El Ministerio de Salud ofrece gratis un convertidor y un validador de RIPS | Hecho | [Manual del convertidor](https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/OT/manual-usuario-convertidor-json.pdf) | Hay un sustituto gratuito para quien factura poco | Que sea fácil de usar |
| 29 | AgendaPro cuesta $29.900 al mes con 50 recordatorios por WhatsApp; otros tienen planes gratis | Hecho (precio publicado) | [AgendaPro](https://agendapro.com/co/planes); [AgenditApp](https://agenditapp.com/vs/agendapro) | El precio de referencia es muy bajo | La inasistencia en consultorios privados |
| 30 | El 89,1 % de los micronegocios no usa computador y el 70,9 % usa celular | Hecho | [DANE, EMICRON 2024](https://www.dane.gov.co/files/operaciones/EMICRON/bol-EMICRON-2024.pdf), publicado el 30-jul-2025 | El canal de la microempresa es el celular | El uso de WhatsApp |
| 31 | TRM del 30-sep-2026: $3.341,23 | Hecho | [datos.gov.co](https://www.datos.gov.co/resource/32sa-8pi3.json) | 500 USD ≈ $1,67 millones | La TRM futura |
| 32 | Una persona natural con ingresos menores de 3.500 UVT ($183,3 millones) puede ser no responsable de IVA | Hecho (norma) | [Estatuto Tributario, art. 437](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr017.html) | Puede empezar sin cobrar IVA | Si puede combinarlo con el Régimen Simple |

### 5.3 Preguntas que siguen sin resolver

| Pregunta | Por qué importa | Cómo resolverla barato |
|---|---|---|
| ¿Por qué pierde la oferta más barata en mínima cuantía: requisitos, precio o errores? | Define si el "¿cumplo?" tiene valor. | Leer 30 informes de evaluación del Huila durante la semana de calibración. |
| ¿LicitIA, LicitaYa o Leadcitaciones ya resuelven bien la mínima cuantía y filtran por municipio? | Define si existe el hueco. | Usar sus pruebas gratis con un proceso real del Huila. |
| ¿Las notificaciones de SECOP II permiten filtrar por municipio o por valor? | Define cuánto valen las alertas del Plan Sur. | Preguntarlo en las entrevistas o pedirle a un cliente que muestre su configuración. |
| ¿Revisar requisitos sin ser abogado puede considerarse asesoría jurídica? | Riesgo legal del servicio. | Preguntarlo en la consulta con el contador o con un abogado. |
| ¿Qué tasa de respuesta tienen los correos B2B a mipymes del sur? | Define si el canal alcanza. | Se mide en la semana 2. |
| ¿Cuántos minutos toma realmente un análisis? | Define el margen y la escala. | Se mide en las semanas 1 y 3. |
| ¿Qué pasará con SECOP en 2027? | Riesgo de plataforma. | Revisar las publicaciones de Colombia Compra Eficiente antes de construir. |
| ¿Régimen ordinario como no responsable de IVA o Régimen Simple; tarifa de 1,6 % o de 5,9 %? | Costo tributario y retenciones. | Una consulta con un contador. |
| ¿Cuántas empresas atiende un asesor SST y en cuántas ARL? | Supuesto central de la alternativa. | Entrevistar a 15 asesores. |
| ¿Las "10 licencias" de SafetYA equivalen a 10 empresas? | Cambia el precio de referencia de la alternativa. | Leer sus términos o pedir una demostración. |
| ¿Un tercero que no es proveedor tecnológico puede enviar eventos RADIAN, y el certificado gratuito de la DIAN sirve fuera de su solución gratuita? | Viabilidad técnica de (b). | Leer el Anexo RADIAN 2.0. |
| ¿La Resolución 948 mantiene el "RIPS sin factura" para los pacientes particulares? | Define el mercado de (d). | Leer el texto completo y los anexos técnicos en SISPRO. |
| ¿Cuál es la inasistencia en consultorios privados colombianos? | Define el dolor de (e). | Preguntarlo en entrevistas a 10 consultorios de Neiva. |
| ¿La Ley 2300 de 2023 limita el contacto comercial entre empresas por WhatsApp? | Parece aplicar solo a cobranza, pero no se verificó. | Consultarlo con un abogado; mientras tanto, escribir por WhatsApp solo a quien lo autorizó. |
| ¿Cuántos contadores activos hay en el país y en el Huila? | Tamaño del mercado de (b). | Volver a consultar la Junta Central de Contadores cuando su sitio esté en línea. |

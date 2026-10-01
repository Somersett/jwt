# Finalista: herramienta multi-NIT para descargar, gestionar eventos RADIAN y conciliar documentos electrónicos DIAN contra la contabilidad (contadores independientes y firmas pequeñas, Colombia)

Convenciones (mismas que en `oportunidades_contadores_ph.md`, cuyo contenido de las oportunidades 5 y 6 **no se repite aquí**; solo se cita cuando se verifica o corrige):
- **Fecha de acceso de todas las fuentes: 2026-10-01**, salvo indicación contraria. "pub." = fecha de publicación o actualización visible en la página; "s.f." = sin fecha visible.
- Tipo de dato: **[Hecho]** = texto de norma oficial o dato publicado por la fuente; **[Hecho-proveedor]** = afirmación o precio publicado por un vendedor (verificable solo en su página y con sesgo comercial); **[Estimación]** = cifra de prensa, gremio o tercero sin metodología verificable; **[Hipótesis]** = inferencia propia no verificada.
- "(solo snippet)" = el dato sale del resumen del buscador; la página no se leyó completa.
- Referencias macro (SMMLV 2026 $1.750.905; auxilio de transporte $249.095; UVT 2026 $52.374; TRM ≈ $3.341; meta ≈ $1,67 millones/mes; comisiones de pasarelas ≈ 4,8–6,4 % sobre un cobro de $50.000) están en `contexto_colombia.md`, secciones 3 y de pasarelas; no se repiten.

**Resumen para el redactor (síntesis de todo lo que sigue; cada punto está sustentado en las secciones):**
1. El problema legal es **real pero más estrecho de lo que dicen los vendedores**. El art. 616-1 del ET (texto de la Ley 2155 de 2021) exige **solo dos eventos** (acuse 030 y recibo del bien o servicio 032), **solo en ventas a crédito o con plazo**, para que la factura soporte costos, deducciones e IVA descontable. La **aceptación (033/034) es un requisito comercial** del título valor/RADIAN, no un requisito tributario. Además, el Consejo de Estado (Sentencia 29509, 10-jul-2025) anuló la doctrina DIAN que exigía enviar los eventos antes de tomar el IVA y en el mismo período. Esto **reduce la urgencia mensual** del dolor.
2. **La ruta técnica de scraping del portal es frágil y en 2026 se rompió dos veces.** El 18-jun-2026 un CAPTCHA interno bloqueó toda descarga automatizada de XML, y el 28/30-jul-2026 la DIAN exigió el NIT del emisor o receptor y agregó un bloqueo de "robots, automatizaciones o agentes de IA". La ruta robusta combina tres piezas: (a) el **buzón de correo**, canal legal de entrega (Res. 165/2023); (b) el **listado Excel** que el usuario exporta del portal; y (c) el **web service oficial GetXmlByDocumentKey** con el certificado digital de cada cliente. Ninguna API oficial **lista** los documentos recibidos.
3. **La competencia es densa y barata.** Hay ≥12 alternativas: QFe, consultorcontable, Kontalid (ya trae "Conciliación DIAN"), SisteAcuse, N1, Ciolix, Contamas, accounter.co, macros Excel y los incumbentes Alegra, Siigo, ContaPyme y World Office. El ancla de precio por NIT colapsó: SisteAcuse cobra **$11.000–$25.000 por NIT al año** en planes de contador, Alegra es **gratis para el contador** y Siigo Contador Ilimitado cuesta **$535.900 al año por empresas ilimitadas**.
4. Para llegar a $1,67 M/mes a un precio de $15.000/NIT/mes harían falta ~118 NIT netos de comisiones (≈8–12 contadores). Ese precio está **6–16 veces por encima** del ancla de SisteAcuse y por debajo de QFe.
5. El hueco que podría quedar es una **hipótesis sin evidencia directa**: conciliación mensual **persistente** por NIT (DIAN vs. auxiliar contable exportado de cualquier software), con tablero multi-NIT de "facturas a crédito sin 030/032" y alertas. Kontalid ya hace la conciliación, pero temporal y manual, y N1 ya integra con World Office de escritorio.

---

## P1. Problema y consecuencia tributaria: ¿cuándo exigen las normas los eventos RADIAN para costos, deducciones e IVA descontable? (hecho vs. afirmación de proveedor)

### Takeaway
La norma legal vigente (art. 616-1 ET, modificado por el art. 13 de la Ley 2155 de 2021) condiciona que la factura electrónica **a crédito o con plazo** soporte costos, deducciones e IVA descontable a que el adquirente envíe **dos** mensajes: el recibido de la factura y el recibido de los bienes o servicios. La aceptación expresa o tácita es un requisito del **título valor/RADIAN** (Res. 85 de 2022), no del ET. La sentencia del Consejo de Estado de julio de 2025 quitó a la DIAN la posibilidad de exigir que esos eventos se envíen antes de declarar el IVA o en el mismo período. El incentivo tributario existe, pero **no impone un plazo mensual**.

### Cited Findings

**Texto legal primario (verificado en fuente oficial)**
- [Hecho] Art. 616-1 ET, "Artículo modificado por el artículo 13 de la Ley 2155 de 2021", dice: "cuando la venta de un bien y/o prestación del servicio se realice a través de una factura electrónica de venta y la citada operación sea a crédito o de la misma se otorgue un plazo para el pago, el adquirente deberá confirmar el recibido de la factura electrónica de venta y de los bienes o servicios adquiridos mediante mensaje electrónico remitido al emisor […] En aquellos casos en que el adquirente remita al emisor el mensaje electrónico de confirmación de recibido de la factura electrónica de venta y el mensaje electrónico del recibido de los bienes o servicios adquiridos, habrá lugar a que dicha factura electrónica de venta se constituya en soporte de costos, deducciones e impuestos descontables" — [Secretaría del Senado, ET parte 25](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr025.html) (descargada y leída el 2026-10-01; HTTP 200). El mismo texto aparece transcrito en las notas de la [Res. DIAN 165 de 2023 en el Normograma DIAN](https://normograma.dian.gov.co/dian/compilacion/docs/resolucion_dian_0165_2023.htm).
  - **Prueba:** la obligación aplica solo a operaciones a crédito o con plazo, y exige exactamente dos mensajes (acuse y recibo del bien o servicio).
  - **No prueba:** que la falta de eventos invalide automáticamente el costo. El texto dice "habrá lugar a que […] se constituya en soporte"; no fija sanción ni plazo.
- [Hecho] Art. 771-2 ET (adicionado por la Ley 383 de 1997): "Para la procedencia de costos y deducciones en el impuesto sobre la renta, así como de los impuestos descontables en el impuesto sobre las ventas, se requerirá de facturas con el cumplimiento de los requisitos establecidos en los literales b), c), d), e), f) y g) de los artículos 617 y 618". El parágrafo 2 (Ley 1819 de 2016) acepta costos realizados en el año aunque la factura tenga fecha del período siguiente — [Senado, ET parte 31](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr031.html).
  - **Prueba:** la factura es el soporte general de costos.
  - **No prueba:** nada específico sobre eventos.
- [Hecho, aclaración importante] Art. 772-1 ET, "CONCILIACIÓN FISCAL" (Ley 1819 de 2016): obliga a los contribuyentes que llevan contabilidad a controlar o conciliar "las diferencias que surjan entre la aplicación de los nuevos marcos técnicos normativos contables y las disposiciones de este Estatuto". Su incumplimiento es "irregularidad en la contabilidad" — [Senado, ET parte 31](http://www.secretariasenado.gov.co/senado/basedoc/estatuto_tributario_pr031.html).
  - **Prueba:** la "conciliación fiscal" legal es NIIF vs. fiscal (formatos 2516/2517), **no** documentos DIAN vs. contabilidad.
  - **No prueba:** que exista una obligación legal de "conciliar el token DIAN". Esa conciliación es una buena práctica (ver P2, Forvis Mazars), no un deber legal autónomo. Riesgo de confusión en el discurso de venta.
- [Hecho] Res. DIAN 85 de 2022 (RADIAN), art. 7: para inscribir en RADIAN la factura **como título valor** se validan: "3. Acuse de recibo de la factura electrónica de venta. 4. Recibo del bien o prestación del servicio. 5. Aceptación expresa o aceptación tácita". Define el acuse con base en el numeral 2 del art. 774 del Código de Comercio, y el "Recibo del Bien" con base en el art. 773 C.Co. y el parágrafo 1 del art. 2.2.2.53.4 del Decreto 1074 de 2015 — [Normograma DIAN, Res. 85 de 2022](https://normograma.dian.gov.co/dian/compilacion/docs/resolucion_dian_0085_2022.htm).
  - **Prueba:** el tercer evento (aceptación) es un requisito del **título valor**.
  - **No prueba:** que la aceptación sea necesaria para deducir.
- [Hecho] La misma resolución transcribe el art. 773 C.Co.: la factura se considera "irrevocablemente aceptada […] si no reclamare en contra de su contenido […] dentro de los tres (3) días hábiles siguientes a su recepción" — [Normograma DIAN, Res. 85 de 2022](https://normograma.dian.gov.co/dian/compilacion/docs/resolucion_dian_0085_2022.htm). Es el origen comercial del plazo de 3 días que citan los proveedores.
- [Hecho] El Decreto 358 de 2020 (DUR 1625, arts. 1.6.1.4.x) **no menciona "aceptación"** (0 coincidencias en el texto compilado). Regula, entre otros, el documento soporte en adquisiciones a no obligados a facturar (art. 1.6.1.4.12), que debe probar la transacción "que da lugar a costos, deducciones, o impuestos descontables" — [Normograma DIAN, Decreto 358 de 2020](https://normograma.dian.gov.co/dian/compilacion/docs/decreto_0358_2020.htm).
  - **Prueba:** los documentos soporte también son insumo de costos; una herramienta de conciliación debería incluirlos.
- [Hecho] La Res. 165 de 2023 fue compilada en la **Resolución Única DIAN 000227 de 2025** (los artículos citan "compilado como artículo 1.5.1.x en la Resolución 227 de 2025") — [Normograma DIAN, Res. 165 de 2023](https://normograma.dian.gov.co/dian/compilacion/docs/resolucion_dian_0165_2023.htm). Para normas posteriores al 1-oct-2026, la referencia vigente es la Res. 227 de 2025.

**Jurisprudencia 2025 (cambio relevante, no estaba en el escaneo preliminar)**
- [Hecho, fuente secundaria] El Consejo de Estado, Sección Cuarta, **Sentencia 29509 del 10-jul-2025**, anuló el Oficio DIAN 908749 de 2022 y los oficios o conceptos 2999 y 7058 de 2024. Esa doctrina exigía que los mensajes de acuse se enviaran "antes de solicitar el IVA descontable" y en el mismo período. La razón: "la DIAN carece de competencia para crear requisitos adicionales a los previstos en la ley" — [INCP, 17-jul-2025](https://incp.org.co/publicaciones/infoincp-publicaciones/impuestos/2025/07/acuse-de-recibo-de-la-factura-electronica-para-descontar-el-iva-consejo-de-estado-anulo-interpretacion-de-la-dian/); [Actualícese, 17-jul-2025](https://actualicese.com/consejo-de-estado-anula-doctrina-de-la-dian-sobre-acuses-de-recibo-en-factura-electronica/) ("confundió el soporte del impuesto con la oportunidad para solicitarlo"). Radicado 11001-03-27-000-2024-00079-00 (solo snippet) — [CERLATAM](https://www.cerlatam.com/normatividad/consejo-de-estado-sentencia-29509-de-2025/). No se leyó el texto de la sentencia.
  - **Prueba:** los eventos siguen siendo **requisito de soporte**, pero **no de oportunidad**. El contribuyente puede enviarlos después y conservar el IVA según el art. 496 ET.
  - **No prueba:** cómo audita hoy la DIAN la falta de eventos.
- [Hecho, fuente secundaria] El INCP (4-dic-2025) reitera que, según la sentencia, "ni el artículo 616-1 ni el artículo 496 del Estatuto Tributario establecen un requisito de plazo para el envío de los acuses de recibo" — [INCP, 4-dic-2025](https://incp.org.co/publicaciones/2025/12/el-acuse-de-recibo-en-la-factura-electronica-precisiones-del-consejo-de-estado-sobre-su-incidencia-en-el-iva-descontable/).

**Cambios 2026 en trámite**
- [Hecho] MinCIT publicó un **proyecto de decreto** para modificar los arts. 2.2.2.53.3, 2.2.2.53.4 y 2.2.2.53.12 del Decreto 1074 de 2015 (cap. 53, introducido por el Decreto 1154 de 2020), con comentarios hasta el **7-feb-2026**. Propone:
  - que el registro RADIAN aplique solo a facturas "que se constituyan como título valor y tengan vocación de circulación";
  - que la aceptación cuente desde los "tres días hábiles siguientes a la recepción de la factura electrónica";
  - que tras la aceptación no proceda inscribir notas crédito o débito.

  Fuentes: [INCP, 29-ene-2026](https://incp.org.co/publicaciones/infoincp-publicaciones/impuestos/2026/01/proyecto-de-decreto-buscaria-aclarar-la-aplicacion-del-radian-y-la-aceptacion-de-la-factura-electronica-como-titulo-valor/); [Siempre al Día](https://siemprealdia.co/colombia/impuestos/factura-electronica-como-titulo-valor/) ("borrador en consulta pública […] aún no está vigente"); [memoria justificativa MinCIT](https://www.mincit.gov.co/normatividad/proyectos-de-normatividad/proyectos-de-decreto-2026/23-01-2026-mj-pd-circulacion-factura-electronica-d.aspx) (no leída).
  - **Prueba:** el Gobierno busca acotar RADIAN a facturas que circulan.
  - **No prueba:** que el decreto se haya expedido. [Ámbito Jurídico](https://www.ambitojuridico.com/noticias/general/tributario-y-contable/reglamentan-circulacion-de-factura-electronica-como-titulo) devolvió HTTP 403, y el texto del Decreto 1154 de 2020 en [Función Pública](https://www.funcionpublica.gov.co/eva/gestornormativo/norma_pdf.php?i=139610) devolvió HTTP 503.
  - **No afecta** el texto del art. 616-1 ET, que es ley.

**Qué dicen los proveedores (para separar hecho de afirmación comercial)**
- [Hecho-proveedor, coincide con la ley] consultorcontable: "De cara al comprador, y solamente cuando la factura sea a crédito, es obligatorio realizar mínimo dos (2) acuses"; la aceptación expresa (033) solo es relevante para RADIAN/título valor. Pub. "AC 13-03-2025". Vende un "CUFE DOWNLOADER" — [consultorcontable](https://www.consultorcontable.com/acuse-de-recibo-y-el-radian/).
- [Hecho-proveedor, impreciso] La ayuda de Siigo describe el proceso "exigido por la DIAN" como acuse, recibo **y aceptación expresa** (solo snippet) — [Siigo, Resolución 85](https://siigofacturacionpro.portaldeclientes.siigo.com/resolucion-85-registro-de-eventos-en-factura-electronica-de-proveedores/). Mezcla el requisito comercial con el tributario.
- [Hecho-proveedor, exagerado] SisteAcuse titula "¿Qué son los eventos RADIAN y por qué son obligatorios en Colombia?" y automatiza 030+032+**033** por defecto — [SisteAcuse](https://sisteacuse.com/). Enviar 033 automáticamente **acepta** la factura como título valor, con efectos comerciales para el comprador ([Hipótesis] riesgo de responsabilidad si la herramienta acepta facturas con errores).

**Fiscalización (presión real de la DIAN)**
- [Hecho] La DIAN 2025 ajustó el piloto de "transacciones exorbitantes" (17.174 oficios; 4.122 notas crédito) para "contemplar correcciones mediante notas crédito y situaciones en las que las facturas cuentan con aceptación expresa o registro en RADIAN" — [DIAN, Informe de Gestión 2025, p. 17](https://www.dian.gov.co/atencionciudadano/Documents/Informe-de-Gestion-DIAN-2025-30012026-V2.pdf).
  - **Prueba:** la DIAN usa los eventos como señal en sus modelos de control.
  - **No prueba:** que rechace costos por falta de 030/032 a escala.

### Inferences
- [Hipótesis] El argumento de venta legalmente defendible es: "en sus compras **a crédito**, sin 030 y 032 la factura no queda como soporte pleno de costos e IVA; detéctelas y corríjalas antes de que la DIAN lo haga". **No** es defendible decir "debe aceptar en 3 días o pierde el IVA". Tras la Sentencia 29509, el contador puede regularizar eventos atrasados, lo que **baja la urgencia** pero **sube el valor de una auditoría periódica** de pendientes (limpiar el atraso de meses).
- [Hipótesis] Una herramienta que envíe **033 automático** transfiere un riesgo comercial al cliente (aceptación irrevocable). La opción prudente es 030+032 por defecto y 033 opcional.
- [Hipótesis] La "conciliación DIAN vs. contabilidad" se vende como control de riesgo (ingresos y costos que la DIAN ve vs. los que el cliente declara), no como cumplimiento de una norma específica.

### Gaps
- No se leyó el texto completo de la Sentencia 29509 ni se confirmaron el radicado y el ponente en la relatoría del Consejo de Estado.
- No se pudo leer el Decreto 1154 de 2020 (Función Pública HTTP 503; Normograma DIAN 404) ni confirmar si el proyecto MinCIT 2026 se expidió como decreto antes del 1-oct-2026.
- No se encontraron conceptos DIAN 2025–2026 posteriores a la sentencia ni casos públicos de rechazo de costos o IVA por ausencia de eventos 030/032.

---

## P2. ¿Cómo lo hacen hoy los contadores y cuánto les cuesta? (portal DIAN 2026, trabajo manual, outsourcing)

### Takeaway
El portal DIAN ("Facturando electrónicamente" / catalogo-vpfe) permite gratis tres cosas: listar documentos recibidos y emitidos con descarga a Excel, consultar o descargar por CUFE, y registrar eventos en la solución gratuita (uno a uno, sin evidencia de modo masivo). El acceso es por token al correo del representante legal o por usuarios autorizados. En 2026 la DIAN **endureció la consulta** (CAPTCHA interno el 18-jun-2026; NIT y bloqueo de bots el 28/30-jul-2026). El costo manual se puede estimar con el salario de un auxiliar contable ($1,5–2,5 M/mes en Neiva), pero **no hay datos de horas por NIT**.

### Cited Findings

**Funcionalidad oficial del portal en 2026**
- [Hecho] La DIAN dice a los compradores que pueden "informar un correo electrónico a donde le enviaran la Factura Electrónica" y que "con el número de CUFE O UUID puede consultar el documento electrónico" en catalogo-vpfe. La página no menciona descargas masivas ni eventos (s.f.) — [DIAN, Para los compradores](https://www.dian.gov.co/impuestos/factura-electronica/como-hacerlo/Paginas/para-los-compradores.aspx).
- [Hecho, vía terceros] Existe exportación oficial a Excel del listado de documentos recibidos y emitidos en catalogo-vpfe. N1 la usa como insumo ("descargar el Excel desde `catalogo-vpfe.dian.gov.co` y subirlo") — [N1 wiki, Importar desde DIAN](https://n1.app/wiki/importacion-documentos/importar-desde-dian). Alegra recomienda consultar "máximo por semanas" (ya en el escaneo preliminar).
- [Hecho-desarrollador] Un desarrollador de Ciolix documentó el 20-sep-2026 que "Al listado de la DIAN se le pedía UNA sola página de 150 documentos" y que "En un rango con más de 150 se recibían los más nuevos y los MÁS VIEJOS se perdían en silencio" — [GitHub, smart-causation PR #13](https://github.com/EHM2396/smart-causation/pull/13).
  - **Prueba:** el listado se pagina de a 150 documentos, y las herramientas mal hechas pierden documentos sin avisar (riesgo de calidad para cualquier competidor, incluido el fundador).
- [Hecho] La solución gratuita DIAN permite asociar "Acuse de Recibo de la FEV" y "Recibo del bien o prestación del servicio" desde Histórico → Documentos Recibidos. El acuse solo se puede asociar si la factura "no tiene ningún evento asociado". Requiere estar habilitado en la modalidad Solución Gratuita, certificado digital vigente y rangos de numeración para eventos (solo snippet) — [DIAN, instructivo eventos](https://www.dian.gov.co/impuestos/factura-electronica/Documents/Como-asociar-los-eventos-acuse-de-recibo-Factura-Electronica.pdf).
  - **No prueba:** que exista registro masivo. No se encontró evidencia de un modo por lotes oficial.
- [Hecho] La DIAN incorporó "roles de administración y operación, gestión de usuarios y permisos por perfiles" y la opción de "crear usuarios autorizados para ingresar al servicio gratuito, sin necesidad de recibir el token de acceso". También agregó la "Generación del contenedor electrónico (Application Response) a los documentos recibidos" (s.f.) — [DIAN micrositio, ABECÉ nuevas funcionalidades](https://micrositios.dian.gov.co/sistema-de-facturacion-electronica/abece-nuevas-funcionalidades-servicio-gratuito-de-factura-electronica/).
  - **Prueba:** un contador puede tener acceso propio sin depender del token del representante legal (al menos en la solución gratuita).
  - **No prueba:** que aplique al listado de recibidos para quien usa un proveedor tecnológico.
- [Hecho-snippet] El token llega al correo del RUT (persona natural) o al del representante legal (persona jurídica) — [Cronista](https://www.cronista.com/colombia/finanzas-y-economia/dian-asi-puedes-descargar-tu-factura-electronica-sin-costo/) y guías DIAN (solo snippet). QFe declara que el token dura 1 hora (escaneo preliminar).

**Cambios 2025–2026 en el portal (verificado y corregido frente al escaneo preliminar)**
- [Hecho-proveedor] Kontalid informa que **"el 18 de junio, en horas de la noche, la DIAN subió su nivel de seguridad activando un nuevo tipo de captcha interno que bloquea completamente cualquier descarga automatizada"**. Afectó a "todo el mercado" de automatización. Luego: "Debido a los cambios implementados por la DIAN en la noche del 28 de julio, ahora estas herramientas solicitan el NIT del emisor o receptor", y "el 30 de julio la DIAN agregó un paso de validación adicional en el cual los archivos descargados quedan protegidos con el NIT de la consulta" — [Kontalid, anuncios](https://kontalid.com.co/anuncios-general) (redirige desde kontalid.com/novedades; anuncios fechados jun–jul 2026).
- [Hecho-snippet] Kontalid también indica que retiró su "Descarga masiva de Documentos DIAN" **en mayo de 2025** por el "nuevo comportamiento del captcha" — [Kontalid, Descarga masiva](https://www.kontalid.com/info/descarga-masiva-documentos-dian/).
  - **Corrección:** el escaneo preliminar ubicó el cambio de CAPTCHA en 2026. Hubo **al menos tres** cambios: may-2025, 18-jun-2026 y 28/30-jul-2026.
- [Hecho, prensa especializada] Desde el **28-jul-2026**, "Buscar documento" exige el NIT del emisor o receptor y lo vuelve a pedir al descargar. Cuando la plataforma detecta "robots, automatizaciones o agentes de inteligencia artificial que podrían generar congestión" muestra "Solicitud bloqueada por controles de seguridad" y pide verificación humana — [Actualícese, 27-jul-2026](https://actualicese.com/dian-implementara-nuevo-control-de-seguridad-para-consultar-facturas-electronicas/); [Syscafe, 31-jul-2026](https://syscafe.com/2026/07/31/nuevas-medidas-de-seguridad-en-la-consulta-de-documentos-electronicos/); [INCP, jul-2026](https://incp.org.co/publicaciones/infoincp-publicaciones/impuestos/2026/07/dian-implementara-nuevo-mecanismo-de-validacion-en-la-consulta-de-factura-electronica/) (solo snippet).
  - **Prueba:** la DIAN apunta explícitamente contra la automatización del portal.
  - **No prueba:** que el listado autenticado con token esté bloqueado para humanos.

**Trabajo manual y su costo (proxy)**
- [Estimación, solo snippet] Hay ofertas de auxiliar contable en Neiva (2026) con rangos de "$1 a $1,5 millones", "$1,5 a $2 millones" y "$2 a $2,5 millones", y una de "$1.800.000 + bono de $200.000" — [elempleo, auxiliar contable Neiva](https://www.elempleo.com/co/ofertas-empleo/trabajo-auxiliar-contable-neiva); [Computrabajo Neiva](https://co.computrabajo.com/ofertas-de-trabajo/oferta-de-trabajo-de-auxiliar-contable-asistente-contable-en-neiva-ED064B49A9D7C17A61373E686DCF3405). Una oferta específica leída ("Auxiliar Contable Tributario", Neiva) es del **16-feb-2025**, ya no está disponible y no menciona DIAN ni eventos — [elempleo](https://www.elempleo.com/co/sitio-empresarial/elempleo-fest/auxiliar-contable-tributario-neiva-1886413643).
- [Estimación, solo snippet] Ofertas nacionales de auxiliar contable (2026) incluyen funciones como "eventos de acuse de recibo de facturas de compra a crédito" y "gestionar los 3 eventos obligatorios", con salarios de $2.000.000 y $2.200.000 (Barranquilla) — [elempleo, auxiliar contable](https://www.elempleo.com/co/ofertas-empleo/trabajo-auxiliar-contable); la oferta de [Computrabajo Bogotá](https://co.computrabajo.com/ofertas-de-trabajo/oferta-de-trabajo-de-auxiliar-contable-en-bogota-dc-7f425c3a27df137161373e686dcf3405) devolvió contenido vacío.
  - **Prueba (débil):** la tarea aparece en descripciones de cargo.
  - **No prueba:** horas dedicadas por NIT.
- [Hipótesis, cálculo] Costo empleador de un auxiliar de $1,75–2,5 M + prestaciones (factor supuesto 1,52) + auxilio de transporte ≈ $2,9–4,0 M/mes ≈ **$15.000–$21.000 por hora** (192 h/mes). Si la descarga, cruce y eventos toman 1–3 h por NIT al mes (supuesto **no verificado**), el costo interno sería **≈ $15.000–$63.000 por NIT al mes**. Este es el "techo de valor" que justificaría el precio; debe medirse en entrevistas.
- [Hecho-proveedor] SisteAcuse afirma ahorrar "240+ horas al mes" valoradas en "$540.000 mensuales" (solo snippet) — [SisteAcuse](https://sisteacuse.com/). Esa cifra implica ~$2.250 por hora, inconsistente con salarios reales; **no usar**.

**Outsourcing**
- [Hecho] Forvis Mazars vende "Conciliación Token DIAN y documentos electrónicos" como outsourcing mensual (ya en el escaneo preliminar, sin precio).
- [Estimación, proveedor] Honorarios mensuales de contabilidad de una pyme: "$600.000 – $1.200.000" (pymes con IVA, retención y hasta 50 facturas al mes), "1 – 2 SMMLV" u "$800.000 y $1.500.000" (solo snippet) — [SisteAcuse blog, honorarios 2026](https://sisteacuse.com/blog/honorarios-servicios-contables-colombia-2026); [Siigo blog](https://www.siigo.com/blog/contabilidad-finanzas/cuanto-debe-cobrar-un-contador-en-colombia/).
  - **Prueba:** una herramienta a $15.000/NIT/mes equivaldría a ~1–2,5 % del honorario mensual del contador por ese cliente ([Hipótesis] margen de absorción razonable).

### Inferences
- [Hipótesis] El flujo típico del contador es: (1) entrar al portal por cada NIT con token u usuario autorizado; (2) exportar el listado por semanas (páginas de 150 documentos); (3) bajar los XML que falten; (4) llevarlos al software contable; (5) marcar 030/032 en las compras a crédito. Los pasos 1–3 son los que la DIAN está bloqueando para robots; el 4 ya lo resuelven parcialmente Siigo, Alegra, N1 y Ciolix; el 5 lo resuelven SisteAcuse, QFe, Alegra y Siigo.
- [Hipótesis] El valor pagable está en el **cruce** (qué está en la DIAN y no en la contabilidad, y al revés) y en la **lista de pendientes de eventos** por NIT, no en la descarga.

### Gaps
- No hay datos de horas reales por NIT ni de cuántos documentos recibe una pyme típica de Neiva al mes. Hay que medirlo en entrevistas.
- No se pudo verificar en la DIAN el texto oficial del bloqueo del 18-jun-2026 (solo hay fuente de proveedor) ni si afecta al listado autenticado.
- No se encontraron ofertas vigentes en Neiva que mencionen literalmente "eventos RADIAN" o "conciliación DIAN" con salario visible.

---

## P3. Competencia: comparación de alternativas (oferta, precio público, acceso a datos DIAN, RADIAN y multi-NIT)

### Takeaway
Se identificaron **≥14 alternativas**, en tres grupos: herramientas de nicho para contadores (QFe, consultorcontable, Kontalid, SisteAcuse, N1, Ciolix, Contamas, accounter.co, macros SoyExcel), suites contables incumbentes (Alegra, Siigo, ContaPyme, World Office, Helisa, Loggro) y servicio (Forvis Mazars). **Ya existen** multi-NIT barato para eventos (SisteAcuse desde $11.000/NIT/año), conciliación DIAN vs. contabilidad (Kontalid Elite, $527.700/año) y causación desde la DIAN integrada con World Office de escritorio y Siigo (N1, $750/documento). El mercado está saturado en funciones; la diferenciación posible es estrecha.

### Cited Findings

Tabla comparativa (precios públicos al 2026-10-01; "/NIT/mes" calculado por el investigador):

| # | Alternativa | Cliente objetivo | Oferta | Precio público | ≈ por NIT/mes | Acceso a datos DIAN | RADIAN | Multi-NIT | Fuente |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **QFe Collector** | Empresas y contadores | App Windows: descarga PDF/XML, eventos 030/032/033/031 por lotes, reporte de crédito, auditoría RADIAN, lector XML por tarifa IVA | $500.000/año promo (regular $600.000) por licencia anual; prueba de 7 días | $41.700–50.000 (si es por NIT) | Token del portal (1 h); certificado para eventos; local ("No almacenamos tus claves") | Sí, por lotes | Organiza por NIT; licencia por empresa (escaneo preliminar) | [qfecollector.com](https://qfecollector.com/) [Hecho-proveedor] |
| 2 | **consultorcontable, Procesador XML FE** | Contadores | Extensión Chrome/Edge: listado Excel de hasta 65 campos, XML/PDF de emitidos y recibidos | $249.000 IVA incl./año, 2 PC | n.d. (por licencia) | Token; "no aplican devoluciones" si la DIAN bloquea | No (vende aparte el "CUFE DOWNLOADER" de verificación) | No especifica | [consultorcontable](https://www.consultorcontable.com/descargador-xml-fe/) [Hecho-proveedor] |
| 3 | **Kontalid** (PRO/Premium/Elite/Teams) | Contadores y equipos | Suite de herramientas; Elite incluye "Lector XML PRO" y **"Conciliación DIAN"** ("identifica y asocia los documentos electrónicos con su respectivo comprobante contable") | Pro $167.700; Premium $297.700; Elite $527.700 al año; Teams Premium desde $803.790; Teams Elite desde $1.424.790; **$150.000 por cada empresa adicional** para implementar el certificado | Elite ≈ $43.975/mes por suscripción | Desde jun-jul 2026, "conexión directa con la DIAN" que "Requiere un certificado digital propio de cada cliente" | Sí ("Consulta de Eventos DIAN") | Sí (con costo por certificado) | [Kontalid anuncios](https://kontalid.com.co/anuncios-general); [Lector XML PRO y Conciliación](https://www.kontalid.com/info/lector-xml-pro/) [Hecho-proveedor]. La conciliación "no se guarda" y los procesos duran 3 meses |
| 4 | **SisteAcuse** | Empresas y contadores | Web: eventos 030/032/033 masivos y auto-acuse programado; reportes a Excel | Pyme $150.000/año (1 empresa; +$50.000 por empresa adicional); Contador $250.000 (10); Contador Pro $350.000 (20); Contador Max $550.000 (50) | **$917–2.083** | "consulta directamente al servidor de la DIAN"; snippet: se conecta al buzón de correo | Sí, masivo | Sí (hasta 50) | [sisteacuse.com](https://sisteacuse.com/) [Hecho-proveedor]; "240+ empresas y contadores" |
| 5 | **N1** | Outsourcing contable y contadores independientes | Importa de DIAN o correo, extrae datos con IA, envía eventos (acuse, recibo, aceptación) y exporta la causación | $900 por causación suelta; $750 por causación con suscripción mensual; 25 gratis | Depende del volumen (40 compras/mes ≈ $30.000) | "API oficial DIAN" con el Excel del portal (requiere habilitación con Soluciones Alegra como PT); buzones Gmail/Outlook | Sí (automático o por lotes) | Sí | [n1.app](https://www.n1.app/); [wiki](https://n1.app/wiki/importacion-documentos/importar-desde-dian) [Hecho-proveedor]. Integra Siigo, Alegra, Odoo, **World Office Cloud y Escritorio**, Aliaddo; Helisa "próximamente"; "1.000.000+ facturas procesadas" |
| 6 | **Ciolix** | Contadores que usan Siigo | Lee facturas DIAN, sugiere cuentas con IA y genera el archivo de importación Siigo | No visible | n.d. | Token del usuario, o carga de XML/ZIP/PDF/Excel | No visto | n.d. | [GitHub Ciolix/smart-causation](https://github.com/EHM2396/smart-causation) [Hecho]; activo en sep-2026 (PR #13) |
| 7 | **Contamas, Descargador masivo PDF** | Contadores | Excel/macro: PDF masivo, XML y reporte consolidado | $200.000 | n.d. | Certificado digital (solo snippet) | No | n.d. | [contamas.com](https://contamas.com/product/descargador-masivo-pdf-facturas-y-documentos-dian/) [Hecho-proveedor, snippet] |
| 8 | **accounter.co, Verificador RUT + Lector de Eventos** | Contadores, revisores fiscales | Extensión que verifica los eventos de compras "necesarios para la deducibilidad fiscal" | $149.900 IVA incl. (antes $178.381), 12 meses | n.d. | Consulta pública DIAN: "Uso condicionado a la disponibilidad de consulta pública" | Solo lectura | n.d. | [accounter.co](https://accounter.co/servicios/herramientas/verificador-masivo-de-rut-y-lector-de-eventos-de-facturas-electronicas-aplicativos-automatizados-dian) [Hecho-proveedor] |
| 9 | **SoyExcel** (macros VBA) | Contadores y empresas | Lector XML FE v1.2 y Lector de Eventos | $130.000 cada uno (solo snippet) | n.d. | XML local; consulta web DIAN | Lectura | n.d. | [SoyExcel](https://soyexcel.wordpress.com/2022/09/17/lector-xml-factura-electronica-dian/) [Hecho-proveedor, snippet]. No se encontraron listados en Hotmart |
| 10 | **Alegra** (incumbente) | Pymes; contadores gratis | Sincroniza desde la DIAN; "Buzón inteligente"; eventos y aceptar/rechazar "con un solo clic"; "Conciliación fiscal" | Espacio Contador "100% gratuito"; la pyme paga Emprendedor $69.900, Pyme $149.900, Pro $219.900 o Plus $279.900 al mes | $0 para el contador | Token (sincronización); buzón con Soluciones Alegra como PT | Sí (requiere buzón configurado) | Sí ("Más de 1700 firmas") | [Alegra contadores](https://www.alegra.com/colombia/contadores/); [Ayuda buzón](https://ayuda.alegra.com/col/buzon-de-recepcion-de-comprobantes-electronicos); precios: [programascontabilidad, 29-abr-2026](https://programascontabilidad.com/comparativas-de-software/precios-de-software-contable-colombia-2026/) [Hecho-proveedor / Estimación de tercero] |
| 11 | **Siigo** (incumbente) | Pymes y contadores | Siigo Nube: registro de eventos, importación de compras desde XML/ZIP (≤3 MB, ≤500 registros, "Causación DIAN" en el plan Profesional independiente). Siigo Contador: multiempresa | Siigo Contador gratis (1 empresa); **Siigo Contador Ilimitado $535.900/año** (empresas ilimitadas); Nube Profesional independiente $1.642.425/año; Emprendedor $2.152.425; Premium $2.494.425 | Contador Ilimitado: $0–$44.658 por todas las empresas | XML/ZIP cargado por el usuario; detalle de "Causación DIAN" no verificado | Sí (en Nube) | Sí (Contador) | [siigo.com/precios-siigo](https://www.siigo.com/precios-siigo/); [Siigo Contador](https://www.siigo.com/siigo-contador/); [ayuda XML/ZIP](https://siigonube.portaldeclientes.siigo.com/elaborar-factura-de-compra-desde-un-xml-o-zip/) (snippet) [Hecho-proveedor]. En la página de Siigo Contador no aparece importación DIAN |
| 12 | **ContaPyme** (incumbente, escritorio) | Pymes y contadores | "Recepción de Documentos" integrada; convierte facturas de proveedores en operaciones contables; 4 eventos por factura a crédito | "Soluciones desde $205.000/año antes de IVA" | n.d. | No especifica | Sí | n.d. | [ContaPyme servicios electrónicos](https://www.contapyme.com/servicios-electronicos/) [Hecho-proveedor] |
| 13 | **World Office** (incumbente, escritorio) | Contadores y pymes | Licencia Contador multiempresa ("1 Licencia de Escritorio…+N Empresas o NIT") | Contador $809.200 IVA incl. (−32 %; lista $1.000.000) + renovación anual del 15 % (≈ $121.380) | Bajo | Recepción y eventos "en Pyme Plus y superiores" (solo snippet) | Parcial (snippet) | Sí | [World Office escritorio](https://www.worldoffice.com.co/planesEscritorio.html) [Hecho-proveedor]; recepción: [WO FE](https://worldoffice.com.co/facturacion-electronica/) (snippet) |
| 14 | **Helisa** (incumbente) | Pymes y contadores | ATEB Colombia (operador habilitado desde 2017); importa XML de proveedores y genera eventos (snippet) | Cotización | n.d. | n.d. | Sí (snippet) | n.d. | [Helisa FE](https://helisa.com/productos/facturacion-electronica/) (snippet) |
| 15 | **Forvis Mazars** (servicio) | Medianas y grandes | Outsourcing de conciliación token DIAN vs. contabilidad | Cotización | — | — | — | — | escaneo preliminar |

- [Hecho-proveedor] Otros mencionados sin precio revisado: [eventosradian.com](https://eventosradian.com/) (redirige a un panel; no se pudo leer la oferta), Loggro (pymes $108.990–$279.990/mes según [programascontabilidad](https://programascontabilidad.com/comparativas-de-software/precios-de-software-contable-colombia-2026/); recepción de compras a crédito en su blog), Mentora, Infacont, Facele, Clarisa, ITS Contable, misfacturas ("Mis Documentos Recibidos" con correo de recepción del PT), Odoo l10n_co. **No se revisaron** Facturatech, Carvajal ni Gosocket (gap).
- [Hecho] También hay desarrolladores construyendo lo mismo en abierto: [IngeFact](https://github.com/bernardootero95/IngeFact/pull/26) ("facturas recibidas por CUFE con flujo RADIAN (acuse, recibo, aceptación/rechazo)") y Ciolix.
  - **Prueba:** la barrera técnica de entrada es baja; habrá más clones.

### Inferences
- [Hipótesis] **Precio ancla real por NIT:** SisteAcuse fija un piso de ~$1.000–2.100/NIT/mes para eventos multi-NIT; Alegra y Siigo regalan o abaratan la capa del contador. QFe ($41.700–50.000) parece un precio de empresa individual, no de contador con 20 NIT. Un precio de $15.000–40.000/NIT/mes solo se sostiene si la herramienta entrega **conciliación persistente + pendientes de eventos + exportación a cualquier software**. Ni siquiera eso es único: Kontalid Elite cobra ~$44.000/mes por **toda** la suscripción, no por NIT.
- [Hipótesis] La propuesta "por NIT al mes" choca con la norma del mercado: precios **anuales por licencia** (QFe, consultorcontable, Kontalid, SisteAcuse, accounter, Siigo Contador, World Office) o **por documento** (N1). Cobrar por NIT al mes es diferenciador en la forma, pero puede leerse como más caro.
- [Hipótesis] Los incumbentes cubren a quien ya tiene **toda** su cartera en Alegra o Siigo. El espacio que queda es el contador con cartera **mixta** (World Office escritorio, Helisa, ContaPyme, Excel), y N1 ya apunta ahí.

### Gaps
- No se verificó si los precios de QFe y Kontalid son por NIT o por usuario (la página de suscripciones de Kontalid no mostró precios; se tomaron de su página de anuncios).
- No se pudo leer la oferta y precio de eventosradian.com ni de Facturatech, Carvajal, Gosocket ni Loggro (recepción).
- No hay número de clientes verificable de ningún competidor salvo autodeclaraciones: SisteAcuse 240+, Alegra 1.700 firmas, N1 1 M de facturas y ~10 logos en QFe.
- Búsqueda de macros en Hotmart: la consulta "Hotmart macro Excel lector XML factura electrónica DIAN" no devolvió listados de Hotmart; los vendedores de macros venden directo (SoyExcel, Contamas, Impuestos con Botas).

---

## P4. Dependencia técnica: ¿hay API o web service oficial para que un receptor obtenga sus documentos? ¿Qué tan robusta es cada ruta?

### Takeaway
**No existe un servicio oficial que liste los documentos recibidos por NIT y fecha.** Sí existen web services SOAP oficiales del Anexo Técnico 1.9:
- **GetXmlByDocumentKey:** descarga el XML por CUFE si el usuario se autentica con certificado digital del NIT emisor o receptor.
- **GetStatusEvent:** consulta los eventos de una factura.
- **SendEventUpdateStatus:** envía eventos.
- **GetExchangeEmails:** consulta los correos de recepción.

Usarlos requiere certificado digital por cliente y habilitación. Ser proveedor tecnológico está fuera del alcance del fundador: exige sociedad, patrimonio ≥ 20.000 UVT (≈ $1.047 millones) e ISO 27001. La ruta más robusta para un solo fundador es **buzón de correo dedicado (canal legal) + Excel del portal exportado por el usuario + GetXmlByDocumentKey con el certificado del cliente para completar**, evitando el scraping del portal.

### Cited Findings
- [Hecho] Anexo Técnico de Factura Electrónica de Venta v1.9 (adoptado por la Res. 000165 del 01-nov-2023), §7.14 "WS descarga de XML (GetXmlByDocumentKey)": "Este servicio permite descargar el UBL de DE a través de la consulta del CUFE. Se valida que el usuario autenticado, por certificado digital, corresponda al NIT de la empresa emisora o receptora del UBL consultado". Parámetro: "TrackId o CUFE del DE"; responde el XML en base64 (p. 353 de 753) — [DIAN, Anexo Técnico v1.9 (PDF)](https://www.dian.gov.co/impuestos/factura-electronica/Documents/Anexo-Tecnico-Factura-Electronica-de-Venta-vr-1-9.pdf) (descargado y leído el 2026-10-01).
  - **Prueba:** un receptor puede bajar oficialmente sus XML **si ya conoce los CUFE** y tiene certificado.
  - **No prueba:** que se pueda listar lo recibido.
- [Hecho] Misma fuente, §7.16 "GetExchangeEmails" ("devuelve una lista en base64 de los correos electrónicos de los facturadores que registraron este sobre el ambiente de habilitación o producción para la recepción de facturas electrónicas"); §7.17 "GetStatusEvent" (requiere el CUFE); §7.13 "SendEventUpdateStatus"; §7.18 "GetReferenceNotes" (notas crédito asociadas a una factura). El índice de servicios **no incluye ningún método de listado por NIT o rango de fechas**.
- [Hecho] Res. 165 de 2023: el adquirente facturador electrónico recibe la factura "en el formato electrónico de generación, es decir el XML y el formato digital de representación gráfica, los cuales deben estar incluidos en el contenedor electrónico", y lo recibe "1.1. Por correo electrónico a la dirección electrónica suministrada por el adquirente en el procedimiento de habilitación como facturador electrónico, que podrá ser consultada en el servicio informático electrónico de validación previa […], o por cualquier otro medio o dispositivo electrónico que señale el adquirente" — [Normograma DIAN, Res. 165 de 2023](https://normograma.dian.gov.co/dian/compilacion/docs/resolucion_dian_0165_2023.htm).
  - **Prueba:** el **correo de recepción es el canal legal** de entrega del XML y el adquirente puede cambiarlo.
  - **Prueba:** un buzón dedicado administrado por la herramienta es una ruta legítima, como hacen Alegra, misfacturas y N1.
- [Hecho] Requisitos para ser proveedor tecnológico (Res. 165/2023, art. 55, compilado como art. 1.5.1.8.1.1 en la Res. 227 de 2025): "Estar constituido como sociedad"; patrimonio "igual o superior a veinte mil (20.000) Unidades de Valor Tributario", con propiedad, planta y equipo ≥ 10.000 UVT; "certificación […] conforme con la Norma ISO 27001" — [Normograma DIAN, Res. 165 de 2023](https://normograma.dian.gov.co/dian/compilacion/docs/resolucion_dian_0165_2023.htm). Con la UVT de 2026: 20.000 UVT ≈ $1.047.480.000 y 10.000 UVT ≈ $523.740.000 (cálculo propio).
  - **Prueba:** el fundador no puede ser PT. Debe operar con el certificado y la habilitación de cada cliente, o como herramienta del contador.
- [Hecho] La DIAN tiene 97 proveedores tecnológicos habilitados al 31-ago-2026 (57 en Bogotá; ninguno en Neiva en la lista por ciudad) — [DIAN, Consolidado Cifras SFE](https://micrositios.dian.gov.co/sistema-de-facturacion-electronica/consolidado-cifras-sfe/).
- [Hecho-proveedor] Kontalid migró sus herramientas a "conexión directa con la DIAN, usando los mecanismos de seguridad exigidos", que "Requiere un certificado digital propio de cada cliente", y cobra $150.000 por empresa adicional — [Kontalid anuncios](https://kontalid.com.co/anuncios-general).
  - **Prueba:** el mercado ya se está moviendo de token/scraping a certificado + web service tras los bloqueos de 2026.
- [Hecho-proveedor] N1 importa "a través de la API oficial de la DIAN" a partir del Excel del portal y exige que la empresa esté habilitada "con Soluciones Alegra S.A.S" como PT — [N1 wiki](https://n1.app/wiki/importacion-documentos/importar-desde-dian).
  - **Prueba:** el patrón "Excel del portal + WS por CUFE" es viable, pero N1 lo hace apoyado en un PT.
- [Hecho, información en conflicto]
  - La DIAN ofrece un certificado digital **gratuito** de un año a quien usa la Solución Gratuita (solo snippet) — [DIAN, Facturación gratuita](https://micrositios.dian.gov.co/sistema-de-facturacion-electronica/facturacion-gratuita-dian/).
  - Un vendedor de certificados afirma que el gratuito "solo funciona dentro de la solución gratuita de la DIAN: no está pensado para integrarse con software contable de terceros" y vende el suyo a $190.000 — [ConCertificado, 4-jun-2026](https://concertificado.com/blog/certificado-digital-dian-gratis-vs-pago/) [Hecho-proveedor, interesado].
  - QFe dice usar un "certificado digital gratuito (otorgado por la DIAN)" para emitir eventos — [QFe](https://qfecollector.com/).
  - **Conflicto no resuelto.**
- [Hecho, ruta frágil] El scraping del portal sufrió bloqueos en may-2025, 18-jun-2026 y 28/30-jul-2026 (ver P2). consultorcontable advierte "no aplican devoluciones" si hay bloqueos, y accounter condiciona el uso "a la disponibilidad de consulta pública por parte de la DIAN" — [consultorcontable](https://www.consultorcontable.com/descargador-xml-fe/); [accounter.co](https://accounter.co/servicios/herramientas/verificador-masivo-de-rut-y-lector-de-eventos-de-facturas-electronicas-aplicativos-automatizados-dian).

Evaluación de rutas (todas [Hipótesis] basadas en los hechos anteriores):

| Ruta | Legalidad / base | Robustez | Costo para el cliente | Cobertura | Comentario |
|---|---|---|---|---|---|
| A. Scraping del portal con token (descarga automática de listados y XML) | Zona gris: la DIAN declara que bloquea "robots, automatizaciones o agentes de IA" | **Baja**: 3 rupturas documentadas en 15 meses | Bajo | Total | Es la ruta de la mayoría de los competidores baratos; riesgo de quedar sin producto de un día para otro |
| B. Buzón de correo dedicado (el cliente registra en la DIAN o con su PT el correo de recepción administrado por la herramienta) | **Legal**: canal de entrega de la Res. 165/2023 | **Alta** (correo estándar, AttachedDocument con XML + CUFE) | Bajo | Parcial: solo lo que los emisores envían bien; no cubre lo emitido ni lo que llegó a otro correo | Lo usan Alegra, N1 y misfacturas; requiere que el cliente cambie su correo de recepción (fricción) |
| C. Excel del portal exportado manualmente + **GetXmlByDocumentKey** con el certificado del cliente | **Legal**: WS oficial; el humano exporta el listado | **Media-alta**: el WS es SOAP estable y documentado; el Excel depende del portal, pero lo hace un humano | Certificado por NIT (gratis DIAN en disputa o ≈ $190.000/año pagado) + habilitación | Total (todo lo que la DIAN lista) | Es el patrón de N1 y Kontalid 2026; agrega fricción de certificados por cliente |
| D. Integración con el PT del cliente (APIs de Alegra, Siigo, etc.) | Legal (API del PT) | Media (depende de cada PT) | Incluido en el PT | Parcial | Fragmentado entre 97 PT |
| E. Ser PT | Legal | Alta | — | Total | **Inviable**: 20.000 UVT + ISO 27001 + sociedad |

### Inferences
- [Hipótesis] Diseño mínimo viable robusto: **B + C**. El buzón captura el 80–90 % sin fricción mensual, y el Excel mensual del portal sirve para encontrar "lo que la DIAN tiene y no llegó al buzón". Para lo que falte, se usa el WS por CUFE si el cliente tiene certificado, o descarga manual guiada. No conviene construir el negocio sobre la automatización del portal.
- [Hipótesis] El envío de eventos (030/032) desde software de terceros requiere que el adquirente esté habilitado en RADIAN con alguna modalidad (software propio, PT o solución gratuita) y tenga certificado. Si el fundador no puede emitir eventos sin ser PT ni usar la habilitación del cliente, el producto debería **detectar y reportar** pendientes y dejar la emisión en la herramienta del cliente (Alegra, Siigo, solución gratuita) o en un tercero (SisteAcuse), en vez de emitirlos.

### Gaps
- **Crítico:** no se verificaron en el Anexo RADIAN v2.0 los requisitos exactos para que un software de un tercero no PT emita eventos (SendEventUpdateStatus) a nombre de varios NIT. Debe validarse antes de prometer "automatización de eventos".
- No se verificó si el WS GetXmlByDocumentKey exige además un SoftwareID habilitado o solo el certificado del NIT.
- No se resolvió si el certificado gratuito de la DIAN sirve fuera de la solución gratuita.
- No se encontró el texto de términos de uso del portal DIAN que prohíba la automatización (búsqueda sin resultados relevantes); la evidencia es el comportamiento técnico (bloqueos).

---

## P5. Tamaño de mercado: contadores, NIT que reciben facturas y estimación bottom-up

### Takeaway
No hay conteo oficial vigente de contadores independientes ni de NIT con contador externo. La JCC siguió caída (HTTP 503) y su última cifra accesible por snippet es de 2023–2024. Con supuestos explícitos, el mercado direccionable va de **≈ $1.900 millones/año (bajo)** a **≈ $53.000 millones/año (base)** y **≈ $255.000 millones/año (alto)**. La meta del fundador ($1,67 M/mes) requiere solo **≈ 50–355 NIT** según el precio: el tamaño de mercado **no es la restricción**; lo son la competencia y el precio.

### Cited Findings

**Contadores**
- [Hecho-snippet] JCC: 320.889 contadores "titulados autorizados" acumulados al 16-ene-2024; otro snippet da 311.111 activos, 6.901 fallecidos y 100 cancelados (318.112 en total) a oct-2023 — [JCC, estadísticas](https://www.jcc.gov.co/mis-consultas/consultar/consulta-de-estad%C3%ADsticas-de-contadores-p%C3%BAblicos-inscritos). **Ambas URLs de la JCC ([1](https://www.jcc.gov.co/mis-consultas/consultar/consulta-de-estad%C3%ADsticas-de-contadores-p%C3%BAblicos-inscritos), [2](https://www.jcc.gov.co/es/estadisticas-de-contadores)) devolvieron HTTP 503 el 2026-10-01, y curl falló por la cadena TLS del servidor.**
- [Hecho] La JCC informó 14.885 nuevos inscritos entre 2024 y 2025 (escaneo preliminar).
- [Hecho-snippet] El INCP declara 30.525 miembros entre contadores independientes, firmas y empresas — [INCP](https://www.facebook.com/incpcol/) (snippet de Facebook; sin fecha).
- [Hecho] Hay una asociación local, ASCONPHU (Asociación de Contadores Públicos del Huila), con sede en Neiva y personería desde 1959, que hace seminarios de actualización — [ASCONPHU](https://www.asconphu.org/quienessomos/) (solo snippet). No publica número de afiliados.
- [Hecho-terceros] Un directorio de agosto de 2026 lista 13 firmas o contadores en Neiva (10 firmas, 2 independientes y ASCONPHU), sin cifras de mercado — [Sterling & Co., 4-ago-2026](https://sterlingyco.com/mejores-contadores-publicos-neiva/) (autor con sesgo: es una de las firmas listadas).

**NIT que reciben facturas y llevan contabilidad**
- [Hecho] Hay 1.519.707 facturadores electrónicos habilitados acumulados a 2025, 847.292 emisores recibieron el extracto fiscal y 46.542 facturadores están habilitados en RADIAN — [DIAN, Informe de Gestión 2025, pp. 15-17](https://www.dian.gov.co/atencionciudadano/Documents/Informe-de-Gestion-DIAN-2025-30012026-V2.pdf).
- [Hecho] RADIAN entre enero y el 31-ago-2026: 1.200.284 facturas inscritas ($43,6 billones), 1.132.356 endosadas ($37,1 billones) y 23.447 cesiones de derechos. El micrositio muestra cifras mensuales de "FE habilitados" entre 13.055 y 17.189 en 2026, aparentemente habilitaciones nuevas por mes — [DIAN, Consolidado Cifras SFE](https://micrositios.dian.gov.co/sistema-de-facturacion-electronica/consolidado-cifras-sfe/).
- [Hecho, fuente secundaria] Tejido empresarial a junio de 2025 (RUES/Confecámaras): 1.531.437 empresas activas, de las cuales micro 1.446.152, pequeñas 64.263, medianas 15.364 y grandes 5.658. El stock a cierre de 2024 era de 1.739.405. 558.285 son empresarias mujeres (54,6 % de las personas naturales con empresa activa) — [MDC, 5-sep-2025](https://mdc.org.co/tejido-empresarial-colombia-2025/). Otra cifra: 1.805.564 empresas activas en 2025 (solo snippet) — [Notitoro](https://notitoro.com/colombia-aumento-empresas-activas/); las dos cifras no coinciden (cortes distintos).
- [Hecho] Huila: 39.281 unidades empresariales a 31-dic-2025 (19,16 % personas jurídicas). En el I semestre de 2026 se renovaron 6.736 personas jurídicas y 27.635 personas naturales. Neiva concentraba el 41,96 % del stock en 2024 — [CCH, Estimación del Potencial de Comerciantes 2025](https://www.cchuila.org/wp-content/uploads/Estimacion-del-Potencial-de-Comerciantes-CCH-2025.pdf) y [CCH, Estudio Económico Empresarial 2024](https://www.cchuila.org/wp-content/uploads/Estudio-Economico-Empresarial-2024-1.pdf), ambas citadas en `contexto_colombia.md`. Las renovaciones del I semestre de 2026 salen del Boletín de Dinámica Empresarial del Huila I-2026 de la CCH, leído en PDF; no se registró su URL exacta.

**Estimación bottom-up (todo [Hipótesis]; supuestos explícitos)**

| Supuesto | Bajo | Base | Alto |
|---|---|---|---|
| Universo de NIT | 79.627 (pequeñas + medianas RUES) | 847.292 (emisores con extracto fiscal DIAN) | 1.519.707 (facturadores acumulados) |
| % que lleva contabilidad, compra a crédito y la atiende un contador independiente o firma pequeña | 40 % | 35 % | 40 % |
| NIT direccionables | **31.851** | **296.552** | **607.883** |
| NIT por contador (sin dato; a validar) | 8 | 15 | 25 |
| Contadores objetivo | ~3.981 | ~19.770 | ~24.315 |
| Precio por NIT/mes | $5.000 | $15.000 | $35.000 |
| Mercado anual (COP) | ≈ $1.911 millones | ≈ $53.379 millones | ≈ $255.311 millones |
| ≈ USD (TRM 3.341) | ≈ 0,57 M | ≈ 16,0 M | ≈ 76,4 M |

- [Hipótesis] Segmento directo (contador interno de pyme): 64.263 pequeñas + 15.364 medianas ≈ 79.627 empresas, que pagarían como un solo NIT. Ese segmento ya lo cubren el ERP propio (Siigo, Alegra) y SisteAcuse Pyme ($150.000/año).
- [Hipótesis] Huila: ~7.526 personas jurídicas; con el 42 % en Neiva ≈ 3.160 personas jurídicas. Si la mitad tiene contador externo pequeño y cada uno lleva 15 NIT, habría **≈ 100 contadores objetivo en Neiva**. Es un mercado local suficiente para entrevistas y primeros clientes, pero no para crecer; el canal debe ser nacional y digital.
- [Hipótesis, cálculo de la meta] Para $1,67 M/mes netos de ~6 % de comisiones de pasarela:
  - a $5.000/NIT/mes: ~355 NIT;
  - a $10.000: ~178;
  - a $15.000: ~118;
  - a $25.000: ~71;
  - a $35.000: ~51;
  - a $41.667 (equivalente a QFe): ~43.

  Con 10–15 NIT por contador, el rango va de ≈ **4 a 35 contadores pagando**.

### Inferences
- [Hipótesis] El mercado teórico es amplio, pero **el precio efectivo por NIT está siendo empujado a cero** por SisteAcuse ($917–2.083/NIT/mes), Alegra (gratis para el contador) y Siigo Contador Ilimitado. La versión realista del mercado para un recién llegado es el escenario bajo a medio.
- [Hipótesis] La variable más sensible es "NIT por contador" y "% de compras a crédito por NIT". Sin entrevistas, el modelo no distingue entre 4 y 35 clientes necesarios.

### Gaps
- Cifra 2025–2026 de contadores activos e inscritos y por departamento (JCC caída; no hay dataset nacional en datos.gov.co, solo bases de cámaras locales como [Cartago](https://www.datos.gov.co/Econom-a-y-Finanzas/CONTADORES-PUBLICOS/gtxe-3fwk)).
- Cuántos contadores son independientes, cuántos NIT llevan en promedio y qué software usan (no hay encuesta pública encontrada).
- Número de adquirientes que registran eventos (la DIAN no publica eventos 030/032 por mes en las páginas revisadas).

---

## P6. Segmento desatendido y ventaja concreta para un nuevo entrante (evidencia vs. hipótesis)

### Takeaway
Hay **indicios** de un hueco, pero **ninguna evidencia directa** de que el segmento esté desatendido y pague. El hueco sería el contador de ciudad intermedia con cartera mixta (World Office escritorio, Helisa, ContaPyme, Excel) que necesita, por cada NIT y cada mes, una lista persistente de lo que la DIAN tiene y la contabilidad no (y viceversa), más las compras a crédito sin 030/032, sin pasar por scraping. Kontalid (conciliación temporal), N1 (World Office escritorio) y SisteAcuse (multi-NIT barato) ya cubren piezas. La ventaja tendría que ser **integración + persistencia + simplicidad**, no una función nueva.

### Cited Findings
- [Hecho-proveedor] La conciliación de Kontalid Elite "no se guarda": las conciliaciones se reinician al recargar procesos XML o cambiar los archivos contables; los procesos duran 3 meses y hay que filtrar CUFE manualmente desde el Excel DIAN — [Kontalid, Lector XML PRO](https://www.kontalid.com/info/lector-xml-pro/).
  - **Prueba:** existe la función, pero es efímera. Hay un posible espacio para un historial mensual por NIT.
- [Hecho-proveedor] World Office escritorio vende la licencia Contador multiempresa a $809.200. En su página de planes **no** se mencionan recepción ni importación desde la DIAN — [World Office](https://www.worldoffice.com.co/planesEscritorio.html). Un snippet indica que la recepción y los eventos están en "Pyme Plus y superiores" — [WO FE](https://worldoffice.com.co/facturacion-electronica/).
  - **Prueba (débil):** el contador con licencia Contador de WO podría no tener recepción nativa.
  - **Contrapeso:** N1 ya integra con "World Office Cloud y Escritorio" — [n1.app](https://www.n1.app/).
- [Hecho-proveedor] SisteAcuse ya ofrece planes de contador de 10 a 50 empresas con eventos masivos — [SisteAcuse](https://sisteacuse.com/). Una ventaja basada en "automatizar eventos multi-NIT" **no es nueva**.
- [Hecho-proveedor] Alegra ofrece a los contadores un espacio gratuito con importación DIAN, buzón y "conciliación fiscal" — [Alegra contadores](https://www.alegra.com/colombia/contadores/). Esto cubre al contador cuyos clientes usan Alegra.
- [Hecho] Siigo Contador Ilimitado ($535.900/año) da tablero multiempresa, pero su página no menciona importación DIAN — [Siigo Contador](https://www.siigo.com/siigo-contador/).
- [Hecho-desarrollador] El listado DIAN pagina de a 150 documentos y una herramienta conocida perdía los más viejos sin avisar — [Ciolix PR #13](https://github.com/EHM2396/smart-causation/pull/13).
  - **Prueba:** la **completitud verificable** (por ejemplo, "100 % de los CUFE del Excel DIAN encontrados en la contabilidad o explicados") es un atributo de calidad diferenciable.

Posibles ventajas, con su estado de evidencia:

| Ventaja candidata | Estado | Comentario |
|---|---|---|
| Conciliación mensual **persistente** por NIT (DIAN vs. auxiliar de compras y ventas exportado de cualquier software) con historial y cierre de mes | [Hipótesis] con indicio (Kontalid la tiene, pero efímera) | Núcleo diferenciador más plausible |
| Ingesta sin scraping (buzón dedicado + Excel DIAN + WS con certificado) → "no se cae cuando la DIAN cambia el CAPTCHA" | [Hipótesis] apoyada en las rupturas de 2025–2026 | Argumento de confiabilidad; requiere validar los requisitos del WS |
| Tablero de "compras a crédito sin 030/032" por NIT, con plantilla de regularización (sin aceptar 033 por defecto) | [Hipótesis]; la norma lo respalda (art. 616-1) | Competidores lo hacen dentro de la emisión; aquí sería alerta y auditoría |
| Alertas por WhatsApp de pendientes al contador | [Hipótesis] sin evidencia de demanda | Costo por mensaje de utilidad de Meta (ver `contexto_colombia.md`) |
| Exportación a formatos de World Office, Helisa, ContaPyme y Siigo | [Hipótesis]; N1 ya lo hace (por documento) | Diferencia de modelo: tarifa plana por NIT vs. $750/documento |
| Precio por NIT/mes en lugar de licencia anual | [Hipótesis] | Puede bajar la barrera inicial, pero compite contra $11.000–25.000/NIT/año |

### Inferences
- [Hipótesis] Si el fundador entra, el nicho más defendible es **"cierre mensual DIAN por NIT para contadores con software de escritorio"**. El producto no descarga ni emite eventos: ingiere vía correo y Excel, concilia contra el auxiliar contable, guarda el historial y reporta pendientes. Así reduce la dependencia del portal y el riesgo de aceptar facturas por error.
- [Hipótesis] La prueba de fuego en entrevistas es preguntar: "¿Cuántas horas al mes le dedica su equipo a cuadrar lo de la DIAN contra la contabilidad por cliente, y qué herramienta usa hoy?". Si la mayoría responde "Alegra, Siigo o SisteAcuse ya me lo resuelve", el hueco no existe.

### Gaps
- No hay datos de cuota de software contable entre contadores de Huila ni de ciudades intermedias (World Office vs. Siigo vs. Alegra vs. Helisa vs. ContaPyme).
- No se encontraron reseñas o quejas públicas de usuarios sobre la falta de conciliación en Alegra o Siigo (los grupos de Facebook requieren login; no se ingresó).

---

## P7. Monetización y operación: oferta, precio a probar, costos, margen, soporte, recurrencia, expansión, estacionalidad y churn

### Takeaway
El modelo SaaS por NIT/mes es técnicamente barato de operar: correo, VPS y base de datos cuestan menos de ~$40.000/mes según `contexto_colombia.md`, y el margen bruto podría superar el 85 %. Los costos que mandan son la **comisión de cobro** (~5–6 % en tickets pequeños), el **soporte de certificados y habilitaciones por cliente** y el **mantenimiento ante cambios DIAN**. El precio a probar debe estar muy por debajo de QFe y por encima del de SisteAcuse. Un rango de **$8.000–20.000 por NIT/mes con mínimo por contador** es razonable para validar. La estacionalidad es baja (proceso mensual), y el churn depende de que los incumbentes absorban la función.

### Cited Findings
- [Hecho-proveedor] Anclas de precio: QFe $500.000–600.000/año; SisteAcuse $150.000–550.000/año (1 a 50 empresas); Kontalid $167.700–527.700/año (+$150.000 por empresa con certificado); accounter $149.900/año; consultorcontable $249.000/año; Contamas $200.000; SoyExcel $130.000; N1 $750–900 por documento; Siigo Contador Ilimitado $535.900/año; Alegra gratis para el contador (ver P3).
- [Hecho-proveedor] Modelos de prueba usados en la categoría: QFe ofrece 7 días gratis con instalación remota y soporte por WhatsApp; N1 da "25 causaciones gratis"; SisteAcuse tiene "Demo interactiva" sin crear cuenta; Alegra ofrece 15 días gratis — [QFe](https://qfecollector.com/); [N1](https://www.n1.app/); [SisteAcuse demo](https://sisteacuse.com/demo); [programascontabilidad](https://programascontabilidad.com/comparativas-de-software/precios-de-software-contable-colombia-2026/).
- [Hecho-proveedor] Kontalid cobra $150.000 por empresa adicional para implementar el certificado, y ConCertificado vende certificados a $190.000 — [Kontalid](https://kontalid.com.co/anuncios-general); [ConCertificado](https://concertificado.com/blog/certificado-digital-dian-gratis-vs-pago/).
  - **Prueba:** la ruta con certificado agrega ~$150.000–190.000 por NIT al año de costo o fricción para el cliente. Eso **anula** la ventaja de precio frente a SisteAcuse, salvo que el certificado gratuito de la DIAN sirva (ver P4).
- [Hecho] La exógena 2026 se presentó entre el 28-abr y el 12-jun-2026 (escaneo preliminar). El IVA es bimestral o cuatrimestral y la renta de personas jurídicas se declara en mayo (dato general; no re-verificado aquí).

Propuesta de oferta y economía (todo [Hipótesis]):
- **Oferta mínima:** por cada NIT, (1) buzón de recepción dedicado; (2) carga mensual del Excel DIAN de recibidos y emitidos; (3) carga del auxiliar de compras y ventas exportado del software contable (CSV o Excel de WO, Helisa, ContaPyme o Siigo); (4) reporte de conciliación con tres columnas (en DIAN y no en contabilidad, en contabilidad y no en DIAN, diferencias de valor); (5) lista de compras a crédito sin 030/032; (6) exportación a Excel y plantilla de importación.
- **Precio a probar:** dos variantes en la preventa.
  - Variante A: $12.000/NIT/mes con mínimo de 5 NIT (≥ $60.000/mes por contador).
  - Variante B: plan anual de $990.000 hasta 15 NIT (≈ $5.500/NIT/mes).
  - Medir conversión y objeciones. Un precio ≥ $40.000/NIT/mes (ancla QFe) es improbable frente a SisteAcuse.
- **Costos variables:** infraestructura < $40.000/mes total al inicio; correo, almacenamiento de XML (KB por documento) y procesamiento casi nulos. Pasarela ~4,8–6,4 % en cobros de $50.000; cobrar mensual por contador (no por NIT) reduce el costo fijo por transacción.
- **Margen bruto:** > 85 % después de pasarela y antes del tiempo del fundador.
- **Soporte:** la carga esperada se concentra en la configuración inicial: cambiar el correo de recepción en la DIAN o el PT, certificados y formatos de exportación de cada software. Con 20 h/semana, el cuello de botella es el onboarding (estimado 1–2 h por NIT la primera vez; a validar).
- **Recurrencia:** mensual por naturaleza (cierre contable mensual e IVA bimestral). Hay picos de uso en marzo–abril (cierre del año anterior), abril–junio (exógena), cierres de IVA y diciembre.
- **Expansión:** módulo de exógena (formatos 1001/1007/1008/1009 desde los mismos XML; estacional, abr–jun 2027); conciliación bancaria; validación de RUT y retenciones; reporte para la declaración de IVA.
- **Churn:** riesgos de que el cliente del contador cambie a Alegra o Siigo (que ya lo incluyen), de que el contador pierda clientes y de que un competidor iguale la función.

### Inferences
- [Hipótesis] El ticket por contador sería pequeño: 10 NIT × $12.000 = $120.000/mes. Llegar a la meta requiere ~14–15 contadores de ese tamaño. Es alcanzable en 6–12 meses solo si la conversión de prueba a pago es alta. La meta "cobrar desde el primer mes" es factible con 1–3 contadores piloto pagando un plan reducido.
- [Hipótesis] El mayor riesgo operativo no es el servidor, sino la deuda de soporte por cambios de la DIAN y por la heterogeneidad de formatos de exportación de los softwares contables.

### Gaps
- Sin datos de churn ni de LTV de herramientas comparables en Colombia.
- No se midió el esfuerzo de soporte real de habilitar certificados o buzones por cliente.

---

## P8. Primeros 10 clientes por canales digitales: dónde están los contadores y cómo compran herramientas de bajo ticket

### Takeaway
Los contadores colombianos se concentran en:
- páginas y grupos de Facebook gremiales (Conpucol 21.453 seguidores; Consejo Nacional de Contadores 16.768; "Nosotros los Contadores" 1,3 M de seguidores, no solo de Colombia);
- comunidades de contenido tributario (Actualícese, con >100.000 suscriptores en YouTube; INCP con 30.525 miembros declarados);
- tutoriales de YouTube sobre "descargar facturas DIAN";
- en Neiva, ASCONPHU.

La categoría se vende con **prueba gratis + demo + WhatsApp**, lo que sugiere ciclos cortos (días a semanas). No se encontró evidencia cuantitativa de tasas de conversión.

### Cited Findings
- [Hecho-snippet] En Facebook: Conpucol Nacional tiene 21.453 seguidores, el Consejo Nacional de Contadores Públicos 16.768, el Colegio de Contadores del Suroccidente 1.830 "me gusta" y "Nosotros los Contadores" 1,3 millones de seguidores — [Conpucol](https://www.facebook.com/ColegiodeContadoresPublicosdeColombia/); [CONACP](https://www.facebook.com/CONACP/); [Suroccidente](https://www.facebook.com/contadoresur/); [Nosotros los Contadores](https://www.facebook.com/nosotros.los.contadores/) (cifras del snippet; sin fecha; no se ingresó a Facebook).
  - **Prueba:** existen audiencias grandes y segmentables.
  - **No prueba:** el engagement ni la proporción de Colombia o de contadores independientes.
- [Hecho-snippet] El canal Actualícese Video obtuvo la "placa de plata" (100.000 suscriptores) — [Actualícese](https://actualicese.com/nuestro-canal-actualicese-video-obtiene-placa-de-plata/) (fecha no verificada). Actualícese también vende un "Agente IA Actualícese" incluido en planes de Siigo — [Siigo precios](https://www.siigo.com/precios-siigo/). El medio de referencia de los contadores ya está aliado con un incumbente.
- [Hecho] Hay tutoriales de YouTube sobre el problema: "Como descargar facturas electrónicas [TUTORIAL]", "5 Formas de Consultar y Descargar Factura Electrónica en la DIAN", "Descargar listado de facturas DIAN", "Lector (Leer) XML Factura Electrónica Colombia" — [video 1](https://www.youtube.com/watch?v=w5uuu94AXDA); [video 2](https://www.youtube.com/watch?v=vCId0bF2e2Q); [video 3](https://www.youtube.com/watch?v=gWEw-VzDrx0); [video 4](https://www.youtube.com/watch?v=lzmupF7svkc) (no se revisaron vistas ni fechas).
  - **Prueba:** hay búsqueda activa del tema.
  - **No prueba:** volumen de búsqueda.
- [Hecho-snippet] ASCONPHU (Neiva): "desarrolla espacios de capacitación y actualización a través de seminarios"; contacto público asconphu@gmail.com; X: @Asconphu_Huila — [ASCONPHU](https://www.asconphu.org/quienessomos/); [X](https://x.com/asconphu_huila). Es un canal local para charlas gratuitas o patrocinio de un seminario (acción que el fundador haría en la validación, no en esta investigación).
- [Hecho] LinkedIn tiene 18,0 millones de miembros en Colombia (ver `contexto_colombia.md`).
- [Hecho-proveedor] Tácticas de venta observadas: 7 días gratis con instalación remota y WhatsApp (QFe), demo interactiva (SisteAcuse), 25 documentos gratis (N1), 15 días gratis (Alegra), y contenido educativo con producto embebido (consultorcontable, Kontalid, SisteAcuse con blog de honorarios 2026) — fuentes en P3 y P7.

### Inferences
- [Hipótesis] Plan de 10 clientes (orden sugerido):
  1. Contenido corto en YouTube, TikTok y LinkedIn sobre "cómo saber qué compras a crédito no tienen 030/032 tras la Sentencia 29509" (tema técnico con poca competencia de contenido de calidad).
  2. Lead magnet: plantilla Excel gratuita de conciliación DIAN vs. auxiliar, que exija email o WhatsApp.
  3. Preventa a 20–30 contadores con piloto de 30 días por 3 NIT y precio fundador.
  4. Charla gratuita para ASCONPHU o universidades de Neiva (USCO tiene consultorio contable).
  5. Publicaciones en grupos de Facebook de contadores, respetando sus reglas.
- [Hipótesis] Ciclo de venta esperado: 1–3 semanas desde la demo hasta el pago para un ticket menor a $150.000/mes, porque la categoría ya educa con pruebas gratis. El cuello de botella es el **onboarding** (correo de recepción, Excel, auxiliar), no la decisión.
- [Hipótesis] Riesgo de canal: Actualícese y Siigo están aliados, y Alegra regala el espacio contador, así que los grandes canales de contenido favorecen a los incumbentes.

### Gaps
- No se pudo medir el tamaño ni la actividad de grupos de Facebook, Telegram o WhatsApp de contadores (requieren login o ingreso; fuera de alcance por restricción).
- No hay datos públicos de CAC, conversión de prueba a pago ni ciclo de venta de herramientas para contadores en Colombia.

---

## P9. Evidencia que podría INVALIDAR la idea (DIAN, incumbentes, bloqueos, disposición a pagar, riesgos legales)

### Takeaway
Hay **cinco frentes de invalidación con evidencia concreta**:
1. **Bloqueos DIAN** a la automatización del portal (may-2025, jun-2026, jul-2026).
2. **Incumbentes** que ya incluyen recepción, eventos e importación (Alegra gratis para el contador; Siigo; ContaPyme; N1 integrado con World Office).
3. **Competidores de nicho** con precio por NIT muy bajo (SisteAcuse) y conciliación ya existente (Kontalid).
4. La **Sentencia 29509 de 2025**, que quita la urgencia temporal de los eventos.
5. **Riesgos legales y de seguridad** por manejar tokens o certificados de terceros.

No se encontró evidencia de que la DIAN vaya a lanzar una descarga masiva oficial de XML ni una API de listado para receptores; eso **no invalida** la idea, pero tampoco la protege.

### Cited Findings
**1. Plataforma DIAN**
- [Hecho-proveedor] "un nuevo tipo de captcha interno que bloquea completamente cualquier descarga automatizada" (18-jun-2026); NIT obligatorio desde el 28-jul-2026; archivos "protegidos con el NIT de la consulta" desde el 30-jul-2026 — [Kontalid](https://kontalid.com.co/anuncios-general).
- [Hecho, prensa] "Solicitud bloqueada por controles de seguridad" ante "robots, automatizaciones o agentes de inteligencia artificial" — [Actualícese, 27-jul-2026](https://actualicese.com/dian-implementara-nuevo-control-de-seguridad-para-consultar-facturas-electronicas/).
  - **Invalida:** cualquier producto basado en scraping del portal.
  - **No invalida:** la ruta de buzón + WS oficial.
- [Hecho] No hay método oficial de listado de recibidos en los web services del Anexo 1.9 — [Anexo Técnico v1.9](https://www.dian.gov.co/impuestos/factura-electronica/Documents/Anexo-Tecnico-Factura-Electronica-de-Venta-vr-1-9.pdf). [Hipótesis] La completitud siempre dependerá de un paso humano en el portal o del buzón.
- [Hecho] No se encontró anuncio DIAN de descarga masiva oficial de XML para receptores en 2026; la búsqueda específica solo arrojó resultados del SAT de México y herramientas de terceros — [búsqueda 2026-10-01; ver Kontalid](https://www.kontalid.com/info/descarga-masiva-documentos-dian/).
  - **Riesgo latente:** si la DIAN agregara "descargar todos los XML del período" en el portal, la capa de descarga quedaría sin valor; la conciliación no.

**2. Incumbentes que ya lo incluyen**
- [Hecho-proveedor] Alegra: "Conéctate con la DIAN para importar, registrar y contabilizar los documentos fiscales de tus clientes automáticamente", "Buzón Inteligente", "Conciliación fiscal", "El Espacio Contador es 100% gratuito para ti", "Más de 1700 firmas" — [Alegra contadores](https://www.alegra.com/colombia/contadores/).
- [Hecho-proveedor] Siigo Nube registra eventos e importa compras desde XML; Siigo Contador Ilimitado cuesta $535.900/año para empresas ilimitadas — [Siigo precios](https://www.siigo.com/precios-siigo/); [Siigo, confirmar recepción](https://siigonube.portaldeclientes.siigo.com/confirmar-recepcion-de-factura-electronica-de-venta-de-tu-proveedor/) (snippet).
- [Hecho-proveedor] ContaPyme: "Recepción de Documentos" integrada que convierte compras en operaciones contables, desde $205.000/año — [ContaPyme](https://www.contapyme.com/servicios-electronicos/).
- [Hecho-proveedor] N1 integra Siigo, Alegra, Odoo, World Office (Cloud y Escritorio) y Aliaddo, y envía eventos — [N1](https://www.n1.app/).
  - **Invalida parcialmente:** el contador cuya cartera está en Alegra o Siigo, o que acepta pagar por documento, ya tiene solución.

**3. Disposición a pagar baja / precio ancla**
- [Hecho-proveedor] SisteAcuse Contador Max: $550.000/año por 50 empresas (≈ $917/NIT/mes); Contador: $250.000/año por 10 (≈ $2.083/NIT/mes) — [SisteAcuse](https://sisteacuse.com/).
- [Hecho-proveedor] Kontalid Elite ya incluye "Conciliación DIAN" por $527.700/año — [Kontalid](https://www.kontalid.com/info/lector-xml-pro/).
- [Hecho-proveedor] El patrón comercial de los incumbentes es que **el cliente final paga y el contador accede gratis** (Alegra; Siigo Contador gratis para 1 empresa) — [Alegra](https://www.alegra.com/colombia/contadores/); [Siigo Contador](https://www.siigo.com/siigo-contador/).
  - **Invalida (riesgo alto):** la hipótesis de cobrar ≥ $40.000/NIT/mes. Precios de $10.000–15.000 requieren una diferenciación demostrable.
- [Señal en contra de la invalidación] Sí hay pago real en la categoría: SisteAcuse declara "240+ empresas y contadores"; N1, "1.000.000+ facturas procesadas"; QFe exhibe ~10 logos; Forvis Mazars vende el servicio. Todo es autodeclarado ([Hecho-proveedor]).

**4. Urgencia regulatoria menor**
- [Hecho] Sentencia 29509 de 2025: los acuses no condicionan la oportunidad del IVA descontable — [Actualícese](https://actualicese.com/consejo-de-estado-anula-doctrina-de-la-dian-sobre-acuses-de-recibo-en-factura-electronica/).
- [Hecho] Proyecto MinCIT 2026: RADIAN solo para facturas con "vocación de circulación" (no vigente al cierre de comentarios) — [INCP, 29-ene-2026](https://incp.org.co/publicaciones/infoincp-publicaciones/impuestos/2026/01/proyecto-de-decreto-buscaria-aclarar-la-aplicacion-del-radian-y-la-aceptacion-de-la-factura-electronica-como-titulo-valor/).
  - **Invalida parcialmente:** el argumento "acepte en 3 días o pierde el IVA". Se mantiene el de soporte de costos e IVA en compras a crédito (art. 616-1).

**5. Riesgos legales y de seguridad**
- [Hecho] La Res. 165 de 2023, art. 70 (adicionado por el art. 4 de la Res. 202 de 2025; compilado como art. 1.5.1.12.4 de la Res. 227 de 2025), regula el servicio de consulta de datos del comprador. Ese servicio "podrá ser utilizado únicamente al momento de la venta", y "En ningún caso, se podrá hacer uso masivo o distribución de la información obtenida" — [Normograma DIAN, Res. 165 de 2023](https://normograma.dian.gov.co/dian/compilacion/docs/resolucion_dian_0165_2023.htm). La norma aplica a ese servicio específico, no al portal de documentos recibidos, pero muestra la postura de la DIAN contra el uso masivo de sus servicios de consulta.
  - [Hipótesis] Una herramienta debe limitarse a los documentos del propio NIT del cliente y no hacer consultas masivas de terceros.
- [Hecho] Ley 1581 de 2012: todas las personas naturales y jurídicas deben cumplir los deberes de tratamiento de datos. La inscripción en el RNBD solo es obligatoria para sociedades y ESAL con activos > 100.000 UVT y para entidades públicas (Decreto 090 de 2018) — [SIC, RNBD](https://www.sic.gov.co/registro-nacional-de-bases-de-datos); [Actualícese, Decreto 090 de 2018](https://actualicese.com/decreto-090-de-18-01-2018) (solo snippet).
  - [Hipótesis] El fundador sería "encargado del tratamiento" de datos de proveedores y clientes personas naturales que aparecen en las facturas. Necesita política de tratamiento, contrato de transmisión con el contador y seguridad razonable, pero no inscripción en el RNBD.
- [Hecho] El token de acceso llega al correo del representante legal; la DIAN permite crear "usuarios autorizados" sin token — [DIAN ABECÉ](https://micrositios.dian.gov.co/sistema-de-facturacion-electronica/abece-nuevas-funcionalidades-servicio-gratuito-de-factura-electronica/). [Hipótesis] Pedir tokens, claves o certificados de terceros y guardarlos en servidores del fundador crea un riesgo de seguridad y reputación (una fuga expondría la información tributaria de decenas de NIT). QFe lo mitiga operando localmente ("No almacenamos tus claves ni tus documentos en servidores externos") — [QFe](https://qfecollector.com/).
- [Hecho-proveedor] Los vendedores trasladan el riesgo al cliente: "no aplican devoluciones de dinero" si la DIAN bloquea — [consultorcontable](https://www.consultorcontable.com/descargador-xml-fe/).

### Inferences
- [Hipótesis] **Balance para go/no-go:**
  - **A favor de "no-go" o pivote:** la versión "descargador + eventos por NIT/mes" está invalidada por precio (SisteAcuse), por incumbentes (Alegra, Siigo, N1) y por plataforma (bloqueos 2026).
  - **Lo que queda vivo (condicional):** solo la versión "conciliación mensual persistente por NIT, sin scraping, para contadores de escritorio o cartera mixta", y **solo si** las entrevistas muestran tres cosas: (a) ≥ 1 h por NIT al mes de trabajo manual de cruce; (b) que Alegra, Siigo, Kontalid o N1 no lo resuelven para su cartera; (c) disposición a pagar ≥ $10.000/NIT/mes con mínimo por contador.
- [Hipótesis] Criterios de invalidación rápida para la validación: si de 15 contadores entrevistados menos de 5 reportan el dolor de conciliación (no solo de descarga), o menos de 3 aceptan pagar un piloto, la idea debería descartarse frente a las alternativas.

### Gaps
- No se encontraron los términos de uso del portal DIAN ni un pronunciamiento DIAN sobre el uso de herramientas de terceros con tokens de contribuyentes.
- No se verificó si la DIAN planea, para 2027, nuevos servicios (por ejemplo, un listado vía web service o descarga masiva en el portal); no hay proyectos de resolución encontrados al respecto.
- No se verificó la vigencia real de las funciones de importación DIAN de Alegra y Siigo tras los bloqueos de junio y julio de 2026. Podrían estar igual de afectadas si usan token y scraping, lo que sería una oportunidad, pero no hay evidencia.

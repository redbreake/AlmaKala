# Revisión del código base y tareas propuestas

Este documento resume hallazgos concretos y propone una tarea accionable para cada categoría solicitada.

## 1) Tarea para corregir un error tipográfico

**Hallazgo:** En la tarjeta de `Fate/strange Fake` se muestra el texto `Fate/s Fake`, que parece un typo visible para usuarios.

**Evidencia técnica:**
- `data-title="Fate/strange Fake"` en la misma tarjeta.
- Encabezado renderizado como `Fate/s Fake`.

**Tarea propuesta:**
- Corregir el texto visible de la tarjeta a `Fate/strange Fake` para alinear el título visual con el atributo `data-title`.
- Verificar consistencia en mayúsculas, barras y nomenclatura en todas las tarjetas similares.

**Criterios de aceptación:**
- La tarjeta muestra `Fate/strange Fake`.
- El modal y el texto de tarjeta muestran exactamente el mismo título.

## 2) Tarea para corregir una falla

**Hallazgo:** El HTML utiliza `<div class="noise-texture"></div>`, pero el CSS define la clase `.noise`; por tanto, el efecto de ruido no se aplica.

**Evidencia técnica:**
- HTML: clase `noise-texture`.
- CSS: selector `.noise` para el efecto.

**Tarea propuesta:**
- Unificar el nombre de clase entre HTML y CSS (`noise` o `noise-texture`).
- Confirmar que la textura se vea sobre toda la página y no interfiera con interacción (`pointer-events: none`).

**Criterios de aceptación:**
- El overlay de ruido se renderiza correctamente en desktop y móvil.
- No bloquea clics, scroll ni foco de elementos interactivos.

## 3) Tarea para corregir discrepancia en comentarios/documentación

**Hallazgo:** La documentación indica “más de 70 animes” en la lista de ruido industrial, pero el arreglo `allNoiseAnimes` contiene 61 entradas.

**Evidencia técnica:**
- README menciona “over 70 animes”.
- Lista actual en código con 61 elementos.

**Tarea propuesta:**
- Actualizar `README.md` con el conteo real o automatizar el valor mostrado para evitar desactualización.
- Como mejora opcional, exponer el total directamente desde `script.js` en la UI.

**Criterios de aceptación:**
- README y código reflejan el mismo total.
- Si cambia la lista, la documentación no queda inconsistente.

## 4) Tarea para mejorar una prueba

**Hallazgo:** No hay pruebas automatizadas que validen consistencia entre datos, UI y textos clave.

**Tarea propuesta:**
- Agregar una prueba automatizada (por ejemplo, con Playwright o Vitest + jsdom) que valide:
  1. Que el botón “open-full-list” abre el modal.
  2. Que el filtro de búsqueda reduce resultados de forma case-insensitive.
  3. Que el número mostrado en la nota estadística (227 = 25 + 202) es coherente con los datos del gráfico.

**Criterios de aceptación:**
- La prueba falla si se rompe la apertura del modal, el filtro o la coherencia de métricas.
- La prueba corre localmente con un comando documentado en README.

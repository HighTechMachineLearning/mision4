# Brote

Brote es un registro de plantas donde das de alta cada planta con un formulario validado y la app te dice cuándo toca regarla. Hecha con React, TanStack Query v5, React Hook Form y Zod, con un único esquema para el formulario y para las respuestas de la API. Los datos viven en una API REST local (`json-server`).

## Uso de IA

Todo el código ha sido generado por IA: Claude, modelo Sonnet 5.5 con esfuerzo medio. El prompt original incluía:
- La tarea y la rúbrica.
- Una lista de buenas prácticas a seguir, tanto de HTML-CSS-JS como de React, cogidas de la teoría.
- Una explicación de cómo hacerlo.

Así es cómo le pedí a la IA que trabaje:

>1. Diseño: diseñar la aplicación y su funcionalidad
>2. Arquitectura: definir cómo será la implementación, con prototipos y pseudo-código
>3. Planificación: no se va a implementar todo de golpe, así que hay que dividir la implementación en pasos. Cada uno será un commit.
>4. Implementación: escribir el código.
>
>Debes hacer los pasos uno a uno, para que yo pueda validar lo que has hecho, corregir cosas, pedir cambios, etc, antes de pasar al siguiente. Igual para...

## Autopsia

### 1. API local con `json-server` en lugar de una API pública alojada

La app habla con `http://localhost:3000/plantas`, servida por `json-server` sobre `db.json` (`npm run api`).

- **Alternativa descartada:** `restful-api.dev`, una API pública sin key. Funcionó al principio, pero tiene un límite de 50 peticiones cada 24 horas, que se agotó durante el desarrollo. Además, su listado no incluye los objetos recién creados, así que había que guardar los ids en `localStorage` y pedirlos uno a uno, lo que complicaba el servicio y dejaba cada navegador con su propia lista.
- **Coste asumido:** hay que arrancar dos procesos (la API y la app), y `json-server` está en su versión `1.0.0-beta`. A cambio, no hay límites, la lista refleja siempre lo guardado y el servicio se reduce a un GET y un POST.

### 2. Descartar los registros corruptos uno a uno en lugar de fallar toda la lista

`obtenerPlantas` valida cada registro con `plantaSchema.safeParse`: los que no cumplen el esquema se descartan y se cuentan, y el listado muestra "N registros ilegibles se han descartado" junto a las plantas válidas.

- **Alternativa descartada:** validar el array entero con `z.array(plantaSchema).parse(...)`. Es más corto, pero un solo dato corrupto (la API acepta cualquier cosa) haría fallar la query y dejaría al usuario sin ninguna de sus plantas.
- **Coste asumido:** el usuario no ve cuál es el registro dañado ni por qué, solo cuántos hay. Es una decisión de resiliencia sobre visibilidad.


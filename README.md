# Cierre de Año con Feminario · 20 de diciembre

Artefacto corto (4 pasos) para la llamada de cierre de mes con clientas de un solo curso. Mismo lenguaje visual que [construye-tu-portafolio](https://github.com/Feminario/construye-tu-portafolio): colores del manual, logo, formas, ilustraciones y confeti.

## Qué hay

| Ruta | Para qué |
|---|---|
| `index.html` | Lo que usa cada clienta (celular). Bienvenida (nombre, correo, WhatsApp y **foto obligatoria**) → **1** metas del año (cuáles cumplió y cuáles no) → **2** mini balance con inversiones en detalle y panel → **3** carta a su yo del 2027 → **4** qué le gustaría ver en Feminario → cierre. Sin fotos ni stickers; solo confeti. |
| `admin/index.html` | Pantalla para **compartir en el Meet**: palabras más repetidas (nube + ranking, clic en una palabra para ver quién la dijo), metas, balance agregado (sin montos) y reflexión. Se actualiza sola cada 10 s y lanza confeti cuando llega una respuesta nueva. Botón "Modo presentación" y "Datos de ejemplo" para ensayar. |
| `assets/config.js` | **Único archivo de configuración** (URL del Sheet, link, fecha). |
| `apps-script/cierre.gs` | Backend en Google Sheets. |

## Conectar el Sheet (necesario para que el admin vea a todas)
Sin esto cada respuesta solo queda en el navegador de quien la escribe (sirve para probar).
1. Sheet nuevo → Extensiones → Apps Script → pega `apps-script/cierre.gs`.
2. Configuración del proyecto → Propiedades del script → `ADMIN_CLAVE` = la clave del panel.
3. Implementar → Aplicación web → ejecutar como *Yo*, acceso *Cualquier persona*.
4. Pega la URL `/exec` en `assets/config.js` → `API_URL`.

El panel pide la clave al abrirse. Los montos viajan al Sheet pero el panel **nunca los muestra**.

## Publicar
GitHub Pages (Settings → Pages → rama `main`, carpeta raíz): clientas en `…/femi-diciembre/`, admin en `…/femi-diciembre/admin/`.

## Fotos
`assets/foto-ventana.jpg` y `assets/foto-sonrisas.jpg` se reparten en bienvenida, transiciones y cierre. Para sumar más, agrégalas a `assets/` y cámbialas en las vistas `t1`, `t2`, `t3` de `index.html`.


## Comunidad (panel de Customer Success)
Cada paso se envía a `COMUNIDAD_API` (`assets/config.js`) = `/api/comunidad` del panel de Feminario: guarda sus datos, la foto (bucket privado) y sus respuestas, y aparecen como tarjetas en Customer Success → Comunidad. La pantalla `admin/` y `apps-script/cierre.gs` (Sheet para el Meet) siguen con la estructura anterior y no se alimentan de este flujo.

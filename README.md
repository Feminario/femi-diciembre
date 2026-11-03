# Cierre de Año con Feminario · 20 de diciembre

Artefacto corto (4 pasos) para la llamada de cierre de mes con clientas de un solo curso. Mismo lenguaje visual que [construye-tu-portafolio](https://github.com/Feminario/construye-tu-portafolio): colores del manual, logo, formas, ilustraciones y confeti.

## Qué hay

| Ruta | Para qué |
|---|---|
| `index.html` | Lo que usa cada clienta (celular). Bienvenida → **1** lo que más le gusta de Feminario → **2** su meta en sus palabras y lo que le falta → **3** mini balance con panel bonito → **4** reflexión del año → cierre. Entre pasos hay pantallas con foto y confeti. |
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

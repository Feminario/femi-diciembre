/* Configuración del Cierre de Mes — edita SOLO este archivo.
   Pasos para conectar el Google Sheet: ver README.md ("Conectar el Sheet"). */
window.CIERRE = {
  // URL /exec del Apps Script publicado (apps-script/cierre.gs). Si queda vacía,
  // todo funciona pero las respuestas solo se guardan en ESE navegador (útil para probar).
  API_URL: "",
  // Panel de Feminario (Customer Success → Comunidad): aquí llegan los datos, la foto y las respuestas de cada mujer.
  COMUNIDAD_API: "https://femi-panel.vercel.app/api/comunidad",
  STORAGE_KEY: "fem_cierre_dic_v1",
  LINK_CATALOGO: "https://www.feminario.co/catalogo",
  FECHA_LABEL: "1 de diciembre"
};

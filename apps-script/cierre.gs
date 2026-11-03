/**
 * Feminario — Cierre de Año (20 de diciembre)
 * Apps Script independiente: guarda las respuestas en una hoja "Cierre_Dic" y las sirve al panel admin.
 *
 * INSTALACIÓN (5 minutos):
 *  1. Crea un Google Sheet nuevo → Extensiones → Apps Script → pega este archivo.
 *  2. Proyecto → Configuración → Propiedades de la secuencia de comandos → agrega
 *       ADMIN_CLAVE = la clave que usarás en el panel (ej. una frase corta).
 *  3. Implementar → Nueva implementación → Tipo: Aplicación web
 *       Ejecutar como: Yo · Quién tiene acceso: Cualquier persona → Implementar.
 *  4. Copia la URL que termina en /exec y pégala en assets/config.js (API_URL).
 *
 * Seguridad: escribir (POST) es público, como en el resto de herramientas de Feminario;
 * LEER (GET) exige la clave. Los montos viajan al Sheet pero el panel nunca los muestra.
 */
var HOJA = "Cierre_Dic";
var COLS = ["id","fecha","nombre","gusta","ayuda","meta","cumplida","falta",
            "ahorro","inversion","otros","deudas","ingreso","gasto","faltoAno","mejorar","palabra"];

function hoja_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(HOJA);
  if (!sh) {
    sh = ss.insertSheet(HOJA);
    sh.appendRow(COLS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, COLS.length).setFontWeight("bold").setBackground("#C2CBFF");
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Recibe una respuesta (o su actualización por paso). Upsert por "id".
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.tipo !== "cierre_dic" || !d.id) return json_({ ok: false, error: "payload" });
    var sh = hoja_();
    var ids = sh.getRange(2, 1, Math.max(sh.getLastRow() - 1, 1), 1).getValues().map(function (r) { return r[0]; });
    var fila = COLS.map(function (c) { return c === "fecha" ? new Date() : (d[c] === undefined ? "" : d[c]); });
    var idx = ids.indexOf(d.id);
    if (idx >= 0) sh.getRange(idx + 2, 1, 1, COLS.length).setValues([fila]);
    else sh.appendRow(fila);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Panel admin: ?accion=cierre&clave=...
function doGet(e) {
  var clave = PropertiesService.getScriptProperties().getProperty("ADMIN_CLAVE");
  if (!clave || (e.parameter.clave || "") !== clave) return json_({ ok: false, error: "clave" });
  if (e.parameter.accion !== "cierre") return json_({ ok: false, error: "accion" });
  var sh = hoja_();
  var n = sh.getLastRow() - 1;
  var filas = n < 1 ? [] : sh.getRange(2, 1, n, COLS.length).getValues().map(function (r) {
    var o = {};
    COLS.forEach(function (c, i) { o[c] = r[i] instanceof Date ? r[i].toISOString() : r[i]; });
    return o;
  });
  return json_({ ok: true, filas: filas });
}

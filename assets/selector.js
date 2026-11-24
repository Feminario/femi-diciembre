/* Menús desplegables con el estilo de Feminario (en vez del menú genérico del navegador).
   Cada <select> se queda en la página (oculto) para que la lógica siga igual: al elegir, se cambia su valor y se dispara «change» e «input».
   Los selects que aparecen después (filas nuevas) se mejoran solos. */
(function () {
  var css = document.createElement("style");
  css.textContent =
    ".fsel{position:relative;width:100%}" +
    ".fsel-nativo{position:absolute!important;opacity:0!important;pointer-events:none!important;width:1px!important;height:1px!important;margin:0!important;padding:0!important;border:0!important}" +
    ".fsel-btn{width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;text-align:left;font:inherit;font-size:15px;color:var(--morado-oscuro,#4C4F68);background:#fff;border:1.5px solid rgba(126,132,174,.35);border-radius:16px;padding:12px 16px;cursor:pointer;box-sizing:border-box;min-height:48px}" +
    ".fsel-btn.vacio{color:var(--morado-suave,#9A9CB8)}" +
    ".fsel-btn:focus-visible,.fsel.abierto .fsel-btn{outline:none;border-color:var(--morado,#7E84AE);box-shadow:0 0 0 3px rgba(194,203,255,.6)}" +
    ".fsel-btn svg{flex:none;width:14px;height:14px;transition:transform .2s}.fsel.abierto .fsel-btn svg{transform:rotate(180deg)}" +
    ".fsel-btn span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
    ".fsel-lista{position:absolute;left:0;right:0;top:calc(100% + 6px);z-index:50;background:#fff;border:1.5px solid var(--periwinkle,#C2CBFF);border-radius:18px;box-shadow:0 14px 34px rgba(76,79,104,.2);padding:6px;max-height:280px;overflow:auto;display:none}" +
    ".fsel.abierto .fsel-lista{display:block}.fsel.arriba .fsel-lista{top:auto;bottom:calc(100% + 6px)}" +
    ".fsel-op{display:flex;align-items:center;gap:8px;width:100%;text-align:left;font:inherit;font-size:14.5px;color:var(--morado-oscuro,#4C4F68);background:none;border:0;border-radius:12px;padding:10px 12px;cursor:pointer}" +
    ".fsel-op:hover,.fsel-op.foco{background:var(--rosa-claro,#F9E1FF)}" +
    ".fsel-op.sel{background:var(--periwinkle,#C2CBFF);font-weight:700}" +
    ".fsel-op.marcador{color:var(--morado-suave,#9A9CB8)}";
  document.head.appendChild(css);
  var FLECHA = '<svg viewBox="0 0 24 24" fill="none" stroke="#7E84AE" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  var abierto = null;
  function cerrar() { if (abierto) { abierto.classList.remove("abierto", "arriba"); abierto.querySelector(".fsel-btn").setAttribute("aria-expanded", "false"); abierto = null; } }
  function etiqueta(sel) { var o = sel.options[sel.selectedIndex]; return o ? o.text : ""; }
  function mejorar(sel) {
    if (sel.__fsel || sel.multiple) return; sel.__fsel = 1;
    var caja = document.createElement("div"); caja.className = "fsel";
    sel.parentNode.insertBefore(caja, sel); caja.appendChild(sel); sel.classList.add("fsel-nativo"); sel.tabIndex = -1;
    var btn = document.createElement("button"); btn.type = "button"; btn.className = "fsel-btn"; btn.setAttribute("aria-haspopup", "listbox"); btn.setAttribute("aria-expanded", "false");
    if (sel.getAttribute("aria-label")) btn.setAttribute("aria-label", sel.getAttribute("aria-label"));
    var lista = document.createElement("div"); lista.className = "fsel-lista"; lista.setAttribute("role", "listbox");
    caja.appendChild(btn); caja.appendChild(lista);
    function pintarBtn() { btn.innerHTML = "<span>" + etiqueta(sel).replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }) + "</span>" + FLECHA; btn.classList.toggle("vacio", sel.value === ""); }
    function pintarLista() {
      lista.innerHTML = "";
      Array.prototype.forEach.call(sel.options, function (o, i) {
        var b = document.createElement("button"); b.type = "button"; b.className = "fsel-op" + (i === sel.selectedIndex ? " sel" : "") + (o.value === "" ? " marcador" : ""); b.setAttribute("role", "option"); b.textContent = o.text; b.disabled = o.disabled;
        b.onclick = function (e) { e.stopPropagation(); elegir(i); };
        lista.appendChild(b);
      });
    }
    function elegir(i) {
      cerrar(); if (sel.selectedIndex === i) { btn.focus(); return; }
      sel.selectedIndex = i; pintarBtn();
      sel.dispatchEvent(new Event("input", { bubbles: true })); sel.dispatchEvent(new Event("change", { bubbles: true }));
      if (document.body.contains(btn)) btn.focus();
    }
    btn.onclick = function (e) {
      e.stopPropagation();
      if (abierto === caja) { cerrar(); return; }
      cerrar(); pintarLista(); caja.classList.add("abierto"); btn.setAttribute("aria-expanded", "true"); abierto = caja;
      var r = btn.getBoundingClientRect(); if (window.innerHeight - r.bottom < 300 && r.top > 300) caja.classList.add("arriba");
      var s = lista.querySelector(".sel"); if (s) s.scrollIntoView({ block: "nearest" });
    };
    btn.onkeydown = function (e) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); var i = sel.selectedIndex + (e.key === "ArrowDown" ? 1 : -1); if (i >= 0 && i < sel.options.length) elegir(i); }
      if (e.key === "Escape") cerrar();
    };
    sel.addEventListener("change", pintarBtn);
    pintarBtn();
  }
  function todo(raiz) { (raiz.querySelectorAll ? raiz.querySelectorAll("select") : []).forEach(mejorar); if (raiz.tagName === "SELECT") mejorar(raiz); }
  document.addEventListener("click", cerrar);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrar(); });
  function iniciar() {
    todo(document);
    new MutationObserver(function (ms) { ms.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType === 1) todo(n); }); }); }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();

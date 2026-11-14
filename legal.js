// Legal pages: German or English. Order: link "#en"/"#de", then German for Germany, Austria, Switzerland and
// Liechtenstein (time zone or browser language), else English. Nothing is stored on the device.
(function () {
  var dach = ["DE", "AT", "CH", "LI"], zones = ["Europe/Berlin", "Europe/Busingen", "Europe/Vienna", "Europe/Zurich", "Europe/Vaduz"];
  function guess() {
    var h = location.hash.slice(1); if (h === "de" || h === "en") return h;
    try { if (zones.indexOf(Intl.DateTimeFormat().resolvedOptions().timeZone) >= 0) return "de"; } catch (e) {}
    var langs = navigator.languages || [navigator.language || ""];
    for (var i = 0; i < langs.length; i++) { var r = (langs[i].split("-")[1] || "").toUpperCase(); if (dach.indexOf(r) >= 0) return "de"; }
    return "en";
  }
  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-lang-block]").forEach(function (el) { el.hidden = el.getAttribute("data-lang-block") !== lang; });
    document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === lang)); });
    document.querySelectorAll("a[data-page]").forEach(function (a) { a.href = a.getAttribute("data-page") + "#" + lang; });
    var t = document.querySelector("title"); if (t && t.dataset[lang]) t.textContent = t.dataset[lang];
  }
  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { apply(b.dataset.lang); try { history.replaceState(null, "", "#" + b.dataset.lang); } catch (e) {} });
  });
  apply(guess());
})();

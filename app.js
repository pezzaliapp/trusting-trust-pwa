(() => {
  const $ = (id) => document.getElementById(id);

  window.__computeMessage = (name) => {
    if (!name) return "Inserisci un nome.";
    return `Ciao ${name}. Questo messaggio viene dal sorgente.`;
  };

  function renderStatus() {
    $("status").textContent =
      window.__buildInjected
        ? "⚠️ Codice modificato dal build"
        : "✅ Codice sorgente diretto";
  }

  function run() {
    const name = $("name").value;
    $("out").textContent = window.__computeMessage(name);
    renderStatus();
  }

  async function showSources() {
    const [src, built] = await Promise.all([
      fetch("app.src.js").then(r => r.text()),
      fetch("app.js").then(r => r.text())
    ]);

    $("src").value = src;
    $("built").value = built;
  }

  window.addEventListener("DOMContentLoaded", () => {
    $("run").onclick = run;
    $("show").onclick = showSources;
    renderStatus();
  });
})();

(() => {
  const $ = (id) => document.getElementById(id);

  // Funzione "dichiarata" (quella che il lettore pensa venga eseguita)
  window.__computeMessage = (name) => {
    if (!name) return "Inserisci un nome.";
    return `Ciao ${name}. Questo messaggio viene dal sorgente.`;
  };

  function renderStatus() {
    $("status").textContent =
      window.__buildInjected
        ? "⚠️ Codice modificato dal build (demo divulgativa)"
        : "✅ Codice sorgente diretto";
  }

  function run() {
    const name = $("name").value;
    $("out").textContent = window.__computeMessage(name);
    renderStatus();
  }

  async function showSources() {
    const [src, built] = await Promise.all([
      fetch("app.src.js", { cache: "no-store" }).then(r => r.text()),
      fetch("app.js", { cache: "no-store" }).then(r => r.text())
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

/* --- BEGIN INJECTED (DEMO, harmless, divulgativo) ---
   Scopo: mostrare che ciò che viene eseguito (app.js) può
   differire dal sorgente dichiarato (app.src.js).
   NON fa rete, NON salva dati, NON traccia nulla.
--- */
(() => {
  try {
    const original = window.__computeMessage;
    if (typeof original !== "function") return;

    window.__computeMessage = (name) => {
      const base = original(name);
      if ((name || "").trim().toLowerCase() === "ken") {
        return base + " [⚠️ modificato dal build]";
      }
      return base;
    };

    // Flag usato dalla UI per segnalare la modifica
    window.__buildInjected = true;
  } catch (e) {
    // Silenzioso per demo
  }
})();
/* --- END INJECTED --- */

(() => {
  const $ = (id) => document.getElementById(id);

  // SORGENTE PULITO (quello che "credi" di eseguire)
  window.__computeMessage = (name) => {
    if (!name) return "Inserisci un nome.";
    return `Ciao ${name}. Questo messaggio viene dal sorgente.`;
  };

  function renderStatus() {
    $("status").textContent =
      window.__buildInjected
        ? "⚠️ Esecuzione: app.js include una modifica introdotta dalla toolchain (demo)."
        : "✅ Esecuzione: codice diretto (nessuna modifica rilevata).";
  }

  function run() {
    const name = $("name").value;
    $("out").textContent = window.__computeMessage(name);
    renderStatus();
  }

  async function sha256(text) {
    const enc = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    const arr = Array.from(new Uint8Array(buf));
    return arr.map(b => b.toString(16).padStart(2, "0")).join("");
  }

  async function showSources() {
    const [srcRes, builtRes] = await Promise.all([
      fetch("app.src.js", { cache: "no-store" }),
      fetch("app.js", { cache: "no-store" })
    ]);

    const src = await srcRes.text();
    const built = await builtRes.text();

    $("src").value = src;
    $("built").value = built;

    // Verifica integrità (difensiva): hash visibili
    const [hSrc, hBuilt] = await Promise.all([sha256(src), sha256(built)]);
    $("hashSrc").textContent = hSrc;
    $("hashBuilt").textContent = hBuilt;

    $("hashNote").textContent =
      hSrc === hBuilt
        ? "Hash uguali: sorgente e build coincidono."
        : "Hash diversi: il build ha modificato l’output (questa è la lezione).";
  }

  window.addEventListener("DOMContentLoaded", () => {
    $("run").onclick = run;
    $("show").onclick = showSources;
    renderStatus();
  });
})();

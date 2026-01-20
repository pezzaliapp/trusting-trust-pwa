// build.js — genera app.js a partire da app.src.js aggiungendo una iniezione demo (innocua)
const fs = require("fs");

const SRC = "app.src.js";
const OUT = "app.js";

if (!fs.existsSync(SRC)) {
  console.error("❌ Manca app.src.js nella root.");
  process.exit(1);
}

const src = fs.readFileSync(SRC, "utf8");

// Blocco iniettato: NON fa rete, NON salva dati, NON apre falle.
// Modifica solo l'output per 'ken' e accende un flag visibile in UI.
const injected = `

/* --- BEGIN INJECTED BY build.js (DEMO, harmless) --- */
(() => {
  try {
    const original = window.__computeMessage;

    // Se la funzione non esiste, non fare nulla.
    if (typeof original !== "function") return;

    window.__computeMessage = (name) => {
      const base = original(name);

      // "Comportamento invisibile": cambia SOLO per un input specifico.
      if ((name || "").trim().toLowerCase() === "ken") {
        return base + " [⚠️ modificato dal build]";
      }
      return base;
    };

    // Flag usato dalla UI per mostrare lo stato
    window.__buildInjected = true;
  } catch (e) {
    // in demo: silenzioso
  }
})();
/* --- END INJECTED BY build.js (DEMO, harmless) --- */
`;

fs.writeFileSync(OUT, src + injected, "utf8");
console.log("✅ Build OK: app.js rigenerato da app.src.js");

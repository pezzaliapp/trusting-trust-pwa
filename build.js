// build.js — genera app.js a partire da app.src.js
// aggiungendo una iniezione DEMO, innocua e dichiarata.
// Scopo: dimostrare che l’output eseguito può differire dal sorgente.

const fs = require("fs");

const SRC = "app.src.js";
const OUT = "app.js";

if (!fs.existsSync(SRC)) {
  console.error("❌ Manca app.src.js nella root.");
  process.exit(1);
}

const src = fs.readFileSync(SRC, "utf8");

// Iniezione didattica:
// - NON fa rete
// - NON salva dati
// - NON traccia utenti
// - NON persiste informazioni
// Si limita a modificare l’output per un input specifico
// e ad attivare un flag visibile nella UI.
const injected = `

/* --- BEGIN INJECTED BY build.js (DEMO, harmless, divulgativo) ---
   Questa sezione viene aggiunta in fase di build.
   Serve a dimostrare che ciò che viene eseguito (app.js)
   può differire dal sorgente dichiarato (app.src.js).
--- */
(() => {
  try {
    const original = window.__computeMessage;
    if (typeof original !== "function") return;

    window.__computeMessage = (name) => {
      const base = original(name);

      // Dimostrazione controllata:
      // modifica l’output SOLO per un input noto ("ken").
      if ((name || "").trim().toLowerCase() === "ken") {
        return base + " [build-modified]";
      }
      return base;
    };

    // Flag usato dalla UI per indicare che il build
    // ha introdotto una modifica
    window.__buildInjected = true;
  } catch (e) {
    // Silenzioso per demo
  }
})();
/* --- END INJECTED BY build.js --- */
`;

fs.writeFileSync(OUT, src + injected, "utf8");
console.log("✅ Build OK: app.js rigenerato da app.src.js");

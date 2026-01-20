// build.js — genera app.js a partire da app.src.js
// + genera integrity.json (hash attesi) per verifica difensiva.
//
// Scopo: demo divulgativa (Trusting Trust) + contromisura pratica (integrità).

const fs = require("fs");
const crypto = require("crypto");

const SRC = "app.src.js";
const OUT = "app.js";
const INTEGRITY_OUT = "integrity.json";

// Incrementa qui quando fai una release (allinealo al CACHE del sw.js se vuoi)
const VERSION = "v1.0.1";
const PROJECT = "trusting-trust-pwa";

if (!fs.existsSync(SRC)) {
  console.error("❌ Manca app.src.js nella root.");
  process.exit(1);
}

const src = fs.readFileSync(SRC, "utf8");

// Iniezione didattica, innocua e dichiarata:
// - NON fa rete
// - NON salva dati
// - NON traccia utenti
// - NON persiste informazioni
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

// 1) Genera app.js
fs.writeFileSync(OUT, src + injected, "utf8");
console.log("✅ Build OK: app.js rigenerato da app.src.js");

// 2) Utility hash
function sha256File(path) {
  const buf = fs.readFileSync(path);
  return crypto.createHash("sha256").update(buf).digest("hex");
}

// 3) Lista asset da includere in integrity.json
// (aggiungi qui le icone se vuoi: "icon-192.png", "icon-512.png")
const ASSETS = [
  "index.html",
  "app.js",
  "app.src.js",
  "sw.js",
  "manifest.webmanifest"
];

// Includi automaticamente icone comuni se presenti
const maybeIcons = ["icon-192.png", "icon-512.png", "icons/icon-192.png", "icons/icon-512.png"];
for (const p of maybeIcons) {
  if (fs.existsSync(p) && !ASSETS.includes(p)) ASSETS.push(p);
}

// 4) Genera mappa hash
const files = {};
for (const file of ASSETS) {
  if (!fs.existsSync(file)) {
    console.warn(`⚠️ integrity: file mancante, salto: ${file}`);
    continue;
  }
  files[file] = sha256File(file);
}

// 5) Scrive integrity.json
const integrity = {
  meta: {
    name: PROJECT,
    version: VERSION,
    generated_at: new Date().toISOString()
  },
  files
};

fs.writeFileSync(INTEGRITY_OUT, JSON.stringify(integrity, null, 2) + "\n", "utf8");
console.log(`✅ integrity.json aggiornato (${Object.keys(files).length} file)`);

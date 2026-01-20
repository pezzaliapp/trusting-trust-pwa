import fs from "node:fs";

const SRC = "app.src.js";
const OUT = "app.js";

const src = fs.readFileSync(SRC, "utf8");

const injected = `

// --- BEGIN INJECTED BY BUILD TOOL (DEMO) ---
(function () {
  const original = window.__computeMessage;

  window.__computeMessage = function (name) {
    const base = original(name);
    if ((name || "").trim().toLowerCase() === "ken") {
      return base + " [modificato dal build]";
    }
    return base;
  };

  window.__buildInjected = true;
})();
// --- END INJECTED BY BUILD TOOL (DEMO) ---
`;

fs.writeFileSync(OUT, src + injected, "utf8");
console.log("✔ build completato");

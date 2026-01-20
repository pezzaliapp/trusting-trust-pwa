(() => {
  const $ = (id) => document.getElementById(id);

  // i18n minimale (UI)
  const I18N = {
    it: {
      title: "Trusting Trust – Demo",
      intro:
        "Demo divulgativa e difensiva. Mostra perché non basta leggere il sorgente: è fondamentale verificare ciò che viene realmente eseguito (toolchain, build, supply-chain).",
      run: "Esegui",
      show: "Mostra sorgente vs build",
      placeholder: "Scrivi un nome (prova: ken)",
      hash_src: "SHA-256 app.src.js",
      hash_built: "SHA-256 app.js",
      status_ok: "✅ Codice sorgente diretto",
      status_warn: "⚠️ Codice modificato dal build (demo divulgativa)",
      hash_same: "Hash uguali: sorgente e build coincidono.",
      hash_diff: "Hash diversi: il build ha modificato l’output (questa è la lezione).",
      out_empty: "Inserisci un nome."
    },
    en: {
      title: "Trusting Trust – Demo",
      intro:
        "Educational, defensive demo. It shows why reading source code is not enough: you must verify what is actually executed (toolchain, build, supply-chain).",
      run: "Run",
      show: "Show source vs build",
      placeholder: "Type a name (try: ken)",
      hash_src: "SHA-256 app.src.js",
      hash_built: "SHA-256 app.js",
      status_ok: "✅ Direct source code",
      status_warn: "⚠️ Code modified by the build (educational demo)",
      hash_same: "Same hash: source and build match.",
      hash_diff: "Different hash: the build changed the output (that’s the point).",
      out_empty: "Type a name."
    }
  };

  let lang = localStorage.getItem("tt_lang") || "it";

  function t(key) {
    return (I18N[lang] && I18N[lang][key]) || (I18N.it[key] || "");
  }

  function applyLang() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      // L'intro nel tuo index.html contiene HTML (<strong>/<em>).
      // Per non romperlo, non lo sovrascriviamo qui.
      if (key === "intro") return;
      el.textContent = t(key);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      el.placeholder = t(key);
    });

    renderStatus();
  }

  // SORGENTE "pulito": ciò che dichiari
  window.__computeMessage = (name) => {
    if (!name) return t("out_empty");
    return lang === "it"
      ? `Ciao ${name}. Questo messaggio viene dal sorgente.`
      : `Hello ${name}. This message comes from the source.`;
  };

  function renderStatus() {
    $("status").textContent =
      window.__buildInjected ? t("status_warn") : t("status_ok");
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
    return arr.map((b) => b.toString(16).padStart(2, "0")).join("");
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

    try {
      const [hSrc, hBuilt] = await Promise.all([sha256(src), sha256(built)]);
      if ($("hashSrc")) $("hashSrc").textContent = hSrc;
      if ($("hashBuilt")) $("hashBuilt").textContent = hBuilt;

      if ($("hashNote")) {
        $("hashNote").textContent = hSrc === hBuilt ? t("hash_same") : t("hash_diff");
      }
    } catch (e) {
      if ($("hashNote")) $("hashNote").textContent = "";
    }
  }

  window.addEventListener("DOMContentLoaded", () => {
    // Bottoni lingua (presenti in index.html)
    const itBtn = $("lang-it");
    const enBtn = $("lang-en");

    if (itBtn) {
      itBtn.onclick = () => {
        lang = "it";
        localStorage.setItem("tt_lang", "it");
        applyLang();
      };
    }

    if (enBtn) {
      enBtn.onclick = () => {
        lang = "en";
        localStorage.setItem("tt_lang", "en");
        applyLang();
      };
    }

    $("run").onclick = run;
    $("show").onclick = showSources;

    applyLang();
    renderStatus();
  });
})();

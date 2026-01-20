# Trusting Trust – PWA Demo

Demo minimale, **divulgativa e difensiva**, ispirata al concetto di “Trusting Trust”.

L’obiettivo è mostrare che **non basta leggere il sorgente per fidarsi del risultato**:  
quello che conta è **ciò che viene realmente eseguito** dopo build e toolchain.

👉 Demo pubblica:  
https://www.alessandropezzali.it/trusting-trust-pwa/

---

## 🇮🇹 Italiano

### Cosa impari in 60 secondi

- Che leggere il sorgente **non garantisce** di sapere cosa stai eseguendo.
- Che la differenza tra `app.src.js` e `app.js` conta più del codice “pulito”.
- Che la toolchain è parte del software tanto quanto il codice.
- Che verificare l’integrità è una pratica difensiva, non paranoica.
- Che la sicurezza inizia dalla consapevolezza.

---

### Come funziona

La demo utilizza due file distinti:

- **`app.src.js`**  
  Il sorgente leggibile e dichiarato.

- **`app.js`**  
  Il file realmente eseguito dal browser (output della build).

Con il pulsante **“Mostra sorgente vs build”** puoi confrontarli direttamente.

Per rendere evidente la differenza, l’output cambia **solo** se inserisci il nome `ken`.

---

### Perché esiste `build.js`

`build.js` è uno **strumento di build didattico** che:

1. legge `app.src.js`
2. genera `app.js`
3. aggiunge una modifica **marcata e innocua** al file finale

Questa modifica:
- non fa rete
- non salva dati
- non traccia utenti
- non persiste informazioni

Serve esclusivamente a dimostrare che **la toolchain può alterare l’output finale**.

> `build.js` non viene eseguito dal browser.  
> È uno strumento offline, usato prima della pubblicazione.

---

### PWA e cache

La demo include un Service Worker (`sw.js`) per funzionare offline.

Quando aggiorni i file, incrementa sempre la versione della cache  
(es. `trusting-trust-v2`, `v3`, …) per evitare risorse obsolete.

---

## 🇬🇧 English

### What you learn in 60 seconds

- That reading the source code **does not guarantee** you know what you are executing.
- That the difference between `app.src.js` and `app.js` matters more than “clean” code.
- That the toolchain is part of the software.
- That integrity verification is a defensive practice, not paranoia.
- That security starts with awareness.

---

### How it works

The demo uses two distinct files:

- **`app.src.js`**  
  The declared, readable source code.

- **`app.js`**  
  The file actually executed by the browser (build output).

Using the **“Show source vs build”** button, you can compare them directly.

To make the difference explicit, the output changes **only** if you type the name `ken`.

---

### Why `build.js` exists

`build.js` is a **didactic build tool** that:

1. reads `app.src.js`
2. generates `app.js`
3. appends a **clearly marked, harmless** modification to the final file

This modification:
- performs no network requests
- stores no data
- tracks no users
- has no persistence

Its sole purpose is to demonstrate that **the toolchain can alter the final output**.

> `build.js` is never executed in the browser.  
> It is an offline tool, used before publication.

---

### PWA and cache

This demo includes a Service Worker (`sw.js`) to support offline usage.

Whenever files are updated, always increment the cache version  
(e.g. `trusting-trust-v2`, `v3`, …) to avoid serving stale assets.

---

## License

This project is released under the **MIT License**.

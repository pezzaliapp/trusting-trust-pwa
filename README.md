# Trusting Trust – PWA Demo

Demo minimale, **divulgativa e difensiva**, ispirata al concetto di “Trusting Trust”.

L’obiettivo è mostrare che **non basta leggere il sorgente per fidarsi del risultato**:
quello che conta è **ciò che viene realmente eseguito** dopo build e toolchain.

---

## Cosa impari in 60 secondi

- Che leggere il sorgente **non garantisce** di sapere cosa stai eseguendo.
- Che la differenza tra `app.src.js` e `app.js` conta più del codice “pulito”.
- Che la toolchain è parte del software tanto quanto il codice.
- Che verificare l’integrità è una pratica difensiva, non paranoica.
- Che la sicurezza inizia dalla consapevolezza.

---

## Come funziona

La demo utilizza due file distinti:

- **`app.src.js`**  
  Il sorgente leggibile e dichiarato.

- **`app.js`**  
  Il file realmente eseguito dal browser (output della build).

Con il pulsante **“Mostra sorgente vs build”** puoi confrontarli direttamente.

Per rendere evidente la differenza, l’output cambia **solo** se inserisci il nome `ken`.

---

## Perché esiste `build.js`

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

## PWA e cache

La demo include un Service Worker (`sw.js`) per funzionare offline.

Quando aggiorni i file, incrementa sempre la versione della cache
(es. `trusting-trust-v2`, `v3`, …) per evitare risorse obsolete.

---

## Licenza

Questo progetto è rilasciato sotto **MIT License**.

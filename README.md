Perfetto. Ecco un README.md pronto (tono divulgativo/difensivo, chiaro, senza parole “trigger” inutili). Copia/incolla così com’è.

# Trusting Trust – PWA Demo (Divulgativa / Difensiva)

Questa è una demo minimale ispirata al celebre concetto “Trusting Trust”:  
**non basta leggere il sorgente per fidarsi del risultato**.  
Quello che conta è **ciò che viene realmente eseguito** dopo build/toolchain.

✅ Scopo: divulgazione e sensibilizzazione su integrità della toolchain / supply-chain  
❌ Non è una guida a tecniche offensive, non include rete, logging, storage o persistenza

---

## Come funziona

La demo usa due file:

- **`app.src.js`** → *sorgente “pulito” e leggibile* (quello che pensi di eseguire)
- **`app.js`** → *file realmente eseguito dal browser* (output della build)

Aprendo la pagina puoi:
- eseguire un messaggio con **Esegui**
- confrontare **sorgente vs build** con il pulsante dedicato
- vedere che, a parità di UI, un output può cambiare se il build introduce una modifica

Per rendere la differenza evidente, la demo modifica il risultato **solo** se inserisci il nome `ken`.

---

## Perché c’è `build.js` (e cosa fa)

`build.js` è uno **strumento di build didattico** che:

1. legge `app.src.js`
2. genera `app.js`
3. aggiunge in fondo a `app.js` un blocco **marcato** `BEGIN INJECTED...`

Questa “iniezione” è **innocua**:
- non fa richieste di rete
- non salva dati
- non traccia utenti
- non persiste informazioni
- serve solo a mostrare che **la toolchain può cambiare l’output finale**

> Nota: `build.js` non viene eseguito dal browser.  
> Serve solo per rigenerare `app.js` prima della pubblicazione.

---

## Uso (opzionale, per rigenerare `app.js`)

Se vuoi rigenerare `app.js` da `app.src.js`:

```bash
node build.js

Poi committa e pubblica app.js.

⸻

PWA / cache

Questa demo include un Service Worker (sw.js) per funzionare anche offline.
Quando aggiorni i file, ricordati di incrementare la versione della cache (es. trusting-trust-v2, v3, …) per evitare che i browser usino risorse vecchie.

⸻

Licenza / Etica

Questa demo è pensata per scopi educativi e difensivi.
Qualsiasi uso orientato a danneggiare o ingannare utenti va contro l’intento del progetto.

Se vuoi, posso anche:
- aggiungere una sezione “**Cosa impari in 60 secondi**” (molto LinkedIn)
- oppure un mini **FAQ** (“Perché i due file?”, “Perché `ken`?”, “Perché serve il Service Worker?”).

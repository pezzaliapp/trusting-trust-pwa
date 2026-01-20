// sw.js — Service Worker
// Trusting Trust – PWA Demo
// Gestione cache deterministica per demo divulgativa

const CACHE = "trusting-trust-v1.0.0"; // ⬅️ incrementare a ogni release
const ASSETS = [
  "./",
  "./index.html",
  "./app.js",
  "./app.src.js",
  "./sw.js",
  "./manifest.webmanifest"
];

// Installazione: cache iniziale
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Attivazione: pulizia cache obsolete
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: cache-first, fallback network
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return cached || fetch(e.request);
    })
  );
});

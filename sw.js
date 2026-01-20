const CACHE = "trusting-trust-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./app.js",
  "./app.src.js",
  "./manifest.webmanifest"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

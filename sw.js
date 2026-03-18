const CACHE_NAME = 'caa-v1';
const ASSETS = [
  './index.html',
  './manifest.json',
  'https://img.icons8.com/fluency/512/communication.png'
];

// Installazione: mette in cache i file principali
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Intercettazione richieste: serve dalla cache se offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

const CACHE_NAME = 'caa-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://img.icons8.com/fluency/512/communication.png'
];

// Installazione: mette in cache i file principali
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Usiamo un approccio più robusto per non far fallire l'installazione se un asset esterno manca
      return Promise.allSettled(
        ASSETS.map(asset => cache.add(asset))
      ).then(results => {
        console.log('Cache pre-caricata con risultati:', results);
      });
    })
  );
  self.skipWaiting();
});

// Attivazione: pulizia vecchie cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
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


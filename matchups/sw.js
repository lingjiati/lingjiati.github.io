var cacheName = 'matchups_v0.09';
var filesToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/main.js',
  './js/Eligo.js',
  './css/w3.css',
  './js/bc.js',
  './fonts/RobotoMono.woff',
  './fonts/RobotoMono500.woff',
  './fonts/MaterialIcons.woff'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      )
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

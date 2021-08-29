var cacheName = 'matchups_v2.0'; //1.86
var filesToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/register.js',
  './js/Eligo.js',
  './css/w3.css',
  './js/main.js',
  './js/Sortable.js',
  './fonts/RobotoMono.woff',
  './fonts/RobotoMonoBold.woff',
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

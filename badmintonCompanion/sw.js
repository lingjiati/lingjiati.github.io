const staticCacheName = "site-static";
const assets = [
  '/',
  'Eligo.js',
  'app.js',
  'index.html',
  'main.js',
  'style.css',
  'w3.css',
  'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600&display=swap',
  'https://fonts.gstatic.com/s/materialicons/v92/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('caching shell assets');
      cache.addAll(assets)
    })
  )
})


self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request)
    })
  )


})

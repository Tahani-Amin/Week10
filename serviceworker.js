var cacheName = 'pet-depot-cache-v1';
var cacheFiles = [
    'cat.jpeg',
    'catfood.jpeg',
    'icon.png',
    'serviceworker.js',
    'petstore.webmanifest',
    'PetDepot.html'
];
self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Installed');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[ServiceWorker] Caching cacheFiles');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(r) {
            return r || fetch(e.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});
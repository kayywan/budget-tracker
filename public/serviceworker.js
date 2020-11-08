importScripts ('/cache-polyfill.js');

// install service worker
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('cacheName').then(function(cache) {
            return caches.addAll ([
                '/',
                '/public/index.html',
                '/public/index.js',
                '/public/styles.css',
                '/public/icons'
            ]);
        }
    )
)});

self.addEventListener ('fetch', function(e) {
    console.log(e.request.url);
e.respondWith(
    caches.match(e.request)
    .then(function(response) {
        return response || fetch(e.request);
    })
);
});


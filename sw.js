const CACHE_NAME = 'portal-kampus-v2'; // Naikkan versi cache
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './images/icon-192.png',
    './images/icon-512.png',
    './offline.html' // <--- WAJIB DITAMBAHKAN
];

// Install Event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Menyimpan offline.html ke cache');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Activate Event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

// Fetch Event (Logika Offline)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // 1. Jika ada di cache, ambil dari cache
                if (response) {
                    return response;
                }
                // 2. Jika tidak, ambil dari internet
                return fetch(event.request)
                    .catch(() => {
                        // 3. JIKA GAGAL (OFFLINE) & Request adalah halaman Web (HTML)
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('./offline.html'); // Tampilkan halaman offline
                        }
                    });
            })
    );
});
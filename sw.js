const CACHE_NAME = 'portal-kampus-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './images/icon-192.png',
    './images/icon-512.png'
];

// --- FASE 1: INSTALL ---
// Saat SW pertama kali dipasang, download aset penting ke cache
self.addEventListener('install', event => {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Caching all assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// --- FASE 2: ACTIVATE ---
// Saat SW baru aktif, hapus cache versi lama (misal v1 diganti v2)
self.addEventListener('activate', event => {
    console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key !== CACHE_NAME) {
                    console.log('[Service Worker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    // Agar SW baru langsung mengontrol halaman tanpa perlu refresh
    return self.clients.claim();
});

// --- FASE 3: FETCH (Offline Logic) ---
// Mencegat setiap request jaringan
self.addEventListener('fetch', event => {
    event.respondWith(
        // Cek apakah request ada di cache?
        caches.match(event.request)
            .then(response => {
                // Jika ADA di cache, kembalikan data cache (Offline mode jalan!)
                if (response) {
                    return response;
                }
                // Jika TIDAK ada, ambil dari internet (Network)
                return fetch(event.request);
            })
    );
});
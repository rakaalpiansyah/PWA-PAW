// Mengecek apakah browser mendukung Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Mendaftarkan file 'sw.js' yang ada di root folder
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('Service Worker berhasil didaftarkan! Scope:', registration.scope);
            })
            .catch(error => {
                console.log('Pendaftaran Service Worker gagal:', error);
            });
    });
}
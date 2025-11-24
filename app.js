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
    // Logika untuk Notifikasi Offline/Online
window.addEventListener('offline', () => {
    const toast = document.getElementById('offline-notification');
    toast.className = "offline-toast show"; // Munculkan toast
    toast.innerText = "Koneksi terputus! Anda dalam mode offline.";
    toast.style.backgroundColor = "#dc3545"; // Merah
});

window.addEventListener('online', () => {
    const toast = document.getElementById('offline-notification');
    toast.innerText = "Koneksi kembali stabil.";
    toast.style.backgroundColor = "#28a745"; // Hijau
    
    // Hilangkan notifikasi setelah 3 detik
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 3000);
});
}
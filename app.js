let deferredPrompt;
const installBanner = document.getElementById('installBanner');
const installButton = document.getElementById('installButton');

// Mendeteksi jika aplikasi bisa diinstal
window.addEventListener('beforeinstallprompt', (e) => {
    // Mencegah popup install otomatis
    e.preventDefault();
    deferredPrompt = e;
    installBanner.style.display = 'block';  // Tampilkan banner

    installButton.addEventListener('click', () => {
        installBanner.style.display = 'none'; // Sembunyikan banner
        deferredPrompt.prompt(); // Tampilkan prompt install
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    });
});

// Mendaftarkan service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registered with scope: ', registration.scope);
            }, err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

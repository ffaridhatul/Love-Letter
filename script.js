// Audio Autoplay System
const audioPlayer = document.getElementById('audioPlayer');

// Auto-start dengan handling browser policy
const startAudio = () => {
    audioPlayer.play()
        .then(() => {
            console.log('Audio berhasil dimulai');
            musicPlayer.style.display = 'none'; // Sembunyikan kontrol jika perlu
        })
        .catch(error => {
            console.log('Autoplay diblokir:', error);
            showFallbackButton();
        });
};

// Fallback untuk browser yang memblokir autoplay
const showFallbackButton = () => {
    const playButton = document.createElement('button');
    playButton.id = 'playButton';
    playButton.style.position = 'fixed';
    playButton.style.bottom = '20px';
    playButton.style.left = '50%';
    playButton.style.transform = 'translateX(-50%)';
    playButton.addEventListener('click', () => audioPlayer.play());
    document.body.appendChild(playButton);
};

// Coba mulai audio saat halaman dimuat
window.addEventListener('load', () => {
    audioPlayer.volume = 0.5; // Atur volume (0-1)
    
    // Tambahkan penundaan untuk handling beberapa browser
    setTimeout(startAudio, 500);
});

// Reject Button Logic (diperbaiki)
const rejectBtn = document.getElementById('rejectBtn');
rejectBtn.addEventListener('mouseover', () => {
    const buttonRect = rejectBtn.getBoundingClientRect();
    const maxX = window.innerWidth - buttonRect.width - 20;
    const maxY = window.innerHeight - buttonRect.height - 20;
    
    rejectBtn.style.position = 'absolute';
    rejectBtn.style.left = Math.random() * maxX + 'px';
    rejectBtn.style.top = Math.random() * maxY + 'px';
});
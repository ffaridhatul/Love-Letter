document.addEventListener('DOMContentLoaded', () => {
    // ============== AUDIO HANDLER ==============
    const audioPlayer = document.getElementById('audioPlayer');
    const overlay = document.getElementById('overlay');
    let isPlaying = false;

    // Setup audio overlay
    if (!overlay) {
        const overlayDiv = document.createElement('div');
        overlayDiv.id = 'audioOverlay';
        overlayDiv.innerHTML = `
            <div class="overlay-content">
                <h2>🎵 Klik Dimana Saja untuk Memulai Musik 🎵</h2>
                <p>Agar pengalaman lebih romantis!</p>
            </div>
        `;
        document.body.appendChild(overlayDiv);
    }

    // Try autoplay first
    audioPlayer.play()
        .then(() => {
            isPlaying = true;
            overlay.style.display = 'none';
        })
        .catch(error => {
            console.log('Autoplay diblokir, memerlukan interaksi:', error);
            overlay.style.display = 'flex';
            initAudio();
        });

    // ============== REJECT BUTTON HANDLER ==============
    const rejectBtn = document.getElementById('rejectBtn');
    const buttonContainer = document.querySelector('.button-container');

    rejectBtn.addEventListener('mouseover', moveButton);
    rejectBtn.addEventListener('touchstart', moveButton);

    // Reset position on window resize
    window.addEventListener('resize', () => {
        rejectBtn.style.transform = 'translate(0, 0)';
    });

    // ============== ERROR HANDLING ==============
    audioPlayer.addEventListener('error', (e) => {
        console.error('Error audio:', e);
        overlay.innerHTML = `
            <div class="overlay-content error">
                <h2>⚠️ Musik Tidak Dapat Dimainkan</h2>
                <p>Pastikan koneksi internet aktif atau coba refresh halaman</p>
            </div>
        `;
    });

    // ============== MUSIC DURATION HANDLER ==============
const musicDurationInput = document.getElementById('music-duration');
const musicDurationText = document.getElementById('music-duration-text');

audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    const progress = (currentTime / duration) * 100;
    musicDurationInput.value = progress;
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    musicDurationText.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// ============== INIT AUDIO ==============
function initAudio() {
    audioPlayer.addEventListener('play', () => {
        isPlaying = true;
        overlay.style.display = 'none';
    });

    audioPlayer.addEventListener('pause', () => {
        isPlaying = false;
        overlay.style.display = 'flex';
    });

    overlay.addEventListener('click', () => {
        if (!isPlaying) {
            audioPlayer.play();
        }
    });
}

// ============== MOVE BUTTON ==============
function moveButton() {
    const x = Math.floor(Math.random() * (buttonContainer.offsetWidth - rejectBtn.offsetWidth));
    const y = Math.floor(Math.random() * (buttonContainer.offsetHeight - rejectBtn.offsetHeight));
    rejectBtn.style.transform = `translate(${x}px, ${y}px)`;
}
});

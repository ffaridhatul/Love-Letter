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

    // Audio play handler
    const playAudio = () => {
        audioPlayer.play()
            .then(() => {
                isPlaying = true;
                overlay.style.display = 'none';
                localStorage.setItem('audioPermission', 'granted');
            })
            .catch(error => {
                console.error('Gagal memutar audio:', error);
                showFallbackControls();
            });
    };

    // Fallback controls
    const showFallbackControls = () => {
        const playBtn = document.createElement('button');
        playBtn.id = 'fallbackPlayBtn';
        playBtn.textContent = '▶️ Putar Musik';
        playBtn.onclick = playAudio;
        document.body.appendChild(playBtn);
    };

    // Check previous permission
    if(localStorage.getItem('audioPermission') === 'granted') {
        audioPlayer.play().catch(() => overlay.style.display = 'flex');
    }

    // Auto-init audio on first interaction
    const initAudio = () => {
        document.body.style.cursor = 'pointer';
        
        const startOnInteraction = () => {
            playAudio();
            document.body.style.cursor = 'default';
        };

        document.addEventListener('click', startOnInteraction, { once: true });
        document.addEventListener('touchstart', startOnInteraction, { once: true });
    };

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

    const moveButton = () => {
        const containerRect = buttonContainer.getBoundingClientRect();
        const btnRect = rejectBtn.getBoundingClientRect();
        
        const maxX = containerRect.width - btnRect.width - 20;
        const maxY = containerRect.height - btnRect.height - 20;

        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        rejectBtn.style.transform = `translate(${newX}px, ${newY}px)`;
    };

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
});
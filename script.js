// audio-handler.js
document.addEventListener('DOMContentLoaded', () => {
    // ============== AUDIO HANDLER ==============
    const audioPlayer = document.getElementById('audioPlayer');
    const overlay = document.createElement('div');
    let isPlaying = false;
    let audioInitialized = false;

    // Setup audio overlay
    overlay.id = 'audioOverlay';
    overlay.innerHTML = `
        <div class="overlay-content">
            <h2>🎵 Klik Dimana Saja untuk Memulai Musik 🎵</h2>
            <p>Agar pengalaman lebih romantis!</p>
        </div>
    `;
    document.body.appendChild(overlay);

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
        if(!audioInitialized) {
            audioInitialized = true;
            document.body.style.cursor = 'pointer';
            
            const startOnInteraction = () => {
                playAudio();
                document.removeEventListener('click', startOnInteraction);
                document.removeEventListener('touchstart', startOnInteraction);
                document.body.style.cursor = 'default';
            };

            document.addEventListener('click', startOnInteraction);
            document.addEventListener('touchstart', startOnInteraction);
        }
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
    let isMoving = false;

    const moveButton = () => {
        if(isMoving) return;
        
        isMoving = true;
        const btnRect = rejectBtn.getBoundingClientRect();
        const maxX = window.innerWidth - btnRect.width - 20;
        const maxY = window.innerHeight - btnRect.height - 20;

        const newX = Math.max(20, Math.random() * maxX);
        const newY = Math.max(20, Math.random() * maxY);

        rejectBtn.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
        rejectBtn.style.transform = `translate(${newX}px, ${newY}px)`;
        
        setTimeout(() => {
            rejectBtn.style.transition = '';
            isMoving = false;
        }, 500);
    };

    // Improved movement logic
    rejectBtn.addEventListener('mouseover', moveButton);
    rejectBtn.addEventListener('touchstart', moveButton);

    // ============== VISUAL EFFECTS ==============
    // Hover effect for buttons
    document.querySelectorAll('.whatsapp-button, .reject-button').forEach(btn => {
        btn.addEventListener('mouseover', () => {
            btn.style.transform = 'scale(1.05)';
        });
        
        btn.addEventListener('mouseout', () => {
            btn.style.transform = 'scale(1)';
        });
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
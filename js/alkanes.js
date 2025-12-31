document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('#main-nav-links .nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggle-button');
    const subMenu = document.getElementById('sub-menu');
    const toggleIcon = document.getElementById('toggle-icon');

    function showSection(targetId) {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);

            if (window.innerWidth < 768) {
                sidebar.classList.add('hidden');
            }
        });
    });

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
    });


    const initialHash = window.location.hash;
    if (initialHash) {
        showSection(initialHash.substring(1));
    } else {
        showSection('intro');
    }

    // Quiz Functionality
    const quizData = [
        { name: 'البنتان', formula: 'CH₃–CH₂–CH₂–CH₂–CH₃' },
        { name: 'الهكسان', formula: 'CH₃–CH₂–CH₂–CH₂–CH₂–CH₃' },
        { name: 'الهبتان', formula: 'CH₃–CH₂–CH₂–CH₂–CH₂–CH₂–CH₃' },
        { name: 'الأوكتان', formula: 'CH₃–CH₂–CH₂–CH₂–CH₂–CH₂–CH₂–CH₃' },
        { name: 'النونان', formula: 'CH₃–CH₂–CH₂–CH₂–CH₂–CH₂–CH₂–CH₂–CH₃' },
        { name: 'الديكان', formula: 'CH₃–CH₂–CH₂–CH₂–CH₂–CH₂–CH₂–CH₂–CH₂–CH₃' }
    ];

    const questionEl = document.getElementById('quiz-question');
    const itemTypeEl = document.getElementById('quiz-item-type');
    const answerEl = document.getElementById('quiz-answer');
    const submitBtn = document.getElementById('quiz-submit');
    const nextBtn = document.getElementById('quiz-next');
    const feedbackEl = document.getElementById('quiz-feedback');
    let currentQuizItem = {};
    let quizMode = ''; // 'name' or 'formula'

    function generateQuestion() {
        const randomIndex = Math.floor(Math.random() * quizData.length);
        currentQuizItem = quizData[randomIndex];
        quizMode = Math.random() < 0.5 ? 'name' : 'formula';

        if (quizMode === 'name') {
            itemTypeEl.textContent = 'الاسم';
            questionEl.textContent = currentQuizItem.formula;
        } else {
            itemTypeEl.textContent = 'الصيغة البنائية';
            questionEl.textContent = currentQuizItem.name;
        }

        answerEl.value = '';
        feedbackEl.textContent = '';
        feedbackEl.className = 'mt-4 h-6 text-lg font-semibold';
    }

    submitBtn.addEventListener('click', () => {
        const userAnswer = answerEl.value.trim();
        const correctAnswer = quizMode === 'name' ? currentQuizItem.name : currentQuizItem.formula;

        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            feedbackEl.textContent = 'صحيح! إجابة رائعة.';
            feedbackEl.className = 'mt-4 h-6 text-lg font-semibold text-green-600';
            submitBtn.disabled = true; // Disable button briefly

            // Automatically load the next question after a short delay
            setTimeout(() => {
                generateQuestion();
                submitBtn.disabled = false; // Re-enable button
            }, 1500); // 1.5-second delay

        } else {
            feedbackEl.textContent = `خطأ. الإجابة الصحيحة هي: ${correctAnswer}`;
            feedbackEl.className = 'mt-4 h-6 text-lg font-semibold text-red-600';
        }
    });

    nextBtn.addEventListener('click', generateQuestion);

    // Initial question
    generateQuestion();

    // ============================================
    // Video Player Controls
    // ============================================

    // Helper function to format time
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Get all video elements
    const videos = document.querySelectorAll('video');

    videos.forEach(video => {
        const container = video.closest('.video-player-container');
        if (!container) return;

        // Get control elements
        const playPauseBtn = container.querySelector('.play-pause-btn');
        const progressBar = container.querySelector('.slider, input[type="range"]');
        const muteBtn = container.querySelector('.mute-btn');
        const speedBtn = container.querySelector('[id*="speed"]');
        const timeDisplay = container.querySelector('[id*="time"]');
        const fullscreenBtn = container.querySelector('.fullscreen-btn');

        // Play/Pause functionality
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    playPauseBtn.innerHTML = `
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                        </svg>
                    `;
                } else {
                    video.pause();
                    playPauseBtn.innerHTML = `
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                        </svg>
                    `;
                }
            });
        }

        // Progress bar functionality
        if (progressBar) {
            video.addEventListener('timeupdate', () => {
                const progress = (video.currentTime / video.duration) * 100;
                progressBar.value = progress || 0;

                // Update time display
                if (timeDisplay) {
                    const current = formatTime(video.currentTime);
                    const duration = formatTime(video.duration);
                    timeDisplay.textContent = `${current} / ${duration}`;
                }
            });

            progressBar.addEventListener('input', () => {
                const time = (progressBar.value / 100) * video.duration;
                video.currentTime = time;
            });
        }

        // Mute functionality
        if (muteBtn) {
            muteBtn.addEventListener('click', () => {
                video.muted = !video.muted;
                muteBtn.innerHTML = video.muted ? `
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                ` : `
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd"/>
                    </svg>
                `;
            });
        }

        // Speed control
        if (speedBtn) {
            const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
            let currentSpeedIndex = 2; // Default 1x

            speedBtn.addEventListener('click', () => {
                currentSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
                video.playbackRate = speeds[currentSpeedIndex];
                speedBtn.textContent = `${speeds[currentSpeedIndex]}x`;
            });
        }

        // Fullscreen functionality
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                if (container.requestFullscreen) {
                    container.requestFullscreen();
                } else if (container.webkitRequestFullscreen) {
                    container.webkitRequestFullscreen();
                } else if (container.msRequestFullscreen) {
                    container.msRequestFullscreen();
                }
            });
        }
    });
});
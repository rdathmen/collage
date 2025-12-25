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

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            subMenu.classList.toggle('hidden');
            toggleIcon.classList.toggle('rotate-180');
        });
    }

    const initialHash = window.location.hash;
    if (initialHash) {
        showSection(initialHash.substring(1));
    } else {
        showSection('intro');
    }

    // Quiz Functionality for Alkyl Halides
    const quizData = [
        { name: 'كلورو ميثان', formula: 'CH₃Cl' },
        { name: 'برومو إيثان', formula: 'CH₃CH₂Br' },
        { name: '2-كلورو بروبان', formula: 'CH₃CH(Cl)CH₃' },
        { name: 'يودو ميثان', formula: 'CH₃I' },
        { name: 'ثلاثي كلورو ميثان (كلوروفورم)', formula: 'CHCl₃' },
        { name: 'رباعي كلورو ميثان', formula: 'CCl₄' }
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
        if (!questionEl) return;

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

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const userAnswer = answerEl.value.trim();
            const correctAnswer = quizMode === 'name' ? currentQuizItem.name : currentQuizItem.formula;

            if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                feedbackEl.textContent = 'صحيح! إجابة رائعة.';
                feedbackEl.className = 'mt-4 h-6 text-lg font-semibold text-green-600';
                submitBtn.disabled = true;

                setTimeout(() => {
                    generateQuestion();
                    submitBtn.disabled = false;
                }, 1500);

            } else {
                feedbackEl.textContent = `خطأ. الإجابة الصحيحة هي: ${correctAnswer}`;
                feedbackEl.className = 'mt-4 h-6 text-lg font-semibold text-red-600';
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', generateQuestion);
    }

    // Initial question
    generateQuestion();

    // Video Player Logic (Multi-instance support)
    const videoContainers = document.querySelectorAll('.video-player-container');

    videoContainers.forEach(container => {
        const video = container.querySelector('.custom-video');
        const playPauseBtn = container.querySelector('.play-pause-btn');
        const playIcon = container.querySelector('.play-icon');
        const pauseIcon = container.querySelector('.pause-icon');
        const progressBar = container.querySelector('.progress-bar');
        const muteBtn = container.querySelector('.mute-btn');
        const volumeOnIcon = container.querySelector('.volume-on-icon');
        const volumeOffIcon = container.querySelector('.volume-off-icon');

        if (!video) return;

        function togglePlayPause() {
            if (video.paused) {
                video.play();
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
            } else {
                video.pause();
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
            }
        }

        function updateProgressBar() {
            if (video.duration) {
                const percentage = (video.currentTime / video.duration) * 100;
                progressBar.value = percentage;
            }
        }

        function seek() {
            const time = (progressBar.value / 100) * video.duration;
            video.currentTime = time;
        }

        function toggleMute() {
            video.muted = !video.muted;
            if (video.muted) {
                volumeOnIcon.classList.add('hidden');
                volumeOffIcon.classList.remove('hidden');
            } else {
                volumeOnIcon.classList.remove('hidden');
                volumeOffIcon.classList.add('hidden');
            }
        }

        // Event Listeners
        if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);
        if (progressBar) progressBar.addEventListener('input', seek);
        if (muteBtn) muteBtn.addEventListener('click', toggleMute);

        video.addEventListener('timeupdate', updateProgressBar);

        // Update play/pause icon on video end
        video.addEventListener('ended', () => {
            if (playIcon) playIcon.classList.remove('hidden');
            if (pauseIcon) pauseIcon.classList.add('hidden');
        });

        // Handle Autoplay state
        video.addEventListener('play', () => {
            if (playIcon) playIcon.classList.add('hidden');
            if (pauseIcon) pauseIcon.classList.remove('hidden');
        });

        video.addEventListener('pause', () => {
            if (playIcon) playIcon.classList.remove('hidden');
            if (pauseIcon) pauseIcon.classList.add('hidden');
        });

        // Update icons on load
        if (video.muted) {
            if (volumeOnIcon) volumeOnIcon.classList.add('hidden');
            if (volumeOffIcon) volumeOffIcon.classList.remove('hidden');
        } else {
            if (volumeOnIcon) volumeOnIcon.classList.remove('hidden');
        }
    });

    // New Video Player for Alkyl Halide Preparation
    const alkylHalidePrepVideo = document.getElementById('alkyl-halide-prep-video');
    if (alkylHalidePrepVideo) {
        const videoContainer = alkylHalidePrepVideo.closest('.video-container');
        const playPauseBtn = videoContainer.querySelector('.play-pause-btn');
        const playIcon = videoContainer.querySelector('.play-icon');
        const pauseIcon = videoContainer.querySelector('.pause-icon');
        const progressContainer = videoContainer.querySelector('.progress-container');
        const progressBar = videoContainer.querySelector('.progress-bar');
        const currentTimeEl = videoContainer.querySelector('.current-time');
        const durationEl = videoContainer.querySelector('.duration');
        const muteBtn = videoContainer.querySelector('.mute-btn');
        const volumeIcon = videoContainer.querySelector('.volume-icon');
        const mutedIcon = videoContainer.querySelector('.muted-icon');
        const speedControl = videoContainer.querySelector('.speed-control');
        const fullscreenBtn = videoContainer.querySelector('.fullscreen-btn');

        // Format time in MM:SS
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs.toString().padStart(2, '0')}`;
        }

        // Toggle play/pause
        function togglePlayPause() {
            if (alkylHalidePrepVideo.paused) {
                alkylHalidePrepVideo.play();
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
            } else {
                alkylHalidePrepVideo.pause();
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
            }
        }

        // Update progress bar and time
        function updateProgress() {
            const percent = (alkylHalidePrepVideo.currentTime / alkylHalidePrepVideo.duration) * 100;
            progressBar.style.width = percent + '%';
            currentTimeEl.textContent = formatTime(alkylHalidePrepVideo.currentTime);
        }

        // Set video time on progress bar click
        function setProgress(e) {
            const rect = progressContainer.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            alkylHalidePrepVideo.currentTime = pos * alkylHalidePrepVideo.duration;
        }

        // Toggle mute
        function toggleMute() {
            alkylHalidePrepVideo.muted = !alkylHalidePrepVideo.muted;
            if (alkylHalidePrepVideo.muted) {
                volumeIcon.classList.add('hidden');
                mutedIcon.classList.remove('hidden');
            } else {
                volumeIcon.classList.remove('hidden');
                mutedIcon.classList.add('hidden');
            }
        }

        // Change playback speed
        function changeSpeed() {
            alkylHalidePrepVideo.playbackRate = parseFloat(speedControl.value);
        }

        // Toggle fullscreen
        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                if (videoContainer.requestFullscreen) {
                    videoContainer.requestFullscreen();
                } else if (videoContainer.webkitRequestFullscreen) {
                    videoContainer.webkitRequestFullscreen();
                } else if (videoContainer.msRequestFullscreen) {
                    videoContainer.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }

        // Event listeners
        if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);
        if (progressContainer) progressContainer.addEventListener('click', setProgress);
        if (muteBtn) muteBtn.addEventListener('click', toggleMute);
        if (speedControl) speedControl.addEventListener('change', changeSpeed);
        if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

        alkylHalidePrepVideo.addEventListener('timeupdate', updateProgress);
        alkylHalidePrepVideo.addEventListener('loadedmetadata', () => {
            durationEl.textContent = formatTime(alkylHalidePrepVideo.duration);
        });
        alkylHalidePrepVideo.addEventListener('ended', () => {
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        });

        // Allow clicking video to play/pause
        alkylHalidePrepVideo.addEventListener('click', togglePlayPause);
    }
});

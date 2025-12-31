// إعادة التعيين عند إعادة تحميل الصفحة
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const contentSections = document.querySelectorAll(".content-section");
    const toggleButton = document.getElementById("toggle-button");
    const subMenu = document.getElementById("sub-menu");
    const toggleIcon = document.getElementById("toggle-icon");
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");

    // السايد بار للموبايل
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("hidden");
        });
    }

    // القائمة المنسدلة
    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            const isHidden = subMenu.classList.toggle("hidden");
            toggleIcon.style.transform = isHidden ? "rotate(0deg)" : "rotate(180deg)";
        });
    }

    // التنقل بين الصفحات
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);

            // إخفاء جميع الأقسام وإظهار القسم المستهدف
            contentSections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.add("active");
                } else {
                    section.classList.remove("active");
                }
            });

            // تحديث حالة 'active' للروابط
            navLinks.forEach(navLink => navLink.classList.remove("active"));
            this.classList.add("active");

            // إخفاء السايد بار بعد النقر (للموبايل)
            if (sidebar && sidebar.classList.contains("md:hidden")) {
                sidebar.classList.add("hidden");
            }
        });
    });

    // الاختبار
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        const questionItems = quizContainer.querySelectorAll('.quiz-question-item');
        const scoreContainer = document.getElementById('quiz-score');
        const scoreText = document.getElementById('score-text');
        const scoreBar = document.getElementById('score-bar');
        const resetQuizBtn = document.getElementById('reset-quiz');
        let currentQuestionIndex = 0;
        let score = 0;

        function showQuestion(index) {
            questionItems.forEach((item, i) => {
                item.classList.toggle('hidden', i !== index);
            });
        }

        function showScore() {
            questionItems.forEach(item => item.classList.add('hidden'));
            scoreContainer.classList.remove('hidden');
            const percentage = (score / questionItems.length) * 100;
            scoreText.textContent = `${score} / ${questionItems.length}`;
            scoreBar.style.width = `${percentage}%`;
            scoreBar.style.backgroundColor = percentage >= 50 ? '#4ade80' : '#f87171'; // أخضر أو أحمر
            resetQuizBtn.classList.remove('hidden');
        }

        function resetQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            scoreContainer.classList.add('hidden');
            resetQuizBtn.classList.add('hidden');
            showQuestion(0);
            document.querySelectorAll('.quiz-option').forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('bg-green-500', 'bg-red-500', 'text-white');
            });
        }

        document.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const isCorrect = btn.dataset.correct === 'true';
                if (isCorrect) {
                    score++;
                    btn.classList.add('bg-green-500', 'text-white');
                } else {
                    btn.classList.add('bg-red-500', 'text-white');
                }

                // تعطيل الأزرار بعد الاختيار
                document.querySelectorAll(`[data-question="${btn.dataset.question}"]`).forEach(b => {
                    b.disabled = true;
                });

                setTimeout(() => {
                    currentQuestionIndex++;
                    if (currentQuestionIndex < questionItems.length) {
                        showQuestion(currentQuestionIndex);
                    } else {
                        showScore();
                    }
                }, 1000);
            });
        });

        resetQuizBtn.addEventListener('click', resetQuiz);
        showQuestion(0);
    }
});

const svgs = document.querySelectorAll("svg");
function addDarkModeToSvgs() {
    const isDark = document.documentElement.classList.contains('dark');
    for (const svg of svgs) {
        if (isDark) {
            svg.classList.add("dark");
        } else {
            svg.classList.remove("dark");
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    addDarkModeToSvgs();
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(addDarkModeToSvgs, 100);
        });
    });

    // ============================================
    // Video Player Controls
    // ============================================
    
    // Get all video elements
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        const container = video.closest('.video-player-container');
        if (!container) return;
        
        // Get control elements
        const playPauseBtn = container.querySelector('.play-pause-btn');
        const progressBar = container.querySelector('.slider');
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
                if (video.muted) {
                    muteBtn.innerHTML = `
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                        </svg>
                    `;
                } else {
                    muteBtn.innerHTML = `
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd"/>
                        </svg>
                    `;
                }
            });
        }
        
        // Speed control functionality
        if (speedBtn) {
            const speeds = [0.5, 1, 1.5, 2];
            let currentSpeedIndex = 1; // Start at 1x
            
            speedBtn.addEventListener('click', () => {
                currentSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
                video.playbackRate = speeds[currentSpeedIndex];
                speedBtn.textContent = `${speeds[currentSpeedIndex]}x`;
            });
        }
        
        // Fullscreen functionality
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                if (!document.fullscreenElement) {
                    container.requestFullscreen().catch(err => {
                        console.log(`Error attempting to enable fullscreen: ${err.message}`);
                    });
                } else {
                    document.exitFullscreen();
                }
            });
        }
        
        // Click on video to play/pause
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    });
    
    // Helper function to format time
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
});
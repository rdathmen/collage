document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('#main-nav-links .nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

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
            if (link.getAttribute('href') === '#' + targetId) {
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

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
        });
    }

    const initialHash = window.location.hash;
    if (initialHash) {
        showSection(initialHash.substring(1));
    } else {
        showSection('intro');
    }

    // Quiz Functionality for Alcohols
    const quizData = [
        { name: 'إيثانول', formula: 'CH₃CH₂OH' },
        { name: '1-بروبانول', formula: 'CH₃CH₂CH₂OH' },
        { name: '2-بروبانول', formula: 'CH₃CH(OH)CH₃' },
        { name: '2-مثيل-2-بروبانول', formula: '(CH₃)₃COH' },
        { name: '1-بيوتانول', formula: 'CH₃CH₂CH₂CH₂OH' },
        { name: '2-بيوتانول', formula: 'CH₃CH₂CH(OH)CH₃' },
    ];

    const questionEl = document.getElementById('quiz-question');
    const itemTypeEl = document.getElementById('quiz-item-type');
    const answerEl = document.getElementById('quiz-answer');
    const submitBtn = document.getElementById('quiz-submit');
    const nextBtn = document.getElementById('quiz-next');
    const feedbackEl = document.getElementById('quiz-feedback');

    let currentQuizItem;
    let quizMode; // 'name' or 'formula'

    function generateQuestion() {
        if (!questionEl) return;
        const randomIndex = Math.floor(Math.random() * quizData.length);
        currentQuizItem = quizData[randomIndex];
        quizMode = Math.random() > 0.5 ? 'name' : 'formula';

        if (quizMode === 'name') {
            itemTypeEl.textContent = 'ما اسم المركب التالي؟';
            questionEl.textContent = currentQuizItem.formula;
        } else {
            itemTypeEl.textContent = 'ما الصيغة البنائية للمركب التالي؟';
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
                feedbackEl.textContent = '✅ إجابة صحيحة! أحسنت.';
                feedbackEl.className = 'mt-4 h-6 text-lg font-semibold text-green-600';
                submitBtn.disabled = true;
                setTimeout(() => {
                    generateQuestion();
                    submitBtn.disabled = false;
                }, 1500);
            } else {
                feedbackEl.textContent = '❌ إجابة خاطئة. الإجابة الصحيحة: ' + correctAnswer;
                feedbackEl.className = 'mt-4 h-6 text-lg font-semibold text-red-600';
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', generateQuestion);
    }

    // Initial question
    generateQuestion();

    // Video Player Logic
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

        if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);
        if (progressBar) progressBar.addEventListener('input', seek);
        if (muteBtn) muteBtn.addEventListener('click', toggleMute);
        video.addEventListener('timeupdate', updateProgressBar);
        video.addEventListener('ended', () => {
            if (playIcon) playIcon.classList.remove('hidden');
            if (pauseIcon) pauseIcon.classList.add('hidden');
        });
    });
});

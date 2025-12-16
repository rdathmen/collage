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
});
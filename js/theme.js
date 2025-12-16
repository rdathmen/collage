// Check for saved theme preference or system preference
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

// Function to toggle theme
function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
}

// Wait for DOM to load to attach event listeners if needed
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });
});

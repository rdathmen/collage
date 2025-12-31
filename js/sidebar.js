// sidebar.js - Dynamic sidebar navigation with section switching

document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const overlay = document.querySelector('.sidebar-overlay');

    // ============================================
    // Dynamic Section Switching
    // ============================================

    // Get all navigation links that point to sections (href starts with #)
    const navLinks = document.querySelectorAll('.sidebar .nav-link[href^="#"], nav a[href^="#"]');

    // Get all content sections
    const sections = document.querySelectorAll('section[id], .content-section[id]');

    // Function to show only the selected section
    function showSection(targetId) {
        // Hide all sections
        sections.forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active');
        });

        // Show the target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.classList.add('active');

            // Scroll to top of main content
            const mainContent = document.querySelector('.main-content, main');
            if (mainContent) {
                mainContent.scrollTop = 0;
            }
            window.scrollTo(0, 0);
        }

        // Update active link styling
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + targetId) {
                link.classList.add('active');
            }
        });
    }

    // Add click event listeners to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1); // Remove the #
                showSection(targetId);

                // Close mobile sidebar if open
                if (window.innerWidth <= 768 && sidebar) {
                    sidebar.classList.remove('open');
                    if (overlay) {
                        overlay.classList.remove('active');
                    }
                }
            }
        });
    });

    // Show first section by default on page load
    if (sections.length > 0) {
        // Check if there's a hash in URL
        const hash = window.location.hash;
        if (hash) {
            const targetId = hash.substring(1);
            showSection(targetId);
        } else {
            // Show the first section
            const firstSection = sections[0];
            if (firstSection) {
                showSection(firstSection.id);
            }
        }
    }

    // ============================================
    // Mobile Menu Toggle
    // ============================================

    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', function () {
            sidebar.classList.toggle('open');
            if (overlay) {
                overlay.classList.toggle('active');
            }
        });
    }

    // Close sidebar when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', function () {
            if (sidebar) {
                sidebar.classList.remove('open');
            }
            overlay.classList.remove('active');
        });
    }

    // ============================================
    // Submenu Toggle (for nested navigation)
    // ============================================

    const toggleButtons = document.querySelectorAll('#toggle-button, .submenu-toggle');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const submenu = this.parentElement.querySelector('.sub-menu');
            const icon = this.querySelector('svg');

            if (submenu) {
                submenu.classList.toggle('hidden');
                if (icon) {
                    icon.classList.toggle('rotate-180');
                }
            }
        });
    });

    // ============================================
    // Browser Back/Forward Support
    // ============================================

    window.addEventListener('hashchange', function () {
        const hash = window.location.hash;
        if (hash) {
            const targetId = hash.substring(1);
            showSection(targetId);
        }
    });
});

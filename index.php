<?php
session_start();
?>
<!DOCTYPE html>
<html lang="ar" dir="ltr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الكيمياء العضوية - رحلة في عالم الكربون</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <script src="js/tailwindcss.js"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        'tajawal': ['Tajawal', 'sans-serif'],
                    },
                    animation: {
                        'gradient-x': 'gradient-x 15s ease infinite',
                        'gradient-y': 'gradient-y 15s ease infinite',
                        'gradient-xy': 'gradient-xy 15s ease infinite',
                        'blob': 'blob 7s infinite',
                        'float': 'float 6s ease-in-out infinite',
                        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
                    },
                    keyframes: {
                        'gradient-y': {
                            '0%, 100%': { 'background-size': '400% 400%', 'background-position': 'center top' },
                            '50%': { 'background-size': '200% 200%', 'background-position': 'center center' }
                        },
                        'gradient-x': {
                            '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
                            '50%': { 'background-size': '200% 200%', 'background-position': 'right center' }
                        },
                        'gradient-xy': {
                            '0%, 100%': { 'background-size': '400% 400%', 'background-position': 'left center' },
                            '50%': { 'background-size': '200% 200%', 'background-position': 'right center' }
                        },
                        'blob': {
                            '0%': { transform: 'translate(0px, 0px) scale(1)' },
                            '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                            '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                            '100%': { transform: 'translate(0px, 0px) scale(1)' }
                        },
                        'float': {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-20px)' }
                        },
                        'pulse-glow': {
                            '0%, 100%': { opacity: '0.4', filter: 'blur(40px)' },
                            '50%': { opacity: '0.7', filter: 'blur(60px)' }
                        }
                    }
                }
            }
        }
    </script>
    <style>
        :root {
            --glass-bg: rgba(255, 255, 255, 0.7);
            --glass-border: rgba(255, 255, 255, 0.2);
            --glass-blur: 15px;
        }

        .dark {
            --glass-bg: rgba(17, 24, 39, 0.7);
            --glass-border: rgba(255, 255, 255, 0.1);
        }

        body {
            font-family: 'Tajawal', sans-serif;
            scroll-behavior: smooth;
        }

        .glass-morphism {
            background: var(--glass-bg);
            backdrop-filter: blur(var(--glass-blur));
            border: 1px solid var(--glass-border);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
        }

        .text-gradient {
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
        }

        .mesh-gradient {
            background: radial-gradient(at 0% 0%, hsla(170, 75%, 41%, 0.15) 0, transparent 50%),
                        radial-gradient(at 50% 0%, hsla(263, 70%, 50%, 0.1) 0, transparent 50%),
                        radial-gradient(at 100% 0%, hsla(192, 70%, 50%, 0.15) 0, transparent 50%);
        }

        .animate-delay-1000 { animation-delay: 1s; }
        .animate-delay-2000 { animation-delay: 2s; }
        
        .nav-item::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 50%;
            width: 0;
            height: 2px;
            background: #0d9488;
            transition: all 0.3s ease;
            transform: translateX(-50%);
        }
        .nav-item:hover::after {
            width: 100%;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: #0d9488;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #0f766e;
        }
    </style>
    <script src="js/theme.js"></script>
</head>

<body
    class="bg-stone-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-x-hidden transition-colors duration-300">

    <!-- Navigation -->
    <nav class="glass-morphism fixed w-full z-50 transition-all duration-300 border-none shadow-none">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-20 items-center">
                <!-- Logo -->
                <div class="flex-shrink-0 flex items-center gap-3 group cursor-pointer">
                    <div class="w-12 h-12 bg-gradient-to-tr from-teal-600 to-emerald-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg transition-all duration-300">
                        C
                    </div>
                    <span class="font-bold text-2xl text-gray-800 dark:text-white tracking-tight">
                        الكيمياء<span class="text-teal-600 dark:text-teal-400">العضوية</span>
                    </span>
                </div>

                <!-- Desktop Menu -->
                <div class="hidden md:flex items-center gap-12">
                    <a href="index.php" class="nav-item relative text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 font-semibold transition-colors">الرئيسية</a>
                    <a href="Pages/cards.php" class="nav-item relative text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 font-semibold transition-colors">المواضيع</a>
                    <a href="Pages/about_us.html" class="nav-item relative text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 font-semibold transition-colors">من نحن</a>
                    
                    <div class="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>

                    <?php if (isset($_SESSION['user_name'])): ?>
                        <div class="flex items-center gap-4">
                            <span class="text-teal-600 dark:text-teal-400 font-bold bg-teal-50 dark:bg-teal-900/30 px-4 py-2 rounded-xl">مرحباً، <?php echo $_SESSION['user_name']; ?></span>
                            <a href="logout.php" class="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all shadow-lg shadow-red-500/20 font-bold">خروج</a>
                        </div>
                    <?php else: ?>
                        <div class="flex items-center gap-3">
                            <a href="Pages/login.php" class="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-all shadow-lg shadow-teal-600/20 font-bold">دخول</a>
                            <a href="Pages/register.php" class="px-6 py-2.5 glass-morphism text-teal-600 dark:text-teal-400 rounded-xl hover:bg-teal-50 dark:hover:bg-gray-800 transition-all font-bold">حساب جديد</a>
                        </div>
                    <?php endif; ?>

                    <button class="theme-toggle p-2.5 rounded-xl glass-morphism hover:scale-110 transition-all active:scale-95" aria-label="Toggle Dark Mode">
                        <svg class="w-6 h-6 hidden dark:block text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <svg class="w-6 h-6 block dark:hidden text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    </button>
                </div>

                <!-- Mobile Menu Button -->
                <div class="md:hidden flex items-center gap-2">
                    <button class="theme-toggle p-2 rounded-lg glass-morphism text-gray-600 dark:text-gray-300">
                        <!-- Icons same as above -->
                    </button>
                    <button class="p-2 rounded-lg glass-morphism text-gray-600 dark:text-gray-300">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative min-h-[110vh] flex items-center pt-20 overflow-hidden bg-stone-50 dark:bg-gray-950 transition-colors duration-500">
        <!-- Mesh Gradient Background -->
        <div class="absolute inset-0 mesh-gradient opacity-60 dark:opacity-30"></div>
        
        <!-- Animated Blobs -->
        <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-200/40 dark:bg-teal-900/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div class="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-purple-200/40 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animate-delay-2000"></div>
        <div class="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-blue-200/40 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animate-delay-1000"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-[-5vh]">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                <!-- Text Content -->
                <div class="text-center lg:text-right space-y-10 order-2 lg:order-1">
                    <div class="inline-flex items-center gap-2 px-5 py-2 rounded-2xl glass-morphism text-teal-700 dark:text-teal-300 text-sm font-bold animate-float">
                        <span class="relative flex h-3 w-3">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                        </span>
                        أهلاً بك في مستقبل تعلم الكيمياء 
                    </div>
                    
                    <h1 class="text-6xl lg:text-8xl font-black leading-[1.1] tracking-tighter text-gray-900 dark:text-white">
                        أتقن الكيمياء <br>
                        <span class="text-gradient bg-gradient-to-r from-teal-600 via-emerald-500 to-blue-600 py-2">العضوية</span>
                        <br>بكل بساطة
                    </h1>
                    
                    <p class="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                        رحلة بصرية فريدة تأخذك إلى أعماق الروابط الكربونية. تعلم، استكشف، وتفاعل مع جزيئات الحياة في بيئة تعليمية عصرية.
                    </p>

                    <div class="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                        <a href="Pages/cards.php" class="group relative px-10 py-5 bg-teal-600 text-white rounded-2xl font-black text-xl shadow-2xl shadow-teal-500/30 hover:scale-105 active:scale-95 transition-all overflow-hidden">
                            <span class="relative z-10">ابدأ الرحلة الآن</span>
                            <div class="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </a>
                        <a href="#about" class="px-10 py-5 glass-morphism text-gray-800 dark:text-white rounded-2xl font-black text-xl hover:bg-white/40 dark:hover:bg-gray-800/50 transition-all border-none">
                            اكتشف المزيد
                        </a>
                    </div>

                </div>

                <!-- Visual Content (AI-Generated Image) -->
                <div class="relative order-1 lg:order-2 flex justify-center items-center">
                    <div id="hero-image-container" class="relative w-[400px] h-[300px] lg:w-[600px] lg:h-[450px] glass-morphism rounded-[2.5rem] flex items-center justify-center overflow-hidden shadow-2xl">
                        <img src="images/hero_lab_molecule.png" alt="Organic Chemistry Lab" class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="about" class="py-32 relative overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-500">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="text-center mb-24">
                <div class="inline-block px-4 py-1 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 text-sm font-black mb-4 uppercase tracking-widest">المميزات الأساسية</div>
                <h2 class="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6">ماذا نقدم لك؟</h2>
                <div class="w-24 h-2 bg-gradient-to-r from-teal-500 to-emerald-400 mx-auto rounded-full"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                <!-- Feature 1 -->
                <div class="group relative p-10 rounded-[2.5rem] glass-morphism hover:bg-white dark:hover:bg-gray-900 transition-all duration-500 hover:-translate-y-4 border-none shadow-2xl">
                    <div class="absolute -top-8 left-10 w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-700 rounded-3xl flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform">
                        <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-black mt-8 mb-5 text-gray-900 dark:text-white group-hover:text-teal-600 transition-colors">شرح تفاعلي ذكي</h3>
                    <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium">نعتمد أحدث الطرق البصرية لتبسيط أعقد المفاهيم الكيميائية وجعلها محفورة في الذاكرة.</p>
                    <div class="mt-8 flex items-center gap-2 text-teal-600 font-black cursor-pointer group-hover:gap-4 transition-all">
                        <span>اكتشف المزيد</span>
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                </div>

                <!-- Feature 2 -->
                <div class="group relative p-10 rounded-[2.5rem] glass-morphism hover:bg-white dark:hover:bg-gray-900 transition-all duration-500 hover:-translate-y-4 border-none shadow-2xl">
                    <div class="absolute -top-8 left-10 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform">
                        <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-black mt-8 mb-5 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">موسوعة متكاملة</h3>
                    <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium">محتوى غني يغطي كافة جوانب الكيمياء العضوية بجودة عالية ومصادر موثوقة.</p>
                    <div class="mt-8 flex items-center gap-2 text-blue-600 font-black cursor-pointer group-hover:gap-4 transition-all">
                        <span>تصفح الكتاب</span>
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="relative bg-gray-950 text-gray-400 py-24 overflow-hidden border-t border-gray-900">
        <div class="absolute inset-0 mesh-gradient opacity-10"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-16">
                <!-- Brand -->
                <div class="col-span-1 md:col-span-1 space-y-6">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">C</div>
                        <span class="font-black text-2xl text-white tracking-tighter">الكيمياء<span class="text-teal-500">.العضوية</span></span>
                    </div>
                    <p class="text-lg leading-relaxed font-medium">منصتك الأولى والوحيدة لتعلم الكيمياء العضوية بأسلوب عصري يواكب تكنولوجيا 2025.</p>
                    <div class="flex gap-4">
                        <a href="#" class="w-12 h-12 glass-morphism rounded-xl flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                        <a href="#" class="w-12 h-12 glass-morphism rounded-xl flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.072 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
                    </div>
                </div>

                <!-- Links -->
                <div class="space-y-6">
                    <h4 class="text-white font-black text-xl">استكشف</h4>
                    <ul class="space-y-4 font-bold text-lg">
                        <li><a href="#" class="hover:text-teal-500 transition-colors flex items-center gap-2"><span>الرئيسية</span></a></li>
                        <li><a href="Pages/cards.php" class="hover:text-teal-500 transition-colors flex items-center gap-2"><span>المواضيع</span></a></li>
                        <li><a href="Pages/about_us.html" class="hover:text-teal-500 transition-colors flex items-center gap-2"><span>من نحن</span></a></li>
                    </ul>
                </div>

                <!-- Topics -->
                <div class="space-y-6">
                    <h4 class="text-white font-black text-xl">انطلق سريعاً</h4>
                    <ul class="space-y-4 font-bold text-lg">
                        <li><a href="Pages/alkanes.html" class="hover:text-teal-500 transition-colors">الألكانات</a></li>
                        <li><a href="Pages/alkenes.html" class="hover:text-teal-500 transition-colors">الألكينات</a></li>
                        <li><a href="Pages/alcohols.html" class="hover:text-teal-500 transition-colors">الكحولات</a></li>
                    </ul>
                </div>

                <!-- Contact -->
                <div class="space-y-6">
                    <h4 class="text-white font-black text-xl">انضم لعالمنا</h4>
                    <p class="font-bold">اشترك لتصلك آخر دروس الكيمياء الحديثة.</p>
                    <div class="relative">
                        <input type="email" placeholder="بريدك الإلكتروني" class="w-full glass-morphism rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-gray-900 shadow-xl border-none">
                        <button class="absolute left-2 top-2 bottom-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-6 font-black transition-all">اشتراك</button>
                    </div>
                </div>
            </div>
            <div class="mt-24 pt-12 border-t border-gray-900 text-center font-bold text-gray-500">
                &copy; 2025 الكيمياء العضوية Modern Lab. جميع الحقوق محفوظة.
            </div>
        </div>
    </footer>

</body>

</html>

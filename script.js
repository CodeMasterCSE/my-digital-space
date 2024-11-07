document.addEventListener('DOMContentLoaded', function() {
    function initTheme() {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            document.getElementById('theme-toggle-light-icon').classList.remove('hidden');
            document.getElementById('theme-toggle-dark-icon').classList.add('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            document.getElementById('theme-toggle-light-icon').classList.add('hidden');
            document.getElementById('theme-toggle-dark-icon').classList.remove('hidden');
        }
    }

    initTheme();
    
    const themeToggleBtn = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            document.documentElement.classList.toggle('dark');
            if (document.documentElement.classList.contains('dark')) {
                localStorage.theme = 'dark';
                lightIcon.classList.remove('hidden');
                darkIcon.classList.add('hidden');
            } else {
                localStorage.theme = 'light';
                lightIcon.classList.add('hidden');
                darkIcon.classList.remove('hidden');
            }
        });
    }

    document.getElementById('menu-toggle').addEventListener('click', function() {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    const typewriter = document.getElementById('typewriter');
    const designations = ['Web Developer', 'UI/UX Designer', 'Programmer'];
    let designationIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentDesignation = designations[designationIndex];
        
        if (isDeleting) {
            typewriter.textContent = currentDesignation.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriter.textContent = currentDesignation.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentDesignation.length) {
            isDeleting = true;
            typingSpeed = 1000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            designationIndex = (designationIndex + 1) % designations.length;
        }

        setTimeout(type, typingSpeed);
    }

    type();

    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.remove('invisible', 'opacity-0', 'translate-y-10');
            scrollToTopBtn.classList.add('opacity-100', 'translate-y-0');
        } else {
            scrollToTopBtn.classList.add('invisible', 'opacity-0', 'translate-y-10');
            scrollToTopBtn.classList.remove('opacity-100', 'translate-y-0');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

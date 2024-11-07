function updateThemeIcons(isDark) {
    const lightIcons = document.querySelectorAll('#theme-toggle-light-icon, #theme-toggle-light-icon-mobile');
    const darkIcons = document.querySelectorAll('#theme-toggle-dark-icon, #theme-toggle-dark-icon-mobile');
    
    if (isDark) {
        lightIcons.forEach(icon => icon.classList.remove('hidden'));
        darkIcons.forEach(icon => icon.classList.add('hidden'));
    } else {
        lightIcons.forEach(icon => icon.classList.add('hidden'));
        darkIcons.forEach(icon => icon.classList.remove('hidden'));
    }
}

function initTheme() {
    const isDark = localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    updateThemeIcons(isDark);
}

initTheme();

['theme-toggle', 'theme-toggle-mobile'].forEach(id => {
    const toggleBtn = document.getElementById(id);
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.theme = isDark ? 'dark' : 'light';
            updateThemeIcons(isDark);
        });
    }
});

document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

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

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

function createAnimationObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the appropriate animation class based on data attribute
                const animationType = entry.target.dataset.animation;
                if (animationType) {
                    entry.target.classList.add(animationType);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animation]').forEach((element) => {
        element.classList.add('hidden-element');
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createAnimationObserver();
});

// Theme Management
let currentTheme = localStorage.getItem('theme') || 'light';

function initializeTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeToggleIcon();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeToggleIcon();
}

function updateThemeToggleIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Navigation and Scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const elementPosition = element.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
        
        updateActiveNavLink(sectionId);
        closeMobileMenu();
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    updateActiveNavLink('home');
}

function updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const isOpen = navMenu.style.display === 'flex';
    
    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.style.display = 'flex';
    navMenu.style.flexDirection = 'column';
    navMenu.style.position = 'absolute';
    navMenu.style.top = '100%';
    navMenu.style.left = '0';
    navMenu.style.right = '0';
    navMenu.style.background = 'var(--background-color)';
    navMenu.style.border = '1px solid var(--border-color)';
    navMenu.style.borderRadius = '0 0 15px 15px';
    navMenu.style.padding = '1rem';
    navMenu.style.gap = '0.5rem';
    navMenu.style.zIndex = '1000';
}

function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.style.display = '';
    navMenu.style.flexDirection = '';
    navMenu.style.position = '';
    navMenu.style.top = '';
    navMenu.style.left = '';
    navMenu.style.right = '';
    navMenu.style.background = '';
    navMenu.style.border = '';
    navMenu.style.borderRadius = '';
    navMenu.style.padding = '';
    navMenu.style.gap = '';
}

// Progress Bar
function updateProgressBar() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.transform = `scaleX(${scrollPercent})`;
}

// Intersection Observer for Active Section
function initializeIntersectionObserver() {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveNavLink(entry.target.id);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

// Resume Download
function downloadResume() {
    // Create a link to download the resume image
    const link = document.createElement('a');
    link.href = 'https://res.cloudinary.com/dmtlysvom/image/upload/v1752688775/imgonline-com-ua-twotoone-xq8PGWho63WN5SS_p6ror4.jpg';
    link.download = 'https://res.cloudinary.com/dmtlysvom/image/upload/v1752688775/imgonline-com-ua-twotoone-xq8PGWho63WN5SS_p6ror4.jpg';
    link.click();
}

// Contact Functions
function sendMessage() {
    const email = 'manoharvemula2006@gmail.com';
    const subject = 'Contact from Portfolio Website';
    const body = 'Hello Manohar,\n\nI would like to get in touch with you.\n\nBest regards,';
    
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;  // Changed from window.open() to location.href
}



// External Links
function openLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Animation on Scroll
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .skill-category, .highlight-item, .contact-item, .social-card');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(element);
    });
}

// Performance Optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Event Listeners
function initializeEventListeners() {
    // Scroll events with debouncing for performance
    const debouncedProgressUpdate = debounce(updateProgressBar, 10);
    window.addEventListener('scroll', debouncedProgressUpdate, { passive: true });
    
    // Resize events
    window.addEventListener('resize', closeMobileMenu);
    
    // Click outside mobile menu to close
    document.addEventListener('click', (event) => {
        const navMenu = document.getElementById('nav-menu');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navbar = document.querySelector('.navbar');
        
        if (!navbar.contains(event.target) && navMenu.style.display === 'flex') {
            closeMobileMenu();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

// Initialize everything when DOM is loaded
    initializeIntersectionObserver();
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeScrollAnimations();
    initializeEventListeners();
    updateProgressBar();
    
    // Add smooth animations with delay for initial load
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.documentElement.style.setProperty('--transition-fast', '0s');
        document.documentElement.style.setProperty('--transition-medium', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
    } else {
        // Resume animations when page becomes visible
        setTimeout(() => {
            document.documentElement.style.setProperty('--transition-fast', '0.2s ease');
            document.documentElement.style.setProperty('--transition-medium', '0.3s ease');
            document.documentElement.style.setProperty('--transition-slow', '0.5s ease');
        }, 100);
    }
});

// Nav scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const answer = item.querySelector('.faq-a');
        const isOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.faq-a').style.maxHeight = '0';
        });

        // Open clicked if was closed
        if (!isOpen) {
            item.classList.add('open');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// Mobile toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelector('.nav-links');
mobileToggle.addEventListener('click', () => {
    const isVisible = navLinks.style.display === 'flex';
    navLinks.style.display = isVisible ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(28,15,20,0.95)';
    navLinks.style.padding = '24px';
    navLinks.style.gap = '20px';
    navLinks.style.backdropFilter = 'blur(20px)';
});
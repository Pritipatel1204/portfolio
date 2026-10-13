const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = [...document.querySelectorAll('.site-nav a')];
const year = document.querySelector('#year');

year.textContent = new Date().getFullYear();

themeToggle.addEventListener('click', () => {
    const isDark = root.dataset.theme !== 'dark';
    root.dataset.theme = isDark ? 'dark' : 'light';
    themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
});

menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    siteNav.classList.toggle('is-open', isOpen);
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation');
        siteNav.classList.remove('is-open');
    });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((link) => {
                if (link.hash === `#${entry.target.id}`) {
                    link.setAttribute('aria-current', 'location');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        }
    });
}, { rootMargin: '-25% 0px -65% 0px' });

document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

document.querySelector('#contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = encodeURIComponent('Hello, Priti Patel');
    const body = encodeURIComponent(`From: ${formData.get('email')}\n\n${formData.get('message')}`);
    document.querySelector('#form-note').textContent = 'Your email app is opening with the draft. Add Priti’s email address to send it.';
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
});
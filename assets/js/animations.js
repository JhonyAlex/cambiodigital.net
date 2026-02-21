/**
 * Animations Module
 * IntersectionObserver reveals, counter animations, scroll progress bar.
 */

(function() {
    'use strict';

    // --- Reveal Observer ---
    function initRevealObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay;
                    if (delay) {
                        setTimeout(() => entry.target.classList.add('active'), parseInt(delay));
                    } else {
                        entry.target.classList.add('active');
                    }
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            observer.observe(el);
        });

        return observer;
    }

    // --- Counter Animation ---
    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const duration = parseInt(el.dataset.duration, 10) || 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = Math.round(eased * target);
            el.textContent = prefix + current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    function initCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.counter-value').forEach(el => observer.observe(el));
    }

    // --- Scroll Progress Bar ---
    function initScrollProgress() {
        const bar = document.getElementById('scroll-progress');
        if (!bar) return;

        function updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = progress + '%';
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    // --- Init All ---
    window.initAnimations = function() {
        const observer = initRevealObserver();
        initCounters();
        initScrollProgress();
        return observer;
    };

    // Auto-init on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.initAnimations);
    } else {
        window.initAnimations();
    }
})();

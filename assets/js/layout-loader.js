/**
 * Layout Loader
 * Loads header/footer and centralizes global UI setup (theme + cursor).
 */

(function() {
    'use strict';

    const THEME_SCRIPT_SRC = '/assets/js/theme-toggle.js';

    function applyStoredThemeFallback() {
        try {
            if (document.documentElement.getAttribute('data-theme')) return;
            const saved = localStorage.getItem('cd-theme');
            document.documentElement.setAttribute('data-theme', saved || 'light');
        } catch (error) {
            console.error('Theme fallback error:', error);
        }
    }

    function loadScriptOnce(src, dataId) {
        return new Promise((resolve, reject) => {
            const existing = document.querySelector(`script[src="${src}"]`) || document.querySelector(`script[data-cd="${dataId}"]`);
            if (existing) {
                if (existing.dataset.loaded === 'true') {
                    resolve();
                    return;
                }
                existing.addEventListener('load', () => resolve(), { once: true });
                existing.addEventListener('error', () => reject(new Error(`Failed loading ${src}`)), { once: true });
                return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.defer = true;
            script.dataset.cd = dataId;
            script.addEventListener('load', () => {
                script.dataset.loaded = 'true';
                resolve();
            }, { once: true });
            script.addEventListener('error', () => reject(new Error(`Failed loading ${src}`)), { once: true });
            document.head.appendChild(script);
        });
    }

    async function ensureThemeRuntime() {
        applyStoredThemeFallback();
        if (typeof window.initThemeToggle === 'function') {
            window.initThemeToggle();
            return;
        }
        try {
            await loadScriptOnce(THEME_SCRIPT_SRC, 'theme-toggle');
            if (typeof window.initThemeToggle === 'function') {
                window.initThemeToggle();
            }
        } catch (error) {
            console.error('Error loading theme runtime:', error);
        }
    }

    function initGlobalCursor() {
        if (window.__cdCursorInitialized) return;
        if (window.matchMedia && !window.matchMedia('(any-pointer: fine)').matches) return;

        let cursorDot = document.getElementById('cursor-dot');
        let cursorOutline = document.getElementById('cursor-outline');

        if (!cursorDot) {
            cursorDot = document.createElement('div');
            cursorDot.id = 'cursor-dot';
            document.body.appendChild(cursorDot);
        }
        if (!cursorOutline) {
            cursorOutline = document.createElement('div');
            cursorOutline.id = 'cursor-outline';
            document.body.appendChild(cursorOutline);
        }

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let outlineX = mouseX;
        let outlineY = mouseY;

        window.addEventListener('mousemove', (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        }, { passive: true });

        function animateCursor() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
            requestAnimationFrame(animateCursor);
        }

        animateCursor();
        window.__cdCursorInitialized = true;
    }

    function initMobileMenu() {
        const menuBtn = document.getElementById('menu-btn');
        const closeMenuBtn = document.getElementById('close-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        if (!(menuBtn && mobileMenu && closeMenuBtn)) return;

        function openMenu() {
            mobileMenu.classList.add('open');
            document.body.classList.add('overflow-hidden');
        }

        function closeMenu() {
            mobileMenu.classList.remove('open');
            document.body.classList.remove('overflow-hidden');
        }

        menuBtn.addEventListener('click', openMenu);
        closeMenuBtn.addEventListener('click', closeMenu);
        mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
    }

    async function loadHeader() {
        try {
            const response = await fetch('/partials/header.html');
            const data = await response.text();
            const headerContainer = document.getElementById('header-container');
            if (!headerContainer) return;

            headerContainer.innerHTML = data;

            if (window.lucide) {
                window.lucide.createIcons();
            }

            if (typeof window.initThemeToggle === 'function') {
                window.initThemeToggle();
            }

            initMobileMenu();
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }

    async function loadFooter() {
        try {
            const response = await fetch('/partials/footer.html');
            const data = await response.text();
            const footerContainer = document.getElementById('footer-container');
            if (!footerContainer) return;

            footerContainer.innerHTML = data;

            if (window.lucide) {
                window.lucide.createIcons();
            }

            if (typeof window.initThemeToggle === 'function') {
                window.initThemeToggle();
            }
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }

    document.addEventListener('DOMContentLoaded', async () => {
        await ensureThemeRuntime();
        initGlobalCursor();
        await Promise.all([loadHeader(), loadFooter()]);
    });
})();

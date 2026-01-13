/**
 * Layout Loader
 * Loads header and footer dynamically and initializes UI components like the mobile menu.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Load Header
    fetch('/partials/header.html')
        .then(response => response.text())
        .then(data => {
            const headerContainer = document.getElementById('header-container');
            if (headerContainer) {
                headerContainer.innerHTML = data;
                
                // Initialize Lucide icons if available
                if (window.lucide) {
                    window.lucide.createIcons();
                }

                // Initialize mobile menu
                const menuBtn = document.getElementById('menu-btn');
                const closeMenuBtn = document.getElementById('close-menu-btn');
                const mobileMenu = document.getElementById('mobile-menu');
                const mobileLinks = document.querySelectorAll('.mobile-link');

                if (menuBtn && mobileMenu && closeMenuBtn) {
                    function toggleMenu() {
                        // Logic derived from index.html
                        mobileMenu.classList.toggle('open');
                        document.body.classList.toggle('overflow-hidden');
                    }

                    menuBtn.addEventListener('click', toggleMenu);
                    closeMenuBtn.addEventListener('click', toggleMenu);
                    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));
                }
            }
        })
        .catch(error => console.error('Error loading header:', error));

    // Load Footer
    fetch('/partials/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                footerContainer.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading footer:', error));
});

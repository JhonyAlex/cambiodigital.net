(() => {
    let lastFocusedElement = null;
    let focusTrapHandler = null;
    let previousBodyOverflow = '';
    let activeModalType = null;

    const getModal = () => document.getElementById('kommo-pdf-modal');

    const getFocusableElements = (container) => Array.from(
        container.querySelectorAll(
            'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
        )
    ).filter((el) => !el.hasAttribute('disabled'));

    const lockScroll = () => {
        previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
    };

    const unlockScroll = () => {
        document.body.style.overflow = previousBodyOverflow;
    };

    const releaseFocus = () => {
        if (focusTrapHandler) {
            document.removeEventListener('keydown', focusTrapHandler);
            focusTrapHandler = null;
        }
    };

    const trapFocus = (modal) => {
        focusTrapHandler = (event) => {
            if (event.key === 'Escape') {
                if (activeModalType === 'pdf') {
                    closeKommoPdfModal();
                } else if (activeModalType === 'image') {
                    closeKommoImageModal();
                }
                return;
            }

            if (event.key !== 'Tab') {
                return;
            }

            const focusable = getFocusableElements(modal);
            if (!focusable.length) {
                event.preventDefault();
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            const isShift = event.shiftKey;

            if (isShift && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!isShift && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', focusTrapHandler);
    };

    function openKommoPdfModal() {
        const modal = getModal();
        if (!modal) {
            return;
        }

        activeModalType = 'pdf';
        lastFocusedElement = document.activeElement;
        modal.hidden = false;
        lockScroll();

        requestAnimationFrame(() => {
            modal.classList.add('is-open');
            const focusable = getFocusableElements(modal);
            if (focusable.length) {
                focusable[0].focus();
            }
            if (typeof window.refreshLucideIcons === 'function') {
                window.refreshLucideIcons();
            }
        });

        trapFocus(modal);
    }

    function closeKommoPdfModal() {
        const modal = getModal();
        if (!modal) {
            return;
        }

        modal.classList.remove('is-open');
        releaseFocus();
        unlockScroll();

        setTimeout(() => {
            modal.hidden = true;
            activeModalType = null;
            if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
                lastFocusedElement.focus();
            }
        }, 180);
    }

    function openKommoImageModal(imageSrc, imageAlt) {
        const modal = document.getElementById('kommo-image-modal');
        const image = document.getElementById('kommo-image-viewer');
        if (!modal || !image || !imageSrc) {
            return;
        }

        activeModalType = 'image';
        lastFocusedElement = document.activeElement;
        image.src = imageSrc;
        image.alt = imageAlt || 'Certificado Kommo';
        modal.hidden = false;
        lockScroll();

        requestAnimationFrame(() => {
            modal.classList.add('is-open');
            const focusable = getFocusableElements(modal);
            if (focusable.length) {
                focusable[0].focus();
            }
            if (typeof window.refreshLucideIcons === 'function') {
                window.refreshLucideIcons();
            }
        });

        trapFocus(modal);
    }

    function closeKommoImageModal() {
        const modal = document.getElementById('kommo-image-modal');
        const image = document.getElementById('kommo-image-viewer');
        if (!modal || !image) {
            return;
        }

        modal.classList.remove('is-open');
        releaseFocus();
        unlockScroll();

        setTimeout(() => {
            modal.hidden = true;
            image.src = '';
            image.alt = '';
            activeModalType = null;
            if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
                lastFocusedElement.focus();
            }
        }, 180);
    }

    function initKommoPdfModal() {
        const modal = getModal();
        if (!modal) {
            return;
        }

        document.querySelectorAll('[data-kommo-modal-open]').forEach((trigger) => {
            trigger.addEventListener('click', openKommoPdfModal);
        });

        modal.querySelectorAll('[data-kommo-modal-close]').forEach((button) => {
            button.addEventListener('click', closeKommoPdfModal);
        });

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeKommoPdfModal();
            }
        });

        document.querySelectorAll('[data-image-viewer-open]').forEach((trigger) => {
            trigger.addEventListener('click', (event) => {
                event.preventDefault();
                const imageSrc = trigger.getAttribute('data-image-src') || trigger.getAttribute('href');
                const imageAlt = trigger.getAttribute('data-image-alt') || trigger.textContent;
                openKommoImageModal(imageSrc, imageAlt);
            });
        });

        const imageModal = document.getElementById('kommo-image-modal');
        if (imageModal) {
            imageModal.querySelectorAll('[data-image-viewer-close]').forEach((button) => {
                button.addEventListener('click', closeKommoImageModal);
            });

            imageModal.addEventListener('click', (event) => {
                if (event.target === imageModal) {
                    closeKommoImageModal();
                }
            });
        }
    }

    window.openKommoPdfModal = openKommoPdfModal;
    window.closeKommoPdfModal = closeKommoPdfModal;
    window.openKommoImageModal = openKommoImageModal;
    window.closeKommoImageModal = closeKommoImageModal;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initKommoPdfModal);
    } else {
        initKommoPdfModal();
    }
})();

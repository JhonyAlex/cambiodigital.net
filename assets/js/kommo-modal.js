(() => {
    let lastFocusedElement = null;
    let focusTrapHandler = null;
    let previousBodyOverflow = '';

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
                closeKommoPdfModal();
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
    }

    window.openKommoPdfModal = openKommoPdfModal;
    window.closeKommoPdfModal = closeKommoPdfModal;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initKommoPdfModal);
    } else {
        initKommoPdfModal();
    }
})();

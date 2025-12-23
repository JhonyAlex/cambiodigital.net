(() => {
    const PROMO_CONFIG = {
        sessionKey: 'cd_promo_endyear_seen',
        consentKey: 'cd_cookie_consent',
        delayMs: 700
    };

    let initialized = false;
    let lastFocusedElement = null;
    let focusTrapHandler = null;
    let previousBodyOverflow = '';

    const getModal = () => document.getElementById('promoModal');
    const getDialog = (modal) => modal.querySelector('.cd-promo__dialog');
    const getCloseButtons = (modal) => Array.from(modal.querySelectorAll('[data-promo-close]'));

    const getFocusableElements = (container) => Array.from(
        container.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
    ).filter((el) => !el.hasAttribute('disabled'));

    const isConsentResolved = () => localStorage.getItem(PROMO_CONFIG.consentKey) !== null;
    const hasSeenPromo = () => sessionStorage.getItem(PROMO_CONFIG.sessionKey) === '1';

    const setSeenPromo = () => sessionStorage.setItem(PROMO_CONFIG.sessionKey, '1');

    const lockScroll = () => {
        previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
    };

    const unlockScroll = () => {
        document.body.style.overflow = previousBodyOverflow;
    };

    const trapFocus = (modal) => {
        const dialog = getDialog(modal);
        if (!dialog) {
            return;
        }

        focusTrapHandler = (event) => {
            if (event.key === 'Escape') {
                closePromo();
                return;
            }

            if (event.key !== 'Tab') {
                return;
            }

            const focusable = getFocusableElements(dialog);
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

    const releaseFocus = () => {
        if (focusTrapHandler) {
            document.removeEventListener('keydown', focusTrapHandler);
            focusTrapHandler = null;
        }
    };

    const openPromo = () => {
        const modal = getModal();
        if (!modal || hasSeenPromo()) {
            return;
        }

        lastFocusedElement = document.activeElement;
        modal.hidden = false;
        requestAnimationFrame(() => {
            modal.classList.add('is-open');
            const focusable = getFocusableElements(modal);
            if (focusable.length) {
                focusable[0].focus();
            }
        });

        lockScroll();
        trapFocus(modal);
    };

    const closePromo = () => {
        const modal = getModal();
        if (!modal) {
            return;
        }

        modal.classList.remove('is-open');
        releaseFocus();
        unlockScroll();
        setSeenPromo();

        setTimeout(() => {
            modal.hidden = true;
            if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
                lastFocusedElement.focus();
            }
        }, 200);
    };

    const schedulePromo = () => {
        setTimeout(() => {
            if (hasSeenPromo() || !isConsentResolved()) {
                return;
            }
            openPromo();
        }, PROMO_CONFIG.delayMs);
    };

    const initPromoModal = () => {
        if (initialized) {
            return;
        }

        const modal = getModal();
        if (!modal) {
            return;
        }

        initialized = true;

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closePromo();
            }
        });

        const closeButtons = getCloseButtons(modal);
        closeButtons.forEach((button) => {
            button.addEventListener('click', closePromo);
        });

        if (hasSeenPromo()) {
            return;
        }

        if (isConsentResolved()) {
            schedulePromo();
        } else {
            window.addEventListener('cd:cookie-consent-resolved', schedulePromo, { once: true });
        }
    };

    window.initPromoModal = initPromoModal;
    window.closePromoModal = closePromo;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPromoModal);
    } else {
        initPromoModal();
    }
})();

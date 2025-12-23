(() => {
    const CONSENT_CONFIG = {
        storageKey: 'cd_cookie_consent',
        delayMs: 900
    };

    let initialized = false;

    const getBanner = () => document.getElementById('cookieConsent');
    const getStoredConsent = () => localStorage.getItem(CONSENT_CONFIG.storageKey);

    const enableAnalytics = () => {
        // Hook to enable analytics when consent is accepted.
        // Example: gtag('config', 'GA_MEASUREMENT_ID');
    };

    const emitConsentResolved = (status) => {
        window.dispatchEvent(
            new CustomEvent('cd:cookie-consent-resolved', {
                detail: { status }
            })
        );
    };

    const showBanner = (banner) => {
        banner.hidden = false;
        requestAnimationFrame(() => {
            banner.classList.add('is-open');
            const focusTarget = banner.querySelector('[data-consent-action="accept"]');
            if (focusTarget) {
                focusTarget.focus();
            }
        });
    };

    const hideBanner = (banner) => {
        banner.classList.remove('is-open');
        setTimeout(() => {
            banner.hidden = true;
        }, 200);
    };

    const resolveConsent = (banner, status) => {
        localStorage.setItem(CONSENT_CONFIG.storageKey, status);
        if (status === 'accepted') {
            enableAnalytics();
        }
        hideBanner(banner);
        emitConsentResolved(status);
    };

    const handleBannerClick = (event, banner) => {
        const actionButton = event.target.closest('[data-consent-action]');
        if (!actionButton) {
            return;
        }

        const action = actionButton.dataset.consentAction;
        if (action === 'accept') {
            resolveConsent(banner, 'accepted');
        } else if (action === 'reject') {
            resolveConsent(banner, 'rejected');
        }
    };

    const initCookieConsent = () => {
        if (initialized) {
            return;
        }

        const banner = getBanner();
        if (!banner) {
            return;
        }

        initialized = true;

        const storedConsent = getStoredConsent();
        if (storedConsent) {
            if (storedConsent === 'accepted') {
                enableAnalytics();
            }
            return;
        }

        banner.addEventListener('click', (event) => handleBannerClick(event, banner));
        setTimeout(() => showBanner(banner), CONSENT_CONFIG.delayMs);
    };

    window.initCookieConsent = initCookieConsent;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCookieConsent);
    } else {
        initCookieConsent();
    }
})();

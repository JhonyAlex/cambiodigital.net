(() => {
    const CONSENT_CONFIG = {
        storageKey: 'cd_cookie_consent',
        delayMs: 900
    };

    let initialized = false;

    const getBanner = () => document.getElementById('cookieConsent');

    const normalizeStoredConsent = () => {
        const stored = localStorage.getItem(CONSENT_CONFIG.storageKey);
        if (!stored) {
            return null;
        }

        if (stored === 'accepted') {
            return {
                necessary: true,
                analytics: true,
                marketing: true,
                status: 'accepted_all'
            };
        }

        if (stored === 'rejected') {
            return {
                necessary: true,
                analytics: false,
                marketing: false,
                status: 'rejected_optional'
            };
        }

        try {
            const parsed = JSON.parse(stored);
            return {
                necessary: true,
                analytics: !!parsed.analytics,
                marketing: !!parsed.marketing,
                status: parsed.status || 'custom'
            };
        } catch (error) {
            return null;
        }
    };

    const enableAnalytics = () => {
        // Hook to enable analytics when consent is accepted.
        // Example: gtag('config', 'GA_MEASUREMENT_ID');
    };

    const emitConsentResolved = (consent) => {
        window.dispatchEvent(
            new CustomEvent('cd:cookie-consent-resolved', {
                detail: consent
            })
        );
    };

    const showBanner = (banner) => {
        banner.hidden = false;
        requestAnimationFrame(() => {
            banner.classList.add('is-open');
            const focusTarget = banner.querySelector('[data-consent-action="accept-all"]');
            if (focusTarget) {
                focusTarget.focus();
            }
        });
    };

    const attachBannerEvents = (banner) => {
        if (banner.dataset.cookieEventsAttached === 'true') {
            return;
        }

        banner.addEventListener('click', (event) => handleBannerClick(event, banner));
        banner.dataset.cookieEventsAttached = 'true';
    };

    const hideBanner = (banner) => {
        banner.classList.remove('is-open');
        setTimeout(() => {
            banner.hidden = true;
        }, 200);
    };

    const persistConsent = (consent) => {
        localStorage.setItem(CONSENT_CONFIG.storageKey, JSON.stringify(consent));
    };

    const setPreferencePanelOpen = (banner, isOpen) => {
        const panel = banner.querySelector('[data-cookie-preferences]');
        if (!panel) {
            return;
        }

        panel.hidden = !isOpen;
        panel.classList.toggle('is-open', isOpen);
    };

    const resolveConsent = (banner, consent) => {
        persistConsent(consent);

        if (consent.analytics) {
            enableAnalytics();
        }

        hideBanner(banner);
        emitConsentResolved(consent);
    };

    const handleBannerClick = (event, banner) => {
        const actionButton = event.target.closest('[data-consent-action]');
        if (!actionButton) {
            return;
        }

        const action = actionButton.dataset.consentAction;
        if (action === 'accept-all') {
            resolveConsent(banner, {
                necessary: true,
                analytics: true,
                marketing: true,
                status: 'accepted_all'
            });
        } else if (action === 'reject-optional') {
            resolveConsent(banner, {
                necessary: true,
                analytics: false,
                marketing: false,
                status: 'rejected_optional'
            });
        } else if (action === 'configure') {
            setPreferencePanelOpen(banner, true);
        } else if (action === 'save-preferences') {
            const analytics = !!banner.querySelector('#cookie-analytics')?.checked;
            const marketing = !!banner.querySelector('#cookie-marketing')?.checked;
            resolveConsent(banner, {
                necessary: true,
                analytics,
                marketing,
                status: 'custom'
            });
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

        const storedConsent = normalizeStoredConsent();
        if (storedConsent) {
            if (storedConsent.analytics) {
                enableAnalytics();
            }
            emitConsentResolved(storedConsent);
            return;
        }

        attachBannerEvents(banner);
        setTimeout(() => showBanner(banner), CONSENT_CONFIG.delayMs);
    };

    const openCookiePreferences = () => {
        const banner = getBanner();
        if (!banner) {
            return;
        }

        attachBannerEvents(banner);
        showBanner(banner);
        setPreferencePanelOpen(banner, true);
    };

    window.initCookieConsent = initCookieConsent;
    window.openCookiePreferences = openCookiePreferences;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCookieConsent);
    } else {
        initCookieConsent();
    }
})();

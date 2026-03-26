(function () {
    const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, option, summary, label, [role="button"], [role="link"]';

    function shouldIgnoreCardClick(target, card) {
        if (!(target instanceof Element)) {
            return true;
        }

        const interactiveElement = target.closest(INTERACTIVE_SELECTOR);
        return Boolean(interactiveElement && interactiveElement !== card);
    }

    function openCardLink(card, openInNewTab = false) {
        const href = card.dataset.cardHref;
        if (!href) {
            return;
        }

        const target = card.dataset.cardTarget;
        if (openInNewTab || target === '_blank') {
            window.open(href, target || '_blank', 'noopener');
            return;
        }

        window.location.assign(href);
    }

    function bindCard(card) {
        if (!(card instanceof HTMLElement) || card.dataset.cardClickableBound === 'true') {
            return;
        }

        card.dataset.cardClickableBound = 'true';
        card.classList.add('clickable-card');

        const hasFocusableChild = Boolean(
            card.querySelector('a, button, input, textarea, select, summary, [tabindex]:not([tabindex="-1"])')
        );

        if (!hasFocusableChild) {
            card.tabIndex = 0;
            card.setAttribute('role', 'link');
        }
    }

    function setupClickableCards(configs, root = document) {
        configs.forEach(({ cardSelector, linkSelector }) => {
            root.querySelectorAll(cardSelector).forEach((card) => {
                const primaryLink = linkSelector ? card.querySelector(linkSelector) : card.querySelector('a[href]');
                const href = primaryLink?.getAttribute('href');

                if (!href) {
                    return;
                }

                card.dataset.cardHref = href;

                const target = primaryLink.getAttribute('target');
                if (target) {
                    card.dataset.cardTarget = target;
                }

                bindCard(card);
            });
        });
    }

    document.addEventListener('click', (event) => {
        const target = event.target;
        const card = target instanceof Element
            ? target.closest('.clickable-card[data-card-href]')
            : null;

        if (!card || event.defaultPrevented || shouldIgnoreCardClick(target, card)) {
            return;
        }

        const selection = window.getSelection?.();
        if (selection && String(selection).trim()) {
            return;
        }

        openCardLink(card, event.metaKey || event.ctrlKey);
    });

    document.addEventListener('auxclick', (event) => {
        if (event.button !== 1) {
            return;
        }

        const target = event.target;
        const card = target instanceof Element
            ? target.closest('.clickable-card[data-card-href]')
            : null;

        if (!card || shouldIgnoreCardClick(target, card)) {
            return;
        }

        openCardLink(card, true);
    });

    document.addEventListener('keydown', (event) => {
        const target = event.target;
        const card = target instanceof Element
            ? target.closest('.clickable-card[data-card-href]')
            : null;

        if (!card || target !== card || (event.key !== 'Enter' && event.key !== ' ')) {
            return;
        }

        event.preventDefault();
        openCardLink(card, event.metaKey || event.ctrlKey);
    });

    window.setupClickableCards = setupClickableCards;
})();
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['Space Mono', 'monospace'],
            },
            colors: {
                'cd-base': 'var(--cd-base, #1c2143)',
                'cd-base-dark': 'var(--cd-base-dark, #0f172a)',
                'cd-base-light': 'var(--cd-base-light, #1e293b)',
                'cd-base-lighter': 'var(--cd-base-lighter, #2a315d)',
                'cd-purple-dark': 'var(--cd-purple-dark, #2a004f)',
                'cd-purple-medium': 'var(--cd-purple-medium, #5e2a84)',
                'cd-purple-light': 'var(--cd-purple-light, #8a55c1)',
                'cd-lavender': 'var(--cd-lavender, #d7b5f2)',
                'cd-magenta': 'var(--cd-magenta, #c200b3)',
                'cd-highlight': 'var(--cd-highlight-color, #c200b3)',
                'cd-cream': 'var(--cd-cream, #f8f8f0)',
                'cd-dark-grey': 'var(--cd-dark-grey, #1a1a1a)',
                'cd-white': 'var(--cd-white, #ffffff)',
            },
            animation: {
                'spin-slow': 'spin 8s linear infinite',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(10px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
            },
        },
    },
};

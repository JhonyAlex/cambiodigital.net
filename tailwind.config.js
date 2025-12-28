/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './blog/**/*.html',
    './partials/**/*.html',
    './servicios/**/*.html',
    './assets/js/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        'cd-base': 'var(--cd-base, #1c2143)',
        'cd-base-dark': 'var(--cd-base-dark, #14162c)',
        'cd-base-light': 'var(--cd-base-light, #2b3561)',
        'cd-base-lighter': 'var(--cd-base-lighter, #363c7b)',
        'cd-purple-dark': 'var(--cd-purple-dark, #1c2143)',
        'cd-purple-medium': 'var(--cd-purple-medium, #283565)',
        'cd-purple-light': 'var(--cd-purple-light, #3c4b8c)',
        'cd-lavender': 'var(--cd-lavender, #5d6bee)',
        'cd-magenta': 'var(--cd-magenta, #5a82ff)',
        'cd-highlight': 'var(--cd-highlight-color, #5a82ff)',
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
    }
  },
  plugins: []
};

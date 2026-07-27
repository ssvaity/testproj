import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // --- Palm-Leaf Archive palette (theme-able via CSS vars) --------
        // Neutrals/text/surfaces flip in dark mode; accents (brass, olive)
        // stay fixed. `rgb(var(--c-x) / <alpha-value>)` keeps opacity working.
        straw: 'rgb(var(--c-bg) / <alpha-value>)',
        parchment: 'rgb(var(--c-surface) / <alpha-value>)',
        leaf: 'rgb(var(--c-surface-3) / <alpha-value>)',
        'leaf-dark': 'rgb(var(--c-line) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        sepia: 'rgb(var(--c-sepia) / <alpha-value>)',
        oxblood: 'rgb(var(--c-oxblood) / <alpha-value>)',
        'oxblood-dark': 'rgb(var(--c-oxblood-dark) / <alpha-value>)',
        olive: 'rgb(var(--c-olive) / <alpha-value>)',
        'olive-soft': 'rgb(var(--c-olive-soft) / <alpha-value>)',
        brass: 'rgb(var(--c-brass) / <alpha-value>)',
        rule: 'rgb(var(--c-line) / <alpha-value>)',

        // --- Semantic aliases the existing pages reference --------------
        primary: 'rgb(var(--c-oxblood) / <alpha-value>)',
        'maroon-dark': 'rgb(var(--c-oxblood-dark) / <alpha-value>)',
        'primary-container': 'rgb(var(--c-oxblood) / <alpha-value>)',
        'text-muted': 'rgb(var(--c-muted) / <alpha-value>)',
        'on-surface': 'rgb(var(--c-ink) / <alpha-value>)',
        'on-surface-variant': 'rgb(var(--c-sepia) / <alpha-value>)',
        'on-background': 'rgb(var(--c-ink) / <alpha-value>)',
        warm: 'rgb(var(--c-line) / <alpha-value>)',
        'border-warm': 'rgb(var(--c-line) / <alpha-value>)',
        'cream-surface': 'rgb(var(--c-surface-3) / <alpha-value>)',
        'surface-container-lowest': 'rgb(var(--c-surface) / <alpha-value>)',
        'surface-container-low': 'rgb(var(--c-surface-2) / <alpha-value>)',
        'surface-container': 'rgb(var(--c-surface-4) / <alpha-value>)',
        'surface-container-high': 'rgb(var(--c-surface-3) / <alpha-value>)',
        'surface-container-highest': 'rgb(var(--c-surface-3) / <alpha-value>)',
        'secondary-fixed-dim': 'rgb(var(--c-olive) / <alpha-value>)', // olive (icons)
        'secondary-fixed': 'rgb(var(--c-olive-soft) / <alpha-value>)', // chip background
        'on-secondary-fixed': 'rgb(var(--c-on-secondary-fixed) / <alpha-value>)',
        'on-secondary-container': 'rgb(var(--c-on-secondary-container) / <alpha-value>)',
        secondary: 'rgb(var(--c-olive) / <alpha-value>)',
        'gold-light': 'rgb(var(--c-gold-light) / <alpha-value>)',
        outline: 'rgb(var(--c-outline) / <alpha-value>)',
        'outline-variant': 'rgb(var(--c-line) / <alpha-value>)',
        background: 'rgb(var(--c-bg) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        'surface-bright': 'rgb(var(--c-surface) / <alpha-value>)',
        'surface-dim': 'rgb(var(--c-surface-3) / <alpha-value>)',
        'on-primary': '#ffffff',
        'on-secondary': '#ffffff',
        error: '#9a2b1a',
        tertiary: 'rgb(var(--c-olive) / <alpha-value>)',
      },
      maxWidth: {
        'container-max': '1120px',
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.375rem',
        full: '9999px',
      },
      spacing: {
        'stack-lg': '56px',
        'stack-md': '28px',
        'stack-sm': '14px',
        base: '8px',
        'margin-mobile': '16px',
        gutter: '20px',
        'container-max': '1120px',
      },
      fontFamily: {
        display: ['Poppins', 'Noto Sans Devanagari', 'Noto Sans Gujarati', 'sans-serif'],
        'headline-md': ['Poppins', 'Noto Sans Devanagari', 'Noto Sans Gujarati', 'sans-serif'],
        'headline-lg': ['Poppins', 'Noto Sans Devanagari', 'Noto Sans Gujarati', 'sans-serif'],
        'headline-lg-mobile': ['Poppins', 'Noto Sans Devanagari', 'Noto Sans Gujarati', 'sans-serif'],
        'headline-xl': ['Poppins', 'Noto Sans Devanagari', 'Noto Sans Gujarati', 'sans-serif'],
        'body-md': ['Poppins', 'Noto Sans Devanagari', 'Noto Sans Gujarati', 'sans-serif'],
        'body-lg': ['Poppins', 'Noto Sans Devanagari', 'Noto Sans Gujarati', 'sans-serif'],
        'label-md': ['Poppins', 'Noto Sans Devanagari', 'sans-serif'],
        'script-devanagari': ['Noto Serif Devanagari', 'Noto Sans Devanagari', 'serif'],
        'script-gujarati': ['Noto Serif Gujarati', 'Noto Sans Gujarati', 'serif'],
      },
      fontSize: {
        'script-devanagari': ['19px', { lineHeight: '34px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '26px', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '30px', fontWeight: '400' }],
        'headline-md': ['23px', { lineHeight: '30px', fontWeight: '400', letterSpacing: '0' }],
        'headline-lg': ['34px', { lineHeight: '42px', fontWeight: '400', letterSpacing: '-0.01em' }],
        'headline-lg-mobile': ['27px', { lineHeight: '34px', fontWeight: '400', letterSpacing: '-0.01em' }],
        'headline-xl': ['52px', { lineHeight: '58px', letterSpacing: '-0.015em', fontWeight: '400' }],
        'label-md': ['13px', { lineHeight: '18px', letterSpacing: '0.14em', fontWeight: '400' }],
      },
    },
  },
  plugins: [forms],
}

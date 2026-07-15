import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // --- Palm-Leaf Archive palette ---------------------------------
        // Named tokens (use these in new markup)
        straw: '#ffffff', // page background
        parchment: '#ffffff', // content cards
        leaf: '#f3e9d6', // leaf-tan accent panels / tiles
        'leaf-dark': '#e7dcc7',
        ink: '#2f2418', // primary text (dark sepia)
        sepia: '#5c4326', // secondary headings / strong text
        oxblood: '#8a1f1c', // rubrication accent, links, CTAs
        'oxblood-dark': '#6e1714',
        olive: '#6b6a3a', // secondary accent, icons
        'olive-soft': '#dcd6b0',
        brass: '#d9a441', // sparing metallic accent
        rule: '#e7dcc7', // hairlines (leaf edges)

        // --- Semantic aliases the existing pages reference --------------
        primary: '#8a1f1c', // oxblood
        'maroon-dark': '#6e1714',
        'primary-container': '#8a1f1c',
        'text-muted': '#7c6b52',
        'on-surface': '#2f2418',
        'on-surface-variant': '#5c4326',
        'on-background': '#2f2418',
        warm: '#e7dcc7',
        'border-warm': '#e7dcc7',
        'cream-surface': '#f3e9d6',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#faf7f1',
        'surface-container': '#f7f0e4',
        'surface-container-high': '#f1e8d8',
        'surface-container-highest': '#f3e9d6',
        'secondary-fixed-dim': '#6b6a3a', // olive (icons)
        'secondary-fixed': '#dcd6b0', // chip background
        'on-secondary-fixed': '#33320f',
        'on-secondary-container': '#4a4718',
        secondary: '#6b6a3a',
        'gold-light': '#e0cfa0',
        outline: '#9a866a',
        'outline-variant': '#e7dcc7',
        background: '#ffffff',
        surface: '#ffffff',
        'surface-bright': '#ffffff',
        'surface-dim': '#f3e9d6',
        'on-primary': '#ffffff',
        'on-secondary': '#ffffff',
        error: '#9a2b1a',
        tertiary: '#6b6a3a',
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

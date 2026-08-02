/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Paleta MODO YO - Dark mode con acentos vibrantes
        primary: {
          DEFAULT: '#A78BFA', // Morado vibrante
          dark: '#7C3AED',
          light: '#C4B5FD'
        },
        secondary: {
          DEFAULT: '#06B6D4', // Cyan
          dark: '#0891B2',
          light: '#22D3EE'
        },
        success: {
          DEFAULT: '#10B981', // Verde para victorias
          dark: '#059669',
          light: '#34D399'
        },
        background: {
          DEFAULT: '#0F172A', // Oscuro principal
          card: '#1E293B',
          elevated: '#334155'
        },
        text: {
          primary: '#F1F5F9',
          secondary: '#CBD5E1',
          muted: '#94A3B8'
        }
      },
      fontFamily: {
        // Tipografía moderna y legible
        sans: ['System', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sf: {
          navy: '#032D60',
          blue: '#0176D3',
          'blue-light': '#1B96FF',
          'blue-dark': '#014486',
          teal: '#0B827C',
          'teal-light': '#06A59A',
          green: '#2E844A',
          'green-light': '#3BA755',
          yellow: '#FE9339',
          'yellow-light': '#FFB75D',
          red: '#BA0517',
          'red-light': '#E02D2D',
          purple: '#7B46B2',
          'gray-1': '#F3F3F3',
          'gray-2': '#E5E5E5',
          'gray-3': '#DDDBDA',
          'gray-4': '#B0ADAB',
          'gray-5': '#706E6B',
          'gray-6': '#514F4D',
          'gray-7': '#3E3E3C',
          'gray-8': '#2B2826',
          'gray-9': '#201E1C',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000f2',
        white: '#fff',
        primary: 'rgb(228, 216, 4)',
        overlay: 'rgb(17 16 16)',
        blur: 'rgba(0, 0, 0, 0.5)',
        transparent: 'transparent',
        borderColor: '#ffffff1a',
        red: '#ff0000',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
      },
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1248px',
      },
    },
  },
  plugins: [],
};
export default config;

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4c4ddc',
        secondary: '#e1e1e1',
        'detalles-1': '#e4e4fa',
        'detalles-2': '#c8c8f4',
        'text-primary': '#101010',
      },
    },
  },
  plugins: [],
}
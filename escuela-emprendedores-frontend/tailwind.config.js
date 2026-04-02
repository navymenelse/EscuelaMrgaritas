/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1E40AF',
          secondary: '#F59E0B',
          accent: '#10B981',
          neutral: '#F3F4F6'
        }
      }
    },
  },
  plugins: [],
}
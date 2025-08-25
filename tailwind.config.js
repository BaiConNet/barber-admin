/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ADICIONE O BLOCO DE CORES AQUI
      colors: {
        'barber-bg': '#111420', // Nosso novo fundo super escuro
        'barber-card': '#1f212d', // Um cinza para os cards, um pouco mais claro
        'barber-graphic': '#1a1e28'
      }
    },
  },
  plugins: [],
}

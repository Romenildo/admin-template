/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  //modo media ativa todos os componentes que possui o valor de darK: no classname
  //class ativa todos os componentes que estão dentro de uma className que possua o dark,
  // então todos os componentes abaixo dele vaia tivar o css que tiver o dark:
  darkMode: 'class',
  theme: {
    extend: {
    },
  },
  plugins: [],
}

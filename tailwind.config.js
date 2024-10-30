
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.{js,scss}'
  ],
  theme: {
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
    },
    extend: {
      colors: {
        'primary': '#2D68F8',
        'primary-light': '#F0F3FF',
        'button': '#13C296',
        'button-hover': '#0D9673',
      },
      boxShadow: {
        'menu-shadow': 'inset -2px 0px 0px 0px rgba(45, 104, 248, 1)',
      },
      container: {
        center: true,
        padding: '1rem',
      },
      screens: {
        'xs': '200px',
      }
    }
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ]
}


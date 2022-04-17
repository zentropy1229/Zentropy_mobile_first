const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '480px',
      ...defaultTheme.screens
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '.2rem',
          lg: '2rem'
        }
      },
      colors: {
        p: 'rgb(64, 124, 255)',
        pbtn: 'rgba(203, 238, 255, 0.8)',
        phover: 'rgba(54, 140, 253, 0.808)'
      },
      lineHeight: {
        nav: '64px'
      },
      backgroundImage: {
        loginPage: "url('@/assets/loginBackground.png')"
      }
    }
  },
  // --------------
  corePlugins: {
    container: false
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          margin: '0 auto',
          'padding-left': '.5rem',
          'padding-right': '.5rem',
          '@screen lg': {
            'padding-left': '1.5rem',
            'padding-right': '1.5rem'
          }
        }
      })
    }
  ]
}

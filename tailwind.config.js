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
      backgroundImage: {
        loginPage: "url('https://zentropy.s3.ap-northeast-1.amazonaws.com/img/loginBackground.png')"
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
          'padding-left': '.15rem',
          'padding-right': '.15rem',
          '@screen lg': {
            'padding-left': '1.2rem',
            'padding-right': '1.2rem'
          },
          '@screen xl': {
            'max-width': '15.4rem'
          }
        }
      })
    }
  ]
}

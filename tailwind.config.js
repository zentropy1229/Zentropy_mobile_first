module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        p: 'rgb(64, 124, 255)',
        pbtn: 'rgba(203, 238, 255, 0.8)',
        phover: 'rgba(54, 140, 253, 0.808)'
      },
      height: {
        nav: '64px'
      },
      lineHeight: {
        nav: '64px'
      },
      maxWidth: {
        container: '1276px'
      }
    }
  },
  plugins: []
}

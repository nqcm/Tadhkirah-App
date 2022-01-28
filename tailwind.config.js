module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Open Sans', 'sans-serif']
    },
    colors: {
      white: '#fff',
      gold: '#eeb466',
      'grey-dark': '#1c1c1c',
      'grey-medium': '#212121',
      'grey-light': '#363636',
      'grey-cards': '#282724',
      green: '#4aa079',
      red: '#e46b67',
      transparent: 'transparent'
    },
    extend: {
      spacing: {
        '76': '19rem'
      },
      borderWidth: {
        '3': '3px'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      width: {
        cw: '314px'
      },
      height: {
        ch: '423px'
      }
    }
  },

  plugins: []
}

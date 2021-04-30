export type ThemeType = typeof theme['light'];

const theme = {
  light: {
    background: '#EAEAEA',
    secondary: '#DBDBDB',
    primaryText: 'black',
    contrastBackground: '#cc3399',
    contrastText: '#EAEAEA',
  },
  dark: {
    background: '#181A1B',
    secondary: '#333B47',
    primaryText: 'white',
    contrastBackground: '#EAEAEA',
    contrastText: '#181A1B',
  }
}
export default theme

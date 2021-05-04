export type ThemeType = typeof theme['light'];

const theme = {
  light: {
    background: '#EAEAEA',
    secondary: '#333341',
    primaryText: 'black',
    contrastBackground: '#cc3399',
    contrastText: '#EAEAEA',
    inputBackground: '#010A13',
    inputBorder: '#3E3501'

  },
  dark: {
    background: '#181A1B',
    secondary: '#333B47',
    primaryText: 'white',
    contrastBackground: '#EAEAEA',
    contrastText: '#181A1B',
    inputBackground: '#010A13',
    inputBorder: '#3E3501'
  }
}
export default theme

export type ThemeType = typeof theme['light'];

const theme = {
  light: {
    background: '#EAEAEA',
    secondary: '#1F1F1F',
    primaryText: 'black',
    contrastBackground: '#cc3399',
    contrastText: '#EAEAEA',
    inputBackground: '#010A13',
    inputBorder: '#3E3501'
  },
  dark: {
    background: '#181A1B',
    secondary: '#1F1F1F',
    primaryText: 'white',
    contrastBackground: '#EAEAEA',
    contrastText: '#181A1B',
    inputBackground: '#010A13',
    inputBorder: '#3E3501'
  },
}

export const commonColors = {
  red: '#C6493A'
}
export default theme

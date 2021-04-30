// https://dev.to/rajuashok/create-styled-d-ts-to-make-typescript-work-with-styled-components-5dk4
// allows for nice auto complete when using props.theme
import { } from 'styled-components';
import { ThemeType } from './theme';
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {} 
}
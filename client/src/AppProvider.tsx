import React, { useEffect, createContext, useState } from 'react'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles, theme } from './styles/exports'

export const ThemeContext = createContext('light')

export const AppProvider: React.FC = ({ children }) => {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem('theme') || 'light'
  )
  const currentTheme = (theme as any)[themeMode]

  useEffect(() => {
    localStorage.setItem('theme', themeMode)
  }, [themeMode])

  const toggleTheme = () => {
    setThemeMode((oldTheme) => {
      if (oldTheme === 'light') {
        return 'dark'
      } else {
        return 'light'
      }
    })
  }

  //  combine into one object for global ThemeContext state
  const value: any = { themeMode, toggleTheme }
  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

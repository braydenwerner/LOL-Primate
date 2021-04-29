import React, { useEffect, createContext, useState } from 'react'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles, theme } from '../styles/index'

export const ThemeContext = createContext('light')

export const AppProvider: React.FC = ({ children }) => {
  const [themeMode, setThemeMode] = useState(null)
  const currentTheme = (theme as any)[themeMode ? themeMode : 'light']

  useEffect(() => {
    setThemeMode(localStorage.getItem('theme') || 'light')
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', themeMode)
  }, [themeMode])

  const toggleTheme = () => {
    setThemeMode((oldTheme) => {
      if (oldTheme === 'light') return 'dark'
      else return 'light'
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

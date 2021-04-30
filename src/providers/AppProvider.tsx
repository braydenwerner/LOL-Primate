import React, { useEffect, createContext, useState } from 'react'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles, theme } from '../styles/index'

export const ThemeContext = createContext({
  themeMode: 'light',
  toggleTheme: () => { return }  
})

export const AppProvider: React.FC = ({ children }) => {
  const [themeMode, setThemeMode] = useState<string>('light')
  const currentTheme = (theme as any)[themeMode]
  console.log(currentTheme)

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
  const value = { themeMode, toggleTheme }
  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

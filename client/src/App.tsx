import React from 'react'

import { ChampSelectPage } from './pages/exports'
import { ThemeToggle } from './components/exports'

export const App: React.FC = () => {
  return (
    <>
      <ThemeToggle />
      <ChampSelectPage />
    </>
  )
}

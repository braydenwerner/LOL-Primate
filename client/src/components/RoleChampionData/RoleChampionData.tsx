import React, { useEffect, useContext } from 'react'
import { ThemeContext } from '../../AppProvider'
import { theme } from '../../styles/exports'

import './RoleChampionData.scss'

interface RoleChampionDataProps {
  mostCommonChampions: any
  mostCommonLanes: any
}

export const RoleChampionData: React.FC<RoleChampionDataProps> = ({
  mostCommonChampions,
  mostCommonLanes
}) => {
  useEffect(() => {
    console.log(mostCommonChampions)
    console.log(mostCommonLanes)
  }, [mostCommonChampions, mostCommonLanes])

  const { themeMode }: any = useContext(ThemeContext as any)
  return (
    <div
      style={{
        color: `${(theme as any)[themeMode].colors.primaryText}`
      }}
    ></div>
  )
}

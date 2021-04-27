import React, { useEffect, useState, useContext } from 'react'

import { ThemeContext } from '../../AppProvider'
import { theme } from '../../styles/exports'
import { getAPIVersion } from '../../api/datadragonAPI'
import './RoleChampionData.scss'

interface RoleChampionDataProps {
  mostCommonChampions: any
  mostCommonLanes: any
}

export const RoleChampionData: React.FC<RoleChampionDataProps> = ({
  mostCommonChampions,
  mostCommonLanes
}) => {
  //  put dict of champ:freq into a list of champs in descending order
  const [mostCommonChampArr, setMostCommonChampArr] = useState<any>()
  const [mostCommonLanesArr, setMostCommonLanesArr] = useState<any>()

  const dataDragonAPIVersion = getAPIVersion()

  useEffect(() => {
    const tempMostCommonChampArr: any = []
    const tempMostCommonLanesArr: any = []
    if (mostCommonChampions && Object.keys(mostCommonChampions).length > 0) {
      for (const champ in mostCommonChampions) {
        tempMostCommonChampArr.push([champ, mostCommonChampions[champ]])
      }
      tempMostCommonChampArr.sort((a: any, b: any) => b[1] - a[1])

      for (const lane in mostCommonLanes) {
        tempMostCommonLanesArr.push([lane, mostCommonLanes[lane]])
      }
      tempMostCommonLanesArr.sort((a: any, b: any) => b[1] - a[1])

      setMostCommonChampArr(tempMostCommonChampArr)
      setMostCommonLanesArr(tempMostCommonLanesArr)
    }
  }, [mostCommonChampions, mostCommonLanes])

  const { themeMode }: any = useContext(ThemeContext as any)
  return (
    <div
      style={{
        color: `${(theme as any)[themeMode].colors.primaryText}`
      }}
    >
      <div style={{ marginTop: '20px' }}>Most played:</div>
      {mostCommonChampArr &&
        mostCommonChampArr.map((champion: any, i: number) => {
          return (
            <div key={i}>
              <div>
                {champion[0]}: {champion[1]}
              </div>
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/${dataDragonAPIVersion}/img/champion/${champion[0]}.png`}
              ></img>
            </div>
          )
        })}

      <div style={{ marginTop: '20px' }}>Role:</div>
      {mostCommonLanesArr &&
        mostCommonLanesArr.map((lane: any, i: number) => {
          return (
            <div key={i}>
              {lane[0]}: {lane[1]}
            </div>
          )
        })}
    </div>
  )
}

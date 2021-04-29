import { useEffect, useState } from 'react'

import { getAPIVersion } from '../../../util/convertChampId'
import { Image } from './SummonerChampionCard.styled'

interface RoleChampionCardProps {
  mostCommonChampions: any
  mostCommonLanes: any
}

export const RoleChampionCard: React.FC<RoleChampionCardProps> = ({
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

  return (
    <div>
      <div style={{ marginTop: '20px' }}>Most played:</div>
      {mostCommonChampArr &&
        mostCommonChampArr.splice(0, 5).map((champion: any, i: number) => {
          return (
            <div key={i}>
              <div>
                {champion[0]}: {champion[1]}
              </div>
              <Image
                src={`http://ddragon.leagueoflegends.com/cdn/${dataDragonAPIVersion}/img/champion/${champion[0]}.png`}
              />
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

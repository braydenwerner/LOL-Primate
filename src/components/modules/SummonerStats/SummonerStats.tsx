import React from 'react'
import { Grid } from '@material-ui/core'
import {
  RoleChampionCard,
  SummonerProfileCard,
} from '../../elements/index'
import {
  SummonerData,
  MostCommonLanes,
  MostCommonChampions,
  SpecificMatchData,
} from '../../../pages/ChampSelectPage'
import { StyledGridContainer } from '../../../styles/constantStyles'

interface SummonerStatsProps {
  summonerData: SummonerData
  mostCommonLanes: MostCommonLanes
  mostCommonChampions: MostCommonChampions
  specificMatchData: SpecificMatchData
}

export const SummonerStats: React.FC<SummonerStatsProps> = React.memo(({
  summonerData,
  mostCommonLanes,
  mostCommonChampions,
  specificMatchData
}) => {
  //  console.log(mostCommonChampions)
  console.log(specificMatchData)
  return (
    <Grid
      container
      direction="row"
      justify="center"
      style={{ marginTop: '150px' }}
    >
      {Object.keys(summonerData).map(
        (summonerObjKey: string, i: number) => {
          // console.log(summonerObjKey)
          // console.log(specificMatchData[summonerData[summonerObjKey].accountId])
          return (
            <StyledGridContainer
              item
              xs
              key={i}
            >
              <SummonerProfileCard
                summoner={summonerData[summonerObjKey]}
              />
              <RoleChampionCard
                mostCommonChampions={
                  mostCommonChampions[
                  summonerData[summonerObjKey].accountId
                  ]
                }
                mostCommonLanes={
                  mostCommonLanes[
                  summonerData[summonerObjKey].accountId
                  ]
                }
                specificMatchArr={specificMatchData[summonerData[summonerObjKey].accountId]}
              />
            </StyledGridContainer>
          )
        },
      )}
    </Grid>
  )
})
SummonerStats.displayName = 'SummonerStats'

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
} from '../../../pages/ChampSelectPage'
import { StyledGridContainer } from './SummonerStats.style'

interface SummonerStatsProps {
  summonerData: SummonerData
  mostCommonLanes: MostCommonLanes
  mostCommonChampions: MostCommonChampions
}

export const SummonerStats: React.FC<SummonerStatsProps> = React.memo(({
  summonerData,
  mostCommonLanes,
  mostCommonChampions,
}) => {
  console.log(mostCommonChampions)
  return (
    <Grid
      container
      direction="row"
      justify="center"
      style={{ marginTop: '150px' }}
    >
      {Object.keys(summonerData).map(
        (summonerObjKey: string, i: number) => {
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
              />
            </StyledGridContainer>
          )
        },
      )}
    </Grid>
  )
})
SummonerStats.displayName = 'SummonerStats'

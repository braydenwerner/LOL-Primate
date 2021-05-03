import React from 'react'
import {
  RoleChampionCard,
  SummonerProfileCard,
} from '../../elements/index'
import { Grid } from '@material-ui/core'
import {
  SummonerData,
  MostCommonLanes,
  MostCommonChampions,
} from '../../../pages/ChampSelectPage'

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
  return (
    <Grid
      container
      direction="row"
      justify="center"
      style={{ marginTop: '20px' }}
    >
      {Object.keys(summonerData).map(
        (summonerObjKey: string, i: number) => {
          return (
            <Grid
              className="summoner-data-container"
              item
              xs={2}
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
            </Grid>
          )
        },
      )}
    </Grid>
  )
})
SummonerStats.displayName = 'SummonerStats'

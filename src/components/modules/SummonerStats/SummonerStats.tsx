import React, { useState } from 'react'
import { config, useSpring, animated } from 'react-spring'
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
import * as Styled from './SummonerStats.style'
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
  // console.log(specificMatchData)
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 100,
    config: config.molasses,
  })

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
              <animated.div style={props}>
                <Styled.SummonerStatsContainer image={`/images/banner.png`}>
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
                </Styled.SummonerStatsContainer>
              </animated.div>
            </StyledGridContainer>
          )
        },
      )}
    </Grid>
  )
})
SummonerStats.displayName = 'SummonerStats'

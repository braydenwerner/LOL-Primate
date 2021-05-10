import React from 'react'
import styled from 'styled-components'
import { config, useSpring, animated } from 'react-spring'
import { Grid } from '@material-ui/core'
import { IoMdCopy } from 'react-icons/io'

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
import { commonColors } from '../../../styles/theme'

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

  const handleCopy = (summonerObjKey: string) => {
    let copyString = ""
    for (const [key, value] of Object.entries(summonerData[summonerObjKey])) {
      //  no use for copying id
      if (key.toUpperCase().indexOf('ID') >= 0 || key === 'revisionDate' || key === 'queueType' || key === 'summonerName') continue
      copyString += key + ': ' + value + '\n'
    }
    navigator.clipboard.writeText(copyString)
  }

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
      style={{ marginTop: '200px', marginBottom: '200px' }}
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
                <CopyIcon size={50} onClick={() => handleCopy(summonerObjKey)} />
              </animated.div>
            </StyledGridContainer>
          )
        },
      )}
    </Grid>
  )
})
SummonerStats.displayName = 'SummonerStats'

const CopyIcon = styled(IoMdCopy)`
  position: relative;
  bottom: 50px;
  cursor: pointer;
  border-radius: 50px;
  background-color: ${props => props.theme.secondary};
  border: 2px solid ${props => props.theme.inputBorder};

  :hover {
    background-color: ${props => props.theme.secondaryDark}
  }

  :active {
    background-color:${commonColors.red};
    transform: translateY(4px);
  }
`

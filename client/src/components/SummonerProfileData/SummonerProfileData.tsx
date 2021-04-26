import React, { useContext } from 'react'
import { Grid } from '@material-ui/core'

import { ThemeContext } from '../../AppProvider'
import { theme } from '../../styles/exports'

import './SummonerProfileData.scss'

interface SummonerProfileDataProps {
  summonerData: any
  summonerObjKey: string
}

export const SummonerProfileData: React.FC<SummonerProfileDataProps> = ({
  summonerData,
  summonerObjKey
}) => {
  const { themeMode }: any = useContext(ThemeContext as any)

  const summoner = summonerData[summonerObjKey]
  const winrate =
    Math.round((summoner.wins / (summoner.wins + summoner.losses)) * 10000) /
    100

  return (
    <Grid className="summoner-data-container" item xs={2}>
      <div
        style={{
          color: `${(theme as any)[themeMode].colors.primaryText}`
        }}
      >
        {summoner.name}
        <div>{summoner.tier}</div>
        {summoner.rank}
        {summoner.leaguePoints}
        <div>{winrate}%</div>
        <div> {summoner.wins}</div>
        {summoner.losses}
        {summoner.level}
      </div>
    </Grid>
  )
}

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
    Math.round((summoner.wins / (summoner.wins + summoner.losess)) * 10000) /
    100

  return (
    <div
      style={{
        color: `${(theme as any)[themeMode].colors.primaryText}`
      }}
    >
      {summoner.name}
      <div>tier: {summoner.tier}</div>
      <div>rank: {summoner.rank}</div>
      <div>lp: {summoner.leaguePoints}</div>
      <div>winrate: {winrate}%</div>
      <div>wins: {summoner.wins}</div>
      <div>losess: {summoner.losses}</div>
      <div>Summoner level: {summoner.summonerLevel}</div>
    </div>
  )
}

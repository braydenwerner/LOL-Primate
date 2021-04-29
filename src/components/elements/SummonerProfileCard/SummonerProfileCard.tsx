import React, { useContext } from 'react'
import { Grid } from '@material-ui/core'

interface SummonerProfileCardProps {
  summonerData: any
  summonerObjKey: string
}

export const SummonerProfileCard: React.FC<SummonerProfileCardProps> = ({
  summonerData,
  summonerObjKey
}) => {
  const summoner = summonerData[summonerObjKey]
  const winrate =
    Math.round((summoner.wins / (summoner.wins + summoner.losess)) * 10000) /
    100

  return (
    <div>
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

// import Head from 'next/head'
import { useState, useEffect } from 'react'
import { TextField } from '@material-ui/core'
import styled from 'styled-components'

import { SummonerStats } from '../components/modules/index'
import { convertChampId } from '../util/convertChampId'
import { URL } from '../config/config'

export interface SummonerData {
  [id: string]: Summoner
}

export interface Summoner {
  accountId: string
  id: string
  name: string
  profileIconId: number
  puuid: string
  revisionDate: number
  summonerLevel: number
  freshBlood?: boolean
  hotStreak?: boolean
  inactive?: boolean
  leagueId?: string
  leaguePoints?: number
  losses?: number
  queueType?: string
  rank?: string
  tier?: string
  veteran?: boolean
  wins?: number
}

export interface MatchOverviewData {
  [id: string]: Match[]
}

export interface Match {
  champion: string
  gameId: number
  lane: string
  platformId: string
  queue: number
  role: string
  season: number
  timestamp: number
}

export interface MostCommonChampions {
  [id: string]: Champions
}

export interface Champions {
  [champion: string]: number
}

export interface MostCommonLanes {
  [id: string]: Lanes
}

export interface Lanes {
  [lane: string]: number
}

const ChampSelectPage: React.FC = () => {
  const [summonerNames, setSummonerNames] = useState<string[]>([])
  const [summonerData, setSummonerData] = useState<SummonerData>({})
  const [
    matchOverviewData,
    setMatchOverviewData,
  ] = useState<MatchOverviewData>({})
  const [
    mostCommonChampions,
    setMostCommonChampions,
  ] = useState<MostCommonChampions>({})
  const [
    mostCommonLanes,
    setMostCommonLanes,
  ] = useState<MostCommonLanes>({})

  useEffect(() => {
    if (summonerNames.length === 5) querySummonerData(summonerNames)
  }, [summonerNames])

  //  if the match data exists for each player, calculate most common champs,
  //  most common roles,
  //  ex: mostCommonChampions[id] = {2: 9, 5: 4} -> champion of id 2, played 9 times
  useEffect(() => {
    if (Object.keys(matchOverviewData).length > 0) populateMatchData()
  }, [matchOverviewData])

  const querySummonerData = async (summonerNames: string[]) => {
    const res = await fetch(`${URL}/getSummonerData`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ summonerNames }),
    })
    const summonerObj = await res.json()
    if (summonerObj.error) {
      alert(summonerObj.error)
      return
    }

    console.log(summonerObj)
    setSummonerData(summonerObj)

    //  after the summoner data is collected, get match data for each
    queryMatchOverview(summonerObj)
  }

  const queryMatchOverview = async (summonerObj: SummonerData) => {
    const encryptedAccountIds = []
    for (const id in summonerObj) {
      encryptedAccountIds.push(summonerObj[id].accountId)
    }

    const res = await fetch(`${URL}/getSummonerMatchOverviews`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ encryptedAccountIds }),
    })
    const matchDataObj = await res.json()
    setMatchOverviewData(matchDataObj)
  }

  const populateMatchData = async () => {
    console.log(matchOverviewData)
    const tempMostCommonLanes: MostCommonLanes = {}
    const tempMostCommonChamps: MostCommonChampions = {}

    for (const id in matchOverviewData) {
      const laneFreq: Lanes = {}
      const champFreq: Champions = {}
      for (const matchObj in matchOverviewData[id]) {
        const lane = matchOverviewData[id][matchObj].lane
        const role = matchOverviewData[id][matchObj].role
        const champion: string = await convertChampId(
          matchOverviewData[id][matchObj].champion,
        )

        if (lane === 'BOTTOM') {
          if (role === 'DUO_SUPPORT') {
            if ('SUPPORT' in laneFreq) laneFreq['SUPPORT']++
            else laneFreq['SUPPORT'] = 1
          } else if (role === 'DUO_CARRY') {
            if ('ADC' in laneFreq) laneFreq['ADC']++
            else laneFreq['ADC'] = 1
          }
          continue
        }

        if (lane in laneFreq) laneFreq[lane]++
        else laneFreq[lane] = 1

        if (champion in champFreq) champFreq[champion]++
        else champFreq[champion] = 1
      }

      tempMostCommonLanes[id] = { ...laneFreq }
      tempMostCommonChamps[id] = { ...champFreq }
    }

    setMostCommonLanes(tempMostCommonLanes)
    setMostCommonChampions(tempMostCommonChamps)
  }

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.value) return

    const value = e.target.value
    const parsedSummonerNames = []
    const lines = value.split('\n')

    for (const line of lines) {
      let words = line.split(' ')
      let currentSummonerName = ''

      if (words.length > 3) {
        if (
          words[words.length - 1] === 'lobby' &&
          words[words.length - 2] === 'the' &&
          words[words.length - 3] === 'joined'
        ) {
          words = words.slice(0, words.length - 3)

          for (const word of words) {
            currentSummonerName += word + ' '
          }
        } else {
          alert('Invalid format')
          return
        }
        //  assume that the user just entered a username
      } else {
        for (const word of words) {
          currentSummonerName += word + ' '
        }
      }

      currentSummonerName.trimEnd()
      parsedSummonerNames.push(currentSummonerName)
    }

    if (parsedSummonerNames.length === 5) {
      e.target.value = ''
      setSummonerNames(parsedSummonerNames)
    }
  }

  return (
    <Wrapper>
      <StyledTextField
        multiline
        onChange={handleTextChange}
        rowsMax={5}
        placeholder={
          'xtremesoccer2012 joined the lobby\narotheawesome joined the lobby\nmineturtle20 joined the lobby\nlokimonsta joined the lobby\nplacerwiz joined the lobby\n'
        }
      />
      {summonerData && mostCommonLanes && mostCommonChampions && (
        <SummonerStats
          summonerData={summonerData}
          mostCommonLanes={mostCommonLanes}
          mostCommonChampions={mostCommonChampions}
        />
      )}
    </Wrapper>
  )
}
export default ChampSelectPage

const StyledTextField = styled(TextField)`
  width: 600px;
  background-color: ${(props) =>
    props.theme.colors.contrastBackground};
  color: blue;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`

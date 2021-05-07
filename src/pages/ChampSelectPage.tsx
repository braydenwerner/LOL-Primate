import { useState, useEffect } from 'react'
import { GuardSpinner } from 'react-spinners-kit'
import styled from 'styled-components'

import { useMediaQuery } from '../hooks/useMediaQuery';
import { SummonerStats } from '../components/modules/index'
import { convertChampId, getAPIVersion } from '../util/convertChampId'
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
  [id: string]: Champion
}

export interface Champion {
  [champion: string]: number
}

export interface MostCommonLanes {
  [id: string]: Lane
}

export interface Lane {
  [lane: string]: number
}

export interface SpecificMatchData {
  [id: string]: SpecificMatch[]
}

export interface SpecificMatchArr {
  [index: number]: SpecificMatch
}

export interface SpecificMatch {
  kills: number,
  deaths: number,
  assists: number,
  championId: number,
  champion: string,
  win: boolean,
}

const ChampSelectPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
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
  const [specificMatchData, setSpecificMatchData] = useState<SpecificMatchData>({})

  useEffect(() => {
    getAPIVersion()
  }, [])



  useEffect(() => {
    const querySummonerData = async (summonerNames: string[]) => {
      setIsLoading(true)
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
    if (summonerNames.length === 5) querySummonerData(summonerNames)
  }, [summonerNames])

  //  if the match data exists for each player, calculate most common champs,
  //  most common roles,
  //  ex: mostCommonChampions[id] = {2: 9, 5: 4} -> champion of id 2, played 9 times
  useEffect(() => {
    const querySpecificMatchData = async (summonerMatches: { [id: string]: Array<number> }) => {
      const res = await fetch(`${URL}/getSpecificMatchOverview`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ summonerMatches }),
      })

      //  parse the data to find the current player in the match
      //  then extract the data that is necessary
      const tempSpecificMatchData = await res.json();
      console.log(tempSpecificMatchData)
      setSpecificMatchData({ ...tempSpecificMatchData })
    }

    const populateMatchData = async () => {
      console.log(matchOverviewData)
      const tempMostCommonLanes: MostCommonLanes = {}
      const tempMostCommonChamps: MostCommonChampions = {}

      //  playerId: ids[]
      const summonerMatches: { [id: string]: Array<number> } = {}

      for (const id in matchOverviewData) {
        const laneFreq: Lane = {}
        const champFreq: Champion = {}

        //  accumulate 6 game ids per player
        let count = 0;
        for (const matchObj in matchOverviewData[id]) {
          if (count < 6) {
            if (!(id in summonerMatches)) summonerMatches[id] = []
            summonerMatches[id].push(matchOverviewData[id][matchObj].gameId)
            count++
          }

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

      //  get stats for 6 most recent matches for each player ex. k/d/a
      console.log(summonerMatches)
      querySpecificMatchData(summonerMatches)

      setMostCommonLanes(tempMostCommonLanes)
      setMostCommonChampions(tempMostCommonChamps)
      setIsLoading(false)
      setIsLoaded(true)
    }

    if (Object.keys(matchOverviewData).length > 0) populateMatchData()
  }, [matchOverviewData])

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
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

  const largeScreen = useMediaQuery('(min-width: 800px)')

  return (
    <Wrapper>
      <StyledTextField
        onChange={handleTextChange}
        largeScreen={largeScreen}
        placeholder={`xtremesoccer2012 joined the lobby\narotheawesome joined the lobby\nmineturtle20 joined the lobby\nlokimonsta joined the lobby\nplacerwiz joined the lobby`
        }
      />
      {isLoaded && (
        <SummonerStats
          summonerData={summonerData}
          mostCommonLanes={mostCommonLanes}
          mostCommonChampions={mostCommonChampions}
          specificMatchData={specificMatchData}
        />
      )}
      {isLoading && (
        <LoadingContainer>
          <GuardSpinner size={100} />
          <div>Retrieving Summoner Data</div>
        </LoadingContainer>
      )}
    </Wrapper>
  )
}
export default ChampSelectPage

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 120vh;
  text-align: center;
`

interface StyledTextFieldProps {
  largeScreen: boolean;
}

const StyledTextField = styled.textarea<StyledTextFieldProps>`
  position: absolute;
  top: 5%;
  width: ${props => props.largeScreen ? '800px' : '97%'};
  height: 85px;
  box-sizing: border-box;
  border: 2px solid ${(props) =>
    props.theme.inputBorder};
  background-color: ${(props) =>
    props.theme.inputBackground};
    resize: none;

  ::placeholder {
    color: #CAC4B4;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  align-items: center;
`


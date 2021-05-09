import { useState, useEffect } from 'react'
import Head from 'next/head'
import { ImpulseSpinner } from 'react-spinners-kit'
import styled from 'styled-components'

import { useMediaQuery } from '../hooks/useMediaQuery';
import { SummonerStats } from '../components/modules/index'
import { convertChampId, getAPIVersion } from '../util/convertChampId'
import { URL } from '../config/config'
import { PreviewSummary } from '../components/elements/index'
import { commonColors } from '../styles/theme'

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

      // console.log(summonerObj)
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

  useEffect(() => {
    //  query last 5 matches player by player
    const querySpecificMatchData = async (summonerMatches: { [id: string]: Array<number> }) => {
      const tempSpecificMatchData: SpecificMatchData = {}
      for (const summonerId in summonerMatches) {
        const res = await fetch(`${URL}/getSpecificMatchOverview`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ summonerId: summonerId, summonerMatches: summonerMatches[summonerId] }),
        })
        tempSpecificMatchData[summonerId] = await res.json();
      }

      //  parse the data to find the current player in the match
      //  then extract the data that is necessary
      // console.log(tempSpecificMatchData)
      setSpecificMatchData({ ...tempSpecificMatchData })
    }

    const populateMatchData = async () => {
      // console.log(matchOverviewData)
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
      // console.log(summonerMatches)
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

  const handleRandomSummonersClick = () => {
    setSummonerNames(['adoldet', 'crimsonteal', 'Andemuet', 'lokimonsta', 'Uiharu'])
  }

  const largeScreen = useMediaQuery('(min-width: 800px)')

  return (
    <>
      <Head>
        <title>LOL Gorilla</title>
        <meta property="og:title" content="LOL Gorilla Home" key="title" />
        <meta name="description" content="Win more games!" />
      </Head>
      {isLoading && (
        <LoadingContainer>
          <ImpulseSpinner size={150} />
        </LoadingContainer>
      )}
      <Wrapper>
        <InputContainer largeScreen={largeScreen}>
          <InputContainerTitle>Copy and paste below or try with
            <InputContainerLink onClick={handleRandomSummonersClick}>random summoner names</InputContainerLink>
          </InputContainerTitle>
          <StyledTextField
            onChange={handleTextChange}
            placeholder={`xtremesoccer2012 joined the lobby\narotheawesome joined the lobby\nmineturtle20 joined the lobby\nlokimonsta joined the lobby\nplacerwiz joined the lobby`
            }
          />
        </InputContainer>
        {isLoaded ? (
          <SummonerStats
            summonerData={summonerData}
            mostCommonLanes={mostCommonLanes}
            mostCommonChampions={mostCommonChampions}
            specificMatchData={specificMatchData}
          />
        ) : (
          <PreviewSummary />
        )}
      </Wrapper>
    </>
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

interface InputContainerProps {
  largeScreen: boolean;
}

const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  width: ${props => props.largeScreen ? '800px' : '97%'};
  background-color: ${props => props.theme.inputBackground};
  border: 2px solid ${props => props.theme.inputBorder};
`

const InputContainerTitle = styled.div`
  font-size: 22px;
  margin-top: 7px;
  margin-bottom: 2px;
`

const InputContainerLink = styled.span`
  color: ${commonColors.red};
  cursor: pointer;
  margin-left: 5px;
  text-decoration: underline;
  font-style: underline;
`

const StyledTextField = styled.textarea`
  width: 100%;
  height: 115px;
  margin-top: 5px;
  padding-top: 5px;
  box-sizing: border-box;
  border: 1px solid ${(props) =>
    props.theme.inputBorder};
  background-color: ${(props) =>
    props.theme.inputBackground};
    resize: none;
  color: white;
  outline: none;
  font-family: Newsreader;
  font-size: 21px;
  font-style: italic;

  ::placeholder {
    color: #CAC4B4;
  }
`

const LoadingContainer = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 250px;
  width: 150px;
`


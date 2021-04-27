import React, { useState, useEffect, useContext } from 'react'
import { Grid, TextField } from '@material-ui/core'

import { ThemeContext } from '../../AppProvider'
import { theme } from '../../styles/exports'
import { convertChampId } from '../../api/datadragonAPI'
import { RoleChampionData, SummonerProfileData } from '../../components/exports'

import './ChampSelectPage.scss'

export const ChampSelectPage: React.FC = () => {
  const { themeMode }: any = useContext(ThemeContext as any)

  const [summonerNames, setSummonerNames] = useState<string[]>([])
  const [summonerData, setSummonerData] = useState<any>({})
  const [matchOverviewData, setMatchOverviewData] = useState<any>({})
  const [mostCommonChampions, setMostCommonChampions] = useState<any>({})
  const [mostCommonLanes, setMostCommonLanes] = useState<any>({})

  useEffect(() => {}, [])

  useEffect(() => {
    if (summonerNames.length === 5) querySummonerData(summonerNames)
    console.log(summonerData)
  }, [summonerNames])

  //  if the match data exists for each player, calculate most common champs,
  //  most common roles,
  //  ex: mostCommonChampions[id] = {2: 9, 5: 4} -> champion of id 2, played 9 times
  useEffect(() => {
    populateMatchData()
  }, [matchOverviewData])

  const populateMatchData = async () => {
    if (Object.keys(matchOverviewData).length > 0) {
      const tempMostCommonLanes: any = {}
      const tempMostCommonChamps: any = {}

      for (const id in matchOverviewData) {
        const laneFreq: any = {}
        const champFreq: any = {}
        for (const matchObj in matchOverviewData[id]) {
          const lane = matchOverviewData[id][matchObj].lane
          const role = matchOverviewData[id][matchObj].role
          const champion: any = await convertChampId(
            matchOverviewData[id][matchObj].champion
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
  }

  const handleTextChange = (e: any) => {
    if (!e.target.value) return
    let value = e.target.value

    console.log(value)

    const parsedSummonerNames = []
    let lines = value.split('\n')

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

          for (let word of words) {
            currentSummonerName += word + ' '
          }
        } else {
          alert('Invalid format')
          return
        }
        //  assume that the user just entered a username
      } else {
        for (let word of words) {
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

  const querySummonerData = async (summonerNames: string[]) => {
    const res = await fetch('http://localhost:4000/getSummonerData', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ summonerNames })
    })
    const summonerObj = await res.json()
    if (summonerObj.error) {
      alert(summonerObj.error)
      return
    }

    setSummonerData(summonerObj)

    //  after the summoner data is collected, get match data for each
    queryMatchOverview(summonerObj)
  }

  const queryMatchOverview = async (summonerObj: any) => {
    const encryptedAccountIds = []
    for (const id in summonerObj) {
      encryptedAccountIds.push(summonerObj[id].accountId)
    }

    const res = await fetch('http://localhost:4000/getSummonerMatchOverviews', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ encryptedAccountIds })
    })
    const matchDataObj = await res.json()
    setMatchOverviewData(matchDataObj)
  }

  return (
    <>
      <div id="champ-selected-main-container">
        <TextField
          id="champ-select-paste-textarea"
          multiline
          onChange={handleTextChange}
          rowsMax={5}
          placeholder={
            'xtremesoccer2012 joined the lobby\narotheawesome joined the lobby\nmineturtle20 joined the lobby\nlokimonsta joined the lobby\nplacerwiz joined the lobby\n'
          }
          style={{
            color: `${(theme as any)[themeMode].colors.secondary}`,
            backgroundColor: `${(theme as any)[themeMode].colors.textColor}`
          }}
        />
        <Grid
          container
          direction="row"
          justify="center"
          style={{ marginTop: '20px' }}
        >
          {summonerData &&
            mostCommonLanes &&
            mostCommonChampions &&
            Object.keys(summonerData).map(
              (summonerObjKey: string, i: number) => {
                return (
                  <Grid className="summoner-data-container" item xs={2} key={i}>
                    <SummonerProfileData
                      summonerData={summonerData}
                      summonerObjKey={summonerObjKey}
                    />
                    <RoleChampionData
                      mostCommonChampions={
                        mostCommonChampions[
                          summonerData[summonerObjKey].accountId
                        ]
                      }
                      mostCommonLanes={
                        mostCommonLanes[summonerData[summonerObjKey].accountId]
                      }
                    />
                  </Grid>
                )
              }
            )}
        </Grid>
      </div>
    </>
  )
}

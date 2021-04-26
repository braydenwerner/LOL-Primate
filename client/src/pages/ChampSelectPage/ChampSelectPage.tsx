import React, { useState, useEffect, useContext } from 'react'
import { Grid, TextField } from '@material-ui/core'

import { ThemeContext } from '../../AppProvider'
import { theme } from '../../styles/exports'
import { SummonerProfileData } from '../../components/exports'

import './ChampSelectPage.scss'

export const ChampSelectPage: React.FC = () => {
  const { themeMode }: any = useContext(ThemeContext as any)

  const [summonerNames, setSummonerNames] = useState<string[]>([])
  const [summonerData, setSummonerData] = useState<any>([])

  useEffect(() => {}, [])

  useEffect(() => {
    if (summonerNames.length === 5) querySummonerData(summonerNames)
  }, [summonerNames])

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
    console.log(parsedSummonerNames)

    if (parsedSummonerNames.length === 5) {
      console.log(parsedSummonerNames)
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
            backgroundColor: `${(theme as any)[themeMode].colors.secondary}`
          }}
        />
        <Grid container direction="row" justify="center">
          {summonerData &&
            Object.keys(summonerData).map(
              (summonerObjKey: string, i: number) => {
                return (
                  <SummonerProfileData
                    key={i}
                    summonerData={summonerData}
                    summonerObjKey={summonerObjKey}
                  />
                )
              }
            )}
        </Grid>
      </div>
    </>
  )
}

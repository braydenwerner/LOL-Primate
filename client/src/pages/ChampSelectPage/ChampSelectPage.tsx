import React, { useRef, useState, useEffect, useContext } from 'react'
import { Grid, TextField } from '@material-ui/core'

import { ThemeContext } from '../../AppProvider'
import { theme } from '../../styles/exports'

import './ChampSelectPage.scss'

export const ChampSelectPage: React.FC = () => {
  const { themeMode }: any = useContext(ThemeContext as any)

  const textRef = useRef<any>(null)

  const [summonerNames, setSummonerNames] = useState<string[]>([])
  const [summonerData, setSummonerData] = useState<any>([])

  useEffect(() => {}, [])

  useEffect(() => {
    if (summonerNames.length === 5) querySummonerData(summonerNames)
  }, [summonerNames])

  const handleTextChange = () => {
    if (!textRef.current) return
    let value = textRef.current.value

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
      console.log(parsedSummonerNames)
      textRef.current.value = ''
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
          ref={textRef}
          multiline
          onChange={handleTextChange}
          rowsMax={5}
          InputLabelProps={{
            shrink: true
          }}
          placeholder="xtremesoccer2012 joined the lobby
          mineturtle20 joined the lobby
          lokimonsta joined the lobby
          arotheawesome joined the lobby
          placerwiz joined the lobby"
          style={{
            backgroundColor: `${(theme as any)[themeMode].colors.secondary}`
          }}
        />
        <button onClick={() => querySummonerData(['xtdasdweqeqr'])}>
          Click
        </button>
        <Grid container direction="row" justify="center">
          {summonerData &&
            Object.keys(summonerData).map((summonerObjKey) => {
              return (
                <Grid
                  className="summoner-data-container"
                  item
                  xs={3}
                  spacing={5}
                >
                  {Object.keys(summonerData[summonerObjKey]).map(
                    (key: string, i: number) => {
                      return (
                        <div
                          key={i}
                          style={{
                            color: `${
                              (theme as any)[themeMode].colors.primaryText
                            }`
                          }}
                        >
                          {key}: {summonerData[summonerObjKey][key] + ''}
                        </div>
                      )
                    }
                  )}
                </Grid>
              )
            })}
        </Grid>
      </div>
    </>
  )
}

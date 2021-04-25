import React, { useRef, useState, useEffect, useContext } from 'react'

import { ThemeContext } from '../../AppProvider'
import { theme } from '../../styles/exports'

import './ChampSelectPage.scss'

export const ChampSelectPage: React.FC = () => {
  const { themeMode }: any = useContext(ThemeContext as any)
  const textRef = useRef(null)

  const [summonerNames, setSummonerNames] = useState<string[]>([])
  const [summonerData, setSummonerData] = useState<any>([])

  useEffect(() => {}, [])

  useEffect(() => {
    querySummonerData(summonerNames)
  }, [summonerNames])

  const querySummonerData = async (summonerNames: string[]) => {
    const res = await fetch('http://localhost:3000/getSummonerData', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ summonerNames })
    })
    const summonerObj = await res.json()
    setSummonerData(summonerObj)
  }

  return (
    <>
      <textarea
        id="champ-select-paste-textarea"
        ref={textRef}
        rows={6}
        placeholder="
      xtremesoccer2012 joined the lobby
      test joined the lobby"
        style={{
          backgroundColor: `${(theme as any)[themeMode].colors.secondary}`
        }}
      ></textarea>
      <button onClick={() => querySummonerData(['lokimonsta'])}>Click</button>
      {summonerData &&
        Object.keys(summonerData).map((summonerObjKey) => {
          return Object.keys(summonerData[summonerObjKey]).map(
            (key: string, i: number) => {
              return (
                <div
                  key={i}
                  style={{
                    color: `${(theme as any)[themeMode].colors.primaryText}`
                  }}
                >
                  {key}: {summonerData[summonerObjKey][key] + ''}
                </div>
              )
            }
          )
        })}
    </>
  )
}

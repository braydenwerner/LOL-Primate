import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const getBySummonerName = async (summonerName: string) => {
  try {
    const res = await axios.get(
      encodeURI(
        `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_API_KEY}`,
      ),
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const getLeagueEntriesForSummoner = async (summonerID: string) => {
  try {
    const res = await axios.get(
      encodeURI(
        `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerID}?api_key=${process.env.RIOT_API_KEY}`,
      ),
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const handleSummonerData = async (summonerNames: string) => {
  const summonerData: any = {}
  for (const summonerName of summonerNames) {
    const profileData = await getBySummonerName(summonerName)
    if (!profileData) {
      return { error: 'Input contains an invalid summoner name!' }
    }

    const rankedData = (
      await getLeagueEntriesForSummoner(profileData.id)
    ).filter((obj: any) => obj.queueType === 'RANKED_SOLO_5x5')

    summonerData[summonerName] = {
      ...profileData,
      ...(rankedData.length > 0 ? rankedData[0] : {}),
    }
  }
  return summonerData
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('reached on server')
  if (!req.body || !req.body.summonerNames) return res.status(400)

  const summonerData = await handleSummonerData(
    req.body.summonerNames,
  )
  res.status(200).json(summonerData)
}

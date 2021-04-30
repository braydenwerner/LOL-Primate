import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const getMatchOverview = async (encryptedAccountId: string) => {
  try {
    const res = await axios.get(
      encodeURI(
        `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${encryptedAccountId}?queue=420&endIndex=100&beginIndex=0&api_key=${process.env.RIOT_API_KEY}`,
      ),
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export const handleSummonerMatchOverviews = async (
  encryptedAccountIds: string,
) => {
  const matchData: { [id: string]: string } = {}
  for (const id of encryptedAccountIds) {
    const matchOverview = await getMatchOverview(id)
    if (!matchOverview || !matchOverview.matches) continue
    matchData[id] = matchOverview.matches
  }
  return matchData
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body || !req.body.encryptedAccountIds)
    return res.status(400)

  const summonerMatchData = await handleSummonerMatchOverviews(
    req.body.encryptedAccountIds,
  )
  res.status(200).json(summonerMatchData)
}

import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { convertChampId } from '../../util/convertChampId';

let count = 0;
const getMatchOverview = async (matchId: string) => {
    count++;
    try {
        const res = await axios.get(
            encodeURI(
                `https://na1.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${process.env.RIOT_API_KEY}`
            ),
        )
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const handleSpecificMatchOverviews = async (
    summonerId: string,
    summonerMatches: any,
) => {
    const tempMatchData = []

    for (const matchId of summonerMatches) {
        const specificMatch = await getMatchOverview(matchId)
        if (!specificMatch) continue;

        const participantObj = specificMatch.participantIdentities.find((p: any) => p.player.accountId === summonerId)
        if (!participantObj) continue;

        //  subtract 1, api starts counting from 1-10 players in game
        const participantNum = participantObj.participantId - 1
        const summonerMatchStats = specificMatch.participants[participantNum]
        if (!summonerMatchStats) continue;

        tempMatchData.push({
            "champion": await convertChampId(summonerMatchStats.championId),
            "kills": summonerMatchStats.stats.kills,
            "deaths": summonerMatchStats.stats.deaths,
            "assists": summonerMatchStats.stats.assists,
            "win": summonerMatchStats.stats.win
        })
    }
    console.log(tempMatchData)
    return tempMatchData;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.body)
    if (!req.body || !req.body.summonerMatches || !req.body.summonerId)
        return res.status(400)

    const specificMatches = await handleSpecificMatchOverviews(
        req.body.summonerId,
        req.body.summonerMatches,
    )
    console.log(count)
    res.status(200).json(specificMatches)
}

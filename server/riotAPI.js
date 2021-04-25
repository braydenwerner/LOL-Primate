const axios = require('axios')

const getBySummonerName = async (summonerName) => {
  try {
    const res = await axios.get(
      encodeURI(
        `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_API_KEY}`
      )
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const getLeagueEntriesForSummoner = async (summonerID) => {
  try {
    const res = await axios.get(
      encodeURI(
        `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerID}?api_key=${process.env.RIOT_API_KEY}`
      )
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const getMatchIDs = async (puuid) => {
  try {
    const res = await axios.get(
      encodeURI(
        `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${process.env.RIOT_API_KEY}`
      )
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const getMatchData = async (matchID) => {
  try {
    const res = await axios.get(
      encodeURI(
        `https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${process.env.RIOT_API_KEY}`
      )
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}

//  append responses into single object
const getSummonerData = async (summonerNames) => {
  const summonerData = {}
  for (summonerName of summonerNames) {
    const profileData = await getBySummonerName(summonerName)
    if (!profileData) {
      return { error: 'Input contains an invalid summoner name!' }
    }

    const rankedData = (
      await getLeagueEntriesForSummoner(profileData.id)
    ).filter((obj) => obj.queueType === 'RANKED_SOLO_5x5')

    summonerData[summonerName] = {
      ...profileData,
      ...(rankedData.length > 0 ? rankedData[0] : {})
    }
  }
  return summonerData
}

const getSummonerMatchData = async (summonerPUUIDs) => {
  const matchData = {}
  for (PUUID of summonerPUUIDs) {
    const matchIDs = await getMatchIDs(PUUID)
    if (!matchIDs) return { error: 'Invalid match IDs' }

    for (const matchID of matchIDs) {
      matchData[matchID] = await getMatchData(matchID)
      if (!matchData) {
        return { error: 'Invalid match data' }
      }
    }
  }
  return matchData
}

module.exports = { getSummonerData, getSummonerMatchData }

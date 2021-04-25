const axios = require('axios')

const getBySummonerName = async (summonerName) => {
  const res = await axios.get(
    `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_API_KEY}`
  )
  return res.data
}

const getLeagueEntriesForSummoner = async (summonerID) => {
  const res = await axios.get(
    `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerID}?api_key=${process.env.RIOT_API_KEY}`
  )
  return res.data
}

const getMatchIDs = async (puuid) => {
  const res = await axios.get(
    `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${process.env.RIOT_API_KEY}`
  )
  return res.data
}

const getMatchData = async (matchID) => {
  const res = await axios.get(
    `https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${process.env.RIOT_API_KEY}`
  )
  return res.data
}

//   function gets data from three APIs and appends the data
//  into one object
const getSummonerData = async (summonerNames) => {
  const summonerData = {}
  for (summonerName of summonerNames) {
    const profileData = await getBySummonerName(summonerName)

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

    for (const matchID of matchIDs) {
      matchData[matchID] = await getMatchData(matchID)
    }
  }
  return matchData
}

module.exports = { getSummonerData, getSummonerMatchData }

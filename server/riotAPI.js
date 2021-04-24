const axios = require('axios')

const API_KEY = 'RGAPI-ba80f868-b434-41ad-b24c-7c5626fa3935'

const getBySummonerName = async (summonerName) => {
  const res = await axios.get(
    `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`
  )
  return res.data
}

const getLeagueEntriesForSummoner = async (summonerID) => {
  const res = await axios.get(
    `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerID}?api_key=${API_KEY}`
  )

  return res.data
}

const getSummonerData = async (summonerNames) => {
  const summonerData = {}
  for (summonerName of summonerNames) {
    const profileData = await getBySummonerName(summonerName)
    let matchData = await getLeagueEntriesForSummoner(profileData.id)

    matchData = matchData.filter((obj) => obj.queueType === 'RANKED_SOLO_5x5')
    summonerData[summonerName] = {
      ...profileData,
      ...(matchData.length > 0 ? matchData[0] : {})
    }
  }

  return summonerData
}

module.exports = { getSummonerData }

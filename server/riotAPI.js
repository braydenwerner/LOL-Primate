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

const getMatchOverview = async (encryptedAccountId) => {
  try {
    const res = await axios.get(
      encodeURI(
        `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${encryptedAccountId}?queue=420&endIndex=100&beginIndex=0&api_key=${process.env.RIOT_API_KEY}`
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

//  gets 100 most recent ranked matches from all 5 teammates
const getSummonerMatchOverviews = async (encryptedAccountIds) => {
  const matchData = {}
  for (id of encryptedAccountIds) {
    const matchOverview = await getMatchOverview(id)
    if (!matchOverview || !matchOverview.matches) continue
    matchData[id] = matchOverview.matches
  }
  return matchData
}

const getSummonerMasteryData = async (summonerID) => {}

module.exports = {
  getSummonerData,
  getSummonerMatchOverviews,
  getSummonerMasteryData
}

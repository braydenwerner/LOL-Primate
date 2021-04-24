const axios = require('axios')

const getData = async () => {
  const res = await axios.get(
    'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/mineturtle20?api_key=RGAPI-ba80f868-b434-41ad-b24c-7c5626fa3935'
  )
  console.log(res.data)
}
getData()

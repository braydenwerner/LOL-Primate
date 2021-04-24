const express = require('express')
const app = express()
const cors = require('cors')

const { getSummonerData } = require('./riotAPI')

app.use(cors())
app.use(express.json())

app.get('/getBySummonerName', async (req, res) => {
  if (!req.body || !req.body.summonerNames) return

  const summonerData = await getSummonerData(req.body.summonerNames)
  return res.json(summonerData)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Server is live'))

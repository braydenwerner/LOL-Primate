const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const { getSummonerData, getSummonerMatchData } = require('./riotAPI')

app.use(cors())
app.use(express.json())

app.post('/getSummonerData', async (req, res) => {
  if (!req.body || !req.body.summonerNames) return res.status(400)

  const summonerData = await getSummonerData(req.body.summonerNames)
  res.status(200).json(summonerData)
})

app.post('/getSummonerMatchData', async (req, res) => {
  if (!req.body || !req.body.summonerPUUIDs) return res.status(400)

  const summonerMatchData = await getSummonerMatchData(req.body.summonerPUUIDs)
  res.status(200).json(summonerMatchData)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Server is live'))

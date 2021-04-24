const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const { getSummonerData, getSummonerMatchData } = require('./riotAPI')

app.use(cors())
app.use(express.json())

app.get('/getSummonerData', async (req, res) => {
  if (!req.body || !req.body.summonerNames) return

  const summonerData = await getSummonerData(req.body.summonerNames)
  res.status(200).json(summonerData)
})

app.get('/getSummonerMatchData', async (req, res) => {
  if (!req.body || !req.body.summonerPUUIDs) return

  const summonerMatchData = await getSummonerMatchData(req.body.summonerPUUIDs)
  res.status(200).json(summonerMatchData)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Server is live'))

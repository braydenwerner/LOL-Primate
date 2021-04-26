const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const {
  getSummonerData,
  getSummonerMatchOverviews,
  getSummonerMasteryData
} = require('./riotAPI')

app.use(cors())
app.use(express.json())

app.post('/getSummonerData', async (req, res) => {
  if (!req.body || !req.body.summonerNames) return res.status(400)

  const summonerData = await getSummonerData(req.body.summonerNames)
  res.status(200).json(summonerData)
})

app.post('/getSummonerMatchOverviews', async (req, res) => {
  if (!req.body || !req.body.encryptedAccountIds) return res.status(400)

  const summonerMatchData = await getSummonerMatchOverviews(
    req.body.encryptedAccountIds
  )
  res.status(200).json(summonerMatchData)
})

app.post('/getSummonerMasteryData', async (req, res) => {
  if (!req.body || !req.body.summonerNames) return res.status(400)

  const masteryData = await getSummonerMasteryData(req.body.summonerNames)
  res.status(200).json(masteryData)
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log('Server is live'))

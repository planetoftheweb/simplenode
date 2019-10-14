if (!process.env.now) {
  require('dotenv').config()
}

const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = process.env.now ? 8080 : 4000

async function getWeather() {
  const config = {
    secret: process.env.darksky_secret,
    location: '28.550,-81.40', // This is Orlando
    lang: 'en',
    units: 'si',
    exclude: 'minutely,hourly,daily,alerts,flags'
  }
  const weatherAPI = `https://api.darksky.net/forecast/${config.secret}/${config.location}?lang=${config.lang}&units=${config.units}&exclude=${config.exclude}`
  const response = await fetch(weatherAPI)
  return response.json()
}
app.get('/weather', (req, res) => {
  getWeather().then(weather => {
    console.log('syou')
    res.json(weather)
  })
})
const server = app.listen(port)

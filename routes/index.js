var express = require('express')
var router = express.Router()
var http = require('http')
var https = require('https')
const parse5 = require('parse5')
const DarkSkyApi = require('dark-sky-api')
DarkSkyApi.apiKey = '07cfbe2706d2acfc30cc264a50dab110'
DarkSkyApi.proxy = true
const position = {
  latitude: '41.4835',
  longitude: '-87.5104'
}

function getForecast (callback) {
  DarkSkyApi.loadForecast(position)
  .then(result => {
    callback(result)
  })
}

/* GET home page. */
router.get('/', function (req, res, next) {
  var forecastPromise = new Promise((resolve, reject) => {
    getForecast(forecast => {
      resolve(forecast)
    })
  })
  var imageOfTheDayPromise = getImageOfTheDay()
  Promise.all([
    forecastPromise,
    imageOfTheDayPromise
  ]).then((results) => {
    var forecast = results[0]
    var imageOfTheDay = results[1]
    res.render('quad', {
      title: 'Dashboard',
      calendar: {
        type: 'agenda'
      },
      forecast: forecast,
      iconMap: {
        'clear-day': 'wi-day-sunny',
        'clear-night': 'wi-night-clear',
        'rain': 'wi-rain',
        'snow': 'wi-snow',
        'sleet': 'wi-sleet',
        'wind': 'wi-strong-wind',
        'fog': 'wi-smog',
        'cloudy': 'wi-cloudy',
        'partly-cloudy-day': 'wi-day-cloudy',
        'partly-cloudy-night': 'wi-night-alt-cloudy',
        'hail': 'wi-meteor',
        'thunderstorm': 'wi-thunderstorm',
        'tornado': 'wi-tornado'
      },
      imageOfTheDay: imageOfTheDay
    })
  })
})

function getImageOfTheDay (url) {
  return new Promise((resolve, reject) => {
    getPage('https://apod.nasa.gov/apod/astropix.html')
    .then(page => {
      var src = page.match(/<img\ssrc\=[\'\"](.+)[\'\"]/i)
      if (src[1]) {
        resolve('https://apod.nasa.gov/apod/' + src[1])
      } else {
        resolve('')
      }
      // const document = parse5.parse(page)
      // var images = document.getElementsByTagName('img')
      // resolve(images[0].src)
    }).catch(err => { reject(err) })
  })
}

function getPage (url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      var statusCode = res.statusCode
      var error = false
      if (statusCode >= 300) {
        error = new Error('Request Failed.\n' +
                          `Status Code: ${statusCode}`)
      }
      if (error) {
        console.error(error.message)
        // consume response data to free up memory
        res.resume()
        reject(error)
      }

      res.setEncoding('utf8')
      var rawData = ''
      res.on('data', (chunk) => { rawData += chunk })
      res.on('end', () => {
        try {
          // console.log(rawData)
          resolve(rawData)
        } catch (e) {
          console.error(e.message)
          reject(e.message)
        }
      })
    }).on('error', (e) => {
      console.error(`Got error: ${e.message}`)
      reject(e.message)
    })
  })
}

module.exports = router

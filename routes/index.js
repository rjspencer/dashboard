var express = require('express')
var router = express.Router()
const DarkSkyApi = require('dark-sky-api')
DarkSkyApi.apiKey = '07cfbe2706d2acfc30cc264a50dab110'
DarkSkyApi.proxy = true
const position = {
  latitude: '41.4835',
  longitude: '-87.5104'
}

function getForecast(res, callback) {
  DarkSkyApi.loadForecast(position)
  .then(function (result) {
    console.log(result.daily.data[0])
    callback(res, result)
  })
}

/* GET home page. */
router.get('/', function (req, res, next) {
  getForecast(res, function (res, forecast) {
    res.render('index', {
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
      }
    })
  })
})

module.exports = router

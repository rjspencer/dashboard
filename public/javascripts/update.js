var Update = {
  intervalSeconds: 60 * 90, // Update every 90mins
  iframes: [],
  imageOfTheDay: {},

  init: function () {
    this.iframes = document.getElementsByTagName('iframe')
    Update.startService()
  },

  startService: function () {
    this.interval = setInterval(this.service.bind(this), this.intervalSeconds * 1000)
  },

  terminateService: function () {
    clearInterval(this.interval)
  },

  service: function () {
    location.reload(true)
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  Update.init()
})

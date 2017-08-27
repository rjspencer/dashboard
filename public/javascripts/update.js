var Update = {
  intervalSeconds: 60 * 30, // Update every 30mins
  iframes: [],

  init: function () {
    this.iframes = document.getElementsByTagName('iframe')
    Update.startService()
  },

  startService: function () {
    this.interval = setInterval(this.service.bind(this), this.intervalSeconds)
  },

  terminateService: function () {
    clearInterval(this.interval)
  },

  service: function () {
    // console.log(this)
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  Update.init()
})

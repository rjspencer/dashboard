var ViewAnimate = {
  interval: 10000,
  views: [
    {
      'element': {},
      'id': 'top-left'
    },
    {
      'element': {},
      'id': 'top-right'
    },
    {
      'element': {},
      'id': 'bottom-left'
    },
    {
      'element': {},
      'id': 'bottom-right'
    }
  ],

  init: function () {
    console.log('Initializing ViewAnimate.')
    this.views.forEach((item, index) => {
      this.views[index].element = document.getElementById(item.id)
    })
    this.current = this.views.shift()
    this.setView(this.current)
    this.loopViews()
  },

  unsetView: function (view) {
    view.element.className = view.element.className.replace(' active', '')
  },

  setView: function (view) {
    view.element.className = view.element.className + ' active'
  },

  loopViews: function () {
    var viewInterval = setInterval(function () {
      this.unsetView(this.current)
      this.views.push(this.current)
      this.current = this.views.shift()
      this.setView(this.current)
    }.bind(this), this.interval)
  }
}

ViewAnimate.init()

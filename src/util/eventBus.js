class EventBus {
  constructor() {
    this.events = this.events || {}
  }
}
EventBus.prototype.emit = function (type, ...args) {
  let e = this.events[type] || []
  for (let i = 0; i < e.length; i++) {
    e[i].apply(this, args)
  }
}

EventBus.prototype.addListener = function (eventType, fun) {
  const [type, id] = eventType.split('#')

  if (id) {
    this.events[eventType] = [fun]
  } else {
    this.events[type] = this.events[type] || []
    this.events[type].push(fun)
  }
}
EventBus.prototype.on = EventBus.prototype.addListener
EventBus.prototype.remove = function (eventType) {
  const [type, id] = eventType.split('#')
  if (id) {
    delete this.events[eventType]
  } else {
    delete this.events[type]
  }
}

EventBus.prototype.off = EventBus.prototype.remove

const eventBus = new EventBus()

export { eventBus }

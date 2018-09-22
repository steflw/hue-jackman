import EventEmitter from 'events'

export default class HueBot extends EventEmitter {
  handleMessageIntent(entities, senderId) {
    const location = entities.location[0].value,
        intent = entities.intent[0].value,
        intentValue = entities[intent][0].value;
    this.emit(intent, {
      intentValue,
      location,
      senderId
    });
    console.log(`${location} to ${intentValue}`)
  }
}

import HueBot from "../bot/bot";

export const hueBot = new HueBot();

hueBot.on('on_off', (obj) => {
  console.log('event fired on_off', obj)
  // Send hue request
  // emit error or handle error + try again up to 3 times?
  // Send text response
});

hueBot.on('brightness', ({location, value, senderId}) => {
  console.log('event fired brightness')
});

hueBot.on('colour', ({location, value}) => {
  console.log('event fired colour')
});

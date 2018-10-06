import HueBot from "../bot/bot";
import { getCachedResponse } from "./cache";

export const hueBot = new HueBot();

hueBot.on('on_off', (obj) => {
  console.log('event fired on_off', obj)
  getCachedResponse('/groups').then(res => {
    console.log('res', res)
    for (let group in res) {
      if (res[group].name.toLowerCase() === obj.location.toLowerCase()) {
        console.log('selected grp', group)
      }
    }
  })
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

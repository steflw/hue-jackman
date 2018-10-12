import HueBot from "../bot/bot";
import hueApi from './hue-api';

export const hueBot = new HueBot();

hueBot.on('on_off', async (obj) => {
  console.log('event fired on_off', obj)
  // await getGroup(obj.location)
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

const getGroup = async (location) => {
  const groups = await hueApi.getLightGroups()
  for (let group in groups) {
    if (groups[group].name.toLowerCase() === location.toLowerCase()) {
      console.log('selected grp', groups[group])
      return groups[group]
    }
  }
};

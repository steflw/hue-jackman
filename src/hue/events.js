import HueBot from "../bot/bot";
import hueApi from './hue-api';
import send from '../api-helpers/send';
import { UNKNOWN_ROOM_RESPONSE } from '../bot/responses';

export const hueBot = new HueBot();

hueBot.on('on_off', async (message) => {
  console.log('event fired on_off', message)
  const groups = await hueApi.getLightGroups()
  const group = getGroupByLocation(groups, message.location)
  if (group) {
    console.log('--- group', group)
    hueApi.turnOnGroup(group.groupId, message.intentValue)
  } else {
    console.log('---', message.senderId)
    send.textMessage(message.senderId, UNKNOWN_ROOM_RESPONSE)
  }
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

export const getGroupByLocation = (groups, location) => {
  for (let groupId in groups) {
    if (groups[groupId].name.toLowerCase() === location.toLowerCase()) {
      return { groupId, ...groups[groupId] }
    }
  }
};

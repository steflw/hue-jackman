import HueBot from '../bot/bot';
import hueApi from './hue-api';
import send from '../api-helpers/send';
import {
  REQUEST_FAILED_RESPONSE,
  REQUEST_FULLFILLED_RESPONSE,
  UNKNOWN_ROOM_RESPONSE
} from '../bot/responses';

export const hueBot = new HueBot();

hueBot.on('on_off', async (message) => {
  console.log('event fired on_off', message)
  const groups = await hueApi.getLightGroups()
  const group = getGroupByLocation(groups, message.location)
  if (group) {
    try {
      await hueApi.setGroupOnOffState(group.groupId, message.intentValue)
      send.textMessage(message.senderId, REQUEST_FULLFILLED_RESPONSE)
    } catch (e) {
      console.log(e);
      send.textMessage(message.senderId, REQUEST_FAILED_RESPONSE)
    }
  } else {
    send.textMessage(message.senderId, UNKNOWN_ROOM_RESPONSE)
  }
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

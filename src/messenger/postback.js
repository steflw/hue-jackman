import hueApi from '../hue/api';
import send from '../messenger/send';
import {
  REQUEST_FAILED_RESPONSE,
  REQUEST_FULLFILLED_RESPONSE,
  UNKNOWN_ROOM_RESPONSE
} from '../bot/responses';
import { getGroupByLocation } from '../hue/events';

export const handlePostback = async ({ postback, sender }) => {
  switch (postback.payload) {
    case 'LIST_LIGHT_GROUPS':
      try {
        const groups = await hueApi.getLightGroups();
        const response = Object.keys(groups).map(key => groups[key].name);
        send.textMessage(sender.id, response.join(', '))
      } catch (e) {
        send.textMessage(sender.id, `${REQUEST_FAILED_RESPONSE} ${e.message}`)
      }
      break;

    case 'TOGGLE_LIVING_ROOM':
      await toggleGroupState('Living Room', sender.id);
      break;

    case 'TOGGLE_ISLAND':
      await toggleGroupState('Island', sender.id);
      break;

    default:
      send.textMessage(sender.id, `Sorry this postback isn't supported :(`)
  }
};

const toggleGroupState = async (loc, senderId) => {
  const groups = await hueApi.getLightGroups();
  const group = getGroupByLocation(groups, loc);
  if (group) {
    try {
      await hueApi.setGroupOnOffState(group.groupId, !group.action.on);
      send.textMessage(senderId, REQUEST_FULLFILLED_RESPONSE);
    } catch (e) {
      console.log(e);
      send.textMessage(senderId, REQUEST_FAILED_RESPONSE);
    }
  } else {
    send.textMessage(senderId, UNKNOWN_ROOM_RESPONSE);
  }
};

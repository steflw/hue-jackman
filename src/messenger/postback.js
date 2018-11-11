import hueApi from '../hue/api';
import send from '../messenger/send';
import { REQUEST_FAILED_RESPONSE, REQUEST_FULLFILLED_RESPONSE, UNKNOWN_ROOM_RESPONSE } from '../bot/responses';
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
      const groups = await hueApi.getLightGroups();
      const group = getGroupByLocation(groups, 'Living Room');
      if (group) {
        try {
          await hueApi.setGroupOnOffState(group.groupId, !group.action.on);
          send.textMessage(sender.id, REQUEST_FULLFILLED_RESPONSE);
        } catch (e) {
          console.log(e);
          send.textMessage(sender.id, REQUEST_FAILED_RESPONSE);
        }
      } else {
        send.textMessage(sender.id, UNKNOWN_ROOM_RESPONSE);
      }

      break;
    default:
      send.textMessage(sender.id, `Sorry this postback isn't supported :(`)
  }
};

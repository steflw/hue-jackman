import hueApi from '../hue/api';
import send from '../messenger/send';
import { REQUEST_FAILED_RESPONSE } from '../bot/responses';

export const handlePostback = async ({ postback, sender }) => {
  if (postback.payload === 'LIST_LIGHT_GROUPS') {
    try {
      const groups = await hueApi.getLightGroups();
      const response = Object.keys(groups).map(key => groups[key].name);
      send.textMessage(sender.id, response.join(', '))
    } catch (e) {
     send.textMessage(sender.id, `${REQUEST_FAILED_RESPONSE} ${e.message}`)
    }
  } else {
    send.textMessage(sender.id, `Sorry this postback isn't supported :(`)
  }
};

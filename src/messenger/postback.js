import hueApi from '../hue/api';
import send from '../messenger/send';

export const handlePostback = async ({ postback, sender }) => {
  if (postback.payload === 'LIST_LIGHT_GROUPS') {
    const groups = await hueApi.getLightGroups();
    const response = Object.keys(groups).map(key => groups[key].name);
    send.textMessage(sender.id, response.join(', '))
  }
};

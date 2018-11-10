import hueApi from '../hue/api';
import send from '../messenger/send';

export const handlePostback = async ({ postback, sender }) => {
  if (postback.payload === 'LIST_LIGHT_GROUPS') {
    const { data: groups } = await hueApi.getLightGroups();
    console.log('groups', groups)
    const response = Object.keys(groups).map(key => groups[key].name);
    console.log('response', response)
    send.textMessage(sender.id, response.join(', '))
  }
};

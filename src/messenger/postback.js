import hueApi from '../hue/api'
import send from '../messenger/api'

export const handlePostback = async ({ postback, sender}) => {
  console.log('payload', postback)
  if (postback.payload === 'LIST_LIGHT_GROUPS') {
    const groups = await hueApi.getLightGroups()
    console.log('groups', groups)
    // send.textMessage(sender.id, )
  }
}
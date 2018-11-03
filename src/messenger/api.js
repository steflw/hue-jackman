import axios from 'axios'

const callMessengerApi = (endPoint, messageData, retries = 3) => {
  if (!endPoint) {
    console.error('callApi requires a specific endpoint.');
    return
  }

  if (retries === 0) {
    console.error(`No more retries left, request to ${endPoint} failed\n`);
    return
  }

  const params = { access_token: process.env.PAGE_ACCESS_TOKEN };

  axios({
    method: 'post',
    url: `https://graph.facebook.com/v2.6/me/${endPoint}`,
    data: messageData,
    params: params
  })
  .then(() => {
    console.log(`Success: sent message to ${endPoint} endpoint`)
  })
  .catch(({response}) => {
    if (retries === 3) {
      console.error(
          `There was an error calling ${endPoint}.`,
          `\n(${response.status}) ${response.statusText}:`,
          response.data.error.message
      )
    }
    console.log(`Retrying request to ${endPoint}...`);
    callMessengerApi(endPoint, messageData, retries - 1)
  })
}

export const callThreadApi = messageData => {
  return callMessengerApi('messenger_profile', messageData)
}

export const callMessagesApi = messageData => {
  return callMessengerApi('messages', messageData)
}

require('dotenv').load();
import axios from 'axios';
import { cacheResponse, getCachedResponse } from './cache'

export const hueBridge = axios.create({
  baseURL: `http://${process.env.BRIDGE_IP}/api/${process.env.BRIDGE_USERNAME}`,
});

hueBridge.interceptors.response.use(res => {
  cacheResponse(res);
  return res
}, err => {
  console.log(`error at hueBridge response interception ${err}`);
  throw err
});

export default {
  async getHueEndpoint(endPoint, retries = 3) {
    if (retries === 0) {
      console.error(`No more retries left, request to hue bridge "${endPoint}" failed\n`);
      return
    }

    let response;
    try {
      response = await getCachedResponse(endPoint) || await hueBridge.get(endPoint);
      console.log('response', response)
    } catch (error) {
      if (retries === 3) {
        console.error(
          `There was an error calling ${endPoint}.`,
          `\n(${error.status}) ${error.statusText}:`,
          error.message
        )
      }
      return await this.getHueEndpoint(endPoint, retries - 1)
    }
    return response
  }
}

export const getLightGroups = () => getHueEndpoint('/groups');

export const getLights = () => getHueEndpoint('/lights');

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
  console.error(`error at hueBridge response interception ${err}`);
  throw err
});

export default {
  async getHueEndpoint(endPoint, retries = 3) {
    try {
      return await getCachedResponse(endPoint) || await hueBridge.get(endPoint);
    } catch (error) {
      console.error(
        `There was an error calling ${endPoint}.`,
        `\n(${error.status}) ${error.statusText}:`,
        error.message
      );

      if (retries === 0) {
        console.error(`No more retries left, request to hue bridge "${endPoint}" failed\n`);
        return error
      }

      return await this.getHueEndpoint(endPoint, retries - 1)
    }
  },

  getLightGroups() {
    return this.getHueEndpoint('/groups')
  },

  getLights() {
    return this.getHueEndpoint('/lights')
  }
}

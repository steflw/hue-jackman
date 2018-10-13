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
      return await hueBridge.get(endPoint)
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

      return this.getHueEndpoint(endPoint, retries - 1)
    }
  },

  async getHue(endpoint) {
    return await getCachedResponse(endpoint) || await this.getHueEndpoint(endpoint)
  },

  getLightGroups() {
    return this.getHue('/groups')
  },

  getLightGroup(groupId) {
    return this.getHue(`/groups/${groupId}`)
  },

  getLights() {
    return this.getHue('/lights')
  }
}

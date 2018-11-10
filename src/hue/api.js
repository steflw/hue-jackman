require('dotenv').load();
import axios from 'axios';
// import { cacheResponse, getCachedResponse } from './cache';

export const hueBridge = axios.create({
  baseURL: `http://${process.env.BRIDGE_IP}/api/${process.env.BRIDGE_USERNAME}`
});

export default {
  async getHueEndpoint(endPoint, retries = 3) {
    try {
      const response = await hueBridge.get(endPoint);
      return response.data
    } catch (error) {
      console.error(
        `There was an error calling ${endPoint}.`,
        `\n(${error.status}) ${error.statusText}:`,
        error.message
      );

      if (retries === 0) {
        console.error(`No more retries left, request to hue bridge "${endPoint}" failed\n`);
        return error;
      }

      return this.getHueEndpoint(endPoint, retries - 1);
    }
  },

  async setHueState(endPoint, params, retries = 3) {
    try {
      return await hueBridge.put(endPoint, params);
    } catch (error) {
      console.error(
        `There was an error calling ${endPoint}.`,
        `\n(${error.status}) ${error.statusText}:`,
        error.message
      );

      if (retries === 0) {
        console.error(`No more retries left, put request to hue bridge "${endPoint}" failed\n`);
        return error;
      }

      return this.getHueEndpoint(endPoint, retries - 1);
    }
  },

  // async getHue(endpoint) {
  //   // return await getCachedResponse(endpoint) || await this.getHueEndpoint(endpoint)
  //   return this.getHueEndpoint(endpoint)
  // },

  getLightGroups() {
    return this.getHueEndpoint('/groups');
  },

  setGroupOnOffState(groupId, value) {
    let onOff;
    if (value == 'on') onOff = true;
    else onOff = false;
    return this.setHueState(`/groups/${groupId}/action`, { on: onOff });
  },

  // getLightGroup(groupId) {
  //   return this.getHue(`/groups/${groupId}`);
  // },
  //
  // getLights() {
  //   return this.getHue('/lights');
  // }
};

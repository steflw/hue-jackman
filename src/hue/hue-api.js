import axios from 'axios';
import { cacheResponse, getCachedResponse } from './cache'

const hueBridge = axios.create({
  baseURL: `http://${process.env.BRIDGE_IP}/api/${process.env.BRIDGE_USERNAME}`,
});

hueBridge.interceptors.response.use(res => {
  cacheResponse(res);
  return res
}, err => console.log(`error at hueBridge response interception ${err}`));

export const getHueEndpoint = async endpoint =>
  await getCachedResponse(endpoint) || hueBridge.get(endpoint);

export const getLightGroups = () => getHueEndpoint('/groups');

export const getLights = () => getHueEndpoint('/lights');

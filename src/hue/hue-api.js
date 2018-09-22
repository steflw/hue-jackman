require('dotenv').load();
import axios from 'axios';
import { cacheResponse, getCachedResponse } from './cache'

const hueBridge = axios.create({
  baseURL: `http://${process.env.BRIDGE_IP}/api/${process.env.BRIDGE_USERNAME}`,
});

hueBridge.interceptors.response.use(res => {
  cacheResponse(res);
  return res
}, err => {
  console.log(`error at hueBridge response interception ${err}`);
  return err
});

// TODO test
export const getHueEndpoint = async endpoint => {
  let response;
  try {
    response = await getCachedResponse(endpoint) || await hueBridge.get(endpoint)
  } catch (e) {
      console.log('caught error', e);
      return e
  }
  return response
};


export const getLightGroups = () => getHueEndpoint('/groups');

export const getLights = () => getHueEndpoint('/lights');

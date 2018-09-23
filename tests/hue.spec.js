import expect from 'expect';
import nock from 'nock';
import sinon from 'sinon';

import api from '../src/hue/hue-api';
import { lightGroupsResponse } from "./hue-mock";

const baseURL = `http://${process.env.BRIDGE_IP}/api/${process.env.BRIDGE_USERNAME}`

describe('hue-api.js', function () {

  describe('getHueEndpoint', function () {
    it('should return expected result from hue bridge endpoint', async function () {
      nock(baseURL)
      .get('/groups')
      .reply(200, lightGroupsResponse);
      const response = await api.getHueEndpoint('/groups')
      expect(response.data).toEqual(lightGroupsResponse)
    });

    it('should make request to expected hue bridge endpoint', async function () {
      nock(baseURL)
      .get('/groups')
      .times(3)
      .reply(500, {});
      const spy = sinon.spy(api, 'getHueEndpoint');
      const error = await api.getHueEndpoint('/groups');
      console.log('error', error)
      expect(error.response.status).toEqual(500);
      expect(spy.callCount).toEqual(3);
    });
  });

  describe('getLightGroups', function () {
    it('should return light groups', async function () {
      nock(baseURL)
      .get('/groups')
      .reply(200, lightGroupsResponse);
      const lightGroups = await api.getLightGroups();
      expect(lightGroups.data).toEqual(lightGroupsResponse)
    });
  });
});

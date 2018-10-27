import expect from 'expect';
import nock from 'nock';
import sinon from 'sinon';

import api from '../src/hue/hue-api';
import { lightGroupsResponse } from "./hue-mock";
import { getGroupByLocation } from "../src/hue/events";

const baseURL = `http://${process.env.BRIDGE_IP}/api/${process.env.BRIDGE_USERNAME}`

describe('hue-api.js', function () {

  afterEach(() => nock.cleanAll());

  describe('getHueEndpoint', function () {
    it('should retry request up to 3 times on error response', async function () {
      nock(baseURL)
      .get('/groups')
      .times(4)
      .reply(500, {});
      const spy = sinon.spy(api, 'getHueEndpoint');
      const error = await api.getHueEndpoint('/groups');
      expect(error.response.status).toEqual(500);
      expect(spy.callCount).toEqual(4);
    });

    it('should return expected result from hue bridge endpoint', async function () {
      nock(baseURL)
      .get('/groups')
      .reply(200, lightGroupsResponse);
      const response = await api.getHueEndpoint('/groups')
      expect(response.data).toEqual(lightGroupsResponse)
    });
  });

  describe('getLightGroups', function () {
    it('should return light groups', async function () {
      nock(baseURL)
      .get('/groups')
      .reply(200, lightGroupsResponse);
      const lightGroups = await api.getLightGroups();
      expect(lightGroups).toEqual(lightGroupsResponse)
    });
  });

  describe('getGroupByLocation', function () {
    it('should return object', function () {
      const group = getGroupByLocation(lightGroupsResponse, lightGroupsResponse[1].name)
      expect(group).toEqual({ groupId: '1', ...lightGroupsResponse[1] })
    });
  })
});

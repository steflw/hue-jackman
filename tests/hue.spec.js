import expect from 'expect';
import nock from 'nock';

import { getLightGroups } from '../src/hue/hue-api';
import { lightGroupsResponse } from "./hue-mock";

describe('hue-api.js', function () {
  describe('getLightGroups', function () {
    it('should return light groups', async function () {
      nock(`http://${process.env.BRIDGE_IP}/api/${process.env.BRIDGE_USERNAME}`)
      .get('/groups')
      .reply(200, lightGroupsResponse);
      const lightGroups = await getLightGroups();
      expect(lightGroups.data).toEqual(lightGroupsResponse)
    });
  });
});

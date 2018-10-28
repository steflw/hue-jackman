import expect from 'expect';
import nock from 'nock';
import { hueBot } from "../../src/hue/events";
import { baseURL } from "../hue/hue.spec";
import { entities } from "../messenger/mock";

describe('HueBot Unit Tests', function () {
  nock(baseURL)
  .put('/lights')
  .reply(200)
  describe('handleIntent', function () {
    it('should emit event with intent value, location and senderId', function () {
      hueBot.on('on_off', function (obj) {
        const expected = {
          intentValue: 'off',
          location: 'Living Room',
          senderId: '12345'
        };
        expect(obj).toEqual(expected)
      });
      hueBot.handleMessageIntent(entities, '12345');
    });
  });
});

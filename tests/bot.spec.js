import expect from 'expect';
import { hueBot } from '../src/hue/events';

import { entities } from "./mock";

describe('HueBot Unit Tests', function () {

  describe('handleIntent', function () {
    it('should emit event with intent value, location and senderId', function () {
      hueBot.on('on_off', function (obj) {
        const expected = {
          intentValue: 'on',
          location: 'Living Room',
          senderId: '12345'
        };
        expect(obj).toEqual(expected)
      });
      hueBot.handleMessageIntent(entities, '12345');
    });
  });
});

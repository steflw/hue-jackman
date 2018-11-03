import nock from 'nock';
import expect from 'expect';
import sinon from 'sinon';

import {
  MISSING_ROOM_RESPONSE,
  UNEXPECTED_INTENT_RESPONSE
} from '../../src/bot/responses';
import send from '../../src/messenger/send';
import {
  getIntentResponse,
  handleMessage,
  filterLowConfidenceEntities, getErrorResponse
} from '../../src/messenger/receive';

import {
  expectedEntities,
  messageResponse,
  lowConfidenceEntity,
  messageEvent,
  unexpectedIntent
} from './mock';


describe('receive', function () {
  describe('handleMessage', function () {
    const sendReadReceipt = sinon.spy(send, 'readReceipt');

    before(function () {
      nock('https://graph.facebook.com/v2.6/me/messages').post().reply(200).persist();
    });

    afterEach(function () {
      sendReadReceipt.resetHistory();
    });

    it('should send read receipt to sender', function () {
      handleMessage(messageEvent);
      expect(sendReadReceipt.getCall(0).args[0]).toEqual(messageEvent.sender.id);
    });

    it('should handle undefined nlp object', function () {
      const messageEventWithoutNlp = {
        ...messageEvent,
        message: {
          ...messageEvent.message,
          nlp: {}
        }
      };
      const sendTextMessage = sinon.spy(send, 'textMessage');
      handleMessage(messageEventWithoutNlp);
      expect(sendTextMessage.called).toBeTruthy();
      expect(sendTextMessage.getCall(0).args[0]).toEqual(messageEventWithoutNlp.sender.id);
      expect(sendTextMessage.getCall(0).args[1]).toEqual(`Looks like the messenger app isn't configured properly.`);
    });
  });

  describe('getErrorResponse', function () {
    it('should handle undefined room entity', function () {
      const undefinedRoomEntity = {
        intent: [{
          value: 'on_off'
        }],
        on_off: [{
          value: 'off'
        }]
      };
      expect(getErrorResponse(undefinedRoomEntity)).toEqual(MISSING_ROOM_RESPONSE);
    });

  });

  describe('getIntentResponse', function () {
    it('should handle unexpected intent', function () {
      expect(getIntentResponse(unexpectedIntent.intent[0].value, unexpectedIntent))
      .toEqual(UNEXPECTED_INTENT_RESPONSE);
    });

    it(`should handle expected intents`, function () {
      const intents = ['on_off', 'brightness', 'colour'];
      let i = 0;
      for (i; i < intents.length; i++) {
        const entities = expectedEntities[intents[i]];
        const response = getIntentResponse(intents[i], entities, entities[intents[i]][0].value);
        expect(response).toEqual(entities.response);
      }
    });
  });

  describe('filterLowConfidenceEntities', function () {
    it('should filter entities with confidence lower than 0.8', function () {
      const filteredEntities = filterLowConfidenceEntities(lowConfidenceEntity);
      expect(filteredEntities).toEqual({
        intent: [{ confidence: 0.85, value: 'on_off' }],
        location: [{ confidence: 0.85, value: 'Living Room' }]
      });
    });

    it('should return original array of valid entities', function () {
      const filteredEntities = filterLowConfidenceEntities(messageResponse.entry[0].messaging[0].message.nlp.entities);
      expect(filteredEntities).toEqual(messageResponse.entry[0].messaging[0].message.nlp.entities);
    });
  });
});

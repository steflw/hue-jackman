import send from './send';

import {
  MISSING_INTENT_RESPONSE,
  MISSING_ROOM_RESPONSE,
  UNEXPECTED_INTENT_RESPONSE
} from '../bot/responses';
import { hueBot } from '../hue/events';

export const handleMessage = event => {
  const { sender, message } = event;
  send.readReceipt(sender.id);

  if (!message.nlp || !Object.keys(message.nlp).length) {
    handleNlpError(sender.id);
    return;
  }

  const filteredEntities = filterLowConfidenceEntities(message.nlp.entities);

  try {
    validateEntities(filteredEntities);
  } catch (error) {
    send.textMessage(sender.id, error);
    return
  }

  getIntentResponse(message.nlp.entities.intent[0].value, filteredEntities);

  hueBot.handleMessageIntent(filteredEntities, sender.id);
};

export const handleNlpError = recipientId =>
  send.textMessage(
    recipientId,
    `Looks like the messenger app isn't configured properly.`
  );

export const filterLowConfidenceEntities = entities =>
  Object.keys(entities)
  .filter(key => entities[key][0].confidence >= 0.8)
  .reduce((acc, key) => {
    return {
      ...acc,
      [key]: entities[key]
    };
  }, {});

export const validateEntities = filteredEntities => {
  const { intent } = filteredEntities;

  if (!filteredEntities.intent)
    throw MISSING_INTENT_RESPONSE;

  if (!filteredEntities.location)
    throw MISSING_ROOM_RESPONSE;

  const entityValue = filteredEntities[intent[0].value][0].value;

  if (!filteredEntities[intent[0].value])
    throw `Sorry I don't understand "${entityValue}"`;
};

export const getIntentResponse = (intentValue, filteredEntities) => {
  const location = filteredEntities.location[0].value;
  const value = filteredEntities[intentValue][0] ? filteredEntities[intentValue][0].value : '';
  return {
    on_off: `Turning ${value} the ${location} lights`,
    brightness: `Setting the ${location} lights to ${value} brightness`,
    colour: `Changing the colour of the ${location} lights to ${value}`
  }[intentValue] || UNEXPECTED_INTENT_RESPONSE;
};

export default {
  handleMessage,
  getErrorResponse: validateEntities,
  filterLowConfidenceEntities,
  getIntentResponse
};

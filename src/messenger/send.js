import { callMessagesApi } from './api';

export const message = (recipientId, payload) => {
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: payload
  };
  callMessagesApi(messageData);
};

export const textMessage = (recipientId, text) => message(recipientId, { text });

export const readReceipt = recipientId => {
  const messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: 'mark_seen'
  };
  callMessagesApi(messageData);
};

export default {
  message,
  textMessage,
  readReceipt
};

import express from 'express';
import { handleMessage } from '../messenger/receive';
import { handlePostback } from '../messenger/postback';

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong token');
  }
});

router.post('/', (req, res) => {
  res.sendStatus(200);
  if (req.body.object === 'page') {
    const entries = req.body.entry;
    entries.forEach(entry => {
      console.log(entry);
      entry.messaging.forEach(messagingEvent => {
        if (messagingEvent.message) {
          handleMessage(messagingEvent);
        } else if (messagingEvent.postback) {
          handlePostback(messagingEvent);
        }
      });
    });
  }
});

export default router;

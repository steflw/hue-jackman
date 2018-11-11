import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import index from './routes/index';
import webhook from './routes/webhook';

import setup from './messenger/setup';

const app = express();
const PORT = process.env.PORT || 80;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.disable('x-powered-by');

// Routes
app.use('/', index);
app.use('/webhook', webhook);

// Messenger thread setup
setup.persistentMenu();

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

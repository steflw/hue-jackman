import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import index from './routes/index'
import webhook from './routes/webhook'

import hueApi from "./hue/hue-api";
import setup from './api-helpers/setup'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('tiny'));

// Routes
app.use('/', index);
app.use('/webhook', webhook);

// TODO handle promise rejection + send user status message
hueApi.getLightGroups();

// Messenger thread setup
// setup.persistentMenu();
// setup.getStarted();

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
});

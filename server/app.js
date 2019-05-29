const logger = require('./services/loggerService');
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use((err, req, res, next) => {
  if (err) {
    logger.err(err);
  }
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;

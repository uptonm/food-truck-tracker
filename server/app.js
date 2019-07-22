const logger = require('./services/loggerService');
const bodyParser = require('body-parser');
const passport = require('passport');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();
require('./models/user');
require('./models/foodTruck');
require('./services/jwtAuth');

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

app.use('/api', require('./routes/search.routes')); // search routes do not require authentication
app.use('/auth', require('./routes/auth.routes'));
app.use(
  '/api',
  passport.authenticate('jwt', { session: false }),
  require('./routes/user.routes')
);
app.use(
  '/api',
  passport.authenticate('jwt', { session: false }),
  require('./routes/truck.routes')
);

module.exports = app;

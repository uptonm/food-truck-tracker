const logger = require('./services/loggerService');
const bodyParser = require('body-parser'); // Allows us to parse x-www-form-urlencoded data
const passport = require('passport'); // Allows us to implement json-web-tokens
const express = require('express'); // Backend-api framework
const morgan = require('morgan'); // Handles formatting logging
const helmet = require('helmet'); // Handles applying default security headers to requests
const cors = require('cors'); // Handles cross-origin-request errors when making requests
require('dotenv').config(); // Fetches enviornment variables

const app = express();
require('./models/user');
require('./models/foodTruck');
require('./services/jwtAuth');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// Handles logging and error output
app.use((err, req, res, next) => {
  if (err) {
    logger.err(err);
  }
  res.status(err.status || 500);
  res.json({ error: err });
});

// Handles all routes
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

const log = require('./services/loggerService');
const mongoose = require('mongoose');
const colors = require('colors');
const app = require('./app');

mongoose.connect(
  process.env.DB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    autoReconnect: true
  },
  err => {
    if (err) {
      return log.err(err);
    }
    if (process.env.NODE_ENV !== 'test') {
      return log.msg(`Connected to MongoDB on port ${colors.blue(27017)}`);
    }
  }
);

const httpServer = app.listen(process.env.PORT || 8000, () => {
  if (process.env.NODE_ENV !== 'test') {
    return log.msg(
      `Server listening on port ${colors.blue(process.env.PORT || 8000)}`
    );
  }
});

module.exports = { app, httpServer };

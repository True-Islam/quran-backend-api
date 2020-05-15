const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.set('case sensitive routing', true);
app.use(bodyParser.json());

app.use(morgan('dev'));

const audioRoutes = require('./api/audio');

app.use('/audio', audioRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})


if (module === require.main) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
}

module.exports = app;

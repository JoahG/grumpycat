'use strict';

import express from 'express';

const app = express();

app.get('/', function(req, res) {
  res.send('Everything is 200 OK');
});

app.listen(process.env.PORT || 8080);

export default app;
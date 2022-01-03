const mongoose = require('mongoose');
const congif = require('./config');

mongoose
  .connect(congif.database.url)
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.log(err);
  });

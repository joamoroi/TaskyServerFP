const values = require('./values');

const config = {
  
  //configuracion ethereal para envio de codigo de verificacion al email
  email: {
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "karley.hyatt5@ethereal.email",
      pass: "BpzsXKMFHpccQF2pC9",
    },
  },
  
  database: {
    url: 'mongodb://localhost/tasky',
  },
  jwt: {
    secret: 'aze152g5j6439pñ12nh3',
  },

  server: {
    hostname: 'http://localhost:4500/',
    port: 4500,
  },

  multer: {
    [values.imageFolder](cb) {
      cb(null, './src/statics/' + values.imageFolder);
    },
  },
};

module.exports = config;

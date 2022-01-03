const jwt = require('jsonwebtoken');
const config = require('../config');
const models = require('../models');
const fs = require('fs/promises');
const path = require('path');

const tokenExists = async (req, res, next) => {
  try {
    const {token} = req.headers;

    if (!token) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.json({error: 'No existe acceso sin token'});
    }

    const data = jwt.verify(token, config.jwt.secret);

    if (!data) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.json({error: 'El token no es correcto'});
    }

    const userId = data.user._id;

    const user = await models.user.findOne({userId});

    if (!user) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.json({err: 'Usuario y token no coinciden'});
    }

    req.body.userId = user._id;

    next();
  } catch (err) {
    if (req.file) {
      await fs.unlink(req.file.path);
    }
    return res.json({err: err.message});
  }
};

module.exports = {
  tokenExists,
};

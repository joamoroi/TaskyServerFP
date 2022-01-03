const models = require('../models');
const utils = require('../utils');
const jwt = require('jsonwebtoken');
const config = require('../config');

//INICIO SESION
const signIn = async (req, res) => {
  try {
    const {email, password} = req.body;

    //validaciones
    if (!email || !password) {
      return res.status(409).json({error: 'Email o password incorrecto'});
    }

    const user = await models.user.findOne({email});
    if (!user) {
      return res.status(409).json({error: 'El usuario no está registrado'});
    }

    const isValid = await utils.bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(409).json({error: 'La contraseña es incorrecta'});
    }
    
    //asignacion token
    const token = jwt.sign({user}, config.jwt.secret);
    
    return res.status(201).json({token, userId: user._id});
    
  } catch (err) {
    return res.json({err: err.message});
  }
};

//REGISTRO
const signUp = async (req, res) => {
  try {
    const {email, password, password2} = req.body;

    //validaciones
    if (!email || !password || !password2 || password !== password2) {
      return res.status(409).json({error: 'Email o password incorrecto'});
    }

    const userExist = await models.user.findOne({email});
    if (userExist) {
      return res.status(409).json({error: 'El usuario ya está registrado'});
    }

    //generacion codigo de verificacion y envio al email
    const code = utils.code.generateCode()
    const content = `Code: ${code}`;
    await utils.email.sendCode(email, content);

    //encriptar password
    const hash = await utils.bcrypt.encrypt(password);

    //creacion y guardado de user
    const user = {
      email: email,
      password: hash,
      code,
    };

    const data = await models.user.create(user);
    

    return res.status(201).json({data});
  } catch (err) {
    return res.json({err: err.message});
  }
};

const HOURS = 1;

//ACTIVAR USUARIO
const active = async (req, res) => {
  try {
    const {userId, code} = req.body;

    const user = await models.user.findById(userId);
    if (!user) {
      return res.status(400).json({error: 'Usuario no existe'});
    }

    if (user.code !== code) {
      return res.status(400).json({error: 'Código es incorrecto'});
    }

    const codeValidate = (date, hours) => {
      return new Date(new Date(date).setHours(date.getHours() + hours));
    };

    const updatedAt = new Date(user.updatedAt);
    const now = new Date();
    const auxDate = codeValidate(updatedAt, HOURS);
    if (now.getTime() > auxDate.getTime()) {
      return res.status(400).json({error: 'El código no es válido'});
    }

    user.active = true;
    await user.save();

    return res.status(200).json({user});
  } catch (e) {
    return res.json({error: e.message()});
  }
};

//ACTIVAR USUARIO DE NUEVO
const activeAgain = async (req, res) => {
  try {
    const {email} = req.body;

    const user = await models.user.findOne({email});
    if (!user) {
      return res.status(400).json({error: 'Usuario no existe'});
    }

    user.code = utils.code.generateCode();
    await user.save();

    return res.status(200).json({code: user.code});
  } catch (e) {
    return res.json({error: e.message()});
  }
};

module.exports = {
  signIn,
  signUp,
  active,
  activeAgain,
};

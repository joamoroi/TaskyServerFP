const models = require('../models');
const config = require('../config');
const values = require('../values');

//eliminar imagenes, paquete de node
const fs = require('fs/promises');
const path = require('path');

const create = async (req, res) => {
  try {
    const {name, type, userId} = req.body;

    const file = req.file;

    //validaciones
    const user = await models.user.findById(userId);
    if (!user) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.status(409).json({error: 'El usuario no existe'});
    }

    if (!name || !type) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.status(409).json({error: 'Nombre o tipo no introducido'});
    }

    if (!file) {
      return res.status(409).json({error: 'Imagen no adjuntada'});
    }

    //creacion y guardado de tarea
    const task = await models.task.create({
      name,
      image: config.server.hostname + values.imageFolder + '/' + file.filename,
      userId,
      type,
      subtask: [],
    });

    return res.status(201).json({task, userId});
    
  } catch (err) {
    return res.json({err: err.message});
  }
};

const usertasks = async (req, res) => {
  try {
    const {userId} = req.body;
   
    const usertasks = await models.task.find({userId}).populate('subtask');
    
    if (!usertasks) {
      return res.status(409).json({error: 'No hay tareas para mostrar'});
    }

    return res.status(201).json({usertasks});
  } catch (err) {
    return res.status(409).json({error: 'No se pudo mostrar las tareas'});
  }
};

const onetask = async (req, res) => {
  try {
    const {id} = req.params;

    const onetask = await models.task.findById(id).populate('subtask');
    if (!onetask) {
      return res.status(409).json({error: 'No se pudo encontrar la tarea'});
    }

    return res.status(201).json({onetask});
  } catch (err) {
    return res.status(409).json({error: 'No se pudo encontrar la tarea'});
  }
};

const update = async (req, res) => {
  try {
    const {id} = req.params;

    const {name, type, userId} = req.body;

    const file = req.file;

    const task = await models.task.findById(id);

    //elimando de imagen antigua
    const imageSplit = task.image.split('/');
    const fileName = imageSplit[imageSplit.length - 1];

    const imagePath = path.resolve(
      `./src/statics/${values.imageFolder}/` + fileName
    );
    await fs.unlink(imagePath);

    //actualizar datos tarea
    task.name = name;
    (task.image =
      config.server.hostname + values.imageFolder + '/' + file.filename),
      (task.type = type);
    task.userId = userId;

    await task.save();

    return res.status(201).json({task});
  } catch (err) {
    return res.status(409).json({error: 'No se actualizó la tarea'});
  }
};

const remove = async (req, res) => {
  try {
    const {taskId} = req.body;

    const task = await models.task.findById(taskId);
    if (!task) {
      return res.status(409).json({error: 'El espacio no existe'});
    }

    //elimando de imagen
    const imageSplit = task.image.split('/');
    const fileName = imageSplit[imageSplit.length - 1];

    const imagePath = path.resolve(
      `./src/statics/${values.imageFolder}/` + fileName
    );
    await fs.unlink(imagePath);

    const data = await models.task.findByIdAndRemove(taskId);

    return res.status(201).json({data});
  } catch (err) {
    res.json({err: err.message});
  }
};

module.exports = {
  create,
  usertasks,
  onetask,
  update,
  remove,
};

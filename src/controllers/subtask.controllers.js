const models = require('../models');

const create = async (req, res) => {
  try {
    const {name, description, userId, type} = req.body;
console.log({name, description, userId, type})
    //validaciones
    const user = await models.user.findById(userId);
    if (!user) {
      return res.status(409).json({error: 'El usuario no existe'});
    }

    if (!name || !description) {
      return res.status(409).json({error: 'Nombre o descripción no introducido'});
    }

    //creacion y guardado de tarea
    const subtask = await models.subtask.create({
      name,
      description,
      userId,
      type,
    });

    return res.status(201).json({subtask, userId});
  } catch (err) {
    return res.json({err: err.message});
  }
};

const usersubtasks = async (req, res) => {
  try {
    const usersubtasks = await models.subtask.find();
    if (!usersubtasks) {
      return res.status(409).json({error: 'No hay subtareas para mostrar'});
    }

    return res.status(201).json({usersubtasks});
  } catch (err) {
    return res.status(409).json({error: 'No se pudo mostrar las subtareas'});
  }
};

const onesubtask = async (req, res) => {
  try {
    const {id} = req.params;

    const onesubtask = await models.subtask.findById(id);
    
    if (!onesubtask) {
      return res.status(409).json({error: 'No se pudo encontrar la tarea'});
    }

    return res.status(201).json({onesubtask});
  } catch (err) {
    return res.status(409).json({error: 'No se pudo encontrar la tarea'});
  }
};
const update = (req, res) => {
  return res.json('update');
};

const remove = async (req, res) => {
  try {
    const {subtaskId} = req.body;

    const subtask = await models.subtask.findById(subtaskId);
    if (!subtask) {
      return res.status(409).json({error: 'La subtarea no existe'});
    }

    const data = await models.subtask.findByIdAndRemove(subtaskId);

    return res.status(201).json({data});
  } catch (err) {
    res.json({err: err.message});
  }
};

module.exports = {
  create,
  usersubtasks,
  onesubtask,
  update,
  remove,
};
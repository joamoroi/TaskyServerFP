const models = require('../models');

const create = async (req, res) => {
  try {
    const {name, description, taskId, type, date} = req.body;
    
    //validaciones
    const task = await models.task.findById(taskId);
    if (!task) {
      return res.status(409).json({error: 'La tarea no existe'});
    }

    if (!name || !description) {
      return res.status(409).json({error: 'Nombre o descripción no introducido'});
    }

    //creacion y guardado de tarea
    const subtask = await models.subtask.create({
      name,
      description,
      // taskId,
      type,
      date,
    });

    task.subtask.push(subtask)
    await task.save()

    console.log({subtask})

    return res.status(201).json({subtask, task});
  } catch (err) {
    return res.json({err: err.message});
  }
};

const usersubtasks = async (req, res) => {
  try {
    const {taskId, userId} = req.body;
    const user = await models.user.findById(userId)
    if (!user) {
      return res.status(409).json({error: 'No existe el usuario'});
    }
    const usertasks = await models.task.findById(taskId).populate('subtask');
    if (!usertasks) {
      return res.status(409).json({error: 'No hay tareas para mostrar'});
    }

    return res.status(201).json({usersubtasks: usertasks.subtask });
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
const update = async (req, res) => {

  try {
  const {id} = req.params;
  
  const {name, description, type, date} = req.body;
  console.log({name, description, type, date})
  
  const subtask = await models.subtask.findById(id);
  console.log({subtask})
  if (!subtask) {
    return res.status(409).json({error: 'No se pudo encontrar la subtarea'});
  }

  //actualizar datos tarea
  subtask.name = name;
  subtask.description = description;
  subtask.type = type;
  subtask.date = date;

  await subtask.save();
  

  return res.status(201).json({subtask});
} catch (err) {
  return res.status(409).json({error: 'No se actualizó la subtarea'});
}
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

const subtaskExpiration = async (req, res) => {
  try {
    const {date} = req.body;

    const subtask = await models.subtask.findById(subtaskId);
    if (!subtask) {
      return res.status(409).json({error: 'La subtarea no existe'});
    }

  

    return res.status(201).json({dat});
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
  subtaskExpiration,
};

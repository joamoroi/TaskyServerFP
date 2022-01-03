const {Router} = require('express');
const controllers = require('../controllers');
const uploads = require('../utils').multer.uploads;
const values = require('../values');
const middlewares = require("../middlewares");

const router = Router();

//Routes
router.post(
  '/create', middlewares.auth.tokenExists,
  uploads.single(values.imageFolder),
  controllers.task.create
);
router.post('/usertasks', controllers.task.usertasks);
router.get('/onetask/:id', controllers.task.onetask);
router.put('/update/:id', uploads.single(values.imageFolder), controllers.task.update);
router.delete('/remove', controllers.task.remove);

module.exports = router;

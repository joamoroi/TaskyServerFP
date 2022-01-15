const {Router} = require('express');
const controllers = require('../controllers');
const middlewares = require("../middlewares");

const router = Router();

//Routes
router.post('/create', middlewares.auth.tokenExists, controllers.subtask.create);
router.post('/usersubtasks', controllers.subtask.usersubtasks);
router.get('/onesubtask/:id', controllers.subtask.onesubtask);
router.put('/update/:id', controllers.subtask.update);
router.delete('/remove', controllers.subtask.remove);

module.exports = router;
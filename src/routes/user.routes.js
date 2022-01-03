const {Router} = require('express');
const controllers = require('../controllers');

const router = Router();

//Routes
router.post('/signIn', controllers.user.signIn);
router.post('/signUp', controllers.user.signUp);
router.post('/active',controllers.user.active)
router.post('/activeAgain',controllers.user.activeAgain)

module.exports = router;

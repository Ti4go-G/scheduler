const { Router } = require('express');
const userController = require('../controllers/userController');

const userRouter = Router();

userRouter.post('/register', userController.createUser);
userRouter.post('/login', userController.loginUser);

module.exports = userRouter;
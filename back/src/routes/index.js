const {Router} = require('express');
const userRouter = require('./userRoutes');
const taskRouter = require('./taskRoutes'); 
const router = Router();

router.use('/users', userRouter);
router.use('/tasks', taskRouter);
module.exports = router;
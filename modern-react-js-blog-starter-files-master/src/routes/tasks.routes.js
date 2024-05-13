import { Router } from 'express';
import { authRequire } from '../middlewares/validateToken.js';
import { getTasks,getTask,deleteTask,updateTask,createTask } from '../controllers/tasks.controller.js';

const router = Router();

router.get('/app/tasks',authRequire, getTasks);
router.get('/app/tasks/:id',authRequire, getTask);
router.post('/app/tasks',authRequire,createTask);
router.delete('/app/tasks:id',authRequire,deleteTask);
router.put('/app/tasks',authRequire,updateTask);



export default router
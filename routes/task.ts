import express from 'express'
import varifyToken from '../middleware/authMiddleware';
import task from '../controller/userTask';

const router = express.Router();

router.post("/tasks", varifyToken, task.createUserTask);
router.get('/tasks', varifyToken, task.getAllTasksList);

router.put("/tasks/:id",varifyToken,task.updateTask);
router.delete('/task/:id',varifyToken,task.deleteTask);

export default router;
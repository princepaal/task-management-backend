import express from "express";
import user from "../controller/user";
import task from "../controller/userTask";
import varifyToken from "../middleware/authMiddleware";
const router = express.Router();

router.post("/signup", user.createUser);
router.post("/login", user.loginUser);

router.post("/tasks", varifyToken, task.createUserTask);

router.get('/tasks/:id',varifyToken,task.getSingleTask);
router.put("/tasks/:id",varifyToken,task.updateTask);

router.get('/tasks', varifyToken, task.getAllTasksList);
router.delete('/task/:id',varifyToken,task.deleteTask);

export default router;

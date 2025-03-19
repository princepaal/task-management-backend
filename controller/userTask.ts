import { Request, Response } from "express";
import { Task } from "../models/taskSchema";
import { ITask } from "../interface/task";

interface AuthRequest extends Request {
  user?: any;
}

const task = {
  createUserTask: async (req: AuthRequest, res: Response): Promise<any> => {
    const { title, description }: ITask = req.body;

    if (!title && !description) {
      return res
        .status(400)
        .send({ success: false, message: "Title and description required" });
    }
    const newTask = await Task.create({
      title,
      description,
      userId: req.user.id,
    });

    return res.status(201).send({
      success: true,
      message: "Task created successfully",
      task: newTask,
    });
  },

  updateTask: async (req: Request, res: Response): Promise<any> => {
    try {
      const { title, description, removeTask }: ITask = req.body;
      const taskId = req.params.id;

      if (!taskId) {
        return res
          .status(400)
          .json({ success: false, message: "Task ID is required" });
      }

      const findTask = await Task.findOne({ _id: taskId });
      if (!findTask) {
        return res
          .status(404)
          .json({ success: false, message: "Task not found" });
      }

      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { $set: { title, description, removeTask } },
        { new: true }
      );

      return res.status(200).send({
        success: true,
        message: "Task Updated Successfully",
        task: updatedTask,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },

  getAllTasksList: async (req: Request, res: Response): Promise<any> => {
    try {
      const userId = (req as any).user.id;
      console.log("userId", userId);
      const findList = await Task.find({ userId });
      return res.status(200).json({
        success: true,
        message: "List fetched successfully",
        task: findList,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : error,
      });
    }
  },

  deleteTask: async(req:Request,res:Response): Promise <any>=>{

    try {
      const taskId = req.params.id;
      const task = await Task.findByIdAndDelete({ _id: taskId });
      console.log('task', task)
      if (!task) {
        return res
          .status(404)
          .send({ success: false, message: "Task not found with this Id" });
      }

      return res
        .status(200)
        .send({
          success: true,
          message: "Task Sended Successfully",
          task: task,
        });
    } catch (error) {
      res.status(500).send({ message: 'Internal Server error', error });
    }
  }
};

export default task;

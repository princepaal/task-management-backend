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
      userId: req.user,
    });

    return res.status(201).send({
      success: true,
      message: "Task created successfully",
      task: newTask,
    });
  },

  updateTask: async (req: Request, res: Response): Promise<any> => {
    try {
        console.log("Received Request", req.method, req.url);
        console.log("Request Body", req.body);
        console.log("Request Params", req.params);

        const { title, description, removeTask }: ITask = req.body;
        const taskId = req.params.id;
        const userId = (req as any).user.id;
        console.log('userId', userId)

        if (!taskId) {
            return res.status(400).json({ success: false, message: "Task ID is required" });
        }

        const findTask = await Task.findOne({ _id: taskId });
        if (!findTask) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { $set: { title, description, removeTask } },
            { new: true }
        );

        console.log("Updated Task:", updatedTask);

        return res.status(200).send({
            success: true,
            message: "Task Updated Successfully",
            task: updatedTask,
        });
    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
},

  getAllTasksList: async(req: Request,res: Response):Promise<any> =>{
    //get all the tasks
    const userId = (req as any).user;
    console.log('userId', userId);

    const findList = await Task.find({userId})
    console.log('findList', findList)




  }
};

export default task;

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    completed: { type: Boolean, default: false },
    removeTask:{ type: Boolean, default: false },
    userId: {type: String,default: false},
})

export const Task = mongoose.model('Task',taskSchema);

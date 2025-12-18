// models/Task.ts
import mongoose, { Document, Model } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string | null;
  completed?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new mongoose.Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, default: null },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Avoid model overwrite issues in development (hot reload)
const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);

export default Task;

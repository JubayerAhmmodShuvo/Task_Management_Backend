import { model, Schema, Document } from 'mongoose';
import { Task } from './task.interface';

const taskSchema = new Schema<Task & Document>(
  {
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'ongoing', 'completed'],
      default: 'pending',
    },
    userId: { type: String, required: true }, 
  },
  { timestamps: true } 
);

export const TaskModel = model<Task & Document>('Task', taskSchema);

import { Task } from './task.interface';
import { TaskModel } from './task.model';

const createTask = async (task: Task): Promise<Task> => {
  try {
    const createdTask = await TaskModel.create(task);
    return createdTask;
  } catch (error) {
    throw new Error('Failed to create the task');
  }
};

const getAllTasksByUser = async (userId: string): Promise<Task[]> => {
  try {
    const tasks = await TaskModel.find({ userId });
    return tasks;
  } catch (error) {
    throw new Error('Failed to retrieve tasks for the user');
  }
};

const getOngoingTasksByUser = async (userId: string): Promise<Task[]> => {
  try {
    const tasks = await TaskModel.find({ userId, status: 'ongoing' });
    return tasks;
  } catch (error) {
    throw new Error('Failed to retrieve ongoing tasks for the user');
  }
};

const getCompletedTasksByUser = async (userId: string): Promise<Task[]> => {
  try {
    const tasks = await TaskModel.find({ userId, status: 'completed' });
    return tasks;
  } catch (error) {
    throw new Error('Failed to retrieve completed tasks for the user');
  }
};

const updateTask = async (
  taskId: string,
  updates: Partial<Task>
): Promise<Task | null> => {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updates, {
      new: true,
    });
    return updatedTask;
  } catch (error) {
    throw new Error('Failed to update the task');
  }
};

const deleteTask = async (taskId: string): Promise<Task | null> => {
  try {
    const deletedTask = await TaskModel.findByIdAndDelete(taskId);
    return deletedTask;
  } catch (error) {
    throw new Error('Failed to delete the task');
  }
};

const markTaskAsOngoing = async (taskId: string): Promise<Task | null> => {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      { status: 'ongoing' },
      { new: true }
    );
    return updatedTask;
  } catch (error) {
    throw new Error('Failed to mark the task as ongoing');
  }
};

const markTaskAsCompleted = async (taskId: string): Promise<Task | null> => {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      { status: 'completed' },
      { new: true }
    );
    return updatedTask;
  } catch (error) {
    throw new Error('Failed to mark the task as completed');
  }
};
const getTaskById = async (taskId: string): Promise<Task | null> => {
  try {
    const task = await TaskModel.findById(taskId);
    return task;
  } catch (error) {
    throw new Error('Failed to retrieve the task by ID');
  }
};


export const TaskService = {
  createTask,
  getAllTasksByUser,
  getOngoingTasksByUser,
  getCompletedTasksByUser,
  updateTask,
  deleteTask,
  markTaskAsOngoing,
  markTaskAsCompleted,
  getTaskById,
};

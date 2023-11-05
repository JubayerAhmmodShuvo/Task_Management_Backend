import { Request, Response, RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { TaskService } from './task.service';
import catchAsync from '../../../shared/catchAsync';
import { Task } from './task.interface';

const createTask: RequestHandler = catchAsync(
  
  async (req: Request, res: Response) => {
    
    
    if (!req.user) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'User is not authenticated',
      });
    }

    const newTask: Task = req.body;
    const userId = req.user!.id; 
    newTask.userId = userId;
    const createdTask = await TaskService.createTask(newTask);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Task created successfully',
      data: createdTask,
    });
  }
);

const getAllTasksByUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
     
    if (!req.user) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'User is not authenticated',
      });
    }

    const tasks = await TaskService.getAllTasksByUser(req.user!.id); 
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All tasks retrieved successfully',
      data: tasks,
    });
  }
);

const getOngoingTasksByUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
   
    if (!req.user) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'User is not authenticated',
      });
    }

    const tasks = await TaskService.getOngoingTasksByUser(req.user!.id); 
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Ongoing tasks retrieved successfully',
      data: tasks,
    });
  }
);

const getCompletedTasksByUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {

    if (!req.user) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'User is not authenticated',
      });
    }

    const tasks = await TaskService.getCompletedTasksByUser(req.user!.id); 
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Completed tasks retrieved successfully',
      data: tasks,
    });
  }
);

const updateTask: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const updatedData: Partial<Task> = req.body;
    const updatedTask = await TaskService.updateTask(taskId, updatedData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Task updated successfully',
      data: updatedTask,
    });
  }
);

const deleteTask: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const deletedTask = await TaskService.deleteTask(taskId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Task deleted successfully',
      data: deletedTask,
    });
  }
);

const markTaskAsOngoing: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const updatedTask = await TaskService.markTaskAsOngoing(taskId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Task marked as ongoing successfully',
      data: updatedTask,
    });
  }
);

const markTaskAsCompleted: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const updatedTask = await TaskService.markTaskAsCompleted(taskId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Task marked as completed successfully',
      data: updatedTask,
    });
  }
);

const getTaskById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const task = await TaskService.getTaskById(taskId);

    if (!task) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Task not found',
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Task retrieved successfully',
      data: task,
    });
  }
);


export const TaskController = {
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

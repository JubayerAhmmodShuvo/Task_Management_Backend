import express from 'express';
import { TaskController } from './task.controller';
import { UserRole } from '../../../enum/user';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/', auth(UserRole.User), TaskController.createTask);

router.patch('/:id', auth(UserRole.User), TaskController.updateTask);

router.patch(
  '/mark-ongoing/:id',
  auth(UserRole.User),
  TaskController.markTaskAsOngoing
);

router.patch(
  '/mark-completed/:id',
  auth(UserRole.User),
  TaskController.markTaskAsCompleted
);
router.get('/:id', auth(UserRole.User), TaskController.getTaskById);

router.get('/',auth(UserRole.User), TaskController.getAllTasksByUser);

router.get(
  '/ongoing',
  auth(UserRole.User),
  TaskController.getOngoingTasksByUser
);

router.get(
  '/completed',
  auth(UserRole.User),
  TaskController.getCompletedTasksByUser
);

router.delete('/:id', auth(UserRole.User), TaskController.deleteTask);

export const TaskRoutes = router;

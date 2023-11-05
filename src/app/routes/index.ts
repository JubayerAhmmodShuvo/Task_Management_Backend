import express from 'express';
import { UserRoutes } from '../modules/user/users.routes';
import { UserAuth } from '../modules/auth/auth.route';
import { TaskRoutes } from '../modules/task/task.routes';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: UserAuth,
  },

  {
    path: '/task',
    route:TaskRoutes,
 }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;

import express from 'express';
import { Router } from 'express';
import * as usersController from './usersController';
import {authenticateSuperAdminAndAdmin} from '../../middleware/authMiddleware'
const userRouter: Router = express.Router();
userRouter.post('/login',usersController.loginAllUsers);
userRouter.post('/register',authenticateSuperAdminAndAdmin,usersController.registerAllUser)
export default userRouter;

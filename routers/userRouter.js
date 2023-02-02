import express from 'express';
import { login, signup } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddlewares.js';
import {
  joiUserCreateValidator,
} from '../validators/joiValidators/joiUserValidator.js';
import { profilePicUploadParserer } from '../utils/parserers/imageUploadParserer.js';
import { resizeProfilePic } from '../utils/resizePic.js';
import userCheck from '../validators/userCheck.js';

const userRouter = express.Router();

userRouter.post('/login', login);

userRouter.post('/signup', joiUserCreateValidator, userCheck,signup);

export default userRouter;

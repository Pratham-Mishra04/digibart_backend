import express from 'express';
import { login, signup } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddlewares.js';
import {
  joiUserCreateValidator,
  joiUserUpdateValidator,
} from '../validators/joiValidators/joiUserValidator.js';
import {
  getUser,
  updateUser,
  updatePassword,
  forgotPassword,
  resetPassword,
  deleteUser,
} from '../controllers/userController.js';
import { profilePicUploadParserer } from '../utils/parserers/imageUploadParserer.js';
import { resizeProfilePic } from '../utils/resizePic.js';
import userCheck from '../validators/userCheck.js';

const userRouter = express.Router();

userRouter.post('/login', login);

userRouter.post('/signup', joiUserCreateValidator, userCheck, signup);

userRouter.patch('/updatePassword', protect, updatePassword);
userRouter.get('/forgotPassword', forgotPassword);
userRouter.post('/resetPassword', resetPassword);

userRouter
  .route('/:userID')
  .get(protect, getUser)
  .patch(
    protect,
    profilePicUploadParserer,
    joiUserUpdateValidator,
    resizeProfilePic,
    updateUser
  )
  .delete(protect, deleteUser);

export default userRouter;

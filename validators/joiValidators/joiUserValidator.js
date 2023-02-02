import Joi from 'joi';
import { isValidNumber } from 'libphonenumber-js';
import fs from 'fs';
import User from '../../models/userModel.js';
import catchAsync from '../../managers/catchAsync.js';
import AppError from '../../managers/AppError.js';

const joiUserCreateSchema = Joi.object({
  name: Joi.string()
    .trim()
    .pattern(/[A-Za-z]+\s{0,1}[A-Za-z]+/, 'alpha')
    .required(),
  email: Joi.string().trim().email().lowercase().required(),
  username: Joi.string().trim().required(),
  profilePic: Joi.string().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.ref('password'),
  phoneNo: Joi.string()
    .custom((value, helper) => {
      if (!isValidNumber(value))
        return helper.message('Enter a valid phone number');
    })
    .required(),
  passwordChangedAt: Joi.forbidden(),
  active: Joi.forbidden(),
  passwordResetToken: Joi.forbidden(),
  passwordResetTokenExpiresIn: Joi.forbidden(),
});

const joiUserUpdateSchema = Joi.object({
  name: Joi.forbidden(),
  email: Joi.string().trim().email().lowercase(),
  username: Joi.forbidden(),
  profilePic: Joi.string(),
  password: Joi.forbidden(),
  confirmPassword: Joi.forbidden(),
  phoneNo: Joi.string().custom(async (value, helper) => {
    if (!isValidNumber(value))
      return helper.message('Enter a valid phone number');
  }),
  passwordChangedAt: Joi.forbidden(),
  active: Joi.forbidden(),
  passwordResetToken: Joi.forbidden(),
  passwordResetTokenExpiresIn: Joi.forbidden(),
});

export const joiUserCreateValidator = catchAsync(async (req, res, next) => {
  req.body.profilePic = 'default.jpeg';
  await joiUserCreateSchema.validateAsync(req.body);
  next();
});

export const joiUserUpdateValidator = catchAsync(async (req, res, next) => {
  await joiUserUpdateSchema.validateAsync(req.body).catch((error) => {
    if (req.file) {
      const picPath = `${req.file.destination}/${req.file.filename}`;
      fs.unlinkSync(picPath, (err) => next(err));
    }
    return next(error);
  });
  next();
});

import Joi from 'joi';
import { isValidNumber } from 'libphonenumber-js';
import fs from 'fs';
import User from '../../models/userModel.js';
import catchAsync from '../../managers/catchAsync.js';

const joiUserCreateSchema = Joi.object({
  name: Joi.string()
    .trim()
    .pattern(/^[A-Za-z]+$/, 'alpha')
    .required(),
  email: Joi.string()
    .trim()
    .email()
    .lowercase()
    .custom(async (value, helper) => {
      if (await User.findOne({ email: value })) {
        // console.log('here');
        return helper.message('User with this email already exists'); // NOT WORKING
      }
    })
    .required(),
  username: Joi.string()
    .trim()
    .custom(async (value, helper) => {
      if (await User.findOne({ username: value }))
        return helper.message('User with this username already exists');
    })
    .required(),
  profilePic: Joi.string().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.ref('password'),
  phoneNo: Joi.string()
    .custom(async (value, helper) => {
      if (!isValidNumber(value))
        return helper.message('Enter a valid phone number');
      if (await User.findOne({ phoneNo: value }))
        return helper.message('This phone number is already in use');
    })
    .required(),
  passwordChangedAt: Joi.forbidden(),
  active: Joi.forbidden(),
  passwordResetToken: Joi.forbidden(),
  passwordResetTokenExpiresIn: Joi.forbidden(),
});

const joiUserUpdateSchema = Joi.object({
  name: Joi.forbidden(),
  email: Joi.string()
    .trim()
    .email()
    .lowercase()
    .custom(async (value, helper) => {
      if (await User.findOne({ email: value })) {
        return helper.message('User with this email already exists');
      }
    })
    .required(),
  username: Joi.forbidden(),
  profilePic: Joi.string(),
  password: Joi.forbidden(),
  confirmPassword: Joi.forbidden(),
  phoneNo: Joi.string()
    .custom(async (value, helper) => {
      if (!isValidNumber(value))
        return helper.message('Enter a valid phone number');
      if (await User.findOne({ phoneNo: value }))
        return helper.message('This phone number is already in use');
    })
    .required(),
  passwordChangedAt: Joi.forbidden(),
  active: Joi.forbidden(),
  passwordResetToken: Joi.forbidden(),
  passwordResetTokenExpiresIn: Joi.forbidden(),
});

export const joiUserCreateValidator = catchAsync(async (req, res, next) => {
  if (!req.file) req.body.profilePic = 'default.jpeg';
  await joiUserCreateSchema.validateAsync(req.body).catch((error) => {
    if (req.file) {
      const picPath = `${req.file.destination}/${req.file.filename}`;
      fs.unlinkSync(picPath, (err) => next(err));
    }
    console.log('here');
    return next(error);
  });
  console.log('No Error');
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

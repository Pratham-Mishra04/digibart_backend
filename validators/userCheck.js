import AppError from "../managers/AppError.js";
import User from "../models/userModel.js";

const userCheck = async (req, res, next) => {
  if (await User.findOne({ username: req.body.username }))
    return next(new AppError('User with this Username already exists.'));
  if (await User.findOne({ email: req.body.email }))
    return next(new AppError('User with this Email already exists.'));
  if (await User.findOne({ phoneNo: req.body.phoneNo }))
    return next(new AppError('This Phone Number is already in use.'));
  next();
};

export default userCheck;

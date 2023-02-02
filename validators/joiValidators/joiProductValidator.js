import Joi from 'joi';
import path from 'path';
import fs from 'fs';
import catchAsync from '../../managers/catchAsync.js';

const joiProductCreateSchema = Joi.object({
  title: Joi.string().required(),
  images: Joi.array().items(Joi.string()).required(),
  description: Joi.string(),
  listedBy: Joi.string().required(),
  listedAt: Joi.forbidden(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  purchaseHistory: Joi.forbidden(),
});

const joiProductUpdateSchema = Joi.object({
  title: Joi.forbidden(),
  images: Joi.array().items(Joi.string()),
  description: Joi.string(),
  listedBy: Joi.forbidden(),
  listedAt: Joi.forbidden(),
  price: Joi.number(),
  category: Joi.string(),
  purchaseHistory: Joi.forbidden(),
});

export const joiProductCreateValidator = catchAsync(async (req, res, next) => {
  req.body.listedBy = req.user.id;
  await joiProductCreateSchema.validateAsync(req.body).catch((error) => {
    if (req.body.images) {
      req.body.images.forEach((loc) => {
        fs.unlink(`./public/products/images/${loc}`, (err) => {
          if (err) return next(err);
        });
      });
    }
    return next(error);
  });
  next();
});

export const joiProductUpdateValidator = catchAsync(async (req, res, next) => {
  await joiProductUpdateSchema.validateAsync(req.body).catch((error) => {
    if (req.body.images) {
      req.body.images.forEach((loc) => {
        fs.unlinkSync(`public/products/images/${loc}`, (err) => {
          next(err);
        });
      });
    }
    return next(error);
  });
  next();
});

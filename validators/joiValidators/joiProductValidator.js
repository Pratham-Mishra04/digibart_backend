import Joi from 'joi';
import fs from 'fs';
import catchAsync from '../../managers/catchAsync.js';

const joiProductCreateSchema = Joi.object({
  title: Joi.string().required(),
  images: Joi.array().items(Joi.string()).required(),
  description: Joi.string(),
  listedBy: Joi.string().required(),
  listedAt: Joi.forbidden(),
  mrp: Joi.number().required(),
  estimatedPrice:Joi.forbidden(),
  category: Joi.string().required(),
  tags:Joi.array().items(Joi.string()),
  lat:Joi.string().required(),
  long:Joi.string().required(),
  age:Joi.number().required(),
  isPurchased: Joi.forbidden(),
  purchasedAt: Joi.forbidden(),
  purchasedBy: Joi.forbidden(),
});

const joiProductUpdateSchema = Joi.object({
  title: Joi.forbidden(),
  images: Joi.array().items(Joi.string()),
  description: Joi.string(),
  listedBy: Joi.forbidden(),
  listedAt: Joi.forbidden(),
  age:Joi.number(),
  mrp: Joi.number(),
  estimatedPrice:Joi.forbidden(),
  category: Joi.string(),
  isPurchased: Joi.forbidden(),
  purchasedAt: Joi.forbidden(),
  purchasedBy: Joi.forbidden(),
});

export const joiProductCreateValidator = catchAsync(async (req, res, next) => {
  req.body.listedBy = req.user.id;
  console.log(req.body.images)
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

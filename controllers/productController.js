import fs from 'fs';
import catchAsync from '../managers/catchAsync.js';
import Product from '../models/productModel.js';
import Stack from '../models/stackModel.js';
import {
  updateDoc,
  getDoc,
  createDoc,
  deleteDoc,
} from '../utils/HandlerFactory.js';

export const getProduct = getDoc(Product);

export const addProduct = createDoc(Product);

export const updateProduct = updateDoc(Product);

export const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  product.images.forEach((loc) => {
    fs.unlink(`./public/products/images/${loc}`, (err) => {
      if (err) return next(err);
    });
  });
  await product.delete();
  res.status(204).json({
    status: 'success',
    requestedAt: req.requestedAt,
    data: null,
  });
});

export const makeStack = catchAsync(async (req, res, next) => {
  const stack = await Stack.create({
    user: req.user.id,
    products: req.body.products,
  });
  res.status(201).json({
    status: 'success',
    requestedAt: req.requestedAt,
    data: stack,
  });
});

export const deleteStack = deleteDoc(Stack);

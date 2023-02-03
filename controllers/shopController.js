import catchAsync from '../managers/catchAsync.js';
import Product from '../models/productModel.js';
import Stack from '../models/stackModel.js';
import APIFeatures from '../utils/APIFeatures.js';
import inDistance from '../utils/essentials/distanceCalculator.js';

export const getAllProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Product.find({ listedBy: { $ne: req.user.id } }),
    req.query
  );

  features.filter().sort().fields().paginator().search();
  const docs = await features.query;

  if (req.query.distance) {
    const distanceDocs = [];
    docs.forEach((el) => {
      if (
        inDistance(
          el.lat,
          el.long,
          req.body.lat,
          req.body.long,
          req.query.distance
        )
      )
        distanceDocs.push(el);
    });

    const filteredStacks = [];

    distanceDocs.forEach(async (el) => {
      const stacks = await Stack.find({});
      stacks.forEach((stack) => {
        if (stack.products.includes(el)) filteredStacks.push(stack);
      });
    });

    res.status(200).json({
      status: 'success',
      results: distanceDocs.length,
      requestedAt: req.requestedAt,
      data: { products:distanceDocs, stacks:filteredStacks },
    });
  } else {
    const filteredStacks = [];

    docs.forEach(async (el) => {
      const stacks = await Stack.find({});
      stacks.forEach((stack) => {
        if (stack.products.includes(el)) filteredStacks.push(stack);
      });
    });

    res.status(200).json({
      status: 'success',
      results: docs.length,
      requestedAt: req.requestedAt,
      data: { products:docs, stacks:filteredStacks },
    });
  }
});

export const getUserProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Product.find({ listedBy: req.params.id }),
    req.query
  );

  features.filter().sort().fields().paginator();
  const products = await features.query;

  const filteredStacks = [];

  filteredStacks.forEach(async (el) => {
    const stacks = await Stack.find({});
    stacks.forEach((stack) => {
      if (stack.products.includes(el)) filteredStacks.push(stack);
    });
  });

  res.status(200).json({
    status: 'success',
    results: products.length,
    requestedAt: req.requestedAt,
    data: { products, stacks:filteredStacks },
  });
});

export const getBoughtProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Product.find({
      isPurchased: true,
      purchasedBy: req.user.id,
    }),
    req.query
  );

  features.filter().sort().fields().paginator();
  const products = await features.query;

  res.status(200).json({
    status: 'success',
    results: products.length,
    requestedAt: req.requestedAt,
    data: products,
  });
});

export const getOrderProducts = catchAsync(async(req, res, next)=>{
  const userProducts = await Product.find({
    listedBy:req.user.id,
    isPurchased:false
  })

  const otherUserProducts = await Product.find({
    listedBy:req.params.id,
    isPurchased:false
  })

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestedAt,
    data: {userProducts,otherUserProducts },
  });
})
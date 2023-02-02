import catchAsync from '../managers/catchAsync.js';
import Product from '../models/productModel.js';
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
    res.status(200).json({
      status: 'success',
      results: docs.length,
      requestedAt: req.requestedAt,
      data: distanceDocs,
    });
  } else
    res.status(200).json({
      status: 'success',
      results: docs.length,
      requestedAt: req.requestedAt,
      data: docs,
    });
});

export const getUserProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Product.find({ listedBy: req.user.id }),
    req.query
  );

  features.filter().sort().fields().paginator();
  const docs = await features.query;

  res.status(200).json({
    status: 'success',
    results: docs.length,
    requestedAt: req.requestedAt,
    data: docs,
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

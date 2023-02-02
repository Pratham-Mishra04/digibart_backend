import catchAsync from '../managers/catchAsync';
import Order from '../models/orderModel';
import AppError from '../managers/AppError.js';

export const placeOrder = catchAsync(async (req, res, next) => {
  const order = await Order.create({
    listedBy: req.body.listedBy,
    placedBy: req.body.placedBy,
    productsByLister: req.body.productsByLister,
    productsByPlacer: req.body.productsByPlacer,
    status: 'placed',
  });
  res.status(201).json({
    status: 'success',
    requestedAt: req.requestedAt,
    data: order,
  });
});

export const cancelOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.orderID);
  if (order.status !== 'placed')
    return next(new AppError('You Cannot Perfom this Action.'));
  await order.update(
    {
      status: 'canceled',
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestedAt,
    data: order,
  });
});

export const acceptOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.orderID);
  if (order.status !== 'placed')
    return next(new AppError('You Cannot Perfom this Action.'));
  await order.update(
    {
      status: 'accepted',
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestedAt,
    data: order,
  });
});

export const declineOrder = catchAsync(async (req, res, next) => {
  // add order user checker
  const order = await Order.findById(req.params.orderID);
  if (order.status !== 'placed')
    return next(new AppError('You Cannot Perfom this Action.'));
  await order.update(
    {
      status: 'declined',
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestedAt,
    data: order,
  });
});

export const receiveOrder = catchAsync(async (req, res, next) => {
    // add order user checker
  const order = await Order.findById(req.params.orderID);
  if (order.status !== 'received' && order.status!=='accepted')
    return next(new AppError('You Cannot Perfom this Action.'));
  if (order.listedBy == req.user.id) order.receivedByLister = true;
  else order.receivedByPlacer = true;

  if (order.receivedByLister && order.receivedByPlacer)
    order.status = 'completed';
  else order.status = 'received';

  await order.save();

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestedAt,
    data: order,
  });
});

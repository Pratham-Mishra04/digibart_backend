import express from 'express';
import { protect } from '../middlewares/authMiddlewares.js';
import { acceptOrder, cancelOrder, declineOrder, placeOrder, receiveOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.route('/place').post(protect, placeOrder);

orderRouter.route('/cancel/:orderID').get(protect, cancelOrder);

orderRouter.route('/accept/:orderID').get(protect, acceptOrder);

orderRouter.route('/decline/:orderID').get(protect, declineOrder);

orderRouter.route('/receive/:orderID').get(protect, receiveOrder);

export default orderRouter;

import express from 'express';
import { protect } from '../middlewares/authMiddlewares.js';
import {
  getAllProducts,
  getUserProducts,
  getBoughtProducts,
  getOrderProducts
} from '../controllers/shopController.js';

const shopRouter = express.Router();

shopRouter.route('/').post(protect, getAllProducts);

shopRouter.route('/pastOrders').get(protect, getBoughtProducts);

shopRouter.route('/listed/:id').post(protect, getUserProducts);

shopRouter.route('/trade/:id').post(protect, getOrderProducts);

export default shopRouter;

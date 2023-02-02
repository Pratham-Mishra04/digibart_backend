import express from 'express';
import { protect } from '../middlewares/authMiddlewares.js';
import {
  getAllProducts,
  getUserProducts,
  getBoughtProducts,

} from '../controllers/shopController.js';

const shopRouter = express.Router();

shopRouter.route('/').post(protect, getAllProducts);

shopRouter.route('/pastOrders').get(protect, getBoughtProducts);

shopRouter.route('/listed').get(protect, getUserProducts);

export default shopRouter;

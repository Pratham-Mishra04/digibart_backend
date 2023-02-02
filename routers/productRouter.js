import express from 'express';
import { protect, userProductProtect } from '../middlewares/authMiddlewares.js';
import {
  addProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from '../controllers/productController.js';
import { productImgUploadParserer } from '../utils/parserers/imageUploadParserer.js';
import { resizeProductPics } from '../utils/resizePic.js';
import categoryCheck from '../validators/categoryChecker.js';
import {
  joiProductCreateValidator,
  joiProductUpdateValidator,
} from '../validators/joiValidators/joiProductValidator.js';

const productRouter = express.Router();

productRouter
  .route('/')
  .post(
    protect,
    productImgUploadParserer,
    joiProductCreateValidator,
    resizeProductPics,
    categoryCheck,
    addProduct
  );

productRouter
  .route('/:id')
  .get(protect, getProduct)
  .patch(protect, userProductProtect, joiProductUpdateValidator, updateProduct)
  .delete(protect, userProductProtect, deleteProduct);

export default productRouter;

import catchAsync from '../managers/catchAsync.js';
import logger from '../logs/logger.js';
import Category from '../models/categoryModel.js';

const categoryCheck = catchAsync(async (req, res, next) => {
  if (
    !(await Category.findOne({
      title: { $regex: `^${req.body.category}$`, $options: 'i' },
    }))
  )
    await Category.create({ title: req.body.category })
      .then(
        logger.newCategory(
          `New Category Added: ${req.body.category} by ${req.user.username} for ${req.body.title}`
        )
      )
      .catch((err) =>
        logger.error(
          `Error in creating new category: ${req.body.category} by ${req.user.username} for ${req.body.title}\n${err.message}`
        )
      );
  next();
});

export default categoryCheck;

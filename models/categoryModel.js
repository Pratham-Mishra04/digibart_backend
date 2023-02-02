import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    title: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
    },
  }
);

categorySchema.virtual('products', {
  ref: 'Product',
  foreignField: 'category',
  localField: 'title',
});

const Category = mongoose.model('Category', categorySchema);

export default Category;

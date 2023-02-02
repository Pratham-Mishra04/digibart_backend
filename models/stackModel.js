import mongoose from 'mongoose';

const stackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    virtuals: true,
    toJSON: true,
  }
);

stackSchema.virtual('price').get(function () {
  if (this.products.length > 0)
    return this.products.reduce((a, b) => a.price + b.price.b, 0);
  return 0;
});

stackSchema.index({ price: 1 });

const Stack = mongoose.model('Stack', stackSchema);

export default Stack;

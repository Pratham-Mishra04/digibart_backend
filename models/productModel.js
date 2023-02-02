import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  images: [String],
  description: String,
  listedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  listedAt: {
    type: Date,
    default: Date.now(),
  },
  price: Number,
  category: String,
  purchaseHistory: {
    isPurchased: {
      type: Boolean,
      default: false,
    },
    purchasedAt: Date,
    purchasedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
});

productSchema.index({ price: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;

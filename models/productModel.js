import mongoose from 'mongoose';
import calculateCost from '../utils/essentials/costCalculator.js';

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
  mrp: Number,
  estimatedPrice: Number,
  category: String,
  isPurchased: {
    type: Boolean,
    default: false,
  },
  age: Number,
  purchasedAt: Date,
  purchasedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  lat: String,
  long: String,
});

productSchema.index({ price: 1 });

productSchema.pre('save', function (next) {
  this.estimatedPrice = calculateCost(this);
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;

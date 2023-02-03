import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    listedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    placedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    productsByLister: [
      {
        //stacks are implemented as product arrays in backend
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    productsByPlacer: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    receivedByLister: {
      type: Boolean,
      default: false,
    },
    receivedByPlacer: {
      type: Boolean,
      default: false,
    },
    stackOfLister:{
      type: mongoose.Schema.Types.ObjectId,
        ref: 'Stack',
    },
    stackOfPlacer:{
      type: mongoose.Schema.Types.ObjectId,
        ref: 'Stack',
    },
    message:String,
    status:{
      type:String,
      enum:['placed', 'canceled', 'accepted', 'declined', 'received', 'completed']
    }
  },
  {
    timestamps: {
      createdAt: 'placedAt',
    },
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;

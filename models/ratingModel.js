import mongoose from 'mongoose';

const 
= new mongoose.Schema(
  {
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
    ratedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    ratedUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    ratings:Number,
    Comment:String
  },
  {
    timestamps: {
      createdAt: 'createdAt',
    },
  }
);

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;

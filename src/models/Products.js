import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({

  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model('Products', ProductSchema);

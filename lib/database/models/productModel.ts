import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    maxLength: 50,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxLength: 255,
    required: true,
  },
  price: {
    type: Number,
    min: 1,
    required: true,
  },
  category: {
    type: 'string',
    values: ['men', 'women', 'unisex'],
    required: true,
  },
  available: {
    type: Boolean,
  },
  number_of_sales: {
    type: Number,
    min: 0,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
});

module.exports =
  mongoose.models.products || mongoose.model('products', productSchema);

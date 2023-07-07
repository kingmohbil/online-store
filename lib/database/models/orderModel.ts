import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    minLength: 10,
    maxLength: 10,
    required: true,
  },
  location_details: {
    City: {
      type: String,
      enum: ['Amman'],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  order_details: {
    products: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    delivery_fees: {
      type: Number,
      required: true,
    },
  },
});

module.exports =
  mongoose.models.orders || mongoose.model('orders', orderSchema);

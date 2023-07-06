import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({});

module.exports =
  mongoose.models.orders || mongoose.model('orders', orderSchema);

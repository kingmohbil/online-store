import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tokenWhiteListSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.white_list ||
  mongoose.model('white_list', tokenWhiteListSchema);

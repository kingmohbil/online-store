import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: {
    type: String,
    minLength: 3,
    maxLength: 20,
    required: true,
  },
  last_name: {
    type: String,
    minLength: 3,
    maxLength: 20,
    required: true,
  },
  email: {
    email_address: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  contact_details: {
    phone_number: {
      type: String,
      minLength: 10,
      maxLength: 10,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  password: {
    type: String,
    required: true,
    verified: {
      type: Boolean,
      default: false,
    },
  },
  created_at: {
    type: Schema.Types.Date,
    default: () => Date.now(),
  },
  orders: [
    {
      type: [Schema.Types.ObjectId],
      red: 'orders',
    },
  ],
  roles: {
    type: String,
    enum: ['admin', 'staff', 'user'],
    default: 'user',
  },
});

module.exports = mongoose.models.users || mongoose.model('users', userSchema);

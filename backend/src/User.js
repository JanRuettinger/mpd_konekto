import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema(
  {
    _id: {
      type: Number,
    },
    data: {
      type: JSON,
    },
  },
  {
    collection: 'users',
  },
);

export default mongoose.model('User', User);

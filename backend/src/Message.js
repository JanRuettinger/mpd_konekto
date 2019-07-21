import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Message = new Schema(
  {
    to: {
      type: Number,
    },
    from: {
      type: Number,
    },
    message: {
      type: String,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'messages',
  },
);

export default mongoose.model('Message', Message);

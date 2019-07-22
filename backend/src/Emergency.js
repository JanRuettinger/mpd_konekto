import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Emergency = new Schema(
  {
    _id: {
      type: Number,
    },
    data: {
      type: JSON,
    },
  },
  {
    collection: 'emergencies',
  },
);

export default mongoose.model('Emergency', Emergency);

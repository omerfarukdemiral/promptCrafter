import mongoose from 'mongoose';

const TechnologySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

export default mongoose.model('Technology', TechnologySchema); 
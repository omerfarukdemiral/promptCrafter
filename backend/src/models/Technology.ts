import mongoose, { Document } from 'mongoose';

export interface ITechnology extends Document {
  name: string;
  icon: string;
  category: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const TechnologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  icon: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model<ITechnology>('Technology', TechnologySchema); 
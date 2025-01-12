import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  modules: [{
    type: String,
  }],
  platform: {
    type: String,
    enum: ['web', 'mobile'],
    required: true,
  }
}, {
  timestamps: true,
});

export default mongoose.model('Project', ProjectSchema); 
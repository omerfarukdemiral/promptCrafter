import mongoose from 'mongoose';

const ProjectTechnologySchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  technologyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technology',
    required: true,
  },
  stepId: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true,
});

// Aynı proje için aynı adımda birden fazla teknoloji seçilememesi için index
ProjectTechnologySchema.index({ projectId: 1, stepId: 1 }, { unique: true });

export default mongoose.model('ProjectTechnology', ProjectTechnologySchema); 
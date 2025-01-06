import { Schema, model, Document } from 'mongoose';

interface IPrompt extends Document {
  platform: 'web' | 'mobile';
  technologies: Record<string, string[]>;
  projectDetails: string;
  createdAt: Date;
}

const promptSchema = new Schema<IPrompt>(
  {
    platform: {
      type: String,
      required: true,
      enum: ['web', 'mobile'],
    },
    technologies: {
      type: Schema.Types.Mixed,
      required: true,
    },
    projectDetails: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IPrompt>('Prompt', promptSchema); 
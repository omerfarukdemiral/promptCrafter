import { Schema, model, Document } from 'mongoose';

export interface IPrompt extends Document {
  platform: 'web' | 'mobile';
  technologies: Record<string, string[]>;
  projectDetails: string;
  instructions: string;
  projectId: Schema.Types.ObjectId;
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
    instructions: {
      type: String,
      required: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    }
  },
  { timestamps: true }
);

export default model<IPrompt>('Prompt', promptSchema); 
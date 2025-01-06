import { Model, Document } from 'mongoose';
import logger from '../utils/logger';

export default abstract class BaseService<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      const item = new this.model(data);
      return await item.save();
    } catch (error) {
      logger.error(`Error creating ${this.model.modelName}: ${error}`);
      throw error;
    }
  }

  async findAll(): Promise<T[]> {
    try {
      return await this.model.find();
    } catch (error) {
      logger.error(`Error finding all ${this.model.modelName}s: ${error}`);
      throw error;
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      return await this.model.findById(id);
    } catch (error) {
      logger.error(`Error finding ${this.model.modelName} by id: ${error}`);
      throw error;
    }
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    try {
      return await this.model.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      logger.error(`Error updating ${this.model.modelName}: ${error}`);
      throw error;
    }
  }

  async delete(id: string): Promise<T | null> {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      logger.error(`Error deleting ${this.model.modelName}: ${error}`);
      throw error;
    }
  }
} 
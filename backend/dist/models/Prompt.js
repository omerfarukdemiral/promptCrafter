"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const promptSchema = new mongoose_1.Schema({
    platform: {
        type: String,
        required: true,
        enum: ['web', 'mobile'],
    },
    technologies: {
        type: mongoose_1.Schema.Types.Mixed,
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Prompt', promptSchema);

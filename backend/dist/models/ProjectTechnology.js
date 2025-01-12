"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProjectTechnologySchema = new mongoose_1.default.Schema({
    projectId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    technologyId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.default = mongoose_1.default.model('ProjectTechnology', ProjectTechnologySchema);

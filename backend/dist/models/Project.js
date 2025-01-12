"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProjectSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model('Project', ProjectSchema);

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const researchPaperSchema = new Schema(
    {
        title: { type: String },
        description: { type: String },
        thumbnail: { type: String },
    },
    { versionKey: false, timestamps: true }
);

export default model('researchPaper', researchPaperSchema);

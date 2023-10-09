import mongoose from 'mongoose';

const { Schema } = mongoose;
const feedbackSchema = new Schema({
    name: { type: String },
    title: { type: String },
    description: { type: String },
    thumbnail: { type: String },
}, { versionKey: false, timestamps: true });

export default mongoose.model('feedback', feedbackSchema);

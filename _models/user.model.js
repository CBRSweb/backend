import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        name: { type: String },
        email: { type: String },
        password: { type: String },
    },
    { versionKey: false, timestamps: true }
);

export default model('User', userSchema);

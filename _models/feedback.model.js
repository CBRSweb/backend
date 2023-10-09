const mongoose = require('mongoose');

const schema = mongoose.Schema;
const feedback = new schema({
    name: { type: String },
    title: { type: String },
    description: { type: String },
    thumbnail: { type: String },
},
    { versionKey: false, timestamps: true, });
module.exports = mongoose.model('feedback', feedback);
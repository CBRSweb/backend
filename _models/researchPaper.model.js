const mongoose = require('mongoose');

const schema = mongoose.Schema;
const researchPaper = new schema({
    title: { type: String },
    description: { type: String },
    thumbnail: { type: String },
},
    { versionKey: false, timestamps: true, });
module.exports = mongoose.model('researchPaper', researchPaper);
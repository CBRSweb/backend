const mongoose = require('mongoose');

const schema = mongoose.Schema;
const user = new schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
},
    { versionKey: false, timestamps: true, });
module.exports = mongoose.model('user', user);
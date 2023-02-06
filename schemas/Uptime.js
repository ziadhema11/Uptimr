const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    user: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Uptime', UserSchema)
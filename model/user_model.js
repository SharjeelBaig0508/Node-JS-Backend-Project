/* Node Imports */

/* Framework Imports */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Local Imports */
const constants = require('../utils/constants');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: constants.ROLES[0],
        enum: constants.ROLES
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true,
    }
});

module.exports = mongoose.model('User', UserSchema);
